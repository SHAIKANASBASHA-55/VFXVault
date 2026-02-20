// ─────────────────────────────────────────────────
//  AMBIENT & CUTE EFFECTS
// ─────────────────────────────────────────────────

export const ambientEffects = [
  {
    name: "Rising Bubbles",
    tags: ["water", "ambient"],
    description: "Translucent bubbles drift upward toward cursor",
    code: `// Radial gradient gives a glassy sphere look
const g = ctx.createRadialGradient(b.x-r*.3, b.y-r*.3, 0, b.x, b.y, r);
g.addColorStop(0, 'rgba(200,235,255,0.85)');
g.addColorStop(1, 'rgba(60,130,200,0.08)');`,
    animator: (c, ctx, mouse) => {
      let bs = [];
      for (let i = 0; i < 80; i++) bs.push({ x: Math.random() * c.width, y: c.height + 30, r: Math.random() * 15 + 5, speed: Math.random() * 2 + 0.8 });
      let id;
      const loop = () => {
        ctx.fillStyle = "rgba(0,10,28,0.07)"; ctx.fillRect(0, 0, c.width, c.height);
        bs.forEach(b => {
          b.y -= b.speed; b.x += Math.sin(b.y / 28) * 1.2 + (mouse.x - b.x) * 0.0007;
          if (b.y < -b.r) b.y = c.height + b.r;
          const g = ctx.createRadialGradient(b.x - b.r * .3, b.y - b.r * .3, 0, b.x, b.y, b.r);
          g.addColorStop(0, "rgba(200,235,255,0.85)"); g.addColorStop(.5, "rgba(100,180,230,0.35)"); g.addColorStop(1, "rgba(60,130,200,0.08)");
          ctx.fillStyle = g; ctx.beginPath(); ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2); ctx.fill();
        });
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },

  {
    name: "Breathing Orb",
    tags: ["ambient", "cosmic", "mouse"],
    description: "Pulsing fire orb that follows the cursor gently",
    code: `// Sine-driven pulse + particle ejection bursts
const pulse = sin(t*1.8)*0.5 + 0.5;
const r = 60 + pulse*50;
if(sin(t*5) > 0.92) spawnParticleBurst(cx, cy);`,
    animator: (c, ctx, mouse) => {
      let t = 0, ps = [], id;
      const loop = () => {
        t += .016; ctx.fillStyle = "rgba(0,0,0,0.1)"; ctx.fillRect(0, 0, c.width, c.height);
        const cx = mouse.x * .4 + c.width / 2 * .6, cy = mouse.y * .4 + c.height / 2 * .6, pulse = Math.sin(t * 1.8) * .5 + .5, r = 60 + pulse * 50;
        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r * 1.8);
        grad.addColorStop(0, "rgba(200,140,80,0.85)"); grad.addColorStop(.5, "rgba(160,100,60,0.4)"); grad.addColorStop(1, "rgba(80,60,40,0)");
        ctx.fillStyle = grad; ctx.beginPath(); ctx.arc(cx, cy, r * 1.8, 0, Math.PI * 2); ctx.fill();
        if (Math.sin(t * 5) > .92) for (let i = 0; i < 12; i++) { const a = Math.random() * Math.PI * 2; ps.push({ x: cx, y: cy, vx: Math.cos(a) * (3 + Math.random() * 4), vy: Math.sin(a) * (3 + Math.random() * 4), life: 1, hue: 20 + Math.random() * 40 }); }
        ps.forEach((p, i) => { p.x += p.vx; p.y += p.vy; p.life -= .012; if (p.life <= 0) { ps.splice(i, 1); return; } ctx.fillStyle = `hsla(${p.hue},65%,58%,${p.life})`; ctx.beginPath(); ctx.arc(p.x, p.y, 2 + p.life * 3, 0, Math.PI * 2); ctx.fill(); });
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },

  {
    name: "Fire & Embers",
    tags: ["fire", "ambient", "mouse"],
    description: "Embers rise from cursor position continuously",
    code: `// Upward ember with gravity-countered velocity
const spawn = (x, y) => embers.push({
  vy: -(rand()*4.5 + 4.5),  // launch upward
  vx: (rand()-0.5)*2.5,
  life: 1, hue: 15 + rand()*35
});`,
    animator: (c, ctx, mouse) => {
      let embers = [], id;
      const spawn = (x, y) => { for (let i = 0; i < 4; i++) embers.push({ x: x + (Math.random() - .5) * 50, y, vx: (Math.random() - .5) * 2.5, vy: -(Math.random() * 4.5 + 4.5), size: Math.random() * 5 + 2.5, life: 1, hue: 15 + Math.random() * 35 }); };
      const iv = setInterval(() => spawn(mouse.x, c.height - 10), 150);
      spawn(c.width / 2, c.height - 10);
      const loop = () => {
        ctx.fillStyle = "rgba(0,0,0,0.13)"; ctx.fillRect(0, 0, c.width, c.height);
        embers.forEach((e, i) => { e.x += e.vx; e.y += e.vy; e.vy += .09; e.vx *= .99; e.life -= .009; e.size *= .993; if (e.life <= 0 || e.y < -20) { embers.splice(i, 1); return; } ctx.fillStyle = `hsla(${e.hue},85%,${55 + e.life * 40}%,${e.life * .82})`; ctx.beginPath(); ctx.arc(e.x, e.y, e.size, 0, Math.PI * 2); ctx.fill(); });
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => { clearInterval(iv); cancelAnimationFrame(id); } };
    }
  },

  {
    name: "Rising Hearts",
    tags: ["cute", "ambient"],
    description: "Hearts float upward with gentle swaying motion",
    code: `// Bezier curve heart shape
ctx.moveTo(0,-10);
ctx.bezierCurveTo(10,-20,20,-5,0,15);
ctx.bezierCurveTo(-20,-5,-10,-20,0,-10);`,
    animator: (c, ctx, mouse) => {
      let hearts = [], t = 0, id;
      const spawn = () => hearts.push({ x: Math.random() * c.width, y: c.height + 30, size: Math.random() * 17 + 10, speed: Math.random() * 1.6 + .8, sway: Math.random() * .03 + .015, phase: Math.random() * Math.PI * 2, hue: Math.random() * 20 });
      setInterval(spawn, 450); spawn(); spawn();
      const loop = () => {
        t += .016; ctx.fillStyle = "rgba(0,0,0,0.08)"; ctx.fillRect(0, 0, c.width, c.height);
        hearts.forEach((h, i) => {
          h.y -= h.speed; h.x += Math.sin(t * 3 + h.phase + h.y * h.sway) * 1.6 + (mouse.x - c.width / 2) * .0007;
          if (h.y < -h.size * 2) { hearts.splice(i, 1); return; }
          ctx.save(); ctx.translate(h.x, h.y); ctx.scale(h.size / 20, h.size / 20); ctx.rotate(Math.sin(t * 4 + h.phase) * .12);
          ctx.fillStyle = `hsla(${h.hue},65%,58%,0.85)`;
          ctx.beginPath(); ctx.moveTo(0, -10); ctx.bezierCurveTo(10, -20, 20, -5, 0, 15); ctx.bezierCurveTo(-20, -5, -10, -20, 0, -10); ctx.closePath(); ctx.fill();
          ctx.restore();
        });
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },

  {
    name: "Floating Lanterns",
    tags: ["ambient", "cute", "nature"],
    description: "Warm glowing lanterns drift upward slowly",
    code: `// Radial gradient lantern glow
const g = ctx.createRadialGradient(x, y, 0, x, y, size*1.6);
g.addColorStop(0, \`hsla(\${hue},85%,82%,0.88)\`);
g.addColorStop(1, 'rgba(0,0,0,0)');`,
    animator: (c, ctx, mouse) => {
      let lans = [], t = 0, id;
      for (let i = 0; i < 26; i++) lans.push({ x: Math.random() * c.width, y: Math.random() * c.height * 1.2, size: Math.random() * 20 + 14, speed: Math.random() * .8 + .3, sway: Math.random() * .02 + .008, phase: Math.random() * Math.PI * 2, hue: 20 + Math.random() * 55 });
      const loop = () => {
        t += .008; ctx.fillStyle = "rgba(0,0,18,0.06)"; ctx.fillRect(0, 0, c.width, c.height);
        lans.forEach(l => {
          l.y -= l.speed; l.x += Math.sin(t * 1.5 + l.phase + l.y * l.sway) * 2 + (mouse.x - c.width / 2) * .0004;
          if (l.y < -l.size * 2) { l.y = c.height + l.size * 2; l.x = Math.random() * c.width; }
          const g = ctx.createRadialGradient(l.x, l.y, 0, l.x, l.y, l.size * 1.6);
          g.addColorStop(0, `hsla(${l.hue},85%,82%,0.88)`); g.addColorStop(.4, `hsla(${l.hue + 20},75%,62%,0.48)`); g.addColorStop(1, "rgba(0,0,0,0)");
          ctx.fillStyle = g; ctx.beginPath(); ctx.arc(l.x, l.y, l.size * 1.6, 0, Math.PI * 2); ctx.fill();
          ctx.fillStyle = "rgba(248,205,85,0.82)"; ctx.beginPath(); ctx.arc(l.x, l.y - l.size * .55, 3 + Math.sin(t * 14 + l.phase) * 1.8, 0, Math.PI * 2); ctx.fill();
        });
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },

  {
    name: "Heartbeat Ripple",
    tags: ["cute", "ambient", "mouse"],
    description: "Pulsing heartbeat with expanding ripple rings",
    code: `// Sine wave simulates cardiac rhythm
const beat = sin(t*6)*0.5 + 0.5;
const r = 40 + beat*75;
// Pulse ring emission every 800ms
setInterval(() => pulses.push({radius:0, alpha:0.72}), 800);`,
    animator: (c, ctx, mouse) => {
      let t = 0, pulses = [], id;
      const iv = setInterval(() => pulses.push({ radius: 0, alpha: .72 }), 800);
      const loop = () => {
        t += .016; ctx.fillStyle = "rgba(0,0,0,0.1)"; ctx.fillRect(0, 0, c.width, c.height);
        const cx = mouse.x * .4 + c.width / 2 * .6, cy = mouse.y * .4 + c.height / 2 * .6, beat = Math.sin(t * 6) * .5 + .5, r = 40 + beat * 75;
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r * 1.5);
        g.addColorStop(0, `rgba(192,55,70,${.82 * beat})`); g.addColorStop(1, "rgba(192,55,70,0)");
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, r * 1.5, 0, Math.PI * 2); ctx.fill();
        pulses.forEach((p, i) => { p.radius += 4; p.alpha -= .008; if (p.alpha <= 0) { pulses.splice(i, 1); return; } ctx.strokeStyle = `rgba(195,72,88,${p.alpha})`; ctx.lineWidth = 3 + p.alpha * 5; ctx.beginPath(); ctx.arc(cx, cy, p.radius, 0, Math.PI * 2); ctx.stroke(); });
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => { clearInterval(iv); cancelAnimationFrame(id); } };
    }
  },

  {
    name: "Pastel Aurora",
    tags: ["ambient", "nature", "cosmic"],
    description: "Soft pastel aurora waves with mouse Y amplitude control",
    code: `// 7 layered aurora bands
for(let i=0;i<7;i++){
  const amp = 80 + i*24 + (mouseY/H - 0.5)*80;
  // traced sine wave path, filled to bottom
  ctx.fillStyle = \`hsla(\${160+i*28},52%,58%,0.1)\`;
}`,
    animator: (c, ctx, mouse) => {
      let t = 0, id;
      const loop = () => {
        t += .006; ctx.fillStyle = "rgba(8,5,25,0.09)"; ctx.fillRect(0, 0, c.width, c.height);
        for (let i = 0; i < 7; i++) {
          const amp = 80 + i * 24 + (mouse.y / c.height - .5) * 80, freq = .0005 + i * .0003, phase = t * (.3 + i * .15) + i * 3;
          ctx.beginPath(); ctx.moveTo(0, c.height * .6);
          for (let x = 0; x <= c.width; x += 10) { const y = c.height * .3 + Math.sin(x * freq + phase) * amp + Math.sin(x * freq * 2.4 + phase * 1.5) * (amp * .4); ctx.lineTo(x, y); }
          ctx.lineTo(c.width, c.height); ctx.lineTo(0, c.height); ctx.closePath();
          ctx.fillStyle = `hsla(${160 + i * 28 + Math.sin(t * .4) * 35},52%,${58 + i * 3}%,${.1 + i * .048})`; ctx.fill();
        }
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },

  {
    name: "Floating Emojis",
    tags: ["cute", "ambient"],
    description: "Cheerful emojis float upward with mouse wind",
    code: `// Emoji string rendering on canvas
const em = ['❤️','✨','🌟','😊','🥰','🌈'];
ctx.font = \`\${size}px sans-serif\`;
ctx.fillText(emoji, item.x, item.y);`,
    animator: (c, ctx, mouse) => {
      const em = ["❤️", "✨", "🌟", "😊", "🥰", "🌈", "🍭", "🎀", "🦋", "🌸"];
      let items = [], t = 0, id;
      for (let i = 0; i < 45; i++) items.push({ x: Math.random() * c.width, y: c.height + 50, emoji: em[Math.floor(Math.random() * em.length)], size: Math.random() * 26 + 15, speed: Math.random() * 1.1 + .55, phase: Math.random() * Math.PI * 2 });
      const loop = () => {
        t += .008; ctx.fillStyle = "rgba(18,8,35,0.06)"; ctx.fillRect(0, 0, c.width, c.height);
        const wind = (mouse.x / c.width - .5) * 2;
        items.forEach(item => {
          item.y -= item.speed; item.x += Math.sin(t * 2 + item.phase) * 2.6 + wind;
          if (item.y < -item.size * 2) { item.y = c.height + item.size * 2; item.x = Math.random() * c.width; }
          ctx.font = `${item.size}px sans-serif`; ctx.fillText(item.emoji, item.x - item.size / 2, item.y + item.size / 3);
        });
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },

  {
    name: "Bouncing Balls",
    tags: ["ambient", "cute", "mouse"],
    description: "Balls bounce off walls and flee the cursor",
    code: `// Wall bounce + mouse repulsion
if(b.x < b.r || b.x > W-b.r) b.vx *= -0.97;
const dm = hypot(b.x-mouseX, b.y-mouseY);
if(dm < 120) { b.vx += (b.x-mouseX)/dm*1.8; }`,
    animator: (c, ctx, mouse) => {
      let balls = [], id;
      for (let i = 0; i < 12; i++) balls.push({ x: Math.random() * c.width, y: Math.random() * c.height, vx: (Math.random() - .5) * 6, vy: (Math.random() - .5) * 6, radius: Math.random() * 20 + 14, hue: 20 + Math.random() * 60, trail: [] });
      const loop = () => {
        ctx.fillStyle = "rgba(0,0,0,0.12)"; ctx.fillRect(0, 0, c.width, c.height);
        balls.forEach(b => {
          b.x += b.vx; b.y += b.vy;
          if (b.x < b.radius || b.x > c.width - b.radius) b.vx *= -.97;
          if (b.y < b.radius || b.y > c.height - b.radius) b.vy *= -.97;
          const dm = Math.hypot(b.x - mouse.x, b.y - mouse.y);
          if (dm < 120) { b.vx += (b.x - mouse.x) / dm * 1.8; b.vy += (b.y - mouse.y) / dm * 1.8; }
          b.trail.push({ x: b.x, y: b.y, a: 1 }); if (b.trail.length > 24) b.trail.shift();
          b.trail.forEach((p, j) => { ctx.fillStyle = `hsla(${b.hue},55%,57%,${p.a * .42 * (j / b.trail.length)})`; ctx.beginPath(); ctx.arc(p.x, p.y, b.radius * (j / b.trail.length * .8 + .2), 0, Math.PI * 2); ctx.fill(); p.a -= .04; });
          ctx.fillStyle = `hsl(${b.hue},55%,56%)`; ctx.beginPath(); ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2); ctx.fill();
        });
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  }
];
