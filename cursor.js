// ─────────────────────────────────────────────────
//  CURSOR EFFECTS
// ─────────────────────────────────────────────────

export const cursorEffects = [

{
  name:"Cursor Pulse",
  tags:["cursor","pulse","energy"],
  description:"Expanding energy pulse on cursor position",
  code:`// Radius grows and fades`,
  animator:(c,ctx,mouse)=>{
    let rings=[],id;

    const loop=()=>{
      ctx.fillStyle="rgba(0,0,0,0.25)";
      ctx.fillRect(0,0,c.width,c.height);

      rings.push({r:0});

      rings.forEach((ring,i)=>{
        ring.r+=3;

        ctx.strokeStyle=`rgba(0,255,200,${1-ring.r/120})`;
        ctx.beginPath();
        ctx.arc(mouse.x,mouse.y,ring.r,0,Math.PI*2);
        ctx.stroke();

        if(ring.r>120) rings.splice(i,1);
      });

      id=requestAnimationFrame(loop);
    };

    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},





{
  name:"Pixel Scatter",
  tags:["cursor","glitch","pixel"],
  description:"Cursor breaks into pixel fragments when moving fast",
  code:`// Spawn particles based on movement speed`,
  animator:(c,ctx,mouse)=>{
    let ps=[],last={x:0,y:0},id;

    const loop=()=>{
      ctx.fillStyle="rgba(0,0,0,0.25)";
      ctx.fillRect(0,0,c.width,c.height);

      const speed=Math.hypot(mouse.x-last.x,mouse.y-last.y);

      if(speed>5){
        for(let i=0;i<5;i++)
          ps.push({x:mouse.x,y:mouse.y,vx:(Math.random()-.5)*4,vy:(Math.random()-.5)*4,life:1});
      }

      ps.forEach((p,i)=>{
        p.x+=p.vx;
        p.y+=p.vy;
        p.life-=0.03;

        ctx.fillStyle=`rgba(0,255,255,${p.life})`;
        ctx.fillRect(p.x,p.y,2,2);

        if(p.life<=0) ps.splice(i,1);
      });

      last.x=mouse.x;
      last.y=mouse.y;

      id=requestAnimationFrame(loop);
    };

    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Gravity Well",
  tags:["cursor","distortion","space"],
  description:"Space bends around the cursor",
  code:`// Radial gradient warp`,
  animator:(c,ctx,mouse)=>{
    let id;

    const loop=()=>{
      ctx.fillStyle="rgba(0,0,20,0.3)";
      ctx.fillRect(0,0,c.width,c.height);

      const g=ctx.createRadialGradient(mouse.x,mouse.y,10,mouse.x,mouse.y,120);
      g.addColorStop(0,"rgba(255,255,255,0.3)");
      g.addColorStop(1,"transparent");

      ctx.fillStyle=g;
      ctx.beginPath();
      ctx.arc(mouse.x,mouse.y,120,0,Math.PI*2);
      ctx.fill();

      id=requestAnimationFrame(loop);
    };

    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},



{
  name:"Shockwave Click",
  tags:["cursor","click","wave"],
  description:"Shockwave emitted on click",
  code:`// Spawn ring on mousedown`,
  animator:(c,ctx,mouse)=>{
    let rings=[],id;

    const click=()=>rings.push({r:0});
    window.addEventListener("mousedown",click);

    const loop=()=>{
      ctx.fillStyle="rgba(0,0,0,0.25)";
      ctx.fillRect(0,0,c.width,c.height);

      rings.forEach((r,i)=>{
        r.r+=6;

        ctx.strokeStyle=`rgba(255,255,255,${1-r.r/200})`;
        ctx.beginPath();
        ctx.arc(mouse.x,mouse.y,r.r,0,Math.PI*2);
        ctx.stroke();

        if(r.r>200) rings.splice(i,1);
      });

      id=requestAnimationFrame(loop);
    };

    return{
      start:loop,
      stop:()=>{
        window.removeEventListener("mousedown",click);
        cancelAnimationFrame(id);
      }
    };
  }
},


  {
    name: "Neon Comet Trail",
    tags: ["cursor", "neon", "trail", "glow"],
    description: "Vibrant glowing comet tail with color shift & smooth fade",
    code: `// Particle trail with hue rotation & velocity decay`,
    animator: (c, ctx, mouse) => {
      let t = 0, id;
      let particles = [];

      const loop = () => {
        t += 0.016;
        ctx.fillStyle = "rgba(0,0,0,0.12)"; // gentle persistent fade
        ctx.fillRect(0, 0, c.width, c.height);

        // add new particle at cursor
        particles.push({
          x: mouse.x,
          y: mouse.y,
          vx: (Math.random() - 0.5) * 1.2,
          vy: (Math.random() - 0.5) * 1.2,
          life: 1,
          hue: t * 60 % 360
        });

        // limit count for perf
        if (particles.length > 80) particles.shift();

        particles.forEach((p, i) => {
          p.x += p.vx;
          p.y += p.vy;
          p.life -= 0.012;
          p.vx *= 0.98;
          p.vy *= 0.98;

          if (p.life <= 0.05) {
            particles.splice(i, 1);
            return;
          }

          const size = 3 + p.life * 6;
          const alpha = p.life * p.life; // quadratic fade = smoother

          ctx.shadowBlur = 20;
          ctx.shadowColor = `hsla(${p.hue}, 100%, 65%, ${alpha * 1.2})`;

          const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, size * 2);
          grad.addColorStop(0, `hsla(${p.hue}, 100%, 80%, ${alpha})`);
          grad.addColorStop(1, "transparent");

          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(p.x, p.y, size * 2, 0, Math.PI * 2);
          ctx.fill();
        });

        id = requestAnimationFrame(loop);
      };

      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },

  {
    name: "Fluid Magnetic Particles",
    tags: ["cursor", "magnetic", "particles", "fluid"],
    description: "Particles swarm & follow cursor with smooth attraction & repulsion",
    code: `// Spring-like force toward cursor`,
    animator: (c, ctx, mouse) => {
      let id;
      const particles = [];
      const count = 60;

      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * c.width,
          y: Math.random() * c.height,
          vx: 0,
          vy: 0,
          baseHue: Math.random() * 360
        });
      }

      const loop = () => {
        ctx.fillStyle = "rgba(5,5,25,0.18)";
        ctx.fillRect(0, 0, c.width, c.height);

        particles.forEach(p => {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.hypot(dx, dy) + 1; // avoid div0

          const force = 120 / dist;
          p.vx += dx / dist * force * 0.8;
          p.vy += dy / dist * force * 0.8;

          p.vx *= 0.92; // damping
          p.vy *= 0.92;

          p.x += p.vx;
          p.y += p.vy;

          // wrap around edges
          if (p.x < 0) p.x += c.width;
          if (p.x > c.width) p.x -= c.width;
          if (p.y < 0) p.y += c.height;
          if (p.y > c.height) p.y -= c.height;

          const hue = (p.baseHue + Math.atan2(p.vy, p.vx) * 30) % 360;
          ctx.shadowBlur = 15;
          ctx.shadowColor = `hsla(${hue}, 90%, 65%, 0.7)`;

          ctx.fillStyle = `hsla(${hue}, 90%, 70%, 0.9)`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, 2.5 + Math.hypot(p.vx, p.vy) * 0.8, 0, Math.PI * 2);
          ctx.fill();
        });

        id = requestAnimationFrame(loop);
      };

      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },

{
  name: "Smooth Ribbon Flow",
  tags: ["cursor", "ribbon", "smooth", "bezier", "glow"],
  description: "Silky flowing ribbon with quadratic curves, rounded edges & layered glow",
  code: `// Improved bezier ribbon with safe fallback & glow`,
  animator: (c, ctx, mouse) => {
    let trail = [], id;

    const loop = () => {
      ctx.fillStyle = "rgba(0,0,0,0.14)";
      ctx.fillRect(0, 0, c.width, c.height);

      trail.push({ x: mouse.x, y: mouse.y });
      if (trail.length > 60) trail.shift(); // longer trail = smoother

      if (trail.length < 2) {
        id = requestAnimationFrame(loop);
        return;
      }

      // Main colorful ribbon with glow
      ctx.shadowBlur = 20;
      ctx.shadowColor = "rgba(255, 0, 180, 0.7)";
      ctx.strokeStyle = "rgba(255, 0, 180, 0.85)";
      ctx.lineWidth = 8;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      ctx.beginPath();
      ctx.moveTo(trail[0].x, trail[0].y);

      if (trail.length < 4) {
        // Fallback: simple polyline for very beginning
        for (let i = 1; i < trail.length; i++) {
          ctx.lineTo(trail[i].x, trail[i].y);
        }
      } else {
        // Quadratic curves for smoothness
        for (let i = 1; i < trail.length - 2; i++) {
          const xc = (trail[i].x + trail[i + 1].x) / 2;
          const yc = (trail[i].y + trail[i + 1].y) / 2;
          ctx.quadraticCurveTo(trail[i].x, trail[i].y, xc, yc);
        }
        // Last segment
        const last = trail.length - 1;
        const prev = last - 1;
        ctx.quadraticCurveTo(
          trail[prev].x, trail[prev].y,
          trail[last].x, trail[last].y
        );
      }

      ctx.stroke();

      // Subtle highlight inner line
      ctx.shadowBlur = 0;
      ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
      ctx.lineWidth = 3;
      ctx.stroke();  // re-stroke same path with thinner white

      id = requestAnimationFrame(loop);
    };

    return { start: loop, stop: () => cancelAnimationFrame(id) };
  }
},
{
  name: "Aurora Trail Glow",
  tags: ["cursor", "aurora", "trail", "ethereal", "glow"],
  description: "Long, flowing aurora-like trail with shifting colors and gentle waves",
  code: `// Multi-layer trailing aurora with fallback drawing`,
  animator: (c, ctx, mouse) => {
    let trail = [], id, t = 0;

    const loop = () => {
      t += 0.025; // slightly faster for better visibility
      ctx.fillStyle = "rgba(0, 0, 20, 0.18)"; // stronger fade - makes it visible faster
      ctx.fillRect(0, 0, c.width, c.height);

      // Add current position every frame
      trail.push({ x: mouse.x, y: mouse.y, time: t });

      // Keep trail reasonably long but not infinite
      if (trail.length > 140) trail.shift();

      if (trail.length < 2) {
        id = requestAnimationFrame(loop);
        return;
      }

      // Draw layered aurora bands
      for (let layer = 0; layer < 4; layer++) { // one extra layer for depth
        const offset = layer * 5 - 7; // centered around trail
        const alphaBase = 0.28 - layer * 0.07;
        const width = 22 - layer * 5;

        ctx.beginPath();

        // Start point
        ctx.moveTo(trail[0].x, trail[0].y + offset);

        if (trail.length < 5) {
          // Short trail: simple line (visible immediately)
          for (let i = 1; i < trail.length; i++) {
            ctx.lineTo(trail[i].x, trail[i].y + offset);
          }
        } else {
          // Longer trail: smooth waves
          for (let i = 1; i < trail.length; i++) {
            const p = trail[i];
            const age = t - p.time;
            const wave = Math.sin(age * 8 + i * 0.4 + layer * 1.2) * (10 - layer * 2);
            ctx.lineTo(p.x, p.y + wave + offset);
          }
        }

        const hue = (t * 45 + layer * 90) % 360; // faster color shift
        ctx.strokeStyle = `hsla(${hue}, 95%, 68%, ${alphaBase})`;
        ctx.lineWidth = width;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";

        ctx.shadowBlur = 40;
        ctx.shadowColor = `hsla(${hue}, 100%, 65%, 0.65)`;

        ctx.stroke();
      }

      // Optional subtle core highlight line
      ctx.shadowBlur = 0;
      ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(trail[0].x, trail[0].y);
      for (let i = 1; i < trail.length; i++) {
        ctx.lineTo(trail[i].x, trail[i].y);
      }
      ctx.stroke();

      id = requestAnimationFrame(loop);
    };

    return { start: loop, stop: () => cancelAnimationFrame(id) };
  }
},
{
  name: "Sparkle Dust Follow",
  tags: ["cursor", "sparkle", "particles", "magic", "follow"],
  description: "Magical sparkling dust cloud that trails and twinkles behind cursor",
  code: `// Follow particles with random size & twinkle`,
  animator: (c, ctx, mouse) => {
    let particles = [], id;

    const loop = () => {
      ctx.fillStyle = "rgba(0,0,0,0.2)";
      ctx.fillRect(0, 0, c.width, c.height);

      // emit 2-3 new particles each frame
      for (let i = 0; i < 2 + Math.random() * 2; i++) {
        particles.push({
          x: mouse.x + (Math.random() - 0.5) * 12,
          y: mouse.y + (Math.random() - 0.5) * 12,
          vx: (Math.random() - 0.5) * 1.8,
          vy: (Math.random() - 0.5) * 1.8,
          life: 0.8 + Math.random() * 0.6,
          twinkle: Math.random() * Math.PI * 2
        });
      }

      if (particles.length > 180) particles.splice(0, particles.length - 180);

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.008;
        p.vx *= 0.985;
        p.vy *= 0.985;

        if (p.life <= 0.05) {
          particles.splice(i, 1);
          return;
        }

        const size = 1.5 + Math.sin(p.twinkle + p.life * 20) * 1.2 + p.life * 2;
        const alpha = p.life * (0.6 + Math.sin(p.twinkle + Date.now() * 0.01) * 0.4);

        ctx.shadowBlur = 10;
        ctx.shadowColor = "#fff8e1";
        ctx.fillStyle = `rgba(255, 240, 180, ${alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fill();
      });

      id = requestAnimationFrame(loop);
    };

    return { start: loop, stop: () => cancelAnimationFrame(id) };
  }
},
{
  name: "Liquid Metal Drop",
  tags: ["cursor", "liquid", "metal", "blob", "distortion"],
  description: "Shiny mercury-like blob follows cursor with subtle ripples",
  code: `// Blob with radial gradient & ripple effect`,
  animator: (c, ctx, mouse) => {
    let t = 0, id;

    const loop = () => {
      t += 0.035;
      ctx.fillStyle = "rgba(0,0,0,0.25)";
      ctx.fillRect(0, 0, c.width, c.height);

      const cx = mouse.x, cy = mouse.y;
      const baseR = 28 + Math.sin(t * 4) * 4;

      // outer ripple glow
      for (let i = 0; i < 4; i++) {
        const r = baseR + 15 + i * 12 + Math.sin(t * 3 + i * 2) * 8;
        const alpha = 0.25 - i * 0.06;

        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(180, 220, 255, ${alpha})`;
        ctx.lineWidth = 3;
        ctx.stroke();
      }

      // main liquid blob
      const grad = ctx.createRadialGradient(cx - 8, cy - 8, 5, cx, cy, baseR * 1.6);
      grad.addColorStop(0, "rgba(240,255,255,0.95)");
      grad.addColorStop(0.4, "rgba(180,220,255,0.85)");
      grad.addColorStop(0.7, "rgba(100,160,220,0.7)");
      grad.addColorStop(1, "rgba(40,80,140,0.4)");

      ctx.shadowBlur = 40;
      ctx.shadowColor = "rgba(120, 200, 255, 0.6)";

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx, cy, baseR * 1.4, 0, Math.PI * 2);
      ctx.fill();

      // tiny highlight sparkle
      ctx.shadowBlur = 0;
      ctx.fillStyle = "rgba(255,255,255,0.7)";
      ctx.beginPath();
      ctx.arc(cx - 10 + Math.sin(t*6)*2, cy - 10 + Math.cos(t*6)*2, 6, 0, Math.PI * 2);
      ctx.fill();

      id = requestAnimationFrame(loop);
    };

    return { start: loop, stop: () => cancelAnimationFrame(id) };
  }
},

  {
    name: "Orbital Glow Nodes",
    tags: ["cursor", "orbit", "glow", "cyber"],
    description: "Glowing nodes orbit cursor with dynamic radius & color pulse",
    code: `// Orbiting dots with breathing radius`,
    animator: (c, ctx, mouse) => {
      let t = 0, id;
      const nodes = 16;

      const loop = () => {
        t += 0.025;
        ctx.fillStyle = "rgba(0,0,10,0.22)";
        ctx.fillRect(0, 0, c.width, c.height);

        const pulse = Math.sin(t * 2) * 0.3 + 0.7;
        const radius = 50 + Math.sin(t * 0.8) * 20;

        for (let i = 0; i < nodes; i++) {
          const angle = t * 1.2 + (i / nodes) * Math.PI * 2;
          const x = mouse.x + Math.cos(angle) * radius * (0.8 + pulse * 0.4);
          const y = mouse.y + Math.sin(angle) * radius * (0.8 + pulse * 0.4);

          const hue = (t * 40 + i * 25) % 360;

          ctx.shadowBlur = 30;
          ctx.shadowColor = `hsla(${hue}, 100%, 65%, 0.8)`;

          const grad = ctx.createRadialGradient(x, y, 0, x, y, 12);
          grad.addColorStop(0, `hsla(${hue}, 100%, 80%, 1)`);
          grad.addColorStop(1, "transparent");

          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(x, y, 12, 0, Math.PI * 2);
          ctx.fill();
        }

        id = requestAnimationFrame(loop);
      };

      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  }

];