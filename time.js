// ─────────────────────────────────────────────────
//  TIME EFFECTS
// ─────────────────────────────────────────────────

export const timeEffects = [

{
  name:"Time Echo",
  tags:["time","trail","motion"],
  description:"Delayed ghost copies of cursor movement",
  code:`// Store cursor history and replay with delay`,
  animator:(c,ctx,mouse)=>{
    let history=[],id;

    const loop=()=>{
      ctx.fillStyle="rgba(0,0,0,0.2)";
      ctx.fillRect(0,0,c.width,c.height);

      history.push({x:mouse.x,y:mouse.y});
      if(history.length>60) history.shift();

      history.forEach((p,i)=>{
        ctx.fillStyle=`rgba(0,255,200,${i/60})`;
        ctx.beginPath();
        ctx.arc(p.x,p.y,6,0,Math.PI*2);
        ctx.fill();
      });

      id=requestAnimationFrame(loop);
    };

    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Temporal Rewind",
  tags:["time","reverse","physics"],
  description:"Particles move forward then reverse time",
  code:`// Reverse velocity when timer flips`,
  animator:(c,ctx)=>{
    let ps=[],t=0,dir=1,id;

    for(let i=0;i<80;i++)
      ps.push({x:Math.random()*c.width,y:Math.random()*c.height,vx:(Math.random()-.5)*3,vy:(Math.random()-.5)*3});

    const loop=()=>{
      t++;
      if(t%180===0) dir*=-1;

      ctx.fillStyle="rgba(0,0,10,0.25)";
      ctx.fillRect(0,0,c.width,c.height);

      ps.forEach(p=>{
        p.x+=p.vx*dir;
        p.y+=p.vy*dir;

        ctx.fillStyle="#0ff";
        ctx.fillRect(p.x,p.y,2,2);
      });

      id=requestAnimationFrame(loop);
    };

    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Time Freeze Bubble",
  tags:["time","field","interaction"],
  description:"Area around cursor slows particle motion",
  code:`// Velocity scaled by distance to cursor`,
  animator:(c,ctx,mouse)=>{
    let ps=[],id;

    for(let i=0;i<120;i++)
      ps.push({x:Math.random()*c.width,y:Math.random()*c.height,vx:(Math.random()-.5)*4,vy:(Math.random()-.5)*4});

    const loop=()=>{
      ctx.fillStyle="rgba(0,0,0,0.2)";
      ctx.fillRect(0,0,c.width,c.height);

      ps.forEach(p=>{
        const d=Math.hypot(p.x-mouse.x,p.y-mouse.y);
        const slow=Math.min(1,d/120);

        p.x+=p.vx*slow;
        p.y+=p.vy*slow;

        ctx.fillStyle="#fff";
        ctx.fillRect(p.x,p.y,2,2);
      });

      ctx.strokeStyle="#0ff";
      ctx.beginPath();
      ctx.arc(mouse.x,mouse.y,120,0,Math.PI*2);
      ctx.stroke();

      id=requestAnimationFrame(loop);
    };

    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Chrono Rings",
  tags:["time","pulse","wave"],
  description:"Expanding rings represent time pulses",
  code:`// Radius grows, alpha fades`,
  animator:(c,ctx,mouse)=>{
    let rings=[],id;

    const loop=()=>{
      ctx.fillStyle="rgba(0,0,0,0.25)";
      ctx.fillRect(0,0,c.width,c.height);

      if(Math.random()<0.05)
        rings.push({r:0});

      rings.forEach((r,i)=>{
        r.r+=3;

        ctx.strokeStyle=`rgba(0,255,200,${1-r.r/300})`;
        ctx.beginPath();
        ctx.arc(mouse.x,mouse.y,r.r,0,Math.PI*2);
        ctx.stroke();

        if(r.r>300) rings.splice(i,1);
      });

      id=requestAnimationFrame(loop);
    };

    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Motion History Field",
  tags:["time","data","visualization"],
  description:"Past cursor paths form glowing timeline",
  code:`// Polyline from stored positions`,
  animator:(c,ctx,mouse)=>{
    let path=[],id;

    const loop=()=>{
      ctx.fillStyle="rgba(0,0,0,0.15)";
      ctx.fillRect(0,0,c.width,c.height);

      path.push({x:mouse.x,y:mouse.y});
      if(path.length>100) path.shift();

      ctx.strokeStyle="#0ff";
      ctx.beginPath();
path.forEach((p,i)=>{
  if(i===0) ctx.moveTo(p.x,p.y);
  else ctx.lineTo(p.x,p.y);
});
      ctx.stroke();

      id=requestAnimationFrame(loop);
    };

    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Time Particles Orbit",
  tags:["time","orbit","loop"],
  description:"Particles orbit at different time speeds",
  code:`// Angle increment varies per particle`,
  animator:(c,ctx,mouse)=>{
    let ps=[],id;

    for(let i=0;i<60;i++)
      ps.push({a:Math.random()*Math.PI*2,r:40+Math.random()*120,s:Math.random()*0.05+0.01});

    const loop=()=>{
      ctx.fillStyle="rgba(0,0,0,0.2)";
      ctx.fillRect(0,0,c.width,c.height);

      ps.forEach(p=>{
        p.a+=p.s;

        const x=mouse.x+Math.cos(p.a)*p.r;
        const y=mouse.y+Math.sin(p.a)*p.r;

        ctx.fillStyle="#0ff";
        ctx.fillRect(x,y,2,2);
      });

      id=requestAnimationFrame(loop);
    };

    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Clock Fragments",
  tags:["time","radial","mechanical"],
  description:"Rotating clock hands with different speeds",
  code:`// Multiple rotating lines from center`,
  animator:(c,ctx,mouse)=>{
    let t=0,id;

    const loop=()=>{
      t+=0.02;

      ctx.fillStyle="rgba(0,0,0,0.3)";
      ctx.fillRect(0,0,c.width,c.height);

      for(let i=1;i<6;i++){
        ctx.strokeStyle="#0ff";
        ctx.beginPath();
        ctx.moveTo(mouse.x,mouse.y);
        ctx.lineTo(
          mouse.x+Math.cos(t*i)*80,
          mouse.y+Math.sin(t*i)*80
        );
        ctx.stroke();
      }

      id=requestAnimationFrame(loop);
    };

    return{start:loop,stop:()=>cancelAnimationFrame(id)};
  }
},

{
  name:"Temporal Scanlines",
  tags:["time","glitch","scan"],
  description:"Horizontal time slices move at different speeds",
  code:`// Copy canvas rows with offset`,
  animator:(c,ctx)=>{
  let t = 0, id;

  // offscreen buffer
  const buffer = document.createElement("canvas");
  const btx = buffer.getContext("2d");

  const loop = () => {
    t += 0.03;

    // match size
    buffer.width = c.width;
    buffer.height = c.height;

    // copy current frame into buffer
    btx.drawImage(c, 0, 0);

    // soft fade for trails
    ctx.fillStyle = "rgba(0,0,0,0.18)";
    ctx.fillRect(0, 0, c.width, c.height);

    for (let y = 0; y < c.height; y += 3) {

      // each row moves at different time speed
      const wave = Math.sin(t * 2 + y * 0.05);

      const offset = wave * 14;

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
}
];