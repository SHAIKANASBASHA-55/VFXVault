// ─────────────────────────────────────────────────
//  FLUID · ATMOSPHERIC · GEOMETRIC EFFECTS
// ─────────────────────────────────────────────────

export const fluidEffects = [
  // ─────────────────────────────────────────────────
//  FLUID & LIQUID EFFECTS
// ─────────────────────────────────────────────────

  {
    name: "Toxic Slime",
    tags: ["fluid", "organic", "viscous"],
    description: "Thick, bubbling radioactive goo with surface tension drips",
    code: `// Bubble expansion + periodic pop
const pop = sin(t + b.offset) > 0.98;
ctx.arc(b.x, b.y, b.r * (pop ? 1.5 : 1), ...);`,
    animator: (c, ctx, mouse) => {
      let bubbles = [], id, t = 0;
      for (let i = 0; i < 20; i++) bubbles.push({ x: Math.random() * c.width, y: Math.random() * c.height, r: Math.random() * 15 + 5, off: Math.random() * 10 });
      const loop = () => {
        t += 0.02; ctx.fillStyle = "#0a1a05"; ctx.fillRect(0, 0, c.width, c.height);
        bubbles.forEach(b => {
          const osc = Math.sin(t + b.off);
          ctx.fillStyle = `hsl(100, 80%, ${20 + osc * 10}%)`;
          ctx.beginPath(); ctx.arc(b.x, b.y, b.r + osc * 5, 0, Math.PI * 2); ctx.fill();
          ctx.strokeStyle = "#4f2"; ctx.lineWidth = 2; ctx.stroke();
        });
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },

  {
    name: "Mercury Pools",
    tags: ["fluid", "metal", "mercury"],
    description: "High-surface-tension metallic liquid that beads and merges",
    code: `// Sticky attraction between nearby droplets
const force = (other.r * self.r) / distSq;
self.vx += dx * force * 0.01;`,
    animator: (c, ctx, mouse) => {
      let drops = [], id;
      for (let i = 0; i < 30; i++) drops.push({ x: Math.random() * c.width, y: Math.random() * c.height, r: 10 + Math.random() * 15, vx: 0, vy: 0 });
      const loop = () => {
        ctx.fillStyle = "#111"; ctx.fillRect(0, 0, c.width, c.height);
        drops.forEach((d, i) => {
          const dx = mouse.x - d.x, dy = mouse.y - d.y, dist = Math.hypot(dx, dy);
          if (dist < 150) { d.vx += dx * 0.005; d.vy += dy * 0.005; }
          d.x += d.vx; d.y += d.vy; d.vx *= 0.92; d.vy *= 0.92;
          const g = ctx.createRadialGradient(d.x - d.r*0.3, d.y - d.r*0.3, 0, d.x, d.y, d.r);
          g.addColorStop(0, "#fff"); g.addColorStop(0.5, "#888"); g.addColorStop(1, "#333");
          ctx.fillStyle = g; ctx.beginPath(); ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2); ctx.fill();
        });
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },

  {
    name: "Deep Water",
    tags: ["fluid", "ocean", "ambient"],
    description: "Caustic light patterns refracting through a moving water surface",
    code: `// Additive voronoi-style caustic lines
const caustic = sin(x*0.05 + t) * cos(y*0.05 - t);
ctx.strokeStyle = \`rgba(255,255,255,\${caustic*0.2})\`;`,
    animator: (c, ctx, mouse) => {
      let t = 0, id;
      const loop = () => {
        t += 0.03; ctx.fillStyle = "#002b44"; ctx.fillRect(0, 0, c.width, c.height);
        ctx.globalCompositeOperation = "lighter";
        for (let i = 0; i < c.width; i += 50) {
          for (let j = 0; j < c.height; j += 50) {
            const shift = Math.sin(t + (i+j)*0.01) * 20;
            ctx.strokeStyle = "rgba(100, 200, 255, 0.15)";
            ctx.beginPath(); ctx.arc(i + shift, j + shift, 40, 0, Math.PI * 2); ctx.stroke();
          }
        }
        ctx.globalCompositeOperation = "source-over";
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },

  {
    name: "Bubbling Tar",
    tags: ["fluid", "thick", "dark"],
    description: "Slow, heavy black fluid with occasional viscous bursts",
    code: `// Slow vertical heave + elastic stretch
y += sin(t + x*0.01) * amplitude;
if(burst) drawElasticThread(x, y);`,
    animator: (c, ctx, mouse) => {
      let t = 0, id;
      const loop = () => {
        t += 0.01; ctx.fillStyle = "#050505"; ctx.fillRect(0, 0, c.width, c.height);
        ctx.fillStyle = "#111";
        for (let i = 0; i < c.width; i += 30) {
          const h = 100 + Math.sin(t + i * 0.05) * 50;
          ctx.fillRect(i, c.height - h, 28, h);
        }
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },

  {
    name: "Plasma Fuel",
    tags: ["fluid", "energy", "scifi"],
    description: "High-energy ionized fluid pulsing through a containment field",
    code: `// Sine-constrained flow + additive glow blending
const flowY = cy + Math.sin(p.x * 0.02 + t) * 40;
ctx.globalCompositeOperation = 'screen';
ctx.shadowBlur = 15;
ctx.shadowColor = 'cyan';`,
    animator: (c, ctx, mouse) => {
      let ps = [], t = 0, id;
      const loop = () => {
        t += 0.05;
        // Deep space background
        ctx.globalCompositeOperation = "source-over";
        ctx.fillStyle = "rgba(0, 5, 12, 0.15)"; 
        ctx.fillRect(0, 0, c.width, c.height);

        // Spawn plasma "blobs"
        if (ps.length < 60) {
          ps.push({
            x: -20,
            y: c.height / 2,
            size: Math.random() * 15 + 10,
            speed: Math.random() * 4 + 3,
            offset: Math.random() * Math.PI * 2,
            hue: 180 + Math.random() * 40 // Cyan to Blue range
          });
        }

        ctx.globalCompositeOperation = "screen";
        ps.forEach((p, i) => {
          p.x += p.speed;
          // Follow a wave path
          const wave = Math.sin(p.x * 0.015 + t) * 50;
          const targetY = (mouse.y * 0.2 + (c.height / 2) * 0.8) + wave;
          p.y += (targetY - p.y) * 0.1;

          // Fade out at the end of the screen
          const alpha = Math.min(1, (c.width - p.x) / 100);
          
          ctx.shadowBlur = 20;
          ctx.shadowColor = `hsla(${p.hue}, 100%, 50%, 0.8)`;
          ctx.fillStyle = `hsla(${p.hue}, 100%, 70%, ${alpha})`;
          
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();

          // Core pulse
          ctx.fillStyle = "white";
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 0.4, 0, Math.PI * 2);
          ctx.fill();

          // Recycle particles
          if (p.x > c.width + 20) {
            p.x = -20;
            p.speed = Math.random() * 4 + 3;
          }
        });

        ctx.shadowBlur = 0;
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },

  {
    name: "Wine Ripple",
    tags: ["fluid", "liquid", "classy"],
    description: "Deep red liquid with surface tension 'legs' on the container edge",
    code: `// Meniscus effect + color depth
const depth = (y / H);
ctx.fillStyle = \`rgba(120,0,20,\${0.4 + depth*0.6})\`;`,
    animator: (c, ctx, mouse) => {
      let t = 0, id;
      const loop = () => {
        t += 0.04; ctx.fillStyle = "#1a0005"; ctx.fillRect(0, 0, c.width, c.height);
        ctx.beginPath(); ctx.moveTo(0, c.height);
        for(let x=0; x<=c.width; x+=10) {
          const y = c.height*0.6 + Math.sin(x*0.02 + t)*15 + (Math.abs(x - mouse.x) < 100 ? -20 : 0);
          ctx.lineTo(x, y);
        }
        ctx.lineTo(c.width, c.height);
        ctx.fillStyle = "rgba(180, 0, 40, 0.7)"; ctx.fill();
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },

  {
    name: "Steam Vents",
    tags: ["fluid", "gas", "smoke"],
    description: "Light-weight vapor rising and dissipating with air turbulence",
    code: `// Expansion + rising + sine-wave horizontal drift
p.y -= p.speed;
p.x += sin(p.y * 0.1) * 2;
p.r += 0.5;`,
    animator: (c, ctx, mouse) => {
      let particles = [], id;
      const loop = () => {
        ctx.fillStyle = "#111"; ctx.fillRect(0, 0, c.width, c.height);
        if (particles.length < 100) particles.push({ x: mouse.x, y: mouse.y, r: 5, a: 0.5 });
        particles.forEach((p, i) => {
          p.y -= 2; p.r += 0.4; p.a -= 0.005;
          if (p.a <= 0) particles.splice(i, 1);
          ctx.fillStyle = `rgba(255, 255, 255, ${p.a})`;
          ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
        });
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },

  {
    name: "Ferrofluid",
    tags: ["fluid", "magnetic", "spiky"],
    description: "Black magnetic liquid forming sharp spikes toward the cursor",
    code: `// Sharp triangle formation based on proximity
const spikeH = max(0, 100 - dist);
ctx.lineTo(x, y - spikeH);`,
    animator: (c, ctx, mouse) => {
      let id;
      const loop = () => {
        ctx.fillStyle = "#222"; ctx.fillRect(0, 0, c.width, c.height);
        ctx.fillStyle = "#000"; ctx.beginPath();
        ctx.moveTo(0, c.height);
        for (let x = 0; x <= c.width; x += 15) {
          const dist = Math.abs(x - mouse.x);
          const h = Math.max(0, 150 - dist * 1.2) * (Math.random() * 0.3 + 0.7);
          ctx.lineTo(x, c.height - 20 - h);
        }
        ctx.lineTo(c.width, c.height); ctx.fill();
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },

  {
    name: "Honey Drip",
    tags: ["fluid", "food", "sticky"],
    description: "Golden, high-viscosity liquid that stretches into thin threads",
    code: `// Drip elongation + terminal globule formation
p.len += p.vy;
if(p.len > limit) drawBall(p.x, p.y + p.len);`,
    animator: (c, ctx, mouse) => {
      let drips = [], id;
      const loop = () => {
        ctx.fillStyle = "#2b1a00"; ctx.fillRect(0, 0, c.width, c.height);
        if (Math.random() > 0.95) drips.push({ x: mouse.x, y: mouse.y, h: 0 });
        drips.forEach(d => {
          d.h += 2;
          ctx.strokeStyle = "#fb0"; ctx.lineWidth = Math.max(2, 10 - d.h*0.05);
          ctx.beginPath(); ctx.moveTo(d.x, d.y); ctx.lineTo(d.x, d.y + d.h); ctx.stroke();
          ctx.fillStyle = "#fb0"; ctx.beginPath(); ctx.arc(d.x, d.y + d.h, ctx.lineWidth*1.2, 0, Math.PI * 2); ctx.fill();
        });
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },

  {
    name: "Molasses Wave",
    tags: ["fluid", "thick", "slow"],
    description: "Heavy, dark brown liquid with slow-motion ripples",
    code: `// Low-frequency sine wave + damping
y = base + sin(t*0.5 + x*0.01) * 30;`,
    animator: (c, ctx, mouse) => {
      let t = 0, id;
      const loop = () => {
        t += 0.01; ctx.fillStyle = "#1a0f00"; ctx.fillRect(0, 0, c.width, c.height);
        ctx.beginPath(); ctx.moveTo(0, c.height);
        for (let x = 0; x <= c.width; x += 20) {
          ctx.lineTo(x, c.height * 0.7 + Math.sin(t + x * 0.01) * 40);
        }
        ctx.lineTo(c.width, c.height);
        ctx.fillStyle = "#3d2200"; ctx.fill();
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },
  {
    name: "Ink Drop",
    tags: ["fluid", "ink", "organic"],
    description: "Dark ink blooms and spreads through invisible water on click",
    code: `// Expanding ink cloud with turbulent edge
const g = ctx.createRadialGradient(drop.x, drop.y, 0, drop.x, drop.y, drop.r);
g.addColorStop(0, \`rgba(\${drop.r},\${drop.g},\${drop.b},\${drop.alpha * 0.9})\`);
g.addColorStop(0.6, \`rgba(..., \${drop.alpha * 0.4})\`);
g.addColorStop(1, 'rgba(0,0,0,0)');`,
    animator: (c, ctx, mouse) => {
      let drops = [], t = 0, id;
      const spawnDrop = (x, y) => drops.push({ x, y, r: 2, maxR: Math.random() * 100 + 60, speed: Math.random() * 2.5 + 1.5, alpha: .9, hue: Math.random() * 60 + 200 });
      const iv = setInterval(() => spawnDrop(mouse.x + (Math.random() - .5) * 60, mouse.y + (Math.random() - .5) * 60), 600);
      spawnDrop(c.width / 2, c.height / 2);
      const loop = () => {
        t += .012; ctx.fillStyle = "rgba(6,4,10,0.06)"; ctx.fillRect(0, 0, c.width, c.height);
        drops.forEach((d, i) => {
          d.r += d.speed * (1 - d.r / d.maxR); d.alpha -= .0025;
          if (d.alpha <= 0 || d.r >= d.maxR) { drops.splice(i, 1); return; }
          const g = ctx.createRadialGradient(d.x, d.y, 0, d.x, d.y, d.r);
          g.addColorStop(0, `hsla(${d.hue},40%,12%,${d.alpha})`);
          g.addColorStop(.5, `hsla(${d.hue},50%,18%,${d.alpha * .55})`);
          g.addColorStop(1, `hsla(${d.hue},60%,25%,0)`);
          ctx.fillStyle = g; ctx.beginPath(); ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2); ctx.fill();
        });
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => { clearInterval(iv); cancelAnimationFrame(id); } };
    }
  },

  {
    name: "Smoke Plume",
    tags: ["fluid", "atmospheric", "ambient"],
    description: "Volumetric smoke billows upward from cursor position",
    code: `// Soft expanding circles with turbulent drift
puff.r += 0.6; puff.alpha -= 0.003;
puff.x += sin(t * 0.8 + puff.phase) * 0.8;
const g = ctx.createRadialGradient(puff.x, puff.y, 0, puff.x, puff.y, puff.r);`,
    animator: (c, ctx, mouse) => {
      let puffs = [], t = 0, id;
      const iv = setInterval(() => { for (let i = 0; i < 3; i++) puffs.push({ x: mouse.x + (Math.random() - .5) * 20, y: mouse.y, vx: (Math.random() - .5) * .5, vy: -(Math.random() * 1.5 + 1), r: Math.random() * 12 + 8, alpha: .55, phase: Math.random() * Math.PI * 2, hue: Math.random() * 20 + 200 }); }, 100);
      const loop = () => {
        t += .012; ctx.fillStyle = "rgba(8,8,12,0.1)"; ctx.fillRect(0, 0, c.width, c.height);
        puffs.forEach((p, i) => {
          p.x += p.vx + Math.sin(t * .8 + p.phase) * .7; p.y += p.vy; p.vy *= .995; p.r += .7; p.alpha -= .004;
          if (p.alpha <= 0) { puffs.splice(i, 1); return; }
          const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
          g.addColorStop(0, `hsla(${p.hue},8%,62%,${p.alpha})`); g.addColorStop(.6, `hsla(${p.hue},6%,52%,${p.alpha * .4})`); g.addColorStop(1, "rgba(0,0,0,0)");
          ctx.fillStyle = g; ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
        });
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => { clearInterval(iv); cancelAnimationFrame(id); } };
    }
  },

  {
    name: "Geometric Pulse",
    tags: ["geometric", "ambient", "minimal"],
    description: "Concentric polygons expand outward in rhythmic pulses",
    code: `// Regular n-gon with timed spawn intervals
const drawPoly = (cx, cy, r, n, angle) => {
  for(let i=0; i<n; i++) {
    ctx.lineTo(cx + cos(angle + i/n*PI*2)*r, cy + sin(...)*r);
  }
};`,
    animator: (c, ctx, mouse) => {
      let shapes = [], t = 0, id;
      const sides = [3, 4, 5, 6, 8];
      const spawnShape = () => { const n = sides[Math.floor(Math.random() * sides.length)]; shapes.push({ x: mouse.x, y: mouse.y, r: 10, maxR: Math.random() * 180 + 80, sides: n, hue: Math.random() * 360, alpha: .8, angle: Math.random() * Math.PI * 2, speed: Math.random() * 1.5 + 1 }); };
      const iv = setInterval(spawnShape, 400); spawnShape();
      const loop = () => {
        t += .016; ctx.fillStyle = "rgba(4,4,6,0.14)"; ctx.fillRect(0, 0, c.width, c.height);
        shapes.forEach((s, i) => {
          s.r += s.speed; s.alpha = (1 - s.r / s.maxR) * .75; s.angle += .008;
          if (s.r >= s.maxR) { shapes.splice(i, 1); return; }
          ctx.strokeStyle = `hsla(${s.hue},70%,65%,${s.alpha})`; ctx.lineWidth = 2;
          ctx.beginPath();
          for (let k = 0; k <= s.sides; k++) { const a = s.angle + (k / s.sides) * Math.PI * 2; ctx.lineTo(s.x + Math.cos(a) * s.r, s.y + Math.sin(a) * s.r); }
          ctx.stroke();
        });
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => { clearInterval(iv); cancelAnimationFrame(id); } };
    }
  },

  {
    name: "Fog Rolls",
    tags: ["atmospheric", "ambient", "nature"],
    description: "Dense fog layers drift horizontally across the scene",
    code: `// Layered horizontal gradient fog bands
for(let i=0;i<5;i++){
  const g = ctx.createLinearGradient(fog.x, 0, fog.x + fog.w, 0);
  g.addColorStop(0, 'rgba(0,0,0,0)');
  g.addColorStop(0.5, \`rgba(200,205,215,\${fog.alpha})\`);
  g.addColorStop(1, 'rgba(0,0,0,0)');
}`,
    animator: (c, ctx, mouse) => {
      let layers = [], t = 0, id;
      for (let i = 0; i < 8; i++) layers.push({ x: Math.random() * c.width - c.width / 2, y: c.height * (.3 + Math.random() * .6), w: c.width * (.6 + Math.random() * .8), h: 80 + Math.random() * 120, speed: (Math.random() - .5) * .4 + .15, alpha: Math.random() * .12 + .04, phase: Math.random() * Math.PI * 2 });
      const loop = () => {
        t += .006; ctx.fillStyle = "rgba(6,8,12,0.08)"; ctx.fillRect(0, 0, c.width, c.height);
        const windX = (mouse.x / c.width - .5) * .6;
        layers.forEach(l => {
          l.x += l.speed + windX; if (l.x > c.width + l.w / 2) l.x = -l.w / 2; if (l.x < -l.w) l.x = c.width + l.w / 2;
          l.y += Math.sin(t * .3 + l.phase) * .3;
          const a = l.alpha * (.7 + Math.sin(t * .5 + l.phase) * .3);
          const g = ctx.createLinearGradient(l.x, 0, l.x + l.w, 0);
          g.addColorStop(0, "rgba(0,0,0,0)"); g.addColorStop(.4, `rgba(188,198,215,${a})`); g.addColorStop(.6, `rgba(188,198,215,${a})`); g.addColorStop(1, "rgba(0,0,0,0)");
          ctx.fillStyle = g; ctx.fillRect(l.x, l.y - l.h / 2, l.w, l.h);
        });
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },

  {
    name: "Grid Warp",
    tags: ["geometric", "digital", "warp"],
    description: "A perspective grid distorts and bends toward the cursor",
    code: `// Grid lines warped via distance field from mouse
const dist = hypot(gx - mouseX, gy - mouseY);
const warp = (80 / (dist + 30)) * 15;
const wx = gx + (gx - mouseX) / dist * warp * -1;`,
    animator: (c, ctx, mouse) => {
      let t = 0, id;
      const COLS = 24, ROWS = 16;
      const loop = () => {
        t += .014; ctx.fillStyle = "rgba(2,4,8,0.18)"; ctx.fillRect(0, 0, c.width, c.height);
        const cw = c.width / COLS, ch = c.height / ROWS;
        ctx.strokeStyle = "rgba(0,220,160,0.25)"; ctx.lineWidth = .8;
        for (let row = 0; row <= ROWS; row++) {
          ctx.beginPath();
          for (let col = 0; col <= COLS; col++) {
            const gx = col * cw, gy = row * ch, dist = Math.hypot(gx - mouse.x, gy - mouse.y), warp = Math.min(100 / (dist + 25), 2.5) * 18;
            const wx = gx + (gx - mouse.x) / (dist + 1) * (-warp), wy = gy + (gy - mouse.y) / (dist + 1) * (-warp);
            col === 0 ? ctx.moveTo(wx, wy) : ctx.lineTo(wx, wy);
          }
          ctx.stroke();
        }
        for (let col = 0; col <= COLS; col++) {
          ctx.beginPath();
          for (let row = 0; row <= ROWS; row++) {
            const gx = col * cw, gy = row * ch, dist = Math.hypot(gx - mouse.x, gy - mouse.y), warp = Math.min(100 / (dist + 25), 2.5) * 18;
            const wx = gx + (gx - mouse.x) / (dist + 1) * (-warp), wy = gy + (gy - mouse.y) / (dist + 1) * (-warp);
            row === 0 ? ctx.moveTo(wx, wy) : ctx.lineTo(wx, wy);
          }
          ctx.stroke();
        }
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },

  {
    name: "Fluid Blobs",
    tags: ["fluid", "organic", "ambient"],
    description: "Soft metaball-style blobs merge and separate fluidly",
    code: `// Distance-threshold blend between blob centers
blobs.forEach(b => {
  const d = hypot(x - b.cx, y - b.cy);
  field += b.r * b.r / (d * d + 0.001);
});
if(field > threshold) ctx.fillStyle = color;`,
    animator: (c, ctx, mouse) => {
      let blobs = [], t = 0, id;
      for (let i = 0; i < 6; i++) blobs.push({ x: Math.random() * c.width, y: Math.random() * c.height, vx: (Math.random() - .5) * 1.8, vy: (Math.random() - .5) * 1.8, r: Math.random() * 55 + 35, hue: 160 + Math.random() * 160 });
      const loop = () => {
        t += .016; ctx.fillStyle = "rgba(4,4,10,0.12)"; ctx.fillRect(0, 0, c.width, c.height);
        blobs.forEach(b => {
          b.x += b.vx + (mouse.x - b.x) * .0004; b.y += b.vy + (mouse.y - b.y) * .0004;
          b.vx += (Math.random() - .5) * .1; b.vy += (Math.random() - .5) * .1; b.vx *= .98; b.vy *= .98;
          if (b.x < b.r) b.vx = Math.abs(b.vx); if (b.x > c.width - b.r) b.vx = -Math.abs(b.vx);
          if (b.y < b.r) b.vy = Math.abs(b.vy); if (b.y > c.height - b.r) b.vy = -Math.abs(b.vy);
          const g = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r * 1.4);
          g.addColorStop(0, `hsla(${b.hue},60%,55%,0.75)`); g.addColorStop(.6, `hsla(${b.hue},55%,45%,0.35)`); g.addColorStop(1, `hsla(${b.hue},50%,35%,0)`);
          ctx.fillStyle = g; ctx.beginPath(); ctx.arc(b.x, b.y, b.r * 1.4, 0, Math.PI * 2); ctx.fill();
        });
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },

  {
    name: "Voronoi Mosaic",
    tags: ["geometric", "abstract", "pattern"],
    description: "Animated color cells shift between geometric territories",
    code: `// Nearest-seed coloring updated each frame
seeds.forEach((s, i) => {
  if(dist(px, py, s.x, s.y) < minDist) { minDist = dist; nearest = i; }
});
imageData.data[idx] = seeds[nearest].r;`,
    animator: (c, ctx, mouse) => {
      let seeds = [], t = 0, id;
      const N = 14;
      for (let i = 0; i < N; i++) seeds.push({ x: Math.random() * c.width, y: Math.random() * c.height, vx: (Math.random() - .5) * 1.2, vy: (Math.random() - .5) * 1.2, hue: (i / N) * 360 });
      const STEP = 4;
      const loop = () => {
        t += .016; ctx.fillStyle = "rgba(0,0,0,0.08)"; ctx.fillRect(0, 0, c.width, c.height);
        seeds.forEach(s => {
          s.x += s.vx + (mouse.x - s.x) * .0006; s.y += s.vy + (mouse.y - s.y) * .0006;
          s.vx += (Math.random() - .5) * .08; s.vy += (Math.random() - .5) * .08; s.vx *= .98; s.vy *= .98;
          if (s.x < 0 || s.x > c.width) s.vx *= -1; if (s.y < 0 || s.y > c.height) s.vy *= -1;
          s.hue += .3;
        });
        for (let y = 0; y < c.height; y += STEP) {
          for (let x = 0; x < c.width; x += STEP) {
            let minD = Infinity, near = 0;
            seeds.forEach((s, i) => { const d = (x - s.x) ** 2 + (y - s.y) ** 2; if (d < minD) { minD = d; near = i; } });
            ctx.fillStyle = `hsla(${seeds[near].hue},55%,35%,0.85)`; ctx.fillRect(x, y, STEP, STEP);
          }
        }
        ctx.strokeStyle = "rgba(0,0,0,0.35)"; ctx.lineWidth = 1;
        seeds.forEach((s, i) => seeds.forEach((s2, j) => { if (j <= i) return; if (Math.hypot(s.x - s2.x, s.y - s2.y) < 200) { ctx.beginPath(); ctx.moveTo(s.x, s.y); ctx.lineTo(s2.x, s2.y); ctx.stroke(); } }));
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },

  {
    name: "Lissajous Web",
    tags: ["geometric", "mathematical", "ambient"],
    description: "Parametric Lissajous curves weave a hypnotic shifting web",
    code: `// Dual-frequency parametric curve
for(let i=0; i<1000; i++){
  const s = i / 1000;
  const x = sin(s * PI * freqX + phaseX + t) * ampX + cx;
  const y = sin(s * PI * freqY + phaseY) * ampY + cy;
}`,
    animator: (c, ctx, mouse) => {
      let t = 0, id;
      const curves = [
        { fx: 3, fy: 2, px: 0, py: Math.PI / 2, hue: 180 },
        { fx: 5, fy: 4, px: Math.PI / 4, py: 0, hue: 280 },
        { fx: 4, fy: 3, px: Math.PI / 3, py: Math.PI / 4, hue: 60 }
      ];
      const loop = () => {
        t += .008; ctx.fillStyle = "rgba(4,2,8,0.12)"; ctx.fillRect(0, 0, c.width, c.height);
        const cx = mouse.x * .2 + c.width * .4, cy = mouse.y * .2 + c.height * .4;
        const ampX = c.width * .38, ampY = c.height * .38;
        curves.forEach(cv => {
          ctx.strokeStyle = `hsla(${cv.hue + t * 20},65%,60%,0.55)`; ctx.lineWidth = 1.2; ctx.beginPath();
          for (let i = 0; i <= 1200; i++) {
            const s = (i / 1200) * Math.PI * 2;
            const x = Math.sin(s * cv.fx + cv.px + t * .4) * ampX + cx;
            const y = Math.sin(s * cv.fy + cv.py + t * .3) * ampY + cy;
            i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
          }
          ctx.stroke();
        });
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  }
];
