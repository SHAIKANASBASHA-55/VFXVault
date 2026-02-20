// ─────────────────────────────────────────────────
//  OPTICAL EFFECTS
// ─────────────────────────────────────────────────

export const opticalEffects = [

{
  name: "Moiré Field",
  tags: ["optical","illusion","pattern"],
  description: "Interference rings bend and shift around the cursor",
  code: `// Two radial line fields with slight offset
const phase = sin(t)*20;
drawLines(cx+phase);
drawLines(cx-phase);`,
  animator:(c,ctx,mouse)=>{
    let t=0,id;
    const loop=()=>{
      t+=0.02;
      ctx.fillStyle="rgba(0,0,0,0.15)";
      ctx.fillRect(0,0,c.width,c.height);

      for(let i=0;i<200;i++){
        const a=i*0.1;
        const r=i*2;
        const x1=mouse.x+Math.cos(a)*r;
        const y1=mouse.y+Math.sin(a)*r;
        const x2=mouse.x+Math.cos(a+t)*r;
        const y2=mouse.y+Math.sin(a+t)*r;

        ctx.strokeStyle="rgba(0,255,255,0.15)";
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
  name:"Refraction Lens",
  tags:["optical","glass","distortion"],
  description:"Cursor acts like a bending glass lens",
  code:`// Sample grid offset by distance from cursor
const power = 120 / dist;`,
  animator:(c,ctx,mouse)=>{
    let id;
    const grid=25;
    const loop=()=>{
      ctx.fillStyle="#001015";
      ctx.fillRect(0,0,c.width,c.height);

      for(let x=0;x<c.width;x+=grid){
        for(let y=0;y<c.height;y+=grid){
          const dx=x-mouse.x;
          const dy=y-mouse.y;
          const d=Math.hypot(dx,dy);
          const offset=120/(d+40);

          ctx.fillStyle="#0ff";
          ctx.fillRect(x+dx/d*offset,y+dy/d*offset,2,2);
        }
      }
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Chromatic Focus",
  tags:["optical","rgb","lens"],
  description:"RGB channels separate based on cursor distance",
  code:`// Draw three offset circles for chromatic aberration`,
  animator:(c,ctx,mouse)=>{
    let id,t=0;
    const loop=()=>{
      t+=0.03;
      ctx.fillStyle="rgba(0,0,0,0.2)";
      ctx.fillRect(0,0,c.width,c.height);

      const r=40+Math.sin(t)*10;

      ["red","cyan","blue"].forEach((col,i)=>{
        ctx.beginPath();
        ctx.strokeStyle=col;
        ctx.arc(mouse.x+(i-1)*5,mouse.y,r,0,Math.PI*2);
        ctx.stroke();
      });

      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Parallax Grid",
  tags:["optical","depth","grid"],
  description:"Layered grid creates fake depth when cursor moves",
  code:`// Multiple grids moving at different speeds`,
  animator:(c,ctx,mouse)=>{
    let id;
    const loop=()=>{
      ctx.fillStyle="#000";
      ctx.fillRect(0,0,c.width,c.height);

      for(let l=1;l<5;l++){
        ctx.strokeStyle=`rgba(0,255,200,${0.15*l})`;

        for(let x=0;x<c.width;x+=40){
          ctx.beginPath();
          ctx.moveTo(x+l*(mouse.x-c.width/2)/50,0);
          ctx.lineTo(x+l*(mouse.x-c.width/2)/50,c.height);
          ctx.stroke();
        }
      }

      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Heat Haze",
  tags:["optical","distortion","wave"],
  description:"Shimmering air distortion around cursor",
  code:`// Sine-wave horizontal displacement`,
animator:(c,ctx,mouse)=>{
  let t = 0, id;

  // offscreen canvas
  const buffer = document.createElement("canvas");
  const btx = buffer.getContext("2d");

  const loop = () => {
    t += 0.05;

    // match size
    buffer.width = c.width;
    buffer.height = c.height;

    // copy current frame into buffer
    btx.drawImage(c, 0, 0);

    // soft fade
    ctx.fillStyle = "rgba(230, 219, 219, 0.15)";
    ctx.fillRect(0, 0, c.width, c.height);

    // distortion zone around cursor
    for (let y = 0; y < c.height; y += 3) {

      const dist = Math.abs(y - mouse.y);
      const strength = Math.max(0, 1 - dist / 120);

      const offset =
        Math.sin(y * 0.04 + t * 4) *
        12 *
        strength;

      ctx.drawImage(
        buffer,
        0, y,
        c.width, 3,
        offset, y,
        c.width, 3
      );
    }

    id = requestAnimationFrame(loop);
  };

  return {
    start: loop,
    stop: () => cancelAnimationFrame(id)
  };
}
},

{
  name:"Polarization Bands",
  tags:["optical","wave","science"],
  description:"Interference colors rotate with cursor angle",
  code:`// Hue based on angle from center`,
  animator:(c,ctx,mouse)=>{
    let id;
    const loop=()=>{
      for(let x=0;x<c.width;x+=6){
        for(let y=0;y<c.height;y+=6){
          const angle=Math.atan2(y-mouse.y,x-mouse.x);
          const hue=(angle*180/Math.PI+360)%360;
          ctx.fillStyle=`hsl(${hue},80%,50%)`;
          ctx.fillRect(x,y,6,6);
        }
      }
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Fish-Eye Warp",
  tags:["optical","lens","distortion"],
  description:"Scene curves toward cursor like a fish-eye lens",
  code:`// Radial scaling from cursor`,
  animator:(c,ctx,mouse)=>{
    let id;
    const loop=()=>{
      ctx.fillStyle="#000";
      ctx.fillRect(0,0,c.width,c.height);

      for(let i=0;i<400;i++){
        const x=Math.random()*c.width;
        const y=Math.random()*c.height;
        const dx=x-mouse.x;
        const dy=y-mouse.y;
        const d=Math.hypot(dx,dy);
        const scale=1+200/(d+200);

        ctx.fillStyle="#0ff";
        ctx.fillRect(mouse.x+dx/scale,mouse.y+dy/scale,2,2);
      }
      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Impossible Tunnel",
  tags:["optical","illusion","depth"],
  description:"Infinite tunnel illusion that follows cursor",
  code:`// Nested rectangles scaling toward center`,
  animator:(c,ctx,mouse)=>{
    let t=0,id;
    const loop=()=>{
      t+=0.02;
      ctx.fillStyle="rgba(0,0,0,0.2)";
      ctx.fillRect(0,0,c.width,c.height);

      for(let i=0;i<30;i++){
        const s=i*20+t*50%20;
        ctx.strokeStyle=`rgba(0,255,200,${1-i/30})`;
        ctx.strokeRect(mouse.x-s/2,mouse.y-s/2,s,s);
      }

      id=requestAnimationFrame(loop);
    };
    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
}

];