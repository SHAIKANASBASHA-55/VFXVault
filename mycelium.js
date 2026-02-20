// ─────────────────────────────────────────────────
//  MYCELIUM · ORGANIC NETWORK GROWTH EFFECTS
// ─────────────────────────────────────────────────

export const myceliumEffects = [

  {
    name: "Fungal Network",
    tags: ["mycelium", "organic", "growth"],
    description: "Branching hyphal threads spread across the canvas like a living underground network",
    code: `// Recursive branching with angle drift
const grow = (x, y, angle, len, depth) => {
  if (depth === 0 || len < 1) return;
  const ex = x + cos(angle) * len;
  const ey = y + sin(angle) * len;
  drawLine(x, y, ex, ey, depth);
  if (random() > 0.4) grow(ex, ey, angle + random()*0.8-0.4, len*0.75, depth-1);
  if (random() > 0.6) grow(ex, ey, angle + PI/4*(random()>0.5?1:-1), len*0.6, depth-1);
};`,
    animator: (c, ctx, mouse) => {
      let nodes = [], t = 0, id;
      const spawnRoot = (x, y) => {
        const numBranches = Math.floor(Math.random() * 4) + 3;
        for (let i = 0; i < numBranches; i++) {
          nodes.push({
            x, y, angle: (i / numBranches) * Math.PI * 2 + Math.random() * 0.5,
            len: Math.random() * 40 + 25, speed: Math.random() * 0.8 + 0.4,
            alpha: 0.7, hue: 110 + Math.random() * 40, depth: 0, maxDepth: Math.floor(Math.random() * 3) + 5
          });
        }
      };
      const iv = setInterval(() => spawnRoot(mouse.x, mouse.y), 1800);
      spawnRoot(c.width / 2, c.height / 2);
      const activeGrowth = [];
      const loop = () => {
        t += 0.012;
        ctx.fillStyle = "rgba(2,6,2,0.04)";
        ctx.fillRect(0, 0, c.width, c.height);
        nodes.forEach((n, i) => {
          n.angle += (Math.random() - 0.5) * 0.12;
          const ex = n.x + Math.cos(n.angle) * n.speed;
          const ey = n.y + Math.sin(n.angle) * n.speed;
          const progress = n.depth / n.maxDepth;
          ctx.strokeStyle = `hsla(${n.hue},${50 - progress * 20}%,${35 + progress * 25}%,${n.alpha * (1 - progress * 0.5)})`;
          ctx.lineWidth = Math.max(0.3, (1 - progress) * 1.8);
          ctx.beginPath(); ctx.moveTo(n.x, n.y); ctx.lineTo(ex, ey); ctx.stroke();
          // spawn nodes
          if (Math.random() > 0.96 && n.depth < n.maxDepth) {
            const branchAngle = n.angle + (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 0.8 + 0.3);
            nodes.push({ x: ex, y: ey, angle: branchAngle, len: n.len * 0.7, speed: n.speed * 0.85, alpha: n.alpha * 0.85, hue: n.hue + (Math.random() - 0.5) * 20, depth: n.depth + 1, maxDepth: n.maxDepth });
          }
          n.x = ex; n.y = ey; n.depth += 0.01;
          if (n.x < 0 || n.x > c.width || n.y < 0 || n.y > c.height || n.depth >= n.maxDepth) nodes.splice(i, 1);
        });
        if (nodes.length > 800) nodes.splice(0, 50);
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => { clearInterval(iv); cancelAnimationFrame(id); } };
    }
  },

  {
    name: "Slime Mold",
    tags: ["mycelium", "slime", "pathfinding"],
    description: "Physarum-inspired agents lay trails that find the shortest paths between food sources",
    code: `// Physarum agent: sense → rotate → deposit → diffuse
const senseL = trail[sensor(agent, angle - sensorAngle)];
const senseF = trail[sensor(agent, angle)];
const senseR = trail[sensor(agent, angle + sensorAngle)];
if (senseF > senseL && senseF > senseR) continue; // go forward
else if (senseL > senseR) agent.angle -= turnSpeed;
else agent.angle += turnSpeed;`,
    animator: (c, ctx, mouse) => {
      const N = 600;
      let agents = [], t = 0, id;
      const W = c.width, H = c.height;
      let trail = new Float32Array(W * H);
      for (let i = 0; i < N; i++) agents.push({
        x: W / 2 + (Math.random() - 0.5) * 100,
        y: H / 2 + (Math.random() - 0.5) * 100,
        angle: Math.random() * Math.PI * 2, speed: Math.random() * 1.2 + 0.8
      });
      const sense = (agent, ang) => {
        const sx = Math.round(agent.x + Math.cos(ang) * 12);
        const sy = Math.round(agent.y + Math.sin(ang) * 12);
        if (sx < 0 || sx >= W || sy < 0 || sy >= H) return 0;
        return trail[sy * W + sx];
      };
      const loop = () => {
        t += 0.016;
        ctx.fillStyle = "rgba(2,8,4,0.06)";
        ctx.fillRect(0, 0, c.width, c.height);
        const SA = 0.4;
        agents.forEach(a => {
          const fl = sense(a, a.angle - SA);
          const ff = sense(a, a.angle);
          const fr = sense(a, a.angle + SA);
          if (ff > fl && ff > fr) { /* keep */ }
          else if (fl > fr) a.angle -= 0.25 + Math.random() * 0.15;
          else a.angle += 0.25 + Math.random() * 0.15;
          a.x += Math.cos(a.angle) * a.speed;
          a.y += Math.sin(a.angle) * a.speed;
          if (a.x < 1) { a.x = 1; a.angle = Math.PI - a.angle; }
          if (a.x >= W - 1) { a.x = W - 2; a.angle = Math.PI - a.angle; }
          if (a.y < 1) { a.y = 1; a.angle = -a.angle; }
          if (a.y >= H - 1) { a.y = H - 2; a.angle = -a.angle; }
          const idx = Math.round(a.y) * W + Math.round(a.x);
          if (idx >= 0 && idx < trail.length) trail[idx] = Math.min(1, trail[idx] + 0.25);
        });
        // diffuse + evaporate trail
        const newTrail = new Float32Array(trail.length);
        for (let y = 1; y < H - 1; y++) for (let x = 1; x < W - 1; x++) {
          const i = y * W + x;
          const avg = (trail[i] + trail[i-1] + trail[i+1] + trail[i-W] + trail[i+W]) / 5;
          newTrail[i] = avg * 0.97;
        }
        trail = newTrail;
        // render trail
        const imgData = ctx.getImageData(0, 0, W, H);
        for (let i = 0; i < trail.length; i++) {
          if (trail[i] < 0.05) continue;
          const v = trail[i];
          const base = i * 4;
          imgData.data[base] = Math.min(255, imgData.data[base] + v * 50);
          imgData.data[base+1] = Math.min(255, imgData.data[base+1] + v * 160);
          imgData.data[base+2] = Math.min(255, imgData.data[base+2] + v * 60);
          imgData.data[base+3] = 255;
        }
        ctx.putImageData(imgData, 0, 0);
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },

  {
    name: "Root System",
    tags: ["mycelium", "roots", "nature"],
    description: "Deep root tendrils dig downward, splitting and searching for water toward the cursor",
    code: `// Gravity-biased growth with cursor moisture attraction
const gravity = vec2(0, 0.2);
const moisture = normalize(waterSource - tip.pos) * 0.3;
tip.dir = normalize(tip.dir + gravity + moisture + noise);`,
    animator: (c, ctx, mouse) => {
      let tips = [], segments = [], t = 0, id;
      const spawnRoot = () => {
        const x = Math.random() * c.width;
        tips.push({ x, y: 0, dx: (Math.random() - 0.5) * 1.5, dy: 1.5 + Math.random(), life: Math.random() * 0.5 + 0.6, depth: 0 });
      };
      for (let i = 0; i < 5; i++) spawnRoot();
      const iv = setInterval(spawnRoot, 2000);
      const loop = () => {
        t += 0.016;
        ctx.fillStyle = "rgba(4,2,0,0.12)";
        ctx.fillRect(0, 0, c.width, c.height);
        // draw all segments
        segments.forEach(s => {
          ctx.strokeStyle = `hsla(${s.hue},40%,${s.bright}%,${s.alpha})`;
          ctx.lineWidth = s.width;
          ctx.beginPath(); ctx.moveTo(s.x1, s.y1); ctx.lineTo(s.x2, s.y2); ctx.stroke();
        });
        const newTips = [];
        tips.forEach(tip => {
          // gravity + moisture pull
          const toMouse = { x: mouse.x - tip.x, y: mouse.y - tip.y };
          const md = Math.hypot(toMouse.x, toMouse.y) + 1;
          tip.dx += (toMouse.x / md) * 0.12 + (Math.random() - 0.5) * 0.25;
          tip.dy += 0.06 + (Math.random() - 0.5) * 0.1;
          const spd = Math.hypot(tip.dx, tip.dy);
          tip.dx = tip.dx / spd * 2; tip.dy = tip.dy / spd * 2;
          const nx = tip.x + tip.dx, ny = tip.y + tip.dy;
          segments.push({
            x1: tip.x, y1: tip.y, x2: nx, y2: ny,
            hue: 30 + tip.depth * 5, bright: 25 + tip.depth * 3,
            alpha: tip.life * 0.8, width: Math.max(0.3, tip.life * 1.5)
          });
          tip.x = nx; tip.y = ny; tip.depth++;
          // branching
          if (Math.random() > 0.97 && tip.life > 0.3) {
            newTips.push({ x: nx, y: ny, dx: tip.dx + (Math.random() - 0.5) * 1.5, dy: tip.dy + Math.random() * 0.5, life: tip.life * 0.65, depth: tip.depth });
          }
          if (tip.y < c.height && tip.life > 0.05) newTips.push({...tip, life: tip.life - 0.003});
        });
        tips = newTips;
        if (segments.length > 3000) segments.splice(0, 100);
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => { clearInterval(iv); cancelAnimationFrame(id); } };
    }
  },

  {
    name: "Spore Release",
    tags: ["mycelium", "spores", "ambient"],
    description: "Mushroom caps periodically rupture and release clouds of drifting spores",
    code: `// Burst emission from cap center + upward drift + Brownian noise
if (t % spawnInterval < dt) {
  for (let i = 0; i < burstCount; i++) {
    const angle = random() * PI * 2;
    spores.push({ vel: polar(angle, random()*2+1), life: 1 });
  }
}
spore.pos += spore.vel + noise * 0.5;
spore.vel.y -= 0.04; // buoyancy`,
    animator: (c, ctx, mouse) => {
      let spores = [], mushrooms = [], t = 0, id;
      // place mushrooms
      for (let i = 0; i < 5; i++) {
        mushrooms.push({
          x: c.width * (0.1 + i * 0.2), y: c.height * (0.65 + Math.random() * 0.2),
          cap: 25 + Math.random() * 20, hue: 20 + Math.random() * 30,
          timer: Math.random() * 3
        });
      }
      const loop = () => {
        t += 0.018;
        ctx.fillStyle = "rgba(2,4,2,0.18)";
        ctx.fillRect(0, 0, c.width, c.height);
        // draw mushrooms
        mushrooms.forEach(m => {
          m.timer -= 0.018;
          if (m.timer <= 0) {
            m.timer = Math.random() * 4 + 2;
            for (let i = 0; i < 60; i++) {
              const a = Math.random() * Math.PI * 2;
              const spd = Math.random() * 2 + 0.5;
              spores.push({ x: m.x, y: m.y - m.cap * 0.5, vx: Math.cos(a) * spd * 0.8, vy: -spd - 1.5, alpha: 0.8, size: Math.random() * 2.5 + 0.5, hue: m.hue + Math.random() * 30 });
            }
          }
          // stem
          ctx.strokeStyle = `hsla(${m.hue},30%,40%,0.9)`; ctx.lineWidth = m.cap * 0.25;
          ctx.beginPath(); ctx.moveTo(m.x, m.y); ctx.lineTo(m.x, m.y - m.cap * 1.2); ctx.stroke();
          // cap
          ctx.fillStyle = `hsla(${m.hue},55%,35%,0.95)`;
          ctx.beginPath(); ctx.ellipse(m.x, m.y - m.cap * 1.2, m.cap, m.cap * 0.55, 0, Math.PI, 0); ctx.fill();
          // spots
          ctx.fillStyle = `hsla(${m.hue + 10},20%,70%,0.6)`;
          for (let s = 0; s < 3; s++) {
            ctx.beginPath(); ctx.arc(m.x + (s - 1) * m.cap * 0.3, m.y - m.cap * 1.35, m.cap * 0.08, 0, Math.PI * 2); ctx.fill();
          }
        });
        // update spores
        spores.forEach((s, i) => {
          s.vx += (Math.random() - 0.5) * 0.15; s.vy -= 0.04 + Math.random() * 0.03;
          s.vx *= 0.99; s.x += s.vx; s.y += s.vy; s.alpha -= 0.006;
          if (s.alpha <= 0) { spores.splice(i, 1); return; }
          ctx.fillStyle = `hsla(${s.hue},40%,70%,${s.alpha})`;
          ctx.beginPath(); ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2); ctx.fill();
        });
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },

  {
    name: "Neural Mycelium",
    tags: ["mycelium", "neural", "network"],
    description: "Mycelial threads mimic synaptic connections, pulsing signals along living networks",
    code: `// Signal propagates along edges with decay
edges.forEach(e => {
  if (e.source.active) {
    e.signal = 1.0;
    setTimeout(() => e.target.active = true, e.length * 20);
  }
  e.signal *= 0.94; // decay
  drawEdge(e, e.signal);
});`,
    animator: (c, ctx, mouse) => {
      let nodes = [], edges = [], t = 0, id;
      const N = 40;
      for (let i = 0; i < N; i++) nodes.push({ x: Math.random() * c.width, y: Math.random() * c.height, active: false, pulse: 0, hue: 100 + Math.random() * 60 });
      nodes.forEach((n, i) => {
        nodes.forEach((m, j) => {
          if (j <= i) return;
          const d = Math.hypot(n.x - m.x, n.y - m.y);
          if (d < 140) edges.push({ a: n, b: m, signal: 0, len: d });
        });
      });
      const triggerPulse = () => {
        const n = nodes[Math.floor(Math.random() * nodes.length)];
        n.active = true; n.pulse = 1;
      };
      triggerPulse();
      const iv = setInterval(triggerPulse, 1200);
      const loop = () => {
        t += 0.016;
        ctx.fillStyle = "rgba(2,6,4,0.15)";
        ctx.fillRect(0, 0, c.width, c.height);
        edges.forEach(e => {
          if (e.a.pulse > 0.3) e.signal = e.a.pulse;
          if (e.b.pulse > 0.3 && e.signal < e.b.pulse) e.signal = e.b.pulse;
          e.signal *= 0.96;
          if (e.signal > 0.02) {
            const hue = 110 + e.signal * 80;
            ctx.strokeStyle = `hsla(${hue},70%,${40 + e.signal * 30}%,${e.signal * 0.8})`;
            ctx.lineWidth = e.signal * 2;
            ctx.beginPath(); ctx.moveTo(e.a.x, e.a.y); ctx.lineTo(e.b.x, e.b.y); ctx.stroke();
            if (e.signal > 0.5) {
              if (Math.random() > 0.92) e.b.pulse = e.signal * 0.8;
              if (Math.random() > 0.92) e.a.pulse = e.signal * 0.8;
            }
          }
        });
        nodes.forEach(n => {
          n.pulse *= 0.93;
          if (n.pulse > 0.05) {
            ctx.globalCompositeOperation = "screen";
            const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.pulse * 16);
            g.addColorStop(0, `hsla(${n.hue},90%,75%,${n.pulse})`);
            g.addColorStop(1, "rgba(0,0,0,0)");
            ctx.fillStyle = g; ctx.beginPath(); ctx.arc(n.x, n.y, n.pulse * 16, 0, Math.PI * 2); ctx.fill();
            ctx.globalCompositeOperation = "source-over";
          }
          ctx.fillStyle = `hsla(${n.hue},40%,35%,0.7)`;
          ctx.beginPath(); ctx.arc(n.x, n.y, 3, 0, Math.PI * 2); ctx.fill();
        });
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => { clearInterval(iv); cancelAnimationFrame(id); } };
    }
  },

  {
    name: "Lichen Spread",
    tags: ["mycelium", "lichen", "growth"],
    description: "Circular lichen colonies expand outward from multiple origin points, merging at boundaries",
    code: `// Cellular automata expansion: if adjacent to colony, join with probability
neighbors.forEach(cell => {
  if (cell.colonized && !self.colonized) {
    if (random() < growthRate * (1 - self.resistance)) {
      self.colonized = true;
      self.hue = cell.hue + random() * 10 - 5;
    }
  }
});`,
    animator: (c, ctx, mouse) => {
      const CELL = 8, COLS = Math.floor(c.width / CELL), ROWS = Math.floor(c.height / CELL);
      let grid = Array.from({ length: COLS }, () => Array.from({ length: ROWS }, () => ({ on: false, hue: 0, age: 0 })));
      let t = 0, id;
      const seed = (x, y, hue) => { const gx = Math.floor(x / CELL), gy = Math.floor(y / CELL); if (gx >= 0 && gx < COLS && gy >= 0 && gy < ROWS) { grid[gx][gy].on = true; grid[gx][gy].hue = hue; } };
      for (let i = 0; i < 6; i++) seed(Math.random() * c.width, Math.random() * c.height, Math.random() * 80 + 80);
      const loop = () => {
        t += 0.016;
        ctx.fillStyle = "rgba(2,4,2,0.08)";
        ctx.fillRect(0, 0, c.width, c.height);
        if (t % 0.08 < 0.016) {
          for (let x = 1; x < COLS - 1; x++) for (let y = 1; y < ROWS - 1; y++) {
            if (!grid[x][y].on) {
              const neighbors = [[x-1,y],[x+1,y],[x,y-1],[x,y+1]];
              const active = neighbors.filter(([nx,ny]) => grid[nx][ny].on);
              if (active.length > 0 && Math.random() > 0.85) {
                const [nx, ny] = active[Math.floor(Math.random() * active.length)];
                grid[x][y].on = true;
                grid[x][y].hue = grid[nx][ny].hue + (Math.random() - 0.5) * 12;
                grid[x][y].age = 0;
              }
            } else { grid[x][y].age++; }
          }
        }
        for (let x = 0; x < COLS; x++) for (let y = 0; y < ROWS; y++) {
          const cell = grid[x][y];
          if (!cell.on) continue;
          const ageAlpha = Math.min(1, cell.age / 60);
          ctx.fillStyle = `hsla(${cell.hue},45%,${28 + ageAlpha * 15}%,${0.5 + ageAlpha * 0.4})`;
          ctx.fillRect(x * CELL, y * CELL, CELL - 1, CELL - 1);
        }
        // cursor seed
        if (t % 1.5 < 0.016) seed(mouse.x, mouse.y, Math.random() * 80 + 80);
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  }

];
