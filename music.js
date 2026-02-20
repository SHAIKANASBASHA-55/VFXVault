// ─────────────────────────────────────────────────
//  MUSIC EFFECTS
// ─────────────────────────────────────────────────

export const musicEffects = [

{
  name:"Circular Equalizer",
  tags:["music","audio","visualizer"],
  description:"Radial spectrum that pulses like a bass drop",
  code:`// Bar height from sine wave`,
  animator:(c,ctx,mouse)=>{
    let t=0,id;

    const loop=()=>{
      t+=0.05;
      ctx.fillStyle="rgba(0,0,0,0.25)";
      ctx.fillRect(0,0,c.width,c.height);

      const cx=c.width/2, cy=c.height/2;

      for(let i=0;i<80;i++){
        const a=(i/80)*Math.PI*2;
        const amp=30+Math.sin(t*4+i*0.3)*25;

        const x1=cx+Math.cos(a)*100;
        const y1=cy+Math.sin(a)*100;
        const x2=cx+Math.cos(a)*(100+amp);
        const y2=cy+Math.sin(a)*(100+amp);

        ctx.strokeStyle=`hsl(${i*5},100%,60%)`;
        ctx.beginPath();
        ctx.moveTo(x1,y1);
        ctx.lineTo(x2,y2);
        ctx.stroke();
      }

      id=requestAnimationFrame(loop);
    };

    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Beat Rings",
  tags:["music","bass","pulse"],
  description:"Expanding rings on every simulated beat",
  code:`// Pulse = abs(sin(time * bpm))`,
  animator:(c,ctx,mouse)=>{
    let t=0,id;

    const loop=()=>{
      t+=0.08;

      ctx.fillStyle="rgba(0,0,0,0.2)";
      ctx.fillRect(0,0,c.width,c.height);

      const pulse=Math.abs(Math.sin(t));

      ctx.strokeStyle=`rgba(255,0,200,${pulse})`;
      ctx.beginPath();
      ctx.arc(mouse.x,mouse.y,50+pulse*80,0,Math.PI*2);
      ctx.stroke();

      id=requestAnimationFrame(loop);
    };

    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},



{
  name:"Frequency Bars",
  tags:["music","equalizer","spectrum"],
  description:"Classic vertical spectrum analyzer",
  code:`// Height from layered sine waves`,
  animator:(c,ctx)=>{
    let t=0,id;

    const loop=()=>{
      t+=0.05;

      ctx.fillStyle="#000";
      ctx.fillRect(0,0,c.width,c.height);

      for(let i=0;i<c.width;i+=12){
        const h=60+Math.sin(i*0.02+t*4)*50;

        ctx.fillStyle=`hsl(${i*0.3},100%,60%)`;
        ctx.fillRect(i,c.height-h,8,h);
      }

      id=requestAnimationFrame(loop);
    };

    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},
{
  name: "Floating Music Notes",
  tags: ["music", "notes", "peaceful", "ambient", "serene"],
  description: "Gentle musical notes drifting upward like fireflies, pulsing softly to calm rhythms",
  code: `// Slow upward drift + subtle scale pulse`,
  animator: (c, ctx, mouse) => {
    let t = 0, id;
    const notes = [];
    const symbols = ['♪', '♫', '♩', '𝅗𝅥']; // music symbols

    for (let i = 0; i < 40; i++) {
      notes.push({
        x: Math.random() * c.width,
        y: c.height + Math.random() * 200,
        speed: 0.4 + Math.random() * 0.8,
        size: 18 + Math.random() * 22,
        symbol: symbols[Math.floor(Math.random() * symbols.length)],
        hue: 180 + Math.random() * 120 // teal to purple soft
      });
    }

    const loop = () => {
      t += 0.015;
      ctx.fillStyle = "rgba(10, 15, 30, 0.12)"; // very gentle fade
      ctx.fillRect(0, 0, c.width, c.height);

      const pulse = Math.sin(t * 0.8) * 0.3 + 0.7; // slow calm breathing

      notes.forEach(n => {
        n.y -= n.speed * (1 + pulse * 0.4);
        if (n.y < -50) {
          n.y = c.height + 50;
          n.x = Math.random() * c.width;
        }

        // subtle mouse attraction
        const dx = (mouse.x - n.x) * 0.0008;
        const dy = (mouse.y - n.y) * 0.0006;
        n.x += dx;
        n.y += dy;

        ctx.font = `${n.size * pulse}px serif`;
        ctx.fillStyle = `hsla(${n.hue + t * 5}, 70%, 75%, ${0.5 + pulse * 0.5})`;
        ctx.shadowBlur = 12;
        ctx.shadowColor = ctx.fillStyle;
        ctx.fillText(n.symbol, n.x, n.y);
      });

      id = requestAnimationFrame(loop);
    };

    return { start: loop, stop: () => cancelAnimationFrame(id) };
  }
},

{
  name: "Ethereal Wave Veil",
  tags: ["music", "wave", "peaceful", "ambient", "dreamy"],
  description: "Soft horizontal waves flowing like silk curtains, gentle color breathing",
  code: `// Multi-layered slow sine waves`,
  animator: (c, ctx) => {
    let t = 0, id;

    const loop = () => {
      t += 0.008;
      ctx.fillStyle = "rgba(5, 10, 25, 0.08)";
      ctx.fillRect(0, 0, c.width, c.height);

      for (let layer = 0; layer < 5; layer++) {
        const amp = 30 + layer * 15;
        const freq = 0.0008 + layer * 0.0004;
        const hue = 200 + layer * 30 + Math.sin(t * 0.2) * 40;

        ctx.beginPath();
        ctx.strokeStyle = `hsla(${hue}, 60%, 70%, ${0.15 + Math.sin(t + layer) * 0.1})`;
        ctx.lineWidth = 3 + layer;

        for (let x = 0; x < c.width; x += 3) {
          const y = c.height / 2 +
                    Math.sin(x * freq + t * (1 + layer * 0.3)) * amp +
                    Math.cos(x * freq * 1.6 + t * 0.7) * (amp * 0.4);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      id = requestAnimationFrame(loop);
    };

    return { start: loop, stop: () => cancelAnimationFrame(id) };
  }
},

{
  name: "Soft Glow Orbs",
  tags: ["music", "orbs", "calm", "peaceful", "particles"],
  description: "Floating glowing orbs that slowly breathe and drift, mouse pulls gently",
  code: `// Breathing scale + attraction`,
  animator: (c, ctx, mouse) => {
    let t = 0, id;
    const orbs = [];

    for (let i = 0; i < 25; i++) {
      orbs.push({
        x: Math.random() * c.width,
        y: Math.random() * c.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        baseR: 20 + Math.random() * 40
      });
    }

    const loop = () => {
      t += 0.012;
      ctx.fillStyle = "rgba(0, 8, 20, 0.15)";
      ctx.fillRect(0, 0, c.width, c.height);

      const breath = Math.sin(t * 0.6) * 0.15 + 0.85;

      orbs.forEach(o => {
        o.x += o.vx;
        o.y += o.vy;

        if (o.x < 0 || o.x > c.width) o.vx *= -1;
        if (o.y < 0 || o.y > c.height) o.vy *= -1;

        // gentle mouse gravity
        const dx = mouse.x - o.x;
        const dy = mouse.y - o.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 300) {
          o.x += dx * 0.0008 * (300 - dist);
          o.y += dy * 0.0008 * (300 - dist);
        }

        const r = o.baseR * (1 + breath * 0.4 + Math.sin(t * 3 + o.x * 0.01) * 0.1);

        const grad = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, r * 1.8);
        grad.addColorStop(0, `hsla(${t * 8 + o.x * 0.2}, 80%, 75%, 0.9)`);
        grad.addColorStop(0.5, `hsla(${t * 8 + o.x * 0.2 + 60}, 70%, 60%, 0.4)`);
        grad.addColorStop(1, "transparent");

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(o.x, o.y, r * 1.8, 0, Math.PI * 2);
        ctx.fill();
      });

      id = requestAnimationFrame(loop);
    };

    return { start: loop, stop: () => cancelAnimationFrame(id) };
  }
},

{
  name: "Peaceful Ripple Pond",
  tags: ["music", "ripple", "calm", "zen", "ambient"],
  description: "Soft expanding ripples from center, like drops in a still pond with subtle glow",
  code: `// Concentric slow-expanding circles`,
  animator: (c, ctx, mouse) => {
    let t = 0, id;
    let ripples = [];

    const loop = () => {
      t += 0.018;
      ctx.fillStyle = "rgba(0, 20, 40, 0.1)";
      ctx.fillRect(0, 0, c.width, c.height);

      const cx = mouse.x || c.width / 2;
      const cy = mouse.y || c.height / 2;

      // occasional new ripple
      if (Math.sin(t * 1.2) > 0.98) {
        ripples.push({ radius: 0, alpha: 0.6 });
      }

      ripples = ripples.filter(r => r.radius < Math.max(c.width, c.height) * 1.2);

      ripples.forEach(r => {
        r.radius += 1.8 + Math.sin(t * 2) * 0.5;
        r.alpha *= 0.992;

        ctx.strokeStyle = `hsla(200 + t * 10, 60%, 80%, ${r.alpha})`;
        ctx.lineWidth = 3 + r.alpha * 6;
        ctx.shadowBlur = 30;
        ctx.shadowColor = ctx.strokeStyle;

        ctx.beginPath();
        ctx.arc(cx, cy, r.radius, 0, Math.PI * 2);
        ctx.stroke();
      });

      id = requestAnimationFrame(loop);
    };

    return { start: loop, stop: () => cancelAnimationFrame(id) };
  }
},

{
  name:"Tempo Particles",
  tags:["music","tempo","motion"],
  description:"Particles speed up and slow down with BPM",
  code:`// Speed = tempo pulse`,
  animator:(c,ctx)=>{
    let ps=[],t=0,id;

    for(let i=0;i<100;i++)
      ps.push({x:Math.random()*c.width,y:Math.random()*c.height});

    const loop=()=>{
      t+=0.06;
      const speed=1+Math.abs(Math.sin(t))*4;

      ctx.fillStyle="rgba(0,0,0,0.2)";
      ctx.fillRect(0,0,c.width,c.height);

      ps.forEach(p=>{
        p.y+=speed;
        if(p.y>c.height) p.y=0;

        ctx.fillStyle="#0ff";
        ctx.fillRect(p.x,p.y,2,2);
      });

      id=requestAnimationFrame(loop);
    };

    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Stereo Split",
  tags:["music","stereo","wave"],
  description:"Left and right channels move independently",
  code:`// Two mirrored wave systems`,
  animator:(c,ctx)=>{
    let t=0,id;

    const loop=()=>{
      t+=0.07;

      ctx.fillStyle="rgba(0,0,0,0.2)";
      ctx.fillRect(0,0,c.width,c.height);

      for(let x=0;x<c.width;x+=10){

        ctx.fillStyle="#ff2bd6";
        ctx.fillRect(x,c.height/2+Math.sin(x*0.02+t)*40,4,4);

        ctx.fillStyle="#00ffd0";
        ctx.fillRect(x,c.height/2+Math.sin(x*0.02-t)*40,4,4);
      }

      id=requestAnimationFrame(loop);
    };

    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},
  // ... your existing ones ...

  {
    name: "Orbital Frequency Rings",
    tags: ["music", "orbit", "spectrum", "neon"],
    description: "Multiple orbiting rings pulsing with layered frequencies",
    code: `// Radius & opacity from combined sines`,
    animator: (c, ctx, mouse) => {
      let t = 0, id;

      const loop = () => {
        t += 0.04;
        ctx.fillStyle = "rgba(0,0,0,0.18)";
        ctx.fillRect(0, 0, c.width, c.height);

        const cx = mouse.x || c.width / 2;
        const cy = mouse.y || c.height / 2;

        for (let ring = 0; ring < 5; ring++) {
          const baseR = 60 + ring * 45;
          const phase = t * (1.2 + ring * 0.7) + ring * 1.6;
          const pulse = Math.sin(phase) * 0.5 + 0.5;
          const r = baseR + Math.sin(t * 3 + ring * 2) * 30 * pulse;

          ctx.save();
          ctx.translate(cx, cy);
          ctx.rotate(t * (0.4 + ring * 0.15));

          ctx.strokeStyle = `hsla(${ring * 70 + t * 30}, 100%, 65%, ${0.4 + pulse * 0.6})`;
          ctx.lineWidth = 3 + pulse * 6;
          ctx.shadowBlur = 25;
          ctx.shadowColor = `hsla(${ring * 70}, 100%, 60%, 0.7)`;

          ctx.beginPath();
          ctx.arc(0, 0, r, 0, Math.PI * 2);
          ctx.stroke();

          // small orbiting dot
          const dotA = t * 5 + ring * 3;
          const dotX = Math.cos(dotA) * (r + 15);
          const dotY = Math.sin(dotA) * (r + 15);
          ctx.fillStyle = "#fff";
          ctx.beginPath();
          ctx.arc(dotX, dotY, 4 + pulse * 5, 0, Math.PI * 2);
          ctx.fill();

          ctx.restore();
        }

        id = requestAnimationFrame(loop);
      };

      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },

  {
    name: "Metaball Clusters",
    tags: ["music", "blob", "organic", "gooey"],
    description: "Soft merging metaballs that throb to simulated bass",
    code: `// Influence from distance + pulse`,
    animator: (c, ctx, mouse) => {
      let t = 0, id;
      const blobs = [];
      for (let i = 0; i < 6; i++) {
        blobs.push({
          x: Math.random() * c.width,
          y: Math.random() * c.height,
          vx: (Math.random() - 0.5) * 1.2,
          vy: (Math.random() - 0.5) * 1.2,
          baseR: 40 + Math.random() * 50
        });
      }

      const loop = () => {
        t += 0.06;
        ctx.fillStyle = "rgba(8,8,18,0.25)";
        ctx.fillRect(0, 0, c.width, c.height);

        const pulse = Math.pow(Math.abs(Math.sin(t * 5)), 1.5) * 0.8 + 0.2;

        blobs.forEach(b => {
          b.x += b.vx * (1 + pulse * 2);
          b.y += b.vy * (1 + pulse * 2);
          if (b.x < 0 || b.x > c.width) b.vx *= -1;
          if (b.y < 0 || b.y > c.height) b.vy *= -1;

          // draw soft glow blob
          const grad = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.baseR * (1.4 + pulse * 0.6));
          grad.addColorStop(0, `hsla(${t*20 + b.x*0.3}, 100%, 60%, 0.9)`);
          grad.addColorStop(0.6, `hsla(${t*20 + b.x*0.3 + 40}, 80%, 50%, 0.4)`);
          grad.addColorStop(1, "transparent");

          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(b.x, b.y, b.baseR * (1.8 + pulse), 0, Math.PI * 2);
          ctx.fill();
        });

        id = requestAnimationFrame(loop);
      };

      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },

  {
    name: "Glitch Pulse Grid",
    tags: ["music", "glitch", "cyber", "distortion"],
    description: "Digital grid with glitchy beat-synced distortions",
    code: `// Random displacement on strong beats`,
    animator: (c, ctx) => {
      let t = 0, id;

      const loop = () => {
        t += 0.07;
        ctx.fillStyle = "rgba(0,0,0,0.4)";
        ctx.fillRect(0, 0, c.width, c.height);

        const beat = Math.abs(Math.sin(t * 8)) > 0.85 ? 1 : 0;
        const glitch = beat * (Math.random() * 20 + 10);

        for (let x = 0; x < c.width; x += 40) {
          for (let y = 0; y < c.height; y += 40) {
            const phase = Math.sin(t * 3 + (x + y) * 0.01);
            const intensity = (phase * 0.5 + 0.5) * (1 + beat * 2);

            ctx.fillStyle = `hsl(${(x * 0.2 + y * 0.1 + t * 50) % 360}, 90%, ${40 + intensity * 40}%)`;

            const dx = beat ? (Math.random() - 0.5) * glitch : 0;
            const dy = beat ? (Math.random() - 0.5) * glitch : 0;

            ctx.fillRect(x + dx, y + dy, 32, 32);
          }
        }

        // occasional RGB split
        if (beat > 0.9) {
          ctx.globalAlpha = 0.4;
          ctx.drawImage(c, -8, 2);
          ctx.globalAlpha = 0.3;
          ctx.drawImage(c, 6, -4);
          ctx.globalAlpha = 1;
        }

        id = requestAnimationFrame(loop);
      };

      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },

  {
    name: "Ripple Horizon",
    tags: ["music", "wave", "horizon", "atmospheric"],
    description: "Endless rippling horizon line reacting to bass drops",
    code: `// Displacement from multiple waves`,
    animator: (c, ctx) => {
      let t = 0, id;

      const loop = () => {
        t += 0.035;
        ctx.fillStyle = "rgba(0,0,20,0.22)";
        ctx.fillRect(0, 0, c.width, c.height);

        const bass = Math.abs(Math.sin(t * 4.5)) * 80 + 20;

        ctx.save();
        ctx.translate(0, c.height * 0.6);

        ctx.shadowBlur = 30;
        ctx.shadowColor = "#0ff";

        for (let i = -2; i <= 2; i++) {
          ctx.beginPath();
          ctx.strokeStyle = `hsla(${t * 20 + i * 60}, 100%, 65%, ${0.5 + Math.abs(i) * 0.1})`;
          ctx.lineWidth = 5 - Math.abs(i);

          for (let x = 0; x < c.width; x += 4) {
            const nx = x / c.width * Math.PI * 4;
            const y = Math.sin(nx * 1.5 + t * 3 + i * 2) * (bass + 30) +
                      Math.sin(nx * 3 + t * 7) * 20 +
                      Math.sin(nx * 0.8 + t * 1.2) * 40;
            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.stroke();
        }

        ctx.restore();

        id = requestAnimationFrame(loop);
      };

      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },

  {
    name: "Neon Particle Explosion",
    tags: ["music", "particles", "explosion", "energy"],
    description: "Particles burst outward on simulated drops",
    code: `// Emit particles on beat peaks`,
    animator: (c, ctx, mouse) => {
      let t = 0, id;
      let particles = [];

      const emit = (count = 20) => {
        const cx = mouse.x || c.width / 2;
        const cy = mouse.y || c.height / 2;
        for (let i = 0; i < count; i++) {
          const a = Math.random() * Math.PI * 2;
          const speed = 2 + Math.random() * 5;
          particles.push({
            x: cx, y: cy,
            vx: Math.cos(a) * speed,
            vy: Math.sin(a) * speed,
            life: 1,
            hue: Math.random() * 60 + t * 20
          });
        }
      };

      const loop = () => {
        t += 0.05;
        ctx.fillStyle = "rgba(0,0,0,0.25)";
        ctx.fillRect(0, 0, c.width, c.height);

        const beat = Math.sin(t * 6) > 0.7 && Math.sin((t - 0.05) * 6) <= 0.7;
        if (beat) emit(35 + Math.random() * 20);

        particles = particles.filter(p => p.life > 0.02);
        particles.forEach(p => {
          p.x += p.vx;
          p.y += p.vy;
          p.life *= 0.96;
          p.vx *= 0.98;
          p.vy *= 0.98;

          ctx.fillStyle = `hsla(${p.hue % 360}, 100%, 70%, ${p.life * 1.2})`;
          ctx.shadowBlur = 15;
          ctx.shadowColor = ctx.fillStyle;
          ctx.fillRect(p.x - 2, p.y - 2, 4, 4);
        });

        id = requestAnimationFrame(loop);
      };

      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  }
];