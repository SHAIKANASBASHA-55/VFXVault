// ─────────────────────────────────────────────────
//  GAME EFFECTS
// ─────────────────────────────────────────────────

export const gameEffects = [
  {
    name: "Coin Shower",
    tags: ["game", "reward", "coins"],
    description: "Golden coins spin and bounce with coin-flip tumble animation",
    code: `// Ellipse width oscillates to simulate 3D coin flip
const wobble = abs(sin(coin.angle));
ctx.ellipse(coin.x, coin.y, coin.r * wobble, coin.r, 0, 0, PI*2);
ctx.fillStyle = wobble > 0.5 ? gold : darkGold;`,
    animator: (c, ctx, mouse) => {
      let coins = [], t = 0, id;
      const spawnCoins = (x, y) => { for (let i = 0; i < 8; i++) { const a = -Math.PI / 2 + (Math.random() - .5) * 1.2, spd = Math.random() * 10 + 5; coins.push({ x, y, vx: Math.cos(a) * spd + (Math.random() - .5) * 4, vy: Math.sin(a) * spd - 4, r: Math.random() * 12 + 8, angle: Math.random() * Math.PI * 2, spin: (Math.random() - .5) * .25, life: 1, hue: 42 + Math.random() * 15 }); } };
      const iv = setInterval(() => spawnCoins(mouse.x, mouse.y), 400); spawnCoins(c.width / 2, c.height * .4);
      const loop = () => {
        t += .016; ctx.fillStyle = "rgba(4,2,8,0.18)"; ctx.fillRect(0, 0, c.width, c.height);
        coins.forEach((coin, i) => {
          coin.x += coin.vx; coin.y += coin.vy; coin.vy += .38; coin.vx *= .99; coin.angle += coin.spin; coin.life -= .008;
          if (coin.life <= 0 || coin.y > c.height + coin.r * 2) { coins.splice(i, 1); return; }
          const wobble = Math.abs(Math.sin(coin.angle * 3));
          ctx.save(); ctx.translate(coin.x, coin.y);
          ctx.fillStyle = `hsla(${coin.hue},90%,${wobble > .5 ? 58 : 38}%,${coin.life * .9})`;
          ctx.beginPath(); ctx.ellipse(0, 0, coin.r * Math.max(.08, wobble), coin.r, 0, 0, Math.PI * 2); ctx.fill();
          if (wobble > .3) { ctx.fillStyle = `hsla(${coin.hue},80%,78%,${coin.life * .5})`; ctx.beginPath(); ctx.ellipse(-coin.r * .2, -coin.r * .25, coin.r * .3 * wobble, coin.r * .4, 0, 0, Math.PI * 2); ctx.fill(); }
          ctx.restore();
        });
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => { clearInterval(iv); cancelAnimationFrame(id); } };
    }
  },

  {
    name: "XP Burst",
    tags: ["game", "reward", "levelup"],
    description: "Experience points float up from cursor with glowing trails",
    code: `// Rising XP text with glow + vanish
ctx.shadowBlur = 12; ctx.shadowColor = 'rgba(100,220,255,0.9)';
ctx.fillStyle = \`rgba(100,220,255,\${xp.alpha})\`;
ctx.font = \`bold \${xp.size}px sans-serif\`;
ctx.fillText('+' + xp.value + ' XP', xp.x, xp.y);`,
    animator: (c, ctx, mouse) => {
      let xps = [], particles = [], t = 0, id;
      const values = [10, 25, 50, 100, 250];
      const spawn = (x, y) => {
        const val = values[Math.floor(Math.random() * values.length)]; xps.push({ x, y, vy: -(Math.random() * 1.5 + 1.5), alpha: 1, size: 14 + Math.random() * 10, value: val });
        for (let i = 0; i < 12; i++) { const a = Math.random() * Math.PI * 2, spd = Math.random() * 4 + 2; particles.push({ x, y, vx: Math.cos(a) * spd, vy: Math.sin(a) * spd - 2, alpha: 1, r: Math.random() * 4 + 1.5, hue: 180 + Math.random() * 60 }); }
      };
      const iv = setInterval(() => spawn(mouse.x + (Math.random() - .5) * 80, mouse.y + (Math.random() - .5) * 40), 500); spawn(c.width / 2, c.height / 2);
      const loop = () => {
        t += .016; ctx.fillStyle = "rgba(4,4,10,0.16)"; ctx.fillRect(0, 0, c.width, c.height);
        particles.forEach((p, i) => { p.x += p.vx; p.y += p.vy; p.vy += .05; p.alpha -= .025; if (p.alpha <= 0) { particles.splice(i, 1); return; } ctx.fillStyle = `hsla(${p.hue},80%,65%,${p.alpha})`; ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill(); });
        xps.forEach((xp, i) => { xp.y += xp.vy; xp.alpha -= .012; if (xp.alpha <= 0) { xps.splice(i, 1); return; } ctx.font = `bold ${xp.size}px sans-serif`; ctx.textAlign = "center"; ctx.shadowColor = "rgba(100,220,255,0.9)"; ctx.shadowBlur = 14; ctx.fillStyle = `rgba(100,220,255,${xp.alpha})`; ctx.fillText(`+${xp.value} XP`, xp.x, xp.y); ctx.shadowBlur = 0; });
        ctx.textAlign = "left";
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => { clearInterval(iv); cancelAnimationFrame(id); } };
    }
  },

  {
    name: "Combo Fire",
    tags: ["game", "combo", "fire"],
    description: "Combo multiplier text blazes with escalating fire intensity",
    code: `// Combo count drives fire particle density
const intensity = min(combo / 10, 1);
for(let i=0; i < 3 + combo; i++) spawnEmber(x, y);
ctx.fillStyle = \`hsl(\${50 - intensity*40}, 90%, 60%)\`;
ctx.font = \`bold \${40 + combo * 4}px sans-serif\`;`,
    animator: (c, ctx, mouse) => {
      let combo = 0, embers = [], t = 0, id;
      const iv = setInterval(() => { combo = Math.min(combo + 1, 20); for (let i = 0; i < 3 + combo; i++) embers.push({ x: c.width / 2 + (Math.random() - .5) * (60 + combo * 4), y: c.height * .55 + (Math.random() - .5) * 20, vx: (Math.random() - .5) * 2.5, vy: -(Math.random() * 4 + 3 + combo * .2), size: Math.random() * 5 + 2, life: 1, hue: 15 + Math.random() * 30 }); }, 600);
      const loop = () => {
        t += .016; ctx.fillStyle = "rgba(4,0,0,0.2)"; ctx.fillRect(0, 0, c.width, c.height);
        embers.forEach((e, i) => { e.x += e.vx; e.y += e.vy; e.vy += .08; e.vx *= .98; e.life -= .016; e.size *= .993; if (e.life <= 0 || e.y < -20) { embers.splice(i, 1); return; } ctx.fillStyle = `hsla(${e.hue},90%,${55 + e.life * 35}%,${e.life * .85})`; ctx.beginPath(); ctx.arc(e.x, e.y, e.size, 0, Math.PI * 2); ctx.fill(); });
        const intensity = combo / 20, sz = 40 + combo * 3;
        ctx.font = `bold ${sz}px sans-serif`; ctx.textAlign = "center";
        ctx.shadowColor = `hsla(${30 - intensity * 25},90%,55%,0.9)`; ctx.shadowBlur = 20 + intensity * 30;
        ctx.fillStyle = `hsl(${50 - intensity * 40},90%,${65 + intensity * 10}%)`; ctx.fillText(`${combo}x COMBO!`, c.width / 2, c.height * .55 + sz * .3); ctx.shadowBlur = 0; ctx.textAlign = "left";
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => { clearInterval(iv); cancelAnimationFrame(id); } };
    }
  },

  {
    name: "Explosion Hit",
    tags: ["game", "combat", "explosion"],
    description: "Impact explosion with shockwave, debris and screen shake feel",
    code: `// Multi-layer explosion: flash + ring + debris
triggerExplosion(x, y) {
  rings.push({ x, y, r: 0, maxR: 120, alpha: 0.9 });
  for(let i=0; i<50; i++) debris.push({ vx: cos(rand()*PI*2)*rand()*12 });
  flashAlpha = 0.4;
}`,
    animator: (c, ctx, mouse) => {
      let rings = [], debris = [], flashAlpha = 0, t = 0, id;
      const explode = (x, y) => {
        flashAlpha = .5;
        for (let r = 0; r < 3; r++) rings.push({ x, y, r: r * 10, maxR: 80 + r * 40, alpha: .8 - r * .2, speed: 4 + r * 1.5 });
        for (let i = 0; i < 55; i++) { const a = Math.random() * Math.PI * 2, spd = Math.random() * 12 + 3; debris.push({ x, y, vx: Math.cos(a) * spd, vy: Math.sin(a) * spd - 4, life: 1, r: Math.random() * 5 + 1.5, hue: Math.random() > .5 ? Math.random() * 30 + 10 : Math.random() * 40 + 180 }); }
      };
      const iv = setInterval(() => explode(mouse.x, mouse.y), 1200); explode(c.width / 2, c.height / 2);
      const loop = () => {
        t += .016; ctx.fillStyle = "rgba(4,2,2,0.2)"; ctx.fillRect(0, 0, c.width, c.height);
        if (flashAlpha > 0) { ctx.fillStyle = `rgba(255,200,100,${flashAlpha})`; ctx.fillRect(0, 0, c.width, c.height); flashAlpha -= .04; }
        rings.forEach((ring, i) => { ring.r += ring.speed; ring.alpha -= .018; if (ring.alpha <= 0) { rings.splice(i, 1); return; } ctx.strokeStyle = `rgba(255,160,60,${ring.alpha})`; ctx.lineWidth = 3 + ring.alpha * 5; ctx.beginPath(); ctx.arc(ring.x, ring.y, ring.r, 0, Math.PI * 2); ctx.stroke(); });
        debris.forEach((d, i) => { d.x += d.vx; d.y += d.vy; d.vy += .25; d.vx *= .97; d.life -= .015; if (d.life <= 0) { debris.splice(i, 1); return; } ctx.fillStyle = `hsla(${d.hue},85%,${50 + d.life * 25}%,${d.life * .9})`; ctx.beginPath(); ctx.arc(d.x, d.y, d.r * d.life, 0, Math.PI * 2); ctx.fill(); });
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => { clearInterval(iv); cancelAnimationFrame(id); } };
    }
  },

  {
    name: "Health Drain",
    tags: ["game", "damage", "status"],
    description: "Dark red particles seep away from cursor like draining life force",
    code: `// Slow outward seep with fade, red desaturation
p.vx += (p.x - originX) * 0.001 + (rand()-0.5)*0.3;
p.size *= 0.995;
ctx.fillStyle = \`hsla(\${355 - p.life*30},75%,\${35+p.life*20}%,\${p.alpha})\`;`,
    animator: (c, ctx, mouse) => {
      let particles = [], t = 0, id;
      const iv = setInterval(() => { for (let i = 0; i < 6; i++) { const a = Math.random() * Math.PI * 2, spd = Math.random() * 1.5 + .5; particles.push({ x: mouse.x, y: mouse.y, ox: mouse.x, oy: mouse.y, vx: Math.cos(a) * spd, vy: Math.sin(a) * spd, life: 1, r: Math.random() * 8 + 4 }); } }, 80);
      const loop = () => {
        t += .016; ctx.fillStyle = "rgba(6,0,0,0.15)"; ctx.fillRect(0, 0, c.width, c.height);
        particles.forEach((p, i) => {
          p.x += p.vx + (p.x - p.ox) * .002; p.y += p.vy + (p.y - p.oy) * .002 + .1; p.vx += (Math.random() - .5) * .15; p.vy += (Math.random() - .5) * .15; p.life -= .008; p.r *= .997;
          if (p.life <= 0 || p.r < .5) { particles.splice(i, 1); return; }
          ctx.fillStyle = `hsla(${355 - p.life * 30},75%,${35 + p.life * 20}%,${p.life * .8})`; ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
        });
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => { clearInterval(iv); cancelAnimationFrame(id); } };
    }
  },

  {
    name: "Magic Spell",
    tags: ["game", "magic", "fantasy"],
    description: "Swirling arcane runes and sparkles form around the cursor",
    code: `// Orbiting rune characters with spiral decay
const orbitR = 60 + sin(t * 2 + rune.phase) * 20;
const angle = rune.baseAngle + t * rune.speed;
ctx.font = \`\${rune.size}px serif\`;
ctx.fillText(RUNES[rune.idx], cx + cos(angle)*orbitR, ...);`,
    animator: (c, ctx, mouse) => {
      const RUNES = ["ᚠ", "ᚢ", "ᚦ", "ᚨ", "ᚱ", "ᚲ", "ᚷ", "ᚹ", "ᚺ", "ᚾ", "ᛁ", "ᛃ", "ᛇ", "ᛈ", "ᛉ", "ᛊ"];
      let sparkles = [], t = 0, id;
      const runes = Array.from({ length: 8 }, (_, i) => ({ baseAngle: (i / 8) * Math.PI * 2, speed: .4 + i * .05, phase: Math.random() * Math.PI * 2, size: 14 + Math.random() * 10, idx: Math.floor(Math.random() * RUNES.length), hue: 260 + Math.random() * 60 }));
      const iv = setInterval(() => { for (let i = 0; i < 4; i++) sparkles.push({ x: mouse.x + (Math.random() - .5) * 100, y: mouse.y + (Math.random() - .5) * 100, vx: (Math.random() - .5) * 2, vy: -(Math.random() * 3 + 1), alpha: 1, r: Math.random() * 3 + 1, hue: 260 + Math.random() * 100 }); }, 80);
      const loop = () => {
        t += .018; ctx.fillStyle = "rgba(4,2,10,0.16)"; ctx.fillRect(0, 0, c.width, c.height);
        sparkles.forEach((s, i) => { s.x += s.vx; s.y += s.vy; s.alpha -= .022; if (s.alpha <= 0) { sparkles.splice(i, 1); return; } ctx.fillStyle = `hsla(${s.hue},80%,70%,${s.alpha})`; ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2); ctx.fill(); });
        const g = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 70); g.addColorStop(0, "rgba(140,80,255,0.25)"); g.addColorStop(.5, "rgba(80,40,180,0.12)"); g.addColorStop(1, "rgba(0,0,0,0)"); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(mouse.x, mouse.y, 70, 0, Math.PI * 2); ctx.fill();
        runes.forEach(r => {
          const orbitR = 58 + Math.sin(t * 2 + r.phase) * 18, angle = r.baseAngle + t * r.speed;
          const rx = mouse.x + Math.cos(angle) * orbitR, ry = mouse.y + Math.sin(angle) * orbitR;
          ctx.font = `${r.size}px serif`; ctx.textAlign = "center"; ctx.textBaseline = "middle";
          ctx.shadowColor = `hsla(${r.hue},85%,65%,0.9)`; ctx.shadowBlur = 10;
          ctx.fillStyle = `hsla(${r.hue},75%,70%,0.85)`; ctx.fillText(RUNES[r.idx], rx, ry); ctx.shadowBlur = 0;
        });
        ctx.textAlign = "left"; ctx.textBaseline = "alphabetic";
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => { clearInterval(iv); cancelAnimationFrame(id); } };
    }
  },

  {
    name: "Power Up",
    tags: ["game", "powerup", "reward"],
    description: "Item pickup aura with rotating rings and ascending star burst",
    code: `// Rotating halo rings + upward star trail
for(let ring=0; ring<3; ring++){
  ctx.rotate(t * (ring%2===0 ? 1 : -1) * 0.5);
  ctx.strokeStyle = \`hsl(\${60+ring*40}, 90%, 65%)\`;
  ctx.arc(cx, cy, 30 + ring*18, 0, PI*2);
}`,
    animator: (c, ctx, mouse) => {
      let stars = [], t = 0, id;
      const iv = setInterval(() => { for (let i = 0; i < 8; i++) { const a = Math.random() * Math.PI * 2, spd = Math.random() * 3 + 1.5; stars.push({ x: mouse.x + (Math.random() - .5) * 30, y: mouse.y + (Math.random() - .5) * 30, vx: Math.cos(a) * spd, vy: Math.sin(a) * spd - 3.5, alpha: 1, size: Math.random() * 12 + 5, spin: (Math.random() - .5) * .2, angle: Math.random() * Math.PI * 2, hue: 45 + Math.random() * 40 }); } }, 150);
      const loop = () => {
        t += .02; ctx.fillStyle = "rgba(4,4,8,0.16)"; ctx.fillRect(0, 0, c.width, c.height);
        stars.forEach((s, i) => {
          s.x += s.vx; s.y += s.vy; s.vy += .04; s.alpha -= .018; s.angle += s.spin;
          if (s.alpha <= 0) { stars.splice(i, 1); return; }
          ctx.save(); ctx.translate(s.x, s.y); ctx.rotate(s.angle); ctx.fillStyle = `hsla(${s.hue},90%,65%,${s.alpha})`; ctx.shadowColor = `hsla(${s.hue},100%,70%,0.8)`; ctx.shadowBlur = 8;
          ctx.beginPath();
          for (let k = 0; k < 10; k++) { const r = k % 2 === 0 ? s.size : s.size * .4, a = (k / 10) * Math.PI * 2 - Math.PI / 2; ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r); }
          ctx.closePath(); ctx.fill(); ctx.shadowBlur = 0; ctx.restore();
        });
        for (let ring = 0; ring < 3; ring++) {
          ctx.save(); ctx.translate(mouse.x, mouse.y); ctx.rotate(t * (ring % 2 === 0 ? 1 : -1.5) * .6);
          ctx.strokeStyle = `hsla(${55 + ring * 35 + t * 30},90%,${60 + ring * 8}%,${.4 + Math.sin(t * 3 + ring) * .2})`; ctx.lineWidth = 1.5 + ring * .5;
          ctx.setLineDash([6, 4]); ctx.beginPath(); ctx.arc(0, 0, 28 + ring * 16, 0, Math.PI * 2); ctx.stroke(); ctx.setLineDash([]); ctx.restore();
        }
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => { clearInterval(iv); cancelAnimationFrame(id); } };
    }
  },

  {
    name: "Pixel Dust",
    tags: ["game", "retro", "8bit"],
    description: "Retro 8-bit square pixels burst and scatter with pixelated flair",
    code: `// Square pixel chunks with integer-snapped positions
const px = floor(p.x / 4) * 4;
const py = floor(p.y / 4) * 4;
ctx.fillStyle = PALETTE[p.colorIdx];
ctx.fillRect(px, py, 4, 4);`,
    animator: (c, ctx, mouse) => {
      const PALETTE = ["#ff0044","#ff6600","#ffcc00","#00ff88","#00ccff","#8844ff","#ff44cc","#ffffff"];
      let pixels = [], t = 0, id;
      const iv = setInterval(() => { for (let i = 0; i < 12; i++) { const a = Math.random() * Math.PI * 2, spd = Math.random() * 8 + 3; pixels.push({ x: mouse.x, y: mouse.y, vx: Math.cos(a) * spd, vy: Math.sin(a) * spd - 3, life: 1, size: Math.floor(Math.random() * 3 + 1) * 4, colorIdx: Math.floor(Math.random() * PALETTE.length) }); } }, 100);
      const loop = () => {
        t += .016; ctx.fillStyle = "rgba(8,4,16,0.22)"; ctx.fillRect(0, 0, c.width, c.height);
        pixels.forEach((p, i) => {
          p.x += p.vx; p.y += p.vy; p.vy += .2; p.vx *= .97; p.life -= .016;
          if (p.life <= 0 || p.y > c.height + p.size * 2) { pixels.splice(i, 1); return; }
          const px = Math.floor(p.x / 4) * 4, py = Math.floor(p.y / 4) * 4;
          ctx.globalAlpha = p.life; ctx.fillStyle = PALETTE[p.colorIdx]; ctx.fillRect(px, py, p.size, p.size); ctx.globalAlpha = 1;
        });
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => { clearInterval(iv); cancelAnimationFrame(id); } };
    }
  }
];
