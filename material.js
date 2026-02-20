// ─────────────────────────────────────────────────
//  MATERIAL EFFECTS
// ─────────────────────────────────────────────────

export const materialEffects = [
  // ─────────────────────────────────────────────────
//  EXTENDED MATERIAL EFFECTS
// ─────────────────────────────────────────────────

  {
    name: "Molten Magma",
    tags: ["material", "lava", "heat"],
    description: "Viscous heat-mapped fluid with cooling surface crust",
    code: `// Temperature-to-color mapping + cooling crust
const temp = 0.5 + sin(x*0.02 + t) * 0.5;
const color = temp > 0.8 ? '#fff2aa' : (temp > 0.4 ? '#ff4400' : '#331100');
ctx.fillStyle = color;`,
    animator: (c, ctx, mouse) => {
      let cells = [], t = 0, id;
      const SIZE = 25;
      const loop = () => {
        t += .012; ctx.fillStyle = "#1a0500"; ctx.fillRect(0, 0, c.width, c.height);
        for (let x = 0; x < c.width; x += SIZE) {
          for (let y = 0; y < c.height; y += SIZE) {
            const noise = Math.sin(x * 0.01 + t) * Math.cos(y * 0.01 + t * 0.8);
            const dist = Math.hypot(x - mouse.x, y - mouse.y);
            const heat = Math.max(0, (noise + 1) * 0.5 - (dist / 400));
            const hue = 5 + heat * 35;
            ctx.fillStyle = `hsl(${hue}, 100%, ${heat * 60}%)`;
            ctx.fillRect(x, y, SIZE, SIZE);
            if (heat > 0.6) {
              ctx.fillStyle = "rgba(255,255,200,0.15)";
              ctx.fillRect(x + 2, y + 2, SIZE - 4, SIZE - 4);
            }
          }
        }
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },

  {
    name: "Carbon Fiber",
    tags: ["material", "industrial", "weave"],
    description: "Interlocking diagonal weave with anisotropic specular highlights",
    code: `// Diagonal interlaced pattern with shift
const isEven = (floor(x/w) + floor(y/h)) % 2 === 0;
ctx.fillStyle = isEven ? '#111' : '#1a1a1a';
// Specular glint based on mouse angle`,
    animator: (c, ctx, mouse) => {
      let id;
      const loop = () => {
        ctx.fillStyle = "#0a0a0a"; ctx.fillRect(0, 0, c.width, c.height);
        const size = 20;
        for (let x = 0; x < c.width; x += size) {
          for (let y = 0; y < c.height; y += size) {
            const alt = (Math.floor(x / size) + Math.floor(y / size)) % 2 === 0;
            const grad = ctx.createLinearGradient(x, y, x + size, y + size);
            const shine = Math.max(0, 1 - Math.hypot(x - mouse.x, y - mouse.y) / 300);
            const base = alt ? 20 : 40;
            grad.addColorStop(0, `rgb(${base},${base},${base})`);
            grad.addColorStop(0.5, `rgb(${base + shine * 60},${base + shine * 60},${base + shine * 60})`);
            grad.addColorStop(1, `rgb(${base},${base},${base})`);
            ctx.fillStyle = grad; ctx.fillRect(x, y, size - 1, size - 1);
          }
        }
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },

  {
    name: "Frozen Ice",
    tags: ["material", "nature", "cold"],
    description: "Fractal frost tendrils spreading across the surface",
    code: `// Iterative branching with jagged offsets
const angle = parentAngle + (rand()-0.5) * 0.8;
const len = parentLen * 0.9;
ctx.strokeStyle = 'rgba(200,240,255,0.4)';`,
    animator: (c, ctx, mouse) => {
      let crystals = [], id;
      const spawn = (x, y) => {
        crystals.push({ x, y, angle: Math.random() * Math.PI * 2, len: 10 + Math.random() * 20, life: 1 });
      };
      const iv = setInterval(() => spawn(mouse.x, mouse.y), 150);
      const loop = () => {
        ctx.fillStyle = "rgba(10,20,30,0.05)"; ctx.fillRect(0, 0, c.width, c.height);
        crystals.forEach((cr, i) => {
          ctx.strokeStyle = `rgba(200,245,255,${cr.life})`; ctx.lineWidth = cr.life * 2;
          ctx.beginPath(); ctx.moveTo(cr.x, cr.y);
          const nx = cr.x + Math.cos(cr.angle) * cr.len, ny = cr.y + Math.sin(cr.angle) * cr.len;
          ctx.lineTo(nx, ny); ctx.stroke();
          cr.x = nx; cr.y = ny; cr.angle += (Math.random() - 0.5) * 0.5; cr.life -= 0.02;
          if (cr.life <= 0) crystals.splice(i, 1);
        });
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => { clearInterval(iv); cancelAnimationFrame(id); } };
    }
  },

  {
    name: "Oil Slick",
    tags: ["material", "fluid", "iridescent"],
    description: "Rainbow interference patterns swirling in dark water",
    code: `// Perlin-like swirl with HSL hue cycling
const hue = (noise(x,y,t) * 360 + t*50) % 360;
ctx.fillStyle = \`hsla(\${hue}, 70%, 50%, 0.3)\`;`,
    animator: (c, ctx, mouse) => {
      let t = 0, id;
      const loop = () => {
        t += .01; ctx.fillStyle = "rgba(5,5,10,0.1)"; ctx.fillRect(0, 0, c.width, c.height);
        for (let i = 0; i < 8; i++) {
          const x = (Math.sin(t + i) * 0.3 + 0.5) * c.width + (mouse.x - c.width/2) * 0.2;
          const y = (Math.cos(t * 0.8 + i) * 0.3 + 0.5) * c.height + (mouse.y - c.height/2) * 0.2;
          const g = ctx.createRadialGradient(x, y, 0, x, y, 150 + i * 20);
          g.addColorStop(0, `hsla(${(t * 40 + i * 40) % 360}, 80%, 60%, 0.4)`);
          g.addColorStop(1, "transparent");
          ctx.fillStyle = g; ctx.fillRect(0, 0, c.width, c.height);
        }
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },

  {
    name: "Brushed Gold",
    tags: ["material", "metal", "luxury"],
    description: "Finely grained metallic surface with soft-focus glints",
    code: `// Micro-scratch texture + radial metallic gradient
const grain = rand() * 5;
ctx.strokeStyle = \`rgba(255,215,100,0.05)\`;
ctx.moveTo(x, y); ctx.lineTo(x+grain, y);`,
    animator: (c, ctx, mouse) => {
      let id;
      const loop = () => {
        const g = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, c.width);
        g.addColorStop(0, "#ffec91"); g.addColorStop(0.2, "#d4af37"); g.addColorStop(1, "#3d2b00");
        ctx.fillStyle = g; ctx.fillRect(0, 0, c.width, c.height);
        ctx.strokeStyle = "rgba(255,255,255,0.03)";
        for (let i = 0; i < 200; i++) {
          const x = Math.random() * c.width, y = Math.random() * c.height;
          ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + 40, y + 2); ctx.stroke();
        }
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },

  {
    name: "Acoustic Foam",
    tags: ["material", "industrial", "sound"],
    description: "Pyramidal foam texture that dampens and reacts to movement",
    code: `// 3D pyramid shading using cursor as light source
const angle = atan2(mouse.y - py, mouse.x - px);
const shade = cos(angle) * 0.5 + 0.5;
ctx.fillStyle = \`rgb(\${30*shade}, \${30*shade}, \${35*shade})\`;`,
    animator: (c, ctx, mouse) => {
      let id;
      const size = 40;
      const loop = () => {
        ctx.fillStyle = "#111"; ctx.fillRect(0, 0, c.width, c.height);
        for (let x = 0; x < c.width; x += size) {
          for (let y = 0; y < c.height; y += size) {
            const dx = mouse.x - (x + size/2), dy = mouse.y - (y + size/2);
            const dist = Math.hypot(dx, dy);
            const intensity = Math.max(0.2, 1 - dist/500);
            ctx.fillStyle = `rgb(${20*intensity}, ${20*intensity}, ${25*intensity})`;
            ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + size/2, y + size/2); ctx.lineTo(x + size, y); ctx.fill();
            ctx.fillStyle = `rgb(${40*intensity}, ${40*intensity}, ${45*intensity})`;
            ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + size/2, y + size/2); ctx.lineTo(x, y + size); ctx.fill();
          }
        }
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },

  {
    name: "Paper Crumple",
    tags: ["material", "paper", "texture"],
    description: "Fibrous paper surface with dynamic folding shadows",
    code: `// Crease generation via line-segment intersection
if(rand() > 0.99) creases.push({x1, y1, x2, y2});
ctx.strokeStyle = \`rgba(0,0,0,\${shadowStrength})\`;`,
    animator: (c, ctx, mouse) => {
      let creases = [], id;
      for (let i = 0; i < 30; i++) creases.push({ x1: Math.random() * c.width, y1: Math.random() * c.height, x2: Math.random() * c.width, y2: Math.random() * c.height, o: Math.random() * 0.1 });
      const loop = () => {
        ctx.fillStyle = "#f4f4f0"; ctx.fillRect(0, 0, c.width, c.height);
        creases.forEach(cr => {
          const d = Math.abs((cr.x2 - cr.x1) * (cr.y1 - mouse.y) - (cr.x1 - mouse.x) * (cr.y2 - cr.y1)) / Math.hypot(cr.x2 - cr.x1, cr.y2 - cr.y1);
          ctx.strokeStyle = `rgba(0,0,0,${cr.o + (d < 50 ? (50-d)*0.002 : 0)})`;
          ctx.beginPath(); ctx.moveTo(cr.x1, cr.y1); ctx.lineTo(cr.x2, cr.y2); ctx.stroke();
        });
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },

  {
    name: "Bio-Moss",
    tags: ["material", "organic", "growth"],
    description: "Velvety green moss that darkens and compresses under the cursor",
    code: `// Density-based clustering + cursor compression
moss.r = baseR - clamp(60 - dist, 0, 20);
ctx.fillStyle = \`hsl(80, 70%, \${moss.light}%)\`;`,
    animator: (c, ctx, mouse) => {
      let patches = [], id;
      for (let i = 0; i < 400; i++) patches.push({ x: Math.random() * c.width, y: Math.random() * c.height, r: Math.random() * 8 + 4, h: 70 + Math.random() * 40 });
      const loop = () => {
        ctx.fillStyle = "#050800"; ctx.fillRect(0, 0, c.width, c.height);
        patches.forEach(p => {
          const d = Math.hypot(p.x - mouse.x, p.y - mouse.y);
          const press = Math.max(0, 1 - d/80);
          ctx.fillStyle = `hsl(${p.h}, 60%, ${30 - press * 20}%)`;
          ctx.beginPath(); ctx.arc(p.x, p.y, p.r * (1 - press * 0.5), 0, Math.PI * 2); ctx.fill();
        });
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },

  {
    name: "Volcanic Ash",
    tags: ["material", "decay", "air"],
    description: "Grey particulate matter drifting and swirling in the air",
    code: `// Brownian motion + cursor wind force
p.vx += (rand()-0.5) * 0.1 + windX;
p.alpha *= 0.99;`,
    animator: (c, ctx, mouse) => {
      let flakes = [], id;
      const loop = () => {
        ctx.fillStyle = "#111"; ctx.fillRect(0, 0, c.width, c.height);
        if (flakes.length < 200) flakes.push({ x: Math.random() * c.width, y: -10, vx: (Math.random() - 0.5) * 2, vy: Math.random() * 1 + 0.5, r: Math.random() * 3 });
        flakes.forEach((f, i) => {
          const dx = f.x - mouse.x, dy = f.y - mouse.y, dist = Math.hypot(dx, dy);
          if (dist < 100) { f.vx += dx / dist * 0.5; f.vy += dy / dist * 0.5; }
          f.x += f.vx; f.y += f.vy; f.vx *= 0.98;
          ctx.fillStyle = "rgba(150,150,150,0.6)";
          ctx.beginPath(); ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2); ctx.fill();
          if (f.y > c.height) flakes.splice(i, 1);
        });
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },

  {
    name: "Polished Obsidian",
    tags: ["material", "stone", "dark"],
    description: "Deep black glass with razor-sharp specular reflections",
    code: `// High-contrast mirror reflection approximation
const refX = mouse.x, refY = mouse.y;
ctx.fillStyle = \`rgba(255,255,255,\${0.1 / (dist*0.1)})\`;`,
    animator: (c, ctx, mouse) => {
      let id;
      const loop = () => {
        ctx.fillStyle = "#020205"; ctx.fillRect(0, 0, c.width, c.height);
        const g = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 400);
        g.addColorStop(0, "rgba(200,210,255,0.15)");
        g.addColorStop(1, "transparent");
        ctx.fillStyle = g; ctx.fillRect(0, 0, c.width, c.height);
        ctx.strokeStyle = "rgba(255,255,255,0.4)"; ctx.lineWidth = 0.5;
        ctx.strokeRect(mouse.x - 50, mouse.y - 50, 100, 100);
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },
  {
    name: "Glass Shatter",
    tags: ["material", "glass", "destruction"],
    description: "Transparent glass fragments explode and fall with refraction glints",
    code: `// Convex polygon shard with fresnel edge glow
shard.vertices.forEach(v => { v.x += shard.vx; v.y += shard.vy; });
shard.angle += shard.spin;
ctx.fillStyle = \`rgba(200,230,255,\${shard.alpha * 0.3})\`;
ctx.strokeStyle = \`rgba(220,240,255,\${shard.alpha})\`;`,
    animator: (c, ctx, mouse) => {
      let shards = [], glints = [], t = 0, id;
      const shatter = (cx, cy) => {
        const n = Math.floor(Math.random() * 10 + 8);
        for (let i = 0; i < n; i++) {
          const a = (i / n) * Math.PI * 2, a2 = ((i + 1) / n) * Math.PI * 2, r1 = Math.random() * 50 + 20, r2 = Math.random() * 50 + 20;
          const vx = (Math.random() - .5) * 8 + Math.cos(a) * 3, vy = (Math.random() - .5) * 8 - Math.random() * 4;
          shards.push({ verts: [{ x: cx, y: cy }, { x: cx + Math.cos(a) * r1, y: cy + Math.sin(a) * r1 }, { x: cx + Math.cos(a2) * r2, y: cy + Math.sin(a2) * r2 }], vx, vy, spin: (Math.random() - .5) * .15, angle: 0, alpha: .9, cx, cy, hue: 180 + Math.random() * 40 });
          glints.push({ x: cx + Math.cos(a) * r1 * .5, y: cy + Math.sin(a) * r1 * .5, vx: vx * .5, vy: vy * .5 - 2, alpha: 1, r: Math.random() * 3 + 1 });
        }
      };
      const iv = setInterval(() => shatter(mouse.x, mouse.y), 1200); shatter(c.width / 2, c.height / 3);
      const loop = () => {
        t += .016; ctx.fillStyle = "rgba(4,6,10,0.2)"; ctx.fillRect(0, 0, c.width, c.height);
        shards.forEach((s, i) => {
          s.verts.forEach(v => { v.x += s.vx; v.y += s.vy; }); s.vy += .18; s.vx *= .99; s.alpha -= .007;
          if (s.alpha <= 0 || s.verts[0].y > c.height + 60) { shards.splice(i, 1); return; }
          ctx.save(); ctx.beginPath(); s.verts.forEach((v, vi) => vi === 0 ? ctx.moveTo(v.x, v.y) : ctx.lineTo(v.x, v.y)); ctx.closePath();
          ctx.fillStyle = `rgba(180,215,255,${s.alpha * .22})`; ctx.fill();
          ctx.strokeStyle = `rgba(220,240,255,${s.alpha * .9})`; ctx.lineWidth = 1.2; ctx.stroke(); ctx.restore();
        });
        glints.forEach((g, i) => { g.x += g.vx; g.y += g.vy; g.vy += .12; g.alpha -= .022; if (g.alpha <= 0) { glints.splice(i, 1); return; } ctx.fillStyle = `rgba(240,250,255,${g.alpha})`; ctx.beginPath(); ctx.arc(g.x, g.y, g.r, 0, Math.PI * 2); ctx.fill(); });
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => { clearInterval(iv); cancelAnimationFrame(id); } };
    }
  },

  {
    name: "Liquid Metal",
    tags: ["material", "metal", "fluid"],
    description: "Mercury-like metallic blobs with specular highlight merge and flow",
    code: `// Radial gradient with bright specular spot + dark edge
const g = ctx.createRadialGradient(x-r*.3, y-r*.3, 0, x, y, r);
g.addColorStop(0, 'rgba(240,248,255,0.95)');
g.addColorStop(0.4, 'rgba(160,175,190,0.85)');
g.addColorStop(1, 'rgba(30,35,45,0.7)');`,
    animator: (c, ctx, mouse) => {
      let blobs = [], t = 0, id;
      for (let i = 0; i < 14; i++) blobs.push({ x: Math.random() * c.width, y: Math.random() * c.height, vx: (Math.random() - .5) * 2, vy: (Math.random() - .5) * 2, r: Math.random() * 40 + 20, phase: Math.random() * Math.PI * 2 });
      const loop = () => {
        t += .014; ctx.fillStyle = "rgba(10,10,14,0.2)"; ctx.fillRect(0, 0, c.width, c.height);
        blobs.forEach(b => {
          b.x += b.vx + (mouse.x - b.x) * .0005; b.y += b.vy + (mouse.y - b.y) * .0003;
          b.vx += (Math.random() - .5) * .12; b.vy += (Math.random() - .5) * .12; b.vx *= .97; b.vy *= .97;
          if (b.x < b.r) b.vx = Math.abs(b.vx); if (b.x > c.width - b.r) b.vx = -Math.abs(b.vx);
          if (b.y < b.r) b.vy = Math.abs(b.vy); if (b.y > c.height - b.r) b.vy = -Math.abs(b.vy);
          const pulse = b.r * (.95 + Math.sin(t * 2 + b.phase) * .05);
          const g = ctx.createRadialGradient(b.x - pulse * .32, b.y - pulse * .32, 0, b.x, b.y, pulse);
          g.addColorStop(0, "rgba(240,248,255,0.95)"); g.addColorStop(.25, "rgba(175,185,200,0.88)"); g.addColorStop(.6, "rgba(90,100,115,0.78)"); g.addColorStop(1, "rgba(20,25,35,0.55)");
          ctx.fillStyle = g; ctx.beginPath(); ctx.arc(b.x, b.y, pulse, 0, Math.PI * 2); ctx.fill();
          // specular glint
          ctx.fillStyle = "rgba(255,255,255,0.55)"; ctx.beginPath(); ctx.ellipse(b.x - pulse * .28, b.y - pulse * .28, pulse * .18, pulse * .1, -Math.PI / 4, 0, Math.PI * 2); ctx.fill();
        });
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },

  {
    name: "Rust Flakes",
    tags: ["material", "metal", "decay"],
    description: "Flaking rust particles crumble off surfaces and drift down",
    code: `// Irregular polygon flake with rusty color variation
const hue = 12 + rand() * 22;
ctx.fillStyle = \`hsl(\${hue}, 70%, \${35+rand()*20}%)\`;
// 5-7 vertex irregular polygon shape`,
    animator: (c, ctx, mouse) => {
      let flakes = [], streaks = [], t = 0, id;
      const spawn = (x, y) => { for (let i = 0; i < 5; i++) flakes.push({ x: x + (Math.random() - .5) * 40, y, vx: (Math.random() - .5) * 2.5, vy: -(Math.random() * 3 + 1.5), spin: (Math.random() - .5) * .08, angle: Math.random() * Math.PI * 2, size: Math.random() * 10 + 5, hue: 12 + Math.random() * 22, sat: 60 + Math.random() * 20, lit: 32 + Math.random() * 22, alpha: .9, life: 1 }); };
      const iv = setInterval(() => spawn(mouse.x, mouse.y), 200); spawn(c.width / 2, c.height * .4);
      const loop = () => {
        t += .016; ctx.fillStyle = "rgba(6,3,2,0.18)"; ctx.fillRect(0, 0, c.width, c.height);
        flakes.forEach((f, i) => {
          f.x += f.vx; f.y += f.vy; f.vy += .12; f.angle += f.spin; f.life -= .01;
          if (f.life <= 0 || f.y > c.height + f.size * 2) { flakes.splice(i, 1); return; }
          ctx.save(); ctx.translate(f.x, f.y); ctx.rotate(f.angle);
          ctx.fillStyle = `hsla(${f.hue},${f.sat}%,${f.lit}%,${f.life * .9})`;
          ctx.beginPath(); const verts = 5 + Math.floor(Math.random() * 3);
          for (let k = 0; k < verts; k++) { const a = (k / verts) * Math.PI * 2, r = f.size * (.55 + Math.random() * .55); ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r); }
          ctx.closePath(); ctx.fill(); ctx.restore();
        });
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => { clearInterval(iv); cancelAnimationFrame(id); } };
    }
  },

  {
    name: "Fabric Ripple",
    tags: ["material", "cloth", "fluid"],
    description: "A cloth mesh ripples and waves as cursor disturbs the fabric",
    code: `// Spring-mass cloth mesh with neighbor forces
points.forEach(p => {
  p.vy += (p.restY - p.y) * 0.012;
  // cursor disturb
  if(dist(p, mouse) < 60) p.vy -= 4;
  p.y += p.vy *= 0.95;
});`,
    animator: (c, ctx, mouse) => {
      const COLS = 30, ROWS = 20, SX = c.width / COLS, SY = c.height / ROWS;
      let pts = [], t = 0, id;
      for (let r = 0; r <= ROWS; r++) for (let col = 0; col <= COLS; col++) pts.push({ x: col * SX, y: r * SY, vy: 0, restY: r * SY, col, row: r });
      const loop = () => {
        t += .016; ctx.fillStyle = "rgba(8,5,12,0.2)"; ctx.fillRect(0, 0, c.width, c.height);
        pts.forEach(p => {
          const dy = p.restY - p.y, dist = Math.hypot(p.x - mouse.x, p.y - mouse.y);
          if (dist < 70) p.vy -= (1 - dist / 70) * 5;
          p.vy += dy * .015; p.vy *= .92; p.y += p.vy;
          // propagate to neighbors
          const right = pts.find(q => q.col === p.col + 1 && q.row === p.row);
          const below = pts.find(q => q.col === p.col && q.row === p.row + 1);
          if (right) { const stretch = p.y - right.y; right.vy += stretch * .08; }
          if (below) { const stretch = p.y - below.y; below.vy += stretch * .1; }
        });
        ctx.strokeStyle = "rgba(160,100,200,0.35)"; ctx.lineWidth = .7;
        for (let r = 0; r < ROWS; r++) for (let col = 0; col < COLS; col++) {
          const p = pts[r * (COLS + 1) + col], right = pts[r * (COLS + 1) + col + 1], below = pts[(r + 1) * (COLS + 1) + col];
          if (right) { ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(right.x, right.y); ctx.stroke(); }
          if (below) { ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(below.x, below.y); ctx.stroke(); }
        }
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },

  {
    name: "Crystal Growth",
    tags: ["material", "crystal", "organic"],
    description: "Geometric crystals grow outward from seeds in angular formations",
    code: `// Recursive angular branch growth
const grow = (x, y, angle, len, depth, hue) => {
  if(depth === 0 || len < 2) return;
  const ex = x + cos(angle)*len, ey = y + sin(angle)*len;
  ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(ex, ey); ctx.stroke();
  grow(ex, ey, angle + PI/6, len*0.72, depth-1, hue+15);
  grow(ex, ey, angle - PI/6, len*0.72, depth-1, hue-15);
};`,
    animator: (c, ctx, mouse) => {
      let seeds = [], t = 0, id;
      const iv = setInterval(() => { if (seeds.length < 6) seeds.push({ x: mouse.x + (Math.random() - .5) * 60, y: mouse.y + (Math.random() - .5) * 60, maxLen: Math.random() * 70 + 40, curLen: 2, depth: 5, hue: Math.random() * 280 + 160, alpha: .8 }); }, 900); seeds.push({ x: c.width / 2, y: c.height / 2, maxLen: 80, curLen: 2, depth: 5, hue: 200, alpha: .8 });
      const drawCrystal = (x, y, angle, len, depth, hue, alpha) => {
        if (depth === 0 || len < 1.5) return;
        ctx.strokeStyle = `hsla(${hue},65%,65%,${alpha})`; ctx.lineWidth = depth * .5;
        ctx.beginPath(); ctx.moveTo(x, y); const ex = x + Math.cos(angle) * len, ey = y + Math.sin(angle) * len; ctx.lineTo(ex, ey); ctx.stroke();
        drawCrystal(ex, ey, angle + Math.PI / 5, len * .68, depth - 1, hue + 12, alpha * .88);
        drawCrystal(ex, ey, angle - Math.PI / 5, len * .68, depth - 1, hue - 12, alpha * .88);
      };
      const loop = () => {
        t += .016; ctx.fillStyle = "rgba(4,4,10,0.12)"; ctx.fillRect(0, 0, c.width, c.height);
        seeds.forEach((s, i) => {
          s.curLen = Math.min(s.curLen + .4, s.maxLen);
          for (let a = 0; a < 6; a++) drawCrystal(s.x, s.y, (a / 6) * Math.PI * 2, s.curLen, s.depth, s.hue, s.alpha);
          s.alpha = Math.max(s.alpha - .0005, .4);
        });
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => { clearInterval(iv); cancelAnimationFrame(id); } };
    }
  },

  {
    name: "Paint Splash",
    tags: ["material", "paint", "artistic"],
    description: "Bold paint drops splatter with realistic spread and drip physics",
    code: `// Splash main blob + satellite droplets
const splat = (x, y, color) => {
  ctx.fillStyle = color;
  ctx.beginPath(); ctx.arc(x, y, rand()*20+10, 0, PI*2); ctx.fill();
  for(let i=0; i<8; i++) drawDrip(x + rand()*60, y);
};`,
    animator: (c, ctx, mouse) => {
      let drips = [], t = 0, id;
      const COLORS = ["#e74c3c","#e67e22","#f1c40f","#2ecc71","#3498db","#9b59b6","#1abc9c","#e91e63"];
      const splash = (x, y) => {
        const color = COLORS[Math.floor(Math.random() * COLORS.length)];
        ctx.fillStyle = color + "cc"; ctx.beginPath(); ctx.arc(x, y, Math.random() * 22 + 10, 0, Math.PI * 2); ctx.fill();
        for (let i = 0; i < 10; i++) { const a = Math.random() * Math.PI * 2, dist = Math.random() * 60 + 10, sx = x + Math.cos(a) * dist, sy = y + Math.sin(a) * dist; ctx.fillStyle = color + "aa"; ctx.beginPath(); ctx.arc(sx, sy, Math.random() * 10 + 3, 0, Math.PI * 2); ctx.fill(); if (Math.random() > .5) drips.push({ x: sx, y: sy, vy: Math.random() * 2 + 1, len: 0, maxLen: Math.random() * 80 + 30, w: Math.random() * 6 + 2, color, alpha: .8 }); }
      };
      const iv = setInterval(() => splash(mouse.x, mouse.y), 700); splash(c.width / 3, c.height / 3); splash(c.width * .7, c.height * .6);
      const loop = () => {
        t += .016; ctx.fillStyle = "rgba(14,10,8,0.06)"; ctx.fillRect(0, 0, c.width, c.height);
        drips.forEach((d, i) => {
          d.len += d.vy; d.vy *= 1.008; if (d.len >= d.maxLen) { d.alpha -= .008; } if (d.alpha <= 0) { drips.splice(i, 1); return; }
          ctx.strokeStyle = d.color + Math.floor(d.alpha * 255).toString(16).padStart(2, "0"); ctx.lineWidth = d.w * d.alpha; ctx.lineCap = "round";
          ctx.beginPath(); ctx.moveTo(d.x, d.y); ctx.lineTo(d.x + Math.sin(d.x * .05) * 5, d.y + d.len); ctx.stroke();
        });
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => { clearInterval(iv); cancelAnimationFrame(id); } };
    }
  },

  {
    name: "Neon Sign",
    tags: ["material", "light", "urban"],
    description: "Glowing neon tube paths that flicker and buzz with electric life",
    code: `// Neon glow via layered shadows at increasing blur
ctx.shadowColor = tube.color;
[24, 12, 6].forEach(blur => {
  ctx.shadowBlur = blur;
  ctx.strokeStyle = blend(tube.color, white, blur/24);
  ctx.stroke();
});`,
    animator: (c, ctx, mouse) => {
      const shapes = [
        { pts: [[.2, .3], [.4, .3], [.4, .5], [.2, .5], [.2, .7], [.4, .7]], color: "#ff0088", hue: 325 },
        { pts: [[.5, .3], [.7, .3], [.7, .5], [.5, .5], [.5, .7], [.7, .7]], color: "#00ffcc", hue: 168 },
        { pts: [[.3, .2], [.3, .8]], color: "#ffdd00", hue: 52 }
      ];
      let t = 0, flickers = [1, 1, 1], id;
      const iv = setInterval(() => { const i = Math.floor(Math.random() * shapes.length); flickers[i] = Math.random() > .8 ? 0 : 1; setTimeout(() => flickers[i] = 1, 80 + Math.random() * 120); }, 600);
      const loop = () => {
        t += .016; ctx.fillStyle = "rgba(4,2,8,0.25)"; ctx.fillRect(0, 0, c.width, c.height);
        shapes.forEach((s, si) => {
          if (flickers[si] === 0) return;
          const flicker = flickers[si] * (.85 + Math.sin(t * 12 + si) * .1 + (mouse.x / c.width - .5) * .1);
          const pts = s.pts.map(p => [p[0] * c.width, p[1] * c.height]);
          [20, 10, 5, 1.5].forEach((blur, bi) => {
            const alphas = [.25, .45, .65, 1]; ctx.shadowColor = s.color; ctx.shadowBlur = blur * flicker; ctx.strokeStyle = `hsla(${s.hue},100%,${60 + bi * 10}%,${alphas[bi] * flicker})`; ctx.lineWidth = bi === 3 ? 2 : 4 + (3 - bi) * 3; ctx.lineCap = "round"; ctx.lineJoin = "round";
            ctx.beginPath(); pts.forEach((p, pi) => pi === 0 ? ctx.moveTo(p[0], p[1]) : ctx.lineTo(p[0], p[1])); ctx.stroke();
          });
          ctx.shadowBlur = 0;
        });
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => { clearInterval(iv); cancelAnimationFrame(id); } };
    }
  },

  {
    name: "Sand Mandala",
    tags: ["material", "sand", "pattern"],
    description: "Colored sand grains are placed in intricate radial mandala patterns",
    code: `// Radial symmetry: place grain at 8 mirror positions
for(let sym=0; sym<8; sym++){
  const sa = baseAngle + sym * PI/4;
  ctx.fillStyle = \`hsl(\${grain.hue + sym*22},70%,55%)\`;
  ctx.fillRect(cx + cos(sa)*r, cy + sin(sa)*r, 2, 2);
}`,
    animator: (c, ctx, mouse) => {
      let t = 0, id, grains = [];
      const cx = c.width / 2, cy = c.height / 2;
      const loop = () => {
        t += .02; ctx.fillStyle = "rgba(8,5,4,0.04)"; ctx.fillRect(0, 0, c.width, c.height);
        const baseR = t * 1.8 % 200, baseAngle = t * .4;
        for (let i = 0; i < 6; i++) {
          const r = baseR + i * 12, angle = baseAngle + i * .3;
          for (let sym = 0; sym < 8; sym++) {
            const sa = angle + sym * Math.PI / 4, sx = cx + Math.cos(sa) * r, sy = cy + Math.sin(sa) * r;
            const hue = (t * 30 + i * 35 + sym * 22) % 360;
            ctx.fillStyle = `hsl(${hue},72%,55%)`; ctx.beginPath(); ctx.arc(sx, sy, 1.8, 0, Math.PI * 2); ctx.fill();
          }
        }
        const mdist = Math.hypot(mouse.x - cx, mouse.y - cy);
        if (mdist < 220) { for (let sym = 0; sym < 8; sym++) { const sa = Math.atan2(mouse.y - cy, mouse.x - cx) + sym * Math.PI / 4, sx = cx + Math.cos(sa) * mdist, sy = cy + Math.sin(sa) * mdist; ctx.fillStyle = `hsla(${t * 40 % 360},80%,70%,0.8)`; ctx.beginPath(); ctx.arc(sx, sy, 2.5, 0, Math.PI * 2); ctx.fill(); } }
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  }
];
