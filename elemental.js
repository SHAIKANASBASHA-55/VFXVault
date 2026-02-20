// ─────────────────────────────────────────────────
//  ELEMENTAL EFFECTS
// ─────────────────────────────────────────────────

export const elementalEffects = [
  {
    name: "Solar Flare",
    tags: ["elemental", "fire", "plasma"],
    description: "Turbulent loops of superheated gas snapping and crackling",
    code: `// Arching bezier curves with thickness decay
ctx.shadowColor = 'orange';
ctx.quadraticCurveTo(controlX, controlY, endX, endY);`,
    animator: (c, ctx, mouse) => {
      let flares = [], id;
      const loop = () => {
        ctx.fillStyle = "rgba(20, 0, 0, 0.2)"; ctx.fillRect(0, 0, c.width, c.height);
        if (Math.random() > 0.8) flares.push({ x: mouse.x, y: mouse.y, tx: mouse.x + (Math.random()-0.5)*200, ty: mouse.y + (Math.random()-0.5)*200, life: 1 });
        
        ctx.globalCompositeOperation = "lighter";
        flares.forEach((f, i) => {
          f.life -= 0.02;
          ctx.strokeStyle = `hsla(${20 + f.life*20}, 100%, 50%, ${f.life})`;
          ctx.lineWidth = f.life * 10;
          ctx.beginPath(); ctx.moveTo(f.x, f.y);
          ctx.quadraticCurveTo(f.x + (f.tx-f.x)/2, f.y - 100, f.tx, f.ty);
          ctx.stroke();
          if (f.life <= 0) flares.splice(i, 1);
        });
        ctx.globalCompositeOperation = "source-over";
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },

  {
    name: "Frost Breath",
    tags: ["elemental", "ice", "gas"],
    description: "Crystalline vapor that slows down and 'freezes' in mid-air",
    code: `// Velocity damping + crystalline sparkle
p.vx *= 0.95; p.vy *= 0.95;
if(p.frozen) drawHexagon(p.x, p.y);`,
    animator: (c, ctx, mouse) => {
      let particles = [], id;
      const loop = () => {
        ctx.fillStyle = "rgba(10, 15, 25, 0.3)"; ctx.fillRect(0, 0, c.width, c.height);
        for(let i=0; i<3; i++) particles.push({ x: mouse.x, y: mouse.y, vx: (Math.random()-0.5)*10, vy: (Math.random()-0.5)*10, a: 1 });
        
        particles.forEach((p, i) => {
          p.x += p.vx; p.y += p.vy; p.vx *= 0.96; p.vy *= 0.96; p.a -= 0.01;
          ctx.fillStyle = `rgba(200, 240, 255, ${p.a})`;
          ctx.fillRect(p.x, p.y, 2, 2); // Micro crystals
          if(p.a <= 0) particles.splice(i, 1);
        });
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },

  {
    name: "Whirlpool",
    tags: ["elemental", "water", "vortex"],
    description: "A swirling centripetal drain that pulls particles into a dark center",
    code: `// Radial acceleration + tangential velocity
const angle = atan2(dy, dx) + PI/2;
p.vx += cos(angle) * strength;`,
    animator: (c, ctx, mouse) => {
      let ps = [], id;
      for(let i=0; i<300; i++) ps.push({ a: Math.random()*Math.PI*2, r: Math.random()*300 });
      const loop = () => {
        ctx.fillStyle = "rgba(0, 5, 10, 0.2)"; ctx.fillRect(0, 0, c.width, c.height);
        ps.forEach(p => {
          p.a += 0.05 * (1 - p.r/400); // Orbit
          p.r -= 1; // Pull in
          if(p.r < 5) p.r = 300 + Math.random()*100;
          const x = mouse.x + Math.cos(p.a) * p.r;
          const y = mouse.y + Math.sin(p.a) * p.r;
          ctx.fillStyle = `rgba(100, 200, 255, ${p.r/300})`;
          ctx.fillRect(x, y, 2, 2);
        });
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },

  {
    name: "Lightning Bolt",
    tags: ["elemental", "electric", "energy"],
    description: "High-frequency branching discharge following a fractal path",
    code: `// Fractal subdivision of line segments
const midX = (x1+x2)/2 + (rand()-0.5) * offset;
renderBolt(x1, y1, midX, midY, depth-1);`,
    animator: (c, ctx, mouse) => {
      let id, t = 0;
      const drawBolt = (x1, y1, x2, y2, displace) => {
        if (displace < 2) {
          ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
        } else {
          let midX = (x2 + x1) / 2 + (Math.random() - 0.5) * displace;
          let midY = (y2 + y1) / 2 + (Math.random() - 0.5) * displace;
          drawBolt(x1, y1, midX, midY, displace / 2);
          drawBolt(x2, y2, midX, midY, displace / 2);
        }
      };
      const loop = () => {
        t++; ctx.fillStyle = "rgba(5, 0, 10, 0.3)"; ctx.fillRect(0, 0, c.width, c.height);
        if (t % 10 === 0) {
          ctx.strokeStyle = "#88f"; ctx.shadowBlur = 15; ctx.shadowColor = "#00f";
          drawBolt(Math.random()*c.width, 0, mouse.x, mouse.y, 100);
        }
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },

  {
    name: "Mud Slide",
    tags: ["elemental", "earth", "thick"],
    description: "Heavy, brown particulate clumps with high friction and slump",
    code: `// Particle stacking + steepness-based flow
if (bottomNeighborExists) flowSides();
else stayStill();`,
    animator: (c, ctx, mouse) => {
      let drops = [], id;
      const loop = () => {
        ctx.fillStyle = "rgba(20, 15, 10, 0.4)"; ctx.fillRect(0, 0, c.width, c.height);
        if (drops.length < 500) drops.push({ x: mouse.x + (Math.random()-0.5)*40, y: mouse.y, vy: 2 });
        drops.forEach(d => {
          if (d.y < c.height - 5) d.y += d.vy;
          ctx.fillStyle = "#432"; ctx.fillRect(d.x, d.y, 4, 4);
        });
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },

  {
    name: "Bio-Luminescence",
    tags: ["elemental", "nature", "light"],
    description: "Microscopic sea-life that glows neon blue when disturbed",
    code: `// Proximity-based alpha trigger
const excitation = max(0, 1 - dist/100);
p.brightness += excitation * 0.5;`,
    animator: (c, ctx, mouse) => {
      let dots = [], id;
      for(let i=0; i<200; i++) dots.push({ x: Math.random()*c.width, y: Math.random()*c.height, b: 0 });
      const loop = () => {
        ctx.fillStyle = "#001"; ctx.fillRect(0, 0, c.width, c.height);
        dots.forEach(d => {
          const dist = Math.hypot(d.x - mouse.x, d.y - mouse.y);
          if (dist < 50) d.b = 1;
          d.b *= 0.95;
          ctx.fillStyle = `rgba(0, 255, 255, ${d.b})`;
          ctx.fillRect(d.x, d.y, 2, 2);
        });
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },

  {
    name: "Tornado",
    tags: ["elemental", "air", "chaos"],
    description: "Debris caught in a vertical funnel of high-speed air",
    code: `// Funnel width increases with Y height
const funnelWidth = (y / H) * 200;
x = centerX + sin(t + y*0.01) * funnelWidth;`,
    animator: (c, ctx, mouse) => {
      let debris = [], id, t = 0;
      for(let i=0; i<100; i++) debris.push({ y: Math.random()*c.height, off: Math.random()*10 });
      const loop = () => {
        t += 0.1; ctx.fillStyle = "rgba(20, 20, 20, 0.3)"; ctx.fillRect(0, 0, c.width, c.height);
        debris.forEach(d => {
          d.y -= 2; if(d.y < 0) d.y = c.height;
          const width = (1 - d.y/c.height) * 150;
          const x = mouse.x + Math.sin(t + d.y*0.05) * width;
          ctx.fillStyle = "#888"; ctx.fillRect(x, d.y, 3, 3);
        });
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },

  {
    name: "Magma Fountain",
    tags: ["elemental", "fire", "earth"],
    description: "Molten rock projectile spray that cools from yellow to red",
    code: `// Projectile motion + color temperature decay
p.vy += gravity;
p.hue = 10 + p.life * 40;`,
    animator: (c, ctx, mouse) => {
      let blobs = [], id;
      const loop = () => {
        ctx.fillStyle = "rgba(10, 0, 0, 0.4)"; ctx.fillRect(0, 0, c.width, c.height);
        for(let i=0; i<2; i++) blobs.push({ x: mouse.x, y: mouse.y, vx: (Math.random()-0.5)*6, vy: -Math.random()*12, l: 1 });
        blobs.forEach((b, i) => {
          b.vx *= 0.99; b.vy += 0.4; b.x += b.vx; b.y += b.vy; b.l -= 0.01;
          ctx.fillStyle = `hsl(${b.l * 50}, 100%, 50%)`;
          ctx.beginPath(); ctx.arc(b.x, b.y, b.l * 8, 0, Math.PI * 2); ctx.fill();
          if(b.l <= 0 || b.y > c.height) blobs.splice(i, 1);
        });
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },

  {
    name: "Acid Rain",
    tags: ["elemental", "toxic", "fluid"],
    description: "Bright green droplets that sizzle and smoke upon 'hitting' the floor",
    code: `// Collision detection + secondary particle spawn
if (p.y >= floor) spawnSmoke(p.x, p.y);`,
    animator: (c, ctx, mouse) => {
      let drops = [], sizzles = [], id;
      const loop = () => {
        ctx.fillStyle = "rgba(5, 10, 5, 0.3)"; ctx.fillRect(0, 0, c.width, c.height);
        if (drops.length < 40) drops.push({ x: Math.random()*c.width, y: -20, v: 8 + Math.random()*5 });
        drops.forEach((d, i) => {
          d.y += d.v;
          ctx.strokeStyle = "#0f0"; ctx.strokeRect(d.x, d.y, 1, 10);
          if (d.y > c.height - 20) {
            for(let j=0; j<3; j++) sizzles.push({ x: d.x, y: d.y, l: 1 });
            drops.splice(i, 1);
          }
        });
        sizzles.forEach((s, i) => {
          s.l -= 0.05; ctx.fillStyle = `rgba(0, 255, 0, ${s.l})`;
          ctx.fillRect(s.x + (Math.random()-0.5)*10, s.y, 2, 2);
          if(s.l <= 0) sizzles.splice(i, 1);
        });
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },

  {
    name: "Dust Devil",
    tags: ["elemental", "earth", "air"],
    description: "Fine brown sand particles dancing in a chaotic, low-visibility swirl",
    code: `// Low-alpha perlin-like noise movement
p.vx += (noise(t) - 0.5);
ctx.globalAlpha = 0.1;`,
    animator: (c, ctx, mouse) => {
      let sand = [], id;
      for(let i=0; i<300; i++) sand.push({ x: Math.random()*c.width, y: Math.random()*c.height });
      const loop = () => {
        ctx.fillStyle = "rgba(40, 30, 20, 0.2)"; ctx.fillRect(0, 0, c.width, c.height);
        sand.forEach(s => {
          s.x += (Math.random()-0.5)*15 + (mouse.x - s.x)*0.01;
          s.y += (Math.random()-0.5)*15 + (mouse.y - s.y)*0.01;
          ctx.fillStyle = "#964"; ctx.fillRect(s.x, s.y, 1, 1);
        });
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },
  {
    name: "Lava Flow",
    tags: ["elemental", "fire", "earth"],
    description: "Molten lava blobs ooze and merge across the canvas",
    code: `// Metaball-inspired lava blobs with heat shimmer
const heat = sin(t * 3 + blob.phase) * 0.5 + 0.5;
ctx.fillStyle = \`hsl(\${blob.hue + heat*20}, 90%, \${40+heat*30}%)\`;
// merge nearby blobs with distance check`,
    animator: (c, ctx, mouse) => {
      let blobs = [], t = 0, id;
      for (let i = 0; i < 18; i++) blobs.push({ x: Math.random() * c.width, y: Math.random() * c.height, vx: (Math.random() - .5) * 1.2, vy: (Math.random() - .5) * .6, r: Math.random() * 45 + 25, hue: Math.random() * 30, phase: Math.random() * Math.PI * 2 });
      const loop = () => {
        t += .016; ctx.fillStyle = "rgba(10,2,0,0.2)"; ctx.fillRect(0, 0, c.width, c.height);
        blobs.forEach(b => {
          b.x += b.vx + (mouse.x - b.x) * .0003; b.y += b.vy + (mouse.y - b.y) * .0001; b.vy += .012;
          if (b.x < b.r) { b.vx = Math.abs(b.vx); } if (b.x > c.width - b.r) { b.vx = -Math.abs(b.vx); }
          if (b.y < b.r) { b.vy = Math.abs(b.vy); } if (b.y > c.height - b.r) { b.vy = -Math.abs(b.vy) * .8; }
          const heat = Math.sin(t * 3 + b.phase) * .5 + .5;
          const g = ctx.createRadialGradient(b.x - b.r * .25, b.y - b.r * .3, 0, b.x, b.y, b.r * (1 + heat * .3));
          g.addColorStop(0, `hsla(${b.hue + heat * 25},95%,${70 + heat * 20}%,0.95)`);
          g.addColorStop(.5, `hsla(${b.hue + heat * 10},92%,${40 + heat * 20}%,0.8)`);
          g.addColorStop(1, `hsla(${b.hue},85%,15%,0)`);
          ctx.fillStyle = g; ctx.beginPath(); ctx.arc(b.x, b.y, b.r * (1 + heat * .3), 0, Math.PI * 2); ctx.fill();
        });
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },

  {
    name: "Ice Crystals",
    tags: ["elemental", "water", "cold"],
    description: "Snowflake-like ice crystals form and drift with geometric precision",
    code: `// 6-arm crystal drawn with recursive branches
const drawArm = (x, y, len, angle) => {
  ctx.moveTo(x, y);
  ctx.lineTo(x + cos(angle)*len, y + sin(angle)*len);
  if(len > 6) drawArm(..., len*0.5, angle ± PI/6);
};`,
    animator: (c, ctx, mouse) => {
      let crystals = [], t = 0, id;
      const drawCrystal = (cx, cy, size, angle, alpha) => {
        ctx.strokeStyle = `rgba(180,220,255,${alpha})`; ctx.lineWidth = 1.2;
        for (let arm = 0; arm < 6; arm++) {
          const a = (arm / 6) * Math.PI * 2 + angle;
          const ex = cx + Math.cos(a) * size, ey = cy + Math.sin(a) * size;
          ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(ex, ey); ctx.stroke();
          for (let b = 1; b <= 3; b++) {
            const br = size * (b / 4), bx = cx + Math.cos(a) * br, by = cy + Math.sin(a) * br;
            ctx.beginPath(); ctx.moveTo(bx, by); ctx.lineTo(bx + Math.cos(a + Math.PI / 4) * size * .28, by + Math.sin(a + Math.PI / 4) * size * .28); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(bx, by); ctx.lineTo(bx + Math.cos(a - Math.PI / 4) * size * .28, by + Math.sin(a - Math.PI / 4) * size * .28); ctx.stroke();
          }
        }
      };
      for (let i = 0; i < 25; i++) crystals.push({ x: Math.random() * c.width, y: Math.random() * c.height, size: Math.random() * 28 + 12, speed: Math.random() * .6 + .2, angle: Math.random() * Math.PI / 3, spin: (Math.random() - .5) * .008, phase: Math.random() * Math.PI * 2, alpha: Math.random() * .5 + .3 });
      const loop = () => {
        t += .01; ctx.fillStyle = "rgba(4,8,20,0.15)"; ctx.fillRect(0, 0, c.width, c.height);
        const wind = (mouse.x / c.width - .5) * 1.2;
        crystals.forEach(cr => {
          cr.y += cr.speed; cr.x += wind + Math.sin(t + cr.phase) * .8; cr.angle += cr.spin;
          if (cr.y > c.height + cr.size * 2) { cr.y = -cr.size * 2; cr.x = Math.random() * c.width; }
          drawCrystal(cr.x, cr.y, cr.size, cr.angle, cr.alpha);
        });
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },

  {
    name: "Lightning Strike",
    tags: ["elemental", "electric", "dramatic"],
    description: "Crackling lightning forks across canvas toward cursor",
    code: `// Recursive branching bolt segments
const branch = (x, y, angle, len, depth) => {
  if(depth === 0) return;
  branch(ex, ey, angle + rand()*0.8, len*0.65, depth-1);
  if(rand() > 0.5) branch(ex, ey, angle - rand()*PI/3, len*0.5, depth-1);
};`,
    animator: (c, ctx, mouse) => {
      let bolts = [], t = 0, id;
      const drawBolt = (x, y, tx, ty, alpha, width) => {
        const segs = 10; const dx = (tx - x) / segs, dy = (ty - y) / segs;
        ctx.strokeStyle = `rgba(200,215,255,${alpha})`; ctx.lineWidth = width; ctx.shadowColor = "rgba(150,180,255,1)"; ctx.shadowBlur = 20;
        ctx.beginPath(); ctx.moveTo(x, y);
        for (let i = 1; i <= segs; i++) { ctx.lineTo(x + dx * i + (Math.random() - .5) * 50, y + dy * i + (Math.random() - .5) * 30); }
        ctx.stroke(); ctx.shadowBlur = 0;
        if (width > 1 && Math.random() > .55) drawBolt(x + dx * 4 + (Math.random() - .5) * 40, y + dy * 4, x + dx * 4 + (Math.random() - .5) * 120, y + dy * 4 + (Math.random() - .5) * 100, alpha * .55, width * .5);
      };
      const iv = setInterval(() => bolts.push({ life: 1, ox: Math.random() * c.width, oy: 0 }), 600);
      const loop = () => {
        t += .016; ctx.fillStyle = "rgba(4,4,16,0.25)"; ctx.fillRect(0, 0, c.width, c.height);
        bolts.forEach((b, i) => { b.life -= .06; if (b.life <= 0) { bolts.splice(i, 1); return; } drawBolt(b.ox, b.oy, mouse.x, mouse.y, b.life, 2.5 * b.life); });
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => { clearInterval(iv); cancelAnimationFrame(id); } };
    }
  },

  {
    name: "Earth Rupture",
    tags: ["elemental", "earth", "dramatic"],
    description: "Rocks and dust particles erupt upward from ground cracks",
    code: `// Rock chunk polygon + dust cloud radial gradient
const rock = (x, y, size) => {
  ctx.beginPath();
  for(let i=0; i<6; i++) ctx.lineTo(x+cos(i/6*PI*2)*size*(0.6+rand()*0.6), ...);
};`,
    animator: (c, ctx, mouse) => {
      let rocks = [], dust = [], t = 0, id;
      const spawnRupture = (x) => {
        for (let i = 0; i < 12; i++) rocks.push({ x: x + (Math.random() - .5) * 60, y: c.height - 10, vx: (Math.random() - .5) * 6, vy: -(Math.random() * 10 + 6), size: Math.random() * 16 + 6, angle: Math.random() * Math.PI * 2, spin: (Math.random() - .5) * .12, hue: 20 + Math.random() * 30, life: 1 });
        for (let i = 0; i < 30; i++) dust.push({ x: x + (Math.random() - .5) * 80, y: c.height - 20, vx: (Math.random() - .5) * 4, vy: -(Math.random() * 5 + 2), r: Math.random() * 20 + 8, alpha: .7, life: 1 });
      };
      const iv = setInterval(() => spawnRupture(mouse.x), 900); spawnRupture(c.width / 2);
      const loop = () => {
        t += .016; ctx.fillStyle = "rgba(6,4,2,0.18)"; ctx.fillRect(0, 0, c.width, c.height);
        dust.forEach((d, i) => { d.x += d.vx; d.y += d.vy; d.vy += .05; d.life -= .008; d.alpha = d.life * .55; if (d.life <= 0) { dust.splice(i, 1); return; } ctx.fillStyle = `rgba(140,110,70,${d.alpha})`; ctx.beginPath(); ctx.arc(d.x, d.y, d.r * d.life, 0, Math.PI * 2); ctx.fill(); });
        rocks.forEach((r, i) => {
          r.x += r.vx; r.y += r.vy; r.vy += .28; r.angle += r.spin; r.life -= .006;
          if (r.y > c.height + 20 || r.life <= 0) { rocks.splice(i, 1); return; }
          ctx.save(); ctx.translate(r.x, r.y); ctx.rotate(r.angle);
          ctx.fillStyle = `hsla(${r.hue},55%,${35 + Math.random() * 15}%,${r.life * .9})`;
          ctx.beginPath();
          for (let k = 0; k < 7; k++) { const a = (k / 7) * Math.PI * 2, rad = r.size * (.6 + Math.random() * .5); ctx.lineTo(Math.cos(a) * rad, Math.sin(a) * rad); }
          ctx.closePath(); ctx.fill(); ctx.restore();
        });
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => { clearInterval(iv); cancelAnimationFrame(id); } };
    }
  },

  {
    name: "Water Ripples",
    tags: ["elemental", "water", "calm"],
    description: "Concentric ripple rings expand from cursor clicks and random drops",
    code: `// Expanding ring with easing fade
ripple.radius += 2.5 * (1 - ripple.radius / ripple.maxR * 0.6);
ripple.alpha = (1 - ripple.radius / ripple.maxR) * 0.7;
ctx.arc(ripple.x, ripple.y, ripple.radius, 0, PI*2);`,
    animator: (c, ctx, mouse) => {
      let ripples = [], id;
      const spawnRipple = (x, y) => { for (let i = 0; i < 3; i++) ripples.push({ x, y, radius: 0, maxR: 60 + i * 35, alpha: .7, delay: i * 8 }); };
      const iv = setInterval(() => spawnRipple(Math.random() * c.width, Math.random() * c.height), 800);
      c.addEventListener("mousemove", e => { if (Math.random() > .92) spawnRipple(mouse.x, mouse.y); });
      spawnRipple(c.width / 2, c.height / 2);
      const loop = () => {
        ctx.fillStyle = "rgba(0,18,36,0.12)"; ctx.fillRect(0, 0, c.width, c.height);
        ripples.forEach((r, i) => {
          if (r.delay > 0) { r.delay--; return; }
          r.radius += 2.2 * (1 - r.radius / r.maxR * .5); r.alpha = (1 - r.radius / r.maxR) * .65;
          if (r.radius >= r.maxR) { ripples.splice(i, 1); return; }
          ctx.strokeStyle = `rgba(80,180,255,${r.alpha})`; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2); ctx.stroke();
        });
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => { clearInterval(iv); cancelAnimationFrame(id); } };
    }
  },

  {
    name: "Wind Vortex",
    tags: ["elemental", "air", "swirl"],
    description: "Spiraling wind particles form a vortex centered on cursor",
    code: `// Polar coords orbit with inward spiral decay
const angle = atan2(p.y - cy, p.x - cx);
const dist = hypot(p.x - cx, p.y - cy);
p.x += cos(angle + PI/2) * speed - (p.x - cx) * 0.01;`,
    animator: (c, ctx, mouse) => {
      let particles = [], t = 0, id;
      for (let i = 0; i < 250; i++) {
        const angle = Math.random() * Math.PI * 2, dist = Math.random() * 240 + 20;
        particles.push({ x: c.width / 2 + Math.cos(angle) * dist, y: c.height / 2 + Math.sin(angle) * dist, life: Math.random(), speed: Math.random() * 2 + 1.5, alpha: Math.random() * .6 + .2, hue: 180 + Math.random() * 60 });
      }
      const loop = () => {
        t += .016; ctx.fillStyle = "rgba(4,8,14,0.14)"; ctx.fillRect(0, 0, c.width, c.height);
        const cx = mouse.x * .5 + c.width * .25, cy = mouse.y * .5 + c.height * .25;
        particles.forEach(p => {
          const dx = p.x - cx, dy = p.y - cy, dist = Math.hypot(dx, dy), angle = Math.atan2(dy, dx);
          const speed = p.speed * (1 + 80 / (dist + 20));
          p.x += Math.cos(angle + Math.PI / 2) * speed * .8 - dx * .018;
          p.y += Math.sin(angle + Math.PI / 2) * speed * .8 - dy * .018;
          p.life += .008; if (p.life > 1) { const a = Math.random() * Math.PI * 2, d = Math.random() * 240 + 20; p.x = cx + Math.cos(a) * d; p.y = cy + Math.sin(a) * d; p.life = 0; }
          const fade = Math.min(p.life * 4, 1) * Math.min((1 - p.life) * 4, 1);
          ctx.fillStyle = `hsla(${p.hue},60%,72%,${p.alpha * fade})`; ctx.fillRect(p.x, p.y, 2, 2);
        });
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },

  {
    name: "Magma Drips",
    tags: ["elemental", "fire", "earth"],
    description: "Glowing magma drips fall and pool at the bottom",
    code: `// Drip elongation while falling + splat on floor
drip.len = lerp(drip.len, drip.speed * 6, 0.1);
ctx.ellipse(drip.x, drip.y, drip.r, drip.r + drip.len, 0, 0, PI*2);
if(drip.y > H) createSplat(drip.x);`,
    animator: (c, ctx, mouse) => {
      let drips = [], splats = [], id;
      const spawnDrip = () => drips.push({ x: mouse.x + (Math.random() - .5) * 200, y: -10, vx: (Math.random() - .5) * 1.5, vy: Math.random() * 2 + 1.5, r: Math.random() * 10 + 6, len: 0, hue: Math.random() * 25, life: 1 });
      const iv = setInterval(spawnDrip, 300); spawnDrip();
      const loop = () => {
        ctx.fillStyle = "rgba(4,0,0,0.18)"; ctx.fillRect(0, 0, c.width, c.height);
        drips.forEach((d, i) => {
          d.x += d.vx; d.y += d.vy; d.vy += .12; d.len = d.len + (d.vy * 5 - d.len) * .1;
          if (d.y > c.height + 20) {
            splats.push({ x: d.x, y: c.height - 5, r: d.r * 2.5, alpha: .9, hue: d.hue });
            drips.splice(i, 1); return;
          }
          const g = ctx.createRadialGradient(d.x, d.y - d.len * .5, 0, d.x, d.y, d.r + d.len);
          g.addColorStop(0, `hsla(${d.hue + 25},100%,75%,0.95)`); g.addColorStop(.5, `hsla(${d.hue + 10},95%,45%,0.85)`); g.addColorStop(1, `hsla(${d.hue},90%,20%,0)`);
          ctx.fillStyle = g; ctx.beginPath(); ctx.ellipse(d.x, d.y, d.r, d.r + d.len, 0, 0, Math.PI * 2); ctx.fill();
        });
        splats.forEach((s, i) => { s.alpha -= .003; s.r += .15; if (s.alpha <= 0) { splats.splice(i, 1); return; } ctx.fillStyle = `hsla(${s.hue},90%,35%,${s.alpha})`; ctx.beginPath(); ctx.ellipse(s.x, s.y, s.r, s.r * .35, 0, 0, Math.PI * 2); ctx.fill(); });
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => { clearInterval(iv); cancelAnimationFrame(id); } };
    }
  },

  {
    name: "Storm Particles",
    tags: ["elemental", "air", "electric"],
    description: "Charged particles swirl in a chaotic electric storm field",
    code: `// Field-line attraction + random repulsion bursts
p.vx += (attractor.x - p.x) * 0.0002 - (p.x - repulsor.x) * 0.0008;
const speed = hypot(p.vx, p.vy);
ctx.strokeStyle = \`hsla(\${160+speed*8},80%,70%,\${alpha})\`;`,
    animator: (c, ctx, mouse) => {
      let particles = [], t = 0, id;
      for (let i = 0; i < 180; i++) particles.push({ x: Math.random() * c.width, y: Math.random() * c.height, vx: (Math.random() - .5) * 4, vy: (Math.random() - .5) * 4, px: 0, py: 0, hue: 160 + Math.random() * 80 });
      const loop = () => {
        t += .016; ctx.fillStyle = "rgba(2,4,12,0.16)"; ctx.fillRect(0, 0, c.width, c.height);
        particles.forEach(p => {
          p.px = p.x; p.py = p.y;
          p.vx += (mouse.x - p.x) * .00018 + (Math.random() - .5) * .5;
          p.vy += (mouse.y - p.y) * .00018 + (Math.random() - .5) * .5;
          p.vx *= .97; p.vy *= .97;
          p.x += p.vx; p.y += p.vy;
          if (p.x < 0 || p.x > c.width) p.vx *= -1;
          if (p.y < 0 || p.y > c.height) p.vy *= -1;
          const speed = Math.hypot(p.vx, p.vy);
          ctx.strokeStyle = `hsla(${p.hue + speed * 8},75%,65%,${Math.min(speed / 6, .7)})`; ctx.lineWidth = .8;
          ctx.beginPath(); ctx.moveTo(p.px, p.py); ctx.lineTo(p.x, p.y); ctx.stroke();
        });
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  }
];
