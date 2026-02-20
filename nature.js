// ─────────────────────────────────────────────────
//  NATURE EFFECTS
// ─────────────────────────────────────────────────

export const natureEffects = [
  {
    name: "Snowfall",
    tags: ["nature", "ambient"],
    description: "Gentle snow drifts guided by mouse wind",
    code: `// Wind follows cursor — mouse X steers the snow
for(let i=0;i<220;i++) flakes.push({x,y,r,speed,sway});
const wind = (mouseX / W - 0.5) * 1.4;
flakes.forEach(f => { f.x += sin(t+sway)*0.4 + wind; });`,
    animator: (c, ctx, mouse) => {
      let ps = [];
      for (let i = 0; i < 220; i++)
        ps.push({ x: Math.random() * c.width, y: Math.random() * c.height, r: Math.random() * 4 + 1, speed: Math.random() * 1 + 0.4, sway: Math.random() * Math.PI * 2 });
      let id, t = 0;
      const loop = ts => {
        t = ts;
        ctx.fillStyle = "rgba(0,8,20,0.15)";
        ctx.fillRect(0, 0, c.width, c.height);
        const wind = (mouse.x / c.width - 0.5) * 1.4;
        ps.forEach(f => {
          f.y += f.speed; f.x += Math.sin(t * 0.001 + f.sway) * 0.4 + wind;
          if (f.y > c.height) f.y = 0;
          if (f.x < 0) f.x = c.width;
          if (f.x > c.width) f.x = 0;
          ctx.fillStyle = `rgba(210,225,255,${0.4 + f.r * 0.1})`;
          ctx.beginPath(); ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2); ctx.fill();
        });
        id = requestAnimationFrame(loop);
      };
      return { start: () => { id = requestAnimationFrame(loop); }, stop: () => cancelAnimationFrame(id) };
    }
  },

  {
    name: "Cherry Blossoms",
    tags: ["nature", "ambient", "cute"],
    description: "Soft pink petals swaying in the breeze",
    code: `// Petal rotation + wind from mouse
petals.forEach(p => {
  p.y += p.speed;
  p.x += sin(p.y*.008 + p.rot)*1.3 + wind;
  p.rot += p.rotSpeed;
  ctx.ellipse(0,0, size, size*0.6, 0, 0, PI*2);
});`,
    animator: (c, ctx, mouse) => {
      let petals = [];
      for (let i = 0; i < 90; i++)
        petals.push({ x: Math.random() * c.width, y: Math.random() * -c.height, size: Math.random() * 12 + 7, speed: Math.random() * 1.1 + 0.5, rot: Math.random() * Math.PI * 2, rotSpeed: (Math.random() - 0.5) * 0.07, hue: 330 + Math.random() * 25 });
      let id;
      const loop = () => {
        ctx.fillStyle = "rgba(6,10,22,0.07)";
        ctx.fillRect(0, 0, c.width, c.height);
        const wind = (mouse.x / c.width - 0.5) * 2.5;
        petals.forEach(p => {
          p.y += p.speed; p.x += Math.sin(p.y * .008 + p.rot) * 1.3 + wind; p.rot += p.rotSpeed;
          if (p.y > c.height + 20) { p.y = -20; p.x = Math.random() * c.width; }
          ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot);
          ctx.fillStyle = `hsla(${p.hue},55%,80%,0.78)`;
          ctx.beginPath(); ctx.ellipse(0, 0, p.size, p.size * 0.6, 0, 0, Math.PI * 2); ctx.fill();
          ctx.restore();
        });
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },

  {
    name: "Rain",
    tags: ["nature", "water", "ambient"],
    description: "Rainfall tilts with mouse horizontal movement",
    code: `// Slanted rain driven by mouse X
const wind = (mouseX / W - 0.5) * 3;
drops.forEach(d => {
  d.y += d.speed; d.x += wind;
  ctx.lineTo(d.x + wind*2, d.y + d.len);
});`,
    animator: (c, ctx, mouse) => {
      let drops = [];
      for (let i = 0; i < 180; i++)
        drops.push({ x: Math.random() * c.width, y: Math.random() * -c.height, len: Math.random() * 18 + 8, speed: Math.random() * 10 + 6 });
      let id;
      const loop = () => {
        ctx.fillStyle = "rgba(0,6,18,0.08)";
        ctx.fillRect(0, 0, c.width, c.height);
        const wind = (mouse.x / c.width - 0.5) * 3;
        drops.forEach(d => {
          d.y += d.speed; d.x += wind;
          if (d.y > c.height) { d.y = -d.len; d.x = Math.random() * c.width; }
          ctx.strokeStyle = "rgba(150,190,230,0.55)"; ctx.lineWidth = 1;
          ctx.beginPath(); ctx.moveTo(d.x, d.y); ctx.lineTo(d.x + wind * 2, d.y + d.len); ctx.stroke();
        });
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },

  {
    name: "Aurora Borealis",
    tags: ["nature", "ambient", "cosmic"],
    description: "Layered northern lights with mouse Y amplitude",
    code: `// 6 undulating layers, hue shifts over time
for(let i=0;i<6;i++){
  const amp = 60 + i*18 + (mouseY/H - 0.5)*50;
  // sin wave path → filled polygon
}`,
    animator: (c, ctx, mouse) => {
      let t = 0, id;
      const loop = () => {
        t += 0.007;
        ctx.fillStyle = "rgba(0,4,18,0.1)";
        ctx.fillRect(0, 0, c.width, c.height);
        for (let i = 0; i < 6; i++) {
          const amp = 60 + i * 18 + (mouse.y / c.height - 0.5) * 50, freq = 0.0006 + i * 0.00035, phase = t * (0.4 + i * 0.25) + i * 2.5, baseHue = 140 + i * 35 + Math.sin(t * 0.3) * 45;
          ctx.beginPath(); ctx.moveTo(0, c.height * .65);
          for (let x = 0; x <= c.width; x += 8) {
            const y = c.height * .35 + Math.sin(x * freq + phase) * amp + Math.sin(x * freq * 2.1 + phase * 1.4) * (amp * .35);
            ctx.lineTo(x, y);
          }
          ctx.lineTo(c.width, c.height); ctx.lineTo(0, c.height); ctx.closePath();
          ctx.fillStyle = `hsla(${baseHue | 0},65%,50%,${0.11 + i * .055})`; ctx.fill();
        }
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },

  {
    name: "Boid Swarm",
    tags: ["nature", "ambient", "mouse"],
    description: "Flocking birds with separation, cohesion & mouse avoidance",
    code: `// Classic boids: cohesion + separation + mouse flee
boids.forEach(b => {
  b.vx += (avgX - b.x)*0.007; // cohesion
  b.vx += separationX*0.35;   // separation
  // flee mouse within 140px
});`,
    animator: (c, ctx, mouse) => {
      let boids = [];
      for (let i = 0; i < 100; i++)
        boids.push({ x: Math.random() * c.width, y: Math.random() * c.height, vx: (Math.random() - .5) * 3, vy: (Math.random() - .5) * 3, hue: 30 + Math.random() * 40 });
      let id;
      const loop = () => {
        ctx.fillStyle = "rgba(0,0,0,0.09)";
        ctx.fillRect(0, 0, c.width, c.height);
        boids.forEach(b => {
          let cx = 0, cy = 0, sx = 0, sy = 0, cnt = 0;
          boids.forEach(o => {
            const d = Math.hypot(b.x - o.x, b.y - o.y);
            if (d < 90 && d > .1) { cx += o.x; cy += o.y; cnt++; if (d < 34) { sx += (b.x - o.x) / d; sy += (b.y - o.y) / d; } }
          });
          if (cnt > 0) { b.vx += (cx / cnt - b.x) * .007; b.vy += (cy / cnt - b.y) * .007; }
          b.vx += sx * .35; b.vy += sy * .35;
          const dm = Math.hypot(b.x - mouse.x, b.y - mouse.y);
          if (dm < 140) { b.vx += (b.x - mouse.x) / dm * .5; b.vy += (b.y - mouse.y) / dm * .5; }
          const spd = Math.hypot(b.vx, b.vy);
          if (spd > 5) { b.vx = b.vx / spd * 5; b.vy = b.vy / spd * 5; }
          b.x += b.vx; b.y += b.vy;
          if (b.x < 0) b.x = c.width; if (b.x > c.width) b.x = 0;
          if (b.y < 0) b.y = c.height; if (b.y > c.height) b.y = 0;
          ctx.fillStyle = `hsl(${b.hue},60%,62%)`;
          ctx.beginPath(); ctx.arc(b.x, b.y, 3, 0, Math.PI * 2); ctx.fill();
        });
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },

  {
    name: "Firefly Swarm",
    tags: ["nature", "ambient", "mouse"],
    description: "Glowing fireflies with trails drawn toward the cursor",
    code: `// Organic steering + glow trail
flies.forEach(f => {
  f.vx += sin(phase + t)*0.3 + (mouseX - f.x)*0.00015;
  f.trail.forEach((p,j) => {
    ctx.arc(p.x, p.y, 2+alpha*2.5, ...); // fading trail
  });
});`,
    animator: (c, ctx, mouse) => {
      let flies = [], id;
      for (let i = 0; i < 65; i++)
        flies.push({ x: Math.random() * c.width, y: Math.random() * c.height, vx: (Math.random() - .5) * 1.8, vy: (Math.random() - .5) * 1.8, phase: Math.random() * Math.PI * 2, trail: [] });
      const loop = () => {
        ctx.fillStyle = "rgba(0,0,0,0.09)"; ctx.fillRect(0, 0, c.width, c.height);
        const now = Date.now();
        flies.forEach(f => {
          f.vx += (Math.sin(f.phase + now * .0006) - .5) * .3 + (mouse.x - f.x) * .00015;
          f.vy += (Math.cos(f.phase + now * .0007) - .5) * .3 + (mouse.y - f.y) * .00015;
          f.x += f.vx; f.y += f.vy;
          if (f.x < 0 || f.x > c.width) f.vx *= -.9;
          if (f.y < 0 || f.y > c.height) f.vy *= -.9;
          f.trail.push({ x: f.x, y: f.y, a: 1 });
          if (f.trail.length > 22) f.trail.shift();
          f.trail.forEach((p, j) => {
            const alpha = p.a * (j / f.trail.length);
            ctx.fillStyle = `rgba(225,215,95,${alpha * .62})`;
            ctx.beginPath(); ctx.arc(p.x, p.y, 2 + alpha * 2.5, 0, Math.PI * 2); ctx.fill();
            p.a -= .04;
          });
          ctx.fillStyle = "rgba(242,232,135,0.9)";
          ctx.beginPath(); ctx.arc(f.x, f.y, 3.2, 0, Math.PI * 2); ctx.fill();
        });
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },

  {
    name: "Flower Bloom",
    tags: ["nature", "cute"],
    description: "Click to bloom flowers; auto-blooms every few seconds",
    code: `// Petal burst on click
const bloom = (cx, cy) => {
  for(let i=0;i<28;i++){
    const a = i*(PI*2/28);
    petals.push({vx: cos(a)*(1+rand*2.2), ...});
  }
};
canvas.addEventListener('click', e => bloom(x, y));`,
    animator: (c, ctx, mouse) => {
      let flowers = [], id;
      const bloom = (cx, cy) => {
        const hue = 20 + Math.random() * 60;
        for (let i = 0; i < 28; i++) {
          const a = i * (Math.PI * 2 / 28) + Math.random() * .4;
          flowers.push({ x: cx, y: cy, vx: Math.cos(a) * (1 + Math.random() * 2.2), vy: Math.sin(a) * (1 + Math.random() * 2.2), life: 1, size: 8 + Math.random() * 14, hue, rot: Math.random() * Math.PI * 2, rotSpeed: (Math.random() - .5) * .11 });
        }
      };
      setInterval(() => bloom(Math.random() * c.width, Math.random() * c.height), 2400);
      const onClick = e => { const r = c.getBoundingClientRect(); bloom(e.clientX - r.left, e.clientY - r.top); };
      c.addEventListener('click', onClick);
      const loop = () => {
        ctx.fillStyle = "rgba(0,0,0,0.08)"; ctx.fillRect(0, 0, c.width, c.height);
        flowers.forEach((f, i) => {
          f.x += f.vx; f.y += f.vy; f.vy += .04; f.life -= .006; f.rot += f.rotSpeed;
          if (f.life <= 0) { flowers.splice(i, 1); return; }
          ctx.save(); ctx.translate(f.x, f.y); ctx.rotate(f.rot); ctx.scale(f.life, f.life);
          ctx.fillStyle = `hsla(${f.hue},65%,62%,${f.life * .82})`;
          ctx.beginPath(); ctx.ellipse(0, 0, f.size, f.size * .4, 0, 0, Math.PI * 2); ctx.fill();
          ctx.restore();
        });
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => { c.removeEventListener('click', onClick); cancelAnimationFrame(id); } };
    }
  }
];
