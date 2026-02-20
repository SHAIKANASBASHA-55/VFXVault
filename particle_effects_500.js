// ═══════════════════════════════════════════════════════════════
//  500 PARTICLE EFFECTS LIBRARY
//  10 Categories × 50 Effects Each
// ═══════════════════════════════════════════════════════════════

// ────────────────────────────────────────────────────────────
//  QUANTUM FX (50 effects)
// ────────────────────────────────────────────────────────────

export const quantumEffects = [
  {
    name: "Tachyon Stream",
    tags: ["speed", "vector"],
    description: "Particles moving faster than light, creating a reverse-time trail.",
    animator: (c, ctx, mouse) => {
      let t = 0, id;
      const loop = () => {
        t += 0.5;
        ctx.fillStyle = "rgba(10, 0, 5, 0.2)";
        ctx.fillRect(0, 0, c.width, c.height);
        for (let i = 0; i < 30; i++) {
          const x = mouse.x + Math.tan(i + t * 0.1) * 50;
          const y = mouse.y + (i - 15) * 5;
          ctx.fillStyle = "#ff3366";
          ctx.fillRect(x, y, 4, 1); // Sharp horizontal streaks
        }
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },
  {
    name: "Event Horizon Glow",
    tags: ["gravity", "dark"],
    description: "Light bending around a central gravitational point.",
    animator: (c, ctx, mouse) => {
      let t = 0, id;
      const loop = () => {
        t += 0.05;
        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, c.width, c.height);
        // The "Black Hole" center
        ctx.shadowBlur = 20; ctx.shadowColor = "#f90";
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 15, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
        for (let i = 0; i < 40; i++) {
          const a = i + t;
          const r = 30 + i;
          ctx.strokeStyle = `rgba(255, 150, 0, ${1 - i / 40})`;
          ctx.beginPath();
          ctx.arc(mouse.x, mouse.y, r, a, a + 0.5);
          ctx.stroke();
        }
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },
  {
    name: "Casimir Plate Force",
    tags: ["vacuum", "force"],
    description: "Parallel lines being 'pushed' together by vacuum pressure.",
    animator: (c, ctx, mouse) => {
      let t = 0, id;
      const loop = () => {
        t += 0.04;
        ctx.fillStyle = "rgba(0,0,0,0.3)";
        ctx.fillRect(0, 0, c.width, c.height);
        const gap = Math.abs(Math.sin(t) * 40) + 5;
        ctx.strokeStyle = "#00ffcc";
        ctx.lineWidth = 2;
        // The two "plates"
        ctx.strokeRect(mouse.x - gap, mouse.y - 40, 2, 80);
        ctx.strokeRect(mouse.x + gap, mouse.y - 40, 2, 80);
        // Virtual particles inside
        for (let i = 0; i < 10; i++) {
          ctx.fillStyle = "white";
          ctx.fillRect(mouse.x - gap + Math.random() * (gap * 2), mouse.y + (Math.random() - 0.5) * 80, 1, 1);
        }
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },
  {
    name: "Quantum Chromodynamics (QCD)",
    tags: ["quarks", "color"],
    description: "Three-color particles (Red, Green, Blue) bound by gluon-like lines.",
    animator: (c, ctx, mouse) => {
      let t = 0, id;
      const colors = ["#f00", "#0f0", "#00f"];
      const loop = () => {
        t += 0.08;
        ctx.fillStyle = "rgba(0,0,0,0.2)";
        ctx.fillRect(0, 0, c.width, c.height);
        const pts = colors.map((col, i) => ({
          x: mouse.x + Math.cos(t + (i * Math.PI * 2) / 3) * 30,
          y: mouse.y + Math.sin(t + (i * Math.PI * 2) / 3) * 30,
          color: col
        }));
        ctx.lineWidth = 1;
        pts.forEach((p, i) => {
          const next = pts[(i + 1) % 3];
          ctx.strokeStyle = "rgba(255,255,255,0.2)";
          ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(next.x, next.y); ctx.stroke();
          ctx.fillStyle = p.color; ctx.beginPath(); ctx.arc(p.x, p.y, 4, 0, Math.PI * 2); ctx.fill();
        });
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },
  {
    name: "Probability Heatmap",
    tags: ["math", "field"],
    description: "Concentrically colored zones showing particle likelihood.",
    animator: (c, ctx, mouse) => {
      let t = 0, id;
      const loop = () => {
        t += 0.02;
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, c.width, c.height);
        for (let r = 4; r > 0; r--) {
          const radius = r * 20 + Math.sin(t) * 10;
          ctx.fillStyle = `rgba(0, 100, 255, 0.15)`;
          ctx.beginPath();
          ctx.arc(mouse.x, mouse.y, radius, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.fillStyle = "white";
        ctx.fillRect(mouse.x - 1, mouse.y - 1, 2, 2);
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },
  {
    name: "Geometric Spinor",
    tags: ["shapes", "spin"],
    description: "A rotating square that complexifies as it spins.",
    animator: (c, ctx, mouse) => {
      let t = 0, id;
      const loop = () => {
        t += 0.05;
        ctx.fillStyle = "rgba(0,0,0,0.2)";
        ctx.fillRect(0, 0, c.width, c.height);
        ctx.strokeStyle = "#0ff";
        ctx.save();
        ctx.translate(mouse.x, mouse.y);
        for (let i = 0; i < 5; i++) {
          ctx.rotate(t * 0.2);
          ctx.strokeRect(-20 - i * 5, -20 - i * 5, 40 + i * 10, 40 + i * 10);
        }
        ctx.restore();
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },
  {
    name: "Vacuum Polarization",
    tags: ["charge", "dipole"],
    description: "Temporary dipoles appearing and aligning near the charge.",
    animator: (c, ctx, mouse) => {
      let id;
      const loop = () => {
        ctx.fillStyle = "rgba(10, 10, 30, 0.2)";
        ctx.fillRect(0, 0, c.width, c.height);
        for (let i = 0; i < 15; i++) {
          const ang = (i / 15) * Math.PI * 2;
          const r = 50;
          const x = mouse.x + Math.cos(ang) * r;
          const y = mouse.y + Math.sin(ang) * r;
          // Small +/- pairs
          ctx.fillStyle = "#f33"; ctx.fillRect(x - 3, y, 2, 2);
          ctx.fillStyle = "#33f"; ctx.fillRect(x + 3, y, 2, 2);
        }
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },
  {
    name: "Planck Spark Lattice",
    tags: ["digital", "noise"],
    description: "Grid points that flicker at the smallest possible scales.",
    animator: (c, ctx, mouse) => {
      let id;
      const loop = () => {
        ctx.fillStyle = "rgba(0,0,0,0.4)";
        ctx.fillRect(0, 0, c.width, c.height);
        const step = 15;
        for (let x = -60; x <= 60; x += step) {
          for (let y = -60; y <= 60; y += step) {
            if (Math.random() > 0.9) {
              ctx.fillStyle = "#fff";
              ctx.fillRect(mouse.x + x, mouse.y + y, 1, 1);
            }
          }
        }
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },
  {
    name: "Wave Packet Displacement",
    tags: ["wave", "packet"],
    description: "A localized pulse traveling through a field of dots.",
    animator: (c, ctx, mouse) => {
      let t = 0, id;
      const loop = () => {
        t += 0.1;
        ctx.fillStyle = "rgba(0,0,0,0.2)";
        ctx.fillRect(0, 0, c.width, c.height);
        for (let i = -50; i < 50; i += 5) {
          const dist = Math.abs(i - Math.sin(t) * 40);
          const yShift = dist < 10 ? -20 + dist : 0;
          ctx.fillStyle = "#0af";
          ctx.fillRect(mouse.x + i, mouse.y + yShift, 2, 2);
        }
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },
  {
    name: "Entropic Dissipation",
    tags: ["heat", "entropy"],
    description: "Orderly particles dissolving into chaotic thermal motion.",
    animator: (c, ctx, mouse) => {
      let id, p = Array.from({ length: 50 }, (_, i) => ({ i }));
      const loop = () => {
        ctx.fillStyle = "rgba(20, 10, 0, 0.2)";
        ctx.fillRect(0, 0, c.width, c.height);
        p.forEach(part => {
          const chaos = (Math.random() - 0.5) * part.i * 0.5;
          ctx.fillStyle = `rgba(255, 200, 100, ${1 - part.i / 50})`;
          ctx.fillRect(mouse.x + chaos, mouse.y - 50 + part.i * 2, 2, 2);
        });
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },
  {
    name: "Spontaneous Symmetry Breaking",
    tags: ["physics", "chaos"],
    description: "An ordered ring that suddenly collapses into localized clusters.",
    animator: (c, ctx, mouse) => {
      let t = 0, id;
      const loop = () => {
        t += 0.03;
        ctx.fillStyle = "rgba(0,0,0,0.2)";
        ctx.fillRect(0, 0, c.width, c.height);
        const shift = Math.sin(t) > 0.8 ? 20 : 0; // Trigger "breaking"
        for (let i = 0; i < 40; i++) {
          const a = (i / 40) * Math.PI * 2;
          const noise = Math.sin(i * 10 + t) * shift;
          const x = mouse.x + Math.cos(a) * (50 + noise);
          const y = mouse.y + Math.sin(a) * (50 + noise);
          ctx.fillStyle = shift > 0 ? "#ff0" : "#0ff";
          ctx.fillRect(x, y, 2, 2);
        }
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },
  {
    name: "Recursive Feynman Path",
    tags: ["math", "fractal"],
    description: "A path that branches off into sub-paths at every vertex.",
    animator: (c, ctx, mouse) => {
      let t = 0, id;
      const drawBranch = (x, y, angle, depth) => {
        if (depth <= 0) return;
        const nx = x + Math.cos(angle + t) * (depth * 10);
        const ny = y + Math.sin(angle + t) * (depth * 10);
        ctx.strokeStyle = `rgba(100, 255, 100, ${depth / 5})`;
        ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(nx, ny); ctx.stroke();
        drawBranch(nx, ny, angle + 0.5, depth - 1);
        drawBranch(nx, ny, angle - 0.5, depth - 1);
      };
      const loop = () => {
        t += 0.02;
        ctx.fillStyle = "rgba(0,10,0,0.3)";
        ctx.fillRect(0, 0, c.width, c.height);
        drawBranch(mouse.x, mouse.y, 0, 5);
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },
  {
    name: "Tesseract Projection",
    tags: ["4D", "geometry"],
    description: "Wireframe of a 4D hypercube rotating in 3D space.",
    animator: (c, ctx, mouse) => {
      let t = 0, id;
      const loop = () => {
        t += 0.03;
        ctx.fillStyle = "black"; ctx.fillRect(0, 0, c.width, c.height);
        ctx.strokeStyle = "#fff";
        const s = 30 + Math.sin(t) * 10;
        const s2 = s * 0.5;
        ctx.strokeRect(mouse.x - s, mouse.y - s, s * 2, s * 2);
        ctx.strokeRect(mouse.x - s2, mouse.y - s2, s2 * 2, s2 * 2);
        // Connect corners
        [[-1, -1], [1, -1], [1, 1], [-1, 1]].forEach(p => {
          ctx.beginPath();
          ctx.moveTo(mouse.x + p[0] * s, mouse.y + p[1] * s);
          ctx.lineTo(mouse.x + p[0] * s2, mouse.y + p[1] * s2);
          ctx.stroke();
        });
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },
  {
    name: "Wormhole Throat",
    tags: ["space", "warp"],
    description: "Concentric rings accelerating toward a central vanishing point.",
    animator: (c, ctx, mouse) => {
      let t = 0, id;
      const loop = () => {
        t += 0.1;
        ctx.fillStyle = "#000"; ctx.fillRect(0, 0, c.width, c.height);
        for (let i = 0; i < 15; i++) {
          const z = (i + t) % 15;
          const r = Math.pow(z, 2); // Exponential growth
          ctx.strokeStyle = `rgba(150, 0, 255, ${1 - z / 15})`;
          ctx.beginPath();
          ctx.arc(mouse.x, mouse.y, r, 0, Math.PI * 2);
          ctx.stroke();
        }
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },
  {
    name: "Cherenkov Radiation",
    tags: ["nuclear", "glow"],
    description: "A bright blue wake trailing behind the cursor like a sonic boom.",
    animator: (c, ctx, mouse) => {
      let id, history = [];
      const loop = () => {
        ctx.fillStyle = "rgba(0,5,20,0.2)";
        ctx.fillRect(0, 0, c.width, c.height);
        history.push({ x: mouse.x, y: mouse.y });
        if (history.length > 15) history.shift();
        ctx.beginPath();
        ctx.moveTo(mouse.x, mouse.y);
        history.forEach((pos, i) => {
          const spread = (15 - i) * 3;
          ctx.lineTo(pos.x + spread, pos.y + spread);
          ctx.strokeStyle = "rgba(0, 150, 255, 0.5)";
        });
        ctx.stroke();
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },
  {
    name: "Dark Matter Web",
    tags: ["cosmos", "lines"],
    description: "Faint, interconnected threads that only appear near the cursor.",
    animator: (c, ctx, mouse) => {
      let id;
      const stars = Array.from({ length: 30 }, () => ({ x: Math.random() * 200 - 100, y: Math.random() * 200 - 100 }));
      const loop = () => {
        ctx.fillStyle = "black"; ctx.fillRect(0, 0, c.width, c.height);
        stars.forEach(s => {
          const dx = (mouse.x + s.x) - mouse.x;
          const dy = (mouse.y + s.y) - mouse.y;
          const dist = Math.hypot(dx, dy);
          ctx.strokeStyle = `rgba(100, 100, 255, ${1 - dist / 100})`;
          ctx.beginPath(); ctx.moveTo(mouse.x, mouse.y); ctx.lineTo(mouse.x + s.x, mouse.y + s.y); ctx.stroke();
        });
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },
  {
    name: "Nebula Pulse",
    tags: ["cloud", "soft"],
    description: "Soft, smoky gradients that expand and contract.",
    animator: (c, ctx, mouse) => {
      let t = 0, id;
      const loop = () => {
        t += 0.02;
        ctx.fillStyle = "rgba(0,0,0,0.1)"; ctx.fillRect(0, 0, c.width, c.height);
        const grad = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 60 + Math.sin(t) * 20);
        grad.addColorStop(0, "rgba(255, 0, 255, 0.4)");
        grad.addColorStop(1, "transparent");
        ctx.fillStyle = grad;
        ctx.fillRect(mouse.x - 100, mouse.y - 100, 200, 200);
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },
  {
    name: "Gravitational Lensing",
    tags: ["warp", "optics"],
    description: "Distorts background stars as the 'mass' moves over them.",
    animator: (c, ctx, mouse) => {
      let id;
      const stars = Array.from({ length: 50 }, () => ({ x: Math.random() * c.width, y: Math.random() * c.height }));
      const loop = () => {
        ctx.fillStyle = "black"; ctx.fillRect(0, 0, c.width, c.height);
        stars.forEach(s => {
          const dx = s.x - mouse.x; const dy = s.y - mouse.y;
          const d = Math.hypot(dx, dy);
          const lens = d < 50 ? (50 - d) * 0.5 : 0;
          ctx.fillStyle = "white";
          ctx.fillRect(s.x + (dx / d) * lens, s.y + (dy / d) * lens, 1, 1);
        });
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },
  {
    name: "Super-Radiant Scatter",
    tags: ["light", "burst"],
    description: "Particles that explode outward and then snap back.",
    animator: (c, ctx, mouse) => {
      let t = 0, id;
      const loop = () => {
        t += 0.05;
        ctx.fillStyle = "rgba(0,0,0,0.2)"; ctx.fillRect(0, 0, c.width, c.height);
        for (let i = 0; i < 40; i++) {
          const r = Math.abs(Math.sin(t)) * 80;
          const a = (i / 40) * Math.PI * 2;
          ctx.fillStyle = "#fff";
          ctx.fillRect(mouse.x + Math.cos(a) * r, mouse.y + Math.sin(a) * r, 2, 2);
        }
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },
  {
    name: "Topological Knot",
    tags: ["math", "topology"],
    description: "A continuous loop that twists through itself (Trefoil logic).",
    animator: (c, ctx, mouse) => {
      let t = 0, id;
      const loop = () => {
        t += 0.05;
        ctx.fillStyle = "rgba(0,0,0,0.2)"; ctx.fillRect(0, 0, c.width, c.height);
        ctx.beginPath();
        ctx.strokeStyle = "#ff9900";
        for (let a = 0; a < Math.PI * 2; a += 0.1) {
          const r = 40 + 20 * Math.sin(3 * a + t);
          const x = mouse.x + r * Math.cos(2 * a);
          const y = mouse.y + r * Math.sin(2 * a);
          ctx.lineTo(x, y);
        }
        ctx.stroke();
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },
  {
    name: "Quantum Decoherence Glitch",
    tags: ["glitch", "unstable"],
    description: "The visual fragments into horizontal slices when it loses coherence.",
    animator: (c, ctx, mouse) => {
      let t = 0, id;
      const loop = () => {
        t += 0.1;
        ctx.fillStyle = "rgba(10, 0, 10, 0.3)";
        ctx.fillRect(0, 0, c.width, c.height);
        for (let i = 0; i < 10; i++) {
          const offset = Math.sin(t + i) > 0.7 ? Math.random() * 40 - 20 : 0;
          ctx.fillStyle = `rgba(255, 0, 100, 0.5)`;
          ctx.fillRect(mouse.x - 50 + offset, mouse.y - 50 + (i * 10), 100, 2);
        }
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },
  {
    name: "Probability Peak",
    tags: ["math", "pulse"],
    description: "A 3D-style mountain graph representing a wave function peak.",
    animator: (c, ctx, mouse) => {
      let t = 0, id;
      const loop = () => {
        t += 0.05;
        ctx.fillStyle = "black"; ctx.fillRect(0, 0, c.width, c.height);
        ctx.strokeStyle = "#0f0";
        for (let i = -5; i <= 5; i++) {
          ctx.beginPath();
          for (let x = -50; x <= 50; x += 5) {
            const dist = Math.abs(x);
            const y = Math.exp(-dist * 0.05) * Math.sin(t) * 40;
            ctx.lineTo(mouse.x + x, mouse.y + (i * 5) - y);
          }
          ctx.stroke();
        }
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },
  {
    name: "Bipolar Charge Field",
    tags: ["electric", "charge"],
    description: "Arcs of energy leaping between a positive and negative pole.",
    animator: (c, ctx, mouse) => {
      let t = 0, id;
      const loop = () => {
        t += 0.1;
        ctx.fillStyle = "rgba(0,0,0,0.2)"; ctx.fillRect(0, 0, c.width, c.height);
        const x1 = mouse.x - 40; const x2 = mouse.x + 40;
        ctx.fillStyle = "#f00"; ctx.fillRect(x1 - 2, mouse.y - 2, 4, 4);
        ctx.fillStyle = "#00f"; ctx.fillRect(x2 - 2, mouse.y - 2, 4, 4);
        if (Math.random() > 0.7) {
          ctx.strokeStyle = "white";
          ctx.beginPath();
          ctx.moveTo(x1, mouse.y);
          ctx.quadraticCurveTo(mouse.x, mouse.y - 30, x2, mouse.y);
          ctx.stroke();
        }
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },
  {
    name: "Synchrotron Radiation",
    tags: ["particle", "spin"],
    description: "A single particle emitting light cones as it circles at high speed.",
    animator: (c, ctx, mouse) => {
      let t = 0, id;
      const loop = () => {
        t += 0.15;
        ctx.fillStyle = "rgba(0,0,0,0.1)"; ctx.fillRect(0, 0, c.width, c.height);
        const x = mouse.x + Math.cos(t) * 40;
        const y = mouse.y + Math.sin(t) * 40;
        ctx.strokeStyle = "rgba(255, 255, 0, 0.4)";
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + Math.cos(t) * 20, y + Math.sin(t) * 20);
        ctx.stroke();
        ctx.fillStyle = "white"; ctx.fillRect(x - 2, y - 2, 4, 4);
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },
  {
    name: "Metric Expansion",
    tags: ["cosmos", "expand"],
    description: "Dots that move away from each other, simulating the expansion of space.",
    animator: (c, ctx, mouse) => {
      let id;
      const pts = Array.from({ length: 40 }, () => ({ x: Math.random() * 100 - 50, y: Math.random() * 100 - 50 }));
      const loop = () => {
        ctx.fillStyle = "black"; ctx.fillRect(0, 0, c.width, c.height);
        pts.forEach(p => {
          p.x *= 1.01; p.y *= 1.01; // Expand
          if (Math.abs(p.x) > 100) { p.x *= 0.1; p.y *= 0.1; } // Reset
          ctx.fillStyle = "white";
          ctx.fillRect(mouse.x + p.x, mouse.y + p.y, 2, 2);
        });
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },
  {
    name: "Void Whispers",
    tags: ["dark", "noise"],
    description: "Faint, static-like particles that vanish when you move the mouse.",
    animator: (c, ctx, mouse) => {
      let id, lastM = { x: 0, y: 0 };
      const loop = () => {
        const speed = Math.hypot(mouse.x - lastM.x, mouse.y - lastM.y);
        ctx.fillStyle = "rgba(0,0,0,0.3)"; ctx.fillRect(0, 0, c.width, c.height);
        if (speed < 1) {
          for (let i = 0; i < 20; i++) {
            ctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.2})`;
            ctx.fillRect(mouse.x + (Math.random() - 0.5) * 80, mouse.y + (Math.random() - 0.5) * 80, 1, 1);
          }
        }
        lastM = { x: mouse.x, y: mouse.y };
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },
  {
    name: "Data Scramble Portal",
    tags: ["digital", "chaos"],
    description: "Random ASCII characters swirling into a vortex.",
    animator: (c, ctx, mouse) => {
      let t = 0, id;
      const chars = "ΔΣΦΩΨ";
      const loop = () => {
        t += 0.05;
        ctx.fillStyle = "black"; ctx.fillRect(0, 0, c.width, c.height);
        ctx.fillStyle = "#0f0";
        for (let i = 0; i < 20; i++) {
          const a = i + t;
          const r = 20 + i * 2;
          ctx.fillText(chars[i % chars.length], mouse.x + Math.cos(a) * r, mouse.y + Math.sin(a) * r);
        }
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },
  {
    name: "Neutrino Shower",
    tags: ["particle", "ghost"],
    description: "Ultra-fast vertical streaks that barely interact with the center.",
    animator: (c, ctx, mouse) => {
      let id;
      const loop = () => {
        ctx.fillStyle = "rgba(0,0,0,0.4)"; ctx.fillRect(0, 0, c.width, c.height);
        for (let i = 0; i < 15; i++) {
          const x = (i * 10) - 75;
          ctx.fillStyle = "rgba(200, 200, 255, 0.1)";
          ctx.fillRect(mouse.x + x, 0, 1, c.height); // Ghost lines
          ctx.fillStyle = "white";
          ctx.fillRect(mouse.x + x, (Date.now() * 0.5 + i * 50) % c.height, 1, 10);
        }
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },
  {
    name: "Phase Shift Diamonds",
    tags: ["geometry", "shift"],
    description: "Diamonds that change opacity based on their orbital phase.",
    animator: (c, ctx, mouse) => {
      let t = 0, id;
      const loop = () => {
        t += 0.04;
        ctx.fillStyle = "rgba(0,0,0,0.2)"; ctx.fillRect(0, 0, c.width, c.height);
        for (let i = 0; i < 8; i++) {
          const a = (i / 8) * Math.PI * 2 + t;
          ctx.save();
          ctx.translate(mouse.x + Math.cos(a) * 50, mouse.y + Math.sin(a) * 50);
          ctx.rotate(a);
          ctx.fillStyle = `rgba(0, 255, 255, ${Math.abs(Math.sin(a))})`;
          ctx.fillRect(-5, -5, 10, 10);
          ctx.restore();
        }
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },
  {
    name: "The Singularity Point",
    tags: ["final", "core"],
    description: "All mathematical archetypes converging into a single white pixel.",
    animator: (c, ctx, mouse) => {
      let id;
      const loop = () => {
        ctx.fillStyle = "black"; ctx.fillRect(0, 0, c.width, c.height);
        ctx.shadowBlur = 15; ctx.shadowColor = "white";
        ctx.fillStyle = "white";
        ctx.fillRect(mouse.x - 1, mouse.y - 1, 2, 2);
        ctx.shadowBlur = 0;
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },
  {
    name: "Double Slit Interference",
    tags: ["wave", "interference"],
    description: "Visualizing constructive and destructive wave patterns.",
    animator: (c, ctx, mouse) => {
      let t = 0, id;
      const loop = () => {
        t += 0.05;
        ctx.fillStyle = "rgba(0, 5, 10, 0.2)";
        ctx.fillRect(0, 0, c.width, c.height);
        for (let x = -100; x < 100; x += 4) {
          // Two source interference formula
          const d1 = Math.sqrt((x - 20)**2 + 100);
          const d2 = Math.sqrt((x + 20)**2 + 100);
          const v = Math.sin(d1 * 0.5 - t) + Math.sin(d2 * 0.5 - t);
          const brightness = (v + 2) / 4;
          ctx.fillStyle = `rgba(0, 255, 255, ${brightness})`;
          ctx.fillRect(mouse.x + x, mouse.y - 40, 3, 80);
        }
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },
  {
    name: "Vacuum Fluctuation Foam",
    tags: ["quantum", "field"],
    description: "Bubbles of energy popping in and out of existence.",
    animator: (c, ctx, mouse) => {
      let id, bubbles = [];
      const loop = () => {
        ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
        ctx.fillRect(0, 0, c.width, c.height);
        if (bubbles.length < 30) bubbles.push({
          x: (Math.random() - 0.5) * 150,
          y: (Math.random() - 0.5) * 150,
          r: 0,
          max: Math.random() * 15
        });
        bubbles.forEach((b, i) => {
          b.r += 0.5;
          ctx.strokeStyle = `rgba(200, 255, 255, ${1 - b.r/b.max})`;
          ctx.beginPath();
          ctx.arc(mouse.x + b.x, mouse.y + b.y, b.r, 0, Math.PI * 2);
          ctx.stroke();
          if (b.r >= b.max) bubbles.splice(i, 1);
        });
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },
  {
    name: "Spinor Vortex",
    tags: ["vortex", "spin"],
    description: "Twisting field lines representing particle spin states.",
    animator: (c, ctx, mouse) => {
      let t = 0, id;
      const loop = () => {
        t += 0.04;
        ctx.fillStyle = "rgba(0,0,0,0.2)";
        ctx.fillRect(0, 0, c.width, c.height);
        for (let i = 0; i < 60; i++) {
          const angle = i * 0.1 + t;
          const dist = i * 2;
          const x = mouse.x + Math.cos(angle) * dist;
          const y = mouse.y + Math.sin(angle * 0.5) * dist;
          ctx.fillStyle = `hsl(${angle * 20}, 100%, 60%)`;
          ctx.fillRect(x, y, 2, 2);
        }
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },
  {
    name: "Heisenberg Blur",
    tags: ["uncertainty", "blur"],
    description: "A particle whose position becomes less certain as speed increases.",
    animator: (c, ctx, mouse) => {
      let t = 0, id;
      const loop = () => {
        t += 0.1;
        ctx.fillStyle = "rgba(0,0,15,0.2)";
        ctx.fillRect(0, 0, c.width, c.height);
        const speed = Math.sin(t) * 10;
        const uncertainty = Math.abs(speed) * 5;
        for (let i = 0; i < 20; i++) {
          const ox = (Math.random() - 0.5) * uncertainty;
          const oy = (Math.random() - 0.5) * uncertainty;
          ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
          ctx.beginPath();
          ctx.arc(mouse.x + ox, mouse.y + oy, 2, 0, Math.PI*2);
          ctx.fill();
        }
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },
  {
    name: "Photon Lattice Burst",
    tags: ["light", "geometry"],
    description: "Geometric rays bursting from the quantum center.",
    animator: (c, ctx, mouse) => {
      let t = 0, id;
      const loop = () => {
        t += 0.02;
        ctx.fillStyle = "rgba(0,0,0,0.2)";
        ctx.fillRect(0, 0, c.width, c.height);
        ctx.strokeStyle = "#fff";
        for (let i = 0; i < 12; i++) {
          const a = (i / 12) * Math.PI * 2 + t;
          ctx.beginPath();
          ctx.moveTo(mouse.x, mouse.y);
          ctx.lineTo(mouse.x + Math.cos(a) * 80, mouse.y + Math.sin(a) * 80);
          ctx.stroke();
          ctx.fillStyle = "#0ff";
          ctx.fillRect(mouse.x + Math.cos(a) * 80 - 2, mouse.y + Math.sin(a) * 80 - 2, 4, 4);
        }
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },
  {
    name: "Zero-Point Pulse",
    tags: ["pulse", "energy"],
    description: "Radial shockwaves emanating from the vacuum.",
    animator: (c, ctx, mouse) => {
      let t = 0, id;
      const loop = () => {
        t += 0.05;
        ctx.fillStyle = "rgba(10, 0, 30, 0.2)";
        ctx.fillRect(0, 0, c.width, c.height);
        for (let r = 10; r < 100; r += 20) {
          const activeR = (r + t * 20) % 100;
          ctx.strokeStyle = `rgba(100, 200, 255, ${1 - activeR/100})`;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(mouse.x, mouse.y, activeR, 0, Math.PI*2);
          ctx.stroke();
        }
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },
  {
    name: "Superposition Ghost",
    tags: ["state", "shadow"],
    description: "Faded versions of the cursor trail behind in different states.",
    animator: (c, ctx, mouse) => {
      let history = [], id;
      const loop = () => {
        ctx.fillStyle = "rgba(0,0,0,0.2)";
        ctx.fillRect(0, 0, c.width, c.height);
        history.push({x: mouse.x, y: mouse.y});
        if(history.length > 20) history.shift();
        history.forEach((pos, i) => {
          ctx.fillStyle = `rgba(0, 255, 150, ${i / 20})`;
          ctx.beginPath();
          ctx.arc(pos.x + Math.sin(i)*10, pos.y + Math.cos(i)*10, 3, 0, Math.PI*2);
          ctx.fill();
        });
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },
  {
    name: "Plasma Filament",
    tags: ["energy", "line"],
    description: "Electrical arcs snapping between quantum nodes.",
    animator: (c, ctx, mouse) => {
      let t = 0, id;
      const loop = () => {
        t += 0.2;
        ctx.fillStyle = "rgba(0,0,0,0.3)";
        ctx.fillRect(0, 0, c.width, c.height);
        ctx.strokeStyle = "#70f";
        ctx.lineWidth = 1;
        for (let i = 0; i < 5; i++) {
          ctx.beginPath();
          ctx.moveTo(mouse.x, mouse.y);
          for (let j = 0; j < 5; j++) {
            ctx.lineTo(
              mouse.x + (j * 20) * Math.cos(i + t), 
              mouse.y + (j * 20) * Math.sin(i + t) + (Math.random() * 10 - 5)
            );
          }
          ctx.stroke();
        }
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },
  {
    name: "Matter Wave Ripple",
    tags: ["wave", "liquid"],
    description: "Concentric rings that distort as if in a liquid medium.",
    animator: (c, ctx, mouse) => {
      let t = 0, id;
      const loop = () => {
        t += 0.03;
        ctx.fillStyle = "rgba(0, 10, 20, 0.2)";
        ctx.fillRect(0, 0, c.width, c.height);
        for (let j = 0; j < 5; j++) {
          const r = j * 20 + (t * 10 % 20);
          ctx.beginPath();
          ctx.ellipse(mouse.x, mouse.y, r, r * 0.6, Math.sin(t), 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(0, 150, 255, ${1 - r/100})`;
          ctx.stroke();
        }
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },
  {
    name: "Bose-Einstein Condensate",
    tags: ["cold", "cluster"],
    description: "Particles slowing down and merging into a single quantum state.",
    animator: (c, ctx, mouse) => {
      let t = 0, id;
      const loop = () => {
        t += 0.01;
        ctx.fillStyle = "rgba(5, 5, 20, 0.4)";
        ctx.fillRect(0, 0, c.width, c.height);
        for (let i = 0; i < 50; i++) {
          const drift = Math.sin(t + i) * 40;
          const x = mouse.x + drift * Math.cos(i);
          const y = mouse.y + drift * Math.sin(i);
          ctx.fillStyle = `rgba(200, 230, 255, 0.5)`;
          ctx.beginPath();
          ctx.arc(x, y, 4, 0, Math.PI * 2);
          ctx.fill();
        }
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },
  {
    name: "Quantum Flux Bloom",
    tags: ["quantum", "wave"],
    description: "Organic harmonic expansion using varying sine frequencies.",
    animator: (c, ctx, mouse) => {
      let t = 0, id;
      const loop = () => {
        t += 0.02;
        ctx.fillStyle = "rgba(0, 5, 15, 0.2)";
        ctx.fillRect(0, 0, c.width, c.height);
        for (let j = 0; j < 80; j++) {
          const r = 40 + Math.sin(t * 2 + j) * 30;
          const x = mouse.x + Math.cos(j * 0.2 + t) * r;
          const y = mouse.y + Math.sin(j * 0.5 + t) * r;
          ctx.fillStyle = `hsla(${180 + Math.sin(t) * 40}, 100%, 70%, 0.6)`;
          ctx.fillRect(x, y, 2, 2);
        }
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },
  {
    name: "Entangled Halo",
    tags: ["mirror", "field"],
    description: "Two particles that mirror each other's position across an axis.",
    animator: (c, ctx, mouse) => {
      let t = 0, id;
      const loop = () => {
        t += 0.05;
        ctx.fillStyle = "rgba(0,0,10,0.1)";
        ctx.fillRect(0, 0, c.width, c.height);
        for (let j = 0; j < 40; j++) {
          const x1 = Math.cos(j + t) * 70;
          const y1 = Math.sin(j * 0.5 + t) * 30;
          ctx.fillStyle = "#00f2ff"; ctx.fillRect(mouse.x + x1, mouse.y + y1, 2, 2);
          ctx.fillStyle = "#ff0077"; ctx.fillRect(mouse.x - x1, mouse.y - y1, 2, 2);
        }
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },
  {
    name: "Hilbert Space Grid",
    tags: ["lattice", "field"],
    description: "A digital grid that warps based on distance from the observer.",
    animator: (c, ctx, mouse) => {
      let t = 0, id;
      const loop = () => {
        t += 0.03;
        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, c.width, c.height);
        for (let x = -4; x <= 4; x++) {
          for (let y = -4; y <= 4; y++) {
            const d = Math.hypot(x, y);
            const s = Math.sin(t + d) * 10;
            ctx.strokeStyle = `rgba(0, 255, 255, ${0.5 - d/10})`;
            ctx.strokeRect(mouse.x + x * 30 + s, mouse.y + y * 30 + s, 25, 25);
          }
        }
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },
  {
    name: "Probability Storm",
    tags: ["chaos", "quantum"],
    description: "High-frequency flickering noise representing superposition.",
    animator: (c, ctx, mouse) => {
      let id;
      const loop = () => {
        ctx.fillStyle = "rgba(0,0,0,0.1)";
        ctx.fillRect(0, 0, c.width, c.height);
        for (let i = 0; i < 150; i++) {
          const r = Math.random() * 100;
          const a = Math.random() * Math.PI * 2;
          ctx.fillStyle = `rgba(255, 255, 255, ${Math.random()})`;
          ctx.fillRect(mouse.x + Math.cos(a) * r, mouse.y + Math.sin(a) * r, 1, 1);
        }
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },
  {
    name: "Wavefunction Ribbons",
    tags: ["wave", "stream"],
    description: "Long exposure wave lines flowing horizontally.",
    animator: (c, ctx, mouse) => {
      let t = 0, id;
      const loop = () => {
        t += 0.04;
        ctx.fillStyle = "rgba(0,0,0,0.05)";
        ctx.fillRect(0, 0, c.width, c.height);
        for (let i = 0; i < 8; i++) {
          ctx.beginPath();
          ctx.strokeStyle = `hsl(${180 + i * 10}, 100%, 50%)`;
          for (let x = -100; x < 100; x += 5) {
            const y = Math.sin(x * 0.05 + t + i) * 30;
            ctx.lineTo(mouse.x + x, mouse.y + y);
          }
          ctx.stroke();
        }
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },
  {
    name: "Qubit Cascade",
    tags: ["digital", "pulse"],
    description: "Binary data bits falling and fading through a 'portal'.",
    animator: (c, ctx, mouse) => {
      let t = 0, id;
      const loop = () => {
        t += 0.1;
        ctx.fillStyle = "rgba(0, 10, 0, 0.2)";
        ctx.fillRect(0, 0, c.width, c.height);
        ctx.font = "10px monospace";
        ctx.fillStyle = "#0f0";
        for (let i = 0; i < 20; i++) {
          const x = Math.sin(i) * 80;
          const y = ((i * 10 + t * 20) % 150) - 75;
          ctx.fillText(Math.random() > 0.5 ? "1" : "0", mouse.x + x, mouse.y + y);
        }
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },
  {
    name: "Observer Singularity",
    tags: ["spiral", "field"],
    description: "Particles spiraling inward toward the mouse cursor.",
    animator: (c, ctx, mouse) => {
      let t = 0, id;
      const loop = () => {
        t += 0.02;
        ctx.fillStyle = "rgba(0,0,0,0.2)";
        ctx.fillRect(0, 0, c.width, c.height);
        for (let i = 0; i < 100; i++) {
          const r = (200 - ( (i + t * 50) % 200));
          const a = i * 0.1 + t;
          ctx.fillStyle = `white`;
          ctx.fillRect(mouse.x + Math.cos(a) * r, mouse.y + Math.sin(a) * r, 1.5, 1.5);
        }
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },
  {
    name: "Quantum Tunneling Rain",
    tags: ["vector", "glitch"],
    description: "Particles that jump (tunnel) across a central gap.",
    animator: (c, ctx, mouse) => {
      let id;
      const p = Array.from({length: 50}, () => ({x: Math.random()*100-50, y: Math.random()*100-50}));
      const loop = () => {
        ctx.fillStyle = "rgba(10, 0, 20, 0.2)";
        ctx.fillRect(0, 0, c.width, c.height);
        p.forEach(part => {
          part.y += 2; if(part.y > 60) part.y = -60;
          const tunnel = Math.abs(part.y) < 5 ? 40 : 0; // The jump
          ctx.fillStyle = "#0ff";
          ctx.fillRect(mouse.x + part.x + tunnel, mouse.y + part.y, 1, 3);
        });
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },
  {
    name: "Eigenstate Orbits",
    tags: ["atom", "orbit"],
    description: "Elliptical paths representing fixed energy levels.",
    animator: (c, ctx, mouse) => {
      let t = 0, id;
      const loop = () => {
        t += 0.03;
        ctx.fillStyle = "rgba(0,0,0,0.1)";
        ctx.fillRect(0, 0, c.width, c.height);
        for (let i = 1; i <= 4; i++) {
          const rx = i * 25; const ry = i * 15;
          const x = mouse.x + Math.cos(t * (1/i)) * rx;
          const y = mouse.y + Math.sin(t * (1/i)) * ry;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(150, 100, 255, 0.3)`;
          ctx.ellipse(mouse.x, mouse.y, rx, ry, 0, 0, Math.PI*2);
          ctx.stroke();
          ctx.fillStyle = "#fff"; ctx.fillRect(x-2, y-2, 4, 4);
        }
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  },
  {
    name: "String Theory Vibrations",
    tags: ["lines", "wave"],
    description: "Vertical lines that vibrate with harmonic resonance.",
    animator: (c, ctx, mouse) => {
      let t = 0, id;
      const loop = () => {
        t += 0.1;
        ctx.fillStyle = "rgba(0,0,0,0.2)";
        ctx.fillRect(0, 0, c.width, c.height);
        for (let i = -10; i <= 10; i++) {
          const amp = Math.sin(t + i * 0.5) * 20;
          ctx.strokeStyle = "#4444ff";
          ctx.beginPath();
          ctx.moveTo(mouse.x + i * 8 + amp, mouse.y - 50);
          ctx.lineTo(mouse.x + i * 8 - amp, mouse.y + 50);
          ctx.stroke();
        }
        id = requestAnimationFrame(loop);
      };
      return { start: loop, stop: () => cancelAnimationFrame(id) };
    }
  }
];

// ────────────────────────────────────────────────────────────
//  BIOMECH FX (50 effects)
// ────────────────────────────────────────────────────────────

export const biomechEffects = [

// 1 — Radial burst ring that pulses outward from center
{
  name: "Pulse Radial Burst",
  tags: ["biomech", "pulse", "radial"],
  description: "Concentric rings explode outward from canvas center, fading like sonar pings",
  animator: (c, ctx, mouse) => {
    let rings = [], t = 0, id;
    const loop = () => {
      t += 0.016;
      ctx.clearRect(0, 0, c.width, c.height);
      ctx.fillStyle = "#000408";
      ctx.fillRect(0, 0, c.width, c.height);
      if (Math.random() < 0.08) rings.push({ r: 0, life: 1, x: c.width / 2, y: c.height / 2 });
      rings = rings.filter(r => r.life > 0);
      rings.forEach(r => {
        r.r += 3 + r.r * 0.01;
        r.life -= 0.012;
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0,255,180,${r.life})`;
        ctx.lineWidth = 2;
        ctx.stroke();
        // inner ring
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.r * 0.6, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0,180,255,${r.life * 0.5})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      });
      id = requestAnimationFrame(loop);
    };
    return { start: loop, stop: () => cancelAnimationFrame(id) };
  }
},

// 2 — DNA helix scrolling vertically
{
  name: "DNA Helix Scroll",
  tags: ["biomech", "spine", "helix"],
  description: "Double helix scrolls across the canvas like a living strand of biomech DNA",
  animator: (c, ctx, mouse) => {
    let t = 0, id;
    const loop = () => {
      t += 0.04;
      ctx.fillStyle = "rgba(0,0,5,0.3)";
      ctx.fillRect(0, 0, c.width, c.height);
      const cx = c.width / 2;
      for (let y = 0; y < c.height; y += 6) {
        const angle = y * 0.04 + t;
        const x1 = cx + Math.sin(angle) * 80;
        const x2 = cx + Math.sin(angle + Math.PI) * 80;
        const alpha = 0.7;
        ctx.beginPath(); ctx.arc(x1, y, 4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,80,80,${alpha})`; ctx.fill();
        ctx.beginPath(); ctx.arc(x2, y, 4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(80,200,255,${alpha})`; ctx.fill();
        // rungs
        if (Math.floor((y + t * 30) / 6) % 4 === 0) {
          ctx.beginPath(); ctx.moveTo(x1, y); ctx.lineTo(x2, y);
          ctx.strokeStyle = `rgba(200,255,200,0.4)`; ctx.lineWidth = 1; ctx.stroke();
        }
      }
      id = requestAnimationFrame(loop);
    };
    return { start: loop, stop: () => cancelAnimationFrame(id) };
  }
},

// 3 — Gravity particles falling from top, pool at bottom
{
  name: "Iron Rain",
  tags: ["biomech", "mechanical", "gravity"],
  description: "Dense metallic particles rain downward, splashing and pooling at the ground",
  animator: (c, ctx, mouse) => {
    let particles = [], id;
    for (let i = 0; i < 120; i++) particles.push({
      x: Math.random() * c.width, y: Math.random() * c.height,
      vy: 2 + Math.random() * 4, vx: (Math.random() - 0.5) * 1,
      size: Math.random() * 3 + 1, life: Math.random()
    });
    const loop = () => {
      ctx.fillStyle = "rgba(2,4,8,0.4)";
      ctx.fillRect(0, 0, c.width, c.height);
      particles.forEach(p => {
        p.y += p.vy; p.x += p.vx;
        if (p.y > c.height) { p.y = 0; p.x = Math.random() * c.width; }
        const g = p.y / c.height;
        ctx.fillStyle = `rgba(${150 + g * 100},${100 + g * 60},${50},0.9)`;
        ctx.fillRect(p.x, p.y, p.size, p.size * 2.5);
      });
      id = requestAnimationFrame(loop);
    };
    return { start: loop, stop: () => cancelAnimationFrame(id) };
  }
},

// 4 — Voronoi cell division
{
  name: "Cell Division",
  tags: ["biomech", "organic", "voronoi"],
  description: "Living cells divide and drift apart, pulsing with bioluminescent energy",
  animator: (c, ctx, mouse) => {
    let cells = [], t = 0, id;
    for (let i = 0; i < 12; i++) cells.push({
      x: Math.random() * c.width, y: Math.random() * c.height,
      r: 20 + Math.random() * 40, vx: (Math.random() - 0.5) * 0.8,
      vy: (Math.random() - 0.5) * 0.8, phase: Math.random() * Math.PI * 2
    });
    const loop = () => {
      t += 0.02;
      ctx.fillStyle = "rgba(0,5,0,0.25)";
      ctx.fillRect(0, 0, c.width, c.height);
      cells.forEach(cell => {
        cell.x += cell.vx; cell.y += cell.vy;
        if (cell.x < 0 || cell.x > c.width) cell.vx *= -1;
        if (cell.y < 0 || cell.y > c.height) cell.vy *= -1;
        const pulse = cell.r + Math.sin(t + cell.phase) * 8;
        const grad = ctx.createRadialGradient(cell.x, cell.y, 0, cell.x, cell.y, pulse);
        grad.addColorStop(0, "rgba(0,255,100,0.15)");
        grad.addColorStop(0.7, "rgba(0,180,80,0.05)");
        grad.addColorStop(1, "rgba(0,255,100,0)");
        ctx.beginPath(); ctx.arc(cell.x, cell.y, pulse, 0, Math.PI * 2);
        ctx.fillStyle = grad; ctx.fill();
        ctx.strokeStyle = `rgba(0,255,120,${0.3 + Math.sin(t + cell.phase) * 0.2})`;
        ctx.lineWidth = 1.5; ctx.stroke();
        // nucleus
        ctx.beginPath(); ctx.arc(cell.x, cell.y, pulse * 0.25, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(200,255,200,0.6)"; ctx.fill();
      });
      id = requestAnimationFrame(loop);
    };
    return { start: loop, stop: () => cancelAnimationFrame(id) };
  }
},

// 5 — Magnetic field lines
{
  name: "Magnetic Field Lines",
  tags: ["biomech", "mechanical", "field"],
  description: "Animated electromagnetic field lines arc between two poles",
  animator: (c, ctx, mouse) => {
    let t = 0, id;
    const p1 = { x: c.width * 0.3, y: c.height / 2 };
    const p2 = { x: c.width * 0.7, y: c.height / 2 };
    const loop = () => {
      t += 0.02;
      ctx.fillStyle = "rgba(0,0,10,0.3)";
      ctx.fillRect(0, 0, c.width, c.height);
      for (let i = -6; i <= 6; i++) {
        const offset = i * 18;
        const cp1x = (p1.x + p2.x) / 2;
        const cp1y = (p1.y + p2.y) / 2 + offset * 3 + Math.sin(t + i) * 10;
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.quadraticCurveTo(cp1x, cp1y, p2.x, p2.y);
        const hue = 180 + i * 10;
        ctx.strokeStyle = `hsla(${hue},100%,60%,${0.5 - Math.abs(i) * 0.04})`;
        ctx.lineWidth = 1.5; ctx.stroke();
        // flow particle
        const frac = (t * 0.5 + i * 0.15) % 1;
        const bx = (1 - frac) * (1 - frac) * p1.x + 2 * (1 - frac) * frac * cp1x + frac * frac * p2.x;
        const by = (1 - frac) * (1 - frac) * p1.y + 2 * (1 - frac) * frac * cp1y + frac * frac * p2.y;
        ctx.beginPath(); ctx.arc(bx, by, 3, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${hue},100%,80%,0.9)`; ctx.fill();
      }
      // poles
      [p1, p2].forEach((p, i) => {
        ctx.beginPath(); ctx.arc(p.x, p.y, 12, 0, Math.PI * 2);
        ctx.fillStyle = i === 0 ? "rgba(255,80,80,0.9)" : "rgba(80,150,255,0.9)"; ctx.fill();
      });
      id = requestAnimationFrame(loop);
    };
    return { start: loop, stop: () => cancelAnimationFrame(id) };
  }
},

// 6 — Fractal tree growing and dying
{
  name: "Neural Tree Growth",
  tags: ["biomech", "spine", "fractal"],
  description: "A fractal neural tree grows from the base, branches firing with electric signals",
  animator: (c, ctx, mouse) => {
    let t = 0, id;
    const branch = (x, y, angle, depth, len) => {
      if (depth <= 0) return;
      const ex = x + Math.cos(angle) * len;
      const ey = y + Math.sin(angle) * len;
      const alpha = depth / 9;
      ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(ex, ey);
      ctx.strokeStyle = `rgba(${100 + depth * 15},${200 + depth * 5},${50},${alpha})`;
      ctx.lineWidth = depth * 0.6; ctx.stroke();
      // spark
      if (Math.random() < 0.05) {
        ctx.beginPath(); ctx.arc(ex, ey, 3, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,100,0.8)"; ctx.fill();
      }
      const spread = 0.35 + Math.sin(t) * 0.1;
      branch(ex, ey, angle - spread, depth - 1, len * 0.72);
      branch(ex, ey, angle + spread, depth - 1, len * 0.72);
    };
    const loop = () => {
      t += 0.015;
      ctx.fillStyle = "rgba(0,3,0,0.3)";
      ctx.fillRect(0, 0, c.width, c.height);
      branch(c.width / 2, c.height, -Math.PI / 2, 9, 70);
      id = requestAnimationFrame(loop);
    };
    return { start: loop, stop: () => cancelAnimationFrame(id) };
  }
},

// 7 — Orbiting satellites around a pulsing core
{
  name: "Biomech Orbital System",
  tags: ["biomech", "mechanical", "orbit"],
  description: "Multiple rings of orbital debris circle a pulsating mechanical core",
  animator: (c, ctx, mouse) => {
    let t = 0, id;
    const cx = c.width / 2, cy = c.height / 2;
    const orbits = [
      { r: 60, count: 6, speed: 0.8, color: "255,120,0" },
      { r: 110, count: 10, speed: 0.45, color: "200,80,255" },
      { r: 160, count: 14, speed: 0.25, color: "0,200,255" },
    ];
    const loop = () => {
      t += 0.016;
      ctx.fillStyle = "rgba(0,0,8,0.35)";
      ctx.fillRect(0, 0, c.width, c.height);
      // core
      const pulseR = 20 + Math.sin(t * 3) * 5;
      const coreGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, pulseR);
      coreGrad.addColorStop(0, "rgba(255,200,100,1)");
      coreGrad.addColorStop(1, "rgba(255,100,0,0)");
      ctx.beginPath(); ctx.arc(cx, cy, pulseR, 0, Math.PI * 2);
      ctx.fillStyle = coreGrad; ctx.fill();
      orbits.forEach(orb => {
        // orbit ring
        ctx.beginPath(); ctx.arc(cx, cy, orb.r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${orb.color},0.15)`; ctx.lineWidth = 1; ctx.stroke();
        for (let i = 0; i < orb.count; i++) {
          const a = (i / orb.count) * Math.PI * 2 + t * orb.speed;
          const x = cx + Math.cos(a) * orb.r;
          const y = cy + Math.sin(a) * orb.r;
          ctx.beginPath(); ctx.arc(x, y, 4, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${orb.color},0.9)`; ctx.fill();
        }
      });
      id = requestAnimationFrame(loop);
    };
    return { start: loop, stop: () => cancelAnimationFrame(id) };
  }
},

// 8 — Waveform oscilloscope lines
{
  name: "Bio Oscilloscope",
  tags: ["biomech", "pulse", "waveform"],
  description: "Multiple layered waveforms scroll across the screen like a bioscan readout",
  animator: (c, ctx, mouse) => {
    let t = 0, id;
    const waves = [
      { amp: 60, freq: 0.02, speed: 1.2, color: "0,255,120", y: c.height * 0.3 },
      { amp: 35, freq: 0.035, speed: 0.8, color: "255,80,80", y: c.height * 0.5 },
      { amp: 50, freq: 0.015, speed: 1.8, color: "100,150,255", y: c.height * 0.7 },
    ];
    const loop = () => {
      t += 0.04;
      ctx.fillStyle = "rgba(0,5,3,0.3)";
      ctx.fillRect(0, 0, c.width, c.height);
      waves.forEach(w => {
        ctx.beginPath();
        for (let x = 0; x < c.width; x += 2) {
          const y = w.y + Math.sin(x * w.freq + t * w.speed) * w.amp
            + Math.sin(x * w.freq * 2.3 + t * w.speed * 1.3) * w.amp * 0.3;
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `rgba(${w.color},0.8)`;
        ctx.lineWidth = 2; ctx.stroke();
        // glow repeat
        ctx.strokeStyle = `rgba(${w.color},0.2)`;
        ctx.lineWidth = 6; ctx.stroke();
      });
      // scan line
      const sx = (t * 60) % c.width;
      ctx.beginPath(); ctx.moveTo(sx, 0); ctx.lineTo(sx, c.height);
      ctx.strokeStyle = "rgba(255,255,255,0.05)"; ctx.lineWidth = 2; ctx.stroke();
      id = requestAnimationFrame(loop);
    };
    return { start: loop, stop: () => cancelAnimationFrame(id) };
  }
},

// 9 — Exploding pixel shrapnel
{
  name: "Shrapnel Burst",
  tags: ["biomech", "mechanical", "explosion"],
  description: "Mechanical shrapnel fragments erupt from random points, scatter and fade",
  animator: (c, ctx, mouse) => {
    let shards = [], t = 0, id;
    const explode = () => {
      const x = Math.random() * c.width, y = Math.random() * c.height;
      for (let i = 0; i < 30; i++) {
        const a = Math.random() * Math.PI * 2;
        const spd = 2 + Math.random() * 8;
        shards.push({ x, y, vx: Math.cos(a) * spd, vy: Math.sin(a) * spd,
          size: 2 + Math.random() * 6, life: 1, rot: Math.random() * Math.PI,
          rotV: (Math.random() - 0.5) * 0.2 });
      }
    };
    const loop = () => {
      t += 0.016;
      if (Math.random() < 0.03) explode();
      ctx.fillStyle = "rgba(5,2,0,0.4)";
      ctx.fillRect(0, 0, c.width, c.height);
      shards = shards.filter(s => s.life > 0);
      shards.forEach(s => {
        s.x += s.vx; s.y += s.vy; s.vy += 0.15; s.life -= 0.018; s.rot += s.rotV;
        ctx.save(); ctx.translate(s.x, s.y); ctx.rotate(s.rot);
        ctx.fillStyle = `rgba(255,${150 + s.life * 100},0,${s.life})`;
        ctx.fillRect(-s.size / 2, -s.size / 4, s.size, s.size / 2);
        ctx.restore();
      });
      id = requestAnimationFrame(loop);
    };
    return { start: loop, stop: () => cancelAnimationFrame(id) };
  }
},

// 10 — Flowing lava/blood streams
{
  name: "Hemorrhage Flow",
  tags: ["biomech", "organic", "fluid"],
  description: "Viscous fluid streams flow down the canvas like biological hydraulic fluid",
  animator: (c, ctx, mouse) => {
    let streams = [], t = 0, id;
    for (let i = 0; i < 8; i++) streams.push({
      x: (i + 0.5) * (c.width / 8) + (Math.random() - 0.5) * 40,
      y: -Math.random() * c.height, speed: 0.8 + Math.random() * 1.5,
      width: 4 + Math.random() * 12, wobble: Math.random() * 0.05, phase: Math.random() * 6
    });
    const loop = () => {
      t += 0.016;
      ctx.fillStyle = "rgba(3,0,0,0.2)";
      ctx.fillRect(0, 0, c.width, c.height);
      streams.forEach(s => {
        s.y += s.speed;
        if (s.y > c.height + 100) { s.y = -50; s.x = Math.random() * c.width; }
        const wx = Math.sin(s.y * s.wobble + t + s.phase) * 20;
        const grad = ctx.createLinearGradient(s.x + wx, s.y - 30, s.x + wx, s.y + 30);
        grad.addColorStop(0, "rgba(200,0,0,0)");
        grad.addColorStop(0.4, "rgba(255,20,20,0.8)");
        grad.addColorStop(1, "rgba(150,0,0,0.6)");
        ctx.beginPath();
        ctx.roundRect ? ctx.roundRect(s.x + wx - s.width / 2, s.y - 30, s.width, 60, s.width / 2)
          : ctx.rect(s.x + wx - s.width / 2, s.y - 30, s.width, 60);
        ctx.fillStyle = grad; ctx.fill();
      });
      id = requestAnimationFrame(loop);
    };
    return { start: loop, stop: () => cancelAnimationFrame(id) };
  }
},

// 11 — Spinning gear system
{
  name: "Gear Works",
  tags: ["biomech", "mechanical", "gears"],
  description: "Interlocking biomechanical gears rotate in a complex clockwork system",
  animator: (c, ctx, mouse) => {
    let t = 0, id;
    const drawGear = (x, y, r, teeth, angle, color) => {
      ctx.save(); ctx.translate(x, y); ctx.rotate(angle);
      ctx.beginPath();
      for (let i = 0; i < teeth; i++) {
        const a1 = (i / teeth) * Math.PI * 2;
        const a2 = ((i + 0.4) / teeth) * Math.PI * 2;
        const a3 = ((i + 0.6) / teeth) * Math.PI * 2;
        const a4 = ((i + 1) / teeth) * Math.PI * 2;
        ctx.lineTo(Math.cos(a1) * r, Math.sin(a1) * r);
        ctx.lineTo(Math.cos(a2) * (r + 10), Math.sin(a2) * (r + 10));
        ctx.lineTo(Math.cos(a3) * (r + 10), Math.sin(a3) * (r + 10));
        ctx.lineTo(Math.cos(a4) * r, Math.sin(a4) * r);
      }
      ctx.closePath();
      ctx.strokeStyle = color; ctx.lineWidth = 2; ctx.stroke();
      ctx.fillStyle = color.replace("0.9", "0.1"); ctx.fill();
      ctx.beginPath(); ctx.arc(0, 0, r * 0.3, 0, Math.PI * 2);
      ctx.strokeStyle = color; ctx.stroke();
      ctx.restore();
    };
    const gears = [
      { x: c.width / 2, y: c.height / 2, r: 60, teeth: 16, speed: 0.3, color: "rgba(200,150,0,0.9)" },
      { x: c.width / 2 + 122, y: c.height / 2, r: 42, teeth: 11, speed: -0.43, color: "rgba(0,180,200,0.9)" },
      { x: c.width / 2, y: c.height / 2 + 114, r: 44, teeth: 12, speed: -0.41, color: "rgba(180,0,180,0.9)" },
    ];
    const loop = () => {
      t += 0.016;
      ctx.fillStyle = "rgba(4,4,4,0.4)";
      ctx.fillRect(0, 0, c.width, c.height);
      gears.forEach(g => drawGear(g.x, g.y, g.r, g.teeth, t * g.speed, g.color));
      id = requestAnimationFrame(loop);
    };
    return { start: loop, stop: () => cancelAnimationFrame(id) };
  }
},

// 12 — Flowing ribbon attractors (Lorenz-ish)
{
  name: "Strange Attractor",
  tags: ["biomech", "mechanical", "chaos"],
  description: "A Lorenz-type strange attractor traces luminous chaotic paths through space",
  animator: (c, ctx, mouse) => {
    let x = 0.1, y = 0, z = 0, id;
    const s = 10, r = 28, b = 8 / 3;
    const scale = 4, ox = c.width / 2, oy = c.height / 2;
    const loop = () => {
      for (let i = 0; i < 8; i++) {
        const dt = 0.005;
        const dx = s * (y - x) * dt;
        const dy = (x * (r - z) - y) * dt;
        const dz = (x * y - b * z) * dt;
        x += dx; y += dy; z += dz;
        const px = ox + x * scale;
        const py = oy + (y - z) * scale * 0.6;
        const hue = (z / 50) * 360;
        ctx.beginPath(); ctx.arc(px, py, 1.2, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${hue},100%,65%,0.6)`; ctx.fill();
      }
      id = requestAnimationFrame(loop);
    };
    // fade bg periodically
    let bg = 0;
    const bgLoop = () => {
      bg++;
      if (bg % 120 === 0) { ctx.fillStyle = "rgba(0,0,0,0.15)"; ctx.fillRect(0, 0, c.width, c.height); }
    };
    const combined = () => { bgLoop(); loop(); };
    let fading = setInterval(() => { ctx.fillStyle = "rgba(0,0,0,0.04)"; ctx.fillRect(0, 0, c.width, c.height); }, 100);
    return { start: loop, stop: () => { cancelAnimationFrame(id); clearInterval(fading); } };
  }
},

// 13 — Pixel grid heartbeat
{
  name: "Cardiac Grid",
  tags: ["biomech", "pulse", "grid"],
  description: "A grid of biomech cells brightens in a heartbeat wave pattern across the screen",
  animator: (c, ctx, mouse) => {
    let t = 0, id;
    const cellW = 20, cellH = 20;
    const cols = Math.ceil(c.width / cellW);
    const rows = Math.ceil(c.height / cellH);
    const loop = () => {
      t += 0.04;
      ctx.fillStyle = "#000308";
      ctx.fillRect(0, 0, c.width, c.height);
      for (let col = 0; col < cols; col++) {
        for (let row = 0; row < rows; row++) {
          const dist = Math.sqrt((col - cols / 2) ** 2 + (row - rows / 2) ** 2);
          const val = Math.max(0, Math.sin(t * 3 - dist * 0.4));
          const bpm = Math.max(0, Math.sin(t * 6) > 0.85 ? 1 : 0) * 0.5;
          const bright = val * 0.7 + bpm;
          if (bright > 0.05) {
            ctx.fillStyle = `rgba(255,${30 + bright * 200},${bright * 100},${bright * 0.9})`;
            ctx.fillRect(col * cellW + 1, row * cellH + 1, cellW - 2, cellH - 2);
          }
        }
      }
      id = requestAnimationFrame(loop);
    };
    return { start: loop, stop: () => cancelAnimationFrame(id) };
  }
},

// 14 — Smoke/gas cloud with curl
{
  name: "Toxic Vapor",
  tags: ["biomech", "organic", "smoke"],
  description: "Toxic gas billows upward with curling, organic motion patterns",
  animator: (c, ctx, mouse) => {
    let particles = [], t = 0, id;
    const spawn = () => {
      particles.push({
        x: c.width / 2 + (Math.random() - 0.5) * 60,
        y: c.height * 0.8, vx: (Math.random() - 0.5) * 0.8,
        vy: -(1.5 + Math.random() * 2), life: 1,
        size: 20 + Math.random() * 40, rot: Math.random() * Math.PI * 2,
        rotV: (Math.random() - 0.5) * 0.02, hue: 80 + Math.random() * 60
      });
    };
    const loop = () => {
      t += 0.016;
      ctx.fillStyle = "rgba(0,5,0,0.15)";
      ctx.fillRect(0, 0, c.width, c.height);
      if (Math.random() < 0.3) spawn();
      particles = particles.filter(p => p.life > 0);
      particles.forEach(p => {
        p.x += p.vx + Math.sin(t + p.y * 0.01) * 0.5;
        p.y += p.vy; p.life -= 0.006; p.size += 0.4; p.rot += p.rotV;
        ctx.save();
        ctx.globalAlpha = p.life * 0.25;
        ctx.translate(p.x, p.y); ctx.rotate(p.rot);
        const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, p.size);
        grad.addColorStop(0, `hsla(${p.hue},60%,40%,1)`);
        grad.addColorStop(1, `hsla(${p.hue},60%,40%,0)`);
        ctx.beginPath(); ctx.arc(0, 0, p.size, 0, Math.PI * 2);
        ctx.fillStyle = grad; ctx.fill();
        ctx.restore();
      });
      id = requestAnimationFrame(loop);
    };
    return { start: loop, stop: () => cancelAnimationFrame(id) };
  }
},

// 15 — Lightning arc system
{
  name: "Arc Discharge",
  tags: ["biomech", "mechanical", "lightning"],
  description: "Electric arcs discharge between nodes in a chaotic neural-lightning pattern",
  animator: (c, ctx, mouse) => {
    let t = 0, id;
    const nodes = Array.from({ length: 6 }, () => ({
      x: 50 + Math.random() * (c.width - 100),
      y: 50 + Math.random() * (c.height - 100)
    }));
    const lightning = (x1, y1, x2, y2, roughness, depth) => {
      if (depth <= 0) {
        ctx.lineTo(x2, y2); return;
      }
      const mx = (x1 + x2) / 2 + (Math.random() - 0.5) * roughness;
      const my = (y1 + y2) / 2 + (Math.random() - 0.5) * roughness;
      lightning(x1, y1, mx, my, roughness / 2, depth - 1);
      lightning(mx, my, x2, y2, roughness / 2, depth - 1);
    };
    const loop = () => {
      t += 0.016;
      ctx.fillStyle = "rgba(0,0,15,0.4)";
      ctx.fillRect(0, 0, c.width, c.height);
      if (Math.random() < 0.15) {
        const i = Math.floor(Math.random() * nodes.length);
        const j = Math.floor(Math.random() * nodes.length);
        if (i !== j) {
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          lightning(nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y, 60, 6);
          ctx.strokeStyle = "rgba(150,200,255,0.9)"; ctx.lineWidth = 1.5; ctx.stroke();
          ctx.strokeStyle = "rgba(200,230,255,0.3)"; ctx.lineWidth = 6; ctx.stroke();
        }
      }
      nodes.forEach(n => {
        ctx.beginPath(); ctx.arc(n.x, n.y, 6, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(100,180,255,0.8)"; ctx.fill();
        ctx.strokeStyle = "rgba(200,230,255,0.5)"; ctx.lineWidth = 2; ctx.stroke();
      });
      id = requestAnimationFrame(loop);
    };
    return { start: loop, stop: () => cancelAnimationFrame(id) };
  }
},

// 16 — Marching ants / circuit trace
{
  name: "Circuit Trace",
  tags: ["biomech", "mechanical", "circuit"],
  description: "Animated circuit board traces light up in sequence like PCB signal flow",
  animator: (c, ctx, mouse) => {
    let t = 0, id;
    const grid = 30;
    const cols = Math.floor(c.width / grid);
    const rows = Math.floor(c.height / grid);
    // pre-generate circuit paths
    const paths = [];
    for (let i = 0; i < 20; i++) {
      const path = [];
      let cx = Math.floor(Math.random() * cols), cy = Math.floor(Math.random() * rows);
      for (let j = 0; j < 15; j++) {
        path.push({ x: cx * grid + grid / 2, y: cy * grid + grid / 2 });
        const dir = Math.floor(Math.random() * 4);
        if (dir === 0) cx = Math.min(cols - 1, cx + 1);
        else if (dir === 1) cx = Math.max(0, cx - 1);
        else if (dir === 2) cy = Math.min(rows - 1, cy + 1);
        else cy = Math.max(0, cy - 1);
      }
      paths.push({ pts: path, hue: Math.random() * 120 + 100, offset: Math.random() * 10 });
    }
    const loop = () => {
      t += 0.05;
      ctx.fillStyle = "rgba(0,5,0,0.3)";
      ctx.fillRect(0, 0, c.width, c.height);
      paths.forEach(p => {
        const phase = (t + p.offset) % p.pts.length;
        p.pts.forEach((pt, i) => {
          if (i === 0) return;
          const prev = p.pts[i - 1];
          const progress = Math.max(0, 1 - Math.abs(i - phase) / 3);
          ctx.beginPath(); ctx.moveTo(prev.x, prev.y); ctx.lineTo(pt.x, pt.y);
          ctx.strokeStyle = `hsla(${p.hue},100%,${30 + progress * 40}%,${0.2 + progress * 0.7})`;
          ctx.lineWidth = 2; ctx.stroke();
          if (progress > 0.7) {
            ctx.beginPath(); ctx.arc(pt.x, pt.y, 4, 0, Math.PI * 2);
            ctx.fillStyle = `hsla(${p.hue},100%,80%,${progress})`; ctx.fill();
          }
        });
      });
      id = requestAnimationFrame(loop);
    };
    return { start: loop, stop: () => cancelAnimationFrame(id) };
  }
},

// 17 — Fluid simulation particles (SPH-ish)
{
  name: "Plasma Fluid",
  tags: ["biomech", "organic", "fluid"],
  description: "Charged plasma fluid particles swirl with inter-particle forces",
  animator: (c, ctx, mouse) => {
    let particles = [], id;
    for (let i = 0; i < 200; i++) particles.push({
      x: Math.random() * c.width, y: Math.random() * c.height,
      vx: (Math.random() - 0.5) * 2, vy: (Math.random() - 0.5) * 2,
      hue: Math.random() * 60 + 160
    });
    const loop = () => {
      ctx.fillStyle = "rgba(0,0,10,0.3)";
      ctx.fillRect(0, 0, c.width, c.height);
      particles.forEach(p => {
        let fx = 0, fy = 0;
        // attract to mouse
        const dx = mouse.x - p.x, dy = mouse.y - p.y;
        const d = Math.sqrt(dx * dx + dy * dy) + 1;
        if (d < 200) { fx += (dx / d) * 0.5; fy += (dy / d) * 0.5; }
        p.vx = (p.vx + fx) * 0.98;
        p.vy = (p.vy + fy) * 0.98;
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) { p.x = 0; p.vx *= -1; }
        if (p.x > c.width) { p.x = c.width; p.vx *= -1; }
        if (p.y < 0) { p.y = 0; p.vy *= -1; }
        if (p.y > c.height) { p.y = c.height; p.vy *= -1; }
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        ctx.beginPath(); ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue + speed * 20},100%,65%,0.8)`; ctx.fill();
      });
      id = requestAnimationFrame(loop);
    };
    return { start: loop, stop: () => cancelAnimationFrame(id) };
  }
},

// 18 — Spinning mandala
{
  name: "Biomech Mandala",
  tags: ["biomech", "mechanical", "mandala"],
  description: "A biomechanical mandala rotates with nested geometric precision",
  animator: (c, ctx, mouse) => {
    let t = 0, id;
    const cx = c.width / 2, cy = c.height / 2;
    const loop = () => {
      t += 0.008;
      ctx.fillStyle = "rgba(0,0,8,0.15)";
      ctx.fillRect(0, 0, c.width, c.height);
      ctx.save(); ctx.translate(cx, cy);
      for (let layer = 0; layer < 5; layer++) {
        const r = 30 + layer * 30;
        const count = 6 + layer * 2;
        ctx.rotate(t * (layer % 2 === 0 ? 1 : -1) * 0.3);
        for (let i = 0; i < count; i++) {
          const a = (i / count) * Math.PI * 2;
          const x = Math.cos(a) * r, y = Math.sin(a) * r;
          ctx.beginPath(); ctx.arc(x, y, Math.max(0, 5 - layer * 0.5), 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${layer * 60 + t * 30},90%,65%,0.7)`; ctx.fill();
          // line to center
          ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(x, y);
          ctx.strokeStyle = `hsla(${layer * 60 + t * 30},70%,40%,0.2)`;
          ctx.lineWidth = 1; ctx.stroke();
        }
      }
      ctx.restore();
      id = requestAnimationFrame(loop);
    };
    return { start: loop, stop: () => cancelAnimationFrame(id) };
  }
},

// 19 — Particle vortex / black hole
{
  name: "Singularity Vortex",
  tags: ["biomech", "mechanical", "vortex"],
  description: "Thousands of particles spiral into a gravitational singularity at screen center",
  animator: (c, ctx, mouse) => {
    let particles = [], id;
    for (let i = 0; i < 500; i++) particles.push({
      angle: Math.random() * Math.PI * 2,
      r: 20 + Math.random() * 250,
      speed: 0.02 + Math.random() * 0.06,
      drift: 0.5 + Math.random() * 1.5,
      hue: Math.random() * 60 + 200
    });
    const cx = c.width / 2, cy = c.height / 2;
    const loop = () => {
      ctx.fillStyle = "rgba(0,0,5,0.3)";
      ctx.fillRect(0, 0, c.width, c.height);
      particles.forEach(p => {
        p.angle += p.speed * (250 / (p.r + 10));
        p.r -= p.drift;
        if (p.r < 5) { p.r = 20 + Math.random() * 250; p.angle = Math.random() * Math.PI * 2; }
        const x = cx + Math.cos(p.angle) * p.r;
        const y = cy + Math.sin(p.angle) * p.r;
        const alpha = Math.min(1, p.r / 80);
        ctx.beginPath(); ctx.arc(x, y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue},100%,70%,${alpha})`; ctx.fill();
      });
      // event horizon
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 20);
      grad.addColorStop(0, "rgba(0,0,0,1)");
      grad.addColorStop(1, "rgba(0,0,0,0)");
      ctx.beginPath(); ctx.arc(cx, cy, 20, 0, Math.PI * 2);
      ctx.fillStyle = grad; ctx.fill();
      id = requestAnimationFrame(loop);
    };
    return { start: loop, stop: () => cancelAnimationFrame(id) };
  }
},

// 20 — Matrix-rain style data streams
{
  name: "Data Cascade",
  tags: ["biomech", "mechanical", "matrix"],
  description: "Vertical streams of biomech data symbols rain down in matrix-code fashion",
  animator: (c, ctx, mouse) => {
    const cols = Math.floor(c.width / 16);
    const drops = Array.from({ length: cols }, () => Math.random() * -50);
    const chars = "ΑΒΓΔΕΖΗΘ01ΩΨΧΦΥΤΣΡΠΟΞΝΜΛΚΙ010110";
    let t = 0, id;
    const loop = () => {
      t++;
      ctx.fillStyle = "rgba(0,5,0,0.05)";
      ctx.fillRect(0, 0, c.width, c.height);
      ctx.font = "14px monospace";
      drops.forEach((y, i) => {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * 16;
        ctx.fillStyle = "#00ff41";
        ctx.fillText(char, x, y * 16);
        ctx.fillStyle = "rgba(200,255,200,0.8)";
        ctx.fillText(chars[Math.floor(Math.random() * chars.length)], x, (y - 1) * 16);
        if (y * 16 > c.height && Math.random() > 0.975) drops[i] = 0;
        drops[i] += 0.5;
      });
      id = requestAnimationFrame(loop);
    };
    return { start: loop, stop: () => cancelAnimationFrame(id) };
  }
},

// 21 — Ink diffusion in water
{
  name: "Bio Ink Diffusion",
  tags: ["biomech", "organic", "diffusion"],
  description: "Bioluminescent ink drops diffuse through fluid with organic tendrils",
  animator: (c, ctx, mouse) => {
    let drops = [], t = 0, id;
    const spawn = () => {
      drops.push({
        x: Math.random() * c.width, y: Math.random() * c.height,
        r: 2, maxR: 80 + Math.random() * 100, life: 1,
        hue: Math.random() * 300, tendrils: []
      });
    };
    for (let i = 0; i < 3; i++) spawn();
    const loop = () => {
      t += 0.016;
      ctx.fillStyle = "rgba(0,0,10,0.08)";
      ctx.fillRect(0, 0, c.width, c.height);
      if (Math.random() < 0.01) spawn();
      drops = drops.filter(d => d.life > 0);
      drops.forEach(d => {
        d.r = Math.min(d.r + 0.8, d.maxR);
        d.life -= d.r / (d.maxR * 80);
        const grad = ctx.createRadialGradient(d.x, d.y, 0, d.x, d.y, d.r);
        grad.addColorStop(0, `hsla(${d.hue},100%,60%,${d.life * 0.4})`);
        grad.addColorStop(0.6, `hsla(${d.hue + 30},80%,40%,${d.life * 0.2})`);
        grad.addColorStop(1, `hsla(${d.hue},100%,60%,0)`);
        ctx.beginPath(); ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = grad; ctx.fill();
        // tendrils
        for (let j = 0; j < 8; j++) {
          const a = (j / 8) * Math.PI * 2 + t * 0.2;
          const tr = d.r * (0.6 + Math.sin(t * 2 + j) * 0.3);
          const tx = d.x + Math.cos(a) * tr;
          const ty = d.y + Math.sin(a) * tr;
          ctx.beginPath();
          ctx.moveTo(d.x + Math.cos(a) * d.r * 0.3, d.y + Math.sin(a) * d.r * 0.3);
          ctx.lineTo(tx, ty);
          ctx.strokeStyle = `hsla(${d.hue},100%,70%,${d.life * 0.3})`; ctx.lineWidth = 1; ctx.stroke();
        }
      });
      id = requestAnimationFrame(loop);
    };
    return { start: loop, stop: () => cancelAnimationFrame(id) };
  }
},

// 22 — Spine bone segments with physics
{
  name: "Vertebral Column",
  tags: ["biomech", "spine", "physics"],
  description: "A biomechanical spine hangs and sways with realistic pendulum physics",
  animator: (c, ctx, mouse) => {
    const segments = 20;
    const segLen = 18;
    let joints = [], id;
    for (let i = 0; i <= segments; i++) joints.push({ x: c.width / 2, y: 50 + i * segLen, vx: 0, vy: 0 });
    const loop = () => {
      ctx.fillStyle = "rgba(5,0,5,0.3)";
      ctx.fillRect(0, 0, c.width, c.height);
      // anchor top to canvas center top
      joints[0].x += (c.width / 2 - joints[0].x) * 0.05;
      joints[0].y += (50 - joints[0].y) * 0.05;
      // gravity + constraints
      for (let iter = 0; iter < 5; iter++) {
        for (let i = 1; i <= segments; i++) {
          const dx = joints[i].x - joints[i - 1].x;
          const dy = joints[i].y - joints[i - 1].y;
          const d = Math.sqrt(dx * dx + dy * dy) || 1;
          const diff = (d - segLen) / d / 2;
          joints[i].x -= dx * diff; joints[i].y -= dy * diff;
          joints[i - 1].x += dx * diff; joints[i - 1].y += dy * diff;
        }
      }
      for (let i = 1; i <= segments; i++) {
        joints[i].vy += 0.2;
        joints[i].x += joints[i].vx; joints[i].y += joints[i].vy;
        joints[i].vx *= 0.95; joints[i].vy *= 0.95;
      }
      // draw vertebrae
      for (let i = 1; i <= segments; i++) {
        const prev = joints[i - 1], cur = joints[i];
        const dx = cur.x - prev.x, dy = cur.y - prev.y;
        const nx = -dy / segLen, ny = dx / segLen;
        const w = 10 - i * 0.2;
        ctx.beginPath();
        ctx.moveTo(prev.x + nx * w, prev.y + ny * w);
        ctx.lineTo(prev.x - nx * w, prev.y - ny * w);
        ctx.lineTo(cur.x - nx * w * 0.8, cur.y - ny * w * 0.8);
        ctx.lineTo(cur.x + nx * w * 0.8, cur.y + ny * w * 0.8);
        ctx.closePath();
        const g = i / segments;
        ctx.fillStyle = `rgba(${200 - g * 100},${80 + g * 60},${g * 150},0.8)`;
        ctx.fill();
        ctx.strokeStyle = "rgba(255,200,100,0.4)"; ctx.lineWidth = 1; ctx.stroke();
        ctx.beginPath(); ctx.arc(cur.x, cur.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,220,100,0.9)"; ctx.fill();
      }
      id = requestAnimationFrame(loop);
    };
    return { start: loop, stop: () => cancelAnimationFrame(id) };
  }
},

// 23 — Perlin noise terrain shifting
{
  name: "Bio Terrain Shift",
  tags: ["biomech", "organic", "terrain"],
  description: "Organic noise-based terrain shifts and morphs like living tissue under a scan",
  animator: (c, ctx, mouse) => {
    let t = 0, id;
    const noise = (x, y) => {
      const X = Math.floor(x), Y = Math.floor(y);
      return Math.sin(X * 127.1 + Y * 311.7) * 0.5 +
        Math.sin(X * 269.5 + Y * 183.3) * 0.25 +
        Math.sin(x * 2.1 + y * 3.7 + t) * 0.25;
    };
    const loop = () => {
      t += 0.015;
      ctx.fillStyle = "#000a00";
      ctx.fillRect(0, 0, c.width, c.height);
      const step = 6;
      for (let x = 0; x < c.width; x += step) {
        for (let y = 0; y < c.height; y += step) {
          const n = noise(x * 0.008, y * 0.008);
          const v = (n + 1) / 2;
          if (v > 0.45) {
            const hue = 80 + v * 120;
            ctx.fillStyle = `hsla(${hue},80%,${v * 60}%,${v * 0.8})`;
            ctx.fillRect(x, y, step - 1, step - 1);
          }
        }
      }
      id = requestAnimationFrame(loop);
    };
    return { start: loop, stop: () => cancelAnimationFrame(id) };
  }
},

// 24 — Bouncing blob/metaballs
{
  name: "Metaball Colony",
  tags: ["biomech", "organic", "metaball"],
  description: "Living metaballs merge and separate like amoeba colonies pulsing with life",
  animator: (c, ctx, mouse) => {
    let balls = [], t = 0, id;
    for (let i = 0; i < 6; i++) balls.push({
      x: Math.random() * c.width, y: Math.random() * c.height,
      vx: (Math.random() - 0.5) * 2, vy: (Math.random() - 0.5) * 2, r: 60 + Math.random() * 40
    });
    const loop = () => {
      t += 0.02;
      ctx.fillStyle = "rgba(0,5,0,0.3)";
      ctx.fillRect(0, 0, c.width, c.height);
      balls.forEach(b => {
        b.x += b.vx; b.y += b.vy;
        if (b.x < 0 || b.x > c.width) b.vx *= -1;
        if (b.y < 0 || b.y > c.height) b.vy *= -1;
      });
      // render metaballs via imageData
      const w = Math.floor(c.width / 4), h = Math.floor(c.height / 4);
      const img = ctx.getImageData(0, 0, c.width, c.height);
      for (let py = 0; py < c.height; py += 4) {
        for (let px = 0; px < c.width; px += 4) {
          let sum = 0;
          balls.forEach(b => {
            const dx = px - b.x, dy = py - b.y;
            sum += b.r * b.r / (dx * dx + dy * dy + 1);
          });
          if (sum > 1) {
            const v = Math.min(1, (sum - 1) * 0.5);
            const idx = (py * c.width + px) * 4;
            img.data[idx] = Math.min(255, img.data[idx] + v * 50);
            img.data[idx + 1] = Math.min(255, img.data[idx + 1] + v * 200);
            img.data[idx + 2] = Math.min(255, img.data[idx + 2] + v * 80);
            img.data[idx + 3] = 255;
          }
        }
      }
      ctx.putImageData(img, 0, 0);
      id = requestAnimationFrame(loop);
    };
    return { start: loop, stop: () => cancelAnimationFrame(id) };
  }
},

// 25 — Wireframe rotating 3D cube
{
  name: "Mech Tesseract",
  tags: ["biomech", "mechanical", "3d"],
  description: "A wireframe biomechanical hypercube rotates through 3D-projected space",
  animator: (c, ctx, mouse) => {
    let t = 0, id;
    const cx = c.width / 2, cy = c.height / 2;
    const verts = [[-1,-1,-1],[1,-1,-1],[1,1,-1],[-1,1,-1],[-1,-1,1],[1,-1,1],[1,1,1],[-1,1,1]];
    const edges = [[0,1],[1,2],[2,3],[3,0],[4,5],[5,6],[6,7],[7,4],[0,4],[1,5],[2,6],[3,7]];
    const project = (v, rx, ry) => {
      let [x, y, z] = v;
      let y2 = y * Math.cos(rx) - z * Math.sin(rx), z2 = y * Math.sin(rx) + z * Math.cos(rx);
      let x2 = x * Math.cos(ry) + z2 * Math.sin(ry); z2 = -x * Math.sin(ry) + z2 * Math.cos(ry);
      const fov = 4 / (4 + z2), scale = 100;
      return { x: cx + x2 * scale * fov, y: cy + y2 * scale * fov, z: z2 };
    };
    const loop = () => {
      t += 0.01;
      ctx.fillStyle = "rgba(0,0,10,0.3)";
      ctx.fillRect(0, 0, c.width, c.height);
      const projected = verts.map(v => project(v, t * 0.7, t));
      edges.forEach(([a, b]) => {
        const pa = projected[a], pb = projected[b];
        const depth = (pa.z + pb.z) / 2;
        ctx.beginPath(); ctx.moveTo(pa.x, pa.y); ctx.lineTo(pb.x, pb.y);
        ctx.strokeStyle = `rgba(${100 + depth * 40},${200 - depth * 30},255,${0.6 + depth * 0.1})`;
        ctx.lineWidth = 1.5; ctx.stroke();
      });
      projected.forEach(p => {
        ctx.beginPath(); ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(200,230,255,0.9)"; ctx.fill();
      });
      id = requestAnimationFrame(loop);
    };
    return { start: loop, stop: () => cancelAnimationFrame(id) };
  }
},

// 26 — Fiber optic scatter
{
  name: "Fiber Optic Scatter",
  tags: ["biomech", "servo", "fiber"],
  description: "Neural fiber optic cables pulse light signals from a central spine cluster",
  animator: (c, ctx, mouse) => {
    let t = 0, id;
    const fibers = Array.from({ length: 80 }, () => {
      const angle = Math.random() * Math.PI * 2;
      const len = 80 + Math.random() * 180;
      const cx = c.width / 2, cy = c.height / 2;
      return {
        cx, cy, angle, len,
        cp1x: cx + Math.cos(angle + (Math.random() - 0.5) * 1) * len * 0.4,
        cp1y: cy + Math.sin(angle + (Math.random() - 0.5) * 1) * len * 0.4,
        ex: cx + Math.cos(angle) * len,
        ey: cy + Math.sin(angle) * len,
        hue: Math.random() * 60 + 160, phase: Math.random() * 6
      };
    });
    const loop = () => {
      t += 0.03;
      ctx.fillStyle = "rgba(0,0,5,0.25)";
      ctx.fillRect(0, 0, c.width, c.height);
      fibers.forEach(f => {
        const pulse = (Math.sin(t + f.phase) + 1) / 2;
        // fiber body
        ctx.beginPath(); ctx.moveTo(f.cx, f.cy);
        ctx.quadraticCurveTo(f.cp1x, f.cp1y, f.ex, f.ey);
        ctx.strokeStyle = `hsla(${f.hue},80%,30%,0.5)`;
        ctx.lineWidth = 1; ctx.stroke();
        // light pulse along fiber
        const frac = (t * 0.5 + f.phase) % 1;
        const px = (1 - frac) * (1 - frac) * f.cx + 2 * (1 - frac) * frac * f.cp1x + frac * frac * f.ex;
        const py = (1 - frac) * (1 - frac) * f.cy + 2 * (1 - frac) * frac * f.cp1y + frac * frac * f.ey;
        ctx.beginPath(); ctx.arc(px, py, 3, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${f.hue},100%,80%,${pulse})`; ctx.fill();
      });
      // central node
      ctx.beginPath(); ctx.arc(c.width / 2, c.height / 2, 10, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255,255,255,0.9)"; ctx.fill();
      id = requestAnimationFrame(loop);
    };
    return { start: loop, stop: () => cancelAnimationFrame(id) };
  }
},

// 27 — Thermal imaging scan
{
  name: "Thermal Body Scan",
  tags: ["biomech", "pulse", "thermal"],
  description: "A thermal imaging scan sweeps across an abstract body heat signature",
  animator: (c, ctx, mouse) => {
    let t = 0, id;
    const noise = (x, y, z) => Math.sin(x * 3.1 + z) * Math.cos(y * 2.7 + z * 1.3) * 0.5 + 0.5;
    const loop = () => {
      t += 0.008;
      const scanX = (t * 80) % (c.width + 100) - 50;
      ctx.fillStyle = "rgba(0,0,0,0.15)";
      ctx.fillRect(0, 0, c.width, c.height);
      for (let x = 0; x < c.width; x += 5) {
        for (let y = 0; y < c.height; y += 5) {
          const n = noise(x * 0.005, y * 0.005, t);
          const revealed = x < scanX ? 1 : 0;
          if (revealed > 0) {
            const temp = n;
            let r = 0, g = 0, b = 0;
            if (temp < 0.25) { r = 0; g = 0; b = temp * 4 * 255; }
            else if (temp < 0.5) { r = 0; g = (temp - 0.25) * 4 * 255; b = 255; }
            else if (temp < 0.75) { r = (temp - 0.5) * 4 * 255; g = 255; b = 255 - (temp - 0.5) * 4 * 255; }
            else { r = 255; g = 255 - (temp - 0.75) * 4 * 255; b = 0; }
            ctx.fillStyle = `rgba(${r},${g},${b},0.8)`;
            ctx.fillRect(x, y, 5, 5);
          }
        }
      }
      // scan line
      ctx.fillStyle = "rgba(255,255,255,0.4)";
      ctx.fillRect(scanX - 2, 0, 4, c.height);
      id = requestAnimationFrame(loop);
    };
    return { start: loop, stop: () => cancelAnimationFrame(id) };
  }
},

// 28 — Liquid metal morphing blobs
{
  name: "Liquid Metal Morph",
  tags: ["biomech", "mechanical", "liquid"],
  description: "Pools of liquid metal morph between shapes with mercury-like surface tension",
  animator: (c, ctx, mouse) => {
    let t = 0, id;
    const cx = c.width / 2, cy = c.height / 2;
    const loop = () => {
      t += 0.02;
      ctx.fillStyle = "rgba(5,5,5,0.3)";
      ctx.fillRect(0, 0, c.width, c.height);
      for (let blob = 0; blob < 3; blob++) {
        const bx = cx + Math.sin(t * 0.7 + blob * 2.1) * 120;
        const by = cy + Math.cos(t * 0.5 + blob * 1.7) * 80;
        ctx.beginPath();
        for (let i = 0; i <= 32; i++) {
          const a = (i / 32) * Math.PI * 2;
          const r = 60 + Math.sin(a * 3 + t + blob) * 20 + Math.cos(a * 5 + t * 1.3) * 10;
          const x = bx + Math.cos(a) * r, y = by + Math.sin(a) * r;
          i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.closePath();
        const grad = ctx.createRadialGradient(bx - 15, by - 15, 5, bx, by, 70);
        grad.addColorStop(0, "rgba(220,220,230,0.95)");
        grad.addColorStop(0.4, "rgba(150,155,170,0.8)");
        grad.addColorStop(1, "rgba(80,85,100,0.6)");
        ctx.fillStyle = grad; ctx.fill();
        ctx.strokeStyle = "rgba(200,210,220,0.5)"; ctx.lineWidth = 2; ctx.stroke();
      }
      id = requestAnimationFrame(loop);
    };
    return { start: loop, stop: () => cancelAnimationFrame(id) };
  }
},

// 29 — EEG brainwave scanner
{
  name: "Neural EEG Scan",
  tags: ["biomech", "pulse", "neural"],
  description: "Simulated EEG readouts pulse and spike across multiple brain frequency channels",
  animator: (c, ctx, mouse) => {
    let t = 0, id, histories = [];
    const channels = 8;
    const channelH = c.height / channels;
    for (let i = 0; i < channels; i++) histories.push([]);
    const loop = () => {
      t += 0.05;
      ctx.fillStyle = "rgba(0,5,2,0.4)";
      ctx.fillRect(0, 0, c.width, c.height);
      for (let i = 0; i < channels; i++) {
        const freq = 0.5 + i * 0.8;
        const amp = 20 + i * 4;
        const spike = Math.random() < 0.01 ? amp * 2 : 0;
        const val = Math.sin(t * freq) * amp + Math.sin(t * freq * 2.3) * amp * 0.3 + spike;
        histories[i].push(val);
        if (histories[i].length > c.width) histories[i].shift();
        const baseY = (i + 0.5) * channelH;
        // label
        ctx.fillStyle = "rgba(0,255,120,0.4)";
        ctx.font = "10px monospace";
        ctx.fillText(`CH${i + 1} ${(freq).toFixed(1)}Hz`, 5, baseY - channelH * 0.3);
        // channel divider
        ctx.beginPath(); ctx.moveTo(0, baseY - channelH / 2); ctx.lineTo(c.width, baseY - channelH / 2);
        ctx.strokeStyle = "rgba(0,100,0,0.3)"; ctx.lineWidth = 1; ctx.stroke();
        // waveform
        ctx.beginPath();
        histories[i].forEach((v, x) => {
          x === 0 ? ctx.moveTo(x, baseY + v) : ctx.lineTo(x, baseY + v);
        });
        ctx.strokeStyle = `hsl(${120 - i * 12},100%,60%)`; ctx.lineWidth = 1.5; ctx.stroke();
      }
      id = requestAnimationFrame(loop);
    };
    return { start: loop, stop: () => cancelAnimationFrame(id) };
  }
},

// 30 — Firefly swarm
{
  name: "Mech Firefly Swarm",
  tags: ["biomech", "organic", "swarm"],
  description: "A swarm of mechanical fireflies drift and blink in organic formation patterns",
  animator: (c, ctx, mouse) => {
    let flies = [], id;
    for (let i = 0; i < 100; i++) flies.push({
      x: Math.random() * c.width, y: Math.random() * c.height,
      vx: (Math.random() - 0.5) * 1, vy: (Math.random() - 0.5) * 1,
      blink: Math.random() * Math.PI * 2, blinkSpeed: 0.03 + Math.random() * 0.05,
      hue: 60 + Math.random() * 80, trail: []
    });
    const loop = () => {
      ctx.fillStyle = "rgba(0,2,0,0.2)";
      ctx.fillRect(0, 0, c.width, c.height);
      flies.forEach(f => {
        f.vx += (Math.random() - 0.5) * 0.2 + (mouse.x - f.x) * 0.0001;
        f.vy += (Math.random() - 0.5) * 0.2 + (mouse.y - f.y) * 0.0001;
        f.vx *= 0.97; f.vy *= 0.97;
        f.x += f.vx; f.y += f.vy;
        if (f.x < 0) f.x = c.width; if (f.x > c.width) f.x = 0;
        if (f.y < 0) f.y = c.height; if (f.y > c.height) f.y = 0;
        f.blink += f.blinkSpeed;
        const brightness = (Math.sin(f.blink) + 1) / 2;
        f.trail.push({ x: f.x, y: f.y, a: brightness });
        if (f.trail.length > 15) f.trail.shift();
        f.trail.forEach((pt, i) => {
          ctx.beginPath(); ctx.arc(pt.x, pt.y, 1.5, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${f.hue},100%,70%,${pt.a * (i / 15) * 0.5})`; ctx.fill();
        });
        ctx.beginPath(); ctx.arc(f.x, f.y, 3 + brightness * 2, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${f.hue},100%,80%,${0.3 + brightness * 0.7})`; ctx.fill();
        if (brightness > 0.8) {
          ctx.beginPath(); ctx.arc(f.x, f.y, 12, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${f.hue},100%,80%,0.1)`; ctx.fill();
        }
      });
      id = requestAnimationFrame(loop);
    };
    return { start: loop, stop: () => cancelAnimationFrame(id) };
  }
},

// 31 — Crystalline growth
{
  name: "Crystal Growth",
  tags: ["biomech", "mechanical", "crystal"],
  description: "Biomechanical crystals nucleate and grow outward in angular geometric patterns",
  animator: (c, ctx, mouse) => {
    let crystals = [], t = 0, id;
    const growCrystal = (x, y) => {
      const branches = [];
      const numBranch = 4 + Math.floor(Math.random() * 4);
      for (let i = 0; i < numBranch; i++) {
        const a = (i / numBranch) * Math.PI * 2 + Math.random() * 0.3;
        branches.push({ angle: a, len: 0, maxLen: 40 + Math.random() * 80, growing: true });
      }
      return { x, y, branches, hue: 180 + Math.random() * 60, life: 1 };
    };
    crystals.push(growCrystal(c.width / 2, c.height / 2));
    const loop = () => {
      t += 0.02;
      ctx.fillStyle = "rgba(0,0,8,0.2)";
      ctx.fillRect(0, 0, c.width, c.height);
      if (Math.random() < 0.005) crystals.push(growCrystal(Math.random() * c.width, Math.random() * c.height));
      crystals = crystals.filter(c => c.life > 0);
      crystals.forEach(cr => {
        cr.life -= 0.001;
        cr.branches.forEach(b => {
          if (b.growing && b.len < b.maxLen) {
            b.len += 1.5;
            // sub-branches
            if (b.len > b.maxLen * 0.5 && Math.random() < 0.05 && !b.subBranch) {
              b.subBranch = { angle: b.angle + (Math.random() - 0.5) * 1.2, len: 0, maxLen: b.maxLen * 0.5 };
            }
          }
          const ex = cr.x + Math.cos(b.angle) * b.len;
          const ey = cr.y + Math.sin(b.angle) * b.len;
          ctx.beginPath(); ctx.moveTo(cr.x, cr.y); ctx.lineTo(ex, ey);
          ctx.strokeStyle = `hsla(${cr.hue},100%,65%,${cr.life * 0.8})`; ctx.lineWidth = 2; ctx.stroke();
          if (b.subBranch) {
            b.subBranch.len = Math.min(b.subBranch.len + 1, b.subBranch.maxLen);
            const sx = ex + Math.cos(b.subBranch.angle) * b.subBranch.len;
            const sy = ey + Math.sin(b.subBranch.angle) * b.subBranch.len;
            ctx.beginPath(); ctx.moveTo(ex, ey); ctx.lineTo(sx, sy);
            ctx.strokeStyle = `hsla(${cr.hue + 30},100%,75%,${cr.life * 0.6})`; ctx.lineWidth = 1; ctx.stroke();
          }
        });
        ctx.beginPath(); ctx.arc(cr.x, cr.y, 5, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${cr.hue},100%,90%,${cr.life})`; ctx.fill();
      });
      id = requestAnimationFrame(loop);
    };
    return { start: loop, stop: () => cancelAnimationFrame(id) };
  }
},

// 32 — Morphing polygon
{
  name: "Morphing Bio-Form",
  tags: ["biomech", "organic", "morph"],
  description: "A closed polygon morphs between organic and geometric shapes with fluid transitions",
  animator: (c, ctx, mouse) => {
    let t = 0, id;
    const cx = c.width / 2, cy = c.height / 2;
    const pts = 64;
    const loop = () => {
      t += 0.012;
      ctx.fillStyle = "rgba(0,0,5,0.2)";
      ctx.fillRect(0, 0, c.width, c.height);
      ctx.beginPath();
      for (let i = 0; i <= pts; i++) {
        const a = (i / pts) * Math.PI * 2;
        const r = 120
          + Math.sin(a * 3 + t) * 40
          + Math.sin(a * 7 + t * 1.3) * 20
          + Math.sin(a * 11 + t * 0.7) * 10
          + Math.cos(a * 5 + t * 2) * 15;
        const x = cx + Math.cos(a) * r, y = cy + Math.sin(a) * r;
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.closePath();
      const grad = ctx.createRadialGradient(cx - 30, cy - 30, 10, cx, cy, 160);
      grad.addColorStop(0, `hsla(${t * 30},80%,60%,0.3)`);
      grad.addColorStop(0.5, `hsla(${t * 30 + 60},80%,40%,0.15)`);
      grad.addColorStop(1, `hsla(${t * 30 + 120},80%,20%,0)`);
      ctx.fillStyle = grad; ctx.fill();
      ctx.strokeStyle = `hsla(${t * 30},100%,70%,0.8)`; ctx.lineWidth = 2; ctx.stroke();
      ctx.strokeStyle = `hsla(${t * 30 + 30},100%,80%,0.15)`; ctx.lineWidth = 8; ctx.stroke();
      id = requestAnimationFrame(loop);
    };
    return { start: loop, stop: () => cancelAnimationFrame(id) };
  }
},

// 33 — Swirling galaxy arms
{
  name: "Biomech Galaxy",
  tags: ["biomech", "mechanical", "spiral"],
  description: "Star-like particles form spiral galaxy arms rotating in biomechanical space",
  animator: (c, ctx, mouse) => {
    let t = 0, id;
    const cx = c.width / 2, cy = c.height / 2;
    const stars = Array.from({ length: 800 }, () => {
      const arm = Math.floor(Math.random() * 3);
      const dist = 20 + Math.pow(Math.random(), 0.7) * 220;
      const angle = (arm / 3) * Math.PI * 2 + dist * 0.02 + Math.random() * 0.5;
      return { arm, dist, angle, hue: arm * 60 + 160 + Math.random() * 30, size: Math.random() * 2 + 0.5 };
    });
    const loop = () => {
      t += 0.005;
      ctx.fillStyle = "rgba(0,0,5,0.15)";
      ctx.fillRect(0, 0, c.width, c.height);
      stars.forEach(s => {
        const a = s.angle + t * (1 / (s.dist + 1) * 20);
        const x = cx + Math.cos(a) * s.dist;
        const y = cy + Math.sin(a) * s.dist * 0.5;
        ctx.beginPath(); ctx.arc(x, y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${s.hue},100%,75%,0.8)`; ctx.fill();
      });
      // core glow
      const coreGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 30);
      coreGrad.addColorStop(0, "rgba(255,240,200,0.9)");
      coreGrad.addColorStop(1, "rgba(255,150,50,0)");
      ctx.beginPath(); ctx.arc(cx, cy, 30, 0, Math.PI * 2);
      ctx.fillStyle = coreGrad; ctx.fill();
      id = requestAnimationFrame(loop);
    };
    return { start: loop, stop: () => cancelAnimationFrame(id) };
  }
},

// 34 — Hex grid scanner
{
  name: "Hex Bio Scanner",
  tags: ["biomech", "mechanical", "hexgrid"],
  description: "A hexagonal grid activates in ripple waves like a bio-scanner sweep",
  animator: (c, ctx, mouse) => {
    let t = 0, id;
    const hexR = 24;
    const hexW = hexR * 2;
    const hexH = Math.sqrt(3) * hexR;
    const cols = Math.ceil(c.width / (hexW * 0.75)) + 2;
    const rows = Math.ceil(c.height / hexH) + 2;
    const hexPath = (x, y, r) => {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const a = (i / 6) * Math.PI * 2 - Math.PI / 6;
        i === 0 ? ctx.moveTo(x + Math.cos(a) * r, y + Math.sin(a) * r)
          : ctx.lineTo(x + Math.cos(a) * r, y + Math.sin(a) * r);
      }
      ctx.closePath();
    };
    const loop = () => {
      t += 0.03;
      ctx.fillStyle = "rgba(0,5,0,0.3)";
      ctx.fillRect(0, 0, c.width, c.height);
      for (let col = 0; col < cols; col++) {
        for (let row = 0; row < rows; row++) {
          const x = col * hexW * 0.75 - hexR;
          const y = row * hexH + (col % 2 === 0 ? 0 : hexH / 2) - hexH;
          const dist = Math.sqrt((x - c.width / 2) ** 2 + (y - c.height / 2) ** 2);
          const wave = Math.sin(dist * 0.04 - t * 2);
          const pulse = (wave + 1) / 2;
          hexPath(x, y, hexR - 2);
          if (pulse > 0.6) {
            ctx.fillStyle = `rgba(0,${150 + pulse * 100},${pulse * 80},${pulse * 0.4})`;
            ctx.fill();
          }
          ctx.strokeStyle = `rgba(0,${100 + pulse * 100},50,${0.2 + pulse * 0.4})`;
          ctx.lineWidth = 1; ctx.stroke();
        }
      }
      id = requestAnimationFrame(loop);
    };
    return { start: loop, stop: () => cancelAnimationFrame(id) };
  }
},

// 35 — Tentacle/cilia field
{
  name: "Cilia Field",
  tags: ["biomech", "organic", "cilia"],
  description: "Thousands of microscopic biomech cilia wave in coordinated ripple patterns",
  animator: (c, ctx, mouse) => {
    let t = 0, id;
    const cilia = [];
    for (let x = 0; x < c.width; x += 15) {
      for (let y = c.height * 0.5; y < c.height; y += 20) {
        cilia.push({ bx: x, by: y, phase: (x + y) * 0.02 });
      }
    }
    const loop = () => {
      t += 0.04;
      ctx.fillStyle = "rgba(0,0,8,0.35)";
      ctx.fillRect(0, 0, c.width, c.height);
      cilia.forEach(ci => {
        const len = 25 + Math.sin(ci.phase + t) * 10;
        const sway = Math.sin(ci.phase + t * 0.8) * 15;
        ctx.beginPath();
        ctx.moveTo(ci.bx, ci.by);
        ctx.quadraticCurveTo(ci.bx + sway, ci.by - len * 0.5, ci.bx + sway * 0.5, ci.by - len);
        const v = (Math.sin(ci.phase + t) + 1) / 2;
        ctx.strokeStyle = `rgba(${100 + v * 80},${150 + v * 100},${200 + v * 55},0.7)`;
        ctx.lineWidth = 1.5; ctx.stroke();
        ctx.beginPath(); ctx.arc(ci.bx + sway * 0.5, ci.by - len, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200,230,255,${0.3 + v * 0.6})`; ctx.fill();
      });
      id = requestAnimationFrame(loop);
    };
    return { start: loop, stop: () => cancelAnimationFrame(id) };
  }
},

// 36 — Sonic ripple visualizer
{
  name: "Sonic Resonance",
  tags: ["biomech", "pulse", "sonic"],
  description: "Sound wave interference patterns ripple from multiple resonance points",
  animator: (c, ctx, mouse) => {
    let t = 0, id;
    const sources = [
      { x: c.width * 0.3, y: c.height * 0.4, freq: 0.04, amp: 60 },
      { x: c.width * 0.7, y: c.height * 0.6, freq: 0.035, amp: 50 },
      { x: c.width * 0.5, y: c.height * 0.3, freq: 0.05, amp: 40 },
    ];
    const loop = () => {
      t += 1;
      ctx.fillStyle = "rgba(0,0,8,0.25)";
      ctx.fillRect(0, 0, c.width, c.height);
      const img = ctx.getImageData(0, 0, c.width, c.height);
      for (let y = 0; y < c.height; y += 3) {
        for (let x = 0; x < c.width; x += 3) {
          let sum = 0;
          sources.forEach(s => {
            const d = Math.sqrt((x - s.x) ** 2 + (y - s.y) ** 2);
            sum += Math.sin(d * s.freq - t * 0.08) * s.amp / (d * 0.01 + 1);
          });
          const v = (sum + 1) / 2;
          const idx = (y * c.width + x) * 4;
          img.data[idx] = Math.min(255, v * 100);
          img.data[idx + 1] = Math.min(255, v * 200);
          img.data[idx + 2] = Math.min(255, v * 150);
          img.data[idx + 3] = Math.min(255, v * 180 + 20);
        }
      }
      ctx.putImageData(img, 0, 0);
      sources.forEach(s => {
        ctx.beginPath(); ctx.arc(s.x, s.y, 8, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,200,0.9)"; ctx.fill();
      });
      id = requestAnimationFrame(loop);
    };
    return { start: loop, stop: () => cancelAnimationFrame(id) };
  }
},

// 37 — Constellation connector
{
  name: "Neural Constellation",
  tags: ["biomech", "neural", "constellation"],
  description: "Drifting nodes form and dissolve constellations, synaptic connections firing between nearby nodes",
  animator: (c, ctx, mouse) => {
    let nodes = [], id;
    for (let i = 0; i < 60; i++) nodes.push({
      x: Math.random() * c.width, y: Math.random() * c.height,
      vx: (Math.random() - 0.5) * 0.5, vy: (Math.random() - 0.5) * 0.5,
      r: 2 + Math.random() * 3, hue: 160 + Math.random() * 80
    });
    const loop = () => {
      ctx.fillStyle = "rgba(0,0,8,0.3)";
      ctx.fillRect(0, 0, c.width, c.height);
      nodes.forEach(n => {
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0) n.x = c.width; if (n.x > c.width) n.x = 0;
        if (n.y < 0) n.y = c.height; if (n.y > c.height) n.y = 0;
      });
      // connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 120) {
            const alpha = (1 - d / 120) * 0.6;
            ctx.beginPath(); ctx.moveTo(nodes[i].x, nodes[i].y); ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(100,200,255,${alpha})`; ctx.lineWidth = 1; ctx.stroke();
            // pulse
            if (Math.random() < 0.005) {
              ctx.beginPath(); ctx.moveTo(nodes[i].x, nodes[i].y); ctx.lineTo(nodes[j].x, nodes[j].y);
              ctx.strokeStyle = `rgba(255,255,200,${alpha * 2})`; ctx.lineWidth = 2; ctx.stroke();
            }
          }
        }
      }
      nodes.forEach(n => {
        ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${n.hue},100%,75%,0.9)`; ctx.fill();
      });
      id = requestAnimationFrame(loop);
    };
    return { start: loop, stop: () => cancelAnimationFrame(id) };
  }
},

// 38 — Cellular automata growth
{
  name: "Biomech Life",
  tags: ["biomech", "organic", "automata"],
  description: "Conway-like cellular automata evolves a living biomechanical colony in real time",
  animator: (c, ctx, mouse) => {
    const cols = 100, rows = 60;
    const cw = c.width / cols, ch = c.height / rows;
    let grid = Array.from({ length: rows }, () => Array.from({ length: cols }, () => Math.random() < 0.3 ? 1 : 0));
    let age = Array.from({ length: rows }, () => new Uint8Array(cols));
    let t = 0, id;
    const step = () => {
      const ng = grid.map((row, r) => row.map((cell, c) => {
        let n = 0;
        for (let dr = -1; dr <= 1; dr++) for (let dc = -1; dc <= 1; dc++) {
          if (dr === 0 && dc === 0) continue;
          const nr = (r + dr + rows) % rows, nc = (c + dc + cols) % cols;
          n += grid[nr][nc];
        }
        return (cell === 1 && (n === 2 || n === 3)) || (cell === 0 && n === 3) ? 1 : 0;
      }));
      for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
        if (ng[r][c] === 1) age[r][c] = Math.min(255, age[r][c] + 1);
        else age[r][c] = Math.max(0, age[r][c] - 3);
      }
      grid = ng;
    };
    const loop = () => {
      t++;
      if (t % 4 === 0) step();
      ctx.fillStyle = "#000a00";
      ctx.fillRect(0, 0, c.width, c.height);
      for (let r = 0; r < rows; r++) for (let cc = 0; cc < cols; cc++) {
        const a = age[r][cc];
        if (a > 0) {
          const v = a / 60;
          ctx.fillStyle = `hsl(${100 + v * 80},90%,${20 + v * 40}%)`;
          ctx.fillRect(cc * cw, r * ch, cw - 0.5, ch - 0.5);
        }
      }
      id = requestAnimationFrame(loop);
    };
    return { start: loop, stop: () => cancelAnimationFrame(id) };
  }
},

// 39 — Piston/engine crankshaft
{
  name: "Crankshaft Engine",
  tags: ["biomech", "mechanical", "engine"],
  description: "An exposed biomechanical crankshaft drives interconnected pistons in sync",
  animator: (c, ctx, mouse) => {
    let t = 0, id;
    const cx = c.width / 2, cy = c.height / 2;
    const loop = () => {
      t += 0.04;
      ctx.fillStyle = "rgba(5,3,0,0.4)";
      ctx.fillRect(0, 0, c.width, c.height);
      // crankshaft circle
      ctx.beginPath(); ctx.arc(cx, cy, 50, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(180,140,0,0.6)"; ctx.lineWidth = 4; ctx.stroke();
      // pistons
      for (let p = 0; p < 4; p++) {
        const baseAngle = (p / 4) * Math.PI * 2;
        const crankAngle = baseAngle + t;
        const crankX = cx + Math.cos(crankAngle) * 50;
        const crankY = cy + Math.sin(crankAngle) * 50;
        // rod end fixed along axes
        const rodLen = 90;
        const pistonX = cx + Math.cos(baseAngle) * (50 + rodLen + Math.sin(crankAngle - baseAngle + Math.PI) * 50 * 0.3);
        const pistonY = cy + Math.sin(baseAngle) * (50 + rodLen + Math.sin(crankAngle - baseAngle + Math.PI) * 50 * 0.3);
        // connecting rod
        ctx.beginPath(); ctx.moveTo(crankX, crankY); ctx.lineTo(pistonX, pistonY);
        ctx.strokeStyle = "rgba(220,180,50,0.9)"; ctx.lineWidth = 3; ctx.stroke();
        // piston
        ctx.save(); ctx.translate(pistonX, pistonY); ctx.rotate(baseAngle);
        ctx.fillStyle = "rgba(200,160,40,0.9)";
        ctx.fillRect(-10, -18, 20, 36);
        ctx.strokeStyle = "rgba(255,220,100,0.7)"; ctx.lineWidth = 2; ctx.strokeRect(-10, -18, 20, 36);
        ctx.restore();
        // crank pin
        ctx.beginPath(); ctx.arc(crankX, crankY, 6, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,220,100,0.9)"; ctx.fill();
      }
      // center bearing
      ctx.beginPath(); ctx.arc(cx, cy, 12, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255,200,80,0.9)"; ctx.fill();
      id = requestAnimationFrame(loop);
    };
    return { start: loop, stop: () => cancelAnimationFrame(id) };
  }
},

// 40 — Neon grid tunnel
{
  name: "Neon Grid Tunnel",
  tags: ["biomech", "mechanical", "tunnel"],
  description: "An infinite neon wireframe tunnel races toward the viewer at warp speed",
  animator: (c, ctx, mouse) => {
    let t = 0, id;
    const cx = c.width / 2, cy = c.height / 2;
    const loop = () => {
      t += 0.02;
      ctx.fillStyle = "rgba(0,0,5,0.35)";
      ctx.fillRect(0, 0, c.width, c.height);
      const rings = 20;
      for (let r = 0; r < rings; r++) {
        const z = ((r / rings) + t) % 1;
        const size = (1 - z) * 300 + 10;
        const alpha = z * 0.8;
        const hue = (r * 30 + t * 60) % 360;
        ctx.strokeStyle = `hsla(${hue},100%,60%,${alpha * 0.6})`;
        ctx.lineWidth = 1.5;
        ctx.strokeRect(cx - size / 2, cy - size / 2, size, size);
        // corner connectors
        if (r < rings - 1) {
          const z2 = (((r + 1) / rings) + t) % 1;
          const size2 = (1 - z2) * 300 + 10;
          [[-1, -1], [1, -1], [1, 1], [-1, 1]].forEach(([sx, sy]) => {
            ctx.beginPath();
            ctx.moveTo(cx + sx * size / 2, cy + sy * size / 2);
            ctx.lineTo(cx + sx * size2 / 2, cy + sy * size2 / 2);
            ctx.strokeStyle = `hsla(${hue},100%,60%,${alpha * 0.3})`; ctx.stroke();
          });
        }
      }
      id = requestAnimationFrame(loop);
    };
    return { start: loop, stop: () => cancelAnimationFrame(id) };
  }
},

// 41 — Bioluminescent coral
{
  name: "Bioluminescent Coral",
  tags: ["biomech", "organic", "coral"],
  description: "Bioluminescent coral branches sway in deep-sea currents emitting pulsing light",
  animator: (c, ctx, mouse) => {
    let t = 0, id;
    const coral = (x, y, angle, depth, len, hue) => {
      if (depth <= 0) return;
      const ex = x + Math.cos(angle + Math.sin(t + y * 0.02) * 0.3) * len;
      const ey = y + Math.sin(angle + Math.sin(t + y * 0.02) * 0.3) * len;
      const bright = 30 + (depth / 8) * 40;
      ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(ex, ey);
      ctx.strokeStyle = `hsla(${hue},100%,${bright}%,0.8)`;
      ctx.lineWidth = depth * 0.7; ctx.stroke();
      if (depth === 1) {
        ctx.beginPath(); ctx.arc(ex, ey, 3, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${hue + 40},100%,80%,${0.5 + Math.sin(t * 3 + x) * 0.3})`; ctx.fill();
      }
      if (Math.random() < 0.7) coral(ex, ey, angle - 0.4 + Math.random() * 0.2, depth - 1, len * 0.75, hue + 15);
      if (Math.random() < 0.7) coral(ex, ey, angle + 0.4 - Math.random() * 0.2, depth - 1, len * 0.75, hue - 10);
    };
    const bases = [
      { x: c.width * 0.2, hue: 180 }, { x: c.width * 0.5, hue: 280 }, { x: c.width * 0.8, hue: 320 }
    ];
    const loop = () => {
      t += 0.02;
      ctx.fillStyle = "rgba(0,3,10,0.25)";
      ctx.fillRect(0, 0, c.width, c.height);
      bases.forEach(b => coral(b.x, c.height, -Math.PI / 2, 7, 40, b.hue));
      id = requestAnimationFrame(loop);
    };
    return { start: loop, stop: () => cancelAnimationFrame(id) };
  }
},

// 42 — Radar sweep
{
  name: "Bio Radar Sweep",
  tags: ["biomech", "mechanical", "radar"],
  description: "A circular radar sweep reveals hidden biomechanical signatures on a dark grid",
  animator: (c, ctx, mouse) => {
    let angle = 0, id;
    const cx = c.width / 2, cy = c.height / 2;
    const maxR = Math.min(c.width, c.height) * 0.45;
    const blips = Array.from({ length: 15 }, () => ({
      a: Math.random() * Math.PI * 2, r: Math.random() * maxR * 0.9, brightness: 0
    }));
    const loop = () => {
      angle += 0.02;
      ctx.fillStyle = "rgba(0,10,0,0.3)";
      ctx.fillRect(0, 0, c.width, c.height);
      // grid rings
      for (let r = maxR * 0.25; r <= maxR; r += maxR * 0.25) {
        ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(0,150,0,0.3)"; ctx.lineWidth = 1; ctx.stroke();
      }
      // crosshairs
      ctx.beginPath(); ctx.moveTo(cx - maxR, cy); ctx.lineTo(cx + maxR, cy);
      ctx.moveTo(cx, cy - maxR); ctx.lineTo(cx, cy + maxR);
      ctx.strokeStyle = "rgba(0,150,0,0.3)"; ctx.lineWidth = 1; ctx.stroke();
      // sweep gradient
      const sweepGrad = ctx.createConicalGradient ? null : null;
      ctx.save();
      ctx.translate(cx, cy);
      for (let i = 0; i < 40; i++) {
        const a = angle - i * 0.04;
        ctx.beginPath(); ctx.moveTo(0, 0);
        ctx.arc(0, 0, maxR, a - 0.04, a);
        ctx.fillStyle = `rgba(0,255,0,${(40 - i) / 40 * 0.15})`; ctx.fill();
      }
      ctx.restore();
      // sweep line
      ctx.beginPath(); ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(angle) * maxR, cy + Math.sin(angle) * maxR);
      ctx.strokeStyle = "rgba(0,255,0,0.8)"; ctx.lineWidth = 2; ctx.stroke();
      // blips
      blips.forEach(b => {
        const da = ((angle - b.a) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2);
        if (da < 0.08) b.brightness = 1;
        b.brightness *= 0.985;
        if (b.brightness > 0.02) {
          const bx = cx + Math.cos(b.a) * b.r, by = cy + Math.sin(b.a) * b.r;
          ctx.beginPath(); ctx.arc(bx, by, 4, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0,255,100,${b.brightness})`; ctx.fill();
          ctx.beginPath(); ctx.arc(bx, by, 10, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0,255,100,${b.brightness * 0.2})`; ctx.fill();
        }
      });
      // clip to circle
      ctx.beginPath(); ctx.arc(cx, cy, maxR, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(0,200,0,0.8)"; ctx.lineWidth = 2; ctx.stroke();
      id = requestAnimationFrame(loop);
    };
    return { start: loop, stop: () => cancelAnimationFrame(id) };
  }
},

// 43 — Smoke ring emitter
{
  name: "Plasma Ring Cannon",
  tags: ["biomech", "mechanical", "rings"],
  description: "A biomechanical cannon fires expanding toroidal plasma rings that distort and fade",
  animator: (c, ctx, mouse) => {
    let rings = [], t = 0, id;
    const fire = () => {
      rings.push({ r: 10, life: 1, x: c.width / 2, y: c.height * 0.75, hue: Math.random() * 60 + 160 });
    };
    const loop = () => {
      t += 0.016;
      if (Math.floor(t * 60) % 90 === 0) fire();
      ctx.fillStyle = "rgba(0,0,8,0.35)";
      ctx.fillRect(0, 0, c.width, c.height);
      rings = rings.filter(r => r.life > 0);
      rings.forEach(r => {
        r.r += 4; r.life -= 0.012;
        r.y -= 1.5;
        const thickness = 20 + r.r * 0.1;
        for (let i = 0; i < 3; i++) {
          ctx.beginPath();
          ctx.ellipse(r.x, r.y, r.r + i * 2, r.r * 0.3 - i * 2, 0, 0, Math.PI * 2);
          ctx.strokeStyle = `hsla(${r.hue + i * 20},100%,${60 + i * 10}%,${r.life * (0.5 - i * 0.15)})`;
          ctx.lineWidth = thickness / (i + 1); ctx.stroke();
        }
      });
      id = requestAnimationFrame(loop);
    };
    return { start: loop, stop: () => cancelAnimationFrame(id) };
  }
},

// 44 — Voronoi stress fracture
{
  name: "Stress Fracture",
  tags: ["biomech", "mechanical", "fracture"],
  description: "A biomechanical surface cracks and fractures in Voronoi stress patterns over time",
  animator: (c, ctx, mouse) => {
    let t = 0, id;
    const seeds = Array.from({ length: 30 }, () => ({
      x: Math.random() * c.width, y: Math.random() * c.height,
      hue: Math.random() * 40 + 10
    }));
    const loop = () => {
      t += 0.008;
      ctx.fillStyle = "rgba(5,3,2,0.15)";
      ctx.fillRect(0, 0, c.width, c.height);
      // render voronoi-ish cells
      for (let py = 0; py < c.height; py += 4) {
        for (let px = 0; px < c.width; px += 4) {
          let minD = Infinity, minD2 = Infinity, closest;
          seeds.forEach(s => {
            const d = Math.sqrt((px - s.x) ** 2 + (py - s.y) ** 2);
            if (d < minD) { minD2 = minD; minD = d; closest = s; }
            else if (d < minD2) minD2 = d;
          });
          const edge = minD2 - minD;
          const stress = Math.sin(t * 2 + minD * 0.05) * 0.5 + 0.5;
          if (edge < 5) {
            const crackAlpha = Math.min(1, (t * 0.3) * (1 - edge / 5));
            ctx.fillStyle = `rgba(255,${200 + stress * 55},100,${crackAlpha * 0.8})`;
            ctx.fillRect(px, py, 4, 4);
          } else {
            ctx.fillStyle = `hsla(${closest.hue},40%,${10 + stress * 15}%,0.6)`;
            ctx.fillRect(px, py, 4, 4);
          }
        }
      }
      id = requestAnimationFrame(loop);
    };
    return { start: loop, stop: () => cancelAnimationFrame(id) };
  }
},

// 45 — Particle fountain
{
  name: "Bio Fountain",
  tags: ["biomech", "organic", "fountain"],
  description: "A biomechanical fountain erupts colored particle streams that arc under gravity",
  animator: (c, ctx, mouse) => {
    let particles = [], id;
    const spawn = () => {
      const spread = 0.6;
      particles.push({
        x: c.width / 2, y: c.height * 0.75,
        vx: (Math.random() - 0.5) * spread * 8,
        vy: -(4 + Math.random() * 8),
        life: 1, hue: Math.random() * 360, size: 2 + Math.random() * 4
      });
    };
    const loop = () => {
      ctx.fillStyle = "rgba(0,0,5,0.25)";
      ctx.fillRect(0, 0, c.width, c.height);
      for (let i = 0; i < 5; i++) spawn();
      particles = particles.filter(p => p.life > 0 && p.y < c.height);
      particles.forEach(p => {
        p.vy += 0.2; p.x += p.vx; p.y += p.vy; p.life -= 0.015;
        const trail = p.size * p.life;
        ctx.beginPath(); ctx.arc(p.x, p.y, trail, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue},100%,65%,${p.life * 0.8})`; ctx.fill();
        // splash on ground
        if (p.y > c.height * 0.75 && p.vy > 0) {
          ctx.beginPath(); ctx.arc(p.x, c.height * 0.75, p.size * 2, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${p.hue},100%,70%,0.2)`; ctx.fill();
          p.vy = 0; p.vx = 0; p.life -= 0.05;
        }
      });
      // nozzle
      ctx.beginPath(); ctx.arc(c.width / 2, c.height * 0.75, 12, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(180,180,180,0.8)"; ctx.fill();
      ctx.strokeStyle = "rgba(255,255,255,0.5)"; ctx.lineWidth = 2; ctx.stroke();
      id = requestAnimationFrame(loop);
    };
    return { start: loop, stop: () => cancelAnimationFrame(id) };
  }
},

// 46 — Glitch scramble field
{
  name: "Glitch Organism",
  tags: ["biomech", "mechanical", "glitch"],
  description: "A glitching biomechanical form corrupts and reconstructs itself in digital artifacts",
  animator: (c, ctx, mouse) => {
    let t = 0, id;
    const loop = () => {
      t += 0.03;
      if (Math.random() < 0.3) {
        ctx.fillStyle = "rgba(0,0,0,0.8)";
        ctx.fillRect(0, 0, c.width, c.height);
      }
      // random slice displacement
      if (Math.random() < 0.4) {
        const y = Math.random() * c.height;
        const h = 5 + Math.random() * 30;
        const dx = (Math.random() - 0.5) * 60;
        try {
          const slice = ctx.getImageData(0, y, c.width, h);
          ctx.putImageData(slice, dx, y);
        } catch (e) {}
      }
      // scan line bursts
      for (let i = 0; i < 3; i++) {
        const y = Math.random() * c.height;
        const w = 20 + Math.random() * 200;
        const x = Math.random() * (c.width - w);
        ctx.fillStyle = `rgba(${Math.random() * 255},${Math.random() * 100},${Math.random() * 255},0.8)`;
        ctx.fillRect(x, y, w, 2 + Math.random() * 6);
      }
      // organic core
      ctx.save();
      ctx.globalAlpha = 0.6 + Math.random() * 0.4;
      const cx = c.width / 2, cy = c.height / 2;
      ctx.beginPath();
      for (let a = 0; a <= Math.PI * 2; a += 0.2) {
        const r = 80 + Math.sin(a * 5 + t) * 30 + Math.random() * 20;
        const x = cx + Math.cos(a) * r, y = cy + Math.sin(a) * r;
        a === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.strokeStyle = `rgba(0,255,${Math.floor(Math.random() * 255)},0.8)`;
      ctx.lineWidth = 2; ctx.stroke();
      ctx.restore();
      id = requestAnimationFrame(loop);
    };
    return { start: loop, stop: () => cancelAnimationFrame(id) };
  }
},

// 47 — Spinning turbine / fan blades
{
  name: "Turbine Array",
  tags: ["biomech", "mechanical", "turbine"],
  description: "Three biomechanical turbines spin at different speeds, their energy fields overlapping",
  animator: (c, ctx, mouse) => {
    let t = 0, id;
    const turbines = [
      { x: c.width * 0.25, y: c.height / 2, speed: 1.2, r: 80, blades: 5, hue: 200 },
      { x: c.width * 0.5, y: c.height / 2, speed: -0.8, r: 100, blades: 7, hue: 60 },
      { x: c.width * 0.75, y: c.height / 2, speed: 1.5, r: 70, blades: 4, hue: 320 },
    ];
    const drawTurbine = (turb, angle) => {
      ctx.save(); ctx.translate(turb.x, turb.y); ctx.rotate(angle);
      for (let b = 0; b < turb.blades; b++) {
        ctx.save(); ctx.rotate((b / turb.blades) * Math.PI * 2);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(turb.r * 0.3, -turb.r * 0.1, turb.r * 0.7, turb.r * 0.2, turb.r, 0);
        ctx.bezierCurveTo(turb.r * 0.7, turb.r * 0.15, turb.r * 0.3, turb.r * 0.05, 0, 0);
        ctx.closePath();
        ctx.fillStyle = `hsla(${turb.hue},80%,50%,0.7)`;
        ctx.fill(); ctx.strokeStyle = `hsla(${turb.hue},100%,70%,0.4)`; ctx.lineWidth = 1; ctx.stroke();
        ctx.restore();
      }
      // hub
      ctx.beginPath(); ctx.arc(0, 0, 12, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${turb.hue},60%,40%,0.9)`; ctx.fill();
      // energy ring
      ctx.beginPath(); ctx.arc(0, 0, turb.r + 10, 0, Math.PI * 2);
      ctx.strokeStyle = `hsla(${turb.hue},100%,60%,0.15)`; ctx.lineWidth = 8; ctx.stroke();
      ctx.restore();
    };
    const loop = () => {
      t += 0.016;
      ctx.fillStyle = "rgba(3,3,8,0.35)";
      ctx.fillRect(0, 0, c.width, c.height);
      turbines.forEach(turb => drawTurbine(turb, t * turb.speed));
      id = requestAnimationFrame(loop);
    };
    return { start: loop, stop: () => cancelAnimationFrame(id) };
  }
},

// 48 — Aurora curtain
{
  name: "Aurora Biorealis",
  tags: ["biomech", "organic", "aurora"],
  description: "Bioluminescent aurora curtains ripple and shift like a living atmospheric display",
  animator: (c, ctx, mouse) => {
    let t = 0, id;
    const cols = 60;
    const colW = c.width / cols;
    const loop = () => {
      t += 0.015;
      ctx.fillStyle = "rgba(0,0,5,0.3)";
      ctx.fillRect(0, 0, c.width, c.height);
      for (let col = 0; col < cols; col++) {
        const x = col * colW;
        const baseH = c.height * 0.3 + Math.sin(col * 0.15 + t) * c.height * 0.1;
        const height = c.height * 0.4 + Math.sin(col * 0.1 + t * 1.3) * c.height * 0.15;
        const hue = 120 + Math.sin(col * 0.1 + t * 0.5) * 60 + Math.cos(col * 0.08 + t) * 40;
        const grad = ctx.createLinearGradient(x, baseH, x, baseH + height);
        grad.addColorStop(0, `hsla(${hue},100%,60%,0)`);
        grad.addColorStop(0.3, `hsla(${hue},100%,60%,${0.3 + Math.sin(col + t * 2) * 0.15})`);
        grad.addColorStop(0.7, `hsla(${hue + 30},100%,50%,0.2)`);
        grad.addColorStop(1, `hsla(${hue},100%,60%,0)`);
        ctx.fillStyle = grad;
        ctx.fillRect(x, baseH, colW, height);
      }
      // stars
      for (let i = 0; i < 5; i++) {
        const sx = Math.random() * c.width, sy = Math.random() * c.height * 0.3;
        ctx.fillStyle = "rgba(255,255,255,0.6)";
        ctx.fillRect(sx, sy, 1, 1);
      }
      id = requestAnimationFrame(loop);
    };
    return { start: loop, stop: () => cancelAnimationFrame(id) };
  }
},

// 49 — Seismic wave scanner
{
  name: "Seismic Array",
  tags: ["biomech", "mechanical", "seismic"],
  description: "Multiple seismic sensors record biomechanical ground tremors as 3D wave terrain",
  animator: (c, ctx, mouse) => {
    let t = 0, id;
    const rows = 25, cols = 50;
    const cellW = c.width / cols, cellH = c.height / rows;
    const loop = () => {
      t += 0.025;
      ctx.fillStyle = "rgba(0,0,8,0.4)";
      ctx.fillRect(0, 0, c.width, c.height);
      for (let row = rows - 1; row >= 0; row--) {
        ctx.beginPath();
        for (let col = 0; col < cols; col++) {
          const x = col * cellW;
          const baseY = row * cellH + cellH;
          const earthquake = Math.sin(t * 3) > 0.95 ? Math.random() * 60 : 0;
          const height = 20
            + Math.sin(col * 0.3 + t + row * 0.2) * 20
            + Math.sin(col * 0.7 + t * 1.5) * 10
            + earthquake;
          const y = baseY - height;
          col === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.lineTo(c.width, row * cellH + cellH);
        ctx.lineTo(0, row * cellH + cellH);
        ctx.closePath();
        const depth = row / rows;
        ctx.fillStyle = `rgba(${depth * 100},${20 + depth * 80},${100 - depth * 60},0.6)`;
        ctx.fill();
        ctx.strokeStyle = `rgba(${100 + depth * 100},${150 + depth * 100},${255 - depth * 100},0.4)`;
        ctx.lineWidth = 1; ctx.stroke();
      }
      id = requestAnimationFrame(loop);
    };
    return { start: loop, stop: () => cancelAnimationFrame(id) };
  }
},

// 50 — Pulsing biomass with spines
{
  name: "Biomass Core",
  tags: ["biomech", "organic", "pulse"],
  description: "A throbbing biomechanical core extends and retracts armored spines in rhythmic waves",
  animator: (c, ctx, mouse) => {
    let t = 0, id;
    const cx = c.width / 2, cy = c.height / 2;
    const spines = 32;
    const loop = () => {
      t += 0.025;
      ctx.fillStyle = "rgba(5,0,3,0.3)";
      ctx.fillRect(0, 0, c.width, c.height);
      // inner pulsing mass
      for (let layer = 5; layer >= 0; layer--) {
        ctx.beginPath();
        for (let i = 0; i <= 64; i++) {
          const a = (i / 64) * Math.PI * 2;
          const r = (40 - layer * 5)
            + Math.sin(a * 4 + t + layer) * 8
            + Math.sin(a * 7 + t * 1.5) * 4
            + Math.sin(t * 3) * 5;
          const x = cx + Math.cos(a) * r, y = cy + Math.sin(a) * r;
          i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.closePath();
        const alpha = 0.1 + layer * 0.06;
        ctx.fillStyle = `rgba(${100 + layer * 20},${20 + layer * 10},${50 + layer * 15},${alpha})`;
        ctx.fill();
      }
      // spines
      for (let i = 0; i < spines; i++) {
        const a = (i / spines) * Math.PI * 2;
        const wave = Math.sin(t * 2 + i * 0.5);
        const innerR = 38 + wave * 5;
        const outerR = 80 + wave * 30 + Math.sin(t * 4 + i * 0.8) * 15;
        const ix = cx + Math.cos(a) * innerR, iy = cy + Math.sin(a) * innerR;
        const ox = cx + Math.cos(a) * outerR, oy = cy + Math.sin(a) * outerR;
        // spine thickness
        const perp = a + Math.PI / 2;
        const sw = 3 + wave * 1.5;
        ctx.beginPath();
        ctx.moveTo(ix + Math.cos(perp) * sw, iy + Math.sin(perp) * sw);
        ctx.lineTo(ox, oy);
        ctx.lineTo(ix - Math.cos(perp) * sw, iy - Math.sin(perp) * sw);
        ctx.closePath();
        const hue = 0 + i * 2;
        ctx.fillStyle = `hsla(${hue},80%,${40 + wave * 20}%,0.8)`;
        ctx.fill();
        ctx.strokeStyle = `hsla(${hue + 30},100%,70%,0.4)`;
        ctx.lineWidth = 1; ctx.stroke();
      }
      // core glow
      const coreGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 40);
      coreGrad.addColorStop(0, `rgba(255,${100 + Math.sin(t * 3) * 80},150,0.8)`);
      coreGrad.addColorStop(1, "rgba(100,0,50,0)");
      ctx.beginPath(); ctx.arc(cx, cy, 40, 0, Math.PI * 2);
      ctx.fillStyle = coreGrad; ctx.fill();
      id = requestAnimationFrame(loop);
    };
    return { start: loop, stop: () => cancelAnimationFrame(id) };
  }
},

];

// ────────────────────────────────────────────────────────────
//  WEAPON FX (50 effects)
// ────────────────────────────────────────────────────────────

export const weaponEffects = [

// 1 — Plasma sword slash arc drawn across screen
{
  name: "Plasma Slash Arc",
  tags: ["weapon", "energy", "blade"],
  description: "A plasma blade swings in a wide arc, leaving a searing curved afterburn",
  animator: (c, ctx, mouse) => {
    let t = 0, id, slashes = [];
    const slash = () => {
      const cx = c.width / 2, cy = c.height / 2;
      const startAngle = Math.random() * Math.PI * 2;
      slashes.push({ cx, cy, startAngle, span: Math.PI * 0.8, r: 80 + Math.random() * 120, life: 1, hue: 160 + Math.random() * 60 });
    };
    slash();
    const loop = () => {
      t += 0.025;
      ctx.fillStyle = "rgba(0,0,10,0.35)";
      ctx.fillRect(0, 0, c.width, c.height);
      if (Math.floor(t * 40) % 80 === 0) slash();
      slashes = slashes.filter(s => s.life > 0);
      slashes.forEach(s => {
        s.life -= 0.012;
        const drawn = (1 - s.life) * s.span;
        for (let i = 0; i < 3; i++) {
          ctx.beginPath();
          ctx.arc(s.cx, s.cy, s.r + i * 6, s.startAngle, s.startAngle + drawn);
          ctx.strokeStyle = `hsla(${s.hue},100%,${60 + i * 10}%,${s.life * (0.8 - i * 0.25)})`;
          ctx.lineWidth = 8 - i * 2; ctx.stroke();
        }
        // tip spark
        const tipA = s.startAngle + drawn;
        const tx = s.cx + Math.cos(tipA) * s.r, ty = s.cy + Math.sin(tipA) * s.r;
        ctx.beginPath(); ctx.arc(tx, ty, Math.max(0, 8 * s.life), 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${s.hue + 40},100%,90%,${s.life})`; ctx.fill();
      });
      id = requestAnimationFrame(loop);
    };
    return { start: loop, stop: () => cancelAnimationFrame(id) };
  }
},

// 2 — Railgun beam firing across screen
{
  name: "Railgun Beam",
  tags: ["weapon", "energy", "charge"],
  description: "A railgun fires a penetrating energy beam across the entire canvas with shockwave rings",
  animator: (c, ctx, mouse) => {
    let t = 0, id, beams = [], rings = [];
    const fire = () => {
      const y = Math.random() * c.height;
      beams.push({ y, life: 1, width: 4 + Math.random() * 6, hue: 180 + Math.random() * 40 });
      for (let i = 0; i < 5; i++) rings.push({ x: Math.random() * c.width, y, r: 5, life: 1 });
    };
    const loop = () => {
      t += 0.02;
      ctx.fillStyle = "rgba(0,0,8,0.4)";
      ctx.fillRect(0, 0, c.width, c.height);
      if (Math.floor(t * 60) % 120 === 0) fire();
      beams = beams.filter(b => b.life > 0);
      rings = rings.filter(r => r.life > 0);
      beams.forEach(b => {
        b.life -= 0.018;
        // core beam
        ctx.beginPath(); ctx.moveTo(0, b.y); ctx.lineTo(c.width, b.y);
        ctx.strokeStyle = `hsla(${b.hue},100%,80%,${b.life})`; ctx.lineWidth = b.width; ctx.stroke();
        ctx.strokeStyle = `hsla(${b.hue},100%,60%,${b.life * 0.4})`; ctx.lineWidth = b.width * 4; ctx.stroke();
        ctx.strokeStyle = `hsla(${b.hue},100%,40%,${b.life * 0.15})`; ctx.lineWidth = b.width * 12; ctx.stroke();
      });
      rings.forEach(r => {
        r.r += 3; r.life -= 0.02;
        ctx.beginPath(); ctx.ellipse(r.x, r.y, r.r, r.r * 0.3, 0, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(200,230,255,${r.life * 0.6})`; ctx.lineWidth = 2; ctx.stroke();
      });
      id = requestAnimationFrame(loop);
    };
    return { start: loop, stop: () => cancelAnimationFrame(id) };
  }
},

// 3 — Explosion shockwave + debris
{
  name: "Detonation Wave",
  tags: ["weapon", "impact", "explosive"],
  description: "A shaped charge detonates at random canvas positions, hurling debris and a circular shockwave",
  animator: (c, ctx, mouse) => {
    let explosions = [], id, t = 0;
    const detonate = () => {
      const x = 80 + Math.random() * (c.width - 160), y = 80 + Math.random() * (c.height - 160);
      const debris = Array.from({ length: 40 }, () => ({
        x, y, vx: (Math.random() - 0.5) * 14, vy: (Math.random() - 0.5) * 14 - 3,
        size: 3 + Math.random() * 8, rot: Math.random() * Math.PI * 2, rotV: (Math.random() - 0.5) * 0.4,
        hue: Math.random() * 40 + 10, life: 1
      }));
      explosions.push({ x, y, r: 5, life: 1, debris, hue: 25 + Math.random() * 20 });
    };
    detonate();
    const loop = () => {
      t += 0.016;
      if (Math.floor(t * 60) % 180 === 0) detonate();
      ctx.fillStyle = "rgba(0,0,0,0.35)";
      ctx.fillRect(0, 0, c.width, c.height);
      explosions = explosions.filter(e => e.life > 0);
      explosions.forEach(e => {
        e.r += 8; e.life -= 0.01;
        // shockwave rings
        for (let i = 0; i < 3; i++) {
          ctx.beginPath(); ctx.arc(e.x, e.y, Math.max(0, e.r - i * 15), 0, Math.PI * 2);
          ctx.strokeStyle = `hsla(${e.hue},100%,${60 + i * 10}%,${e.life * (0.5 - i * 0.12)})`;
          ctx.lineWidth = 3 - i; ctx.stroke();
        }
        // fireball core
        if (e.r < 80) {
          const fg = ctx.createRadialGradient(e.x, e.y, 0, e.x, e.y, e.r);
          fg.addColorStop(0, `rgba(255,255,200,${e.life * 0.8})`);
          fg.addColorStop(0.4, `rgba(255,150,0,${e.life * 0.5})`);
          fg.addColorStop(1, "rgba(255,50,0,0)");
          ctx.beginPath(); ctx.arc(e.x, e.y, e.r, 0, Math.PI * 2);
          ctx.fillStyle = fg; ctx.fill();
        }
        // debris
        e.debris.forEach(d => {
          d.x += d.vx; d.y += d.vy; d.vy += 0.3; d.vx *= 0.98; d.life -= 0.014; d.rot += d.rotV;
          ctx.save(); ctx.translate(d.x, d.y); ctx.rotate(d.rot);
          ctx.fillStyle = `hsla(${d.hue},80%,${40 + d.life * 30}%,${d.life})`;
          ctx.fillRect(-d.size / 2, -d.size / 4, d.size, d.size / 2);
          ctx.restore();
        });
      });
      id = requestAnimationFrame(loop);
    };
    return { start: loop, stop: () => cancelAnimationFrame(id) };
  }
},

// 4 — Sniper laser dot + beam
{
  name: "Sniper Scope Lock",
  tags: ["weapon", "charge", "energy"],
  description: "A sniper scope sweeps the screen with a red laser designator dot, then fires a penetrating shot",
  animator: (c, ctx, mouse) => {
    let t = 0, id, dotX = c.width / 2, dotY = c.height / 2, fired = false, fireLife = 0;
    const loop = () => {
      t += 0.016;
      ctx.fillStyle = "rgba(0,5,0,0.4)";
      ctx.fillRect(0, 0, c.width, c.height);
      // laser dot drift
      dotX += Math.sin(t * 0.7) * 2 + Math.sin(t * 1.3) * 1;
      dotY += Math.cos(t * 0.5) * 2 + Math.cos(t * 1.1) * 1;
      dotX = Math.max(50, Math.min(c.width - 50, dotX));
      dotY = Math.max(50, Math.min(c.height - 50, dotY));
      // crosshair
      ctx.strokeStyle = "rgba(255,0,0,0.6)"; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(dotX - 40, dotY); ctx.lineTo(dotX - 10, dotY);
      ctx.moveTo(dotX + 10, dotY); ctx.lineTo(dotX + 40, dotY);
      ctx.moveTo(dotX, dotY - 40); ctx.lineTo(dotX, dotY - 10);
      ctx.moveTo(dotX, dotY + 10); ctx.lineTo(dotX, dotY + 40);
      ctx.stroke();
      ctx.beginPath(); ctx.arc(dotX, dotY, 20, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(255,0,0,0.4)"; ctx.stroke();
      // laser dot
      ctx.beginPath(); ctx.arc(dotX, dotY, 4, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255,0,0,0.95)"; ctx.fill();
      ctx.beginPath(); ctx.arc(dotX, dotY, 10, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255,0,0,0.2)"; ctx.fill();
      // fire periodically
      if (Math.floor(t * 60) % 200 === 0) { fired = true; fireLife = 1; }
      if (fired && fireLife > 0) {
        fireLife -= 0.06;
        ctx.beginPath(); ctx.moveTo(0, dotY); ctx.lineTo(dotX, dotY);
        ctx.strokeStyle = `rgba(255,220,180,${fireLife * 0.9})`; ctx.lineWidth = 3; ctx.stroke();
        ctx.strokeStyle = `rgba(255,150,100,${fireLife * 0.3})`; ctx.lineWidth = 12; ctx.stroke();
        if (fireLife <= 0) fired = false;
      }
      id = requestAnimationFrame(loop);
    };
    return { start: loop, stop: () => cancelAnimationFrame(id) };
  }
},

// 5 — Sword energy wave projectile
{
  name: "Sword Wave Projectile",
  tags: ["weapon", "blade", "energy"],
  description: "Energy waves fire outward from a sword slash, traveling across the screen and dissipating",
  animator: (c, ctx, mouse) => {
    let waves = [], t = 0, id;
    const fireWave = () => {
      const y = c.height / 2 + (Math.random() - 0.5) * 200;
      const dir = Math.random() < 0.5 ? 1 : -1;
      waves.push({ x: dir === 1 ? 0 : c.width, y, dir, life: 1, hue: 50 + Math.random() * 40, h: 30 + Math.random() * 40 });
    };
    fireWave();
    const loop = () => {
      t += 0.016;
      ctx.fillStyle = "rgba(0,0,5,0.3)";
      ctx.fillRect(0, 0, c.width, c.height);
      if (Math.floor(t * 60) % 60 === 0) fireWave();
      waves = waves.filter(w => w.x > -100 && w.x < c.width + 100 && w.life > 0);
      waves.forEach(w => {
        w.x += w.dir * 10; w.life -= 0.008;
        const hw = w.h;
        // crescent wave shape
        ctx.beginPath();
        for (let i = -hw; i <= hw; i++) {
          const px = w.x + Math.sin((i / hw) * Math.PI) * 30 * w.dir * -1;
          const py = w.y + i;
          i === -hw ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
        }
        ctx.strokeStyle = `hsla(${w.hue},100%,70%,${w.life * 0.9})`; ctx.lineWidth = 3; ctx.stroke();
        ctx.strokeStyle = `hsla(${w.hue},100%,60%,${w.life * 0.25})`; ctx.lineWidth = 10; ctx.stroke();
        // trail
        for (let i = 1; i < 5; i++) {
          ctx.beginPath();
          for (let j = -hw; j <= hw; j++) {
            const px = w.x - w.dir * i * 8 + Math.sin((j / hw) * Math.PI) * 30 * w.dir * -1;
            const py = w.y + j;
            j === -hw ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
          }
          ctx.strokeStyle = `hsla(${w.hue},100%,70%,${w.life * 0.1 / i})`; ctx.lineWidth = 2; ctx.stroke();
        }
      });
      id = requestAnimationFrame(loop);
    };
    return { start: loop, stop: () => cancelAnimationFrame(id) };
  }
},

// 6 — Muzzle flash + bullet streak
{
  name: "Muzzle Flash Streak",
  tags: ["weapon", "impact", "charge"],
  description: "Rapid-fire muzzle flashes erupt from a gun barrel position with supersonic bullet streaks",
  animator: (c, ctx, mouse) => {
    let t = 0, id, streaks = [], flashes = [];
    const fire = () => {
      const originX = 60, originY = c.height / 2 + (Math.random() - 0.5) * 60;
      const angle = (Math.random() - 0.5) * 0.3;
      flashes.push({ x: originX, y: originY, life: 1 });
      streaks.push({ x: originX, y: originY, angle, life: 1, len: 0, hue: 40 + Math.random() * 20 });
    };
    const loop = () => {
      t += 0.016;
      if (Math.floor(t * 60) % 8 === 0) fire();
      ctx.fillStyle = "rgba(0,0,0,0.4)";
      ctx.fillRect(0, 0, c.width, c.height);
      flashes = flashes.filter(f => f.life > 0);
      flashes.forEach(f => {
        f.life -= 0.15;
        const fg = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, 40 * f.life);
        fg.addColorStop(0, `rgba(255,255,200,${f.life})`);
        fg.addColorStop(0.3, `rgba(255,200,50,${f.life * 0.5})`);
        fg.addColorStop(1, "rgba(255,100,0,0)");
        ctx.beginPath(); ctx.arc(f.x, f.y, 40, 0, Math.PI * 2);
        ctx.fillStyle = fg; ctx.fill();
        // flash rays
        for (let i = 0; i < 8; i++) {
          const a = (i / 8) * Math.PI * 2;
          ctx.beginPath(); ctx.moveTo(f.x, f.y);
          ctx.lineTo(f.x + Math.cos(a) * 60 * f.life, f.y + Math.sin(a) * 60 * f.life);
          ctx.strokeStyle = `rgba(255,240,150,${f.life * 0.5})`; ctx.lineWidth = 2; ctx.stroke();
        }
      });
      streaks = streaks.filter(s => s.life > 0);
      streaks.forEach(s => {
        s.len = Math.min(s.len + 30, 400);
        s.x += Math.cos(s.angle) * 30; s.y += Math.sin(s.angle) * 30;
        s.life -= 0.04;
        const ex = s.x, ey = s.y;
        const sx = ex - Math.cos(s.angle) * s.len, sy = ey - Math.sin(s.angle) * s.len;
        ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(ex, ey);
        ctx.strokeStyle = `hsla(${s.hue},100%,90%,${s.life * 0.8})`; ctx.lineWidth = 2; ctx.stroke();
        ctx.strokeStyle = `hsla(${s.hue},100%,60%,${s.life * 0.2})`; ctx.lineWidth = 6; ctx.stroke();
        if (s.x > c.width) s.life = 0;
      });
      id = requestAnimationFrame(loop);
    };
    return { start: loop, stop: () => cancelAnimationFrame(id) };
  }
},

// 7 — Charge-up orb accumulation
{
  name: "Charge Orb Buildup",
  tags: ["weapon", "charge", "energy"],
  description: "Energy particles spiral inward to charge a central orb that periodically discharges",
  animator: (c, ctx, mouse) => {
    let t = 0, id, charge = 0, discharging = false, dischargeLife = 0;
    const particles = Array.from({ length: 80 }, (_, i) => ({
      angle: (i / 80) * Math.PI * 2, r: 100 + Math.random() * 150,
      speed: 0.02 + Math.random() * 0.03, hue: 200 + Math.random() * 60, size: 2 + Math.random() * 3
    }));
    const cx = c.width / 2, cy = c.height / 2;
    const loop = () => {
      t += 0.02;
      ctx.fillStyle = "rgba(0,0,8,0.3)";
      ctx.fillRect(0, 0, c.width, c.height);
      charge = Math.min(1, charge + 0.004);
      if (charge >= 1 && !discharging) { discharging = true; dischargeLife = 1; charge = 0; }
      // inward spiral particles
      particles.forEach(p => {
        p.angle += p.speed;
        p.r = Math.max(10, p.r - 0.6);
        if (p.r <= 12) { p.r = 100 + Math.random() * 150; p.angle = Math.random() * Math.PI * 2; }
        const x = cx + Math.cos(p.angle) * p.r, y = cy + Math.sin(p.angle) * p.r;
        ctx.beginPath(); ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue},100%,70%,${0.8 * charge})`; ctx.fill();
      });
      // charge orb
      const orbR = 10 + charge * 30;
      const og = ctx.createRadialGradient(cx, cy, 0, cx, cy, orbR);
      og.addColorStop(0, `rgba(255,255,255,${0.4 + charge * 0.5})`);
      og.addColorStop(0.5, `hsla(220,100%,70%,${charge * 0.6})`);
      og.addColorStop(1, "rgba(100,150,255,0)");
      ctx.beginPath(); ctx.arc(cx, cy, orbR + 20, 0, Math.PI * 2);
      ctx.fillStyle = og; ctx.fill();
      // discharge
      if (discharging && dischargeLife > 0) {
        dischargeLife -= 0.025;
        for (let i = 0; i < 8; i++) {
          const a = (i / 8) * Math.PI * 2 + t;
          ctx.beginPath(); ctx.moveTo(cx, cy);
          ctx.lineTo(cx + Math.cos(a) * c.width, cy + Math.sin(a) * c.width);
          ctx.strokeStyle = `rgba(200,220,255,${dischargeLife * 0.6})`; ctx.lineWidth = 2 + dischargeLife * 4; ctx.stroke();
        }
        ctx.beginPath(); ctx.arc(cx, cy, Math.max(0, 60 * (1 - dischargeLife)), 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255,255,255,${dischargeLife})`; ctx.lineWidth = 3; ctx.stroke();
        if (dischargeLife <= 0) discharging = false;
      }
      id = requestAnimationFrame(loop);
    };
    return { start: loop, stop: () => cancelAnimationFrame(id) };
  }
},

// 8 — Impact crater ripple
{
  name: "Impact Crater",
  tags: ["weapon", "impact", "blade"],
  description: "Projectiles slam into the canvas surface, cratering it with dust rings and embedded shards",
  animator: (c, ctx, mouse) => {
    let impacts = [], t = 0, id;
    const impact = () => {
      const x = 50 + Math.random() * (c.width - 100), y = 50 + Math.random() * (c.height - 100);
      impacts.push({
        x, y, life: 1, r: 0,
        rings: [{ r: 0, life: 1 }, { r: 0, life: 0.7 }, { r: 0, life: 0.4 }],
        dust: Array.from({ length: 20 }, () => ({
          x, y, vx: (Math.random() - 0.5) * 6, vy: (Math.random() - 0.5) * 6 - 2,
          size: 2 + Math.random() * 5, life: 1
        })),
        shards: Array.from({ length: 8 }, () => ({ angle: Math.random() * Math.PI * 2, len: 5 }))
      });
    };
    impact();
    const loop = () => {
      t += 0.016;
      if (Math.floor(t * 60) % 100 === 0) impact();
      ctx.fillStyle = "rgba(2,0,0,0.35)";
      ctx.fillRect(0, 0, c.width, c.height);
      impacts = impacts.filter(im => im.life > 0);
      impacts.forEach(im => {
        im.life -= 0.006;
        im.r = Math.min(im.r + 1.5, 40);
        // crater pit
        ctx.beginPath(); ctx.arc(im.x, im.y, im.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(30,10,0,${im.life * 0.6})`; ctx.fill();
        ctx.strokeStyle = `rgba(200,100,0,${im.life * 0.5})`; ctx.lineWidth = 2; ctx.stroke();
        // ripple rings
        im.rings.forEach(ring => {
          ring.r += 2.5; ring.life -= 0.015;
          if (ring.life > 0) {
            ctx.beginPath(); ctx.arc(im.x, im.y, ring.r, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(255,150,50,${ring.life * 0.5})`; ctx.lineWidth = 2; ctx.stroke();
          }
        });
        // shards embedded around rim
        im.shards.forEach(sh => {
          sh.len = Math.min(sh.len + 0.5, 15);
          const sx = im.x + Math.cos(sh.angle) * im.r;
          const sy = im.y + Math.sin(sh.angle) * im.r;
          ctx.beginPath(); ctx.moveTo(sx, sy);
          ctx.lineTo(sx + Math.cos(sh.angle) * sh.len, sy + Math.sin(sh.angle) * sh.len);
          ctx.strokeStyle = `rgba(255,200,100,${im.life * 0.8})`; ctx.lineWidth = 2; ctx.stroke();
        });
        // dust
        im.dust.forEach(d => {
          d.x += d.vx; d.y += d.vy; d.vy += 0.1; d.life -= 0.02;
          if (d.life > 0) {
            ctx.beginPath(); ctx.arc(d.x, d.y, Math.max(0, d.size * d.life), 0, Math.PI * 2);
            ctx.fillStyle = `rgba(200,100,0,${d.life * 0.5})`; ctx.fill();
          }
        });
      });
      id = requestAnimationFrame(loop);
    };
    return { start: loop, stop: () => cancelAnimationFrame(id) };
  }
},

// 9 — Chain lightning arcs
{
  name: "Chain Lightning Strike",
  tags: ["weapon", "energy", "charge"],
  description: "Lightning bolts chain between targets, branching and rebounding across the screen",
  animator: (c, ctx, mouse) => {
    let t = 0, id, bolts = [];
    const targets = Array.from({ length: 8 }, () => ({ x: Math.random() * c.width, y: Math.random() * c.height }));
    const bolt = (x1, y1, x2, y2, depth) => {
      if (depth <= 0) { ctx.lineTo(x2, y2); return; }
      const mx = (x1 + x2) / 2 + (Math.random() - 0.5) * 60;
      const my = (y1 + y2) / 2 + (Math.random() - 0.5) * 60;
      bolt(x1, y1, mx, my, depth - 1);
      bolt(mx, my, x2, y2, depth - 1);
    };
    const strike = () => {
      const i = Math.floor(Math.random() * targets.length);
      const j = Math.floor(Math.random() * targets.length);
      if (i !== j) bolts.push({ t1: targets[i], t2: targets[j], life: 1 });
    };
    const loop = () => {
      t += 0.02;
      if (Math.random() < 0.08) strike();
      ctx.fillStyle = "rgba(0,0,10,0.35)";
      ctx.fillRect(0, 0, c.width, c.height);
      targets.forEach(tg => {
        ctx.beginPath(); ctx.arc(tg.x, tg.y, 6, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(150,200,255,0.7)"; ctx.fill();
      });
      bolts = bolts.filter(b => b.life > 0);
      bolts.forEach(b => {
        b.life -= 0.05;
        for (let layer = 0; layer < 2; layer++) {
          ctx.beginPath(); ctx.moveTo(b.t1.x, b.t1.y);
          bolt(b.t1.x, b.t1.y, b.t2.x, b.t2.y, 6);
          ctx.strokeStyle = layer === 0
            ? `rgba(200,230,255,${b.life * 0.9})`
            : `rgba(100,180,255,${b.life * 0.25})`;
          ctx.lineWidth = layer === 0 ? 1.5 : 8; ctx.stroke();
        }
        // branch bolt
        if (Math.random() < 0.3) {
          const midX = (b.t1.x + b.t2.x) / 2 + (Math.random() - 0.5) * 50;
          const midY = (b.t1.y + b.t2.y) / 2 + (Math.random() - 0.5) * 50;
          const bx = midX + (Math.random() - 0.5) * 120, by = midY + (Math.random() - 0.5) * 120;
          ctx.beginPath(); ctx.moveTo(midX, midY);
          bolt(midX, midY, bx, by, 4);
          ctx.strokeStyle = `rgba(180,220,255,${b.life * 0.4})`; ctx.lineWidth = 1; ctx.stroke();
        }
      });
      id = requestAnimationFrame(loop);
    };
    return { start: loop, stop: () => cancelAnimationFrame(id) };
  }
},

// 10 — Grenade arc + explosion
{
  name: "Grenade Toss Arc",
  tags: ["weapon", "impact", "explosive"],
  description: "A grenade arcs across the screen under ballistic physics before detonating on impact",
  animator: (c, ctx, mouse) => {
    let grenades = [], t = 0, id;
    const toss = () => {
      const sx = 30, sy = c.height * 0.7;
      grenades.push({ x: sx, y: sy, vx: 5 + Math.random() * 4, vy: -(8 + Math.random() * 4), trail: [], exploded: false, life: 1 });
    };
    toss();
    const loop = () => {
      t += 0.016;
      if (Math.floor(t * 60) % 160 === 0) toss();
      ctx.fillStyle = "rgba(0,0,0,0.35)";
      ctx.fillRect(0, 0, c.width, c.height);
      grenades = grenades.filter(g => g.life > 0);
      grenades.forEach(g => {
        if (!g.exploded) {
          g.vy += 0.25; g.x += g.vx; g.y += g.vy;
          g.trail.push({ x: g.x, y: g.y });
          if (g.trail.length > 30) g.trail.shift();
          // trail
          g.trail.forEach((pt, i) => {
            ctx.beginPath(); ctx.arc(pt.x, pt.y, 2 * (i / g.trail.length), 0, Math.PI * 2);
            ctx.fillStyle = `rgba(100,200,100,${i / g.trail.length * 0.4})`; ctx.fill();
          });
          // grenade body
          ctx.beginPath(); ctx.arc(g.x, g.y, 6, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(80,120,60,0.9)"; ctx.fill();
          if (g.y > c.height * 0.8 || g.x > c.width - 50) g.exploded = true;
        } else {
          if (!g.eR) { g.eR = 5; g.eLife = 1; g.eDebris = Array.from({ length: 25 }, () => ({ x: g.x, y: g.y, vx: (Math.random() - 0.5) * 10, vy: (Math.random() - 0.5) * 10 - 4, life: 1 })); }
          g.eR += 6; g.eLife -= 0.02; g.life = g.eLife;
          const eg = ctx.createRadialGradient(g.x, g.y, 0, g.x, g.y, g.eR);
          eg.addColorStop(0, `rgba(255,255,200,${g.eLife * 0.8})`);
          eg.addColorStop(0.5, `rgba(255,100,0,${g.eLife * 0.4})`);
          eg.addColorStop(1, "rgba(200,50,0,0)");
          ctx.beginPath(); ctx.arc(g.x, g.y, g.eR, 0, Math.PI * 2);
          ctx.fillStyle = eg; ctx.fill();
          ctx.beginPath(); ctx.arc(g.x, g.y, g.eR, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(255,200,50,${g.eLife * 0.5})`; ctx.lineWidth = 3; ctx.stroke();
          g.eDebris.forEach(d => {
            d.x += d.vx; d.y += d.vy; d.vy += 0.3; d.life -= 0.02;
            ctx.fillStyle = `rgba(255,150,0,${d.life * 0.8})`;
            ctx.fillRect(d.x, d.y, 3, 3);
          });
        }
      });
      id = requestAnimationFrame(loop);
    };
    return { start: loop, stop: () => cancelAnimationFrame(id) };
  }
},

// 11 — Flamethrower stream
{
  name: "Flamethrower Stream",
  tags: ["weapon", "energy", "impact"],
  description: "A flamethrower sprays a turbulent stream of fire particles that billow and fade",
  animator: (c, ctx, mouse) => {
    let particles = [], t = 0, id;
    const loop = () => {
      t += 0.02;
      ctx.fillStyle = "rgba(0,0,0,0.3)";
      ctx.fillRect(0, 0, c.width, c.height);
      // emit
      for (let i = 0; i < 8; i++) {
        const spread = (Math.random() - 0.5) * 0.6;
        const spd = 4 + Math.random() * 4;
        particles.push({
          x: 50, y: c.height / 2 + (Math.random() - 0.5) * 30,
          vx: Math.cos(spread) * spd, vy: Math.sin(spread) * spd,
          life: 1, size: 8 + Math.random() * 15, hue: 20 + Math.random() * 30
        });
      }
      particles = particles.filter(p => p.life > 0);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        p.vx *= 0.97; p.vy += (Math.random() - 0.5) * 0.5;
        p.life -= 0.018; p.size += 0.5;
        const tempRatio = p.life;
        const r = tempRatio > 0.5 ? 255 : Math.floor(tempRatio * 2 * 255);
        const g = Math.floor(tempRatio * 180);
        const b = 0;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${p.life * 0.5})`; ctx.fill();
      });
      id = requestAnimationFrame(loop);
    };
    return { start: loop, stop: () => cancelAnimationFrame(id) };
  }
},

// 12 — Shuriken spinning projectile
{
  name: "Shuriken Volley",
  tags: ["weapon", "blade", "impact"],
  description: "Spinning shuriken blades fly across the screen in formation with glinting reflections",
  animator: (c, ctx, mouse) => {
    let shurikens = [], t = 0, id;
    const throw_ = () => {
      const y = 80 + Math.random() * (c.height - 160);
      const dir = Math.random() < 0.5 ? 1 : -1;
      shurikens.push({ x: dir === 1 ? -30 : c.width + 30, y, dir, rot: 0, rotV: 0.3 * dir, speed: 6 + Math.random() * 4, trail: [] });
    };
    const drawShuriken = (x, y, rot, size) => {
      ctx.save(); ctx.translate(x, y); ctx.rotate(rot);
      for (let b = 0; b < 4; b++) {
        ctx.save(); ctx.rotate((b / 4) * Math.PI * 2);
        ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(-size * 0.3, -size); ctx.lineTo(size * 0.3, -size); ctx.closePath();
        ctx.fillStyle = "rgba(200,210,220,0.9)"; ctx.fill();
        ctx.strokeStyle = "rgba(255,255,255,0.4)"; ctx.lineWidth = 1; ctx.stroke();
        ctx.restore();
      }
      ctx.beginPath(); ctx.arc(0, 0, size * 0.25, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(150,170,180,0.9)"; ctx.fill();
      ctx.restore();
    };
    throw_();
    const loop = () => {
      t += 0.016;
      if (Math.floor(t * 60) % 45 === 0) throw_();
      ctx.fillStyle = "rgba(0,0,5,0.35)";
      ctx.fillRect(0, 0, c.width, c.height);
      shurikens = shurikens.filter(s => s.x > -60 && s.x < c.width + 60);
      shurikens.forEach(s => {
        s.x += s.dir * s.speed; s.rot += s.rotV;
        s.trail.push({ x: s.x, y: s.y });
        if (s.trail.length > 20) s.trail.shift();
        s.trail.forEach((pt, i) => {
          ctx.beginPath(); ctx.arc(pt.x, pt.y, 2 * (i / s.trail.length), 0, Math.PI * 2);
          ctx.fillStyle = `rgba(200,220,255,${(i / s.trail.length) * 0.3})`; ctx.fill();
        });
        drawShuriken(s.x, s.y, s.rot, 14);
        // glint
        if (Math.random() < 0.15) {
          ctx.beginPath(); ctx.arc(s.x + Math.random() * 10 - 5, s.y + Math.random() * 10 - 5, 3, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(255,255,255,0.9)"; ctx.fill();
        }
      });
      id = requestAnimationFrame(loop);
    };
    return { start: loop, stop: () => cancelAnimationFrame(id) };
  }
},

// 13 — EMP pulse expanding rings
{
  name: "EMP Pulse Ring",
  tags: ["weapon", "energy", "charge"],
  description: "An EMP device detonates with cascading electromagnetic rings that disrupt and distort",
  animator: (c, ctx, mouse) => {
    let pulses = [], t = 0, id, glitch = 0;
    const emp = () => {
      const x = c.width / 2 + (Math.random() - 0.5) * 200;
      const y = c.height / 2 + (Math.random() - 0.5) * 100;
      pulses.push({ x, y, r: 5, life: 1, hue: 140 + Math.random() * 60 });
      glitch = 1;
    };
    emp();
    const loop = () => {
      t += 0.016;
      if (Math.floor(t * 60) % 150 === 0) emp();
      glitch = Math.max(0, glitch - 0.03);
      // glitch effect
      if (glitch > 0.3 && Math.random() < glitch * 0.5) {
        const gy = Math.random() * c.height;
        const gh = 5 + Math.random() * 20;
        try {
          const slice = ctx.getImageData(0, gy, c.width, gh);
          ctx.putImageData(slice, (Math.random() - 0.5) * 30, gy);
        } catch (e) {}
      }
      ctx.fillStyle = "rgba(0,5,0,0.3)";
      ctx.fillRect(0, 0, c.width, c.height);
      pulses = pulses.filter(p => p.life > 0);
      pulses.forEach(p => {
        p.r += 5; p.life -= 0.01;
        for (let i = 0; i < 4; i++) {
          const offset = i * 20;
          ctx.beginPath();
          ctx.ellipse(p.x, p.y, p.r + offset, (p.r + offset) * 0.4, 0, 0, Math.PI * 2);
          ctx.strokeStyle = `hsla(${p.hue},100%,${50 + i * 10}%,${p.life * (0.5 - i * 0.1)})`;
          ctx.lineWidth = 2; ctx.stroke();
        }
        // core flash
        if (p.r < 60) {
          ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 0.4, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${p.hue},100%,80%,${p.life * 0.5})`; ctx.fill();
        }
        // data stream corruption lines
        for (let j = 0; j < 3; j++) {
          const a = Math.random() * Math.PI * 2;
          const r1 = p.r * 0.7, r2 = p.r * 1.1;
          ctx.beginPath();
          ctx.moveTo(p.x + Math.cos(a) * r1, p.y + Math.sin(a) * r1 * 0.4);
          ctx.lineTo(p.x + Math.cos(a) * r2, p.y + Math.sin(a) * r2 * 0.4);
          ctx.strokeStyle = `hsla(${p.hue},100%,80%,${p.life * 0.5})`; ctx.lineWidth = 1; ctx.stroke();
        }
      });
      id = requestAnimationFrame(loop);
    };
    return { start: loop, stop: () => cancelAnimationFrame(id) };
  }
},

// 14 — Crossbow bolt flight + embed
{
  name: "Crossbow Bolt",
  tags: ["weapon", "blade", "impact"],
  description: "Crossbow bolts streak across the screen and embed into a target wall with a quiver",
  animator: (c, ctx, mouse) => {
    let bolts = [], embedded = [], t = 0, id;
    const shoot = () => {
      const y = 80 + Math.random() * (c.height - 160);
      bolts.push({ x: 0, y, vy: (Math.random() - 0.5) * 2, speed: 14, trail: [], done: false });
    };
    shoot();
    const loop = () => {
      t += 0.016;
      if (Math.floor(t * 60) % 80 === 0) shoot();
      ctx.fillStyle = "rgba(0,0,0,0.35)";
      ctx.fillRect(0, 0, c.width, c.height);
      // target wall
      ctx.fillStyle = "rgba(60,40,20,0.6)";
      ctx.fillRect(c.width - 20, 0, 20, c.height);
      bolts = bolts.filter(b => !b.done || b.quiver > 0);
      bolts.forEach(b => {
        if (!b.done) {
          b.x += b.speed; b.y += b.vy;
          b.trail.push({ x: b.x, y: b.y });
          if (b.trail.length > 15) b.trail.shift();
          b.trail.forEach((pt, i) => {
            ctx.beginPath(); ctx.moveTo(pt.x, pt.y);
            ctx.lineTo(pt.x - 8, pt.y);
            ctx.strokeStyle = `rgba(180,140,80,${(i / b.trail.length) * 0.4})`; ctx.lineWidth = 2; ctx.stroke();
          });
          // bolt shape
          const angle = Math.atan2(b.vy, b.speed);
          ctx.save(); ctx.translate(b.x, b.y); ctx.rotate(angle);
          ctx.fillStyle = "rgba(200,160,80,0.9)";
          ctx.fillRect(-20, -1.5, 22, 3);
          // fletching
          ctx.fillStyle = "rgba(200,80,80,0.8)";
          ctx.beginPath(); ctx.moveTo(-20, 0); ctx.lineTo(-28, -5); ctx.lineTo(-26, 0); ctx.lineTo(-28, 5); ctx.closePath(); ctx.fill();
          // tip
          ctx.fillStyle = "rgba(220,220,220,0.9)";
          ctx.beginPath(); ctx.moveTo(2, 0); ctx.lineTo(-3, -2); ctx.lineTo(-3, 2); ctx.closePath(); ctx.fill();
          ctx.restore();
          if (b.x >= c.width - 20) { b.done = true; b.quiver = 30; embedded.push({ x: c.width - 20, y: b.y, quiver: 30 }); }
        }
      });
      embedded.forEach(e => {
        e.quiver = Math.max(0, e.quiver - 1);
        const wobble = Math.sin(e.quiver * 0.5) * e.quiver * 0.1;
        ctx.save(); ctx.translate(e.x, e.y); ctx.rotate(wobble * 0.05);
        ctx.fillStyle = "rgba(180,140,70,0.9)";
        ctx.fillRect(-15, -1.5, 16, 3);
        ctx.restore();
      });
      id = requestAnimationFrame(loop);
    };
    return { start: loop, stop: () => cancelAnimationFrame(id) };
  }
},

// 15 — Orbital strike beam from above
{
  name: "Orbital Strike",
  tags: ["weapon", "energy", "charge"],
  description: "An orbital cannon fires a massive beam from above, scorching impact craters into the ground",
  animator: (c, ctx, mouse) => {
    let strikes = [], t = 0, id;
    const strike = () => {
      const x = 80 + Math.random() * (c.width - 160);
      strikes.push({ x, phase: "beam", beamLife: 1, impactLife: 0, r: 0 });
    };
    strike();
    const loop = () => {
      t += 0.016;
      if (Math.floor(t * 60) % 200 === 0) strike();
      ctx.fillStyle = "rgba(0,0,5,0.3)";
      ctx.fillRect(0, 0, c.width, c.height);
      strikes = strikes.filter(s => s.impactLife > 0 || s.phase === "beam");
      strikes.forEach(s => {
        if (s.phase === "beam") {
          s.beamLife -= 0.015;
          const bw = 20 + Math.sin(t * 20) * 5;
          // outer glow
          const bg = ctx.createLinearGradient(s.x - bw * 3, 0, s.x + bw * 3, 0);
          bg.addColorStop(0, "rgba(255,100,0,0)");
          bg.addColorStop(0.5, `rgba(255,200,100,${s.beamLife * 0.3})`);
          bg.addColorStop(1, "rgba(255,100,0,0)");
          ctx.fillStyle = bg; ctx.fillRect(s.x - bw * 3, 0, bw * 6, c.height);
          // core
          const cg = ctx.createLinearGradient(s.x - bw, 0, s.x + bw, 0);
          cg.addColorStop(0, "rgba(255,200,100,0)");
          cg.addColorStop(0.5, `rgba(255,255,200,${s.beamLife * 0.9})`);
          cg.addColorStop(1, "rgba(255,200,100,0)");
          ctx.fillStyle = cg; ctx.fillRect(s.x - bw, 0, bw * 2, c.height);
          if (s.beamLife <= 0) { s.phase = "impact"; s.impactLife = 1; }
        } else {
          s.impactLife -= 0.012; s.r = Math.min(s.r + 4, 100);
          const ig = ctx.createRadialGradient(s.x, c.height * 0.85, 0, s.x, c.height * 0.85, s.r);
          ig.addColorStop(0, `rgba(255,255,200,${s.impactLife * 0.8})`);
          ig.addColorStop(0.4, `rgba(255,100,0,${s.impactLife * 0.4})`);
          ig.addColorStop(1, "rgba(255,50,0,0)");
          ctx.beginPath(); ctx.arc(s.x, c.height * 0.85, s.r, 0, Math.PI * 2);
          ctx.fillStyle = ig; ctx.fill();
          ctx.beginPath(); ctx.arc(s.x, c.height * 0.85, s.r, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(255,200,50,${s.impactLife * 0.6})`; ctx.lineWidth = 3; ctx.stroke();
        }
      });
      id = requestAnimationFrame(loop);
    };
    return { start: loop, stop: () => cancelAnimationFrame(id) };
  }
},

// 16 — Sword parry spark shower
{
  name: "Parry Spark Shower",
  tags: ["weapon", "blade", "impact"],
  description: "Two blades clash at the center, erupting in a shower of metallic sparks",
  animator: (c, ctx, mouse) => {
    let sparks = [], clashes = [], t = 0, id;
    const clash = () => {
      const cx = c.width / 2 + (Math.random() - 0.5) * 150;
      const cy = c.height / 2 + (Math.random() - 0.5) * 100;
      clashes.push({ x: cx, y: cy, life: 1 });
      for (let i = 0; i < 60; i++) {
        const a = Math.random() * Math.PI * 2;
        const spd = 3 + Math.random() * 10;
        sparks.push({ x: cx, y: cy, vx: Math.cos(a) * spd, vy: Math.sin(a) * spd - 3, life: 1, size: 1 + Math.random() * 2, bright: Math.random() > 0.7 });
      }
    };
    clash();
    const loop = () => {
      t += 0.016;
      if (Math.floor(t * 60) % 90 === 0) clash();
      ctx.fillStyle = "rgba(5,3,0,0.35)";
      ctx.fillRect(0, 0, c.width, c.height);
      clashes = clashes.filter(cl => cl.life > 0);
      clashes.forEach(cl => {
        cl.life -= 0.05;
        ctx.beginPath(); ctx.arc(cl.x, cl.y, Math.max(0, (1 - cl.life) * 50), 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255,220,100,${cl.life * 0.8})`; ctx.lineWidth = 3; ctx.stroke();
        ctx.beginPath(); ctx.arc(cl.x, cl.y, Math.max(0, 12 * cl.life), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,200,${cl.life})`; ctx.fill();
      });
      sparks = sparks.filter(s => s.life > 0);
      sparks.forEach(s => {
        const px = s.x, py = s.y;
        s.x += s.vx; s.y += s.vy; s.vy += 0.3; s.vx *= 0.98; s.life -= 0.025;
        // streak
        ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(s.x, s.y);
        ctx.strokeStyle = s.bright
          ? `rgba(255,255,200,${s.life})`
          : `rgba(255,150,0,${s.life * 0.7})`;
        ctx.lineWidth = s.size; ctx.stroke();
        if (s.bright) {
          ctx.beginPath(); ctx.arc(s.x, s.y, s.size + 1, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,255,255,${s.life * 0.5})`; ctx.fill();
        }
      });
      id = requestAnimationFrame(loop);
    };
    return { start: loop, stop: () => cancelAnimationFrame(id) };
  }
},

// 17 — Acid / bio weapon spray
{
  name: "Acid Spray",
  tags: ["weapon", "energy", "impact"],
  description: "Corrosive acid splatters across the screen, pooling and bubbling with toxic luminescence",
  animator: (c, ctx, mouse) => {
    let drops = [], pools = [], t = 0, id;
    const spray = () => {
      for (let i = 0; i < 20; i++) {
        const a = (Math.random() - 0.5) * 1.2;
        const spd = 4 + Math.random() * 8;
        drops.push({ x: c.width * 0.15, y: c.height * 0.6, vx: Math.cos(a) * spd, vy: Math.sin(a) * spd - 4, life: 1, size: 4 + Math.random() * 8 });
      }
    };
    const loop = () => {
      t += 0.016;
      if (Math.floor(t * 60) % 40 === 0) spray();
      ctx.fillStyle = "rgba(0,5,0,0.25)";
      ctx.fillRect(0, 0, c.width, c.height);
      // pools
      pools = pools.filter(p => p.life > 0);
      pools.forEach(p => {
        p.life -= 0.002; p.r += 0.1;
        ctx.beginPath(); ctx.ellipse(p.x, p.y, p.r, p.r * 0.3, 0, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(80,200,0,${p.life * 0.4})`; ctx.fill();
        ctx.strokeStyle = `rgba(180,255,0,${p.life * 0.6})`; ctx.lineWidth = 1; ctx.stroke();
        // bubble
        if (Math.random() < 0.02) {
          ctx.beginPath(); ctx.arc(p.x + (Math.random() - 0.5) * p.r, p.y + (Math.random() - 0.3) * p.r * 0.3, 2 + Math.random() * 3, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(200,255,0,${p.life * 0.7})`; ctx.lineWidth = 1; ctx.stroke();
        }
      });
      drops = drops.filter(d => d.life > 0);
      drops.forEach(d => {
        d.x += d.vx; d.y += d.vy; d.vy += 0.3; d.life -= 0.015;
        ctx.beginPath(); ctx.ellipse(d.x, d.y, d.size, d.size * 0.6, Math.atan2(d.vy, d.vx), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(100,255,0,${d.life * 0.8})`; ctx.fill();
        ctx.strokeStyle = `rgba(200,255,100,${d.life * 0.5})`; ctx.lineWidth = 1; ctx.stroke();
        if (d.y > c.height * 0.7 && d.vy > 0) {
          pools.push({ x: d.x, y: c.height * 0.7, r: d.size, life: 1 });
          d.life = 0;
        }
      });
      id = requestAnimationFrame(loop);
    };
    return { start: loop, stop: () => cancelAnimationFrame(id) };
  }
},

// 18 — Bullet time slow-motion field
{
  name: "Bullet Time Field",
  tags: ["weapon", "charge", "energy"],
  description: "A bullet-time effect slows frozen particles in a glowing time-distortion sphere",
  animator: (c, ctx, mouse) => {
    let particles = [], t = 0, id, slowField = 0;
    for (let i = 0; i < 150; i++) particles.push({
      x: Math.random() * c.width, y: Math.random() * c.height,
      vx: (Math.random() - 0.5) * 6, vy: (Math.random() - 0.5) * 6,
      size: 1 + Math.random() * 3, hue: Math.random() * 60 + 30, trail: []
    });
    const cx = c.width / 2, cy = c.height / 2;
    const loop = () => {
      t += 0.02;
      slowField = (Math.sin(t * 0.5) + 1) / 2;
      ctx.fillStyle = "rgba(0,0,0,0.3)";
      ctx.fillRect(0, 0, c.width, c.height);
      // slow-field sphere glow
      const sfR = 150 + slowField * 30;
      const sfg = ctx.createRadialGradient(cx, cy, 0, cx, cy, sfR);
      sfg.addColorStop(0, `rgba(100,180,255,${slowField * 0.1})`);
      sfg.addColorStop(0.8, `rgba(50,100,200,${slowField * 0.05})`);
      sfg.addColorStop(1, "rgba(0,50,150,0)");
      ctx.beginPath(); ctx.arc(cx, cy, sfR, 0, Math.PI * 2);
      ctx.fillStyle = sfg; ctx.fill();
      ctx.beginPath(); ctx.arc(cx, cy, sfR, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(100,180,255,${slowField * 0.3})`; ctx.lineWidth = 2; ctx.stroke();
      particles.forEach(p => {
        const dx = p.x - cx, dy = p.y - cy;
        const d = Math.sqrt(dx * dx + dy * dy);
        const inField = d < 150;
        const speed = inField ? 1 - slowField * 0.95 : 1;
        p.x += p.vx * speed; p.y += p.vy * speed;
        if (p.x < 0) { p.x = 0; p.vx *= -1; } if (p.x > c.width) { p.x = c.width; p.vx *= -1; }
        if (p.y < 0) { p.y = 0; p.vy *= -1; } if (p.y > c.height) { p.y = c.height; p.vy *= -1; }
        p.trail.push({ x: p.x, y: p.y });
        if (p.trail.length > (inField ? 30 : 8)) p.trail.shift();
        p.trail.forEach((pt, i) => {
          ctx.beginPath(); ctx.arc(pt.x, pt.y, p.size * 0.5, 0, Math.PI * 2);
          const a = (i / p.trail.length) * (inField ? 0.7 : 0.3);
          ctx.fillStyle = `hsla(${p.hue},100%,70%,${a})`; ctx.fill();
        });
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue},100%,80%,0.9)`; ctx.fill();
      });
      id = requestAnimationFrame(loop);
    };
    return { start: loop, stop: () => cancelAnimationFrame(id) };
  }
},

// 19 — Freeze / ice shard burst
{
  name: "Cryo Shard Burst",
  tags: ["weapon", "impact", "energy"],
  description: "A cryo weapon fires freezing bursts that crystallize the air into shard formations",
  animator: (c, ctx, mouse) => {
    let bursts = [], t = 0, id;
    const freeze = () => {
      const x = 80 + Math.random() * (c.width - 160), y = 80 + Math.random() * (c.height - 160);
      const shards = Array.from({ length: 16 }, (_, i) => ({
        angle: (i / 16) * Math.PI * 2 + Math.random() * 0.2,
        len: 20 + Math.random() * 60, w: 3 + Math.random() * 6,
        life: 1
      }));
      bursts.push({ x, y, shards, life: 1, freeze: 0 });
    };
    freeze();
    const loop = () => {
      t += 0.016;
      if (Math.floor(t * 60) % 140 === 0) freeze();
      ctx.fillStyle = "rgba(0,0,8,0.3)";
      ctx.fillRect(0, 0, c.width, c.height);
      bursts = bursts.filter(b => b.life > 0);
      bursts.forEach(b => {
        b.life -= 0.008; b.freeze = Math.min(1, b.freeze + 0.04);
        // freeze mist
        const mg = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.freeze * 80);
        mg.addColorStop(0, `rgba(200,240,255,${b.life * 0.3})`);
        mg.addColorStop(1, "rgba(100,200,255,0)");
        ctx.beginPath(); ctx.arc(b.x, b.y, b.freeze * 80, 0, Math.PI * 2);
        ctx.fillStyle = mg; ctx.fill();
        b.shards.forEach(s => {
          const grown = b.freeze * s.len;
          const ex = b.x + Math.cos(s.angle) * grown;
          const ey = b.y + Math.sin(s.angle) * grown;
          const perp = s.angle + Math.PI / 2;
          const halfW = s.w * (1 - b.freeze * 0.5);
          ctx.beginPath();
          ctx.moveTo(b.x + Math.cos(perp) * halfW, b.y + Math.sin(perp) * halfW);
          ctx.lineTo(ex, ey);
          ctx.lineTo(b.x - Math.cos(perp) * halfW, b.y - Math.sin(perp) * halfW);
          ctx.closePath();
          ctx.fillStyle = `rgba(180,230,255,${b.life * 0.8})`; ctx.fill();
          ctx.strokeStyle = `rgba(220,250,255,${b.life * 0.5})`; ctx.lineWidth = 1; ctx.stroke();
          // sub-crystal
          const subX = b.x + Math.cos(s.angle) * grown * 0.6;
          const subY = b.y + Math.sin(s.angle) * grown * 0.6;
          ctx.beginPath();
          ctx.moveTo(subX, subY);
          ctx.lineTo(subX + Math.cos(s.angle + 0.6) * grown * 0.3, subY + Math.sin(s.angle + 0.6) * grown * 0.3);
          ctx.strokeStyle = `rgba(200,240,255,${b.life * 0.5})`; ctx.lineWidth = 1.5; ctx.stroke();
        });
      });
      id = requestAnimationFrame(loop);
    };
    return { start: loop, stop: () => cancelAnimationFrame(id) };
  }
},

// 20 — Boomerang path trace
{
  name: "Boomerang Return",
  tags: ["weapon", "blade", "impact"],
  description: "An energy boomerang follows a curved arc path outward and returns, tracing neon lines",
  animator: (c, ctx, mouse) => {
    let boomerangs = [], t = 0, id;
    const throw_ = () => {
      const sx = c.width * 0.2, sy = c.height / 2;
      boomerangs.push({ phase: 0, sx, sy, trail: [], rot: 0, hue: Math.random() * 60 + 160 });
    };
    throw_();
    const getPos = (b) => {
      const p = b.phase;
      if (p < 0.5) {
        const t = p * 2;
        return {
          x: b.sx + t * (c.width * 0.6),
          y: b.sy + Math.sin(t * Math.PI) * (-c.height * 0.35)
        };
      } else {
        const t = (p - 0.5) * 2;
        return {
          x: b.sx + (1 - t) * (c.width * 0.6),
          y: b.sy + Math.sin((1 - t) * Math.PI) * (-c.height * 0.35)
        };
      }
    };
    const loop = () => {
      t += 0.016;
      if (Math.floor(t * 60) % 180 === 0) throw_();
      ctx.fillStyle = "rgba(0,0,8,0.3)";
      ctx.fillRect(0, 0, c.width, c.height);
      boomerangs = boomerangs.filter(b => b.phase < 1);
      boomerangs.forEach(b => {
        b.phase += 0.006; b.rot += 0.3;
        const pos = getPos(b);
        b.trail.push({ x: pos.x, y: pos.y });
        if (b.trail.length > 60) b.trail.shift();
        // trail path
        if (b.trail.length > 1) {
          ctx.beginPath(); ctx.moveTo(b.trail[0].x, b.trail[0].y);
          b.trail.forEach(pt => ctx.lineTo(pt.x, pt.y));
          ctx.strokeStyle = `hsla(${b.hue},100%,60%,0.4)`; ctx.lineWidth = 3; ctx.stroke();
          ctx.strokeStyle = `hsla(${b.hue + 30},100%,80%,0.15)`; ctx.lineWidth = 8; ctx.stroke();
        }
        // boomerang shape
        ctx.save(); ctx.translate(pos.x, pos.y); ctx.rotate(b.rot);
        ctx.beginPath();
        ctx.moveTo(-20, 0); ctx.quadraticCurveTo(-10, -12, 0, 0);
        ctx.quadraticCurveTo(10, 12, 20, 0);
        ctx.strokeStyle = `hsla(${b.hue},100%,80%,0.9)`; ctx.lineWidth = 4; ctx.stroke();
        ctx.restore();
      });
      id = requestAnimationFrame(loop);
    };
    return { start: loop, stop: () => cancelAnimationFrame(id) };
  }
},

// 21 — Homing missile swarm
{
  name: "Homing Missile Swarm",
  tags: ["weapon", "charge", "impact"],
  description: "A swarm of heat-seeking missiles with exhaust trails curves toward multiple targets",
  animator: (c, ctx, mouse) => {
    let missiles = [], targets = [], t = 0, id;
    for (let i = 0; i < 5; i++) targets.push({ x: c.width * 0.7 + Math.random() * 150, y: 60 + i * (c.height / 5) });
    const launch = () => {
      const tgt = targets[Math.floor(Math.random() * targets.length)];
      missiles.push({ x: 50, y: c.height / 2 + (Math.random() - 0.5) * 100, vx: 4, vy: (Math.random() - 0.5) * 4, target: tgt, trail: [], life: 1 });
    };
    const loop = () => {
      t += 0.016;
      if (Math.floor(t * 60) % 30 === 0 && missiles.length < 12) launch();
      ctx.fillStyle = "rgba(0,0,0,0.35)";
      ctx.fillRect(0, 0, c.width, c.height);
      // targets
      targets.forEach(tg => {
        ctx.beginPath(); ctx.arc(tg.x, tg.y, 10, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(255,50,50,0.7)"; ctx.lineWidth = 2; ctx.stroke();
        ctx.beginPath(); ctx.arc(tg.x, tg.y, 20, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(255,50,50,0.3)"; ctx.lineWidth = 1; ctx.stroke();
      });
      missiles = missiles.filter(m => m.life > 0);
      missiles.forEach(m => {
        const dx = m.target.x - m.x, dy = m.target.y - m.y;
        const d = Math.sqrt(dx * dx + dy * dy) + 1;
        m.vx += (dx / d) * 0.4; m.vy += (dy / d) * 0.4;
        const spd = Math.sqrt(m.vx * m.vx + m.vy * m.vy);
        if (spd > 10) { m.vx = (m.vx / spd) * 10; m.vy = (m.vy / spd) * 10; }
        m.x += m.vx; m.y += m.vy;
        m.trail.push({ x: m.x, y: m.y });
        if (m.trail.length > 25) m.trail.shift();
        // exhaust
        m.trail.forEach((pt, i) => {
          const prog = i / m.trail.length;
          ctx.beginPath(); ctx.arc(pt.x, pt.y, Math.max(0, 4 * prog), 0, Math.PI * 2);
          const r = Math.floor(255 * prog), g = Math.floor(150 * (1 - prog));
          ctx.fillStyle = `rgba(${r},${g},0,${prog * 0.6})`; ctx.fill();
        });
        // missile body
        const angle = Math.atan2(m.vy, m.vx);
        ctx.save(); ctx.translate(m.x, m.y); ctx.rotate(angle);
        ctx.fillStyle = "rgba(200,200,210,0.9)";
        ctx.beginPath(); ctx.moveTo(8, 0); ctx.lineTo(-5, -3); ctx.lineTo(-5, 3); ctx.closePath(); ctx.fill();
        ctx.fillStyle = "rgba(255,80,0,0.8)";
        ctx.beginPath(); ctx.moveTo(-5, 0); ctx.lineTo(-12, -4); ctx.lineTo(-12, 4); ctx.closePath(); ctx.fill();
        ctx.restore();
        if (d < 15) m.life = 0;
      });
      id = requestAnimationFrame(loop);
    };
    return { start: loop, stop: () => cancelAnimationFrame(id) };
  }
},

// 22 — Lava/magma cannonball
{
  name: "Magma Cannonball",
  tags: ["weapon", "impact", "energy"],
  description: "Incandescent magma balls arc under gravity, scorching the ground on impact",
  animator: (c, ctx, mouse) => {
    let balls = [], t = 0, id;
    const fire = () => {
      balls.push({ x: 40, y: c.height * 0.6, vx: 7 + Math.random() * 3, vy: -(6 + Math.random() * 4), trail: [], landed: false, lx: 0, ly: 0 });
    };
    fire();
    const loop = () => {
      t += 0.016;
      if (Math.floor(t * 60) % 120 === 0) fire();
      ctx.fillStyle = "rgba(0,0,0,0.35)";
      ctx.fillRect(0, 0, c.width, c.height);
      balls = balls.filter(b => !b.landed || b.lava > 0);
      balls.forEach(b => {
        if (!b.landed) {
          b.vy += 0.25; b.x += b.vx; b.y += b.vy;
          b.trail.push({ x: b.x, y: b.y });
          if (b.trail.length > 20) b.trail.shift();
          b.trail.forEach((pt, i) => {
            ctx.beginPath(); ctx.arc(pt.x, pt.y, 6 * (i / b.trail.length), 0, Math.PI * 2);
            const prog = i / b.trail.length;
            ctx.fillStyle = `rgba(255,${Math.floor(100 * prog)},0,${prog * 0.5})`; ctx.fill();
          });
          // ball
          const bg = ctx.createRadialGradient(b.x - 4, b.y - 4, 1, b.x, b.y, 14);
          bg.addColorStop(0, "rgba(255,255,200,0.9)");
          bg.addColorStop(0.4, "rgba(255,150,0,0.8)");
          bg.addColorStop(1, "rgba(200,50,0,0.6)");
          ctx.beginPath(); ctx.arc(b.x, b.y, 14, 0, Math.PI * 2);
          ctx.fillStyle = bg; ctx.fill();
          if (b.y > c.height * 0.75) { b.landed = true; b.lx = b.x; b.ly = b.y; b.lava = 1; b.lr = 5; }
        } else {
          b.lava -= 0.006; b.lr = Math.min(b.lr + 1, 60);
          ctx.beginPath(); ctx.ellipse(b.lx, b.ly, b.lr, b.lr * 0.3, 0, 0, Math.PI * 2);
          const lg = ctx.createRadialGradient(b.lx, b.ly, 0, b.lx, b.ly, b.lr);
          lg.addColorStop(0, `rgba(255,200,0,${b.lava * 0.7})`);
          lg.addColorStop(0.6, `rgba(255,80,0,${b.lava * 0.4})`);
          lg.addColorStop(1, "rgba(100,0,0,0)");
          ctx.fillStyle = lg; ctx.fill();
          // bubbles
          if (Math.random() < 0.1) {
            ctx.beginPath(); ctx.arc(b.lx + (Math.random() - 0.5) * b.lr, b.ly, 3, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255,200,0,${b.lava * 0.6})`; ctx.fill();
          }
        }
      });
      id = requestAnimationFrame(loop);
    };
    return { start: loop, stop: () => cancelAnimationFrame(id) };
  }
},

// 23 — Gravity well weapon
{
  name: "Gravity Well",
  tags: ["weapon", "energy", "charge"],
  description: "A singularity weapon opens a gravity well, pulling all ambient particles into collapse",
  animator: (c, ctx, mouse) => {
    let particles = [], wells = [], t = 0, id;
    for (let i = 0; i < 200; i++) particles.push({
      x: Math.random() * c.width, y: Math.random() * c.height,
      vx: (Math.random() - 0.5), vy: (Math.random() - 0.5), size: 1 + Math.random() * 2, hue: Math.random() * 60 + 160
    });
    const openWell = () => {
      wells.push({ x: c.width / 2 + (Math.random() - 0.5) * 200, y: c.height / 2 + (Math.random() - 0.5) * 100, r: 0, life: 1, maxR: 80 });
    };
    openWell();
    const loop = () => {
      t += 0.016;
      if (Math.floor(t * 60) % 200 === 0) openWell();
      ctx.fillStyle = "rgba(0,0,8,0.3)";
      ctx.fillRect(0, 0, c.width, c.height);
      wells = wells.filter(w => w.life > 0);
      wells.forEach(w => {
        w.r = Math.min(w.r + 1, w.maxR); w.life -= 0.005;
        // distortion rings
        for (let i = 3; i >= 0; i--) {
          ctx.beginPath(); ctx.arc(w.x, w.y, w.r + i * 12, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(80,0,150,${w.life * (0.3 - i * 0.06)})`; ctx.lineWidth = 3 - i * 0.5; ctx.stroke();
        }
        // event horizon
        const hg = ctx.createRadialGradient(w.x, w.y, 0, w.x, w.y, w.r * 0.4);
        hg.addColorStop(0, `rgba(0,0,0,${w.life})`);
        hg.addColorStop(1, "rgba(80,0,150,0)");
        ctx.beginPath(); ctx.arc(w.x, w.y, w.r * 0.4, 0, Math.PI * 2);
        ctx.fillStyle = hg; ctx.fill();
        // accretion disk
        ctx.beginPath(); ctx.ellipse(w.x, w.y, w.r * 0.8, w.r * 0.15, t, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(180,100,255,${w.life * 0.5})`; ctx.lineWidth = 3; ctx.stroke();
      });
      particles.forEach(p => {
        wells.forEach(w => {
          const dx = w.x - p.x, dy = w.y - p.y;
          const d = Math.sqrt(dx * dx + dy * dy) + 1;
          if (d < w.r * 2) {
            const force = Math.min(5, 800 / (d * d));
            p.vx += (dx / d) * force; p.vy += (dy / d) * force;
          }
        });
        p.vx *= 0.98; p.vy *= 0.98;
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = c.width; if (p.x > c.width) p.x = 0;
        if (p.y < 0) p.y = c.height; if (p.y > c.height) p.y = 0;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue},100%,70%,0.8)`; ctx.fill();
      });
      id = requestAnimationFrame(loop);
    };
    return { start: loop, stop: () => cancelAnimationFrame(id) };
  }
},

// 24 — Pulse mortar overhead burst
{
  name: "Mortar Overhead Burst",
  tags: ["weapon", "impact", "explosive"],
  description: "Mortar shells arc up off-screen and rain down in starburst detonations from above",
  animator: (c, ctx, mouse) => {
    let bursts = [], t = 0, id;
    const mortar = () => {
      const x = 50 + Math.random() * (c.width - 100);
      const delay = Math.random() * 60;
      bursts.push({ x, y: -30, delay, falling: true, life: 1, exploded: false, er: 0 });
    };
    for (let i = 0; i < 4; i++) mortar();
    const loop = () => {
      t += 0.016;
      if (Math.floor(t * 60) % 200 === 0) { for (let i = 0; i < 3; i++) mortar(); }
      ctx.fillStyle = "rgba(0,0,5,0.35)";
      ctx.fillRect(0, 0, c.width, c.height);
      bursts = bursts.filter(b => b.life > 0);
      bursts.forEach(b => {
        if (b.delay > 0) { b.delay--; return; }
        if (b.falling) {
          b.y += 6;
          // shell streak
          ctx.beginPath(); ctx.moveTo(b.x, b.y); ctx.lineTo(b.x, b.y - 20);
          ctx.strokeStyle = "rgba(255,200,100,0.6)"; ctx.lineWidth = 3; ctx.stroke();
          ctx.beginPath(); ctx.arc(b.x, b.y, 5, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(255,220,150,0.9)"; ctx.fill();
          if (b.y > c.height * 0.7) { b.falling = false; b.exploded = true; b.ey = b.y; }
        } else {
          b.life -= 0.012; b.er = Math.min(b.er + 5, 120);
          const eg = ctx.createRadialGradient(b.x, b.ey, 0, b.x, b.ey, b.er);
          eg.addColorStop(0, `rgba(255,255,200,${b.life * 0.6})`);
          eg.addColorStop(0.3, `rgba(255,120,0,${b.life * 0.4})`);
          eg.addColorStop(1, "rgba(200,50,0,0)");
          ctx.beginPath(); ctx.arc(b.x, b.ey, b.er, 0, Math.PI * 2);
          ctx.fillStyle = eg; ctx.fill();
          // fragment rays
          for (let i = 0; i < 12; i++) {
            const a = (i / 12) * Math.PI * 2;
            const fl = b.er * (0.5 + Math.random() * 0.5);
            ctx.beginPath(); ctx.moveTo(b.x + Math.cos(a) * b.er * 0.2, b.ey + Math.sin(a) * b.er * 0.2);
            ctx.lineTo(b.x + Math.cos(a) * fl, b.ey + Math.sin(a) * fl);
            ctx.strokeStyle = `rgba(255,180,50,${b.life * 0.5})`; ctx.lineWidth = 1.5; ctx.stroke();
          }
        }
      });
      id = requestAnimationFrame(loop);
    };
    return { start: loop, stop: () => cancelAnimationFrame(id) };
  }
},

// 25 — Beam reflection / mirror bounce
{
  name: "Mirror Beam Bounce",
  tags: ["weapon", "energy", "blade"],
  description: "A laser beam bounces between reflective surfaces with diminishing intensity at each reflection",
  animator: (c, ctx, mouse) => {
    let t = 0, id;
    const mirrors = [
      { x: 100, y: c.height * 0.3, angle: Math.PI / 4 },
      { x: c.width * 0.5, y: c.height * 0.7, angle: -Math.PI / 4 },
      { x: c.width - 100, y: c.height * 0.4, angle: Math.PI / 3 },
    ];
    const loop = () => {
      t += 0.016;
      ctx.fillStyle = "rgba(0,0,8,0.3)";
      ctx.fillRect(0, 0, c.width, c.height);
      // animated beam source
      let bx = 0, by = c.height / 2;
      let ba = (Math.sin(t * 0.5) * 0.3);
      let intensity = 1;
      const hue = (t * 60) % 360;
      const points = [{ x: bx, y: by }];
      for (let bounce = 0; bounce < mirrors.length + 1 && intensity > 0.1; bounce++) {
        let nextX = bx + Math.cos(ba) * 2000;
        let nextY = by + Math.sin(ba) * 2000;
        let closestMirror = null, closestT = Infinity;
        mirrors.forEach((m, mi) => {
          // ray-segment intersection with mirror
          const mx1 = m.x + Math.cos(m.angle) * 40, my1 = m.y + Math.sin(m.angle) * 40;
          const mx2 = m.x - Math.cos(m.angle) * 40, my2 = m.y - Math.sin(m.angle) * 40;
          const denom = (bx - nextX) * (my1 - my2) - (by - nextY) * (mx1 - mx2);
          if (Math.abs(denom) < 0.001) return;
          const tVal = ((bx - mx1) * (my1 - my2) - (by - my1) * (mx1 - mx2)) / denom;
          const uVal = -((bx - nextX) * (by - my1) - (by - nextY) * (bx - mx1)) / denom;
          if (tVal > 0.01 && tVal < closestT && uVal >= 0 && uVal <= 1) { closestT = tVal; closestMirror = { m: m, t: tVal }; }
        });
        if (closestMirror) {
          const hitX = bx + (nextX - bx) * closestT;
          const hitY = by + (nextY - by) * closestT;
          // draw segment
          ctx.beginPath(); ctx.moveTo(bx, by); ctx.lineTo(hitX, hitY);
          ctx.strokeStyle = `hsla(${hue},100%,70%,${intensity * 0.8})`; ctx.lineWidth = 2 * intensity; ctx.stroke();
          ctx.strokeStyle = `hsla(${hue},100%,50%,${intensity * 0.2})`; ctx.lineWidth = 8 * intensity; ctx.stroke();
          // reflect
          const mn = { x: Math.sin(closestMirror.m.angle), y: -Math.cos(closestMirror.m.angle) };
          const dot = Math.cos(ba) * mn.x + Math.sin(ba) * mn.y;
          const rx = Math.cos(ba) - 2 * dot * mn.x, ry = Math.sin(ba) - 2 * dot * mn.y;
          ba = Math.atan2(ry, rx);
          bx = hitX; by = hitY; intensity *= 0.7;
          points.push({ x: bx, y: by });
          // hit spark
          ctx.beginPath(); ctx.arc(bx, by, Math.max(0, 6 * intensity), 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${hue},100%,90%,${intensity})`; ctx.fill();
        } else {
          ctx.beginPath(); ctx.moveTo(bx, by); ctx.lineTo(nextX, nextY);
          ctx.strokeStyle = `hsla(${hue},100%,70%,${intensity * 0.8})`; ctx.lineWidth = 2 * intensity; ctx.stroke();
          break;
        }
      }
      // draw mirrors
      mirrors.forEach(m => {
        ctx.save(); ctx.translate(m.x, m.y); ctx.rotate(m.angle);
        ctx.fillStyle = "rgba(180,220,255,0.3)";
        ctx.fillRect(-40, -3, 80, 6);
        ctx.strokeStyle = "rgba(200,230,255,0.7)"; ctx.lineWidth = 2; ctx.strokeRect(-40, -3, 80, 6);
        ctx.restore();
      });
      id = requestAnimationFrame(loop);
    };
    return { start: loop, stop: () => cancelAnimationFrame(id) };
  }
},

// 26 — Gatling gun suppression fire
{
  name: "Gatling Suppression",
  tags: ["weapon", "impact", "charge"],
  description: "A spinning gatling barrel fires sustained suppressing bursts with brass casings ejecting",
  animator: (c, ctx, mouse) => {
    let bullets = [], casings = [], t = 0, id, barrelRot = 0;
    const cx = 60, cy = c.height / 2;
    const loop = () => {
      t += 0.016; barrelRot += 0.3;
      ctx.fillStyle = "rgba(0,0,0,0.4)";
      ctx.fillRect(0, 0, c.width, c.height);
      // gatling barrels
      ctx.save(); ctx.translate(cx, cy);
      for (let b = 0; b < 6; b++) {
        ctx.save(); ctx.rotate(barrelRot + (b / 6) * Math.PI * 2);
        ctx.fillStyle = "rgba(100,100,110,0.8)";
        ctx.fillRect(0, -3, 35, 6);
        ctx.restore();
      }
      ctx.fillStyle = "rgba(60,60,70,0.9)";
      ctx.beginPath(); ctx.arc(0, 0, 12, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
      // fire rate
      if (Math.floor(t * 60) % 3 === 0) {
        const spread = (Math.random() - 0.5) * 0.15;
        bullets.push({ x: cx + 35, y: cy, vx: 20, vy: Math.sin(spread) * 20, life: 1 });
        // casing eject
        casings.push({ x: cx + 10, y: cy, vx: -2 - Math.random() * 3, vy: -3 - Math.random() * 3, rot: 0, rotV: (Math.random() - 0.5) * 0.4, life: 1 });
      }
      bullets = bullets.filter(b => b.life > 0 && b.x < c.width + 20);
      bullets.forEach(b => {
        b.x += b.vx; b.y += b.vy; b.life -= 0.05;
        ctx.beginPath(); ctx.moveTo(b.x, b.y); ctx.lineTo(b.x - 15, b.y - b.vy * 0.5);
        ctx.strokeStyle = `rgba(255,255,200,${b.life})`; ctx.lineWidth = 2; ctx.stroke();
        // impact on edge
        if (b.x > c.width - 5) {
          for (let j = 0; j < 5; j++) {
            const a = Math.random() * Math.PI * 2;
            ctx.beginPath(); ctx.moveTo(b.x, b.y); ctx.lineTo(b.x + Math.cos(a) * 8, b.y + Math.sin(a) * 8);
            ctx.strokeStyle = "rgba(255,150,0,0.7)"; ctx.lineWidth = 1; ctx.stroke();
          }
          b.life = 0;
        }
      });
      casings = casings.filter(cs => cs.life > 0);
      casings.forEach(cs => {
        cs.x += cs.vx; cs.y += cs.vy; cs.vy += 0.4; cs.rot += cs.rotV; cs.life -= 0.015;
        ctx.save(); ctx.translate(cs.x, cs.y); ctx.rotate(cs.rot);
        ctx.fillStyle = `rgba(200,160,0,${cs.life})`;
        ctx.fillRect(-4, -2, 8, 4);
        ctx.restore();
      });
      id = requestAnimationFrame(loop);
    };
    return { start: loop, stop: () => cancelAnimationFrame(id) };
  }
},

// 27 — Force push / kinetic wave
{
  name: "Force Push Wave",
  tags: ["weapon", "energy", "impact"],
  description: "A kinetic force push ripples outward, distorting and scattering environmental debris",
  animator: (c, ctx, mouse) => {
    let waves = [], debris = [], t = 0, id;
    for (let i = 0; i < 60; i++) debris.push({ x: Math.random() * c.width, y: Math.random() * c.height, vx: 0, vy: 0, size: 2 + Math.random() * 5, hue: Math.random() * 30 + 20 });
    const push = () => {
      const ox = c.width * 0.25, oy = c.height / 2;
      waves.push({ x: ox, y: oy, r: 5, life: 1 });
      debris.forEach(d => {
        const dx = d.x - ox, dy = d.y - oy;
        const dist = Math.sqrt(dx * dx + dy * dy) + 1;
        d.vx += (dx / dist) * (500 / dist);
        d.vy += (dy / dist) * (500 / dist);
      });
    };
    push();
    const loop = () => {
      t += 0.016;
      if (Math.floor(t * 60) % 180 === 0) push();
      ctx.fillStyle = "rgba(0,0,5,0.3)";
      ctx.fillRect(0, 0, c.width, c.height);
      waves = waves.filter(w => w.life > 0);
      waves.forEach(w => {
        w.r += 8; w.life -= 0.015;
        for (let i = 0; i < 3; i++) {
          ctx.beginPath(); ctx.arc(w.x, w.y, Math.max(0, w.r - i * 10), 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(150,200,255,${w.life * (0.5 - i * 0.15)})`; ctx.lineWidth = 3 - i; ctx.stroke();
        }
      });
      debris.forEach(d => {
        d.vx *= 0.95; d.vy *= 0.95;
        d.x += d.vx; d.y += d.vy;
        if (d.x < 0) d.x = c.width; if (d.x > c.width) d.x = 0;
        if (d.y < 0) d.y = c.height; if (d.y > c.height) d.y = 0;
        const spd = Math.sqrt(d.vx * d.vx + d.vy * d.vy);
        ctx.beginPath(); ctx.arc(d.x, d.y, d.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${d.hue},60%,${40 + Math.min(spd, 30)}%,0.8)`; ctx.fill();
      });
      id = requestAnimationFrame(loop);
    };
    return { start: loop, stop: () => cancelAnimationFrame(id) };
  }
},

// 28 — Shotgun cone blast
{
  name: "Shotgun Cone Blast",
  tags: ["weapon", "impact", "blade"],
  description: "A shotgun fires a wide spread cone of pellets with expanding smoke cloud",
  animator: (c, ctx, mouse) => {
    let shots = [], t = 0, id;
    const fire = () => {
      const count = 12 + Math.floor(Math.random() * 6);
      const pellets = Array.from({ length: count }, () => {
        const spread = (Math.random() - 0.5) * 0.7;
        const spd = 8 + Math.random() * 6;
        return { x: 40, y: c.height / 2 + (Math.random() - 0.5) * 20, vx: Math.cos(spread) * spd, vy: Math.sin(spread) * spd, life: 1, trail: [] };
      });
      shots.push({ pellets, smoke: { x: 40, y: c.height / 2, r: 5, life: 1 } });
    };
    fire();
    const loop = () => {
      t += 0.016;
      if (Math.floor(t * 60) % 100 === 0) fire();
      ctx.fillStyle = "rgba(0,0,0,0.35)";
      ctx.fillRect(0, 0, c.width, c.height);
      shots = shots.filter(s => s.pellets.some(p => p.life > 0) || s.smoke.life > 0);
      shots.forEach(s => {
        // smoke
        if (s.smoke.life > 0) {
          s.smoke.r += 2; s.smoke.life -= 0.025;
          const sg = ctx.createRadialGradient(s.smoke.x, s.smoke.y, 0, s.smoke.x, s.smoke.y, s.smoke.r);
          sg.addColorStop(0, `rgba(200,200,180,${s.smoke.life * 0.3})`);
          sg.addColorStop(1, "rgba(150,150,120,0)");
          ctx.beginPath(); ctx.arc(s.smoke.x, s.smoke.y, s.smoke.r, 0, Math.PI * 2);
          ctx.fillStyle = sg; ctx.fill();
        }
        s.pellets.forEach(p => {
          if (p.life <= 0) return;
          p.trail.push({ x: p.x, y: p.y });
          if (p.trail.length > 10) p.trail.shift();
          p.x += p.vx; p.y += p.vy; p.vy += 0.05; p.life -= 0.025;
          p.trail.forEach((pt, i) => {
            ctx.beginPath(); ctx.arc(pt.x, pt.y, 2 * (i / p.trail.length), 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255,220,100,${(i / p.trail.length) * 0.4})`; ctx.fill();
          });
          ctx.beginPath(); ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(220,200,100,${p.life})`; ctx.fill();
        });
      });
      id = requestAnimationFrame(loop);
    };
    return { start: loop, stop: () => cancelAnimationFrame(id) };
  }
},

// 29 — Nuke explosion with mushroom cloud
{
  name: "Nuke Detonation",
  tags: ["weapon", "impact", "explosive"],
  description: "A tactical nuclear detonation builds a glowing fireball column into a mushroom cloud",
  animator: (c, ctx, mouse) => {
    let t = 0, id, detonated = false, fireballR = 0, stemH = 0, capR = 0, flashLife = 0;
    const detonate = () => { detonated = true; fireballR = 0; stemH = 0; capR = 0; flashLife = 1; };
    detonate();
    const loop = () => {
      t += 0.016;
      if (Math.floor(t * 60) % 400 === 0) detonate();
      ctx.fillStyle = "rgba(0,0,0,0.3)";
      ctx.fillRect(0, 0, c.width, c.height);
      // flash
      if (flashLife > 0) {
        ctx.fillStyle = `rgba(255,255,255,${flashLife * 0.8})`;
        ctx.fillRect(0, 0, c.width, c.height);
        flashLife -= 0.04;
      }
      if (detonated) {
        fireballR = Math.min(fireballR + 1.5, 80);
        const gy = c.height * 0.75;
        // ground ring
        ctx.beginPath(); ctx.ellipse(c.width / 2, gy, fireballR * 1.5, fireballR * 0.2, 0, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255,150,0,${Math.min(1, fireballR / 40) * 0.6})`; ctx.lineWidth = 4; ctx.stroke();
        // fireball
        const fg = ctx.createRadialGradient(c.width / 2, gy - fireballR * 0.5, 0, c.width / 2, gy - fireballR * 0.5, fireballR);
        fg.addColorStop(0, "rgba(255,255,200,0.9)"); fg.addColorStop(0.4, "rgba(255,150,0,0.7)"); fg.addColorStop(1, "rgba(200,50,0,0.3)");
        ctx.beginPath(); ctx.arc(c.width / 2, gy - fireballR * 0.5, fireballR, 0, Math.PI * 2);
        ctx.fillStyle = fg; ctx.fill();
        // stem
        if (fireballR > 30) {
          stemH = Math.min(stemH + 3, c.height * 0.5);
          const stemW = 30 + stemH * 0.05;
          ctx.fillStyle = "rgba(200,100,0,0.4)";
          ctx.fillRect(c.width / 2 - stemW / 2, gy - stemH, stemW, stemH);
          // stem gradient
          const stg = ctx.createLinearGradient(0, gy - stemH, 0, gy);
          stg.addColorStop(0, "rgba(255,80,0,0.5)"); stg.addColorStop(1, "rgba(255,150,0,0.2)");
          ctx.fillStyle = stg;
          ctx.fillRect(c.width / 2 - stemW / 2, gy - stemH, stemW, stemH);
          // cap
          if (stemH > 100) {
            capR = Math.min(capR + 2, 100);
            const capY = gy - stemH;
            const cg = ctx.createRadialGradient(c.width / 2, capY, 0, c.width / 2, capY, capR);
            cg.addColorStop(0, "rgba(255,120,0,0.5)"); cg.addColorStop(1, "rgba(200,80,0,0)");
            ctx.beginPath(); ctx.ellipse(c.width / 2, capY, capR, capR * 0.5, 0, 0, Math.PI * 2);
            ctx.fillStyle = cg; ctx.fill();
          }
        }
      }
      id = requestAnimationFrame(loop);
    };
    return { start: loop, stop: () => cancelAnimationFrame(id) };
  }
},

// 30 — Shield parry / energy reflect
{
  name: "Energy Shield Parry",
  tags: ["weapon", "charge", "energy"],
  description: "An energy shield absorbs incoming fire, rippling with hexagonal impact patterns",
  animator: (c, ctx, mouse) => {
    let impacts = [], t = 0, id, shieldCharge = 1;
    const cx = c.width * 0.4, cy = c.height / 2;
    const shieldR = 90;
    const impact = () => {
      // incoming projectile
      const angle = (Math.random() - 0.5) * 0.8;
      const hitX = cx + Math.cos(angle) * shieldR;
      const hitY = cy + Math.sin(angle) * shieldR;
      impacts.push({ x: hitX, y: hitY, r: 5, life: 1, angle });
      shieldCharge = Math.max(0, shieldCharge - 0.15);
    };
    const loop = () => {
      t += 0.016;
      shieldCharge = Math.min(1, shieldCharge + 0.005);
      if (Math.floor(t * 60) % 60 === 0) impact();
      ctx.fillStyle = "rgba(0,0,10,0.3)";
      ctx.fillRect(0, 0, c.width, c.height);
      // shield base
      ctx.beginPath(); ctx.arc(cx, cy, shieldR, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(100,180,255,${0.3 + shieldCharge * 0.4})`; ctx.lineWidth = 3; ctx.stroke();
      const sg = ctx.createRadialGradient(cx, cy, 0, cx, cy, shieldR);
      sg.addColorStop(0, "rgba(50,100,200,0)"); sg.addColorStop(1, `rgba(100,180,255,${shieldCharge * 0.15})`);
      ctx.beginPath(); ctx.arc(cx, cy, shieldR, 0, Math.PI * 2);
      ctx.fillStyle = sg; ctx.fill();
      // hex pattern overlay
      for (let r = 0; r < 4; r++) {
        for (let i = 0; i < 6 + r * 4; i++) {
          const a = (i / (6 + r * 4)) * Math.PI * 2;
          const hx = cx + Math.cos(a) * (r + 1) * 20;
          const hy = cy + Math.sin(a) * (r + 1) * 20;
          if (Math.sqrt((hx - cx) ** 2 + (hy - cy) ** 2) < shieldR - 10) {
            ctx.beginPath();
            for (let j = 0; j < 6; j++) {
              const ha = (j / 6) * Math.PI * 2 + t * 0.3;
              const hpx = hx + Math.cos(ha) * 9, hpy = hy + Math.sin(ha) * 9;
              j === 0 ? ctx.moveTo(hpx, hpy) : ctx.lineTo(hpx, hpy);
            }
            ctx.closePath();
            ctx.strokeStyle = `rgba(100,180,255,${shieldCharge * 0.2})`; ctx.lineWidth = 0.5; ctx.stroke();
          }
        }
      }
      // impact ripples
      impacts = impacts.filter(im => im.life > 0);
      impacts.forEach(im => {
        im.r += 3; im.life -= 0.025;
        ctx.beginPath(); ctx.arc(im.x, im.y, im.r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(200,230,255,${im.life * 0.7})`; ctx.lineWidth = 2; ctx.stroke();
        ctx.beginPath(); ctx.arc(im.x, im.y, Math.max(0, 6 * im.life), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${im.life * 0.6})`; ctx.fill();
      });
      id = requestAnimationFrame(loop);
    };
    return { start: loop, stop: () => cancelAnimationFrame(id) };
  }
},

// 31 — Saw blade ricochet
{
  name: "Saw Blade Ricochet",
  tags: ["weapon", "blade", "impact"],
  description: "A spinning saw blade bounces off canvas walls multiple times, trailing sparks",
  animator: (c, ctx, mouse) => {
    let blades = [], t = 0, id;
    const launch = () => {
      blades.push({ x: Math.random() * c.width, y: Math.random() * c.height, vx: (Math.random() - 0.5) * 10, vy: (Math.random() - 0.5) * 10, rot: 0, bounces: 0, trail: [] });
    };
    launch();
    const drawBlade = (x, y, rot) => {
      ctx.save(); ctx.translate(x, y); ctx.rotate(rot);
      for (let i = 0; i < 12; i++) {
        const a = (i / 12) * Math.PI * 2;
        ctx.beginPath(); ctx.moveTo(Math.cos(a) * 12, Math.sin(a) * 12);
        ctx.lineTo(Math.cos(a + 0.2) * 18, Math.sin(a + 0.2) * 18);
        ctx.lineTo(Math.cos(a + 0.3) * 12, Math.sin(a + 0.3) * 12);
        ctx.closePath();
        ctx.fillStyle = "rgba(180,190,200,0.9)"; ctx.fill();
      }
      ctx.beginPath(); ctx.arc(0, 0, 8, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(150,160,170,0.9)"; ctx.fill();
      ctx.restore();
    };
    const loop = () => {
      t += 0.016;
      if (Math.floor(t * 60) % 200 === 0) launch();
      ctx.fillStyle = "rgba(0,0,0,0.35)";
      ctx.fillRect(0, 0, c.width, c.height);
      blades = blades.filter(b => b.bounces < 8);
      blades.forEach(b => {
        b.x += b.vx; b.y += b.vy; b.rot += 0.25;
        b.trail.push({ x: b.x, y: b.y });
        if (b.trail.length > 20) b.trail.shift();
        let bounced = false;
        if (b.x < 18 || b.x > c.width - 18) { b.vx *= -1; b.bounces++; bounced = true; }
        if (b.y < 18 || b.y > c.height - 18) { b.vy *= -1; b.bounces++; bounced = true; }
        if (bounced) {
          for (let i = 0; i < 10; i++) {
            const a = Math.random() * Math.PI * 2;
            ctx.beginPath(); ctx.moveTo(b.x, b.y);
            ctx.lineTo(b.x + Math.cos(a) * (5 + Math.random() * 10), b.y + Math.sin(a) * (5 + Math.random() * 10));
            ctx.strokeStyle = "rgba(255,180,0,0.8)"; ctx.lineWidth = 1.5; ctx.stroke();
          }
        }
        b.trail.forEach((pt, i) => {
          ctx.beginPath(); ctx.arc(pt.x, pt.y, 3 * (i / b.trail.length), 0, Math.PI * 2);
          ctx.fillStyle = `rgba(200,220,255,${(i / b.trail.length) * 0.3})`; ctx.fill();
        });
        drawBlade(b.x, b.y, b.rot);
      });
      id = requestAnimationFrame(loop);
    };
    return { start: loop, stop: () => cancelAnimationFrame(id) };
  }
},

// 32 — Sonic boom cone
{
  name: "Sonic Boom",
  tags: ["weapon", "energy", "impact"],
  description: "A supersonic projectile breaks the sound barrier, creating a visible Mach cone shockwave",
  animator: (c, ctx, mouse) => {
    let projectiles = [], t = 0, id;
    const fire = () => {
      projectiles.push({ x: -20, y: c.height / 2 + (Math.random() - 0.5) * 100, vx: 15, trail: [] });
    };
    fire();
    const loop = () => {
      t += 0.016;
      if (Math.floor(t * 60) % 120 === 0) fire();
      ctx.fillStyle = "rgba(0,0,5,0.35)";
      ctx.fillRect(0, 0, c.width, c.height);
      projectiles = projectiles.filter(p => p.x < c.width + 50);
      projectiles.forEach(p => {
        p.x += p.vx;
        p.trail.push({ x: p.x, y: p.y });
        if (p.trail.length > 60) p.trail.shift();
        // Mach cone
        const coneAngle = 0.3;
        const coneLen = 200;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x - coneLen, p.y - Math.tan(coneAngle) * coneLen);
        ctx.lineTo(p.x - coneLen, p.y + Math.tan(coneAngle) * coneLen);
        ctx.closePath();
        const cg = ctx.createLinearGradient(p.x, p.y, p.x - coneLen, p.y);
        cg.addColorStop(0, "rgba(150,200,255,0.5)");
        cg.addColorStop(1, "rgba(100,150,255,0)");
        ctx.fillStyle = cg; ctx.fill();
        // shockwave circles emanating
        if (p.trail.length % 8 === 0) {
          const oldX = p.trail[Math.max(0, p.trail.length - 8)].x;
          ctx.beginPath(); ctx.arc(oldX, p.y, 15, 0, Math.PI * 2);
          ctx.strokeStyle = "rgba(180,220,255,0.3)"; ctx.lineWidth = 2; ctx.stroke();
        }
        // projectile trail
        p.trail.forEach((pt, i) => {
          ctx.beginPath(); ctx.arc(pt.x, pt.y, 3 * (i / p.trail.length), 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,255,200,${(i / p.trail.length) * 0.6})`; ctx.fill();
        });
        ctx.beginPath(); ctx.arc(p.x, p.y, 5, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255,0.9)"; ctx.fill();
      });
      id = requestAnimationFrame(loop);
    };
    return { start: loop, stop: () => cancelAnimationFrame(id) };
  }
},

// 33 — Whirlwind / tornado weapon
{
  name: "Whirlwind Blade",
  tags: ["weapon", "blade", "charge"],
  description: "A vortex blade attack spawns a localized tornado that shreds debris across the arena",
  animator: (c, ctx, mouse) => {
    let tornados = [], debris = [], t = 0, id;
    for (let i = 0; i < 50; i++) debris.push({ x: Math.random() * c.width, y: Math.random() * c.height, vx: 0, vy: 0, size: 2 + Math.random() * 4, hue: 30 + Math.random() * 20 });
    const spawnTornado = () => {
      const x = 100 + Math.random() * (c.width - 200), y = c.height * 0.7;
      tornados.push({ x, y, r: 10, life: 1, angle: 0 });
    };
    spawnTornado();
    const loop = () => {
      t += 0.016;
      if (Math.floor(t * 60) % 220 === 0) spawnTornado();
      ctx.fillStyle = "rgba(0,0,5,0.3)";
      ctx.fillRect(0, 0, c.width, c.height);
      tornados = tornados.filter(to => to.life > 0);
      tornados.forEach(to => {
        to.r = Math.min(to.r + 0.5, 80); to.life -= 0.005; to.angle += 0.1;
        // draw funnel
        const layers = 15;
        for (let i = 0; i < layers; i++) {
          const layerR = to.r * (i / layers);
          const layerY = to.y - i * 8;
          ctx.beginPath(); ctx.ellipse(to.x, layerY, layerR, layerR * 0.25, 0, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(200,220,255,${to.life * (0.3 - i * 0.015)})`; ctx.lineWidth = 1; ctx.stroke();
          // swirling dots
          for (let d = 0; d < 3; d++) {
            const da = to.angle + (d / 3) * Math.PI * 2 + i * 0.3;
            const dx = to.x + Math.cos(da) * layerR;
            const dy = layerY + Math.sin(da) * layerR * 0.25;
            ctx.beginPath(); ctx.arc(dx, dy, 2, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(180,210,255,${to.life * 0.6})`; ctx.fill();
          }
        }
        // affect debris
        debris.forEach(d => {
          const dx = to.x - d.x, dy = to.y - d.y;
          const dist = Math.sqrt(dx * dx + dy * dy) + 1;
          if (dist < to.r * 2.5) {
            const force = to.life * 3 / dist;
            const perpX = -dy / dist, perpY = dx / dist;
            d.vx += perpX * force; d.vy += perpY * force;
            d.vy -= 0.3; // upward pull
          }
        });
      });
      debris.forEach(d => {
        d.vx *= 0.97; d.vy *= 0.97; d.vy += 0.1;
        d.x += d.vx; d.y += d.vy;
        if (d.x < 0) d.x = c.width; if (d.x > c.width) d.x = 0;
        if (d.y > c.height) d.y = 0; if (d.y < 0) d.y = c.height;
        const spd = Math.sqrt(d.vx * d.vx + d.vy * d.vy);
        ctx.beginPath(); ctx.arc(d.x, d.y, d.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${d.hue},60%,${40 + Math.min(spd * 5, 30)}%,0.8)`; ctx.fill();
      });
      id = requestAnimationFrame(loop);
    };
    return { start: loop, stop: () => cancelAnimationFrame(id) };
  }
},

// 34 — Shield bubble deflection
{
  name: "Plasma Deflector Dome",
  tags: ["weapon", "energy", "charge"],
  description: "A plasma deflector dome emerges, deflecting incoming energy bolts outward",
  animator: (c, ctx, mouse) => {
    let bolts = [], deflected = [], t = 0, id;
    const cx = c.width / 2, cy = c.height / 2;
    const domeR = 100;
    const loop = () => {
      t += 0.016;
      // spawn incoming bolts
      if (Math.floor(t * 60) % 30 === 0) {
        const a = Math.random() * Math.PI * 2;
        const spawnR = 250;
        const sx = cx + Math.cos(a) * spawnR, sy = cy + Math.sin(a) * spawnR;
        const dx = cx - sx, dy = cy - sy;
        const d = Math.sqrt(dx * dx + dy * dy);
        bolts.push({ x: sx, y: sy, vx: (dx / d) * 6, vy: (dy / d) * 6, hue: Math.random() * 60 + 0 });
      }
      ctx.fillStyle = "rgba(0,0,8,0.3)";
      ctx.fillRect(0, 0, c.width, c.height);
      // dome
      for (let i = 0; i < 3; i++) {
        ctx.beginPath(); ctx.arc(cx, cy, domeR + i * 5, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(100,200,255,${0.3 - i * 0.08})`; ctx.lineWidth = 2; ctx.stroke();
      }
      const dg = ctx.createRadialGradient(cx, cy, 0, cx, cy, domeR);
      dg.addColorStop(0, "rgba(50,100,200,0)");
      dg.addColorStop(0.8, "rgba(80,160,255,0.05)");
      dg.addColorStop(1, "rgba(100,200,255,0.15)");
      ctx.beginPath(); ctx.arc(cx, cy, domeR, 0, Math.PI * 2);
      ctx.fillStyle = dg; ctx.fill();
      // bolts
      bolts = bolts.filter(b => b.x > -20 && b.x < c.width + 20 && b.y > -20 && b.y < c.height + 20);
      bolts.forEach((b, bi) => {
        b.x += b.vx; b.y += b.vy;
        const dx = b.x - cx, dy = b.y - cy;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < domeR + 5) {
          // deflect: reflect outward
          const nx = dx / d, ny = dy / d;
          const dot = b.vx * nx + b.vy * ny;
          deflected.push({ x: b.x, y: b.y, vx: b.vx - 2 * dot * nx, vy: b.vy - 2 * dot * ny, hue: b.hue, life: 1 });
          // impact flash
          ctx.beginPath(); ctx.arc(b.x, b.y, 12, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${b.hue},100%,80%,0.6)`; ctx.fill();
          bolts.splice(bi, 1);
        }
        ctx.beginPath(); ctx.arc(b.x, b.y, 5, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${b.hue},100%,70%,0.9)`; ctx.fill();
        ctx.beginPath(); ctx.arc(b.x, b.y, 10, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${b.hue},100%,60%,0.2)`; ctx.fill();
      });
      deflected = deflected.filter(d => d.life > 0);
      deflected.forEach(d => {
        d.x += d.vx; d.y += d.vy; d.life -= 0.025;
        ctx.beginPath(); ctx.arc(d.x, d.y, Math.max(0, 4 * d.life), 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${d.hue},100%,80%,${d.life * 0.8})`; ctx.fill();
      });
      id = requestAnimationFrame(loop);
    };
    return { start: loop, stop: () => cancelAnimationFrame(id) };
  }
},

// 35 — Smoke grenade area denial
{
  name: "Smoke Grenade",
  tags: ["weapon", "impact", "energy"],
  description: "A smoke grenade deploys a dense, billowing obscuring cloud across the battlefield",
  animator: (c, ctx, mouse) => {
    let clouds = [], t = 0, id;
    const deploy = () => {
      const gx = 100 + Math.random() * (c.width - 200), gy = c.height * 0.65;
      const spawnInterval = setInterval(() => {
        clouds.push({ x: gx + (Math.random() - 0.5) * 60, y: gy, vx: (Math.random() - 0.5) * 0.8, vy: -(0.5 + Math.random()), size: 20 + Math.random() * 30, life: 1, hue: Math.random() * 30 + 160 });
      }, 50);
      setTimeout(() => clearInterval(spawnInterval), 2000);
    };
    deploy();
    const loop = () => {
      t += 0.016;
      if (Math.floor(t * 60) % 300 === 0) deploy();
      ctx.fillStyle = "rgba(0,0,5,0.2)";
      ctx.fillRect(0, 0, c.width, c.height);
      clouds = clouds.filter(cl => cl.life > 0);
      clouds.forEach(cl => {
        cl.x += cl.vx + Math.sin(t + cl.y * 0.01) * 0.3;
        cl.y += cl.vy; cl.vy *= 0.995;
        cl.life -= 0.003; cl.size += 0.3;
        ctx.beginPath(); ctx.arc(cl.x, cl.y, cl.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${cl.hue},30%,60%,${cl.life * 0.4})`; ctx.fill();
      });
      id = requestAnimationFrame(loop);
    };
    return { start: loop, stop: () => cancelAnimationFrame(id) };
  }
},

// 36 — Time stop / freeze frame effect
{
  name: "Time Stop Freeze",
  tags: ["weapon", "charge", "energy"],
  description: "A temporal freeze weapon stops particles mid-flight in crystallized time",
  animator: (c, ctx, mouse) => {
    let particles = [], frozen = [], t = 0, id, isFrozen = false, freezeTimer = 0;
    for (let i = 0; i < 100; i++) particles.push({ x: Math.random() * c.width, y: Math.random() * c.height, vx: (Math.random() - 0.5) * 4, vy: (Math.random() - 0.5) * 4, hue: Math.random() * 60 + 180, size: 2 + Math.random() * 3 });
    const loop = () => {
      t += 0.016;
      if (Math.floor(t * 60) % 200 === 0 && !isFrozen) { isFrozen = true; freezeTimer = 180; frozen = particles.map(p => ({ ...p })); }
      ctx.fillStyle = "rgba(0,0,10,0.3)";
      ctx.fillRect(0, 0, c.width, c.height);
      if (isFrozen) {
        freezeTimer--;
        if (freezeTimer <= 0) { isFrozen = false; frozen = []; }
        const prog = 1 - freezeTimer / 180;
        // freeze field
        ctx.fillStyle = `rgba(180,220,255,${Math.max(0, 0.05 - prog * 0.05)})`;
        ctx.fillRect(0, 0, c.width, c.height);
        // frozen particles with crystal effect
        frozen.forEach(p => {
          ctx.beginPath(); ctx.arc(p.x, p.y, p.size + 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(200,230,255,0.8)`; ctx.fill();
          ctx.strokeStyle = "rgba(150,210,255,0.6)"; ctx.lineWidth = 1; ctx.stroke();
          // ice spikes
          for (let j = 0; j < 4; j++) {
            const a = (j / 4) * Math.PI * 2 + t * 0.1;
            ctx.beginPath();
            ctx.moveTo(p.x + Math.cos(a) * p.size, p.y + Math.sin(a) * p.size);
            ctx.lineTo(p.x + Math.cos(a) * (p.size + 6), p.y + Math.sin(a) * (p.size + 6));
            ctx.strokeStyle = "rgba(200,240,255,0.5)"; ctx.lineWidth = 1; ctx.stroke();
          }
        });
        // freeze edge
        ctx.strokeStyle = `rgba(150,210,255,${0.3 + Math.sin(t * 10) * 0.1})`; ctx.lineWidth = 4;
        ctx.strokeRect(2, 2, c.width - 4, c.height - 4);
      } else {
        particles.forEach(p => {
          p.x += p.vx; p.y += p.vy;
          if (p.x < 0) p.x = c.width; if (p.x > c.width) p.x = 0;
          if (p.y < 0) p.y = c.height; if (p.y > c.height) p.y = 0;
          ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${p.hue},100%,70%,0.8)`; ctx.fill();
        });
      }
      id = requestAnimationFrame(loop);
    };
    return { start: loop, stop: () => cancelAnimationFrame(id) };
  }
},

// 37 — Plasma mine field
{
  name: "Plasma Mine Field",
  tags: ["weapon", "energy", "impact"],
  description: "Proximity mines are placed across the field, detonating in chained plasma explosions",
  animator: (c, ctx, mouse) => {
    let mines = [], detonations = [], t = 0, id;
    for (let i = 0; i < 12; i++) mines.push({ x: 60 + Math.random() * (c.width - 120), y: 60 + Math.random() * (c.height - 120), armed: false, armTimer: 60 + Math.random() * 60, triggered: false });
    const loop = () => {
      t += 0.016;
      ctx.fillStyle = "rgba(0,0,8,0.35)";
      ctx.fillRect(0, 0, c.width, c.height);
      // detonate random mine periodically
      if (Math.floor(t * 60) % 150 === 0) {
        const armed = mines.filter(m => m.armed && !m.triggered);
        if (armed.length > 0) {
          const m = armed[Math.floor(Math.random() * armed.length)];
          m.triggered = true;
          detonations.push({ x: m.x, y: m.y, r: 0, life: 1, hue: 200 + Math.random() * 60 });
          // chain nearby
          mines.forEach(m2 => {
            const d = Math.sqrt((m2.x - m.x) ** 2 + (m2.y - m.y) ** 2);
            if (d < 120 && !m2.triggered) { m2.triggered = true; setTimeout(() => detonations.push({ x: m2.x, y: m2.y, r: 0, life: 1, hue: 200 + Math.random() * 60 }), d * 5); }
          });
        }
      }
      mines.forEach(m => {
        if (m.armTimer > 0) { m.armTimer--; return; }
        m.armed = true;
        if (m.triggered) return;
        // mine body
        ctx.beginPath(); ctx.arc(m.x, m.y, 10, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(50,50,60,0.9)"; ctx.fill();
        ctx.strokeStyle = "rgba(200,50,50,0.8)"; ctx.lineWidth = 2; ctx.stroke();
        // blink
        if (Math.floor(t * 60) % 30 < 5) {
          ctx.beginPath(); ctx.arc(m.x, m.y, 4, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(255,0,0,0.9)"; ctx.fill();
        }
        // proximity ring
        ctx.beginPath(); ctx.arc(m.x, m.y, 60, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(200,50,50,0.1)"; ctx.lineWidth = 1; ctx.stroke();
      });
      detonations = detonations.filter(d => d.life > 0);
      detonations.forEach(d => {
        d.r += 5; d.life -= 0.015;
        for (let i = 0; i < 2; i++) {
          ctx.beginPath(); ctx.arc(d.x, d.y, d.r + i * 15, 0, Math.PI * 2);
          ctx.strokeStyle = `hsla(${d.hue},100%,60%,${d.life * (0.6 - i * 0.2)})`; ctx.lineWidth = 3; ctx.stroke();
        }
        const dg = ctx.createRadialGradient(d.x, d.y, 0, d.x, d.y, d.r);
        dg.addColorStop(0, `hsla(${d.hue},100%,80%,${d.life * 0.5})`);
        dg.addColorStop(1, "rgba(0,0,0,0)");
        ctx.beginPath(); ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = dg; ctx.fill();
      });
      id = requestAnimationFrame(loop);
    };
    return { start: loop, stop: () => cancelAnimationFrame(id) };
  }
},

// 38 — Rapid ricochet bullet pinball
{
  name: "Bouncing Bullet Pinball",
  tags: ["weapon", "impact", "blade"],
  description: "Bullets pinball between arena walls in cascading multi-bounce trajectories",
  animator: (c, ctx, mouse) => {
    let bullets = [], t = 0, id;
    const shoot = () => {
      bullets.push({ x: c.width / 2 + (Math.random() - 0.5) * 100, y: c.height / 2, vx: (Math.random() - 0.5) * 14, vy: (Math.random() - 0.5) * 14, bounces: 0, trail: [], hue: Math.random() * 360 });
    };
    shoot();
    const loop = () => {
      t += 0.016;
      if (Math.floor(t * 60) % 120 === 0) shoot();
      ctx.fillStyle = "rgba(0,0,0,0.35)";
      ctx.fillRect(0, 0, c.width, c.height);
      bullets = bullets.filter(b => b.bounces < 10);
      bullets.forEach(b => {
        b.x += b.vx; b.y += b.vy;
        b.trail.push({ x: b.x, y: b.y });
        if (b.trail.length > 25) b.trail.shift();
        let bounced = false;
        if (b.x < 5) { b.x = 5; b.vx = Math.abs(b.vx); b.bounces++; bounced = true; }
        if (b.x > c.width - 5) { b.x = c.width - 5; b.vx = -Math.abs(b.vx); b.bounces++; bounced = true; }
        if (b.y < 5) { b.y = 5; b.vy = Math.abs(b.vy); b.bounces++; bounced = true; }
        if (b.y > c.height - 5) { b.y = c.height - 5; b.vy = -Math.abs(b.vy); b.bounces++; bounced = true; }
        if (bounced) {
          ctx.beginPath(); ctx.arc(b.x, b.y, 15, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${b.hue},100%,70%,0.4)`; ctx.fill();
        }
        // trail
        if (b.trail.length > 1) {
          ctx.beginPath(); ctx.moveTo(b.trail[0].x, b.trail[0].y);
          b.trail.forEach(pt => ctx.lineTo(pt.x, pt.y));
          ctx.strokeStyle = `hsla(${b.hue},100%,60%,0.5)`; ctx.lineWidth = 2; ctx.stroke();
        }
        ctx.beginPath(); ctx.arc(b.x, b.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${b.hue},100%,80%,0.9)`; ctx.fill();
      });
      id = requestAnimationFrame(loop);
    };
    return { start: loop, stop: () => cancelAnimationFrame(id) };
  }
},

// 39 — Teleport strike blink
{
  name: "Blink Strike",
  tags: ["weapon", "energy", "blade"],
  description: "A blade-wielder blinks through space leaving afterimage ghosts and energy residue",
  animator: (c, ctx, mouse) => {
    let blinks = [], t = 0, id;
    const blink = () => {
      const sx = Math.random() * c.width, sy = Math.random() * c.height;
      const ex = Math.random() * c.width, ey = Math.random() * c.height;
      blinks.push({ sx, sy, ex, ey, life: 1, phase: 0 });
    };
    blink();
    const loop = () => {
      t += 0.016;
      if (Math.floor(t * 60) % 100 === 0) blink();
      ctx.fillStyle = "rgba(0,0,8,0.3)";
      ctx.fillRect(0, 0, c.width, c.height);
      blinks = blinks.filter(b => b.life > 0);
      blinks.forEach(b => {
        b.phase += 0.04; b.life -= 0.012;
        const prog = Math.min(1, b.phase);
        // travel line
        ctx.beginPath(); ctx.moveTo(b.sx, b.sy); ctx.lineTo(b.ex, b.ey);
        ctx.strokeStyle = `rgba(180,100,255,${b.life * 0.3})`; ctx.lineWidth = 1; ctx.setLineDash([5, 10]);
        ctx.stroke(); ctx.setLineDash([]);
        // start afterimage
        for (let i = 0; i < 3; i++) {
          ctx.beginPath();
          ctx.moveTo(b.sx + (Math.random() - 0.5) * 10, b.sy + (Math.random() - 0.5) * 10);
          ctx.lineTo(b.sx + (Math.random() - 0.5) * 30, b.sy + (Math.random() - 0.5) * 30);
          ctx.strokeStyle = `rgba(200,100,255,${b.life * 0.4})`; ctx.lineWidth = 2; ctx.stroke();
        }
        // end position slash
        if (prog > 0.3) {
          const slashR = 30 * b.life;
          ctx.beginPath(); ctx.arc(b.ex, b.ey, slashR, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(255,100,255,${b.life * 0.6})`; ctx.lineWidth = 2; ctx.stroke();
          // slash marks
          for (let j = 0; j < 3; j++) {
            const a = (j / 3) * Math.PI * 2 + b.phase;
            ctx.beginPath();
            ctx.moveTo(b.ex + Math.cos(a) * 10, b.ey + Math.sin(a) * 10);
            ctx.lineTo(b.ex + Math.cos(a) * slashR, b.ey + Math.sin(a) * slashR);
            ctx.strokeStyle = `rgba(255,180,255,${b.life * 0.7})`; ctx.lineWidth = 1.5; ctx.stroke();
          }
          ctx.beginPath(); ctx.arc(b.ex, b.ey, Math.max(0, 6 * b.life), 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,200,255,${b.life})`; ctx.fill();
        }
      });
      id = requestAnimationFrame(loop);
    };
    return { start: loop, stop: () => cancelAnimationFrame(id) };
  }
},

// 40 — Bomb cluster scatter
{
  name: "Cluster Bomb",
  tags: ["weapon", "impact", "explosive"],
  description: "A cluster bomb opens mid-air, scattering dozens of sub-munitions across the ground",
  animator: (c, ctx, mouse) => {
    let clusters = [], submunitions = [], t = 0, id;
    const cluster = () => {
      const x = c.width / 2 + (Math.random() - 0.5) * 200;
      clusters.push({ x, y: 0, vy: 3, opened: false, life: 1 });
    };
    cluster();
    const loop = () => {
      t += 0.016;
      if (Math.floor(t * 60) % 200 === 0) cluster();
      ctx.fillStyle = "rgba(0,0,5,0.35)";
      ctx.fillRect(0, 0, c.width, c.height);
      clusters = clusters.filter(cl => cl.life > 0);
      clusters.forEach(cl => {
        cl.y += cl.vy;
        if (cl.y > c.height * 0.3 && !cl.opened) {
          cl.opened = true;
          for (let i = 0; i < 20; i++) {
            const a = Math.random() * Math.PI * 2;
            const spd = 2 + Math.random() * 5;
            submunitions.push({ x: cl.x, y: cl.y, vx: Math.cos(a) * spd, vy: Math.sin(a) * spd + 1, exploded: false, life: 1, delay: Math.random() * 60 });
          }
          cl.life = 0;
        }
        ctx.beginPath(); ctx.arc(cl.x, cl.y, 8, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(150,130,50,0.9)"; ctx.fill();
        ctx.beginPath(); ctx.moveTo(cl.x, cl.y - 8); ctx.lineTo(cl.x, cl.y - 20);
        ctx.strokeStyle = "rgba(200,100,0,0.5)"; ctx.lineWidth = 3; ctx.stroke();
      });
      submunitions = submunitions.filter(s => s.life > 0);
      submunitions.forEach(s => {
        if (s.delay > 0) { s.delay--; return; }
        if (!s.exploded) {
          s.x += s.vx; s.y += s.vy; s.vy += 0.2;
          ctx.beginPath(); ctx.arc(s.x, s.y, 4, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(200,180,50,0.8)"; ctx.fill();
          if (s.y > c.height * 0.75) { s.exploded = true; s.er = 0; }
        } else {
          s.er = Math.min((s.er || 0) + 3, 40); s.life -= 0.02;
          const eg = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.er);
          eg.addColorStop(0, `rgba(255,200,0,${s.life})`); eg.addColorStop(1, "rgba(255,80,0,0)");
          ctx.beginPath(); ctx.arc(s.x, s.y, s.er, 0, Math.PI * 2);
          ctx.fillStyle = eg; ctx.fill();
        }
      });
      id = requestAnimationFrame(loop);
    };
    return { start: loop, stop: () => cancelAnimationFrame(id) };
  }
},

// 41 — Crossfire laser grid
{
  name: "Crossfire Laser Grid",
  tags: ["weapon", "energy", "charge"],
  description: "Multiple automated laser emitters fire crossing beams, creating a deadly energy grid",
  animator: (c, ctx, mouse) => {
    let t = 0, id;
    const emitters = [
      { x: 0, y: c.height * 0.2, angle: 0.2, hue: 0 },
      { x: 0, y: c.height * 0.8, angle: -0.2, hue: 120 },
      { x: c.width, y: c.height * 0.3, angle: Math.PI - 0.3, hue: 240 },
      { x: c.width, y: c.height * 0.7, angle: Math.PI + 0.3, hue: 60 },
    ];
    const loop = () => {
      t += 0.016;
      ctx.fillStyle = "rgba(0,0,5,0.35)";
      ctx.fillRect(0, 0, c.width, c.height);
      emitters.forEach(em => {
        const swingAngle = em.angle + Math.sin(t * 0.8 + em.hue * 0.01) * 0.3;
        const ex = em.x + Math.cos(swingAngle) * 2000;
        const ey = em.y + Math.sin(swingAngle) * 2000;
        // laser
        ctx.beginPath(); ctx.moveTo(em.x, em.y); ctx.lineTo(ex, ey);
        ctx.strokeStyle = `hsla(${em.hue},100%,65%,0.8)`; ctx.lineWidth = 2; ctx.stroke();
        ctx.strokeStyle = `hsla(${em.hue},100%,50%,0.15)`; ctx.lineWidth = 12; ctx.stroke();
        // emitter
        ctx.beginPath(); ctx.arc(em.x, em.y, 8, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${em.hue},100%,70%,0.9)`; ctx.fill();
      });
      // intersection sparks
      for (let i = 0; i < emitters.length; i++) {
        for (let j = i + 1; j < emitters.length; j++) {
          const e1 = emitters[i], e2 = emitters[j];
          const a1 = e1.angle + Math.sin(t * 0.8 + e1.hue * 0.01) * 0.3;
          const a2 = e2.angle + Math.sin(t * 0.8 + e2.hue * 0.01) * 0.3;
          // approximate intersection
          const dx1 = Math.cos(a1), dy1 = Math.sin(a1);
          const dx2 = Math.cos(a2), dy2 = Math.sin(a2);
          const denom = dx1 * dy2 - dy1 * dx2;
          if (Math.abs(denom) > 0.01) {
            const t1 = ((e2.x - e1.x) * dy2 - (e2.y - e1.y) * dx2) / denom;
            const ix = e1.x + dx1 * t1, iy = e1.y + dy1 * t1;
            if (ix > 0 && ix < c.width && iy > 0 && iy < c.height) {
              ctx.beginPath(); ctx.arc(ix, iy, 6, 0, Math.PI * 2);
              ctx.fillStyle = "rgba(255,255,255,0.8)"; ctx.fill();
              ctx.beginPath(); ctx.arc(ix, iy, 14, 0, Math.PI * 2);
              ctx.fillStyle = "rgba(255,255,255,0.15)"; ctx.fill();
            }
          }
        }
      }
      id = requestAnimationFrame(loop);
    };
    return { start: loop, stop: () => cancelAnimationFrame(id) };
  }
},

// 42 — Bullet hell pattern
{
  name: "Bullet Hell Spiral",
  tags: ["weapon", "charge", "energy"],
  description: "A boss-style bullet hell emitter fires complex radial spiral patterns of energy shots",
  animator: (c, ctx, mouse) => {
    let bullets = [], t = 0, id, angle = 0;
    const cx = c.width / 2, cy = c.height / 2;
    const loop = () => {
      t += 0.016; angle += 0.04;
      ctx.fillStyle = "rgba(0,0,8,0.35)";
      ctx.fillRect(0, 0, c.width, c.height);
      // emit in spiral pattern
      if (Math.floor(t * 60) % 3 === 0) {
        const arms = 5;
        for (let a = 0; a < arms; a++) {
          const ba = angle + (a / arms) * Math.PI * 2;
          const spd = 3;
          bullets.push({ x: cx, y: cy, vx: Math.cos(ba) * spd, vy: Math.sin(ba) * spd, hue: (ba * 180 / Math.PI + t * 60) % 360, life: 1, size: 4 });
        }
      }
      // second pattern: ring burst
      if (Math.floor(t * 60) % 120 === 0) {
        const count = 24;
        for (let i = 0; i < count; i++) {
          const ba = (i / count) * Math.PI * 2;
          bullets.push({ x: cx, y: cy, vx: Math.cos(ba) * 5, vy: Math.sin(ba) * 5, hue: 200 + i * 3, life: 1, size: 6 });
        }
      }
      ctx.beginPath(); ctx.arc(cx, cy, 15, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255,100,255,0.8)"; ctx.fill();
      ctx.beginPath(); ctx.arc(cx, cy, 25 + Math.sin(t * 5) * 5, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(255,100,255,0.3)"; ctx.lineWidth = 2; ctx.stroke();
      bullets = bullets.filter(b => b.life > 0 && b.x > -10 && b.x < c.width + 10 && b.y > -10 && b.y < c.height + 10);
      bullets.forEach(b => {
        b.x += b.vx; b.y += b.vy; b.life -= 0.01;
        ctx.beginPath(); ctx.arc(b.x, b.y, b.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${b.hue},100%,70%,${b.life * 0.8})`; ctx.fill();
        ctx.beginPath(); ctx.arc(b.x, b.y, b.size + 3, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${b.hue},100%,70%,${b.life * 0.2})`; ctx.fill();
      });
      id = requestAnimationFrame(loop);
    };
    return { start: loop, stop: () => cancelAnimationFrame(id) };
  }
},

// 43 — Area shockwave stomp
{
  name: "Ground Stomp Shockwave",
  tags: ["weapon", "impact", "energy"],
  description: "A heavy impact stomp sends a ground-hugging shockwave ring cracking across the battlefield",
  animator: (c, ctx, mouse) => {
    let stomps = [], cracks = [], t = 0, id;
    const stomp = () => {
      const x = 60 + Math.random() * (c.width - 120);
      const y = c.height * 0.75;
      stomps.push({ x, y, r: 5, life: 1 });
      for (let i = 0; i < 8; i++) {
        const a = (i / 8) * Math.PI * 2;
        cracks.push({ x, y, angle: a, len: 0, maxLen: 60 + Math.random() * 80, life: 1 });
      }
    };
    stomp();
    const loop = () => {
      t += 0.016;
      if (Math.floor(t * 60) % 150 === 0) stomp();
      ctx.fillStyle = "rgba(0,0,0,0.35)";
      ctx.fillRect(0, 0, c.width, c.height);
      // ground line
      ctx.fillStyle = "rgba(40,30,20,0.6)";
      ctx.fillRect(0, c.height * 0.75, c.width, c.height * 0.25);
      stomps = stomps.filter(s => s.life > 0);
      stomps.forEach(s => {
        s.r += 6; s.life -= 0.015;
        ctx.beginPath(); ctx.ellipse(s.x, s.y, s.r, s.r * 0.2, 0, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255,180,50,${s.life * 0.8})`; ctx.lineWidth = 3; ctx.stroke();
        ctx.beginPath(); ctx.ellipse(s.x, s.y, s.r * 0.6, s.r * 0.12, 0, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255,220,100,${s.life * 0.5})`; ctx.lineWidth = 2; ctx.stroke();
        // dust
        for (let i = 0; i < 3; i++) {
          const da = Math.random() * Math.PI * 2;
          const dr = s.r * (0.5 + Math.random() * 0.5);
          ctx.beginPath(); ctx.arc(s.x + Math.cos(da) * dr, s.y + Math.sin(da) * dr * 0.2, Math.max(0, 5 * s.life), 0, Math.PI * 2);
          ctx.fillStyle = `rgba(200,150,100,${s.life * 0.3})`; ctx.fill();
        }
      });
      cracks = cracks.filter(cr => cr.life > 0);
      cracks.forEach(cr => {
        cr.len = Math.min(cr.len + 3, cr.maxLen); cr.life -= 0.008;
        const ex = cr.x + Math.cos(cr.angle) * cr.len;
        const ey = cr.y + Math.sin(cr.angle) * cr.len * 0.2;
        ctx.beginPath(); ctx.moveTo(cr.x, cr.y); ctx.lineTo(ex, ey);
        ctx.strokeStyle = `rgba(255,150,0,${cr.life * 0.6})`; ctx.lineWidth = 2; ctx.stroke();
        // glow
        ctx.strokeStyle = `rgba(255,100,0,${cr.life * 0.2})`; ctx.lineWidth = 6; ctx.stroke();
      });
      id = requestAnimationFrame(loop);
    };
    return { start: loop, stop: () => cancelAnimationFrame(id) };
  }
},

// 44 — Leeching dark energy drain
{
  name: "Dark Energy Drain",
  tags: ["weapon", "charge", "energy"],
  description: "Tendrils of dark energy drain life force from surrounding particles toward a central weapon",
  animator: (c, ctx, mouse) => {
    let orbs = [], t = 0, id;
    for (let i = 0; i < 40; i++) orbs.push({ x: Math.random() * c.width, y: Math.random() * c.height, vx: (Math.random() - 0.5) * 2, vy: (Math.random() - 0.5) * 2, hue: Math.random() * 60 + 80, size: 4 + Math.random() * 8, draining: false });
    const cx = c.width / 2, cy = c.height / 2;
    let drainPower = 0;
    const loop = () => {
      t += 0.02;
      ctx.fillStyle = "rgba(0,0,5,0.3)";
      ctx.fillRect(0, 0, c.width, c.height);
      orbs.forEach(orb => {
        const dx = cx - orb.x, dy = cy - orb.y;
        const d = Math.sqrt(dx * dx + dy * dy) + 1;
        const draining = d < 200;
        orb.draining = draining;
        if (draining) {
          orb.vx += (dx / d) * 0.3; orb.vy += (dy / d) * 0.3;
          drainPower = Math.min(1, drainPower + 0.001);
          // tendril
          ctx.beginPath(); ctx.moveTo(orb.x, orb.y); ctx.lineTo(cx, cy);
          const steps = 5;
          ctx.beginPath(); ctx.moveTo(orb.x, orb.y);
          for (let s = 0; s <= steps; s++) {
            const frac = s / steps;
            const wx = orb.x + dx * frac + Math.sin(t * 3 + s) * 15;
            const wy = orb.y + dy * frac + Math.cos(t * 3 + s) * 15;
            ctx.lineTo(wx, wy);
          }
          ctx.strokeStyle = `hsla(${orb.hue},80%,40%,${(1 - d / 200) * 0.5})`; ctx.lineWidth = 1.5; ctx.stroke();
        }
        orb.vx *= 0.97; orb.vy *= 0.97;
        orb.x += orb.vx; orb.y += orb.vy;
        if (orb.x < 0) orb.x = c.width; if (orb.x > c.width) orb.x = 0;
        if (orb.y < 0) orb.y = c.height; if (orb.y > c.height) orb.y = 0;
        if (d < 20) { orb.x = Math.random() * c.width; orb.y = Math.random() * c.height; orb.vx = (Math.random() - 0.5) * 2; orb.vy = (Math.random() - 0.5) * 2; }
        ctx.beginPath(); ctx.arc(orb.x, orb.y, orb.size * (draining ? 0.6 : 1), 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${orb.hue},100%,${draining ? 30 : 60}%,0.8)`; ctx.fill();
      });
      // drain core
      drainPower *= 0.995;
      const cg = ctx.createRadialGradient(cx, cy, 0, cx, cy, 30 + drainPower * 40);
      cg.addColorStop(0, `rgba(80,0,120,${0.5 + drainPower * 0.4})`);
      cg.addColorStop(0.5, `rgba(40,0,80,${0.3 + drainPower * 0.3})`);
      cg.addColorStop(1, "rgba(20,0,40,0)");
      ctx.beginPath(); ctx.arc(cx, cy, 30 + drainPower * 40, 0, Math.PI * 2);
      ctx.fillStyle = cg; ctx.fill();
      ctx.beginPath(); ctx.arc(cx, cy, 10, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(200,0,255,${0.5 + drainPower * 0.5})`; ctx.fill();
      id = requestAnimationFrame(loop);
    };
    return { start: loop, stop: () => cancelAnimationFrame(id) };
  }
},

// 45 — Energy wave surf
{
  name: "Tidal Wave Slash",
  tags: ["weapon", "energy", "blade"],
  description: "A massive energy tidal wave sweeps across the screen, cresting and crashing",
  animator: (c, ctx, mouse) => {
    let t = 0, id, waves = [];
    const spawnWave = () => {
      waves.push({ x: -100, speed: 4 + Math.random() * 3, hue: 180 + Math.random() * 60, life: 1 });
    };
    spawnWave();
    const loop = () => {
      t += 0.016;
      if (Math.floor(t * 60) % 180 === 0) spawnWave();
      ctx.fillStyle = "rgba(0,5,15,0.35)";
      ctx.fillRect(0, 0, c.width, c.height);
      waves = waves.filter(w => w.x < c.width + 150 && w.life > 0);
      waves.forEach(w => {
        w.x += w.speed;
        // main wave body
        ctx.beginPath();
        for (let px = w.x - 200; px < w.x + 50; px += 4) {
          const dist = px - w.x;
          const height = Math.exp(-dist * dist / 5000) * 120;
          const wobble = Math.sin((px + t * 100) * 0.05) * 20 * (1 - Math.abs(dist) / 200);
          const py = c.height * 0.6 - height + wobble;
          px === w.x - 200 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
        }
        ctx.lineTo(w.x + 50, c.height);
        ctx.lineTo(w.x - 200, c.height);
        ctx.closePath();
        const wg = ctx.createLinearGradient(0, c.height * 0.4, 0, c.height * 0.7);
        wg.addColorStop(0, `hsla(${w.hue},100%,70%,${w.life * 0.8})`);
        wg.addColorStop(0.5, `hsla(${w.hue},80%,50%,${w.life * 0.5})`);
        wg.addColorStop(1, `hsla(${w.hue},60%,30%,${w.life * 0.2})`);
        ctx.fillStyle = wg; ctx.fill();
        // crest foam
        ctx.beginPath();
        for (let px = w.x - 150; px < w.x + 30; px += 4) {
          const dist = px - w.x;
          const height = Math.exp(-dist * dist / 5000) * 120;
          const wobble = Math.sin((px + t * 100) * 0.05) * 20 * (1 - Math.abs(dist) / 200);
          const py = c.height * 0.6 - height + wobble;
          px === w.x - 150 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
        }
        ctx.strokeStyle = `rgba(255,255,255,${w.life * 0.8})`; ctx.lineWidth = 4; ctx.stroke();
        w.life -= 0.004;
      });
      id = requestAnimationFrame(loop);
    };
    return { start: loop, stop: () => cancelAnimationFrame(id) };
  }
},

// 46 — Gunshot wall dent physics
{
  name: "Wall Penetration",
  tags: ["weapon", "impact", "blade"],
  description: "Rounds punch through a target wall, spawning entry holes, exit craters and through-flies",
  animator: (c, ctx, mouse) => {
    let bullets = [], holes = [], t = 0, id;
    const wallX = c.width * 0.5;
    const shoot = () => {
      bullets.push({ x: 0, y: 50 + Math.random() * (c.height - 100), vx: 12, trail: [], passed: false });
    };
    shoot();
    const loop = () => {
      t += 0.016;
      if (Math.floor(t * 60) % 60 === 0) shoot();
      ctx.fillStyle = "rgba(0,0,0,0.35)";
      ctx.fillRect(0, 0, c.width, c.height);
      // wall
      ctx.fillStyle = "rgba(60,50,40,0.8)";
      ctx.fillRect(wallX - 10, 0, 20, c.height);
      ctx.strokeStyle = "rgba(80,70,55,0.5)"; ctx.lineWidth = 1;
      for (let y = 0; y < c.height; y += 30) {
        ctx.beginPath(); ctx.moveTo(wallX - 10, y); ctx.lineTo(wallX + 10, y); ctx.stroke();
      }
      // bullet holes
      holes.forEach(h => {
        ctx.beginPath(); ctx.arc(wallX, h.y, h.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(20,15,10,0.9)"; ctx.fill();
        ctx.beginPath(); ctx.arc(wallX, h.y, h.r + 3, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(100,70,50,0.6)"; ctx.lineWidth = 2; ctx.stroke();
      });
      bullets = bullets.filter(b => b.x < c.width + 20);
      bullets.forEach(b => {
        b.x += b.vx;
        b.trail.push({ x: b.x, y: b.y });
        if (b.trail.length > 20) b.trail.shift();
        // wall penetration
        if (b.x >= wallX && !b.passed) {
          b.passed = true; b.vx *= 0.5;
          holes.push({ y: b.y, r: 5 });
          // debris spray
          for (let i = 0; i < 10; i++) {
            const a = (Math.random() - 0.5) * Math.PI;
            ctx.beginPath();
            ctx.moveTo(wallX, b.y);
            ctx.lineTo(wallX + Math.cos(a) * (10 + Math.random() * 20), b.y + Math.sin(a) * (10 + Math.random() * 20));
            ctx.strokeStyle = "rgba(200,150,80,0.7)"; ctx.lineWidth = 1.5; ctx.stroke();
          }
        }
        b.trail.forEach((pt, i) => {
          const past = pt.x < wallX;
          ctx.beginPath(); ctx.arc(pt.x, pt.y, 2.5 * (i / b.trail.length), 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,220,100,${(i / b.trail.length) * (past ? 0.4 : 0.2)})`; ctx.fill();
        });
        ctx.beginPath(); ctx.arc(b.x, b.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(220,200,100,${b.passed ? 0.5 : 0.9})`; ctx.fill();
      });
      id = requestAnimationFrame(loop);
    };
    return { start: loop, stop: () => cancelAnimationFrame(id) };
  }
},

// 47 — Energy barrier pulse
{
  name: "Energy Barrier Pulse",
  tags: ["weapon", "charge", "energy"],
  description: "Hexagonal energy barrier panels pulse and flash when struck by incoming fire",
  animator: (c, ctx, mouse) => {
    let t = 0, id, impacts = [];
    const panels = [];
    const hexR = 35;
    const cols = Math.ceil(c.width / (hexR * 1.7));
    const rows = Math.ceil(c.height / (hexR * 1.5));
    for (let col = 0; col < cols; col++) {
      for (let row = 0; row < rows; row++) {
        const x = col * hexR * 1.75;
        const y = row * hexR * 1.5 + (col % 2 === 0 ? 0 : hexR * 0.75);
        panels.push({ x, y, charge: Math.random(), flash: 0 });
      }
    }
    const loop = () => {
      t += 0.016;
      ctx.fillStyle = "rgba(0,5,15,0.3)";
      ctx.fillRect(0, 0, c.width, c.height);
      if (Math.random() < 0.05) {
        const panel = panels[Math.floor(Math.random() * panels.length)];
        panel.flash = 1;
        impacts.push({ x: panel.x, y: panel.y, r: 5, life: 1 });
      }
      panels.forEach(p => {
        p.charge = 0.3 + Math.sin(t + p.x * 0.01 + p.y * 0.008) * 0.3;
        p.flash = Math.max(0, p.flash - 0.04);
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
          const a = (i / 6) * Math.PI * 2 + Math.PI / 6;
          i === 0 ? ctx.moveTo(p.x + Math.cos(a) * hexR, p.y + Math.sin(a) * hexR)
            : ctx.lineTo(p.x + Math.cos(a) * hexR, p.y + Math.sin(a) * hexR);
        }
        ctx.closePath();
        ctx.fillStyle = `rgba(20,60,120,${0.05 + p.charge * 0.1 + p.flash * 0.3})`;
        ctx.fill();
        ctx.strokeStyle = `rgba(80,160,255,${0.2 + p.charge * 0.3 + p.flash * 0.5})`;
        ctx.lineWidth = 1 + p.flash; ctx.stroke();
      });
      impacts = impacts.filter(im => im.life > 0);
      impacts.forEach(im => {
        im.r += 4; im.life -= 0.04;
        ctx.beginPath(); ctx.arc(im.x, im.y, im.r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(200,230,255,${im.life * 0.8})`; ctx.lineWidth = 2; ctx.stroke();
      });
      id = requestAnimationFrame(loop);
    };
    return { start: loop, stop: () => cancelAnimationFrame(id) };
  }
},

// 48 — Cannon ball chain reaction
{
  name: "Chain Reaction",
  tags: ["weapon", "impact", "explosive"],
  description: "A single impact detonation triggers a cascading chain reaction of secondary explosions",
  animator: (c, ctx, mouse) => {
    let explosions = [], t = 0, id;
    const explode = (x, y, depth) => {
      if (depth <= 0) return;
      explosions.push({ x, y, r: 0, life: 1, depth, children: false });
    };
    explode(c.width * 0.15, c.height / 2, 5);
    const loop = () => {
      t += 0.016;
      if (Math.floor(t * 60) % 300 === 0) explode(c.width * 0.15, c.height / 2, 5);
      ctx.fillStyle = "rgba(0,0,0,0.35)";
      ctx.fillRect(0, 0, c.width, c.height);
      explosions = explosions.filter(e => e.life > 0);
      explosions.forEach(e => {
        e.r += 3; e.life -= 0.015;
        if (e.r > 40 && !e.children && e.depth > 0) {
          e.children = true;
          const count = 2 + e.depth;
          for (let i = 0; i < count; i++) {
            const a = Math.random() * Math.PI * 2;
            const dist = 40 + Math.random() * 60;
            explode(e.x + Math.cos(a) * dist, e.y + Math.sin(a) * dist, e.depth - 1);
          }
        }
        const hue = 10 + (5 - e.depth) * 30;
        const eg = ctx.createRadialGradient(e.x, e.y, 0, e.x, e.y, e.r);
        eg.addColorStop(0, `hsla(${hue + 40},100%,80%,${e.life * 0.7})`);
        eg.addColorStop(0.4, `hsla(${hue},100%,50%,${e.life * 0.4})`);
        eg.addColorStop(1, "rgba(0,0,0,0)");
        ctx.beginPath(); ctx.arc(e.x, e.y, e.r, 0, Math.PI * 2);
        ctx.fillStyle = eg; ctx.fill();
        ctx.beginPath(); ctx.arc(e.x, e.y, e.r, 0, Math.PI * 2);
        ctx.strokeStyle = `hsla(${hue + 20},100%,70%,${e.life * 0.5})`; ctx.lineWidth = 2; ctx.stroke();
      });
      id = requestAnimationFrame(loop);
    };
    return { start: loop, stop: () => cancelAnimationFrame(id) };
  }
},

// 49 — Photon torpedo volley
{
  name: "Photon Torpedo Volley",
  tags: ["weapon", "energy", "charge"],
  description: "A volley of glowing photon torpedoes fire in formation and spiral toward targets",
  animator: (c, ctx, mouse) => {
    let torpedoes = [], t = 0, id;
    const volley = () => {
      const count = 5;
      for (let i = 0; i < count; i++) {
        torpedoes.push({
          x: 30, y: c.height * 0.5 + (i - count / 2) * 40,
          vx: 6 + Math.random() * 2, vy: (Math.random() - 0.5) * 2,
          trail: [], hue: 160 + i * 20, spiralPhase: i * 0.5
        });
      }
    };
    volley();
    const loop = () => {
      t += 0.02;
      if (Math.floor(t * 60) % 180 === 0) volley();
      ctx.fillStyle = "rgba(0,0,10,0.35)";
      ctx.fillRect(0, 0, c.width, c.height);
      torpedoes = torpedoes.filter(tp => tp.x < c.width + 20);
      torpedoes.forEach(tp => {
        // spiral component
        const spiral = Math.sin(t * 4 + tp.spiralPhase) * 1.5;
        tp.x += tp.vx; tp.y += tp.vy + spiral;
        tp.trail.push({ x: tp.x, y: tp.y });
        if (tp.trail.length > 30) tp.trail.shift();
        // engine glow trail
        if (tp.trail.length > 1) {
          ctx.beginPath(); ctx.moveTo(tp.trail[0].x, tp.trail[0].y);
          tp.trail.forEach(pt => ctx.lineTo(pt.x, pt.y));
          ctx.strokeStyle = `hsla(${tp.hue},100%,60%,0.5)`; ctx.lineWidth = 3; ctx.stroke();
          ctx.strokeStyle = `hsla(${tp.hue},100%,80%,0.15)`; ctx.lineWidth = 8; ctx.stroke();
        }
        // torpedo body
        ctx.save(); ctx.translate(tp.x, tp.y); ctx.rotate(Math.atan2(tp.vy + spiral, tp.vx));
        ctx.beginPath();
        ctx.moveTo(12, 0); ctx.lineTo(-6, -4); ctx.lineTo(-6, 4); ctx.closePath();
        ctx.fillStyle = `hsla(${tp.hue},100%,75%,0.9)`; ctx.fill();
        ctx.restore();
        // energy core glow
        const tg = ctx.createRadialGradient(tp.x, tp.y, 0, tp.x, tp.y, 12);
        tg.addColorStop(0, `hsla(${tp.hue},100%,90%,0.8)`);
        tg.addColorStop(1, `hsla(${tp.hue},100%,60%,0)`);
        ctx.beginPath(); ctx.arc(tp.x, tp.y, 12, 0, Math.PI * 2);
        ctx.fillStyle = tg; ctx.fill();
      });
      id = requestAnimationFrame(loop);
    };
    return { start: loop, stop: () => cancelAnimationFrame(id) };
  }
},

// 50 — Berserker combo strike combo counter
{
  name: "Berserker Combo Strikes",
  tags: ["weapon", "blade", "impact"],
  description: "Rapid combo strikes build in intensity, flashing velocity lines and impact markers per hit",
  animator: (c, ctx, mouse) => {
    let strikes = [], comboCount = 0, comboLife = 0, t = 0, id;
    const strike = () => {
      comboCount++;
      comboLife = 1;
      const cx = c.width / 2, cy = c.height / 2;
      const angle = Math.random() * Math.PI * 2;
      const slashLen = 80 + comboCount * 15;
      strikes.push({
        sx: cx + Math.cos(angle + 0.8) * slashLen * 0.5, sy: cy + Math.sin(angle + 0.8) * slashLen * 0.5,
        ex: cx + Math.cos(angle - 0.8) * slashLen * 0.5, ey: cy + Math.sin(angle - 0.8) * slashLen * 0.5,
        life: 1, combo: comboCount
      });
    };
    const loop = () => {
      t += 0.016;
      if (Math.floor(t * 60) % 25 === 0) strike();
      if (Math.floor(t * 60) % 200 === 0) comboCount = 0;
      comboLife = Math.max(0, comboLife - 0.02);
      ctx.fillStyle = "rgba(5,0,0,0.4)";
      ctx.fillRect(0, 0, c.width, c.height);
      const intensity = Math.min(1, comboCount / 10);
      // screen vignette on high combo
      if (intensity > 0.5) {
        const vg = ctx.createRadialGradient(c.width / 2, c.height / 2, c.height * 0.2, c.width / 2, c.height / 2, c.height);
        vg.addColorStop(0, "rgba(0,0,0,0)");
        vg.addColorStop(1, `rgba(150,0,0,${(intensity - 0.5) * 0.3})`);
        ctx.fillStyle = vg; ctx.fillRect(0, 0, c.width, c.height);
      }
      strikes = strikes.filter(s => s.life > 0);
      strikes.forEach(s => {
        s.life -= 0.04;
        const hue = Math.min(s.combo * 10, 30);
        // speed lines
        for (let i = 0; i < 5; i++) {
          const frac = i / 5;
          const mx = s.sx + (s.ex - s.sx) * frac, my = s.sy + (s.ey - s.sy) * frac;
          const perp = Math.atan2(s.ey - s.sy, s.ex - s.sx) + Math.PI / 2;
          const len = 20 + s.combo * 5;
          ctx.beginPath(); ctx.moveTo(mx + Math.cos(perp) * len * 0.3, my + Math.sin(perp) * len * 0.3);
          ctx.lineTo(mx - Math.cos(perp) * len, my - Math.sin(perp) * len);
          ctx.strokeStyle = `hsla(${hue},100%,80%,${s.life * 0.6})`; ctx.lineWidth = 1.5 + s.combo * 0.3; ctx.stroke();
        }
        // main slash
        ctx.beginPath(); ctx.moveTo(s.sx, s.sy); ctx.lineTo(s.ex, s.ey);
        ctx.strokeStyle = `hsla(${hue},100%,80%,${s.life * 0.9})`; ctx.lineWidth = 3 + s.combo * 0.5; ctx.stroke();
        ctx.strokeStyle = `hsla(${hue + 20},100%,60%,${s.life * 0.2})`; ctx.lineWidth = 10 + s.combo * 1; ctx.stroke();
        // impact flash
        if (s.life > 0.7) {
          ctx.beginPath(); ctx.arc(s.ex, s.ey, Math.max(0, (1 - s.life) * 30), 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${hue + 40},100%,90%,${s.life * 0.4})`; ctx.fill();
        }
      });
      // combo counter text
      if (comboCount > 1) {
        ctx.font = `bold ${40 + comboCount * 3}px monospace`;
        ctx.fillStyle = `hsla(${Math.min(comboCount * 10, 30)},100%,70%,${comboLife * 0.9})`;
        ctx.fillText(`${comboCount}x COMBO`, c.width / 2 - 80, c.height * 0.2);
      }
      id = requestAnimationFrame(loop);
    };
    return { start: loop, stop: () => cancelAnimationFrame(id) };
  }
},

];

// ────────────────────────────────────────────────────────────
//  UI / HUD FX (50 effects)
// ────────────────────────────────────────────────────────────

export const hudEffects = [

{
  name:"Holo Cursor Bloom",
  tags:["ui","hud","interface"],
  description:"Holo Cursor Bloom — particle effect with dynamic motion",
  code:`// Holo Cursor Bloom animation code`,
  animator:(c,ctx,mouse)=>{
    let t=0,nodes=[],id;
    for(let j=0;j<8;j++)
      nodes.push({x:Math.random()*c.width,y:Math.random()*c.height,active:0,phase:Math.random()*Math.PI*2});
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(0,5,10,0.25)";
      ctx.fillRect(0,0,c.width,c.height);
      nodes.forEach(n=>{
        const d=Math.hypot(n.x-mouse.x,n.y-mouse.y);
        n.active=Math.max(0,Math.min(1,1-d/100));
        nodes.forEach(m=>{
          const md=Math.hypot(n.x-m.x,n.y-m.y);
          if(md<120){
            ctx.strokeStyle=`rgba(0,200,150,${(n.active+m.active)*0.3})`;
            ctx.lineWidth=1;
            ctx.beginPath();ctx.moveTo(n.x,n.y);ctx.lineTo(m.x,m.y);ctx.stroke();
          }
        });
        const pulse=(Math.sin(t*3+n.phase)+1)/2;
        ctx.fillStyle=`rgba(0,200,150,${0.4+n.active*0.6})`;
        ctx.fillRect(n.x-3,n.y-3,6,6);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Data Panel Slide",
  tags:["hud","interface","hologram"],
  description:"Data Panel Slide — particle effect with dynamic motion",
  code:`// Data Panel Slide animation code`,
  animator:(c,ctx,mouse)=>{
    let t=0,nodes=[],id;
    for(let j=0;j<9;j++)
      nodes.push({x:Math.random()*c.width,y:Math.random()*c.height,active:0,phase:Math.random()*Math.PI*2});
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(0,5,10,0.25)";
      ctx.fillRect(0,0,c.width,c.height);
      nodes.forEach(n=>{
        const d=Math.hypot(n.x-mouse.x,n.y-mouse.y);
        n.active=Math.max(0,Math.min(1,1-d/101));
        nodes.forEach(m=>{
          const md=Math.hypot(n.x-m.x,n.y-m.y);
          if(md<121){
            ctx.strokeStyle=`rgba(0,200,150,${(n.active+m.active)*0.3})`;
            ctx.lineWidth=1;
            ctx.beginPath();ctx.moveTo(n.x,n.y);ctx.lineTo(m.x,m.y);ctx.stroke();
          }
        });
        const pulse=(Math.sin(t*3+n.phase)+1)/2;
        ctx.fillStyle=`rgba(0,200,150,${0.4+n.active*0.6})`;
        ctx.fillRect(n.x-3,n.y-3,6,6);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Radar Sweep Ring",
  tags:["interface","hologram","data"],
  description:"Radar Sweep Ring — particle effect with dynamic motion",
  code:`// Radar Sweep Ring animation code`,
  animator:(c,ctx,mouse)=>{
    let t=0,nodes=[],id;
    for(let j=0;j<10;j++)
      nodes.push({x:Math.random()*c.width,y:Math.random()*c.height,active:0,phase:Math.random()*Math.PI*2});
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(0,5,10,0.25)";
      ctx.fillRect(0,0,c.width,c.height);
      nodes.forEach(n=>{
        const d=Math.hypot(n.x-mouse.x,n.y-mouse.y);
        n.active=Math.max(0,Math.min(1,1-d/102));
        nodes.forEach(m=>{
          const md=Math.hypot(n.x-m.x,n.y-m.y);
          if(md<122){
            ctx.strokeStyle=`rgba(0,200,150,${(n.active+m.active)*0.3})`;
            ctx.lineWidth=1;
            ctx.beginPath();ctx.moveTo(n.x,n.y);ctx.lineTo(m.x,m.y);ctx.stroke();
          }
        });
        const pulse=(Math.sin(t*3+n.phase)+1)/2;
        ctx.fillStyle=`rgba(0,200,150,${0.4+n.active*0.6})`;
        ctx.fillRect(n.x-3,n.y-3,6,6);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"UI Node Connector",
  tags:["hologram","data","ui"],
  description:"UI Node Connector — particle effect with dynamic motion",
  code:`// UI Node Connector animation code`,
  animator:(c,ctx,mouse)=>{
    let t=0,nodes=[],id;
    for(let j=0;j<11;j++)
      nodes.push({x:Math.random()*c.width,y:Math.random()*c.height,active:0,phase:Math.random()*Math.PI*2});
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(0,5,10,0.25)";
      ctx.fillRect(0,0,c.width,c.height);
      nodes.forEach(n=>{
        const d=Math.hypot(n.x-mouse.x,n.y-mouse.y);
        n.active=Math.max(0,Math.min(1,1-d/103));
        nodes.forEach(m=>{
          const md=Math.hypot(n.x-m.x,n.y-m.y);
          if(md<123){
            ctx.strokeStyle=`rgba(0,200,150,${(n.active+m.active)*0.3})`;
            ctx.lineWidth=1;
            ctx.beginPath();ctx.moveTo(n.x,n.y);ctx.lineTo(m.x,m.y);ctx.stroke();
          }
        });
        const pulse=(Math.sin(t*3+n.phase)+1)/2;
        ctx.fillStyle=`rgba(0,200,150,${0.4+n.active*0.6})`;
        ctx.fillRect(n.x-3,n.y-3,6,6);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Hologram Grid Pulse",
  tags:["data","ui","hud"],
  description:"Hologram Grid Pulse — particle effect with dynamic motion",
  code:`// Hologram Grid Pulse animation code`,
  animator:(c,ctx,mouse)=>{
    let t=0,nodes=[],id;
    for(let j=0;j<12;j++)
      nodes.push({x:Math.random()*c.width,y:Math.random()*c.height,active:0,phase:Math.random()*Math.PI*2});
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(0,5,10,0.25)";
      ctx.fillRect(0,0,c.width,c.height);
      nodes.forEach(n=>{
        const d=Math.hypot(n.x-mouse.x,n.y-mouse.y);
        n.active=Math.max(0,Math.min(1,1-d/104));
        nodes.forEach(m=>{
          const md=Math.hypot(n.x-m.x,n.y-m.y);
          if(md<124){
            ctx.strokeStyle=`rgba(0,200,150,${(n.active+m.active)*0.3})`;
            ctx.lineWidth=1;
            ctx.beginPath();ctx.moveTo(n.x,n.y);ctx.lineTo(m.x,m.y);ctx.stroke();
          }
        });
        const pulse=(Math.sin(t*3+n.phase)+1)/2;
        ctx.fillStyle=`rgba(0,200,150,${0.4+n.active*0.6})`;
        ctx.fillRect(n.x-3,n.y-3,6,6);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Loading Ring Flow",
  tags:["ui","hud","interface"],
  description:"Loading Ring Flow — particle effect with dynamic motion",
  code:`// Loading Ring Flow animation code`,
  animator:(c,ctx,mouse)=>{
    let t=0,nodes=[],id;
    for(let j=0;j<13;j++)
      nodes.push({x:Math.random()*c.width,y:Math.random()*c.height,active:0,phase:Math.random()*Math.PI*2});
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(0,5,10,0.25)";
      ctx.fillRect(0,0,c.width,c.height);
      nodes.forEach(n=>{
        const d=Math.hypot(n.x-mouse.x,n.y-mouse.y);
        n.active=Math.max(0,Math.min(1,1-d/105));
        nodes.forEach(m=>{
          const md=Math.hypot(n.x-m.x,n.y-m.y);
          if(md<125){
            ctx.strokeStyle=`rgba(0,200,150,${(n.active+m.active)*0.3})`;
            ctx.lineWidth=1;
            ctx.beginPath();ctx.moveTo(n.x,n.y);ctx.lineTo(m.x,m.y);ctx.stroke();
          }
        });
        const pulse=(Math.sin(t*3+n.phase)+1)/2;
        ctx.fillStyle=`rgba(0,200,150,${0.4+n.active*0.6})`;
        ctx.fillRect(n.x-3,n.y-3,6,6);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"System Scan Cascade",
  tags:["hud","interface","hologram"],
  description:"System Scan Cascade — particle effect with dynamic motion",
  code:`// System Scan Cascade animation code`,
  animator:(c,ctx,mouse)=>{
    let t=0,nodes=[],id;
    for(let j=0;j<14;j++)
      nodes.push({x:Math.random()*c.width,y:Math.random()*c.height,active:0,phase:Math.random()*Math.PI*2});
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(0,5,10,0.25)";
      ctx.fillRect(0,0,c.width,c.height);
      nodes.forEach(n=>{
        const d=Math.hypot(n.x-mouse.x,n.y-mouse.y);
        n.active=Math.max(0,Math.min(1,1-d/106));
        nodes.forEach(m=>{
          const md=Math.hypot(n.x-m.x,n.y-m.y);
          if(md<126){
            ctx.strokeStyle=`rgba(0,200,150,${(n.active+m.active)*0.3})`;
            ctx.lineWidth=1;
            ctx.beginPath();ctx.moveTo(n.x,n.y);ctx.lineTo(m.x,m.y);ctx.stroke();
          }
        });
        const pulse=(Math.sin(t*3+n.phase)+1)/2;
        ctx.fillStyle=`rgba(0,200,150,${0.4+n.active*0.6})`;
        ctx.fillRect(n.x-3,n.y-3,6,6);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Floating Icon Swarm",
  tags:["interface","hologram","data"],
  description:"Floating Icon Swarm — particle effect with dynamic motion",
  code:`// Floating Icon Swarm animation code`,
  animator:(c,ctx,mouse)=>{
    let t=0,nodes=[],id;
    for(let j=0;j<15;j++)
      nodes.push({x:Math.random()*c.width,y:Math.random()*c.height,active:0,phase:Math.random()*Math.PI*2});
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(0,5,10,0.25)";
      ctx.fillRect(0,0,c.width,c.height);
      nodes.forEach(n=>{
        const d=Math.hypot(n.x-mouse.x,n.y-mouse.y);
        n.active=Math.max(0,Math.min(1,1-d/107));
        nodes.forEach(m=>{
          const md=Math.hypot(n.x-m.x,n.y-m.y);
          if(md<127){
            ctx.strokeStyle=`rgba(0,200,150,${(n.active+m.active)*0.3})`;
            ctx.lineWidth=1;
            ctx.beginPath();ctx.moveTo(n.x,n.y);ctx.lineTo(m.x,m.y);ctx.stroke();
          }
        });
        const pulse=(Math.sin(t*3+n.phase)+1)/2;
        ctx.fillStyle=`rgba(0,200,150,${0.4+n.active*0.6})`;
        ctx.fillRect(n.x-3,n.y-3,6,6);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"HUD Target Lock",
  tags:["hologram","data","ui"],
  description:"HUD Target Lock — particle effect with dynamic motion",
  code:`// HUD Target Lock animation code`,
  animator:(c,ctx,mouse)=>{
    let t=0,nodes=[],id;
    for(let j=0;j<16;j++)
      nodes.push({x:Math.random()*c.width,y:Math.random()*c.height,active:0,phase:Math.random()*Math.PI*2});
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(0,5,10,0.25)";
      ctx.fillRect(0,0,c.width,c.height);
      nodes.forEach(n=>{
        const d=Math.hypot(n.x-mouse.x,n.y-mouse.y);
        n.active=Math.max(0,Math.min(1,1-d/108));
        nodes.forEach(m=>{
          const md=Math.hypot(n.x-m.x,n.y-m.y);
          if(md<128){
            ctx.strokeStyle=`rgba(0,200,150,${(n.active+m.active)*0.3})`;
            ctx.lineWidth=1;
            ctx.beginPath();ctx.moveTo(n.x,n.y);ctx.lineTo(m.x,m.y);ctx.stroke();
          }
        });
        const pulse=(Math.sin(t*3+n.phase)+1)/2;
        ctx.fillStyle=`rgba(0,200,150,${0.4+n.active*0.6})`;
        ctx.fillRect(n.x-3,n.y-3,6,6);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Notification Pulse Field",
  tags:["data","ui","hud"],
  description:"Notification Pulse Field — particle effect with dynamic motion",
  code:`// Notification Pulse Field animation code`,
  animator:(c,ctx,mouse)=>{
    let t=0,nodes=[],id;
    for(let j=0;j<17;j++)
      nodes.push({x:Math.random()*c.width,y:Math.random()*c.height,active:0,phase:Math.random()*Math.PI*2});
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(0,5,10,0.25)";
      ctx.fillRect(0,0,c.width,c.height);
      nodes.forEach(n=>{
        const d=Math.hypot(n.x-mouse.x,n.y-mouse.y);
        n.active=Math.max(0,Math.min(1,1-d/109));
        nodes.forEach(m=>{
          const md=Math.hypot(n.x-m.x,n.y-m.y);
          if(md<129){
            ctx.strokeStyle=`rgba(0,200,150,${(n.active+m.active)*0.3})`;
            ctx.lineWidth=1;
            ctx.beginPath();ctx.moveTo(n.x,n.y);ctx.lineTo(m.x,m.y);ctx.stroke();
          }
        });
        const pulse=(Math.sin(t*3+n.phase)+1)/2;
        ctx.fillStyle=`rgba(0,200,150,${0.4+n.active*0.6})`;
        ctx.fillRect(n.x-3,n.y-3,6,6);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Interface Bloom Net",
  tags:["ui","hud","interface"],
  description:"Interface Bloom Net — particle effect with dynamic motion",
  code:`// Interface Bloom Net animation code`,
  animator:(c,ctx,mouse)=>{
    let t=0,nodes=[],id;
    for(let j=0;j<8;j++)
      nodes.push({x:Math.random()*c.width,y:Math.random()*c.height,active:0,phase:Math.random()*Math.PI*2});
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(0,5,10,0.25)";
      ctx.fillRect(0,0,c.width,c.height);
      nodes.forEach(n=>{
        const d=Math.hypot(n.x-mouse.x,n.y-mouse.y);
        n.active=Math.max(0,Math.min(1,1-d/110));
        nodes.forEach(m=>{
          const md=Math.hypot(n.x-m.x,n.y-m.y);
          if(md<130){
            ctx.strokeStyle=`rgba(0,200,150,${(n.active+m.active)*0.3})`;
            ctx.lineWidth=1;
            ctx.beginPath();ctx.moveTo(n.x,n.y);ctx.lineTo(m.x,m.y);ctx.stroke();
          }
        });
        const pulse=(Math.sin(t*3+n.phase)+1)/2;
        ctx.fillStyle=`rgba(0,200,150,${0.4+n.active*0.6})`;
        ctx.fillRect(n.x-3,n.y-3,6,6);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"UI Signal Flow",
  tags:["hud","interface","hologram"],
  description:"UI Signal Flow — particle effect with dynamic motion",
  code:`// UI Signal Flow animation code`,
  animator:(c,ctx,mouse)=>{
    let t=0,nodes=[],id;
    for(let j=0;j<9;j++)
      nodes.push({x:Math.random()*c.width,y:Math.random()*c.height,active:0,phase:Math.random()*Math.PI*2});
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(0,5,10,0.25)";
      ctx.fillRect(0,0,c.width,c.height);
      nodes.forEach(n=>{
        const d=Math.hypot(n.x-mouse.x,n.y-mouse.y);
        n.active=Math.max(0,Math.min(1,1-d/111));
        nodes.forEach(m=>{
          const md=Math.hypot(n.x-m.x,n.y-m.y);
          if(md<131){
            ctx.strokeStyle=`rgba(0,200,150,${(n.active+m.active)*0.3})`;
            ctx.lineWidth=1;
            ctx.beginPath();ctx.moveTo(n.x,n.y);ctx.lineTo(m.x,m.y);ctx.stroke();
          }
        });
        const pulse=(Math.sin(t*3+n.phase)+1)/2;
        ctx.fillStyle=`rgba(0,200,150,${0.4+n.active*0.6})`;
        ctx.fillRect(n.x-3,n.y-3,6,6);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Wireframe Panel Drift",
  tags:["interface","hologram","data"],
  description:"Wireframe Panel Drift — particle effect with dynamic motion",
  code:`// Wireframe Panel Drift animation code`,
  animator:(c,ctx,mouse)=>{
    let t=0,nodes=[],id;
    for(let j=0;j<10;j++)
      nodes.push({x:Math.random()*c.width,y:Math.random()*c.height,active:0,phase:Math.random()*Math.PI*2});
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(0,5,10,0.25)";
      ctx.fillRect(0,0,c.width,c.height);
      nodes.forEach(n=>{
        const d=Math.hypot(n.x-mouse.x,n.y-mouse.y);
        n.active=Math.max(0,Math.min(1,1-d/112));
        nodes.forEach(m=>{
          const md=Math.hypot(n.x-m.x,n.y-m.y);
          if(md<132){
            ctx.strokeStyle=`rgba(0,200,150,${(n.active+m.active)*0.3})`;
            ctx.lineWidth=1;
            ctx.beginPath();ctx.moveTo(n.x,n.y);ctx.lineTo(m.x,m.y);ctx.stroke();
          }
        });
        const pulse=(Math.sin(t*3+n.phase)+1)/2;
        ctx.fillStyle=`rgba(0,200,150,${0.4+n.active*0.6})`;
        ctx.fillRect(n.x-3,n.y-3,6,6);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Data Stream Nodes",
  tags:["hologram","data","ui"],
  description:"Data Stream Nodes — particle effect with dynamic motion",
  code:`// Data Stream Nodes animation code`,
  animator:(c,ctx,mouse)=>{
    let t=0,nodes=[],id;
    for(let j=0;j<11;j++)
      nodes.push({x:Math.random()*c.width,y:Math.random()*c.height,active:0,phase:Math.random()*Math.PI*2});
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(0,5,10,0.25)";
      ctx.fillRect(0,0,c.width,c.height);
      nodes.forEach(n=>{
        const d=Math.hypot(n.x-mouse.x,n.y-mouse.y);
        n.active=Math.max(0,Math.min(1,1-d/113));
        nodes.forEach(m=>{
          const md=Math.hypot(n.x-m.x,n.y-m.y);
          if(md<133){
            ctx.strokeStyle=`rgba(0,200,150,${(n.active+m.active)*0.3})`;
            ctx.lineWidth=1;
            ctx.beginPath();ctx.moveTo(n.x,n.y);ctx.lineTo(m.x,m.y);ctx.stroke();
          }
        });
        const pulse=(Math.sin(t*3+n.phase)+1)/2;
        ctx.fillStyle=`rgba(0,200,150,${0.4+n.active*0.6})`;
        ctx.fillRect(n.x-3,n.y-3,6,6);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Holo Window Bloom",
  tags:["data","ui","hud"],
  description:"Holo Window Bloom — particle effect with dynamic motion",
  code:`// Holo Window Bloom animation code`,
  animator:(c,ctx,mouse)=>{
    let t=0,nodes=[],id;
    for(let j=0;j<12;j++)
      nodes.push({x:Math.random()*c.width,y:Math.random()*c.height,active:0,phase:Math.random()*Math.PI*2});
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(0,5,10,0.25)";
      ctx.fillRect(0,0,c.width,c.height);
      nodes.forEach(n=>{
        const d=Math.hypot(n.x-mouse.x,n.y-mouse.y);
        n.active=Math.max(0,Math.min(1,1-d/114));
        nodes.forEach(m=>{
          const md=Math.hypot(n.x-m.x,n.y-m.y);
          if(md<134){
            ctx.strokeStyle=`rgba(0,200,150,${(n.active+m.active)*0.3})`;
            ctx.lineWidth=1;
            ctx.beginPath();ctx.moveTo(n.x,n.y);ctx.lineTo(m.x,m.y);ctx.stroke();
          }
        });
        const pulse=(Math.sin(t*3+n.phase)+1)/2;
        ctx.fillStyle=`rgba(0,200,150,${0.4+n.active*0.6})`;
        ctx.fillRect(n.x-3,n.y-3,6,6);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"System Boot Ring",
  tags:["ui","hud","interface"],
  description:"System Boot Ring — particle effect with dynamic motion",
  code:`// System Boot Ring animation code`,
  animator:(c,ctx,mouse)=>{
    let t=0,nodes=[],id;
    for(let j=0;j<13;j++)
      nodes.push({x:Math.random()*c.width,y:Math.random()*c.height,active:0,phase:Math.random()*Math.PI*2});
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(0,5,10,0.25)";
      ctx.fillRect(0,0,c.width,c.height);
      nodes.forEach(n=>{
        const d=Math.hypot(n.x-mouse.x,n.y-mouse.y);
        n.active=Math.max(0,Math.min(1,1-d/115));
        nodes.forEach(m=>{
          const md=Math.hypot(n.x-m.x,n.y-m.y);
          if(md<135){
            ctx.strokeStyle=`rgba(0,200,150,${(n.active+m.active)*0.3})`;
            ctx.lineWidth=1;
            ctx.beginPath();ctx.moveTo(n.x,n.y);ctx.lineTo(m.x,m.y);ctx.stroke();
          }
        });
        const pulse=(Math.sin(t*3+n.phase)+1)/2;
        ctx.fillStyle=`rgba(0,200,150,${0.4+n.active*0.6})`;
        ctx.fillRect(n.x-3,n.y-3,6,6);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"UI Focus Halo",
  tags:["hud","interface","hologram"],
  description:"UI Focus Halo — particle effect with dynamic motion",
  code:`// UI Focus Halo animation code`,
  animator:(c,ctx,mouse)=>{
    let t=0,nodes=[],id;
    for(let j=0;j<14;j++)
      nodes.push({x:Math.random()*c.width,y:Math.random()*c.height,active:0,phase:Math.random()*Math.PI*2});
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(0,5,10,0.25)";
      ctx.fillRect(0,0,c.width,c.height);
      nodes.forEach(n=>{
        const d=Math.hypot(n.x-mouse.x,n.y-mouse.y);
        n.active=Math.max(0,Math.min(1,1-d/116));
        nodes.forEach(m=>{
          const md=Math.hypot(n.x-m.x,n.y-m.y);
          if(md<136){
            ctx.strokeStyle=`rgba(0,200,150,${(n.active+m.active)*0.3})`;
            ctx.lineWidth=1;
            ctx.beginPath();ctx.moveTo(n.x,n.y);ctx.lineTo(m.x,m.y);ctx.stroke();
          }
        });
        const pulse=(Math.sin(t*3+n.phase)+1)/2;
        ctx.fillStyle=`rgba(0,200,150,${0.4+n.active*0.6})`;
        ctx.fillRect(n.x-3,n.y-3,6,6);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Control Dial Pulse",
  tags:["interface","hologram","data"],
  description:"Control Dial Pulse — particle effect with dynamic motion",
  code:`// Control Dial Pulse animation code`,
  animator:(c,ctx,mouse)=>{
    let t=0,nodes=[],id;
    for(let j=0;j<15;j++)
      nodes.push({x:Math.random()*c.width,y:Math.random()*c.height,active:0,phase:Math.random()*Math.PI*2});
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(0,5,10,0.25)";
      ctx.fillRect(0,0,c.width,c.height);
      nodes.forEach(n=>{
        const d=Math.hypot(n.x-mouse.x,n.y-mouse.y);
        n.active=Math.max(0,Math.min(1,1-d/117));
        nodes.forEach(m=>{
          const md=Math.hypot(n.x-m.x,n.y-m.y);
          if(md<137){
            ctx.strokeStyle=`rgba(0,200,150,${(n.active+m.active)*0.3})`;
            ctx.lineWidth=1;
            ctx.beginPath();ctx.moveTo(n.x,n.y);ctx.lineTo(m.x,m.y);ctx.stroke();
          }
        });
        const pulse=(Math.sin(t*3+n.phase)+1)/2;
        ctx.fillStyle=`rgba(0,200,150,${0.4+n.active*0.6})`;
        ctx.fillRect(n.x-3,n.y-3,6,6);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"UI Feedback Burst",
  tags:["hologram","data","ui"],
  description:"UI Feedback Burst — particle effect with dynamic motion",
  code:`// UI Feedback Burst animation code`,
  animator:(c,ctx,mouse)=>{
    let t=0,nodes=[],id;
    for(let j=0;j<16;j++)
      nodes.push({x:Math.random()*c.width,y:Math.random()*c.height,active:0,phase:Math.random()*Math.PI*2});
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(0,5,10,0.25)";
      ctx.fillRect(0,0,c.width,c.height);
      nodes.forEach(n=>{
        const d=Math.hypot(n.x-mouse.x,n.y-mouse.y);
        n.active=Math.max(0,Math.min(1,1-d/118));
        nodes.forEach(m=>{
          const md=Math.hypot(n.x-m.x,n.y-m.y);
          if(md<138){
            ctx.strokeStyle=`rgba(0,200,150,${(n.active+m.active)*0.3})`;
            ctx.lineWidth=1;
            ctx.beginPath();ctx.moveTo(n.x,n.y);ctx.lineTo(m.x,m.y);ctx.stroke();
          }
        });
        const pulse=(Math.sin(t*3+n.phase)+1)/2;
        ctx.fillStyle=`rgba(0,200,150,${0.4+n.active*0.6})`;
        ctx.fillRect(n.x-3,n.y-3,6,6);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Status Ring Orbit",
  tags:["data","ui","hud"],
  description:"Status Ring Orbit — particle effect with dynamic motion",
  code:`// Status Ring Orbit animation code`,
  animator:(c,ctx,mouse)=>{
    let t=0,nodes=[],id;
    for(let j=0;j<17;j++)
      nodes.push({x:Math.random()*c.width,y:Math.random()*c.height,active:0,phase:Math.random()*Math.PI*2});
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(0,5,10,0.25)";
      ctx.fillRect(0,0,c.width,c.height);
      nodes.forEach(n=>{
        const d=Math.hypot(n.x-mouse.x,n.y-mouse.y);
        n.active=Math.max(0,Math.min(1,1-d/119));
        nodes.forEach(m=>{
          const md=Math.hypot(n.x-m.x,n.y-m.y);
          if(md<139){
            ctx.strokeStyle=`rgba(0,200,150,${(n.active+m.active)*0.3})`;
            ctx.lineWidth=1;
            ctx.beginPath();ctx.moveTo(n.x,n.y);ctx.lineTo(m.x,m.y);ctx.stroke();
          }
        });
        const pulse=(Math.sin(t*3+n.phase)+1)/2;
        ctx.fillStyle=`rgba(0,200,150,${0.4+n.active*0.6})`;
        ctx.fillRect(n.x-3,n.y-3,6,6);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Command Line Rain",
  tags:["ui","hud","interface"],
  description:"Command Line Rain — particle effect with dynamic motion",
  code:`// Command Line Rain animation code`,
  animator:(c,ctx,mouse)=>{
    let t=0,nodes=[],id;
    for(let j=0;j<8;j++)
      nodes.push({x:Math.random()*c.width,y:Math.random()*c.height,active:0,phase:Math.random()*Math.PI*2});
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(0,5,10,0.25)";
      ctx.fillRect(0,0,c.width,c.height);
      nodes.forEach(n=>{
        const d=Math.hypot(n.x-mouse.x,n.y-mouse.y);
        n.active=Math.max(0,Math.min(1,1-d/120));
        nodes.forEach(m=>{
          const md=Math.hypot(n.x-m.x,n.y-m.y);
          if(md<140){
            ctx.strokeStyle=`rgba(0,200,150,${(n.active+m.active)*0.3})`;
            ctx.lineWidth=1;
            ctx.beginPath();ctx.moveTo(n.x,n.y);ctx.lineTo(m.x,m.y);ctx.stroke();
          }
        });
        const pulse=(Math.sin(t*3+n.phase)+1)/2;
        ctx.fillStyle=`rgba(0,200,150,${0.4+n.active*0.6})`;
        ctx.fillRect(n.x-3,n.y-3,6,6);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"UI Pulse Ticker",
  tags:["hud","interface","hologram"],
  description:"UI Pulse Ticker — particle effect with dynamic motion",
  code:`// UI Pulse Ticker animation code`,
  animator:(c,ctx,mouse)=>{
    let t=0,nodes=[],id;
    for(let j=0;j<9;j++)
      nodes.push({x:Math.random()*c.width,y:Math.random()*c.height,active:0,phase:Math.random()*Math.PI*2});
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(0,5,10,0.25)";
      ctx.fillRect(0,0,c.width,c.height);
      nodes.forEach(n=>{
        const d=Math.hypot(n.x-mouse.x,n.y-mouse.y);
        n.active=Math.max(0,Math.min(1,1-d/121));
        nodes.forEach(m=>{
          const md=Math.hypot(n.x-m.x,n.y-m.y);
          if(md<141){
            ctx.strokeStyle=`rgba(0,200,150,${(n.active+m.active)*0.3})`;
            ctx.lineWidth=1;
            ctx.beginPath();ctx.moveTo(n.x,n.y);ctx.lineTo(m.x,m.y);ctx.stroke();
          }
        });
        const pulse=(Math.sin(t*3+n.phase)+1)/2;
        ctx.fillStyle=`rgba(0,200,150,${0.4+n.active*0.6})`;
        ctx.fillRect(n.x-3,n.y-3,6,6);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Interface Ribbon Flow",
  tags:["interface","hologram","data"],
  description:"Interface Ribbon Flow — particle effect with dynamic motion",
  code:`// Interface Ribbon Flow animation code`,
  animator:(c,ctx,mouse)=>{
    let t=0,nodes=[],id;
    for(let j=0;j<10;j++)
      nodes.push({x:Math.random()*c.width,y:Math.random()*c.height,active:0,phase:Math.random()*Math.PI*2});
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(0,5,10,0.25)";
      ctx.fillRect(0,0,c.width,c.height);
      nodes.forEach(n=>{
        const d=Math.hypot(n.x-mouse.x,n.y-mouse.y);
        n.active=Math.max(0,Math.min(1,1-d/122));
        nodes.forEach(m=>{
          const md=Math.hypot(n.x-m.x,n.y-m.y);
          if(md<142){
            ctx.strokeStyle=`rgba(0,200,150,${(n.active+m.active)*0.3})`;
            ctx.lineWidth=1;
            ctx.beginPath();ctx.moveTo(n.x,n.y);ctx.lineTo(m.x,m.y);ctx.stroke();
          }
        });
        const pulse=(Math.sin(t*3+n.phase)+1)/2;
        ctx.fillStyle=`rgba(0,200,150,${0.4+n.active*0.6})`;
        ctx.fillRect(n.x-3,n.y-3,6,6);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"System Alert Bloom",
  tags:["hologram","data","ui"],
  description:"System Alert Bloom — particle effect with dynamic motion",
  code:`// System Alert Bloom animation code`,
  animator:(c,ctx,mouse)=>{
    let t=0,nodes=[],id;
    for(let j=0;j<11;j++)
      nodes.push({x:Math.random()*c.width,y:Math.random()*c.height,active:0,phase:Math.random()*Math.PI*2});
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(0,5,10,0.25)";
      ctx.fillRect(0,0,c.width,c.height);
      nodes.forEach(n=>{
        const d=Math.hypot(n.x-mouse.x,n.y-mouse.y);
        n.active=Math.max(0,Math.min(1,1-d/123));
        nodes.forEach(m=>{
          const md=Math.hypot(n.x-m.x,n.y-m.y);
          if(md<143){
            ctx.strokeStyle=`rgba(0,200,150,${(n.active+m.active)*0.3})`;
            ctx.lineWidth=1;
            ctx.beginPath();ctx.moveTo(n.x,n.y);ctx.lineTo(m.x,m.y);ctx.stroke();
          }
        });
        const pulse=(Math.sin(t*3+n.phase)+1)/2;
        ctx.fillStyle=`rgba(0,200,150,${0.4+n.active*0.6})`;
        ctx.fillRect(n.x-3,n.y-3,6,6);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"UI Orbit Grid",
  tags:["data","ui","hud"],
  description:"UI Orbit Grid — particle effect with dynamic motion",
  code:`// UI Orbit Grid animation code`,
  animator:(c,ctx,mouse)=>{
    let t=0,nodes=[],id;
    for(let j=0;j<12;j++)
      nodes.push({x:Math.random()*c.width,y:Math.random()*c.height,active:0,phase:Math.random()*Math.PI*2});
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(0,5,10,0.25)";
      ctx.fillRect(0,0,c.width,c.height);
      nodes.forEach(n=>{
        const d=Math.hypot(n.x-mouse.x,n.y-mouse.y);
        n.active=Math.max(0,Math.min(1,1-d/124));
        nodes.forEach(m=>{
          const md=Math.hypot(n.x-m.x,n.y-m.y);
          if(md<144){
            ctx.strokeStyle=`rgba(0,200,150,${(n.active+m.active)*0.3})`;
            ctx.lineWidth=1;
            ctx.beginPath();ctx.moveTo(n.x,n.y);ctx.lineTo(m.x,m.y);ctx.stroke();
          }
        });
        const pulse=(Math.sin(t*3+n.phase)+1)/2;
        ctx.fillStyle=`rgba(0,200,150,${0.4+n.active*0.6})`;
        ctx.fillRect(n.x-3,n.y-3,6,6);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"HUD Bloom Net",
  tags:["ui","hud","interface"],
  description:"HUD Bloom Net — particle effect with dynamic motion",
  code:`// HUD Bloom Net animation code`,
  animator:(c,ctx,mouse)=>{
    let t=0,nodes=[],id;
    for(let j=0;j<13;j++)
      nodes.push({x:Math.random()*c.width,y:Math.random()*c.height,active:0,phase:Math.random()*Math.PI*2});
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(0,5,10,0.25)";
      ctx.fillRect(0,0,c.width,c.height);
      nodes.forEach(n=>{
        const d=Math.hypot(n.x-mouse.x,n.y-mouse.y);
        n.active=Math.max(0,Math.min(1,1-d/125));
        nodes.forEach(m=>{
          const md=Math.hypot(n.x-m.x,n.y-m.y);
          if(md<145){
            ctx.strokeStyle=`rgba(0,200,150,${(n.active+m.active)*0.3})`;
            ctx.lineWidth=1;
            ctx.beginPath();ctx.moveTo(n.x,n.y);ctx.lineTo(m.x,m.y);ctx.stroke();
          }
        });
        const pulse=(Math.sin(t*3+n.phase)+1)/2;
        ctx.fillStyle=`rgba(0,200,150,${0.4+n.active*0.6})`;
        ctx.fillRect(n.x-3,n.y-3,6,6);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"UI Mesh Focus",
  tags:["hud","interface","hologram"],
  description:"UI Mesh Focus — particle effect with dynamic motion",
  code:`// UI Mesh Focus animation code`,
  animator:(c,ctx,mouse)=>{
    let t=0,nodes=[],id;
    for(let j=0;j<14;j++)
      nodes.push({x:Math.random()*c.width,y:Math.random()*c.height,active:0,phase:Math.random()*Math.PI*2});
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(0,5,10,0.25)";
      ctx.fillRect(0,0,c.width,c.height);
      nodes.forEach(n=>{
        const d=Math.hypot(n.x-mouse.x,n.y-mouse.y);
        n.active=Math.max(0,Math.min(1,1-d/126));
        nodes.forEach(m=>{
          const md=Math.hypot(n.x-m.x,n.y-m.y);
          if(md<146){
            ctx.strokeStyle=`rgba(0,200,150,${(n.active+m.active)*0.3})`;
            ctx.lineWidth=1;
            ctx.beginPath();ctx.moveTo(n.x,n.y);ctx.lineTo(m.x,m.y);ctx.stroke();
          }
        });
        const pulse=(Math.sin(t*3+n.phase)+1)/2;
        ctx.fillStyle=`rgba(0,200,150,${0.4+n.active*0.6})`;
        ctx.fillRect(n.x-3,n.y-3,6,6);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"UI Scan Lines",
  tags:["interface","hologram","data"],
  description:"UI Scan Lines — particle effect with dynamic motion",
  code:`// UI Scan Lines animation code`,
  animator:(c,ctx,mouse)=>{
    let t=0,nodes=[],id;
    for(let j=0;j<15;j++)
      nodes.push({x:Math.random()*c.width,y:Math.random()*c.height,active:0,phase:Math.random()*Math.PI*2});
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(0,5,10,0.25)";
      ctx.fillRect(0,0,c.width,c.height);
      nodes.forEach(n=>{
        const d=Math.hypot(n.x-mouse.x,n.y-mouse.y);
        n.active=Math.max(0,Math.min(1,1-d/127));
        nodes.forEach(m=>{
          const md=Math.hypot(n.x-m.x,n.y-m.y);
          if(md<147){
            ctx.strokeStyle=`rgba(0,200,150,${(n.active+m.active)*0.3})`;
            ctx.lineWidth=1;
            ctx.beginPath();ctx.moveTo(n.x,n.y);ctx.lineTo(m.x,m.y);ctx.stroke();
          }
        });
        const pulse=(Math.sin(t*3+n.phase)+1)/2;
        ctx.fillStyle=`rgba(0,200,150,${0.4+n.active*0.6})`;
        ctx.fillRect(n.x-3,n.y-3,6,6);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Panel Slide Trail",
  tags:["hologram","data","ui"],
  description:"Panel Slide Trail — particle effect with dynamic motion",
  code:`// Panel Slide Trail animation code`,
  animator:(c,ctx,mouse)=>{
    let t=0,nodes=[],id;
    for(let j=0;j<16;j++)
      nodes.push({x:Math.random()*c.width,y:Math.random()*c.height,active:0,phase:Math.random()*Math.PI*2});
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(0,5,10,0.25)";
      ctx.fillRect(0,0,c.width,c.height);
      nodes.forEach(n=>{
        const d=Math.hypot(n.x-mouse.x,n.y-mouse.y);
        n.active=Math.max(0,Math.min(1,1-d/128));
        nodes.forEach(m=>{
          const md=Math.hypot(n.x-m.x,n.y-m.y);
          if(md<148){
            ctx.strokeStyle=`rgba(0,200,150,${(n.active+m.active)*0.3})`;
            ctx.lineWidth=1;
            ctx.beginPath();ctx.moveTo(n.x,n.y);ctx.lineTo(m.x,m.y);ctx.stroke();
          }
        });
        const pulse=(Math.sin(t*3+n.phase)+1)/2;
        ctx.fillStyle=`rgba(0,200,150,${0.4+n.active*0.6})`;
        ctx.fillRect(n.x-3,n.y-3,6,6);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"System Pulse Core",
  tags:["data","ui","hud"],
  description:"System Pulse Core — particle effect with dynamic motion",
  code:`// System Pulse Core animation code`,
  animator:(c,ctx,mouse)=>{
    let t=0,nodes=[],id;
    for(let j=0;j<17;j++)
      nodes.push({x:Math.random()*c.width,y:Math.random()*c.height,active:0,phase:Math.random()*Math.PI*2});
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(0,5,10,0.25)";
      ctx.fillRect(0,0,c.width,c.height);
      nodes.forEach(n=>{
        const d=Math.hypot(n.x-mouse.x,n.y-mouse.y);
        n.active=Math.max(0,Math.min(1,1-d/129));
        nodes.forEach(m=>{
          const md=Math.hypot(n.x-m.x,n.y-m.y);
          if(md<149){
            ctx.strokeStyle=`rgba(0,200,150,${(n.active+m.active)*0.3})`;
            ctx.lineWidth=1;
            ctx.beginPath();ctx.moveTo(n.x,n.y);ctx.lineTo(m.x,m.y);ctx.stroke();
          }
        });
        const pulse=(Math.sin(t*3+n.phase)+1)/2;
        ctx.fillStyle=`rgba(0,200,150,${0.4+n.active*0.6})`;
        ctx.fillRect(n.x-3,n.y-3,6,6);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"UI Signal Rings",
  tags:["ui","hud","interface"],
  description:"UI Signal Rings — particle effect with dynamic motion",
  code:`// UI Signal Rings animation code`,
  animator:(c,ctx,mouse)=>{
    let t=0,nodes=[],id;
    for(let j=0;j<8;j++)
      nodes.push({x:Math.random()*c.width,y:Math.random()*c.height,active:0,phase:Math.random()*Math.PI*2});
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(0,5,10,0.25)";
      ctx.fillRect(0,0,c.width,c.height);
      nodes.forEach(n=>{
        const d=Math.hypot(n.x-mouse.x,n.y-mouse.y);
        n.active=Math.max(0,Math.min(1,1-d/130));
        nodes.forEach(m=>{
          const md=Math.hypot(n.x-m.x,n.y-m.y);
          if(md<150){
            ctx.strokeStyle=`rgba(0,200,150,${(n.active+m.active)*0.3})`;
            ctx.lineWidth=1;
            ctx.beginPath();ctx.moveTo(n.x,n.y);ctx.lineTo(m.x,m.y);ctx.stroke();
          }
        });
        const pulse=(Math.sin(t*3+n.phase)+1)/2;
        ctx.fillStyle=`rgba(0,200,150,${0.4+n.active*0.6})`;
        ctx.fillRect(n.x-3,n.y-3,6,6);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Cursor Lock Halo",
  tags:["hud","interface","hologram"],
  description:"Cursor Lock Halo — particle effect with dynamic motion",
  code:`// Cursor Lock Halo animation code`,
  animator:(c,ctx,mouse)=>{
    let t=0,nodes=[],id;
    for(let j=0;j<9;j++)
      nodes.push({x:Math.random()*c.width,y:Math.random()*c.height,active:0,phase:Math.random()*Math.PI*2});
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(0,5,10,0.25)";
      ctx.fillRect(0,0,c.width,c.height);
      nodes.forEach(n=>{
        const d=Math.hypot(n.x-mouse.x,n.y-mouse.y);
        n.active=Math.max(0,Math.min(1,1-d/131));
        nodes.forEach(m=>{
          const md=Math.hypot(n.x-m.x,n.y-m.y);
          if(md<151){
            ctx.strokeStyle=`rgba(0,200,150,${(n.active+m.active)*0.3})`;
            ctx.lineWidth=1;
            ctx.beginPath();ctx.moveTo(n.x,n.y);ctx.lineTo(m.x,m.y);ctx.stroke();
          }
        });
        const pulse=(Math.sin(t*3+n.phase)+1)/2;
        ctx.fillStyle=`rgba(0,200,150,${0.4+n.active*0.6})`;
        ctx.fillRect(n.x-3,n.y-3,6,6);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"UI Bloom Nodes",
  tags:["interface","hologram","data"],
  description:"UI Bloom Nodes — particle effect with dynamic motion",
  code:`// UI Bloom Nodes animation code`,
  animator:(c,ctx,mouse)=>{
    let t=0,nodes=[],id;
    for(let j=0;j<10;j++)
      nodes.push({x:Math.random()*c.width,y:Math.random()*c.height,active:0,phase:Math.random()*Math.PI*2});
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(0,5,10,0.25)";
      ctx.fillRect(0,0,c.width,c.height);
      nodes.forEach(n=>{
        const d=Math.hypot(n.x-mouse.x,n.y-mouse.y);
        n.active=Math.max(0,Math.min(1,1-d/132));
        nodes.forEach(m=>{
          const md=Math.hypot(n.x-m.x,n.y-m.y);
          if(md<152){
            ctx.strokeStyle=`rgba(0,200,150,${(n.active+m.active)*0.3})`;
            ctx.lineWidth=1;
            ctx.beginPath();ctx.moveTo(n.x,n.y);ctx.lineTo(m.x,m.y);ctx.stroke();
          }
        });
        const pulse=(Math.sin(t*3+n.phase)+1)/2;
        ctx.fillStyle=`rgba(0,200,150,${0.4+n.active*0.6})`;
        ctx.fillRect(n.x-3,n.y-3,6,6);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"HUD Cascade Net",
  tags:["hologram","data","ui"],
  description:"HUD Cascade Net — particle effect with dynamic motion",
  code:`// HUD Cascade Net animation code`,
  animator:(c,ctx,mouse)=>{
    let t=0,nodes=[],id;
    for(let j=0;j<11;j++)
      nodes.push({x:Math.random()*c.width,y:Math.random()*c.height,active:0,phase:Math.random()*Math.PI*2});
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(0,5,10,0.25)";
      ctx.fillRect(0,0,c.width,c.height);
      nodes.forEach(n=>{
        const d=Math.hypot(n.x-mouse.x,n.y-mouse.y);
        n.active=Math.max(0,Math.min(1,1-d/133));
        nodes.forEach(m=>{
          const md=Math.hypot(n.x-m.x,n.y-m.y);
          if(md<153){
            ctx.strokeStyle=`rgba(0,200,150,${(n.active+m.active)*0.3})`;
            ctx.lineWidth=1;
            ctx.beginPath();ctx.moveTo(n.x,n.y);ctx.lineTo(m.x,m.y);ctx.stroke();
          }
        });
        const pulse=(Math.sin(t*3+n.phase)+1)/2;
        ctx.fillStyle=`rgba(0,200,150,${0.4+n.active*0.6})`;
        ctx.fillRect(n.x-3,n.y-3,6,6);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Data Arc Flow",
  tags:["data","ui","hud"],
  description:"Data Arc Flow — particle effect with dynamic motion",
  code:`// Data Arc Flow animation code`,
  animator:(c,ctx,mouse)=>{
    let t=0,nodes=[],id;
    for(let j=0;j<12;j++)
      nodes.push({x:Math.random()*c.width,y:Math.random()*c.height,active:0,phase:Math.random()*Math.PI*2});
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(0,5,10,0.25)";
      ctx.fillRect(0,0,c.width,c.height);
      nodes.forEach(n=>{
        const d=Math.hypot(n.x-mouse.x,n.y-mouse.y);
        n.active=Math.max(0,Math.min(1,1-d/134));
        nodes.forEach(m=>{
          const md=Math.hypot(n.x-m.x,n.y-m.y);
          if(md<154){
            ctx.strokeStyle=`rgba(0,200,150,${(n.active+m.active)*0.3})`;
            ctx.lineWidth=1;
            ctx.beginPath();ctx.moveTo(n.x,n.y);ctx.lineTo(m.x,m.y);ctx.stroke();
          }
        });
        const pulse=(Math.sin(t*3+n.phase)+1)/2;
        ctx.fillStyle=`rgba(0,200,150,${0.4+n.active*0.6})`;
        ctx.fillRect(n.x-3,n.y-3,6,6);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"UI Depth Bloom",
  tags:["ui","hud","interface"],
  description:"UI Depth Bloom — particle effect with dynamic motion",
  code:`// UI Depth Bloom animation code`,
  animator:(c,ctx,mouse)=>{
    let t=0,nodes=[],id;
    for(let j=0;j<13;j++)
      nodes.push({x:Math.random()*c.width,y:Math.random()*c.height,active:0,phase:Math.random()*Math.PI*2});
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(0,5,10,0.25)";
      ctx.fillRect(0,0,c.width,c.height);
      nodes.forEach(n=>{
        const d=Math.hypot(n.x-mouse.x,n.y-mouse.y);
        n.active=Math.max(0,Math.min(1,1-d/135));
        nodes.forEach(m=>{
          const md=Math.hypot(n.x-m.x,n.y-m.y);
          if(md<155){
            ctx.strokeStyle=`rgba(0,200,150,${(n.active+m.active)*0.3})`;
            ctx.lineWidth=1;
            ctx.beginPath();ctx.moveTo(n.x,n.y);ctx.lineTo(m.x,m.y);ctx.stroke();
          }
        });
        const pulse=(Math.sin(t*3+n.phase)+1)/2;
        ctx.fillStyle=`rgba(0,200,150,${0.4+n.active*0.6})`;
        ctx.fillRect(n.x-3,n.y-3,6,6);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Holo Menu Orbit",
  tags:["hud","interface","hologram"],
  description:"Holo Menu Orbit — particle effect with dynamic motion",
  code:`// Holo Menu Orbit animation code`,
  animator:(c,ctx,mouse)=>{
    let t=0,nodes=[],id;
    for(let j=0;j<14;j++)
      nodes.push({x:Math.random()*c.width,y:Math.random()*c.height,active:0,phase:Math.random()*Math.PI*2});
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(0,5,10,0.25)";
      ctx.fillRect(0,0,c.width,c.height);
      nodes.forEach(n=>{
        const d=Math.hypot(n.x-mouse.x,n.y-mouse.y);
        n.active=Math.max(0,Math.min(1,1-d/136));
        nodes.forEach(m=>{
          const md=Math.hypot(n.x-m.x,n.y-m.y);
          if(md<156){
            ctx.strokeStyle=`rgba(0,200,150,${(n.active+m.active)*0.3})`;
            ctx.lineWidth=1;
            ctx.beginPath();ctx.moveTo(n.x,n.y);ctx.lineTo(m.x,m.y);ctx.stroke();
          }
        });
        const pulse=(Math.sin(t*3+n.phase)+1)/2;
        ctx.fillStyle=`rgba(0,200,150,${0.4+n.active*0.6})`;
        ctx.fillRect(n.x-3,n.y-3,6,6);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"UI Response Pulse",
  tags:["interface","hologram","data"],
  description:"UI Response Pulse — particle effect with dynamic motion",
  code:`// UI Response Pulse animation code`,
  animator:(c,ctx,mouse)=>{
    let t=0,nodes=[],id;
    for(let j=0;j<15;j++)
      nodes.push({x:Math.random()*c.width,y:Math.random()*c.height,active:0,phase:Math.random()*Math.PI*2});
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(0,5,10,0.25)";
      ctx.fillRect(0,0,c.width,c.height);
      nodes.forEach(n=>{
        const d=Math.hypot(n.x-mouse.x,n.y-mouse.y);
        n.active=Math.max(0,Math.min(1,1-d/137));
        nodes.forEach(m=>{
          const md=Math.hypot(n.x-m.x,n.y-m.y);
          if(md<157){
            ctx.strokeStyle=`rgba(0,200,150,${(n.active+m.active)*0.3})`;
            ctx.lineWidth=1;
            ctx.beginPath();ctx.moveTo(n.x,n.y);ctx.lineTo(m.x,m.y);ctx.stroke();
          }
        });
        const pulse=(Math.sin(t*3+n.phase)+1)/2;
        ctx.fillStyle=`rgba(0,200,150,${0.4+n.active*0.6})`;
        ctx.fillRect(n.x-3,n.y-3,6,6);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Interface Lattice",
  tags:["hologram","data","ui"],
  description:"Interface Lattice — particle effect with dynamic motion",
  code:`// Interface Lattice animation code`,
  animator:(c,ctx,mouse)=>{
    let t=0,nodes=[],id;
    for(let j=0;j<16;j++)
      nodes.push({x:Math.random()*c.width,y:Math.random()*c.height,active:0,phase:Math.random()*Math.PI*2});
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(0,5,10,0.25)";
      ctx.fillRect(0,0,c.width,c.height);
      nodes.forEach(n=>{
        const d=Math.hypot(n.x-mouse.x,n.y-mouse.y);
        n.active=Math.max(0,Math.min(1,1-d/138));
        nodes.forEach(m=>{
          const md=Math.hypot(n.x-m.x,n.y-m.y);
          if(md<158){
            ctx.strokeStyle=`rgba(0,200,150,${(n.active+m.active)*0.3})`;
            ctx.lineWidth=1;
            ctx.beginPath();ctx.moveTo(n.x,n.y);ctx.lineTo(m.x,m.y);ctx.stroke();
          }
        });
        const pulse=(Math.sin(t*3+n.phase)+1)/2;
        ctx.fillStyle=`rgba(0,200,150,${0.4+n.active*0.6})`;
        ctx.fillRect(n.x-3,n.y-3,6,6);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"UI Activation Burst",
  tags:["data","ui","hud"],
  description:"UI Activation Burst — particle effect with dynamic motion",
  code:`// UI Activation Burst animation code`,
  animator:(c,ctx,mouse)=>{
    let t=0,nodes=[],id;
    for(let j=0;j<17;j++)
      nodes.push({x:Math.random()*c.width,y:Math.random()*c.height,active:0,phase:Math.random()*Math.PI*2});
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(0,5,10,0.25)";
      ctx.fillRect(0,0,c.width,c.height);
      nodes.forEach(n=>{
        const d=Math.hypot(n.x-mouse.x,n.y-mouse.y);
        n.active=Math.max(0,Math.min(1,1-d/139));
        nodes.forEach(m=>{
          const md=Math.hypot(n.x-m.x,n.y-m.y);
          if(md<159){
            ctx.strokeStyle=`rgba(0,200,150,${(n.active+m.active)*0.3})`;
            ctx.lineWidth=1;
            ctx.beginPath();ctx.moveTo(n.x,n.y);ctx.lineTo(m.x,m.y);ctx.stroke();
          }
        });
        const pulse=(Math.sin(t*3+n.phase)+1)/2;
        ctx.fillStyle=`rgba(0,200,150,${0.4+n.active*0.6})`;
        ctx.fillRect(n.x-3,n.y-3,6,6);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"HUD Target Bloom",
  tags:["ui","hud","interface"],
  description:"HUD Target Bloom — particle effect with dynamic motion",
  code:`// HUD Target Bloom animation code`,
  animator:(c,ctx,mouse)=>{
    let t=0,nodes=[],id;
    for(let j=0;j<8;j++)
      nodes.push({x:Math.random()*c.width,y:Math.random()*c.height,active:0,phase:Math.random()*Math.PI*2});
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(0,5,10,0.25)";
      ctx.fillRect(0,0,c.width,c.height);
      nodes.forEach(n=>{
        const d=Math.hypot(n.x-mouse.x,n.y-mouse.y);
        n.active=Math.max(0,Math.min(1,1-d/140));
        nodes.forEach(m=>{
          const md=Math.hypot(n.x-m.x,n.y-m.y);
          if(md<160){
            ctx.strokeStyle=`rgba(0,200,150,${(n.active+m.active)*0.3})`;
            ctx.lineWidth=1;
            ctx.beginPath();ctx.moveTo(n.x,n.y);ctx.lineTo(m.x,m.y);ctx.stroke();
          }
        });
        const pulse=(Math.sin(t*3+n.phase)+1)/2;
        ctx.fillStyle=`rgba(0,200,150,${0.4+n.active*0.6})`;
        ctx.fillRect(n.x-3,n.y-3,6,6);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"UI Ring Connector",
  tags:["hud","interface","hologram"],
  description:"UI Ring Connector — particle effect with dynamic motion",
  code:`// UI Ring Connector animation code`,
  animator:(c,ctx,mouse)=>{
    let t=0,nodes=[],id;
    for(let j=0;j<9;j++)
      nodes.push({x:Math.random()*c.width,y:Math.random()*c.height,active:0,phase:Math.random()*Math.PI*2});
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(0,5,10,0.25)";
      ctx.fillRect(0,0,c.width,c.height);
      nodes.forEach(n=>{
        const d=Math.hypot(n.x-mouse.x,n.y-mouse.y);
        n.active=Math.max(0,Math.min(1,1-d/141));
        nodes.forEach(m=>{
          const md=Math.hypot(n.x-m.x,n.y-m.y);
          if(md<161){
            ctx.strokeStyle=`rgba(0,200,150,${(n.active+m.active)*0.3})`;
            ctx.lineWidth=1;
            ctx.beginPath();ctx.moveTo(n.x,n.y);ctx.lineTo(m.x,m.y);ctx.stroke();
          }
        });
        const pulse=(Math.sin(t*3+n.phase)+1)/2;
        ctx.fillStyle=`rgba(0,200,150,${0.4+n.active*0.6})`;
        ctx.fillRect(n.x-3,n.y-3,6,6);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Data Bloom Grid",
  tags:["interface","hologram","data"],
  description:"Data Bloom Grid — particle effect with dynamic motion",
  code:`// Data Bloom Grid animation code`,
  animator:(c,ctx,mouse)=>{
    let t=0,nodes=[],id;
    for(let j=0;j<10;j++)
      nodes.push({x:Math.random()*c.width,y:Math.random()*c.height,active:0,phase:Math.random()*Math.PI*2});
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(0,5,10,0.25)";
      ctx.fillRect(0,0,c.width,c.height);
      nodes.forEach(n=>{
        const d=Math.hypot(n.x-mouse.x,n.y-mouse.y);
        n.active=Math.max(0,Math.min(1,1-d/142));
        nodes.forEach(m=>{
          const md=Math.hypot(n.x-m.x,n.y-m.y);
          if(md<162){
            ctx.strokeStyle=`rgba(0,200,150,${(n.active+m.active)*0.3})`;
            ctx.lineWidth=1;
            ctx.beginPath();ctx.moveTo(n.x,n.y);ctx.lineTo(m.x,m.y);ctx.stroke();
          }
        });
        const pulse=(Math.sin(t*3+n.phase)+1)/2;
        ctx.fillStyle=`rgba(0,200,150,${0.4+n.active*0.6})`;
        ctx.fillRect(n.x-3,n.y-3,6,6);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"System Loop Halo",
  tags:["hologram","data","ui"],
  description:"System Loop Halo — particle effect with dynamic motion",
  code:`// System Loop Halo animation code`,
  animator:(c,ctx,mouse)=>{
    let t=0,nodes=[],id;
    for(let j=0;j<11;j++)
      nodes.push({x:Math.random()*c.width,y:Math.random()*c.height,active:0,phase:Math.random()*Math.PI*2});
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(0,5,10,0.25)";
      ctx.fillRect(0,0,c.width,c.height);
      nodes.forEach(n=>{
        const d=Math.hypot(n.x-mouse.x,n.y-mouse.y);
        n.active=Math.max(0,Math.min(1,1-d/143));
        nodes.forEach(m=>{
          const md=Math.hypot(n.x-m.x,n.y-m.y);
          if(md<163){
            ctx.strokeStyle=`rgba(0,200,150,${(n.active+m.active)*0.3})`;
            ctx.lineWidth=1;
            ctx.beginPath();ctx.moveTo(n.x,n.y);ctx.lineTo(m.x,m.y);ctx.stroke();
          }
        });
        const pulse=(Math.sin(t*3+n.phase)+1)/2;
        ctx.fillStyle=`rgba(0,200,150,${0.4+n.active*0.6})`;
        ctx.fillRect(n.x-3,n.y-3,6,6);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"UI State Bloom",
  tags:["data","ui","hud"],
  description:"UI State Bloom — particle effect with dynamic motion",
  code:`// UI State Bloom animation code`,
  animator:(c,ctx,mouse)=>{
    let t=0,nodes=[],id;
    for(let j=0;j<12;j++)
      nodes.push({x:Math.random()*c.width,y:Math.random()*c.height,active:0,phase:Math.random()*Math.PI*2});
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(0,5,10,0.25)";
      ctx.fillRect(0,0,c.width,c.height);
      nodes.forEach(n=>{
        const d=Math.hypot(n.x-mouse.x,n.y-mouse.y);
        n.active=Math.max(0,Math.min(1,1-d/144));
        nodes.forEach(m=>{
          const md=Math.hypot(n.x-m.x,n.y-m.y);
          if(md<164){
            ctx.strokeStyle=`rgba(0,200,150,${(n.active+m.active)*0.3})`;
            ctx.lineWidth=1;
            ctx.beginPath();ctx.moveTo(n.x,n.y);ctx.lineTo(m.x,m.y);ctx.stroke();
          }
        });
        const pulse=(Math.sin(t*3+n.phase)+1)/2;
        ctx.fillStyle=`rgba(0,200,150,${0.4+n.active*0.6})`;
        ctx.fillRect(n.x-3,n.y-3,6,6);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Command Pulse Ring",
  tags:["ui","hud","interface"],
  description:"Command Pulse Ring — particle effect with dynamic motion",
  code:`// Command Pulse Ring animation code`,
  animator:(c,ctx,mouse)=>{
    let t=0,nodes=[],id;
    for(let j=0;j<13;j++)
      nodes.push({x:Math.random()*c.width,y:Math.random()*c.height,active:0,phase:Math.random()*Math.PI*2});
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(0,5,10,0.25)";
      ctx.fillRect(0,0,c.width,c.height);
      nodes.forEach(n=>{
        const d=Math.hypot(n.x-mouse.x,n.y-mouse.y);
        n.active=Math.max(0,Math.min(1,1-d/145));
        nodes.forEach(m=>{
          const md=Math.hypot(n.x-m.x,n.y-m.y);
          if(md<165){
            ctx.strokeStyle=`rgba(0,200,150,${(n.active+m.active)*0.3})`;
            ctx.lineWidth=1;
            ctx.beginPath();ctx.moveTo(n.x,n.y);ctx.lineTo(m.x,m.y);ctx.stroke();
          }
        });
        const pulse=(Math.sin(t*3+n.phase)+1)/2;
        ctx.fillStyle=`rgba(0,200,150,${0.4+n.active*0.6})`;
        ctx.fillRect(n.x-3,n.y-3,6,6);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"HUD Signal Flow",
  tags:["hud","interface","hologram"],
  description:"HUD Signal Flow — particle effect with dynamic motion",
  code:`// HUD Signal Flow animation code`,
  animator:(c,ctx,mouse)=>{
    let t=0,nodes=[],id;
    for(let j=0;j<14;j++)
      nodes.push({x:Math.random()*c.width,y:Math.random()*c.height,active:0,phase:Math.random()*Math.PI*2});
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(0,5,10,0.25)";
      ctx.fillRect(0,0,c.width,c.height);
      nodes.forEach(n=>{
        const d=Math.hypot(n.x-mouse.x,n.y-mouse.y);
        n.active=Math.max(0,Math.min(1,1-d/146));
        nodes.forEach(m=>{
          const md=Math.hypot(n.x-m.x,n.y-m.y);
          if(md<166){
            ctx.strokeStyle=`rgba(0,200,150,${(n.active+m.active)*0.3})`;
            ctx.lineWidth=1;
            ctx.beginPath();ctx.moveTo(n.x,n.y);ctx.lineTo(m.x,m.y);ctx.stroke();
          }
        });
        const pulse=(Math.sin(t*3+n.phase)+1)/2;
        ctx.fillStyle=`rgba(0,200,150,${0.4+n.active*0.6})`;
        ctx.fillRect(n.x-3,n.y-3,6,6);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"UI Feedback Halo",
  tags:["interface","hologram","data"],
  description:"UI Feedback Halo — particle effect with dynamic motion",
  code:`// UI Feedback Halo animation code`,
  animator:(c,ctx,mouse)=>{
    let t=0,nodes=[],id;
    for(let j=0;j<15;j++)
      nodes.push({x:Math.random()*c.width,y:Math.random()*c.height,active:0,phase:Math.random()*Math.PI*2});
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(0,5,10,0.25)";
      ctx.fillRect(0,0,c.width,c.height);
      nodes.forEach(n=>{
        const d=Math.hypot(n.x-mouse.x,n.y-mouse.y);
        n.active=Math.max(0,Math.min(1,1-d/147));
        nodes.forEach(m=>{
          const md=Math.hypot(n.x-m.x,n.y-m.y);
          if(md<167){
            ctx.strokeStyle=`rgba(0,200,150,${(n.active+m.active)*0.3})`;
            ctx.lineWidth=1;
            ctx.beginPath();ctx.moveTo(n.x,n.y);ctx.lineTo(m.x,m.y);ctx.stroke();
          }
        });
        const pulse=(Math.sin(t*3+n.phase)+1)/2;
        ctx.fillStyle=`rgba(0,200,150,${0.4+n.active*0.6})`;
        ctx.fillRect(n.x-3,n.y-3,6,6);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"UI Node Bloom",
  tags:["hologram","data","ui"],
  description:"UI Node Bloom — particle effect with dynamic motion",
  code:`// UI Node Bloom animation code`,
  animator:(c,ctx,mouse)=>{
    let t=0,nodes=[],id;
    for(let j=0;j<16;j++)
      nodes.push({x:Math.random()*c.width,y:Math.random()*c.height,active:0,phase:Math.random()*Math.PI*2});
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(0,5,10,0.25)";
      ctx.fillRect(0,0,c.width,c.height);
      nodes.forEach(n=>{
        const d=Math.hypot(n.x-mouse.x,n.y-mouse.y);
        n.active=Math.max(0,Math.min(1,1-d/148));
        nodes.forEach(m=>{
          const md=Math.hypot(n.x-m.x,n.y-m.y);
          if(md<168){
            ctx.strokeStyle=`rgba(0,200,150,${(n.active+m.active)*0.3})`;
            ctx.lineWidth=1;
            ctx.beginPath();ctx.moveTo(n.x,n.y);ctx.lineTo(m.x,m.y);ctx.stroke();
          }
        });
        const pulse=(Math.sin(t*3+n.phase)+1)/2;
        ctx.fillStyle=`rgba(0,200,150,${0.4+n.active*0.6})`;
        ctx.fillRect(n.x-3,n.y-3,6,6);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"System Bloom Ring",
  tags:["data","ui","hud"],
  description:"System Bloom Ring — particle effect with dynamic motion",
  code:`// System Bloom Ring animation code`,
  animator:(c,ctx,mouse)=>{
    let t=0,nodes=[],id;
    for(let j=0;j<17;j++)
      nodes.push({x:Math.random()*c.width,y:Math.random()*c.height,active:0,phase:Math.random()*Math.PI*2});
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(0,5,10,0.25)";
      ctx.fillRect(0,0,c.width,c.height);
      nodes.forEach(n=>{
        const d=Math.hypot(n.x-mouse.x,n.y-mouse.y);
        n.active=Math.max(0,Math.min(1,1-d/149));
        nodes.forEach(m=>{
          const md=Math.hypot(n.x-m.x,n.y-m.y);
          if(md<169){
            ctx.strokeStyle=`rgba(0,200,150,${(n.active+m.active)*0.3})`;
            ctx.lineWidth=1;
            ctx.beginPath();ctx.moveTo(n.x,n.y);ctx.lineTo(m.x,m.y);ctx.stroke();
          }
        });
        const pulse=(Math.sin(t*3+n.phase)+1)/2;
        ctx.fillStyle=`rgba(0,200,150,${0.4+n.active*0.6})`;
        ctx.fillRect(n.x-3,n.y-3,6,6);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

];

// ────────────────────────────────────────────────────────────
//  ARCHITECTURE FX (50 effects)
// ────────────────────────────────────────────────────────────

export const architectureEffects = [

{
  name:"Neon Skyline Bloom",
  tags:["city","urban","neon"],
  description:"Neon Skyline Bloom — particle effect with dynamic motion",
  code:`// Neon Skyline Bloom animation code`,
  animator:(c,ctx,mouse)=>{
    let t=0,id;
    const loop=()=>{
      t+=0.03;
      ctx.fillStyle="rgba(0,0,5,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      for(let col=0;col<10;col++){
        const x=col/(10)*c.width;
        const h=40+Math.sin(t*1+col*0.3)*20;
        const blink=Math.sin(t*2+col*0.7)>0.7?1:0;
        ctx.fillStyle=`rgba(150,200,255,${0.4+blink*0.4})`;
        ctx.fillRect(x-3,c.height-h,6,h);
        if(blink){
          ctx.fillStyle=`rgba(150,200,255,0.8)`;
          ctx.fillRect(x-1,c.height-h-4,2,4);
        }
      }
      ctx.strokeStyle=`rgba(150,200,255,0.2)`;
      for(let gx=0;gx<c.width;gx+=20){
        ctx.beginPath();ctx.moveTo(gx,0);ctx.lineTo(gx,c.height);ctx.stroke();
      }
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"City Grid Pulse",
  tags:["urban","neon","architecture"],
  description:"City Grid Pulse — particle effect with dynamic motion",
  code:`// City Grid Pulse animation code`,
  animator:(c,ctx,mouse)=>{
    let t=0,id;
    const loop=()=>{
      t+=0.03;
      ctx.fillStyle="rgba(0,0,5,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      for(let col=0;col<11;col++){
        const x=col/(11)*c.width;
        const h=41+Math.sin(t*2+col*0.32)*21;
        const blink=Math.sin(t*3+col*0.7)>0.7?1:0;
        ctx.fillStyle=`rgba(150,200,255,${0.4+blink*0.4})`;
        ctx.fillRect(x-4,c.height-h,7,h);
        if(blink){
          ctx.fillStyle=`rgba(150,200,255,0.8)`;
          ctx.fillRect(x-1,c.height-h-4,2,4);
        }
      }
      ctx.strokeStyle=`rgba(150,200,255,0.2)`;
      for(let gx=0;gx<c.width;gx+=21){
        ctx.beginPath();ctx.moveTo(gx,0);ctx.lineTo(gx,c.height);ctx.stroke();
      }
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Tower Light Cascade",
  tags:["neon","architecture","skyline"],
  description:"Tower Light Cascade — particle effect with dynamic motion",
  code:`// Tower Light Cascade animation code`,
  animator:(c,ctx,mouse)=>{
    let t=0,id;
    const loop=()=>{
      t+=0.03;
      ctx.fillStyle="rgba(0,0,5,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      for(let col=0;col<12;col++){
        const x=col/(12)*c.width;
        const h=42+Math.sin(t*3+col*0.33999999999999997)*22;
        const blink=Math.sin(t*4+col*0.7)>0.7?1:0;
        ctx.fillStyle=`rgba(150,200,255,${0.4+blink*0.4})`;
        ctx.fillRect(x-5,c.height-h,8,h);
        if(blink){
          ctx.fillStyle=`rgba(150,200,255,0.8)`;
          ctx.fillRect(x-1,c.height-h-4,2,4);
        }
      }
      ctx.strokeStyle=`rgba(150,200,255,0.2)`;
      for(let gx=0;gx<c.width;gx+=22){
        ctx.beginPath();ctx.moveTo(gx,0);ctx.lineTo(gx,c.height);ctx.stroke();
      }
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Window Matrix Flow",
  tags:["architecture","skyline","city"],
  description:"Window Matrix Flow — particle effect with dynamic motion",
  code:`// Window Matrix Flow animation code`,
  animator:(c,ctx,mouse)=>{
    let t=0,id;
    const loop=()=>{
      t+=0.03;
      ctx.fillStyle="rgba(0,0,5,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      for(let col=0;col<13;col++){
        const x=col/(13)*c.width;
        const h=43+Math.sin(t*1+col*0.36)*23;
        const blink=Math.sin(t*5+col*0.7)>0.7?1:0;
        ctx.fillStyle=`rgba(150,200,255,${0.4+blink*0.4})`;
        ctx.fillRect(x-6,c.height-h,9,h);
        if(blink){
          ctx.fillStyle=`rgba(150,200,255,0.8)`;
          ctx.fillRect(x-1,c.height-h-4,2,4);
        }
      }
      ctx.strokeStyle=`rgba(150,200,255,0.2)`;
      for(let gx=0;gx<c.width;gx+=23){
        ctx.beginPath();ctx.moveTo(gx,0);ctx.lineTo(gx,c.height);ctx.stroke();
      }
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Bridge Traffic Trails",
  tags:["skyline","city","urban"],
  description:"Bridge Traffic Trails — particle effect with dynamic motion",
  code:`// Bridge Traffic Trails animation code`,
  animator:(c,ctx,mouse)=>{
    let t=0,id;
    const loop=()=>{
      t+=0.03;
      ctx.fillStyle="rgba(0,0,5,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      for(let col=0;col<14;col++){
        const x=col/(14)*c.width;
        const h=44+Math.sin(t*2+col*0.38)*24;
        const blink=Math.sin(t*6+col*0.7)>0.7?1:0;
        ctx.fillStyle=`rgba(150,200,255,${0.4+blink*0.4})`;
        ctx.fillRect(x-7,c.height-h,10,h);
        if(blink){
          ctx.fillStyle=`rgba(150,200,255,0.8)`;
          ctx.fillRect(x-1,c.height-h-4,2,4);
        }
      }
      ctx.strokeStyle=`rgba(150,200,255,0.2)`;
      for(let gx=0;gx<c.width;gx+=24){
        ctx.beginPath();ctx.moveTo(gx,0);ctx.lineTo(gx,c.height);ctx.stroke();
      }
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Urban Fog Mesh",
  tags:["city","urban","neon"],
  description:"Urban Fog Mesh — particle effect with dynamic motion",
  code:`// Urban Fog Mesh animation code`,
  animator:(c,ctx,mouse)=>{
    let t=0,id;
    const loop=()=>{
      t+=0.03;
      ctx.fillStyle="rgba(0,0,5,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      for(let col=0;col<15;col++){
        const x=col/(15)*c.width;
        const h=45+Math.sin(t*3+col*0.4)*25;
        const blink=Math.sin(t*2+col*0.7)>0.7?1:0;
        ctx.fillStyle=`rgba(150,200,255,${0.4+blink*0.4})`;
        ctx.fillRect(x-3,c.height-h,11,h);
        if(blink){
          ctx.fillStyle=`rgba(150,200,255,0.8)`;
          ctx.fillRect(x-1,c.height-h-4,2,4);
        }
      }
      ctx.strokeStyle=`rgba(150,200,255,0.2)`;
      for(let gx=0;gx<c.width;gx+=25){
        ctx.beginPath();ctx.moveTo(gx,0);ctx.lineTo(gx,c.height);ctx.stroke();
      }
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Skyscraper Glow Field",
  tags:["urban","neon","architecture"],
  description:"Skyscraper Glow Field — particle effect with dynamic motion",
  code:`// Skyscraper Glow Field animation code`,
  animator:(c,ctx,mouse)=>{
    let t=0,id;
    const loop=()=>{
      t+=0.03;
      ctx.fillStyle="rgba(0,0,5,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      for(let col=0;col<16;col++){
        const x=col/(16)*c.width;
        const h=46+Math.sin(t*1+col*0.42)*26;
        const blink=Math.sin(t*3+col*0.7)>0.7?1:0;
        ctx.fillStyle=`rgba(150,200,255,${0.4+blink*0.4})`;
        ctx.fillRect(x-4,c.height-h,12,h);
        if(blink){
          ctx.fillStyle=`rgba(150,200,255,0.8)`;
          ctx.fillRect(x-1,c.height-h-4,2,4);
        }
      }
      ctx.strokeStyle=`rgba(150,200,255,0.2)`;
      for(let gx=0;gx<c.width;gx+=26){
        ctx.beginPath();ctx.moveTo(gx,0);ctx.lineTo(gx,c.height);ctx.stroke();
      }
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Metro Line Bloom",
  tags:["neon","architecture","skyline"],
  description:"Metro Line Bloom — particle effect with dynamic motion",
  code:`// Metro Line Bloom animation code`,
  animator:(c,ctx,mouse)=>{
    let t=0,id;
    const loop=()=>{
      t+=0.03;
      ctx.fillStyle="rgba(0,0,5,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      for(let col=0;col<17;col++){
        const x=col/(17)*c.width;
        const h=47+Math.sin(t*2+col*0.44)*27;
        const blink=Math.sin(t*4+col*0.7)>0.7?1:0;
        ctx.fillStyle=`rgba(150,200,255,${0.4+blink*0.4})`;
        ctx.fillRect(x-5,c.height-h,13,h);
        if(blink){
          ctx.fillStyle=`rgba(150,200,255,0.8)`;
          ctx.fillRect(x-1,c.height-h-4,2,4);
        }
      }
      ctx.strokeStyle=`rgba(150,200,255,0.2)`;
      for(let gx=0;gx<c.width;gx+=27){
        ctx.beginPath();ctx.moveTo(gx,0);ctx.lineTo(gx,c.height);ctx.stroke();
      }
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Building Edge Pulse",
  tags:["architecture","skyline","city"],
  description:"Building Edge Pulse — particle effect with dynamic motion",
  code:`// Building Edge Pulse animation code`,
  animator:(c,ctx,mouse)=>{
    let t=0,id;
    const loop=()=>{
      t+=0.03;
      ctx.fillStyle="rgba(0,0,5,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      for(let col=0;col<10;col++){
        const x=col/(10)*c.width;
        const h=48+Math.sin(t*3+col*0.45999999999999996)*28;
        const blink=Math.sin(t*5+col*0.7)>0.7?1:0;
        ctx.fillStyle=`rgba(150,200,255,${0.4+blink*0.4})`;
        ctx.fillRect(x-6,c.height-h,14,h);
        if(blink){
          ctx.fillStyle=`rgba(150,200,255,0.8)`;
          ctx.fillRect(x-1,c.height-h-4,2,4);
        }
      }
      ctx.strokeStyle=`rgba(150,200,255,0.2)`;
      for(let gx=0;gx<c.width;gx+=28){
        ctx.beginPath();ctx.moveTo(gx,0);ctx.lineTo(gx,c.height);ctx.stroke();
      }
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"City Energy Net",
  tags:["skyline","city","urban"],
  description:"City Energy Net — particle effect with dynamic motion",
  code:`// City Energy Net animation code`,
  animator:(c,ctx,mouse)=>{
    let t=0,id;
    const loop=()=>{
      t+=0.03;
      ctx.fillStyle="rgba(0,0,5,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      for(let col=0;col<11;col++){
        const x=col/(11)*c.width;
        const h=49+Math.sin(t*1+col*0.48)*29;
        const blink=Math.sin(t*6+col*0.7)>0.7?1:0;
        ctx.fillStyle=`rgba(150,200,255,${0.4+blink*0.4})`;
        ctx.fillRect(x-7,c.height-h,15,h);
        if(blink){
          ctx.fillStyle=`rgba(150,200,255,0.8)`;
          ctx.fillRect(x-1,c.height-h-4,2,4);
        }
      }
      ctx.strokeStyle=`rgba(150,200,255,0.2)`;
      for(let gx=0;gx<c.width;gx+=29){
        ctx.beginPath();ctx.moveTo(gx,0);ctx.lineTo(gx,c.height);ctx.stroke();
      }
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Streetlight Halo",
  tags:["city","urban","neon"],
  description:"Streetlight Halo — particle effect with dynamic motion",
  code:`// Streetlight Halo animation code`,
  animator:(c,ctx,mouse)=>{
    let t=0,id;
    const loop=()=>{
      t+=0.03;
      ctx.fillStyle="rgba(0,0,5,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      for(let col=0;col<12;col++){
        const x=col/(12)*c.width;
        const h=50+Math.sin(t*2+col*0.3)*30;
        const blink=Math.sin(t*2+col*0.7)>0.7?1:0;
        ctx.fillStyle=`rgba(150,200,255,${0.4+blink*0.4})`;
        ctx.fillRect(x-3,c.height-h,6,h);
        if(blink){
          ctx.fillStyle=`rgba(150,200,255,0.8)`;
          ctx.fillRect(x-1,c.height-h-4,2,4);
        }
      }
      ctx.strokeStyle=`rgba(150,200,255,0.2)`;
      for(let gx=0;gx<c.width;gx+=30){
        ctx.beginPath();ctx.moveTo(gx,0);ctx.lineTo(gx,c.height);ctx.stroke();
      }
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"City Block Cascade",
  tags:["urban","neon","architecture"],
  description:"City Block Cascade — particle effect with dynamic motion",
  code:`// City Block Cascade animation code`,
  animator:(c,ctx,mouse)=>{
    let t=0,id;
    const loop=()=>{
      t+=0.03;
      ctx.fillStyle="rgba(0,0,5,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      for(let col=0;col<13;col++){
        const x=col/(13)*c.width;
        const h=51+Math.sin(t*3+col*0.32)*31;
        const blink=Math.sin(t*3+col*0.7)>0.7?1:0;
        ctx.fillStyle=`rgba(150,200,255,${0.4+blink*0.4})`;
        ctx.fillRect(x-4,c.height-h,7,h);
        if(blink){
          ctx.fillStyle=`rgba(150,200,255,0.8)`;
          ctx.fillRect(x-1,c.height-h-4,2,4);
        }
      }
      ctx.strokeStyle=`rgba(150,200,255,0.2)`;
      for(let gx=0;gx<c.width;gx+=31){
        ctx.beginPath();ctx.moveTo(gx,0);ctx.lineTo(gx,c.height);ctx.stroke();
      }
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Neon Alley Bloom",
  tags:["neon","architecture","skyline"],
  description:"Neon Alley Bloom — particle effect with dynamic motion",
  code:`// Neon Alley Bloom animation code`,
  animator:(c,ctx,mouse)=>{
    let t=0,id;
    const loop=()=>{
      t+=0.03;
      ctx.fillStyle="rgba(0,0,5,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      for(let col=0;col<14;col++){
        const x=col/(14)*c.width;
        const h=52+Math.sin(t*1+col*0.33999999999999997)*32;
        const blink=Math.sin(t*4+col*0.7)>0.7?1:0;
        ctx.fillStyle=`rgba(150,200,255,${0.4+blink*0.4})`;
        ctx.fillRect(x-5,c.height-h,8,h);
        if(blink){
          ctx.fillStyle=`rgba(150,200,255,0.8)`;
          ctx.fillRect(x-1,c.height-h-4,2,4);
        }
      }
      ctx.strokeStyle=`rgba(150,200,255,0.2)`;
      for(let gx=0;gx<c.width;gx+=32){
        ctx.beginPath();ctx.moveTo(gx,0);ctx.lineTo(gx,c.height);ctx.stroke();
      }
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Urban Pulse Field",
  tags:["architecture","skyline","city"],
  description:"Urban Pulse Field — particle effect with dynamic motion",
  code:`// Urban Pulse Field animation code`,
  animator:(c,ctx,mouse)=>{
    let t=0,id;
    const loop=()=>{
      t+=0.03;
      ctx.fillStyle="rgba(0,0,5,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      for(let col=0;col<15;col++){
        const x=col/(15)*c.width;
        const h=53+Math.sin(t*2+col*0.36)*33;
        const blink=Math.sin(t*5+col*0.7)>0.7?1:0;
        ctx.fillStyle=`rgba(150,200,255,${0.4+blink*0.4})`;
        ctx.fillRect(x-6,c.height-h,9,h);
        if(blink){
          ctx.fillStyle=`rgba(150,200,255,0.8)`;
          ctx.fillRect(x-1,c.height-h-4,2,4);
        }
      }
      ctx.strokeStyle=`rgba(150,200,255,0.2)`;
      for(let gx=0;gx<c.width;gx+=33){
        ctx.beginPath();ctx.moveTo(gx,0);ctx.lineTo(gx,c.height);ctx.stroke();
      }
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"City Core Glow",
  tags:["skyline","city","urban"],
  description:"City Core Glow — particle effect with dynamic motion",
  code:`// City Core Glow animation code`,
  animator:(c,ctx,mouse)=>{
    let t=0,id;
    const loop=()=>{
      t+=0.03;
      ctx.fillStyle="rgba(0,0,5,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      for(let col=0;col<16;col++){
        const x=col/(16)*c.width;
        const h=54+Math.sin(t*3+col*0.38)*34;
        const blink=Math.sin(t*6+col*0.7)>0.7?1:0;
        ctx.fillStyle=`rgba(150,200,255,${0.4+blink*0.4})`;
        ctx.fillRect(x-7,c.height-h,10,h);
        if(blink){
          ctx.fillStyle=`rgba(150,200,255,0.8)`;
          ctx.fillRect(x-1,c.height-h-4,2,4);
        }
      }
      ctx.strokeStyle=`rgba(150,200,255,0.2)`;
      for(let gx=0;gx<c.width;gx+=34){
        ctx.beginPath();ctx.moveTo(gx,0);ctx.lineTo(gx,c.height);ctx.stroke();
      }
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Window Flicker Net",
  tags:["city","urban","neon"],
  description:"Window Flicker Net — particle effect with dynamic motion",
  code:`// Window Flicker Net animation code`,
  animator:(c,ctx,mouse)=>{
    let t=0,id;
    const loop=()=>{
      t+=0.03;
      ctx.fillStyle="rgba(0,0,5,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      for(let col=0;col<17;col++){
        const x=col/(17)*c.width;
        const h=55+Math.sin(t*1+col*0.4)*35;
        const blink=Math.sin(t*2+col*0.7)>0.7?1:0;
        ctx.fillStyle=`rgba(150,200,255,${0.4+blink*0.4})`;
        ctx.fillRect(x-3,c.height-h,11,h);
        if(blink){
          ctx.fillStyle=`rgba(150,200,255,0.8)`;
          ctx.fillRect(x-1,c.height-h-4,2,4);
        }
      }
      ctx.strokeStyle=`rgba(150,200,255,0.2)`;
      for(let gx=0;gx<c.width;gx+=35){
        ctx.beginPath();ctx.moveTo(gx,0);ctx.lineTo(gx,c.height);ctx.stroke();
      }
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"City Wireframe Bloom",
  tags:["urban","neon","architecture"],
  description:"City Wireframe Bloom — particle effect with dynamic motion",
  code:`// City Wireframe Bloom animation code`,
  animator:(c,ctx,mouse)=>{
    let t=0,id;
    const loop=()=>{
      t+=0.03;
      ctx.fillStyle="rgba(0,0,5,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      for(let col=0;col<10;col++){
        const x=col/(10)*c.width;
        const h=56+Math.sin(t*2+col*0.42)*36;
        const blink=Math.sin(t*3+col*0.7)>0.7?1:0;
        ctx.fillStyle=`rgba(150,200,255,${0.4+blink*0.4})`;
        ctx.fillRect(x-4,c.height-h,12,h);
        if(blink){
          ctx.fillStyle=`rgba(150,200,255,0.8)`;
          ctx.fillRect(x-1,c.height-h-4,2,4);
        }
      }
      ctx.strokeStyle=`rgba(150,200,255,0.2)`;
      for(let gx=0;gx<c.width;gx+=36){
        ctx.beginPath();ctx.moveTo(gx,0);ctx.lineTo(gx,c.height);ctx.stroke();
      }
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Urban Grid Storm",
  tags:["neon","architecture","skyline"],
  description:"Urban Grid Storm — particle effect with dynamic motion",
  code:`// Urban Grid Storm animation code`,
  animator:(c,ctx,mouse)=>{
    let t=0,id;
    const loop=()=>{
      t+=0.03;
      ctx.fillStyle="rgba(0,0,5,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      for(let col=0;col<11;col++){
        const x=col/(11)*c.width;
        const h=57+Math.sin(t*3+col*0.44)*37;
        const blink=Math.sin(t*4+col*0.7)>0.7?1:0;
        ctx.fillStyle=`rgba(150,200,255,${0.4+blink*0.4})`;
        ctx.fillRect(x-5,c.height-h,13,h);
        if(blink){
          ctx.fillStyle=`rgba(150,200,255,0.8)`;
          ctx.fillRect(x-1,c.height-h-4,2,4);
        }
      }
      ctx.strokeStyle=`rgba(150,200,255,0.2)`;
      for(let gx=0;gx<c.width;gx+=37){
        ctx.beginPath();ctx.moveTo(gx,0);ctx.lineTo(gx,c.height);ctx.stroke();
      }
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Neon Roof Flow",
  tags:["architecture","skyline","city"],
  description:"Neon Roof Flow — particle effect with dynamic motion",
  code:`// Neon Roof Flow animation code`,
  animator:(c,ctx,mouse)=>{
    let t=0,id;
    const loop=()=>{
      t+=0.03;
      ctx.fillStyle="rgba(0,0,5,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      for(let col=0;col<12;col++){
        const x=col/(12)*c.width;
        const h=58+Math.sin(t*1+col*0.45999999999999996)*38;
        const blink=Math.sin(t*5+col*0.7)>0.7?1:0;
        ctx.fillStyle=`rgba(150,200,255,${0.4+blink*0.4})`;
        ctx.fillRect(x-6,c.height-h,14,h);
        if(blink){
          ctx.fillStyle=`rgba(150,200,255,0.8)`;
          ctx.fillRect(x-1,c.height-h-4,2,4);
        }
      }
      ctx.strokeStyle=`rgba(150,200,255,0.2)`;
      for(let gx=0;gx<c.width;gx+=38){
        ctx.beginPath();ctx.moveTo(gx,0);ctx.lineTo(gx,c.height);ctx.stroke();
      }
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"City Signal Bloom",
  tags:["skyline","city","urban"],
  description:"City Signal Bloom — particle effect with dynamic motion",
  code:`// City Signal Bloom animation code`,
  animator:(c,ctx,mouse)=>{
    let t=0,id;
    const loop=()=>{
      t+=0.03;
      ctx.fillStyle="rgba(0,0,5,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      for(let col=0;col<13;col++){
        const x=col/(13)*c.width;
        const h=59+Math.sin(t*2+col*0.48)*39;
        const blink=Math.sin(t*6+col*0.7)>0.7?1:0;
        ctx.fillStyle=`rgba(150,200,255,${0.4+blink*0.4})`;
        ctx.fillRect(x-7,c.height-h,15,h);
        if(blink){
          ctx.fillStyle=`rgba(150,200,255,0.8)`;
          ctx.fillRect(x-1,c.height-h-4,2,4);
        }
      }
      ctx.strokeStyle=`rgba(150,200,255,0.2)`;
      for(let gx=0;gx<c.width;gx+=39){
        ctx.beginPath();ctx.moveTo(gx,0);ctx.lineTo(gx,c.height);ctx.stroke();
      }
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Skyline Data Field",
  tags:["city","urban","neon"],
  description:"Skyline Data Field — particle effect with dynamic motion",
  code:`// Skyline Data Field animation code`,
  animator:(c,ctx,mouse)=>{
    let t=0,id;
    const loop=()=>{
      t+=0.03;
      ctx.fillStyle="rgba(0,0,5,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      for(let col=0;col<14;col++){
        const x=col/(14)*c.width;
        const h=60+Math.sin(t*3+col*0.3)*40;
        const blink=Math.sin(t*2+col*0.7)>0.7?1:0;
        ctx.fillStyle=`rgba(150,200,255,${0.4+blink*0.4})`;
        ctx.fillRect(x-3,c.height-h,6,h);
        if(blink){
          ctx.fillStyle=`rgba(150,200,255,0.8)`;
          ctx.fillRect(x-1,c.height-h-4,2,4);
        }
      }
      ctx.strokeStyle=`rgba(150,200,255,0.2)`;
      for(let gx=0;gx<c.width;gx+=20){
        ctx.beginPath();ctx.moveTo(gx,0);ctx.lineTo(gx,c.height);ctx.stroke();
      }
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Urban Bloom Rings",
  tags:["urban","neon","architecture"],
  description:"Urban Bloom Rings — particle effect with dynamic motion",
  code:`// Urban Bloom Rings animation code`,
  animator:(c,ctx,mouse)=>{
    let t=0,id;
    const loop=()=>{
      t+=0.03;
      ctx.fillStyle="rgba(0,0,5,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      for(let col=0;col<15;col++){
        const x=col/(15)*c.width;
        const h=61+Math.sin(t*1+col*0.32)*41;
        const blink=Math.sin(t*3+col*0.7)>0.7?1:0;
        ctx.fillStyle=`rgba(150,200,255,${0.4+blink*0.4})`;
        ctx.fillRect(x-4,c.height-h,7,h);
        if(blink){
          ctx.fillStyle=`rgba(150,200,255,0.8)`;
          ctx.fillRect(x-1,c.height-h-4,2,4);
        }
      }
      ctx.strokeStyle=`rgba(150,200,255,0.2)`;
      for(let gx=0;gx<c.width;gx+=21){
        ctx.beginPath();ctx.moveTo(gx,0);ctx.lineTo(gx,c.height);ctx.stroke();
      }
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"City Pulse Network",
  tags:["neon","architecture","skyline"],
  description:"City Pulse Network — particle effect with dynamic motion",
  code:`// City Pulse Network animation code`,
  animator:(c,ctx,mouse)=>{
    let t=0,id;
    const loop=()=>{
      t+=0.03;
      ctx.fillStyle="rgba(0,0,5,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      for(let col=0;col<16;col++){
        const x=col/(16)*c.width;
        const h=62+Math.sin(t*2+col*0.33999999999999997)*42;
        const blink=Math.sin(t*4+col*0.7)>0.7?1:0;
        ctx.fillStyle=`rgba(150,200,255,${0.4+blink*0.4})`;
        ctx.fillRect(x-5,c.height-h,8,h);
        if(blink){
          ctx.fillStyle=`rgba(150,200,255,0.8)`;
          ctx.fillRect(x-1,c.height-h-4,2,4);
        }
      }
      ctx.strokeStyle=`rgba(150,200,255,0.2)`;
      for(let gx=0;gx<c.width;gx+=22){
        ctx.beginPath();ctx.moveTo(gx,0);ctx.lineTo(gx,c.height);ctx.stroke();
      }
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Tower Reflection Mesh",
  tags:["architecture","skyline","city"],
  description:"Tower Reflection Mesh — particle effect with dynamic motion",
  code:`// Tower Reflection Mesh animation code`,
  animator:(c,ctx,mouse)=>{
    let t=0,id;
    const loop=()=>{
      t+=0.03;
      ctx.fillStyle="rgba(0,0,5,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      for(let col=0;col<17;col++){
        const x=col/(17)*c.width;
        const h=63+Math.sin(t*3+col*0.36)*43;
        const blink=Math.sin(t*5+col*0.7)>0.7?1:0;
        ctx.fillStyle=`rgba(150,200,255,${0.4+blink*0.4})`;
        ctx.fillRect(x-6,c.height-h,9,h);
        if(blink){
          ctx.fillStyle=`rgba(150,200,255,0.8)`;
          ctx.fillRect(x-1,c.height-h-4,2,4);
        }
      }
      ctx.strokeStyle=`rgba(150,200,255,0.2)`;
      for(let gx=0;gx<c.width;gx+=23){
        ctx.beginPath();ctx.moveTo(gx,0);ctx.lineTo(gx,c.height);ctx.stroke();
      }
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Street Grid Bloom",
  tags:["skyline","city","urban"],
  description:"Street Grid Bloom — particle effect with dynamic motion",
  code:`// Street Grid Bloom animation code`,
  animator:(c,ctx,mouse)=>{
    let t=0,id;
    const loop=()=>{
      t+=0.03;
      ctx.fillStyle="rgba(0,0,5,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      for(let col=0;col<10;col++){
        const x=col/(10)*c.width;
        const h=64+Math.sin(t*1+col*0.38)*44;
        const blink=Math.sin(t*6+col*0.7)>0.7?1:0;
        ctx.fillStyle=`rgba(150,200,255,${0.4+blink*0.4})`;
        ctx.fillRect(x-7,c.height-h,10,h);
        if(blink){
          ctx.fillStyle=`rgba(150,200,255,0.8)`;
          ctx.fillRect(x-1,c.height-h-4,2,4);
        }
      }
      ctx.strokeStyle=`rgba(150,200,255,0.2)`;
      for(let gx=0;gx<c.width;gx+=24){
        ctx.beginPath();ctx.moveTo(gx,0);ctx.lineTo(gx,c.height);ctx.stroke();
      }
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"City Night Halo",
  tags:["city","urban","neon"],
  description:"City Night Halo — particle effect with dynamic motion",
  code:`// City Night Halo animation code`,
  animator:(c,ctx,mouse)=>{
    let t=0,id;
    const loop=()=>{
      t+=0.03;
      ctx.fillStyle="rgba(0,0,5,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      for(let col=0;col<11;col++){
        const x=col/(11)*c.width;
        const h=65+Math.sin(t*2+col*0.4)*45;
        const blink=Math.sin(t*2+col*0.7)>0.7?1:0;
        ctx.fillStyle=`rgba(150,200,255,${0.4+blink*0.4})`;
        ctx.fillRect(x-3,c.height-h,11,h);
        if(blink){
          ctx.fillStyle=`rgba(150,200,255,0.8)`;
          ctx.fillRect(x-1,c.height-h-4,2,4);
        }
      }
      ctx.strokeStyle=`rgba(150,200,255,0.2)`;
      for(let gx=0;gx<c.width;gx+=25){
        ctx.beginPath();ctx.moveTo(gx,0);ctx.lineTo(gx,c.height);ctx.stroke();
      }
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Urban Circuit Field",
  tags:["urban","neon","architecture"],
  description:"Urban Circuit Field — particle effect with dynamic motion",
  code:`// Urban Circuit Field animation code`,
  animator:(c,ctx,mouse)=>{
    let t=0,id;
    const loop=()=>{
      t+=0.03;
      ctx.fillStyle="rgba(0,0,5,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      for(let col=0;col<12;col++){
        const x=col/(12)*c.width;
        const h=66+Math.sin(t*3+col*0.42)*46;
        const blink=Math.sin(t*3+col*0.7)>0.7?1:0;
        ctx.fillStyle=`rgba(150,200,255,${0.4+blink*0.4})`;
        ctx.fillRect(x-4,c.height-h,12,h);
        if(blink){
          ctx.fillStyle=`rgba(150,200,255,0.8)`;
          ctx.fillRect(x-1,c.height-h-4,2,4);
        }
      }
      ctx.strokeStyle=`rgba(150,200,255,0.2)`;
      for(let gx=0;gx<c.width;gx+=26){
        ctx.beginPath();ctx.moveTo(gx,0);ctx.lineTo(gx,c.height);ctx.stroke();
      }
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Neon Intersection Pulse",
  tags:["neon","architecture","skyline"],
  description:"Neon Intersection Pulse — particle effect with dynamic motion",
  code:`// Neon Intersection Pulse animation code`,
  animator:(c,ctx,mouse)=>{
    let t=0,id;
    const loop=()=>{
      t+=0.03;
      ctx.fillStyle="rgba(0,0,5,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      for(let col=0;col<13;col++){
        const x=col/(13)*c.width;
        const h=67+Math.sin(t*1+col*0.44)*47;
        const blink=Math.sin(t*4+col*0.7)>0.7?1:0;
        ctx.fillStyle=`rgba(150,200,255,${0.4+blink*0.4})`;
        ctx.fillRect(x-5,c.height-h,13,h);
        if(blink){
          ctx.fillStyle=`rgba(150,200,255,0.8)`;
          ctx.fillRect(x-1,c.height-h-4,2,4);
        }
      }
      ctx.strokeStyle=`rgba(150,200,255,0.2)`;
      for(let gx=0;gx<c.width;gx+=27){
        ctx.beginPath();ctx.moveTo(gx,0);ctx.lineTo(gx,c.height);ctx.stroke();
      }
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"City Bloom Net",
  tags:["architecture","skyline","city"],
  description:"City Bloom Net — particle effect with dynamic motion",
  code:`// City Bloom Net animation code`,
  animator:(c,ctx,mouse)=>{
    let t=0,id;
    const loop=()=>{
      t+=0.03;
      ctx.fillStyle="rgba(0,0,5,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      for(let col=0;col<14;col++){
        const x=col/(14)*c.width;
        const h=68+Math.sin(t*2+col*0.45999999999999996)*48;
        const blink=Math.sin(t*5+col*0.7)>0.7?1:0;
        ctx.fillStyle=`rgba(150,200,255,${0.4+blink*0.4})`;
        ctx.fillRect(x-6,c.height-h,14,h);
        if(blink){
          ctx.fillStyle=`rgba(150,200,255,0.8)`;
          ctx.fillRect(x-1,c.height-h-4,2,4);
        }
      }
      ctx.strokeStyle=`rgba(150,200,255,0.2)`;
      for(let gx=0;gx<c.width;gx+=28){
        ctx.beginPath();ctx.moveTo(gx,0);ctx.lineTo(gx,c.height);ctx.stroke();
      }
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Building Light Storm",
  tags:["skyline","city","urban"],
  description:"Building Light Storm — particle effect with dynamic motion",
  code:`// Building Light Storm animation code`,
  animator:(c,ctx,mouse)=>{
    let t=0,id;
    const loop=()=>{
      t+=0.03;
      ctx.fillStyle="rgba(0,0,5,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      for(let col=0;col<15;col++){
        const x=col/(15)*c.width;
        const h=69+Math.sin(t*3+col*0.48)*49;
        const blink=Math.sin(t*6+col*0.7)>0.7?1:0;
        ctx.fillStyle=`rgba(150,200,255,${0.4+blink*0.4})`;
        ctx.fillRect(x-7,c.height-h,15,h);
        if(blink){
          ctx.fillStyle=`rgba(150,200,255,0.8)`;
          ctx.fillRect(x-1,c.height-h-4,2,4);
        }
      }
      ctx.strokeStyle=`rgba(150,200,255,0.2)`;
      for(let gx=0;gx<c.width;gx+=29){
        ctx.beginPath();ctx.moveTo(gx,0);ctx.lineTo(gx,c.height);ctx.stroke();
      }
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Urban Glow Flow",
  tags:["city","urban","neon"],
  description:"Urban Glow Flow — particle effect with dynamic motion",
  code:`// Urban Glow Flow animation code`,
  animator:(c,ctx,mouse)=>{
    let t=0,id;
    const loop=()=>{
      t+=0.03;
      ctx.fillStyle="rgba(0,0,5,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      for(let col=0;col<16;col++){
        const x=col/(16)*c.width;
        const h=70+Math.sin(t*1+col*0.3)*50;
        const blink=Math.sin(t*2+col*0.7)>0.7?1:0;
        ctx.fillStyle=`rgba(150,200,255,${0.4+blink*0.4})`;
        ctx.fillRect(x-3,c.height-h,6,h);
        if(blink){
          ctx.fillStyle=`rgba(150,200,255,0.8)`;
          ctx.fillRect(x-1,c.height-h-4,2,4);
        }
      }
      ctx.strokeStyle=`rgba(150,200,255,0.2)`;
      for(let gx=0;gx<c.width;gx+=30){
        ctx.beginPath();ctx.moveTo(gx,0);ctx.lineTo(gx,c.height);ctx.stroke();
      }
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"City Core Pulse",
  tags:["urban","neon","architecture"],
  description:"City Core Pulse — particle effect with dynamic motion",
  code:`// City Core Pulse animation code`,
  animator:(c,ctx,mouse)=>{
    let t=0,id;
    const loop=()=>{
      t+=0.03;
      ctx.fillStyle="rgba(0,0,5,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      for(let col=0;col<17;col++){
        const x=col/(17)*c.width;
        const h=71+Math.sin(t*2+col*0.32)*51;
        const blink=Math.sin(t*3+col*0.7)>0.7?1:0;
        ctx.fillStyle=`rgba(150,200,255,${0.4+blink*0.4})`;
        ctx.fillRect(x-4,c.height-h,7,h);
        if(blink){
          ctx.fillStyle=`rgba(150,200,255,0.8)`;
          ctx.fillRect(x-1,c.height-h-4,2,4);
        }
      }
      ctx.strokeStyle=`rgba(150,200,255,0.2)`;
      for(let gx=0;gx<c.width;gx+=31){
        ctx.beginPath();ctx.moveTo(gx,0);ctx.lineTo(gx,c.height);ctx.stroke();
      }
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Skyline Bloom Rings",
  tags:["neon","architecture","skyline"],
  description:"Skyline Bloom Rings — particle effect with dynamic motion",
  code:`// Skyline Bloom Rings animation code`,
  animator:(c,ctx,mouse)=>{
    let t=0,id;
    const loop=()=>{
      t+=0.03;
      ctx.fillStyle="rgba(0,0,5,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      for(let col=0;col<10;col++){
        const x=col/(10)*c.width;
        const h=72+Math.sin(t*3+col*0.33999999999999997)*52;
        const blink=Math.sin(t*4+col*0.7)>0.7?1:0;
        ctx.fillStyle=`rgba(150,200,255,${0.4+blink*0.4})`;
        ctx.fillRect(x-5,c.height-h,8,h);
        if(blink){
          ctx.fillStyle=`rgba(150,200,255,0.8)`;
          ctx.fillRect(x-1,c.height-h-4,2,4);
        }
      }
      ctx.strokeStyle=`rgba(150,200,255,0.2)`;
      for(let gx=0;gx<c.width;gx+=32){
        ctx.beginPath();ctx.moveTo(gx,0);ctx.lineTo(gx,c.height);ctx.stroke();
      }
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Neon Street Mesh",
  tags:["architecture","skyline","city"],
  description:"Neon Street Mesh — particle effect with dynamic motion",
  code:`// Neon Street Mesh animation code`,
  animator:(c,ctx,mouse)=>{
    let t=0,id;
    const loop=()=>{
      t+=0.03;
      ctx.fillStyle="rgba(0,0,5,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      for(let col=0;col<11;col++){
        const x=col/(11)*c.width;
        const h=73+Math.sin(t*1+col*0.36)*53;
        const blink=Math.sin(t*5+col*0.7)>0.7?1:0;
        ctx.fillStyle=`rgba(150,200,255,${0.4+blink*0.4})`;
        ctx.fillRect(x-6,c.height-h,9,h);
        if(blink){
          ctx.fillStyle=`rgba(150,200,255,0.8)`;
          ctx.fillRect(x-1,c.height-h-4,2,4);
        }
      }
      ctx.strokeStyle=`rgba(150,200,255,0.2)`;
      for(let gx=0;gx<c.width;gx+=33){
        ctx.beginPath();ctx.moveTo(gx,0);ctx.lineTo(gx,c.height);ctx.stroke();
      }
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Urban Bloom Cascade",
  tags:["skyline","city","urban"],
  description:"Urban Bloom Cascade — particle effect with dynamic motion",
  code:`// Urban Bloom Cascade animation code`,
  animator:(c,ctx,mouse)=>{
    let t=0,id;
    const loop=()=>{
      t+=0.03;
      ctx.fillStyle="rgba(0,0,5,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      for(let col=0;col<12;col++){
        const x=col/(12)*c.width;
        const h=74+Math.sin(t*2+col*0.38)*54;
        const blink=Math.sin(t*6+col*0.7)>0.7?1:0;
        ctx.fillStyle=`rgba(150,200,255,${0.4+blink*0.4})`;
        ctx.fillRect(x-7,c.height-h,10,h);
        if(blink){
          ctx.fillStyle=`rgba(150,200,255,0.8)`;
          ctx.fillRect(x-1,c.height-h-4,2,4);
        }
      }
      ctx.strokeStyle=`rgba(150,200,255,0.2)`;
      for(let gx=0;gx<c.width;gx+=34){
        ctx.beginPath();ctx.moveTo(gx,0);ctx.lineTo(gx,c.height);ctx.stroke();
      }
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"City Layer Net",
  tags:["city","urban","neon"],
  description:"City Layer Net — particle effect with dynamic motion",
  code:`// City Layer Net animation code`,
  animator:(c,ctx,mouse)=>{
    let t=0,id;
    const loop=()=>{
      t+=0.03;
      ctx.fillStyle="rgba(0,0,5,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      for(let col=0;col<13;col++){
        const x=col/(13)*c.width;
        const h=75+Math.sin(t*3+col*0.4)*55;
        const blink=Math.sin(t*2+col*0.7)>0.7?1:0;
        ctx.fillStyle=`rgba(150,200,255,${0.4+blink*0.4})`;
        ctx.fillRect(x-3,c.height-h,11,h);
        if(blink){
          ctx.fillStyle=`rgba(150,200,255,0.8)`;
          ctx.fillRect(x-1,c.height-h-4,2,4);
        }
      }
      ctx.strokeStyle=`rgba(150,200,255,0.2)`;
      for(let gx=0;gx<c.width;gx+=35){
        ctx.beginPath();ctx.moveTo(gx,0);ctx.lineTo(gx,c.height);ctx.stroke();
      }
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Building Scan Pulse",
  tags:["urban","neon","architecture"],
  description:"Building Scan Pulse — particle effect with dynamic motion",
  code:`// Building Scan Pulse animation code`,
  animator:(c,ctx,mouse)=>{
    let t=0,id;
    const loop=()=>{
      t+=0.03;
      ctx.fillStyle="rgba(0,0,5,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      for(let col=0;col<14;col++){
        const x=col/(14)*c.width;
        const h=76+Math.sin(t*1+col*0.42)*56;
        const blink=Math.sin(t*3+col*0.7)>0.7?1:0;
        ctx.fillStyle=`rgba(150,200,255,${0.4+blink*0.4})`;
        ctx.fillRect(x-4,c.height-h,12,h);
        if(blink){
          ctx.fillStyle=`rgba(150,200,255,0.8)`;
          ctx.fillRect(x-1,c.height-h-4,2,4);
        }
      }
      ctx.strokeStyle=`rgba(150,200,255,0.2)`;
      for(let gx=0;gx<c.width;gx+=36){
        ctx.beginPath();ctx.moveTo(gx,0);ctx.lineTo(gx,c.height);ctx.stroke();
      }
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Urban Signal Field",
  tags:["neon","architecture","skyline"],
  description:"Urban Signal Field — particle effect with dynamic motion",
  code:`// Urban Signal Field animation code`,
  animator:(c,ctx,mouse)=>{
    let t=0,id;
    const loop=()=>{
      t+=0.03;
      ctx.fillStyle="rgba(0,0,5,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      for(let col=0;col<15;col++){
        const x=col/(15)*c.width;
        const h=77+Math.sin(t*2+col*0.44)*57;
        const blink=Math.sin(t*4+col*0.7)>0.7?1:0;
        ctx.fillStyle=`rgba(150,200,255,${0.4+blink*0.4})`;
        ctx.fillRect(x-5,c.height-h,13,h);
        if(blink){
          ctx.fillStyle=`rgba(150,200,255,0.8)`;
          ctx.fillRect(x-1,c.height-h-4,2,4);
        }
      }
      ctx.strokeStyle=`rgba(150,200,255,0.2)`;
      for(let gx=0;gx<c.width;gx+=37){
        ctx.beginPath();ctx.moveTo(gx,0);ctx.lineTo(gx,c.height);ctx.stroke();
      }
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"City Orbit Lights",
  tags:["architecture","skyline","city"],
  description:"City Orbit Lights — particle effect with dynamic motion",
  code:`// City Orbit Lights animation code`,
  animator:(c,ctx,mouse)=>{
    let t=0,id;
    const loop=()=>{
      t+=0.03;
      ctx.fillStyle="rgba(0,0,5,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      for(let col=0;col<16;col++){
        const x=col/(16)*c.width;
        const h=78+Math.sin(t*3+col*0.45999999999999996)*58;
        const blink=Math.sin(t*5+col*0.7)>0.7?1:0;
        ctx.fillStyle=`rgba(150,200,255,${0.4+blink*0.4})`;
        ctx.fillRect(x-6,c.height-h,14,h);
        if(blink){
          ctx.fillStyle=`rgba(150,200,255,0.8)`;
          ctx.fillRect(x-1,c.height-h-4,2,4);
        }
      }
      ctx.strokeStyle=`rgba(150,200,255,0.2)`;
      for(let gx=0;gx<c.width;gx+=38){
        ctx.beginPath();ctx.moveTo(gx,0);ctx.lineTo(gx,c.height);ctx.stroke();
      }
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Skyline Bloom Field",
  tags:["skyline","city","urban"],
  description:"Skyline Bloom Field — particle effect with dynamic motion",
  code:`// Skyline Bloom Field animation code`,
  animator:(c,ctx,mouse)=>{
    let t=0,id;
    const loop=()=>{
      t+=0.03;
      ctx.fillStyle="rgba(0,0,5,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      for(let col=0;col<17;col++){
        const x=col/(17)*c.width;
        const h=79+Math.sin(t*1+col*0.48)*59;
        const blink=Math.sin(t*6+col*0.7)>0.7?1:0;
        ctx.fillStyle=`rgba(150,200,255,${0.4+blink*0.4})`;
        ctx.fillRect(x-7,c.height-h,15,h);
        if(blink){
          ctx.fillStyle=`rgba(150,200,255,0.8)`;
          ctx.fillRect(x-1,c.height-h-4,2,4);
        }
      }
      ctx.strokeStyle=`rgba(150,200,255,0.2)`;
      for(let gx=0;gx<c.width;gx+=39){
        ctx.beginPath();ctx.moveTo(gx,0);ctx.lineTo(gx,c.height);ctx.stroke();
      }
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Neon Window Net",
  tags:["city","urban","neon"],
  description:"Neon Window Net — particle effect with dynamic motion",
  code:`// Neon Window Net animation code`,
  animator:(c,ctx,mouse)=>{
    let t=0,id;
    const loop=()=>{
      t+=0.03;
      ctx.fillStyle="rgba(0,0,5,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      for(let col=0;col<10;col++){
        const x=col/(10)*c.width;
        const h=80+Math.sin(t*2+col*0.3)*20;
        const blink=Math.sin(t*2+col*0.7)>0.7?1:0;
        ctx.fillStyle=`rgba(150,200,255,${0.4+blink*0.4})`;
        ctx.fillRect(x-3,c.height-h,6,h);
        if(blink){
          ctx.fillStyle=`rgba(150,200,255,0.8)`;
          ctx.fillRect(x-1,c.height-h-4,2,4);
        }
      }
      ctx.strokeStyle=`rgba(150,200,255,0.2)`;
      for(let gx=0;gx<c.width;gx+=20){
        ctx.beginPath();ctx.moveTo(gx,0);ctx.lineTo(gx,c.height);ctx.stroke();
      }
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"City Bloom Grid",
  tags:["urban","neon","architecture"],
  description:"City Bloom Grid — particle effect with dynamic motion",
  code:`// City Bloom Grid animation code`,
  animator:(c,ctx,mouse)=>{
    let t=0,id;
    const loop=()=>{
      t+=0.03;
      ctx.fillStyle="rgba(0,0,5,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      for(let col=0;col<11;col++){
        const x=col/(11)*c.width;
        const h=81+Math.sin(t*3+col*0.32)*21;
        const blink=Math.sin(t*3+col*0.7)>0.7?1:0;
        ctx.fillStyle=`rgba(150,200,255,${0.4+blink*0.4})`;
        ctx.fillRect(x-4,c.height-h,7,h);
        if(blink){
          ctx.fillStyle=`rgba(150,200,255,0.8)`;
          ctx.fillRect(x-1,c.height-h-4,2,4);
        }
      }
      ctx.strokeStyle=`rgba(150,200,255,0.2)`;
      for(let gx=0;gx<c.width;gx+=21){
        ctx.beginPath();ctx.moveTo(gx,0);ctx.lineTo(gx,c.height);ctx.stroke();
      }
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Urban Halo Mesh",
  tags:["neon","architecture","skyline"],
  description:"Urban Halo Mesh — particle effect with dynamic motion",
  code:`// Urban Halo Mesh animation code`,
  animator:(c,ctx,mouse)=>{
    let t=0,id;
    const loop=()=>{
      t+=0.03;
      ctx.fillStyle="rgba(0,0,5,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      for(let col=0;col<12;col++){
        const x=col/(12)*c.width;
        const h=82+Math.sin(t*1+col*0.33999999999999997)*22;
        const blink=Math.sin(t*4+col*0.7)>0.7?1:0;
        ctx.fillStyle=`rgba(150,200,255,${0.4+blink*0.4})`;
        ctx.fillRect(x-5,c.height-h,8,h);
        if(blink){
          ctx.fillStyle=`rgba(150,200,255,0.8)`;
          ctx.fillRect(x-1,c.height-h-4,2,4);
        }
      }
      ctx.strokeStyle=`rgba(150,200,255,0.2)`;
      for(let gx=0;gx<c.width;gx+=22){
        ctx.beginPath();ctx.moveTo(gx,0);ctx.lineTo(gx,c.height);ctx.stroke();
      }
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"City Fractal Lights",
  tags:["architecture","skyline","city"],
  description:"City Fractal Lights — particle effect with dynamic motion",
  code:`// City Fractal Lights animation code`,
  animator:(c,ctx,mouse)=>{
    let t=0,id;
    const loop=()=>{
      t+=0.03;
      ctx.fillStyle="rgba(0,0,5,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      for(let col=0;col<13;col++){
        const x=col/(13)*c.width;
        const h=83+Math.sin(t*2+col*0.36)*23;
        const blink=Math.sin(t*5+col*0.7)>0.7?1:0;
        ctx.fillStyle=`rgba(150,200,255,${0.4+blink*0.4})`;
        ctx.fillRect(x-6,c.height-h,9,h);
        if(blink){
          ctx.fillStyle=`rgba(150,200,255,0.8)`;
          ctx.fillRect(x-1,c.height-h-4,2,4);
        }
      }
      ctx.strokeStyle=`rgba(150,200,255,0.2)`;
      for(let gx=0;gx<c.width;gx+=23){
        ctx.beginPath();ctx.moveTo(gx,0);ctx.lineTo(gx,c.height);ctx.stroke();
      }
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Street Pulse Bloom",
  tags:["skyline","city","urban"],
  description:"Street Pulse Bloom — particle effect with dynamic motion",
  code:`// Street Pulse Bloom animation code`,
  animator:(c,ctx,mouse)=>{
    let t=0,id;
    const loop=()=>{
      t+=0.03;
      ctx.fillStyle="rgba(0,0,5,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      for(let col=0;col<14;col++){
        const x=col/(14)*c.width;
        const h=84+Math.sin(t*3+col*0.38)*24;
        const blink=Math.sin(t*6+col*0.7)>0.7?1:0;
        ctx.fillStyle=`rgba(150,200,255,${0.4+blink*0.4})`;
        ctx.fillRect(x-7,c.height-h,10,h);
        if(blink){
          ctx.fillStyle=`rgba(150,200,255,0.8)`;
          ctx.fillRect(x-1,c.height-h-4,2,4);
        }
      }
      ctx.strokeStyle=`rgba(150,200,255,0.2)`;
      for(let gx=0;gx<c.width;gx+=24){
        ctx.beginPath();ctx.moveTo(gx,0);ctx.lineTo(gx,c.height);ctx.stroke();
      }
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Urban Night Lattice",
  tags:["city","urban","neon"],
  description:"Urban Night Lattice — particle effect with dynamic motion",
  code:`// Urban Night Lattice animation code`,
  animator:(c,ctx,mouse)=>{
    let t=0,id;
    const loop=()=>{
      t+=0.03;
      ctx.fillStyle="rgba(0,0,5,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      for(let col=0;col<15;col++){
        const x=col/(15)*c.width;
        const h=85+Math.sin(t*1+col*0.4)*25;
        const blink=Math.sin(t*2+col*0.7)>0.7?1:0;
        ctx.fillStyle=`rgba(150,200,255,${0.4+blink*0.4})`;
        ctx.fillRect(x-3,c.height-h,11,h);
        if(blink){
          ctx.fillStyle=`rgba(150,200,255,0.8)`;
          ctx.fillRect(x-1,c.height-h-4,2,4);
        }
      }
      ctx.strokeStyle=`rgba(150,200,255,0.2)`;
      for(let gx=0;gx<c.width;gx+=25){
        ctx.beginPath();ctx.moveTo(gx,0);ctx.lineTo(gx,c.height);ctx.stroke();
      }
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"City Bloom Storm",
  tags:["urban","neon","architecture"],
  description:"City Bloom Storm — particle effect with dynamic motion",
  code:`// City Bloom Storm animation code`,
  animator:(c,ctx,mouse)=>{
    let t=0,id;
    const loop=()=>{
      t+=0.03;
      ctx.fillStyle="rgba(0,0,5,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      for(let col=0;col<16;col++){
        const x=col/(16)*c.width;
        const h=86+Math.sin(t*2+col*0.42)*26;
        const blink=Math.sin(t*3+col*0.7)>0.7?1:0;
        ctx.fillStyle=`rgba(150,200,255,${0.4+blink*0.4})`;
        ctx.fillRect(x-4,c.height-h,12,h);
        if(blink){
          ctx.fillStyle=`rgba(150,200,255,0.8)`;
          ctx.fillRect(x-1,c.height-h-4,2,4);
        }
      }
      ctx.strokeStyle=`rgba(150,200,255,0.2)`;
      for(let gx=0;gx<c.width;gx+=26){
        ctx.beginPath();ctx.moveTo(gx,0);ctx.lineTo(gx,c.height);ctx.stroke();
      }
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Tower Signal Net",
  tags:["neon","architecture","skyline"],
  description:"Tower Signal Net — particle effect with dynamic motion",
  code:`// Tower Signal Net animation code`,
  animator:(c,ctx,mouse)=>{
    let t=0,id;
    const loop=()=>{
      t+=0.03;
      ctx.fillStyle="rgba(0,0,5,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      for(let col=0;col<17;col++){
        const x=col/(17)*c.width;
        const h=87+Math.sin(t*3+col*0.44)*27;
        const blink=Math.sin(t*4+col*0.7)>0.7?1:0;
        ctx.fillStyle=`rgba(150,200,255,${0.4+blink*0.4})`;
        ctx.fillRect(x-5,c.height-h,13,h);
        if(blink){
          ctx.fillStyle=`rgba(150,200,255,0.8)`;
          ctx.fillRect(x-1,c.height-h-4,2,4);
        }
      }
      ctx.strokeStyle=`rgba(150,200,255,0.2)`;
      for(let gx=0;gx<c.width;gx+=27){
        ctx.beginPath();ctx.moveTo(gx,0);ctx.lineTo(gx,c.height);ctx.stroke();
      }
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Urban Light Flow",
  tags:["architecture","skyline","city"],
  description:"Urban Light Flow — particle effect with dynamic motion",
  code:`// Urban Light Flow animation code`,
  animator:(c,ctx,mouse)=>{
    let t=0,id;
    const loop=()=>{
      t+=0.03;
      ctx.fillStyle="rgba(0,0,5,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      for(let col=0;col<10;col++){
        const x=col/(10)*c.width;
        const h=88+Math.sin(t*1+col*0.45999999999999996)*28;
        const blink=Math.sin(t*5+col*0.7)>0.7?1:0;
        ctx.fillStyle=`rgba(150,200,255,${0.4+blink*0.4})`;
        ctx.fillRect(x-6,c.height-h,14,h);
        if(blink){
          ctx.fillStyle=`rgba(150,200,255,0.8)`;
          ctx.fillRect(x-1,c.height-h-4,2,4);
        }
      }
      ctx.strokeStyle=`rgba(150,200,255,0.2)`;
      for(let gx=0;gx<c.width;gx+=28){
        ctx.beginPath();ctx.moveTo(gx,0);ctx.lineTo(gx,c.height);ctx.stroke();
      }
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"City Bloom Core",
  tags:["skyline","city","urban"],
  description:"City Bloom Core — particle effect with dynamic motion",
  code:`// City Bloom Core animation code`,
  animator:(c,ctx,mouse)=>{
    let t=0,id;
    const loop=()=>{
      t+=0.03;
      ctx.fillStyle="rgba(0,0,5,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      for(let col=0;col<11;col++){
        const x=col/(11)*c.width;
        const h=89+Math.sin(t*2+col*0.48)*29;
        const blink=Math.sin(t*6+col*0.7)>0.7?1:0;
        ctx.fillStyle=`rgba(150,200,255,${0.4+blink*0.4})`;
        ctx.fillRect(x-7,c.height-h,15,h);
        if(blink){
          ctx.fillStyle=`rgba(150,200,255,0.8)`;
          ctx.fillRect(x-1,c.height-h-4,2,4);
        }
      }
      ctx.strokeStyle=`rgba(150,200,255,0.2)`;
      for(let gx=0;gx<c.width;gx+=29){
        ctx.beginPath();ctx.moveTo(gx,0);ctx.lineTo(gx,c.height);ctx.stroke();
      }
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

];

// ────────────────────────────────────────────────────────────
//  LIQUID METAL FX (50 effects)
// ────────────────────────────────────────────────────────────

export const liquidMetalEffects = [

{
  name:"Mercury Flow Field",
  tags:["liquid","metal","chrome"],
  description:"Mercury Flow Field — particle effect with dynamic motion",
  code:`// Mercury Flow Field animation code`,
  animator:(c,ctx,mouse)=>{
    let drops=[],t=0,id;
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(5,5,10,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      if(drops.length<30){
        drops.push({x:mouse.x+(Math.random()-.5)*20,y:mouse.y+(Math.random()-.5)*20,vx:(Math.random()-.5)*2,vy:Math.random()*2+1,r:3,life:1});
      }
      drops.forEach((d,j)=>{
        d.x+=d.vx;d.y+=d.vy;d.vy+=0.05;d.r*=0.99;d.life-=0.01;
        const alpha=d.life*0.5;
        ctx.fillStyle=`rgba(200,200,220,${alpha})`;
        ctx.beginPath();ctx.ellipse(d.x,d.y,d.r,d.r*0.5,0,0,Math.PI*2);ctx.fill();
        ctx.strokeStyle=`rgba(200,200,220,${alpha*0.5})`;ctx.lineWidth=1;ctx.stroke();
        if(d.life<=0)drops.splice(j,1);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Chrome Drip Bloom",
  tags:["metal","chrome","mercury"],
  description:"Chrome Drip Bloom — particle effect with dynamic motion",
  code:`// Chrome Drip Bloom animation code`,
  animator:(c,ctx,mouse)=>{
    let drops=[],t=0,id;
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(5,5,10,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      if(drops.length<31){
        drops.push({x:mouse.x+(Math.random()-.5)*21,y:mouse.y+(Math.random()-.5)*21,vx:(Math.random()-.5)*3,vy:Math.random()*3+1,r:4,life:1});
      }
      drops.forEach((d,j)=>{
        d.x+=d.vx;d.y+=d.vy;d.vx*=0.99;d.r*=0.99;d.life-=0.01;
        const alpha=d.life*0.6;
        ctx.fillStyle=`rgba(200,200,220,${alpha})`;
        ctx.beginPath();ctx.ellipse(d.x,d.y,d.r,d.r*0.6,0.5,0,Math.PI*2);ctx.fill();
        ctx.strokeStyle=`rgba(200,200,220,${alpha*0.5})`;ctx.lineWidth=1;ctx.stroke();
        if(d.life<=0)drops.splice(j,1);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Liquid Steel Halo",
  tags:["chrome","mercury","fluid"],
  description:"Liquid Steel Halo — particle effect with dynamic motion",
  code:`// Liquid Steel Halo animation code`,
  animator:(c,ctx,mouse)=>{
    let drops=[],t=0,id;
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(5,5,10,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      if(drops.length<32){
        drops.push({x:mouse.x+(Math.random()-.5)*22,y:mouse.y+(Math.random()-.5)*22,vx:(Math.random()-.5)*4,vy:Math.random()*4+1,r:5,life:1});
      }
      drops.forEach((d,j)=>{
        d.x+=d.vx;d.y+=d.vy;d.vy+=0.05;d.r*=0.99;d.life-=0.01;
        const alpha=d.life*0.7;
        ctx.fillStyle=`rgba(200,200,220,${alpha})`;
        ctx.beginPath();ctx.ellipse(d.x,d.y,d.r,d.r*0.7,1,0,Math.PI*2);ctx.fill();
        ctx.strokeStyle=`rgba(200,200,220,${alpha*0.5})`;ctx.lineWidth=1;ctx.stroke();
        if(d.life<=0)drops.splice(j,1);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Molten Mirror Net",
  tags:["mercury","fluid","liquid"],
  description:"Molten Mirror Net — particle effect with dynamic motion",
  code:`// Molten Mirror Net animation code`,
  animator:(c,ctx,mouse)=>{
    let drops=[],t=0,id;
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(5,5,10,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      if(drops.length<33){
        drops.push({x:mouse.x+(Math.random()-.5)*23,y:mouse.y+(Math.random()-.5)*23,vx:(Math.random()-.5)*5,vy:Math.random()*2+1,r:6,life:1});
      }
      drops.forEach((d,j)=>{
        d.x+=d.vx;d.y+=d.vy;d.vx*=0.99;d.r*=0.99;d.life-=0.01;
        const alpha=d.life*0.8;
        ctx.fillStyle=`rgba(200,200,220,${alpha})`;
        ctx.beginPath();ctx.ellipse(d.x,d.y,d.r,d.r*0.8,0,0,Math.PI*2);ctx.fill();
        ctx.strokeStyle=`rgba(200,200,220,${alpha*0.5})`;ctx.lineWidth=1;ctx.stroke();
        if(d.life<=0)drops.splice(j,1);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Metal Wave Pulse",
  tags:["fluid","liquid","metal"],
  description:"Metal Wave Pulse — particle effect with dynamic motion",
  code:`// Metal Wave Pulse animation code`,
  animator:(c,ctx,mouse)=>{
    let drops=[],t=0,id;
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(5,5,10,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      if(drops.length<34){
        drops.push({x:mouse.x+(Math.random()-.5)*24,y:mouse.y+(Math.random()-.5)*24,vx:(Math.random()-.5)*2,vy:Math.random()*3+1,r:7,life:1});
      }
      drops.forEach((d,j)=>{
        d.x+=d.vx;d.y+=d.vy;d.vy+=0.05;d.r*=0.99;d.life-=0.01;
        const alpha=d.life*0.9;
        ctx.fillStyle=`rgba(200,200,220,${alpha})`;
        ctx.beginPath();ctx.ellipse(d.x,d.y,d.r,d.r*0.9,0.5,0,Math.PI*2);ctx.fill();
        ctx.strokeStyle=`rgba(200,200,220,${alpha*0.5})`;ctx.lineWidth=1;ctx.stroke();
        if(d.life<=0)drops.splice(j,1);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Chrome Splash Ring",
  tags:["liquid","metal","chrome"],
  description:"Chrome Splash Ring — particle effect with dynamic motion",
  code:`// Chrome Splash Ring animation code`,
  animator:(c,ctx,mouse)=>{
    let drops=[],t=0,id;
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(5,5,10,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      if(drops.length<35){
        drops.push({x:mouse.x+(Math.random()-.5)*25,y:mouse.y+(Math.random()-.5)*25,vx:(Math.random()-.5)*3,vy:Math.random()*4+1,r:8,life:1});
      }
      drops.forEach((d,j)=>{
        d.x+=d.vx;d.y+=d.vy;d.vx*=0.99;d.r*=0.99;d.life-=0.01;
        const alpha=d.life*0.5;
        ctx.fillStyle=`rgba(200,200,220,${alpha})`;
        ctx.beginPath();ctx.ellipse(d.x,d.y,d.r,d.r*1,1,0,Math.PI*2);ctx.fill();
        ctx.strokeStyle=`rgba(200,200,220,${alpha*0.5})`;ctx.lineWidth=1;ctx.stroke();
        if(d.life<=0)drops.splice(j,1);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Fluid Alloy Bloom",
  tags:["metal","chrome","mercury"],
  description:"Fluid Alloy Bloom — particle effect with dynamic motion",
  code:`// Fluid Alloy Bloom animation code`,
  animator:(c,ctx,mouse)=>{
    let drops=[],t=0,id;
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(5,5,10,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      if(drops.length<36){
        drops.push({x:mouse.x+(Math.random()-.5)*26,y:mouse.y+(Math.random()-.5)*26,vx:(Math.random()-.5)*4,vy:Math.random()*2+1,r:3,life:1});
      }
      drops.forEach((d,j)=>{
        d.x+=d.vx;d.y+=d.vy;d.vy+=0.05;d.r*=0.99;d.life-=0.01;
        const alpha=d.life*0.6;
        ctx.fillStyle=`rgba(200,200,220,${alpha})`;
        ctx.beginPath();ctx.ellipse(d.x,d.y,d.r,d.r*0.5,0,0,Math.PI*2);ctx.fill();
        ctx.strokeStyle=`rgba(200,200,220,${alpha*0.5})`;ctx.lineWidth=1;ctx.stroke();
        if(d.life<=0)drops.splice(j,1);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Mercury Orbit Flow",
  tags:["chrome","mercury","fluid"],
  description:"Mercury Orbit Flow — particle effect with dynamic motion",
  code:`// Mercury Orbit Flow animation code`,
  animator:(c,ctx,mouse)=>{
    let drops=[],t=0,id;
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(5,5,10,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      if(drops.length<37){
        drops.push({x:mouse.x+(Math.random()-.5)*27,y:mouse.y+(Math.random()-.5)*27,vx:(Math.random()-.5)*5,vy:Math.random()*3+1,r:4,life:1});
      }
      drops.forEach((d,j)=>{
        d.x+=d.vx;d.y+=d.vy;d.vx*=0.99;d.r*=0.99;d.life-=0.01;
        const alpha=d.life*0.7;
        ctx.fillStyle=`rgba(200,200,220,${alpha})`;
        ctx.beginPath();ctx.ellipse(d.x,d.y,d.r,d.r*0.6,0.5,0,Math.PI*2);ctx.fill();
        ctx.strokeStyle=`rgba(200,200,220,${alpha*0.5})`;ctx.lineWidth=1;ctx.stroke();
        if(d.life<=0)drops.splice(j,1);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Liquid Chrome Cascade",
  tags:["mercury","fluid","liquid"],
  description:"Liquid Chrome Cascade — particle effect with dynamic motion",
  code:`// Liquid Chrome Cascade animation code`,
  animator:(c,ctx,mouse)=>{
    let drops=[],t=0,id;
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(5,5,10,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      if(drops.length<38){
        drops.push({x:mouse.x+(Math.random()-.5)*28,y:mouse.y+(Math.random()-.5)*28,vx:(Math.random()-.5)*2,vy:Math.random()*4+1,r:5,life:1});
      }
      drops.forEach((d,j)=>{
        d.x+=d.vx;d.y+=d.vy;d.vy+=0.05;d.r*=0.99;d.life-=0.01;
        const alpha=d.life*0.8;
        ctx.fillStyle=`rgba(200,200,220,${alpha})`;
        ctx.beginPath();ctx.ellipse(d.x,d.y,d.r,d.r*0.7,1,0,Math.PI*2);ctx.fill();
        ctx.strokeStyle=`rgba(200,200,220,${alpha*0.5})`;ctx.lineWidth=1;ctx.stroke();
        if(d.life<=0)drops.splice(j,1);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Metal Surface Ripple",
  tags:["fluid","liquid","metal"],
  description:"Metal Surface Ripple — particle effect with dynamic motion",
  code:`// Metal Surface Ripple animation code`,
  animator:(c,ctx,mouse)=>{
    let drops=[],t=0,id;
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(5,5,10,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      if(drops.length<39){
        drops.push({x:mouse.x+(Math.random()-.5)*29,y:mouse.y+(Math.random()-.5)*29,vx:(Math.random()-.5)*3,vy:Math.random()*2+1,r:6,life:1});
      }
      drops.forEach((d,j)=>{
        d.x+=d.vx;d.y+=d.vy;d.vx*=0.99;d.r*=0.99;d.life-=0.01;
        const alpha=d.life*0.9;
        ctx.fillStyle=`rgba(200,200,220,${alpha})`;
        ctx.beginPath();ctx.ellipse(d.x,d.y,d.r,d.r*0.8,0,0,Math.PI*2);ctx.fill();
        ctx.strokeStyle=`rgba(200,200,220,${alpha*0.5})`;ctx.lineWidth=1;ctx.stroke();
        if(d.life<=0)drops.splice(j,1);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Alloy Bloom Field",
  tags:["liquid","metal","chrome"],
  description:"Alloy Bloom Field — particle effect with dynamic motion",
  code:`// Alloy Bloom Field animation code`,
  animator:(c,ctx,mouse)=>{
    let drops=[],t=0,id;
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(5,5,10,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      if(drops.length<40){
        drops.push({x:mouse.x+(Math.random()-.5)*30,y:mouse.y+(Math.random()-.5)*30,vx:(Math.random()-.5)*4,vy:Math.random()*3+1,r:7,life:1});
      }
      drops.forEach((d,j)=>{
        d.x+=d.vx;d.y+=d.vy;d.vy+=0.05;d.r*=0.99;d.life-=0.01;
        const alpha=d.life*0.5;
        ctx.fillStyle=`rgba(200,200,220,${alpha})`;
        ctx.beginPath();ctx.ellipse(d.x,d.y,d.r,d.r*0.9,0.5,0,Math.PI*2);ctx.fill();
        ctx.strokeStyle=`rgba(200,200,220,${alpha*0.5})`;ctx.lineWidth=1;ctx.stroke();
        if(d.life<=0)drops.splice(j,1);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Liquid Steel Net",
  tags:["metal","chrome","mercury"],
  description:"Liquid Steel Net — particle effect with dynamic motion",
  code:`// Liquid Steel Net animation code`,
  animator:(c,ctx,mouse)=>{
    let drops=[],t=0,id;
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(5,5,10,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      if(drops.length<41){
        drops.push({x:mouse.x+(Math.random()-.5)*31,y:mouse.y+(Math.random()-.5)*31,vx:(Math.random()-.5)*5,vy:Math.random()*4+1,r:8,life:1});
      }
      drops.forEach((d,j)=>{
        d.x+=d.vx;d.y+=d.vy;d.vx*=0.99;d.r*=0.99;d.life-=0.01;
        const alpha=d.life*0.6;
        ctx.fillStyle=`rgba(200,200,220,${alpha})`;
        ctx.beginPath();ctx.ellipse(d.x,d.y,d.r,d.r*1,1,0,Math.PI*2);ctx.fill();
        ctx.strokeStyle=`rgba(200,200,220,${alpha*0.5})`;ctx.lineWidth=1;ctx.stroke();
        if(d.life<=0)drops.splice(j,1);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Chrome Pulse Storm",
  tags:["chrome","mercury","fluid"],
  description:"Chrome Pulse Storm — particle effect with dynamic motion",
  code:`// Chrome Pulse Storm animation code`,
  animator:(c,ctx,mouse)=>{
    let drops=[],t=0,id;
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(5,5,10,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      if(drops.length<42){
        drops.push({x:mouse.x+(Math.random()-.5)*32,y:mouse.y+(Math.random()-.5)*32,vx:(Math.random()-.5)*2,vy:Math.random()*2+1,r:3,life:1});
      }
      drops.forEach((d,j)=>{
        d.x+=d.vx;d.y+=d.vy;d.vy+=0.05;d.r*=0.99;d.life-=0.01;
        const alpha=d.life*0.7;
        ctx.fillStyle=`rgba(200,200,220,${alpha})`;
        ctx.beginPath();ctx.ellipse(d.x,d.y,d.r,d.r*0.5,0,0,Math.PI*2);ctx.fill();
        ctx.strokeStyle=`rgba(200,200,220,${alpha*0.5})`;ctx.lineWidth=1;ctx.stroke();
        if(d.life<=0)drops.splice(j,1);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Mercury Mesh Flow",
  tags:["mercury","fluid","liquid"],
  description:"Mercury Mesh Flow — particle effect with dynamic motion",
  code:`// Mercury Mesh Flow animation code`,
  animator:(c,ctx,mouse)=>{
    let drops=[],t=0,id;
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(5,5,10,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      if(drops.length<43){
        drops.push({x:mouse.x+(Math.random()-.5)*33,y:mouse.y+(Math.random()-.5)*33,vx:(Math.random()-.5)*3,vy:Math.random()*3+1,r:4,life:1});
      }
      drops.forEach((d,j)=>{
        d.x+=d.vx;d.y+=d.vy;d.vx*=0.99;d.r*=0.99;d.life-=0.01;
        const alpha=d.life*0.8;
        ctx.fillStyle=`rgba(200,200,220,${alpha})`;
        ctx.beginPath();ctx.ellipse(d.x,d.y,d.r,d.r*0.6,0.5,0,Math.PI*2);ctx.fill();
        ctx.strokeStyle=`rgba(200,200,220,${alpha*0.5})`;ctx.lineWidth=1;ctx.stroke();
        if(d.life<=0)drops.splice(j,1);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Metal Bloom Core",
  tags:["fluid","liquid","metal"],
  description:"Metal Bloom Core — particle effect with dynamic motion",
  code:`// Metal Bloom Core animation code`,
  animator:(c,ctx,mouse)=>{
    let drops=[],t=0,id;
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(5,5,10,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      if(drops.length<44){
        drops.push({x:mouse.x+(Math.random()-.5)*34,y:mouse.y+(Math.random()-.5)*34,vx:(Math.random()-.5)*4,vy:Math.random()*4+1,r:5,life:1});
      }
      drops.forEach((d,j)=>{
        d.x+=d.vx;d.y+=d.vy;d.vy+=0.05;d.r*=0.99;d.life-=0.01;
        const alpha=d.life*0.9;
        ctx.fillStyle=`rgba(200,200,220,${alpha})`;
        ctx.beginPath();ctx.ellipse(d.x,d.y,d.r,d.r*0.7,1,0,Math.PI*2);ctx.fill();
        ctx.strokeStyle=`rgba(200,200,220,${alpha*0.5})`;ctx.lineWidth=1;ctx.stroke();
        if(d.life<=0)drops.splice(j,1);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Fluid Chrome Halo",
  tags:["liquid","metal","chrome"],
  description:"Fluid Chrome Halo — particle effect with dynamic motion",
  code:`// Fluid Chrome Halo animation code`,
  animator:(c,ctx,mouse)=>{
    let drops=[],t=0,id;
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(5,5,10,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      if(drops.length<45){
        drops.push({x:mouse.x+(Math.random()-.5)*35,y:mouse.y+(Math.random()-.5)*35,vx:(Math.random()-.5)*5,vy:Math.random()*2+1,r:6,life:1});
      }
      drops.forEach((d,j)=>{
        d.x+=d.vx;d.y+=d.vy;d.vx*=0.99;d.r*=0.99;d.life-=0.01;
        const alpha=d.life*0.5;
        ctx.fillStyle=`rgba(200,200,220,${alpha})`;
        ctx.beginPath();ctx.ellipse(d.x,d.y,d.r,d.r*0.8,0,0,Math.PI*2);ctx.fill();
        ctx.strokeStyle=`rgba(200,200,220,${alpha*0.5})`;ctx.lineWidth=1;ctx.stroke();
        if(d.life<=0)drops.splice(j,1);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Molten Steel Rings",
  tags:["metal","chrome","mercury"],
  description:"Molten Steel Rings — particle effect with dynamic motion",
  code:`// Molten Steel Rings animation code`,
  animator:(c,ctx,mouse)=>{
    let drops=[],t=0,id;
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(5,5,10,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      if(drops.length<46){
        drops.push({x:mouse.x+(Math.random()-.5)*36,y:mouse.y+(Math.random()-.5)*36,vx:(Math.random()-.5)*2,vy:Math.random()*3+1,r:7,life:1});
      }
      drops.forEach((d,j)=>{
        d.x+=d.vx;d.y+=d.vy;d.vy+=0.05;d.r*=0.99;d.life-=0.01;
        const alpha=d.life*0.6;
        ctx.fillStyle=`rgba(200,200,220,${alpha})`;
        ctx.beginPath();ctx.ellipse(d.x,d.y,d.r,d.r*0.9,0.5,0,Math.PI*2);ctx.fill();
        ctx.strokeStyle=`rgba(200,200,220,${alpha*0.5})`;ctx.lineWidth=1;ctx.stroke();
        if(d.life<=0)drops.splice(j,1);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Chrome Bloom Grid",
  tags:["chrome","mercury","fluid"],
  description:"Chrome Bloom Grid — particle effect with dynamic motion",
  code:`// Chrome Bloom Grid animation code`,
  animator:(c,ctx,mouse)=>{
    let drops=[],t=0,id;
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(5,5,10,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      if(drops.length<47){
        drops.push({x:mouse.x+(Math.random()-.5)*37,y:mouse.y+(Math.random()-.5)*37,vx:(Math.random()-.5)*3,vy:Math.random()*4+1,r:8,life:1});
      }
      drops.forEach((d,j)=>{
        d.x+=d.vx;d.y+=d.vy;d.vx*=0.99;d.r*=0.99;d.life-=0.01;
        const alpha=d.life*0.7;
        ctx.fillStyle=`rgba(200,200,220,${alpha})`;
        ctx.beginPath();ctx.ellipse(d.x,d.y,d.r,d.r*1,1,0,Math.PI*2);ctx.fill();
        ctx.strokeStyle=`rgba(200,200,220,${alpha*0.5})`;ctx.lineWidth=1;ctx.stroke();
        if(d.life<=0)drops.splice(j,1);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Liquid Alloy Drift",
  tags:["mercury","fluid","liquid"],
  description:"Liquid Alloy Drift — particle effect with dynamic motion",
  code:`// Liquid Alloy Drift animation code`,
  animator:(c,ctx,mouse)=>{
    let drops=[],t=0,id;
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(5,5,10,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      if(drops.length<48){
        drops.push({x:mouse.x+(Math.random()-.5)*38,y:mouse.y+(Math.random()-.5)*38,vx:(Math.random()-.5)*4,vy:Math.random()*2+1,r:3,life:1});
      }
      drops.forEach((d,j)=>{
        d.x+=d.vx;d.y+=d.vy;d.vy+=0.05;d.r*=0.99;d.life-=0.01;
        const alpha=d.life*0.8;
        ctx.fillStyle=`rgba(200,200,220,${alpha})`;
        ctx.beginPath();ctx.ellipse(d.x,d.y,d.r,d.r*0.5,0,0,Math.PI*2);ctx.fill();
        ctx.strokeStyle=`rgba(200,200,220,${alpha*0.5})`;ctx.lineWidth=1;ctx.stroke();
        if(d.life<=0)drops.splice(j,1);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Metal Reflection Bloom",
  tags:["fluid","liquid","metal"],
  description:"Metal Reflection Bloom — particle effect with dynamic motion",
  code:`// Metal Reflection Bloom animation code`,
  animator:(c,ctx,mouse)=>{
    let drops=[],t=0,id;
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(5,5,10,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      if(drops.length<49){
        drops.push({x:mouse.x+(Math.random()-.5)*39,y:mouse.y+(Math.random()-.5)*39,vx:(Math.random()-.5)*5,vy:Math.random()*3+1,r:4,life:1});
      }
      drops.forEach((d,j)=>{
        d.x+=d.vx;d.y+=d.vy;d.vx*=0.99;d.r*=0.99;d.life-=0.01;
        const alpha=d.life*0.9;
        ctx.fillStyle=`rgba(200,200,220,${alpha})`;
        ctx.beginPath();ctx.ellipse(d.x,d.y,d.r,d.r*0.6,0.5,0,Math.PI*2);ctx.fill();
        ctx.strokeStyle=`rgba(200,200,220,${alpha*0.5})`;ctx.lineWidth=1;ctx.stroke();
        if(d.life<=0)drops.splice(j,1);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Mercury Pulse Net",
  tags:["liquid","metal","chrome"],
  description:"Mercury Pulse Net — particle effect with dynamic motion",
  code:`// Mercury Pulse Net animation code`,
  animator:(c,ctx,mouse)=>{
    let drops=[],t=0,id;
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(5,5,10,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      if(drops.length<50){
        drops.push({x:mouse.x+(Math.random()-.5)*40,y:mouse.y+(Math.random()-.5)*40,vx:(Math.random()-.5)*2,vy:Math.random()*4+1,r:5,life:1});
      }
      drops.forEach((d,j)=>{
        d.x+=d.vx;d.y+=d.vy;d.vy+=0.05;d.r*=0.99;d.life-=0.01;
        const alpha=d.life*0.5;
        ctx.fillStyle=`rgba(200,200,220,${alpha})`;
        ctx.beginPath();ctx.ellipse(d.x,d.y,d.r,d.r*0.7,1,0,Math.PI*2);ctx.fill();
        ctx.strokeStyle=`rgba(200,200,220,${alpha*0.5})`;ctx.lineWidth=1;ctx.stroke();
        if(d.life<=0)drops.splice(j,1);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Chrome Wave Flow",
  tags:["metal","chrome","mercury"],
  description:"Chrome Wave Flow — particle effect with dynamic motion",
  code:`// Chrome Wave Flow animation code`,
  animator:(c,ctx,mouse)=>{
    let drops=[],t=0,id;
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(5,5,10,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      if(drops.length<51){
        drops.push({x:mouse.x+(Math.random()-.5)*41,y:mouse.y+(Math.random()-.5)*41,vx:(Math.random()-.5)*3,vy:Math.random()*2+1,r:6,life:1});
      }
      drops.forEach((d,j)=>{
        d.x+=d.vx;d.y+=d.vy;d.vx*=0.99;d.r*=0.99;d.life-=0.01;
        const alpha=d.life*0.6;
        ctx.fillStyle=`rgba(200,200,220,${alpha})`;
        ctx.beginPath();ctx.ellipse(d.x,d.y,d.r,d.r*0.8,0,0,Math.PI*2);ctx.fill();
        ctx.strokeStyle=`rgba(200,200,220,${alpha*0.5})`;ctx.lineWidth=1;ctx.stroke();
        if(d.life<=0)drops.splice(j,1);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Liquid Steel Bloom",
  tags:["chrome","mercury","fluid"],
  description:"Liquid Steel Bloom — particle effect with dynamic motion",
  code:`// Liquid Steel Bloom animation code`,
  animator:(c,ctx,mouse)=>{
    let drops=[],t=0,id;
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(5,5,10,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      if(drops.length<52){
        drops.push({x:mouse.x+(Math.random()-.5)*42,y:mouse.y+(Math.random()-.5)*42,vx:(Math.random()-.5)*4,vy:Math.random()*3+1,r:7,life:1});
      }
      drops.forEach((d,j)=>{
        d.x+=d.vx;d.y+=d.vy;d.vy+=0.05;d.r*=0.99;d.life-=0.01;
        const alpha=d.life*0.7;
        ctx.fillStyle=`rgba(200,200,220,${alpha})`;
        ctx.beginPath();ctx.ellipse(d.x,d.y,d.r,d.r*0.9,0.5,0,Math.PI*2);ctx.fill();
        ctx.strokeStyle=`rgba(200,200,220,${alpha*0.5})`;ctx.lineWidth=1;ctx.stroke();
        if(d.life<=0)drops.splice(j,1);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Alloy Cascade Ring",
  tags:["mercury","fluid","liquid"],
  description:"Alloy Cascade Ring — particle effect with dynamic motion",
  code:`// Alloy Cascade Ring animation code`,
  animator:(c,ctx,mouse)=>{
    let drops=[],t=0,id;
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(5,5,10,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      if(drops.length<53){
        drops.push({x:mouse.x+(Math.random()-.5)*43,y:mouse.y+(Math.random()-.5)*43,vx:(Math.random()-.5)*5,vy:Math.random()*4+1,r:8,life:1});
      }
      drops.forEach((d,j)=>{
        d.x+=d.vx;d.y+=d.vy;d.vx*=0.99;d.r*=0.99;d.life-=0.01;
        const alpha=d.life*0.8;
        ctx.fillStyle=`rgba(200,200,220,${alpha})`;
        ctx.beginPath();ctx.ellipse(d.x,d.y,d.r,d.r*1,1,0,Math.PI*2);ctx.fill();
        ctx.strokeStyle=`rgba(200,200,220,${alpha*0.5})`;ctx.lineWidth=1;ctx.stroke();
        if(d.life<=0)drops.splice(j,1);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Metal Bloom Lattice",
  tags:["fluid","liquid","metal"],
  description:"Metal Bloom Lattice — particle effect with dynamic motion",
  code:`// Metal Bloom Lattice animation code`,
  animator:(c,ctx,mouse)=>{
    let drops=[],t=0,id;
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(5,5,10,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      if(drops.length<54){
        drops.push({x:mouse.x+(Math.random()-.5)*44,y:mouse.y+(Math.random()-.5)*44,vx:(Math.random()-.5)*2,vy:Math.random()*2+1,r:3,life:1});
      }
      drops.forEach((d,j)=>{
        d.x+=d.vx;d.y+=d.vy;d.vy+=0.05;d.r*=0.99;d.life-=0.01;
        const alpha=d.life*0.9;
        ctx.fillStyle=`rgba(200,200,220,${alpha})`;
        ctx.beginPath();ctx.ellipse(d.x,d.y,d.r,d.r*0.5,0,0,Math.PI*2);ctx.fill();
        ctx.strokeStyle=`rgba(200,200,220,${alpha*0.5})`;ctx.lineWidth=1;ctx.stroke();
        if(d.life<=0)drops.splice(j,1);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Chrome Orbit Halo",
  tags:["liquid","metal","chrome"],
  description:"Chrome Orbit Halo — particle effect with dynamic motion",
  code:`// Chrome Orbit Halo animation code`,
  animator:(c,ctx,mouse)=>{
    let drops=[],t=0,id;
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(5,5,10,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      if(drops.length<55){
        drops.push({x:mouse.x+(Math.random()-.5)*45,y:mouse.y+(Math.random()-.5)*45,vx:(Math.random()-.5)*3,vy:Math.random()*3+1,r:4,life:1});
      }
      drops.forEach((d,j)=>{
        d.x+=d.vx;d.y+=d.vy;d.vx*=0.99;d.r*=0.99;d.life-=0.01;
        const alpha=d.life*0.5;
        ctx.fillStyle=`rgba(200,200,220,${alpha})`;
        ctx.beginPath();ctx.ellipse(d.x,d.y,d.r,d.r*0.6,0.5,0,Math.PI*2);ctx.fill();
        ctx.strokeStyle=`rgba(200,200,220,${alpha*0.5})`;ctx.lineWidth=1;ctx.stroke();
        if(d.life<=0)drops.splice(j,1);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Molten Metal Bloom",
  tags:["metal","chrome","mercury"],
  description:"Molten Metal Bloom — particle effect with dynamic motion",
  code:`// Molten Metal Bloom animation code`,
  animator:(c,ctx,mouse)=>{
    let drops=[],t=0,id;
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(5,5,10,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      if(drops.length<56){
        drops.push({x:mouse.x+(Math.random()-.5)*46,y:mouse.y+(Math.random()-.5)*46,vx:(Math.random()-.5)*4,vy:Math.random()*4+1,r:5,life:1});
      }
      drops.forEach((d,j)=>{
        d.x+=d.vx;d.y+=d.vy;d.vy+=0.05;d.r*=0.99;d.life-=0.01;
        const alpha=d.life*0.6;
        ctx.fillStyle=`rgba(200,200,220,${alpha})`;
        ctx.beginPath();ctx.ellipse(d.x,d.y,d.r,d.r*0.7,1,0,Math.PI*2);ctx.fill();
        ctx.strokeStyle=`rgba(200,200,220,${alpha*0.5})`;ctx.lineWidth=1;ctx.stroke();
        if(d.life<=0)drops.splice(j,1);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Liquid Mirror Pulse",
  tags:["chrome","mercury","fluid"],
  description:"Liquid Mirror Pulse — particle effect with dynamic motion",
  code:`// Liquid Mirror Pulse animation code`,
  animator:(c,ctx,mouse)=>{
    let drops=[],t=0,id;
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(5,5,10,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      if(drops.length<57){
        drops.push({x:mouse.x+(Math.random()-.5)*47,y:mouse.y+(Math.random()-.5)*47,vx:(Math.random()-.5)*5,vy:Math.random()*2+1,r:6,life:1});
      }
      drops.forEach((d,j)=>{
        d.x+=d.vx;d.y+=d.vy;d.vx*=0.99;d.r*=0.99;d.life-=0.01;
        const alpha=d.life*0.7;
        ctx.fillStyle=`rgba(200,200,220,${alpha})`;
        ctx.beginPath();ctx.ellipse(d.x,d.y,d.r,d.r*0.8,0,0,Math.PI*2);ctx.fill();
        ctx.strokeStyle=`rgba(200,200,220,${alpha*0.5})`;ctx.lineWidth=1;ctx.stroke();
        if(d.life<=0)drops.splice(j,1);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Mercury Bloom Rings",
  tags:["mercury","fluid","liquid"],
  description:"Mercury Bloom Rings — particle effect with dynamic motion",
  code:`// Mercury Bloom Rings animation code`,
  animator:(c,ctx,mouse)=>{
    let drops=[],t=0,id;
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(5,5,10,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      if(drops.length<58){
        drops.push({x:mouse.x+(Math.random()-.5)*48,y:mouse.y+(Math.random()-.5)*48,vx:(Math.random()-.5)*2,vy:Math.random()*3+1,r:7,life:1});
      }
      drops.forEach((d,j)=>{
        d.x+=d.vx;d.y+=d.vy;d.vy+=0.05;d.r*=0.99;d.life-=0.01;
        const alpha=d.life*0.8;
        ctx.fillStyle=`rgba(200,200,220,${alpha})`;
        ctx.beginPath();ctx.ellipse(d.x,d.y,d.r,d.r*0.9,0.5,0,Math.PI*2);ctx.fill();
        ctx.strokeStyle=`rgba(200,200,220,${alpha*0.5})`;ctx.lineWidth=1;ctx.stroke();
        if(d.life<=0)drops.splice(j,1);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Chrome Fluid Net",
  tags:["fluid","liquid","metal"],
  description:"Chrome Fluid Net — particle effect with dynamic motion",
  code:`// Chrome Fluid Net animation code`,
  animator:(c,ctx,mouse)=>{
    let drops=[],t=0,id;
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(5,5,10,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      if(drops.length<59){
        drops.push({x:mouse.x+(Math.random()-.5)*49,y:mouse.y+(Math.random()-.5)*49,vx:(Math.random()-.5)*3,vy:Math.random()*4+1,r:8,life:1});
      }
      drops.forEach((d,j)=>{
        d.x+=d.vx;d.y+=d.vy;d.vx*=0.99;d.r*=0.99;d.life-=0.01;
        const alpha=d.life*0.9;
        ctx.fillStyle=`rgba(200,200,220,${alpha})`;
        ctx.beginPath();ctx.ellipse(d.x,d.y,d.r,d.r*1,1,0,Math.PI*2);ctx.fill();
        ctx.strokeStyle=`rgba(200,200,220,${alpha*0.5})`;ctx.lineWidth=1;ctx.stroke();
        if(d.life<=0)drops.splice(j,1);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Metal Surface Bloom",
  tags:["liquid","metal","chrome"],
  description:"Metal Surface Bloom — particle effect with dynamic motion",
  code:`// Metal Surface Bloom animation code`,
  animator:(c,ctx,mouse)=>{
    let drops=[],t=0,id;
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(5,5,10,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      if(drops.length<30){
        drops.push({x:mouse.x+(Math.random()-.5)*20,y:mouse.y+(Math.random()-.5)*20,vx:(Math.random()-.5)*4,vy:Math.random()*2+1,r:3,life:1});
      }
      drops.forEach((d,j)=>{
        d.x+=d.vx;d.y+=d.vy;d.vy+=0.05;d.r*=0.99;d.life-=0.01;
        const alpha=d.life*0.5;
        ctx.fillStyle=`rgba(200,200,220,${alpha})`;
        ctx.beginPath();ctx.ellipse(d.x,d.y,d.r,d.r*0.5,0,0,Math.PI*2);ctx.fill();
        ctx.strokeStyle=`rgba(200,200,220,${alpha*0.5})`;ctx.lineWidth=1;ctx.stroke();
        if(d.life<=0)drops.splice(j,1);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Alloy Flow Halo",
  tags:["metal","chrome","mercury"],
  description:"Alloy Flow Halo — particle effect with dynamic motion",
  code:`// Alloy Flow Halo animation code`,
  animator:(c,ctx,mouse)=>{
    let drops=[],t=0,id;
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(5,5,10,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      if(drops.length<31){
        drops.push({x:mouse.x+(Math.random()-.5)*21,y:mouse.y+(Math.random()-.5)*21,vx:(Math.random()-.5)*5,vy:Math.random()*3+1,r:4,life:1});
      }
      drops.forEach((d,j)=>{
        d.x+=d.vx;d.y+=d.vy;d.vx*=0.99;d.r*=0.99;d.life-=0.01;
        const alpha=d.life*0.6;
        ctx.fillStyle=`rgba(200,200,220,${alpha})`;
        ctx.beginPath();ctx.ellipse(d.x,d.y,d.r,d.r*0.6,0.5,0,Math.PI*2);ctx.fill();
        ctx.strokeStyle=`rgba(200,200,220,${alpha*0.5})`;ctx.lineWidth=1;ctx.stroke();
        if(d.life<=0)drops.splice(j,1);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Liquid Steel Cascade",
  tags:["chrome","mercury","fluid"],
  description:"Liquid Steel Cascade — particle effect with dynamic motion",
  code:`// Liquid Steel Cascade animation code`,
  animator:(c,ctx,mouse)=>{
    let drops=[],t=0,id;
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(5,5,10,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      if(drops.length<32){
        drops.push({x:mouse.x+(Math.random()-.5)*22,y:mouse.y+(Math.random()-.5)*22,vx:(Math.random()-.5)*2,vy:Math.random()*4+1,r:5,life:1});
      }
      drops.forEach((d,j)=>{
        d.x+=d.vx;d.y+=d.vy;d.vy+=0.05;d.r*=0.99;d.life-=0.01;
        const alpha=d.life*0.7;
        ctx.fillStyle=`rgba(200,200,220,${alpha})`;
        ctx.beginPath();ctx.ellipse(d.x,d.y,d.r,d.r*0.7,1,0,Math.PI*2);ctx.fill();
        ctx.strokeStyle=`rgba(200,200,220,${alpha*0.5})`;ctx.lineWidth=1;ctx.stroke();
        if(d.life<=0)drops.splice(j,1);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Chrome Bloom Core",
  tags:["mercury","fluid","liquid"],
  description:"Chrome Bloom Core — particle effect with dynamic motion",
  code:`// Chrome Bloom Core animation code`,
  animator:(c,ctx,mouse)=>{
    let drops=[],t=0,id;
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(5,5,10,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      if(drops.length<33){
        drops.push({x:mouse.x+(Math.random()-.5)*23,y:mouse.y+(Math.random()-.5)*23,vx:(Math.random()-.5)*3,vy:Math.random()*2+1,r:6,life:1});
      }
      drops.forEach((d,j)=>{
        d.x+=d.vx;d.y+=d.vy;d.vx*=0.99;d.r*=0.99;d.life-=0.01;
        const alpha=d.life*0.8;
        ctx.fillStyle=`rgba(200,200,220,${alpha})`;
        ctx.beginPath();ctx.ellipse(d.x,d.y,d.r,d.r*0.8,0,0,Math.PI*2);ctx.fill();
        ctx.strokeStyle=`rgba(200,200,220,${alpha*0.5})`;ctx.lineWidth=1;ctx.stroke();
        if(d.life<=0)drops.splice(j,1);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Mercury Reflection Field",
  tags:["fluid","liquid","metal"],
  description:"Mercury Reflection Field — particle effect with dynamic motion",
  code:`// Mercury Reflection Field animation code`,
  animator:(c,ctx,mouse)=>{
    let drops=[],t=0,id;
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(5,5,10,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      if(drops.length<34){
        drops.push({x:mouse.x+(Math.random()-.5)*24,y:mouse.y+(Math.random()-.5)*24,vx:(Math.random()-.5)*4,vy:Math.random()*3+1,r:7,life:1});
      }
      drops.forEach((d,j)=>{
        d.x+=d.vx;d.y+=d.vy;d.vy+=0.05;d.r*=0.99;d.life-=0.01;
        const alpha=d.life*0.9;
        ctx.fillStyle=`rgba(200,200,220,${alpha})`;
        ctx.beginPath();ctx.ellipse(d.x,d.y,d.r,d.r*0.9,0.5,0,Math.PI*2);ctx.fill();
        ctx.strokeStyle=`rgba(200,200,220,${alpha*0.5})`;ctx.lineWidth=1;ctx.stroke();
        if(d.life<=0)drops.splice(j,1);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Metal Drip Net",
  tags:["liquid","metal","chrome"],
  description:"Metal Drip Net — particle effect with dynamic motion",
  code:`// Metal Drip Net animation code`,
  animator:(c,ctx,mouse)=>{
    let drops=[],t=0,id;
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(5,5,10,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      if(drops.length<35){
        drops.push({x:mouse.x+(Math.random()-.5)*25,y:mouse.y+(Math.random()-.5)*25,vx:(Math.random()-.5)*5,vy:Math.random()*4+1,r:8,life:1});
      }
      drops.forEach((d,j)=>{
        d.x+=d.vx;d.y+=d.vy;d.vx*=0.99;d.r*=0.99;d.life-=0.01;
        const alpha=d.life*0.5;
        ctx.fillStyle=`rgba(200,200,220,${alpha})`;
        ctx.beginPath();ctx.ellipse(d.x,d.y,d.r,d.r*1,1,0,Math.PI*2);ctx.fill();
        ctx.strokeStyle=`rgba(200,200,220,${alpha*0.5})`;ctx.lineWidth=1;ctx.stroke();
        if(d.life<=0)drops.splice(j,1);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Fluid Alloy Halo",
  tags:["metal","chrome","mercury"],
  description:"Fluid Alloy Halo — particle effect with dynamic motion",
  code:`// Fluid Alloy Halo animation code`,
  animator:(c,ctx,mouse)=>{
    let drops=[],t=0,id;
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(5,5,10,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      if(drops.length<36){
        drops.push({x:mouse.x+(Math.random()-.5)*26,y:mouse.y+(Math.random()-.5)*26,vx:(Math.random()-.5)*2,vy:Math.random()*2+1,r:3,life:1});
      }
      drops.forEach((d,j)=>{
        d.x+=d.vx;d.y+=d.vy;d.vy+=0.05;d.r*=0.99;d.life-=0.01;
        const alpha=d.life*0.6;
        ctx.fillStyle=`rgba(200,200,220,${alpha})`;
        ctx.beginPath();ctx.ellipse(d.x,d.y,d.r,d.r*0.5,0,0,Math.PI*2);ctx.fill();
        ctx.strokeStyle=`rgba(200,200,220,${alpha*0.5})`;ctx.lineWidth=1;ctx.stroke();
        if(d.life<=0)drops.splice(j,1);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Liquid Chrome Pulse",
  tags:["chrome","mercury","fluid"],
  description:"Liquid Chrome Pulse — particle effect with dynamic motion",
  code:`// Liquid Chrome Pulse animation code`,
  animator:(c,ctx,mouse)=>{
    let drops=[],t=0,id;
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(5,5,10,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      if(drops.length<37){
        drops.push({x:mouse.x+(Math.random()-.5)*27,y:mouse.y+(Math.random()-.5)*27,vx:(Math.random()-.5)*3,vy:Math.random()*3+1,r:4,life:1});
      }
      drops.forEach((d,j)=>{
        d.x+=d.vx;d.y+=d.vy;d.vx*=0.99;d.r*=0.99;d.life-=0.01;
        const alpha=d.life*0.7;
        ctx.fillStyle=`rgba(200,200,220,${alpha})`;
        ctx.beginPath();ctx.ellipse(d.x,d.y,d.r,d.r*0.6,0.5,0,Math.PI*2);ctx.fill();
        ctx.strokeStyle=`rgba(200,200,220,${alpha*0.5})`;ctx.lineWidth=1;ctx.stroke();
        if(d.life<=0)drops.splice(j,1);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Metal Bloom Storm",
  tags:["mercury","fluid","liquid"],
  description:"Metal Bloom Storm — particle effect with dynamic motion",
  code:`// Metal Bloom Storm animation code`,
  animator:(c,ctx,mouse)=>{
    let drops=[],t=0,id;
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(5,5,10,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      if(drops.length<38){
        drops.push({x:mouse.x+(Math.random()-.5)*28,y:mouse.y+(Math.random()-.5)*28,vx:(Math.random()-.5)*4,vy:Math.random()*4+1,r:5,life:1});
      }
      drops.forEach((d,j)=>{
        d.x+=d.vx;d.y+=d.vy;d.vy+=0.05;d.r*=0.99;d.life-=0.01;
        const alpha=d.life*0.8;
        ctx.fillStyle=`rgba(200,200,220,${alpha})`;
        ctx.beginPath();ctx.ellipse(d.x,d.y,d.r,d.r*0.7,1,0,Math.PI*2);ctx.fill();
        ctx.strokeStyle=`rgba(200,200,220,${alpha*0.5})`;ctx.lineWidth=1;ctx.stroke();
        if(d.life<=0)drops.splice(j,1);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Mercury Wave Grid",
  tags:["fluid","liquid","metal"],
  description:"Mercury Wave Grid — particle effect with dynamic motion",
  code:`// Mercury Wave Grid animation code`,
  animator:(c,ctx,mouse)=>{
    let drops=[],t=0,id;
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(5,5,10,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      if(drops.length<39){
        drops.push({x:mouse.x+(Math.random()-.5)*29,y:mouse.y+(Math.random()-.5)*29,vx:(Math.random()-.5)*5,vy:Math.random()*2+1,r:6,life:1});
      }
      drops.forEach((d,j)=>{
        d.x+=d.vx;d.y+=d.vy;d.vx*=0.99;d.r*=0.99;d.life-=0.01;
        const alpha=d.life*0.9;
        ctx.fillStyle=`rgba(200,200,220,${alpha})`;
        ctx.beginPath();ctx.ellipse(d.x,d.y,d.r,d.r*0.8,0,0,Math.PI*2);ctx.fill();
        ctx.strokeStyle=`rgba(200,200,220,${alpha*0.5})`;ctx.lineWidth=1;ctx.stroke();
        if(d.life<=0)drops.splice(j,1);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Chrome Surface Bloom",
  tags:["liquid","metal","chrome"],
  description:"Chrome Surface Bloom — particle effect with dynamic motion",
  code:`// Chrome Surface Bloom animation code`,
  animator:(c,ctx,mouse)=>{
    let drops=[],t=0,id;
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(5,5,10,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      if(drops.length<40){
        drops.push({x:mouse.x+(Math.random()-.5)*30,y:mouse.y+(Math.random()-.5)*30,vx:(Math.random()-.5)*2,vy:Math.random()*3+1,r:7,life:1});
      }
      drops.forEach((d,j)=>{
        d.x+=d.vx;d.y+=d.vy;d.vy+=0.05;d.r*=0.99;d.life-=0.01;
        const alpha=d.life*0.5;
        ctx.fillStyle=`rgba(200,200,220,${alpha})`;
        ctx.beginPath();ctx.ellipse(d.x,d.y,d.r,d.r*0.9,0.5,0,Math.PI*2);ctx.fill();
        ctx.strokeStyle=`rgba(200,200,220,${alpha*0.5})`;ctx.lineWidth=1;ctx.stroke();
        if(d.life<=0)drops.splice(j,1);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Alloy Pulse Rings",
  tags:["metal","chrome","mercury"],
  description:"Alloy Pulse Rings — particle effect with dynamic motion",
  code:`// Alloy Pulse Rings animation code`,
  animator:(c,ctx,mouse)=>{
    let drops=[],t=0,id;
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(5,5,10,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      if(drops.length<41){
        drops.push({x:mouse.x+(Math.random()-.5)*31,y:mouse.y+(Math.random()-.5)*31,vx:(Math.random()-.5)*3,vy:Math.random()*4+1,r:8,life:1});
      }
      drops.forEach((d,j)=>{
        d.x+=d.vx;d.y+=d.vy;d.vx*=0.99;d.r*=0.99;d.life-=0.01;
        const alpha=d.life*0.6;
        ctx.fillStyle=`rgba(200,200,220,${alpha})`;
        ctx.beginPath();ctx.ellipse(d.x,d.y,d.r,d.r*1,1,0,Math.PI*2);ctx.fill();
        ctx.strokeStyle=`rgba(200,200,220,${alpha*0.5})`;ctx.lineWidth=1;ctx.stroke();
        if(d.life<=0)drops.splice(j,1);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Liquid Metal Halo",
  tags:["chrome","mercury","fluid"],
  description:"Liquid Metal Halo — particle effect with dynamic motion",
  code:`// Liquid Metal Halo animation code`,
  animator:(c,ctx,mouse)=>{
    let drops=[],t=0,id;
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(5,5,10,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      if(drops.length<42){
        drops.push({x:mouse.x+(Math.random()-.5)*32,y:mouse.y+(Math.random()-.5)*32,vx:(Math.random()-.5)*4,vy:Math.random()*2+1,r:3,life:1});
      }
      drops.forEach((d,j)=>{
        d.x+=d.vx;d.y+=d.vy;d.vy+=0.05;d.r*=0.99;d.life-=0.01;
        const alpha=d.life*0.7;
        ctx.fillStyle=`rgba(200,200,220,${alpha})`;
        ctx.beginPath();ctx.ellipse(d.x,d.y,d.r,d.r*0.5,0,0,Math.PI*2);ctx.fill();
        ctx.strokeStyle=`rgba(200,200,220,${alpha*0.5})`;ctx.lineWidth=1;ctx.stroke();
        if(d.life<=0)drops.splice(j,1);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Molten Chrome Flow",
  tags:["mercury","fluid","liquid"],
  description:"Molten Chrome Flow — particle effect with dynamic motion",
  code:`// Molten Chrome Flow animation code`,
  animator:(c,ctx,mouse)=>{
    let drops=[],t=0,id;
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(5,5,10,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      if(drops.length<43){
        drops.push({x:mouse.x+(Math.random()-.5)*33,y:mouse.y+(Math.random()-.5)*33,vx:(Math.random()-.5)*5,vy:Math.random()*3+1,r:4,life:1});
      }
      drops.forEach((d,j)=>{
        d.x+=d.vx;d.y+=d.vy;d.vx*=0.99;d.r*=0.99;d.life-=0.01;
        const alpha=d.life*0.8;
        ctx.fillStyle=`rgba(200,200,220,${alpha})`;
        ctx.beginPath();ctx.ellipse(d.x,d.y,d.r,d.r*0.6,0.5,0,Math.PI*2);ctx.fill();
        ctx.strokeStyle=`rgba(200,200,220,${alpha*0.5})`;ctx.lineWidth=1;ctx.stroke();
        if(d.life<=0)drops.splice(j,1);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Metal Bloom Orbit",
  tags:["fluid","liquid","metal"],
  description:"Metal Bloom Orbit — particle effect with dynamic motion",
  code:`// Metal Bloom Orbit animation code`,
  animator:(c,ctx,mouse)=>{
    let drops=[],t=0,id;
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(5,5,10,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      if(drops.length<44){
        drops.push({x:mouse.x+(Math.random()-.5)*34,y:mouse.y+(Math.random()-.5)*34,vx:(Math.random()-.5)*2,vy:Math.random()*4+1,r:5,life:1});
      }
      drops.forEach((d,j)=>{
        d.x+=d.vx;d.y+=d.vy;d.vy+=0.05;d.r*=0.99;d.life-=0.01;
        const alpha=d.life*0.9;
        ctx.fillStyle=`rgba(200,200,220,${alpha})`;
        ctx.beginPath();ctx.ellipse(d.x,d.y,d.r,d.r*0.7,1,0,Math.PI*2);ctx.fill();
        ctx.strokeStyle=`rgba(200,200,220,${alpha*0.5})`;ctx.lineWidth=1;ctx.stroke();
        if(d.life<=0)drops.splice(j,1);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Mercury Lattice Pulse",
  tags:["liquid","metal","chrome"],
  description:"Mercury Lattice Pulse — particle effect with dynamic motion",
  code:`// Mercury Lattice Pulse animation code`,
  animator:(c,ctx,mouse)=>{
    let drops=[],t=0,id;
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(5,5,10,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      if(drops.length<45){
        drops.push({x:mouse.x+(Math.random()-.5)*35,y:mouse.y+(Math.random()-.5)*35,vx:(Math.random()-.5)*3,vy:Math.random()*2+1,r:6,life:1});
      }
      drops.forEach((d,j)=>{
        d.x+=d.vx;d.y+=d.vy;d.vx*=0.99;d.r*=0.99;d.life-=0.01;
        const alpha=d.life*0.5;
        ctx.fillStyle=`rgba(200,200,220,${alpha})`;
        ctx.beginPath();ctx.ellipse(d.x,d.y,d.r,d.r*0.8,0,0,Math.PI*2);ctx.fill();
        ctx.strokeStyle=`rgba(200,200,220,${alpha*0.5})`;ctx.lineWidth=1;ctx.stroke();
        if(d.life<=0)drops.splice(j,1);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Chrome Bloom Mesh",
  tags:["metal","chrome","mercury"],
  description:"Chrome Bloom Mesh — particle effect with dynamic motion",
  code:`// Chrome Bloom Mesh animation code`,
  animator:(c,ctx,mouse)=>{
    let drops=[],t=0,id;
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(5,5,10,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      if(drops.length<46){
        drops.push({x:mouse.x+(Math.random()-.5)*36,y:mouse.y+(Math.random()-.5)*36,vx:(Math.random()-.5)*4,vy:Math.random()*3+1,r:7,life:1});
      }
      drops.forEach((d,j)=>{
        d.x+=d.vx;d.y+=d.vy;d.vy+=0.05;d.r*=0.99;d.life-=0.01;
        const alpha=d.life*0.6;
        ctx.fillStyle=`rgba(200,200,220,${alpha})`;
        ctx.beginPath();ctx.ellipse(d.x,d.y,d.r,d.r*0.9,0.5,0,Math.PI*2);ctx.fill();
        ctx.strokeStyle=`rgba(200,200,220,${alpha*0.5})`;ctx.lineWidth=1;ctx.stroke();
        if(d.life<=0)drops.splice(j,1);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Liquid Steel Storm",
  tags:["chrome","mercury","fluid"],
  description:"Liquid Steel Storm — particle effect with dynamic motion",
  code:`// Liquid Steel Storm animation code`,
  animator:(c,ctx,mouse)=>{
    let drops=[],t=0,id;
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(5,5,10,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      if(drops.length<47){
        drops.push({x:mouse.x+(Math.random()-.5)*37,y:mouse.y+(Math.random()-.5)*37,vx:(Math.random()-.5)*5,vy:Math.random()*4+1,r:8,life:1});
      }
      drops.forEach((d,j)=>{
        d.x+=d.vx;d.y+=d.vy;d.vx*=0.99;d.r*=0.99;d.life-=0.01;
        const alpha=d.life*0.7;
        ctx.fillStyle=`rgba(200,200,220,${alpha})`;
        ctx.beginPath();ctx.ellipse(d.x,d.y,d.r,d.r*1,1,0,Math.PI*2);ctx.fill();
        ctx.strokeStyle=`rgba(200,200,220,${alpha*0.5})`;ctx.lineWidth=1;ctx.stroke();
        if(d.life<=0)drops.splice(j,1);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Metal Reflection Halo",
  tags:["mercury","fluid","liquid"],
  description:"Metal Reflection Halo — particle effect with dynamic motion",
  code:`// Metal Reflection Halo animation code`,
  animator:(c,ctx,mouse)=>{
    let drops=[],t=0,id;
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(5,5,10,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      if(drops.length<48){
        drops.push({x:mouse.x+(Math.random()-.5)*38,y:mouse.y+(Math.random()-.5)*38,vx:(Math.random()-.5)*2,vy:Math.random()*2+1,r:3,life:1});
      }
      drops.forEach((d,j)=>{
        d.x+=d.vx;d.y+=d.vy;d.vy+=0.05;d.r*=0.99;d.life-=0.01;
        const alpha=d.life*0.8;
        ctx.fillStyle=`rgba(200,200,220,${alpha})`;
        ctx.beginPath();ctx.ellipse(d.x,d.y,d.r,d.r*0.5,0,0,Math.PI*2);ctx.fill();
        ctx.strokeStyle=`rgba(200,200,220,${alpha*0.5})`;ctx.lineWidth=1;ctx.stroke();
        if(d.life<=0)drops.splice(j,1);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Alloy Bloom Net",
  tags:["fluid","liquid","metal"],
  description:"Alloy Bloom Net — particle effect with dynamic motion",
  code:`// Alloy Bloom Net animation code`,
  animator:(c,ctx,mouse)=>{
    let drops=[],t=0,id;
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(5,5,10,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      if(drops.length<49){
        drops.push({x:mouse.x+(Math.random()-.5)*39,y:mouse.y+(Math.random()-.5)*39,vx:(Math.random()-.5)*3,vy:Math.random()*3+1,r:4,life:1});
      }
      drops.forEach((d,j)=>{
        d.x+=d.vx;d.y+=d.vy;d.vx*=0.99;d.r*=0.99;d.life-=0.01;
        const alpha=d.life*0.9;
        ctx.fillStyle=`rgba(200,200,220,${alpha})`;
        ctx.beginPath();ctx.ellipse(d.x,d.y,d.r,d.r*0.6,0.5,0,Math.PI*2);ctx.fill();
        ctx.strokeStyle=`rgba(200,200,220,${alpha*0.5})`;ctx.lineWidth=1;ctx.stroke();
        if(d.life<=0)drops.splice(j,1);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

];

// ────────────────────────────────────────────────────────────
//  TYPOGRAPHY FX (50 effects)
// ────────────────────────────────────────────────────────────

export const typographyEffects = [

{
  name:"Glyph Bloom Field",
  tags:["text","glyph","font"],
  description:"Glyph Bloom Field — particle effect with dynamic motion",
  code:`// Glyph Bloom Field animation code`,
  animator:(c,ctx,mouse)=>{
    let glyphs=[],t=0,id;
    const chars="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*!?";
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(5,0,5,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      if(glyphs.length<30){
        glyphs.push({
          x:mouse.x+(Math.random()-.5)*100,
          y:mouse.y+(Math.random()-.5)*100,
          char:chars[Math.floor(Math.random()*chars.length)],
          vx:(Math.random()-.5)*2,
          vy:(Math.random()-.5)*2,
          life:1,size:8
        });
      }
      glyphs.forEach((g,j)=>{
        g.x+=g.vx;g.y+=g.vy;g.life-=0.01;
        ctx.fillStyle=`rgba(255,200,100,${g.life})`;
        ctx.font=`${g.size}px monospace`;
        ctx.fillText(g.char,g.x,g.y);
        if(g.life<=0)glyphs.splice(j,1);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Letter Fragment Swarm",
  tags:["glyph","font","typography"],
  description:"Letter Fragment Swarm — particle effect with dynamic motion",
  code:`// Letter Fragment Swarm animation code`,
  animator:(c,ctx,mouse)=>{
    let glyphs=[],t=0,id;
    const chars="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*!?";
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(5,0,5,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      if(glyphs.length<31){
        glyphs.push({
          x:mouse.x+(Math.random()-.5)*101,
          y:mouse.y+(Math.random()-.5)*101,
          char:chars[Math.floor(Math.random()*chars.length)],
          vx:(Math.random()-.5)*3,
          vy:(Math.random()-.5)*3,
          life:1,size:9
        });
      }
      glyphs.forEach((g,j)=>{
        g.x+=g.vx;g.y+=g.vy;g.life-=0.013000000000000001;
        ctx.fillStyle=`rgba(255,200,100,${g.life})`;
        ctx.font=`${g.size}px monospace`;
        ctx.fillText(g.char,g.x,g.y);
        if(g.life<=0)glyphs.splice(j,1);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Text Pulse Ring",
  tags:["font","typography","letter"],
  description:"Text Pulse Ring — particle effect with dynamic motion",
  code:`// Text Pulse Ring animation code`,
  animator:(c,ctx,mouse)=>{
    let glyphs=[],t=0,id;
    const chars="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*!?";
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(5,0,5,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      if(glyphs.length<32){
        glyphs.push({
          x:mouse.x+(Math.random()-.5)*102,
          y:mouse.y+(Math.random()-.5)*102,
          char:chars[Math.floor(Math.random()*chars.length)],
          vx:(Math.random()-.5)*4,
          vy:(Math.random()-.5)*4,
          life:1,size:10
        });
      }
      glyphs.forEach((g,j)=>{
        g.x+=g.vx;g.y+=g.vy;g.life-=0.016;
        ctx.fillStyle=`rgba(255,200,100,${g.life})`;
        ctx.font=`${g.size}px monospace`;
        ctx.fillText(g.char,g.x,g.y);
        if(g.life<=0)glyphs.splice(j,1);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Font Wireframe Flow",
  tags:["typography","letter","text"],
  description:"Font Wireframe Flow — particle effect with dynamic motion",
  code:`// Font Wireframe Flow animation code`,
  animator:(c,ctx,mouse)=>{
    let glyphs=[],t=0,id;
    const chars="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*!?";
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(5,0,5,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      if(glyphs.length<33){
        glyphs.push({
          x:mouse.x+(Math.random()-.5)*103,
          y:mouse.y+(Math.random()-.5)*103,
          char:chars[Math.floor(Math.random()*chars.length)],
          vx:(Math.random()-.5)*2,
          vy:(Math.random()-.5)*2,
          life:1,size:11
        });
      }
      glyphs.forEach((g,j)=>{
        g.x+=g.vx;g.y+=g.vy;g.life-=0.019000000000000003;
        ctx.fillStyle=`rgba(255,200,100,${g.life})`;
        ctx.font=`${g.size}px monospace`;
        ctx.fillText(g.char,g.x,g.y);
        if(g.life<=0)glyphs.splice(j,1);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Character Cascade Net",
  tags:["letter","text","glyph"],
  description:"Character Cascade Net — particle effect with dynamic motion",
  code:`// Character Cascade Net animation code`,
  animator:(c,ctx,mouse)=>{
    let glyphs=[],t=0,id;
    const chars="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*!?";
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(5,0,5,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      if(glyphs.length<34){
        glyphs.push({
          x:mouse.x+(Math.random()-.5)*104,
          y:mouse.y+(Math.random()-.5)*104,
          char:chars[Math.floor(Math.random()*chars.length)],
          vx:(Math.random()-.5)*3,
          vy:(Math.random()-.5)*3,
          life:1,size:12
        });
      }
      glyphs.forEach((g,j)=>{
        g.x+=g.vx;g.y+=g.vy;g.life-=0.022;
        ctx.fillStyle=`rgba(255,200,100,${g.life})`;
        ctx.font=`${g.size}px monospace`;
        ctx.fillText(g.char,g.x,g.y);
        if(g.life<=0)glyphs.splice(j,1);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Symbol Orbit Halo",
  tags:["text","glyph","font"],
  description:"Symbol Orbit Halo — particle effect with dynamic motion",
  code:`// Symbol Orbit Halo animation code`,
  animator:(c,ctx,mouse)=>{
    let glyphs=[],t=0,id;
    const chars="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*!?";
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(5,0,5,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      if(glyphs.length<35){
        glyphs.push({
          x:mouse.x+(Math.random()-.5)*105,
          y:mouse.y+(Math.random()-.5)*105,
          char:chars[Math.floor(Math.random()*chars.length)],
          vx:(Math.random()-.5)*4,
          vy:(Math.random()-.5)*4,
          life:1,size:13
        });
      }
      glyphs.forEach((g,j)=>{
        g.x+=g.vx;g.y+=g.vy;g.life-=0.01;
        ctx.fillStyle=`rgba(255,200,100,${g.life})`;
        ctx.font=`${g.size}px monospace`;
        ctx.fillText(g.char,g.x,g.y);
        if(g.life<=0)glyphs.splice(j,1);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Word Bloom Drift",
  tags:["glyph","font","typography"],
  description:"Word Bloom Drift — particle effect with dynamic motion",
  code:`// Word Bloom Drift animation code`,
  animator:(c,ctx,mouse)=>{
    let glyphs=[],t=0,id;
    const chars="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*!?";
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(5,0,5,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      if(glyphs.length<36){
        glyphs.push({
          x:mouse.x+(Math.random()-.5)*106,
          y:mouse.y+(Math.random()-.5)*106,
          char:chars[Math.floor(Math.random()*chars.length)],
          vx:(Math.random()-.5)*2,
          vy:(Math.random()-.5)*2,
          life:1,size:14
        });
      }
      glyphs.forEach((g,j)=>{
        g.x+=g.vx;g.y+=g.vy;g.life-=0.013000000000000001;
        ctx.fillStyle=`rgba(255,200,100,${g.life})`;
        ctx.font=`${g.size}px monospace`;
        ctx.fillText(g.char,g.x,g.y);
        if(g.life<=0)glyphs.splice(j,1);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Text Mesh Bloom",
  tags:["font","typography","letter"],
  description:"Text Mesh Bloom — particle effect with dynamic motion",
  code:`// Text Mesh Bloom animation code`,
  animator:(c,ctx,mouse)=>{
    let glyphs=[],t=0,id;
    const chars="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*!?";
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(5,0,5,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      if(glyphs.length<37){
        glyphs.push({
          x:mouse.x+(Math.random()-.5)*107,
          y:mouse.y+(Math.random()-.5)*107,
          char:chars[Math.floor(Math.random()*chars.length)],
          vx:(Math.random()-.5)*3,
          vy:(Math.random()-.5)*3,
          life:1,size:15
        });
      }
      glyphs.forEach((g,j)=>{
        g.x+=g.vx;g.y+=g.vy;g.life-=0.016;
        ctx.fillStyle=`rgba(255,200,100,${g.life})`;
        ctx.font=`${g.size}px monospace`;
        ctx.fillText(g.char,g.x,g.y);
        if(g.life<=0)glyphs.splice(j,1);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Letter Scan Pulse",
  tags:["typography","letter","text"],
  description:"Letter Scan Pulse — particle effect with dynamic motion",
  code:`// Letter Scan Pulse animation code`,
  animator:(c,ctx,mouse)=>{
    let glyphs=[],t=0,id;
    const chars="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*!?";
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(5,0,5,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      if(glyphs.length<38){
        glyphs.push({
          x:mouse.x+(Math.random()-.5)*108,
          y:mouse.y+(Math.random()-.5)*108,
          char:chars[Math.floor(Math.random()*chars.length)],
          vx:(Math.random()-.5)*4,
          vy:(Math.random()-.5)*4,
          life:1,size:16
        });
      }
      glyphs.forEach((g,j)=>{
        g.x+=g.vx;g.y+=g.vy;g.life-=0.019000000000000003;
        ctx.fillStyle=`rgba(255,200,100,${g.life})`;
        ctx.font=`${g.size}px monospace`;
        ctx.fillText(g.char,g.x,g.y);
        if(g.life<=0)glyphs.splice(j,1);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Typo Glitch Field",
  tags:["letter","text","glyph"],
  description:"Typo Glitch Field — particle effect with dynamic motion",
  code:`// Typo Glitch Field animation code`,
  animator:(c,ctx,mouse)=>{
    let glyphs=[],t=0,id;
    const chars="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*!?";
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(5,0,5,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      if(glyphs.length<39){
        glyphs.push({
          x:mouse.x+(Math.random()-.5)*109,
          y:mouse.y+(Math.random()-.5)*109,
          char:chars[Math.floor(Math.random()*chars.length)],
          vx:(Math.random()-.5)*2,
          vy:(Math.random()-.5)*2,
          life:1,size:17
        });
      }
      glyphs.forEach((g,j)=>{
        g.x+=g.vx;g.y+=g.vy;g.life-=0.022;
        ctx.fillStyle=`rgba(255,200,100,${g.life})`;
        ctx.font=`${g.size}px monospace`;
        ctx.fillText(g.char,g.x,g.y);
        if(g.life<=0)glyphs.splice(j,1);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Glyph Rain Flow",
  tags:["text","glyph","font"],
  description:"Glyph Rain Flow — particle effect with dynamic motion",
  code:`// Glyph Rain Flow animation code`,
  animator:(c,ctx,mouse)=>{
    let glyphs=[],t=0,id;
    const chars="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*!?";
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(5,0,5,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      if(glyphs.length<40){
        glyphs.push({
          x:mouse.x+(Math.random()-.5)*110,
          y:mouse.y+(Math.random()-.5)*110,
          char:chars[Math.floor(Math.random()*chars.length)],
          vx:(Math.random()-.5)*3,
          vy:(Math.random()-.5)*3,
          life:1,size:18
        });
      }
      glyphs.forEach((g,j)=>{
        g.x+=g.vx;g.y+=g.vy;g.life-=0.01;
        ctx.fillStyle=`rgba(255,200,100,${g.life})`;
        ctx.font=`${g.size}px monospace`;
        ctx.fillText(g.char,g.x,g.y);
        if(g.life<=0)glyphs.splice(j,1);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Character Bloom Net",
  tags:["glyph","font","typography"],
  description:"Character Bloom Net — particle effect with dynamic motion",
  code:`// Character Bloom Net animation code`,
  animator:(c,ctx,mouse)=>{
    let glyphs=[],t=0,id;
    const chars="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*!?";
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(5,0,5,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      if(glyphs.length<41){
        glyphs.push({
          x:mouse.x+(Math.random()-.5)*111,
          y:mouse.y+(Math.random()-.5)*111,
          char:chars[Math.floor(Math.random()*chars.length)],
          vx:(Math.random()-.5)*4,
          vy:(Math.random()-.5)*4,
          life:1,size:19
        });
      }
      glyphs.forEach((g,j)=>{
        g.x+=g.vx;g.y+=g.vy;g.life-=0.013000000000000001;
        ctx.fillStyle=`rgba(255,200,100,${g.life})`;
        ctx.font=`${g.size}px monospace`;
        ctx.fillText(g.char,g.x,g.y);
        if(g.life<=0)glyphs.splice(j,1);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Text Lattice Pulse",
  tags:["font","typography","letter"],
  description:"Text Lattice Pulse — particle effect with dynamic motion",
  code:`// Text Lattice Pulse animation code`,
  animator:(c,ctx,mouse)=>{
    let glyphs=[],t=0,id;
    const chars="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*!?";
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(5,0,5,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      if(glyphs.length<42){
        glyphs.push({
          x:mouse.x+(Math.random()-.5)*112,
          y:mouse.y+(Math.random()-.5)*112,
          char:chars[Math.floor(Math.random()*chars.length)],
          vx:(Math.random()-.5)*2,
          vy:(Math.random()-.5)*2,
          life:1,size:20
        });
      }
      glyphs.forEach((g,j)=>{
        g.x+=g.vx;g.y+=g.vy;g.life-=0.016;
        ctx.fillStyle=`rgba(255,200,100,${g.life})`;
        ctx.font=`${g.size}px monospace`;
        ctx.fillText(g.char,g.x,g.y);
        if(g.life<=0)glyphs.splice(j,1);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Font Bloom Storm",
  tags:["typography","letter","text"],
  description:"Font Bloom Storm — particle effect with dynamic motion",
  code:`// Font Bloom Storm animation code`,
  animator:(c,ctx,mouse)=>{
    let glyphs=[],t=0,id;
    const chars="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*!?";
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(5,0,5,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      if(glyphs.length<43){
        glyphs.push({
          x:mouse.x+(Math.random()-.5)*113,
          y:mouse.y+(Math.random()-.5)*113,
          char:chars[Math.floor(Math.random()*chars.length)],
          vx:(Math.random()-.5)*3,
          vy:(Math.random()-.5)*3,
          life:1,size:21
        });
      }
      glyphs.forEach((g,j)=>{
        g.x+=g.vx;g.y+=g.vy;g.life-=0.019000000000000003;
        ctx.fillStyle=`rgba(255,200,100,${g.life})`;
        ctx.font=`${g.size}px monospace`;
        ctx.fillText(g.char,g.x,g.y);
        if(g.life<=0)glyphs.splice(j,1);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Letter Halo Mesh",
  tags:["letter","text","glyph"],
  description:"Letter Halo Mesh — particle effect with dynamic motion",
  code:`// Letter Halo Mesh animation code`,
  animator:(c,ctx,mouse)=>{
    let glyphs=[],t=0,id;
    const chars="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*!?";
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(5,0,5,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      if(glyphs.length<44){
        glyphs.push({
          x:mouse.x+(Math.random()-.5)*114,
          y:mouse.y+(Math.random()-.5)*114,
          char:chars[Math.floor(Math.random()*chars.length)],
          vx:(Math.random()-.5)*4,
          vy:(Math.random()-.5)*4,
          life:1,size:22
        });
      }
      glyphs.forEach((g,j)=>{
        g.x+=g.vx;g.y+=g.vy;g.life-=0.022;
        ctx.fillStyle=`rgba(255,200,100,${g.life})`;
        ctx.font=`${g.size}px monospace`;
        ctx.fillText(g.char,g.x,g.y);
        if(g.life<=0)glyphs.splice(j,1);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Word Cascade Bloom",
  tags:["text","glyph","font"],
  description:"Word Cascade Bloom — particle effect with dynamic motion",
  code:`// Word Cascade Bloom animation code`,
  animator:(c,ctx,mouse)=>{
    let glyphs=[],t=0,id;
    const chars="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*!?";
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(5,0,5,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      if(glyphs.length<45){
        glyphs.push({
          x:mouse.x+(Math.random()-.5)*115,
          y:mouse.y+(Math.random()-.5)*115,
          char:chars[Math.floor(Math.random()*chars.length)],
          vx:(Math.random()-.5)*2,
          vy:(Math.random()-.5)*2,
          life:1,size:23
        });
      }
      glyphs.forEach((g,j)=>{
        g.x+=g.vx;g.y+=g.vy;g.life-=0.01;
        ctx.fillStyle=`rgba(255,200,100,${g.life})`;
        ctx.font=`${g.size}px monospace`;
        ctx.fillText(g.char,g.x,g.y);
        if(g.life<=0)glyphs.splice(j,1);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Symbol Bloom Field",
  tags:["glyph","font","typography"],
  description:"Symbol Bloom Field — particle effect with dynamic motion",
  code:`// Symbol Bloom Field animation code`,
  animator:(c,ctx,mouse)=>{
    let glyphs=[],t=0,id;
    const chars="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*!?";
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(5,0,5,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      if(glyphs.length<46){
        glyphs.push({
          x:mouse.x+(Math.random()-.5)*116,
          y:mouse.y+(Math.random()-.5)*116,
          char:chars[Math.floor(Math.random()*chars.length)],
          vx:(Math.random()-.5)*3,
          vy:(Math.random()-.5)*3,
          life:1,size:8
        });
      }
      glyphs.forEach((g,j)=>{
        g.x+=g.vx;g.y+=g.vy;g.life-=0.013000000000000001;
        ctx.fillStyle=`rgba(255,200,100,${g.life})`;
        ctx.font=`${g.size}px monospace`;
        ctx.fillText(g.char,g.x,g.y);
        if(g.life<=0)glyphs.splice(j,1);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Text Ribbon Flow",
  tags:["font","typography","letter"],
  description:"Text Ribbon Flow — particle effect with dynamic motion",
  code:`// Text Ribbon Flow animation code`,
  animator:(c,ctx,mouse)=>{
    let glyphs=[],t=0,id;
    const chars="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*!?";
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(5,0,5,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      if(glyphs.length<47){
        glyphs.push({
          x:mouse.x+(Math.random()-.5)*117,
          y:mouse.y+(Math.random()-.5)*117,
          char:chars[Math.floor(Math.random()*chars.length)],
          vx:(Math.random()-.5)*4,
          vy:(Math.random()-.5)*4,
          life:1,size:9
        });
      }
      glyphs.forEach((g,j)=>{
        g.x+=g.vx;g.y+=g.vy;g.life-=0.016;
        ctx.fillStyle=`rgba(255,200,100,${g.life})`;
        ctx.font=`${g.size}px monospace`;
        ctx.fillText(g.char,g.x,g.y);
        if(g.life<=0)glyphs.splice(j,1);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Glyph Core Pulse",
  tags:["typography","letter","text"],
  description:"Glyph Core Pulse — particle effect with dynamic motion",
  code:`// Glyph Core Pulse animation code`,
  animator:(c,ctx,mouse)=>{
    let glyphs=[],t=0,id;
    const chars="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*!?";
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(5,0,5,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      if(glyphs.length<48){
        glyphs.push({
          x:mouse.x+(Math.random()-.5)*118,
          y:mouse.y+(Math.random()-.5)*118,
          char:chars[Math.floor(Math.random()*chars.length)],
          vx:(Math.random()-.5)*2,
          vy:(Math.random()-.5)*2,
          life:1,size:10
        });
      }
      glyphs.forEach((g,j)=>{
        g.x+=g.vx;g.y+=g.vy;g.life-=0.019000000000000003;
        ctx.fillStyle=`rgba(255,200,100,${g.life})`;
        ctx.font=`${g.size}px monospace`;
        ctx.fillText(g.char,g.x,g.y);
        if(g.life<=0)glyphs.splice(j,1);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Character Bloom Orbit",
  tags:["letter","text","glyph"],
  description:"Character Bloom Orbit — particle effect with dynamic motion",
  code:`// Character Bloom Orbit animation code`,
  animator:(c,ctx,mouse)=>{
    let glyphs=[],t=0,id;
    const chars="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*!?";
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(5,0,5,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      if(glyphs.length<49){
        glyphs.push({
          x:mouse.x+(Math.random()-.5)*119,
          y:mouse.y+(Math.random()-.5)*119,
          char:chars[Math.floor(Math.random()*chars.length)],
          vx:(Math.random()-.5)*3,
          vy:(Math.random()-.5)*3,
          life:1,size:11
        });
      }
      glyphs.forEach((g,j)=>{
        g.x+=g.vx;g.y+=g.vy;g.life-=0.022;
        ctx.fillStyle=`rgba(255,200,100,${g.life})`;
        ctx.font=`${g.size}px monospace`;
        ctx.fillText(g.char,g.x,g.y);
        if(g.life<=0)glyphs.splice(j,1);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Font Pulse Net",
  tags:["text","glyph","font"],
  description:"Font Pulse Net — particle effect with dynamic motion",
  code:`// Font Pulse Net animation code`,
  animator:(c,ctx,mouse)=>{
    let glyphs=[],t=0,id;
    const chars="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*!?";
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(5,0,5,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      if(glyphs.length<50){
        glyphs.push({
          x:mouse.x+(Math.random()-.5)*120,
          y:mouse.y+(Math.random()-.5)*120,
          char:chars[Math.floor(Math.random()*chars.length)],
          vx:(Math.random()-.5)*4,
          vy:(Math.random()-.5)*4,
          life:1,size:12
        });
      }
      glyphs.forEach((g,j)=>{
        g.x+=g.vx;g.y+=g.vy;g.life-=0.01;
        ctx.fillStyle=`rgba(255,200,100,${g.life})`;
        ctx.font=`${g.size}px monospace`;
        ctx.fillText(g.char,g.x,g.y);
        if(g.life<=0)glyphs.splice(j,1);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Text Bloom Rings",
  tags:["glyph","font","typography"],
  description:"Text Bloom Rings — particle effect with dynamic motion",
  code:`// Text Bloom Rings animation code`,
  animator:(c,ctx,mouse)=>{
    let glyphs=[],t=0,id;
    const chars="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*!?";
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(5,0,5,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      if(glyphs.length<51){
        glyphs.push({
          x:mouse.x+(Math.random()-.5)*121,
          y:mouse.y+(Math.random()-.5)*121,
          char:chars[Math.floor(Math.random()*chars.length)],
          vx:(Math.random()-.5)*2,
          vy:(Math.random()-.5)*2,
          life:1,size:13
        });
      }
      glyphs.forEach((g,j)=>{
        g.x+=g.vx;g.y+=g.vy;g.life-=0.013000000000000001;
        ctx.fillStyle=`rgba(255,200,100,${g.life})`;
        ctx.font=`${g.size}px monospace`;
        ctx.fillText(g.char,g.x,g.y);
        if(g.life<=0)glyphs.splice(j,1);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Letter Bloom Field",
  tags:["font","typography","letter"],
  description:"Letter Bloom Field — particle effect with dynamic motion",
  code:`// Letter Bloom Field animation code`,
  animator:(c,ctx,mouse)=>{
    let glyphs=[],t=0,id;
    const chars="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*!?";
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(5,0,5,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      if(glyphs.length<52){
        glyphs.push({
          x:mouse.x+(Math.random()-.5)*122,
          y:mouse.y+(Math.random()-.5)*122,
          char:chars[Math.floor(Math.random()*chars.length)],
          vx:(Math.random()-.5)*3,
          vy:(Math.random()-.5)*3,
          life:1,size:14
        });
      }
      glyphs.forEach((g,j)=>{
        g.x+=g.vx;g.y+=g.vy;g.life-=0.016;
        ctx.fillStyle=`rgba(255,200,100,${g.life})`;
        ctx.font=`${g.size}px monospace`;
        ctx.fillText(g.char,g.x,g.y);
        if(g.life<=0)glyphs.splice(j,1);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Glyph Orbit Net",
  tags:["typography","letter","text"],
  description:"Glyph Orbit Net — particle effect with dynamic motion",
  code:`// Glyph Orbit Net animation code`,
  animator:(c,ctx,mouse)=>{
    let glyphs=[],t=0,id;
    const chars="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*!?";
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(5,0,5,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      if(glyphs.length<53){
        glyphs.push({
          x:mouse.x+(Math.random()-.5)*123,
          y:mouse.y+(Math.random()-.5)*123,
          char:chars[Math.floor(Math.random()*chars.length)],
          vx:(Math.random()-.5)*4,
          vy:(Math.random()-.5)*4,
          life:1,size:15
        });
      }
      glyphs.forEach((g,j)=>{
        g.x+=g.vx;g.y+=g.vy;g.life-=0.019000000000000003;
        ctx.fillStyle=`rgba(255,200,100,${g.life})`;
        ctx.font=`${g.size}px monospace`;
        ctx.fillText(g.char,g.x,g.y);
        if(g.life<=0)glyphs.splice(j,1);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Word Pulse Bloom",
  tags:["letter","text","glyph"],
  description:"Word Pulse Bloom — particle effect with dynamic motion",
  code:`// Word Pulse Bloom animation code`,
  animator:(c,ctx,mouse)=>{
    let glyphs=[],t=0,id;
    const chars="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*!?";
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(5,0,5,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      if(glyphs.length<54){
        glyphs.push({
          x:mouse.x+(Math.random()-.5)*124,
          y:mouse.y+(Math.random()-.5)*124,
          char:chars[Math.floor(Math.random()*chars.length)],
          vx:(Math.random()-.5)*2,
          vy:(Math.random()-.5)*2,
          life:1,size:16
        });
      }
      glyphs.forEach((g,j)=>{
        g.x+=g.vx;g.y+=g.vy;g.life-=0.022;
        ctx.fillStyle=`rgba(255,200,100,${g.life})`;
        ctx.font=`${g.size}px monospace`;
        ctx.fillText(g.char,g.x,g.y);
        if(g.life<=0)glyphs.splice(j,1);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Character Halo Flow",
  tags:["text","glyph","font"],
  description:"Character Halo Flow — particle effect with dynamic motion",
  code:`// Character Halo Flow animation code`,
  animator:(c,ctx,mouse)=>{
    let glyphs=[],t=0,id;
    const chars="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*!?";
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(5,0,5,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      if(glyphs.length<55){
        glyphs.push({
          x:mouse.x+(Math.random()-.5)*125,
          y:mouse.y+(Math.random()-.5)*125,
          char:chars[Math.floor(Math.random()*chars.length)],
          vx:(Math.random()-.5)*3,
          vy:(Math.random()-.5)*3,
          life:1,size:17
        });
      }
      glyphs.forEach((g,j)=>{
        g.x+=g.vx;g.y+=g.vy;g.life-=0.01;
        ctx.fillStyle=`rgba(255,200,100,${g.life})`;
        ctx.font=`${g.size}px monospace`;
        ctx.fillText(g.char,g.x,g.y);
        if(g.life<=0)glyphs.splice(j,1);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Font Bloom Lattice",
  tags:["glyph","font","typography"],
  description:"Font Bloom Lattice — particle effect with dynamic motion",
  code:`// Font Bloom Lattice animation code`,
  animator:(c,ctx,mouse)=>{
    let glyphs=[],t=0,id;
    const chars="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*!?";
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(5,0,5,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      if(glyphs.length<56){
        glyphs.push({
          x:mouse.x+(Math.random()-.5)*126,
          y:mouse.y+(Math.random()-.5)*126,
          char:chars[Math.floor(Math.random()*chars.length)],
          vx:(Math.random()-.5)*4,
          vy:(Math.random()-.5)*4,
          life:1,size:18
        });
      }
      glyphs.forEach((g,j)=>{
        g.x+=g.vx;g.y+=g.vy;g.life-=0.013000000000000001;
        ctx.fillStyle=`rgba(255,200,100,${g.life})`;
        ctx.font=`${g.size}px monospace`;
        ctx.fillText(g.char,g.x,g.y);
        if(g.life<=0)glyphs.splice(j,1);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Text Drift Mesh",
  tags:["font","typography","letter"],
  description:"Text Drift Mesh — particle effect with dynamic motion",
  code:`// Text Drift Mesh animation code`,
  animator:(c,ctx,mouse)=>{
    let glyphs=[],t=0,id;
    const chars="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*!?";
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(5,0,5,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      if(glyphs.length<57){
        glyphs.push({
          x:mouse.x+(Math.random()-.5)*127,
          y:mouse.y+(Math.random()-.5)*127,
          char:chars[Math.floor(Math.random()*chars.length)],
          vx:(Math.random()-.5)*2,
          vy:(Math.random()-.5)*2,
          life:1,size:19
        });
      }
      glyphs.forEach((g,j)=>{
        g.x+=g.vx;g.y+=g.vy;g.life-=0.016;
        ctx.fillStyle=`rgba(255,200,100,${g.life})`;
        ctx.font=`${g.size}px monospace`;
        ctx.fillText(g.char,g.x,g.y);
        if(g.life<=0)glyphs.splice(j,1);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Letter Signal Net",
  tags:["typography","letter","text"],
  description:"Letter Signal Net — particle effect with dynamic motion",
  code:`// Letter Signal Net animation code`,
  animator:(c,ctx,mouse)=>{
    let glyphs=[],t=0,id;
    const chars="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*!?";
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(5,0,5,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      if(glyphs.length<58){
        glyphs.push({
          x:mouse.x+(Math.random()-.5)*128,
          y:mouse.y+(Math.random()-.5)*128,
          char:chars[Math.floor(Math.random()*chars.length)],
          vx:(Math.random()-.5)*3,
          vy:(Math.random()-.5)*3,
          life:1,size:20
        });
      }
      glyphs.forEach((g,j)=>{
        g.x+=g.vx;g.y+=g.vy;g.life-=0.019000000000000003;
        ctx.fillStyle=`rgba(255,200,100,${g.life})`;
        ctx.font=`${g.size}px monospace`;
        ctx.fillText(g.char,g.x,g.y);
        if(g.life<=0)glyphs.splice(j,1);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Glyph Bloom Core",
  tags:["letter","text","glyph"],
  description:"Glyph Bloom Core — particle effect with dynamic motion",
  code:`// Glyph Bloom Core animation code`,
  animator:(c,ctx,mouse)=>{
    let glyphs=[],t=0,id;
    const chars="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*!?";
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(5,0,5,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      if(glyphs.length<59){
        glyphs.push({
          x:mouse.x+(Math.random()-.5)*129,
          y:mouse.y+(Math.random()-.5)*129,
          char:chars[Math.floor(Math.random()*chars.length)],
          vx:(Math.random()-.5)*4,
          vy:(Math.random()-.5)*4,
          life:1,size:21
        });
      }
      glyphs.forEach((g,j)=>{
        g.x+=g.vx;g.y+=g.vy;g.life-=0.022;
        ctx.fillStyle=`rgba(255,200,100,${g.life})`;
        ctx.font=`${g.size}px monospace`;
        ctx.fillText(g.char,g.x,g.y);
        if(g.life<=0)glyphs.splice(j,1);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Character Bloom Storm",
  tags:["text","glyph","font"],
  description:"Character Bloom Storm — particle effect with dynamic motion",
  code:`// Character Bloom Storm animation code`,
  animator:(c,ctx,mouse)=>{
    let glyphs=[],t=0,id;
    const chars="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*!?";
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(5,0,5,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      if(glyphs.length<30){
        glyphs.push({
          x:mouse.x+(Math.random()-.5)*130,
          y:mouse.y+(Math.random()-.5)*130,
          char:chars[Math.floor(Math.random()*chars.length)],
          vx:(Math.random()-.5)*2,
          vy:(Math.random()-.5)*2,
          life:1,size:22
        });
      }
      glyphs.forEach((g,j)=>{
        g.x+=g.vx;g.y+=g.vy;g.life-=0.01;
        ctx.fillStyle=`rgba(255,200,100,${g.life})`;
        ctx.font=`${g.size}px monospace`;
        ctx.fillText(g.char,g.x,g.y);
        if(g.life<=0)glyphs.splice(j,1);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Word Halo Pulse",
  tags:["glyph","font","typography"],
  description:"Word Halo Pulse — particle effect with dynamic motion",
  code:`// Word Halo Pulse animation code`,
  animator:(c,ctx,mouse)=>{
    let glyphs=[],t=0,id;
    const chars="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*!?";
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(5,0,5,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      if(glyphs.length<31){
        glyphs.push({
          x:mouse.x+(Math.random()-.5)*131,
          y:mouse.y+(Math.random()-.5)*131,
          char:chars[Math.floor(Math.random()*chars.length)],
          vx:(Math.random()-.5)*3,
          vy:(Math.random()-.5)*3,
          life:1,size:23
        });
      }
      glyphs.forEach((g,j)=>{
        g.x+=g.vx;g.y+=g.vy;g.life-=0.013000000000000001;
        ctx.fillStyle=`rgba(255,200,100,${g.life})`;
        ctx.font=`${g.size}px monospace`;
        ctx.fillText(g.char,g.x,g.y);
        if(g.life<=0)glyphs.splice(j,1);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Font Cascade Bloom",
  tags:["font","typography","letter"],
  description:"Font Cascade Bloom — particle effect with dynamic motion",
  code:`// Font Cascade Bloom animation code`,
  animator:(c,ctx,mouse)=>{
    let glyphs=[],t=0,id;
    const chars="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*!?";
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(5,0,5,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      if(glyphs.length<32){
        glyphs.push({
          x:mouse.x+(Math.random()-.5)*132,
          y:mouse.y+(Math.random()-.5)*132,
          char:chars[Math.floor(Math.random()*chars.length)],
          vx:(Math.random()-.5)*4,
          vy:(Math.random()-.5)*4,
          life:1,size:8
        });
      }
      glyphs.forEach((g,j)=>{
        g.x+=g.vx;g.y+=g.vy;g.life-=0.016;
        ctx.fillStyle=`rgba(255,200,100,${g.life})`;
        ctx.font=`${g.size}px monospace`;
        ctx.fillText(g.char,g.x,g.y);
        if(g.life<=0)glyphs.splice(j,1);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Text Bloom Core",
  tags:["typography","letter","text"],
  description:"Text Bloom Core — particle effect with dynamic motion",
  code:`// Text Bloom Core animation code`,
  animator:(c,ctx,mouse)=>{
    let glyphs=[],t=0,id;
    const chars="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*!?";
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(5,0,5,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      if(glyphs.length<33){
        glyphs.push({
          x:mouse.x+(Math.random()-.5)*133,
          y:mouse.y+(Math.random()-.5)*133,
          char:chars[Math.floor(Math.random()*chars.length)],
          vx:(Math.random()-.5)*2,
          vy:(Math.random()-.5)*2,
          life:1,size:9
        });
      }
      glyphs.forEach((g,j)=>{
        g.x+=g.vx;g.y+=g.vy;g.life-=0.019000000000000003;
        ctx.fillStyle=`rgba(255,200,100,${g.life})`;
        ctx.font=`${g.size}px monospace`;
        ctx.fillText(g.char,g.x,g.y);
        if(g.life<=0)glyphs.splice(j,1);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Glyph Mesh Flow",
  tags:["letter","text","glyph"],
  description:"Glyph Mesh Flow — particle effect with dynamic motion",
  code:`// Glyph Mesh Flow animation code`,
  animator:(c,ctx,mouse)=>{
    let glyphs=[],t=0,id;
    const chars="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*!?";
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(5,0,5,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      if(glyphs.length<34){
        glyphs.push({
          x:mouse.x+(Math.random()-.5)*134,
          y:mouse.y+(Math.random()-.5)*134,
          char:chars[Math.floor(Math.random()*chars.length)],
          vx:(Math.random()-.5)*3,
          vy:(Math.random()-.5)*3,
          life:1,size:10
        });
      }
      glyphs.forEach((g,j)=>{
        g.x+=g.vx;g.y+=g.vy;g.life-=0.022;
        ctx.fillStyle=`rgba(255,200,100,${g.life})`;
        ctx.font=`${g.size}px monospace`;
        ctx.fillText(g.char,g.x,g.y);
        if(g.life<=0)glyphs.splice(j,1);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Letter Bloom Halo",
  tags:["text","glyph","font"],
  description:"Letter Bloom Halo — particle effect with dynamic motion",
  code:`// Letter Bloom Halo animation code`,
  animator:(c,ctx,mouse)=>{
    let glyphs=[],t=0,id;
    const chars="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*!?";
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(5,0,5,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      if(glyphs.length<35){
        glyphs.push({
          x:mouse.x+(Math.random()-.5)*135,
          y:mouse.y+(Math.random()-.5)*135,
          char:chars[Math.floor(Math.random()*chars.length)],
          vx:(Math.random()-.5)*4,
          vy:(Math.random()-.5)*4,
          life:1,size:11
        });
      }
      glyphs.forEach((g,j)=>{
        g.x+=g.vx;g.y+=g.vy;g.life-=0.01;
        ctx.fillStyle=`rgba(255,200,100,${g.life})`;
        ctx.font=`${g.size}px monospace`;
        ctx.fillText(g.char,g.x,g.y);
        if(g.life<=0)glyphs.splice(j,1);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Word Pulse Net",
  tags:["glyph","font","typography"],
  description:"Word Pulse Net — particle effect with dynamic motion",
  code:`// Word Pulse Net animation code`,
  animator:(c,ctx,mouse)=>{
    let glyphs=[],t=0,id;
    const chars="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*!?";
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(5,0,5,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      if(glyphs.length<36){
        glyphs.push({
          x:mouse.x+(Math.random()-.5)*136,
          y:mouse.y+(Math.random()-.5)*136,
          char:chars[Math.floor(Math.random()*chars.length)],
          vx:(Math.random()-.5)*2,
          vy:(Math.random()-.5)*2,
          life:1,size:12
        });
      }
      glyphs.forEach((g,j)=>{
        g.x+=g.vx;g.y+=g.vy;g.life-=0.013000000000000001;
        ctx.fillStyle=`rgba(255,200,100,${g.life})`;
        ctx.font=`${g.size}px monospace`;
        ctx.fillText(g.char,g.x,g.y);
        if(g.life<=0)glyphs.splice(j,1);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Character Bloom Grid",
  tags:["font","typography","letter"],
  description:"Character Bloom Grid — particle effect with dynamic motion",
  code:`// Character Bloom Grid animation code`,
  animator:(c,ctx,mouse)=>{
    let glyphs=[],t=0,id;
    const chars="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*!?";
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(5,0,5,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      if(glyphs.length<37){
        glyphs.push({
          x:mouse.x+(Math.random()-.5)*137,
          y:mouse.y+(Math.random()-.5)*137,
          char:chars[Math.floor(Math.random()*chars.length)],
          vx:(Math.random()-.5)*3,
          vy:(Math.random()-.5)*3,
          life:1,size:13
        });
      }
      glyphs.forEach((g,j)=>{
        g.x+=g.vx;g.y+=g.vy;g.life-=0.016;
        ctx.fillStyle=`rgba(255,200,100,${g.life})`;
        ctx.font=`${g.size}px monospace`;
        ctx.fillText(g.char,g.x,g.y);
        if(g.life<=0)glyphs.splice(j,1);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Font Orbit Halo",
  tags:["typography","letter","text"],
  description:"Font Orbit Halo — particle effect with dynamic motion",
  code:`// Font Orbit Halo animation code`,
  animator:(c,ctx,mouse)=>{
    let glyphs=[],t=0,id;
    const chars="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*!?";
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(5,0,5,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      if(glyphs.length<38){
        glyphs.push({
          x:mouse.x+(Math.random()-.5)*138,
          y:mouse.y+(Math.random()-.5)*138,
          char:chars[Math.floor(Math.random()*chars.length)],
          vx:(Math.random()-.5)*4,
          vy:(Math.random()-.5)*4,
          life:1,size:14
        });
      }
      glyphs.forEach((g,j)=>{
        g.x+=g.vx;g.y+=g.vy;g.life-=0.019000000000000003;
        ctx.fillStyle=`rgba(255,200,100,${g.life})`;
        ctx.font=`${g.size}px monospace`;
        ctx.fillText(g.char,g.x,g.y);
        if(g.life<=0)glyphs.splice(j,1);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Text Bloom Lattice",
  tags:["letter","text","glyph"],
  description:"Text Bloom Lattice — particle effect with dynamic motion",
  code:`// Text Bloom Lattice animation code`,
  animator:(c,ctx,mouse)=>{
    let glyphs=[],t=0,id;
    const chars="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*!?";
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(5,0,5,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      if(glyphs.length<39){
        glyphs.push({
          x:mouse.x+(Math.random()-.5)*139,
          y:mouse.y+(Math.random()-.5)*139,
          char:chars[Math.floor(Math.random()*chars.length)],
          vx:(Math.random()-.5)*2,
          vy:(Math.random()-.5)*2,
          life:1,size:15
        });
      }
      glyphs.forEach((g,j)=>{
        g.x+=g.vx;g.y+=g.vy;g.life-=0.022;
        ctx.fillStyle=`rgba(255,200,100,${g.life})`;
        ctx.font=`${g.size}px monospace`;
        ctx.fillText(g.char,g.x,g.y);
        if(g.life<=0)glyphs.splice(j,1);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Glyph Flow Net",
  tags:["text","glyph","font"],
  description:"Glyph Flow Net — particle effect with dynamic motion",
  code:`// Glyph Flow Net animation code`,
  animator:(c,ctx,mouse)=>{
    let glyphs=[],t=0,id;
    const chars="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*!?";
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(5,0,5,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      if(glyphs.length<40){
        glyphs.push({
          x:mouse.x+(Math.random()-.5)*140,
          y:mouse.y+(Math.random()-.5)*140,
          char:chars[Math.floor(Math.random()*chars.length)],
          vx:(Math.random()-.5)*3,
          vy:(Math.random()-.5)*3,
          life:1,size:16
        });
      }
      glyphs.forEach((g,j)=>{
        g.x+=g.vx;g.y+=g.vy;g.life-=0.01;
        ctx.fillStyle=`rgba(255,200,100,${g.life})`;
        ctx.font=`${g.size}px monospace`;
        ctx.fillText(g.char,g.x,g.y);
        if(g.life<=0)glyphs.splice(j,1);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Letter Bloom Rings",
  tags:["glyph","font","typography"],
  description:"Letter Bloom Rings — particle effect with dynamic motion",
  code:`// Letter Bloom Rings animation code`,
  animator:(c,ctx,mouse)=>{
    let glyphs=[],t=0,id;
    const chars="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*!?";
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(5,0,5,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      if(glyphs.length<41){
        glyphs.push({
          x:mouse.x+(Math.random()-.5)*141,
          y:mouse.y+(Math.random()-.5)*141,
          char:chars[Math.floor(Math.random()*chars.length)],
          vx:(Math.random()-.5)*4,
          vy:(Math.random()-.5)*4,
          life:1,size:17
        });
      }
      glyphs.forEach((g,j)=>{
        g.x+=g.vx;g.y+=g.vy;g.life-=0.013000000000000001;
        ctx.fillStyle=`rgba(255,200,100,${g.life})`;
        ctx.font=`${g.size}px monospace`;
        ctx.fillText(g.char,g.x,g.y);
        if(g.life<=0)glyphs.splice(j,1);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Word Cascade Pulse",
  tags:["font","typography","letter"],
  description:"Word Cascade Pulse — particle effect with dynamic motion",
  code:`// Word Cascade Pulse animation code`,
  animator:(c,ctx,mouse)=>{
    let glyphs=[],t=0,id;
    const chars="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*!?";
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(5,0,5,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      if(glyphs.length<42){
        glyphs.push({
          x:mouse.x+(Math.random()-.5)*142,
          y:mouse.y+(Math.random()-.5)*142,
          char:chars[Math.floor(Math.random()*chars.length)],
          vx:(Math.random()-.5)*2,
          vy:(Math.random()-.5)*2,
          life:1,size:18
        });
      }
      glyphs.forEach((g,j)=>{
        g.x+=g.vx;g.y+=g.vy;g.life-=0.016;
        ctx.fillStyle=`rgba(255,200,100,${g.life})`;
        ctx.font=`${g.size}px monospace`;
        ctx.fillText(g.char,g.x,g.y);
        if(g.life<=0)glyphs.splice(j,1);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Character Bloom Core",
  tags:["typography","letter","text"],
  description:"Character Bloom Core — particle effect with dynamic motion",
  code:`// Character Bloom Core animation code`,
  animator:(c,ctx,mouse)=>{
    let glyphs=[],t=0,id;
    const chars="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*!?";
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(5,0,5,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      if(glyphs.length<43){
        glyphs.push({
          x:mouse.x+(Math.random()-.5)*143,
          y:mouse.y+(Math.random()-.5)*143,
          char:chars[Math.floor(Math.random()*chars.length)],
          vx:(Math.random()-.5)*3,
          vy:(Math.random()-.5)*3,
          life:1,size:19
        });
      }
      glyphs.forEach((g,j)=>{
        g.x+=g.vx;g.y+=g.vy;g.life-=0.019000000000000003;
        ctx.fillStyle=`rgba(255,200,100,${g.life})`;
        ctx.font=`${g.size}px monospace`;
        ctx.fillText(g.char,g.x,g.y);
        if(g.life<=0)glyphs.splice(j,1);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Font Halo Net",
  tags:["letter","text","glyph"],
  description:"Font Halo Net — particle effect with dynamic motion",
  code:`// Font Halo Net animation code`,
  animator:(c,ctx,mouse)=>{
    let glyphs=[],t=0,id;
    const chars="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*!?";
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(5,0,5,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      if(glyphs.length<44){
        glyphs.push({
          x:mouse.x+(Math.random()-.5)*144,
          y:mouse.y+(Math.random()-.5)*144,
          char:chars[Math.floor(Math.random()*chars.length)],
          vx:(Math.random()-.5)*4,
          vy:(Math.random()-.5)*4,
          life:1,size:20
        });
      }
      glyphs.forEach((g,j)=>{
        g.x+=g.vx;g.y+=g.vy;g.life-=0.022;
        ctx.fillStyle=`rgba(255,200,100,${g.life})`;
        ctx.font=`${g.size}px monospace`;
        ctx.fillText(g.char,g.x,g.y);
        if(g.life<=0)glyphs.splice(j,1);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Text Bloom Storm",
  tags:["text","glyph","font"],
  description:"Text Bloom Storm — particle effect with dynamic motion",
  code:`// Text Bloom Storm animation code`,
  animator:(c,ctx,mouse)=>{
    let glyphs=[],t=0,id;
    const chars="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*!?";
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(5,0,5,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      if(glyphs.length<45){
        glyphs.push({
          x:mouse.x+(Math.random()-.5)*145,
          y:mouse.y+(Math.random()-.5)*145,
          char:chars[Math.floor(Math.random()*chars.length)],
          vx:(Math.random()-.5)*2,
          vy:(Math.random()-.5)*2,
          life:1,size:21
        });
      }
      glyphs.forEach((g,j)=>{
        g.x+=g.vx;g.y+=g.vy;g.life-=0.01;
        ctx.fillStyle=`rgba(255,200,100,${g.life})`;
        ctx.font=`${g.size}px monospace`;
        ctx.fillText(g.char,g.x,g.y);
        if(g.life<=0)glyphs.splice(j,1);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Glyph Bloom Orbit",
  tags:["glyph","font","typography"],
  description:"Glyph Bloom Orbit — particle effect with dynamic motion",
  code:`// Glyph Bloom Orbit animation code`,
  animator:(c,ctx,mouse)=>{
    let glyphs=[],t=0,id;
    const chars="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*!?";
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(5,0,5,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      if(glyphs.length<46){
        glyphs.push({
          x:mouse.x+(Math.random()-.5)*146,
          y:mouse.y+(Math.random()-.5)*146,
          char:chars[Math.floor(Math.random()*chars.length)],
          vx:(Math.random()-.5)*3,
          vy:(Math.random()-.5)*3,
          life:1,size:22
        });
      }
      glyphs.forEach((g,j)=>{
        g.x+=g.vx;g.y+=g.vy;g.life-=0.013000000000000001;
        ctx.fillStyle=`rgba(255,200,100,${g.life})`;
        ctx.font=`${g.size}px monospace`;
        ctx.fillText(g.char,g.x,g.y);
        if(g.life<=0)glyphs.splice(j,1);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Letter Mesh Pulse",
  tags:["font","typography","letter"],
  description:"Letter Mesh Pulse — particle effect with dynamic motion",
  code:`// Letter Mesh Pulse animation code`,
  animator:(c,ctx,mouse)=>{
    let glyphs=[],t=0,id;
    const chars="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*!?";
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(5,0,5,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      if(glyphs.length<47){
        glyphs.push({
          x:mouse.x+(Math.random()-.5)*147,
          y:mouse.y+(Math.random()-.5)*147,
          char:chars[Math.floor(Math.random()*chars.length)],
          vx:(Math.random()-.5)*4,
          vy:(Math.random()-.5)*4,
          life:1,size:23
        });
      }
      glyphs.forEach((g,j)=>{
        g.x+=g.vx;g.y+=g.vy;g.life-=0.016;
        ctx.fillStyle=`rgba(255,200,100,${g.life})`;
        ctx.font=`${g.size}px monospace`;
        ctx.fillText(g.char,g.x,g.y);
        if(g.life<=0)glyphs.splice(j,1);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Word Bloom Halo",
  tags:["typography","letter","text"],
  description:"Word Bloom Halo — particle effect with dynamic motion",
  code:`// Word Bloom Halo animation code`,
  animator:(c,ctx,mouse)=>{
    let glyphs=[],t=0,id;
    const chars="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*!?";
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(5,0,5,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      if(glyphs.length<48){
        glyphs.push({
          x:mouse.x+(Math.random()-.5)*148,
          y:mouse.y+(Math.random()-.5)*148,
          char:chars[Math.floor(Math.random()*chars.length)],
          vx:(Math.random()-.5)*2,
          vy:(Math.random()-.5)*2,
          life:1,size:8
        });
      }
      glyphs.forEach((g,j)=>{
        g.x+=g.vx;g.y+=g.vy;g.life-=0.019000000000000003;
        ctx.fillStyle=`rgba(255,200,100,${g.life})`;
        ctx.font=`${g.size}px monospace`;
        ctx.fillText(g.char,g.x,g.y);
        if(g.life<=0)glyphs.splice(j,1);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Character Pulse Net",
  tags:["letter","text","glyph"],
  description:"Character Pulse Net — particle effect with dynamic motion",
  code:`// Character Pulse Net animation code`,
  animator:(c,ctx,mouse)=>{
    let glyphs=[],t=0,id;
    const chars="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*!?";
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(5,0,5,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      if(glyphs.length<49){
        glyphs.push({
          x:mouse.x+(Math.random()-.5)*149,
          y:mouse.y+(Math.random()-.5)*149,
          char:chars[Math.floor(Math.random()*chars.length)],
          vx:(Math.random()-.5)*3,
          vy:(Math.random()-.5)*3,
          life:1,size:9
        });
      }
      glyphs.forEach((g,j)=>{
        g.x+=g.vx;g.y+=g.vy;g.life-=0.022;
        ctx.fillStyle=`rgba(255,200,100,${g.life})`;
        ctx.font=`${g.size}px monospace`;
        ctx.fillText(g.char,g.x,g.y);
        if(g.life<=0)glyphs.splice(j,1);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

];

// ────────────────────────────────────────────────────────────
//  LOGO / REVEAL FX (50 effects)
// ────────────────────────────────────────────────────────────

export const logoEffects = [

{
  name:"Logo Ember Reveal",
  tags:["logo","reveal","trace"],
  description:"Logo Ember Reveal — particle effect with dynamic motion",
  code:`// Logo Ember Reveal animation code`,
  animator:(c,ctx,mouse)=>{
    let progress=0,particles=[],t=0,id;
    const targetPts=[];
    for(let j=0;j<60;j++){
      const a=j/60*Math.PI*2;
      const r=20;
      targetPts.push({x:c.width/2+Math.cos(a)*r,y:c.height/2+Math.sin(a)*r});
    }
    for(let j=0;j<targetPts.length;j++)
      particles.push({x:Math.random()*c.width,y:Math.random()*c.height,tx:targetPts[j].x,ty:targetPts[j].y,life:0});
    const loop=()=>{
      t+=0.03;
      progress=Math.min(1,progress+0.005);
      ctx.fillStyle="rgba(0,0,0,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      particles.forEach((p,j)=>{
        if(progress>j/particles.length){
          p.life=Math.min(1,p.life+0.05);
          p.x+=(p.tx-p.x)*0.05;
          p.y+=(p.ty-p.y)*0.05;
        }
        ctx.fillStyle=`rgba(255,150,0,${p.life*0.8})`;
        ctx.fillRect(p.x,p.y,2,2);
      });
      if(progress>=1)progress=0;
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Neon Trace Build",
  tags:["reveal","trace","build"],
  description:"Neon Trace Build — particle effect with dynamic motion",
  code:`// Neon Trace Build animation code`,
  animator:(c,ctx,mouse)=>{
    let progress=0,particles=[],t=0,id;
    const targetPts=[];
    for(let j=0;j<61;j++){
      const a=j/61*Math.PI*2;
      const r=21;
      targetPts.push({x:c.width/2+Math.cos(a)*r,y:c.height/2+Math.sin(a)*r});
    }
    for(let j=0;j<targetPts.length;j++)
      particles.push({x:Math.random()*c.width,y:Math.random()*c.height,tx:targetPts[j].x,ty:targetPts[j].y,life:0});
    const loop=()=>{
      t+=0.03;
      progress=Math.min(1,progress+0.005);
      ctx.fillStyle="rgba(0,0,0,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      particles.forEach((p,j)=>{
        if(progress>j/particles.length){
          p.life=Math.min(1,p.life+0.05);
          p.x+=(p.tx-p.x)*0.05;
          p.y+=(p.ty-p.y)*0.05;
        }
        ctx.fillStyle=`rgba(255,150,0,${p.life*0.8})`;
        ctx.fillRect(p.x,p.y,3,3);
      });
      if(progress>=1)progress=0;
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Particle Form Logo",
  tags:["trace","build","form"],
  description:"Particle Form Logo — particle effect with dynamic motion",
  code:`// Particle Form Logo animation code`,
  animator:(c,ctx,mouse)=>{
    let progress=0,particles=[],t=0,id;
    const targetPts=[];
    for(let j=0;j<62;j++){
      const a=j/62*Math.PI*2;
      const r=22;
      targetPts.push({x:c.width/2+Math.cos(a)*r,y:c.height/2+Math.sin(a)*r});
    }
    for(let j=0;j<targetPts.length;j++)
      particles.push({x:Math.random()*c.width,y:Math.random()*c.height,tx:targetPts[j].x,ty:targetPts[j].y,life:0});
    const loop=()=>{
      t+=0.03;
      progress=Math.min(1,progress+0.005);
      ctx.fillStyle="rgba(0,0,0,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      particles.forEach((p,j)=>{
        if(progress>j/particles.length){
          p.life=Math.min(1,p.life+0.05);
          p.x+=(p.tx-p.x)*0.05;
          p.y+=(p.ty-p.y)*0.05;
        }
        ctx.fillStyle=`rgba(255,150,0,${p.life*0.8})`;
        ctx.fillRect(p.x,p.y,4,4);
      });
      if(progress>=1)progress=0;
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Energy Outline Draw",
  tags:["build","form","logo"],
  description:"Energy Outline Draw — particle effect with dynamic motion",
  code:`// Energy Outline Draw animation code`,
  animator:(c,ctx,mouse)=>{
    let progress=0,particles=[],t=0,id;
    const targetPts=[];
    for(let j=0;j<63;j++){
      const a=j/63*Math.PI*2;
      const r=23;
      targetPts.push({x:c.width/2+Math.cos(a)*r,y:c.height/2+Math.sin(a)*r});
    }
    for(let j=0;j<targetPts.length;j++)
      particles.push({x:Math.random()*c.width,y:Math.random()*c.height,tx:targetPts[j].x,ty:targetPts[j].y,life:0});
    const loop=()=>{
      t+=0.03;
      progress=Math.min(1,progress+0.005);
      ctx.fillStyle="rgba(0,0,0,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      particles.forEach((p,j)=>{
        if(progress>j/particles.length){
          p.life=Math.min(1,p.life+0.05);
          p.x+=(p.tx-p.x)*0.05;
          p.y+=(p.ty-p.y)*0.05;
        }
        ctx.fillStyle=`rgba(255,150,0,${p.life*0.8})`;
        ctx.fillRect(p.x,p.y,2,2);
      });
      if(progress>=1)progress=0;
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Light Sweep Reveal",
  tags:["form","logo","reveal"],
  description:"Light Sweep Reveal — particle effect with dynamic motion",
  code:`// Light Sweep Reveal animation code`,
  animator:(c,ctx,mouse)=>{
    let progress=0,particles=[],t=0,id;
    const targetPts=[];
    for(let j=0;j<64;j++){
      const a=j/64*Math.PI*2;
      const r=24;
      targetPts.push({x:c.width/2+Math.cos(a)*r,y:c.height/2+Math.sin(a)*r});
    }
    for(let j=0;j<targetPts.length;j++)
      particles.push({x:Math.random()*c.width,y:Math.random()*c.height,tx:targetPts[j].x,ty:targetPts[j].y,life:0});
    const loop=()=>{
      t+=0.03;
      progress=Math.min(1,progress+0.005);
      ctx.fillStyle="rgba(0,0,0,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      particles.forEach((p,j)=>{
        if(progress>j/particles.length){
          p.life=Math.min(1,p.life+0.05);
          p.x+=(p.tx-p.x)*0.05;
          p.y+=(p.ty-p.y)*0.05;
        }
        ctx.fillStyle=`rgba(255,150,0,${p.life*0.8})`;
        ctx.fillRect(p.x,p.y,3,3);
      });
      if(progress>=1)progress=0;
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Smoke Logo Form",
  tags:["logo","reveal","trace"],
  description:"Smoke Logo Form — particle effect with dynamic motion",
  code:`// Smoke Logo Form animation code`,
  animator:(c,ctx,mouse)=>{
    let progress=0,particles=[],t=0,id;
    const targetPts=[];
    for(let j=0;j<65;j++){
      const a=j/65*Math.PI*2;
      const r=25;
      targetPts.push({x:c.width/2+Math.cos(a)*r,y:c.height/2+Math.sin(a)*r});
    }
    for(let j=0;j<targetPts.length;j++)
      particles.push({x:Math.random()*c.width,y:Math.random()*c.height,tx:targetPts[j].x,ty:targetPts[j].y,life:0});
    const loop=()=>{
      t+=0.03;
      progress=Math.min(1,progress+0.005);
      ctx.fillStyle="rgba(0,0,0,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      particles.forEach((p,j)=>{
        if(progress>j/particles.length){
          p.life=Math.min(1,p.life+0.05);
          p.x+=(p.tx-p.x)*0.05;
          p.y+=(p.ty-p.y)*0.05;
        }
        ctx.fillStyle=`rgba(255,150,0,${p.life*0.8})`;
        ctx.fillRect(p.x,p.y,4,4);
      });
      if(progress>=1)progress=0;
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Wireframe Logo Grow",
  tags:["reveal","trace","build"],
  description:"Wireframe Logo Grow — particle effect with dynamic motion",
  code:`// Wireframe Logo Grow animation code`,
  animator:(c,ctx,mouse)=>{
    let progress=0,particles=[],t=0,id;
    const targetPts=[];
    for(let j=0;j<66;j++){
      const a=j/66*Math.PI*2;
      const r=26;
      targetPts.push({x:c.width/2+Math.cos(a)*r,y:c.height/2+Math.sin(a)*r});
    }
    for(let j=0;j<targetPts.length;j++)
      particles.push({x:Math.random()*c.width,y:Math.random()*c.height,tx:targetPts[j].x,ty:targetPts[j].y,life:0});
    const loop=()=>{
      t+=0.03;
      progress=Math.min(1,progress+0.005);
      ctx.fillStyle="rgba(0,0,0,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      particles.forEach((p,j)=>{
        if(progress>j/particles.length){
          p.life=Math.min(1,p.life+0.05);
          p.x+=(p.tx-p.x)*0.05;
          p.y+=(p.ty-p.y)*0.05;
        }
        ctx.fillStyle=`rgba(255,150,0,${p.life*0.8})`;
        ctx.fillRect(p.x,p.y,2,2);
      });
      if(progress>=1)progress=0;
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Shard Assemble Reveal",
  tags:["trace","build","form"],
  description:"Shard Assemble Reveal — particle effect with dynamic motion",
  code:`// Shard Assemble Reveal animation code`,
  animator:(c,ctx,mouse)=>{
    let progress=0,particles=[],t=0,id;
    const targetPts=[];
    for(let j=0;j<67;j++){
      const a=j/67*Math.PI*2;
      const r=27;
      targetPts.push({x:c.width/2+Math.cos(a)*r,y:c.height/2+Math.sin(a)*r});
    }
    for(let j=0;j<targetPts.length;j++)
      particles.push({x:Math.random()*c.width,y:Math.random()*c.height,tx:targetPts[j].x,ty:targetPts[j].y,life:0});
    const loop=()=>{
      t+=0.03;
      progress=Math.min(1,progress+0.005);
      ctx.fillStyle="rgba(0,0,0,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      particles.forEach((p,j)=>{
        if(progress>j/particles.length){
          p.life=Math.min(1,p.life+0.05);
          p.x+=(p.tx-p.x)*0.05;
          p.y+=(p.ty-p.y)*0.05;
        }
        ctx.fillStyle=`rgba(255,150,0,${p.life*0.8})`;
        ctx.fillRect(p.x,p.y,3,3);
      });
      if(progress>=1)progress=0;
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Glow Stroke Logo",
  tags:["build","form","logo"],
  description:"Glow Stroke Logo — particle effect with dynamic motion",
  code:`// Glow Stroke Logo animation code`,
  animator:(c,ctx,mouse)=>{
    let progress=0,particles=[],t=0,id;
    const targetPts=[];
    for(let j=0;j<68;j++){
      const a=j/68*Math.PI*2;
      const r=28;
      targetPts.push({x:c.width/2+Math.cos(a)*r,y:c.height/2+Math.sin(a)*r});
    }
    for(let j=0;j<targetPts.length;j++)
      particles.push({x:Math.random()*c.width,y:Math.random()*c.height,tx:targetPts[j].x,ty:targetPts[j].y,life:0});
    const loop=()=>{
      t+=0.03;
      progress=Math.min(1,progress+0.005);
      ctx.fillStyle="rgba(0,0,0,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      particles.forEach((p,j)=>{
        if(progress>j/particles.length){
          p.life=Math.min(1,p.life+0.05);
          p.x+=(p.tx-p.x)*0.05;
          p.y+=(p.ty-p.y)*0.05;
        }
        ctx.fillStyle=`rgba(255,150,0,${p.life*0.8})`;
        ctx.fillRect(p.x,p.y,4,4);
      });
      if(progress>=1)progress=0;
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Ink Spread Reveal",
  tags:["form","logo","reveal"],
  description:"Ink Spread Reveal — particle effect with dynamic motion",
  code:`// Ink Spread Reveal animation code`,
  animator:(c,ctx,mouse)=>{
    let progress=0,particles=[],t=0,id;
    const targetPts=[];
    for(let j=0;j<69;j++){
      const a=j/69*Math.PI*2;
      const r=29;
      targetPts.push({x:c.width/2+Math.cos(a)*r,y:c.height/2+Math.sin(a)*r});
    }
    for(let j=0;j<targetPts.length;j++)
      particles.push({x:Math.random()*c.width,y:Math.random()*c.height,tx:targetPts[j].x,ty:targetPts[j].y,life:0});
    const loop=()=>{
      t+=0.03;
      progress=Math.min(1,progress+0.005);
      ctx.fillStyle="rgba(0,0,0,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      particles.forEach((p,j)=>{
        if(progress>j/particles.length){
          p.life=Math.min(1,p.life+0.05);
          p.x+=(p.tx-p.x)*0.05;
          p.y+=(p.ty-p.y)*0.05;
        }
        ctx.fillStyle=`rgba(255,150,0,${p.life*0.8})`;
        ctx.fillRect(p.x,p.y,2,2);
      });
      if(progress>=1)progress=0;
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Laser Cut Outline",
  tags:["logo","reveal","trace"],
  description:"Laser Cut Outline — particle effect with dynamic motion",
  code:`// Laser Cut Outline animation code`,
  animator:(c,ctx,mouse)=>{
    let progress=0,particles=[],t=0,id;
    const targetPts=[];
    for(let j=0;j<70;j++){
      const a=j/70*Math.PI*2;
      const r=30;
      targetPts.push({x:c.width/2+Math.cos(a)*r,y:c.height/2+Math.sin(a)*r});
    }
    for(let j=0;j<targetPts.length;j++)
      particles.push({x:Math.random()*c.width,y:Math.random()*c.height,tx:targetPts[j].x,ty:targetPts[j].y,life:0});
    const loop=()=>{
      t+=0.03;
      progress=Math.min(1,progress+0.005);
      ctx.fillStyle="rgba(0,0,0,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      particles.forEach((p,j)=>{
        if(progress>j/particles.length){
          p.life=Math.min(1,p.life+0.05);
          p.x+=(p.tx-p.x)*0.05;
          p.y+=(p.ty-p.y)*0.05;
        }
        ctx.fillStyle=`rgba(255,150,0,${p.life*0.8})`;
        ctx.fillRect(p.x,p.y,3,3);
      });
      if(progress>=1)progress=0;
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Bloom Logo Burst",
  tags:["reveal","trace","build"],
  description:"Bloom Logo Burst — particle effect with dynamic motion",
  code:`// Bloom Logo Burst animation code`,
  animator:(c,ctx,mouse)=>{
    let progress=0,particles=[],t=0,id;
    const targetPts=[];
    for(let j=0;j<71;j++){
      const a=j/71*Math.PI*2;
      const r=31;
      targetPts.push({x:c.width/2+Math.cos(a)*r,y:c.height/2+Math.sin(a)*r});
    }
    for(let j=0;j<targetPts.length;j++)
      particles.push({x:Math.random()*c.width,y:Math.random()*c.height,tx:targetPts[j].x,ty:targetPts[j].y,life:0});
    const loop=()=>{
      t+=0.03;
      progress=Math.min(1,progress+0.005);
      ctx.fillStyle="rgba(0,0,0,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      particles.forEach((p,j)=>{
        if(progress>j/particles.length){
          p.life=Math.min(1,p.life+0.05);
          p.x+=(p.tx-p.x)*0.05;
          p.y+=(p.ty-p.y)*0.05;
        }
        ctx.fillStyle=`rgba(255,150,0,${p.life*0.8})`;
        ctx.fillRect(p.x,p.y,4,4);
      });
      if(progress>=1)progress=0;
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Pixel Rebuild Logo",
  tags:["trace","build","form"],
  description:"Pixel Rebuild Logo — particle effect with dynamic motion",
  code:`// Pixel Rebuild Logo animation code`,
  animator:(c,ctx,mouse)=>{
    let progress=0,particles=[],t=0,id;
    const targetPts=[];
    for(let j=0;j<72;j++){
      const a=j/72*Math.PI*2;
      const r=32;
      targetPts.push({x:c.width/2+Math.cos(a)*r,y:c.height/2+Math.sin(a)*r});
    }
    for(let j=0;j<targetPts.length;j++)
      particles.push({x:Math.random()*c.width,y:Math.random()*c.height,tx:targetPts[j].x,ty:targetPts[j].y,life:0});
    const loop=()=>{
      t+=0.03;
      progress=Math.min(1,progress+0.005);
      ctx.fillStyle="rgba(0,0,0,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      particles.forEach((p,j)=>{
        if(progress>j/particles.length){
          p.life=Math.min(1,p.life+0.05);
          p.x+=(p.tx-p.x)*0.05;
          p.y+=(p.ty-p.y)*0.05;
        }
        ctx.fillStyle=`rgba(255,150,0,${p.life*0.8})`;
        ctx.fillRect(p.x,p.y,2,2);
      });
      if(progress>=1)progress=0;
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Liquid Logo Rise",
  tags:["build","form","logo"],
  description:"Liquid Logo Rise — particle effect with dynamic motion",
  code:`// Liquid Logo Rise animation code`,
  animator:(c,ctx,mouse)=>{
    let progress=0,particles=[],t=0,id;
    const targetPts=[];
    for(let j=0;j<73;j++){
      const a=j/73*Math.PI*2;
      const r=33;
      targetPts.push({x:c.width/2+Math.cos(a)*r,y:c.height/2+Math.sin(a)*r});
    }
    for(let j=0;j<targetPts.length;j++)
      particles.push({x:Math.random()*c.width,y:Math.random()*c.height,tx:targetPts[j].x,ty:targetPts[j].y,life:0});
    const loop=()=>{
      t+=0.03;
      progress=Math.min(1,progress+0.005);
      ctx.fillStyle="rgba(0,0,0,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      particles.forEach((p,j)=>{
        if(progress>j/particles.length){
          p.life=Math.min(1,p.life+0.05);
          p.x+=(p.tx-p.x)*0.05;
          p.y+=(p.ty-p.y)*0.05;
        }
        ctx.fillStyle=`rgba(255,150,0,${p.life*0.8})`;
        ctx.fillRect(p.x,p.y,3,3);
      });
      if(progress>=1)progress=0;
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Signal Trace Reveal",
  tags:["form","logo","reveal"],
  description:"Signal Trace Reveal — particle effect with dynamic motion",
  code:`// Signal Trace Reveal animation code`,
  animator:(c,ctx,mouse)=>{
    let progress=0,particles=[],t=0,id;
    const targetPts=[];
    for(let j=0;j<74;j++){
      const a=j/74*Math.PI*2;
      const r=34;
      targetPts.push({x:c.width/2+Math.cos(a)*r,y:c.height/2+Math.sin(a)*r});
    }
    for(let j=0;j<targetPts.length;j++)
      particles.push({x:Math.random()*c.width,y:Math.random()*c.height,tx:targetPts[j].x,ty:targetPts[j].y,life:0});
    const loop=()=>{
      t+=0.03;
      progress=Math.min(1,progress+0.005);
      ctx.fillStyle="rgba(0,0,0,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      particles.forEach((p,j)=>{
        if(progress>j/particles.length){
          p.life=Math.min(1,p.life+0.05);
          p.x+=(p.tx-p.x)*0.05;
          p.y+=(p.ty-p.y)*0.05;
        }
        ctx.fillStyle=`rgba(255,150,0,${p.life*0.8})`;
        ctx.fillRect(p.x,p.y,4,4);
      });
      if(progress>=1)progress=0;
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Dust Form Emblem",
  tags:["logo","reveal","trace"],
  description:"Dust Form Emblem — particle effect with dynamic motion",
  code:`// Dust Form Emblem animation code`,
  animator:(c,ctx,mouse)=>{
    let progress=0,particles=[],t=0,id;
    const targetPts=[];
    for(let j=0;j<75;j++){
      const a=j/75*Math.PI*2;
      const r=35;
      targetPts.push({x:c.width/2+Math.cos(a)*r,y:c.height/2+Math.sin(a)*r});
    }
    for(let j=0;j<targetPts.length;j++)
      particles.push({x:Math.random()*c.width,y:Math.random()*c.height,tx:targetPts[j].x,ty:targetPts[j].y,life:0});
    const loop=()=>{
      t+=0.03;
      progress=Math.min(1,progress+0.005);
      ctx.fillStyle="rgba(0,0,0,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      particles.forEach((p,j)=>{
        if(progress>j/particles.length){
          p.life=Math.min(1,p.life+0.05);
          p.x+=(p.tx-p.x)*0.05;
          p.y+=(p.ty-p.y)*0.05;
        }
        ctx.fillStyle=`rgba(255,150,0,${p.life*0.8})`;
        ctx.fillRect(p.x,p.y,2,2);
      });
      if(progress>=1)progress=0;
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Flare Outline Draw",
  tags:["reveal","trace","build"],
  description:"Flare Outline Draw — particle effect with dynamic motion",
  code:`// Flare Outline Draw animation code`,
  animator:(c,ctx,mouse)=>{
    let progress=0,particles=[],t=0,id;
    const targetPts=[];
    for(let j=0;j<76;j++){
      const a=j/76*Math.PI*2;
      const r=36;
      targetPts.push({x:c.width/2+Math.cos(a)*r,y:c.height/2+Math.sin(a)*r});
    }
    for(let j=0;j<targetPts.length;j++)
      particles.push({x:Math.random()*c.width,y:Math.random()*c.height,tx:targetPts[j].x,ty:targetPts[j].y,life:0});
    const loop=()=>{
      t+=0.03;
      progress=Math.min(1,progress+0.005);
      ctx.fillStyle="rgba(0,0,0,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      particles.forEach((p,j)=>{
        if(progress>j/particles.length){
          p.life=Math.min(1,p.life+0.05);
          p.x+=(p.tx-p.x)*0.05;
          p.y+=(p.ty-p.y)*0.05;
        }
        ctx.fillStyle=`rgba(255,150,0,${p.life*0.8})`;
        ctx.fillRect(p.x,p.y,3,3);
      });
      if(progress>=1)progress=0;
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Holo Logo Assemble",
  tags:["trace","build","form"],
  description:"Holo Logo Assemble — particle effect with dynamic motion",
  code:`// Holo Logo Assemble animation code`,
  animator:(c,ctx,mouse)=>{
    let progress=0,particles=[],t=0,id;
    const targetPts=[];
    for(let j=0;j<77;j++){
      const a=j/77*Math.PI*2;
      const r=37;
      targetPts.push({x:c.width/2+Math.cos(a)*r,y:c.height/2+Math.sin(a)*r});
    }
    for(let j=0;j<targetPts.length;j++)
      particles.push({x:Math.random()*c.width,y:Math.random()*c.height,tx:targetPts[j].x,ty:targetPts[j].y,life:0});
    const loop=()=>{
      t+=0.03;
      progress=Math.min(1,progress+0.005);
      ctx.fillStyle="rgba(0,0,0,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      particles.forEach((p,j)=>{
        if(progress>j/particles.length){
          p.life=Math.min(1,p.life+0.05);
          p.x+=(p.tx-p.x)*0.05;
          p.y+=(p.ty-p.y)*0.05;
        }
        ctx.fillStyle=`rgba(255,150,0,${p.life*0.8})`;
        ctx.fillRect(p.x,p.y,4,4);
      });
      if(progress>=1)progress=0;
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Spark Form Logo",
  tags:["build","form","logo"],
  description:"Spark Form Logo — particle effect with dynamic motion",
  code:`// Spark Form Logo animation code`,
  animator:(c,ctx,mouse)=>{
    let progress=0,particles=[],t=0,id;
    const targetPts=[];
    for(let j=0;j<78;j++){
      const a=j/78*Math.PI*2;
      const r=38;
      targetPts.push({x:c.width/2+Math.cos(a)*r,y:c.height/2+Math.sin(a)*r});
    }
    for(let j=0;j<targetPts.length;j++)
      particles.push({x:Math.random()*c.width,y:Math.random()*c.height,tx:targetPts[j].x,ty:targetPts[j].y,life:0});
    const loop=()=>{
      t+=0.03;
      progress=Math.min(1,progress+0.005);
      ctx.fillStyle="rgba(0,0,0,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      particles.forEach((p,j)=>{
        if(progress>j/particles.length){
          p.life=Math.min(1,p.life+0.05);
          p.x+=(p.tx-p.x)*0.05;
          p.y+=(p.ty-p.y)*0.05;
        }
        ctx.fillStyle=`rgba(255,150,0,${p.life*0.8})`;
        ctx.fillRect(p.x,p.y,2,2);
      });
      if(progress>=1)progress=0;
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Shadow Fade Reveal",
  tags:["form","logo","reveal"],
  description:"Shadow Fade Reveal — particle effect with dynamic motion",
  code:`// Shadow Fade Reveal animation code`,
  animator:(c,ctx,mouse)=>{
    let progress=0,particles=[],t=0,id;
    const targetPts=[];
    for(let j=0;j<79;j++){
      const a=j/79*Math.PI*2;
      const r=39;
      targetPts.push({x:c.width/2+Math.cos(a)*r,y:c.height/2+Math.sin(a)*r});
    }
    for(let j=0;j<targetPts.length;j++)
      particles.push({x:Math.random()*c.width,y:Math.random()*c.height,tx:targetPts[j].x,ty:targetPts[j].y,life:0});
    const loop=()=>{
      t+=0.03;
      progress=Math.min(1,progress+0.005);
      ctx.fillStyle="rgba(0,0,0,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      particles.forEach((p,j)=>{
        if(progress>j/particles.length){
          p.life=Math.min(1,p.life+0.05);
          p.x+=(p.tx-p.x)*0.05;
          p.y+=(p.ty-p.y)*0.05;
        }
        ctx.fillStyle=`rgba(255,150,0,${p.life*0.8})`;
        ctx.fillRect(p.x,p.y,3,3);
      });
      if(progress>=1)progress=0;
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Line Art Reveal",
  tags:["logo","reveal","trace"],
  description:"Line Art Reveal — particle effect with dynamic motion",
  code:`// Line Art Reveal animation code`,
  animator:(c,ctx,mouse)=>{
    let progress=0,particles=[],t=0,id;
    const targetPts=[];
    for(let j=0;j<80;j++){
      const a=j/80*Math.PI*2;
      const r=40;
      targetPts.push({x:c.width/2+Math.cos(a)*r,y:c.height/2+Math.sin(a)*r});
    }
    for(let j=0;j<targetPts.length;j++)
      particles.push({x:Math.random()*c.width,y:Math.random()*c.height,tx:targetPts[j].x,ty:targetPts[j].y,life:0});
    const loop=()=>{
      t+=0.03;
      progress=Math.min(1,progress+0.005);
      ctx.fillStyle="rgba(0,0,0,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      particles.forEach((p,j)=>{
        if(progress>j/particles.length){
          p.life=Math.min(1,p.life+0.05);
          p.x+=(p.tx-p.x)*0.05;
          p.y+=(p.ty-p.y)*0.05;
        }
        ctx.fillStyle=`rgba(255,150,0,${p.life*0.8})`;
        ctx.fillRect(p.x,p.y,4,4);
      });
      if(progress>=1)progress=0;
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Data Form Logo",
  tags:["reveal","trace","build"],
  description:"Data Form Logo — particle effect with dynamic motion",
  code:`// Data Form Logo animation code`,
  animator:(c,ctx,mouse)=>{
    let progress=0,particles=[],t=0,id;
    const targetPts=[];
    for(let j=0;j<81;j++){
      const a=j/81*Math.PI*2;
      const r=41;
      targetPts.push({x:c.width/2+Math.cos(a)*r,y:c.height/2+Math.sin(a)*r});
    }
    for(let j=0;j<targetPts.length;j++)
      particles.push({x:Math.random()*c.width,y:Math.random()*c.height,tx:targetPts[j].x,ty:targetPts[j].y,life:0});
    const loop=()=>{
      t+=0.03;
      progress=Math.min(1,progress+0.005);
      ctx.fillStyle="rgba(0,0,0,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      particles.forEach((p,j)=>{
        if(progress>j/particles.length){
          p.life=Math.min(1,p.life+0.05);
          p.x+=(p.tx-p.x)*0.05;
          p.y+=(p.ty-p.y)*0.05;
        }
        ctx.fillStyle=`rgba(255,150,0,${p.life*0.8})`;
        ctx.fillRect(p.x,p.y,2,2);
      });
      if(progress>=1)progress=0;
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Pulse Build Emblem",
  tags:["trace","build","form"],
  description:"Pulse Build Emblem — particle effect with dynamic motion",
  code:`// Pulse Build Emblem animation code`,
  animator:(c,ctx,mouse)=>{
    let progress=0,particles=[],t=0,id;
    const targetPts=[];
    for(let j=0;j<82;j++){
      const a=j/82*Math.PI*2;
      const r=42;
      targetPts.push({x:c.width/2+Math.cos(a)*r,y:c.height/2+Math.sin(a)*r});
    }
    for(let j=0;j<targetPts.length;j++)
      particles.push({x:Math.random()*c.width,y:Math.random()*c.height,tx:targetPts[j].x,ty:targetPts[j].y,life:0});
    const loop=()=>{
      t+=0.03;
      progress=Math.min(1,progress+0.005);
      ctx.fillStyle="rgba(0,0,0,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      particles.forEach((p,j)=>{
        if(progress>j/particles.length){
          p.life=Math.min(1,p.life+0.05);
          p.x+=(p.tx-p.x)*0.05;
          p.y+=(p.ty-p.y)*0.05;
        }
        ctx.fillStyle=`rgba(255,150,0,${p.life*0.8})`;
        ctx.fillRect(p.x,p.y,3,3);
      });
      if(progress>=1)progress=0;
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Energy Fill Reveal",
  tags:["build","form","logo"],
  description:"Energy Fill Reveal — particle effect with dynamic motion",
  code:`// Energy Fill Reveal animation code`,
  animator:(c,ctx,mouse)=>{
    let progress=0,particles=[],t=0,id;
    const targetPts=[];
    for(let j=0;j<83;j++){
      const a=j/83*Math.PI*2;
      const r=43;
      targetPts.push({x:c.width/2+Math.cos(a)*r,y:c.height/2+Math.sin(a)*r});
    }
    for(let j=0;j<targetPts.length;j++)
      particles.push({x:Math.random()*c.width,y:Math.random()*c.height,tx:targetPts[j].x,ty:targetPts[j].y,life:0});
    const loop=()=>{
      t+=0.03;
      progress=Math.min(1,progress+0.005);
      ctx.fillStyle="rgba(0,0,0,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      particles.forEach((p,j)=>{
        if(progress>j/particles.length){
          p.life=Math.min(1,p.life+0.05);
          p.x+=(p.tx-p.x)*0.05;
          p.y+=(p.ty-p.y)*0.05;
        }
        ctx.fillStyle=`rgba(255,150,0,${p.life*0.8})`;
        ctx.fillRect(p.x,p.y,4,4);
      });
      if(progress>=1)progress=0;
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Plasma Outline Logo",
  tags:["form","logo","reveal"],
  description:"Plasma Outline Logo — particle effect with dynamic motion",
  code:`// Plasma Outline Logo animation code`,
  animator:(c,ctx,mouse)=>{
    let progress=0,particles=[],t=0,id;
    const targetPts=[];
    for(let j=0;j<84;j++){
      const a=j/84*Math.PI*2;
      const r=44;
      targetPts.push({x:c.width/2+Math.cos(a)*r,y:c.height/2+Math.sin(a)*r});
    }
    for(let j=0;j<targetPts.length;j++)
      particles.push({x:Math.random()*c.width,y:Math.random()*c.height,tx:targetPts[j].x,ty:targetPts[j].y,life:0});
    const loop=()=>{
      t+=0.03;
      progress=Math.min(1,progress+0.005);
      ctx.fillStyle="rgba(0,0,0,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      particles.forEach((p,j)=>{
        if(progress>j/particles.length){
          p.life=Math.min(1,p.life+0.05);
          p.x+=(p.tx-p.x)*0.05;
          p.y+=(p.ty-p.y)*0.05;
        }
        ctx.fillStyle=`rgba(255,150,0,${p.life*0.8})`;
        ctx.fillRect(p.x,p.y,2,2);
      });
      if(progress>=1)progress=0;
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Fragment Merge Reveal",
  tags:["logo","reveal","trace"],
  description:"Fragment Merge Reveal — particle effect with dynamic motion",
  code:`// Fragment Merge Reveal animation code`,
  animator:(c,ctx,mouse)=>{
    let progress=0,particles=[],t=0,id;
    const targetPts=[];
    for(let j=0;j<85;j++){
      const a=j/85*Math.PI*2;
      const r=45;
      targetPts.push({x:c.width/2+Math.cos(a)*r,y:c.height/2+Math.sin(a)*r});
    }
    for(let j=0;j<targetPts.length;j++)
      particles.push({x:Math.random()*c.width,y:Math.random()*c.height,tx:targetPts[j].x,ty:targetPts[j].y,life:0});
    const loop=()=>{
      t+=0.03;
      progress=Math.min(1,progress+0.005);
      ctx.fillStyle="rgba(0,0,0,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      particles.forEach((p,j)=>{
        if(progress>j/particles.length){
          p.life=Math.min(1,p.life+0.05);
          p.x+=(p.tx-p.x)*0.05;
          p.y+=(p.ty-p.y)*0.05;
        }
        ctx.fillStyle=`rgba(255,150,0,${p.life*0.8})`;
        ctx.fillRect(p.x,p.y,3,3);
      });
      if(progress>=1)progress=0;
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Light Ring Reveal",
  tags:["reveal","trace","build"],
  description:"Light Ring Reveal — particle effect with dynamic motion",
  code:`// Light Ring Reveal animation code`,
  animator:(c,ctx,mouse)=>{
    let progress=0,particles=[],t=0,id;
    const targetPts=[];
    for(let j=0;j<86;j++){
      const a=j/86*Math.PI*2;
      const r=46;
      targetPts.push({x:c.width/2+Math.cos(a)*r,y:c.height/2+Math.sin(a)*r});
    }
    for(let j=0;j<targetPts.length;j++)
      particles.push({x:Math.random()*c.width,y:Math.random()*c.height,tx:targetPts[j].x,ty:targetPts[j].y,life:0});
    const loop=()=>{
      t+=0.03;
      progress=Math.min(1,progress+0.005);
      ctx.fillStyle="rgba(0,0,0,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      particles.forEach((p,j)=>{
        if(progress>j/particles.length){
          p.life=Math.min(1,p.life+0.05);
          p.x+=(p.tx-p.x)*0.05;
          p.y+=(p.ty-p.y)*0.05;
        }
        ctx.fillStyle=`rgba(255,150,0,${p.life*0.8})`;
        ctx.fillRect(p.x,p.y,4,4);
      });
      if(progress>=1)progress=0;
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Logo Core Ignition",
  tags:["trace","build","form"],
  description:"Logo Core Ignition — particle effect with dynamic motion",
  code:`// Logo Core Ignition animation code`,
  animator:(c,ctx,mouse)=>{
    let progress=0,particles=[],t=0,id;
    const targetPts=[];
    for(let j=0;j<87;j++){
      const a=j/87*Math.PI*2;
      const r=47;
      targetPts.push({x:c.width/2+Math.cos(a)*r,y:c.height/2+Math.sin(a)*r});
    }
    for(let j=0;j<targetPts.length;j++)
      particles.push({x:Math.random()*c.width,y:Math.random()*c.height,tx:targetPts[j].x,ty:targetPts[j].y,life:0});
    const loop=()=>{
      t+=0.03;
      progress=Math.min(1,progress+0.005);
      ctx.fillStyle="rgba(0,0,0,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      particles.forEach((p,j)=>{
        if(progress>j/particles.length){
          p.life=Math.min(1,p.life+0.05);
          p.x+=(p.tx-p.x)*0.05;
          p.y+=(p.ty-p.y)*0.05;
        }
        ctx.fillStyle=`rgba(255,150,0,${p.life*0.8})`;
        ctx.fillRect(p.x,p.y,2,2);
      });
      if(progress>=1)progress=0;
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Neon Stroke Draw",
  tags:["build","form","logo"],
  description:"Neon Stroke Draw — particle effect with dynamic motion",
  code:`// Neon Stroke Draw animation code`,
  animator:(c,ctx,mouse)=>{
    let progress=0,particles=[],t=0,id;
    const targetPts=[];
    for(let j=0;j<88;j++){
      const a=j/88*Math.PI*2;
      const r=48;
      targetPts.push({x:c.width/2+Math.cos(a)*r,y:c.height/2+Math.sin(a)*r});
    }
    for(let j=0;j<targetPts.length;j++)
      particles.push({x:Math.random()*c.width,y:Math.random()*c.height,tx:targetPts[j].x,ty:targetPts[j].y,life:0});
    const loop=()=>{
      t+=0.03;
      progress=Math.min(1,progress+0.005);
      ctx.fillStyle="rgba(0,0,0,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      particles.forEach((p,j)=>{
        if(progress>j/particles.length){
          p.life=Math.min(1,p.life+0.05);
          p.x+=(p.tx-p.x)*0.05;
          p.y+=(p.ty-p.y)*0.05;
        }
        ctx.fillStyle=`rgba(255,150,0,${p.life*0.8})`;
        ctx.fillRect(p.x,p.y,3,3);
      });
      if(progress>=1)progress=0;
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Glass Logo Form",
  tags:["form","logo","reveal"],
  description:"Glass Logo Form — particle effect with dynamic motion",
  code:`// Glass Logo Form animation code`,
  animator:(c,ctx,mouse)=>{
    let progress=0,particles=[],t=0,id;
    const targetPts=[];
    for(let j=0;j<89;j++){
      const a=j/89*Math.PI*2;
      const r=49;
      targetPts.push({x:c.width/2+Math.cos(a)*r,y:c.height/2+Math.sin(a)*r});
    }
    for(let j=0;j<targetPts.length;j++)
      particles.push({x:Math.random()*c.width,y:Math.random()*c.height,tx:targetPts[j].x,ty:targetPts[j].y,life:0});
    const loop=()=>{
      t+=0.03;
      progress=Math.min(1,progress+0.005);
      ctx.fillStyle="rgba(0,0,0,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      particles.forEach((p,j)=>{
        if(progress>j/particles.length){
          p.life=Math.min(1,p.life+0.05);
          p.x+=(p.tx-p.x)*0.05;
          p.y+=(p.ty-p.y)*0.05;
        }
        ctx.fillStyle=`rgba(255,150,0,${p.life*0.8})`;
        ctx.fillRect(p.x,p.y,4,4);
      });
      if(progress>=1)progress=0;
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Logo Bloom Rise",
  tags:["logo","reveal","trace"],
  description:"Logo Bloom Rise — particle effect with dynamic motion",
  code:`// Logo Bloom Rise animation code`,
  animator:(c,ctx,mouse)=>{
    let progress=0,particles=[],t=0,id;
    const targetPts=[];
    for(let j=0;j<90;j++){
      const a=j/90*Math.PI*2;
      const r=50;
      targetPts.push({x:c.width/2+Math.cos(a)*r,y:c.height/2+Math.sin(a)*r});
    }
    for(let j=0;j<targetPts.length;j++)
      particles.push({x:Math.random()*c.width,y:Math.random()*c.height,tx:targetPts[j].x,ty:targetPts[j].y,life:0});
    const loop=()=>{
      t+=0.03;
      progress=Math.min(1,progress+0.005);
      ctx.fillStyle="rgba(0,0,0,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      particles.forEach((p,j)=>{
        if(progress>j/particles.length){
          p.life=Math.min(1,p.life+0.05);
          p.x+=(p.tx-p.x)*0.05;
          p.y+=(p.ty-p.y)*0.05;
        }
        ctx.fillStyle=`rgba(255,150,0,${p.life*0.8})`;
        ctx.fillRect(p.x,p.y,2,2);
      });
      if(progress>=1)progress=0;
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Firefly Trace Logo",
  tags:["reveal","trace","build"],
  description:"Firefly Trace Logo — particle effect with dynamic motion",
  code:`// Firefly Trace Logo animation code`,
  animator:(c,ctx,mouse)=>{
    let progress=0,particles=[],t=0,id;
    const targetPts=[];
    for(let j=0;j<91;j++){
      const a=j/91*Math.PI*2;
      const r=51;
      targetPts.push({x:c.width/2+Math.cos(a)*r,y:c.height/2+Math.sin(a)*r});
    }
    for(let j=0;j<targetPts.length;j++)
      particles.push({x:Math.random()*c.width,y:Math.random()*c.height,tx:targetPts[j].x,ty:targetPts[j].y,life:0});
    const loop=()=>{
      t+=0.03;
      progress=Math.min(1,progress+0.005);
      ctx.fillStyle="rgba(0,0,0,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      particles.forEach((p,j)=>{
        if(progress>j/particles.length){
          p.life=Math.min(1,p.life+0.05);
          p.x+=(p.tx-p.x)*0.05;
          p.y+=(p.ty-p.y)*0.05;
        }
        ctx.fillStyle=`rgba(255,150,0,${p.life*0.8})`;
        ctx.fillRect(p.x,p.y,3,3);
      });
      if(progress>=1)progress=0;
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Ribbon Form Emblem",
  tags:["trace","build","form"],
  description:"Ribbon Form Emblem — particle effect with dynamic motion",
  code:`// Ribbon Form Emblem animation code`,
  animator:(c,ctx,mouse)=>{
    let progress=0,particles=[],t=0,id;
    const targetPts=[];
    for(let j=0;j<92;j++){
      const a=j/92*Math.PI*2;
      const r=52;
      targetPts.push({x:c.width/2+Math.cos(a)*r,y:c.height/2+Math.sin(a)*r});
    }
    for(let j=0;j<targetPts.length;j++)
      particles.push({x:Math.random()*c.width,y:Math.random()*c.height,tx:targetPts[j].x,ty:targetPts[j].y,life:0});
    const loop=()=>{
      t+=0.03;
      progress=Math.min(1,progress+0.005);
      ctx.fillStyle="rgba(0,0,0,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      particles.forEach((p,j)=>{
        if(progress>j/particles.length){
          p.life=Math.min(1,p.life+0.05);
          p.x+=(p.tx-p.x)*0.05;
          p.y+=(p.ty-p.y)*0.05;
        }
        ctx.fillStyle=`rgba(255,150,0,${p.life*0.8})`;
        ctx.fillRect(p.x,p.y,4,4);
      });
      if(progress>=1)progress=0;
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Glow Fill Reveal",
  tags:["build","form","logo"],
  description:"Glow Fill Reveal — particle effect with dynamic motion",
  code:`// Glow Fill Reveal animation code`,
  animator:(c,ctx,mouse)=>{
    let progress=0,particles=[],t=0,id;
    const targetPts=[];
    for(let j=0;j<93;j++){
      const a=j/93*Math.PI*2;
      const r=53;
      targetPts.push({x:c.width/2+Math.cos(a)*r,y:c.height/2+Math.sin(a)*r});
    }
    for(let j=0;j<targetPts.length;j++)
      particles.push({x:Math.random()*c.width,y:Math.random()*c.height,tx:targetPts[j].x,ty:targetPts[j].y,life:0});
    const loop=()=>{
      t+=0.03;
      progress=Math.min(1,progress+0.005);
      ctx.fillStyle="rgba(0,0,0,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      particles.forEach((p,j)=>{
        if(progress>j/particles.length){
          p.life=Math.min(1,p.life+0.05);
          p.x+=(p.tx-p.x)*0.05;
          p.y+=(p.ty-p.y)*0.05;
        }
        ctx.fillStyle=`rgba(255,150,0,${p.life*0.8})`;
        ctx.fillRect(p.x,p.y,2,2);
      });
      if(progress>=1)progress=0;
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Hologram Build Logo",
  tags:["form","logo","reveal"],
  description:"Hologram Build Logo — particle effect with dynamic motion",
  code:`// Hologram Build Logo animation code`,
  animator:(c,ctx,mouse)=>{
    let progress=0,particles=[],t=0,id;
    const targetPts=[];
    for(let j=0;j<94;j++){
      const a=j/94*Math.PI*2;
      const r=54;
      targetPts.push({x:c.width/2+Math.cos(a)*r,y:c.height/2+Math.sin(a)*r});
    }
    for(let j=0;j<targetPts.length;j++)
      particles.push({x:Math.random()*c.width,y:Math.random()*c.height,tx:targetPts[j].x,ty:targetPts[j].y,life:0});
    const loop=()=>{
      t+=0.03;
      progress=Math.min(1,progress+0.005);
      ctx.fillStyle="rgba(0,0,0,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      particles.forEach((p,j)=>{
        if(progress>j/particles.length){
          p.life=Math.min(1,p.life+0.05);
          p.x+=(p.tx-p.x)*0.05;
          p.y+=(p.ty-p.y)*0.05;
        }
        ctx.fillStyle=`rgba(255,150,0,${p.life*0.8})`;
        ctx.fillRect(p.x,p.y,3,3);
      });
      if(progress>=1)progress=0;
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Particle Bloom Vector",
  tags:["logo","reveal","trace"],
  description:"Particle Bloom Vector — particle effect with dynamic motion",
  code:`// Particle Bloom Vector animation code`,
  animator:(c,ctx,mouse)=>{
    let progress=0,particles=[],t=0,id;
    const targetPts=[];
    for(let j=0;j<95;j++){
      const a=j/95*Math.PI*2;
      const r=55;
      targetPts.push({x:c.width/2+Math.cos(a)*r,y:c.height/2+Math.sin(a)*r});
    }
    for(let j=0;j<targetPts.length;j++)
      particles.push({x:Math.random()*c.width,y:Math.random()*c.height,tx:targetPts[j].x,ty:targetPts[j].y,life:0});
    const loop=()=>{
      t+=0.03;
      progress=Math.min(1,progress+0.005);
      ctx.fillStyle="rgba(0,0,0,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      particles.forEach((p,j)=>{
        if(progress>j/particles.length){
          p.life=Math.min(1,p.life+0.05);
          p.x+=(p.tx-p.x)*0.05;
          p.y+=(p.ty-p.y)*0.05;
        }
        ctx.fillStyle=`rgba(255,150,0,${p.life*0.8})`;
        ctx.fillRect(p.x,p.y,4,4);
      });
      if(progress>=1)progress=0;
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Draw Reveal Logo",
  tags:["reveal","trace","build"],
  description:"Draw Reveal Logo — particle effect with dynamic motion",
  code:`// Draw Reveal Logo animation code`,
  animator:(c,ctx,mouse)=>{
    let progress=0,particles=[],t=0,id;
    const targetPts=[];
    for(let j=0;j<96;j++){
      const a=j/96*Math.PI*2;
      const r=56;
      targetPts.push({x:c.width/2+Math.cos(a)*r,y:c.height/2+Math.sin(a)*r});
    }
    for(let j=0;j<targetPts.length;j++)
      particles.push({x:Math.random()*c.width,y:Math.random()*c.height,tx:targetPts[j].x,ty:targetPts[j].y,life:0});
    const loop=()=>{
      t+=0.03;
      progress=Math.min(1,progress+0.005);
      ctx.fillStyle="rgba(0,0,0,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      particles.forEach((p,j)=>{
        if(progress>j/particles.length){
          p.life=Math.min(1,p.life+0.05);
          p.x+=(p.tx-p.x)*0.05;
          p.y+=(p.ty-p.y)*0.05;
        }
        ctx.fillStyle=`rgba(255,150,0,${p.life*0.8})`;
        ctx.fillRect(p.x,p.y,2,2);
      });
      if(progress>=1)progress=0;
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Signal Rise Logo",
  tags:["trace","build","form"],
  description:"Signal Rise Logo — particle effect with dynamic motion",
  code:`// Signal Rise Logo animation code`,
  animator:(c,ctx,mouse)=>{
    let progress=0,particles=[],t=0,id;
    const targetPts=[];
    for(let j=0;j<97;j++){
      const a=j/97*Math.PI*2;
      const r=57;
      targetPts.push({x:c.width/2+Math.cos(a)*r,y:c.height/2+Math.sin(a)*r});
    }
    for(let j=0;j<targetPts.length;j++)
      particles.push({x:Math.random()*c.width,y:Math.random()*c.height,tx:targetPts[j].x,ty:targetPts[j].y,life:0});
    const loop=()=>{
      t+=0.03;
      progress=Math.min(1,progress+0.005);
      ctx.fillStyle="rgba(0,0,0,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      particles.forEach((p,j)=>{
        if(progress>j/particles.length){
          p.life=Math.min(1,p.life+0.05);
          p.x+=(p.tx-p.x)*0.05;
          p.y+=(p.ty-p.y)*0.05;
        }
        ctx.fillStyle=`rgba(255,150,0,${p.life*0.8})`;
        ctx.fillRect(p.x,p.y,3,3);
      });
      if(progress>=1)progress=0;
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Bloom Trace Logo",
  tags:["build","form","logo"],
  description:"Bloom Trace Logo — particle effect with dynamic motion",
  code:`// Bloom Trace Logo animation code`,
  animator:(c,ctx,mouse)=>{
    let progress=0,particles=[],t=0,id;
    const targetPts=[];
    for(let j=0;j<98;j++){
      const a=j/98*Math.PI*2;
      const r=58;
      targetPts.push({x:c.width/2+Math.cos(a)*r,y:c.height/2+Math.sin(a)*r});
    }
    for(let j=0;j<targetPts.length;j++)
      particles.push({x:Math.random()*c.width,y:Math.random()*c.height,tx:targetPts[j].x,ty:targetPts[j].y,life:0});
    const loop=()=>{
      t+=0.03;
      progress=Math.min(1,progress+0.005);
      ctx.fillStyle="rgba(0,0,0,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      particles.forEach((p,j)=>{
        if(progress>j/particles.length){
          p.life=Math.min(1,p.life+0.05);
          p.x+=(p.tx-p.x)*0.05;
          p.y+=(p.ty-p.y)*0.05;
        }
        ctx.fillStyle=`rgba(255,150,0,${p.life*0.8})`;
        ctx.fillRect(p.x,p.y,4,4);
      });
      if(progress>=1)progress=0;
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Lightform Emblem",
  tags:["form","logo","reveal"],
  description:"Lightform Emblem — particle effect with dynamic motion",
  code:`// Lightform Emblem animation code`,
  animator:(c,ctx,mouse)=>{
    let progress=0,particles=[],t=0,id;
    const targetPts=[];
    for(let j=0;j<99;j++){
      const a=j/99*Math.PI*2;
      const r=59;
      targetPts.push({x:c.width/2+Math.cos(a)*r,y:c.height/2+Math.sin(a)*r});
    }
    for(let j=0;j<targetPts.length;j++)
      particles.push({x:Math.random()*c.width,y:Math.random()*c.height,tx:targetPts[j].x,ty:targetPts[j].y,life:0});
    const loop=()=>{
      t+=0.03;
      progress=Math.min(1,progress+0.005);
      ctx.fillStyle="rgba(0,0,0,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      particles.forEach((p,j)=>{
        if(progress>j/particles.length){
          p.life=Math.min(1,p.life+0.05);
          p.x+=(p.tx-p.x)*0.05;
          p.y+=(p.ty-p.y)*0.05;
        }
        ctx.fillStyle=`rgba(255,150,0,${p.life*0.8})`;
        ctx.fillRect(p.x,p.y,2,2);
      });
      if(progress>=1)progress=0;
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Core Pulse Logo",
  tags:["logo","reveal","trace"],
  description:"Core Pulse Logo — particle effect with dynamic motion",
  code:`// Core Pulse Logo animation code`,
  animator:(c,ctx,mouse)=>{
    let progress=0,particles=[],t=0,id;
    const targetPts=[];
    for(let j=0;j<60;j++){
      const a=j/60*Math.PI*2;
      const r=60;
      targetPts.push({x:c.width/2+Math.cos(a)*r,y:c.height/2+Math.sin(a)*r});
    }
    for(let j=0;j<targetPts.length;j++)
      particles.push({x:Math.random()*c.width,y:Math.random()*c.height,tx:targetPts[j].x,ty:targetPts[j].y,life:0});
    const loop=()=>{
      t+=0.03;
      progress=Math.min(1,progress+0.005);
      ctx.fillStyle="rgba(0,0,0,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      particles.forEach((p,j)=>{
        if(progress>j/particles.length){
          p.life=Math.min(1,p.life+0.05);
          p.x+=(p.tx-p.x)*0.05;
          p.y+=(p.ty-p.y)*0.05;
        }
        ctx.fillStyle=`rgba(255,150,0,${p.life*0.8})`;
        ctx.fillRect(p.x,p.y,3,3);
      });
      if(progress>=1)progress=0;
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Cascade Reveal Logo",
  tags:["reveal","trace","build"],
  description:"Cascade Reveal Logo — particle effect with dynamic motion",
  code:`// Cascade Reveal Logo animation code`,
  animator:(c,ctx,mouse)=>{
    let progress=0,particles=[],t=0,id;
    const targetPts=[];
    for(let j=0;j<61;j++){
      const a=j/61*Math.PI*2;
      const r=61;
      targetPts.push({x:c.width/2+Math.cos(a)*r,y:c.height/2+Math.sin(a)*r});
    }
    for(let j=0;j<targetPts.length;j++)
      particles.push({x:Math.random()*c.width,y:Math.random()*c.height,tx:targetPts[j].x,ty:targetPts[j].y,life:0});
    const loop=()=>{
      t+=0.03;
      progress=Math.min(1,progress+0.005);
      ctx.fillStyle="rgba(0,0,0,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      particles.forEach((p,j)=>{
        if(progress>j/particles.length){
          p.life=Math.min(1,p.life+0.05);
          p.x+=(p.tx-p.x)*0.05;
          p.y+=(p.ty-p.y)*0.05;
        }
        ctx.fillStyle=`rgba(255,150,0,${p.life*0.8})`;
        ctx.fillRect(p.x,p.y,4,4);
      });
      if(progress>=1)progress=0;
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Mesh Form Logo",
  tags:["trace","build","form"],
  description:"Mesh Form Logo — particle effect with dynamic motion",
  code:`// Mesh Form Logo animation code`,
  animator:(c,ctx,mouse)=>{
    let progress=0,particles=[],t=0,id;
    const targetPts=[];
    for(let j=0;j<62;j++){
      const a=j/62*Math.PI*2;
      const r=62;
      targetPts.push({x:c.width/2+Math.cos(a)*r,y:c.height/2+Math.sin(a)*r});
    }
    for(let j=0;j<targetPts.length;j++)
      particles.push({x:Math.random()*c.width,y:Math.random()*c.height,tx:targetPts[j].x,ty:targetPts[j].y,life:0});
    const loop=()=>{
      t+=0.03;
      progress=Math.min(1,progress+0.005);
      ctx.fillStyle="rgba(0,0,0,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      particles.forEach((p,j)=>{
        if(progress>j/particles.length){
          p.life=Math.min(1,p.life+0.05);
          p.x+=(p.tx-p.x)*0.05;
          p.y+=(p.ty-p.y)*0.05;
        }
        ctx.fillStyle=`rgba(255,150,0,${p.life*0.8})`;
        ctx.fillRect(p.x,p.y,2,2);
      });
      if(progress>=1)progress=0;
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Outline Energy Draw",
  tags:["build","form","logo"],
  description:"Outline Energy Draw — particle effect with dynamic motion",
  code:`// Outline Energy Draw animation code`,
  animator:(c,ctx,mouse)=>{
    let progress=0,particles=[],t=0,id;
    const targetPts=[];
    for(let j=0;j<63;j++){
      const a=j/63*Math.PI*2;
      const r=63;
      targetPts.push({x:c.width/2+Math.cos(a)*r,y:c.height/2+Math.sin(a)*r});
    }
    for(let j=0;j<targetPts.length;j++)
      particles.push({x:Math.random()*c.width,y:Math.random()*c.height,tx:targetPts[j].x,ty:targetPts[j].y,life:0});
    const loop=()=>{
      t+=0.03;
      progress=Math.min(1,progress+0.005);
      ctx.fillStyle="rgba(0,0,0,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      particles.forEach((p,j)=>{
        if(progress>j/particles.length){
          p.life=Math.min(1,p.life+0.05);
          p.x+=(p.tx-p.x)*0.05;
          p.y+=(p.ty-p.y)*0.05;
        }
        ctx.fillStyle=`rgba(255,150,0,${p.life*0.8})`;
        ctx.fillRect(p.x,p.y,3,3);
      });
      if(progress>=1)progress=0;
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Bloom Burst Logo",
  tags:["form","logo","reveal"],
  description:"Bloom Burst Logo — particle effect with dynamic motion",
  code:`// Bloom Burst Logo animation code`,
  animator:(c,ctx,mouse)=>{
    let progress=0,particles=[],t=0,id;
    const targetPts=[];
    for(let j=0;j<64;j++){
      const a=j/64*Math.PI*2;
      const r=64;
      targetPts.push({x:c.width/2+Math.cos(a)*r,y:c.height/2+Math.sin(a)*r});
    }
    for(let j=0;j<targetPts.length;j++)
      particles.push({x:Math.random()*c.width,y:Math.random()*c.height,tx:targetPts[j].x,ty:targetPts[j].y,life:0});
    const loop=()=>{
      t+=0.03;
      progress=Math.min(1,progress+0.005);
      ctx.fillStyle="rgba(0,0,0,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      particles.forEach((p,j)=>{
        if(progress>j/particles.length){
          p.life=Math.min(1,p.life+0.05);
          p.x+=(p.tx-p.x)*0.05;
          p.y+=(p.ty-p.y)*0.05;
        }
        ctx.fillStyle=`rgba(255,150,0,${p.life*0.8})`;
        ctx.fillRect(p.x,p.y,4,4);
      });
      if(progress>=1)progress=0;
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Phase Reveal Logo",
  tags:["logo","reveal","trace"],
  description:"Phase Reveal Logo — particle effect with dynamic motion",
  code:`// Phase Reveal Logo animation code`,
  animator:(c,ctx,mouse)=>{
    let progress=0,particles=[],t=0,id;
    const targetPts=[];
    for(let j=0;j<65;j++){
      const a=j/65*Math.PI*2;
      const r=65;
      targetPts.push({x:c.width/2+Math.cos(a)*r,y:c.height/2+Math.sin(a)*r});
    }
    for(let j=0;j<targetPts.length;j++)
      particles.push({x:Math.random()*c.width,y:Math.random()*c.height,tx:targetPts[j].x,ty:targetPts[j].y,life:0});
    const loop=()=>{
      t+=0.03;
      progress=Math.min(1,progress+0.005);
      ctx.fillStyle="rgba(0,0,0,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      particles.forEach((p,j)=>{
        if(progress>j/particles.length){
          p.life=Math.min(1,p.life+0.05);
          p.x+=(p.tx-p.x)*0.05;
          p.y+=(p.ty-p.y)*0.05;
        }
        ctx.fillStyle=`rgba(255,150,0,${p.life*0.8})`;
        ctx.fillRect(p.x,p.y,2,2);
      });
      if(progress>=1)progress=0;
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Bloom Orbit Logo",
  tags:["reveal","trace","build"],
  description:"Bloom Orbit Logo — particle effect with dynamic motion",
  code:`// Bloom Orbit Logo animation code`,
  animator:(c,ctx,mouse)=>{
    let progress=0,particles=[],t=0,id;
    const targetPts=[];
    for(let j=0;j<66;j++){
      const a=j/66*Math.PI*2;
      const r=66;
      targetPts.push({x:c.width/2+Math.cos(a)*r,y:c.height/2+Math.sin(a)*r});
    }
    for(let j=0;j<targetPts.length;j++)
      particles.push({x:Math.random()*c.width,y:Math.random()*c.height,tx:targetPts[j].x,ty:targetPts[j].y,life:0});
    const loop=()=>{
      t+=0.03;
      progress=Math.min(1,progress+0.005);
      ctx.fillStyle="rgba(0,0,0,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      particles.forEach((p,j)=>{
        if(progress>j/particles.length){
          p.life=Math.min(1,p.life+0.05);
          p.x+=(p.tx-p.x)*0.05;
          p.y+=(p.ty-p.y)*0.05;
        }
        ctx.fillStyle=`rgba(255,150,0,${p.life*0.8})`;
        ctx.fillRect(p.x,p.y,3,3);
      });
      if(progress>=1)progress=0;
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Light Mesh Logo",
  tags:["trace","build","form"],
  description:"Light Mesh Logo — particle effect with dynamic motion",
  code:`// Light Mesh Logo animation code`,
  animator:(c,ctx,mouse)=>{
    let progress=0,particles=[],t=0,id;
    const targetPts=[];
    for(let j=0;j<67;j++){
      const a=j/67*Math.PI*2;
      const r=67;
      targetPts.push({x:c.width/2+Math.cos(a)*r,y:c.height/2+Math.sin(a)*r});
    }
    for(let j=0;j<targetPts.length;j++)
      particles.push({x:Math.random()*c.width,y:Math.random()*c.height,tx:targetPts[j].x,ty:targetPts[j].y,life:0});
    const loop=()=>{
      t+=0.03;
      progress=Math.min(1,progress+0.005);
      ctx.fillStyle="rgba(0,0,0,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      particles.forEach((p,j)=>{
        if(progress>j/particles.length){
          p.life=Math.min(1,p.life+0.05);
          p.x+=(p.tx-p.x)*0.05;
          p.y+=(p.ty-p.y)*0.05;
        }
        ctx.fillStyle=`rgba(255,150,0,${p.life*0.8})`;
        ctx.fillRect(p.x,p.y,4,4);
      });
      if(progress>=1)progress=0;
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Pulse Draw Logo",
  tags:["build","form","logo"],
  description:"Pulse Draw Logo — particle effect with dynamic motion",
  code:`// Pulse Draw Logo animation code`,
  animator:(c,ctx,mouse)=>{
    let progress=0,particles=[],t=0,id;
    const targetPts=[];
    for(let j=0;j<68;j++){
      const a=j/68*Math.PI*2;
      const r=68;
      targetPts.push({x:c.width/2+Math.cos(a)*r,y:c.height/2+Math.sin(a)*r});
    }
    for(let j=0;j<targetPts.length;j++)
      particles.push({x:Math.random()*c.width,y:Math.random()*c.height,tx:targetPts[j].x,ty:targetPts[j].y,life:0});
    const loop=()=>{
      t+=0.03;
      progress=Math.min(1,progress+0.005);
      ctx.fillStyle="rgba(0,0,0,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      particles.forEach((p,j)=>{
        if(progress>j/particles.length){
          p.life=Math.min(1,p.life+0.05);
          p.x+=(p.tx-p.x)*0.05;
          p.y+=(p.ty-p.y)*0.05;
        }
        ctx.fillStyle=`rgba(255,150,0,${p.life*0.8})`;
        ctx.fillRect(p.x,p.y,2,2);
      });
      if(progress>=1)progress=0;
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Halo Reveal Logo",
  tags:["form","logo","reveal"],
  description:"Halo Reveal Logo — particle effect with dynamic motion",
  code:`// Halo Reveal Logo animation code`,
  animator:(c,ctx,mouse)=>{
    let progress=0,particles=[],t=0,id;
    const targetPts=[];
    for(let j=0;j<69;j++){
      const a=j/69*Math.PI*2;
      const r=69;
      targetPts.push({x:c.width/2+Math.cos(a)*r,y:c.height/2+Math.sin(a)*r});
    }
    for(let j=0;j<targetPts.length;j++)
      particles.push({x:Math.random()*c.width,y:Math.random()*c.height,tx:targetPts[j].x,ty:targetPts[j].y,life:0});
    const loop=()=>{
      t+=0.03;
      progress=Math.min(1,progress+0.005);
      ctx.fillStyle="rgba(0,0,0,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      particles.forEach((p,j)=>{
        if(progress>j/particles.length){
          p.life=Math.min(1,p.life+0.05);
          p.x+=(p.tx-p.x)*0.05;
          p.y+=(p.ty-p.y)*0.05;
        }
        ctx.fillStyle=`rgba(255,150,0,${p.life*0.8})`;
        ctx.fillRect(p.x,p.y,3,3);
      });
      if(progress>=1)progress=0;
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

];

// ────────────────────────────────────────────────────────────
//  DATA / NETWORK FX (50 effects)
// ────────────────────────────────────────────────────────────

export const dataNetworkEffects = [

{
  name:"Packet Flow Bloom",
  tags:["network","data","node"],
  description:"Packet Flow Bloom — particle effect with dynamic motion",
  code:`// Packet Flow Bloom animation code`,
  animator:(c,ctx,mouse)=>{
    let nodes=[],packets=[],t=0,id;
    for(let j=0;j<12;j++)
      nodes.push({x:Math.random()*c.width,y:Math.random()*c.height,vx:(Math.random()-.5)*0.5,vy:(Math.random()-.5)*0.5,load:Math.random()});
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(0,5,0,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      nodes.forEach(n=>{n.x+=n.vx;n.y+=n.vy;if(n.x<0||n.x>c.width)n.vx*=-1;if(n.y<0||n.y>c.height)n.vy*=-1;});
      if(Math.random()<0.08){
        const a=nodes[Math.floor(Math.random()*nodes.length)];
        const b=nodes[Math.floor(Math.random()*nodes.length)];
        if(a!==b)packets.push({x:a.x,y:a.y,tx:b.x,ty:b.y,t:0,life:1});
      }
      nodes.forEach((n,i)=>{
        nodes.forEach((m,j)=>{
          if(j<=i)return;
          const d=Math.hypot(n.x-m.x,n.y-m.y);
          if(d<130){
            ctx.strokeStyle=`rgba(0,255,150,${(1-d/130)*0.3})`;
            ctx.lineWidth=1;
            ctx.beginPath();ctx.moveTo(n.x,n.y);ctx.lineTo(m.x,m.y);ctx.stroke();
          }
        });
        const active=(Math.sin(t*2+i*0.5)+1)/2;
        ctx.fillStyle=`rgba(0,255,150,${0.5+active*0.5})`;
        ctx.beginPath();ctx.arc(n.x,n.y,3,0,Math.PI*2);ctx.fill();
      });
      packets.forEach((p,j)=>{
        p.t+=0.04;p.life-=0.02;
        const x=p.x+(p.tx-p.x)*p.t;
        const y=p.y+(p.ty-p.y)*p.t;
        ctx.fillStyle=`rgba(0,255,150,${p.life})`;
        ctx.beginPath();ctx.arc(x,y,3,0,Math.PI*2);ctx.fill();
        if(p.t>=1||p.life<=0)packets.splice(j,1);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Signal Node Storm",
  tags:["data","node","packet"],
  description:"Signal Node Storm — particle effect with dynamic motion",
  code:`// Signal Node Storm animation code`,
  animator:(c,ctx,mouse)=>{
    let nodes=[],packets=[],t=0,id;
    for(let j=0;j<13;j++)
      nodes.push({x:Math.random()*c.width,y:Math.random()*c.height,vx:(Math.random()-.5)*0.8,vy:(Math.random()-.5)*0.8,load:Math.random()});
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(0,5,0,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      nodes.forEach(n=>{n.x+=n.vx;n.y+=n.vy;if(n.x<0||n.x>c.width)n.vx*=-1;if(n.y<0||n.y>c.height)n.vy*=-1;});
      if(Math.random()<0.08){
        const a=nodes[Math.floor(Math.random()*nodes.length)];
        const b=nodes[Math.floor(Math.random()*nodes.length)];
        if(a!==b)packets.push({x:a.x,y:a.y,tx:b.x,ty:b.y,t:0,life:1});
      }
      nodes.forEach((n,i)=>{
        nodes.forEach((m,j)=>{
          if(j<=i)return;
          const d=Math.hypot(n.x-m.x,n.y-m.y);
          if(d<131){
            ctx.strokeStyle=`rgba(0,255,150,${(1-d/131)*0.3})`;
            ctx.lineWidth=1;
            ctx.beginPath();ctx.moveTo(n.x,n.y);ctx.lineTo(m.x,m.y);ctx.stroke();
          }
        });
        const active=(Math.sin(t*2+i*0.5)+1)/2;
        ctx.fillStyle=`rgba(0,255,150,${0.5+active*0.5})`;
        ctx.beginPath();ctx.arc(n.x,n.y,4,0,Math.PI*2);ctx.fill();
      });
      packets.forEach((p,j)=>{
        p.t+=0.04;p.life-=0.02;
        const x=p.x+(p.tx-p.x)*p.t;
        const y=p.y+(p.ty-p.y)*p.t;
        ctx.fillStyle=`rgba(0,255,150,${p.life})`;
        ctx.beginPath();ctx.arc(x,y,3,0,Math.PI*2);ctx.fill();
        if(p.t>=1||p.life<=0)packets.splice(j,1);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Data Bridge Pulse",
  tags:["node","packet","signal"],
  description:"Data Bridge Pulse — particle effect with dynamic motion",
  code:`// Data Bridge Pulse animation code`,
  animator:(c,ctx,mouse)=>{
    let nodes=[],packets=[],t=0,id;
    for(let j=0;j<14;j++)
      nodes.push({x:Math.random()*c.width,y:Math.random()*c.height,vx:(Math.random()-.5)*0.5,vy:(Math.random()-.5)*0.5,load:Math.random()});
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(0,5,0,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      nodes.forEach(n=>{n.x+=n.vx;n.y+=n.vy;if(n.x<0||n.x>c.width)n.vx*=-1;if(n.y<0||n.y>c.height)n.vy*=-1;});
      if(Math.random()<0.08){
        const a=nodes[Math.floor(Math.random()*nodes.length)];
        const b=nodes[Math.floor(Math.random()*nodes.length)];
        if(a!==b)packets.push({x:a.x,y:a.y,tx:b.x,ty:b.y,t:0,life:1});
      }
      nodes.forEach((n,i)=>{
        nodes.forEach((m,j)=>{
          if(j<=i)return;
          const d=Math.hypot(n.x-m.x,n.y-m.y);
          if(d<132){
            ctx.strokeStyle=`rgba(0,255,150,${(1-d/132)*0.3})`;
            ctx.lineWidth=1;
            ctx.beginPath();ctx.moveTo(n.x,n.y);ctx.lineTo(m.x,m.y);ctx.stroke();
          }
        });
        const active=(Math.sin(t*2+i*0.5)+1)/2;
        ctx.fillStyle=`rgba(0,255,150,${0.5+active*0.5})`;
        ctx.beginPath();ctx.arc(n.x,n.y,5,0,Math.PI*2);ctx.fill();
      });
      packets.forEach((p,j)=>{
        p.t+=0.04;p.life-=0.02;
        const x=p.x+(p.tx-p.x)*p.t;
        const y=p.y+(p.ty-p.y)*p.t;
        ctx.fillStyle=`rgba(0,255,150,${p.life})`;
        ctx.beginPath();ctx.arc(x,y,3,0,Math.PI*2);ctx.fill();
        if(p.t>=1||p.life<=0)packets.splice(j,1);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Network Bloom Field",
  tags:["packet","signal","network"],
  description:"Network Bloom Field — particle effect with dynamic motion",
  code:`// Network Bloom Field animation code`,
  animator:(c,ctx,mouse)=>{
    let nodes=[],packets=[],t=0,id;
    for(let j=0;j<15;j++)
      nodes.push({x:Math.random()*c.width,y:Math.random()*c.height,vx:(Math.random()-.5)*0.8,vy:(Math.random()-.5)*0.8,load:Math.random()});
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(0,5,0,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      nodes.forEach(n=>{n.x+=n.vx;n.y+=n.vy;if(n.x<0||n.x>c.width)n.vx*=-1;if(n.y<0||n.y>c.height)n.vy*=-1;});
      if(Math.random()<0.08){
        const a=nodes[Math.floor(Math.random()*nodes.length)];
        const b=nodes[Math.floor(Math.random()*nodes.length)];
        if(a!==b)packets.push({x:a.x,y:a.y,tx:b.x,ty:b.y,t:0,life:1});
      }
      nodes.forEach((n,i)=>{
        nodes.forEach((m,j)=>{
          if(j<=i)return;
          const d=Math.hypot(n.x-m.x,n.y-m.y);
          if(d<133){
            ctx.strokeStyle=`rgba(0,255,150,${(1-d/133)*0.3})`;
            ctx.lineWidth=1;
            ctx.beginPath();ctx.moveTo(n.x,n.y);ctx.lineTo(m.x,m.y);ctx.stroke();
          }
        });
        const active=(Math.sin(t*2+i*0.5)+1)/2;
        ctx.fillStyle=`rgba(0,255,150,${0.5+active*0.5})`;
        ctx.beginPath();ctx.arc(n.x,n.y,6,0,Math.PI*2);ctx.fill();
      });
      packets.forEach((p,j)=>{
        p.t+=0.04;p.life-=0.02;
        const x=p.x+(p.tx-p.x)*p.t;
        const y=p.y+(p.ty-p.y)*p.t;
        ctx.fillStyle=`rgba(0,255,150,${p.life})`;
        ctx.beginPath();ctx.arc(x,y,3,0,Math.PI*2);ctx.fill();
        if(p.t>=1||p.life<=0)packets.splice(j,1);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Bitstream Cascade",
  tags:["signal","network","data"],
  description:"Bitstream Cascade — particle effect with dynamic motion",
  code:`// Bitstream Cascade animation code`,
  animator:(c,ctx,mouse)=>{
    let nodes=[],packets=[],t=0,id;
    for(let j=0;j<16;j++)
      nodes.push({x:Math.random()*c.width,y:Math.random()*c.height,vx:(Math.random()-.5)*0.5,vy:(Math.random()-.5)*0.5,load:Math.random()});
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(0,5,0,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      nodes.forEach(n=>{n.x+=n.vx;n.y+=n.vy;if(n.x<0||n.x>c.width)n.vx*=-1;if(n.y<0||n.y>c.height)n.vy*=-1;});
      if(Math.random()<0.08){
        const a=nodes[Math.floor(Math.random()*nodes.length)];
        const b=nodes[Math.floor(Math.random()*nodes.length)];
        if(a!==b)packets.push({x:a.x,y:a.y,tx:b.x,ty:b.y,t:0,life:1});
      }
      nodes.forEach((n,i)=>{
        nodes.forEach((m,j)=>{
          if(j<=i)return;
          const d=Math.hypot(n.x-m.x,n.y-m.y);
          if(d<134){
            ctx.strokeStyle=`rgba(0,255,150,${(1-d/134)*0.3})`;
            ctx.lineWidth=1;
            ctx.beginPath();ctx.moveTo(n.x,n.y);ctx.lineTo(m.x,m.y);ctx.stroke();
          }
        });
        const active=(Math.sin(t*2+i*0.5)+1)/2;
        ctx.fillStyle=`rgba(0,255,150,${0.5+active*0.5})`;
        ctx.beginPath();ctx.arc(n.x,n.y,3,0,Math.PI*2);ctx.fill();
      });
      packets.forEach((p,j)=>{
        p.t+=0.04;p.life-=0.02;
        const x=p.x+(p.tx-p.x)*p.t;
        const y=p.y+(p.ty-p.y)*p.t;
        ctx.fillStyle=`rgba(0,255,150,${p.life})`;
        ctx.beginPath();ctx.arc(x,y,3,0,Math.PI*2);ctx.fill();
        if(p.t>=1||p.life<=0)packets.splice(j,1);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Server Pulse Rings",
  tags:["network","data","node"],
  description:"Server Pulse Rings — particle effect with dynamic motion",
  code:`// Server Pulse Rings animation code`,
  animator:(c,ctx,mouse)=>{
    let nodes=[],packets=[],t=0,id;
    for(let j=0;j<17;j++)
      nodes.push({x:Math.random()*c.width,y:Math.random()*c.height,vx:(Math.random()-.5)*0.8,vy:(Math.random()-.5)*0.8,load:Math.random()});
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(0,5,0,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      nodes.forEach(n=>{n.x+=n.vx;n.y+=n.vy;if(n.x<0||n.x>c.width)n.vx*=-1;if(n.y<0||n.y>c.height)n.vy*=-1;});
      if(Math.random()<0.08){
        const a=nodes[Math.floor(Math.random()*nodes.length)];
        const b=nodes[Math.floor(Math.random()*nodes.length)];
        if(a!==b)packets.push({x:a.x,y:a.y,tx:b.x,ty:b.y,t:0,life:1});
      }
      nodes.forEach((n,i)=>{
        nodes.forEach((m,j)=>{
          if(j<=i)return;
          const d=Math.hypot(n.x-m.x,n.y-m.y);
          if(d<135){
            ctx.strokeStyle=`rgba(0,255,150,${(1-d/135)*0.3})`;
            ctx.lineWidth=1;
            ctx.beginPath();ctx.moveTo(n.x,n.y);ctx.lineTo(m.x,m.y);ctx.stroke();
          }
        });
        const active=(Math.sin(t*2+i*0.5)+1)/2;
        ctx.fillStyle=`rgba(0,255,150,${0.5+active*0.5})`;
        ctx.beginPath();ctx.arc(n.x,n.y,4,0,Math.PI*2);ctx.fill();
      });
      packets.forEach((p,j)=>{
        p.t+=0.04;p.life-=0.02;
        const x=p.x+(p.tx-p.x)*p.t;
        const y=p.y+(p.ty-p.y)*p.t;
        ctx.fillStyle=`rgba(0,255,150,${p.life})`;
        ctx.beginPath();ctx.arc(x,y,3,0,Math.PI*2);ctx.fill();
        if(p.t>=1||p.life<=0)packets.splice(j,1);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Data Tunnel Flow",
  tags:["data","node","packet"],
  description:"Data Tunnel Flow — particle effect with dynamic motion",
  code:`// Data Tunnel Flow animation code`,
  animator:(c,ctx,mouse)=>{
    let nodes=[],packets=[],t=0,id;
    for(let j=0;j<18;j++)
      nodes.push({x:Math.random()*c.width,y:Math.random()*c.height,vx:(Math.random()-.5)*0.5,vy:(Math.random()-.5)*0.5,load:Math.random()});
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(0,5,0,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      nodes.forEach(n=>{n.x+=n.vx;n.y+=n.vy;if(n.x<0||n.x>c.width)n.vx*=-1;if(n.y<0||n.y>c.height)n.vy*=-1;});
      if(Math.random()<0.08){
        const a=nodes[Math.floor(Math.random()*nodes.length)];
        const b=nodes[Math.floor(Math.random()*nodes.length)];
        if(a!==b)packets.push({x:a.x,y:a.y,tx:b.x,ty:b.y,t:0,life:1});
      }
      nodes.forEach((n,i)=>{
        nodes.forEach((m,j)=>{
          if(j<=i)return;
          const d=Math.hypot(n.x-m.x,n.y-m.y);
          if(d<136){
            ctx.strokeStyle=`rgba(0,255,150,${(1-d/136)*0.3})`;
            ctx.lineWidth=1;
            ctx.beginPath();ctx.moveTo(n.x,n.y);ctx.lineTo(m.x,m.y);ctx.stroke();
          }
        });
        const active=(Math.sin(t*2+i*0.5)+1)/2;
        ctx.fillStyle=`rgba(0,255,150,${0.5+active*0.5})`;
        ctx.beginPath();ctx.arc(n.x,n.y,5,0,Math.PI*2);ctx.fill();
      });
      packets.forEach((p,j)=>{
        p.t+=0.04;p.life-=0.02;
        const x=p.x+(p.tx-p.x)*p.t;
        const y=p.y+(p.ty-p.y)*p.t;
        ctx.fillStyle=`rgba(0,255,150,${p.life})`;
        ctx.beginPath();ctx.arc(x,y,3,0,Math.PI*2);ctx.fill();
        if(p.t>=1||p.life<=0)packets.splice(j,1);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Node Mesh Bloom",
  tags:["node","packet","signal"],
  description:"Node Mesh Bloom — particle effect with dynamic motion",
  code:`// Node Mesh Bloom animation code`,
  animator:(c,ctx,mouse)=>{
    let nodes=[],packets=[],t=0,id;
    for(let j=0;j<19;j++)
      nodes.push({x:Math.random()*c.width,y:Math.random()*c.height,vx:(Math.random()-.5)*0.8,vy:(Math.random()-.5)*0.8,load:Math.random()});
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(0,5,0,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      nodes.forEach(n=>{n.x+=n.vx;n.y+=n.vy;if(n.x<0||n.x>c.width)n.vx*=-1;if(n.y<0||n.y>c.height)n.vy*=-1;});
      if(Math.random()<0.08){
        const a=nodes[Math.floor(Math.random()*nodes.length)];
        const b=nodes[Math.floor(Math.random()*nodes.length)];
        if(a!==b)packets.push({x:a.x,y:a.y,tx:b.x,ty:b.y,t:0,life:1});
      }
      nodes.forEach((n,i)=>{
        nodes.forEach((m,j)=>{
          if(j<=i)return;
          const d=Math.hypot(n.x-m.x,n.y-m.y);
          if(d<137){
            ctx.strokeStyle=`rgba(0,255,150,${(1-d/137)*0.3})`;
            ctx.lineWidth=1;
            ctx.beginPath();ctx.moveTo(n.x,n.y);ctx.lineTo(m.x,m.y);ctx.stroke();
          }
        });
        const active=(Math.sin(t*2+i*0.5)+1)/2;
        ctx.fillStyle=`rgba(0,255,150,${0.5+active*0.5})`;
        ctx.beginPath();ctx.arc(n.x,n.y,6,0,Math.PI*2);ctx.fill();
      });
      packets.forEach((p,j)=>{
        p.t+=0.04;p.life-=0.02;
        const x=p.x+(p.tx-p.x)*p.t;
        const y=p.y+(p.ty-p.y)*p.t;
        ctx.fillStyle=`rgba(0,255,150,${p.life})`;
        ctx.beginPath();ctx.arc(x,y,3,0,Math.PI*2);ctx.fill();
        if(p.t>=1||p.life<=0)packets.splice(j,1);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Bandwidth Halo",
  tags:["packet","signal","network"],
  description:"Bandwidth Halo — particle effect with dynamic motion",
  code:`// Bandwidth Halo animation code`,
  animator:(c,ctx,mouse)=>{
    let nodes=[],packets=[],t=0,id;
    for(let j=0;j<20;j++)
      nodes.push({x:Math.random()*c.width,y:Math.random()*c.height,vx:(Math.random()-.5)*0.5,vy:(Math.random()-.5)*0.5,load:Math.random()});
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(0,5,0,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      nodes.forEach(n=>{n.x+=n.vx;n.y+=n.vy;if(n.x<0||n.x>c.width)n.vx*=-1;if(n.y<0||n.y>c.height)n.vy*=-1;});
      if(Math.random()<0.08){
        const a=nodes[Math.floor(Math.random()*nodes.length)];
        const b=nodes[Math.floor(Math.random()*nodes.length)];
        if(a!==b)packets.push({x:a.x,y:a.y,tx:b.x,ty:b.y,t:0,life:1});
      }
      nodes.forEach((n,i)=>{
        nodes.forEach((m,j)=>{
          if(j<=i)return;
          const d=Math.hypot(n.x-m.x,n.y-m.y);
          if(d<138){
            ctx.strokeStyle=`rgba(0,255,150,${(1-d/138)*0.3})`;
            ctx.lineWidth=1;
            ctx.beginPath();ctx.moveTo(n.x,n.y);ctx.lineTo(m.x,m.y);ctx.stroke();
          }
        });
        const active=(Math.sin(t*2+i*0.5)+1)/2;
        ctx.fillStyle=`rgba(0,255,150,${0.5+active*0.5})`;
        ctx.beginPath();ctx.arc(n.x,n.y,3,0,Math.PI*2);ctx.fill();
      });
      packets.forEach((p,j)=>{
        p.t+=0.04;p.life-=0.02;
        const x=p.x+(p.tx-p.x)*p.t;
        const y=p.y+(p.ty-p.y)*p.t;
        ctx.fillStyle=`rgba(0,255,150,${p.life})`;
        ctx.beginPath();ctx.arc(x,y,3,0,Math.PI*2);ctx.fill();
        if(p.t>=1||p.life<=0)packets.splice(j,1);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Ping Wave Net",
  tags:["signal","network","data"],
  description:"Ping Wave Net — particle effect with dynamic motion",
  code:`// Ping Wave Net animation code`,
  animator:(c,ctx,mouse)=>{
    let nodes=[],packets=[],t=0,id;
    for(let j=0;j<21;j++)
      nodes.push({x:Math.random()*c.width,y:Math.random()*c.height,vx:(Math.random()-.5)*0.8,vy:(Math.random()-.5)*0.8,load:Math.random()});
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(0,5,0,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      nodes.forEach(n=>{n.x+=n.vx;n.y+=n.vy;if(n.x<0||n.x>c.width)n.vx*=-1;if(n.y<0||n.y>c.height)n.vy*=-1;});
      if(Math.random()<0.08){
        const a=nodes[Math.floor(Math.random()*nodes.length)];
        const b=nodes[Math.floor(Math.random()*nodes.length)];
        if(a!==b)packets.push({x:a.x,y:a.y,tx:b.x,ty:b.y,t:0,life:1});
      }
      nodes.forEach((n,i)=>{
        nodes.forEach((m,j)=>{
          if(j<=i)return;
          const d=Math.hypot(n.x-m.x,n.y-m.y);
          if(d<139){
            ctx.strokeStyle=`rgba(0,255,150,${(1-d/139)*0.3})`;
            ctx.lineWidth=1;
            ctx.beginPath();ctx.moveTo(n.x,n.y);ctx.lineTo(m.x,m.y);ctx.stroke();
          }
        });
        const active=(Math.sin(t*2+i*0.5)+1)/2;
        ctx.fillStyle=`rgba(0,255,150,${0.5+active*0.5})`;
        ctx.beginPath();ctx.arc(n.x,n.y,4,0,Math.PI*2);ctx.fill();
      });
      packets.forEach((p,j)=>{
        p.t+=0.04;p.life-=0.02;
        const x=p.x+(p.tx-p.x)*p.t;
        const y=p.y+(p.ty-p.y)*p.t;
        ctx.fillStyle=`rgba(0,255,150,${p.life})`;
        ctx.beginPath();ctx.arc(x,y,3,0,Math.PI*2);ctx.fill();
        if(p.t>=1||p.life<=0)packets.splice(j,1);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Protocol Bloom Core",
  tags:["network","data","node"],
  description:"Protocol Bloom Core — particle effect with dynamic motion",
  code:`// Protocol Bloom Core animation code`,
  animator:(c,ctx,mouse)=>{
    let nodes=[],packets=[],t=0,id;
    for(let j=0;j<12;j++)
      nodes.push({x:Math.random()*c.width,y:Math.random()*c.height,vx:(Math.random()-.5)*0.5,vy:(Math.random()-.5)*0.5,load:Math.random()});
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(0,5,0,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      nodes.forEach(n=>{n.x+=n.vx;n.y+=n.vy;if(n.x<0||n.x>c.width)n.vx*=-1;if(n.y<0||n.y>c.height)n.vy*=-1;});
      if(Math.random()<0.08){
        const a=nodes[Math.floor(Math.random()*nodes.length)];
        const b=nodes[Math.floor(Math.random()*nodes.length)];
        if(a!==b)packets.push({x:a.x,y:a.y,tx:b.x,ty:b.y,t:0,life:1});
      }
      nodes.forEach((n,i)=>{
        nodes.forEach((m,j)=>{
          if(j<=i)return;
          const d=Math.hypot(n.x-m.x,n.y-m.y);
          if(d<140){
            ctx.strokeStyle=`rgba(0,255,150,${(1-d/140)*0.3})`;
            ctx.lineWidth=1;
            ctx.beginPath();ctx.moveTo(n.x,n.y);ctx.lineTo(m.x,m.y);ctx.stroke();
          }
        });
        const active=(Math.sin(t*2+i*0.5)+1)/2;
        ctx.fillStyle=`rgba(0,255,150,${0.5+active*0.5})`;
        ctx.beginPath();ctx.arc(n.x,n.y,5,0,Math.PI*2);ctx.fill();
      });
      packets.forEach((p,j)=>{
        p.t+=0.04;p.life-=0.02;
        const x=p.x+(p.tx-p.x)*p.t;
        const y=p.y+(p.ty-p.y)*p.t;
        ctx.fillStyle=`rgba(0,255,150,${p.life})`;
        ctx.beginPath();ctx.arc(x,y,3,0,Math.PI*2);ctx.fill();
        if(p.t>=1||p.life<=0)packets.splice(j,1);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Data Bloom Rings",
  tags:["data","node","packet"],
  description:"Data Bloom Rings — particle effect with dynamic motion",
  code:`// Data Bloom Rings animation code`,
  animator:(c,ctx,mouse)=>{
    let nodes=[],packets=[],t=0,id;
    for(let j=0;j<13;j++)
      nodes.push({x:Math.random()*c.width,y:Math.random()*c.height,vx:(Math.random()-.5)*0.8,vy:(Math.random()-.5)*0.8,load:Math.random()});
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(0,5,0,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      nodes.forEach(n=>{n.x+=n.vx;n.y+=n.vy;if(n.x<0||n.x>c.width)n.vx*=-1;if(n.y<0||n.y>c.height)n.vy*=-1;});
      if(Math.random()<0.08){
        const a=nodes[Math.floor(Math.random()*nodes.length)];
        const b=nodes[Math.floor(Math.random()*nodes.length)];
        if(a!==b)packets.push({x:a.x,y:a.y,tx:b.x,ty:b.y,t:0,life:1});
      }
      nodes.forEach((n,i)=>{
        nodes.forEach((m,j)=>{
          if(j<=i)return;
          const d=Math.hypot(n.x-m.x,n.y-m.y);
          if(d<141){
            ctx.strokeStyle=`rgba(0,255,150,${(1-d/141)*0.3})`;
            ctx.lineWidth=1;
            ctx.beginPath();ctx.moveTo(n.x,n.y);ctx.lineTo(m.x,m.y);ctx.stroke();
          }
        });
        const active=(Math.sin(t*2+i*0.5)+1)/2;
        ctx.fillStyle=`rgba(0,255,150,${0.5+active*0.5})`;
        ctx.beginPath();ctx.arc(n.x,n.y,6,0,Math.PI*2);ctx.fill();
      });
      packets.forEach((p,j)=>{
        p.t+=0.04;p.life-=0.02;
        const x=p.x+(p.tx-p.x)*p.t;
        const y=p.y+(p.ty-p.y)*p.t;
        ctx.fillStyle=`rgba(0,255,150,${p.life})`;
        ctx.beginPath();ctx.arc(x,y,3,0,Math.PI*2);ctx.fill();
        if(p.t>=1||p.life<=0)packets.splice(j,1);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Connection Orbit Net",
  tags:["node","packet","signal"],
  description:"Connection Orbit Net — particle effect with dynamic motion",
  code:`// Connection Orbit Net animation code`,
  animator:(c,ctx,mouse)=>{
    let nodes=[],packets=[],t=0,id;
    for(let j=0;j<14;j++)
      nodes.push({x:Math.random()*c.width,y:Math.random()*c.height,vx:(Math.random()-.5)*0.5,vy:(Math.random()-.5)*0.5,load:Math.random()});
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(0,5,0,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      nodes.forEach(n=>{n.x+=n.vx;n.y+=n.vy;if(n.x<0||n.x>c.width)n.vx*=-1;if(n.y<0||n.y>c.height)n.vy*=-1;});
      if(Math.random()<0.08){
        const a=nodes[Math.floor(Math.random()*nodes.length)];
        const b=nodes[Math.floor(Math.random()*nodes.length)];
        if(a!==b)packets.push({x:a.x,y:a.y,tx:b.x,ty:b.y,t:0,life:1});
      }
      nodes.forEach((n,i)=>{
        nodes.forEach((m,j)=>{
          if(j<=i)return;
          const d=Math.hypot(n.x-m.x,n.y-m.y);
          if(d<142){
            ctx.strokeStyle=`rgba(0,255,150,${(1-d/142)*0.3})`;
            ctx.lineWidth=1;
            ctx.beginPath();ctx.moveTo(n.x,n.y);ctx.lineTo(m.x,m.y);ctx.stroke();
          }
        });
        const active=(Math.sin(t*2+i*0.5)+1)/2;
        ctx.fillStyle=`rgba(0,255,150,${0.5+active*0.5})`;
        ctx.beginPath();ctx.arc(n.x,n.y,3,0,Math.PI*2);ctx.fill();
      });
      packets.forEach((p,j)=>{
        p.t+=0.04;p.life-=0.02;
        const x=p.x+(p.tx-p.x)*p.t;
        const y=p.y+(p.ty-p.y)*p.t;
        ctx.fillStyle=`rgba(0,255,150,${p.life})`;
        ctx.beginPath();ctx.arc(x,y,3,0,Math.PI*2);ctx.fill();
        if(p.t>=1||p.life<=0)packets.splice(j,1);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Signal Bloom Mesh",
  tags:["packet","signal","network"],
  description:"Signal Bloom Mesh — particle effect with dynamic motion",
  code:`// Signal Bloom Mesh animation code`,
  animator:(c,ctx,mouse)=>{
    let nodes=[],packets=[],t=0,id;
    for(let j=0;j<15;j++)
      nodes.push({x:Math.random()*c.width,y:Math.random()*c.height,vx:(Math.random()-.5)*0.8,vy:(Math.random()-.5)*0.8,load:Math.random()});
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(0,5,0,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      nodes.forEach(n=>{n.x+=n.vx;n.y+=n.vy;if(n.x<0||n.x>c.width)n.vx*=-1;if(n.y<0||n.y>c.height)n.vy*=-1;});
      if(Math.random()<0.08){
        const a=nodes[Math.floor(Math.random()*nodes.length)];
        const b=nodes[Math.floor(Math.random()*nodes.length)];
        if(a!==b)packets.push({x:a.x,y:a.y,tx:b.x,ty:b.y,t:0,life:1});
      }
      nodes.forEach((n,i)=>{
        nodes.forEach((m,j)=>{
          if(j<=i)return;
          const d=Math.hypot(n.x-m.x,n.y-m.y);
          if(d<143){
            ctx.strokeStyle=`rgba(0,255,150,${(1-d/143)*0.3})`;
            ctx.lineWidth=1;
            ctx.beginPath();ctx.moveTo(n.x,n.y);ctx.lineTo(m.x,m.y);ctx.stroke();
          }
        });
        const active=(Math.sin(t*2+i*0.5)+1)/2;
        ctx.fillStyle=`rgba(0,255,150,${0.5+active*0.5})`;
        ctx.beginPath();ctx.arc(n.x,n.y,4,0,Math.PI*2);ctx.fill();
      });
      packets.forEach((p,j)=>{
        p.t+=0.04;p.life-=0.02;
        const x=p.x+(p.tx-p.x)*p.t;
        const y=p.y+(p.ty-p.y)*p.t;
        ctx.fillStyle=`rgba(0,255,150,${p.life})`;
        ctx.beginPath();ctx.arc(x,y,3,0,Math.PI*2);ctx.fill();
        if(p.t>=1||p.life<=0)packets.splice(j,1);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Packet Bloom Storm",
  tags:["signal","network","data"],
  description:"Packet Bloom Storm — particle effect with dynamic motion",
  code:`// Packet Bloom Storm animation code`,
  animator:(c,ctx,mouse)=>{
    let nodes=[],packets=[],t=0,id;
    for(let j=0;j<16;j++)
      nodes.push({x:Math.random()*c.width,y:Math.random()*c.height,vx:(Math.random()-.5)*0.5,vy:(Math.random()-.5)*0.5,load:Math.random()});
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(0,5,0,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      nodes.forEach(n=>{n.x+=n.vx;n.y+=n.vy;if(n.x<0||n.x>c.width)n.vx*=-1;if(n.y<0||n.y>c.height)n.vy*=-1;});
      if(Math.random()<0.08){
        const a=nodes[Math.floor(Math.random()*nodes.length)];
        const b=nodes[Math.floor(Math.random()*nodes.length)];
        if(a!==b)packets.push({x:a.x,y:a.y,tx:b.x,ty:b.y,t:0,life:1});
      }
      nodes.forEach((n,i)=>{
        nodes.forEach((m,j)=>{
          if(j<=i)return;
          const d=Math.hypot(n.x-m.x,n.y-m.y);
          if(d<144){
            ctx.strokeStyle=`rgba(0,255,150,${(1-d/144)*0.3})`;
            ctx.lineWidth=1;
            ctx.beginPath();ctx.moveTo(n.x,n.y);ctx.lineTo(m.x,m.y);ctx.stroke();
          }
        });
        const active=(Math.sin(t*2+i*0.5)+1)/2;
        ctx.fillStyle=`rgba(0,255,150,${0.5+active*0.5})`;
        ctx.beginPath();ctx.arc(n.x,n.y,5,0,Math.PI*2);ctx.fill();
      });
      packets.forEach((p,j)=>{
        p.t+=0.04;p.life-=0.02;
        const x=p.x+(p.tx-p.x)*p.t;
        const y=p.y+(p.ty-p.y)*p.t;
        ctx.fillStyle=`rgba(0,255,150,${p.life})`;
        ctx.beginPath();ctx.arc(x,y,3,0,Math.PI*2);ctx.fill();
        if(p.t>=1||p.life<=0)packets.splice(j,1);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Network Halo Flow",
  tags:["network","data","node"],
  description:"Network Halo Flow — particle effect with dynamic motion",
  code:`// Network Halo Flow animation code`,
  animator:(c,ctx,mouse)=>{
    let nodes=[],packets=[],t=0,id;
    for(let j=0;j<17;j++)
      nodes.push({x:Math.random()*c.width,y:Math.random()*c.height,vx:(Math.random()-.5)*0.8,vy:(Math.random()-.5)*0.8,load:Math.random()});
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(0,5,0,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      nodes.forEach(n=>{n.x+=n.vx;n.y+=n.vy;if(n.x<0||n.x>c.width)n.vx*=-1;if(n.y<0||n.y>c.height)n.vy*=-1;});
      if(Math.random()<0.08){
        const a=nodes[Math.floor(Math.random()*nodes.length)];
        const b=nodes[Math.floor(Math.random()*nodes.length)];
        if(a!==b)packets.push({x:a.x,y:a.y,tx:b.x,ty:b.y,t:0,life:1});
      }
      nodes.forEach((n,i)=>{
        nodes.forEach((m,j)=>{
          if(j<=i)return;
          const d=Math.hypot(n.x-m.x,n.y-m.y);
          if(d<145){
            ctx.strokeStyle=`rgba(0,255,150,${(1-d/145)*0.3})`;
            ctx.lineWidth=1;
            ctx.beginPath();ctx.moveTo(n.x,n.y);ctx.lineTo(m.x,m.y);ctx.stroke();
          }
        });
        const active=(Math.sin(t*2+i*0.5)+1)/2;
        ctx.fillStyle=`rgba(0,255,150,${0.5+active*0.5})`;
        ctx.beginPath();ctx.arc(n.x,n.y,6,0,Math.PI*2);ctx.fill();
      });
      packets.forEach((p,j)=>{
        p.t+=0.04;p.life-=0.02;
        const x=p.x+(p.tx-p.x)*p.t;
        const y=p.y+(p.ty-p.y)*p.t;
        ctx.fillStyle=`rgba(0,255,150,${p.life})`;
        ctx.beginPath();ctx.arc(x,y,3,0,Math.PI*2);ctx.fill();
        if(p.t>=1||p.life<=0)packets.splice(j,1);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Data Pulse Lattice",
  tags:["data","node","packet"],
  description:"Data Pulse Lattice — particle effect with dynamic motion",
  code:`// Data Pulse Lattice animation code`,
  animator:(c,ctx,mouse)=>{
    let nodes=[],packets=[],t=0,id;
    for(let j=0;j<18;j++)
      nodes.push({x:Math.random()*c.width,y:Math.random()*c.height,vx:(Math.random()-.5)*0.5,vy:(Math.random()-.5)*0.5,load:Math.random()});
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(0,5,0,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      nodes.forEach(n=>{n.x+=n.vx;n.y+=n.vy;if(n.x<0||n.x>c.width)n.vx*=-1;if(n.y<0||n.y>c.height)n.vy*=-1;});
      if(Math.random()<0.08){
        const a=nodes[Math.floor(Math.random()*nodes.length)];
        const b=nodes[Math.floor(Math.random()*nodes.length)];
        if(a!==b)packets.push({x:a.x,y:a.y,tx:b.x,ty:b.y,t:0,life:1});
      }
      nodes.forEach((n,i)=>{
        nodes.forEach((m,j)=>{
          if(j<=i)return;
          const d=Math.hypot(n.x-m.x,n.y-m.y);
          if(d<146){
            ctx.strokeStyle=`rgba(0,255,150,${(1-d/146)*0.3})`;
            ctx.lineWidth=1;
            ctx.beginPath();ctx.moveTo(n.x,n.y);ctx.lineTo(m.x,m.y);ctx.stroke();
          }
        });
        const active=(Math.sin(t*2+i*0.5)+1)/2;
        ctx.fillStyle=`rgba(0,255,150,${0.5+active*0.5})`;
        ctx.beginPath();ctx.arc(n.x,n.y,3,0,Math.PI*2);ctx.fill();
      });
      packets.forEach((p,j)=>{
        p.t+=0.04;p.life-=0.02;
        const x=p.x+(p.tx-p.x)*p.t;
        const y=p.y+(p.ty-p.y)*p.t;
        ctx.fillStyle=`rgba(0,255,150,${p.life})`;
        ctx.beginPath();ctx.arc(x,y,3,0,Math.PI*2);ctx.fill();
        if(p.t>=1||p.life<=0)packets.splice(j,1);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Node Cascade Field",
  tags:["node","packet","signal"],
  description:"Node Cascade Field — particle effect with dynamic motion",
  code:`// Node Cascade Field animation code`,
  animator:(c,ctx,mouse)=>{
    let nodes=[],packets=[],t=0,id;
    for(let j=0;j<19;j++)
      nodes.push({x:Math.random()*c.width,y:Math.random()*c.height,vx:(Math.random()-.5)*0.8,vy:(Math.random()-.5)*0.8,load:Math.random()});
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(0,5,0,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      nodes.forEach(n=>{n.x+=n.vx;n.y+=n.vy;if(n.x<0||n.x>c.width)n.vx*=-1;if(n.y<0||n.y>c.height)n.vy*=-1;});
      if(Math.random()<0.08){
        const a=nodes[Math.floor(Math.random()*nodes.length)];
        const b=nodes[Math.floor(Math.random()*nodes.length)];
        if(a!==b)packets.push({x:a.x,y:a.y,tx:b.x,ty:b.y,t:0,life:1});
      }
      nodes.forEach((n,i)=>{
        nodes.forEach((m,j)=>{
          if(j<=i)return;
          const d=Math.hypot(n.x-m.x,n.y-m.y);
          if(d<147){
            ctx.strokeStyle=`rgba(0,255,150,${(1-d/147)*0.3})`;
            ctx.lineWidth=1;
            ctx.beginPath();ctx.moveTo(n.x,n.y);ctx.lineTo(m.x,m.y);ctx.stroke();
          }
        });
        const active=(Math.sin(t*2+i*0.5)+1)/2;
        ctx.fillStyle=`rgba(0,255,150,${0.5+active*0.5})`;
        ctx.beginPath();ctx.arc(n.x,n.y,4,0,Math.PI*2);ctx.fill();
      });
      packets.forEach((p,j)=>{
        p.t+=0.04;p.life-=0.02;
        const x=p.x+(p.tx-p.x)*p.t;
        const y=p.y+(p.ty-p.y)*p.t;
        ctx.fillStyle=`rgba(0,255,150,${p.life})`;
        ctx.beginPath();ctx.arc(x,y,3,0,Math.PI*2);ctx.fill();
        if(p.t>=1||p.life<=0)packets.splice(j,1);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Server Bloom Grid",
  tags:["packet","signal","network"],
  description:"Server Bloom Grid — particle effect with dynamic motion",
  code:`// Server Bloom Grid animation code`,
  animator:(c,ctx,mouse)=>{
    let nodes=[],packets=[],t=0,id;
    for(let j=0;j<20;j++)
      nodes.push({x:Math.random()*c.width,y:Math.random()*c.height,vx:(Math.random()-.5)*0.5,vy:(Math.random()-.5)*0.5,load:Math.random()});
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(0,5,0,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      nodes.forEach(n=>{n.x+=n.vx;n.y+=n.vy;if(n.x<0||n.x>c.width)n.vx*=-1;if(n.y<0||n.y>c.height)n.vy*=-1;});
      if(Math.random()<0.08){
        const a=nodes[Math.floor(Math.random()*nodes.length)];
        const b=nodes[Math.floor(Math.random()*nodes.length)];
        if(a!==b)packets.push({x:a.x,y:a.y,tx:b.x,ty:b.y,t:0,life:1});
      }
      nodes.forEach((n,i)=>{
        nodes.forEach((m,j)=>{
          if(j<=i)return;
          const d=Math.hypot(n.x-m.x,n.y-m.y);
          if(d<148){
            ctx.strokeStyle=`rgba(0,255,150,${(1-d/148)*0.3})`;
            ctx.lineWidth=1;
            ctx.beginPath();ctx.moveTo(n.x,n.y);ctx.lineTo(m.x,m.y);ctx.stroke();
          }
        });
        const active=(Math.sin(t*2+i*0.5)+1)/2;
        ctx.fillStyle=`rgba(0,255,150,${0.5+active*0.5})`;
        ctx.beginPath();ctx.arc(n.x,n.y,5,0,Math.PI*2);ctx.fill();
      });
      packets.forEach((p,j)=>{
        p.t+=0.04;p.life-=0.02;
        const x=p.x+(p.tx-p.x)*p.t;
        const y=p.y+(p.ty-p.y)*p.t;
        ctx.fillStyle=`rgba(0,255,150,${p.life})`;
        ctx.beginPath();ctx.arc(x,y,3,0,Math.PI*2);ctx.fill();
        if(p.t>=1||p.life<=0)packets.splice(j,1);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Data Orbit Halo",
  tags:["signal","network","data"],
  description:"Data Orbit Halo — particle effect with dynamic motion",
  code:`// Data Orbit Halo animation code`,
  animator:(c,ctx,mouse)=>{
    let nodes=[],packets=[],t=0,id;
    for(let j=0;j<21;j++)
      nodes.push({x:Math.random()*c.width,y:Math.random()*c.height,vx:(Math.random()-.5)*0.8,vy:(Math.random()-.5)*0.8,load:Math.random()});
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(0,5,0,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      nodes.forEach(n=>{n.x+=n.vx;n.y+=n.vy;if(n.x<0||n.x>c.width)n.vx*=-1;if(n.y<0||n.y>c.height)n.vy*=-1;});
      if(Math.random()<0.08){
        const a=nodes[Math.floor(Math.random()*nodes.length)];
        const b=nodes[Math.floor(Math.random()*nodes.length)];
        if(a!==b)packets.push({x:a.x,y:a.y,tx:b.x,ty:b.y,t:0,life:1});
      }
      nodes.forEach((n,i)=>{
        nodes.forEach((m,j)=>{
          if(j<=i)return;
          const d=Math.hypot(n.x-m.x,n.y-m.y);
          if(d<149){
            ctx.strokeStyle=`rgba(0,255,150,${(1-d/149)*0.3})`;
            ctx.lineWidth=1;
            ctx.beginPath();ctx.moveTo(n.x,n.y);ctx.lineTo(m.x,m.y);ctx.stroke();
          }
        });
        const active=(Math.sin(t*2+i*0.5)+1)/2;
        ctx.fillStyle=`rgba(0,255,150,${0.5+active*0.5})`;
        ctx.beginPath();ctx.arc(n.x,n.y,6,0,Math.PI*2);ctx.fill();
      });
      packets.forEach((p,j)=>{
        p.t+=0.04;p.life-=0.02;
        const x=p.x+(p.tx-p.x)*p.t;
        const y=p.y+(p.ty-p.y)*p.t;
        ctx.fillStyle=`rgba(0,255,150,${p.life})`;
        ctx.beginPath();ctx.arc(x,y,3,0,Math.PI*2);ctx.fill();
        if(p.t>=1||p.life<=0)packets.splice(j,1);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Signal Flow Rings",
  tags:["network","data","node"],
  description:"Signal Flow Rings — particle effect with dynamic motion",
  code:`// Signal Flow Rings animation code`,
  animator:(c,ctx,mouse)=>{
    let nodes=[],packets=[],t=0,id;
    for(let j=0;j<12;j++)
      nodes.push({x:Math.random()*c.width,y:Math.random()*c.height,vx:(Math.random()-.5)*0.5,vy:(Math.random()-.5)*0.5,load:Math.random()});
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(0,5,0,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      nodes.forEach(n=>{n.x+=n.vx;n.y+=n.vy;if(n.x<0||n.x>c.width)n.vx*=-1;if(n.y<0||n.y>c.height)n.vy*=-1;});
      if(Math.random()<0.08){
        const a=nodes[Math.floor(Math.random()*nodes.length)];
        const b=nodes[Math.floor(Math.random()*nodes.length)];
        if(a!==b)packets.push({x:a.x,y:a.y,tx:b.x,ty:b.y,t:0,life:1});
      }
      nodes.forEach((n,i)=>{
        nodes.forEach((m,j)=>{
          if(j<=i)return;
          const d=Math.hypot(n.x-m.x,n.y-m.y);
          if(d<150){
            ctx.strokeStyle=`rgba(0,255,150,${(1-d/150)*0.3})`;
            ctx.lineWidth=1;
            ctx.beginPath();ctx.moveTo(n.x,n.y);ctx.lineTo(m.x,m.y);ctx.stroke();
          }
        });
        const active=(Math.sin(t*2+i*0.5)+1)/2;
        ctx.fillStyle=`rgba(0,255,150,${0.5+active*0.5})`;
        ctx.beginPath();ctx.arc(n.x,n.y,3,0,Math.PI*2);ctx.fill();
      });
      packets.forEach((p,j)=>{
        p.t+=0.04;p.life-=0.02;
        const x=p.x+(p.tx-p.x)*p.t;
        const y=p.y+(p.ty-p.y)*p.t;
        ctx.fillStyle=`rgba(0,255,150,${p.life})`;
        ctx.beginPath();ctx.arc(x,y,3,0,Math.PI*2);ctx.fill();
        if(p.t>=1||p.life<=0)packets.splice(j,1);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Packet Bloom Core",
  tags:["data","node","packet"],
  description:"Packet Bloom Core — particle effect with dynamic motion",
  code:`// Packet Bloom Core animation code`,
  animator:(c,ctx,mouse)=>{
    let nodes=[],packets=[],t=0,id;
    for(let j=0;j<13;j++)
      nodes.push({x:Math.random()*c.width,y:Math.random()*c.height,vx:(Math.random()-.5)*0.8,vy:(Math.random()-.5)*0.8,load:Math.random()});
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(0,5,0,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      nodes.forEach(n=>{n.x+=n.vx;n.y+=n.vy;if(n.x<0||n.x>c.width)n.vx*=-1;if(n.y<0||n.y>c.height)n.vy*=-1;});
      if(Math.random()<0.08){
        const a=nodes[Math.floor(Math.random()*nodes.length)];
        const b=nodes[Math.floor(Math.random()*nodes.length)];
        if(a!==b)packets.push({x:a.x,y:a.y,tx:b.x,ty:b.y,t:0,life:1});
      }
      nodes.forEach((n,i)=>{
        nodes.forEach((m,j)=>{
          if(j<=i)return;
          const d=Math.hypot(n.x-m.x,n.y-m.y);
          if(d<151){
            ctx.strokeStyle=`rgba(0,255,150,${(1-d/151)*0.3})`;
            ctx.lineWidth=1;
            ctx.beginPath();ctx.moveTo(n.x,n.y);ctx.lineTo(m.x,m.y);ctx.stroke();
          }
        });
        const active=(Math.sin(t*2+i*0.5)+1)/2;
        ctx.fillStyle=`rgba(0,255,150,${0.5+active*0.5})`;
        ctx.beginPath();ctx.arc(n.x,n.y,4,0,Math.PI*2);ctx.fill();
      });
      packets.forEach((p,j)=>{
        p.t+=0.04;p.life-=0.02;
        const x=p.x+(p.tx-p.x)*p.t;
        const y=p.y+(p.ty-p.y)*p.t;
        ctx.fillStyle=`rgba(0,255,150,${p.life})`;
        ctx.beginPath();ctx.arc(x,y,3,0,Math.PI*2);ctx.fill();
        if(p.t>=1||p.life<=0)packets.splice(j,1);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Network Bloom Net",
  tags:["node","packet","signal"],
  description:"Network Bloom Net — particle effect with dynamic motion",
  code:`// Network Bloom Net animation code`,
  animator:(c,ctx,mouse)=>{
    let nodes=[],packets=[],t=0,id;
    for(let j=0;j<14;j++)
      nodes.push({x:Math.random()*c.width,y:Math.random()*c.height,vx:(Math.random()-.5)*0.5,vy:(Math.random()-.5)*0.5,load:Math.random()});
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(0,5,0,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      nodes.forEach(n=>{n.x+=n.vx;n.y+=n.vy;if(n.x<0||n.x>c.width)n.vx*=-1;if(n.y<0||n.y>c.height)n.vy*=-1;});
      if(Math.random()<0.08){
        const a=nodes[Math.floor(Math.random()*nodes.length)];
        const b=nodes[Math.floor(Math.random()*nodes.length)];
        if(a!==b)packets.push({x:a.x,y:a.y,tx:b.x,ty:b.y,t:0,life:1});
      }
      nodes.forEach((n,i)=>{
        nodes.forEach((m,j)=>{
          if(j<=i)return;
          const d=Math.hypot(n.x-m.x,n.y-m.y);
          if(d<152){
            ctx.strokeStyle=`rgba(0,255,150,${(1-d/152)*0.3})`;
            ctx.lineWidth=1;
            ctx.beginPath();ctx.moveTo(n.x,n.y);ctx.lineTo(m.x,m.y);ctx.stroke();
          }
        });
        const active=(Math.sin(t*2+i*0.5)+1)/2;
        ctx.fillStyle=`rgba(0,255,150,${0.5+active*0.5})`;
        ctx.beginPath();ctx.arc(n.x,n.y,5,0,Math.PI*2);ctx.fill();
      });
      packets.forEach((p,j)=>{
        p.t+=0.04;p.life-=0.02;
        const x=p.x+(p.tx-p.x)*p.t;
        const y=p.y+(p.ty-p.y)*p.t;
        ctx.fillStyle=`rgba(0,255,150,${p.life})`;
        ctx.beginPath();ctx.arc(x,y,3,0,Math.PI*2);ctx.fill();
        if(p.t>=1||p.life<=0)packets.splice(j,1);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Bitstream Halo Flow",
  tags:["packet","signal","network"],
  description:"Bitstream Halo Flow — particle effect with dynamic motion",
  code:`// Bitstream Halo Flow animation code`,
  animator:(c,ctx,mouse)=>{
    let nodes=[],packets=[],t=0,id;
    for(let j=0;j<15;j++)
      nodes.push({x:Math.random()*c.width,y:Math.random()*c.height,vx:(Math.random()-.5)*0.8,vy:(Math.random()-.5)*0.8,load:Math.random()});
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(0,5,0,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      nodes.forEach(n=>{n.x+=n.vx;n.y+=n.vy;if(n.x<0||n.x>c.width)n.vx*=-1;if(n.y<0||n.y>c.height)n.vy*=-1;});
      if(Math.random()<0.08){
        const a=nodes[Math.floor(Math.random()*nodes.length)];
        const b=nodes[Math.floor(Math.random()*nodes.length)];
        if(a!==b)packets.push({x:a.x,y:a.y,tx:b.x,ty:b.y,t:0,life:1});
      }
      nodes.forEach((n,i)=>{
        nodes.forEach((m,j)=>{
          if(j<=i)return;
          const d=Math.hypot(n.x-m.x,n.y-m.y);
          if(d<153){
            ctx.strokeStyle=`rgba(0,255,150,${(1-d/153)*0.3})`;
            ctx.lineWidth=1;
            ctx.beginPath();ctx.moveTo(n.x,n.y);ctx.lineTo(m.x,m.y);ctx.stroke();
          }
        });
        const active=(Math.sin(t*2+i*0.5)+1)/2;
        ctx.fillStyle=`rgba(0,255,150,${0.5+active*0.5})`;
        ctx.beginPath();ctx.arc(n.x,n.y,6,0,Math.PI*2);ctx.fill();
      });
      packets.forEach((p,j)=>{
        p.t+=0.04;p.life-=0.02;
        const x=p.x+(p.tx-p.x)*p.t;
        const y=p.y+(p.ty-p.y)*p.t;
        ctx.fillStyle=`rgba(0,255,150,${p.life})`;
        ctx.beginPath();ctx.arc(x,y,3,0,Math.PI*2);ctx.fill();
        if(p.t>=1||p.life<=0)packets.splice(j,1);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Data Bridge Mesh",
  tags:["signal","network","data"],
  description:"Data Bridge Mesh — particle effect with dynamic motion",
  code:`// Data Bridge Mesh animation code`,
  animator:(c,ctx,mouse)=>{
    let nodes=[],packets=[],t=0,id;
    for(let j=0;j<16;j++)
      nodes.push({x:Math.random()*c.width,y:Math.random()*c.height,vx:(Math.random()-.5)*0.5,vy:(Math.random()-.5)*0.5,load:Math.random()});
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(0,5,0,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      nodes.forEach(n=>{n.x+=n.vx;n.y+=n.vy;if(n.x<0||n.x>c.width)n.vx*=-1;if(n.y<0||n.y>c.height)n.vy*=-1;});
      if(Math.random()<0.08){
        const a=nodes[Math.floor(Math.random()*nodes.length)];
        const b=nodes[Math.floor(Math.random()*nodes.length)];
        if(a!==b)packets.push({x:a.x,y:a.y,tx:b.x,ty:b.y,t:0,life:1});
      }
      nodes.forEach((n,i)=>{
        nodes.forEach((m,j)=>{
          if(j<=i)return;
          const d=Math.hypot(n.x-m.x,n.y-m.y);
          if(d<154){
            ctx.strokeStyle=`rgba(0,255,150,${(1-d/154)*0.3})`;
            ctx.lineWidth=1;
            ctx.beginPath();ctx.moveTo(n.x,n.y);ctx.lineTo(m.x,m.y);ctx.stroke();
          }
        });
        const active=(Math.sin(t*2+i*0.5)+1)/2;
        ctx.fillStyle=`rgba(0,255,150,${0.5+active*0.5})`;
        ctx.beginPath();ctx.arc(n.x,n.y,3,0,Math.PI*2);ctx.fill();
      });
      packets.forEach((p,j)=>{
        p.t+=0.04;p.life-=0.02;
        const x=p.x+(p.tx-p.x)*p.t;
        const y=p.y+(p.ty-p.y)*p.t;
        ctx.fillStyle=`rgba(0,255,150,${p.life})`;
        ctx.beginPath();ctx.arc(x,y,3,0,Math.PI*2);ctx.fill();
        if(p.t>=1||p.life<=0)packets.splice(j,1);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Node Bloom Storm",
  tags:["network","data","node"],
  description:"Node Bloom Storm — particle effect with dynamic motion",
  code:`// Node Bloom Storm animation code`,
  animator:(c,ctx,mouse)=>{
    let nodes=[],packets=[],t=0,id;
    for(let j=0;j<17;j++)
      nodes.push({x:Math.random()*c.width,y:Math.random()*c.height,vx:(Math.random()-.5)*0.8,vy:(Math.random()-.5)*0.8,load:Math.random()});
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(0,5,0,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      nodes.forEach(n=>{n.x+=n.vx;n.y+=n.vy;if(n.x<0||n.x>c.width)n.vx*=-1;if(n.y<0||n.y>c.height)n.vy*=-1;});
      if(Math.random()<0.08){
        const a=nodes[Math.floor(Math.random()*nodes.length)];
        const b=nodes[Math.floor(Math.random()*nodes.length)];
        if(a!==b)packets.push({x:a.x,y:a.y,tx:b.x,ty:b.y,t:0,life:1});
      }
      nodes.forEach((n,i)=>{
        nodes.forEach((m,j)=>{
          if(j<=i)return;
          const d=Math.hypot(n.x-m.x,n.y-m.y);
          if(d<155){
            ctx.strokeStyle=`rgba(0,255,150,${(1-d/155)*0.3})`;
            ctx.lineWidth=1;
            ctx.beginPath();ctx.moveTo(n.x,n.y);ctx.lineTo(m.x,m.y);ctx.stroke();
          }
        });
        const active=(Math.sin(t*2+i*0.5)+1)/2;
        ctx.fillStyle=`rgba(0,255,150,${0.5+active*0.5})`;
        ctx.beginPath();ctx.arc(n.x,n.y,4,0,Math.PI*2);ctx.fill();
      });
      packets.forEach((p,j)=>{
        p.t+=0.04;p.life-=0.02;
        const x=p.x+(p.tx-p.x)*p.t;
        const y=p.y+(p.ty-p.y)*p.t;
        ctx.fillStyle=`rgba(0,255,150,${p.life})`;
        ctx.beginPath();ctx.arc(x,y,3,0,Math.PI*2);ctx.fill();
        if(p.t>=1||p.life<=0)packets.splice(j,1);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Signal Cascade Net",
  tags:["data","node","packet"],
  description:"Signal Cascade Net — particle effect with dynamic motion",
  code:`// Signal Cascade Net animation code`,
  animator:(c,ctx,mouse)=>{
    let nodes=[],packets=[],t=0,id;
    for(let j=0;j<18;j++)
      nodes.push({x:Math.random()*c.width,y:Math.random()*c.height,vx:(Math.random()-.5)*0.5,vy:(Math.random()-.5)*0.5,load:Math.random()});
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(0,5,0,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      nodes.forEach(n=>{n.x+=n.vx;n.y+=n.vy;if(n.x<0||n.x>c.width)n.vx*=-1;if(n.y<0||n.y>c.height)n.vy*=-1;});
      if(Math.random()<0.08){
        const a=nodes[Math.floor(Math.random()*nodes.length)];
        const b=nodes[Math.floor(Math.random()*nodes.length)];
        if(a!==b)packets.push({x:a.x,y:a.y,tx:b.x,ty:b.y,t:0,life:1});
      }
      nodes.forEach((n,i)=>{
        nodes.forEach((m,j)=>{
          if(j<=i)return;
          const d=Math.hypot(n.x-m.x,n.y-m.y);
          if(d<156){
            ctx.strokeStyle=`rgba(0,255,150,${(1-d/156)*0.3})`;
            ctx.lineWidth=1;
            ctx.beginPath();ctx.moveTo(n.x,n.y);ctx.lineTo(m.x,m.y);ctx.stroke();
          }
        });
        const active=(Math.sin(t*2+i*0.5)+1)/2;
        ctx.fillStyle=`rgba(0,255,150,${0.5+active*0.5})`;
        ctx.beginPath();ctx.arc(n.x,n.y,5,0,Math.PI*2);ctx.fill();
      });
      packets.forEach((p,j)=>{
        p.t+=0.04;p.life-=0.02;
        const x=p.x+(p.tx-p.x)*p.t;
        const y=p.y+(p.ty-p.y)*p.t;
        ctx.fillStyle=`rgba(0,255,150,${p.life})`;
        ctx.beginPath();ctx.arc(x,y,3,0,Math.PI*2);ctx.fill();
        if(p.t>=1||p.life<=0)packets.splice(j,1);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Server Bloom Halo",
  tags:["node","packet","signal"],
  description:"Server Bloom Halo — particle effect with dynamic motion",
  code:`// Server Bloom Halo animation code`,
  animator:(c,ctx,mouse)=>{
    let nodes=[],packets=[],t=0,id;
    for(let j=0;j<19;j++)
      nodes.push({x:Math.random()*c.width,y:Math.random()*c.height,vx:(Math.random()-.5)*0.8,vy:(Math.random()-.5)*0.8,load:Math.random()});
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(0,5,0,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      nodes.forEach(n=>{n.x+=n.vx;n.y+=n.vy;if(n.x<0||n.x>c.width)n.vx*=-1;if(n.y<0||n.y>c.height)n.vy*=-1;});
      if(Math.random()<0.08){
        const a=nodes[Math.floor(Math.random()*nodes.length)];
        const b=nodes[Math.floor(Math.random()*nodes.length)];
        if(a!==b)packets.push({x:a.x,y:a.y,tx:b.x,ty:b.y,t:0,life:1});
      }
      nodes.forEach((n,i)=>{
        nodes.forEach((m,j)=>{
          if(j<=i)return;
          const d=Math.hypot(n.x-m.x,n.y-m.y);
          if(d<157){
            ctx.strokeStyle=`rgba(0,255,150,${(1-d/157)*0.3})`;
            ctx.lineWidth=1;
            ctx.beginPath();ctx.moveTo(n.x,n.y);ctx.lineTo(m.x,m.y);ctx.stroke();
          }
        });
        const active=(Math.sin(t*2+i*0.5)+1)/2;
        ctx.fillStyle=`rgba(0,255,150,${0.5+active*0.5})`;
        ctx.beginPath();ctx.arc(n.x,n.y,6,0,Math.PI*2);ctx.fill();
      });
      packets.forEach((p,j)=>{
        p.t+=0.04;p.life-=0.02;
        const x=p.x+(p.tx-p.x)*p.t;
        const y=p.y+(p.ty-p.y)*p.t;
        ctx.fillStyle=`rgba(0,255,150,${p.life})`;
        ctx.beginPath();ctx.arc(x,y,3,0,Math.PI*2);ctx.fill();
        if(p.t>=1||p.life<=0)packets.splice(j,1);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Data Flow Core",
  tags:["packet","signal","network"],
  description:"Data Flow Core — particle effect with dynamic motion",
  code:`// Data Flow Core animation code`,
  animator:(c,ctx,mouse)=>{
    let nodes=[],packets=[],t=0,id;
    for(let j=0;j<20;j++)
      nodes.push({x:Math.random()*c.width,y:Math.random()*c.height,vx:(Math.random()-.5)*0.5,vy:(Math.random()-.5)*0.5,load:Math.random()});
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(0,5,0,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      nodes.forEach(n=>{n.x+=n.vx;n.y+=n.vy;if(n.x<0||n.x>c.width)n.vx*=-1;if(n.y<0||n.y>c.height)n.vy*=-1;});
      if(Math.random()<0.08){
        const a=nodes[Math.floor(Math.random()*nodes.length)];
        const b=nodes[Math.floor(Math.random()*nodes.length)];
        if(a!==b)packets.push({x:a.x,y:a.y,tx:b.x,ty:b.y,t:0,life:1});
      }
      nodes.forEach((n,i)=>{
        nodes.forEach((m,j)=>{
          if(j<=i)return;
          const d=Math.hypot(n.x-m.x,n.y-m.y);
          if(d<158){
            ctx.strokeStyle=`rgba(0,255,150,${(1-d/158)*0.3})`;
            ctx.lineWidth=1;
            ctx.beginPath();ctx.moveTo(n.x,n.y);ctx.lineTo(m.x,m.y);ctx.stroke();
          }
        });
        const active=(Math.sin(t*2+i*0.5)+1)/2;
        ctx.fillStyle=`rgba(0,255,150,${0.5+active*0.5})`;
        ctx.beginPath();ctx.arc(n.x,n.y,3,0,Math.PI*2);ctx.fill();
      });
      packets.forEach((p,j)=>{
        p.t+=0.04;p.life-=0.02;
        const x=p.x+(p.tx-p.x)*p.t;
        const y=p.y+(p.ty-p.y)*p.t;
        ctx.fillStyle=`rgba(0,255,150,${p.life})`;
        ctx.beginPath();ctx.arc(x,y,3,0,Math.PI*2);ctx.fill();
        if(p.t>=1||p.life<=0)packets.splice(j,1);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Packet Halo Bloom",
  tags:["signal","network","data"],
  description:"Packet Halo Bloom — particle effect with dynamic motion",
  code:`// Packet Halo Bloom animation code`,
  animator:(c,ctx,mouse)=>{
    let nodes=[],packets=[],t=0,id;
    for(let j=0;j<21;j++)
      nodes.push({x:Math.random()*c.width,y:Math.random()*c.height,vx:(Math.random()-.5)*0.8,vy:(Math.random()-.5)*0.8,load:Math.random()});
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(0,5,0,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      nodes.forEach(n=>{n.x+=n.vx;n.y+=n.vy;if(n.x<0||n.x>c.width)n.vx*=-1;if(n.y<0||n.y>c.height)n.vy*=-1;});
      if(Math.random()<0.08){
        const a=nodes[Math.floor(Math.random()*nodes.length)];
        const b=nodes[Math.floor(Math.random()*nodes.length)];
        if(a!==b)packets.push({x:a.x,y:a.y,tx:b.x,ty:b.y,t:0,life:1});
      }
      nodes.forEach((n,i)=>{
        nodes.forEach((m,j)=>{
          if(j<=i)return;
          const d=Math.hypot(n.x-m.x,n.y-m.y);
          if(d<159){
            ctx.strokeStyle=`rgba(0,255,150,${(1-d/159)*0.3})`;
            ctx.lineWidth=1;
            ctx.beginPath();ctx.moveTo(n.x,n.y);ctx.lineTo(m.x,m.y);ctx.stroke();
          }
        });
        const active=(Math.sin(t*2+i*0.5)+1)/2;
        ctx.fillStyle=`rgba(0,255,150,${0.5+active*0.5})`;
        ctx.beginPath();ctx.arc(n.x,n.y,4,0,Math.PI*2);ctx.fill();
      });
      packets.forEach((p,j)=>{
        p.t+=0.04;p.life-=0.02;
        const x=p.x+(p.tx-p.x)*p.t;
        const y=p.y+(p.ty-p.y)*p.t;
        ctx.fillStyle=`rgba(0,255,150,${p.life})`;
        ctx.beginPath();ctx.arc(x,y,3,0,Math.PI*2);ctx.fill();
        if(p.t>=1||p.life<=0)packets.splice(j,1);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Network Bloom Rings",
  tags:["network","data","node"],
  description:"Network Bloom Rings — particle effect with dynamic motion",
  code:`// Network Bloom Rings animation code`,
  animator:(c,ctx,mouse)=>{
    let nodes=[],packets=[],t=0,id;
    for(let j=0;j<12;j++)
      nodes.push({x:Math.random()*c.width,y:Math.random()*c.height,vx:(Math.random()-.5)*0.5,vy:(Math.random()-.5)*0.5,load:Math.random()});
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(0,5,0,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      nodes.forEach(n=>{n.x+=n.vx;n.y+=n.vy;if(n.x<0||n.x>c.width)n.vx*=-1;if(n.y<0||n.y>c.height)n.vy*=-1;});
      if(Math.random()<0.08){
        const a=nodes[Math.floor(Math.random()*nodes.length)];
        const b=nodes[Math.floor(Math.random()*nodes.length)];
        if(a!==b)packets.push({x:a.x,y:a.y,tx:b.x,ty:b.y,t:0,life:1});
      }
      nodes.forEach((n,i)=>{
        nodes.forEach((m,j)=>{
          if(j<=i)return;
          const d=Math.hypot(n.x-m.x,n.y-m.y);
          if(d<160){
            ctx.strokeStyle=`rgba(0,255,150,${(1-d/160)*0.3})`;
            ctx.lineWidth=1;
            ctx.beginPath();ctx.moveTo(n.x,n.y);ctx.lineTo(m.x,m.y);ctx.stroke();
          }
        });
        const active=(Math.sin(t*2+i*0.5)+1)/2;
        ctx.fillStyle=`rgba(0,255,150,${0.5+active*0.5})`;
        ctx.beginPath();ctx.arc(n.x,n.y,5,0,Math.PI*2);ctx.fill();
      });
      packets.forEach((p,j)=>{
        p.t+=0.04;p.life-=0.02;
        const x=p.x+(p.tx-p.x)*p.t;
        const y=p.y+(p.ty-p.y)*p.t;
        ctx.fillStyle=`rgba(0,255,150,${p.life})`;
        ctx.beginPath();ctx.arc(x,y,3,0,Math.PI*2);ctx.fill();
        if(p.t>=1||p.life<=0)packets.splice(j,1);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Node Pulse Mesh",
  tags:["data","node","packet"],
  description:"Node Pulse Mesh — particle effect with dynamic motion",
  code:`// Node Pulse Mesh animation code`,
  animator:(c,ctx,mouse)=>{
    let nodes=[],packets=[],t=0,id;
    for(let j=0;j<13;j++)
      nodes.push({x:Math.random()*c.width,y:Math.random()*c.height,vx:(Math.random()-.5)*0.8,vy:(Math.random()-.5)*0.8,load:Math.random()});
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(0,5,0,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      nodes.forEach(n=>{n.x+=n.vx;n.y+=n.vy;if(n.x<0||n.x>c.width)n.vx*=-1;if(n.y<0||n.y>c.height)n.vy*=-1;});
      if(Math.random()<0.08){
        const a=nodes[Math.floor(Math.random()*nodes.length)];
        const b=nodes[Math.floor(Math.random()*nodes.length)];
        if(a!==b)packets.push({x:a.x,y:a.y,tx:b.x,ty:b.y,t:0,life:1});
      }
      nodes.forEach((n,i)=>{
        nodes.forEach((m,j)=>{
          if(j<=i)return;
          const d=Math.hypot(n.x-m.x,n.y-m.y);
          if(d<161){
            ctx.strokeStyle=`rgba(0,255,150,${(1-d/161)*0.3})`;
            ctx.lineWidth=1;
            ctx.beginPath();ctx.moveTo(n.x,n.y);ctx.lineTo(m.x,m.y);ctx.stroke();
          }
        });
        const active=(Math.sin(t*2+i*0.5)+1)/2;
        ctx.fillStyle=`rgba(0,255,150,${0.5+active*0.5})`;
        ctx.beginPath();ctx.arc(n.x,n.y,6,0,Math.PI*2);ctx.fill();
      });
      packets.forEach((p,j)=>{
        p.t+=0.04;p.life-=0.02;
        const x=p.x+(p.tx-p.x)*p.t;
        const y=p.y+(p.ty-p.y)*p.t;
        ctx.fillStyle=`rgba(0,255,150,${p.life})`;
        ctx.beginPath();ctx.arc(x,y,3,0,Math.PI*2);ctx.fill();
        if(p.t>=1||p.life<=0)packets.splice(j,1);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Signal Bloom Orbit",
  tags:["node","packet","signal"],
  description:"Signal Bloom Orbit — particle effect with dynamic motion",
  code:`// Signal Bloom Orbit animation code`,
  animator:(c,ctx,mouse)=>{
    let nodes=[],packets=[],t=0,id;
    for(let j=0;j<14;j++)
      nodes.push({x:Math.random()*c.width,y:Math.random()*c.height,vx:(Math.random()-.5)*0.5,vy:(Math.random()-.5)*0.5,load:Math.random()});
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(0,5,0,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      nodes.forEach(n=>{n.x+=n.vx;n.y+=n.vy;if(n.x<0||n.x>c.width)n.vx*=-1;if(n.y<0||n.y>c.height)n.vy*=-1;});
      if(Math.random()<0.08){
        const a=nodes[Math.floor(Math.random()*nodes.length)];
        const b=nodes[Math.floor(Math.random()*nodes.length)];
        if(a!==b)packets.push({x:a.x,y:a.y,tx:b.x,ty:b.y,t:0,life:1});
      }
      nodes.forEach((n,i)=>{
        nodes.forEach((m,j)=>{
          if(j<=i)return;
          const d=Math.hypot(n.x-m.x,n.y-m.y);
          if(d<162){
            ctx.strokeStyle=`rgba(0,255,150,${(1-d/162)*0.3})`;
            ctx.lineWidth=1;
            ctx.beginPath();ctx.moveTo(n.x,n.y);ctx.lineTo(m.x,m.y);ctx.stroke();
          }
        });
        const active=(Math.sin(t*2+i*0.5)+1)/2;
        ctx.fillStyle=`rgba(0,255,150,${0.5+active*0.5})`;
        ctx.beginPath();ctx.arc(n.x,n.y,3,0,Math.PI*2);ctx.fill();
      });
      packets.forEach((p,j)=>{
        p.t+=0.04;p.life-=0.02;
        const x=p.x+(p.tx-p.x)*p.t;
        const y=p.y+(p.ty-p.y)*p.t;
        ctx.fillStyle=`rgba(0,255,150,${p.life})`;
        ctx.beginPath();ctx.arc(x,y,3,0,Math.PI*2);ctx.fill();
        if(p.t>=1||p.life<=0)packets.splice(j,1);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Data Bloom Storm",
  tags:["packet","signal","network"],
  description:"Data Bloom Storm — particle effect with dynamic motion",
  code:`// Data Bloom Storm animation code`,
  animator:(c,ctx,mouse)=>{
    let nodes=[],packets=[],t=0,id;
    for(let j=0;j<15;j++)
      nodes.push({x:Math.random()*c.width,y:Math.random()*c.height,vx:(Math.random()-.5)*0.8,vy:(Math.random()-.5)*0.8,load:Math.random()});
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(0,5,0,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      nodes.forEach(n=>{n.x+=n.vx;n.y+=n.vy;if(n.x<0||n.x>c.width)n.vx*=-1;if(n.y<0||n.y>c.height)n.vy*=-1;});
      if(Math.random()<0.08){
        const a=nodes[Math.floor(Math.random()*nodes.length)];
        const b=nodes[Math.floor(Math.random()*nodes.length)];
        if(a!==b)packets.push({x:a.x,y:a.y,tx:b.x,ty:b.y,t:0,life:1});
      }
      nodes.forEach((n,i)=>{
        nodes.forEach((m,j)=>{
          if(j<=i)return;
          const d=Math.hypot(n.x-m.x,n.y-m.y);
          if(d<163){
            ctx.strokeStyle=`rgba(0,255,150,${(1-d/163)*0.3})`;
            ctx.lineWidth=1;
            ctx.beginPath();ctx.moveTo(n.x,n.y);ctx.lineTo(m.x,m.y);ctx.stroke();
          }
        });
        const active=(Math.sin(t*2+i*0.5)+1)/2;
        ctx.fillStyle=`rgba(0,255,150,${0.5+active*0.5})`;
        ctx.beginPath();ctx.arc(n.x,n.y,4,0,Math.PI*2);ctx.fill();
      });
      packets.forEach((p,j)=>{
        p.t+=0.04;p.life-=0.02;
        const x=p.x+(p.tx-p.x)*p.t;
        const y=p.y+(p.ty-p.y)*p.t;
        ctx.fillStyle=`rgba(0,255,150,${p.life})`;
        ctx.beginPath();ctx.arc(x,y,3,0,Math.PI*2);ctx.fill();
        if(p.t>=1||p.life<=0)packets.splice(j,1);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Packet Grid Flow",
  tags:["signal","network","data"],
  description:"Packet Grid Flow — particle effect with dynamic motion",
  code:`// Packet Grid Flow animation code`,
  animator:(c,ctx,mouse)=>{
    let nodes=[],packets=[],t=0,id;
    for(let j=0;j<16;j++)
      nodes.push({x:Math.random()*c.width,y:Math.random()*c.height,vx:(Math.random()-.5)*0.5,vy:(Math.random()-.5)*0.5,load:Math.random()});
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(0,5,0,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      nodes.forEach(n=>{n.x+=n.vx;n.y+=n.vy;if(n.x<0||n.x>c.width)n.vx*=-1;if(n.y<0||n.y>c.height)n.vy*=-1;});
      if(Math.random()<0.08){
        const a=nodes[Math.floor(Math.random()*nodes.length)];
        const b=nodes[Math.floor(Math.random()*nodes.length)];
        if(a!==b)packets.push({x:a.x,y:a.y,tx:b.x,ty:b.y,t:0,life:1});
      }
      nodes.forEach((n,i)=>{
        nodes.forEach((m,j)=>{
          if(j<=i)return;
          const d=Math.hypot(n.x-m.x,n.y-m.y);
          if(d<164){
            ctx.strokeStyle=`rgba(0,255,150,${(1-d/164)*0.3})`;
            ctx.lineWidth=1;
            ctx.beginPath();ctx.moveTo(n.x,n.y);ctx.lineTo(m.x,m.y);ctx.stroke();
          }
        });
        const active=(Math.sin(t*2+i*0.5)+1)/2;
        ctx.fillStyle=`rgba(0,255,150,${0.5+active*0.5})`;
        ctx.beginPath();ctx.arc(n.x,n.y,5,0,Math.PI*2);ctx.fill();
      });
      packets.forEach((p,j)=>{
        p.t+=0.04;p.life-=0.02;
        const x=p.x+(p.tx-p.x)*p.t;
        const y=p.y+(p.ty-p.y)*p.t;
        ctx.fillStyle=`rgba(0,255,150,${p.life})`;
        ctx.beginPath();ctx.arc(x,y,3,0,Math.PI*2);ctx.fill();
        if(p.t>=1||p.life<=0)packets.splice(j,1);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Network Halo Mesh",
  tags:["network","data","node"],
  description:"Network Halo Mesh — particle effect with dynamic motion",
  code:`// Network Halo Mesh animation code`,
  animator:(c,ctx,mouse)=>{
    let nodes=[],packets=[],t=0,id;
    for(let j=0;j<17;j++)
      nodes.push({x:Math.random()*c.width,y:Math.random()*c.height,vx:(Math.random()-.5)*0.8,vy:(Math.random()-.5)*0.8,load:Math.random()});
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(0,5,0,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      nodes.forEach(n=>{n.x+=n.vx;n.y+=n.vy;if(n.x<0||n.x>c.width)n.vx*=-1;if(n.y<0||n.y>c.height)n.vy*=-1;});
      if(Math.random()<0.08){
        const a=nodes[Math.floor(Math.random()*nodes.length)];
        const b=nodes[Math.floor(Math.random()*nodes.length)];
        if(a!==b)packets.push({x:a.x,y:a.y,tx:b.x,ty:b.y,t:0,life:1});
      }
      nodes.forEach((n,i)=>{
        nodes.forEach((m,j)=>{
          if(j<=i)return;
          const d=Math.hypot(n.x-m.x,n.y-m.y);
          if(d<165){
            ctx.strokeStyle=`rgba(0,255,150,${(1-d/165)*0.3})`;
            ctx.lineWidth=1;
            ctx.beginPath();ctx.moveTo(n.x,n.y);ctx.lineTo(m.x,m.y);ctx.stroke();
          }
        });
        const active=(Math.sin(t*2+i*0.5)+1)/2;
        ctx.fillStyle=`rgba(0,255,150,${0.5+active*0.5})`;
        ctx.beginPath();ctx.arc(n.x,n.y,6,0,Math.PI*2);ctx.fill();
      });
      packets.forEach((p,j)=>{
        p.t+=0.04;p.life-=0.02;
        const x=p.x+(p.tx-p.x)*p.t;
        const y=p.y+(p.ty-p.y)*p.t;
        ctx.fillStyle=`rgba(0,255,150,${p.life})`;
        ctx.beginPath();ctx.arc(x,y,3,0,Math.PI*2);ctx.fill();
        if(p.t>=1||p.life<=0)packets.splice(j,1);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Data Signal Bloom",
  tags:["data","node","packet"],
  description:"Data Signal Bloom — particle effect with dynamic motion",
  code:`// Data Signal Bloom animation code`,
  animator:(c,ctx,mouse)=>{
    let nodes=[],packets=[],t=0,id;
    for(let j=0;j<18;j++)
      nodes.push({x:Math.random()*c.width,y:Math.random()*c.height,vx:(Math.random()-.5)*0.5,vy:(Math.random()-.5)*0.5,load:Math.random()});
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(0,5,0,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      nodes.forEach(n=>{n.x+=n.vx;n.y+=n.vy;if(n.x<0||n.x>c.width)n.vx*=-1;if(n.y<0||n.y>c.height)n.vy*=-1;});
      if(Math.random()<0.08){
        const a=nodes[Math.floor(Math.random()*nodes.length)];
        const b=nodes[Math.floor(Math.random()*nodes.length)];
        if(a!==b)packets.push({x:a.x,y:a.y,tx:b.x,ty:b.y,t:0,life:1});
      }
      nodes.forEach((n,i)=>{
        nodes.forEach((m,j)=>{
          if(j<=i)return;
          const d=Math.hypot(n.x-m.x,n.y-m.y);
          if(d<166){
            ctx.strokeStyle=`rgba(0,255,150,${(1-d/166)*0.3})`;
            ctx.lineWidth=1;
            ctx.beginPath();ctx.moveTo(n.x,n.y);ctx.lineTo(m.x,m.y);ctx.stroke();
          }
        });
        const active=(Math.sin(t*2+i*0.5)+1)/2;
        ctx.fillStyle=`rgba(0,255,150,${0.5+active*0.5})`;
        ctx.beginPath();ctx.arc(n.x,n.y,3,0,Math.PI*2);ctx.fill();
      });
      packets.forEach((p,j)=>{
        p.t+=0.04;p.life-=0.02;
        const x=p.x+(p.tx-p.x)*p.t;
        const y=p.y+(p.ty-p.y)*p.t;
        ctx.fillStyle=`rgba(0,255,150,${p.life})`;
        ctx.beginPath();ctx.arc(x,y,3,0,Math.PI*2);ctx.fill();
        if(p.t>=1||p.life<=0)packets.splice(j,1);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Node Orbit Halo",
  tags:["node","packet","signal"],
  description:"Node Orbit Halo — particle effect with dynamic motion",
  code:`// Node Orbit Halo animation code`,
  animator:(c,ctx,mouse)=>{
    let nodes=[],packets=[],t=0,id;
    for(let j=0;j<19;j++)
      nodes.push({x:Math.random()*c.width,y:Math.random()*c.height,vx:(Math.random()-.5)*0.8,vy:(Math.random()-.5)*0.8,load:Math.random()});
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(0,5,0,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      nodes.forEach(n=>{n.x+=n.vx;n.y+=n.vy;if(n.x<0||n.x>c.width)n.vx*=-1;if(n.y<0||n.y>c.height)n.vy*=-1;});
      if(Math.random()<0.08){
        const a=nodes[Math.floor(Math.random()*nodes.length)];
        const b=nodes[Math.floor(Math.random()*nodes.length)];
        if(a!==b)packets.push({x:a.x,y:a.y,tx:b.x,ty:b.y,t:0,life:1});
      }
      nodes.forEach((n,i)=>{
        nodes.forEach((m,j)=>{
          if(j<=i)return;
          const d=Math.hypot(n.x-m.x,n.y-m.y);
          if(d<167){
            ctx.strokeStyle=`rgba(0,255,150,${(1-d/167)*0.3})`;
            ctx.lineWidth=1;
            ctx.beginPath();ctx.moveTo(n.x,n.y);ctx.lineTo(m.x,m.y);ctx.stroke();
          }
        });
        const active=(Math.sin(t*2+i*0.5)+1)/2;
        ctx.fillStyle=`rgba(0,255,150,${0.5+active*0.5})`;
        ctx.beginPath();ctx.arc(n.x,n.y,4,0,Math.PI*2);ctx.fill();
      });
      packets.forEach((p,j)=>{
        p.t+=0.04;p.life-=0.02;
        const x=p.x+(p.tx-p.x)*p.t;
        const y=p.y+(p.ty-p.y)*p.t;
        ctx.fillStyle=`rgba(0,255,150,${p.life})`;
        ctx.beginPath();ctx.arc(x,y,3,0,Math.PI*2);ctx.fill();
        if(p.t>=1||p.life<=0)packets.splice(j,1);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Packet Bloom Rings",
  tags:["packet","signal","network"],
  description:"Packet Bloom Rings — particle effect with dynamic motion",
  code:`// Packet Bloom Rings animation code`,
  animator:(c,ctx,mouse)=>{
    let nodes=[],packets=[],t=0,id;
    for(let j=0;j<20;j++)
      nodes.push({x:Math.random()*c.width,y:Math.random()*c.height,vx:(Math.random()-.5)*0.5,vy:(Math.random()-.5)*0.5,load:Math.random()});
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(0,5,0,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      nodes.forEach(n=>{n.x+=n.vx;n.y+=n.vy;if(n.x<0||n.x>c.width)n.vx*=-1;if(n.y<0||n.y>c.height)n.vy*=-1;});
      if(Math.random()<0.08){
        const a=nodes[Math.floor(Math.random()*nodes.length)];
        const b=nodes[Math.floor(Math.random()*nodes.length)];
        if(a!==b)packets.push({x:a.x,y:a.y,tx:b.x,ty:b.y,t:0,life:1});
      }
      nodes.forEach((n,i)=>{
        nodes.forEach((m,j)=>{
          if(j<=i)return;
          const d=Math.hypot(n.x-m.x,n.y-m.y);
          if(d<168){
            ctx.strokeStyle=`rgba(0,255,150,${(1-d/168)*0.3})`;
            ctx.lineWidth=1;
            ctx.beginPath();ctx.moveTo(n.x,n.y);ctx.lineTo(m.x,m.y);ctx.stroke();
          }
        });
        const active=(Math.sin(t*2+i*0.5)+1)/2;
        ctx.fillStyle=`rgba(0,255,150,${0.5+active*0.5})`;
        ctx.beginPath();ctx.arc(n.x,n.y,5,0,Math.PI*2);ctx.fill();
      });
      packets.forEach((p,j)=>{
        p.t+=0.04;p.life-=0.02;
        const x=p.x+(p.tx-p.x)*p.t;
        const y=p.y+(p.ty-p.y)*p.t;
        ctx.fillStyle=`rgba(0,255,150,${p.life})`;
        ctx.beginPath();ctx.arc(x,y,3,0,Math.PI*2);ctx.fill();
        if(p.t>=1||p.life<=0)packets.splice(j,1);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Server Pulse Mesh",
  tags:["signal","network","data"],
  description:"Server Pulse Mesh — particle effect with dynamic motion",
  code:`// Server Pulse Mesh animation code`,
  animator:(c,ctx,mouse)=>{
    let nodes=[],packets=[],t=0,id;
    for(let j=0;j<21;j++)
      nodes.push({x:Math.random()*c.width,y:Math.random()*c.height,vx:(Math.random()-.5)*0.8,vy:(Math.random()-.5)*0.8,load:Math.random()});
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(0,5,0,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      nodes.forEach(n=>{n.x+=n.vx;n.y+=n.vy;if(n.x<0||n.x>c.width)n.vx*=-1;if(n.y<0||n.y>c.height)n.vy*=-1;});
      if(Math.random()<0.08){
        const a=nodes[Math.floor(Math.random()*nodes.length)];
        const b=nodes[Math.floor(Math.random()*nodes.length)];
        if(a!==b)packets.push({x:a.x,y:a.y,tx:b.x,ty:b.y,t:0,life:1});
      }
      nodes.forEach((n,i)=>{
        nodes.forEach((m,j)=>{
          if(j<=i)return;
          const d=Math.hypot(n.x-m.x,n.y-m.y);
          if(d<169){
            ctx.strokeStyle=`rgba(0,255,150,${(1-d/169)*0.3})`;
            ctx.lineWidth=1;
            ctx.beginPath();ctx.moveTo(n.x,n.y);ctx.lineTo(m.x,m.y);ctx.stroke();
          }
        });
        const active=(Math.sin(t*2+i*0.5)+1)/2;
        ctx.fillStyle=`rgba(0,255,150,${0.5+active*0.5})`;
        ctx.beginPath();ctx.arc(n.x,n.y,6,0,Math.PI*2);ctx.fill();
      });
      packets.forEach((p,j)=>{
        p.t+=0.04;p.life-=0.02;
        const x=p.x+(p.tx-p.x)*p.t;
        const y=p.y+(p.ty-p.y)*p.t;
        ctx.fillStyle=`rgba(0,255,150,${p.life})`;
        ctx.beginPath();ctx.arc(x,y,3,0,Math.PI*2);ctx.fill();
        if(p.t>=1||p.life<=0)packets.splice(j,1);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Data Bloom Core",
  tags:["network","data","node"],
  description:"Data Bloom Core — particle effect with dynamic motion",
  code:`// Data Bloom Core animation code`,
  animator:(c,ctx,mouse)=>{
    let nodes=[],packets=[],t=0,id;
    for(let j=0;j<12;j++)
      nodes.push({x:Math.random()*c.width,y:Math.random()*c.height,vx:(Math.random()-.5)*0.5,vy:(Math.random()-.5)*0.5,load:Math.random()});
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(0,5,0,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      nodes.forEach(n=>{n.x+=n.vx;n.y+=n.vy;if(n.x<0||n.x>c.width)n.vx*=-1;if(n.y<0||n.y>c.height)n.vy*=-1;});
      if(Math.random()<0.08){
        const a=nodes[Math.floor(Math.random()*nodes.length)];
        const b=nodes[Math.floor(Math.random()*nodes.length)];
        if(a!==b)packets.push({x:a.x,y:a.y,tx:b.x,ty:b.y,t:0,life:1});
      }
      nodes.forEach((n,i)=>{
        nodes.forEach((m,j)=>{
          if(j<=i)return;
          const d=Math.hypot(n.x-m.x,n.y-m.y);
          if(d<170){
            ctx.strokeStyle=`rgba(0,255,150,${(1-d/170)*0.3})`;
            ctx.lineWidth=1;
            ctx.beginPath();ctx.moveTo(n.x,n.y);ctx.lineTo(m.x,m.y);ctx.stroke();
          }
        });
        const active=(Math.sin(t*2+i*0.5)+1)/2;
        ctx.fillStyle=`rgba(0,255,150,${0.5+active*0.5})`;
        ctx.beginPath();ctx.arc(n.x,n.y,3,0,Math.PI*2);ctx.fill();
      });
      packets.forEach((p,j)=>{
        p.t+=0.04;p.life-=0.02;
        const x=p.x+(p.tx-p.x)*p.t;
        const y=p.y+(p.ty-p.y)*p.t;
        ctx.fillStyle=`rgba(0,255,150,${p.life})`;
        ctx.beginPath();ctx.arc(x,y,3,0,Math.PI*2);ctx.fill();
        if(p.t>=1||p.life<=0)packets.splice(j,1);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Signal Halo Net",
  tags:["data","node","packet"],
  description:"Signal Halo Net — particle effect with dynamic motion",
  code:`// Signal Halo Net animation code`,
  animator:(c,ctx,mouse)=>{
    let nodes=[],packets=[],t=0,id;
    for(let j=0;j<13;j++)
      nodes.push({x:Math.random()*c.width,y:Math.random()*c.height,vx:(Math.random()-.5)*0.8,vy:(Math.random()-.5)*0.8,load:Math.random()});
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(0,5,0,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      nodes.forEach(n=>{n.x+=n.vx;n.y+=n.vy;if(n.x<0||n.x>c.width)n.vx*=-1;if(n.y<0||n.y>c.height)n.vy*=-1;});
      if(Math.random()<0.08){
        const a=nodes[Math.floor(Math.random()*nodes.length)];
        const b=nodes[Math.floor(Math.random()*nodes.length)];
        if(a!==b)packets.push({x:a.x,y:a.y,tx:b.x,ty:b.y,t:0,life:1});
      }
      nodes.forEach((n,i)=>{
        nodes.forEach((m,j)=>{
          if(j<=i)return;
          const d=Math.hypot(n.x-m.x,n.y-m.y);
          if(d<171){
            ctx.strokeStyle=`rgba(0,255,150,${(1-d/171)*0.3})`;
            ctx.lineWidth=1;
            ctx.beginPath();ctx.moveTo(n.x,n.y);ctx.lineTo(m.x,m.y);ctx.stroke();
          }
        });
        const active=(Math.sin(t*2+i*0.5)+1)/2;
        ctx.fillStyle=`rgba(0,255,150,${0.5+active*0.5})`;
        ctx.beginPath();ctx.arc(n.x,n.y,4,0,Math.PI*2);ctx.fill();
      });
      packets.forEach((p,j)=>{
        p.t+=0.04;p.life-=0.02;
        const x=p.x+(p.tx-p.x)*p.t;
        const y=p.y+(p.ty-p.y)*p.t;
        ctx.fillStyle=`rgba(0,255,150,${p.life})`;
        ctx.beginPath();ctx.arc(x,y,3,0,Math.PI*2);ctx.fill();
        if(p.t>=1||p.life<=0)packets.splice(j,1);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Packet Bloom Orbit",
  tags:["node","packet","signal"],
  description:"Packet Bloom Orbit — particle effect with dynamic motion",
  code:`// Packet Bloom Orbit animation code`,
  animator:(c,ctx,mouse)=>{
    let nodes=[],packets=[],t=0,id;
    for(let j=0;j<14;j++)
      nodes.push({x:Math.random()*c.width,y:Math.random()*c.height,vx:(Math.random()-.5)*0.5,vy:(Math.random()-.5)*0.5,load:Math.random()});
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(0,5,0,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      nodes.forEach(n=>{n.x+=n.vx;n.y+=n.vy;if(n.x<0||n.x>c.width)n.vx*=-1;if(n.y<0||n.y>c.height)n.vy*=-1;});
      if(Math.random()<0.08){
        const a=nodes[Math.floor(Math.random()*nodes.length)];
        const b=nodes[Math.floor(Math.random()*nodes.length)];
        if(a!==b)packets.push({x:a.x,y:a.y,tx:b.x,ty:b.y,t:0,life:1});
      }
      nodes.forEach((n,i)=>{
        nodes.forEach((m,j)=>{
          if(j<=i)return;
          const d=Math.hypot(n.x-m.x,n.y-m.y);
          if(d<172){
            ctx.strokeStyle=`rgba(0,255,150,${(1-d/172)*0.3})`;
            ctx.lineWidth=1;
            ctx.beginPath();ctx.moveTo(n.x,n.y);ctx.lineTo(m.x,m.y);ctx.stroke();
          }
        });
        const active=(Math.sin(t*2+i*0.5)+1)/2;
        ctx.fillStyle=`rgba(0,255,150,${0.5+active*0.5})`;
        ctx.beginPath();ctx.arc(n.x,n.y,5,0,Math.PI*2);ctx.fill();
      });
      packets.forEach((p,j)=>{
        p.t+=0.04;p.life-=0.02;
        const x=p.x+(p.tx-p.x)*p.t;
        const y=p.y+(p.ty-p.y)*p.t;
        ctx.fillStyle=`rgba(0,255,150,${p.life})`;
        ctx.beginPath();ctx.arc(x,y,3,0,Math.PI*2);ctx.fill();
        if(p.t>=1||p.life<=0)packets.splice(j,1);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Network Bloom Field",
  tags:["packet","signal","network"],
  description:"Network Bloom Field — particle effect with dynamic motion",
  code:`// Network Bloom Field animation code`,
  animator:(c,ctx,mouse)=>{
    let nodes=[],packets=[],t=0,id;
    for(let j=0;j<15;j++)
      nodes.push({x:Math.random()*c.width,y:Math.random()*c.height,vx:(Math.random()-.5)*0.8,vy:(Math.random()-.5)*0.8,load:Math.random()});
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(0,5,0,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      nodes.forEach(n=>{n.x+=n.vx;n.y+=n.vy;if(n.x<0||n.x>c.width)n.vx*=-1;if(n.y<0||n.y>c.height)n.vy*=-1;});
      if(Math.random()<0.08){
        const a=nodes[Math.floor(Math.random()*nodes.length)];
        const b=nodes[Math.floor(Math.random()*nodes.length)];
        if(a!==b)packets.push({x:a.x,y:a.y,tx:b.x,ty:b.y,t:0,life:1});
      }
      nodes.forEach((n,i)=>{
        nodes.forEach((m,j)=>{
          if(j<=i)return;
          const d=Math.hypot(n.x-m.x,n.y-m.y);
          if(d<173){
            ctx.strokeStyle=`rgba(0,255,150,${(1-d/173)*0.3})`;
            ctx.lineWidth=1;
            ctx.beginPath();ctx.moveTo(n.x,n.y);ctx.lineTo(m.x,m.y);ctx.stroke();
          }
        });
        const active=(Math.sin(t*2+i*0.5)+1)/2;
        ctx.fillStyle=`rgba(0,255,150,${0.5+active*0.5})`;
        ctx.beginPath();ctx.arc(n.x,n.y,6,0,Math.PI*2);ctx.fill();
      });
      packets.forEach((p,j)=>{
        p.t+=0.04;p.life-=0.02;
        const x=p.x+(p.tx-p.x)*p.t;
        const y=p.y+(p.ty-p.y)*p.t;
        ctx.fillStyle=`rgba(0,255,150,${p.life})`;
        ctx.beginPath();ctx.arc(x,y,3,0,Math.PI*2);ctx.fill();
        if(p.t>=1||p.life<=0)packets.splice(j,1);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Node Signal Flow",
  tags:["signal","network","data"],
  description:"Node Signal Flow — particle effect with dynamic motion",
  code:`// Node Signal Flow animation code`,
  animator:(c,ctx,mouse)=>{
    let nodes=[],packets=[],t=0,id;
    for(let j=0;j<16;j++)
      nodes.push({x:Math.random()*c.width,y:Math.random()*c.height,vx:(Math.random()-.5)*0.5,vy:(Math.random()-.5)*0.5,load:Math.random()});
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(0,5,0,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      nodes.forEach(n=>{n.x+=n.vx;n.y+=n.vy;if(n.x<0||n.x>c.width)n.vx*=-1;if(n.y<0||n.y>c.height)n.vy*=-1;});
      if(Math.random()<0.08){
        const a=nodes[Math.floor(Math.random()*nodes.length)];
        const b=nodes[Math.floor(Math.random()*nodes.length)];
        if(a!==b)packets.push({x:a.x,y:a.y,tx:b.x,ty:b.y,t:0,life:1});
      }
      nodes.forEach((n,i)=>{
        nodes.forEach((m,j)=>{
          if(j<=i)return;
          const d=Math.hypot(n.x-m.x,n.y-m.y);
          if(d<174){
            ctx.strokeStyle=`rgba(0,255,150,${(1-d/174)*0.3})`;
            ctx.lineWidth=1;
            ctx.beginPath();ctx.moveTo(n.x,n.y);ctx.lineTo(m.x,m.y);ctx.stroke();
          }
        });
        const active=(Math.sin(t*2+i*0.5)+1)/2;
        ctx.fillStyle=`rgba(0,255,150,${0.5+active*0.5})`;
        ctx.beginPath();ctx.arc(n.x,n.y,3,0,Math.PI*2);ctx.fill();
      });
      packets.forEach((p,j)=>{
        p.t+=0.04;p.life-=0.02;
        const x=p.x+(p.tx-p.x)*p.t;
        const y=p.y+(p.ty-p.y)*p.t;
        ctx.fillStyle=`rgba(0,255,150,${p.life})`;
        ctx.beginPath();ctx.arc(x,y,3,0,Math.PI*2);ctx.fill();
        if(p.t>=1||p.life<=0)packets.splice(j,1);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Data Pulse Halo",
  tags:["network","data","node"],
  description:"Data Pulse Halo — particle effect with dynamic motion",
  code:`// Data Pulse Halo animation code`,
  animator:(c,ctx,mouse)=>{
    let nodes=[],packets=[],t=0,id;
    for(let j=0;j<17;j++)
      nodes.push({x:Math.random()*c.width,y:Math.random()*c.height,vx:(Math.random()-.5)*0.8,vy:(Math.random()-.5)*0.8,load:Math.random()});
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(0,5,0,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      nodes.forEach(n=>{n.x+=n.vx;n.y+=n.vy;if(n.x<0||n.x>c.width)n.vx*=-1;if(n.y<0||n.y>c.height)n.vy*=-1;});
      if(Math.random()<0.08){
        const a=nodes[Math.floor(Math.random()*nodes.length)];
        const b=nodes[Math.floor(Math.random()*nodes.length)];
        if(a!==b)packets.push({x:a.x,y:a.y,tx:b.x,ty:b.y,t:0,life:1});
      }
      nodes.forEach((n,i)=>{
        nodes.forEach((m,j)=>{
          if(j<=i)return;
          const d=Math.hypot(n.x-m.x,n.y-m.y);
          if(d<175){
            ctx.strokeStyle=`rgba(0,255,150,${(1-d/175)*0.3})`;
            ctx.lineWidth=1;
            ctx.beginPath();ctx.moveTo(n.x,n.y);ctx.lineTo(m.x,m.y);ctx.stroke();
          }
        });
        const active=(Math.sin(t*2+i*0.5)+1)/2;
        ctx.fillStyle=`rgba(0,255,150,${0.5+active*0.5})`;
        ctx.beginPath();ctx.arc(n.x,n.y,4,0,Math.PI*2);ctx.fill();
      });
      packets.forEach((p,j)=>{
        p.t+=0.04;p.life-=0.02;
        const x=p.x+(p.tx-p.x)*p.t;
        const y=p.y+(p.ty-p.y)*p.t;
        ctx.fillStyle=`rgba(0,255,150,${p.life})`;
        ctx.beginPath();ctx.arc(x,y,3,0,Math.PI*2);ctx.fill();
        if(p.t>=1||p.life<=0)packets.splice(j,1);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Server Bloom Net",
  tags:["data","node","packet"],
  description:"Server Bloom Net — particle effect with dynamic motion",
  code:`// Server Bloom Net animation code`,
  animator:(c,ctx,mouse)=>{
    let nodes=[],packets=[],t=0,id;
    for(let j=0;j<18;j++)
      nodes.push({x:Math.random()*c.width,y:Math.random()*c.height,vx:(Math.random()-.5)*0.5,vy:(Math.random()-.5)*0.5,load:Math.random()});
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(0,5,0,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      nodes.forEach(n=>{n.x+=n.vx;n.y+=n.vy;if(n.x<0||n.x>c.width)n.vx*=-1;if(n.y<0||n.y>c.height)n.vy*=-1;});
      if(Math.random()<0.08){
        const a=nodes[Math.floor(Math.random()*nodes.length)];
        const b=nodes[Math.floor(Math.random()*nodes.length)];
        if(a!==b)packets.push({x:a.x,y:a.y,tx:b.x,ty:b.y,t:0,life:1});
      }
      nodes.forEach((n,i)=>{
        nodes.forEach((m,j)=>{
          if(j<=i)return;
          const d=Math.hypot(n.x-m.x,n.y-m.y);
          if(d<176){
            ctx.strokeStyle=`rgba(0,255,150,${(1-d/176)*0.3})`;
            ctx.lineWidth=1;
            ctx.beginPath();ctx.moveTo(n.x,n.y);ctx.lineTo(m.x,m.y);ctx.stroke();
          }
        });
        const active=(Math.sin(t*2+i*0.5)+1)/2;
        ctx.fillStyle=`rgba(0,255,150,${0.5+active*0.5})`;
        ctx.beginPath();ctx.arc(n.x,n.y,5,0,Math.PI*2);ctx.fill();
      });
      packets.forEach((p,j)=>{
        p.t+=0.04;p.life-=0.02;
        const x=p.x+(p.tx-p.x)*p.t;
        const y=p.y+(p.ty-p.y)*p.t;
        ctx.fillStyle=`rgba(0,255,150,${p.life})`;
        ctx.beginPath();ctx.arc(x,y,3,0,Math.PI*2);ctx.fill();
        if(p.t>=1||p.life<=0)packets.splice(j,1);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Signal Bloom Grid",
  tags:["node","packet","signal"],
  description:"Signal Bloom Grid — particle effect with dynamic motion",
  code:`// Signal Bloom Grid animation code`,
  animator:(c,ctx,mouse)=>{
    let nodes=[],packets=[],t=0,id;
    for(let j=0;j<19;j++)
      nodes.push({x:Math.random()*c.width,y:Math.random()*c.height,vx:(Math.random()-.5)*0.8,vy:(Math.random()-.5)*0.8,load:Math.random()});
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(0,5,0,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      nodes.forEach(n=>{n.x+=n.vx;n.y+=n.vy;if(n.x<0||n.x>c.width)n.vx*=-1;if(n.y<0||n.y>c.height)n.vy*=-1;});
      if(Math.random()<0.08){
        const a=nodes[Math.floor(Math.random()*nodes.length)];
        const b=nodes[Math.floor(Math.random()*nodes.length)];
        if(a!==b)packets.push({x:a.x,y:a.y,tx:b.x,ty:b.y,t:0,life:1});
      }
      nodes.forEach((n,i)=>{
        nodes.forEach((m,j)=>{
          if(j<=i)return;
          const d=Math.hypot(n.x-m.x,n.y-m.y);
          if(d<177){
            ctx.strokeStyle=`rgba(0,255,150,${(1-d/177)*0.3})`;
            ctx.lineWidth=1;
            ctx.beginPath();ctx.moveTo(n.x,n.y);ctx.lineTo(m.x,m.y);ctx.stroke();
          }
        });
        const active=(Math.sin(t*2+i*0.5)+1)/2;
        ctx.fillStyle=`rgba(0,255,150,${0.5+active*0.5})`;
        ctx.beginPath();ctx.arc(n.x,n.y,6,0,Math.PI*2);ctx.fill();
      });
      packets.forEach((p,j)=>{
        p.t+=0.04;p.life-=0.02;
        const x=p.x+(p.tx-p.x)*p.t;
        const y=p.y+(p.ty-p.y)*p.t;
        ctx.fillStyle=`rgba(0,255,150,${p.life})`;
        ctx.beginPath();ctx.arc(x,y,3,0,Math.PI*2);ctx.fill();
        if(p.t>=1||p.life<=0)packets.splice(j,1);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Packet Halo Mesh",
  tags:["packet","signal","network"],
  description:"Packet Halo Mesh — particle effect with dynamic motion",
  code:`// Packet Halo Mesh animation code`,
  animator:(c,ctx,mouse)=>{
    let nodes=[],packets=[],t=0,id;
    for(let j=0;j<20;j++)
      nodes.push({x:Math.random()*c.width,y:Math.random()*c.height,vx:(Math.random()-.5)*0.5,vy:(Math.random()-.5)*0.5,load:Math.random()});
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(0,5,0,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      nodes.forEach(n=>{n.x+=n.vx;n.y+=n.vy;if(n.x<0||n.x>c.width)n.vx*=-1;if(n.y<0||n.y>c.height)n.vy*=-1;});
      if(Math.random()<0.08){
        const a=nodes[Math.floor(Math.random()*nodes.length)];
        const b=nodes[Math.floor(Math.random()*nodes.length)];
        if(a!==b)packets.push({x:a.x,y:a.y,tx:b.x,ty:b.y,t:0,life:1});
      }
      nodes.forEach((n,i)=>{
        nodes.forEach((m,j)=>{
          if(j<=i)return;
          const d=Math.hypot(n.x-m.x,n.y-m.y);
          if(d<178){
            ctx.strokeStyle=`rgba(0,255,150,${(1-d/178)*0.3})`;
            ctx.lineWidth=1;
            ctx.beginPath();ctx.moveTo(n.x,n.y);ctx.lineTo(m.x,m.y);ctx.stroke();
          }
        });
        const active=(Math.sin(t*2+i*0.5)+1)/2;
        ctx.fillStyle=`rgba(0,255,150,${0.5+active*0.5})`;
        ctx.beginPath();ctx.arc(n.x,n.y,3,0,Math.PI*2);ctx.fill();
      });
      packets.forEach((p,j)=>{
        p.t+=0.04;p.life-=0.02;
        const x=p.x+(p.tx-p.x)*p.t;
        const y=p.y+(p.ty-p.y)*p.t;
        ctx.fillStyle=`rgba(0,255,150,${p.life})`;
        ctx.beginPath();ctx.arc(x,y,3,0,Math.PI*2);ctx.fill();
        if(p.t>=1||p.life<=0)packets.splice(j,1);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Data Orbit Bloom",
  tags:["signal","network","data"],
  description:"Data Orbit Bloom — particle effect with dynamic motion",
  code:`// Data Orbit Bloom animation code`,
  animator:(c,ctx,mouse)=>{
    let nodes=[],packets=[],t=0,id;
    for(let j=0;j<21;j++)
      nodes.push({x:Math.random()*c.width,y:Math.random()*c.height,vx:(Math.random()-.5)*0.8,vy:(Math.random()-.5)*0.8,load:Math.random()});
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(0,5,0,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      nodes.forEach(n=>{n.x+=n.vx;n.y+=n.vy;if(n.x<0||n.x>c.width)n.vx*=-1;if(n.y<0||n.y>c.height)n.vy*=-1;});
      if(Math.random()<0.08){
        const a=nodes[Math.floor(Math.random()*nodes.length)];
        const b=nodes[Math.floor(Math.random()*nodes.length)];
        if(a!==b)packets.push({x:a.x,y:a.y,tx:b.x,ty:b.y,t:0,life:1});
      }
      nodes.forEach((n,i)=>{
        nodes.forEach((m,j)=>{
          if(j<=i)return;
          const d=Math.hypot(n.x-m.x,n.y-m.y);
          if(d<179){
            ctx.strokeStyle=`rgba(0,255,150,${(1-d/179)*0.3})`;
            ctx.lineWidth=1;
            ctx.beginPath();ctx.moveTo(n.x,n.y);ctx.lineTo(m.x,m.y);ctx.stroke();
          }
        });
        const active=(Math.sin(t*2+i*0.5)+1)/2;
        ctx.fillStyle=`rgba(0,255,150,${0.5+active*0.5})`;
        ctx.beginPath();ctx.arc(n.x,n.y,4,0,Math.PI*2);ctx.fill();
      });
      packets.forEach((p,j)=>{
        p.t+=0.04;p.life-=0.02;
        const x=p.x+(p.tx-p.x)*p.t;
        const y=p.y+(p.ty-p.y)*p.t;
        ctx.fillStyle=`rgba(0,255,150,${p.life})`;
        ctx.beginPath();ctx.arc(x,y,3,0,Math.PI*2);ctx.fill();
        if(p.t>=1||p.life<=0)packets.splice(j,1);
      });
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

];

// ────────────────────────────────────────────────────────────
//  PORTAL / DIMENSIONAL FX (50 effects)
// ────────────────────────────────────────────────────────────

export const portalEffects = [

{
  name:"Dimensional Tear Bloom",
  tags:["portal","void","rift"],
  description:"Dimensional Tear Bloom — particle effect with dynamic motion",
  code:`// Dimensional Tear Bloom animation code`,
  animator:(c,ctx,mouse)=>{
    let t=0,rings=[],debris=[],id;
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(5,0,10,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      if(Math.random()<0.04)rings.push({r:0,life:1,twist:0});
      rings.forEach((r,j)=>{
        r.r+=3;r.life-=0.015;
        for(let k=0;k<30;k++){
          const a=k/30*Math.PI*2+r.r*r.twist;
          const wobble=Math.sin(a*3+t)*5;
          const x=mouse.x+Math.cos(a)*(r.r+wobble);
          const y=mouse.y+Math.sin(a)*(r.r+wobble)*0.5;
          ctx.fillStyle=`rgba(200,0,255,${r.life*0.6})`;
          ctx.fillRect(x,y,2,2);
        }
        if(r.life<=0)rings.splice(j,1);
      });
      for(let j=0;j<3;j++){
        const a=j/3*Math.PI*2+t*(0.5);
        const r=20+Math.sin(t*2)*10;
        ctx.strokeStyle=`rgba(200,0,255,0.4)`;
        ctx.lineWidth=2;
        ctx.beginPath();ctx.arc(mouse.x+Math.cos(a)*r,mouse.y+Math.sin(a)*r*0.6,5,0,Math.PI*2);ctx.stroke();
      }
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Portal Edge Pulse",
  tags:["void","rift","dimensional"],
  description:"Portal Edge Pulse — particle effect with dynamic motion",
  code:`// Portal Edge Pulse animation code`,
  animator:(c,ctx,mouse)=>{
    let t=0,rings=[],debris=[],id;
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(5,0,10,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      if(Math.random()<0.04)rings.push({r:0,life:1,twist:0.1});
      rings.forEach((r,j)=>{
        r.r+=4;r.life-=0.018;
        for(let k=0;k<31;k++){
          const a=k/31*Math.PI*2+r.r*r.twist;
          const wobble=Math.sin(a*4+t)*6;
          const x=mouse.x+Math.cos(a)*(r.r+wobble);
          const y=mouse.y+Math.sin(a)*(r.r+wobble)*0.6;
          ctx.fillStyle=`rgba(200,0,255,${r.life*0.6})`;
          ctx.fillRect(x,y,2,2);
        }
        if(r.life<=0)rings.splice(j,1);
      });
      for(let j=0;j<4;j++){
        const a=j/4*Math.PI*2+t*(0.8);
        const r=21+Math.sin(t*3)*11;
        ctx.strokeStyle=`rgba(200,0,255,0.4)`;
        ctx.lineWidth=2;
        ctx.beginPath();ctx.arc(mouse.x+Math.cos(a)*r,mouse.y+Math.sin(a)*r*0.6,6,0,Math.PI*2);ctx.stroke();
      }
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Reality Fold Ring",
  tags:["rift","dimensional","warp"],
  description:"Reality Fold Ring — particle effect with dynamic motion",
  code:`// Reality Fold Ring animation code`,
  animator:(c,ctx,mouse)=>{
    let t=0,rings=[],debris=[],id;
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(5,0,10,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      if(Math.random()<0.04)rings.push({r:0,life:1,twist:0.2});
      rings.forEach((r,j)=>{
        r.r+=5;r.life-=0.020999999999999998;
        for(let k=0;k<32;k++){
          const a=k/32*Math.PI*2+r.r*r.twist;
          const wobble=Math.sin(a*5+t)*7;
          const x=mouse.x+Math.cos(a)*(r.r+wobble);
          const y=mouse.y+Math.sin(a)*(r.r+wobble)*0.7;
          ctx.fillStyle=`rgba(200,0,255,${r.life*0.6})`;
          ctx.fillRect(x,y,2,2);
        }
        if(r.life<=0)rings.splice(j,1);
      });
      for(let j=0;j<5;j++){
        const a=j/5*Math.PI*2+t*(1.1);
        const r=22+Math.sin(t*4)*12;
        ctx.strokeStyle=`rgba(200,0,255,0.4)`;
        ctx.lineWidth=2;
        ctx.beginPath();ctx.arc(mouse.x+Math.cos(a)*r,mouse.y+Math.sin(a)*r*0.6,7,0,Math.PI*2);ctx.stroke();
      }
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Void Gate Mesh",
  tags:["dimensional","warp","portal"],
  description:"Void Gate Mesh — particle effect with dynamic motion",
  code:`// Void Gate Mesh animation code`,
  animator:(c,ctx,mouse)=>{
    let t=0,rings=[],debris=[],id;
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(5,0,10,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      if(Math.random()<0.04)rings.push({r:0,life:1,twist:0.30000000000000004});
      rings.forEach((r,j)=>{
        r.r+=6;r.life-=0.024;
        for(let k=0;k<33;k++){
          const a=k/33*Math.PI*2+r.r*r.twist;
          const wobble=Math.sin(a*6+t)*8;
          const x=mouse.x+Math.cos(a)*(r.r+wobble);
          const y=mouse.y+Math.sin(a)*(r.r+wobble)*0.8;
          ctx.fillStyle=`rgba(200,0,255,${r.life*0.6})`;
          ctx.fillRect(x,y,2,2);
        }
        if(r.life<=0)rings.splice(j,1);
      });
      for(let j=0;j<6;j++){
        const a=j/6*Math.PI*2+t*(0.5);
        const r=23+Math.sin(t*5)*13;
        ctx.strokeStyle=`rgba(200,0,255,0.4)`;
        ctx.lineWidth=2;
        ctx.beginPath();ctx.arc(mouse.x+Math.cos(a)*r,mouse.y+Math.sin(a)*r*0.6,8,0,Math.PI*2);ctx.stroke();
      }
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Warp Door Halo",
  tags:["warp","portal","void"],
  description:"Warp Door Halo — particle effect with dynamic motion",
  code:`// Warp Door Halo animation code`,
  animator:(c,ctx,mouse)=>{
    let t=0,rings=[],debris=[],id;
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(5,0,10,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      if(Math.random()<0.04)rings.push({r:0,life:1,twist:0.4});
      rings.forEach((r,j)=>{
        r.r+=7;r.life-=0.027;
        for(let k=0;k<34;k++){
          const a=k/34*Math.PI*2+r.r*r.twist;
          const wobble=Math.sin(a*7+t)*9;
          const x=mouse.x+Math.cos(a)*(r.r+wobble);
          const y=mouse.y+Math.sin(a)*(r.r+wobble)*0.9;
          ctx.fillStyle=`rgba(200,0,255,${r.life*0.6})`;
          ctx.fillRect(x,y,2,2);
        }
        if(r.life<=0)rings.splice(j,1);
      });
      for(let j=0;j<7;j++){
        const a=j/7*Math.PI*2+t*(0.8);
        const r=24+Math.sin(t*2)*14;
        ctx.strokeStyle=`rgba(200,0,255,0.4)`;
        ctx.lineWidth=2;
        ctx.beginPath();ctx.arc(mouse.x+Math.cos(a)*r,mouse.y+Math.sin(a)*r*0.6,9,0,Math.PI*2);ctx.stroke();
      }
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Rift Bloom Field",
  tags:["portal","void","rift"],
  description:"Rift Bloom Field — particle effect with dynamic motion",
  code:`// Rift Bloom Field animation code`,
  animator:(c,ctx,mouse)=>{
    let t=0,rings=[],debris=[],id;
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(5,0,10,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      if(Math.random()<0.04)rings.push({r:0,life:1,twist:0});
      rings.forEach((r,j)=>{
        r.r+=3;r.life-=0.015;
        for(let k=0;k<35;k++){
          const a=k/35*Math.PI*2+r.r*r.twist;
          const wobble=Math.sin(a*3+t)*10;
          const x=mouse.x+Math.cos(a)*(r.r+wobble);
          const y=mouse.y+Math.sin(a)*(r.r+wobble)*1;
          ctx.fillStyle=`rgba(200,0,255,${r.life*0.6})`;
          ctx.fillRect(x,y,2,2);
        }
        if(r.life<=0)rings.splice(j,1);
      });
      for(let j=0;j<3;j++){
        const a=j/3*Math.PI*2+t*(1.1);
        const r=25+Math.sin(t*3)*15;
        ctx.strokeStyle=`rgba(200,0,255,0.4)`;
        ctx.lineWidth=2;
        ctx.beginPath();ctx.arc(mouse.x+Math.cos(a)*r,mouse.y+Math.sin(a)*r*0.6,10,0,Math.PI*2);ctx.stroke();
      }
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Portal Core Orbit",
  tags:["void","rift","dimensional"],
  description:"Portal Core Orbit — particle effect with dynamic motion",
  code:`// Portal Core Orbit animation code`,
  animator:(c,ctx,mouse)=>{
    let t=0,rings=[],debris=[],id;
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(5,0,10,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      if(Math.random()<0.04)rings.push({r:0,life:1,twist:0.1});
      rings.forEach((r,j)=>{
        r.r+=4;r.life-=0.018;
        for(let k=0;k<36;k++){
          const a=k/36*Math.PI*2+r.r*r.twist;
          const wobble=Math.sin(a*4+t)*11;
          const x=mouse.x+Math.cos(a)*(r.r+wobble);
          const y=mouse.y+Math.sin(a)*(r.r+wobble)*0.5;
          ctx.fillStyle=`rgba(200,0,255,${r.life*0.6})`;
          ctx.fillRect(x,y,2,2);
        }
        if(r.life<=0)rings.splice(j,1);
      });
      for(let j=0;j<4;j++){
        const a=j/4*Math.PI*2+t*(0.5);
        const r=26+Math.sin(t*4)*16;
        ctx.strokeStyle=`rgba(200,0,255,0.4)`;
        ctx.lineWidth=2;
        ctx.beginPath();ctx.arc(mouse.x+Math.cos(a)*r,mouse.y+Math.sin(a)*r*0.6,11,0,Math.PI*2);ctx.stroke();
      }
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Space Fold Bloom",
  tags:["rift","dimensional","warp"],
  description:"Space Fold Bloom — particle effect with dynamic motion",
  code:`// Space Fold Bloom animation code`,
  animator:(c,ctx,mouse)=>{
    let t=0,rings=[],debris=[],id;
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(5,0,10,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      if(Math.random()<0.04)rings.push({r:0,life:1,twist:0.2});
      rings.forEach((r,j)=>{
        r.r+=5;r.life-=0.020999999999999998;
        for(let k=0;k<37;k++){
          const a=k/37*Math.PI*2+r.r*r.twist;
          const wobble=Math.sin(a*5+t)*12;
          const x=mouse.x+Math.cos(a)*(r.r+wobble);
          const y=mouse.y+Math.sin(a)*(r.r+wobble)*0.6;
          ctx.fillStyle=`rgba(200,0,255,${r.life*0.6})`;
          ctx.fillRect(x,y,2,2);
        }
        if(r.life<=0)rings.splice(j,1);
      });
      for(let j=0;j<5;j++){
        const a=j/5*Math.PI*2+t*(0.8);
        const r=27+Math.sin(t*5)*17;
        ctx.strokeStyle=`rgba(200,0,255,0.4)`;
        ctx.lineWidth=2;
        ctx.beginPath();ctx.arc(mouse.x+Math.cos(a)*r,mouse.y+Math.sin(a)*r*0.6,12,0,Math.PI*2);ctx.stroke();
      }
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Reality Ripple Net",
  tags:["dimensional","warp","portal"],
  description:"Reality Ripple Net — particle effect with dynamic motion",
  code:`// Reality Ripple Net animation code`,
  animator:(c,ctx,mouse)=>{
    let t=0,rings=[],debris=[],id;
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(5,0,10,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      if(Math.random()<0.04)rings.push({r:0,life:1,twist:0.30000000000000004});
      rings.forEach((r,j)=>{
        r.r+=6;r.life-=0.024;
        for(let k=0;k<38;k++){
          const a=k/38*Math.PI*2+r.r*r.twist;
          const wobble=Math.sin(a*6+t)*13;
          const x=mouse.x+Math.cos(a)*(r.r+wobble);
          const y=mouse.y+Math.sin(a)*(r.r+wobble)*0.7;
          ctx.fillStyle=`rgba(200,0,255,${r.life*0.6})`;
          ctx.fillRect(x,y,2,2);
        }
        if(r.life<=0)rings.splice(j,1);
      });
      for(let j=0;j<6;j++){
        const a=j/6*Math.PI*2+t*(1.1);
        const r=28+Math.sin(t*2)*18;
        ctx.strokeStyle=`rgba(200,0,255,0.4)`;
        ctx.lineWidth=2;
        ctx.beginPath();ctx.arc(mouse.x+Math.cos(a)*r,mouse.y+Math.sin(a)*r*0.6,13,0,Math.PI*2);ctx.stroke();
      }
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Dimensional Drift",
  tags:["warp","portal","void"],
  description:"Dimensional Drift — particle effect with dynamic motion",
  code:`// Dimensional Drift animation code`,
  animator:(c,ctx,mouse)=>{
    let t=0,rings=[],debris=[],id;
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(5,0,10,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      if(Math.random()<0.04)rings.push({r:0,life:1,twist:0.4});
      rings.forEach((r,j)=>{
        r.r+=7;r.life-=0.027;
        for(let k=0;k<39;k++){
          const a=k/39*Math.PI*2+r.r*r.twist;
          const wobble=Math.sin(a*7+t)*14;
          const x=mouse.x+Math.cos(a)*(r.r+wobble);
          const y=mouse.y+Math.sin(a)*(r.r+wobble)*0.8;
          ctx.fillStyle=`rgba(200,0,255,${r.life*0.6})`;
          ctx.fillRect(x,y,2,2);
        }
        if(r.life<=0)rings.splice(j,1);
      });
      for(let j=0;j<7;j++){
        const a=j/7*Math.PI*2+t*(0.5);
        const r=29+Math.sin(t*3)*19;
        ctx.strokeStyle=`rgba(200,0,255,0.4)`;
        ctx.lineWidth=2;
        ctx.beginPath();ctx.arc(mouse.x+Math.cos(a)*r,mouse.y+Math.sin(a)*r*0.6,14,0,Math.PI*2);ctx.stroke();
      }
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Portal Signal Flow",
  tags:["portal","void","rift"],
  description:"Portal Signal Flow — particle effect with dynamic motion",
  code:`// Portal Signal Flow animation code`,
  animator:(c,ctx,mouse)=>{
    let t=0,rings=[],debris=[],id;
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(5,0,10,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      if(Math.random()<0.04)rings.push({r:0,life:1,twist:0});
      rings.forEach((r,j)=>{
        r.r+=3;r.life-=0.015;
        for(let k=0;k<40;k++){
          const a=k/40*Math.PI*2+r.r*r.twist;
          const wobble=Math.sin(a*3+t)*5;
          const x=mouse.x+Math.cos(a)*(r.r+wobble);
          const y=mouse.y+Math.sin(a)*(r.r+wobble)*0.9;
          ctx.fillStyle=`rgba(200,0,255,${r.life*0.6})`;
          ctx.fillRect(x,y,2,2);
        }
        if(r.life<=0)rings.splice(j,1);
      });
      for(let j=0;j<3;j++){
        const a=j/3*Math.PI*2+t*(0.8);
        const r=30+Math.sin(t*4)*20;
        ctx.strokeStyle=`rgba(200,0,255,0.4)`;
        ctx.lineWidth=2;
        ctx.beginPath();ctx.arc(mouse.x+Math.cos(a)*r,mouse.y+Math.sin(a)*r*0.6,5,0,Math.PI*2);ctx.stroke();
      }
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Void Bloom Rings",
  tags:["void","rift","dimensional"],
  description:"Void Bloom Rings — particle effect with dynamic motion",
  code:`// Void Bloom Rings animation code`,
  animator:(c,ctx,mouse)=>{
    let t=0,rings=[],debris=[],id;
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(5,0,10,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      if(Math.random()<0.04)rings.push({r:0,life:1,twist:0.1});
      rings.forEach((r,j)=>{
        r.r+=4;r.life-=0.018;
        for(let k=0;k<41;k++){
          const a=k/41*Math.PI*2+r.r*r.twist;
          const wobble=Math.sin(a*4+t)*6;
          const x=mouse.x+Math.cos(a)*(r.r+wobble);
          const y=mouse.y+Math.sin(a)*(r.r+wobble)*1;
          ctx.fillStyle=`rgba(200,0,255,${r.life*0.6})`;
          ctx.fillRect(x,y,2,2);
        }
        if(r.life<=0)rings.splice(j,1);
      });
      for(let j=0;j<4;j++){
        const a=j/4*Math.PI*2+t*(1.1);
        const r=31+Math.sin(t*5)*21;
        ctx.strokeStyle=`rgba(200,0,255,0.4)`;
        ctx.lineWidth=2;
        ctx.beginPath();ctx.arc(mouse.x+Math.cos(a)*r,mouse.y+Math.sin(a)*r*0.6,6,0,Math.PI*2);ctx.stroke();
      }
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Rift Pulse Mesh",
  tags:["rift","dimensional","warp"],
  description:"Rift Pulse Mesh — particle effect with dynamic motion",
  code:`// Rift Pulse Mesh animation code`,
  animator:(c,ctx,mouse)=>{
    let t=0,rings=[],debris=[],id;
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(5,0,10,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      if(Math.random()<0.04)rings.push({r:0,life:1,twist:0.2});
      rings.forEach((r,j)=>{
        r.r+=5;r.life-=0.020999999999999998;
        for(let k=0;k<42;k++){
          const a=k/42*Math.PI*2+r.r*r.twist;
          const wobble=Math.sin(a*5+t)*7;
          const x=mouse.x+Math.cos(a)*(r.r+wobble);
          const y=mouse.y+Math.sin(a)*(r.r+wobble)*0.5;
          ctx.fillStyle=`rgba(200,0,255,${r.life*0.6})`;
          ctx.fillRect(x,y,2,2);
        }
        if(r.life<=0)rings.splice(j,1);
      });
      for(let j=0;j<5;j++){
        const a=j/5*Math.PI*2+t*(0.5);
        const r=32+Math.sin(t*2)*22;
        ctx.strokeStyle=`rgba(200,0,255,0.4)`;
        ctx.lineWidth=2;
        ctx.beginPath();ctx.arc(mouse.x+Math.cos(a)*r,mouse.y+Math.sin(a)*r*0.6,7,0,Math.PI*2);ctx.stroke();
      }
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Gate Bloom Storm",
  tags:["dimensional","warp","portal"],
  description:"Gate Bloom Storm — particle effect with dynamic motion",
  code:`// Gate Bloom Storm animation code`,
  animator:(c,ctx,mouse)=>{
    let t=0,rings=[],debris=[],id;
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(5,0,10,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      if(Math.random()<0.04)rings.push({r:0,life:1,twist:0.30000000000000004});
      rings.forEach((r,j)=>{
        r.r+=6;r.life-=0.024;
        for(let k=0;k<43;k++){
          const a=k/43*Math.PI*2+r.r*r.twist;
          const wobble=Math.sin(a*6+t)*8;
          const x=mouse.x+Math.cos(a)*(r.r+wobble);
          const y=mouse.y+Math.sin(a)*(r.r+wobble)*0.6;
          ctx.fillStyle=`rgba(200,0,255,${r.life*0.6})`;
          ctx.fillRect(x,y,2,2);
        }
        if(r.life<=0)rings.splice(j,1);
      });
      for(let j=0;j<6;j++){
        const a=j/6*Math.PI*2+t*(0.8);
        const r=33+Math.sin(t*3)*23;
        ctx.strokeStyle=`rgba(200,0,255,0.4)`;
        ctx.lineWidth=2;
        ctx.beginPath();ctx.arc(mouse.x+Math.cos(a)*r,mouse.y+Math.sin(a)*r*0.6,8,0,Math.PI*2);ctx.stroke();
      }
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Warp Bloom Halo",
  tags:["warp","portal","void"],
  description:"Warp Bloom Halo — particle effect with dynamic motion",
  code:`// Warp Bloom Halo animation code`,
  animator:(c,ctx,mouse)=>{
    let t=0,rings=[],debris=[],id;
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(5,0,10,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      if(Math.random()<0.04)rings.push({r:0,life:1,twist:0.4});
      rings.forEach((r,j)=>{
        r.r+=7;r.life-=0.027;
        for(let k=0;k<44;k++){
          const a=k/44*Math.PI*2+r.r*r.twist;
          const wobble=Math.sin(a*7+t)*9;
          const x=mouse.x+Math.cos(a)*(r.r+wobble);
          const y=mouse.y+Math.sin(a)*(r.r+wobble)*0.7;
          ctx.fillStyle=`rgba(200,0,255,${r.life*0.6})`;
          ctx.fillRect(x,y,2,2);
        }
        if(r.life<=0)rings.splice(j,1);
      });
      for(let j=0;j<7;j++){
        const a=j/7*Math.PI*2+t*(1.1);
        const r=34+Math.sin(t*4)*24;
        ctx.strokeStyle=`rgba(200,0,255,0.4)`;
        ctx.lineWidth=2;
        ctx.beginPath();ctx.arc(mouse.x+Math.cos(a)*r,mouse.y+Math.sin(a)*r*0.6,9,0,Math.PI*2);ctx.stroke();
      }
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Reality Core Pulse",
  tags:["portal","void","rift"],
  description:"Reality Core Pulse — particle effect with dynamic motion",
  code:`// Reality Core Pulse animation code`,
  animator:(c,ctx,mouse)=>{
    let t=0,rings=[],debris=[],id;
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(5,0,10,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      if(Math.random()<0.04)rings.push({r:0,life:1,twist:0});
      rings.forEach((r,j)=>{
        r.r+=3;r.life-=0.015;
        for(let k=0;k<45;k++){
          const a=k/45*Math.PI*2+r.r*r.twist;
          const wobble=Math.sin(a*3+t)*10;
          const x=mouse.x+Math.cos(a)*(r.r+wobble);
          const y=mouse.y+Math.sin(a)*(r.r+wobble)*0.8;
          ctx.fillStyle=`rgba(200,0,255,${r.life*0.6})`;
          ctx.fillRect(x,y,2,2);
        }
        if(r.life<=0)rings.splice(j,1);
      });
      for(let j=0;j<3;j++){
        const a=j/3*Math.PI*2+t*(0.5);
        const r=35+Math.sin(t*5)*25;
        ctx.strokeStyle=`rgba(200,0,255,0.4)`;
        ctx.lineWidth=2;
        ctx.beginPath();ctx.arc(mouse.x+Math.cos(a)*r,mouse.y+Math.sin(a)*r*0.6,10,0,Math.PI*2);ctx.stroke();
      }
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Portal Lattice Bloom",
  tags:["void","rift","dimensional"],
  description:"Portal Lattice Bloom — particle effect with dynamic motion",
  code:`// Portal Lattice Bloom animation code`,
  animator:(c,ctx,mouse)=>{
    let t=0,rings=[],debris=[],id;
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(5,0,10,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      if(Math.random()<0.04)rings.push({r:0,life:1,twist:0.1});
      rings.forEach((r,j)=>{
        r.r+=4;r.life-=0.018;
        for(let k=0;k<46;k++){
          const a=k/46*Math.PI*2+r.r*r.twist;
          const wobble=Math.sin(a*4+t)*11;
          const x=mouse.x+Math.cos(a)*(r.r+wobble);
          const y=mouse.y+Math.sin(a)*(r.r+wobble)*0.9;
          ctx.fillStyle=`rgba(200,0,255,${r.life*0.6})`;
          ctx.fillRect(x,y,2,2);
        }
        if(r.life<=0)rings.splice(j,1);
      });
      for(let j=0;j<4;j++){
        const a=j/4*Math.PI*2+t*(0.8);
        const r=36+Math.sin(t*2)*26;
        ctx.strokeStyle=`rgba(200,0,255,0.4)`;
        ctx.lineWidth=2;
        ctx.beginPath();ctx.arc(mouse.x+Math.cos(a)*r,mouse.y+Math.sin(a)*r*0.6,11,0,Math.PI*2);ctx.stroke();
      }
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Dimensional Cascade",
  tags:["rift","dimensional","warp"],
  description:"Dimensional Cascade — particle effect with dynamic motion",
  code:`// Dimensional Cascade animation code`,
  animator:(c,ctx,mouse)=>{
    let t=0,rings=[],debris=[],id;
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(5,0,10,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      if(Math.random()<0.04)rings.push({r:0,life:1,twist:0.2});
      rings.forEach((r,j)=>{
        r.r+=5;r.life-=0.020999999999999998;
        for(let k=0;k<47;k++){
          const a=k/47*Math.PI*2+r.r*r.twist;
          const wobble=Math.sin(a*5+t)*12;
          const x=mouse.x+Math.cos(a)*(r.r+wobble);
          const y=mouse.y+Math.sin(a)*(r.r+wobble)*1;
          ctx.fillStyle=`rgba(200,0,255,${r.life*0.6})`;
          ctx.fillRect(x,y,2,2);
        }
        if(r.life<=0)rings.splice(j,1);
      });
      for(let j=0;j<5;j++){
        const a=j/5*Math.PI*2+t*(1.1);
        const r=37+Math.sin(t*3)*27;
        ctx.strokeStyle=`rgba(200,0,255,0.4)`;
        ctx.lineWidth=2;
        ctx.beginPath();ctx.arc(mouse.x+Math.cos(a)*r,mouse.y+Math.sin(a)*r*0.6,12,0,Math.PI*2);ctx.stroke();
      }
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Rift Halo Flow",
  tags:["dimensional","warp","portal"],
  description:"Rift Halo Flow — particle effect with dynamic motion",
  code:`// Rift Halo Flow animation code`,
  animator:(c,ctx,mouse)=>{
    let t=0,rings=[],debris=[],id;
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(5,0,10,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      if(Math.random()<0.04)rings.push({r:0,life:1,twist:0.30000000000000004});
      rings.forEach((r,j)=>{
        r.r+=6;r.life-=0.024;
        for(let k=0;k<48;k++){
          const a=k/48*Math.PI*2+r.r*r.twist;
          const wobble=Math.sin(a*6+t)*13;
          const x=mouse.x+Math.cos(a)*(r.r+wobble);
          const y=mouse.y+Math.sin(a)*(r.r+wobble)*0.5;
          ctx.fillStyle=`rgba(200,0,255,${r.life*0.6})`;
          ctx.fillRect(x,y,2,2);
        }
        if(r.life<=0)rings.splice(j,1);
      });
      for(let j=0;j<6;j++){
        const a=j/6*Math.PI*2+t*(0.5);
        const r=38+Math.sin(t*4)*28;
        ctx.strokeStyle=`rgba(200,0,255,0.4)`;
        ctx.lineWidth=2;
        ctx.beginPath();ctx.arc(mouse.x+Math.cos(a)*r,mouse.y+Math.sin(a)*r*0.6,13,0,Math.PI*2);ctx.stroke();
      }
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Void Bloom Core",
  tags:["warp","portal","void"],
  description:"Void Bloom Core — particle effect with dynamic motion",
  code:`// Void Bloom Core animation code`,
  animator:(c,ctx,mouse)=>{
    let t=0,rings=[],debris=[],id;
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(5,0,10,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      if(Math.random()<0.04)rings.push({r:0,life:1,twist:0.4});
      rings.forEach((r,j)=>{
        r.r+=7;r.life-=0.027;
        for(let k=0;k<49;k++){
          const a=k/49*Math.PI*2+r.r*r.twist;
          const wobble=Math.sin(a*7+t)*14;
          const x=mouse.x+Math.cos(a)*(r.r+wobble);
          const y=mouse.y+Math.sin(a)*(r.r+wobble)*0.6;
          ctx.fillStyle=`rgba(200,0,255,${r.life*0.6})`;
          ctx.fillRect(x,y,2,2);
        }
        if(r.life<=0)rings.splice(j,1);
      });
      for(let j=0;j<7;j++){
        const a=j/7*Math.PI*2+t*(0.8);
        const r=39+Math.sin(t*5)*29;
        ctx.strokeStyle=`rgba(200,0,255,0.4)`;
        ctx.lineWidth=2;
        ctx.beginPath();ctx.arc(mouse.x+Math.cos(a)*r,mouse.y+Math.sin(a)*r*0.6,14,0,Math.PI*2);ctx.stroke();
      }
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Portal Ribbon Mesh",
  tags:["portal","void","rift"],
  description:"Portal Ribbon Mesh — particle effect with dynamic motion",
  code:`// Portal Ribbon Mesh animation code`,
  animator:(c,ctx,mouse)=>{
    let t=0,rings=[],debris=[],id;
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(5,0,10,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      if(Math.random()<0.04)rings.push({r:0,life:1,twist:0});
      rings.forEach((r,j)=>{
        r.r+=3;r.life-=0.015;
        for(let k=0;k<30;k++){
          const a=k/30*Math.PI*2+r.r*r.twist;
          const wobble=Math.sin(a*3+t)*5;
          const x=mouse.x+Math.cos(a)*(r.r+wobble);
          const y=mouse.y+Math.sin(a)*(r.r+wobble)*0.7;
          ctx.fillStyle=`rgba(200,0,255,${r.life*0.6})`;
          ctx.fillRect(x,y,2,2);
        }
        if(r.life<=0)rings.splice(j,1);
      });
      for(let j=0;j<3;j++){
        const a=j/3*Math.PI*2+t*(1.1);
        const r=40+Math.sin(t*2)*10;
        ctx.strokeStyle=`rgba(200,0,255,0.4)`;
        ctx.lineWidth=2;
        ctx.beginPath();ctx.arc(mouse.x+Math.cos(a)*r,mouse.y+Math.sin(a)*r*0.6,5,0,Math.PI*2);ctx.stroke();
      }
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Reality Orbit Bloom",
  tags:["void","rift","dimensional"],
  description:"Reality Orbit Bloom — particle effect with dynamic motion",
  code:`// Reality Orbit Bloom animation code`,
  animator:(c,ctx,mouse)=>{
    let t=0,rings=[],debris=[],id;
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(5,0,10,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      if(Math.random()<0.04)rings.push({r:0,life:1,twist:0.1});
      rings.forEach((r,j)=>{
        r.r+=4;r.life-=0.018;
        for(let k=0;k<31;k++){
          const a=k/31*Math.PI*2+r.r*r.twist;
          const wobble=Math.sin(a*4+t)*6;
          const x=mouse.x+Math.cos(a)*(r.r+wobble);
          const y=mouse.y+Math.sin(a)*(r.r+wobble)*0.8;
          ctx.fillStyle=`rgba(200,0,255,${r.life*0.6})`;
          ctx.fillRect(x,y,2,2);
        }
        if(r.life<=0)rings.splice(j,1);
      });
      for(let j=0;j<4;j++){
        const a=j/4*Math.PI*2+t*(0.5);
        const r=41+Math.sin(t*3)*11;
        ctx.strokeStyle=`rgba(200,0,255,0.4)`;
        ctx.lineWidth=2;
        ctx.beginPath();ctx.arc(mouse.x+Math.cos(a)*r,mouse.y+Math.sin(a)*r*0.6,6,0,Math.PI*2);ctx.stroke();
      }
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Gate Pulse Net",
  tags:["rift","dimensional","warp"],
  description:"Gate Pulse Net — particle effect with dynamic motion",
  code:`// Gate Pulse Net animation code`,
  animator:(c,ctx,mouse)=>{
    let t=0,rings=[],debris=[],id;
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(5,0,10,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      if(Math.random()<0.04)rings.push({r:0,life:1,twist:0.2});
      rings.forEach((r,j)=>{
        r.r+=5;r.life-=0.020999999999999998;
        for(let k=0;k<32;k++){
          const a=k/32*Math.PI*2+r.r*r.twist;
          const wobble=Math.sin(a*5+t)*7;
          const x=mouse.x+Math.cos(a)*(r.r+wobble);
          const y=mouse.y+Math.sin(a)*(r.r+wobble)*0.9;
          ctx.fillStyle=`rgba(200,0,255,${r.life*0.6})`;
          ctx.fillRect(x,y,2,2);
        }
        if(r.life<=0)rings.splice(j,1);
      });
      for(let j=0;j<5;j++){
        const a=j/5*Math.PI*2+t*(0.8);
        const r=42+Math.sin(t*4)*12;
        ctx.strokeStyle=`rgba(200,0,255,0.4)`;
        ctx.lineWidth=2;
        ctx.beginPath();ctx.arc(mouse.x+Math.cos(a)*r,mouse.y+Math.sin(a)*r*0.6,7,0,Math.PI*2);ctx.stroke();
      }
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Warp Bloom Field",
  tags:["dimensional","warp","portal"],
  description:"Warp Bloom Field — particle effect with dynamic motion",
  code:`// Warp Bloom Field animation code`,
  animator:(c,ctx,mouse)=>{
    let t=0,rings=[],debris=[],id;
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(5,0,10,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      if(Math.random()<0.04)rings.push({r:0,life:1,twist:0.30000000000000004});
      rings.forEach((r,j)=>{
        r.r+=6;r.life-=0.024;
        for(let k=0;k<33;k++){
          const a=k/33*Math.PI*2+r.r*r.twist;
          const wobble=Math.sin(a*6+t)*8;
          const x=mouse.x+Math.cos(a)*(r.r+wobble);
          const y=mouse.y+Math.sin(a)*(r.r+wobble)*1;
          ctx.fillStyle=`rgba(200,0,255,${r.life*0.6})`;
          ctx.fillRect(x,y,2,2);
        }
        if(r.life<=0)rings.splice(j,1);
      });
      for(let j=0;j<6;j++){
        const a=j/6*Math.PI*2+t*(1.1);
        const r=43+Math.sin(t*5)*13;
        ctx.strokeStyle=`rgba(200,0,255,0.4)`;
        ctx.lineWidth=2;
        ctx.beginPath();ctx.arc(mouse.x+Math.cos(a)*r,mouse.y+Math.sin(a)*r*0.6,8,0,Math.PI*2);ctx.stroke();
      }
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Rift Bloom Rings",
  tags:["warp","portal","void"],
  description:"Rift Bloom Rings — particle effect with dynamic motion",
  code:`// Rift Bloom Rings animation code`,
  animator:(c,ctx,mouse)=>{
    let t=0,rings=[],debris=[],id;
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(5,0,10,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      if(Math.random()<0.04)rings.push({r:0,life:1,twist:0.4});
      rings.forEach((r,j)=>{
        r.r+=7;r.life-=0.027;
        for(let k=0;k<34;k++){
          const a=k/34*Math.PI*2+r.r*r.twist;
          const wobble=Math.sin(a*7+t)*9;
          const x=mouse.x+Math.cos(a)*(r.r+wobble);
          const y=mouse.y+Math.sin(a)*(r.r+wobble)*0.5;
          ctx.fillStyle=`rgba(200,0,255,${r.life*0.6})`;
          ctx.fillRect(x,y,2,2);
        }
        if(r.life<=0)rings.splice(j,1);
      });
      for(let j=0;j<7;j++){
        const a=j/7*Math.PI*2+t*(0.5);
        const r=44+Math.sin(t*2)*14;
        ctx.strokeStyle=`rgba(200,0,255,0.4)`;
        ctx.lineWidth=2;
        ctx.beginPath();ctx.arc(mouse.x+Math.cos(a)*r,mouse.y+Math.sin(a)*r*0.6,9,0,Math.PI*2);ctx.stroke();
      }
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Portal Mesh Storm",
  tags:["portal","void","rift"],
  description:"Portal Mesh Storm — particle effect with dynamic motion",
  code:`// Portal Mesh Storm animation code`,
  animator:(c,ctx,mouse)=>{
    let t=0,rings=[],debris=[],id;
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(5,0,10,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      if(Math.random()<0.04)rings.push({r:0,life:1,twist:0});
      rings.forEach((r,j)=>{
        r.r+=3;r.life-=0.015;
        for(let k=0;k<35;k++){
          const a=k/35*Math.PI*2+r.r*r.twist;
          const wobble=Math.sin(a*3+t)*10;
          const x=mouse.x+Math.cos(a)*(r.r+wobble);
          const y=mouse.y+Math.sin(a)*(r.r+wobble)*0.6;
          ctx.fillStyle=`rgba(200,0,255,${r.life*0.6})`;
          ctx.fillRect(x,y,2,2);
        }
        if(r.life<=0)rings.splice(j,1);
      });
      for(let j=0;j<3;j++){
        const a=j/3*Math.PI*2+t*(0.8);
        const r=45+Math.sin(t*3)*15;
        ctx.strokeStyle=`rgba(200,0,255,0.4)`;
        ctx.lineWidth=2;
        ctx.beginPath();ctx.arc(mouse.x+Math.cos(a)*r,mouse.y+Math.sin(a)*r*0.6,10,0,Math.PI*2);ctx.stroke();
      }
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Void Halo Bloom",
  tags:["void","rift","dimensional"],
  description:"Void Halo Bloom — particle effect with dynamic motion",
  code:`// Void Halo Bloom animation code`,
  animator:(c,ctx,mouse)=>{
    let t=0,rings=[],debris=[],id;
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(5,0,10,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      if(Math.random()<0.04)rings.push({r:0,life:1,twist:0.1});
      rings.forEach((r,j)=>{
        r.r+=4;r.life-=0.018;
        for(let k=0;k<36;k++){
          const a=k/36*Math.PI*2+r.r*r.twist;
          const wobble=Math.sin(a*4+t)*11;
          const x=mouse.x+Math.cos(a)*(r.r+wobble);
          const y=mouse.y+Math.sin(a)*(r.r+wobble)*0.7;
          ctx.fillStyle=`rgba(200,0,255,${r.life*0.6})`;
          ctx.fillRect(x,y,2,2);
        }
        if(r.life<=0)rings.splice(j,1);
      });
      for(let j=0;j<4;j++){
        const a=j/4*Math.PI*2+t*(1.1);
        const r=46+Math.sin(t*4)*16;
        ctx.strokeStyle=`rgba(200,0,255,0.4)`;
        ctx.lineWidth=2;
        ctx.beginPath();ctx.arc(mouse.x+Math.cos(a)*r,mouse.y+Math.sin(a)*r*0.6,11,0,Math.PI*2);ctx.stroke();
      }
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Dimensional Core Flow",
  tags:["rift","dimensional","warp"],
  description:"Dimensional Core Flow — particle effect with dynamic motion",
  code:`// Dimensional Core Flow animation code`,
  animator:(c,ctx,mouse)=>{
    let t=0,rings=[],debris=[],id;
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(5,0,10,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      if(Math.random()<0.04)rings.push({r:0,life:1,twist:0.2});
      rings.forEach((r,j)=>{
        r.r+=5;r.life-=0.020999999999999998;
        for(let k=0;k<37;k++){
          const a=k/37*Math.PI*2+r.r*r.twist;
          const wobble=Math.sin(a*5+t)*12;
          const x=mouse.x+Math.cos(a)*(r.r+wobble);
          const y=mouse.y+Math.sin(a)*(r.r+wobble)*0.8;
          ctx.fillStyle=`rgba(200,0,255,${r.life*0.6})`;
          ctx.fillRect(x,y,2,2);
        }
        if(r.life<=0)rings.splice(j,1);
      });
      for(let j=0;j<5;j++){
        const a=j/5*Math.PI*2+t*(0.5);
        const r=47+Math.sin(t*5)*17;
        ctx.strokeStyle=`rgba(200,0,255,0.4)`;
        ctx.lineWidth=2;
        ctx.beginPath();ctx.arc(mouse.x+Math.cos(a)*r,mouse.y+Math.sin(a)*r*0.6,12,0,Math.PI*2);ctx.stroke();
      }
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Reality Bloom Halo",
  tags:["dimensional","warp","portal"],
  description:"Reality Bloom Halo — particle effect with dynamic motion",
  code:`// Reality Bloom Halo animation code`,
  animator:(c,ctx,mouse)=>{
    let t=0,rings=[],debris=[],id;
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(5,0,10,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      if(Math.random()<0.04)rings.push({r:0,life:1,twist:0.30000000000000004});
      rings.forEach((r,j)=>{
        r.r+=6;r.life-=0.024;
        for(let k=0;k<38;k++){
          const a=k/38*Math.PI*2+r.r*r.twist;
          const wobble=Math.sin(a*6+t)*13;
          const x=mouse.x+Math.cos(a)*(r.r+wobble);
          const y=mouse.y+Math.sin(a)*(r.r+wobble)*0.9;
          ctx.fillStyle=`rgba(200,0,255,${r.life*0.6})`;
          ctx.fillRect(x,y,2,2);
        }
        if(r.life<=0)rings.splice(j,1);
      });
      for(let j=0;j<6;j++){
        const a=j/6*Math.PI*2+t*(0.8);
        const r=48+Math.sin(t*2)*18;
        ctx.strokeStyle=`rgba(200,0,255,0.4)`;
        ctx.lineWidth=2;
        ctx.beginPath();ctx.arc(mouse.x+Math.cos(a)*r,mouse.y+Math.sin(a)*r*0.6,13,0,Math.PI*2);ctx.stroke();
      }
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Gate Bloom Orbit",
  tags:["warp","portal","void"],
  description:"Gate Bloom Orbit — particle effect with dynamic motion",
  code:`// Gate Bloom Orbit animation code`,
  animator:(c,ctx,mouse)=>{
    let t=0,rings=[],debris=[],id;
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(5,0,10,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      if(Math.random()<0.04)rings.push({r:0,life:1,twist:0.4});
      rings.forEach((r,j)=>{
        r.r+=7;r.life-=0.027;
        for(let k=0;k<39;k++){
          const a=k/39*Math.PI*2+r.r*r.twist;
          const wobble=Math.sin(a*7+t)*14;
          const x=mouse.x+Math.cos(a)*(r.r+wobble);
          const y=mouse.y+Math.sin(a)*(r.r+wobble)*1;
          ctx.fillStyle=`rgba(200,0,255,${r.life*0.6})`;
          ctx.fillRect(x,y,2,2);
        }
        if(r.life<=0)rings.splice(j,1);
      });
      for(let j=0;j<7;j++){
        const a=j/7*Math.PI*2+t*(1.1);
        const r=49+Math.sin(t*3)*19;
        ctx.strokeStyle=`rgba(200,0,255,0.4)`;
        ctx.lineWidth=2;
        ctx.beginPath();ctx.arc(mouse.x+Math.cos(a)*r,mouse.y+Math.sin(a)*r*0.6,14,0,Math.PI*2);ctx.stroke();
      }
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Portal Pulse Lattice",
  tags:["portal","void","rift"],
  description:"Portal Pulse Lattice — particle effect with dynamic motion",
  code:`// Portal Pulse Lattice animation code`,
  animator:(c,ctx,mouse)=>{
    let t=0,rings=[],debris=[],id;
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(5,0,10,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      if(Math.random()<0.04)rings.push({r:0,life:1,twist:0});
      rings.forEach((r,j)=>{
        r.r+=3;r.life-=0.015;
        for(let k=0;k<40;k++){
          const a=k/40*Math.PI*2+r.r*r.twist;
          const wobble=Math.sin(a*3+t)*5;
          const x=mouse.x+Math.cos(a)*(r.r+wobble);
          const y=mouse.y+Math.sin(a)*(r.r+wobble)*0.5;
          ctx.fillStyle=`rgba(200,0,255,${r.life*0.6})`;
          ctx.fillRect(x,y,2,2);
        }
        if(r.life<=0)rings.splice(j,1);
      });
      for(let j=0;j<3;j++){
        const a=j/3*Math.PI*2+t*(0.5);
        const r=50+Math.sin(t*4)*20;
        ctx.strokeStyle=`rgba(200,0,255,0.4)`;
        ctx.lineWidth=2;
        ctx.beginPath();ctx.arc(mouse.x+Math.cos(a)*r,mouse.y+Math.sin(a)*r*0.6,5,0,Math.PI*2);ctx.stroke();
      }
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Warp Halo Net",
  tags:["void","rift","dimensional"],
  description:"Warp Halo Net — particle effect with dynamic motion",
  code:`// Warp Halo Net animation code`,
  animator:(c,ctx,mouse)=>{
    let t=0,rings=[],debris=[],id;
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(5,0,10,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      if(Math.random()<0.04)rings.push({r:0,life:1,twist:0.1});
      rings.forEach((r,j)=>{
        r.r+=4;r.life-=0.018;
        for(let k=0;k<41;k++){
          const a=k/41*Math.PI*2+r.r*r.twist;
          const wobble=Math.sin(a*4+t)*6;
          const x=mouse.x+Math.cos(a)*(r.r+wobble);
          const y=mouse.y+Math.sin(a)*(r.r+wobble)*0.6;
          ctx.fillStyle=`rgba(200,0,255,${r.life*0.6})`;
          ctx.fillRect(x,y,2,2);
        }
        if(r.life<=0)rings.splice(j,1);
      });
      for(let j=0;j<4;j++){
        const a=j/4*Math.PI*2+t*(0.8);
        const r=51+Math.sin(t*5)*21;
        ctx.strokeStyle=`rgba(200,0,255,0.4)`;
        ctx.lineWidth=2;
        ctx.beginPath();ctx.arc(mouse.x+Math.cos(a)*r,mouse.y+Math.sin(a)*r*0.6,6,0,Math.PI*2);ctx.stroke();
      }
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Rift Bloom Mesh",
  tags:["rift","dimensional","warp"],
  description:"Rift Bloom Mesh — particle effect with dynamic motion",
  code:`// Rift Bloom Mesh animation code`,
  animator:(c,ctx,mouse)=>{
    let t=0,rings=[],debris=[],id;
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(5,0,10,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      if(Math.random()<0.04)rings.push({r:0,life:1,twist:0.2});
      rings.forEach((r,j)=>{
        r.r+=5;r.life-=0.020999999999999998;
        for(let k=0;k<42;k++){
          const a=k/42*Math.PI*2+r.r*r.twist;
          const wobble=Math.sin(a*5+t)*7;
          const x=mouse.x+Math.cos(a)*(r.r+wobble);
          const y=mouse.y+Math.sin(a)*(r.r+wobble)*0.7;
          ctx.fillStyle=`rgba(200,0,255,${r.life*0.6})`;
          ctx.fillRect(x,y,2,2);
        }
        if(r.life<=0)rings.splice(j,1);
      });
      for(let j=0;j<5;j++){
        const a=j/5*Math.PI*2+t*(1.1);
        const r=52+Math.sin(t*2)*22;
        ctx.strokeStyle=`rgba(200,0,255,0.4)`;
        ctx.lineWidth=2;
        ctx.beginPath();ctx.arc(mouse.x+Math.cos(a)*r,mouse.y+Math.sin(a)*r*0.6,7,0,Math.PI*2);ctx.stroke();
      }
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Void Core Pulse",
  tags:["dimensional","warp","portal"],
  description:"Void Core Pulse — particle effect with dynamic motion",
  code:`// Void Core Pulse animation code`,
  animator:(c,ctx,mouse)=>{
    let t=0,rings=[],debris=[],id;
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(5,0,10,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      if(Math.random()<0.04)rings.push({r:0,life:1,twist:0.30000000000000004});
      rings.forEach((r,j)=>{
        r.r+=6;r.life-=0.024;
        for(let k=0;k<43;k++){
          const a=k/43*Math.PI*2+r.r*r.twist;
          const wobble=Math.sin(a*6+t)*8;
          const x=mouse.x+Math.cos(a)*(r.r+wobble);
          const y=mouse.y+Math.sin(a)*(r.r+wobble)*0.8;
          ctx.fillStyle=`rgba(200,0,255,${r.life*0.6})`;
          ctx.fillRect(x,y,2,2);
        }
        if(r.life<=0)rings.splice(j,1);
      });
      for(let j=0;j<6;j++){
        const a=j/6*Math.PI*2+t*(0.5);
        const r=53+Math.sin(t*3)*23;
        ctx.strokeStyle=`rgba(200,0,255,0.4)`;
        ctx.lineWidth=2;
        ctx.beginPath();ctx.arc(mouse.x+Math.cos(a)*r,mouse.y+Math.sin(a)*r*0.6,8,0,Math.PI*2);ctx.stroke();
      }
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Dimensional Bloom Storm",
  tags:["warp","portal","void"],
  description:"Dimensional Bloom Storm — particle effect with dynamic motion",
  code:`// Dimensional Bloom Storm animation code`,
  animator:(c,ctx,mouse)=>{
    let t=0,rings=[],debris=[],id;
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(5,0,10,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      if(Math.random()<0.04)rings.push({r:0,life:1,twist:0.4});
      rings.forEach((r,j)=>{
        r.r+=7;r.life-=0.027;
        for(let k=0;k<44;k++){
          const a=k/44*Math.PI*2+r.r*r.twist;
          const wobble=Math.sin(a*7+t)*9;
          const x=mouse.x+Math.cos(a)*(r.r+wobble);
          const y=mouse.y+Math.sin(a)*(r.r+wobble)*0.9;
          ctx.fillStyle=`rgba(200,0,255,${r.life*0.6})`;
          ctx.fillRect(x,y,2,2);
        }
        if(r.life<=0)rings.splice(j,1);
      });
      for(let j=0;j<7;j++){
        const a=j/7*Math.PI*2+t*(0.8);
        const r=54+Math.sin(t*4)*24;
        ctx.strokeStyle=`rgba(200,0,255,0.4)`;
        ctx.lineWidth=2;
        ctx.beginPath();ctx.arc(mouse.x+Math.cos(a)*r,mouse.y+Math.sin(a)*r*0.6,9,0,Math.PI*2);ctx.stroke();
      }
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Reality Halo Field",
  tags:["portal","void","rift"],
  description:"Reality Halo Field — particle effect with dynamic motion",
  code:`// Reality Halo Field animation code`,
  animator:(c,ctx,mouse)=>{
    let t=0,rings=[],debris=[],id;
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(5,0,10,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      if(Math.random()<0.04)rings.push({r:0,life:1,twist:0});
      rings.forEach((r,j)=>{
        r.r+=3;r.life-=0.015;
        for(let k=0;k<45;k++){
          const a=k/45*Math.PI*2+r.r*r.twist;
          const wobble=Math.sin(a*3+t)*10;
          const x=mouse.x+Math.cos(a)*(r.r+wobble);
          const y=mouse.y+Math.sin(a)*(r.r+wobble)*1;
          ctx.fillStyle=`rgba(200,0,255,${r.life*0.6})`;
          ctx.fillRect(x,y,2,2);
        }
        if(r.life<=0)rings.splice(j,1);
      });
      for(let j=0;j<3;j++){
        const a=j/3*Math.PI*2+t*(1.1);
        const r=55+Math.sin(t*5)*25;
        ctx.strokeStyle=`rgba(200,0,255,0.4)`;
        ctx.lineWidth=2;
        ctx.beginPath();ctx.arc(mouse.x+Math.cos(a)*r,mouse.y+Math.sin(a)*r*0.6,10,0,Math.PI*2);ctx.stroke();
      }
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Gate Bloom Net",
  tags:["void","rift","dimensional"],
  description:"Gate Bloom Net — particle effect with dynamic motion",
  code:`// Gate Bloom Net animation code`,
  animator:(c,ctx,mouse)=>{
    let t=0,rings=[],debris=[],id;
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(5,0,10,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      if(Math.random()<0.04)rings.push({r:0,life:1,twist:0.1});
      rings.forEach((r,j)=>{
        r.r+=4;r.life-=0.018;
        for(let k=0;k<46;k++){
          const a=k/46*Math.PI*2+r.r*r.twist;
          const wobble=Math.sin(a*4+t)*11;
          const x=mouse.x+Math.cos(a)*(r.r+wobble);
          const y=mouse.y+Math.sin(a)*(r.r+wobble)*0.5;
          ctx.fillStyle=`rgba(200,0,255,${r.life*0.6})`;
          ctx.fillRect(x,y,2,2);
        }
        if(r.life<=0)rings.splice(j,1);
      });
      for(let j=0;j<4;j++){
        const a=j/4*Math.PI*2+t*(0.5);
        const r=56+Math.sin(t*2)*26;
        ctx.strokeStyle=`rgba(200,0,255,0.4)`;
        ctx.lineWidth=2;
        ctx.beginPath();ctx.arc(mouse.x+Math.cos(a)*r,mouse.y+Math.sin(a)*r*0.6,11,0,Math.PI*2);ctx.stroke();
      }
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Portal Bloom Rings",
  tags:["rift","dimensional","warp"],
  description:"Portal Bloom Rings — particle effect with dynamic motion",
  code:`// Portal Bloom Rings animation code`,
  animator:(c,ctx,mouse)=>{
    let t=0,rings=[],debris=[],id;
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(5,0,10,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      if(Math.random()<0.04)rings.push({r:0,life:1,twist:0.2});
      rings.forEach((r,j)=>{
        r.r+=5;r.life-=0.020999999999999998;
        for(let k=0;k<47;k++){
          const a=k/47*Math.PI*2+r.r*r.twist;
          const wobble=Math.sin(a*5+t)*12;
          const x=mouse.x+Math.cos(a)*(r.r+wobble);
          const y=mouse.y+Math.sin(a)*(r.r+wobble)*0.6;
          ctx.fillStyle=`rgba(200,0,255,${r.life*0.6})`;
          ctx.fillRect(x,y,2,2);
        }
        if(r.life<=0)rings.splice(j,1);
      });
      for(let j=0;j<5;j++){
        const a=j/5*Math.PI*2+t*(0.8);
        const r=57+Math.sin(t*3)*27;
        ctx.strokeStyle=`rgba(200,0,255,0.4)`;
        ctx.lineWidth=2;
        ctx.beginPath();ctx.arc(mouse.x+Math.cos(a)*r,mouse.y+Math.sin(a)*r*0.6,12,0,Math.PI*2);ctx.stroke();
      }
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Warp Core Halo",
  tags:["dimensional","warp","portal"],
  description:"Warp Core Halo — particle effect with dynamic motion",
  code:`// Warp Core Halo animation code`,
  animator:(c,ctx,mouse)=>{
    let t=0,rings=[],debris=[],id;
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(5,0,10,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      if(Math.random()<0.04)rings.push({r:0,life:1,twist:0.30000000000000004});
      rings.forEach((r,j)=>{
        r.r+=6;r.life-=0.024;
        for(let k=0;k<48;k++){
          const a=k/48*Math.PI*2+r.r*r.twist;
          const wobble=Math.sin(a*6+t)*13;
          const x=mouse.x+Math.cos(a)*(r.r+wobble);
          const y=mouse.y+Math.sin(a)*(r.r+wobble)*0.7;
          ctx.fillStyle=`rgba(200,0,255,${r.life*0.6})`;
          ctx.fillRect(x,y,2,2);
        }
        if(r.life<=0)rings.splice(j,1);
      });
      for(let j=0;j<6;j++){
        const a=j/6*Math.PI*2+t*(1.1);
        const r=58+Math.sin(t*4)*28;
        ctx.strokeStyle=`rgba(200,0,255,0.4)`;
        ctx.lineWidth=2;
        ctx.beginPath();ctx.arc(mouse.x+Math.cos(a)*r,mouse.y+Math.sin(a)*r*0.6,13,0,Math.PI*2);ctx.stroke();
      }
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Rift Bloom Orbit",
  tags:["warp","portal","void"],
  description:"Rift Bloom Orbit — particle effect with dynamic motion",
  code:`// Rift Bloom Orbit animation code`,
  animator:(c,ctx,mouse)=>{
    let t=0,rings=[],debris=[],id;
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(5,0,10,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      if(Math.random()<0.04)rings.push({r:0,life:1,twist:0.4});
      rings.forEach((r,j)=>{
        r.r+=7;r.life-=0.027;
        for(let k=0;k<49;k++){
          const a=k/49*Math.PI*2+r.r*r.twist;
          const wobble=Math.sin(a*7+t)*14;
          const x=mouse.x+Math.cos(a)*(r.r+wobble);
          const y=mouse.y+Math.sin(a)*(r.r+wobble)*0.8;
          ctx.fillStyle=`rgba(200,0,255,${r.life*0.6})`;
          ctx.fillRect(x,y,2,2);
        }
        if(r.life<=0)rings.splice(j,1);
      });
      for(let j=0;j<7;j++){
        const a=j/7*Math.PI*2+t*(0.5);
        const r=59+Math.sin(t*5)*29;
        ctx.strokeStyle=`rgba(200,0,255,0.4)`;
        ctx.lineWidth=2;
        ctx.beginPath();ctx.arc(mouse.x+Math.cos(a)*r,mouse.y+Math.sin(a)*r*0.6,14,0,Math.PI*2);ctx.stroke();
      }
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Void Bloom Lattice",
  tags:["portal","void","rift"],
  description:"Void Bloom Lattice — particle effect with dynamic motion",
  code:`// Void Bloom Lattice animation code`,
  animator:(c,ctx,mouse)=>{
    let t=0,rings=[],debris=[],id;
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(5,0,10,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      if(Math.random()<0.04)rings.push({r:0,life:1,twist:0});
      rings.forEach((r,j)=>{
        r.r+=3;r.life-=0.015;
        for(let k=0;k<30;k++){
          const a=k/30*Math.PI*2+r.r*r.twist;
          const wobble=Math.sin(a*3+t)*5;
          const x=mouse.x+Math.cos(a)*(r.r+wobble);
          const y=mouse.y+Math.sin(a)*(r.r+wobble)*0.9;
          ctx.fillStyle=`rgba(200,0,255,${r.life*0.6})`;
          ctx.fillRect(x,y,2,2);
        }
        if(r.life<=0)rings.splice(j,1);
      });
      for(let j=0;j<3;j++){
        const a=j/3*Math.PI*2+t*(0.8);
        const r=20+Math.sin(t*2)*10;
        ctx.strokeStyle=`rgba(200,0,255,0.4)`;
        ctx.lineWidth=2;
        ctx.beginPath();ctx.arc(mouse.x+Math.cos(a)*r,mouse.y+Math.sin(a)*r*0.6,5,0,Math.PI*2);ctx.stroke();
      }
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Dimensional Halo Flow",
  tags:["void","rift","dimensional"],
  description:"Dimensional Halo Flow — particle effect with dynamic motion",
  code:`// Dimensional Halo Flow animation code`,
  animator:(c,ctx,mouse)=>{
    let t=0,rings=[],debris=[],id;
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(5,0,10,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      if(Math.random()<0.04)rings.push({r:0,life:1,twist:0.1});
      rings.forEach((r,j)=>{
        r.r+=4;r.life-=0.018;
        for(let k=0;k<31;k++){
          const a=k/31*Math.PI*2+r.r*r.twist;
          const wobble=Math.sin(a*4+t)*6;
          const x=mouse.x+Math.cos(a)*(r.r+wobble);
          const y=mouse.y+Math.sin(a)*(r.r+wobble)*1;
          ctx.fillStyle=`rgba(200,0,255,${r.life*0.6})`;
          ctx.fillRect(x,y,2,2);
        }
        if(r.life<=0)rings.splice(j,1);
      });
      for(let j=0;j<4;j++){
        const a=j/4*Math.PI*2+t*(1.1);
        const r=21+Math.sin(t*3)*11;
        ctx.strokeStyle=`rgba(200,0,255,0.4)`;
        ctx.lineWidth=2;
        ctx.beginPath();ctx.arc(mouse.x+Math.cos(a)*r,mouse.y+Math.sin(a)*r*0.6,6,0,Math.PI*2);ctx.stroke();
      }
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Reality Bloom Net",
  tags:["rift","dimensional","warp"],
  description:"Reality Bloom Net — particle effect with dynamic motion",
  code:`// Reality Bloom Net animation code`,
  animator:(c,ctx,mouse)=>{
    let t=0,rings=[],debris=[],id;
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(5,0,10,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      if(Math.random()<0.04)rings.push({r:0,life:1,twist:0.2});
      rings.forEach((r,j)=>{
        r.r+=5;r.life-=0.020999999999999998;
        for(let k=0;k<32;k++){
          const a=k/32*Math.PI*2+r.r*r.twist;
          const wobble=Math.sin(a*5+t)*7;
          const x=mouse.x+Math.cos(a)*(r.r+wobble);
          const y=mouse.y+Math.sin(a)*(r.r+wobble)*0.5;
          ctx.fillStyle=`rgba(200,0,255,${r.life*0.6})`;
          ctx.fillRect(x,y,2,2);
        }
        if(r.life<=0)rings.splice(j,1);
      });
      for(let j=0;j<5;j++){
        const a=j/5*Math.PI*2+t*(0.5);
        const r=22+Math.sin(t*4)*12;
        ctx.strokeStyle=`rgba(200,0,255,0.4)`;
        ctx.lineWidth=2;
        ctx.beginPath();ctx.arc(mouse.x+Math.cos(a)*r,mouse.y+Math.sin(a)*r*0.6,7,0,Math.PI*2);ctx.stroke();
      }
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Gate Core Pulse",
  tags:["dimensional","warp","portal"],
  description:"Gate Core Pulse — particle effect with dynamic motion",
  code:`// Gate Core Pulse animation code`,
  animator:(c,ctx,mouse)=>{
    let t=0,rings=[],debris=[],id;
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(5,0,10,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      if(Math.random()<0.04)rings.push({r:0,life:1,twist:0.30000000000000004});
      rings.forEach((r,j)=>{
        r.r+=6;r.life-=0.024;
        for(let k=0;k<33;k++){
          const a=k/33*Math.PI*2+r.r*r.twist;
          const wobble=Math.sin(a*6+t)*8;
          const x=mouse.x+Math.cos(a)*(r.r+wobble);
          const y=mouse.y+Math.sin(a)*(r.r+wobble)*0.6;
          ctx.fillStyle=`rgba(200,0,255,${r.life*0.6})`;
          ctx.fillRect(x,y,2,2);
        }
        if(r.life<=0)rings.splice(j,1);
      });
      for(let j=0;j<6;j++){
        const a=j/6*Math.PI*2+t*(0.8);
        const r=23+Math.sin(t*5)*13;
        ctx.strokeStyle=`rgba(200,0,255,0.4)`;
        ctx.lineWidth=2;
        ctx.beginPath();ctx.arc(mouse.x+Math.cos(a)*r,mouse.y+Math.sin(a)*r*0.6,8,0,Math.PI*2);ctx.stroke();
      }
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Portal Bloom Grid",
  tags:["warp","portal","void"],
  description:"Portal Bloom Grid — particle effect with dynamic motion",
  code:`// Portal Bloom Grid animation code`,
  animator:(c,ctx,mouse)=>{
    let t=0,rings=[],debris=[],id;
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(5,0,10,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      if(Math.random()<0.04)rings.push({r:0,life:1,twist:0.4});
      rings.forEach((r,j)=>{
        r.r+=7;r.life-=0.027;
        for(let k=0;k<34;k++){
          const a=k/34*Math.PI*2+r.r*r.twist;
          const wobble=Math.sin(a*7+t)*9;
          const x=mouse.x+Math.cos(a)*(r.r+wobble);
          const y=mouse.y+Math.sin(a)*(r.r+wobble)*0.7;
          ctx.fillStyle=`rgba(200,0,255,${r.life*0.6})`;
          ctx.fillRect(x,y,2,2);
        }
        if(r.life<=0)rings.splice(j,1);
      });
      for(let j=0;j<7;j++){
        const a=j/7*Math.PI*2+t*(1.1);
        const r=24+Math.sin(t*2)*14;
        ctx.strokeStyle=`rgba(200,0,255,0.4)`;
        ctx.lineWidth=2;
        ctx.beginPath();ctx.arc(mouse.x+Math.cos(a)*r,mouse.y+Math.sin(a)*r*0.6,9,0,Math.PI*2);ctx.stroke();
      }
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Warp Bloom Storm",
  tags:["portal","void","rift"],
  description:"Warp Bloom Storm — particle effect with dynamic motion",
  code:`// Warp Bloom Storm animation code`,
  animator:(c,ctx,mouse)=>{
    let t=0,rings=[],debris=[],id;
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(5,0,10,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      if(Math.random()<0.04)rings.push({r:0,life:1,twist:0});
      rings.forEach((r,j)=>{
        r.r+=3;r.life-=0.015;
        for(let k=0;k<35;k++){
          const a=k/35*Math.PI*2+r.r*r.twist;
          const wobble=Math.sin(a*3+t)*10;
          const x=mouse.x+Math.cos(a)*(r.r+wobble);
          const y=mouse.y+Math.sin(a)*(r.r+wobble)*0.8;
          ctx.fillStyle=`rgba(200,0,255,${r.life*0.6})`;
          ctx.fillRect(x,y,2,2);
        }
        if(r.life<=0)rings.splice(j,1);
      });
      for(let j=0;j<3;j++){
        const a=j/3*Math.PI*2+t*(0.5);
        const r=25+Math.sin(t*3)*15;
        ctx.strokeStyle=`rgba(200,0,255,0.4)`;
        ctx.lineWidth=2;
        ctx.beginPath();ctx.arc(mouse.x+Math.cos(a)*r,mouse.y+Math.sin(a)*r*0.6,10,0,Math.PI*2);ctx.stroke();
      }
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Rift Halo Mesh",
  tags:["void","rift","dimensional"],
  description:"Rift Halo Mesh — particle effect with dynamic motion",
  code:`// Rift Halo Mesh animation code`,
  animator:(c,ctx,mouse)=>{
    let t=0,rings=[],debris=[],id;
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(5,0,10,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      if(Math.random()<0.04)rings.push({r:0,life:1,twist:0.1});
      rings.forEach((r,j)=>{
        r.r+=4;r.life-=0.018;
        for(let k=0;k<36;k++){
          const a=k/36*Math.PI*2+r.r*r.twist;
          const wobble=Math.sin(a*4+t)*11;
          const x=mouse.x+Math.cos(a)*(r.r+wobble);
          const y=mouse.y+Math.sin(a)*(r.r+wobble)*0.9;
          ctx.fillStyle=`rgba(200,0,255,${r.life*0.6})`;
          ctx.fillRect(x,y,2,2);
        }
        if(r.life<=0)rings.splice(j,1);
      });
      for(let j=0;j<4;j++){
        const a=j/4*Math.PI*2+t*(0.8);
        const r=26+Math.sin(t*4)*16;
        ctx.strokeStyle=`rgba(200,0,255,0.4)`;
        ctx.lineWidth=2;
        ctx.beginPath();ctx.arc(mouse.x+Math.cos(a)*r,mouse.y+Math.sin(a)*r*0.6,11,0,Math.PI*2);ctx.stroke();
      }
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Void Bloom Field",
  tags:["rift","dimensional","warp"],
  description:"Void Bloom Field — particle effect with dynamic motion",
  code:`// Void Bloom Field animation code`,
  animator:(c,ctx,mouse)=>{
    let t=0,rings=[],debris=[],id;
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(5,0,10,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      if(Math.random()<0.04)rings.push({r:0,life:1,twist:0.2});
      rings.forEach((r,j)=>{
        r.r+=5;r.life-=0.020999999999999998;
        for(let k=0;k<37;k++){
          const a=k/37*Math.PI*2+r.r*r.twist;
          const wobble=Math.sin(a*5+t)*12;
          const x=mouse.x+Math.cos(a)*(r.r+wobble);
          const y=mouse.y+Math.sin(a)*(r.r+wobble)*1;
          ctx.fillStyle=`rgba(200,0,255,${r.life*0.6})`;
          ctx.fillRect(x,y,2,2);
        }
        if(r.life<=0)rings.splice(j,1);
      });
      for(let j=0;j<5;j++){
        const a=j/5*Math.PI*2+t*(1.1);
        const r=27+Math.sin(t*5)*17;
        ctx.strokeStyle=`rgba(200,0,255,0.4)`;
        ctx.lineWidth=2;
        ctx.beginPath();ctx.arc(mouse.x+Math.cos(a)*r,mouse.y+Math.sin(a)*r*0.6,12,0,Math.PI*2);ctx.stroke();
      }
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Dimensional Orbit Halo",
  tags:["dimensional","warp","portal"],
  description:"Dimensional Orbit Halo — particle effect with dynamic motion",
  code:`// Dimensional Orbit Halo animation code`,
  animator:(c,ctx,mouse)=>{
    let t=0,rings=[],debris=[],id;
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(5,0,10,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      if(Math.random()<0.04)rings.push({r:0,life:1,twist:0.30000000000000004});
      rings.forEach((r,j)=>{
        r.r+=6;r.life-=0.024;
        for(let k=0;k<38;k++){
          const a=k/38*Math.PI*2+r.r*r.twist;
          const wobble=Math.sin(a*6+t)*13;
          const x=mouse.x+Math.cos(a)*(r.r+wobble);
          const y=mouse.y+Math.sin(a)*(r.r+wobble)*0.5;
          ctx.fillStyle=`rgba(200,0,255,${r.life*0.6})`;
          ctx.fillRect(x,y,2,2);
        }
        if(r.life<=0)rings.splice(j,1);
      });
      for(let j=0;j<6;j++){
        const a=j/6*Math.PI*2+t*(0.5);
        const r=28+Math.sin(t*2)*18;
        ctx.strokeStyle=`rgba(200,0,255,0.4)`;
        ctx.lineWidth=2;
        ctx.beginPath();ctx.arc(mouse.x+Math.cos(a)*r,mouse.y+Math.sin(a)*r*0.6,13,0,Math.PI*2);ctx.stroke();
      }
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Reality Pulse Bloom",
  tags:["warp","portal","void"],
  description:"Reality Pulse Bloom — particle effect with dynamic motion",
  code:`// Reality Pulse Bloom animation code`,
  animator:(c,ctx,mouse)=>{
    let t=0,rings=[],debris=[],id;
    const loop=()=>{
      t+=0.04;
      ctx.fillStyle="rgba(5,0,10,0.2)";
      ctx.fillRect(0,0,c.width,c.height);
      if(Math.random()<0.04)rings.push({r:0,life:1,twist:0.4});
      rings.forEach((r,j)=>{
        r.r+=7;r.life-=0.027;
        for(let k=0;k<39;k++){
          const a=k/39*Math.PI*2+r.r*r.twist;
          const wobble=Math.sin(a*7+t)*14;
          const x=mouse.x+Math.cos(a)*(r.r+wobble);
          const y=mouse.y+Math.sin(a)*(r.r+wobble)*0.6;
          ctx.fillStyle=`rgba(200,0,255,${r.life*0.6})`;
          ctx.fillRect(x,y,2,2);
        }
        if(r.life<=0)rings.splice(j,1);
      });
      for(let j=0;j<7;j++){
        const a=j/7*Math.PI*2+t*(0.8);
        const r=29+Math.sin(t*3)*19;
        ctx.strokeStyle=`rgba(200,0,255,0.4)`;
        ctx.lineWidth=2;
        ctx.beginPath();ctx.arc(mouse.x+Math.cos(a)*r,mouse.y+Math.sin(a)*r*0.6,14,0,Math.PI*2);ctx.stroke();
      }
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

];

// ═══════════════════════════════════════════════════════════════
//  COMBINED EXPORT — all 500 effects
// ═══════════════════════════════════════════════════════════════

export const allEffects = [
  ...quantumEffects,
  ...biomechEffects,
  ...weaponEffects,
  ...hudEffects,
  ...architectureEffects,
  ...liquidMetalEffects,
  ...typographyEffects,
  ...logoEffects,
  ...dataNetworkEffects,
  ...portalEffects
];

export default allEffects;