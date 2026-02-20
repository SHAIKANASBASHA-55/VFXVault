// ─────────────────────────────────────────────────
//  SPACE & COSMIC EFFECTS
// ─────────────────────────────────────────────────

export const spaceEffects = [
  {
    name: "Twinkling Stars",
    tags: ["space", "ambient"],
    description: "Stars parallax-shift with mouse, fade in and out",
    code: `// 3-layer parallax + alpha oscillation
const ox = (mouseX/W - 0.5)*18;
stars.forEach(s => {
  s.a += s.up ? s.da : -s.da; // twinkle
  ctx.arc(s.x + ox*(s.layer/3), s.y, s.r, ...);
});`,
    animator: (c, ctx, mouse) => {
      let stars = [];
      for (let i = 0; i < 420; i++)
        stars.push({ x: Math.random() * c.width, y: Math.random() * c.height, r: Math.random() * 2.2 + 0.4, a: Math.random(), da: Math.random() * 0.018 + 0.004, up: true, layer: Math.random() * 3 + 1 });
      let id;
      const loop = () => {
        ctx.fillStyle = "rgba(0,0,14,0.22)"; ctx.fillRect(0, 0, c.width, c.height);
        const ox = (mouse.x / c.width - 0.5) * 18, oy = (mouse.y / c.height - 0.5) * 18;
        stars.forEach(s => {
          if (s.up) { s.a += s.da; if (s.a >= 1) s.up = false; } else { s.a -= s.da; if (s.a <= 0.05) s.up = true; }
          ctx.fillStyle = `rgba(240,230,210,${s.a})`;
          ctx.beginPath(); ctx.arc(s.x + ox * (s.layer / 3), s.y + oy * (s.layer / 3), s.r, 0, Math.PI * 2); ctx.fill();
        });
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },

  {
    name: "Wormhole",
    tags: ["space", "cosmic", "ambient"],
    description: "Particles spiral inward toward a shifting center",
    code: `// Elliptical orbits collapsing to center
ps.forEach(p => {
  p.dist -= p.speed + sin(t + p.angle*6)*0.4;
  if(p.dist < 10) p.dist = rand()*500+300;
  const x = cx + cos(p.angle + t*2)*p.dist;
  const y = cy + sin(p.angle + t*1.6)*p.dist*0.7;
});`,
    animator: (c, ctx, mouse) => {
      let ps = [];
      for (let i = 0; i < 240; i++) {
        const a = Math.random() * Math.PI * 2, d = Math.random() * 420 + 60;
        ps.push({ angle: a, dist: d, speed: Math.random() * 1.2 + 0.4, hue: Math.random() * 60 + 190, size: Math.random() * 2.4 + 0.8 });
      }
      let t = 0, id;
      const loop = () => {
        t += 0.008; ctx.fillStyle = "rgba(0,0,18,0.13)"; ctx.fillRect(0, 0, c.width, c.height);
        const cx = mouse.x * 0.3 + c.width / 2 * 0.7, cy = mouse.y * 0.3 + c.height / 2 * 0.7;
        ps.forEach(p => {
          p.dist -= p.speed + Math.sin(t + p.angle * 6) * 0.4;
          if (p.dist < 10) p.dist = Math.random() * 500 + 300;
          const x = cx + Math.cos(p.angle + t * 2) * p.dist, y = cy + Math.sin(p.angle + t * 1.6) * p.dist * 0.7;
          ctx.fillStyle = `hsl(${p.hue + (t * 25 | 0)},60%,62%)`;
          ctx.beginPath(); ctx.arc(x, y, p.size, 0, Math.PI * 2); ctx.fill();
        });
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },

  {
    name: "Fireworks",
    tags: ["fire", "space", "mouse"],
    description: "Click to launch fireworks; auto-fire every 900ms",
    code: `// Rocket → explosion → particle decay
class FW {
  explode() {
    for(let i=0;i<100;i++) parts.push(new Particle());
  }
}
canvas.addEventListener('click', e => fw.push(new FW(x, y)));`,
    animator: (c, ctx, mouse) => {
      let fw = [], part = [];
      class FW {
        constructor(tx, ty) {
          this.x = tx; this.y = c.height; this.tx = tx; this.ty = ty || Math.random() * (c.height * .45);
          this.spd = 5 + Math.random() * 5; this.col = `hsl(${Math.random() * 360 | 0},75%,62%)`; this.done = false; this.trail = [];
        }
        update() {
          if (!this.done) {
            const dx = this.tx - this.x, dy = this.ty - this.y, d = Math.hypot(dx, dy);
            if (d < this.spd * 1.2) { this.explode(); }
            else { this.x += dx / d * this.spd; this.y += dy / d * this.spd; this.trail.push({ x: this.x, y: this.y }); if (this.trail.length > 14) this.trail.shift(); }
          }
        }
        draw() {
          if (!this.done) {
            this.trail.forEach((t, i) => { ctx.globalAlpha = (i / this.trail.length) * .45; ctx.fillStyle = this.col; ctx.beginPath(); ctx.arc(t.x, t.y, 3, 0, Math.PI * 2); ctx.fill(); });
            ctx.globalAlpha = 1; ctx.fillStyle = this.col; ctx.beginPath(); ctx.arc(this.x, this.y, 5, 0, Math.PI * 2); ctx.fill();
          }
        }
        explode() { this.done = true; for (let i = 0; i < 100; i++) part.push(new P(this.x, this.y, this.col)); }
      }
      class P {
        constructor(x, y, col) { this.x = x; this.y = y; this.vx = Math.random() * 11 - 5.5; this.vy = Math.random() * 11 - 8; this.a = 1; this.col = col; this.dec = 0.011 + Math.random() * 0.009; }
        update() { this.vy += 0.11; this.x += this.vx; this.y += this.vy; this.a -= this.dec; }
        draw() { ctx.globalAlpha = this.a; ctx.fillStyle = this.col; ctx.beginPath(); ctx.arc(this.x, this.y, 2.8, 0, Math.PI * 2); ctx.fill(); }
      }
      const onClick = e => { const r = c.getBoundingClientRect(); fw.push(new FW(e.clientX - r.left, e.clientY - r.top)); };
      c.addEventListener('click', onClick);
      let iv = setInterval(() => fw.push(new FW(Math.random() * c.width)), 900), id;
      const loop = () => {
        ctx.fillStyle = "rgba(0,0,0,0.13)"; ctx.fillRect(0, 0, c.width, c.height);
        if (Math.random() < .25) { const a = Math.random() * Math.PI * 2, d = 15 + Math.random() * 35; part.push(new P(mouse.x + Math.cos(a) * d, mouse.y + Math.sin(a) * d, `hsl(${30 + Math.random() * 40 | 0},75%,68%)`)); }
        fw = fw.filter(f => { f.update(); f.draw(); return !f.done || part.length; });
        part = part.filter(p => { p.update(); p.draw(); return p.a > 0.01; });
        ctx.globalAlpha = 1; id = requestAnimationFrame(loop);
      };
      return { start: () => { fw = []; part = []; loop(); }, stop: () => { clearInterval(iv); c.removeEventListener('click', onClick); cancelAnimationFrame(id); } };
    }
  },

  {
    name: "Constellation",
    tags: ["space", "ambient", "mouse"],
    description: "Stars draw connecting lines when close; mouse is a node",
    code: `// Distance-based line drawing
for(let i=0;i<all.length;i++)
  for(let j=i+1;j<all.length;j++){
    if(dist < 115) ctx.strokeStyle = rgba(alpha);
  }`,
    animator: (c, ctx, mouse) => {
      let ps = [];
      for (let i = 0; i < 130; i++)
        ps.push({ x: Math.random() * c.width, y: Math.random() * c.height, vx: (Math.random() - .5) * .7, vy: (Math.random() - .5) * .7, hue: 200 + Math.random() * 40 });
      let id;
      const loop = () => {
        ctx.fillStyle = "rgba(0,0,18,0.07)"; ctx.fillRect(0, 0, c.width, c.height);
        const all = [...ps, { x: mouse.x, y: mouse.y, hue: 35 }];
        all.forEach(p => {
          if (p.vx !== undefined) { p.x += p.vx; p.y += p.vy; if (p.x < 0 || p.x > c.width) p.vx *= -1; if (p.y < 0 || p.y > c.height) p.vy *= -1; }
          ctx.fillStyle = `hsl(${p.hue},50%,70%)`; ctx.beginPath(); ctx.arc(p.x, p.y, 1.8, 0, Math.PI * 2); ctx.fill();
        });
        for (let i = 0; i < all.length; i++) for (let j = i + 1; j < all.length; j++) {
          const dx = all[i].x - all[j].x, dy = all[i].y - all[j].y, d = Math.hypot(dx, dy);
          if (d < 115) { ctx.strokeStyle = `rgba(180,160,120,${(1 - d / 115) * 0.48})`; ctx.lineWidth = 0.7; ctx.beginPath(); ctx.moveTo(all[i].x, all[i].y); ctx.lineTo(all[j].x, all[j].y); ctx.stroke(); }
        }
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },

  {
    name: "Starfield Warp",
    tags: ["space", "cosmic", "mouse"],
    description: "Warp speed starfield; mouse Y controls velocity",
    code: `// Perspective projection of 3D stars
const speed = 7 + (mouseY/H)*14;
stars.forEach(s => {
  s.z -= speed;
  const scale = 1000/s.z;
  const px = W/2 + s.x*scale*W/2;
});`,
    animator: (c, ctx, mouse) => {
      let stars = [];
      for (let i = 0; i < 800; i++) stars.push({ x: Math.random() * 2 - 1, y: Math.random() * 2 - 1, z: Math.random() * 2000 + 1 });
      let id;
      const loop = () => {
        ctx.fillStyle = "#000"; ctx.fillRect(0, 0, c.width, c.height);
        const speed = 7 + (mouse.y / c.height) * 14;
        stars.forEach(s => {
          s.z -= speed;
          if (s.z <= .1) { s.x = Math.random() * 2 - 1; s.y = Math.random() * 2 - 1; s.z = 2000; }
          const scale = 1000 / s.z, px = c.width / 2 + s.x * scale * c.width / 2, py = c.height / 2 + s.y * scale * c.height / 2, b = 1 - s.z / 2000;
          ctx.fillStyle = `rgba(240,230,210,${b})`; ctx.beginPath(); ctx.arc(px, py, b * 2.5, 0, Math.PI * 2); ctx.fill();
        });
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },

  {
    name: "Spiral Galaxy",
    tags: ["space", "cosmic", "ambient"],
    description: "5-arm spiral galaxy with pulsing core glow",
    code: `// 5 spiral arms, each star orbits at a base angle
for(let arm=0;arm<5;arm++)
  for(let i=0;i<90;i++){
    const angle = i*0.18 + arm*(PI*2/5);
    const dist = i*6 + rand()*20;
  }`,
    animator: (c, ctx, mouse) => {
      let stars = [], t = 0, id;
      for (let arm = 0; arm < 5; arm++) for (let i = 0; i < 90; i++) {
        const dist = i * 6 + Math.random() * 20, angle = (i * .18) + (arm * Math.PI * 2 / 5);
        stars.push({ baseAngle: angle, dist, speed: .0008 + dist * .00004, size: Math.random() * 2 + 0.5, hue: 200 + Math.random() * 60 });
      }
      const loop = () => {
        t += .016; ctx.fillStyle = "rgba(0,0,10,0.09)"; ctx.fillRect(0, 0, c.width, c.height);
        const cx = c.width / 2 + (mouse.x - c.width / 2) * .1, cy = c.height / 2 + (mouse.y - c.height / 2) * .1;
        stars.forEach(s => {
          const a = s.baseAngle + t * s.speed, x = cx + Math.cos(a) * s.dist, y = cy + Math.sin(a) * s.dist * .6;
          ctx.fillStyle = `hsla(${s.hue},60%,75%,${.55 + Math.sin(t * 3 + s.dist) * .38})`;
          ctx.beginPath(); ctx.arc(x, y, s.size, 0, Math.PI * 2); ctx.fill();
        });
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, 120);
        g.addColorStop(0, "rgba(235,195,140,0.28)"); g.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, 140, 0, Math.PI * 2); ctx.fill();
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },

  {
    name: "Black Hole",
    tags: ["space", "cosmic", "mouse"],
    description: "Particles spiral into a gravitational singularity",
    code: `// Decaying orbits → event horizon
ps.forEach(p => {
  p.a += p.speed*(1 - p.r/600);
  p.r -= 0.8 + sin(t + p.a*4)*0.3;
  if(p.r < 30) p.r = 500 + rand()*200; // respawn
});`,
    animator: (c, ctx, mouse) => {
      let ps = [], t = 0, id;
      for (let i = 0; i < 200; i++) { const a = Math.random() * Math.PI * 2, r = 60 + Math.random() * 400; ps.push({ a, r, speed: (600 / r) * .8 + Math.random() * .4 }); }
      const loop = () => {
        t += .012; ctx.fillStyle = "rgba(0,0,0,0.16)"; ctx.fillRect(0, 0, c.width, c.height);
        const cx = mouse.x * .15 + c.width / 2 * .85, cy = mouse.y * .15 + c.height / 2 * .85;
        const g = ctx.createRadialGradient(cx, cy, 40, cx, cy, 300);
        g.addColorStop(0, "rgba(220,155,55,0.32)"); g.addColorStop(.4, "rgba(170,75,35,0.18)"); g.addColorStop(.7, "rgba(95,55,140,0.09)"); g.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, 320, 0, Math.PI * 2); ctx.fill();
        ps.forEach(p => {
          p.a += p.speed * (1 - p.r / 600); p.r -= .8 + Math.sin(t + p.a * 4) * .3;
          if (p.r < 30) { p.r = 500 + Math.random() * 200; p.a = Math.random() * Math.PI * 2; }
          const x = cx + Math.cos(p.a + t * .6) * p.r, y = cy + Math.sin(p.a + t * .6) * p.r * .4, b = (600 - p.r) / 600;
          ctx.fillStyle = `rgba(230,185,85,${b * .82})`; ctx.beginPath(); ctx.arc(x, y, 1.5 + b * 3, 0, Math.PI * 2); ctx.fill();
        });
        ctx.fillStyle = "#000"; ctx.beginPath(); ctx.arc(cx, cy, 44, 0, Math.PI * 2); ctx.fill();
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },
  {
    name: "Nebula Clouds",
    tags: ["space", "cosmic", "ambient"],
    description: "Amorphous gaseous clouds that drift and pulse with color",
    code: `// Large, soft radial gradients drifting slowly
clouds.forEach(c => {
  c.x += cos(t * c.f) * 0.4;
  c.y += sin(t * c.f) * 0.4;
  const g = ctx.createRadialGradient(c.x, c.y, 0, c.x, c.y, c.r);
});`,
    animator: (c, ctx, mouse) => {
      let clouds = [], t = 0, id;
      for (let i = 0; i < 8; i++) {
        clouds.push({ x: Math.random() * c.width, y: Math.random() * c.height, r: Math.random() * 250 + 150, h: Math.random() * 60 + 240, f: Math.random() * 0.02 });
      }
      const loop = () => {
        t += 0.01; ctx.fillStyle = "#00000a"; ctx.fillRect(0, 0, c.width, c.height);
        ctx.globalCompositeOperation = "screen";
        clouds.forEach(cl => {
          cl.x += Math.cos(t * cl.f) * 0.5; cl.y += Math.sin(t * cl.f) * 0.5;
          const g = ctx.createRadialGradient(cl.x, cl.y, 0, cl.x, cl.y, cl.r);
          g.addColorStop(0, `hsla(${cl.h}, 70%, 50%, 0.15)`);
          g.addColorStop(1, "transparent");
          ctx.fillStyle = g; ctx.fillRect(0, 0, c.width, c.height);
        });
        ctx.globalCompositeOperation = "source-over";
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },

  {
    name: "Meteor Shower",
    tags: ["space", "ambient"],
    description: "Occasional streaks of light across the sky",
    code: `// Fast line segments with fading trails
if(rand() < 0.05) meteors.push(new Meteor());
m.x += m.vx; m.y += m.vy;
ctx.lineTo(m.x - m.vx*m.len, m.y - m.vy*m.len);`,
    animator: (c, ctx, mouse) => {
      let ms = [], id;
      const loop = () => {
        ctx.fillStyle = "rgba(0,0,10,0.2)"; ctx.fillRect(0, 0, c.width, c.height);
        if (Math.random() < 0.04) ms.push({ x: Math.random() * c.width, y: 0, v: Math.random() * 12 + 8, len: Math.random() * 10 + 5, a: Math.random() * Math.PI/4 + Math.PI/4 });
        ms = ms.filter(m => {
          m.x += Math.cos(m.a) * m.v; m.y += Math.sin(m.a) * m.v;
          ctx.strokeStyle = "#fff"; ctx.lineWidth = 2; ctx.beginPath();
          ctx.moveTo(m.x, m.y); ctx.lineTo(m.x - Math.cos(m.a)*m.len*2, m.y - Math.sin(m.a)*m.len*2); ctx.stroke();
          return m.x < c.width && m.y < c.height;
        });
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },

  {
    name: "Pulsar",
    tags: ["space", "cosmic"],
    description: "A rotating neutron star emitting beams of radiation",
    code: `// Dual rotating cones with high-frequency strobe
const angle = t * 5;
drawCone(angle); drawCone(angle + PI);
if(sin(t*50) > 0) drawCore();`,
    animator: (c, ctx, mouse) => {
      let t = 0, id;
      const loop = () => {
        t += 0.02; ctx.fillStyle = "#000"; ctx.fillRect(0, 0, c.width, c.height);
        const cx = c.width/2, cy = c.height/2, rot = t * 2;
        [0, Math.PI].forEach(a => {
          const beamA = rot + a;
          const g = ctx.createRadialGradient(cx, cy, 10, cx + Math.cos(beamA)*400, cy + Math.sin(beamA)*400, 100);
          g.addColorStop(0, "rgba(100,200,255,0.6)"); g.addColorStop(1, "transparent");
          ctx.fillStyle = g; ctx.beginPath();
          ctx.moveTo(cx, cy); ctx.arc(cx, cy, 600, beamA - 0.1, beamA + 0.1); ctx.fill();
        });
        ctx.fillStyle = "#fff"; ctx.beginPath(); ctx.arc(cx, cy, 5 + Math.sin(t*20)*2, 0, Math.PI*2); ctx.fill();
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },

  {
    name: "Asteroid Belt",
    tags: ["space", "ambient"],
    description: "Slow-moving, rotating jagged shapes in orbit",
    code: `// Rotating polygons with orbital velocity
a.angle += a.rotationSpeed;
a.orbit += a.speed;
ctx.translate(orbitX, orbitY);
ctx.rotate(a.angle);`,
    animator: (c, ctx, mouse) => {
      let as = [], id;
      for(let i=0; i<40; i++) as.push({ r: Math.random()*200+100, o: Math.random()*Math.PI*2, s: 0.002 + Math.random()*0.003, size: Math.random()*8+4, rot: 0, rs: Math.random()*0.05 });
      const loop = () => {
        ctx.fillStyle = "rgba(5,5,15,0.3)"; ctx.fillRect(0, 0, c.width, c.height);
        const cx = c.width/2, cy = c.height/2;
        as.forEach(a => {
          a.o += a.s; a.rot += a.rs;
          const x = cx + Math.cos(a.o) * a.r * 1.5, y = cy + Math.sin(a.o) * a.r;
          ctx.save(); ctx.translate(x, y); ctx.rotate(a.rot);
          ctx.strokeStyle = "#888"; ctx.strokeRect(-a.size/2, -a.size/2, a.size, a.size);
          ctx.restore();
        });
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },

  {
    name: "Supernova",
    tags: ["space", "cosmic", "mouse"],
    description: "A massive explosion that expands and fades",
    code: `// Exponential expansion + radial shockwave
ring.r *= 1.05;
ring.alpha *= 0.96;
if(ring.alpha < 0.01) reset();`,
    animator: (c, ctx, mouse) => {
      let r = 0, a = 0, id;
      const reset = () => { r = 1; a = 1; };
      reset();
      const loop = () => {
        ctx.fillStyle = "rgba(0,0,0,0.1)"; ctx.fillRect(0, 0, c.width, c.height);
        ctx.strokeStyle = `rgba(255, 200, 100, ${a})`;
        ctx.lineWidth = 10; ctx.beginPath(); ctx.arc(c.width/2, c.height/2, r, 0, Math.PI*2); ctx.stroke();
        r *= 1.08; a *= 0.95;
        if (a < 0.01) reset();
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },

  {
    name: "Solar Wind",
    tags: ["space", "ambient"],
    description: "Flowing particles representing plasma from a star",
    code: `// Flow field moving away from center
p.x += cos(p.angle) * p.speed;
p.y += sin(p.angle) * p.speed;
p.life -= 0.01;`,
    animator: (c, ctx, mouse) => {
      let ps = [], id;
      const loop = () => {
        ctx.fillStyle = "rgba(20, 10, 0, 0.2)"; ctx.fillRect(0, 0, c.width, c.height);
        if(ps.length < 200) ps.push({ a: Math.random()*Math.PI*2, d: 0, s: Math.random()*3+2, l: 1 });
        ps = ps.filter(p => {
          p.d += p.s; p.l -= 0.005;
          const x = c.width/2 + Math.cos(p.a)*p.d, y = c.height/2 + Math.sin(p.a)*p.d;
          ctx.fillStyle = `rgba(255, 150, 50, ${p.l})`;
          ctx.beginPath(); ctx.arc(x, y, 2, 0, Math.PI*2); ctx.fill();
          return p.l > 0;
        });
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },

  {
    name: "Dark Matter Pulse",
    tags: ["space", "cosmic"],
    description: "Invisible forces distorting the starfield background",
    code: `// Sine-based star displacement
const distortion = sin(dist * 0.05 - t);
star.renderX = star.x + cos(star.a) * distortion * 20;`,
    animator: (c, ctx, mouse) => {
      let stars = [], t = 0, id;
      for(let i=0; i<300; i++) stars.push({ x: Math.random()*c.width, y: Math.random()*c.height });
      const loop = () => {
        t += 0.05; ctx.fillStyle = "#000"; ctx.fillRect(0, 0, c.width, c.height);
        stars.forEach(s => {
          const dx = s.x - mouse.x, dy = s.y - mouse.y, dist = Math.hypot(dx, dy);
          const offset = Math.sin(dist * 0.02 - t) * 15;
          ctx.fillStyle = "#fff"; ctx.beginPath(); 
          ctx.arc(s.x + (dx/dist)*offset, s.y + (dy/dist)*offset, 1, 0, Math.PI*2); ctx.fill();
        });
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },

  {
    name: "Satellite Network",
    tags: ["space", "mouse"],
    description: "Small satellites orbiting the mouse in low gravity",
    code: `// Gravity-influenced orbital paths
const acc = getGravity(satellite, mouse);
sat.vx += acc.x; sat.vy += acc.y;
sat.x += sat.vx;`,
    animator: (c, ctx, mouse) => {
      let sats = [], id;
      for(let i=0; i<12; i++) sats.push({ x: Math.random()*c.width, y: Math.random()*c.height, vx: Math.random()*4-2, vy: Math.random()*4-2 });
      const loop = () => {
        ctx.fillStyle = "rgba(0,0,10,0.2)"; ctx.fillRect(0, 0, c.width, c.height);
        sats.forEach(s => {
          const dx = mouse.x - s.x, dy = mouse.y - s.y, d = Math.hypot(dx, dy);
          s.vx += dx / (d*d) * 50; s.vy += dy / (d*d) * 50;
          s.x += s.vx; s.y += s.vy;
          ctx.fillStyle = "#0ff"; ctx.fillRect(s.x-2, s.y-2, 4, 4);
        });
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },

  {
    name: "Event Horizon",
    tags: ["space", "cosmic"],
    description: "Light bending at the edge of a gravitational well",
    code: `// Radial lines sucked into a void
ctx.moveTo(start.x, start.y);
ctx.lineTo(void.x, void.y);
ctx.setLineDash([5, 15]);`,
    animator: (c, ctx, mouse) => {
      let t = 0, id;
      const loop = () => {
        t += 0.02; ctx.fillStyle = "#000"; ctx.fillRect(0, 0, c.width, c.height);
        ctx.strokeStyle = "rgba(255,255,255,0.2)";
        for(let i=0; i<60; i++) {
          const a = (i/60)*Math.PI*2 + t;
          ctx.beginPath(); ctx.moveTo(c.width/2 + Math.cos(a)*500, c.height/2 + Math.sin(a)*500);
          ctx.lineTo(c.width/2 + Math.cos(a)*50, c.height/2 + Math.sin(a)*50); ctx.stroke();
        }
        ctx.fillStyle = "#000"; ctx.beginPath(); ctx.arc(c.width/2, c.height/2, 50, 0, Math.PI*2); ctx.fill();
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },

  {
    name: "Quasar Beam",
    tags: ["space", "cosmic"],
    description: "Intense vertical beam of energy from a galactic core",
    code: `// Vertical bloom with high-speed noise
const beamW = 20 + sin(t*10)*5;
ctx.shadowBlur = 40;
ctx.fillRect(cx - beamW/2, 0, beamW, H);`,
    animator: (c, ctx, mouse) => {
      let t = 0, id;
      const loop = () => {
        t += 0.1; ctx.fillStyle = "#000510"; ctx.fillRect(0, 0, c.width, c.height);
        const cx = c.width/2, bw = 30 + Math.sin(t)*10;
        const g = ctx.createLinearGradient(cx-bw, 0, cx+bw, 0);
        g.addColorStop(0, "transparent"); g.addColorStop(0.5, "rgba(200,220,255,0.8)"); g.addColorStop(1, "transparent");
        ctx.fillStyle = g; ctx.fillRect(cx-bw, 0, bw*2, c.height);
        for(let i=0; i<20; i++) {
          ctx.fillStyle = "white"; ctx.fillRect(cx-bw + Math.random()*bw*2, Math.random()*c.height, 2, 20);
        }
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  }
];
