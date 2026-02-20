// ─────────────────────────────────────────────────
//  PRISM · LIGHT REFRACTION EFFECTS
// ─────────────────────────────────────────────────

export const prismEffects = [

  {
    name: "Rainbow Dispersion",
    tags: ["prism", "light", "rainbow"],
    description: "White light enters a prism and fans out into the full visible spectrum",
    code: `// Split white ray into spectral wavelengths
const spectrum = ['#ff0000','#ff7700','#ffff00','#00ff00','#0000ff','#8b00ff'];
spectrum.forEach((col, i) => {
  const angle = baseAngle + (i - 2.5) * spread;
  drawRay(prismTip, angle, col, length);
});`,
    animator: (c, ctx, mouse) => {
      let t = 0, id;
      const loop = () => {
        t += 0.012;
        ctx.fillStyle = "rgba(2,4,8,0.2)";
        ctx.fillRect(0, 0, c.width, c.height);
        const px = c.width * 0.3, py = mouse.y || c.height / 2;
        // incoming white beam
        ctx.save();
        ctx.globalCompositeOperation = "screen";
        const beam = ctx.createLinearGradient(0, py, px, py);
        beam.addColorStop(0, "rgba(255,255,255,0)");
        beam.addColorStop(0.7, "rgba(255,255,255,0.15)");
        beam.addColorStop(1, "rgba(255,255,255,0.7)");
        ctx.fillStyle = beam;
        ctx.fillRect(0, py - 8, px, 16);
        // prism triangle
        ctx.globalCompositeOperation = "source-over";
        ctx.strokeStyle = "rgba(180,220,255,0.6)";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(px, py - 80);
        ctx.lineTo(px + 70, py + 40);
        ctx.lineTo(px - 70, py + 40);
        ctx.closePath();
        ctx.stroke();
        ctx.fillStyle = "rgba(150,200,255,0.06)";
        ctx.fill();
        // spectral rays
        ctx.globalCompositeOperation = "screen";
        const colors = [
          { hue: 0,   label: "700nm" },
          { hue: 20,  label: "620nm" },
          { hue: 45,  label: "580nm" },
          { hue: 120, label: "530nm" },
          { hue: 200, label: "470nm" },
          { hue: 260, label: "430nm" },
          { hue: 290, label: "380nm" }
        ];
        colors.forEach((col, i) => {
          const spread = 0.22;
          const baseAngle = 0.08;
          const angle = baseAngle + (i - 3) * spread + Math.sin(t * 0.5) * 0.02;
          const len = c.width * 0.65;
          const ex = px + Math.cos(angle) * len;
          const ey = py + Math.sin(angle) * len;
          const g = ctx.createLinearGradient(px, py, ex, ey);
          g.addColorStop(0, `hsla(${col.hue},100%,60%,0.8)`);
          g.addColorStop(1, `hsla(${col.hue},100%,60%,0)`);
          ctx.strokeStyle = g;
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.moveTo(px, py);
          ctx.lineTo(ex, ey);
          ctx.stroke();
        });
        ctx.globalCompositeOperation = "source-over";
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },

  {
    name: "Crystal Caustics",
    tags: ["prism", "caustic", "water"],
    description: "Caustic light patterns cast through a crystalline surface onto a surface below",
    code: `// Voronoi-derived caustic patches animated with noise
const field = sin(x*0.04+t) * cos(y*0.04-t*1.3) + sin((x+y)*0.03+t*0.7);
const caustic = smoothstep(0.4, 0.7, field);
ctx.fillStyle = \`rgba(200,240,255,\${caustic * 0.3})\`;`,
    animator: (c, ctx, mouse) => {
      let t = 0, id;
      const loop = () => {
        t += 0.025;
        ctx.fillStyle = "rgba(0,10,20,0.25)";
        ctx.fillRect(0, 0, c.width, c.height);
        ctx.globalCompositeOperation = "screen";
        const step = 12;
        const mx = (mouse.x / c.width - 0.5) * 2;
        for (let x = 0; x < c.width; x += step) {
          for (let y = 0; y < c.height; y += step) {
            const nx = x / c.width * 8 + mx;
            const ny = y / c.height * 8;
            const field =
              Math.sin(nx + t) * Math.cos(ny - t * 1.2) +
              Math.sin((nx + ny) * 0.7 + t * 0.8) * 0.6;
            const caustic = Math.max(0, (field - 0.3) / 0.7);
            if (caustic > 0.05) {
              const hue = 170 + caustic * 60;
              ctx.fillStyle = `hsla(${hue},80%,80%,${caustic * 0.4})`;
              ctx.fillRect(x, y, step, step);
            }
          }
        }
        ctx.globalCompositeOperation = "source-over";
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },

  {
    name: "Glass Shatter",
    tags: ["prism", "glass", "fracture"],
    description: "Pane of glass cracks outward from cursor with each shard refracting rainbow light",
    code: `// Voronoi shards + per-shard hue from face normal
shards.forEach(s => {
  const angle = atan2(s.cy - origin.y, s.cx - origin.x);
  const hue = (angle / PI * 180 + 180) % 360;
  ctx.fillStyle = \`hsla(\${hue}, 70%, 55%, 0.4)\`;
  drawPoly(s.vertices);
});`,
    animator: (c, ctx, mouse) => {
      let shards = [], t = 0, id, cracked = false;
      const crack = (ox, oy) => {
        shards = [];
        const N = 22;
        const seeds = Array.from({ length: N }, () => ({
          x: ox + (Math.random() - 0.5) * c.width * 0.8,
          y: oy + (Math.random() - 0.5) * c.height * 0.8
        }));
        seeds.forEach((s, i) => {
          const angle = Math.atan2(s.y - oy, s.x - ox);
          const dist = Math.hypot(s.x - ox, s.y - oy);
          shards.push({
            cx: s.x, cy: s.y,
            angle, dist,
            hue: (angle / Math.PI * 180 + 180) % 360,
            size: Math.random() * 60 + 30,
            vx: Math.cos(angle) * (2 + Math.random() * 3),
            vy: Math.sin(angle) * (2 + Math.random() * 3),
            rot: 0, rotV: (Math.random() - 0.5) * 0.08,
            alpha: 0.85
          });
        });
        cracked = true;
      };
      crack(c.width / 2, c.height / 2);
      const loop = () => {
        t += 0.016;
        ctx.fillStyle = "rgba(2,8,14,0.18)";
        ctx.fillRect(0, 0, c.width, c.height);
        if (cracked) {
          shards.forEach(s => {
            s.cx += s.vx; s.cy += s.vy;
            s.vx *= 0.97; s.vy *= 0.97;
            s.vy += 0.06;
            s.rot += s.rotV; s.alpha -= 0.003;
            if (s.alpha <= 0) return;
            ctx.save();
            ctx.translate(s.cx, s.cy);
            ctx.rotate(s.rot);
            const pts = 5;
            ctx.beginPath();
            for (let k = 0; k < pts; k++) {
              const a = (k / pts) * Math.PI * 2 + s.rot;
              const r = s.size * (0.5 + Math.random() * 0.5);
              k === 0 ? ctx.moveTo(Math.cos(a) * r, Math.sin(a) * r)
                       : ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r);
            }
            ctx.closePath();
            ctx.fillStyle = `hsla(${s.hue},60%,55%,${s.alpha * 0.35})`;
            ctx.fill();
            ctx.strokeStyle = `hsla(${s.hue},80%,80%,${s.alpha * 0.9})`;
            ctx.lineWidth = 1;
            ctx.stroke();
            ctx.restore();
          });
          if (shards.every(s => s.alpha <= 0)) {
            cracked = false;
            setTimeout(() => crack(mouse.x || c.width / 2, mouse.y || c.height / 2), 600);
          }
        }
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },

  {
    name: "Laser Lens",
    tags: ["prism", "laser", "scifi"],
    description: "Coherent laser beams bend through a convex lens, converging at a focal point",
    code: `// Snell's-law-approximated refraction toward focal point
const refracted = lerp(incoming, toFocus, lensStrength);
drawBeam(entry, focal, color, width);`,
    animator: (c, ctx, mouse) => {
      let t = 0, id;
      const loop = () => {
        t += 0.018;
        ctx.fillStyle = "rgba(0,5,12,0.22)";
        ctx.fillRect(0, 0, c.width, c.height);
        const lensX = c.width * 0.45;
        const focalX = mouse.x;
        const focalY = mouse.y;
        const N = 14;
        ctx.globalCompositeOperation = "screen";
        for (let i = 0; i < N; i++) {
          const startY = (c.height * 0.1) + (i / (N - 1)) * c.height * 0.8;
          const hue = (i / N) * 280 + t * 20;
          // incoming ray
          const g1 = ctx.createLinearGradient(0, startY, lensX, startY);
          g1.addColorStop(0, `hsla(${hue},100%,60%,0)`);
          g1.addColorStop(1, `hsla(${hue},100%,60%,0.7)`);
          ctx.strokeStyle = g1; ctx.lineWidth = 1.5;
          ctx.beginPath(); ctx.moveTo(0, startY); ctx.lineTo(lensX, startY); ctx.stroke();
          // refracted ray to focal point
          const g2 = ctx.createLinearGradient(lensX, startY, focalX, focalY);
          g2.addColorStop(0, `hsla(${hue},100%,60%,0.7)`);
          g2.addColorStop(1, `hsla(${hue},100%,70%,0)`);
          ctx.strokeStyle = g2; ctx.lineWidth = 1.5;
          ctx.beginPath(); ctx.moveTo(lensX, startY); ctx.lineTo(focalX, focalY); ctx.stroke();
        }
        // lens shape
        ctx.globalCompositeOperation = "source-over";
        ctx.strokeStyle = "rgba(160,220,255,0.5)";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.ellipse(lensX, c.height / 2, 10, c.height * 0.42, 0, 0, Math.PI * 2);
        ctx.stroke();
        // focal glow
        ctx.globalCompositeOperation = "screen";
        const fg = ctx.createRadialGradient(focalX, focalY, 0, focalX, focalY, 40);
        fg.addColorStop(0, "rgba(255,255,255,0.9)");
        fg.addColorStop(0.3, "rgba(200,240,255,0.4)");
        fg.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = fg;
        ctx.beginPath(); ctx.arc(focalX, focalY, 40, 0, Math.PI * 2); ctx.fill();
        ctx.globalCompositeOperation = "source-over";
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },

  {
    name: "Spectral Bloom",
    tags: ["prism", "bloom", "color"],
    description: "Overlapping rings of pure spectral color bloom outward with additive glow",
    code: `// Additive screen-mode concentric spectral rings
spectrum.forEach((hue, i) => {
  const r = baseR + i * ringGap + sin(t + i) * 15;
  ctx.strokeStyle = \`hsla(\${hue},100%,60%,0.4)\`;
  ctx.arc(cx, cy, r, 0, PI*2);
});`,
    animator: (c, ctx, mouse) => {
      let t = 0, id;
      const cx = c.width / 2, cy = c.height / 2;
      const hues = [0, 30, 60, 120, 180, 240, 280, 320];
      const loop = () => {
        t += 0.014;
        ctx.fillStyle = "rgba(0,4,10,0.2)";
        ctx.fillRect(0, 0, c.width, c.height);
        ctx.globalCompositeOperation = "screen";
        const dx = mouse.x - cx, dy = mouse.y - cy;
        hues.forEach((hue, i) => {
          const offset = Math.sin(t * 0.8 + i * 0.6) * 20;
          const r = 50 + i * 30 + offset + (t * 12 % 240);
          if (r > Math.max(c.width, c.height)) return;
          ctx.strokeStyle = `hsla(${hue + t * 15},100%,65%,${0.5 - r / (Math.max(c.width, c.height))})`;
          ctx.lineWidth = 2.5;
          ctx.beginPath();
          ctx.arc(cx + dx * 0.05, cy + dy * 0.05, r, 0, Math.PI * 2);
          ctx.stroke();
        });
        ctx.globalCompositeOperation = "source-over";
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },

  {
    name: "Aurora Veil",
    tags: ["prism", "aurora", "atmospheric"],
    description: "Soft curtains of prismatic aurora light ripple and fold across the sky",
    code: `// Vertical sine-distorted gradient bands
for (let x = 0; x < width; x++) {
  const wave = sin(x*0.02 + t) * 40 + sin(x*0.007 - t*0.5) * 60;
  const g = createLinearGradient(x, top+wave, x, bottom);
  g.addColorStop(0, hsl(hue+x*0.05, 80%, 60%, 0.6));
  g.addColorStop(1, transparent);
}`,
    animator: (c, ctx, mouse) => {
      let t = 0, id;
      const loop = () => {
        t += 0.008;
        ctx.fillStyle = "rgba(0,4,12,0.18)";
        ctx.fillRect(0, 0, c.width, c.height);
        ctx.globalCompositeOperation = "screen";
        const bands = 3;
        const mx = mouse.x / c.width;
        for (let b = 0; b < bands; b++) {
          const hueBase = (b * 100 + t * 20 + mx * 80) % 360;
          const step = 4;
          for (let x = 0; x <= c.width; x += step) {
            const wave1 = Math.sin(x * 0.018 + t + b * 1.5) * 55;
            const wave2 = Math.sin(x * 0.008 - t * 0.6 + b) * 80;
            const top = c.height * 0.1 + wave1 + wave2 + b * c.height * 0.1;
            const bottom = top + 200 + Math.sin(x * 0.012 + t * 0.4) * 60;
            const hue = hueBase + x * 0.04;
            const g = ctx.createLinearGradient(x, top, x, bottom);
            g.addColorStop(0, `hsla(${hue},90%,65%,0)`);
            g.addColorStop(0.2, `hsla(${hue},90%,65%,0.55)`);
            g.addColorStop(0.7, `hsla(${hue + 40},80%,55%,0.3)`);
            g.addColorStop(1, `hsla(${hue + 80},70%,45%,0)`);
            ctx.fillStyle = g;
            ctx.fillRect(x, top, step, bottom - top);
          }
        }
        ctx.globalCompositeOperation = "source-over";
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  }

];
