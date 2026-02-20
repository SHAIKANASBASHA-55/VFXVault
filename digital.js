// ─────────────────────────────────────────────────
//  DIGITAL EFFECTS
// ─────────────────────────────────────────────────

export const digitalEffects = [
  {
    name: "Matrix Rain",
    tags: ["digital", "code", "cyber"],
    description: "Green katakana characters cascade in the classic matrix style",
    code: `// Column-based character rain with fade trail
columns.forEach((col, i) => {
  const char = CHARS[floor(rand() * CHARS.length)];
  ctx.fillStyle = \`rgba(0,255,70,\${col.alpha})\`;
  ctx.fillText(char, i * charW, col.y);
  col.y += charH; if(col.y > H + rand()*2000) col.y = -charH;
});`,
    animator: (c, ctx, mouse) => {
      const CHARS = "ｦｧｨｩｪｫｬｭｮｯｰｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ0123456789";
      const CHAR_W = 16, CHAR_H = 18; let t = 0, id;
      const cols = Math.floor(c.width / CHAR_W);
      const columns = Array.from({ length: cols }, () => ({ y: Math.random() * -c.height, speed: Math.random() * 2 + 1, alpha: Math.random() * .5 + .4 }));
      ctx.font = `${CHAR_H - 2}px monospace`;
      const loop = () => {
        t++; ctx.fillStyle = "rgba(0,0,0,0.08)"; ctx.fillRect(0, 0, c.width, c.height);
        columns.forEach((col, i) => {
          const char = CHARS[Math.floor(Math.random() * CHARS.length)];
          const distToMouse = Math.abs(i * CHAR_W - mouse.x);
          const brightness = distToMouse < 80 ? Math.min(1, (80 - distToMouse) / 40) : 0;
          ctx.fillStyle = brightness > 0 ? `rgba(180,255,200,${col.alpha + brightness * .5})` : `rgba(0,${180 + Math.random() * 75},50,${col.alpha})`;
          ctx.fillText(char, i * CHAR_W, col.y);
          ctx.fillStyle = `rgba(150,255,150,${col.alpha * .25})`;
          ctx.fillText(char, i * CHAR_W, col.y - CHAR_H);
          col.y += col.speed * CHAR_H; if (col.y > c.height + Math.random() * 2000) { col.y = -CHAR_H * (Math.random() * 8 + 1); }
        });
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },

  {
    name: "Glitch Pixels",
    tags: ["digital", "glitch", "art"],
    description: "RGB channel splits and horizontal slice tears create digital glitch",
    code: `// Slice offset + channel shift per glitch interval
ctx.drawImage(offscreen, 0, slice.y, W, slice.h, slice.offsetX, slice.y, W, slice.h);
// Red channel ghost
ctx.globalCompositeOperation = 'screen';
ctx.drawImage(offscreen, shiftX, 0);`,
    animator: (c, ctx, mouse) => {
      let t = 0, slices = [], glitching = false, id;
      const triggerGlitch = () => { glitching = true; slices = []; const n = Math.floor(Math.random() * 8 + 4); for (let i = 0; i < n; i++) { const y = Math.random() * c.height; slices.push({ y, h: Math.random() * 40 + 5, offset: (Math.random() - .5) * 80, life: Math.random() * 15 + 5, r: Math.random() > .5 }); } setTimeout(() => { glitching = false; slices = []; }, 250); };
      const iv = setInterval(triggerGlitch, 1200);
      const loop = () => {
        t += .016;
        ctx.fillStyle = "rgba(2,4,8,0.18)"; ctx.fillRect(0, 0, c.width, c.height);
        // Scanlines
        for (let y = 0; y < c.height; y += 4) { ctx.fillStyle = "rgba(0,0,0,0.06)"; ctx.fillRect(0, y, c.width, 2); }
        // Cursor highlight
        const g = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 80);
        g.addColorStop(0, "rgba(0,255,120,0.1)"); g.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = g; ctx.fillRect(0, 0, c.width, c.height);
        if (glitching) {
          slices.forEach(s => {
            s.life--; if (s.life <= 0) return;
            const color = s.r ? `rgba(255,0,60,0.6)` : `rgba(0,255,180,0.5)`;
            ctx.fillStyle = color; ctx.fillRect(s.offset, s.y, c.width, s.h);
            ctx.strokeStyle = `rgba(255,255,255,${Math.random() * .3})`; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(0, s.y); ctx.lineTo(c.width, s.y); ctx.stroke();
          });
          // RGB shift text
          ctx.fillStyle = `rgba(255,0,60,0.4)`; ctx.font = "12px monospace"; ctx.fillText("ERR_SIGNAL_LOSS", mouse.x - 8 + 3, mouse.y - 8);
          ctx.fillStyle = `rgba(0,255,200,0.4)`; ctx.fillText("ERR_SIGNAL_LOSS", mouse.x - 8 - 3, mouse.y - 8);
          ctx.fillStyle = `rgba(255,255,255,0.85)`; ctx.fillText("ERR_SIGNAL_LOSS", mouse.x - 8, mouse.y - 8);
        }
        ctx.strokeStyle = "rgba(0,255,120,0.5)"; ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(mouse.x, mouse.y, 8, 0, Math.PI * 2); ctx.stroke();
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => { clearInterval(iv); cancelAnimationFrame(id); } };
    }
  },

  {
    name: "Binary Stream",
    tags: ["digital", "code", "data"],
    description: "Columns of 0s and 1s flow with bits highlighting near cursor",
    code: `// Binary digit column with variable speed
const bit = rand() > 0.5 ? '1' : '0';
const highlight = abs(col.x - mouseX) < 24;
ctx.fillStyle = highlight ? \`rgba(255,220,60,alpha)\` : \`rgba(0,180,255,alpha)\`;`,
    animator: (c, ctx, mouse) => {
      const CHAR_W = 18, CHAR_H = 20;
      const cols = Math.floor(c.width / CHAR_W);
      const columns = Array.from({ length: cols }, () => ({ y: Math.random() * -c.height, speed: Math.random() * 1.5 + .5, alpha: Math.random() * .4 + .3 }));
      let id;
      const loop = () => {
        ctx.fillStyle = "rgba(0,4,10,0.12)"; ctx.fillRect(0, 0, c.width, c.height);
        ctx.font = `${CHAR_H - 2}px monospace`;
        columns.forEach((col, i) => {
          const x = i * CHAR_W, bit = Math.random() > .5 ? "1" : "0";
          const near = Math.abs(x - mouse.x) < 28;
          ctx.fillStyle = near ? `rgba(255,220,60,${col.alpha + .4})` : `rgba(0,180,255,${col.alpha})`;
          ctx.fillText(bit, x, col.y);
          ctx.fillStyle = near ? `rgba(255,240,120,0.15)` : `rgba(0,100,180,0.12)`;
          ctx.fillText(bit, x, col.y - CHAR_H);
          col.y += col.speed * CHAR_H; if (col.y > c.height + CHAR_H) { col.y = -CHAR_H * (Math.floor(Math.random() * 5) + 1); }
        });
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },

  {
    name: "Pixel Dissolve",
    tags: ["digital", "glitch", "transition"],
    description: "Pixel tiles fade in and out in a random dissolve pattern",
    code: `// Grid of pixels with staggered random fade timing
tiles.forEach(tile => {
  tile.alpha += (tile.target - tile.alpha) * 0.08;
  if(abs(tile.alpha - tile.target) < 0.02) tile.target = rand() > 0.5 ? 1 : 0;
  ctx.fillStyle = \`hsla(\${tile.hue},60%,50%,\${tile.alpha})\`;
});`,
    animator: (c, ctx, mouse) => {
      const SZ = 20;
      const cols = Math.ceil(c.width / SZ), rows = Math.ceil(c.height / SZ);
      const tiles = [];
      for (let r = 0; r < rows; r++) for (let col = 0; col < cols; col++) tiles.push({ x: col * SZ, y: r * SZ, alpha: Math.random(), target: Math.random() > .5 ? 1 : 0, hue: Math.random() * 280 + 160, speed: Math.random() * .06 + .02 });
      let t = 0, id;
      const loop = () => {
        t++; ctx.fillStyle = "rgba(0,0,0,0.25)"; ctx.fillRect(0, 0, c.width, c.height);
        tiles.forEach(tile => {
          tile.alpha += (tile.target - tile.alpha) * tile.speed;
          if (Math.abs(tile.alpha - tile.target) < .03) tile.target = Math.random() > (Math.hypot(tile.x - mouse.x, tile.y - mouse.y) < 120 ? .3 : .5) ? 1 : 0;
          if (tile.alpha > .05) { ctx.fillStyle = `hsla(${tile.hue},60%,50%,${tile.alpha * .7})`; ctx.fillRect(tile.x, tile.y, SZ - 1, SZ - 1); }
        });
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },

  {
    name: "Neural Network",
    tags: ["digital", "ai", "network"],
    description: "Animated neural net nodes fire signals along weighted connections",
    code: `// Signal pulse traveling along edge
edge.pulse += 0.04;
const px = lerp(nodeA.x, nodeB.x, edge.pulse);
const py = lerp(nodeA.y, nodeB.y, edge.pulse);
if(edge.pulse >= 1) { nodeB.activation = min(1, nodeB.activation+0.4); edge.pulse=0; }`,
    animator: (c, ctx, mouse) => {
      const LAYERS = [4, 6, 6, 4], GAP_X = c.width / (LAYERS.length + 1);
      let nodes = [], edges = [], t = 0, id;
      LAYERS.forEach((count, li) => {
        const x = GAP_X * (li + 1);
        for (let n = 0; n < count; n++) {
          const y = c.height / (count + 1) * (n + 1);
          nodes.push({ x, y, layer: li, activation: Math.random() * .3, hue: 160 + li * 50 });
          if (li > 0) { const prevLayer = nodes.filter(nd => nd.layer === li - 1); prevLayer.forEach(pn => edges.push({ from: nodes.indexOf(pn), to: nodes.length - 1, pulse: Math.random(), active: Math.random() > .6 })); }
        }
      });
      const loop = () => {
        t += .018; ctx.fillStyle = "rgba(2,4,10,0.2)"; ctx.fillRect(0, 0, c.width, c.height);
        edges.forEach(e => {
          const na = nodes[e.from], nb = nodes[e.to];
          ctx.strokeStyle = `rgba(0,150,255,0.12)`; ctx.lineWidth = .8; ctx.beginPath(); ctx.moveTo(na.x, na.y); ctx.lineTo(nb.x, nb.y); ctx.stroke();
          if (e.active) {
            e.pulse = (e.pulse + .025) % 1;
            const px = na.x + (nb.x - na.x) * e.pulse, py = na.y + (nb.y - na.y) * e.pulse;
            ctx.fillStyle = `rgba(0,220,255,0.9)`; ctx.beginPath(); ctx.arc(px, py, 3.5, 0, Math.PI * 2); ctx.fill();
            if (e.pulse > .95) { nodes[e.to].activation = Math.min(1, nodes[e.to].activation + .3); }
          }
        });
        nodes.forEach(n => {
          n.activation = Math.max(0, n.activation - .008);
          const near = Math.hypot(n.x - mouse.x, n.y - mouse.y) < 60;
          if (near) n.activation = Math.min(1, n.activation + .05);
          const r = 8 + n.activation * 12, alpha = .4 + n.activation * .6;
          const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, r * 1.8);
          g.addColorStop(0, `hsla(${n.hue},75%,60%,${alpha})`); g.addColorStop(1, `hsla(${n.hue},60%,40%,0)`);
          ctx.fillStyle = g; ctx.beginPath(); ctx.arc(n.x, n.y, r * 1.8, 0, Math.PI * 2); ctx.fill();
          ctx.fillStyle = `rgba(200,240,255,${.6 + n.activation * .4})`; ctx.beginPath(); ctx.arc(n.x, n.y, r * .5, 0, Math.PI * 2); ctx.fill();
        });
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },

  {
    name: "Data Packets",
    tags: ["digital", "network", "flow"],
    description: "Colored data packets travel along network paths toward destination",
    code: `// Path-following packet movement
packet.progress += packet.speed;
const pos = getPointOnPath(packet.path, packet.progress);
ctx.fillStyle = \`hsl(\${packet.hue}, 90%, 60%)\`;
ctx.fillRect(pos.x - 4, pos.y - 4, 8, 8);`,
    animator: (c, ctx, mouse) => {
      const NODES = 8;
      let nodes = [], paths = [], packets = [], t = 0, id;
      for (let i = 0; i < NODES; i++) nodes.push({ x: Math.random() * c.width * .8 + c.width * .1, y: Math.random() * c.height * .8 + c.height * .1 });
      for (let i = 0; i < NODES; i++) for (let j = i + 1; j < NODES; j++) if (Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y) < c.width * .38) paths.push([i, j]);
      const spawnPacket = () => { if (paths.length === 0) return; const path = paths[Math.floor(Math.random() * paths.length)]; const reverse = Math.random() > .5; packets.push({ from: reverse ? path[1] : path[0], to: reverse ? path[0] : path[1], progress: 0, speed: Math.random() * .015 + .008, hue: Math.random() * 360, size: Math.random() * 5 + 3 }); };
      const iv = setInterval(spawnPacket, 200); spawnPacket(); spawnPacket(); spawnPacket();
      const loop = () => {
        t += .016; ctx.fillStyle = "rgba(2,4,10,0.16)"; ctx.fillRect(0, 0, c.width, c.height);
        paths.forEach(p => { ctx.strokeStyle = "rgba(0,80,140,0.2)"; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(nodes[p[0]].x, nodes[p[0]].y); ctx.lineTo(nodes[p[1]].x, nodes[p[1]].y); ctx.stroke(); });
        nodes.forEach((n, i) => { const near = Math.hypot(n.x - mouse.x, n.y - mouse.y) < 50; ctx.fillStyle = near ? "rgba(0,200,255,0.9)" : "rgba(0,120,200,0.6)"; ctx.beginPath(); ctx.arc(n.x, n.y, near ? 8 : 5, 0, Math.PI * 2); ctx.fill(); });
        packets.forEach((pk, i) => {
          pk.progress += pk.speed; if (pk.progress >= 1) { packets.splice(i, 1); return; }
          const fn = nodes[pk.from], tn = nodes[pk.to], px = fn.x + (tn.x - fn.x) * pk.progress, py = fn.y + (tn.y - fn.y) * pk.progress;
          ctx.fillStyle = `hsla(${pk.hue},90%,65%,0.95)`; ctx.shadowColor = `hsla(${pk.hue},100%,70%,0.7)`; ctx.shadowBlur = 8;
          ctx.beginPath(); ctx.arc(px, py, pk.size, 0, Math.PI * 2); ctx.fill(); ctx.shadowBlur = 0;
        });
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => { clearInterval(iv); cancelAnimationFrame(id); } };
    }
  },

  {
    name: "Hex Grid",
    tags: ["digital", "geometric", "pattern"],
    description: "Hexagonal cells light up in waves driven by mouse position",
    code: `// Flat-top hex grid with distance-based activation
const dist = hypot(hex.cx - mouseX, hex.cy - mouseY);
hex.activation = max(0, 1 - dist / 200);
// Draw hex with 6 vertices
for(let i=0;i<6;i++) ctx.lineTo(cx+cos(i/6*PI*2)*size, cy+sin(...)*size);`,
    animator: (c, ctx, mouse) => {
      const SIZE = 28, W = SIZE * 2, H = Math.sqrt(3) * SIZE;
      let hexes = [], t = 0, id;
      for (let col = -1; col < c.width / (W * .75) + 1; col++) for (let row = -1; row < c.height / H + 1; row++) {
        const x = col * W * .75, y = row * H + (col % 2 === 0 ? 0 : H * .5);
        hexes.push({ cx: x + SIZE, cy: y + SIZE, activation: 0, hue: (col * 17 + row * 13) % 360 });
      }
      const drawHex = (cx, cy, size, style, alpha) => {
        ctx.beginPath();
        for (let i = 0; i < 6; i++) { const a = (i / 6) * Math.PI * 2 - Math.PI / 6; ctx.lineTo(cx + Math.cos(a) * size, cy + Math.sin(a) * size); }
        ctx.closePath(); ctx.fillStyle = style; ctx.fill(); ctx.strokeStyle = `rgba(0,200,255,${alpha * .4})`; ctx.lineWidth = 1; ctx.stroke();
      };
      const loop = () => {
        t += .018; ctx.fillStyle = "rgba(2,4,10,0.2)"; ctx.fillRect(0, 0, c.width, c.height);
        hexes.forEach(h => {
          const dist = Math.hypot(h.cx - mouse.x, h.cy - mouse.y), wave = Math.sin(dist * .04 - t * 3) * .5 + .5;
          h.activation = Math.max(h.activation - .04, Math.max(0, 1 - dist / 180) * wave);
          if (h.activation > .04) drawHex(h.cx, h.cy, SIZE - 1, `hsla(${h.hue + t * 20},65%,${30 + h.activation * 40}%,${h.activation * .8})`, h.activation);
          else { ctx.strokeStyle = "rgba(0,80,120,0.18)"; ctx.lineWidth = .8; ctx.beginPath(); for (let i = 0; i < 6; i++) { const a = (i / 6) * Math.PI * 2 - Math.PI / 6; ctx.lineTo(h.cx + Math.cos(a) * (SIZE - 1), h.cy + Math.sin(a) * (SIZE - 1)); } ctx.closePath(); ctx.stroke(); }
        });
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },

  {
    name: "Corrupted Signal",
    tags: ["digital", "glitch", "noise"],
    description: "Waveform signal lines that periodically corrupt and fragment",
    code: `// Sine wave with random corruption injections
const y = cy + sin(x * freq + t) * amp;
if(rand() < corruptChance) y += (rand()-0.5) * 80;
ctx.strokeStyle = \`rgba(0,255,100,alpha)\`;`,
    animator: (c, ctx, mouse) => {
      let t = 0, corruptLevel = 0, id;
      const iv = setInterval(() => corruptLevel = Math.min(1, corruptLevel + .3), 1500);
      const loop = () => {
        t += .02; corruptLevel = Math.max(0, corruptLevel - .015);
        ctx.fillStyle = "rgba(2,6,2,0.2)"; ctx.fillRect(0, 0, c.width, c.height);
        const waves = [{ freq: .012, amp: 40, hue: 120, phase: 0 }, { freq: .008, amp: 25, hue: 160, phase: 1.2 }, { freq: .018, amp: 15, hue: 80, phase: 2.4 }];
        waves.forEach((w, wi) => {
          ctx.beginPath(); let first = true;
          const cy = c.height / 2 + (wi - 1) * 60 + (mouse.y - c.height / 2) * .15;
          for (let x = 0; x <= c.width; x += 2) {
            let y = cy + Math.sin(x * w.freq + t + w.phase) * (w.amp + mouse.y * .08);
            if (Math.random() < corruptLevel * .12) y += (Math.random() - .5) * 70;
            first ? ctx.moveTo(x, y) : ctx.lineTo(x, y); first = false;
          }
          ctx.strokeStyle = `hsla(${w.hue + corruptLevel * 100},85%,${55 + corruptLevel * 20}%,${.6 + corruptLevel * .4})`; ctx.lineWidth = 1.5 + corruptLevel * 2; ctx.stroke();
        });
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => { clearInterval(iv); cancelAnimationFrame(id); } };
    }
  }
];
