// ─────────────────────────────────────────────────
//  CULTURAL & FLORAL EFFECTS — PREMIUM EDITION
// ─────────────────────────────────────────────────

export const culturalEffects = [
 {
    name: "Chinese Ink Lotus",
    tags: ["chinese", "floral", "ink", "ambient"],
    description: "Sumi-e ink lotus blooms emerge from dark water with brushstroke-style petals and golden pollen",
    code: `// Brushstroke petal using tapered bezier + ink bleed
const drawInkPetal = (len, width, alpha) => {
  ctx.lineWidth = width * sin(progress * PI); // taper
  ctx.strokeStyle = \`rgba(20,15,30,\${alpha})\`;
  ctx.shadowBlur = 8; // ink bleed
  ctx.bezierCurveTo(...);
};`,
    animator: (c, ctx, mouse) => {
      let t = 0, id;
      const flowers = Array.from({ length: 4 }, (_, i) => ({
        x: c.width * (0.15 + i * 0.23),
        y: c.height * 0.55 + Math.sin(i * 1.5) * 60,
        phase: i * 1.2,
        bloom: 0,
        bloomTarget: 0.7 + Math.random() * 0.3,
        size: 55 + Math.random() * 35,
        stemLen: 120 + Math.random() * 60
      }));
      const drawInkPetal = (len, wid, hue, sat, lit, alpha) => {
        const g = ctx.createLinearGradient(0, 0, 0, -len);
        g.addColorStop(0, `hsla(${hue},${sat}%,${lit}%,${alpha})`);
        g.addColorStop(0.6, `hsla(${hue - 5},${sat + 10}%,${lit + 10}%,${alpha * 0.8})`);
        g.addColorStop(1, `hsla(${hue - 10},${sat + 20}%,${lit + 20}%,0)`);
        ctx.fillStyle = g;
        ctx.shadowBlur = 6; ctx.shadowColor = `hsla(${hue},40%,20%,0.3)`;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(-wid * 0.6, -len * 0.3, -wid * 0.8, -len * 0.7, 0, -len);
        ctx.bezierCurveTo(wid * 0.8, -len * 0.7, wid * 0.6, -len * 0.3, 0, 0);
        ctx.fill();
        ctx.shadowBlur = 0;
      };
      const loop = () => {
        t += 0.01;
        ctx.fillStyle = "rgba(8,12,20,0.18)"; ctx.fillRect(0, 0, c.width, c.height);
        // water ripples
        ctx.globalCompositeOperation = "screen";
        for (let i = 0; i < 3; i++) {
          const rr = 80 + i * 90 + Math.sin(t * 0.6 + i) * 20;
          ctx.strokeStyle = `rgba(30,80,120,${0.06 - i * 0.015})`;
          ctx.lineWidth = 1; ctx.beginPath();
          ctx.ellipse(c.width / 2, c.height * 0.72, rr * 2.5, rr * 0.6, 0, 0, Math.PI * 2); ctx.stroke();
        }
        ctx.globalCompositeOperation = "source-over";
        flowers.forEach(f => {
          f.bloom += (f.bloomTarget - f.bloom) * 0.008 + Math.sin(t * 0.4 + f.phase) * 0.001;
          const bloom = Math.min(1, f.bloom);
          // stem
          ctx.strokeStyle = `rgba(40,90,50,0.7)`; ctx.lineWidth = 3;
          ctx.beginPath(); ctx.moveTo(f.x, c.height * 0.85);
          ctx.quadraticCurveTo(f.x + Math.sin(t * 0.3 + f.phase) * 20, f.y + f.stemLen * 0.5, f.x, f.y + 10);
          ctx.stroke();
          // leaf
          ctx.save(); ctx.translate(f.x + 30, f.y + f.stemLen * 0.4);
          ctx.rotate(0.4 + Math.sin(t * 0.2 + f.phase) * 0.05);
          ctx.fillStyle = "rgba(35,85,45,0.55)";
          ctx.beginPath(); ctx.ellipse(0, 0, 28, 14, 0, 0, Math.PI * 2); ctx.fill(); ctx.restore();
          // petals — outer then inner
          const layers = [
            { count: 10, len: f.size, wid: f.size * 0.38, hue: 310, sat: 45, lit: 55, rotOff: 0 },
            { count: 8, len: f.size * 0.78, wid: f.size * 0.3, hue: 320, sat: 40, lit: 70, rotOff: 0.3 },
            { count: 6, len: f.size * 0.55, wid: f.size * 0.22, hue: 330, sat: 35, lit: 85, rotOff: 0.15 }
          ];
          layers.forEach((layer, li) => {
            for (let p = 0; p < layer.count; p++) {
              const a = (p / layer.count) * Math.PI * 2 + layer.rotOff + t * 0.04 * (li % 2 === 0 ? 1 : -1);
              const openAngle = bloom * (Math.PI / 2.2 + li * 0.15);
              ctx.save();
              ctx.translate(f.x, f.y);
              ctx.rotate(a);
              ctx.rotate(-openAngle);
              drawInkPetal(layer.len * bloom, layer.wid * bloom, layer.hue, layer.sat, layer.lit, 0.8);
              ctx.restore();
            }
          });
          // pollen center
          if (bloom > 0.4) {
            ctx.globalCompositeOperation = "screen";
            const pg = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, f.size * 0.22 * bloom);
            pg.addColorStop(0, `rgba(255,220,60,${0.9 * bloom})`);
            pg.addColorStop(0.5, `rgba(255,180,20,${0.5 * bloom})`);
            pg.addColorStop(1, "rgba(0,0,0,0)");
            ctx.fillStyle = pg; ctx.beginPath(); ctx.arc(f.x, f.y, f.size * 0.22 * bloom, 0, Math.PI * 2); ctx.fill();
            ctx.globalCompositeOperation = "source-over";
          }
        });
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },
{
    name: "Imperial Japanese Sakura Storm",
    tags: ["premium", "japanese", "zen", "nature"],
    description: "A cinematic blizzard of cherry blossoms falling over a moonlit silhouette, featuring translucent petal physics and deep parallax layers.",
    animator: (c, ctx, mouse) => {
        let t = 0, id;
        const layers = [0, 1, 2].map(d => ({
            depth: d,
            petals: Array.from({ length: 40 + d * 40 }, () => ({
                x: Math.random() * c.width,
                y: Math.random() * c.height,
                z: Math.random(), // Z-depth for scaling
                size: (12 - d * 3) + Math.random() * 8,
                speed: (0.8 + d * 0.4) + Math.random() * 1.5,
                rot: Math.random() * Math.PI * 2,
                rotSpeed: (Math.random() - 0.5) * 0.05,
                phase: Math.random() * Math.PI * 2,
                hue: 335 + Math.random() * 15
            }))
        }));

        const drawSakuraPetal = (x, y, s, rot, alpha, hue, z) => {
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(rot);
            // Simulate 3D tilt by scaling the Y-axis based on rotation
            ctx.scale(Math.cos(t * 0.5 + rot), 1); 
            
            ctx.globalAlpha = alpha;
            ctx.shadowBlur = z * 10;
            ctx.shadowColor = `hsla(${hue}, 100%, 80%, 0.3)`;

            const g = ctx.createRadialGradient(0, 0, 0, 0, 0, s);
            g.addColorStop(0, `hsla(${hue}, 100%, 98%, 1)`);      // White core
            g.addColorStop(0.4, `hsla(${hue}, 85%, 85%, 0.9)`);   // Soft pink
            g.addColorStop(1, `hsla(${hue - 10}, 70%, 70%, 0)`);  // Transparent edge

            ctx.fillStyle = g;
            ctx.beginPath();
            ctx.moveTo(0, 0);
            // The signature notched "heart" shape of a Sakura petal
            ctx.bezierCurveTo(-s, -s * 0.5, -s * 0.5, -s * 1.5, 0, -s * 0.8);
            ctx.bezierCurveTo(s * 0.5, -s * 1.5, s, -s * 0.5, 0, 0);
            ctx.fill();
            ctx.restore();
        };

        const loop = () => {
            t += 0.01;
            // Premium Deep Indigo / Sumi-e Gradient
            const bg = ctx.createRadialGradient(c.width/2, c.height/2, 0, c.width/2, c.height/2, c.width);
            bg.addColorStop(0, "#1a1a2e");
            bg.addColorStop(1, "#0a0a0c");
            ctx.fillStyle = bg; ctx.fillRect(0, 0, c.width, c.height);

            // Distance Moon / Sun Disc
            ctx.fillStyle = "rgba(255, 255, 230, 0.05)";
            ctx.beginPath(); ctx.arc(c.width * 0.8, c.height * 0.2, 80, 0, Math.PI * 2); ctx.fill();

            const wind = Math.sin(t * 0.5) * 2 + (mouse.x / c.width - 0.5) * 5;

            layers.forEach(layer => {
                layer.petals.forEach(p => {
                    // Physics with Z-axis influence
                    p.y += p.speed;
                    p.x += Math.sin(p.phase + t) * 1.2 + wind * (1 + layer.depth * 0.5);
                    p.rot += p.rotSpeed;

                    if (p.y > c.height + 50) {
                        p.y = -50;
                        p.x = Math.random() * c.width;
                    }
                    if (p.x > c.width + 50) p.x = -50;
                    if (p.x < -50) p.x = c.width + 50;

                    // Depth-based scaling and opacity
                    const scale = 0.5 + (layer.depth * 0.25);
                    const alpha = 0.4 + (layer.depth * 0.2);
                    drawSakuraPetal(p.x, p.y, p.size * scale, p.rot, alpha, p.hue, layer.depth);
                });
            });

            // Cinematic Vignette
            const vig = ctx.createRadialGradient(c.width/2, c.height/2, c.width*0.2, c.width/2, c.height/2, c.width*0.7);
            vig.addColorStop(0, "rgba(0,0,0,0)");
            vig.addColorStop(1, "rgba(0,0,0,0.6)");
            ctx.fillStyle = vig; ctx.fillRect(0, 0, c.width, c.height);

            id = requestAnimationFrame(loop);
        };
        return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
},
 
  {
    name: "Persian Garden Mosaic",
    tags: ["persian", "islamic", "geometric", "ornament"],
    description: "Intricate Islamic geometric star patterns unfurl in a paradise garden of lapis, gold and ruby",
    code: `// 8-point star tessellation with animated reveal
const drawStar = (cx, cy, r, points, rotation) => {
  for (let i = 0; i < points * 2; i++) {
    const angle = (i / (points * 2)) * PI * 2 + rotation;
    const radius = i % 2 === 0 ? r : r * 0.42;
    ctx.lineTo(cx + cos(angle)*radius, cy + sin(angle)*radius);
  }
};`,
    animator: (c, ctx, mouse) => {
      let t = 0, id;
      const TILE = 110;
      const cols = Math.ceil(c.width / TILE) + 2;
      const rows = Math.ceil(c.height / TILE) + 2;
      const drawStar = (cx, cy, r, pts, rot, color, alpha) => {
        ctx.fillStyle = color; ctx.globalAlpha = alpha;
        ctx.beginPath();
        for (let i = 0; i < pts * 2; i++) {
          const a = (i / (pts * 2)) * Math.PI * 2 + rot;
          const rad = i % 2 === 0 ? r : r * 0.42;
          i === 0 ? ctx.moveTo(cx + Math.cos(a) * rad, cy + Math.sin(a) * rad)
                   : ctx.lineTo(cx + Math.cos(a) * rad, cy + Math.sin(a) * rad);
        }
        ctx.closePath(); ctx.fill();
      };
      const loop = () => {
        t += 0.007;
        ctx.fillStyle = "#0a0618"; ctx.fillRect(0, 0, c.width, c.height);
        ctx.globalAlpha = 1;
        const mx = (mouse.x / c.width - 0.5) * 8, my = (mouse.y / c.height - 0.5) * 8;
        for (let row = -1; row < rows; row++) {
          for (let col = -1; col < cols; col++) {
            const cx = col * TILE + (row % 2) * TILE * 0.5 + mx;
            const cy = row * TILE * 0.866 + my;
            const dist = Math.hypot(cx - c.width / 2, cy - c.height / 2);
            const pulse = Math.sin(t * 1.2 - dist * 0.008) * 0.5 + 0.5;
            const hue1 = (t * 12 + dist * 0.15) % 360;
            // background hex
            ctx.fillStyle = `hsla(${240 + Math.sin(t * 0.3 + dist * 0.01) * 30},60%,${10 + pulse * 8}%,1)`;
            ctx.globalAlpha = 1;
            ctx.beginPath(); ctx.arc(cx, cy, TILE * 0.5, 0, Math.PI * 2); ctx.fill();
            // 8-point star
            drawStar(cx, cy, TILE * 0.36, 8, t * 0.06 + dist * 0.002,
              `hsla(${hue1},80%,55%,1)`, 0.7 + pulse * 0.25);
            // inner star
            drawStar(cx, cy, TILE * 0.18, 6, -t * 0.1 + dist * 0.003,
              `hsla(${40 + pulse * 20},90%,65%,1)`, 0.8);
            // center dot
            ctx.fillStyle = `hsla(${hue1 + 120},80%,80%,0.9)`;
            ctx.globalAlpha = pulse * 0.9;
            ctx.beginPath(); ctx.arc(cx, cy, TILE * 0.06, 0, Math.PI * 2); ctx.fill();
          }
        }
        ctx.globalAlpha = 1;
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },

{
    name: "Indian Royal Court Multi-Mandala",
    tags: ["premium", "temple-gold", "intricate", "cultural"],
    description: "A field of flickering, golden-rimmed mandalas inspired by traditional Indian silk embroidery and festival lights.",
    animator: (c, ctx, mouse) => {
        let t = 0, id, mandalas = [];
        const count = 12; // Number of small mandalas

        // Initialize unique properties for each mandala
        const init = () => {
            mandalas = [];
            for (let i = 0; i < count; i++) {
                mandalas.push({
                    x: Math.random() * c.width,
                    y: Math.random() * c.height,
                    size: 40 + Math.random() * 80,
                    speed: (Math.random() - 0.5) * 0.02,
                    hue: [15, 30, 350, 45][Math.floor(Math.random() * 4)], // Saffron, Gold, Crimson, Marigold
                    offset: Math.random() * Math.PI * 2,
                    depth: 0.5 + Math.random() * 0.5 // For parallax
                });
            }
        };

        const drawMiniMandala = (m, time) => {
            const { x, y, size, speed, hue, offset, depth } = m;
            
            // Subtle parallax based on mouse position
            const px = x + (mouse.x - c.width / 2) * (depth * 0.05);
            const py = y + (mouse.y - c.height / 2) * (depth * 0.05);

            ctx.save();
            ctx.translate(px, py);
            ctx.rotate(time * speed + offset);

            const layers = 3;
            for (let l = 1; l <= layers; l++) {
                const r = (size / layers) * l;
                const pts = 6 + (l * 4);
                const rot = time * (l % 2 ? 0.2 : -0.2);

                for (let s = 0; s < pts; s++) {
                    ctx.save();
                    ctx.rotate((s / pts) * Math.PI * 2 + rot);
                    
                    // The "Petal"
                    ctx.beginPath();
                    ctx.moveTo(0, 0);
                    ctx.quadraticCurveTo(r * 0.5, -r * 0.4, r, 0);
                    ctx.quadraticCurveTo(r * 0.5, r * 0.4, 0, 0);
                    
                    // Fill with gradient-like hue
                    ctx.fillStyle = `hsla(${hue}, 80%, ${40 + l * 10}%, ${0.3 / depth})`;
                    ctx.fill();

                    // Premium Gold Stroke
                    ctx.strokeStyle = `rgba(212, 175, 55, ${0.5 + Math.sin(time + l) * 0.3})`;
                    ctx.lineWidth = 0.8;
                    ctx.stroke();
                    
                    // Bindu (The sacred dot at the tip)
                    if (s % 2 === 0) {
                        ctx.fillStyle = "#FFD700";
                        ctx.beginPath();
                        ctx.arc(r, 0, 1.5, 0, Math.PI * 2);
                        ctx.fill();
                    }
                    ctx.restore();
                }
            }
            
            // Central Glow (Small Diya effect)
            const glow = ctx.createRadialGradient(0, 0, 0, 0, 0, size * 0.2);
            glow.addColorStop(0, "rgba(255, 255, 255, 0.8)");
            glow.addColorStop(1, "transparent");
            ctx.fillStyle = glow;
            ctx.beginPath();
            ctx.arc(0, 0, size * 0.2, 0, Math.PI * 2);
            ctx.fill();

            ctx.restore();
        };

        const loop = () => {
            t += 0.5; // High precision time
            // Deep Royal Background
            ctx.fillStyle = "#0a0505"; 
            ctx.fillRect(0, 0, c.width, c.height);

            // Draw noise/grain for texture
            ctx.globalAlpha = 0.05;
            for(let i=0; i<10; i++) {
                ctx.fillStyle = i % 2 ? "#fff" : "#000";
                ctx.fillRect(Math.random()*c.width, Math.random()*c.height, 1, 1);
            }
            ctx.globalAlpha = 1.0;

            // Sort by depth for correct layering
            mandalas.sort((a, b) => a.depth - b.depth).forEach(m => {
                drawMiniMandala(m, t * 0.01);
            });

            id = requestAnimationFrame(loop);
        };

        init();
        return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
},
{
    name: "Imperial Iznik Gallery",
    tags: ["premium", "turkish", "ottoman", "ceramic"],
    description: "Museum-grade Iznik tile patterns featuring hand-painted red tulips, cobalt Rumi scrolls, and a crackled porcelain glaze.",
    animator: (c, ctx, mouse) => {
        let t = 0, id;
        const TILE = 140; // Slightly larger for detail
        const cols = Math.ceil(c.width / TILE) + 1;
        const rows = Math.ceil(c.height / TILE) + 1;

        const drawImperialTulip = (cx, cy, phase, size) => {
            const sway = Math.sin(phase) * 3;
            ctx.save();
            ctx.translate(cx, cy);
            
            // Stem (Malachite Green)
            ctx.strokeStyle = "#006644"; 
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(0, size * 0.8);
            ctx.quadraticCurveTo(-sway, size * 0.4, 0, 0);
            ctx.stroke();

            // Petals (Iznik Red - bolus armenus)
            const pScale = 0.9 + Math.sin(phase) * 0.1;
            [[-0.4, -1.2], [0, -1.5], [0.4, -1.2]].forEach(([ox, oy], i) => {
                ctx.fillStyle = i === 1 ? "#C8102E" : "#E32227";
                ctx.beginPath();
                ctx.moveTo(0, 0);
                // Sharper, more elegant "Knife-leaf" tulip tips
                ctx.bezierCurveTo(ox * size * 1.5, oy * size * 0.3, ox * size * 0.5, oy * size * pScale, 0, oy * size * pScale * 0.8);
                ctx.bezierCurveTo(-ox * size * 0.2, oy * size * pScale, -ox * size * 0.5, oy * size * 0.3, 0, 0);
                ctx.fill();
                // Hand-painted highlight
                ctx.strokeStyle = "rgba(255,255,255,0.2)";
                ctx.stroke();
            });
            ctx.restore();
        };

        const drawRumiScroll = (tx, ty, t) => {
            ctx.strokeStyle = "rgba(0, 71, 171, 0.4)"; // Cobalt
            ctx.lineWidth = 1;
            for (let i = 0; i < 4; i++) {
                ctx.save();
                ctx.translate(tx + TILE/2, ty + TILE/2);
                ctx.rotate((i * Math.PI) / 2);
                ctx.beginPath();
                ctx.arc(TILE/3, TILE/3, TILE/4, 0, Math.PI / 2);
                ctx.stroke();
                ctx.restore();
            }
        };

        const loop = () => {
            t += 0.005;
            // Warm Quartzite Background
            ctx.fillStyle = "#FDF5E6"; 
            ctx.fillRect(0, 0, c.width, c.height);

            for (let r = 0; r < rows; r++) {
                for (let col = 0; col < cols; col++) {
                    const tx = col * TILE;
                    const ty = r * TILE;
                    const cx = tx + TILE / 2;
                    const cy = ty + TILE / 2;
                    const phase = t + (col + r) * 0.5;

                    // Tile "Crazing" (Crackled Glaze effect)
                    ctx.strokeStyle = "rgba(0,0,0,0.03)";
                    ctx.beginPath();
                    ctx.moveTo(tx + 10, ty + 10);
                    ctx.lineTo(tx + 30, ty + 25); ctx.lineTo(tx + 15, ty + 40);
                    ctx.stroke();

                    // Traditional Border (Turquoise & Cobalt)
                    ctx.strokeStyle = "#00A2B1"; 
                    ctx.lineWidth = 3;
                    ctx.strokeRect(tx + 5, ty + 5, TILE - 10, TILE - 10);
                    
                    // Floral motifs
                    drawRumiScroll(tx, ty, t);
                    drawImperialTulip(cx, cy + 15, phase, 30);

                    // Corner "Hatayi" rosettes
                    ctx.fillStyle = "#0047AB";
                    [[5,5], [TILE-5,5], [5,TILE-5], [TILE-5,TILE-5]].forEach(([ox, oy]) => {
                        ctx.beginPath();
                        ctx.arc(tx + ox, ty + oy, 3, 0, Math.PI * 2);
                        ctx.fill();
                    });
                }
            }

            // Global Ceramic Glaze Highlight
            const lx = (Math.sin(t) * 0.5 + 0.5) * c.width;
            const grad = ctx.createLinearGradient(lx - 200, 0, lx + 200, c.height);
            grad.addColorStop(0, "rgba(255,255,255,0)");
            grad.addColorStop(0.5, "rgba(255,255,255,0.15)");
            grad.addColorStop(1, "rgba(255,255,255,0)");
            ctx.fillStyle = grad;
            ctx.fillRect(0, 0, c.width, c.height);

            id = requestAnimationFrame(loop);
        };

        return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
},

{
    name: "Mexican Grand Ofrenda Celebration",
    tags: ["premium", "mexican", "day-of-the-dead", "folk-art"],
    description: "An atmospheric celebration featuring swaying lace papel picado, ornate sugar skulls, and vibrant marigold petals drifting in candlelight.",
    animator: (c, ctx, mouse) => {
      let t = 0, id;
      const marigolds = Array.from({ length: 12 }, () => ({
        x: Math.random() * c.width, y: Math.random() * c.height,
        vx: (Math.random() - 0.5) * 0.5, vy: -0.4 - Math.random() * 0.4,
        sz: 25 + Math.random() * 15, ph: Math.random() * 10
      }));

      const drawSugarSkull = (x, y, scale, time) => {
        ctx.save(); ctx.translate(x, y); ctx.scale(scale, scale);
        ctx.rotate(Math.sin(time) * 0.1);
        
        // Main Skull Shape
        ctx.fillStyle = "#fff"; ctx.shadowBlur = 15; ctx.shadowColor = "rgba(255,255,255,0.3)";
        ctx.beginPath();
        ctx.arc(0, 0, 20, Math.PI, 0); // Top
        ctx.bezierCurveTo(20, 15, 12, 25, 12, 30); // Right jaw
        ctx.lineTo(-12, 30); // Chin
        ctx.bezierCurveTo(-12, 25, -20, 15, -20, 0); // Left jaw
        ctx.fill();

        // Ornate Eyes (Floral style)
        ctx.shadowBlur = 0;
        ctx.fillStyle = "#ff0080"; // Bright Pink
        [[-8, 2], [8, 2]].forEach(([ex, ey]) => {
          for(let i=0; i<6; i++) {
            ctx.save(); ctx.translate(ex, ey); ctx.rotate(i * Math.PI/3 + time);
            ctx.beginPath(); ctx.ellipse(4, 0, 3, 1.5, 0, 0, Math.PI*2); ctx.fill();
            ctx.restore();
          }
          ctx.fillStyle = "#222"; ctx.beginPath(); ctx.arc(ex, ey, 3, 0, 7); ctx.fill();
          ctx.fillStyle = "#ff0080";
        });
        
        // Nose and Teeth
        ctx.fillStyle = "#222"; ctx.beginPath(); ctx.moveTo(0, 8); ctx.lineTo(3, 13); ctx.lineTo(-3, 13); ctx.fill();
        ctx.strokeStyle = "#444"; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(-6, 22); ctx.lineTo(6, 22); ctx.moveTo(-4, 18); ctx.lineTo(-4, 26); ctx.moveTo(0, 18); ctx.lineTo(0, 26); ctx.moveTo(4, 18); ctx.lineTo(4, 26); ctx.stroke();
        ctx.restore();
      };

      const drawLaceBanner = (y, hue, time) => {
        const w = 60, h = 80, gap = 75;
        ctx.save();
        for (let x = -20; x < c.width + 50; x += gap) {
          const sway = Math.sin(time + x * 0.01) * 15;
          ctx.fillStyle = `hsla(${hue}, 90%, 55%, 0.8)`;
          ctx.save(); ctx.translate(x, y + sway); ctx.rotate(Math.sin(time + x) * 0.05);
          
          // The Paper
          ctx.beginPath(); ctx.rect(0, 0, w, h);
          // Scalloped bottom
          for(let i=0; i<=w; i+=10) ctx.arc(i, h, 6, 0, Math.PI);
          ctx.fill();
          
          // "Cut-out" effect (using clear)
          ctx.globalCompositeOperation = "destination-out";
          ctx.beginPath(); ctx.arc(w/2, h/2, 12, 0, 7); ctx.fill(); // Center hole
          [[10, 10], [w-10, 10], [10, h-20], [w-10, h-20]].forEach(p => {
            ctx.beginPath(); ctx.rect(p[0], p[1], 8, 8); ctx.fill();
          });
          ctx.globalCompositeOperation = "source-over";
          ctx.restore();
        }
        ctx.restore();
      };

      const loop = () => {
        t += 0.015;
        // Deep midnight purple background
        const bg = ctx.createLinearGradient(0, 0, 0, c.height);
        bg.addColorStop(0, "#0a0410"); bg.addColorStop(1, "#200a05");
        ctx.fillStyle = bg; ctx.fillRect(0, 0, c.width, c.height);

        // Draw Banners (Background layer)
        drawLaceBanner(40, 280, t); // Purple
        drawLaceBanner(140, 30, t * 0.8); // Orange

        // Marigolds & Skulls
        marigolds.forEach((m, i) => {
          m.y += m.vy; m.x += Math.sin(t + m.ph) * 0.5;
          if (m.y < -50) m.y = c.height + 50;
          
          if (i % 4 === 0) {
            drawSugarSkull(m.x, m.y, 0.6 + Math.sin(t + i)*0.1, t + i);
          } else {
            // High-detail Marigold
            ctx.save(); ctx.translate(m.x, m.y); ctx.rotate(t * 0.2);
            for(let layer=0; layer<3; layer++) {
                ctx.fillStyle = `hsla(${20 + layer*10}, 100%, ${50 - layer*5}%, 0.8)`;
                const petals = 10 + layer*5;
                for(let p=0; p<petals; p++) {
                    ctx.rotate((Math.PI*2)/petals);
                    ctx.beginPath(); ctx.ellipse(m.sz/(layer+1), 0, m.sz/2, m.sz/4, 0, 0, 7); ctx.fill();
                }
            }
            ctx.restore();
          }
        });

        // Warm Candlelight Overlay (bottom)
        const candle = ctx.createRadialGradient(c.width/2, c.height, 0, c.width/2, c.height, c.height*0.8);
        candle.addColorStop(0, "rgba(255, 100, 0, 0.2)");
        candle.addColorStop(1, "rgba(0,0,0,0)");
        ctx.globalCompositeOperation = "screen";
        ctx.fillStyle = candle; ctx.fillRect(0,0,c.width,c.height);
        ctx.globalCompositeOperation = "source-over";

        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },

  {
    name: "Egyptian Solar Bloom",
    tags: ["egyptian", "floral", "ancient", "symbolic"],
    description: "Sacred lotus and solar disk motifs rise in tiers of lapis lazuli, gold and carnelian glow",
    code: `// Hieroglyphic lotus rising with Ra's golden disk
ctx.save(); ctx.translate(x, y);
drawSolarDisk(r, goldGradient);
for (let p = 0; p < 8; p++) drawLotusPane(p, bloom, t);
drawWaterLines(y, cyan);
ctx.restore();`,
    animator: (c, ctx, mouse) => {
      let t = 0, id;
      const lotuses = Array.from({ length: 5 }, (_, i) => ({
        x: c.width * (0.12 + i * 0.19),
        y: c.height * 0.65,
        size: 38 + Math.random() * 22,
        phase: i * 1.1,
        bloom: 0
      }));
      const drawLotus = (lx, ly, size, bloom, phase) => {
        ctx.save(); ctx.translate(lx, ly);
        // stem
        ctx.strokeStyle = "rgba(0,120,80,0.7)"; ctx.lineWidth = 3;
        ctx.beginPath(); ctx.moveTo(0, 80); ctx.quadraticCurveTo(Math.sin(t + phase) * 12, 40, 0, 0); ctx.stroke();
        // water ripple
        ctx.strokeStyle = "rgba(30,140,180,0.25)"; ctx.lineWidth = 1;
        for (let r = 1; r <= 3; r++) {
          ctx.beginPath(); ctx.ellipse(0, 85, r * 22, r * 5, 0, 0, Math.PI * 2); ctx.stroke();
        }
        // petals
        const petals = 8;
        for (let p = 0; p < petals; p++) {
          const a = (p / petals) * Math.PI * 2;
          const openAngle = bloom * 1.1;
          ctx.save(); ctx.rotate(a); ctx.rotate(-openAngle);
          const g = ctx.createLinearGradient(0, 0, 0, -size);
          g.addColorStop(0, `hsla(200,70%,45%,0.85)`);
          g.addColorStop(0.5, `hsla(185,80%,65%,0.7)`);
          g.addColorStop(1, `hsla(170,60%,80%,0.3)`);
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.bezierCurveTo(-size * 0.3, -size * 0.4, -size * 0.25, -size * 0.85, 0, -size);
          ctx.bezierCurveTo(size * 0.25, -size * 0.85, size * 0.3, -size * 0.4, 0, 0);
          ctx.fill(); ctx.restore();
        }
        // solar disk
        if (bloom > 0.5) {
          ctx.globalCompositeOperation = "screen";
          const sg = ctx.createRadialGradient(0, -size * 0.1, 0, 0, -size * 0.1, size * 0.3 * bloom);
          sg.addColorStop(0, `rgba(255,210,50,${0.95 * bloom})`);
          sg.addColorStop(0.5, `rgba(255,150,20,${0.5 * bloom})`);
          sg.addColorStop(1, "rgba(0,0,0,0)");
          ctx.fillStyle = sg; ctx.beginPath(); ctx.arc(0, -size * 0.1, size * 0.3 * bloom, 0, Math.PI * 2); ctx.fill();
          ctx.globalCompositeOperation = "source-over";
        }
        ctx.restore();
      };
      const loop = () => {
        t += 0.01;
        ctx.fillStyle = "rgba(5,8,18,0.18)"; ctx.fillRect(0, 0, c.width, c.height);
        // Nile water base
        ctx.fillStyle = "rgba(0,60,120,0.12)";
        ctx.fillRect(0, c.height * 0.75, c.width, c.height * 0.25);
        // water shimmer
        ctx.globalCompositeOperation = "screen";
        for (let i = 0; i < c.width; i += 18) {
          const wy = c.height * 0.75 + Math.sin(i * 0.04 + t * 1.5) * 4;
          ctx.strokeStyle = `rgba(0,180,200,${0.04 + Math.sin(i * 0.1 + t) * 0.02})`;
          ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(i, wy); ctx.lineTo(i + 12, wy); ctx.stroke();
        }
        ctx.globalCompositeOperation = "source-over";
        lotuses.forEach(l => {
          l.bloom = Math.min(1, l.bloom + 0.004 + Math.sin(t * 0.5 + l.phase) * 0.001);
          drawLotus(l.x, l.y, l.size, l.bloom, l.phase);
        });
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },

  {
    name: "Russian Khokhloma Gold",
    tags: ["russian", "folk", "floral", "ornament"],
    description: "Deep lacquerware swirls with crimson berries, golden leaves and black-red folk patterns on rich ground",
    code: `// Folk motif system: berries, leaves, curlicues
const drawKhokhlomaLeaf = (x, y, size, angle) => {
  ctx.strokeStyle = goldGradient;
  ctx.bezierCurveTo(...);  // leaf vein
  ctx.fillStyle = 'hsl(40,90%,55%)'; // gold fill
};`,
    animator: (c, ctx, mouse) => {
      let t = 0, id;
      const motifs = Array.from({ length: 35 }, () => ({
        x: Math.random() * c.width, y: Math.random() * c.height,
        vx: (Math.random() - 0.5) * 0.6, vy: (Math.random() - 0.5) * 0.5,
        phase: Math.random() * Math.PI * 2, type: ['berry', 'leaf', 'swirl'][Math.floor(Math.random() * 3)],
        size: 14 + Math.random() * 12, rot: Math.random() * Math.PI * 2
      }));
      const drawBerry = (size, phase) => {
        // main berry
        const bg = ctx.createRadialGradient(-size * 0.25, -size * 0.3, 0, 0, 0, size);
        bg.addColorStop(0, "#ff5555"); bg.addColorStop(0.6, "#c62020"); bg.addColorStop(1, "#7a0a0a");
        ctx.fillStyle = bg; ctx.beginPath(); ctx.arc(0, 0, size, 0, Math.PI * 2); ctx.fill();
        // highlight
        ctx.fillStyle = "rgba(255,180,160,0.6)";
        ctx.beginPath(); ctx.ellipse(-size * 0.28, -size * 0.3, size * 0.28, size * 0.2, -0.5, 0, Math.PI * 2); ctx.fill();
        // small secondary berries
        [[size * 1.4, -size * 0.5, 0.55], [-size * 1.4, -size * 0.4, 0.5]].forEach(([bx, by, sc]) => {
          ctx.fillStyle = "#d42020";
          ctx.beginPath(); ctx.arc(bx, by, size * sc, 0, Math.PI * 2); ctx.fill();
        });
      };
      const drawLeaf = (size) => {
        const lg = ctx.createLinearGradient(-size, 0, size, 0);
        lg.addColorStop(0, "#cc8800"); lg.addColorStop(0.5, "#ffcc00"); lg.addColorStop(1, "#cc8800");
        ctx.fillStyle = lg;
        ctx.beginPath();
        ctx.moveTo(0, -size * 1.3);
        ctx.bezierCurveTo(size * 0.8, -size * 0.8, size * 0.9, size * 0.3, 0, size * 0.6);
        ctx.bezierCurveTo(-size * 0.9, size * 0.3, -size * 0.8, -size * 0.8, 0, -size * 1.3);
        ctx.fill();
        // vein
        ctx.strokeStyle = "rgba(180,100,0,0.6)"; ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.moveTo(0, -size * 1.2); ctx.lineTo(0, size * 0.5); ctx.stroke();
      };
      const drawSwirl = (size, phase) => {
        ctx.strokeStyle = `hsla(40,90%,55%,0.8)`; ctx.lineWidth = 2.5;
        ctx.beginPath();
        for (let a = 0; a < Math.PI * 4; a += 0.1) {
          const r = a * size * 0.1;
          const x = Math.cos(a + phase) * r, y = Math.sin(a + phase) * r;
          a === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.stroke();
      };
      const loop = () => {
        t += 0.009;
        ctx.fillStyle = "rgba(10,4,2,0.1)"; ctx.fillRect(0, 0, c.width, c.height);
        motifs.forEach(m => {
          m.x += m.vx + Math.sin(t * 0.5 + m.phase) * 0.3;
          m.y += m.vy + Math.cos(t * 0.4 + m.phase) * 0.25;
          m.rot += Math.sin(t * 0.3 + m.phase) * 0.008;
          if (m.x < -40) m.x = c.width + 40; if (m.x > c.width + 40) m.x = -40;
          if (m.y < -40) m.y = c.height + 40; if (m.y > c.height + 40) m.y = -40;
          ctx.save(); ctx.translate(m.x, m.y); ctx.rotate(m.rot);
          if (m.type === 'berry') drawBerry(m.size, m.phase);
          else if (m.type === 'leaf') drawLeaf(m.size);
          else drawSwirl(m.size, m.phase + t);
          ctx.restore();
        });
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },

  {
    name: "Korean Minhwa Garden",
    tags: ["korean", "minhwa", "folk-painting", "nature"],
    description: "Folk painting-style magpies, pine branches, chrysanthemums and longevity rocks in serene composition",
    code: `// Flat-style folk painting with bold outlines
drawPineBranch(x, y, angle, depth);
drawChrysanthemum(cx, cy, petals, hue);
drawMagpie(x, y, wingPhase); // good luck bird`,
    animator: (c, ctx, mouse) => {
      let t = 0, id;
      const flowers = Array.from({ length: 8 }, () => ({
        x: Math.random() * c.width, y: Math.random() * c.height,
        phase: Math.random() * Math.PI * 2, size: 28 + Math.random() * 20,
        hue: [340, 45, 200, 120][Math.floor(Math.random() * 4)]
      }));
      const drawChrysanthemum = (x, y, size, hue, phase) => {
        const petals = 16;
        for (let layer = 2; layer >= 0; layer--) {
          const r = size * (0.45 + layer * 0.22);
          const lHue = hue + layer * 15;
          for (let p = 0; p < petals; p++) {
            const a = (p / petals) * Math.PI * 2 + layer * 0.3 + t * 0.05;
            ctx.save(); ctx.translate(x, y); ctx.rotate(a);
            ctx.fillStyle = `hsla(${lHue},85%,${55 + layer * 12}%,${0.75 + Math.sin(t + phase + p) * 0.15})`;
            ctx.strokeStyle = `hsla(${lHue - 20},70%,35%,0.5)`; ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.bezierCurveTo(-r * 0.22, -r * 0.35, -r * 0.18, -r * 0.85, 0, -r);
            ctx.bezierCurveTo(r * 0.18, -r * 0.85, r * 0.22, -r * 0.35, 0, 0);
            ctx.fill(); ctx.stroke(); ctx.restore();
          }
        }
        // center
        const cg = ctx.createRadialGradient(x, y, 0, x, y, size * 0.18);
        cg.addColorStop(0, `hsla(${hue + 30},100%,80%,1)`); cg.addColorStop(1, `hsla(${hue},90%,50%,0.5)`);
        ctx.fillStyle = cg; ctx.beginPath(); ctx.arc(x, y, size * 0.18, 0, Math.PI * 2); ctx.fill();
      };
      const drawPineBranch = (x, y) => {
        ctx.strokeStyle = "rgba(40,70,20,0.65)"; ctx.lineWidth = 2.5;
        ctx.beginPath(); ctx.moveTo(x, y);
        for (let i = 0; i < 6; i++) {
          const a = -0.6 + i * 0.24 + Math.sin(t * 0.2 + i) * 0.04;
          const len = 40 + i * 8;
          const bx = x + Math.cos(a) * len, by = y + Math.sin(a) * len;
          ctx.lineTo(bx, by);
          // needles
          ctx.save(); ctx.translate(bx, by); ctx.rotate(a);
          ctx.strokeStyle = "rgba(30,90,20,0.6)"; ctx.lineWidth = 1;
          for (let n = -3; n <= 3; n++) {
            ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(n * 5, -12 + Math.abs(n) * 2); ctx.stroke();
          }
          ctx.restore();
          ctx.beginPath(); ctx.moveTo(x + Math.cos(a) * len * 0.5, y + Math.sin(a) * len * 0.5);
        }
        ctx.stroke();
      };
      const loop = () => {
        t += 0.011;
        ctx.fillStyle = "rgba(248,244,235,0.12)"; ctx.fillRect(0, 0, c.width, c.height);
        // pine branches in corners
        ctx.save(); ctx.translate(0, c.height * 0.2 + Math.sin(t * 0.15) * 5); drawPineBranch(0, 0); ctx.restore();
        ctx.save(); ctx.translate(c.width, c.height * 0.3 + Math.sin(t * 0.2) * 5); ctx.scale(-1, 1); drawPineBranch(0, 0); ctx.restore();
        flowers.forEach(f => drawChrysanthemum(
          f.x + Math.sin(t * 0.3 + f.phase) * 8,
          f.y + Math.cos(t * 0.25 + f.phase) * 5,
          f.size, f.hue, f.phase
        ));
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },

{
    name: "Sacred Thai Golden Canopy",
    tags: ["premium", "thai", "temple", "spiritual"],
    description: "An intricate, tiered celestial canopy featuring gilded Kranok flame motifs and shimmering jeweled insets inspired by Wat Phra Kaew.",
    animator: (c, ctx, mouse) => {
      let t = 0, id;
      const cx = c.width / 2, cy = c.height / 2;

      const drawKranokPetal = (r, phase, hue) => {
        // High-end gold leaf gradient
        const g = ctx.createLinearGradient(0, 0, r, 0);
        g.addColorStop(0, "#8B6B23"); // Dark Bronze
        g.addColorStop(0.3, "#D4AF37"); // Gold Leaf
        g.addColorStop(0.5, "#FFF9E3"); // High Reflection
        g.addColorStop(0.7, "#D4AF37"); 
        g.addColorStop(1, "#8B6B23");
        
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        // The signature "Kranok" flame curve
        ctx.bezierCurveTo(r * 0.3, -r * 0.1, r * 0.6, -r * 0.4, r, 0);
        ctx.bezierCurveTo(r * 0.7, r * 0.1, r * 0.4, r * 0.2, 0, 0);
        ctx.fill();
        
        // Edge highlighting (Beaten gold effect)
        ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
        ctx.lineWidth = 0.5;
        ctx.stroke();

        // Jeweled inset (Sapphire or Emerald)
        if (r > 60) {
            ctx.fillStyle = `hsla(${hue}, 80%, 50%, 0.8)`;
            ctx.beginPath();
            ctx.arc(r * 0.5, 0, r * 0.05, 0, Math.PI * 2);
            ctx.fill();
            // Gem spark
            ctx.fillStyle = "#fff";
            ctx.fillRect(r * 0.5 - 1, -1, 2, 2);
        }
      };

      const loop = () => {
        t += 0.007;
        // Deep Ritual Crimson/Black Background
        const bg = ctx.createRadialGradient(cx, cy, 0, cx, cy, c.width * 0.7);
        bg.addColorStop(0, "#2a0000");
        bg.addColorStop(1, "#050000");
        ctx.fillStyle = bg; ctx.fillRect(0, 0, c.width, c.height);

        // Background Radiance Rays
        ctx.save();
        ctx.translate(cx, cy);
        ctx.globalCompositeOperation = "screen";
        for (let i = 0; i < 12; i++) {
            ctx.rotate(Math.PI / 6);
            const rg = ctx.createLinearGradient(0, 0, c.width, 0);
            rg.addColorStop(0, "rgba(212, 175, 55, 0.15)");
            rg.addColorStop(1, "rgba(0,0,0,0)");
            ctx.fillStyle = rg;
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(c.width, -20);
            ctx.lineTo(c.width, 20);
            ctx.fill();
        }
        ctx.restore();

        // Tiered Canopies
        const tiers = [
            { r: 50, pts: 8,  hue: 140, rot: 0.15 }, // Emerald Tier
            { r: 90, pts: 12, hue: 200, rot: -0.1 }, // Sapphire Tier
            { r: 140, pts: 16, hue: 340, rot: 0.08 }, // Ruby Tier
            { r: 200, pts: 24, hue: 45,  rot: -0.05 } // Gold Tier
        ];

        tiers.reverse().forEach((tier, i) => {
            for (let s = 0; s < tier.pts; s++) {
                ctx.save();
                ctx.translate(cx, cy);
                ctx.rotate((s / tier.pts) * Math.PI * 2 + t * tier.rot);
                
                // Add a slight "breathing" scale
                const pulse = 1 + Math.sin(t * 2 + i) * 0.03;
                ctx.scale(pulse, pulse);
                
                drawKranokPetal(tier.r, t, tier.hue);
                
                // Secondary flipped petal for symmetry
                ctx.scale(1, -1);
                drawKranokPetal(tier.r, t, tier.hue);
                
                ctx.restore();
            }
        });

        // Center Sacred "Unalome" Glow
        ctx.globalCompositeOperation = "screen";
        const sg = ctx.createRadialGradient(cx, cy, 0, cx, cy, 40);
        sg.addColorStop(0, "#ffffff");
        sg.addColorStop(0.3, "#ffd700");
        sg.addColorStop(1, "transparent");
        ctx.fillStyle = sg;
        ctx.beginPath();
        ctx.arc(cx, cy, 40, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalCompositeOperation = "source-over";

        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },

{
    name: "Imperial Moroccan Zellige",
    tags: ["premium", "moroccan", "geometric", "islamic-art"],
    description: "Authentic interlocking geometric tessellation with hand-chiseled ceramic textures and reactive light glazes.",
    animator: (c, ctx, mouse) => {
      let t = 0, id;
      const SIZE = 80; // Larger for detail
      const cols = Math.ceil(c.width / SIZE) + 1;
      const rows = Math.ceil(c.height / SIZE) + 1;
      
      // Traditional Zellige Palette: Terracotta, Cobalt, Emerald, Cream, Ochre
      const palette = ["#2E5A88", "#008751", "#C1442E", "#D9B382", "#F2E8D5", "#1B365D"];

      const drawTile = (cx, cy, r, pts, rot, colorBase, distToMouse) => {
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(rot);
        
        // Premium Glaze Effect: Slight color jitter per tile
        const shine = Math.max(0, 1 - distToMouse / 300);
        ctx.fillStyle = colorBase;
        ctx.shadowBlur = 2 + shine * 10;
        ctx.shadowColor = "rgba(0,0,0,0.3)";

        ctx.beginPath();
        for (let i = 0; i < pts * 2; i++) {
          const a = (i / (pts * 2)) * Math.PI * 2;
          const rad = i % 2 === 0 ? r : r * 0.7; // Sharper star points
          i === 0 ? ctx.moveTo(Math.cos(a) * rad, Math.sin(a) * rad)
                  : ctx.lineTo(Math.cos(a) * rad, Math.sin(a) * rad);
        }
        ctx.closePath();
        ctx.fill();

        // Hand-chiseled Edge (Inner Highlight)
        ctx.strokeStyle = "rgba(255,255,255,0.2)";
        ctx.lineWidth = 1;
        ctx.stroke();

        // Ceramic Gloss Overlay
        if (shine > 0) {
          const grad = ctx.createRadialGradient(-r*0.3, -r*0.3, 0, 0, 0, r);
          grad.addColorStop(0, `rgba(255,255,255,${0.4 * shine})`);
          grad.addColorStop(1, "transparent");
          ctx.fillStyle = grad;
          ctx.fill();
        }
        ctx.restore();
      };

      const loop = () => {
        t += 0.004;
        // Grout Color (Sand/Lime mortar)
        ctx.fillStyle = "#d5c7b3"; 
        ctx.fillRect(0, 0, c.width, c.height);

        for (let row = 0; row < rows; row++) {
          for (let col = 0; col < cols; col++) {
            const tx = col * SIZE;
            const ty = row * SIZE;
            const cx = tx + (row % 2 ? SIZE/2 : 0); // Staggered grid
            const cy = ty;
            
            const dist = Math.hypot(cx - mouse.x, cy - mouse.y);
            const colorIdx = (row * 7 + col * 3) % palette.length;
            
            // Draw Main 8-Point Star
            drawTile(cx, cy, SIZE * 0.48, 8, 0, palette[colorIdx], dist);
            
            // Draw Interstitial Cross/Star (The 'filling' tile)
            const subColor = palette[(colorIdx + 2) % palette.length];
            drawTile(cx + SIZE/2, cy + SIZE/2, SIZE * 0.25, 4, Math.PI/4, subColor, dist);
          }
        }

        // Global Courtyard Reflection (Caustics)
        ctx.globalCompositeOperation = "screen";
        const timeX = Math.sin(t) * 100;
        const grad = ctx.createLinearGradient(timeX, 0, timeX + 300, c.height);
        grad.addColorStop(0, "transparent");
        grad.addColorStop(0.5, "rgba(200,230,255,0.05)");
        grad.addColorStop(1, "transparent");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, c.width, c.height);
        ctx.globalCompositeOperation = "source-over";

        id = requestAnimationFrame(loop);
      };
      
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
},
    // ─────────────────────────────────────────────────
//  CULTURAL EFFECTS — NEW COUNTRIES EXPANSION
//  Add these entries into your culturalEffects array
// ─────────────────────────────────────────────────

  {
    name: "Imperial Aztec Sun Stone",
    tags: ["premium", "mexican", "ancient", "solar"],
    description: "A monumental basalt calendar stone rotating in tiered glyph rings, featuring the face of Tonatiuh and the Fire Serpents.",
    animator: (c, ctx, mouse) => {
      let t = 0, id;
      const cx = c.width / 2, cy = c.height / 2;

      const drawStoneGlyph = (s, ri, hue) => {
        // Stone block with "chiseled" depth
        ctx.fillStyle = `hsla(${hue}, 20%, ${20 + ri * 5}%, 1)`;
        ctx.strokeStyle = `hsla(${hue}, 10%, 10%, 0.8)`;
        ctx.lineWidth = 2;
        
        ctx.beginPath();
        ctx.rect(-s / 2, -s / 2, s, s);
        ctx.fill();
        ctx.stroke();

        // Inner Glyph Embossing
        ctx.strokeStyle = `rgba(255, 150, 50, ${0.2 + Math.sin(t*2)*0.1})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(0, 0, s * 0.3, 0, Math.PI * 2);
        ctx.moveTo(-s * 0.2, 0); ctx.lineTo(s * 0.2, 0);
        ctx.moveTo(0, -s * 0.2); ctx.lineTo(0, s * 0.2);
        ctx.stroke();
      };

      const drawFireSerpent = (r, speed) => {
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(t * speed);
        for (let i = 0; i < 40; i++) {
          const a = (i / 40) * Math.PI * 2;
          const sx = Math.cos(a) * r, sy = Math.sin(a) * r;
          
          // Segmented Serpent Body
          ctx.fillStyle = i % 2 ? "#e65100" : "#bf360c";
          ctx.shadowBlur = 10;
          ctx.shadowColor = "#ff3d00";
          
          ctx.save();
          ctx.translate(sx, sy);
          ctx.rotate(a + Math.PI / 2);
          ctx.beginPath();
          ctx.moveTo(-8, 0); ctx.lineTo(0, -15); ctx.lineTo(8, 0); ctx.lineTo(0, 5);
          ctx.fill();
          ctx.restore();
        }
        ctx.restore();
      };

      const loop = () => {
        t += 0.006;
        // Deep Obsidian / Charcoal Background
        const bg = ctx.createRadialGradient(cx, cy, 0, cx, cy, c.width * 0.6);
        bg.addColorStop(0, "#1a1310");
        bg.addColorStop(1, "#050404");
        ctx.fillStyle = bg; ctx.fillRect(0, 0, c.width, c.height);

        const rings = [
          { r: 55,  count: 4,  s: 24 }, // The 4 Eras
          { r: 90,  count: 20, s: 18 }, // The 20 Days
          { r: 130, count: 12, s: 15 }, // Solar Rays
          { r: 170, count: 32, s: 12 }  // Outer Ornaments
        ];

        rings.forEach((ring, ri) => {
          const rot = t * (ri % 2 === 0 ? 0.2 : -0.15);
          for (let i = 0; i < ring.count; i++) {
            const a = (i / ring.count) * Math.PI * 2 + rot;
            const gx = cx + Math.cos(a) * ring.r;
            const gy = cy + Math.sin(a) * ring.r;
            
            ctx.save();
            ctx.translate(gx, gy);
            ctx.rotate(a + Math.PI / 2);
            drawStoneGlyph(ring.s, ri, 30);
            ctx.restore();
          }
          // Subtle Grout Ring
          ctx.strokeStyle = "rgba(0,0,0,0.4)";
          ctx.beginPath(); ctx.arc(cx, cy, ring.r, 0, 7); ctx.stroke();
        });

        drawFireSerpent(210, -0.1);

        // Central Tonatiuh Face (Solar Deity)
        ctx.save();
        ctx.translate(cx, cy);
        ctx.fillStyle = "#332a22";
        ctx.shadowBlur = 20; ctx.shadowColor = "#ff9100";
        ctx.beginPath(); ctx.arc(0, 0, 35, 0, 7); ctx.fill();
        
        // Eyes and Knife Tongue
        ctx.fillStyle = "#ffab00";
        ctx.beginPath(); ctx.arc(-10, -5, 4, 0, 7); ctx.arc(10, -5, 4, 0, 7); ctx.fill();
        ctx.fillStyle = "#ff3d00"; // Tecpatl (Knife) Tongue
        ctx.beginPath(); ctx.moveTo(-5, 5); ctx.lineTo(5, 5); ctx.lineTo(0, 25); ctx.fill();
        ctx.restore();

        // Heat Haze Shimmer
        ctx.globalCompositeOperation = "screen";
        const haze = ctx.createRadialGradient(cx, cy, 30, cx, cy, 250);
        haze.addColorStop(0, "rgba(255, 100, 0, 0.15)");
        haze.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = haze; ctx.fillRect(0,0,c.width,c.height);
        ctx.globalCompositeOperation = "source-over";

        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
},

  {
    name: "Nigerian Adire Cloth",
    tags: ["nigerian", "yoruba", "textile", "pattern"],
    description: "Adire eleko indigo resist-dye patterns ripple and bloom with hand-painted batik symmetry",
    code: `// Resist-dye simulation: wax-resist circles + indigo flood fill
resists.forEach(r => {
  ctx.strokeStyle = waxColor;
  ctx.arc(r.x, r.y, r.radius, 0, PI*2); // wax ring
});
ctx.fillStyle = indigoGradient; // dye floods between
// Geometric Yoruba motifs: aya (fern), ojuelegba (crossroads)`,
    animator: (c, ctx, mouse) => {
      let t = 0, id;
      const GRID = 70;
      const cols = Math.ceil(c.width / GRID) + 2;
      const rows = Math.ceil(c.height / GRID) + 2;
      const drawAdireCell = (cx, cy, phase, variant) => {
        const p = Math.sin(phase + t * 0.6) * 0.5 + 0.5;
        const indigoL = 25 + p * 15;
        // background indigo
        ctx.fillStyle = `hsl(225,65%,${indigoL}%)`; 
        ctx.fillRect(cx - GRID/2, cy - GRID/2, GRID, GRID);
        ctx.strokeStyle = `hsla(50,80%,85%,${0.5 + p * 0.35})`; ctx.lineWidth = 1.2;
        if (variant % 3 === 0) {
          // concentric circles (resist dots)
          for (let r = 6; r < 28; r += 7) {
            ctx.beginPath(); ctx.arc(cx, cy, r + Math.sin(t + phase) * 2, 0, Math.PI * 2); ctx.stroke();
          }
          // cross
          ctx.beginPath(); ctx.moveTo(cx - 24, cy); ctx.lineTo(cx + 24, cy);
          ctx.moveTo(cx, cy - 24); ctx.moveTo(cx, cy + 24); ctx.stroke();
        } else if (variant % 3 === 1) {
          // diagonal fern (aya)
          for (let i = -3; i <= 3; i++) {
            const lx = cx + i * 8, llen = 18 - Math.abs(i) * 2;
            ctx.beginPath(); ctx.moveTo(lx, cy - llen); ctx.lineTo(lx, cy + llen); ctx.stroke();
            for (let b = -2; b <= 2; b++) {
              ctx.beginPath(); ctx.moveTo(lx, cy + b * 6);
              ctx.lineTo(lx + 8, cy + b * 6 - 4); ctx.stroke();
            }
          }
        } else {
          // diamond grid
          ctx.beginPath();
          ctx.moveTo(cx, cy - 26); ctx.lineTo(cx + 26, cy);
          ctx.lineTo(cx, cy + 26); ctx.lineTo(cx - 26, cy); ctx.closePath(); ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(cx, cy - 14); ctx.lineTo(cx + 14, cy);
          ctx.lineTo(cx, cy + 14); ctx.lineTo(cx - 14, cy); ctx.closePath(); ctx.stroke();
          ctx.fillStyle = `hsla(50,80%,80%,${0.3 + p * 0.2})`;
          ctx.beginPath(); ctx.arc(cx, cy, 4, 0, Math.PI * 2); ctx.fill();
        }
      };
      const loop = () => {
        t += 0.007;
        ctx.fillStyle = "#0d1a3a"; ctx.fillRect(0, 0, c.width, c.height);
        const mx = Math.sin(t * 0.1) * 5;
        for (let row = -1; row < rows; row++) {
          for (let col = -1; col < cols; col++) {
            const tx = col * GRID + mx, ty = row * GRID;
            const dist = Math.hypot(tx + GRID/2 - mouse.x, ty + GRID/2 - mouse.y);
            const phase = dist * 0.02 - t * 0.5;
            drawAdireCell(tx + GRID/2, ty + GRID/2, phase, row * cols + col);
          }
        }
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },

  {
    name: "Andean Chakana Cross",
    tags: ["peruvian", "andean", "inca", "geometric"],
    description: "The Inca stepped cross (Chakana) pulses with Andean textile colors, condors and sacred geometry",
    code: `// Stepped cross with 3-level staircase profile
const drawChakana = (cx, cy, r, rot) => {
  const steps = 3;
  for (let arm = 0; arm < 4; arm++) {
    ctx.rotate(arm * PI/2 + rot);
    drawStaircaseArm(r, steps);  // each arm has 3 notches
  }
  ctx.arc(cx, cy, r*0.15, 0, PI*2); // center circle
};`,
    animator: (c, ctx, mouse) => {
      let t = 0, id;
      const chakanas = Array.from({ length: 6 }, (_, i) => ({
        x: c.width * (0.15 + (i % 3) * 0.35),
        y: c.height * (0.25 + Math.floor(i / 3) * 0.5),
        size: 55 + Math.random() * 30,
        phase: i * 1.1,
        rot: Math.random() * Math.PI * 2
      }));
      const drawChakana = (cx, cy, size, rot, hue) => {
        ctx.save(); ctx.translate(cx, cy); ctx.rotate(rot);
        // stepped cross shape
        const s = size;
        const stepPath = () => {
          ctx.beginPath();
          // right arm with 3 steps
          const S = s / 3;
          ctx.moveTo(S, -S); ctx.lineTo(s, -S); ctx.lineTo(s, S);
          ctx.lineTo(2*S, S); ctx.lineTo(2*S, 2*S); ctx.lineTo(S, 2*S);
          // bottom arm
          ctx.lineTo(S, s); ctx.lineTo(-S, s); ctx.lineTo(-S, 2*S);
          ctx.lineTo(-2*S, 2*S); ctx.lineTo(-2*S, S); ctx.lineTo(-s, S);
          // left arm
          ctx.lineTo(-s, -S); ctx.lineTo(-2*S, -S); ctx.lineTo(-2*S, -2*S);
          ctx.lineTo(-S, -2*S); ctx.lineTo(-S, -s);
          // top arm
          ctx.lineTo(S, -s); ctx.lineTo(S, -2*S); ctx.lineTo(2*S, -2*S);
          ctx.lineTo(2*S, -S); ctx.lineTo(s, -S);
          ctx.closePath();
        };
        const g = ctx.createLinearGradient(-s, -s, s, s);
        g.addColorStop(0, `hsla(${hue},85%,45%,0.9)`);
        g.addColorStop(0.5, `hsla(${hue + 30},90%,55%,0.95)`);
        g.addColorStop(1, `hsla(${hue + 60},80%,40%,0.9)`);
        ctx.fillStyle = g;
        stepPath(); ctx.fill();
        ctx.strokeStyle = `hsla(${hue + 40},70%,75%,0.7)`; ctx.lineWidth = 1.5;
        stepPath(); ctx.stroke();
        // center hole circle
        ctx.globalCompositeOperation = "destination-out";
        ctx.beginPath(); ctx.arc(0, 0, s * 0.18, 0, Math.PI * 2); ctx.fill();
        ctx.globalCompositeOperation = "source-over";
        // center ring
        ctx.strokeStyle = `hsla(${hue + 60},90%,75%,0.9)`; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.arc(0, 0, s * 0.18, 0, Math.PI * 2); ctx.stroke();
        ctx.restore();
      };
      const loop = () => {
        t += 0.009;
        ctx.fillStyle = "rgba(6,2,12,0.18)"; ctx.fillRect(0, 0, c.width, c.height);
        chakanas.forEach(ch => {
          ch.rot += Math.sin(t * 0.3 + ch.phase) * 0.004;
          const hue = (30 + ch.phase * 40 + t * 8) % 360;
          // glow
          ctx.globalCompositeOperation = "screen";
          const gg = ctx.createRadialGradient(ch.x, ch.y, 0, ch.x, ch.y, ch.size * 1.3);
          gg.addColorStop(0, `hsla(${hue},80%,40%,0.3)`); gg.addColorStop(1, "rgba(0,0,0,0)");
          ctx.fillStyle = gg; ctx.beginPath(); ctx.arc(ch.x, ch.y, ch.size * 1.3, 0, Math.PI * 2); ctx.fill();
          ctx.globalCompositeOperation = "source-over";
          drawChakana(ch.x, ch.y, ch.size, ch.rot, hue);
          // floating textile dots
          for (let i = 0; i < 6; i++) {
            const a = (i / 6) * Math.PI * 2 + t * 0.3 + ch.phase;
            const r = ch.size * 1.5 + Math.sin(t + i) * 10;
            ctx.fillStyle = `hsla(${hue + i * 20},90%,65%,0.6)`;
            ctx.beginPath(); ctx.arc(ch.x + Math.cos(a)*r, ch.y + Math.sin(a)*r, 3, 0, Math.PI*2); ctx.fill();
          }
        });
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },
{
    name: "Dong Ho Mythic Woodblock",
    tags: ["vietnamese", "folk-art", "woodblock", "mythology"],
    description: "Hand-carved woodblock aesthetic featuring the rhythmic curves of the Vietnamese dragon on weathered Dzo paper.",
    animator: (c, ctx, mouse) => {
      let t = 0, id;
      const paperColor = "#e8d5b5"; // Aged Dzo paper
      
      const drawWoodcutStroke = (x, y, w, h, angle, color) => {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(angle);
        ctx.fillStyle = color;
        // Jittered edges to mimic hand-carved wood
        ctx.beginPath();
        ctx.moveTo(-w/2, 0);
        ctx.lineTo(w/2, -h/4);
        ctx.lineTo(w/2 + (Math.random()*2), h/2);
        ctx.lineTo(-w/2, h/2 + (Math.random()*2));
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      };

      const loop = () => {
        t += 0.02;
        // Background: Weathered Paper Texture
        ctx.fillStyle = paperColor;
        ctx.fillRect(0, 0, c.width, c.height);
        
        // Add "Grain" to paper
        ctx.globalAlpha = 0.1;
        for(let i=0; i<100; i++) {
           ctx.fillStyle = "#a89474";
           ctx.fillRect(Math.random()*c.width, Math.random()*c.height, 2, 2);
        }
        ctx.globalAlpha = 1.0;

        const cx = c.width / 2;
        const cy = c.height / 2;

        // The "Dragon" Spine (Sinuous movement)
        for (let i = 0; i < 25; i++) {
          const shift = i * 0.2;
          const x = cx + Math.sin(t + shift) * 150;
          const y = cy + Math.cos(t * 0.5 + shift) * 100;
          
          // Primary "Dong Ho" Red (derived from pebbles)
          const red = "#b22222";
          const indigo = "#1a2a44";
          
          drawWoodcutStroke(x, y, 40 - i, 20 + i, t + i*0.5, i % 2 === 0 ? red : indigo);
          
          // Dragon Scales (Gold/Yellow pigment)
          if (i % 3 === 0) {
            ctx.fillStyle = "#daa520";
            ctx.beginPath();
            ctx.arc(x + 20, y, 5, 0, 7);
            ctx.fill();
          }
        }

        // Ink Blot/Bleed effect (Premium detail)
        ctx.globalCompositeOperation = "multiply";
        const grad = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 150);
        grad.addColorStop(0, "rgba(0,0,0,0.1)");
        grad.addColorStop(1, "transparent");
        ctx.fillStyle = grad;
        ctx.fillRect(0,0,c.width,c.height);
        ctx.globalCompositeOperation = "source-over";

        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },
  {
    name: "Hanoi Iron Deco",
    tags: ["vietnamese", "architecture", "industrial", "deco"],
    description: "Symmetrical wrought-iron patterns and colonial floor tiles from the old villas of Hanoi.",
    animator: (c, ctx, mouse) => {
      let t = 0, id;
      const green = "#1e392a"; // Colonial Green
      const brass = "#c5a059"; // Aged Brass

      const drawScroll = (x, y, r, rot) => {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(rot);
        ctx.strokeStyle = brass;
        ctx.lineWidth = 3;
        ctx.beginPath();
        // S-curve ironwork logic
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(r, -r, r, r, 0, r);
        ctx.stroke();
        
        // Rivet detail
        ctx.fillStyle = brass;
        ctx.beginPath(); ctx.arc(0, 0, 4, 0, 7); ctx.fill();
        ctx.restore();
      };

      const loop = () => {
        t += 0.01;
        ctx.fillStyle = green;
        ctx.fillRect(0, 0, c.width, c.height);

        const cx = c.width/2;
        const cy = c.height/2;

        // Rotating Iron Gate
        for(let i=0; i<8; i++) {
          const angle = (i/8) * Math.PI * 2 + t;
          const x = cx + Math.cos(angle) * 120;
          const y = cy + Math.sin(angle) * 120;
          drawScroll(x, y, 60, angle + Math.PI/2);
          
          // Inner gears
          const ix = cx + Math.cos(-angle*2) * 50;
          const iy = cy + Math.sin(-angle*2) * 50;
          drawScroll(ix, iy, 30, -angle * 3);
        }

        // Center Emblem
        ctx.strokeStyle = brass;
        ctx.lineWidth = 2;
        ctx.strokeRect(cx-40, cy-40, 80, 80);
        ctx.strokeRect(cx-30, cy-30, 60, 60);

        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },
 {
    name: "Imperial Vietnamese Ceramic",
    tags: ["vietnamese", "ceramic", "cobalt", "traditional"],
    description: "Hand-painted Chu Đậu porcelain style with cobalt lotus blooms and a crackled ivory glaze texture.",
    animator: (c, ctx, mouse) => {
      let t = 0, id;
      
      const drawLotusPetal = (x, y, r, angle, hue) => {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(angle);
        
        // Cobalt ink "Bleed" effect
        const g = ctx.createLinearGradient(0, 0, 0, -r);
        g.addColorStop(0, `hsla(${hue}, 100%, 20%, 0.8)`); // Deep cobalt
        g.addColorStop(0.5, `hsla(${hue}, 80%, 40%, 0.6)`); // Washed blue
        g.addColorStop(1, "transparent");
        
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        // Brush-stroke shape (pointed tip)
        ctx.bezierCurveTo(-r * 0.4, -r * 0.3, -r * 0.2, -r, 0, -r);
        ctx.bezierCurveTo(r * 0.2, -r, r * 0.4, -r * 0.3, 0, 0);
        ctx.fill();
        
        // Fine ink outline
        ctx.strokeStyle = `hsla(${hue}, 100%, 15%, 0.3)`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
        ctx.restore();
      };

      const drawCrackle = () => {
        ctx.strokeStyle = "rgba(100, 80, 60, 0.05)"; // Subtle clay crackle
        ctx.lineWidth = 0.5;
        for(let i=0; i<30; i++) {
          ctx.beginPath();
          ctx.moveTo(Math.random()*c.width, 0);
          for(let j=0; j<10; j++) {
            ctx.lineTo(ctx.currentX + (Math.random()-0.5)*50, (c.height/10)*j);
          }
          ctx.stroke();
        }
      };

      const loop = () => {
        t += 0.005;
        // Ivory / Aged Porcelain Background
        ctx.fillStyle = "#fdfaf0";
        ctx.fillRect(0, 0, c.width, c.height);
        
        drawCrackle();

        const cx = c.width / 2;
        const cy = c.height / 2;

        // Floating Lotus Mandalas
        for (let j = 0; j < 3; j++) {
          const orbitX = cx + Math.cos(t * 0.5 + j) * (j * 100);
          const orbitY = cy + Math.sin(t * 0.5 + j) * (j * 50);
          const petals = 8 + j * 4;
          const size = 40 + j * 20;

          for (let i = 0; i < petals; i++) {
            const angle = (i / petals) * Math.PI * 2 + t;
            drawLotusPetal(orbitX, orbitY, size, angle, 220); // 220 = Cobalt Blue
          }
          
          // Center Seed Pod
          ctx.fillStyle = "rgba(180, 140, 40, 0.2)"; // Pale gold tint
          ctx.beginPath();
          ctx.arc(orbitX, orbitY, size * 0.2, 0, Math.PI * 2);
          ctx.fill();
        }

        // Royal Border Overlay
        ctx.strokeStyle = "#1a365d";
        ctx.lineWidth = 15;
        ctx.strokeRect(10, 10, c.width-20, c.height-20);
        ctx.lineWidth = 1;
        ctx.strokeRect(25, 25, c.width-50, c.height-50);

        id = requestAnimationFrame(loop);
      };
      
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },

 {
    name: "Maori Sacred Koru",
    tags: ["maori", "new-zealand", "spiritual", "greenstone"],
    description: "Tapered Koru spirals unfurl in deep jade greenstone, representing perpetual growth and the breath of life.",
    animator: (c, ctx, mouse) => {
      let t = 0, id;
      const spirals = Array.from({ length: 5 }, (_, i) => ({
        x: c.width * (0.2 + (i % 2) * 0.6),
        y: c.height * (0.2 + Math.floor(i / 2) * 0.4),
        size: 60 + i * 10, ph: i
      }));

      const drawKoru = (x, y, size, rot) => {
        ctx.save(); ctx.translate(x, y); ctx.rotate(rot);
        ctx.beginPath();
        for (let i = 0; i < 100; i++) {
          const angle = 0.1 * i;
          const r = (size / 100) * i * Math.pow(1.1, angle);
          const px = r * Math.cos(angle);
          const py = r * Math.sin(angle);
          // Tapered stroke logic
          ctx.lineWidth = (1 - i/100) * 12;
          ctx.strokeStyle = `hsla(150, 60%, ${20 + i/5}%, 0.8)`;
          i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
          if (i % 10 === 0) ctx.stroke();
        }
        ctx.restore();
      };

      const loop = () => {
        t += 0.008;
        ctx.fillStyle = "#050a08"; ctx.fillRect(0, 0, c.width, c.height);
        spirals.forEach(s => {
          drawKoru(s.x, s.y, s.size, t + s.ph);
        });
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },
  {
    name: "Manueline Nautical Tile",
    tags: ["portuguese", "maritime", "ceramic", "architecture"],
    description: "Nautical Manueline knots and armillary spheres in the iconic blue-and-white Azulejo tile style.",
    animator: (c, ctx, mouse) => {
      let t = 0, id;
      const cobalt = "#0038a8";
      const cream = "#f0f0f5";

      const drawTwistedRope = (x, y, r, rot) => {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(rot);
        ctx.strokeStyle = cobalt;
        ctx.lineWidth = 4;
        // Drawing a "rope" segment using a sine-wave path
        ctx.beginPath();
        for (let i = -r; i < r; i++) {
          const dy = Math.sin(i * 0.2 + t * 5) * 5;
          i === -r ? ctx.moveTo(i, dy) : ctx.lineTo(i, dy);
        }
        ctx.stroke();
        ctx.restore();
      };

      const loop = () => {
        t += 0.01;
        ctx.fillStyle = cream;
        ctx.fillRect(0, 0, c.width, c.height);

        const cx = c.width / 2, cy = c.height / 2;

        // Tile Grid with shifting patterns
        for (let i = 0; i < 4; i++) {
          const x = cx + (i % 2 ? 100 : -100);
          const y = cy + (i < 2 ? -100 : 100);
          
          // Armillary Sphere (Navigational instrument)
          ctx.strokeStyle = cobalt;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(x, y, 40, 0, Math.PI * 2);
          ctx.stroke();
          ctx.beginPath();
          ctx.ellipse(x, y, 40, 10, t + i, 0, Math.PI * 2);
          ctx.stroke();
          
          // Decorative border ropes
          drawTwistedRope(x, y + 60, 50, 0);
          drawTwistedRope(x, y - 60, 50, 0);
        }

        // Glaze Shine
        const g = ctx.createLinearGradient(0, 0, c.width, c.height);
        g.addColorStop(0, "rgba(255,255,255,0.2)");
        g.addColorStop(0.5, "transparent");
        ctx.fillStyle = g;
        ctx.fillRect(0,0,c.width,c.height);

        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },
  {
    name: "Congolese Kuba Rhythm",
    tags: ["congo", "textile", "geometry", "african-art"],
    description: "Sophisticated, shifting geometric 'interrupted' rhythms inspired by Congolese raffia cloth.",
    animator: (c, ctx, mouse) => {
      let t = 0, id;
      const palette = ["#d2b48c", "#2c2c2c", "#8b0000"]; // Raffia, Charcoal, Madder

      const drawKubaBlock = (x, y, size, variant) => {
        ctx.save();
        ctx.translate(x, y);
        ctx.fillStyle = palette[1];
        
        // Characteristic sharp, interrupted angles
        ctx.beginPath();
        if (variant % 2 === 0) {
            ctx.moveTo(0, 0); ctx.lineTo(size, size); ctx.lineTo(size, 0);
        } else {
            ctx.moveTo(0, size); ctx.lineTo(size, 0); ctx.lineTo(0, 0);
        }
        ctx.fill();
        
        // Hand-stitched line texture
        ctx.strokeStyle = palette[0];
        ctx.setLineDash([5, 3]);
        ctx.stroke();
        ctx.restore();
      };

      const loop = () => {
        t += 0.005;
        ctx.fillStyle = palette[0];
        ctx.fillRect(0, 0, c.width, c.height);

        const gridSize = 60;
        for (let x = 0; x < c.width; x += gridSize) {
          for (let y = 0; y < c.height; y += gridSize) {
            // "The Interruption": Pattern changes based on time and mouse
            const noise = Math.sin(x * 0.01 + y * 0.01 + t);
            if (noise > 0.2) {
              drawKubaBlock(x, y, gridSize, Math.floor(x + y + t));
            }
          }
        }
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },
 {
  name: "Glacial Erosion",
  tags: ["icelandic", "tectonic", "texture", "abstract"],
  description: "Aerial perspective of Icelandic braided rivers carving through black volcanic ash and iron-rich minerals.",
  animator: (c, ctx, mouse) => {
    let t = 0, id;
    const lines = Array.from({ length: 15 }, (_, i) => ({
      y: (c.height / 15) * i,
      offset: i * 2,
      speed: 0.2 + Math.random() * 0.4,
      color: i % 3 === 0 ? "#00f2ff" : (i % 2 === 0 ? "#8b4513" : "#222")
    }));

    const loop = () => {
      t += 0.005;
      // Background: Deep Basalt Black
      ctx.fillStyle = "#0a0a0a";
      ctx.fillRect(0, 0, c.width, c.height);

      // Add "Sand" Grit Texture
      for (let i = 0; i < 200; i++) {
        ctx.fillStyle = "rgba(255,255,255,0.03)";
        ctx.fillRect(Math.random() * c.width, Math.random() * c.height, 1, 1);
      }

      ctx.save();
      lines.forEach((line, i) => {
        ctx.beginPath();
        ctx.strokeStyle = line.color;
        ctx.lineWidth = 15 - i * 0.5;
        ctx.globalAlpha = line.color === "#00f2ff" ? 0.8 : 0.4;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";

        // Create the "Braided" river effect using sine-wave distortion
        for (let x = -20; x < c.width + 20; x += 10) {
          const distortion = Math.sin(x * 0.005 + t * line.speed + line.offset) * 40;
          const riverFork = Math.cos(x * 0.01 - t) * 20;
          const mouseInfl = mouse.y > 0 ? (mouse.y - line.y) * 0.1 : 0;
          
          const py = line.y + distortion + riverFork + mouseInfl;
          x === -20 ? ctx.moveTo(x, py) : ctx.lineTo(x, py);
        }
        ctx.stroke();

        // Add a "Glacial Glow" to the blue veins
        if (line.color === "#00f2ff") {
          ctx.shadowBlur = 15;
          ctx.shadowColor = "#00f2ff";
          ctx.stroke();
          ctx.shadowBlur = 0;
        }
      });
      ctx.restore();

      // Vignette to pull focus to center
      const v = ctx.createRadialGradient(c.width/2, c.height/2, c.width/4, c.width/2, c.height/2, c.width);
      v.addColorStop(0, "transparent");
      v.addColorStop(1, "rgba(0,0,0,0.8)");
      ctx.fillStyle = v;
      ctx.fillRect(0,0,c.width,c.height);

      id = requestAnimationFrame(loop);
    };

    return { start: loop, stop: () => cancelAnimationFrame(id) };
  }
},
{
    name: "Imperial Kumiko Lattice",
    tags: ["japan", "geometric", "architecture", "minimalist"],
    description: "Intricate Japanese Kumiko joinery featuring the Asanoha pattern in light cypress wood.",
    animator: (c, ctx, mouse) => {
      let t = 0, id;
      const drawStar = (x, y, r) => {
        ctx.save(); ctx.translate(x, y);
        ctx.strokeStyle = "#e2d1b3"; // Hinoki Wood
        ctx.lineWidth = 1.5;
        
        // The structural 'bones'
        for (let i = 0; i < 6; i++) {
          ctx.rotate(Math.PI / 3);
          ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, -r); ctx.stroke();
          // The interlocking 'leaf' geometry
          ctx.beginPath(); ctx.moveTo(0, -r/2); ctx.lineTo(r/3, -r/1.2); ctx.stroke();
          ctx.beginPath(); ctx.moveTo(0, -r/2); ctx.lineTo(-r/3, -r/1.2); ctx.stroke();
        }
        ctx.restore();
      };

      const loop = () => {
        t += 0.005;
        ctx.fillStyle = "#1a1714"; // Dark Shoji shadow
        ctx.fillRect(0, 0, c.width, c.height);

        const r = 50;
        const xStep = r * Math.sqrt(3);
        const yStep = r * 1.5;

        for (let y = 0; y < c.height + r; y += yStep) {
          const shift = (Math.floor(y / yStep) % 2) * (xStep / 2);
          for (let x = 0; x < c.width + xStep; x += xStep) {
            const d = Math.hypot(x + shift - mouse.x, y - mouse.y);
            const rot = Math.sin(t + d * 0.01) * 0.1;
            drawStar(x + shift, y, r + Math.sin(t) * 2);
          }
        }
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },
  {
    name: "Highland Weaver",
    tags: ["scotland", "textile", "geometry", "weaving"],
    description: "A generative tartan loom that weaves infinite variations of wool thread patterns.",
    animator: (c, ctx, mouse) => {
      let t = 0, id;
      const colors = ["#002147", "#05472a", "#000000", "#d4af37"]; // Navy, Green, Black, Gold

      const loop = () => {
        t += 0.01;
        ctx.fillStyle = "#05472a";
        ctx.fillRect(0, 0, c.width, c.height);

        const drawThreads = (horizontal) => {
          for (let i = 0; i < (horizontal ? c.height : c.width); i += 10) {
            const color = colors[Math.floor((i + t * 20) / 40) % colors.length];
            ctx.globalAlpha = 0.4;
            ctx.fillStyle = color;
            if (horizontal) ctx.fillRect(0, i, c.width, 4);
            else ctx.fillRect(i, 0, 4, c.height);
          }
        };

        ctx.globalCompositeOperation = "multiply";
        drawThreads(true);  // Warp
        drawThreads(false); // Weft
        ctx.globalCompositeOperation = "source-over";

        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },
  {
    name: "Swiss Machine Logic",
    tags: ["switzerland", "mechanical", "engineering", "industrial"],
    description: "Precision-engineered chronograph movement with interlocking brass gears and steel plates.",
    animator: (c, ctx, mouse) => {
      let t = 0, id;

      const drawGear = (x, y, teeth, r, color, speed) => {
        ctx.save(); ctx.translate(x, y); ctx.rotate(t * speed);
        ctx.fillStyle = color;
        ctx.beginPath();
        for (let i = 0; i < teeth * 2; i++) {
          const angle = (i / (teeth * 2)) * Math.PI * 2;
          const dist = i % 2 === 0 ? r : r * 0.9;
          ctx.lineTo(Math.cos(angle) * dist, Math.sin(angle) * dist);
        }
        ctx.closePath(); ctx.fill();
        // Inner cutout
        ctx.globalCompositeOperation = "destination-out";
        ctx.beginPath(); ctx.arc(0, 0, r * 0.4, 0, 7); ctx.fill();
        ctx.globalCompositeOperation = "source-over";
        ctx.restore();
      };

      const loop = () => {
        t += 0.02;
        ctx.fillStyle = "#2c2e31"; // Brushed steel plate
        ctx.fillRect(0, 0, c.width, c.height);

        const cx = c.width / 2, cy = c.height / 2;
        // The main 'Mainspring' gear
        drawGear(cx, cy, 24, 100, "#d4af37", 0.5);
        // Interlocking seconds gear
        drawGear(cx + 140, cy, 12, 50, "#a5a9b4", -1);
        // Small ruby bearing
        ctx.fillStyle = "#e0115f";
        ctx.beginPath(); ctx.arc(cx + 140, cy, 8, 0, 7); ctx.fill();

        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },
  {
  name: "Kinetic Sashiko Blueprint",
  tags: ["japan", "geometric", "textile", "minimalism"],
  description: "Traditional Sashiko stitching patterns (Seigaiha and Shippo) reimagined as a living, breathing indigo blueprint.",
  animator: (c, ctx, mouse) => {
    let t = 0, id;
    const SIZE = 60;
    const cols = Math.ceil(c.width / SIZE) + 1;
    const rows = Math.ceil(c.height / SIZE) + 1;

    const drawStitchArc = (x, y, r, start, end, dash) => {
      ctx.beginPath();
      ctx.setLineDash([dash, 4]); // The "Stitch" effect
      ctx.arc(x, y, r, start, end);
      ctx.stroke();
    };

    const loop = () => {
      t += 0.01;
      // Indigo Dye Background
      ctx.fillStyle = "#0a1a2f";
      ctx.fillRect(0, 0, c.width, c.height);

      ctx.strokeStyle = "#e0eafc"; // Silk white thread
      ctx.lineWidth = 1.5;

      for (let r = 0; r < rows; r++) {
        for (let l = 0; l < cols; l++) {
          const x = l * SIZE;
          const y = r * SIZE;
          const dist = Math.hypot(x - mouse.x, y - mouse.y);
          const influence = Math.max(0, 1 - dist / 300);
          
          ctx.save();
          ctx.translate(x, y);
          // Oscillating scale to simulate "breathing" fabric
          const s = 1 + Math.sin(t + (l + r) * 0.5) * 0.05;
          ctx.scale(s, s);

          // Draw Overlocking Shippo (Seven Treasures) Pattern
          ctx.globalAlpha = 0.3 + influence * 0.7;
          drawStitchArc(SIZE/2, 0, SIZE/2, 0, Math.PI, 5);
          drawStitchArc(SIZE/2, SIZE, SIZE/2, Math.PI, 0, 5);
          drawStitchArc(0, SIZE/2, SIZE/2, -Math.PI/2, Math.PI/2, 5);
          drawStitchArc(SIZE, SIZE/2, SIZE/2, Math.PI/2, -Math.PI/2, 5);
          
          ctx.restore();
        }
      }
      id = requestAnimationFrame(loop);
    };
    return { start: loop, stop: () => cancelAnimationFrame(id) };
  }
},
{
  name: "Longmai: The Dragon Veins",
  tags: ["china", "ink-wash", "shanshui", "fluid"],
  description: "Abstract ink-wash mountain ridges that shift like dragon veins across aged rice paper.",
  animator: (c, ctx, mouse) => {
    let t = 0, id;
    const layers = 5;

    const loop = () => {
      t += 0.004;
      // Aged Rice Paper Texture
      ctx.fillStyle = "#f2efdf";
      ctx.fillRect(0, 0, c.width, c.height);

      for (let l = 0; l < layers; l++) {
        const speed = (l + 1) * 0.5;
        const depth = (l / layers);
        
        ctx.beginPath();
        // Ink Bleed Gradient
        const grad = ctx.createLinearGradient(0, c.height * 0.3, 0, c.height);
        grad.addColorStop(0, `rgba(20, 20, 25, ${0.1 + depth * 0.8})`);
        grad.addColorStop(1, `rgba(40, 40, 50, 0)`);
        ctx.fillStyle = grad;

        ctx.moveTo(0, c.height);
        for (let x = 0; x <= c.width; x += 10) {
          // Generative mountain ridge logic
          const noise = Math.sin(x * 0.005 * speed + t) * 30;
          const noise2 = Math.cos(x * 0.01 - t * 0.5) * 20;
          const y = (c.height * 0.4) + (l * 60) + noise + noise2 - (mouse.y * 0.1 * (l+1));
          ctx.lineTo(x, y);
        }
        ctx.lineTo(c.width, c.height);
        ctx.fill();
      }

      // The "Seal" - Cinnabar Red Stamp
      ctx.fillStyle = "#b22222";
      ctx.globalAlpha = 0.8;
      ctx.fillRect(c.width - 80, 50, 40, 40);
      ctx.strokeStyle = "#f2efdf";
      ctx.lineWidth = 2;
      ctx.strokeRect(c.width - 75, 55, 30, 30);
      ctx.globalAlpha = 1.0;

      id = requestAnimationFrame(loop);
    };
    return { start: loop, stop: () => cancelAnimationFrame(id) };
  }
},

{
  name: "Highland Pine & Mist",
  tags: ["china", "wuxia", "nature", "calligraphy"],
  description: "Gnarled ancient pines emerging from a shifting sea of clouds in a high-contrast Wuxia ink style.",
  animator: (c, ctx, mouse) => {
    let t = 0, id;

    const drawBranch = (x, y, len, angle, depth) => {
      if (depth === 0) return;
      
      const x2 = x + Math.cos(angle) * len;
      const y2 = y + Math.sin(angle) * len;
      
      ctx.beginPath();
      ctx.strokeStyle = "#111"; // Iron Ink
      ctx.lineWidth = depth * 1.5;
      ctx.moveTo(x, y);
      ctx.lineTo(x2, y2);
      ctx.stroke();

      // Recursive growth
      const segments = 2;
      for (let i = 0; i < segments; i++) {
        const newAngle = angle + (Math.sin(t + depth) * 0.2) + (i === 0 ? 0.5 : -0.5);
        drawBranch(x2, y2, len * 0.75, newAngle, depth - 1);
      }
    };

    const loop = () => {
      t += 0.008;
      // Silk Scroll Background
      ctx.fillStyle = "#e6e0d4";
      ctx.fillRect(0, 0, c.width, c.height);

      // 1. Shifting Mist (The clouds)
      for (let i = 0; i < 3; i++) {
        ctx.fillStyle = `rgba(255,255,255, ${0.4 - i * 0.1})`;
        ctx.beginPath();
        const drift = Math.sin(t * 0.5 + i) * 50;
        ctx.ellipse(c.width / 2 + drift, c.height * 0.7 + i * 40, c.width, 100, 0, 0, Math.PI * 2);
        ctx.fill();
      }

      // 2. The Great Pine
      ctx.save();
      const mouseTilt = (mouse.x / c.width - 0.5) * 0.2;
      drawBranch(c.width * 0.7, c.height * 0.8, 80, -Math.PI / 2 + mouseTilt, 6);
      ctx.restore();

      // 3. Martial Arts "Pulse" (Cinnabar Red)
      ctx.fillStyle = "rgba(178, 34, 34, 0.05)";
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 100 * Math.abs(Math.sin(t)), 0, Math.PI * 2);
      ctx.fill();

      id = requestAnimationFrame(loop);
    };
    return { start: loop, stop: () => cancelAnimationFrame(id) };
  }
},
{
  name: "Tamahagane Forge",
  tags: ["japan", "samurai", "industrial", "fire"],
  description: "The rhythmic folding of heated jewel steel. Move the mouse to 'hammer' the molten surface into a blade.",
  animator: (c, ctx, mouse) => {
    let t = 0, id;
    const sparks = [];

    const loop = () => {
      t += 0.02;
      // Background: Quenched Steel (Deep Charcoal)
      ctx.fillStyle = "#050508";
      ctx.fillRect(0, 0, c.width, c.height);

      // Molten "Fold" Effect
      const cx = c.width / 2, cy = c.height / 2;
      for (let i = 0; i < 8; i++) {
        const r = 100 + i * 20;
        const opacity = 0.1 - i * 0.01;
        ctx.strokeStyle = `rgba(255, 100, 0, ${opacity})`;
        ctx.lineWidth = 40;
        ctx.beginPath();
        // The "Fold" geometry
        for (let a = 0; a < Math.PI * 2; a += 0.2) {
          const distort = Math.sin(a * 3 + t + (mouse.x * 0.01)) * 20;
          const x = cx + Math.cos(a) * (r + distort);
          const y = cy + Math.sin(a) * (r + distort);
          a === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.stroke();
      }

      // Hammer Sparks
      if (Math.random() > 0.8) {
        sparks.push({ x: mouse.x, y: mouse.y, vx: (Math.random()-0.5)*10, vy: (Math.random()-0.5)*10, life: 1 });
      }

      sparks.forEach((s, i) => {
        s.x += s.vx; s.y += s.vy; s.life -= 0.02;
        ctx.fillStyle = `rgba(255, 200, 50, ${s.life})`;
        ctx.fillRect(s.x, s.y, 2, 2);
        if (s.life <= 0) sparks.splice(i, 1);
      });

      // The Blade's Core (White Heat)
      const g = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 150);
      g.addColorStop(0, "rgba(255, 255, 200, 0.15)");
      g.addColorStop(1, "transparent");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, c.width, c.height);

      id = requestAnimationFrame(loop);
    };
    return { start: loop, stop: () => cancelAnimationFrame(id) };
  }
},

{
  name: "Blood Moon: Ronin's Fate",
  tags: ["japan", "samurai", "cinematic", "weapon", "premium"],
  description: "A high-fidelity katana silhouette against a layered blood moon. The blade catches a crimson glint as you move.",
  animator: (c, ctx, mouse) => {
    let t = 0, id;
    const snowflakes = Array.from({ length: 60 }, () => ({
      x: Math.random() * c.width,
      y: Math.random() * c.height,
      s: Math.random() * 2 + 0.5,
      v: Math.random() * 1 + 0.5
    }));

    const drawKatana = (x, y, rot) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rot);
      
      // 1. Blade (Metallic Steel)
      const grad = ctx.createLinearGradient(0, -3, 0, 3);
      grad.addColorStop(0, "#111"); grad.addColorStop(0.5, "#444"); grad.addColorStop(1, "#222");
      ctx.fillStyle = grad;
      
      ctx.beginPath();
      ctx.moveTo(35, -3); // Start after guard
      ctx.lineTo(280, -1); // Edge
      ctx.quadraticCurveTo(300, 0, 280, 4); // Tip (Kissaki)
      ctx.lineTo(35, 4); // Back
      ctx.fill();

      // 2. Handguard (Ornate Tsuba)
      ctx.fillStyle = "#000";
      ctx.strokeStyle = "#500"; // Dried blood / Iron look
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(35, 0, 18, 0, Math.PI * 2);
      ctx.fill(); ctx.stroke();

      // 3. Hilt (Tsuka with Wrap)
      ctx.fillStyle = "#080808";
      ctx.fillRect(-90, -5, 125, 10);
      // Diamond wrap details
      ctx.strokeStyle = "#1a1a1a";
      for(let i=0; i<6; i++) {
        ctx.strokeRect(-80 + i*18, -5, 9, 10);
      }

      // 4. Dynamic Blade Reflection (Hamon light)
      const glintX = 40 + ((Math.sin(t * 3) + 1) * 110);
      const glint = ctx.createRadialGradient(glintX, 0, 0, glintX, 0, 40);
      glint.addColorStop(0, "rgba(255, 0, 0, 0.4)");
      glint.addColorStop(1, "transparent");
      ctx.fillStyle = glint;
      ctx.globalCompositeOperation = "screen";
      ctx.fillRect(40, -3, 240, 6);
      
      ctx.restore();
    };

    const loop = () => {
      t += 0.01;
      ctx.globalCompositeOperation = "source-over";
      
      // Background: Deepest Obsidian
      ctx.fillStyle = "#050202";
      ctx.fillRect(0, 0, c.width, c.height);

      const mx = c.width * 0.75, my = c.height * 0.25;

      // 1. The Blood Moon Bloom
      for(let i=3; i>0; i--) {
        ctx.fillStyle = `rgba(180, 0, 0, ${0.05 / i})`;
        ctx.beginPath(); ctx.arc(mx, my, 80 * i + Math.sin(t)*5, 0, 7); ctx.fill();
      }
      ctx.fillStyle = "#900";
      ctx.beginPath(); ctx.arc(mx, my, 80, 0, 7); ctx.fill();

      // 2. Distant Parallax Mountains
      ctx.fillStyle = "#0a0303";
      ctx.beginPath();
      ctx.moveTo(0, c.height);
      for(let i=0; i<=c.width; i+=50) {
        ctx.lineTo(i, c.height*0.7 + Math.sin(i*0.01)*40);
      }
      ctx.lineTo(c.width, c.height); ctx.fill();

      // 3. Atmospheric Snow
      ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
      snowflakes.forEach(s => {
        s.y = (s.y + s.v) % c.height;
        s.x += Math.sin(t + s.y*0.01) * 0.3;
        ctx.beginPath(); ctx.arc(s.x, s.y, s.s, 0, 7); ctx.fill();
      });

      // 4. The Sword (Follows mouse, points to moon)
      const angle = Math.atan2(my - mouse.y, mx - mouse.x);
      drawKatana(mouse.x, mouse.y, angle);

      // 5. Blade Slash VFX (Triggered by mouse speed)
      ctx.globalCompositeOperation = "screen";
      const slash = ctx.createLinearGradient(mouse.x-100, mouse.y, mouse.x+100, mouse.y);
      slash.addColorStop(0, "transparent");
      slash.addColorStop(0.5, "rgba(255, 255, 255, 0.15)");
      slash.addColorStop(1, "transparent");
      ctx.fillStyle = slash;
      ctx.fillRect(0, mouse.y - 2, c.width, 4);

      id = requestAnimationFrame(loop);
    };
    return { start: loop, stop: () => cancelAnimationFrame(id) };
  }
},
{
  name: "Forbidden Gate Parallax",
  tags: ["china", "architecture", "imperial", "cinematic"],
  description: "Layers of Imperial Pagoda roofs and swaying lanterns in a deep cinnabar sunset.",
  animator: (c, ctx, mouse) => {
    let t = 0, id;
    
    const drawRoof = (y, scale, color) => {
      ctx.fillStyle = color;
      const x = c.width / 2;
      const w = 400 * scale;
      ctx.beginPath();
      ctx.moveTo(x - w, y);
      ctx.quadraticCurveTo(x, y - 50 * scale, x + w, y); // Curved eaves
      ctx.lineTo(x + w - 20, y + 40);
      ctx.lineTo(x - w + 20, y + 40);
      ctx.closePath();
      ctx.fill();
    };

    const loop = () => {
      t += 0.01;
      const mx = (mouse.x / c.width) - 0.5;
      
      // Sunset Sky
      const bg = ctx.createLinearGradient(0, 0, 0, c.height);
      bg.addColorStop(0, "#2b0a0a"); bg.addColorStop(1, "#8b0000");
      ctx.fillStyle = bg; ctx.fillRect(0, 0, c.width, c.height);

      // 1. Back Layer (Small pagoda)
      drawRoof(c.height * 0.4 + (mx * 20), 0.5, "#1a0000");
      
      // 2. Mid Layer (Main roof)
      drawRoof(c.height * 0.6 + (mx * 50), 1, "#0f0000");

      // 3. Swaying Lanterns
      for (let i = 0; i < 2; i++) {
        const lx = (i === 0 ? c.width * 0.2 : c.width * 0.8) + (mx * 80);
        const ly = c.height * 0.4;
        const sway = Math.sin(t) * 10;
        
        ctx.strokeStyle = "#ffd700"; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(lx, 0); ctx.lineTo(lx + sway, ly); ctx.stroke();
        
        ctx.fillStyle = "#ff4500";
        ctx.shadowBlur = 20; ctx.shadowColor = "#ff4500";
        ctx.beginPath(); ctx.ellipse(lx + sway, ly, 20, 30, 0, 0, 7); ctx.fill();
        ctx.shadowBlur = 0;
      }

      // 4. Golden Dust
      ctx.fillStyle = "rgba(255, 215, 0, 0.2)";
      for(let i=0; i<20; i++) {
        ctx.beginPath(); ctx.arc((Math.sin(i+t)*c.width), (i*40)%c.height, 1, 0, 7); ctx.fill();
      }

      id = requestAnimationFrame(loop);
    };
    return { start: loop, stop: () => cancelAnimationFrame(id) };
  }
},
{
  name: "The Master's Katana",
  tags: ["japan", "samurai", "sword", "weapon"],
  description: "A detailed 17th-century Katana. Move the mouse to wield the blade; the steel glints as it catches the blood-moon light.",
  animator: (c, ctx, mouse) => {
    let t = 0, id;
    
    const drawKatana = (x, y, targetX, targetY) => {
      const angle = Math.atan2(targetY - y, targetX - x);
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);

      // 1. The Blade (Steel)
      const bladeLen = 250;
      const g = ctx.createLinearGradient(0, -5, 0, 5);
      g.addColorStop(0, "#666"); g.addColorStop(0.5, "#eee"); g.addColorStop(1, "#999");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.moveTo(40, -4); // Start at guard
      ctx.lineTo(40 + bladeLen, -2); // Edge
      ctx.quadraticCurveTo(40 + bladeLen + 20, 0, 40 + bladeLen, 3); // Point (Kissaki)
      ctx.lineTo(40, 5); // Back (Mune)
      ctx.fill();

      // 2. The Handguard (Tsuba)
      ctx.fillStyle = "#111";
      ctx.strokeStyle = "#d4af37"; // Gold inlay
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.ellipse(40, 0, 10, 25, 0, 0, Math.PI * 2);
      ctx.fill(); ctx.stroke();

      // 3. The Hilt (Tsuka)
      ctx.fillStyle = "#300"; // Dark wrap
      ctx.fillRect(-80, -6, 120, 12);
      // Diamond wrap pattern (Menuki)
      ctx.strokeStyle = "#000";
      for(let i=0; i<5; i++) {
        ctx.strokeRect(-70 + i*20, -6, 10, 12);
      }

      // 4. The Glint (Dynamic light)
      const glintPos = (Math.sin(t * 2) * 0.5 + 0.5) * bladeLen;
      const glintG = ctx.createRadialGradient(40 + glintPos, 0, 0, 40 + glintPos, 0, 30);
      glintG.addColorStop(0, "rgba(255,255,255,0.8)");
      glintG.addColorStop(1, "transparent");
      ctx.fillStyle = glintG;
      ctx.fillRect(40, -5, bladeLen, 10);

      ctx.restore();
    };

    const loop = () => {
      t += 0.01;
      ctx.fillStyle = "#050508"; ctx.fillRect(0, 0, c.width, c.height);
      
      // The Moon (Light Source)
      const mx = c.width * 0.8, my = c.height * 0.2;
      ctx.fillStyle = "#800";
      ctx.beginPath(); ctx.arc(mx, my, 80, 0, 7); ctx.fill();

      // Draw the Sword (Hilt follows mouse, points to moon)
      drawKatana(mouse.x, mouse.y, mx, my);

      id = requestAnimationFrame(loop);
    };
    return { start: loop, stop: () => cancelAnimationFrame(id) };
  }
},
{
  name: "Wrath of the Stone Shi",
  tags: ["china", "imperial", "sculpture", "beast", "premium"],
  description: "A high-fidelity rendering of an Imperial Guardian Lion's mane and maw. The stone 'breathes' with ancient power.",
  animator: (c, ctx, mouse) => {
    let t = 0, id;

    const drawSculptedCurl = (x, y, size, rot, intensity) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rot);
      
      // Stone Shadow Depth
      const stoneGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, size);
      stoneGrad.addColorStop(0, "#2a2a2a");
      stoneGrad.addColorStop(1, "#0a0a0a");
      
      ctx.fillStyle = stoneGrad;
      ctx.beginPath();
      // The "Imperial Curl" - A stylized, heavy nautilus shape
      for (let i = 0; i < 30; i++) {
        const a = 0.2 * i;
        const d = (size / 30) * i;
        const px = Math.cos(a) * d;
        const py = Math.sin(a) * d;
        i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
      }
      ctx.lineWidth = 3;
      ctx.strokeStyle = `rgba(212, 175, 55, ${0.1 + intensity * 0.4})`; // Gold leaf in cracks
      ctx.stroke();
      ctx.fill();

      // Highlight on the stone edge
      ctx.strokeStyle = "rgba(255,255,255,0.05)";
      ctx.lineWidth = 1;
      ctx.stroke();
      
      ctx.restore();
    };

    const loop = () => {
      t += 0.008;
      // Dark Sanctuary Background
      ctx.fillStyle = "#0a0808";
      ctx.fillRect(0, 0, c.width, c.height);

      const cx = c.width / 2;
      const cy = c.height / 2;

      // 1. The Mane (Radial Grid)
      for (let i = 0; i < 40; i++) {
        const angle = (i / 10) * Math.PI * 2 + t * 0.2;
        const dist = 120 + Math.floor(i / 10) * 60;
        const x = cx + Math.cos(angle) * dist;
        const y = cy + Math.sin(angle) * dist;
        
        const mDist = Math.hypot(x - mouse.x, y - mouse.y);
        const intensity = Math.max(0, 1 - mDist / 200);
        
        drawSculptedCurl(x, y, 30 + intensity * 15, angle + t, intensity);
      }

      // 2. The Imperial Maw (The Face Center)
      ctx.save();
      ctx.translate(cx, cy);
      
      // Stone Teeth (Sharp Geometry)
      ctx.fillStyle = "#111";
      for(let i=0; i<4; i++) {
        ctx.rotate(Math.PI / 2);
        ctx.beginPath();
        ctx.moveTo(-20, 40);
        ctx.lineTo(0, 80 + Math.sin(t*2)*10); // Fangs "grow" with pulse
        ctx.lineTo(20, 40);
        ctx.fill();
        ctx.strokeStyle = "#333";
        ctx.stroke();
      }
      
      // Central "Spirit Orb" (The pearl they often guard)
      const orbG = ctx.createRadialGradient(0, 0, 0, 0, 0, 40);
      orbG.addColorStop(0, "#d4af37");
      orbG.addColorStop(1, "transparent");
      ctx.fillStyle = orbG;
      ctx.globalCompositeOperation = "screen";
      ctx.beginPath(); ctx.arc(0, 0, 30 + Math.sin(t)*5, 0, 7); ctx.fill();
      ctx.restore();

      id = requestAnimationFrame(loop);
    };
    return { start: loop, stop: () => cancelAnimationFrame(id) };
  }
}

];