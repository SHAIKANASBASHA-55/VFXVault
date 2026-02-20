// ─────────────────────────────────────────────────
//  CULTURAL & FLORAL EFFECTS — PREMIUM EDITION
// ─────────────────────────────────────────────────

export const culturalEffects = [
 {
    name: "Chinese Ink Lotus",
    tags: ["chinese", "floral", "ink", "ambient"],
    description: "Sumi-e ink lotus blooms emerge from dark water with brushstroke-style petals and golden pollen",
    code: `// Brushstroke petal using tapered bezier + ink bleed
const drawInkPetal = (len, width, alpha) => {
  ctx.lineWidth = width * sin(progress * PI); // taper
  ctx.strokeStyle = \`rgba(20,15,30,\${alpha})\`;
  ctx.shadowBlur = 8; // ink bleed
  ctx.bezierCurveTo(...);
};`,
    animator: (c, ctx, mouse) => {
      let t = 0, id;
      const flowers = Array.from({ length: 4 }, (_, i) => ({
        x: c.width * (0.15 + i * 0.23),
        y: c.height * 0.55 + Math.sin(i * 1.5) * 60,
        phase: i * 1.2,
        bloom: 0,
        bloomTarget: 0.7 + Math.random() * 0.3,
        size: 55 + Math.random() * 35,
        stemLen: 120 + Math.random() * 60
      }));
      const drawInkPetal = (len, wid, hue, sat, lit, alpha) => {
        const g = ctx.createLinearGradient(0, 0, 0, -len);
        g.addColorStop(0, `hsla(${hue},${sat}%,${lit}%,${alpha})`);
        g.addColorStop(0.6, `hsla(${hue - 5},${sat + 10}%,${lit + 10}%,${alpha * 0.8})`);
        g.addColorStop(1, `hsla(${hue - 10},${sat + 20}%,${lit + 20}%,0)`);
        ctx.fillStyle = g;
        ctx.shadowBlur = 6; ctx.shadowColor = `hsla(${hue},40%,20%,0.3)`;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(-wid * 0.6, -len * 0.3, -wid * 0.8, -len * 0.7, 0, -len);
        ctx.bezierCurveTo(wid * 0.8, -len * 0.7, wid * 0.6, -len * 0.3, 0, 0);
        ctx.fill();
        ctx.shadowBlur = 0;
      };
      const loop = () => {
        t += 0.01;
        ctx.fillStyle = "rgba(8,12,20,0.18)"; ctx.fillRect(0, 0, c.width, c.height);
        // water ripples
        ctx.globalCompositeOperation = "screen";
        for (let i = 0; i < 3; i++) {
          const rr = 80 + i * 90 + Math.sin(t * 0.6 + i) * 20;
          ctx.strokeStyle = `rgba(30,80,120,${0.06 - i * 0.015})`;
          ctx.lineWidth = 1; ctx.beginPath();
          ctx.ellipse(c.width / 2, c.height * 0.72, rr * 2.5, rr * 0.6, 0, 0, Math.PI * 2); ctx.stroke();
        }
        ctx.globalCompositeOperation = "source-over";
        flowers.forEach(f => {
          f.bloom += (f.bloomTarget - f.bloom) * 0.008 + Math.sin(t * 0.4 + f.phase) * 0.001;
          const bloom = Math.min(1, f.bloom);
          // stem
          ctx.strokeStyle = `rgba(40,90,50,0.7)`; ctx.lineWidth = 3;
          ctx.beginPath(); ctx.moveTo(f.x, c.height * 0.85);
          ctx.quadraticCurveTo(f.x + Math.sin(t * 0.3 + f.phase) * 20, f.y + f.stemLen * 0.5, f.x, f.y + 10);
          ctx.stroke();
          // leaf
          ctx.save(); ctx.translate(f.x + 30, f.y + f.stemLen * 0.4);
          ctx.rotate(0.4 + Math.sin(t * 0.2 + f.phase) * 0.05);
          ctx.fillStyle = "rgba(35,85,45,0.55)";
          ctx.beginPath(); ctx.ellipse(0, 0, 28, 14, 0, 0, Math.PI * 2); ctx.fill(); ctx.restore();
          // petals — outer then inner
          const layers = [
            { count: 10, len: f.size, wid: f.size * 0.38, hue: 310, sat: 45, lit: 55, rotOff: 0 },
            { count: 8, len: f.size * 0.78, wid: f.size * 0.3, hue: 320, sat: 40, lit: 70, rotOff: 0.3 },
            { count: 6, len: f.size * 0.55, wid: f.size * 0.22, hue: 330, sat: 35, lit: 85, rotOff: 0.15 }
          ];
          layers.forEach((layer, li) => {
            for (let p = 0; p < layer.count; p++) {
              const a = (p / layer.count) * Math.PI * 2 + layer.rotOff + t * 0.04 * (li % 2 === 0 ? 1 : -1);
              const openAngle = bloom * (Math.PI / 2.2 + li * 0.15);
              ctx.save();
              ctx.translate(f.x, f.y);
              ctx.rotate(a);
              ctx.rotate(-openAngle);
              drawInkPetal(layer.len * bloom, layer.wid * bloom, layer.hue, layer.sat, layer.lit, 0.8);
              ctx.restore();
            }
          });
          // pollen center
          if (bloom > 0.4) {
            ctx.globalCompositeOperation = "screen";
            const pg = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, f.size * 0.22 * bloom);
            pg.addColorStop(0, `rgba(255,220,60,${0.9 * bloom})`);
            pg.addColorStop(0.5, `rgba(255,180,20,${0.5 * bloom})`);
            pg.addColorStop(1, "rgba(0,0,0,0)");
            ctx.fillStyle = pg; ctx.beginPath(); ctx.arc(f.x, f.y, f.size * 0.22 * bloom, 0, Math.PI * 2); ctx.fill();
            ctx.globalCompositeOperation = "source-over";
          }
        });
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },
  {
    name: "Japanese Sakura Storm",
    tags: ["japanese", "floral", "nature", "ambient"],
    description: "Dense sakura blizzard with realistic petal tumbling, wind gusts and depth layers",
    code: `// Three depth layers with parallax + wind turbulence
layers.forEach((layer, d) => {
  layer.petals.forEach(p => {
    p.x += sin(p.phase + p.y*0.008)*2.5 + wind*(1+d*0.4);
    p.y += p.speed*(0.6+d*0.2);
    p.rot += p.rotSpeed;
    // draw 5-lobe petal shape
    drawSakuraPetal(p.x, p.y, p.size, p.rot, opacity);
  });
});`,
    animator: (c, ctx, mouse) => {
      let t = 0, id;
      const layers = [0, 1, 2].map(d => ({
        depth: d,
        petals: Array.from({ length: 60 + d * 30 }, () => ({
          x: Math.random() * c.width,
          y: Math.random() * c.height,
          size: (8 - d * 2) + Math.random() * 6,
          speed: (0.6 + d * 0.5) + Math.random() * 1.2,
          rot: Math.random() * Math.PI * 2,
          rotSpeed: (Math.random() - 0.5) * 0.08,
          phase: Math.random() * Math.PI * 2,
          wobble: Math.random() * Math.PI * 2,
          hue: 340 + Math.random() * 20
        }))
      }));
      const drawPetal = (x, y, size, rot, alpha, hue) => {
        ctx.save();
        ctx.translate(x, y); ctx.rotate(rot);
        ctx.globalAlpha = alpha;
        for (let i = 0; i < 5; i++) {
          const a = (i / 5) * Math.PI * 2;
          ctx.save(); ctx.rotate(a);
          const g = ctx.createRadialGradient(0, -size * 0.5, 0, 0, -size * 0.5, size);
          g.addColorStop(0, `hsla(${hue},90%,96%,1)`);
          g.addColorStop(0.5, `hsla(${hue - 5},80%,82%,0.9)`);
          g.addColorStop(1, `hsla(${hue - 10},70%,75%,0)`);
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.bezierCurveTo(-size * 0.4, -size * 0.5, -size * 0.3, -size, 0, -size * 1.1);
          ctx.bezierCurveTo(size * 0.3, -size, size * 0.4, -size * 0.5, 0, 0);
          ctx.fill();
          ctx.restore();
        }
        ctx.restore();
      };
      const loop = () => {
        t += 0.014;
        ctx.fillStyle = "rgb(0, 0, 0)"; ctx.fillRect(0, 0, c.width, c.height);
        const wind = Math.sin(t * 0.3) * 2.5 + (mouse.x / c.width - 0.5) * 3;
        layers.forEach(layer => {
          layer.petals.forEach(p => {
            p.y += p.speed;
            p.x += Math.sin(p.phase + p.y * 0.008) * 1.8 + wind * (1 + layer.depth * 0.3);
            p.rot += p.rotSpeed + Math.sin(t + p.wobble) * 0.015;
            if (p.y > c.height + 20) { p.y = -20; p.x = Math.random() * c.width; p.phase = Math.random() * Math.PI * 2; }
            if (p.x > c.width + 30) p.x = -30;
            if (p.x < -30) p.x = c.width + 30;
            const alpha = 0.55 + layer.depth * 0.15;
            drawPetal(p.x, p.y, p.size, p.rot, alpha, p.hue);
          });
        });
        ctx.globalAlpha = 1;
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },

 

  {
    name: "Persian Garden Mosaic",
    tags: ["persian", "islamic", "geometric", "ornament"],
    description: "Intricate Islamic geometric star patterns unfurl in a paradise garden of lapis, gold and ruby",
    code: `// 8-point star tessellation with animated reveal
const drawStar = (cx, cy, r, points, rotation) => {
  for (let i = 0; i < points * 2; i++) {
    const angle = (i / (points * 2)) * PI * 2 + rotation;
    const radius = i % 2 === 0 ? r : r * 0.42;
    ctx.lineTo(cx + cos(angle)*radius, cy + sin(angle)*radius);
  }
};`,
    animator: (c, ctx, mouse) => {
      let t = 0, id;
      const TILE = 110;
      const cols = Math.ceil(c.width / TILE) + 2;
      const rows = Math.ceil(c.height / TILE) + 2;
      const drawStar = (cx, cy, r, pts, rot, color, alpha) => {
        ctx.fillStyle = color; ctx.globalAlpha = alpha;
        ctx.beginPath();
        for (let i = 0; i < pts * 2; i++) {
          const a = (i / (pts * 2)) * Math.PI * 2 + rot;
          const rad = i % 2 === 0 ? r : r * 0.42;
          i === 0 ? ctx.moveTo(cx + Math.cos(a) * rad, cy + Math.sin(a) * rad)
                   : ctx.lineTo(cx + Math.cos(a) * rad, cy + Math.sin(a) * rad);
        }
        ctx.closePath(); ctx.fill();
      };
      const loop = () => {
        t += 0.007;
        ctx.fillStyle = "#0a0618"; ctx.fillRect(0, 0, c.width, c.height);
        ctx.globalAlpha = 1;
        const mx = (mouse.x / c.width - 0.5) * 8, my = (mouse.y / c.height - 0.5) * 8;
        for (let row = -1; row < rows; row++) {
          for (let col = -1; col < cols; col++) {
            const cx = col * TILE + (row % 2) * TILE * 0.5 + mx;
            const cy = row * TILE * 0.866 + my;
            const dist = Math.hypot(cx - c.width / 2, cy - c.height / 2);
            const pulse = Math.sin(t * 1.2 - dist * 0.008) * 0.5 + 0.5;
            const hue1 = (t * 12 + dist * 0.15) % 360;
            // background hex
            ctx.fillStyle = `hsla(${240 + Math.sin(t * 0.3 + dist * 0.01) * 30},60%,${10 + pulse * 8}%,1)`;
            ctx.globalAlpha = 1;
            ctx.beginPath(); ctx.arc(cx, cy, TILE * 0.5, 0, Math.PI * 2); ctx.fill();
            // 8-point star
            drawStar(cx, cy, TILE * 0.36, 8, t * 0.06 + dist * 0.002,
              `hsla(${hue1},80%,55%,1)`, 0.7 + pulse * 0.25);
            // inner star
            drawStar(cx, cy, TILE * 0.18, 6, -t * 0.1 + dist * 0.003,
              `hsla(${40 + pulse * 20},90%,65%,1)`, 0.8);
            // center dot
            ctx.fillStyle = `hsla(${hue1 + 120},80%,80%,0.9)`;
            ctx.globalAlpha = pulse * 0.9;
            ctx.beginPath(); ctx.arc(cx, cy, TILE * 0.06, 0, Math.PI * 2); ctx.fill();
          }
        }
        ctx.globalAlpha = 1;
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },

  {
    name: "Indian Rangoli Mandala",
    tags: ["indian", "rangoli", "spiritual", "vibrant"],
    description: "Vibrant rangoli mandala unfurls layer by layer with colored powder dust and symmetrical bloom",
    code: `// 16-fold radial symmetry with powder particle burst
for (let seg = 0; seg < 16; seg++) {
  ctx.save(); ctx.rotate((seg / 16) * PI * 2);
  if (seg % 2) ctx.scale(1, -1);
  drawRangoliSegment(r, bloom, hue);
  ctx.restore();
}`,
    animator: (c, ctx, mouse) => {
      let t = 0, id, dust = [];
      const cx = c.width / 2, cy = c.height / 2;
      const SEGS = 16;
      const spawnDust = (x, y, hue) => {
        for (let i = 0; i < 3; i++) dust.push({
          x, y, vx: (Math.random() - 0.5) * 2, vy: (Math.random() - 0.5) * 2,
          alpha: 0.7, size: Math.random() * 3 + 1, hue
        });
      };
      const drawSegment = (r, bloom, hue) => {
        // petal
        ctx.fillStyle = `hsla(${hue},90%,65%,0.7)`;
        ctx.beginPath(); ctx.moveTo(0, 0);
        ctx.bezierCurveTo(r * 0.3, -r * 0.4, r * 0.6, -r * 0.2, r * bloom, 0);
        ctx.bezierCurveTo(r * 0.6, r * 0.2, r * 0.3, r * 0.4, 0, 0);
        ctx.fill();
        // dot accent
        ctx.fillStyle = `hsla(${hue + 40},100%,80%,0.85)`;
        ctx.beginPath(); ctx.arc(r * bloom * 0.6, 0, r * 0.06, 0, Math.PI * 2); ctx.fill();
      };
      const loop = () => {
        t += 0.012;
        ctx.fillStyle = "rgba(4,2,8,0.2)"; ctx.fillRect(0, 0, c.width, c.height);
        const mDist = Math.hypot(mouse.x - cx, mouse.y - cy);
        const bloom = 0.6 + Math.sin(t * 0.6) * 0.2 + Math.min(0.2, mDist / c.width);
        // rings
        const rings = [
          { r: 40,  hue: 0,   pts: 8  },
          { r: 80,  hue: 45,  pts: 12 },
          { r: 120, hue: 120, pts: 16 },
          { r: 160, hue: 200, pts: 20 },
          { r: 200, hue: 280, pts: 24 },
        ];
        rings.forEach((ring, ri) => {
          const rHue = (ring.hue + t * 18) % 360;
          for (let s = 0; s < SEGS; s++) {
            ctx.save(); ctx.translate(cx, cy);
            ctx.rotate((s / SEGS) * Math.PI * 2 + t * 0.04 * (ri % 2 === 0 ? 1 : -1));
            if (s % 2) ctx.scale(1, -1);
            drawSegment(ring.r, bloom, rHue + s * 4);
            ctx.restore();
          }
          // ring circle
          ctx.strokeStyle = `hsla(${rHue + 60},70%,70%,0.3)`;
          ctx.lineWidth = 1; ctx.beginPath();
          ctx.arc(cx, cy, ring.r, 0, Math.PI * 2); ctx.stroke();
          // spawn dust occasionally
          if (Math.random() > 0.97) {
            const a = Math.random() * Math.PI * 2;
            spawnDust(cx + Math.cos(a) * ring.r, cy + Math.sin(a) * ring.r, rHue);
          }
        });
        // center gem
        ctx.globalCompositeOperation = "screen";
        const gg = ctx.createRadialGradient(cx, cy, 0, cx, cy, 28);
        gg.addColorStop(0, "rgba(255,255,255,0.9)");
        gg.addColorStop(0.4, `hsla(${t * 60 % 360},100%,65%,0.6)`);
        gg.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = gg; ctx.beginPath(); ctx.arc(cx, cy, 28, 0, Math.PI * 2); ctx.fill();
        ctx.globalCompositeOperation = "source-over";
        // dust particles
        dust.forEach((d, i) => {
          d.x += d.vx; d.y += d.vy; d.vx *= 0.96; d.vy *= 0.96; d.alpha -= 0.02;
          if (d.alpha <= 0) { dust.splice(i, 1); return; }
          ctx.fillStyle = `hsla(${d.hue},90%,70%,${d.alpha})`;
          ctx.beginPath(); ctx.arc(d.x, d.y, d.size, 0, Math.PI * 2); ctx.fill();
        });
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },

  {
    name: "Ottoman Iznik Tiles",
    tags: ["turkish", "ottoman", "ceramic", "ornament"],
    description: "Authentic Iznik ceramic tile patterns with cobalt blue, turquoise, red tulips and arabesques",
    code: `// Repeating tile grid with per-tile animated floral motif
tiles.forEach(tile => {
  drawTileBackground(tile, cobalt);
  drawTulip(tile.cx, tile.cy, tile.phase + t);
  drawArabesque(tile, t * 0.05);
});`,
    animator: (c, ctx, mouse) => {
      let t = 0, id;
      const TILE = 120;
      const cols = Math.ceil(c.width / TILE) + 2;
      const rows = Math.ceil(c.height / TILE) + 2;
      const drawTulip = (cx, cy, phase, size) => {
        const p = Math.sin(phase) * 0.15 + 0.85;
        // stem
        ctx.strokeStyle = "rgba(0,100,30,0.8)"; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(cx, cy + size * 0.5); ctx.lineTo(cx, cy); ctx.stroke();
        // petals
        [[-0.5, -0.3], [0, -1.1], [0.5, -0.3]].forEach(([ox, oy], i) => {
          const hue = i === 1 ? 355 : 5;
          ctx.fillStyle = `hsla(${hue},90%,50%,0.85)`;
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.bezierCurveTo(cx + ox * size * 0.9, cy + oy * size * 0.3, cx + ox * size * 0.7, cy + oy * size * p, cx, cy + oy * size * p * 0.6);
          ctx.bezierCurveTo(cx - ox * size * 0.7, cy + oy * size * p, cx - ox * size * 0.9, cy + oy * size * 0.3, cx, cy);
          ctx.fill();
        });
      };
      const loop = () => {
        t += 0.008;
        ctx.fillStyle = "#f5f0e8"; ctx.fillRect(0, 0, c.width, c.height);
        const mx = Math.sin(t * 0.2) * 5, my = Math.cos(t * 0.15) * 5;
        for (let row = -1; row < rows; row++) {
          for (let col = -1; col < cols; col++) {
            const tx = col * TILE + mx, ty = row * TILE + my;
            const cx = tx + TILE / 2, cy = ty + TILE / 2;
            const dist = Math.hypot(cx - c.width / 2, cy - c.height / 2);
            const phase = t * 0.8 + dist * 0.012;
            // tile base
            ctx.fillStyle = `rgba(0,50,140,${0.06 + Math.sin(phase) * 0.02})`;
            ctx.fillRect(tx, ty, TILE, TILE);
            // border
            ctx.strokeStyle = "rgba(0,80,160,0.4)"; ctx.lineWidth = 2;
            ctx.strokeRect(tx + 4, ty + 4, TILE - 8, TILE - 8);
            // corner rosettes
            [[tx+18,ty+18],[tx+TILE-18,ty+18],[tx+18,ty+TILE-18],[tx+TILE-18,ty+TILE-18]].forEach(([rx,ry]) => {
              ctx.strokeStyle = "rgba(0,140,160,0.6)"; ctx.lineWidth = 1;
              ctx.beginPath(); ctx.arc(rx, ry, 8, 0, Math.PI * 2); ctx.stroke();
              for (let i = 0; i < 6; i++) {
                const a = (i / 6) * Math.PI * 2 + t * 0.1;
                ctx.fillStyle = "rgba(0,140,160,0.5)";
                ctx.beginPath(); ctx.arc(rx + Math.cos(a) * 6, ry + Math.sin(a) * 6, 2, 0, Math.PI * 2); ctx.fill();
              }
            });
            drawTulip(cx, cy + 8, phase, 22);
            // arabesque arcs
            ctx.strokeStyle = "rgba(0,100,150,0.3)"; ctx.lineWidth = 1;
            for (let i = 0; i < 4; i++) {
              const a = (i / 4) * Math.PI * 2 + t * 0.05;
              ctx.beginPath(); ctx.arc(cx + Math.cos(a) * 18, cy + Math.sin(a) * 18, 12, a + Math.PI, a + Math.PI * 2); ctx.stroke();
            }
          }
        }
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },

  {
    name: "Mexican Día de Muertos",
    tags: ["mexican", "folk", "day-of-the-dead", "vibrant"],
    description: "Cempasúchil marigolds, papel picado lace patterns and glowing sugar skulls drift in celebration",
    code: `// Layered marigold + papel picado cutout overlay
marigolds.forEach(m => drawLayeredMarigold(m, t));
picado.forEach(p => drawLaceStrip(p, t)); // geometric cutouts
skulls.forEach(s => drawSugarSkull(s, t));`,
    animator: (c, ctx, mouse) => {
      let t = 0, id;
      const marigolds = Array.from({ length: 14 }, () => ({
        x: Math.random() * c.width, y: Math.random() * c.height,
        vx: (Math.random() - 0.5) * 0.7, vy: (Math.random() - 0.5) * 0.5,
        phase: Math.random() * Math.PI * 2, size: 22 + Math.random() * 18
      }));
      const drawMarigold = (bx, by, size, phase) => {
        ctx.save(); ctx.translate(bx, by); ctx.rotate(Math.sin(t * 0.5 + phase) * 0.15);
        for (let layer = 2; layer >= 0; layer--) {
          const r = size * (0.5 + layer * 0.2);
          const petals = 12 + layer * 4;
          const hue = 28 + layer * 12 + Math.sin(t + phase) * 8;
          for (let p = 0; p < petals; p++) {
            const a = (p / petals) * Math.PI * 2 + t * 0.08 * (layer % 2 === 0 ? 1 : -1);
            ctx.save(); ctx.rotate(a);
            const g = ctx.createLinearGradient(0, 0, 0, -r);
            g.addColorStop(0, `hsla(${hue},100%,55%,0.9)`);
            g.addColorStop(1, `hsla(${hue + 15},90%,70%,0.5)`);
            ctx.fillStyle = g;
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.bezierCurveTo(-r * 0.25, -r * 0.4, -r * 0.2, -r * 0.85, 0, -r);
            ctx.bezierCurveTo(r * 0.2, -r * 0.85, r * 0.25, -r * 0.4, 0, 0);
            ctx.fill(); ctx.restore();
          }
        }
        // golden center
        ctx.globalCompositeOperation = "screen";
        const cg = ctx.createRadialGradient(0, 0, 0, 0, 0, size * 0.2);
        cg.addColorStop(0, "rgba(255,220,50,0.95)"); cg.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = cg; ctx.beginPath(); ctx.arc(0, 0, size * 0.2, 0, Math.PI * 2); ctx.fill();
        ctx.globalCompositeOperation = "source-over";
        ctx.restore();
      };
      const drawPicadoBanner = (y, col) => {
        const w = 40, h = 30, spacing = 50;
        for (let x = 0; x < c.width; x += spacing) {
          const hue = (col * 60 + x * 0.5 + t * 15) % 360;
          ctx.fillStyle = `hsla(${hue},90%,55%,0.6)`;
          ctx.fillRect(x, y, w, h);
          // cut out triangles
          ctx.fillStyle = "rgba(4,2,8,1)";
          ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + w / 2, y + 10); ctx.lineTo(x + w, y); ctx.fill();
          ctx.beginPath(); ctx.moveTo(x + w / 4, y + h); ctx.lineTo(x + w / 2, y + h - 10); ctx.lineTo(x + w * 0.75, y + h); ctx.fill();
        }
      };
      const loop = () => {
        t += 0.012;
        ctx.fillStyle = "rgba(4,2,8,0.2)"; ctx.fillRect(0, 0, c.width, c.height);
        // banners
        for (let b = 0; b < 4; b++) {
          const y = (b / 4) * c.height * 0.7 + Math.sin(t * 0.3 + b) * 10;
          drawPicadoBanner(y, b);
        }
        // marigolds
        marigolds.forEach(m => {
          m.x += m.vx + Math.sin(t * 0.7 + m.phase) * 0.4;
          m.y += m.vy + Math.cos(t * 0.5 + m.phase) * 0.3;
          if (m.x < -40) m.x = c.width + 40; if (m.x > c.width + 40) m.x = -40;
          if (m.y < -40) m.y = c.height + 40; if (m.y > c.height + 40) m.y = -40;
          drawMarigold(m.x, m.y, m.size, m.phase);
        });
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },

  {
    name: "Egyptian Solar Bloom",
    tags: ["egyptian", "floral", "ancient", "symbolic"],
    description: "Sacred lotus and solar disk motifs rise in tiers of lapis lazuli, gold and carnelian glow",
    code: `// Hieroglyphic lotus rising with Ra's golden disk
ctx.save(); ctx.translate(x, y);
drawSolarDisk(r, goldGradient);
for (let p = 0; p < 8; p++) drawLotusPane(p, bloom, t);
drawWaterLines(y, cyan);
ctx.restore();`,
    animator: (c, ctx, mouse) => {
      let t = 0, id;
      const lotuses = Array.from({ length: 5 }, (_, i) => ({
        x: c.width * (0.12 + i * 0.19),
        y: c.height * 0.65,
        size: 38 + Math.random() * 22,
        phase: i * 1.1,
        bloom: 0
      }));
      const drawLotus = (lx, ly, size, bloom, phase) => {
        ctx.save(); ctx.translate(lx, ly);
        // stem
        ctx.strokeStyle = "rgba(0,120,80,0.7)"; ctx.lineWidth = 3;
        ctx.beginPath(); ctx.moveTo(0, 80); ctx.quadraticCurveTo(Math.sin(t + phase) * 12, 40, 0, 0); ctx.stroke();
        // water ripple
        ctx.strokeStyle = "rgba(30,140,180,0.25)"; ctx.lineWidth = 1;
        for (let r = 1; r <= 3; r++) {
          ctx.beginPath(); ctx.ellipse(0, 85, r * 22, r * 5, 0, 0, Math.PI * 2); ctx.stroke();
        }
        // petals
        const petals = 8;
        for (let p = 0; p < petals; p++) {
          const a = (p / petals) * Math.PI * 2;
          const openAngle = bloom * 1.1;
          ctx.save(); ctx.rotate(a); ctx.rotate(-openAngle);
          const g = ctx.createLinearGradient(0, 0, 0, -size);
          g.addColorStop(0, `hsla(200,70%,45%,0.85)`);
          g.addColorStop(0.5, `hsla(185,80%,65%,0.7)`);
          g.addColorStop(1, `hsla(170,60%,80%,0.3)`);
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.bezierCurveTo(-size * 0.3, -size * 0.4, -size * 0.25, -size * 0.85, 0, -size);
          ctx.bezierCurveTo(size * 0.25, -size * 0.85, size * 0.3, -size * 0.4, 0, 0);
          ctx.fill(); ctx.restore();
        }
        // solar disk
        if (bloom > 0.5) {
          ctx.globalCompositeOperation = "screen";
          const sg = ctx.createRadialGradient(0, -size * 0.1, 0, 0, -size * 0.1, size * 0.3 * bloom);
          sg.addColorStop(0, `rgba(255,210,50,${0.95 * bloom})`);
          sg.addColorStop(0.5, `rgba(255,150,20,${0.5 * bloom})`);
          sg.addColorStop(1, "rgba(0,0,0,0)");
          ctx.fillStyle = sg; ctx.beginPath(); ctx.arc(0, -size * 0.1, size * 0.3 * bloom, 0, Math.PI * 2); ctx.fill();
          ctx.globalCompositeOperation = "source-over";
        }
        ctx.restore();
      };
      const loop = () => {
        t += 0.01;
        ctx.fillStyle = "rgba(5,8,18,0.18)"; ctx.fillRect(0, 0, c.width, c.height);
        // Nile water base
        ctx.fillStyle = "rgba(0,60,120,0.12)";
        ctx.fillRect(0, c.height * 0.75, c.width, c.height * 0.25);
        // water shimmer
        ctx.globalCompositeOperation = "screen";
        for (let i = 0; i < c.width; i += 18) {
          const wy = c.height * 0.75 + Math.sin(i * 0.04 + t * 1.5) * 4;
          ctx.strokeStyle = `rgba(0,180,200,${0.04 + Math.sin(i * 0.1 + t) * 0.02})`;
          ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(i, wy); ctx.lineTo(i + 12, wy); ctx.stroke();
        }
        ctx.globalCompositeOperation = "source-over";
        lotuses.forEach(l => {
          l.bloom = Math.min(1, l.bloom + 0.004 + Math.sin(t * 0.5 + l.phase) * 0.001);
          drawLotus(l.x, l.y, l.size, l.bloom, l.phase);
        });
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },

  {
    name: "Russian Khokhloma Gold",
    tags: ["russian", "folk", "floral", "ornament"],
    description: "Deep lacquerware swirls with crimson berries, golden leaves and black-red folk patterns on rich ground",
    code: `// Folk motif system: berries, leaves, curlicues
const drawKhokhlomaLeaf = (x, y, size, angle) => {
  ctx.strokeStyle = goldGradient;
  ctx.bezierCurveTo(...);  // leaf vein
  ctx.fillStyle = 'hsl(40,90%,55%)'; // gold fill
};`,
    animator: (c, ctx, mouse) => {
      let t = 0, id;
      const motifs = Array.from({ length: 35 }, () => ({
        x: Math.random() * c.width, y: Math.random() * c.height,
        vx: (Math.random() - 0.5) * 0.6, vy: (Math.random() - 0.5) * 0.5,
        phase: Math.random() * Math.PI * 2, type: ['berry', 'leaf', 'swirl'][Math.floor(Math.random() * 3)],
        size: 14 + Math.random() * 12, rot: Math.random() * Math.PI * 2
      }));
      const drawBerry = (size, phase) => {
        // main berry
        const bg = ctx.createRadialGradient(-size * 0.25, -size * 0.3, 0, 0, 0, size);
        bg.addColorStop(0, "#ff5555"); bg.addColorStop(0.6, "#c62020"); bg.addColorStop(1, "#7a0a0a");
        ctx.fillStyle = bg; ctx.beginPath(); ctx.arc(0, 0, size, 0, Math.PI * 2); ctx.fill();
        // highlight
        ctx.fillStyle = "rgba(255,180,160,0.6)";
        ctx.beginPath(); ctx.ellipse(-size * 0.28, -size * 0.3, size * 0.28, size * 0.2, -0.5, 0, Math.PI * 2); ctx.fill();
        // small secondary berries
        [[size * 1.4, -size * 0.5, 0.55], [-size * 1.4, -size * 0.4, 0.5]].forEach(([bx, by, sc]) => {
          ctx.fillStyle = "#d42020";
          ctx.beginPath(); ctx.arc(bx, by, size * sc, 0, Math.PI * 2); ctx.fill();
        });
      };
      const drawLeaf = (size) => {
        const lg = ctx.createLinearGradient(-size, 0, size, 0);
        lg.addColorStop(0, "#cc8800"); lg.addColorStop(0.5, "#ffcc00"); lg.addColorStop(1, "#cc8800");
        ctx.fillStyle = lg;
        ctx.beginPath();
        ctx.moveTo(0, -size * 1.3);
        ctx.bezierCurveTo(size * 0.8, -size * 0.8, size * 0.9, size * 0.3, 0, size * 0.6);
        ctx.bezierCurveTo(-size * 0.9, size * 0.3, -size * 0.8, -size * 0.8, 0, -size * 1.3);
        ctx.fill();
        // vein
        ctx.strokeStyle = "rgba(180,100,0,0.6)"; ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.moveTo(0, -size * 1.2); ctx.lineTo(0, size * 0.5); ctx.stroke();
      };
      const drawSwirl = (size, phase) => {
        ctx.strokeStyle = `hsla(40,90%,55%,0.8)`; ctx.lineWidth = 2.5;
        ctx.beginPath();
        for (let a = 0; a < Math.PI * 4; a += 0.1) {
          const r = a * size * 0.1;
          const x = Math.cos(a + phase) * r, y = Math.sin(a + phase) * r;
          a === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.stroke();
      };
      const loop = () => {
        t += 0.009;
        ctx.fillStyle = "rgba(10,4,2,0.1)"; ctx.fillRect(0, 0, c.width, c.height);
        motifs.forEach(m => {
          m.x += m.vx + Math.sin(t * 0.5 + m.phase) * 0.3;
          m.y += m.vy + Math.cos(t * 0.4 + m.phase) * 0.25;
          m.rot += Math.sin(t * 0.3 + m.phase) * 0.008;
          if (m.x < -40) m.x = c.width + 40; if (m.x > c.width + 40) m.x = -40;
          if (m.y < -40) m.y = c.height + 40; if (m.y > c.height + 40) m.y = -40;
          ctx.save(); ctx.translate(m.x, m.y); ctx.rotate(m.rot);
          if (m.type === 'berry') drawBerry(m.size, m.phase);
          else if (m.type === 'leaf') drawLeaf(m.size);
          else drawSwirl(m.size, m.phase + t);
          ctx.restore();
        });
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },

  {
    name: "Korean Minhwa Garden",
    tags: ["korean", "minhwa", "folk-painting", "nature"],
    description: "Folk painting-style magpies, pine branches, chrysanthemums and longevity rocks in serene composition",
    code: `// Flat-style folk painting with bold outlines
drawPineBranch(x, y, angle, depth);
drawChrysanthemum(cx, cy, petals, hue);
drawMagpie(x, y, wingPhase); // good luck bird`,
    animator: (c, ctx, mouse) => {
      let t = 0, id;
      const flowers = Array.from({ length: 8 }, () => ({
        x: Math.random() * c.width, y: Math.random() * c.height,
        phase: Math.random() * Math.PI * 2, size: 28 + Math.random() * 20,
        hue: [340, 45, 200, 120][Math.floor(Math.random() * 4)]
      }));
      const drawChrysanthemum = (x, y, size, hue, phase) => {
        const petals = 16;
        for (let layer = 2; layer >= 0; layer--) {
          const r = size * (0.45 + layer * 0.22);
          const lHue = hue + layer * 15;
          for (let p = 0; p < petals; p++) {
            const a = (p / petals) * Math.PI * 2 + layer * 0.3 + t * 0.05;
            ctx.save(); ctx.translate(x, y); ctx.rotate(a);
            ctx.fillStyle = `hsla(${lHue},85%,${55 + layer * 12}%,${0.75 + Math.sin(t + phase + p) * 0.15})`;
            ctx.strokeStyle = `hsla(${lHue - 20},70%,35%,0.5)`; ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.bezierCurveTo(-r * 0.22, -r * 0.35, -r * 0.18, -r * 0.85, 0, -r);
            ctx.bezierCurveTo(r * 0.18, -r * 0.85, r * 0.22, -r * 0.35, 0, 0);
            ctx.fill(); ctx.stroke(); ctx.restore();
          }
        }
        // center
        const cg = ctx.createRadialGradient(x, y, 0, x, y, size * 0.18);
        cg.addColorStop(0, `hsla(${hue + 30},100%,80%,1)`); cg.addColorStop(1, `hsla(${hue},90%,50%,0.5)`);
        ctx.fillStyle = cg; ctx.beginPath(); ctx.arc(x, y, size * 0.18, 0, Math.PI * 2); ctx.fill();
      };
      const drawPineBranch = (x, y) => {
        ctx.strokeStyle = "rgba(40,70,20,0.65)"; ctx.lineWidth = 2.5;
        ctx.beginPath(); ctx.moveTo(x, y);
        for (let i = 0; i < 6; i++) {
          const a = -0.6 + i * 0.24 + Math.sin(t * 0.2 + i) * 0.04;
          const len = 40 + i * 8;
          const bx = x + Math.cos(a) * len, by = y + Math.sin(a) * len;
          ctx.lineTo(bx, by);
          // needles
          ctx.save(); ctx.translate(bx, by); ctx.rotate(a);
          ctx.strokeStyle = "rgba(30,90,20,0.6)"; ctx.lineWidth = 1;
          for (let n = -3; n <= 3; n++) {
            ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(n * 5, -12 + Math.abs(n) * 2); ctx.stroke();
          }
          ctx.restore();
          ctx.beginPath(); ctx.moveTo(x + Math.cos(a) * len * 0.5, y + Math.sin(a) * len * 0.5);
        }
        ctx.stroke();
      };
      const loop = () => {
        t += 0.011;
        ctx.fillStyle = "rgba(248,244,235,0.12)"; ctx.fillRect(0, 0, c.width, c.height);
        // pine branches in corners
        ctx.save(); ctx.translate(0, c.height * 0.2 + Math.sin(t * 0.15) * 5); drawPineBranch(0, 0); ctx.restore();
        ctx.save(); ctx.translate(c.width, c.height * 0.3 + Math.sin(t * 0.2) * 5); ctx.scale(-1, 1); drawPineBranch(0, 0); ctx.restore();
        flowers.forEach(f => drawChrysanthemum(
          f.x + Math.sin(t * 0.3 + f.phase) * 8,
          f.y + Math.cos(t * 0.25 + f.phase) * 5,
          f.size, f.hue, f.phase
        ));
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },

  {
    name: "Thai Temple Gold",
    tags: ["thai", "temple", "golden", "sacred"],
    description: "Kinnara wing-like gilded petals and naga serpent curves spiral in the style of Wat Pho murals",
    code: `// Tiered celestial canopy with gilded concentric forms
for (let tier = 0; tier < 5; tier++) {
  const r = baseR + tier * step;
  const points = 7 + tier * 2;
  drawGildedTier(cx, cy, r, points, t + tier*0.3);
  drawNagaCurve(cx, cy, r * 1.1, t - tier*0.15);
}`,
    animator: (c, ctx, mouse) => {
      let t = 0, id;
      const cx = c.width / 2, cy = c.height / 2;
      const drawGildedTier = (r, pts, rotOffset) => {
        const g = ctx.createLinearGradient(-r, 0, r, 0);
        g.addColorStop(0, "rgba(180,120,10,0.7)");
        g.addColorStop(0.5, "rgba(255,215,50,0.9)");
        g.addColorStop(1, "rgba(180,120,10,0.7)");
        ctx.strokeStyle = g; ctx.lineWidth = 2.5;
        ctx.beginPath();
        for (let i = 0; i <= pts; i++) {
          const a = (i / pts) * Math.PI * 2 + rotOffset;
          const rr = r + Math.sin(a * 3 + t * 1.5) * r * 0.08;
          i === 0 ? ctx.moveTo(cx + Math.cos(a) * rr, cy + Math.sin(a) * rr)
                   : ctx.lineTo(cx + Math.cos(a) * rr, cy + Math.sin(a) * rr);
        }
        ctx.stroke();
        // spire points
        for (let i = 0; i < pts; i++) {
          const a = (i / pts) * Math.PI * 2 + rotOffset;
          const px = cx + Math.cos(a) * r, py = cy + Math.sin(a) * r;
          ctx.globalCompositeOperation = "screen";
          const pg = ctx.createRadialGradient(px, py, 0, px, py, 10);
          pg.addColorStop(0, "rgba(255,230,100,0.7)"); pg.addColorStop(1, "rgba(0,0,0,0)");
          ctx.fillStyle = pg; ctx.beginPath(); ctx.arc(px, py, 10, 0, Math.PI * 2); ctx.fill();
          ctx.globalCompositeOperation = "source-over";
        }
      };
      const loop = () => {
        t += 0.009;
        ctx.fillStyle = "rgba(8,4,0,0.2)"; ctx.fillRect(0, 0, c.width, c.height);
        const mouseInfluence = (mouse.x - cx) / cx * 0.3;
        for (let tier = 5; tier >= 0; tier--) {
          const r = 40 + tier * 38;
          const pts = 7 + tier * 2;
          drawGildedTier(r, pts, t * (tier % 2 === 0 ? 0.08 : -0.06) + mouseInfluence);
        }
        // center sacred gem
        ctx.globalCompositeOperation = "screen";
        const sg = ctx.createRadialGradient(cx, cy, 0, cx, cy, 35);
        sg.addColorStop(0, "rgba(255,240,160,0.95)");
        sg.addColorStop(0.4, "rgba(255,180,40,0.6)");
        sg.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = sg; ctx.beginPath(); ctx.arc(cx, cy, 35, 0, Math.PI * 2); ctx.fill();
        ctx.globalCompositeOperation = "source-over";
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },

  {
    name: "Moroccan Zellige Stars",
    tags: ["moroccan", "geometric", "islamic", "tiles"],
    description: "Hand-cut zellige tilework with interlocking stars in terracotta, cobalt and ivory — animated with light shimmer",
    code: `// Interlocking star/cross grid with alternating fill
const SHAPES = buildZelligeGrid(cols, rows, tileSize);
SHAPES.forEach(shape => {
  ctx.fillStyle = palette[shape.colorIdx];
  ctx.shadowColor = shape.lit ? lightColor : 'transparent';
  drawZelligeShape(shape.vertices);
});`,
    animator: (c, ctx, mouse) => {
      let t = 0, id;
      const SIZE = 50;
      const palette = ["#c0392b","#2471a3","#f5cba7","#1a5276","#e8d5b7","#922b21"];
      const cols = Math.ceil(c.width / SIZE) + 3;
      const rows = Math.ceil(c.height / SIZE) + 3;
      const drawStar = (cx, cy, r, pts, rot, colorIdx, lit) => {
        const col = palette[colorIdx % palette.length];
        ctx.fillStyle = col;
        if (lit) { ctx.shadowBlur = 8; ctx.shadowColor = "rgba(255,220,150,0.5)"; }
        else ctx.shadowBlur = 0;
        ctx.beginPath();
        for (let i = 0; i < pts * 2; i++) {
          const a = (i / (pts * 2)) * Math.PI * 2 + rot;
          const rad = i % 2 === 0 ? r : r * 0.45;
          i === 0 ? ctx.moveTo(cx + Math.cos(a) * rad, cy + Math.sin(a) * rad)
                   : ctx.lineTo(cx + Math.cos(a) * rad, cy + Math.sin(a) * rad);
        }
        ctx.closePath(); ctx.fill();
        ctx.shadowBlur = 0;
        // grout line
        ctx.strokeStyle = "rgba(220,210,195,0.6)"; ctx.lineWidth = 1.2; ctx.stroke();
      };
      const loop = () => {
        t += 0.006;
        ctx.fillStyle = "#e8ddd0"; ctx.fillRect(0, 0, c.width, c.height);
        const lightX = mouse.x, lightY = mouse.y;
        for (let row = -1; row < rows; row++) {
          for (let col = -1; col < cols; col++) {
            const tx = col * SIZE - ((t * 8) % SIZE), ty = row * SIZE;
            const dist = Math.hypot(tx + SIZE / 2 - lightX, ty + SIZE / 2 - lightY);
            const lit = dist < 160;
            const colorIdx = (row * 3 + col * 2 + Math.floor(t * 0.5)) % palette.length;
            const rot = t * 0.04 * ((row + col) % 2 === 0 ? 1 : -1);
            drawStar(tx + SIZE / 2, ty + SIZE / 2, SIZE * 0.42, 6, rot, colorIdx, lit);
            // interstitial cross
            drawStar(tx + SIZE, ty + SIZE / 2, SIZE * 0.22, 4, rot + 0.5, (colorIdx + 2) % palette.length, lit);
          }
        }
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },
    // ─────────────────────────────────────────────────
//  CULTURAL EFFECTS — NEW COUNTRIES EXPANSION
//  Add these entries into your culturalEffects array
// ─────────────────────────────────────────────────

  {
    name: "Aztec Sun Stone",
    tags: ["mexican", "aztec", "ancient", "geometric"],
    description: "The Aztec calendar stone rotates in concentric rings of glyphs, serpents and solar fire",
    code: `// Concentric glyph rings counter-rotating with solar burst
for (let ring = 0; ring < 5; ring++) {
  ctx.rotate(t * speed * (ring%2===0?1:-1));
  drawGlyphRing(r, glyphCount, hue);
}
drawSolarBurst(cx, cy, rays, t);`,
    animator: (c, ctx, mouse) => {
      let t = 0, id;
      const cx = c.width / 2, cy = c.height / 2;
      const drawGlyphRing = (r, count, hue, thick) => {
        for (let i = 0; i < count; i++) {
          const a = (i / count) * Math.PI * 2;
          const gx = cx + Math.cos(a) * r, gy = cy + Math.sin(a) * r;
          ctx.save(); ctx.translate(gx, gy); ctx.rotate(a + Math.PI / 2);
          ctx.fillStyle = `hsla(${hue},80%,55%,0.85)`;
          ctx.strokeStyle = `hsla(${hue - 20},70%,35%,0.6)`;
          ctx.lineWidth = 0.8;
          // glyph block
          ctx.beginPath();
          ctx.rect(-thick / 2, -thick / 2, thick, thick);
          ctx.fill(); ctx.stroke();
          // inner dot
          ctx.fillStyle = `hsla(${hue + 30},90%,75%,0.7)`;
          ctx.beginPath(); ctx.arc(0, 0, thick * 0.18, 0, Math.PI * 2); ctx.fill();
          ctx.restore();
        }
      };
      const drawSerpent = (r, phase) => {
        ctx.strokeStyle = "rgba(200,80,20,0.7)"; ctx.lineWidth = 4;
        ctx.beginPath();
        for (let i = 0; i <= 60; i++) {
          const a = (i / 60) * Math.PI * 2;
          const rr = r + Math.sin(a * 8 + phase) * 8;
          i === 0 ? ctx.moveTo(cx + Math.cos(a) * rr, cy + Math.sin(a) * rr)
                   : ctx.lineTo(cx + Math.cos(a) * rr, cy + Math.sin(a) * rr);
        }
        ctx.stroke();
      };
      const loop = () => {
        t += 0.008;
        ctx.fillStyle = "rgba(8,4,0,0.2)"; ctx.fillRect(0, 0, c.width, c.height);
        const rings = [
          { r: 42,  count: 4,  hue: 200, thick: 18 },
          { r: 78,  count: 10, hue: 30,  thick: 14 },
          { r: 112, count: 16, hue: 45,  thick: 12 },
          { r: 148, count: 20, hue: 20,  thick: 10 },
          { r: 185, count: 28, hue: 35,  thick: 8  },
        ];
        rings.forEach((ring, ri) => {
          ctx.save(); ctx.translate(0, 0);
          // slight rotation per ring
          const rot = t * (ri % 2 === 0 ? 0.12 : -0.09) + ri * 0.4;
          // draw by rotating context around center
          ctx.save();
          const hueShift = (ring.hue + t * 10) % 360;
          // ring border circle
          ctx.strokeStyle = `hsla(${hueShift},60%,40%,0.5)`; ctx.lineWidth = 2;
          ctx.beginPath(); ctx.arc(cx, cy, ring.r, 0, Math.PI * 2); ctx.stroke();
          // glyphs around ring
          for (let i = 0; i < ring.count; i++) {
            const a = (i / ring.count) * Math.PI * 2 + rot;
            const gx = cx + Math.cos(a) * ring.r, gy = cy + Math.sin(a) * ring.r;
            ctx.save(); ctx.translate(gx, gy); ctx.rotate(a + Math.PI / 2);
            ctx.fillStyle = `hsla(${hueShift + i * 5},80%,${45 + ri * 5}%,0.9)`;
            ctx.strokeStyle = `hsla(${hueShift},60%,25%,0.5)`; ctx.lineWidth = 0.8;
            const s = ring.thick;
            ctx.beginPath(); ctx.rect(-s / 2, -s / 2, s, s); ctx.fill(); ctx.stroke();
            ctx.fillStyle = `hsla(${hueShift + 40},90%,80%,0.6)`;
            ctx.beginPath(); ctx.arc(0, 0, s * 0.2, 0, Math.PI * 2); ctx.fill();
            ctx.restore();
          }
          ctx.restore(); ctx.restore();
        });
        drawSerpent(175, t * 2);
        // solar burst from center
        ctx.globalCompositeOperation = "screen";
        for (let i = 0; i < 20; i++) {
          const a = (i / 20) * Math.PI * 2 + t * 0.15;
          const len = 35 + Math.sin(i * 1.5 + t * 3) * 10;
          const g = ctx.createLinearGradient(cx, cy, cx + Math.cos(a) * len, cy + Math.sin(a) * len);
          g.addColorStop(0, "rgba(255,180,30,0.8)"); g.addColorStop(1, "rgba(255,80,0,0)");
          ctx.strokeStyle = g; ctx.lineWidth = 2.5;
          ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + Math.cos(a) * len, cy + Math.sin(a) * len); ctx.stroke();
        }
        const fc = ctx.createRadialGradient(cx, cy, 0, cx, cy, 30);
        fc.addColorStop(0, "rgba(255,220,80,1)"); fc.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = fc; ctx.beginPath(); ctx.arc(cx, cy, 30, 0, Math.PI * 2); ctx.fill();
        ctx.globalCompositeOperation = "source-over";
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },

  {
    name: "Nigerian Adire Cloth",
    tags: ["nigerian", "yoruba", "textile", "pattern"],
    description: "Adire eleko indigo resist-dye patterns ripple and bloom with hand-painted batik symmetry",
    code: `// Resist-dye simulation: wax-resist circles + indigo flood fill
resists.forEach(r => {
  ctx.strokeStyle = waxColor;
  ctx.arc(r.x, r.y, r.radius, 0, PI*2); // wax ring
});
ctx.fillStyle = indigoGradient; // dye floods between
// Geometric Yoruba motifs: aya (fern), ojuelegba (crossroads)`,
    animator: (c, ctx, mouse) => {
      let t = 0, id;
      const GRID = 70;
      const cols = Math.ceil(c.width / GRID) + 2;
      const rows = Math.ceil(c.height / GRID) + 2;
      const drawAdireCell = (cx, cy, phase, variant) => {
        const p = Math.sin(phase + t * 0.6) * 0.5 + 0.5;
        const indigoL = 25 + p * 15;
        // background indigo
        ctx.fillStyle = `hsl(225,65%,${indigoL}%)`; 
        ctx.fillRect(cx - GRID/2, cy - GRID/2, GRID, GRID);
        ctx.strokeStyle = `hsla(50,80%,85%,${0.5 + p * 0.35})`; ctx.lineWidth = 1.2;
        if (variant % 3 === 0) {
          // concentric circles (resist dots)
          for (let r = 6; r < 28; r += 7) {
            ctx.beginPath(); ctx.arc(cx, cy, r + Math.sin(t + phase) * 2, 0, Math.PI * 2); ctx.stroke();
          }
          // cross
          ctx.beginPath(); ctx.moveTo(cx - 24, cy); ctx.lineTo(cx + 24, cy);
          ctx.moveTo(cx, cy - 24); ctx.moveTo(cx, cy + 24); ctx.stroke();
        } else if (variant % 3 === 1) {
          // diagonal fern (aya)
          for (let i = -3; i <= 3; i++) {
            const lx = cx + i * 8, llen = 18 - Math.abs(i) * 2;
            ctx.beginPath(); ctx.moveTo(lx, cy - llen); ctx.lineTo(lx, cy + llen); ctx.stroke();
            for (let b = -2; b <= 2; b++) {
              ctx.beginPath(); ctx.moveTo(lx, cy + b * 6);
              ctx.lineTo(lx + 8, cy + b * 6 - 4); ctx.stroke();
            }
          }
        } else {
          // diamond grid
          ctx.beginPath();
          ctx.moveTo(cx, cy - 26); ctx.lineTo(cx + 26, cy);
          ctx.lineTo(cx, cy + 26); ctx.lineTo(cx - 26, cy); ctx.closePath(); ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(cx, cy - 14); ctx.lineTo(cx + 14, cy);
          ctx.lineTo(cx, cy + 14); ctx.lineTo(cx - 14, cy); ctx.closePath(); ctx.stroke();
          ctx.fillStyle = `hsla(50,80%,80%,${0.3 + p * 0.2})`;
          ctx.beginPath(); ctx.arc(cx, cy, 4, 0, Math.PI * 2); ctx.fill();
        }
      };
      const loop = () => {
        t += 0.007;
        ctx.fillStyle = "#0d1a3a"; ctx.fillRect(0, 0, c.width, c.height);
        const mx = Math.sin(t * 0.1) * 5;
        for (let row = -1; row < rows; row++) {
          for (let col = -1; col < cols; col++) {
            const tx = col * GRID + mx, ty = row * GRID;
            const dist = Math.hypot(tx + GRID/2 - mouse.x, ty + GRID/2 - mouse.y);
            const phase = dist * 0.02 - t * 0.5;
            drawAdireCell(tx + GRID/2, ty + GRID/2, phase, row * cols + col);
          }
        }
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },

  {
    name: "Andean Chakana Cross",
    tags: ["peruvian", "andean", "inca", "geometric"],
    description: "The Inca stepped cross (Chakana) pulses with Andean textile colors, condors and sacred geometry",
    code: `// Stepped cross with 3-level staircase profile
const drawChakana = (cx, cy, r, rot) => {
  const steps = 3;
  for (let arm = 0; arm < 4; arm++) {
    ctx.rotate(arm * PI/2 + rot);
    drawStaircaseArm(r, steps);  // each arm has 3 notches
  }
  ctx.arc(cx, cy, r*0.15, 0, PI*2); // center circle
};`,
    animator: (c, ctx, mouse) => {
      let t = 0, id;
      const chakanas = Array.from({ length: 6 }, (_, i) => ({
        x: c.width * (0.15 + (i % 3) * 0.35),
        y: c.height * (0.25 + Math.floor(i / 3) * 0.5),
        size: 55 + Math.random() * 30,
        phase: i * 1.1,
        rot: Math.random() * Math.PI * 2
      }));
      const drawChakana = (cx, cy, size, rot, hue) => {
        ctx.save(); ctx.translate(cx, cy); ctx.rotate(rot);
        // stepped cross shape
        const s = size;
        const stepPath = () => {
          ctx.beginPath();
          // right arm with 3 steps
          const S = s / 3;
          ctx.moveTo(S, -S); ctx.lineTo(s, -S); ctx.lineTo(s, S);
          ctx.lineTo(2*S, S); ctx.lineTo(2*S, 2*S); ctx.lineTo(S, 2*S);
          // bottom arm
          ctx.lineTo(S, s); ctx.lineTo(-S, s); ctx.lineTo(-S, 2*S);
          ctx.lineTo(-2*S, 2*S); ctx.lineTo(-2*S, S); ctx.lineTo(-s, S);
          // left arm
          ctx.lineTo(-s, -S); ctx.lineTo(-2*S, -S); ctx.lineTo(-2*S, -2*S);
          ctx.lineTo(-S, -2*S); ctx.lineTo(-S, -s);
          // top arm
          ctx.lineTo(S, -s); ctx.lineTo(S, -2*S); ctx.lineTo(2*S, -2*S);
          ctx.lineTo(2*S, -S); ctx.lineTo(s, -S);
          ctx.closePath();
        };
        const g = ctx.createLinearGradient(-s, -s, s, s);
        g.addColorStop(0, `hsla(${hue},85%,45%,0.9)`);
        g.addColorStop(0.5, `hsla(${hue + 30},90%,55%,0.95)`);
        g.addColorStop(1, `hsla(${hue + 60},80%,40%,0.9)`);
        ctx.fillStyle = g;
        stepPath(); ctx.fill();
        ctx.strokeStyle = `hsla(${hue + 40},70%,75%,0.7)`; ctx.lineWidth = 1.5;
        stepPath(); ctx.stroke();
        // center hole circle
        ctx.globalCompositeOperation = "destination-out";
        ctx.beginPath(); ctx.arc(0, 0, s * 0.18, 0, Math.PI * 2); ctx.fill();
        ctx.globalCompositeOperation = "source-over";
        // center ring
        ctx.strokeStyle = `hsla(${hue + 60},90%,75%,0.9)`; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.arc(0, 0, s * 0.18, 0, Math.PI * 2); ctx.stroke();
        ctx.restore();
      };
      const loop = () => {
        t += 0.009;
        ctx.fillStyle = "rgba(6,2,12,0.18)"; ctx.fillRect(0, 0, c.width, c.height);
        chakanas.forEach(ch => {
          ch.rot += Math.sin(t * 0.3 + ch.phase) * 0.004;
          const hue = (30 + ch.phase * 40 + t * 8) % 360;
          // glow
          ctx.globalCompositeOperation = "screen";
          const gg = ctx.createRadialGradient(ch.x, ch.y, 0, ch.x, ch.y, ch.size * 1.3);
          gg.addColorStop(0, `hsla(${hue},80%,40%,0.3)`); gg.addColorStop(1, "rgba(0,0,0,0)");
          ctx.fillStyle = gg; ctx.beginPath(); ctx.arc(ch.x, ch.y, ch.size * 1.3, 0, Math.PI * 2); ctx.fill();
          ctx.globalCompositeOperation = "source-over";
          drawChakana(ch.x, ch.y, ch.size, ch.rot, hue);
          // floating textile dots
          for (let i = 0; i < 6; i++) {
            const a = (i / 6) * Math.PI * 2 + t * 0.3 + ch.phase;
            const r = ch.size * 1.5 + Math.sin(t + i) * 10;
            ctx.fillStyle = `hsla(${hue + i * 20},90%,65%,0.6)`;
            ctx.beginPath(); ctx.arc(ch.x + Math.cos(a)*r, ch.y + Math.sin(a)*r, 3, 0, Math.PI*2); ctx.fill();
          }
        });
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },

  {
    name: "Vietnamese Lacquerware",
    tags: ["vietnamese", "lacquer", "traditional", "elegant"],
    description: "Sơn mài lacquerware — gold-leaf cranes and lotus ponds shimmer on deep lacquer black with mother-of-pearl inlay",
    code: `// Gold leaf crane silhouette + MOP shimmer overlay
drawCrane(x, y, wingPhase); // elegant silhouette
// mother-of-pearl iridescence
ctx.globalCompositeOperation = 'screen';
ctx.fillStyle = iridescent gradient shifted by sin(t);
drawLotusRipple(pondCx, pondCy, t);`,
    animator: (c, ctx, mouse) => {
      let t = 0, id;
      const cranes = Array.from({ length: 5 }, (_, i) => ({
        x: c.width * (0.12 + i * 0.19) + Math.random() * 30,
        y: c.height * 0.35 + Math.random() * 80,
        phase: i * 1.4,
        size: 32 + Math.random() * 20,
        vx: (Math.random() - 0.5) * 0.4
      }));
      const drawCrane = (x, y, size, phase) => {
        ctx.save(); ctx.translate(x, y);
        const wing = Math.sin(phase + t * 1.5) * 0.5;
        const goldG = ctx.createLinearGradient(-size, 0, size, 0);
        goldG.addColorStop(0, "rgba(180,130,10,0.8)");
        goldG.addColorStop(0.5, "rgba(255,215,50,0.95)");
        goldG.addColorStop(1, "rgba(180,130,10,0.8)");
        ctx.fillStyle = goldG;
        // body
        ctx.beginPath(); ctx.ellipse(0, 0, size * 0.25, size * 0.55, 0, 0, Math.PI * 2); ctx.fill();
        // left wing
        ctx.save(); ctx.rotate(-0.3 - wing * 0.4);
        ctx.beginPath(); ctx.moveTo(0, -size * 0.1);
        ctx.bezierCurveTo(-size * 1.1, -size * 0.5 - wing * size * 0.3, -size * 0.8, size * 0.2, 0, size * 0.1);
        ctx.fill(); ctx.restore();
        // right wing
        ctx.save(); ctx.rotate(0.3 + wing * 0.4);
        ctx.beginPath(); ctx.moveTo(0, -size * 0.1);
        ctx.bezierCurveTo(size * 1.1, -size * 0.5 - wing * size * 0.3, size * 0.8, size * 0.2, 0, size * 0.1);
        ctx.fill(); ctx.restore();
        // neck & head
        ctx.fillStyle = goldG;
        ctx.beginPath(); ctx.ellipse(0, -size * 0.62, size * 0.1, size * 0.2, 0.2, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.ellipse(size * 0.08, -size * 0.82, size * 0.12, size * 0.1, 0, 0, Math.PI * 2); ctx.fill();
        // red crown
        ctx.fillStyle = "rgba(200,20,20,0.9)";
        ctx.beginPath(); ctx.arc(size * 0.08, -size * 0.9, size * 0.06, 0, Math.PI * 2); ctx.fill();
        // long legs
        ctx.strokeStyle = goldG; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(-size * 0.08, size * 0.5); ctx.lineTo(-size * 0.12, size * 1.1); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(size * 0.08, size * 0.5); ctx.lineTo(size * 0.12, size * 1.1); ctx.stroke();
        ctx.restore();
      };
      const drawMOPShimmer = (x, y, r, phase) => {
        ctx.globalCompositeOperation = "screen";
        const hue = (t * 30 + phase * 60) % 360;
        const mg = ctx.createRadialGradient(x, y, 0, x, y, r);
        mg.addColorStop(0, `hsla(${hue},80%,70%,0.15)`);
        mg.addColorStop(0.5, `hsla(${hue + 60},90%,60%,0.08)`);
        mg.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = mg; ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
        ctx.globalCompositeOperation = "source-over";
      };
      const loop = () => {
        t += 0.01;
        ctx.fillStyle = "rgba(4,2,4,0.22)"; ctx.fillRect(0, 0, c.width, c.height);
        // lacquer ground — deep red-black sheen
        ctx.globalCompositeOperation = "screen";
        const lg = ctx.createRadialGradient(c.width/2, c.height/2, 0, c.width/2, c.height/2, c.width * 0.7);
        lg.addColorStop(0, "rgba(80,10,10,0.12)"); lg.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = lg; ctx.fillRect(0, 0, c.width, c.height);
        ctx.globalCompositeOperation = "source-over";
        // lotus pond
        const pondY = c.height * 0.75;
        for (let i = 0; i < 5; i++) {
          const lx = c.width * (0.1 + i * 0.2);
          ctx.strokeStyle = `rgba(255,200,80,${0.2 + Math.sin(t + i) * 0.1})`; ctx.lineWidth = 1.5;
          for (let r = 8; r < 35; r += 9) {
            ctx.beginPath(); ctx.ellipse(lx, pondY, r * 1.8, r * 0.4, 0, 0, Math.PI * 2); ctx.stroke();
          }
          drawMOPShimmer(lx, pondY, 40, i);
        }
        // water lines
        for (let i = 0; i < 8; i++) {
          const wy = pondY - 15 + i * 8 + Math.sin(t * 0.8 + i) * 3;
          ctx.strokeStyle = `rgba(255,200,60,${0.08 + Math.sin(t + i * 0.5) * 0.04})`;
          ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(0, wy); ctx.lineTo(c.width, wy); ctx.stroke();
        }
        // cranes
        cranes.forEach(cr => {
          cr.x += cr.vx + Math.sin(t * 0.3 + cr.phase) * 0.3;
          if (cr.x > c.width + 80) cr.x = -80;
          if (cr.x < -80) cr.x = c.width + 80;
          drawCrane(cr.x, cr.y + Math.sin(t * 0.4 + cr.phase) * 8, cr.size, cr.phase);
          drawMOPShimmer(cr.x, cr.y, cr.size * 1.5, cr.phase);
        });
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },

  {
    name: "Maori Koru Spiral",
    tags: ["maori", "new-zealand", "spiral", "nature"],
    description: "Living koru fern spirals unfurl from the earth in Māori ta moko tattoo style — silver fern meets carved greenstone",
    code: `// Logarithmic spiral with tapered stroke (ta moko style)
const koru = (cx, cy, r, turns, phase) => {
  for (let i = 0; i < steps; i++) {
    const a = (i / steps) * turns * PI * 2 + phase;
    const rr = r * (i / steps) ** 0.6; // log spiral
    ctx.lineWidth = maxW * (1 - i/steps); // taper
    ctx.lineTo(cx + cos(a)*rr, cy + sin(a)*rr);
  }
};`,
    animator: (c, ctx, mouse) => {
      let t = 0, id;
      const korus = Array.from({ length: 7 }, (_, i) => ({
        x: c.width * (0.1 + (i % 4) * 0.27),
        y: c.height * (0.3 + Math.floor(i / 4) * 0.4) + Math.random() * 40,
        size: 45 + Math.random() * 35,
        phase: i * 0.9,
        rot: Math.random() * Math.PI * 2,
        speed: (Math.random() - 0.5) * 0.004,
        hue: [165, 140, 180][i % 3]
      }));
      const drawKoru = (x, y, size, rot, phase, hue) => {
        ctx.save(); ctx.translate(x, y); ctx.rotate(rot + Math.sin(t * 0.3 + phase) * 0.08);
        const steps = 120;
        const turns = 2.5;
        // outer stroke (carved dark outline)
        ctx.strokeStyle = `hsla(${hue - 20},50%,20%,0.8)`; ctx.lineWidth = 5;
        ctx.lineCap = "round"; ctx.beginPath();
        for (let i = 0; i <= steps; i++) {
          const a = (i / steps) * turns * Math.PI * 2 - Math.PI / 2 + t * 0.05 * (phase % 2 === 0 ? 1 : -1);
          const rr = size * Math.pow(i / steps, 0.55);
          i === 0 ? ctx.moveTo(Math.cos(a) * rr, Math.sin(a) * rr)
                   : ctx.lineTo(Math.cos(a) * rr, Math.sin(a) * rr);
        }
        ctx.stroke();
        // inner fill (greenstone jade color)
        const g = ctx.createLinearGradient(-size, -size, size, size);
        g.addColorStop(0, `hsla(${hue},70%,35%,0.9)`);
        g.addColorStop(0.5, `hsla(${hue + 10},80%,50%,0.95)`);
        g.addColorStop(1, `hsla(${hue - 10},65%,30%,0.85)`);
        ctx.strokeStyle = g; ctx.lineWidth = 3;
        ctx.beginPath();
        for (let i = 0; i <= steps; i++) {
          const a = (i / steps) * turns * Math.PI * 2 - Math.PI / 2 + t * 0.05 * (phase % 2 === 0 ? 1 : -1);
          const rr = size * Math.pow(i / steps, 0.55);
          i === 0 ? ctx.moveTo(Math.cos(a) * rr, Math.sin(a) * rr)
                   : ctx.lineTo(Math.cos(a) * rr, Math.sin(a) * rr);
        }
        ctx.stroke();
        // bulb at end — newborn fern head
        const endA = turns * Math.PI * 2 - Math.PI / 2 + t * 0.05 * (phase % 2 === 0 ? 1 : -1);
        const endR = size;
        const ex = Math.cos(endA) * endR, ey = Math.sin(endA) * endR;
        ctx.fillStyle = `hsla(${hue + 10},75%,45%,0.9)`;
        ctx.strokeStyle = `hsla(${hue - 20},55%,22%,0.8)`; ctx.lineWidth = 2.5;
        ctx.beginPath(); ctx.arc(ex, ey, size * 0.18, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
        // inner curl glow
        ctx.globalCompositeOperation = "screen";
        const kg = ctx.createRadialGradient(ex * 0.5, ey * 0.5, 0, ex * 0.5, ey * 0.5, size * 0.5);
        kg.addColorStop(0, `hsla(${hue + 30},100%,70%,0.25)`); kg.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = kg; ctx.beginPath(); ctx.arc(ex * 0.5, ey * 0.5, size * 0.5, 0, Math.PI * 2); ctx.fill();
        ctx.globalCompositeOperation = "source-over";
        ctx.restore();
      };
      const loop = () => {
        t += 0.01;
        ctx.fillStyle = "rgba(3,8,6,0.18)"; ctx.fillRect(0, 0, c.width, c.height);
        // subtle ground texture
        ctx.strokeStyle = "rgba(30,80,50,0.06)"; ctx.lineWidth = 1;
        for (let i = 0; i < c.width; i += 20) {
          ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i + Math.sin(t * 0.2 + i) * 8, c.height); ctx.stroke();
        }
        korus.forEach(k => {
          k.rot += k.speed;
          // cursor influence
          const dx = mouse.x - k.x, dy = mouse.y - k.y;
          const md = Math.hypot(dx, dy);
          if (md < 150) k.rot += (dx / md) * 0.008;
          drawKoru(k.x, k.y, k.size, k.rot, k.phase, k.hue);
        });
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  }

];