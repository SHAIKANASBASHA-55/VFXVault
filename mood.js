// ─────────────────────────────────────────────────
//  MOOD EFFECTS
// ─────────────────────────────────────────────────

export const moodEffects = [
  {
    name: "Melancholy Rain",
    tags: ["mood", "somber", "fluid"],
    description: "Slow-motion droplets streaking down a dark pane with soft focus",
    code: `// Vertical streaks with refraction "blobs"
ctx.lineCap = "round";
ctx.strokeStyle = "rgba(150, 180, 255, 0.2)";
ctx.lineWidth = 1 + rand() * 2;`,
    animator: (c, ctx, mouse) => {
      let drops = [], id;
      const loop = () => {
        ctx.fillStyle = "rgba(5, 8, 15, 0.2)"; ctx.fillRect(0, 0, c.width, c.height);
        if (drops.length < 80) drops.push({ x: Math.random() * c.width, y: Math.random() * -c.height, len: Math.random() * 20 + 10, v: Math.random() * 5 + 2 });
        drops.forEach((d, i) => {
          d.y += d.v;
          ctx.beginPath(); ctx.moveTo(d.x, d.y); ctx.lineTo(d.x, d.y + d.len);
          ctx.strokeStyle = "rgba(100, 140, 255, 0.3)"; ctx.stroke();
          if (d.y > c.height) { d.y = -20; d.x = Math.random() * c.width; }
        });
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },

  {
    name: "Golden Euphoria",
    tags: ["mood", "happy", "light"],
    description: "Warm, buoyant bubbles rising in a sun-drenched amber fluid",
    code: `// Buoyancy + shimmering specular glints
p.y -= p.velocity;
p.x += Math.sin(t + p.offset) * 1.5;`,
    animator: (c, ctx, mouse) => {
      let bubbles = [], id, t = 0;
      const loop = () => {
        t += 0.02; ctx.fillStyle = "#3d2b00"; ctx.fillRect(0, 0, c.width, c.height);
        if (bubbles.length < 50) bubbles.push({ x: Math.random() * c.width, y: c.height + 20, r: Math.random() * 8 + 2, s: Math.random() * 2 + 1 });
        bubbles.forEach((b, i) => {
          b.y -= b.s; b.x += Math.sin(t + b.r) * 0.5;
          const g = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r);
          g.addColorStop(0, "#fff7ad"); g.addColorStop(1, "#d4af37");
          ctx.fillStyle = g; ctx.beginPath(); ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2); ctx.fill();
          if (b.y < -20) bubbles.splice(i, 1);
        });
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },

  {
    name: "Anxious Static",
    tags: ["mood", "stress", "erratic"],
    description: "Jagged, vibrating fluid filaments that react violently to movement",
    code: `// High-frequency jitter + sharp angles
p.x += (rand()-0.5) * 10;
ctx.lineTo(p.x + shake, p.y + shake);`,
    animator: (c, ctx, mouse) => {
      let id, t = 0;
      const loop = () => {
        t += 1; ctx.fillStyle = "rgba(20, 20, 20, 0.4)"; ctx.fillRect(0, 0, c.width, c.height);
        ctx.strokeStyle = "#fff"; ctx.lineWidth = 0.5;
        for (let i = 0; i < 5; i++) {
          ctx.beginPath(); ctx.moveTo(Math.random() * c.width, 0);
          for (let y = 0; y < c.height; y += 10) {
            ctx.lineTo(mouse.x + (Math.random() - 0.5) * 150, y);
          }
          ctx.stroke();
        }
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },

  {
    name: "Zen Ink",
    tags: ["mood", "calm", "fluid"],
    description: "Sumi-e inspired ink clouds diffusing into fibrous paper",
    code: `// Diffusion with fibrous jitter
p.r += p.growth;
p.x += Math.sin(p.angle) * 0.5;
ctx.fillStyle = \`rgba(30, 30, 40, \${p.a})\`;`,
    animator: (c, ctx, mouse) => {
      let clouds = [], id;
      
      // Helper to draw paper texture once
      const drawPaper = () => {
        ctx.fillStyle = "#f5f5f0";
        ctx.fillRect(0, 0, c.width, c.height);
        for(let i=0; i<500; i++) {
          ctx.fillStyle = "rgba(0,0,0,0.02)";
          ctx.fillRect(Math.random()*c.width, Math.random()*c.height, 2, 1);
        }
      };
      drawPaper();

      const loop = () => {
        // Very high persistence for the "ink on paper" look
        ctx.fillStyle = "rgba(245, 245, 240, 0.02)"; 
        ctx.fillRect(0, 0, c.width, c.height);

        // Spawn ink only when moving (brush stroke)
        const dx = mouse.x - (mouse.px || mouse.x);
        const dy = mouse.y - (mouse.py || mouse.y);
        const dist = Math.hypot(dx, dy);

        if (dist > 2) {
          for(let i=0; i<3; i++) {
            clouds.push({
              x: mouse.x + (Math.random()-0.5) * 10,
              y: mouse.y + (Math.random()-0.5) * 10,
              r: Math.random() * 3 + 1,
              a: 0.2, // Low alpha for layering
              growth: Math.random() * 0.4 + 0.1,
              angle: Math.random() * Math.PI * 2
            });
          }
        }
        mouse.px = mouse.x; mouse.py = mouse.y;

        clouds.forEach((cl, i) => {
          cl.r += cl.growth;
          cl.a -= 0.002;
          // Add organic "wobble" to the diffusion
          cl.x += Math.cos(cl.angle) * 0.2;
          cl.y += Math.sin(cl.angle) * 0.2;

          ctx.fillStyle = `rgba(20, 25, 35, ${cl.a})`;
          ctx.beginPath();
          // Use slightly irregular arcs to simulate paper fiber absorption
          ctx.arc(cl.x, cl.y, cl.r, 0, Math.PI * 2);
          ctx.fill();

          if (cl.a <= 0) clouds.splice(i, 1);
        });

        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },

  {
    name: "Rage Ember",
    tags: ["mood", "anger", "heat"],
    description: "A turbulent, flickering fluid that glows intense red upon contact",
    code: `// Thermal expansion on interaction
p.color = dist < 50 ? '#ff0000' : '#440000';
p.size *= (1 + heatFactor);`,
    animator: (c, ctx, mouse) => {
      let particles = [], id;
      for (let i = 0; i < 100; i++) particles.push({ x: Math.random() * c.width, y: Math.random() * c.height, r: 2 });
      const loop = () => {
        ctx.fillStyle = "rgba(10, 0, 0, 0.2)"; ctx.fillRect(0, 0, c.width, c.height);
        particles.forEach(p => {
          const d = Math.hypot(p.x - mouse.x, p.y - mouse.y);
          const active = d < 100;
          ctx.fillStyle = active ? "#ff4400" : "#300";
          ctx.beginPath(); ctx.arc(p.x, p.y, active ? 4 : 2, 0, Math.PI * 2); ctx.fill();
          p.x += (Math.random() - 0.5) * (active ? 10 : 1);
          p.y += (Math.random() - 0.5) * (active ? 10 : 1);
        });
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },

  {
    name: "Dream Haze",
    tags: ["mood", "ethereal", "soft"],
    description: "Pastel-colored clouds that drift and overlap like a waking dream",
    code: `// Soft-edge gradients + slow orbital drift
const g = ctx.createRadialGradient(...);
g.addColorStop(0, 'hsla(hue, 100%, 80%, 0.1)');`,
    animator: (c, ctx, mouse) => {
      let t = 0, id;
      const loop = () => {
        t += 0.01; ctx.fillStyle = "#0a0a15"; ctx.fillRect(0, 0, c.width, c.height);
        for (let i = 0; i < 5; i++) {
          const x = c.width/2 + Math.cos(t * 0.5 + i) * 100;
          const y = c.height/2 + Math.sin(t * 0.7 + i) * 100;
          const g = ctx.createRadialGradient(x, y, 0, x, y, 200);
          g.addColorStop(0, `hsla(${i * 60}, 50%, 70%, 0.2)`);
          g.addColorStop(1, "transparent");
          ctx.fillStyle = g; ctx.fillRect(0, 0, c.width, c.height);
        }
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },

  {
    name: "Loneliness",
    tags: ["mood", "empty", "cold"],
    description: "A single, fragile white dot in a vast, dark, viscous void",
    code: `// Inertia + dragging a faint, fading trail
p.x += (target.x - p.x) * 0.02;
p.trail.push({x, y});`,
    animator: (c, ctx, mouse) => {
      let p = { x: c.width / 2, y: c.height / 2 }, id;
      const loop = () => {
        ctx.fillStyle = "rgba(0, 0, 5, 0.1)"; ctx.fillRect(0, 0, c.width, c.height);
        p.x += (mouse.x - p.x) * 0.03; p.y += (mouse.y - p.y) * 0.03;
        ctx.fillStyle = "#fff"; ctx.beginPath(); ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = "rgba(255,255,255,0.05)"; ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(c.width / 2, c.height / 2); ctx.stroke();
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },

  {
    name: "Nostalgia Bloom",
    tags: ["mood", "warm", "faded"],
    description: "Sepia-toned fluid ripples that look like old film emulsion",
    code: `// Sepia filter + organic noise spots
ctx.fillStyle = "rgba(100, 50, 20, 0.05)";
if(rand() > 0.98) drawFilmGrain();`,
    animator: (c, ctx, mouse) => {
      let id, t = 0;
      const loop = () => {
        t += 0.02; ctx.fillStyle = "#f4ecd8"; ctx.fillRect(0, 0, c.width, c.height);
        ctx.fillStyle = "rgba(100, 60, 20, 0.1)";
        for (let i = 0; i < 5; i++) {
          ctx.beginPath(); ctx.arc(Math.random() * c.width, Math.random() * c.height, Math.random() * 100, 0, Math.PI * 2); ctx.fill();
        }
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },

  {
    name: "Envy",
    tags: ["mood", "toxic", "green"],
    description: "Dark green, swirling liquid that chases the cursor hungrily",
    code: `// Predator-prey easing + dark shadows
velocity += (mouse - pos) * 0.1;
ctx.shadowColor = 'black'; ctx.shadowBlur = 10;`,
    animator: (c, ctx, mouse) => {
      let x = 0, y = 0, id;
      const loop = () => {
        ctx.fillStyle = "rgba(0, 10, 5, 0.2)"; ctx.fillRect(0, 0, c.width, c.height);
        x += (mouse.x - x) * 0.05; y += (mouse.y - y) * 0.05;
        ctx.fillStyle = "#0f0"; ctx.shadowBlur = 30; ctx.shadowColor = "#0f0";
        ctx.beginPath(); ctx.arc(x, y, 20, 0, Math.PI * 2); ctx.fill();
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },

  {
    name: "Wonder",
    tags: ["mood", "cosmic", "blue"],
    description: "Deep violet fluid with shimmering stars that react to your presence",
    code: `// Parallax particles + twinkling alpha
p.alpha = 0.5 + sin(t + p.id) * 0.5;
p.x += mouseDelta * p.depth;`,
    animator: (c, ctx, mouse) => {
      let stars = [], id, t = 0;
      for (let i = 0; i < 150; i++) stars.push({ x: Math.random() * c.width, y: Math.random() * c.height, r: Math.random() * 1.5, o: Math.random() * 10 });
      const loop = () => {
        t += 0.05; ctx.fillStyle = "#000022"; ctx.fillRect(0, 0, c.width, c.height);
        stars.forEach(s => {
          const osc = Math.sin(t + s.o);
          ctx.fillStyle = `rgba(255, 255, 255, ${0.3 + osc * 0.7})`;
          ctx.beginPath(); ctx.arc(s.x + (mouse.x - c.width / 2) * 0.05, s.y + (mouse.y - c.height / 2) * 0.05, s.r, 0, Math.PI * 2); ctx.fill();
        });
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },
  {
    name: "Melancholy Rain",
    tags: ["mood", "sad", "ambient"],
    description: "Long grey streaks fall with a somber, slow mood",
    code: `// Desaturated slow rain with heavy trail fade
ctx.strokeStyle = \`rgba(120,130,148,\${r.alpha})\`;
ctx.lineWidth = 0.6;
ctx.moveTo(r.x, r.y);
ctx.lineTo(r.x, r.y + r.len * 2.5);`,
    animator: (c, ctx, mouse) => {
      let drops = [], t = 0, id;
      for (let i = 0; i < 150; i++) drops.push({ x: Math.random() * c.width, y: Math.random() * c.height, len: Math.random() * 35 + 15, speed: Math.random() * 3 + 1.5, alpha: Math.random() * .35 + .1 });
      const loop = () => {
        t += .008; ctx.fillStyle = "rgba(12,13,18,0.2)"; ctx.fillRect(0, 0, c.width, c.height);
        drops.forEach(r => {
          r.y += r.speed; if (r.y > c.height + r.len) { r.y = -r.len; r.x = Math.random() * c.width; }
          ctx.strokeStyle = `rgba(120,130,148,${r.alpha})`; ctx.lineWidth = .65;
          ctx.beginPath(); ctx.moveTo(r.x, r.y); ctx.lineTo(r.x + Math.sin(t) * 3, r.y + r.len * 2.5); ctx.stroke();
        });
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },

  {
    name: "Euphoria Burst",
    tags: ["mood", "happy", "energetic"],
    description: "Explosive rainbow confetti bursts erupt from cursor",
    code: `// Confetti rectangle with tumble rotation
ctx.save();
ctx.translate(p.x, p.y); ctx.rotate(p.angle);
ctx.fillStyle = \`hsl(\${p.hue},85%,60%)\`;
ctx.fillRect(-p.w/2, -p.h/2, p.w, p.h);`,
    animator: (c, ctx, mouse) => {
      let particles = [], id;
      const burst = (x, y) => { for (let i = 0; i < 50; i++) { const a = Math.random() * Math.PI * 2, spd = Math.random() * 12 + 4; particles.push({ x, y, vx: Math.cos(a) * spd, vy: Math.sin(a) * spd - 4, angle: Math.random() * Math.PI * 2, spin: (Math.random() - .5) * .25, w: Math.random() * 10 + 4, h: Math.random() * 5 + 2.5, hue: Math.random() * 360, alpha: 1 }); } };
      const iv = setInterval(() => { if (Math.random() > .5) burst(mouse.x, mouse.y); else burst(Math.random() * c.width, Math.random() * c.height); }, 500);
      burst(c.width / 2, c.height / 2);
      const loop = () => {
        ctx.fillStyle = "rgba(4,2,8,0.15)"; ctx.fillRect(0, 0, c.width, c.height);
        particles.forEach((p, i) => {
          p.x += p.vx; p.y += p.vy; p.vy += .22; p.angle += p.spin; p.alpha -= .012;
          if (p.alpha <= 0) { particles.splice(i, 1); return; }
          ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.angle);
          ctx.fillStyle = `hsla(${p.hue},85%,60%,${p.alpha})`; ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h); ctx.restore();
        });
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => { clearInterval(iv); cancelAnimationFrame(id); } };
    }
  },

  {
    name: "Anxiety Noise",
    tags: ["mood", "tense", "chaotic"],
    description: "Frantic, jittery particles scatter unpredictably around cursor",
    code: `// High-frequency jitter + avoidance
p.vx += (rand()-0.5)*3.5 - (p.x - mouseX)*0.003;
p.vy += (rand()-0.5)*3.5 - (p.y - mouseY)*0.003;
ctx.fillStyle = \`rgba(200,60,60,\${p.alpha})\`;`,
    animator: (c, ctx, mouse) => {
      let particles = [], t = 0, id;
      for (let i = 0; i < 120; i++) particles.push({ x: Math.random() * c.width, y: Math.random() * c.height, vx: (Math.random() - .5) * 6, vy: (Math.random() - .5) * 6, alpha: Math.random() * .6 + .2, hue: Math.random() > .5 ? 0 : 220, r: Math.random() * 3 + 1 });
      const loop = () => {
        t += .02; ctx.fillStyle = "rgba(8,4,4,0.22)"; ctx.fillRect(0, 0, c.width, c.height);
        particles.forEach(p => {
          p.vx += (Math.random() - .5) * 3.5 - (p.x - mouse.x) * .0035;
          p.vy += (Math.random() - .5) * 3.5 - (p.y - mouse.y) * .0035;
          p.vx *= .9; p.vy *= .9;
          p.x += p.vx; p.y += p.vy;
          if (p.x < 0 || p.x > c.width) p.vx *= -1; if (p.y < 0 || p.y > c.height) p.vy *= -1;
          const jitter = Math.hypot(p.vx, p.vy);
          ctx.fillStyle = `hsla(${p.hue + jitter * 5},80%,58%,${p.alpha * Math.min(jitter / 4, 1)})`; ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
        });
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },

  {
    name: "Tranquil Drift",
    tags: ["mood", "calm", "zen"],
    description: "Slow luminous orbs drift serenely with breathing pulse",
    code: `// Soft breathing orbs with gentle sine wandering
const breath = sin(t * 0.8 + orb.phase) * 0.5 + 0.5;
orb.r = orb.baseR * (0.85 + breath * 0.3);
ctx.fillStyle = \`hsla(\${orb.hue},45%,62%,\${0.15 + breath*0.2})\`;`,
    animator: (c, ctx, mouse) => {
      let orbs = [], t = 0, id;
      for (let i = 0; i < 18; i++) orbs.push({ x: Math.random() * c.width, y: Math.random() * c.height, vx: (Math.random() - .5) * .4, vy: (Math.random() - .5) * .4, baseR: Math.random() * 60 + 30, phase: Math.random() * Math.PI * 2, hue: 170 + Math.random() * 80 });
      const loop = () => {
        t += .008; ctx.fillStyle = "rgba(4,6,12,0.07)"; ctx.fillRect(0, 0, c.width, c.height);
        orbs.forEach(o => {
          o.x += o.vx + (mouse.x - o.x) * .0002; o.y += o.vy + (mouse.y - o.y) * .0002;
          o.vx += (Math.random() - .5) * .04; o.vy += (Math.random() - .5) * .04; o.vx *= .99; o.vy *= .99;
          if (o.x < -o.baseR * 2) o.x = c.width + o.baseR; if (o.x > c.width + o.baseR * 2) o.x = -o.baseR;
          if (o.y < -o.baseR * 2) o.y = c.height + o.baseR; if (o.y > c.height + o.baseR * 2) o.y = -o.baseR;
          const breath = Math.sin(t * .8 + o.phase) * .5 + .5, r = o.baseR * (.85 + breath * .3);
          const g = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, r);
          g.addColorStop(0, `hsla(${o.hue},50%,72%,${.18 + breath * .22})`); g.addColorStop(1, `hsla(${o.hue},45%,55%,0)`);
          ctx.fillStyle = g; ctx.beginPath(); ctx.arc(o.x, o.y, r, 0, Math.PI * 2); ctx.fill();
        });
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },

  {
    name: "Nostalgia Glitter",
    tags: ["mood", "dreamy", "ambient"],
    description: "Golden dust motes float like a warm memory fading in and out",
    code: `// Sine-curve drifting motes with crossfade alpha
mote.alpha = sin(t * mote.speed + mote.phase) * 0.5 + 0.5;
ctx.fillStyle = \`hsla(42, 80%, \${60+mote.bright}%, \${mote.alpha*0.7})\`;
ctx.arc(mote.x, mote.y, mote.r * mote.alpha, 0, PI*2);`,
    animator: (c, ctx, mouse) => {
      let motes = [], t = 0, id;
      for (let i = 0; i < 200; i++) motes.push({ x: Math.random() * c.width, y: Math.random() * c.height, vx: (Math.random() - .5) * .4, vy: -(Math.random() * .3 + .1), r: Math.random() * 3 + .8, speed: Math.random() * 1.5 + .5, phase: Math.random() * Math.PI * 2, bright: Math.random() * 25 });
      const loop = () => {
        t += .012; ctx.fillStyle = "rgba(10,7,2,0.1)"; ctx.fillRect(0, 0, c.width, c.height);
        const windX = (mouse.x / c.width - .5) * .8;
        motes.forEach(m => {
          m.x += m.vx + windX; m.y += m.vy;
          if (m.y < -m.r * 4) { m.y = c.height + m.r; m.x = Math.random() * c.width; }
          if (m.x < 0) m.x = c.width; if (m.x > c.width) m.x = 0;
          const alpha = Math.sin(t * m.speed + m.phase) * .5 + .5;
          ctx.fillStyle = `hsla(42,78%,${60 + m.bright}%,${alpha * .7})`;
          ctx.beginPath(); ctx.arc(m.x, m.y, m.r * alpha, 0, Math.PI * 2); ctx.fill();
        });
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },

  {
    name: "Dread Tendrils",
    tags: ["mood", "dark", "horror"],
    description: "Dark ink-like tendrils reach toward cursor with slow menace",
    code: `// Bezier curve tendril growing toward mouse
const cpx = lerp(t.x, mouse.x, 0.3) + sin(time)*40;
ctx.bezierCurveTo(t.x + cpx, t.y - 80, mouse.x, mouse.y - 60, mouse.x, mouse.y);
ctx.strokeStyle = \`rgba(30,0,40,\${t.alpha})\`;`,
    animator: (c, ctx, mouse) => {
      let tendrils = [], t = 0, id;
      for (let i = 0; i < 12; i++) tendrils.push({ x: Math.random() * c.width, y: c.height + 20, phase: Math.random() * Math.PI * 2, speed: Math.random() * .008 + .004, alpha: Math.random() * .55 + .2, width: Math.random() * 2.5 + 1 });
      const loop = () => {
        t += .016; ctx.fillStyle = "rgba(4,0,8,0.18)"; ctx.fillRect(0, 0, c.width, c.height);
        tendrils.forEach(ten => {
          const cp1x = ten.x + Math.sin(t * 1.5 + ten.phase) * 80, cp1y = (ten.y + mouse.y) * .5 - 80;
          const cp2x = mouse.x + Math.sin(t * 2 + ten.phase) * 50, cp2y = mouse.y - 40;
          ctx.strokeStyle = `rgba(35,0,55,${ten.alpha})`; ctx.lineWidth = ten.width;
          ctx.beginPath(); ctx.moveTo(ten.x, ten.y); ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, mouse.x, mouse.y); ctx.stroke();
          ten.alpha = .2 + Math.sin(t * ten.speed * 60 + ten.phase) * .2;
        });
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },

  {
    name: "Wonder Stars",
    tags: ["mood", "wonder", "sparkle"],
    description: "Glittering star sparks erupt from cursor in a sense of awe",
    code: `// 5-point star polygon drawn via sin/cos pairs
for(let i=0;i<10;i++){
  const r = i%2===0 ? outerR : outerR*0.45;
  const a = (i/10)*PI*2 - PI/2;
  ctx.lineTo(cos(a)*r, sin(a)*r);
}`,
    animator: (c, ctx, mouse) => {
      let stars = [], t = 0, id;
      const spawnStar = (x, y) => { for (let i = 0; i < 5; i++) { const a = Math.random() * Math.PI * 2, spd = Math.random() * 5 + 2; stars.push({ x, y, vx: Math.cos(a) * spd, vy: Math.sin(a) * spd - 2, size: Math.random() * 14 + 6, hue: Math.random() * 60 + 30, alpha: 1, spin: (Math.random() - .5) * .15 }); } };
      const iv = setInterval(() => spawnStar(mouse.x, mouse.y), 200);
      const loop = () => {
        t += .016; ctx.fillStyle = "rgba(2,2,10,0.14)"; ctx.fillRect(0, 0, c.width, c.height);
        stars.forEach((s, i) => {
          s.x += s.vx; s.y += s.vy; s.vy += .08; s.alpha -= .015; s.spin += .01;
          if (s.alpha <= 0) { stars.splice(i, 1); return; }
          ctx.save(); ctx.translate(s.x, s.y); ctx.rotate(t * 2 + s.spin);
          ctx.fillStyle = `hsla(${s.hue},90%,75%,${s.alpha})`;
          ctx.shadowColor = `hsla(${s.hue},100%,80%,0.8)`; ctx.shadowBlur = 12;
          ctx.beginPath();
          for (let k = 0; k < 10; k++) { const r = k % 2 === 0 ? s.size : s.size * .45, a = (k / 10) * Math.PI * 2 - Math.PI / 2; ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r); }
          ctx.closePath(); ctx.fill(); ctx.shadowBlur = 0; ctx.restore();
        });
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => { clearInterval(iv); cancelAnimationFrame(id); } };
    }
  },

  {
    name: "Romance Petals",
    tags: ["mood", "love", "dreamy"],
    description: "Soft rose petals spiral down in a romantic slow dance",
    code: `// Petal as overlapping ellipses with alpha blend
ctx.save();
ctx.rotate(petal.angle);
ctx.fillStyle = \`hsla(\${340+petal.hue},70%,72%,0.75)\`;
ctx.ellipse(0, -petal.size*0.5, petal.size*0.35, petal.size, 0, 0, PI*2);`,
    animator: (c, ctx, mouse) => {
      let petals = [], t = 0, id;
      for (let i = 0; i < 60; i++) petals.push({ x: Math.random() * c.width, y: Math.random() * c.height, size: Math.random() * 18 + 8, speed: Math.random() * .8 + .3, spin: (Math.random() - .5) * .025, angle: Math.random() * Math.PI * 2, phase: Math.random() * Math.PI * 2, hue: Math.random() * 25 });
      const loop = () => {
        t += .01; ctx.fillStyle = "rgba(10,4,8,0.1)"; ctx.fillRect(0, 0, c.width, c.height);
        const wind = (mouse.x / c.width - .5) * 1.5;
        petals.forEach(p => {
          p.y += p.speed; p.x += Math.sin(t * 1.2 + p.phase) * 2 + wind; p.angle += p.spin;
          if (p.y > c.height + p.size * 2) { p.y = -p.size * 2; p.x = Math.random() * c.width; }
          ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.angle);
          ctx.fillStyle = `hsla(${340 + p.hue},72%,72%,0.72)`;
          ctx.beginPath(); ctx.ellipse(0, -p.size * .5, p.size * .35, p.size, 0, 0, Math.PI * 2); ctx.fill();
          ctx.fillStyle = `hsla(${345 + p.hue},65%,80%,0.45)`;
          ctx.beginPath(); ctx.ellipse(p.size * .2, -p.size * .3, p.size * .22, p.size * .7, .5, 0, Math.PI * 2); ctx.fill();
          ctx.restore();
        });
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  }
];
