// ─────────────────────────────────────────────────
//  KALEIDOSCOPE EFFECTS
// ─────────────────────────────────────────────────

export const kaleidoscopeEffects = [
// ─────────────────────────────────────────────────
//  PREMIUM GENERATIVE & EXPERIMENTAL
// ─────────────────────────────────────────────────

  {
    name: "Liquid Mercury Glass",
    tags: ["premium", "refraction", "glass"],
    description: "Ultra-high gloss metaballs that distort the 'space' behind them",
    code: `// Faux-refraction through coordinate displacement
const distortion = 1 - (dist / radius);
ctx.drawImage(offscreenCanvas, x - (dx * distortion), y - (dy * distortion));`,
    animator: (c, ctx, mouse) => {
      let dots = [], id, t = 0;
      for(let i=0; i<8; i++) dots.push({ x: Math.random()*c.width, y: Math.random()*c.height, vx: Math.random()*2-1, vy: Math.random()*2-1, r: 80 + Math.random()*40 });
      const loop = () => {
        t += 0.01;
        // Background: Subtle geometric grid
        ctx.fillStyle = "#050508"; ctx.fillRect(0, 0, c.width, c.height);
        ctx.strokeStyle = "#111122";
        for(let i=0; i<c.width; i+=40) { ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, c.height); ctx.stroke(); }
        
        dots.forEach(d => {
          d.x += d.vx + (mouse.x - d.x) * 0.01; d.y += d.vy + (mouse.y - d.y) * 0.01;
          const g = ctx.createRadialGradient(d.x - d.r*0.3, d.y - d.r*0.3, 0, d.x, d.y, d.r);
          g.addColorStop(0, "#ffffff"); g.addColorStop(0.1, "#a0a0b0"); g.addColorStop(0.5, "#202030"); g.addColorStop(1, "rgba(0,0,0,0)");
          ctx.fillStyle = g;
          ctx.beginPath(); ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2); ctx.fill();
          // Specular "Rim Light"
          ctx.strokeStyle = "rgba(255,255,255,0.15)"; ctx.lineWidth = 2; ctx.stroke();
        });
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },

  {
    name: "Neural Neural Weave",
    tags: ["premium", "bio-digital", "organic"],
    description: "Complex interconnected nodes that pass 'data pulses' through a silk-like mesh",
    code: `// Pulse propagation via graph-neighbor traversal
if(node.active) node.neighbors.forEach(n => n.receivePulse(t));`,
    animator: (c, ctx, mouse) => {
      let nodes = [], id;
      for(let i=0; i<40; i++) nodes.push({ x: Math.random()*c.width, y: Math.random()*c.height, p: 0 });
      const loop = () => {
        ctx.fillStyle = "rgba(2, 2, 5, 0.2)"; ctx.fillRect(0, 0, c.width, c.height);
        nodes.forEach((n, i) => {
          const d = Math.hypot(n.x - mouse.x, n.y - mouse.y);
          if (d < 100) n.p = 1;
          n.p *= 0.95;
          nodes.forEach((n2, j) => {
            if (i === j) return;
            const dist = Math.hypot(n.x - n2.x, n.y - n2.y);
            if (dist < 150) {
              ctx.strokeStyle = `rgba(100, 150, 255, ${(n.p + n2.p) * 0.2})`;
              ctx.lineWidth = (n.p + n2.p) * 2;
              ctx.beginPath(); ctx.moveTo(n.x, n.y); ctx.lineTo(n2.x, n2.y); ctx.stroke();
            }
          });
        });
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },

  {
    name: "Golden Fibonacci Veil",
    tags: ["premium", "math", "luxury"],
    description: "A liquid silk curtain following the golden ratio ($1.618$) spiral",
    code: `// Golden ratio spiral progression
const r = Math.sqrt(i) * scale;
const angle = i * 137.5 * (Math.PI / 180);`,
    animator: (c, ctx, mouse) => {
      let t = 0, id;
      const loop = () => {
        t += 0.01; ctx.fillStyle = "#0a0800"; ctx.fillRect(0, 0, c.width, c.height);
        ctx.save(); ctx.translate(c.width/2, c.height/2);
        for(let i=0; i<200; i++) {
          const r = Math.sqrt(i) * 20 + Math.sin(t + i*0.1) * 10;
          const a = i * 137.5 * (Math.PI / 180) + t;
          const x = Math.cos(a) * r, y = Math.sin(a) * r;
          const size = Math.max(1, (mouse.x / c.width) * 5);
          ctx.fillStyle = `hsla(${40 + i*0.2}, 100%, 60%, ${1 - r/400})`;
          ctx.beginPath(); ctx.arc(x, y, size, 0, Math.PI * 2); ctx.fill();
        }
        ctx.restore();
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },

  {
    name: "Dark Matter Swarm",
    tags: ["premium", "physics", "minimal"],
    description: "Invisible particles revealed only by their gravitational lensing of light",
    code: `// Inverse-square law attraction + light bending
const force = G / (dist * dist);
p.velocity += dir * force;`,
    animator: (c, ctx, mouse) => {
      let ps = [], id;
      for(let i=0; i<1000; i++) ps.push({ x: Math.random()*c.width, y: Math.random()*c.height, vx: 0, vy: 0 });
      const loop = () => {
        ctx.fillStyle = "rgba(0,0,0,0.3)"; ctx.fillRect(0, 0, c.width, c.height);
        ps.forEach(p => {
          const dx = mouse.x - p.x, dy = mouse.y - p.y;
          const d = Math.hypot(dx, dy);
          p.vx += dx / d * 0.2; p.vy += dy / d * 0.2;
          p.x += p.vx; p.y += p.vy; p.vx *= 0.95; p.vy *= 0.95;
          ctx.fillStyle = `rgba(255, 255, 255, ${0.1 + (1 - d/c.width)*0.4})`;
          ctx.fillRect(p.x, p.y, 1, 1);
        });
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },

  {
    name: "Prism Flow",
    tags: ["premium", "light", "rainbow"],
    description: "Hyper-saturated light ribbons that split into CMYK components when they turn",
    code: `// Color separation based on velocity vector
drawLayer(cyan, p.x + p.vx, p.y + p.vy);
drawLayer(magenta, p.x - p.vx, p.y - p.vy);`,
    animator: (c, ctx, mouse) => {
      let trails = [], id;
      const loop = () => {
        ctx.fillStyle = "rgba(255, 255, 255, 0.05)"; ctx.fillRect(0, 0, c.width, c.height);
        const p = { x: mouse.x, y: mouse.y, vx: (mouse.x - mouse.px) || 0 };
        mouse.px = mouse.x;
        // Draw split spectrum
        ctx.globalCompositeOperation = "multiply";
        ctx.fillStyle = "#0ff"; ctx.beginPath(); ctx.arc(p.x + p.vx*2, p.y, 15, 0, Math.PI*2); ctx.fill();
        ctx.fillStyle = "#f0f"; ctx.beginPath(); ctx.arc(p.x - p.vx*2, p.y, 15, 0, Math.PI*2); ctx.fill();
        ctx.fillStyle = "#ff0"; ctx.beginPath(); ctx.arc(p.x, p.y, 15, 0, Math.PI*2); ctx.fill();
        ctx.globalCompositeOperation = "source-over";
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },
  {
    name: "Crystal Mirror",
    tags: ["kaleidoscope", "geometric", "symmetric"],
    description: "6-fold symmetry mirror reflecting cursor-driven particles into a crystal bloom",
    code: `// Reflect draw calls across N rotational segments
for (let seg = 0; seg < N; seg++) {
  ctx.save();
  ctx.rotate((seg / N) * Math.PI * 2);
  drawSegment(); // draw once, mirror reflects it
  ctx.restore();
}`,
    animator: (c, ctx, mouse) => {
      let t = 0, id;
      const N = 6;
      const cx = c.width / 2, cy = c.height / 2;
      const loop = () => {
        t += 0.012;
        ctx.fillStyle = "rgba(0,10,15,0.18)";
        ctx.fillRect(0, 0, c.width, c.height);
        const mx = mouse.x - cx, my = mouse.y - cy;
        const dist = Math.hypot(mx, my);
        const angle = Math.atan2(my, mx);
        for (let seg = 0; seg < N; seg++) {
          ctx.save();
          ctx.translate(cx, cy);
          ctx.rotate((seg / N) * Math.PI * 2);
          // draw segment and its mirror
          for (let flip = 0; flip < 2; flip++) {
            ctx.save();
            if (flip) ctx.scale(1, -1);
            for (let i = 0; i < 5; i++) {
              const r = dist * (0.3 + i * 0.15) + Math.sin(t * 2 + i) * 20;
              const a = angle + t * 0.3 + i * 0.4;
              const px = Math.cos(a) * r;
              const py = Math.sin(a) * r;
              const hue = (t * 40 + seg * 60 + i * 30) % 360;
              const g = ctx.createRadialGradient(px, py, 0, px, py, 18 - i * 2);
              g.addColorStop(0, `hsla(${hue},80%,75%,0.9)`);
              g.addColorStop(1, `hsla(${hue},80%,55%,0)`);
              ctx.fillStyle = g;
              ctx.beginPath();
              ctx.arc(px, py, 18 - i * 2, 0, Math.PI * 2);
              ctx.fill();
            }
            ctx.restore();
          }
          ctx.restore();
        }
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },

  {
    name: "Mandala Bloom",
    tags: ["kaleidoscope", "mandala", "ambient"],
    description: "Organic petal shapes unfurl in perfect radial symmetry, pulsing with color",
    code: `// Bezier petal drawn once, rotated N times
for (let i = 0; i < petals; i++) {
  ctx.save();
  ctx.rotate((i / petals) * Math.PI * 2 + t);
  ctx.bezierCurveTo(r*0.5, -r*0.2, r, -r*0.5, r, 0);
  ctx.bezierCurveTo(r, r*0.5, r*0.5, r*0.2, 0, 0);
  ctx.restore();
}`,
    animator: (c, ctx, mouse) => {
      let t = 0, id;
      const cx = c.width / 2, cy = c.height / 2;
      const loop = () => {
        t += 0.006;
        ctx.fillStyle = "rgba(2,8,14,0.15)";
        ctx.fillRect(0, 0, c.width, c.height);
        const influence = Math.hypot(mouse.x - cx, mouse.y - cy) / Math.hypot(cx, cy);
        const petals = 12;
        const R = Math.min(cx, cy) * 0.6 * (0.7 + influence * 0.3);
        for (let layer = 3; layer >= 0; layer--) {
          const r = R * (0.3 + layer * 0.18);
          const hue = (t * 30 + layer * 50) % 360;
          ctx.save();
          ctx.translate(cx, cy);
          for (let i = 0; i < petals; i++) {
            ctx.save();
            ctx.rotate((i / petals) * Math.PI * 2 + t * (layer % 2 === 0 ? 1 : -1));
            ctx.fillStyle = `hsla(${hue + i * 10},65%,55%,0.25)`;
            ctx.strokeStyle = `hsla(${hue + i * 10},80%,70%,0.6)`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.bezierCurveTo(r * 0.4, -r * 0.25, r, -r * 0.4, r, 0);
            ctx.bezierCurveTo(r, r * 0.4, r * 0.4, r * 0.25, 0, 0);
            ctx.fill();
            ctx.stroke();
            ctx.restore();
          }
          ctx.restore();
        }
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },

  {
    name: "Fractal Tile",
    tags: ["kaleidoscope", "fractal", "pattern"],
    description: "Recursive triangle tiling that zooms and rotates endlessly",
    code: `// Recursive Sierpinski-style split with color depth
function tile(x, y, size, depth) {
  if (depth === 0 || size < 2) return;
  const h = size * (Math.sqrt(3)/2);
  drawTriangle(x, y, size, hue + depth * 30);
  tile(x - size/4, y + h/2, size/2, depth - 1);
  tile(x + size/4, y + h/2, size/2, depth - 1);
  tile(x, y - h/2, size/2, depth - 1);
}`,
    animator: (c, ctx, mouse) => {
      let t = 0, id;
      const cx = c.width / 2, cy = c.height / 2;
      const drawTri = (x, y, size, hue, alpha) => {
        const h = size * (Math.sqrt(3) / 2);
        ctx.beginPath();
        ctx.moveTo(x, y - h * 0.667);
        ctx.lineTo(x - size / 2, y + h * 0.333);
        ctx.lineTo(x + size / 2, y + h * 0.333);
        ctx.closePath();
        ctx.strokeStyle = `hsla(${hue},70%,60%,${alpha})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      };
      const tile = (x, y, size, depth, hue) => {
        if (depth === 0 || size < 3) return;
        const h = size * (Math.sqrt(3) / 2);
        drawTri(x, y, size, hue + depth * 25, depth / 6);
        tile(x, y - h * 0.333, size / 2, depth - 1, hue + 15);
        tile(x - size / 4, y + h * 0.167, size / 2, depth - 1, hue + 30);
        tile(x + size / 4, y + h * 0.167, size / 2, depth - 1, hue + 45);
      };
      const loop = () => {
        t += 0.008;
        ctx.fillStyle = "rgba(2,6,10,0.2)";
        ctx.fillRect(0, 0, c.width, c.height);
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(t * 0.1);
        const scale = 1 + 0.1 * Math.sin(t * 0.5);
        ctx.scale(scale, scale);
        const hue = (t * 20 + (mouse.x / c.width) * 180) % 360;
        tile(0, 0, Math.min(c.width, c.height) * 0.85, 6, hue);
        ctx.restore();
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },

  {
    name: "Tunnel Spin",
    tags: ["kaleidoscope", "tunnel", "hypnotic"],
    description: "Concentric mirrored rings collapse inward in a hypnotic rotating tunnel",
    code: `// Shrinking concentric polygons + alternating rotation
for (let ring = rings; ring > 0; ring--) {
  const r = (ring / rings) * maxR;
  const spinDir = ring % 2 === 0 ? 1 : -1;
  ctx.rotate(t * spinDir * 0.3);
  drawNgon(cx, cy, r, sides);
}`,
    animator: (c, ctx, mouse) => {
      let t = 0, id;
      const cx = c.width / 2, cy = c.height / 2;
      const rings = 18, sides = 8;
      const loop = () => {
        t += 0.018;
        ctx.fillStyle = "rgba(0,8,12,0.25)";
        ctx.fillRect(0, 0, c.width, c.height);
        const maxR = Math.min(cx, cy) * 0.95;
        const mouseInfluence = (mouse.x - cx) / cx;
        for (let ring = rings; ring > 0; ring--) {
          const r = (ring / rings) * maxR;
          const progress = 1 - ring / rings;
          const hue = (t * 50 + ring * 20 + mouseInfluence * 60) % 360;
          const spinDir = ring % 2 === 0 ? 1 : -1;
          ctx.save();
          ctx.translate(cx, cy);
          ctx.rotate(t * spinDir * 0.25 + ring * 0.1);
          ctx.strokeStyle = `hsla(${hue},70%,55%,${0.15 + progress * 0.55})`;
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          for (let k = 0; k <= sides; k++) {
            const a = (k / sides) * Math.PI * 2;
            k === 0 ? ctx.moveTo(Math.cos(a) * r, Math.sin(a) * r)
                     : ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r);
          }
          ctx.stroke();
          ctx.restore();
        }
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },

  {
    name: "Stained Glass",
    tags: ["kaleidoscope", "color", "light"],
    description: "Vivid stained glass panels shift and rotate like a cathedral rose window",
    code: `// Sector fill with radial color bands
for (let i = 0; i < sectors; i++) {
  ctx.save();
  ctx.rotate((i / sectors) * Math.PI * 2 + t);
  const g = ctx.createLinearGradient(0, 0, r, 0);
  g.addColorStop(0, hsl(hue, 80%, 45%, 0.9));
  g.addColorStop(1, hsl(hue+60, 70%, 35%, 0.6));
  ctx.fill();
  ctx.restore();
}`,
    animator: (c, ctx, mouse) => {
      let t = 0, id;
      const cx = c.width / 2, cy = c.height / 2;
      const sectors = 12;
      const R = Math.min(cx, cy) * 0.88;
      const loop = () => {
        t += 0.007;
        ctx.fillStyle = "rgba(0,5,10,0.2)";
        ctx.fillRect(0, 0, c.width, c.height);
        const hueBase = (t * 25 + (mouse.x / c.width) * 120) % 360;
        for (let i = 0; i < sectors; i++) {
          const a1 = (i / sectors) * Math.PI * 2 + t * (i % 2 === 0 ? 0.15 : -0.15);
          const a2 = ((i + 1) / sectors) * Math.PI * 2 + t * (i % 2 === 0 ? 0.15 : -0.15);
          const hue = (hueBase + i * (360 / sectors)) % 360;
          // outer band
          ctx.save();
          ctx.translate(cx, cy);
          for (let band = 4; band >= 0; band--) {
            const r1 = R * (band / 5);
            const r2 = R * ((band + 1) / 5);
            const bHue = (hue + band * 18) % 360;
            ctx.fillStyle = `hsla(${bHue},75%,${35 + band * 5}%,0.7)`;
            ctx.beginPath();
            ctx.moveTo(Math.cos(a1) * r1, Math.sin(a1) * r1);
            ctx.arc(0, 0, r2, a1, a2);
            ctx.arc(0, 0, r1, a2, a1, true);
            ctx.closePath();
            ctx.fill();
          }
          // dark separators
          ctx.strokeStyle = `rgba(0,0,0,0.5)`;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(Math.cos(a1) * R, Math.sin(a1) * R);
          ctx.stroke();
          ctx.restore();
        }
        // center circle
        ctx.save();
        ctx.translate(cx, cy);
        const gCenter = ctx.createRadialGradient(0, 0, 0, 0, 0, R * 0.12);
        gCenter.addColorStop(0, `hsla(${hueBase},60%,90%,0.9)`);
        gCenter.addColorStop(1, `hsla(${hueBase},60%,50%,0)`);
        ctx.fillStyle = gCenter;
        ctx.beginPath();
        ctx.arc(0, 0, R * 0.12, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },

  {
    name: "Diamond Dust",
    tags: ["kaleidoscope", "particles", "sparkle"],
    description: "Tiny glittering facets scatter and converge in 8-fold symmetry",
    code: `// Spawn at angle, mirror across 8 axes
for (let s = 0; s < 8; s++) {
  ctx.save();
  ctx.rotate((s / 8) * Math.PI * 2);
  if (s % 2) ctx.scale(1, -1);
  drawParticle(p.x, p.y, p.size, p.alpha);
  ctx.restore();
}`,
    animator: (c, ctx, mouse) => {
      let particles = [], t = 0, id;
      const cx = c.width / 2, cy = c.height / 2;
      const N = 8;
      const loop = () => {
        t += 0.02;
        ctx.fillStyle = "rgba(0,6,12,0.22)";
        ctx.fillRect(0, 0, c.width, c.height);
        if (particles.length < 60) {
          const angle = Math.random() * Math.PI / N;
          const dist = Math.random() * Math.min(cx, cy) * 0.8;
          particles.push({
            x: Math.cos(angle) * dist, y: Math.sin(angle) * dist,
            vx: (Math.random() - 0.5) * 1.2, vy: (Math.random() - 0.5) * 1.2,
            size: Math.random() * 4 + 1.5, alpha: Math.random() * 0.8 + 0.2,
            hue: Math.random() * 60 + 170, life: 1
          });
        }
        particles.forEach((p, i) => {
          p.x += p.vx; p.y += p.vy; p.vx *= 0.98; p.vy *= 0.98;
          p.life -= 0.008; p.alpha = p.life;
          if (p.life <= 0) { particles.splice(i, 1); return; }
          for (let s = 0; s < N; s++) {
            ctx.save();
            ctx.translate(cx, cy);
            ctx.rotate((s / N) * Math.PI * 2);
            if (s % 2) ctx.scale(1, -1);
            const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2.5);
            g.addColorStop(0, `hsla(${p.hue},90%,90%,${p.alpha})`);
            g.addColorStop(0.4, `hsla(${p.hue},80%,65%,${p.alpha * 0.6})`);
            g.addColorStop(1, `hsla(${p.hue},70%,50%,0)`);
            ctx.fillStyle = g;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size * 2.5, 0, Math.PI * 2);
            ctx.fill();
            // diamond facet lines
            ctx.strokeStyle = `hsla(${p.hue},100%,95%,${p.alpha * 0.8})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(p.x - p.size, p.y); ctx.lineTo(p.x, p.y - p.size);
            ctx.lineTo(p.x + p.size, p.y); ctx.lineTo(p.x, p.y + p.size);
            ctx.closePath(); ctx.stroke();
            ctx.restore();
          }
        });
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  }

];
