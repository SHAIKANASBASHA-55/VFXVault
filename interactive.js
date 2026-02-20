// ─────────────────────────────────────────────────
//  INTERACTIVE & MOUSE EFFECTS
// ─────────────────────────────────────────────────

export const interactiveEffects = [
  {
    name: "Magnetic Particles",
    tags: ["mouse", "ambient"],
    description: "200 particles magnetically attracted to cursor",
    code: `// Inverse-square attraction force
const force = 800 / (dist*dist + 100);
p.vx += (dx/dist)*force*0.8;
p.vy += (dy/dist)*force*0.8;
p.vx *= 0.96; // drag`,
    animator: (c, ctx, mouse) => {
      let ps = [];
      for (let i = 0; i < 200; i++) ps.push({ x: Math.random() * c.width, y: Math.random() * c.height, vx: 0, vy: 0, hue: Math.random() * 60 + 20 });
      let id;
      const loop = () => {
        ctx.fillStyle = "rgba(0,0,0,0.08)"; ctx.fillRect(0, 0, c.width, c.height);
        ps.forEach(p => {
          const dx = mouse.x - p.x, dy = mouse.y - p.y, dist = Math.hypot(dx, dy) + 1, force = 800 / (dist * dist + 100);
          p.vx += dx / dist * force * 0.8; p.vy += dy / dist * force * 0.8; p.vx *= 0.96; p.vy *= 0.96;
          p.x += p.vx; p.y += p.vy;
          if (p.x < 0) p.x = c.width; if (p.x > c.width) p.x = 0;
          if (p.y < 0) p.y = c.height; if (p.y > c.height) p.y = 0;
          ctx.fillStyle = `hsl(${p.hue},65%,62%)`; ctx.beginPath(); ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2); ctx.fill();
        });
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },

  {
    name: "Ripple Rings",
    tags: ["water", "mouse"],
    description: "Click to emit ripple rings; auto-spawns periodically",
    code: `// Expanding ring with fading alpha
ripples.forEach((r, i) => {
  r.radius += r.speed;
  const alpha = 0.62*(1 - r.radius/r.max);
  ctx.arc(r.x, r.y, r.radius, 0, PI*2);
});`,
    animator: (c, ctx, mouse) => {
      let ripples = [];
      const onClick = e => { const r = c.getBoundingClientRect(); ripples.push({ x: e.clientX - r.left, y: e.clientY - r.top, radius: 0, max: 300 + Math.random() * 400, speed: 2.5 + Math.random() * 1.5 }); };
      c.addEventListener('click', onClick);
      setInterval(() => { if (Math.random() < .3) ripples.push({ x: Math.random() * c.width, y: Math.random() * c.height, radius: 0, max: 220 + Math.random() * 320, speed: 1.6 + Math.random() }); }, 2200);
      let id;
      const loop = () => {
        ctx.fillStyle = "rgba(0,6,18,0.08)"; ctx.fillRect(0, 0, c.width, c.height);
        const g = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 70);
        g.addColorStop(0, "rgba(120,160,200,0.07)"); g.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(mouse.x, mouse.y, 70, 0, Math.PI * 2); ctx.fill();
        ripples.forEach((r, i) => {
          r.radius += r.speed;
          const alpha = 0.62 * (1 - r.radius / r.max);
          if (alpha < 0.01) { ripples.splice(i, 1); return; }
          ctx.strokeStyle = `rgba(140,180,220,${alpha})`; ctx.lineWidth = 2 + Math.sin(r.radius * .08) * 1.2;
          ctx.beginPath(); ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2); ctx.stroke();
        });
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => { c.removeEventListener('click', onClick); cancelAnimationFrame(id); } };
    }
  },

  {
    name: "Mouse Glow Trail",
    tags: ["mouse", "ambient"],
    description: "Warm glow particles follow cursor movement",
    code: `// Each move event spawns a glowing dot
canvas.addEventListener('mousemove', e => {
  if(rand() < 0.7) trail.push({x, y, life:1, hue});
});
// Fade and grow each frame`,
    animator: (c, ctx, mouse) => {
      let trail = [], id;
      const onMove = e => { const r = c.getBoundingClientRect(); if (Math.random() < .7) trail.push({ x: e.clientX - r.left, y: e.clientY - r.top, life: 1, hue: 25 + Math.random() * 30 }); };
      c.addEventListener('mousemove', onMove);
      const loop = () => {
        ctx.fillStyle = "rgba(0,0,0,0.13)"; ctx.fillRect(0, 0, c.width, c.height);
        trail.forEach((p, i) => {
          p.life -= 0.017;
          if (p.life <= 0) { trail.splice(i, 1); return; }
          const size = p.life * 13 + 4, alpha = p.life * .82;
          ctx.fillStyle = `hsla(${p.hue},65%,62%,${alpha})`; ctx.beginPath(); ctx.arc(p.x, p.y, size, 0, Math.PI * 2); ctx.fill();
          const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, size * 2.2);
          g.addColorStop(0, `hsla(${p.hue},65%,72%,${alpha * .32})`); g.addColorStop(1, "rgba(0,0,0,0)");
          ctx.fillStyle = g; ctx.beginPath(); ctx.arc(p.x, p.y, size * 2.2, 0, Math.PI * 2); ctx.fill();
        });
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => { c.removeEventListener('mousemove', onMove); cancelAnimationFrame(id); } };
    }
  },

  {
    name: "Gravity Well",
    tags: ["mouse", "ambient"],
    description: "Particles pulled toward cursor like a gravity source",
    code: `// Strong gravity: force = 1200/(dist*dist)
ps.forEach(p => {
  const force = 1200 / (dist*dist);
  p.vx += (dx/dist)*force;
  p.vx *= 0.94; // friction drag
});`,
    animator: (c, ctx, mouse) => {
      let ps = [], id;
      for (let i = 0; i < 220; i++) ps.push({ x: Math.random() * c.width, y: Math.random() * c.height, vx: 0, vy: 0, hue: 20 + Math.random() * 50 });
      const loop = () => {
        ctx.fillStyle = "rgba(0,0,0,0.09)"; ctx.fillRect(0, 0, c.width, c.height);
        ps.forEach(p => {
          const dx = mouse.x - p.x, dy = mouse.y - p.y, dist = Math.hypot(dx, dy) + 1, force = 1200 / (dist * dist);
          p.vx += dx / dist * force; p.vy += dy / dist * force; p.vx *= .94; p.vy *= .94;
          p.x += p.vx; p.y += p.vy;
          ctx.fillStyle = `hsl(${p.hue},60%,65%)`; ctx.beginPath(); ctx.arc(p.x, p.y, 2, 0, Math.PI * 2); ctx.fill();
        });
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },

  {
    name: "Confetti Click",
    tags: ["cute", "mouse"],
    description: "Click anywhere to explode colorful confetti",
    code: `// Square confetti with rotation & gravity
onClick: for(let i=0;i<90;i++) conf.push({
  vx: (rand()-0.5)*15,
  vy: (rand()-0.5)*15 - 8,
  rot, rotSpeed, life: 1
});
conf.vy += 0.22; // gravity`,
    animator: (c, ctx, mouse) => {
      let conf = [], id;
      const onClick = e => {
        const r = c.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top;
        for (let i = 0; i < 90; i++) conf.push({ x, y, vx: (Math.random() - .5) * 15, vy: (Math.random() - .5) * 15 - 8, size: Math.random() * 8 + 4, rot: Math.random() * Math.PI * 2, rotSpeed: (Math.random() - .5) * .18, hue: Math.random() * 360, life: 1 });
      };
      c.addEventListener('click', onClick);
      const loop = () => {
        ctx.fillStyle = "rgba(0,0,0,0.08)"; ctx.fillRect(0, 0, c.width, c.height);
        conf.forEach((p, i) => {
          p.x += p.vx; p.y += p.vy; p.vy += .22; p.rot += p.rotSpeed; p.life -= .009;
          if (p.life <= 0) { conf.splice(i, 1); return; }
          ctx.save(); ctx.globalAlpha = p.life; ctx.translate(p.x, p.y); ctx.rotate(p.rot);
          ctx.fillStyle = `hsl(${p.hue},65%,60%)`; ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
          ctx.restore();
        });
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => { c.removeEventListener('click', onClick); cancelAnimationFrame(id); } };
    }
  },

  {
    name: "Vortex Attractor",
    tags: ["mouse", "cosmic"],
    description: "Spinning vortex of particles centered on cursor",
    code: `// Angular velocity increases as dist decreases
ps.forEach(p => {
  p.angle -= 0.03 + (600 - p.dist)*0.00008;
  p.dist -= 1.2 + sin(t + p.angle)*0.5;
  if(p.dist < 20) p.dist = 500; // reset
});`,
    animator: (c, ctx, mouse) => {
      let ps = [], t = 0, id;
      for (let i = 0; i < 260; i++) ps.push({ angle: Math.random() * Math.PI * 2, dist: Math.random() * 400 + 50, hue: 20 + Math.random() * 60 });
      const loop = () => {
        t += .01; ctx.fillStyle = "rgba(0,0,0,0.11)"; ctx.fillRect(0, 0, c.width, c.height);
        ps.forEach(p => {
          p.angle -= .03 + (600 - p.dist) * .00008; p.dist -= 1.2 + Math.sin(t + p.angle) * .5;
          if (p.dist < 20) { p.dist = 500 + Math.random() * 200; p.angle = Math.random() * Math.PI * 2; }
          const x = mouse.x + Math.cos(p.angle) * p.dist, y = mouse.y + Math.sin(p.angle) * p.dist * .7;
          ctx.fillStyle = `hsl(${p.hue + (t * 15 | 0)},60%,62%)`; ctx.beginPath(); ctx.arc(x, y, 1.5 + (600 - p.dist) / 100, 0, Math.PI * 2); ctx.fill();
        });
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },

  {
    name: "Click Burst Rings",
    tags: ["mouse", "water"],
    description: "Click for concentric ring bursts; mousemove adds subtle rings",
    code: `// Multiple staggered rings per click
for(let i=0;i<5;i++) rings.push({
  maxRadius: 100 + i*80,
  speed: 2.8 + i*0.8,
  life: 1  // alpha tracks 1 - r/max
});`,
    animator: (c, ctx, mouse) => {
      let expl = [], id;
      const onClick = e => {
        const r = c.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top, hue = Math.random() * 60 + 20;
        for (let i = 0; i < 5; i++) expl.push({ x, y, radius: 0, maxRadius: 100 + i * 80 + Math.random() * 100, speed: 2.8 + i * .8 + Math.random(), hue: (hue + i * 18) % 80 + 20, life: 1 });
      };
      const onMove = e => {
        if (Math.random() < .04) { const r = c.getBoundingClientRect(); expl.push({ x: e.clientX - r.left, y: e.clientY - r.top, radius: 0, maxRadius: 50 + Math.random() * 80, speed: 1.8 + Math.random(), hue: Math.random() * 60 + 20, life: 1 }); }
      };
      c.addEventListener('click', onClick); c.addEventListener('mousemove', onMove);
      const loop = () => {
        ctx.fillStyle = "rgba(0,0,0,0.1)"; ctx.fillRect(0, 0, c.width, c.height);
        expl.forEach((ex, i) => {
          ex.radius += ex.speed; ex.life = 1 - ex.radius / ex.maxRadius;
          if (ex.life <= 0) { expl.splice(i, 1); return; }
          ctx.strokeStyle = `hsla(${ex.hue},60%,62%,${ex.life * .62})`; ctx.lineWidth = 3 + ex.life * 7;
          ctx.beginPath(); ctx.arc(ex.x, ex.y, ex.radius, 0, Math.PI * 2); ctx.stroke();
        });
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => { c.removeEventListener('click', onClick); c.removeEventListener('mousemove', onMove); cancelAnimationFrame(id); } };
    }
  }
];
