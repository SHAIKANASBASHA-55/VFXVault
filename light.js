// ─────────────────────────────────────────────────
//  LIGHT · RAYS, FLARES & VOLUMETRIC EFFECTS
// ─────────────────────────────────────────────────

export const lightEffects = [

  {
    name: "God Rays",
    tags: ["light", "rays", "volumetric"],
    description: "Crepuscular rays burst from behind clouds, scattering through atmospheric haze",
    code: `// Radial gradient rays from a single light source
for (let i = 0; i < RAY_COUNT; i++) {
  const angle = (i / RAY_COUNT) * PI * 2 + t * 0.1;
  const g = createLinearGradient(src.x, src.y, endX, endY);
  g.addColorStop(0, \`rgba(255,240,200,\${intensity})\`);
  g.addColorStop(1, \`rgba(255,240,200,0)\`);
}`,
    animator: (c, ctx, mouse) => {
      let t = 0, id;
      const loop = () => {
        t += 0.01;
        ctx.fillStyle = "rgba(2,6,14,0.2)";
        ctx.fillRect(0, 0, c.width, c.height);
        const sx = mouse.x, sy = mouse.y;
        const RAYS = 24;
        ctx.globalCompositeOperation = "screen";
        for (let i = 0; i < RAYS; i++) {
          const angle = (i / RAYS) * Math.PI * 2 + t * 0.08;
          const noise = Math.sin(i * 2.4 + t * 1.5) * 0.15;
          const len = (Math.min(c.width, c.height) * 0.9) * (0.7 + noise);
          const ex = sx + Math.cos(angle) * len, ey = sy + Math.sin(angle) * len;
          const width = 18 + Math.sin(i + t * 2) * 10;
          const alpha = 0.06 + Math.sin(i * 1.7 + t) * 0.025;
          const g = ctx.createLinearGradient(sx, sy, ex, ey);
          g.addColorStop(0, `rgba(255,240,190,${alpha * 6})`);
          g.addColorStop(0.3, `rgba(255,230,160,${alpha * 2})`);
          g.addColorStop(1, `rgba(255,220,140,0)`);
          const perp = angle + Math.PI / 2;
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.moveTo(sx + Math.cos(perp) * 2, sy + Math.sin(perp) * 2);
          ctx.lineTo(ex + Math.cos(perp) * width, ey + Math.sin(perp) * width);
          ctx.lineTo(ex - Math.cos(perp) * width, ey - Math.sin(perp) * width);
          ctx.lineTo(sx - Math.cos(perp) * 2, sy - Math.sin(perp) * 2);
          ctx.closePath(); ctx.fill();
        }
        // source glow
        const sg = ctx.createRadialGradient(sx, sy, 0, sx, sy, 80);
        sg.addColorStop(0, "rgba(255,250,210,0.95)");
        sg.addColorStop(0.2, "rgba(255,230,150,0.4)");
        sg.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = sg; ctx.beginPath(); ctx.arc(sx, sy, 80, 0, Math.PI * 2); ctx.fill();
        ctx.globalCompositeOperation = "source-over";
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },

  {
    name: "Lens Flare",
    tags: ["light", "flare", "cinematic"],
    description: "Cinematic lens flares streak across the frame from a bright point source",
    code: `// Artifacts along the axis from light to screen center
artifacts.forEach(a => {
  const t = a.offset; // 0..1 along the axis
  const ax = lerp(light.x, cx*2 - light.x, t);
  const ay = lerp(light.y, cy*2 - light.y, t);
  drawFlareElement(ax, ay, a.size, a.type, a.hue);
});`,
    animator: (c, ctx, mouse) => {
      let t = 0, id;
      const cx = c.width / 2, cy = c.height / 2;
      const loop = () => {
        t += 0.012;
        ctx.fillStyle = "rgba(0,4,10,0.22)";
        ctx.fillRect(0, 0, c.width, c.height);
        ctx.globalCompositeOperation = "screen";
        const lx = mouse.x, ly = mouse.y;
        const ax = cx * 2 - lx, ay = cy * 2 - ly; // anti-point
        const artifacts = [
          { t: 0.0, size: 90, type: "glow", hue: 50 },
          { t: 0.3, size: 18, type: "circle", hue: 200 },
          { t: 0.5, size: 30, type: "hex", hue: 180 },
          { t: 0.65, size: 12, type: "circle", hue: 280 },
          { t: 0.8, size: 45, type: "glow", hue: 160 },
          { t: 1.0, size: 22, type: "hex", hue: 60 },
          { t: 1.2, size: 8, type: "circle", hue: 200 }
        ];
        // streak
        const streakG = ctx.createLinearGradient(lx, ly, ax, ay);
        streakG.addColorStop(0, "rgba(255,250,220,0.6)");
        streakG.addColorStop(0.5, "rgba(255,240,180,0.1)");
        streakG.addColorStop(1, "rgba(0,0,0,0)");
        ctx.strokeStyle = streakG; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(lx, ly); ctx.lineTo(ax, ay); ctx.stroke();
        artifacts.forEach(a => {
          const px = lx + (ax - lx) * a.t, py = ly + (ay - ly) * a.t;
          const flicker = 0.7 + Math.sin(t * 8 + a.t * 10) * 0.3;
          if (a.type === "glow") {
            const g = ctx.createRadialGradient(px, py, 0, px, py, a.size);
            g.addColorStop(0, `hsla(${a.hue},80%,85%,${0.6 * flicker})`);
            g.addColorStop(1, "rgba(0,0,0,0)");
            ctx.fillStyle = g; ctx.beginPath(); ctx.arc(px, py, a.size, 0, Math.PI * 2); ctx.fill();
          } else if (a.type === "circle") {
            ctx.strokeStyle = `hsla(${a.hue},70%,70%,${0.5 * flicker})`;
            ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(px, py, a.size, 0, Math.PI * 2); ctx.stroke();
          } else {
            ctx.strokeStyle = `hsla(${a.hue},70%,65%,${0.45 * flicker})`;
            ctx.lineWidth = 1; ctx.beginPath();
            for (let k = 0; k < 6; k++) {
              const ang = (k / 6) * Math.PI * 2 + t * 0.2;
              k === 0 ? ctx.moveTo(px + Math.cos(ang) * a.size, py + Math.sin(ang) * a.size)
                       : ctx.lineTo(px + Math.cos(ang) * a.size, py + Math.sin(ang) * a.size);
            }
            ctx.closePath(); ctx.stroke();
          }
        });
        ctx.globalCompositeOperation = "source-over";
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },

  {
    name: "Bioluminescence",
    tags: ["light", "ocean", "organic"],
    description: "Deep sea creatures glow with soft blue-green bioluminescent light in the darkness",
    code: `// Organic pulse with sine breathing + neighbor influence
orb.brightness = sin(t * orb.freq + orb.phase) ** 2;
// nearby orbs sync their phase slowly
neighbors.forEach(n => orb.phase += 0.001 * sin(n.phase - orb.phase));`,
    animator: (c, ctx, mouse) => {
      let orbs = [], t = 0, id;
      const N = 45;
      for (let i = 0; i < N; i++) orbs.push({
        x: Math.random() * c.width, y: Math.random() * c.height,
        vx: (Math.random() - 0.5) * 0.5, vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 18 + 8,
        phase: Math.random() * Math.PI * 2,
        freq: Math.random() * 0.03 + 0.015,
        hue: 160 + Math.random() * 60
      });
      const loop = () => {
        t += 0.016;
        ctx.fillStyle = "rgba(0,3,8,0.18)";
        ctx.fillRect(0, 0, c.width, c.height);
        ctx.globalCompositeOperation = "screen";
        orbs.forEach(o => {
          o.phase += o.freq;
          o.vx += (Math.random() - 0.5) * 0.06; o.vy += (Math.random() - 0.5) * 0.04;
          o.vx *= 0.98; o.vy *= 0.98;
          o.x += o.vx; o.y += o.vy;
          if (o.x < 0) o.x = c.width; if (o.x > c.width) o.x = 0;
          if (o.y < 0) o.y = c.height; if (o.y > c.height) o.y = 0;
          // cursor proximity brightens
          const md = Math.hypot(mouse.x - o.x, mouse.y - o.y);
          const boost = md < 120 ? (1 - md / 120) * 0.8 : 0;
          const bright = Math.pow(Math.max(0, Math.sin(o.phase)), 2) + boost;
          if (bright < 0.03) return;
          const g = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, o.r * (1.5 + bright));
          g.addColorStop(0, `hsla(${o.hue},100%,90%,${bright * 0.95})`);
          g.addColorStop(0.4, `hsla(${o.hue},90%,60%,${bright * 0.5})`);
          g.addColorStop(1, `hsla(${o.hue},80%,40%,0)`);
          ctx.fillStyle = g;
          ctx.beginPath(); ctx.arc(o.x, o.y, o.r * (1.5 + bright), 0, Math.PI * 2); ctx.fill();
        });
        ctx.globalCompositeOperation = "source-over";
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },

  {
    name: "Neon Halo",
    tags: ["light", "neon", "glow"],
    description: "Layered neon rings pulse and breathe with electric glow around the cursor",
    code: `// Multiple concentric glowing rings with phase-offset pulses
rings.forEach((ring, i) => {
  const pulse = sin(t * ring.freq + i * 0.8) * 0.5 + 0.5;
  ctx.shadowBlur = 20 + pulse * 30;
  ctx.shadowColor = ring.color;
  ctx.strokeStyle = ring.color;
  ctx.arc(cx, cy, ring.r * (0.9 + pulse * 0.15), 0, PI*2);
});`,
    animator: (c, ctx, mouse) => {
      let t = 0, id;
      const rings = [
        { r: 30, hue: 180, freq: 1.2 },
        { r: 55, hue: 200, freq: 0.9 },
        { r: 80, hue: 220, freq: 1.5 },
        { r: 110, hue: 260, freq: 0.7 },
        { r: 145, hue: 300, freq: 1.1 }
      ];
      const loop = () => {
        t += 0.018;
        ctx.fillStyle = "rgba(2,4,12,0.22)";
        ctx.fillRect(0, 0, c.width, c.height);
        ctx.globalCompositeOperation = "screen";
        rings.forEach((ring, i) => {
          const pulse = Math.sin(t * ring.freq + i * 0.8) * 0.5 + 0.5;
          const alpha = 0.4 + pulse * 0.5;
          const r = ring.r * (0.92 + pulse * 0.12);
          ctx.shadowBlur = 15 + pulse * 25;
          ctx.shadowColor = `hsla(${ring.hue},100%,60%,1)`;
          ctx.strokeStyle = `hsla(${ring.hue + t * 10},100%,65%,${alpha})`;
          ctx.lineWidth = 1.5 + pulse * 2;
          ctx.beginPath(); ctx.arc(mouse.x, mouse.y, r, 0, Math.PI * 2); ctx.stroke();
        });
        ctx.shadowBlur = 0;
        // core
        const cg = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 25);
        cg.addColorStop(0, "rgba(255,255,255,0.9)");
        cg.addColorStop(0.4, "rgba(160,220,255,0.4)");
        cg.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = cg; ctx.beginPath(); ctx.arc(mouse.x, mouse.y, 25, 0, Math.PI * 2); ctx.fill();
        ctx.globalCompositeOperation = "source-over";
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },

  {
    name: "Spotlight Stage",
    tags: ["light", "spotlight", "dramatic"],
    description: "A dramatic spotlight cone follows the cursor, casting sharp edges in deep shadow",
    code: `// Clipped cone with soft volumetric interior
ctx.globalCompositeOperation = 'source-over';
// shadow overlay
ctx.fillStyle = 'rgba(0,0,0,0.85)';
ctx.fillRect(0,0,W,H);
// punch out cone with compositing
ctx.globalCompositeOperation = 'destination-out';
ctx.fillStyle = spotGradient; // radial from apex
ctx.beginPath(); ctx.moveTo(apex.x, apex.y);
ctx.lineTo(left.x, left.y); ctx.lineTo(right.x, right.y);
ctx.fill();`,
    animator: (c, ctx, mouse) => {
      let t = 0, id;
      const loop = () => {
        t += 0.01;
        ctx.fillStyle = "rgba(2,4,10,0.25)";
        ctx.fillRect(0, 0, c.width, c.height);
        const apex = { x: mouse.x + Math.sin(t * 0.3) * 10, y: 0 };
        const spread = 0.35 + Math.sin(t * 0.5) * 0.08;
        const len = c.height * 1.1;
        const lx = apex.x - Math.tan(spread) * len;
        const rx = apex.x + Math.tan(spread) * len;
        // volumetric interior
        ctx.globalCompositeOperation = "screen";
        const vg = ctx.createLinearGradient(apex.x, apex.y, apex.x, apex.y + len);
        vg.addColorStop(0, "rgba(255,240,200,0.5)");
        vg.addColorStop(0.4, "rgba(255,230,170,0.12)");
        vg.addColorStop(1, "rgba(255,220,150,0)");
        ctx.fillStyle = vg;
        ctx.beginPath(); ctx.moveTo(apex.x, apex.y); ctx.lineTo(lx, apex.y + len); ctx.lineTo(rx, apex.y + len); ctx.closePath(); ctx.fill();
        // source glow
        const sg = ctx.createRadialGradient(apex.x, apex.y, 0, apex.x, apex.y, 60);
        sg.addColorStop(0, "rgba(255,250,220,0.9)");
        sg.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = sg; ctx.beginPath(); ctx.arc(apex.x, apex.y, 60, 0, Math.PI * 2); ctx.fill();
        ctx.globalCompositeOperation = "source-over";
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },

  {
    name: "Particle Photons",
    tags: ["light", "particles", "quantum"],
    description: "Individual photon particles stream from a source, diffracting and interfering",
    code: `// Double-slit interference probability wave
const prob = cos(kx * (p.x - slit1) / wavelength) ** 2
           + cos(kx * (p.x - slit2) / wavelength) ** 2;
p.alpha = prob * decay;`,
    animator: (c, ctx, mouse) => {
      let photons = [], t = 0, id;
      const loop = () => {
        t += 0.018;
        ctx.fillStyle = "rgba(0,4,8,0.18)";
        ctx.fillRect(0, 0, c.width, c.height);
        if (photons.length < 250) {
          for (let i = 0; i < 3; i++) {
            const angle = (Math.random() - 0.5) * 0.6;
            photons.push({
              x: mouse.x, y: mouse.y,
              vx: Math.cos(angle) * (Math.random() * 3 + 2),
              vy: Math.sin(angle) * (Math.random() * 3 + 2),
              alpha: 0.9, hue: 50 + Math.random() * 40, size: Math.random() * 1.5 + 0.5
            });
          }
        }
        ctx.globalCompositeOperation = "screen";
        photons.forEach((p, i) => {
          p.x += p.vx; p.y += p.vy;
          p.alpha -= 0.007;
          if (p.alpha <= 0 || p.x < 0 || p.x > c.width || p.y < 0 || p.y > c.height) { photons.splice(i, 1); return; }
          const trail = 5;
          for (let j = 0; j < trail; j++) {
            const tx = p.x - p.vx * j * 0.6, ty = p.y - p.vy * j * 0.6;
            const ta = p.alpha * (1 - j / trail);
            ctx.fillStyle = `hsla(${p.hue},100%,85%,${ta})`;
            ctx.beginPath(); ctx.arc(tx, ty, p.size * (1 - j / trail / 2), 0, Math.PI * 2); ctx.fill();
          }
        });
        ctx.globalCompositeOperation = "source-over";
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  }

];
