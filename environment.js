// ─────────────────────────────────────────────────
//  ENVIRONMENT EFFECTS
// ─────────────────────────────────────────────────

export const environmentEffects = [
  {
    name: "Rain Storm",
    tags: ["environment", "nature", "water"],
    description: "Heavy rain streaks fall with wind drift and splash on ground",
    code: `// Angled rain streak + ground splash ring
ctx.moveTo(r.x, r.y);
ctx.lineTo(r.x + windX * r.len, r.y + r.len);
if(r.y > H) spawnSplash(r.x, H);`,
    animator: (c, ctx, mouse) => {
      let drops = [], splashes = [], id;
      for (let i = 0; i < 220; i++) drops.push({ x: Math.random() * c.width * 1.4 - c.width * .2, y: Math.random() * c.height, len: Math.random() * 22 + 10, speed: Math.random() * 12 + 10, alpha: Math.random() * .5 + .3 });
      const spawnSplash = (x, y) => { for (let i = 0; i < 4; i++) splashes.push({ x, y, r: 0, maxR: Math.random() * 18 + 6, alpha: .7 }); };
      const loop = () => {
        ctx.fillStyle = "rgba(8,14,28,0.22)"; ctx.fillRect(0, 0, c.width, c.height);
        const wind = (mouse.x / c.width - .5) * 5;
        drops.forEach(r => {
          r.x += wind + 1.5; r.y += r.speed;
          if (r.y > c.height) { spawnSplash(r.x, c.height - 2); r.y = -r.len; r.x = Math.random() * c.width * 1.4 - c.width * .2; }
          ctx.strokeStyle = `rgba(160,200,240,${r.alpha})`; ctx.lineWidth = .8;
          ctx.beginPath(); ctx.moveTo(r.x, r.y); ctx.lineTo(r.x + (wind + 1.5) * 1.5, r.y + r.len); ctx.stroke();
        });
        splashes.forEach((s, i) => { s.r += 1.8; s.alpha -= .045; if (s.alpha <= 0) { splashes.splice(i, 1); return; } ctx.strokeStyle = `rgba(160,210,255,${s.alpha})`; ctx.lineWidth = .9; ctx.beginPath(); ctx.arc(s.x, s.y, s.r, Math.PI, Math.PI * 2); ctx.stroke(); });
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },

  {
    name: "Falling Snow",
    tags: ["environment", "nature", "winter"],
    description: "Soft snowflakes drift and accumulate with mouse wind",
    code: `// Snowflake drift with accumulation layer
flake.x += sin(t + flake.phase) * 1.4 + wind;
flake.y += flake.speed;
if(flake.y > H) drawSnowPile(flake.x);`,
    animator: (c, ctx, mouse) => {
      let flakes = [], t = 0, id;
      for (let i = 0; i < 180; i++) flakes.push({ x: Math.random() * c.width, y: Math.random() * c.height, r: Math.random() * 5 + 1.5, speed: Math.random() * 1.5 + .4, phase: Math.random() * Math.PI * 2, alpha: Math.random() * .5 + .4 });
      const loop = () => {
        t += .012; ctx.fillStyle = "rgba(10,15,30,0.15)"; ctx.fillRect(0, 0, c.width, c.height);
        const wind = (mouse.x / c.width - .5) * 2.5;
        flakes.forEach(f => {
          f.x += Math.sin(t * 1.2 + f.phase) * 1.4 + wind; f.y += f.speed;
          if (f.y > c.height + f.r) { f.y = -f.r; f.x = Math.random() * c.width; }
          if (f.x < -10) f.x = c.width + 10; if (f.x > c.width + 10) f.x = -10;
          ctx.fillStyle = `rgba(220,235,255,${f.alpha})`; ctx.beginPath(); ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2); ctx.fill();
        });
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },

  {
    name: "Autumn Leaves",
    tags: ["environment", "nature", "seasonal"],
    description: "Colorful leaves tumble and spin in the breeze",
    code: `// Leaf polygon with rotation + flutter
ctx.rotate(leaf.angle);
ctx.scale(1, 0.6);
ctx.ellipse(0, 0, leaf.size, leaf.size*0.6, 0, 0, PI*2);
leaf.angle += leaf.spin;`,
    animator: (c, ctx, mouse) => {
      let leaves = [], t = 0, id;
      const colors = ["#c0392b","#e67e22","#d35400","#f39c12","#8e44ad","#c0a020","#a93226"];
      for (let i = 0; i < 55; i++) leaves.push({ x: Math.random() * c.width, y: Math.random() * c.height, size: Math.random() * 14 + 7, speed: Math.random() * 1.2 + .5, spin: (Math.random() - .5) * .06, angle: Math.random() * Math.PI * 2, phase: Math.random() * Math.PI * 2, color: colors[Math.floor(Math.random() * colors.length)], flutter: Math.random() * .04 + .01 });
      const loop = () => {
        t += .014; ctx.fillStyle = "rgba(12,8,4,0.12)"; ctx.fillRect(0, 0, c.width, c.height);
        const wind = (mouse.x / c.width - .5) * 3;
        leaves.forEach(l => {
          l.x += Math.sin(t * 1.5 + l.phase) * 2.5 + wind; l.y += l.speed; l.angle += l.spin + Math.sin(t * 3 + l.phase) * l.flutter;
          if (l.y > c.height + l.size * 2) { l.y = -l.size * 2; l.x = Math.random() * c.width; }
          ctx.save(); ctx.translate(l.x, l.y); ctx.rotate(l.angle); ctx.scale(1, .55);
          ctx.fillStyle = l.color + "cc"; ctx.beginPath(); ctx.ellipse(0, 0, l.size, l.size * .6, 0, 0, Math.PI * 2); ctx.fill();
          ctx.strokeStyle = "rgba(0,0,0,0.2)"; ctx.lineWidth = .5; ctx.beginPath(); ctx.moveTo(-l.size, 0); ctx.lineTo(l.size, 0); ctx.stroke();
          ctx.restore();
        });
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },

  {
    name: "Thunder Cloud",
    tags: ["environment", "storm", "dramatic"],
    description: "Dark clouds churn with lightning bolt flashes",
    code: `// Lightning bolt drawn as jagged polyline
const bolt = (x, y, len) => {
  let cy = y;
  while(cy < y + len) {
    ctx.lineTo(x + (rand()-0.5)*40, cy += 18);
  }
};`,
    animator: (c, ctx, mouse) => {
      let particles = [], flashAlpha = 0, nextFlash = 80, t = 0, id;
      for (let i = 0; i < 120; i++) particles.push({ x: Math.random() * c.width, y: Math.random() * c.height * .7, vx: (Math.random() - .5) * .8, vy: (Math.random() - .5) * .3, r: Math.random() * 30 + 12, alpha: Math.random() * .25 + .08 });
      const drawLightning = (x, y) => {
        ctx.strokeStyle = `rgba(200,220,255,0.92)`; ctx.lineWidth = 2.5; ctx.shadowColor = "rgba(180,200,255,1)"; ctx.shadowBlur = 18;
        ctx.beginPath(); ctx.moveTo(x, y); let cy = y, cx2 = x;
        while (cy < y + 200) { cx2 += (Math.random() - .5) * 44; cy += 18; ctx.lineTo(cx2, cy); }
        ctx.stroke(); ctx.shadowBlur = 0;
      };
      const loop = () => {
        t++; ctx.fillStyle = "rgba(5,5,14,0.18)"; ctx.fillRect(0, 0, c.width, c.height);
        particles.forEach(p => {
          p.x += p.vx + (mouse.x - c.width / 2) * .0005; p.y += p.vy;
          if (p.x < -p.r * 2) p.x = c.width + p.r; if (p.x > c.width + p.r * 2) p.x = -p.r;
          if (p.y < -p.r) p.y = c.height * .7 + p.r; if (p.y > c.height * .7 + p.r) p.y = -p.r;
          const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
          g.addColorStop(0, `rgba(60,65,90,${p.alpha})`); g.addColorStop(1, "rgba(0,0,0,0)");
          ctx.fillStyle = g; ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
        });
        if (flashAlpha > 0) { ctx.fillStyle = `rgba(200,220,255,${flashAlpha * .12})`; ctx.fillRect(0, 0, c.width, c.height); flashAlpha -= .04; }
        if (t >= nextFlash) { drawLightning(c.width * .2 + Math.random() * c.width * .6, 0); flashAlpha = 1; nextFlash = t + 60 + Math.floor(Math.random() * 120); }
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },

  {
    name: "Fireflies",
    tags: ["environment", "nature", "night"],
    description: "Glowing fireflies blink and drift through darkness",
    code: `// Sine-wave blink cycle per firefly
const glow = sin(t * f.blinkSpeed + f.phase) * 0.5 + 0.5;
ctx.shadowBlur = 18 * glow;
ctx.fillStyle = \`hsla(75,90%,70%,\${glow})\`;`,
    animator: (c, ctx, mouse) => {
      let flies = [], t = 0, id;
      for (let i = 0; i < 60; i++) flies.push({ x: Math.random() * c.width, y: Math.random() * c.height, vx: (Math.random() - .5) * .8, vy: (Math.random() - .5) * .8, phase: Math.random() * Math.PI * 2, blinkSpeed: Math.random() * 2 + 1, r: Math.random() * 2.5 + 1.5 });
      const loop = () => {
        t += .016; ctx.fillStyle = "rgba(0,5,0,0.14)"; ctx.fillRect(0, 0, c.width, c.height);
        flies.forEach(f => {
          f.x += f.vx + (mouse.x - f.x) * .0004; f.y += f.vy + (mouse.y - f.y) * .0004;
          f.vx += (Math.random() - .5) * .12; f.vy += (Math.random() - .5) * .12;
          f.vx *= .98; f.vy *= .98;
          if (f.x < 0) f.x = c.width; if (f.x > c.width) f.x = 0;
          if (f.y < 0) f.y = c.height; if (f.y > c.height) f.y = 0;
          const glow = Math.sin(t * f.blinkSpeed + f.phase) * .5 + .5;
          ctx.shadowColor = "rgba(180,255,100,0.9)"; ctx.shadowBlur = 22 * glow;
          ctx.fillStyle = `hsla(75,90%,70%,${glow * .95})`; ctx.beginPath(); ctx.arc(f.x, f.y, f.r * (.5 + glow * .5), 0, Math.PI * 2); ctx.fill();
          ctx.shadowBlur = 0;
        });
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },

  {
    name: "Desert Sand",
    tags: ["environment", "nature", "wind"],
    description: "Sand particles stream across the canvas driven by cursor wind",
    code: `// Mouse-driven horizontal wind + gravity arc
p.vx = lerp(p.vx, windX * p.mass, 0.04);
p.vy += 0.08;
ctx.fillStyle = \`hsla(38,72%,\${55+rand()*20}%,\${p.alpha})\`;`,
    animator: (c, ctx, mouse) => {
      let particles = [], id;
      for (let i = 0; i < 350; i++) particles.push({ x: Math.random() * c.width, y: Math.random() * c.height, vx: Math.random() * 3 + 1, vy: (Math.random() - .5) * .5, mass: Math.random() * .7 + .3, r: Math.random() * 2 + .5, alpha: Math.random() * .6 + .2, hue: 30 + Math.random() * 20 });
      const loop = () => {
        ctx.fillStyle = "rgba(22,14,6,0.18)"; ctx.fillRect(0, 0, c.width, c.height);
        const windX = (mouse.x / c.width) * 8 + 1;
        particles.forEach(p => {
          p.vx += (windX * p.mass - p.vx) * .04; p.vy += .04; p.vy *= .97;
          p.x += p.vx; p.y += p.vy;
          if (p.x > c.width + 5) p.x = -5; if (p.x < -5) p.x = c.width + 5;
          if (p.y > c.height + 5) { p.y = Math.random() * c.height * .5; p.x = Math.random() * c.width; }
          ctx.fillStyle = `hsla(${p.hue},72%,${55 + p.mass * 20}%,${p.alpha})`; ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
        });
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },

  {
    name: "Cherry Blossoms",
    tags: ["environment", "nature", "spring"],
    description: "Delicate pink petals float down on a gentle spring breeze",
    code: `// 5-petal flower drawn with arcs, rotated
for(let p=0; p<5; p++){
  ctx.rotate(PI*2/5);
  ctx.ellipse(0, -petal, petal*0.45, petal, 0, 0, PI*2);
}`,
    animator: (c, ctx, mouse) => {
      let petals = [], t = 0, id;
      for (let i = 0; i < 70; i++) petals.push({ x: Math.random() * c.width, y: Math.random() * c.height, size: Math.random() * 10 + 5, speed: Math.random() * 1.2 + .4, spin: (Math.random() - .5) * .04, angle: Math.random() * Math.PI * 2, phase: Math.random() * Math.PI * 2, hue: Math.random() * 20 });
      const loop = () => {
        t += .012; ctx.fillStyle = "rgba(8,4,10,0.1)"; ctx.fillRect(0, 0, c.width, c.height);
        const wind = (mouse.x / c.width - .5) * 2;
        petals.forEach(p => {
          p.x += Math.sin(t + p.phase) * 1.8 + wind; p.y += p.speed; p.angle += p.spin;
          if (p.y > c.height + p.size * 2) { p.y = -p.size * 2; p.x = Math.random() * c.width; }
          ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.angle);
          for (let k = 0; k < 5; k++) {
            ctx.rotate((Math.PI * 2) / 5);
            ctx.fillStyle = `hsla(${345 + p.hue},78%,82%,0.82)`;
            ctx.beginPath(); ctx.ellipse(0, -p.size * .7, p.size * .35, p.size * .7, 0, 0, Math.PI * 2); ctx.fill();
          }
          ctx.restore();
        });
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },

  {
    name: "Ocean Foam",
    tags: ["environment", "water", "nature"],
    description: "Foamy white bubbles churn across a dark ocean surface",
    code: `// Ellipse cluster + wave undulation
const wave = sin(x * freq + t) * amp;
ctx.fillStyle = \`rgba(220,238,255,\${bubble.alpha})\`;
ctx.ellipse(bx, wave + by, bw, bh, 0, 0, PI*2);`,
    animator: (c, ctx, mouse) => {
      let bubbles = [], t = 0, id;
      for (let i = 0; i < 160; i++) bubbles.push({ x: Math.random() * c.width, y: c.height * (.55 + Math.random() * .45), vx: (Math.random() - .3) * 1.5, r: Math.random() * 8 + 2, alpha: Math.random() * .5 + .2, wave: Math.random() * .08 + .02, phase: Math.random() * Math.PI * 2 });
      const loop = () => {
        t += .018; ctx.fillStyle = "rgba(0,12,28,0.18)"; ctx.fillRect(0, 0, c.width, c.height);
        const waveY = c.height * .55 + Math.sin(t * .8 + mouse.x * .004) * 30;
        ctx.fillStyle = "rgba(20,60,100,0.55)"; ctx.fillRect(0, waveY, c.width, c.height - waveY);
        bubbles.forEach(b => {
          b.x += b.vx + (mouse.x / c.width - .5) * .5; b.y += Math.sin(t * 2.5 + b.phase) * b.wave;
          if (b.x > c.width + b.r) b.x = -b.r; if (b.x < -b.r) b.x = c.width + b.r;
          if (b.y < waveY - b.r * 4) b.alpha -= .02; else b.alpha = Math.min(b.alpha + .01, .7);
          ctx.fillStyle = `rgba(210,235,255,${b.alpha})`; ctx.beginPath(); ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2); ctx.fill();
        });
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  }
];
