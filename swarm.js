// ─────────────────────────────────────────────────
//  SWARM · FLOCKING & COLLECTIVE BEHAVIOR EFFECTS
// ─────────────────────────────────────────────────

export const swarmEffects = [

  {
    name: "Boids Flock",
    tags: ["swarm", "boids", "flocking"],
    description: "Classic boids algorithm — separation, alignment and cohesion produce emergent flocking",
    code: `// Three boids rules applied per agent
neighbors.forEach(n => {
  sep.add(sub(self, n).normalize().scale(1/dist)); // separation
  ali.add(n.vel);                                   // alignment
  coh.add(n.pos);                                   // cohesion
});
self.vel.add(sep.scale(1.5)).add(ali.scale(0.8)).add(coh.scale(0.6));`,
    animator: (c, ctx, mouse) => {
      const N = 120;
      let boids = [], id;
      for (let i = 0; i < N; i++) boids.push({
        x: Math.random() * c.width, y: Math.random() * c.height,
        vx: (Math.random() - 0.5) * 3, vy: (Math.random() - 0.5) * 3,
        hue: Math.random() * 40 + 160
      });
      const VISUAL = 70, SEP = 20, SPEED = 3;
      const loop = () => {
        ctx.fillStyle = "rgba(2,8,14,0.18)";
        ctx.fillRect(0, 0, c.width, c.height);
        boids.forEach(b => {
          let sx = 0, sy = 0, ax = 0, ay = 0, cx = 0, cy = 0, count = 0;
          boids.forEach(o => {
            if (o === b) return;
            const dx = o.x - b.x, dy = o.y - b.y, d = Math.hypot(dx, dy);
            if (d < VISUAL) {
              if (d < SEP) { sx -= dx / d; sy -= dy / d; }
              ax += o.vx; ay += o.vy;
              cx += o.x; cy += o.y; count++;
            }
          });
          if (count > 0) {
            b.vx += sx * 0.05 + (ax / count - b.vx) * 0.04 + (cx / count - b.x) * 0.001;
            b.vy += sy * 0.05 + (ay / count - b.vy) * 0.04 + (cy / count - b.y) * 0.001;
          }
          // cursor attraction
          const mdx = mouse.x - b.x, mdy = mouse.y - b.y, md = Math.hypot(mdx, mdy);
          if (md < 200) { b.vx += mdx / md * 0.4; b.vy += mdy / md * 0.4; }
          const spd = Math.hypot(b.vx, b.vy);
          if (spd > SPEED) { b.vx = b.vx / spd * SPEED; b.vy = b.vy / spd * SPEED; }
          b.x = (b.x + b.vx + c.width) % c.width;
          b.y = (b.y + b.vy + c.height) % c.height;
          const angle = Math.atan2(b.vy, b.vx);
          ctx.save();
          ctx.translate(b.x, b.y);
          ctx.rotate(angle);
          ctx.fillStyle = `hsla(${b.hue},80%,65%,0.85)`;
          ctx.beginPath();
          ctx.moveTo(7, 0); ctx.lineTo(-4, 3); ctx.lineTo(-4, -3);
          ctx.closePath(); ctx.fill();
          ctx.restore();
        });
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },

  {
    name: "Murmuration",
    tags: ["swarm", "birds", "nature"],
    description: "Thousands of starlings sweep in vast dark waves across a twilight sky",
    code: `// Density-based wave propagation
const wave = sin(b.x * 0.005 + b.y * 0.003 + t) * cos(b.x * 0.003 - t * 0.8);
b.vx += wave * 0.3;
b.vy += wave * 0.2 - 0.05; // slight upward bias`,
    animator: (c, ctx, mouse) => {
      const N = 300;
      let birds = [], t = 0, id;
      for (let i = 0; i < N; i++) birds.push({
        x: Math.random() * c.width, y: Math.random() * c.height,
        vx: (Math.random() - 0.5) * 2, vy: (Math.random() - 0.5) * 2
      });
      const loop = () => {
        t += 0.015;
        ctx.fillStyle = "rgba(4,6,14,0.15)";
        ctx.fillRect(0, 0, c.width, c.height);
        const NEAR = 50, SPD = 2.5;
        birds.forEach(b => {
          let nx = 0, ny = 0, count = 0;
          birds.forEach(o => {
            if (o === b) return;
            const d = Math.hypot(o.x - b.x, o.y - b.y);
            if (d < NEAR) { nx += o.vx; ny += o.vy; count++; }
          });
          if (count > 0) { b.vx += (nx / count - b.vx) * 0.06; b.vy += (ny / count - b.vy) * 0.06; }
          const wave = Math.sin(b.x * 0.005 + t) * 0.15;
          b.vx += wave; b.vy -= 0.03;
          // repel from cursor
          const md = Math.hypot(mouse.x - b.x, mouse.y - b.y);
          if (md < 100) { b.vx -= (mouse.x - b.x) / md * 1.5; b.vy -= (mouse.y - b.y) / md * 1.5; }
          const spd = Math.hypot(b.vx, b.vy);
          if (spd > SPD) { b.vx = b.vx / spd * SPD; b.vy = b.vy / spd * SPD; }
          b.x = (b.x + b.vx + c.width) % c.width;
          b.y = (b.y + b.vy + c.height) % c.height;
          const a = Math.atan2(b.vy, b.vx);
          const sunset = b.y / c.height;
          ctx.fillStyle = `hsla(${220 + sunset * 40},30%,${20 + sunset * 40}%,0.9)`;
          ctx.save(); ctx.translate(b.x, b.y); ctx.rotate(a);
          ctx.beginPath(); ctx.moveTo(4, 0); ctx.lineTo(-3, 2); ctx.lineTo(-3, -2); ctx.closePath(); ctx.fill();
          ctx.restore();
        });
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },

  {
    name: "Ant Colony",
    tags: ["swarm", "ants", "pheromone"],
    description: "Ants follow pheromone trails laid by their colony, converging on food sources",
    code: `// Pheromone grid evaporation + reinforcement
pheromone[x][y] *= 0.99;   // evaporate
if (ant.carrying) pheromone[ant.x][ant.y] += strength;
// steer toward strongest adjacent pheromone
const best = neighbors.maxBy(n => pheromone[n.x][n.y]);`,
    animator: (c, ctx, mouse) => {
      const GRID = 6, COLS = Math.floor(c.width / GRID), ROWS = Math.floor(c.height / GRID);
      let pher = Array.from({ length: COLS }, () => new Float32Array(ROWS));
      let ants = [], t = 0, id;
      const nest = { x: Math.floor(COLS / 2), y: Math.floor(ROWS / 2) };
      for (let i = 0; i < 80; i++) ants.push({
        x: nest.x + (Math.random() - 0.5) * 4,
        y: nest.y + (Math.random() - 0.5) * 4,
        vx: (Math.random() - 0.5) * 2, vy: (Math.random() - 0.5) * 2,
        carrying: false, age: Math.random() * 100
      });
      const loop = () => {
        t += 0.016;
        ctx.fillStyle = "rgba(2,10,6,0.2)";
        ctx.fillRect(0, 0, c.width, c.height);
        // evaporate pheromones
        const food = { x: Math.floor(mouse.x / GRID), y: Math.floor(mouse.y / GRID) };
        for (let x = 0; x < COLS; x++) for (let y = 0; y < ROWS; y++) {
          pher[x][y] *= 0.975;
          if (pher[x][y] > 0.01) {
            ctx.fillStyle = `rgba(0,200,100,${Math.min(pher[x][y] * 0.15, 0.4)})`;
            ctx.fillRect(x * GRID, y * GRID, GRID, GRID);
          }
        }
        ants.forEach(a => {
          const gx = Math.round(a.x), gy = Math.round(a.y);
          if (gx === food.x && gy === food.y) a.carrying = true;
          if (Math.hypot(gx - nest.x, gy - nest.y) < 3) { a.carrying = false; }
          if (a.carrying) {
            if (gx >= 0 && gx < COLS && gy >= 0 && gy < ROWS) pher[gx][gy] += 0.3;
            // head home
            a.vx += (nest.x - a.x) * 0.01; a.vy += (nest.y - a.y) * 0.01;
          } else {
            // random walk with pheromone bias
            const nx = gx + Math.round(a.vx), ny = gy + Math.round(a.vy);
            if (nx >= 0 && nx < COLS && ny >= 0 && ny < ROWS && pher[nx][ny] > 0.05) {
              a.vx += (nx - gx) * 0.3; a.vy += (ny - gy) * 0.3;
            }
            a.vx += (Math.random() - 0.5) * 0.8; a.vy += (Math.random() - 0.5) * 0.8;
          }
          const spd = Math.hypot(a.vx, a.vy);
          if (spd > 1.8) { a.vx = a.vx / spd * 1.8; a.vy = a.vy / spd * 1.8; }
          a.x += a.vx; a.y += a.vy;
          a.x = Math.max(0, Math.min(COLS - 1, a.x));
          a.y = Math.max(0, Math.min(ROWS - 1, a.y));
          ctx.fillStyle = a.carrying ? "#ffdd44" : "#88cc88";
          ctx.beginPath();
          ctx.arc(a.x * GRID, a.y * GRID, 2.5, 0, Math.PI * 2);
          ctx.fill();
        });
        // draw nest
        ctx.strokeStyle = "rgba(100,200,120,0.5)"; ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.arc(nest.x * GRID, nest.y * GRID, 12, 0, Math.PI * 2); ctx.stroke();
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },

  {
    name: "Firefly Meadow",
    tags: ["swarm", "firefly", "nature"],
    description: "Soft glowing fireflies drift and synchronize their bioluminescent pulses",
    code: `// Pulse sync: nearby fireflies nudge phase toward each other
neighbors.forEach(n => {
  if (abs(n.phase - self.phase) < 0.5)
    self.phase += 0.01 * sign(n.phase - self.phase);
});
self.brightness = sin(self.phase * PI * 2) ** 4;`,
    animator: (c, ctx, mouse) => {
      const N = 80;
      let flies = [], t = 0, id;
      for (let i = 0; i < N; i++) flies.push({
        x: Math.random() * c.width, y: Math.random() * c.height,
        vx: (Math.random() - 0.5) * 0.8, vy: (Math.random() - 0.5) * 0.8,
        phase: Math.random(), speed: Math.random() * 0.008 + 0.005,
        hue: 70 + Math.random() * 40
      });
      const loop = () => {
        t += 0.012;
        ctx.fillStyle = "rgba(1,4,2,0.2)";
        ctx.fillRect(0, 0, c.width, c.height);
        flies.forEach(f => {
          f.phase = (f.phase + f.speed) % 1;
          // sync with nearby
          flies.forEach(o => {
            if (o === f) return;
            const d = Math.hypot(o.x - f.x, o.y - f.y);
            if (d < 80) f.phase += 0.002 * Math.sign(o.phase - f.phase);
          });
          f.vx += (Math.random() - 0.5) * 0.12;
          f.vy += (Math.random() - 0.5) * 0.12;
          f.vx *= 0.97; f.vy *= 0.97;
          // drift toward cursor gently
          const md = Math.hypot(mouse.x - f.x, mouse.y - f.y);
          if (md < 150) { f.vx += (mouse.x - f.x) / md * 0.08; f.vy += (mouse.y - f.y) / md * 0.08; }
          f.x = (f.x + f.vx + c.width) % c.width;
          f.y = (f.y + f.vy + c.height) % c.height;
          const bright = Math.pow(Math.max(0, Math.sin(f.phase * Math.PI * 2)), 4);
          if (bright < 0.02) return;
          ctx.globalCompositeOperation = "screen";
          const g = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, 18 * bright);
          g.addColorStop(0, `hsla(${f.hue},100%,95%,${bright})`);
          g.addColorStop(0.4, `hsla(${f.hue},100%,65%,${bright * 0.5})`);
          g.addColorStop(1, `hsla(${f.hue},90%,40%,0)`);
          ctx.fillStyle = g;
          ctx.beginPath(); ctx.arc(f.x, f.y, 18 * bright, 0, Math.PI * 2); ctx.fill();
          ctx.globalCompositeOperation = "source-over";
        });
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },

  {
    name: "Bee Swarm",
    tags: ["swarm", "bees", "organic"],
    description: "A dense bee swarm orbits a queen, splitting and rejoining around obstacles",
    code: `// Orbit + noise wobble + queen attraction
const orbitAngle = atan2(b.y - queen.y, b.x - queen.x) + 0.05;
b.tx = queen.x + cos(orbitAngle) * (orbitR + noise);
b.ty = queen.y + sin(orbitAngle) * (orbitR + noise);`,
    animator: (c, ctx, mouse) => {
      const N = 150;
      let bees = [], t = 0, id;
      const queen = { x: c.width / 2, y: c.height / 2 };
      for (let i = 0; i < N; i++) {
        const a = Math.random() * Math.PI * 2;
        const r = 60 + Math.random() * 80;
        bees.push({ x: queen.x + Math.cos(a) * r, y: queen.y + Math.sin(a) * r, vx: 0, vy: 0, offset: Math.random() * 10 });
      }
      const loop = () => {
        t += 0.018;
        ctx.fillStyle = "rgba(3,5,0,0.2)";
        ctx.fillRect(0, 0, c.width, c.height);
        queen.x += (mouse.x - queen.x) * 0.04;
        queen.y += (mouse.y - queen.y) * 0.04;
        bees.forEach(b => {
          const angle = Math.atan2(b.y - queen.y, b.x - queen.x);
          const orbitR = 80 + Math.sin(t * 2 + b.offset) * 30;
          const tx = queen.x + Math.cos(angle + 0.04) * orbitR;
          const ty = queen.y + Math.sin(angle + 0.04) * orbitR;
          b.vx += (tx - b.x) * 0.06 + (Math.random() - 0.5) * 1.5;
          b.vy += (ty - b.y) * 0.06 + (Math.random() - 0.5) * 1.5;
          b.vx *= 0.88; b.vy *= 0.88;
          b.x += b.vx; b.y += b.vy;
          const buzz = Math.sin(t * 20 + b.offset) * 0.5 + 0.5;
          ctx.fillStyle = `rgba(255,${180 + buzz * 40},0,0.8)`;
          ctx.beginPath(); ctx.ellipse(b.x, b.y, 3.5, 2, Math.atan2(b.vy, b.vx), 0, Math.PI * 2); ctx.fill();
          // wings
          ctx.fillStyle = `rgba(200,230,255,${0.2 + buzz * 0.3})`;
          ctx.beginPath(); ctx.ellipse(b.x - 2, b.y - 3, 4, 2, t * 30 + b.offset, 0, Math.PI * 2); ctx.fill();
        });
        // queen glow
        ctx.globalCompositeOperation = "screen";
        const qg = ctx.createRadialGradient(queen.x, queen.y, 0, queen.x, queen.y, 20);
        qg.addColorStop(0, "rgba(255,200,50,0.8)"); qg.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = qg; ctx.beginPath(); ctx.arc(queen.x, queen.y, 20, 0, Math.PI * 2); ctx.fill();
        ctx.globalCompositeOperation = "source-over";
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },

  {
    name: "Particle Storm",
    tags: ["swarm", "storm", "chaos"],
    description: "Thousands of particles caught in a vortex storm, spiraling into the eye of chaos",
    code: `// Vortex force field + turbulence noise
const toCenter = normalize(center - p.pos);
const tangent = vec2(-toCenter.y, toCenter.x); // perpendicular
p.vel += toCenter * inward + tangent * spin + noise * turbulence;`,
    animator: (c, ctx, mouse) => {
      const N = 400;
      let ps = [], t = 0, id;
      for (let i = 0; i < N; i++) ps.push({
        x: Math.random() * c.width, y: Math.random() * c.height,
        vx: (Math.random() - 0.5) * 3, vy: (Math.random() - 0.5) * 3,
        hue: Math.random() * 60 + 160, size: Math.random() * 2 + 0.5
      });
      const loop = () => {
        t += 0.018;
        ctx.fillStyle = "rgba(2,4,12,0.15)";
        ctx.fillRect(0, 0, c.width, c.height);
        ps.forEach(p => {
          const dx = mouse.x - p.x, dy = mouse.y - p.y;
          const d = Math.hypot(dx, dy) + 1;
          const inward = 0.4 / d;
          const spin = 1.5 / d;
          p.vx += dx * inward - dy * spin + (Math.random() - 0.5) * 0.3;
          p.vy += dy * inward + dx * spin + (Math.random() - 0.5) * 0.3;
          p.vx *= 0.97; p.vy *= 0.97;
          p.x += p.vx; p.y += p.vy;
          if (p.x < 0 || p.x > c.width || p.y < 0 || p.y > c.height) {
            p.x = Math.random() * c.width; p.y = Math.random() * c.height;
          }
          const speed = Math.hypot(p.vx, p.vy);
          ctx.fillStyle = `hsla(${p.hue + speed * 10},80%,${50 + speed * 5}%,0.7)`;
          ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2); ctx.fill();
        });
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  }

];
