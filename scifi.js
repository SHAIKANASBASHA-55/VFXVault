// ─────────────────────────────────────────────────
//  SCI-FI EFFECTS
// ─────────────────────────────────────────────────

export const scifiEffects = [
  {
    name: "Neural Link",
    tags: ["scifi", "cyber", "ai"],
    description: "Brain-like synapse firing between nodes following the cursor",
    code: `// Dynamic branching paths + pulsed signal glow
const t = Date.now() * 0.002;
nodes.forEach(n => {
  const signal = max(0, sin(t + n.offset));
  ctx.strokeStyle = \`rgba(100,255,255,\${signal})\`;
});`,
    animator: (c, ctx, mouse) => {
      let nodes = [], id;
      for (let i = 0; i < 50; i++) nodes.push({ x: Math.random() * c.width, y: Math.random() * c.height, vx: (Math.random() - .5) * .5, vy: (Math.random() - .5) * .5, offset: Math.random() * 10 });
      const loop = () => {
        ctx.fillStyle = "rgba(0,5,10,0.2)"; ctx.fillRect(0, 0, c.width, c.height);
        const t = Date.now() * 0.003;
        nodes.forEach(n => {
          n.x += n.vx; n.y += n.vy;
          if (n.x < 0 || n.x > c.width) n.vx *= -1; if (n.y < 0 || n.y > c.height) n.vy *= -1;
          const dMouse = Math.hypot(n.x - mouse.x, n.y - mouse.y);
          if (dMouse < 150) {
            ctx.strokeStyle = `rgba(0,255,200,${(1 - dMouse / 150) * 0.4})`;
            ctx.beginPath(); ctx.moveTo(n.x, n.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
          }
          const pulse = Math.max(0, Math.sin(t + n.offset));
          ctx.fillStyle = `rgba(0,255,255,${0.2 + pulse * 0.8})`;
          ctx.beginPath(); ctx.arc(n.x, n.y, 1.5 + pulse * 2, 0, Math.PI * 2); ctx.fill();
        });
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },

  {
    name: "Data Stream",
    tags: ["scifi", "cyber", "matrix"],
    description: "Cascading vertical code streams that react to cursor 'interruption'",
    code: `// Column-based character decay + collision detection
col.y += col.speed;
if(abs(col.x - mouse.x) < 20 && abs(col.y - mouse.y) < 20) 
  col.char = 'ERR';`,
    animator: (c, ctx, mouse) => {
      let streams = [], id;
      const chars = "0123456789ABCDEF";
      for (let i = 0; i < c.width / 20; i++) streams.push({ x: i * 20, y: Math.random() * c.height, s: Math.random() * 4 + 2 });
      const loop = () => {
        ctx.fillStyle = "rgba(0,10,0,0.15)"; ctx.fillRect(0, 0, c.width, c.height);
        ctx.font = "14px monospace";
        streams.forEach(s => {
          s.y = (s.y + s.s) % c.height;
          const char = chars[Math.floor(Math.random() * chars.length)];
          const dist = Math.hypot(s.x - mouse.x, s.y - mouse.y);
          ctx.fillStyle = dist < 50 ? "#fff" : "#0f0";
          ctx.fillText(char, s.x, s.y);
        });
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },

  {
    name: "Nano Bots",
    tags: ["scifi", "tech", "swarm"],
    description: "Tiny geometric bots that assemble shapes around the cursor",
    code: `// Target-seeking micro-polygons
const targetX = mouse.x + cos(angle)*orbit;
bot.vx += (targetX - bot.x) * 0.05;
ctx.rotate(bot.angle);`,
    animator: (c, ctx, mouse) => {
      let bots = [], id;
      for (let i = 0; i < 80; i++) bots.push({ x: Math.random() * c.width, y: Math.random() * c.height, a: Math.random() * Math.PI * 2, r: 20 + Math.random() * 60 });
      const loop = () => {
        ctx.fillStyle = "rgba(10,10,15,0.2)"; ctx.fillRect(0, 0, c.width, c.height);
        const t = Date.now() * 0.002;
        bots.forEach((b, i) => {
          const tx = mouse.x + Math.cos(t + i) * b.r, ty = mouse.y + Math.sin(t + i) * b.r;
          b.x += (tx - b.x) * 0.1; b.y += (ty - b.y) * 0.1;
          ctx.fillStyle = "#aaa"; ctx.save(); ctx.translate(b.x, b.y); ctx.rotate(t + i);
          ctx.fillRect(-2, -2, 4, 4); ctx.restore();
          if (i % 5 === 0) {
            ctx.strokeStyle = "rgba(200,200,255,0.1)"; ctx.beginPath();
            ctx.moveTo(b.x, b.y); ctx.lineTo(bots[(i + 1) % 80].x, bots[(i + 1) % 80].y); ctx.stroke();
          }
        });
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },

  {
    name: "Singularity Engine",
    tags: ["scifi", "energy", "power"],
    description: "A pulsating core drawing in 'fuel' particles through space-time",
    code: `// Gravity well + Core brightness oscillation
const gravity = 100 / (dist * dist);
p.vx += (cx - p.x) * gravity;
ctx.arc(cx, cy, coreR + sin(t)*5, ...);`,
    animator: (c, ctx, mouse) => {
      let ps = [], t = 0, id;
      const loop = () => {
        t += 0.05; ctx.fillStyle = "rgba(0,0,5,0.2)"; ctx.fillRect(0, 0, c.width, c.height);
        const cx = c.width / 2, cy = c.height / 2;
        if (ps.length < 150) ps.push({ x: Math.random() * c.width, y: Math.random() * c.height, s: Math.random() * 2 + 1 });
        ps.forEach((p, i) => {
          const dx = cx - p.x, dy = cy - p.y, d = Math.hypot(dx, dy);
          p.x += dx / d * p.s; p.y += dy / d * p.s;
          if (d < 10) ps.splice(i, 1);
          ctx.fillStyle = "rgba(100,150,255,0.8)"; ctx.fillRect(p.x, p.y, 2, 2);
        });
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, 50 + Math.sin(t) * 10);
        g.addColorStop(0, "#fff"); g.addColorStop(0.3, "#0af"); g.addColorStop(1, "transparent");
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, 60, 0, Math.PI * 2); ctx.fill();
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },

  {
    name: "Digital Glitch",
    tags: ["scifi", "cyber", "glitch"],
    description: "Occasional screen-space slices that shift pixels horizontally",
    code: `// Random vertical slices offset by dx
if(rand() < 0.1) {
  const y = rand()*H, h = rand()*20;
  ctx.drawImage(c, 0, y, W, h, offset, y, W, h);
}`,
    animator: (c, ctx, mouse) => {
      let id;
      const loop = () => {
        ctx.fillStyle = "rgba(0,20,20,0.05)"; ctx.fillRect(0, 0, c.width, c.height);
        if (Math.random() < 0.15) {
          const y = Math.random() * c.height, h = Math.random() * 30 + 5, off = (Math.random() - .5) * 40;
          ctx.drawImage(c, 0, y, c.width, h, off, y, c.width, h);
          ctx.fillStyle = "rgba(255,0,100,0.2)"; ctx.fillRect(0, y, c.width, 1);
        }
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },

  {
    name: "Circuitry HUD",
    tags: ["scifi", "tech", "ui"],
    description: "90-degree angular lines growing like circuit traces",
    code: `// L-shape path generation
if(rand() > 0.5) x += step; else y += step;
ctx.lineTo(x, y);`,
    animator: (c, ctx, mouse) => {
      let paths = [], id;
      const addPath = () => ({ x: Math.random() * c.width, y: Math.random() * c.height, life: 100 });
      const loop = () => {
        ctx.fillStyle = "rgba(0,5,0,0.05)"; ctx.fillRect(0, 0, c.width, c.height);
        if (paths.length < 20) paths.push(addPath());
        paths.forEach((p, i) => {
          ctx.strokeStyle = `rgba(0,255,100,${p.life / 100})`; ctx.lineWidth = 1;
          ctx.beginPath(); ctx.moveTo(p.x, p.y);
          if (Math.random() > 0.5) p.x += 20 * (Math.random() > .5 ? 1 : -1);
          else p.y += 20 * (Math.random() > .5 ? 1 : -1);
          ctx.lineTo(p.x, p.y); ctx.stroke(); p.life--;
          if (p.life <= 0) paths[i] = addPath();
        });
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },

  {
    name: "Ion Thruster",
    tags: ["scifi", "speed", "energy"],
    description: "High-velocity blue exhaust plume with a heat core following the cursor",
    code: `// Conical particle spray with life-based scaling
const angle = Math.PI / 2; // Pointing down
p.vx = Math.cos(angle + spread) * speed;
p.vy = Math.sin(angle + spread) * speed;
p.r *= 0.96; // Shrink as it cools`,
    animator: (c, ctx, mouse) => {
      let ps = [], id;
      const loop = () => {
        // Dark space background
        ctx.fillStyle = "rgba(0, 5, 15, 0.3)"; 
        ctx.fillRect(0, 0, c.width, c.height);

        // Emit new particles while moving/active
        for (let i = 0; i < 6; i++) {
          ps.push({
            x: mouse.x,
            y: mouse.y,
            // Narrow spray spread
            vx: (Math.random() - 0.5) * 2.5, 
            vy: Math.random() * 8 + 4,
            life: 1.0,
            hue: 190 + Math.random() * 30, // Cyan to Blue
            r: Math.random() * 6 + 2
          });
        }

        ctx.globalCompositeOperation = "lighter"; // Makes the "energy" glow
        ps.forEach((p, i) => {
          p.x += p.vx;
          p.y += p.vy;
          p.life -= 0.025;
          p.r *= 0.97; // Particles shrink

          if (p.life <= 0) {
            ps.splice(i, 1);
            return;
          }

          // Draw the ion gas
          ctx.fillStyle = `hsla(${p.hue}, 100%, 70%, ${p.life})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fill();

          // Optional: Add a smaller white "core" to the hottest particles
          if (p.life > 0.8) {
            ctx.fillStyle = `rgba(255, 255, 255, ${p.life})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r * 0.5, 0, Math.PI * 2);
            ctx.fill();
          }
        });
        ctx.globalCompositeOperation = "source-over";

        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },

  {
    name: "Subspace Wave",
    tags: ["scifi", "ambient", "energy"],
    description: "Rippling interference patterns across the background",
    code: `// Multi-frequency interference
const z = sin(x*0.01 + t) + sin(y*0.02 - t*0.5);
ctx.fillStyle = \`rgba(100,0,255,\${z*0.1})\`;`,
    animator: (c, ctx, mouse) => {
      let t = 0, id;
      const loop = () => {
        t += 0.05; ctx.fillStyle = "#050010"; ctx.fillRect(0, 0, c.width, c.height);
        for (let i = 0; i < c.width; i += 40) {
          for (let j = 0; j < c.height; j += 40) {
            const op = Math.sin(i * 0.01 + t) + Math.cos(j * 0.01 + t);
            ctx.fillStyle = `rgba(150,100,255,${0.05 + op * 0.05})`;
            ctx.beginPath(); ctx.arc(i, j, 20 + op * 10, 0, Math.PI * 2); ctx.fill();
          }
        }
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },

  {
    name: "Cyber Grid",
    tags: ["scifi", "cyber", "tech"],
    description: "A retro-future floor grid with perspective motion",
    code: `// Vanishing point perspective
const pY = (y + speed*t) % spacing;
ctx.moveTo(0, horizon + pY);
ctx.lineTo(W, horizon + pY);`,
    animator: (c, ctx, mouse) => {
      let t = 0, id;
      const loop = () => {
        t += 2; ctx.fillStyle = "#000"; ctx.fillRect(0, 0, c.width, c.height);
        const horizon = c.height * 0.6;
        ctx.strokeStyle = "#f0f"; ctx.lineWidth = 1;
        for (let i = -c.width; i < c.width * 2; i += 40) {
          ctx.beginPath(); ctx.moveTo(c.width / 2, horizon); ctx.lineTo(i, c.height); ctx.stroke();
        }
        for (let i = 0; i < 10; i++) {
          const y = horizon + ((i * 40 + t) % 400);
          if (y > horizon) {
            ctx.globalAlpha = (y - horizon) / (c.height - horizon);
            ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(c.width, y); ctx.stroke();
          }
        }
        ctx.globalAlpha = 1;
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },

  {
    name: "Bioscan",
    tags: ["scifi", "tech", "medical"],
    description: "Organic waveform monitoring following the cursor's movement",
    code: `// EKG-style sine pulse
const heart = abs(sin(t*5)) > 0.9 ? 20 : 0;
points.push(mouseY + heart);`,
    animator: (c, ctx, mouse) => {
      let history = [], t = 0, id;
      const loop = () => {
        t += 0.2; ctx.fillStyle = "rgba(0,10,0,0.2)"; ctx.fillRect(0, 0, c.width, c.height);
        const pulse = Math.abs(Math.sin(t)) > 0.9 ? Math.sin(t * 10) * 30 : 0;
        history.push({ x: mouse.x, y: mouse.y + pulse });
        if (history.length > 50) history.shift();
        ctx.strokeStyle = "#0f0"; ctx.lineWidth = 2; ctx.beginPath();
        history.forEach((p, i) => {
          ctx.lineTo(p.x - (history.length - i) * 5, p.y);
        });
        ctx.stroke();
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }},
  {
    name: "Warp Speed",
    tags: ["scifi", "space", "speed"],
    description: "Stars stretch into hyperspace streaks as warp drive engages",
    code: `// Radial stretch from center with speed ramp
const angle = atan2(star.y - cy, star.x - cx);
const dist = hypot(star.x - cx, star.y - cy);
star.speed *= 1.012;
const tail = dist * 0.22 * star.speed;`,
    animator: (c, ctx, mouse) => {
      let stars = [], t = 0, warpSpeed = 1, id;
      const cx = c.width / 2, cy = c.height / 2;
      for (let i = 0; i < 300; i++) { const angle = Math.random() * Math.PI * 2, dist = Math.random() * Math.max(c.width, c.height) * .5; stars.push({ x: cx + Math.cos(angle) * dist, y: cy + Math.sin(angle) * dist, baseSpeed: Math.random() * 3 + 1, speed: 1, angle, dist, alpha: Math.random() * .6 + .3 }); }
      const loop = () => {
        t += .016; warpSpeed = 1 + (mouse.x / c.width) * 8;
        ctx.fillStyle = "rgba(0,0,8,0.22)"; ctx.fillRect(0, 0, c.width, c.height);
        stars.forEach(s => {
          s.dist += s.baseSpeed * warpSpeed; if (s.dist > Math.max(c.width, c.height) * .8) { s.dist = 2; s.speed = 1; s.angle = Math.random() * Math.PI * 2; }
          s.x = cx + Math.cos(s.angle) * s.dist; s.y = cy + Math.sin(s.angle) * s.dist;
          const tail = s.dist * .18 * (warpSpeed / 3);
          const tx = cx + Math.cos(s.angle) * (s.dist - tail), ty = cy + Math.sin(s.angle) * (s.dist - tail);
          const alpha = Math.min(s.alpha, s.dist / 80) * Math.min(1, warpSpeed / 4);
          ctx.strokeStyle = `rgba(180,210,255,${alpha})`; ctx.lineWidth = .8 + warpSpeed * .15;
          ctx.beginPath(); ctx.moveTo(tx, ty); ctx.lineTo(s.x, s.y); ctx.stroke();
        });
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },

  {
    name: "Tractor Beam",
    tags: ["scifi", "energy", "alien"],
    description: "A green alien tractor beam locks onto and slowly pulls cursor",
    code: `// Vertical beam with particle stream + ring oscillation
const beamW = 80 + sin(t * 3) * 20;
const g = ctx.createLinearGradient(cx - beamW, 0, cx + beamW, 0);
g.addColorStop(0, 'rgba(0,0,0,0)');
g.addColorStop(0.5, \`rgba(40,255,100,\${0.2 + pulse*0.15})\`);`,
    animator: (c, ctx, mouse) => {
      let particles = [], t = 0, id;
      for (let i = 0; i < 60; i++) particles.push({ x: c.width / 2 + (Math.random() - .5) * 100, y: Math.random() * c.height, vy: Math.random() * -1.5 - .5, alpha: Math.random() * .6 + .2, r: Math.random() * 3 + 1 });
      const loop = () => {
        t += .018; ctx.fillStyle = "rgba(0,4,2,0.2)"; ctx.fillRect(0, 0, c.width, c.height);
        const cx = mouse.x, pulse = Math.sin(t * 4) * .5 + .5, beamW = 55 + pulse * 30;
        const g = ctx.createLinearGradient(cx - beamW, 0, cx + beamW, 0);
        g.addColorStop(0, "rgba(0,0,0,0)"); g.addColorStop(.45, `rgba(30,255,80,${.12 + pulse * .1})`); g.addColorStop(.5, `rgba(80,255,120,${.25 + pulse * .18})`); g.addColorStop(.55, `rgba(30,255,80,${.12 + pulse * .1})`); g.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = g; ctx.fillRect(cx - beamW, 0, beamW * 2, c.height);
        for (let ring = 0; ring < 8; ring++) { const ry = (t * 60 + ring * (c.height / 8)) % c.height, rw = beamW * (.4 + Math.sin(t * 3 + ring) * .3); ctx.strokeStyle = `rgba(50,255,100,${.15 + Math.sin(t * 4 + ring) * .1})`; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.ellipse(cx, ry, rw, rw * .18, 0, 0, Math.PI * 2); ctx.stroke(); }
        particles.forEach(p => {
          p.x += (cx - p.x) * .02 + (Math.random() - .5) * 3; p.y += p.vy; p.alpha -= .004;
          if (p.y < -p.r || p.alpha <= 0) { p.y = c.height + p.r; p.x = cx + (Math.random() - .5) * 100; p.alpha = .6; }
          ctx.fillStyle = `rgba(80,255,120,${p.alpha})`; ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
        });
        ctx.strokeStyle = `rgba(120,255,160,${.4 + pulse * .3})`; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.ellipse(cx, c.height * .15, 40, 12, 0, 0, Math.PI * 2); ctx.stroke();
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },

  {
    name: "Plasma Field",
    tags: ["scifi", "energy", "ambient"],
    description: "Shifting plasma energy field with electric arc tendrils",
    code: `// Layered sine noise field approximation
const val = sin(x*0.012 + t) * sin(y*0.012 + t*1.3)
          + sin((x+y)*0.009 + t*0.7) * 0.5;
const hue = (val * 180 + 200 + t*20) % 360;`,
    animator: (c, ctx, mouse) => {
      let t = 0, arcs = [], id;
      const STEP = 6;
      const spawnArc = () => { const x = Math.random() * c.width, y = Math.random() * c.height; arcs.push({ x, y, tx: mouse.x + (Math.random() - .5) * 100, ty: mouse.y + (Math.random() - .5) * 100, life: 1 }); };
      const iv = setInterval(spawnArc, 300);
      const loop = () => {
        t += .022; ctx.fillStyle = "rgba(0,0,12,0.25)"; ctx.fillRect(0, 0, c.width, c.height);
        for (let y = 0; y < c.height; y += STEP) for (let x = 0; x < c.width; x += STEP) {
          const val = Math.sin(x * .012 + t) * Math.sin(y * .012 + t * 1.3) + Math.sin((x + y) * .009 + t * .7) * .5 + Math.sin(Math.hypot(x - mouse.x, y - mouse.y) * .015 - t * 2) * .5;
          const hue = (val * 120 + 220 + t * 25) % 360, alpha = (val + 1.5) * .08;
          if (alpha > .04) { ctx.fillStyle = `hsla(${hue},75%,55%,${alpha})`; ctx.fillRect(x, y, STEP, STEP); }
        }
        arcs.forEach((a, i) => { a.life -= .04; if (a.life <= 0) { arcs.splice(i, 1); return; } const segs = 8; ctx.strokeStyle = `rgba(180,130,255,${a.life * .6})`; ctx.lineWidth = a.life * 2; ctx.beginPath(); ctx.moveTo(a.x, a.y); for (let s = 1; s <= segs; s++) { ctx.lineTo(a.x + (a.tx - a.x) * s / segs + (Math.random() - .5) * 30, a.y + (a.ty - a.y) * s / segs + (Math.random() - .5) * 30); } ctx.stroke(); });
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => { clearInterval(iv); cancelAnimationFrame(id); } };
    }
  },

  {
    name: "Portal Vortex",
    tags: ["scifi", "portal", "cosmic"],
    description: "Swirling inter-dimensional portal spins open toward cursor",
    code: `// Rotating spiral arms with chromatic ring bands
const swirl = atan2(p.y - cy, p.x - cx) + dist*0.04 - t*2;
const ring = floor((dist / ringW) % numColors);
ctx.strokeStyle = \`hsl(\${ring * 55 + t*30}, 75%, 55%)\`;`,
    animator: (c, ctx, mouse) => {
      let t = 0, particles = [], id;
      for (let i = 0; i < 300; i++) { const angle = Math.random() * Math.PI * 2, dist = Math.random() * 220 + 10; particles.push({ angle, dist, speed: (.5 + Math.random() * 1.5) * (Math.random() > .5 ? 1 : -1), hue: Math.random() * 280, alpha: Math.random() * .6 + .3, r: Math.random() * 2.5 + .8 }); }
      const loop = () => {
        t += .018; ctx.fillStyle = "rgba(2,0,10,0.2)"; ctx.fillRect(0, 0, c.width, c.height);
        const cx = mouse.x * .3 + c.width * .35, cy = mouse.y * .3 + c.height * .35;
        for (let ring = 5; ring >= 0; ring--) { const r = 30 + ring * 32; ctx.strokeStyle = `hsla(${ring * 55 + t * 40},80%,${50 + ring * 5}%,${.25 - ring * .03})`; ctx.lineWidth = 2 + ring * .5; ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.stroke(); }
        particles.forEach(p => {
          p.angle += (.04 * p.speed) / (p.dist * .02 + 1); p.dist -= .3 * Math.sign(p.speed); if (p.dist < 5 || p.dist > 250) { p.dist = Math.random() * 200 + 20; p.angle = Math.random() * Math.PI * 2; }
          const x = cx + Math.cos(p.angle + p.dist * .025 - t) * p.dist, y = cy + Math.sin(p.angle + p.dist * .025 - t) * p.dist;
          const hue = (p.hue + t * 30) % 360;
          ctx.fillStyle = `hsla(${hue},75%,65%,${p.alpha * (1 - p.dist / 260)})`; ctx.beginPath(); ctx.arc(x, y, p.r, 0, Math.PI * 2); ctx.fill();
        });
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, 40); g.addColorStop(0, "rgba(0,0,0,0.95)"); g.addColorStop(.6, "rgba(20,0,40,0.5)"); g.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, 40, 0, Math.PI * 2); ctx.fill();
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },

  {
    name: "Shield Barrier",
    tags: ["scifi", "defense", "energy"],
    description: "Hexagonal energy shield flickers and absorbs cursor impacts",
    code: `// Shield dome with impact ripple on proximity
const impact = max(0, 1 - dist / 80);
hexes.forEach(h => h.glow += impact * 0.8);
ctx.strokeStyle = \`rgba(0,180,255,\${0.2 + h.glow * 0.8})\`;`,
    animator: (c, ctx, mouse) => {
      const SIZE = 35, W = SIZE * 2, H = Math.sqrt(3) * SIZE;
      let hexes = [], t = 0, id;
      for (let col = -1; col < c.width / (W * .75) + 2; col++) for (let row = -1; row < c.height / H + 2; row++) {
        const x = col * W * .75 + SIZE, y = row * H + (col % 2 === 0 ? 0 : H * .5) + SIZE;
        hexes.push({ cx: x, cy: y, glow: 0, hue: 190 + Math.random() * 30 });
      }
      const drawHex = (cx, cy, size, alpha, glow) => {
        ctx.beginPath();
        for (let i = 0; i < 6; i++) { const a = (i / 6) * Math.PI * 2 - Math.PI / 6; ctx.lineTo(cx + Math.cos(a) * size, cy + Math.sin(a) * size); }
        ctx.closePath();
        if (glow > .05) { ctx.fillStyle = `rgba(0,180,255,${glow * .15})`; ctx.fill(); }
        ctx.strokeStyle = `rgba(0,180,255,${alpha + glow * .6})`; ctx.lineWidth = .8 + glow * 2; ctx.stroke();
      };
      const loop = () => {
        t += .016; ctx.fillStyle = "rgba(0,4,10,0.2)"; ctx.fillRect(0, 0, c.width, c.height);
        hexes.forEach(h => {
          const dist = Math.hypot(h.cx - mouse.x, h.cy - mouse.y), impact = Math.max(0, 1 - dist / 90);
          h.glow = Math.max(h.glow - .035, impact * .9);
          const flicker = Math.sin(t * 8 + h.cx * .03) * .05 + .95;
          drawHex(h.cx, h.cy, SIZE - 2, .08 * flicker, h.glow);
        });
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },

  {
    name: "Hologram Scan",
    tags: ["scifi", "hologram", "tech"],
    description: "Blue holographic projection scans with grid lines and ghost artifacts",
    code: `// Scan line sweep + wireframe ghost object
scanY = (scanY + scanSpeed) % H;
ctx.fillStyle = 'rgba(0,180,255,0.12)';
ctx.fillRect(0, scanY - 2, W, 4);
// Ghost rotation overlay using ctx.transform`,
    animator: (c, ctx, mouse) => {
      let t = 0, scanY = 0, id;
      const GRID = 40;
      const loop = () => {
        t += .016; scanY = (scanY + 1.8) % c.height;
        ctx.fillStyle = "rgba(0,4,14,0.22)"; ctx.fillRect(0, 0, c.width, c.height);
        ctx.strokeStyle = "rgba(0,140,255,0.07)"; ctx.lineWidth = .6;
        for (let x = 0; x < c.width; x += GRID) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, c.height); ctx.stroke(); }
        for (let y = 0; y < c.height; y += GRID) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(c.width, y); ctx.stroke(); }
        ctx.fillStyle = "rgba(0,180,255,0.1)"; ctx.fillRect(0, scanY - 2, c.width, 4);
        ctx.strokeStyle = "rgba(0,220,255,0.6)"; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(0, scanY); ctx.lineTo(c.width, scanY); ctx.stroke();
        const cx = mouse.x, cy = mouse.y, rs = 60 + Math.sin(t * 2) * 15;
        ctx.save(); ctx.translate(cx, cy); ctx.rotate(t);
        const sides = [3, 4, 6][Math.floor(t / 4) % 3];
        ctx.strokeStyle = `rgba(0,220,255,${.4 + Math.sin(t * 3) * .2})`; ctx.lineWidth = 1.5;
        ctx.beginPath();
        for (let i = 0; i <= sides; i++) { const a = (i / sides) * Math.PI * 2; ctx.lineTo(Math.cos(a) * rs, Math.sin(a) * rs); }
        ctx.stroke();
        ctx.beginPath();
        for (let i = 0; i <= sides; i++) { const a = (i / sides) * Math.PI * 2; ctx.lineTo(Math.cos(a) * rs * .5, Math.sin(a) * rs * .5); }
        ctx.stroke(); ctx.restore();
        for (let i = 0; i < 3; i++) { ctx.strokeStyle = `rgba(0,200,255,${.15 - i * .04})`; ctx.lineWidth = .6; ctx.beginPath(); ctx.ellipse(cx, cy, rs + i * 18, rs * .4 + i * 6, t * .5, 0, Math.PI * 2); ctx.stroke(); }
        ctx.fillStyle = `rgba(0,220,255,0.15)`; ctx.font = "11px monospace"; ctx.fillText(`[SCAN ${Math.floor(scanY)}]`, 12, scanY - 6);
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },

  {
    name: "Antimatter Collision",
    tags: ["scifi", "physics", "explosive"],
    description: "Matter and antimatter beams collide in cascading annihilation bursts",
    code: `// Two beams converging + burst at collision point
const collideX = lerp(beam1.x, beam2.x, 0.5);
if(dist(b1Tip, b2Tip) < 20) triggerAnnihilation(collideX, cy);
// Explosion: radial ring + particle spray`,
    animator: (c, ctx, mouse) => {
      let particles = [], rings = [], t = 0, id;
      const annihilate = (x, y) => {
        for (let i = 0; i < 40; i++) { const a = Math.random() * Math.PI * 2, spd = Math.random() * 10 + 4; particles.push({ x, y, vx: Math.cos(a) * spd, vy: Math.sin(a) * spd, alpha: 1, hue: Math.random() > .5 ? 0 : 200, r: Math.random() * 5 + 2 }); }
        rings.push({ x, y, r: 0, alpha: .8 });
      };
      const iv = setInterval(() => annihilate(mouse.x, mouse.y), 800); annihilate(c.width / 2, c.height / 2);
      const loop = () => {
        t += .018; ctx.fillStyle = "rgba(2,0,4,0.2)"; ctx.fillRect(0, 0, c.width, c.height);
        const cy = mouse.y, b1x = mouse.x - 200 + Math.sin(t * 2) * 10, b2x = mouse.x + 200 + Math.sin(t * 2 + Math.PI) * 10;
        ctx.strokeStyle = "rgba(0,150,255,0.7)"; ctx.lineWidth = 3; ctx.shadowColor = "rgba(0,150,255,0.8)"; ctx.shadowBlur = 12; ctx.beginPath(); ctx.moveTo(b1x, cy); ctx.lineTo(mouse.x, cy); ctx.stroke();
        ctx.strokeStyle = "rgba(255,50,0,0.7)"; ctx.beginPath(); ctx.moveTo(b2x, cy); ctx.lineTo(mouse.x, cy); ctx.stroke(); ctx.shadowBlur = 0;
        rings.forEach((r, i) => { r.r += 3.5; r.alpha -= .015; if (r.alpha <= 0) { rings.splice(i, 1); return; } ctx.strokeStyle = `rgba(255,200,80,${r.alpha})`; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(r.x, r.y, r.r, 0, Math.PI * 2); ctx.stroke(); });
        particles.forEach((p, i) => { p.x += p.vx; p.y += p.vy; p.vx *= .96; p.vy *= .96; p.alpha -= .018; if (p.alpha <= 0) { particles.splice(i, 1); return; } ctx.fillStyle = `hsla(${p.hue},90%,65%,${p.alpha})`; ctx.beginPath(); ctx.arc(p.x, p.y, p.r * p.alpha, 0, Math.PI * 2); ctx.fill(); });
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => { clearInterval(iv); cancelAnimationFrame(id); } };
    }
  },

  {
    name: "Drone Swarm",
    tags: ["scifi", "ai", "swarm"],
    description: "Autonomous drones flock with steering behaviors toward cursor target",
    code: `// Boid-like steering: separation, alignment, cohesion
const sep = avoidNeighbors(drone, drones, 40);
const coh = steerToward(drone, center);
const ali = averageVelocity(neighbors);
drone.vel = normalize(sep*1.2 + coh*0.8 + ali*0.6);`,
    animator: (c, ctx, mouse) => {
      let drones = [], t = 0, id;
      const N = 40;
      for (let i = 0; i < N; i++) drones.push({ x: Math.random() * c.width, y: Math.random() * c.height, vx: (Math.random() - .5) * 4, vy: (Math.random() - .5) * 4, angle: Math.random() * Math.PI * 2, hue: 180 + Math.random() * 40 });
      const loop = () => {
        t += .016; ctx.fillStyle = "rgba(2,4,10,0.18)"; ctx.fillRect(0, 0, c.width, c.height);
        drones.forEach(d => {
          const dx = mouse.x - d.x, dy = mouse.y - d.y, toMouse = Math.hypot(dx, dy);
          let fx = dx / toMouse * 1.5, fy = dy / toMouse * 1.5;
          drones.forEach(other => { if (other === d) return; const ox = d.x - other.x, oy = d.y - other.y, dist = Math.hypot(ox, oy); if (dist < 45 && dist > 0) { fx += ox / dist * 2; fy += oy / dist * 2; } });
          d.vx += fx * .08; d.vy += fy * .08; const spd = Math.hypot(d.vx, d.vy); if (spd > 5) { d.vx = d.vx / spd * 5; d.vy = d.vy / spd * 5; }
          d.x += d.vx; d.y += d.vy; d.angle = Math.atan2(d.vy, d.vx);
          if (d.x < 0) d.x = c.width; if (d.x > c.width) d.x = 0; if (d.y < 0) d.y = c.height; if (d.y > c.height) d.y = 0;
          ctx.save(); ctx.translate(d.x, d.y); ctx.rotate(d.angle);
          ctx.fillStyle = `hsla(${d.hue},80%,60%,0.85)`;
          ctx.beginPath(); ctx.moveTo(10, 0); ctx.lineTo(-6, 5); ctx.lineTo(-3, 0); ctx.lineTo(-6, -5); ctx.closePath(); ctx.fill();
          ctx.strokeStyle = `hsla(${d.hue},80%,75%,0.5)`; ctx.lineWidth = .8; ctx.beginPath(); ctx.arc(0, 0, 14, -Math.PI * .6, Math.PI * .6); ctx.stroke(); ctx.restore();
        });
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  }
];
