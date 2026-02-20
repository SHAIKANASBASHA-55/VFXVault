// ─────────────────────────────────────────────────
//  CYBER, TECH & RETRO EFFECTS
// ─────────────────────────────────────────────────

export const cyberEffects = [
  {
    name: "Matrix Rain",
    tags: ["cyber", "retro", "glitch"],
    description: "Katakana rain; mouse proximity turns gold",
    code: `// Katakana chars (0x30A0 range) rain down
ctx.fillStyle = dist < 120
  ? \`hsl(30+rand*20, 75%, 58%)\`  // gold near mouse
  : \`hsl(120, 55%, 38%)\`;         // green otherwise
ctx.fillText(char, x, y);`,
    animator: (c, ctx, mouse) => {
      const fs = 16, cols = Math.floor(c.width / fs);
      let drops = new Array(cols).fill(1), id;
      const loop = () => {
        ctx.fillStyle = "rgba(0,0,0,0.05)"; ctx.fillRect(0, 0, c.width, c.height);
        ctx.font = fs + "px 'IBM Plex Mono',monospace";
        for (let i = 0; i < cols; i++) {
          const text = String.fromCharCode(0x30A0 + Math.floor(Math.random() * 96)), x = i * fs, y = drops[i] * fs;
          const dist = Math.hypot(x - mouse.x, y - mouse.y);
          ctx.fillStyle = dist < 120 ? `hsl(${30 + Math.random() * 20},75%,58%)` : `hsl(120,55%,38%)`;
          ctx.fillText(text, x, y);
          if (y > c.height && Math.random() > .975) drops[i] = 0;
          drops[i]++;
        }
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },

  {
    name: "DNA Helix",
    tags: ["cyber", "ambient"],
    description: "Rotating double helix with rungs; mouse X shifts center",
    code: `// Two offset sine waves + cross-links
const x1 = cx + sin(angle + t*PI*8)*radius;
const x2 = cx + sin(angle + PI + t*PI*8)*radius;
// rungs every 12 segments
ctx.moveTo(x1, y); ctx.lineTo(x2, y);`,
    animator: (c, ctx, mouse) => {
      let angle = 0, id;
      const loop = () => {
        angle += 0.022; ctx.fillStyle = "rgba(0,0,0,0.09)"; ctx.fillRect(0, 0, c.width, c.height);
        const cx = mouse.x * 0.2 + c.width / 2 * 0.8, radius = 100 + Math.sin(angle * .4) * 30 + (mouse.y / c.height - .5) * 55, seg = 180;
        ctx.strokeStyle = "rgba(190,110,70,0.82)"; ctx.lineWidth = 2.5; ctx.beginPath();
        for (let i = 0; i <= seg; i++) { const t = i / seg, y = c.height * .05 + t * c.height * .9, x = cx + Math.sin(angle + t * Math.PI * 8) * radius; i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y); }
        ctx.stroke();
        ctx.strokeStyle = "rgba(70,130,190,0.82)"; ctx.beginPath();
        for (let i = 0; i <= seg; i++) { const t = i / seg, y = c.height * .05 + t * c.height * .9, x = cx + Math.sin(angle + Math.PI + t * Math.PI * 8) * radius; i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y); }
        ctx.stroke();
        ctx.strokeStyle = "rgba(180,160,130,0.28)"; ctx.lineWidth = 1;
        for (let i = 0; i < seg; i += 12) { const t = i / seg, y = c.height * .05 + t * c.height * .9, x1 = cx + Math.sin(angle + t * Math.PI * 8) * radius, x2 = cx + Math.sin(angle + Math.PI + t * Math.PI * 8) * radius; ctx.beginPath(); ctx.moveTo(x1, y); ctx.lineTo(x2, y); ctx.stroke(); }
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },

  {
    name: "Plasma Field",
    tags: ["cyber", "retro", "ambient"],
    description: "Classic plasma effect with mouse-influenced wave node",
    code: `// Per-pixel sine sum → RGB mapping
const v = sin(x*.012+t) + sin((x+y)*.015+t*1.3)
        + cos(hypot(x/W-mx, y/H-my)*8+t)*0.6;
pixel[i] = sin(v*PI)*127+128; // R channel`,
    animator: (c, ctx, mouse) => {
      let time = 0, id;
      const loop = () => {
        time += 0.018;
        const idata = ctx.createImageData(c.width, c.height), d = idata.data, mx = mouse.x / c.width, my = mouse.y / c.height;
        for (let y = 0; y < c.height; y += 2) for (let x = 0; x < c.width; x += 2) {
          const idx = (y * c.width + x) * 4;
          const v1 = Math.sin(x * .012 + time) + Math.sin((x + y) * .015 + time * 1.3);
          const v2 = Math.sin(y * .012 + time * .7) + Math.cos((x - y) * .018 + time * 1.1);
          const vm = Math.sin(Math.hypot(x / c.width - mx, y / c.height - my) * 8 + time) * .6;
          const v = (v1 + v2 + vm) * .4 + 1;
          d[idx] = Math.sin(v * Math.PI) * 127 + 128; d[idx + 1] = Math.sin(v * Math.PI + 2) * 127 + 128; d[idx + 2] = Math.sin(v * Math.PI + 4) * 127 + 128; d[idx + 3] = 255;
        }
        ctx.putImageData(idata, 0, 0); id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },

  {
    name: "Lightning Arcs",
    tags: ["fire", "cyber"],
    description: "Fractal recursive lightning branches toward cursor",
    code: `// Recursive midpoint displacement
function draw(x1,y1,x2,y2,depth){
  if(depth>6) return;
  const mx = (x1+x2)/2 + rand()*len*0.4;
  draw(x1,y1,mx,my,d+1);
  draw(mx,my,x2,y2,d+1);
  if(rand()<0.25) drawBranch(); // fork
}`,
    animator: (c, ctx, mouse) => {
      let id;
      const draw = (x1, y1, x2, y2, d = 0) => {
        if (d > 6) return;
        const dx = x2 - x1, dy = y2 - y1, len = Math.hypot(dx, dy);
        if (len < 8) { ctx.strokeStyle = `rgba(210,225,255,${.65 + Math.random() * .3})`; ctx.lineWidth = 2.5 - d * .3; ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke(); return; }
        const mx = (x1 + x2) / 2 + (Math.random() - .5) * len * .4, my = (y1 + y2) / 2 + (Math.random() - .5) * len * .4;
        draw(x1, y1, mx, my, d + 1); draw(mx, my, x2, y2, d + 1);
        if (Math.random() < .25) { const bl = len * (.4 + Math.random() * .4), a = Math.atan2(dy, dx) + (Math.random() - .5) * Math.PI * 1.2; draw(mx, my, mx + Math.cos(a) * bl, my + Math.sin(a) * bl, d + 2); }
      };
      const loop = () => {
        ctx.fillStyle = "rgba(0,0,18,0.2)"; ctx.fillRect(0, 0, c.width, c.height);
        if (Math.random() < .14) draw(Math.random() * c.width, Math.random() * c.height * .3, mouse.x, mouse.y);
        if (Math.random() < .05) draw(Math.random() * c.width, 0, Math.random() * c.width, c.height + 50);
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  }
];
