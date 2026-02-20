// ─────────────────────────────────────────────────
//  EXPLOSION · BLAST & DESTRUCTION EFFECTS
// ─────────────────────────────────────────────────

export const explosionEffects = [

  {
    name: "Shockwave Blast",
    tags: ["explosion", "shockwave", "impact"],
    description: "A concussive shockwave ring expands outward from the cursor on click, distorting everything in its path",
    code: `// Expanding ring with inverse-square falloff opacity
wave.r += wave.speed;
wave.speed *= 0.97; // decelerate
const alpha = (1 - wave.r / wave.maxR) ** 2;
ctx.strokeStyle = \`rgba(255,230,180,\${alpha})\`;
ctx.lineWidth = 8 * (1 - wave.r / wave.maxR);`,
    animator: (c, ctx, mouse) => {
      let waves = [], debris = [], t = 0, id;
      const blast = (x, y) => {
        waves.push({ x, y, r: 5, maxR: Math.min(c.width, c.height) * 0.7, speed: 14 });
        for (let i = 0; i < 80; i++) {
          const angle = Math.random() * Math.PI * 2;
          const spd = Math.random() * 12 + 3;
          debris.push({
            x, y, vx: Math.cos(angle) * spd, vy: Math.sin(angle) * spd - 4,
            r: Math.random() * 4 + 1, alpha: 1,
            hue: Math.random() > 0.5 ? 30 + Math.random() * 20 : 0,
            sat: Math.random() > 0.5 ? 80 : 0
          });
        }
      };
      blast(c.width / 2, c.height / 2);
      const iv = setInterval(() => blast(mouse.x, mouse.y), 2200);
      const loop = () => {
        t += 0.018;
        ctx.fillStyle = "rgba(2,4,8,0.2)";
        ctx.fillRect(0, 0, c.width, c.height);
        // shockwaves
        waves.forEach((w, i) => {
          w.r += w.speed; w.speed *= 0.965;
          const prog = w.r / w.maxR;
          const alpha = (1 - prog) ** 2;
          if (alpha < 0.01) { waves.splice(i, 1); return; }
          ctx.globalCompositeOperation = "screen";
          ctx.strokeStyle = `rgba(255,200,100,${alpha * 0.8})`;
          ctx.lineWidth = 12 * (1 - prog) + 1;
          ctx.beginPath(); ctx.arc(w.x, w.y, w.r, 0, Math.PI * 2); ctx.stroke();
          // inner glow ring
          ctx.strokeStyle = `rgba(255,255,220,${alpha * 0.4})`;
          ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(w.x, w.y, w.r * 0.85, 0, Math.PI * 2); ctx.stroke();
          ctx.globalCompositeOperation = "source-over";
        });
        // debris
        debris.forEach((d, i) => {
          d.vx *= 0.97; d.vy += 0.3; d.vy *= 0.98;
          d.x += d.vx; d.y += d.vy; d.alpha -= 0.014;
          if (d.alpha <= 0) { debris.splice(i, 1); return; }
          ctx.fillStyle = `hsla(${d.hue},${d.sat}%,65%,${d.alpha})`;
          ctx.beginPath(); ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2); ctx.fill();
        });
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => { clearInterval(iv); cancelAnimationFrame(id); } };
    }
  },

  {
    name: "Fire Burst",
    tags: ["explosion", "fire", "elemental"],
    description: "A roiling fireball erupts and expands, trailing smoke and embers into the sky",
    code: `// Fire particles with rising buoyancy + radial velocity decay
p.vy -= 0.15 + random() * 0.1;  // buoyancy
p.vx *= 0.97;
p.life -= 0.012;
const hue = lerp(0, 45, 1 - p.life);  // red → orange → yellow`,
    animator: (c, ctx, mouse) => {
      let particles = [], t = 0, id;
      const burst = (x, y) => {
        for (let i = 0; i < 120; i++) {
          const angle = Math.random() * Math.PI * 2;
          const spd = Math.random() * 8 + 1;
          particles.push({
            x, y, vx: Math.cos(angle) * spd, vy: Math.sin(angle) * spd - 3,
            life: 1, size: Math.random() * 12 + 4, type: Math.random() > 0.25 ? 'fire' : 'smoke'
          });
        }
      };
      burst(c.width / 2, c.height / 2);
      const iv = setInterval(() => burst(mouse.x, mouse.y), 2000);
      const loop = () => {
        t += 0.018;
        ctx.fillStyle = "rgba(4,2,0,0.18)";
        ctx.fillRect(0, 0, c.width, c.height);
        ctx.globalCompositeOperation = "screen";
        particles.forEach((p, i) => {
          p.vy -= 0.12 + Math.random() * 0.08;
          p.vx += (Math.random() - 0.5) * 0.3;
          p.vx *= 0.97; p.vy *= 0.98;
          p.x += p.vx; p.y += p.vy;
          p.life -= p.type === 'fire' ? 0.015 : 0.008;
          p.size += p.type === 'smoke' ? 0.5 : -0.05;
          if (p.life <= 0) { particles.splice(i, 1); return; }
          if (p.type === 'fire') {
            const hue = p.life > 0.6 ? 0 + (1 - p.life) * 60 : 30 + (0.6 - p.life) * 50;
            const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
            g.addColorStop(0, `hsla(${hue + 20},100%,85%,${p.life})`);
            g.addColorStop(0.5, `hsla(${hue},100%,55%,${p.life * 0.7})`);
            g.addColorStop(1, `hsla(${hue - 10},90%,30%,0)`);
            ctx.fillStyle = g;
          } else {
            ctx.fillStyle = `rgba(80,70,60,${p.life * 0.3})`;
          }
          ctx.beginPath(); ctx.arc(p.x, p.y, Math.max(0.5, p.size), 0, Math.PI * 2); ctx.fill();
        });
        ctx.globalCompositeOperation = "source-over";
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => { clearInterval(iv); cancelAnimationFrame(id); } };
    }
  },

  {
    name: "Plasma Cannon",
    tags: ["explosion", "scifi", "energy"],
    description: "Supercharged plasma bolts streak across the screen and detonate in crackling energy bursts",
    code: `// Bolt travel + detonation arc discharge
bolt.x += bolt.vx; bolt.y += bolt.vy;
if (reachedTarget(bolt)) {
  spawnArc(bolt.pos, numArcs);  // radial lightning arcs
  spawnFlash(bolt.pos);          // bloom flash
}`,
    animator: (c, ctx, mouse) => {
      let bolts = [], arcs = [], flashes = [], t = 0, id;
      const fire = () => {
        const fromX = Math.random() * c.width, fromY = Math.random() < 0.5 ? 0 : c.height;
        bolts.push({ x: fromX, y: fromY, tx: mouse.x, ty: mouse.y, vx: 0, vy: 0, hue: 160 + Math.random() * 80, life: 1 });
        const bolt = bolts[bolts.length - 1];
        const angle = Math.atan2(bolt.ty - bolt.y, bolt.tx - bolt.x);
        bolt.vx = Math.cos(angle) * 14; bolt.vy = Math.sin(angle) * 14;
      };
      fire();
      const iv = setInterval(fire, 1500);
      const detonate = (x, y, hue) => {
        flashes.push({ x, y, r: 5, maxR: 120, hue, alpha: 1 });
        for (let i = 0; i < 12; i++) {
          const a = (i / 12) * Math.PI * 2 + Math.random() * 0.4;
          const len = Math.random() * 80 + 40;
          arcs.push({ x1: x, y1: y, x2: x + Math.cos(a) * len, y2: y + Math.sin(a) * len, alpha: 0.9, hue, jagged: Array.from({length:4}, ()=>({dx:(Math.random()-0.5)*25, dy:(Math.random()-0.5)*25})) });
        }
      };
      const loop = () => {
        t += 0.018;
        ctx.fillStyle = "rgba(0,4,12,0.2)";
        ctx.fillRect(0, 0, c.width, c.height);
        ctx.globalCompositeOperation = "screen";
        // bolts
        bolts.forEach((b, i) => {
          b.x += b.vx; b.y += b.vy;
          const g = ctx.createLinearGradient(b.x - b.vx * 5, b.y - b.vy * 5, b.x, b.y);
          g.addColorStop(0, `hsla(${b.hue},100%,60%,0)`);
          g.addColorStop(1, `hsla(${b.hue},100%,80%,0.9)`);
          ctx.strokeStyle = g; ctx.lineWidth = 3;
          ctx.beginPath(); ctx.moveTo(b.x - b.vx * 5, b.y - b.vy * 5); ctx.lineTo(b.x, b.y); ctx.stroke();
          const d = Math.hypot(b.tx - b.x, b.ty - b.y);
          if (d < 20) { detonate(b.x, b.y, b.hue); bolts.splice(i, 1); }
        });
        // flashes
        flashes.forEach((f, i) => {
          f.r += 8; f.alpha -= 0.04;
          if (f.alpha <= 0) { flashes.splice(i, 1); return; }
          const fg = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, f.r);
          fg.addColorStop(0, `hsla(${f.hue},100%,90%,${f.alpha})`);
          fg.addColorStop(1, `hsla(${f.hue},90%,50%,0)`);
          ctx.fillStyle = fg; ctx.beginPath(); ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2); ctx.fill();
        });
        // arcs
        arcs.forEach((a, i) => {
          a.alpha -= 0.06;
          if (a.alpha <= 0) { arcs.splice(i, 1); return; }
          ctx.strokeStyle = `hsla(${a.hue},100%,75%,${a.alpha})`; ctx.lineWidth = 1.5;
          ctx.beginPath(); ctx.moveTo(a.x1, a.y1);
          a.jagged.forEach((j, k) => {
            const frac = (k + 1) / (a.jagged.length + 1);
            ctx.lineTo(a.x1 + (a.x2 - a.x1) * frac + j.dx, a.y1 + (a.y2 - a.y1) * frac + j.dy);
          });
          ctx.lineTo(a.x2, a.y2); ctx.stroke();
        });
        ctx.globalCompositeOperation = "source-over";
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => { clearInterval(iv); cancelAnimationFrame(id); } };
    }
  },

  {
    name: "Confetti Burst",
    tags: ["explosion", "celebration", "colorful"],
    description: "Joyful confetti and streamers erupt from the cursor in cascading color",
    code: `// Spinning flat rectangles with gravity + air resistance
p.rotation += p.rotSpeed;
p.vy += 0.25;   // gravity
p.vx *= 0.99;   // air drag
// draw as rotated rect with color face
ctx.save(); ctx.rotate(p.rotation);
ctx.fillRect(-p.w/2, -p.h/2, p.w, p.h);
ctx.restore();`,
    animator: (c, ctx, mouse) => {
      let pieces = [], t = 0, id;
      const burst = (x, y) => {
        for (let i = 0; i < 100; i++) {
          const angle = Math.random() * Math.PI * 2;
          const spd = Math.random() * 10 + 3;
          pieces.push({
            x, y, vx: Math.cos(angle) * spd, vy: Math.sin(angle) * spd - 5,
            w: Math.random() * 10 + 4, h: Math.random() * 5 + 2,
            rotation: Math.random() * Math.PI * 2,
            rotSpeed: (Math.random() - 0.5) * 0.2,
            hue: Math.floor(Math.random() * 12) * 30, alpha: 1
          });
        }
      };
      burst(c.width / 2, c.height / 2);
      const iv = setInterval(() => burst(mouse.x, mouse.y), 1800);
      const loop = () => {
        t += 0.018;
        ctx.fillStyle = "rgba(4,8,14,0.18)";
        ctx.fillRect(0, 0, c.width, c.height);
        pieces.forEach((p, i) => {
          p.vx += (Math.random() - 0.5) * 0.2; p.vy += 0.22;
          p.vx *= 0.99; p.vy *= 0.99;
          p.x += p.vx; p.y += p.vy;
          p.rotation += p.rotSpeed;
          p.alpha -= 0.008;
          if (p.alpha <= 0 || p.y > c.height + 20) { pieces.splice(i, 1); return; }
          ctx.save();
          ctx.translate(p.x, p.y); ctx.rotate(p.rotation);
          ctx.fillStyle = `hsla(${p.hue},90%,60%,${p.alpha})`;
          ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
          ctx.restore();
        });
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => { clearInterval(iv); cancelAnimationFrame(id); } };
    }
  },

  {
    name: "Debris Field",
    tags: ["explosion", "debris", "scifi"],
    description: "Tumbling metallic shards scatter outward from a central detonation",
    code: `// Irregular polygon shards with tumble rotation
shard.rotation += shard.rotSpeed;
shard.vx *= 0.98; shard.vy += gravity;
// draw as irregular polygon
const pts = shard.verts.map(v => rotate(v, shard.rotation));
drawPoly(shard.x, shard.y, pts);`,
    animator: (c, ctx, mouse) => {
      let shards = [], t = 0, id;
      const blast = (x, y) => {
        for (let i = 0; i < 40; i++) {
          const angle = Math.random() * Math.PI * 2;
          const spd = Math.random() * 9 + 2;
          const verts = Array.from({ length: Math.floor(Math.random() * 3) + 3 }, (_, k) => {
            const a = (k / (Math.floor(Math.random() * 3) + 3)) * Math.PI * 2;
            const r = Math.random() * 12 + 6;
            return [Math.cos(a) * r, Math.sin(a) * r];
          });
          shards.push({
            x, y, vx: Math.cos(angle) * spd, vy: Math.sin(angle) * spd - 3,
            rotation: Math.random() * Math.PI * 2,
            rotSpeed: (Math.random() - 0.5) * 0.12,
            verts, alpha: 0.9,
            hue: Math.random() > 0.6 ? 200 + Math.random() * 40 : 20 + Math.random() * 20,
            metallic: Math.random() > 0.4
          });
        }
      };
      blast(c.width / 2, c.height / 2);
      const iv = setInterval(() => blast(mouse.x, mouse.y), 2200);
      const loop = () => {
        t += 0.018;
        ctx.fillStyle = "rgba(2,6,12,0.2)";
        ctx.fillRect(0, 0, c.width, c.height);
        shards.forEach((s, i) => {
          s.vy += 0.18; s.vx *= 0.99; s.vy *= 0.99;
          s.x += s.vx; s.y += s.vy; s.rotation += s.rotSpeed; s.alpha -= 0.006;
          if (s.alpha <= 0 || s.y > c.height + 30) { shards.splice(i, 1); return; }
          ctx.save(); ctx.translate(s.x, s.y); ctx.rotate(s.rotation);
          ctx.beginPath();
          s.verts.forEach(([vx, vy], k) => k === 0 ? ctx.moveTo(vx, vy) : ctx.lineTo(vx, vy));
          ctx.closePath();
          if (s.metallic) {
            ctx.fillStyle = `hsla(${s.hue},20%,${40 + Math.abs(Math.sin(s.rotation)) * 35}%,${s.alpha * 0.7})`;
            ctx.strokeStyle = `hsla(${s.hue},30%,80%,${s.alpha})`; ctx.lineWidth = 0.8; ctx.stroke();
          } else {
            ctx.fillStyle = `hsla(${s.hue},70%,50%,${s.alpha * 0.8})`;
          }
          ctx.fill();
          ctx.restore();
        });
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => { clearInterval(iv); cancelAnimationFrame(id); } };
    }
  },

  {
    name: "Nuclear Flash",
    tags: ["explosion", "nuclear", "dramatic"],
    description: "Blinding white flash bleeds into a thermal pulse ring, followed by a rising mushroom cloud",
    code: `// Phase 1: full-screen white flash
// Phase 2: expanding thermal ring
// Phase 3: rising column with rolling cap
if (phase === 'flash') ctx.fillStyle = \`rgba(255,255,240,\${flashAlpha})\`;
else if (phase === 'ring') drawThermalRing(cx, cy, ring.r);
else drawMushroomColumn(cx, groundY, cloud.r, cloud.y);`,
    animator: (c, ctx, mouse) => {
      let t = 0, id, phase = 'flash', flash = 1, ring = { r: 10, maxR: 400 }, cloud = { r: 5, y: c.height * 0.7, stemH: 0 };
      const reset = () => { t = 0; phase = 'flash'; flash = 1; ring.r = 10; cloud.r = 5; cloud.y = c.height * 0.75; cloud.stemH = 0; };
      reset();
      const iv = setInterval(reset, 5000);
      const loop = () => {
        t += 0.018;
        ctx.fillStyle = "rgba(4,4,8,0.15)";
        ctx.fillRect(0, 0, c.width, c.height);
        const cx = mouse.x, groundY = c.height * 0.8;
        if (phase === 'flash') {
          ctx.fillStyle = `rgba(255,255,230,${flash})`;
          ctx.fillRect(0, 0, c.width, c.height);
          flash -= 0.04;
          if (flash <= 0) phase = 'ring';
        } else if (phase === 'ring') {
          ring.r += 8; ring.r *= 1.015;
          const alpha = Math.max(0, 1 - ring.r / ring.maxR);
          ctx.globalCompositeOperation = "screen";
          const rg = ctx.createRadialGradient(cx, groundY, ring.r * 0.7, cx, groundY, ring.r);
          rg.addColorStop(0, `rgba(255,200,100,0)`);
          rg.addColorStop(0.6, `rgba(255,160,60,${alpha * 0.6})`);
          rg.addColorStop(1, `rgba(255,100,20,0)`);
          ctx.fillStyle = rg; ctx.beginPath(); ctx.arc(cx, groundY, ring.r, 0, Math.PI * 2); ctx.fill();
          ctx.globalCompositeOperation = "source-over";
          if (ring.r >= ring.maxR * 0.4) phase = 'cloud';
        } else if (phase === 'cloud') {
          cloud.stemH = Math.min(c.height * 0.5, cloud.stemH + 3);
          cloud.y = groundY - cloud.stemH;
          cloud.r = Math.min(120, cloud.r + 0.8);
          // stem
          const stemW = 20 + cloud.stemH * 0.1;
          const sg = ctx.createLinearGradient(cx - stemW, groundY, cx + stemW, groundY);
          sg.addColorStop(0, "rgba(80,60,40,0)"); sg.addColorStop(0.5, `rgba(140,100,60,0.6)`); sg.addColorStop(1, "rgba(80,60,40,0)");
          ctx.fillStyle = sg; ctx.fillRect(cx - stemW, cloud.y, stemW * 2, cloud.stemH);
          // cap
          ctx.globalCompositeOperation = "screen";
          const cg = ctx.createRadialGradient(cx, cloud.y, 0, cx, cloud.y, cloud.r);
          cg.addColorStop(0, `rgba(255,180,80,0.7)`);
          cg.addColorStop(0.5, `rgba(200,120,40,0.4)`);
          cg.addColorStop(1, `rgba(100,60,20,0)`);
          ctx.fillStyle = cg; ctx.beginPath(); ctx.ellipse(cx, cloud.y, cloud.r, cloud.r * 0.7, 0, 0, Math.PI * 2); ctx.fill();
          ctx.globalCompositeOperation = "source-over";
        }
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => { clearInterval(iv); cancelAnimationFrame(id); } };
    }
  }

];
