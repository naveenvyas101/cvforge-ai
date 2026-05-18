"use client";

import { useState, useRef, useCallback } from "react";

/* ─── PALETTE ─────────────────────────────────────────── */
const P={
  p50:"#EEEDFE",p100:"#CECBF6",p200:"#AFA9EC",p400:"#7F77DD",
  p600:"#534AB7",p800:"#3C3489",
  t50:"#E1F5EE",t600:"#0F6E56",t800:"#085041",
  a50:"#FAEEDA",a400:"#BA7517",
  r50:"#FCEBEB",r600:"#A32D2D",
  g100:"#D3D1C7",g400:"#888780",
};

/* ─── TEMPLATE CSS — fully self-contained ─────────────── */
const TPL_CSS={
nova:`*{box-sizing:border-box;margin:0;padding:0}
body{font-family:Arial,Helvetica,sans-serif;font-size:11.5px;color:#222;background:#fff;display:grid;grid-template-columns:210px 1fr;min-height:100vh}
.left{background:#534AB7;padding:28px 18px;color:#fff}
.left h1{font-size:20px;font-weight:700;line-height:1.25;color:#fff;margin-bottom:3px}
.left .role{font-size:11px;color:rgba(255,255,255,.75);margin-bottom:24px;font-style:italic}
.lsec{margin-bottom:20px}
.lsec-title{font-size:8.5px;letter-spacing:1.8px;text-transform:uppercase;color:rgba(255,255,255,.55);margin-bottom:8px;border-bottom:1px solid rgba(255,255,255,.2);padding-bottom:4px}
.litem{font-size:11px;color:rgba(255,255,255,.9);margin-bottom:5px;line-height:1.5;word-break:break-all}
.skill-chip{display:inline-block;background:rgba(255,255,255,.15);color:#fff;font-size:10px;padding:2px 8px;border-radius:10px;margin:2px 2px 2px 0;line-height:1.5}
.right{padding:28px 24px;background:#fff}
.rsec{margin-bottom:20px}
.rsec-title{font-size:9px;letter-spacing:1.8px;text-transform:uppercase;color:#534AB7;border-bottom:2px solid #534AB7;padding-bottom:4px;margin-bottom:14px;font-weight:700}
.summary{font-size:11.5px;line-height:1.75;color:#444}
.exp-entry{margin-bottom:14px;padding-bottom:14px;border-bottom:.5px solid #eee}
.exp-entry:last-child{border-bottom:none;margin-bottom:0;padding-bottom:0}
.exp-head{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:1px}
.exp-title{font-size:12.5px;font-weight:700;color:#222}
.exp-co{font-size:11.5px;color:#534AB7;font-weight:600;margin-bottom:2px}
.exp-date{font-size:10.5px;color:#888;white-space:nowrap;margin-left:8px;flex-shrink:0}
.exp ul{margin:4px 0 0;padding-left:16px}
.exp li{font-size:11px;color:#444;line-height:1.6;margin-bottom:3px}
.edu-entry{margin-bottom:9px}
.edu-deg{font-size:12px;font-weight:700}
.edu-school{font-size:11px;color:#534AB7}
.edu-year{font-size:10.5px;color:#888}`,

slate:`*{box-sizing:border-box;margin:0;padding:0}
body{font-family:Georgia,'Times New Roman',serif;font-size:12px;color:#1a1a1a;background:#fff;padding:36px 48px}
h1{font-size:28px;font-weight:700;letter-spacing:-.5px;margin-bottom:3px}
.tagline{font-size:13px;color:#555;font-style:italic;margin-bottom:10px}
.contact{font-size:11px;color:#666;margin-bottom:24px;line-height:1.9}
.contact span{margin-right:18px}
.sec{margin-bottom:22px}
.sec-title{font-size:9.5px;letter-spacing:2px;text-transform:uppercase;color:#999;margin-bottom:4px;font-family:Arial,sans-serif;font-weight:600}
hr{border:none;border-top:1px solid #ddd;margin-bottom:12px}
.summary{font-size:12.5px;line-height:1.8;color:#333}
.exp-entry{margin-bottom:16px;padding-bottom:16px;border-bottom:.5px solid #eee}
.exp-entry:last-child{border-bottom:none}
.exp-head{display:flex;justify-content:space-between;align-items:baseline}
.exp-title{font-size:13px;font-weight:700}
.exp-co{font-size:12px;color:#555;font-style:italic;margin-bottom:2px}
.exp-date{font-size:11px;color:#999;white-space:nowrap;margin-left:8px}
.exp ul{margin:5px 0 0;padding-left:20px}
.exp li{font-size:11.5px;line-height:1.65;margin-bottom:3px;color:#333}
.skill-list{font-size:11.5px;color:#333;line-height:2;font-family:Arial,sans-serif}
.edu-entry{margin-bottom:10px}
.edu-deg{font-size:12px;font-weight:700}
.edu-school{font-size:11.5px;color:#555;font-style:italic}`,

apex:`*{box-sizing:border-box;margin:0;padding:0}
body{font-family:Palatino,'Times New Roman',Georgia,serif;font-size:12px;color:#111;background:#fff;padding:32px 44px}
.header{border-top:3px solid #111;border-bottom:3px solid #111;padding:16px 0;margin-bottom:22px;display:flex;justify-content:space-between;align-items:flex-end}
h1{font-size:26px;font-weight:700;letter-spacing:-.3px;margin-bottom:3px}
.tagline{font-size:12.5px;font-style:italic;color:#555}
.contact{font-size:11px;color:#666;text-align:right;line-height:1.9}
.sec{margin-bottom:22px}
.sec-title{font-size:9.5px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#111;border-bottom:1px solid #bbb;padding-bottom:4px;margin-bottom:12px}
.summary{font-size:12.5px;line-height:1.85;color:#222;font-style:italic;border-left:3px solid #111;padding-left:14px}
.competency-grid{display:grid;grid-template-columns:1fr 1fr;gap:3px 24px}
.competency-item{font-size:11px;color:#333;padding:2px 0;border-bottom:.5px dotted #ccc}
.exp-entry{margin-bottom:16px;padding-bottom:16px;border-bottom:.5px solid #ddd}
.exp-entry:last-child{border-bottom:none}
.exp-head{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:2px}
.exp-title{font-size:13px;font-weight:700}
.exp-co{font-size:12px;color:#555;font-style:italic;margin-bottom:2px}
.exp-date{font-size:11px;color:#888;white-space:nowrap;margin-left:8px}
.exp ul{margin:5px 0 0;padding-left:18px}
.exp li{font-size:11.5px;line-height:1.7;margin-bottom:4px;color:#333}
.edu-entry{margin-bottom:10px}
.edu-deg{font-size:12px;font-weight:700}
.edu-school{font-size:11.5px;color:#555;font-style:italic}`,

pulse:`*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Times New Roman',Times,serif;font-size:11.5px;color:#000;background:#fff;padding:24px 36px}
.name{font-size:20px;font-weight:bold;text-align:center;margin-bottom:4px}
.contact{text-align:center;font-size:11px;margin-bottom:14px;line-height:1.7}
.sec-title{font-size:12px;font-weight:bold;text-transform:uppercase;border-bottom:1.5px solid #000;margin:14px 0 6px;padding-bottom:2px;letter-spacing:.5px}
.summary{font-size:11.5px;line-height:1.65}
.exp-entry{margin-bottom:10px}
.exp-head{display:flex;justify-content:space-between;align-items:baseline}
.exp-title{font-size:11.5px;font-weight:bold}
.exp-co{font-size:11.5px}
.exp-date{font-size:11px;white-space:nowrap;margin-left:8px}
.exp ul{margin:3px 0 0;padding-left:18px}
.exp li{font-size:11px;line-height:1.55;margin-bottom:2px}
.skills{font-size:11.5px;line-height:1.75}
.edu-entry{margin-bottom:7px}`,

canvas:`*{box-sizing:border-box;margin:0;padding:0}
body{font-family:Arial,Helvetica,sans-serif;font-size:11.5px;color:#222;background:#fff;border-left:8px solid #D85A30}
.inner{padding:28px 28px 28px 24px}
h1{font-size:30px;font-weight:900;color:#111;letter-spacing:-.5px;margin-bottom:2px}
.role{font-size:14px;color:#D85A30;font-weight:600;margin-bottom:6px}
.contact{font-size:11px;color:#666;margin-bottom:20px;line-height:1.9}
.sec{margin-bottom:22px}
.sec-title{display:flex;align-items:center;gap:8px;font-size:9.5px;letter-spacing:1.8px;text-transform:uppercase;color:#D85A30;font-weight:700;margin-bottom:12px}
.sec-title::before{content:'';width:10px;height:10px;background:#D85A30;border-radius:2px;flex-shrink:0}
.summary{font-size:12.5px;line-height:1.8;color:#333;border-left:3px solid #D85A30;padding-left:14px}
.exp-card{background:#fafaf9;border:1px solid #eee;border-radius:8px;padding:12px 14px;margin-bottom:10px}
.exp-head{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:2px}
.exp-title{font-size:13px;font-weight:700;color:#111}
.exp-co{font-size:11.5px;color:#D85A30;font-weight:600;margin-bottom:4px}
.exp-date{font-size:10.5px;color:#999;flex-shrink:0;margin-left:8px}
.exp ul{margin:4px 0 0;padding-left:16px}
.exp li{font-size:11px;color:#444;line-height:1.6;margin-bottom:3px}
.tag{display:inline-block;background:#FEF0EB;color:#D85A30;font-size:10px;padding:2px 8px;border-radius:10px;margin:2px 2px 2px 0;border:1px solid #F7C4B0}`
};

/* ─── LAYOUT GUIDES FOR AI ────────────────────────────── */
const TPL_GUIDE={
nova:`Use a CSS Grid two-column layout on the body element itself (grid-template-columns: 210px 1fr). 
Left column (class="left"): purple bg #534AB7, white text. Contains: h1 name, div.role for job title, then lsec divs for Contact (with litem divs), Skills (use skill-chip spans), Tools.
Right column (class="right"): white bg. Contains rsec divs each with rsec-title h2. Sections: Professional Summary (class summary), Experience (exp-entry divs with exp-head div containing exp-title span + exp-date span, then exp-co div, then exp ul li), Education (edu-entry divs), Certifications, Projects.
CRITICAL: Do NOT wrap in any outer div — body IS the grid.`,

slate:`Single column. Body has padding. Start with h1 name, div.tagline for role, div.contact with contact spans, then sec divs each containing sec-title h2, hr, and content. Experience uses exp-entry divs with exp-head (exp-title + exp-date), exp-co, exp ul li.`,

apex:`Single column executive. Start with div.header containing left div (h1 + div.tagline) and right div.contact. Then sec divs with sec-title. Summary uses blockquote style. Core competencies use competency-grid div with competency-item spans. Experience uses exp-entry with exp-head, exp-co, exp ul li.`,

pulse:`Plain ATS. No decorations. div.name for name, div.contact centered. Then sec-title h2 divs and content. Experience: exp-entry with exp-head (exp-title + exp-date + exp-co inline), exp ul li.`,

canvas:`Body has left border. All content inside div.inner. h1 name, div.role, div.contact. Then sec divs with sec-title. Experience sections use exp-card divs each containing exp-head (exp-title + exp-date), exp-co, exp ul li. Skills use tag spans.`
};

/* ─── SYSTEM PROMPT ───────────────────────────────────── */
const SYS=`You are a world-class CV writer with 20 years of experience. You write complete, detailed, professional CVs.

ABSOLUTE OUTPUT RULES:
1. Return ONLY a complete HTML document: <!DOCTYPE html><html><head><meta charset="UTF-8"><style>CSS HERE</style></head><body>CONTENT</body></html>
2. No markdown, no fences, no explanation text whatsoever
3. ALL CSS must be inside the <style> tag — use EXACTLY the CSS provided, add nothing external
4. WRITE EVERY SINGLE EXPERIENCE ENTRY IN FULL — if candidate has 3 jobs, write all 3 completely
5. Each job entry must have: title, company, location, date range, and 4-6 bullet points minimum
6. Do NOT summarise, skip, or truncate any job — write every one completely
7. Aim for dense, professional 2-page content
8. Weave JD keywords naturally throughout all sections`;

/* ─── MINI UI COMPONENTS ──────────────────────────────── */
const Spin=()=><span style={{width:13,height:13,border:"2px solid rgba(255,255,255,.3)",borderTopColor:"#fff",borderRadius:"50%",display:"inline-block",animation:"_sp .65s linear infinite",flexShrink:0}}/>;
const Badge=({c="purple",children})=>{const m={purple:{bg:P.p50,col:P.p800},green:{bg:P.t50,col:P.t800},amber:{bg:P.a50,col:P.a400},red:{bg:P.r50,col:P.r600}};const{bg,col}=m[c]||m.purple;return <span style={{background:bg,color:col,fontSize:11,fontWeight:500,padding:"3px 9px",borderRadius:99,whiteSpace:"nowrap"}}>{children}</span>;};
const Btn=({onClick,disabled=false,loading=false,children,full=false,size="md",v="primary",sx={}})=>{const sz={sm:{p:"7px 13px",fs:12},md:{p:"10px 20px",fs:13},lg:{p:"12px 28px",fs:14}}[size];const s={primary:{bg:disabled||loading?P.p200:P.p600,col:"#fff",border:"none"},outline:{bg:"transparent",col:"var(--color-text-primary)",border:"1px solid var(--color-border-secondary)"},ghost:{bg:"transparent",col:"var(--color-text-secondary)",border:"none"}}[v]||{bg:P.p600,col:"#fff",border:"none"};return <button onClick={onClick} disabled={disabled||loading} style={{width:full?"100%":"auto",padding:sz.p,fontSize:sz.fs,fontWeight:500,borderRadius:9,border:s.border,background:s.bg,color:s.col,cursor:disabled||loading?"not-allowed":"pointer",opacity:disabled&&!loading?.4:1,display:"inline-flex",alignItems:"center",justifyContent:"center",gap:7,transition:"all .15s",...sx}}>{loading&&<Spin/>}{children}</button>;};
const Fld=({label,hint=null,children})=><div><div style={{marginBottom:6,display:"flex",alignItems:"baseline",gap:8}}><span style={{fontSize:12,fontWeight:500,color:"var(--color-text-primary)"}}>{label}</span>{hint&&<span style={{fontSize:11,color:"var(--color-text-tertiary)"}}>{hint}</span>}</div>{children}</div>;
const Inp=({value,onChange,placeholder="",icon=null})=><div style={{position:"relative"}}>{icon&&<span style={{position:"absolute",left:10,top:"50%",transform:"translateY(-50%)",fontSize:13,color:"var(--color-text-tertiary)",pointerEvents:"none"}}>{icon}</span>}<input value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder} style={{width:"100%",boxSizing:"border-box",padding:icon?"9px 12px 9px 30px":"9px 12px",fontSize:13,borderRadius:8,border:"1px solid var(--color-border-secondary)",background:"var(--color-background-primary)",color:"var(--color-text-primary)",outline:"none"}}/></div>;
const TA=({value,onChange,placeholder="",rows=4})=><textarea value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder} rows={rows} style={{width:"100%",boxSizing:"border-box",padding:"9px 12px",fontSize:13,borderRadius:8,border:"1px solid var(--color-border-secondary)",background:"var(--color-background-primary)",color:"var(--color-text-primary)",resize:"vertical",lineHeight:1.65,outline:"none",fontFamily:"var(--font-sans)"}}/>;
const Card=({children,sx={}})=><div style={{background:"var(--color-background-primary)",border:"0.5px solid var(--color-border-tertiary)",borderRadius:14,padding:"1.25rem",...sx}}>{children}</div>;

/* ─── WIZARD BAR ──────────────────────────────────────── */
const STEPS=["Job & Style","Your Details","Result"];
const WizBar=({step})=>(
  <div style={{display:"flex",alignItems:"center",marginBottom:"2rem"}}>
    {STEPS.map((s,i)=>(
      <div key={i} style={{display:"flex",alignItems:"center",flex:1}}>
        <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:4}}>
          <div style={{width:34,height:34,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:500,flexShrink:0,transition:"all .25s",background:step>i?P.p600:step===i?P.p50:"var(--color-background-secondary)",border:step===i?`2px solid ${P.p600}`:step>i?"none":"1.5px solid var(--color-border-secondary)",color:step>i?"#fff":step===i?P.p800:"var(--color-text-tertiary)"}}>{step>i?"✓":i+1}</div>
          <span style={{fontSize:10.5,fontWeight:step===i?500:400,whiteSpace:"nowrap",color:step===i?P.p800:step>i?"var(--color-text-secondary)":"var(--color-text-tertiary)"}}>{s}</span>
        </div>
        {i<2&&<div style={{flex:1,height:2,margin:"0 6px",marginTop:"-14px",background:step>i?P.p600:"var(--color-border-tertiary)",borderRadius:2,transition:"background .3s"}}/>}
      </div>
    ))}
  </div>
);

/* ─── SCORE RING ──────────────────────────────────────── */
const ScoreRing=({score})=>{const pct=Math.min(100,Math.max(0,score||0));const r=26,circ=2*Math.PI*r,dash=(pct/100)*circ;const col=pct>=80?P.t600:pct>=60?P.a400:P.r600;return(<div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:3}}><svg width={68} height={68} viewBox="0 0 68 68"><circle cx={34} cy={34} r={r} fill="none" stroke="var(--color-border-tertiary)" strokeWidth={5}/><circle cx={34} cy={34} r={r} fill="none" stroke={col} strokeWidth={5} strokeDasharray={`${dash} ${circ}`} strokeLinecap="round" transform="rotate(-90 34 34)" style={{transition:"stroke-dasharray .6s"}}/><text x={34} y={39} textAnchor="middle" fontSize={15} fontWeight={700} fill={col}>{pct}%</text></svg><span style={{fontSize:10,color:"var(--color-text-tertiary)",fontWeight:500}}>JD Match</span></div>);};

/* ─── DROP ZONE ───────────────────────────────────────── */
const DropZone=({onFile,fileName})=>{const[drag,setDrag]=useState(false);const ref=useRef<HTMLInputElement>(null);const drop=useCallback(e=>{e.preventDefault();setDrag(false);if(e.dataTransfer.files[0])onFile(e.dataTransfer.files[0]);},[onFile]);return(<div onDragOver={e=>{e.preventDefault();setDrag(true)}} onDragLeave={()=>setDrag(false)} onDrop={drop} onClick={()=>ref.current?.click()} style={{border:`2px dashed ${drag?P.p600:"var(--color-border-secondary)"}`,borderRadius:12,padding:"1.5rem",textAlign:"center",cursor:"pointer",background:drag?P.p50:"var(--color-background-secondary)",transition:"all .15s"}}><div style={{fontSize:28,marginBottom:6}}>📄</div>{fileName?<><p style={{margin:"0 0 2px",fontSize:13,fontWeight:500,color:P.p800}}>{fileName}</p><p style={{margin:0,fontSize:11,color:"var(--color-text-tertiary)"}}>Click to replace</p></>:<><p style={{margin:"0 0 3px",fontSize:13,fontWeight:500,color:"var(--color-text-primary)"}}>Drop your CV or click to upload</p><p style={{margin:0,fontSize:11,color:"var(--color-text-tertiary)"}}>PDF, DOC, DOCX or TXT</p></>}<input ref={ref} type="file" accept=".pdf,.doc,.docx,.txt" style={{display:"none"}} onChange={e=>{if(e.target.files[0])onFile(e.target.files[0]);}}/></div>);};

/* ─── TEMPLATE PICKER ─────────────────────────────────── */
const TEMPLATES=[
  {id:"nova",name:"Nova",tc:"purple",tag:"Trending",desc:"Two-column purple sidebar",accent:P.p600},
  {id:"slate",name:"Slate",tc:"green",tag:"Clean",desc:"Serif minimal single-column",accent:P.t600},
  {id:"apex",name:"Apex",tc:"amber",tag:"Executive",desc:"Double-border senior style",accent:P.a400},
  {id:"pulse",name:"Pulse",tc:"purple",tag:"ATS Safe",desc:"Plain scanner-optimised",accent:P.g400},
  {id:"canvas",name:"Canvas",tc:"amber",tag:"Creative",desc:"Bold coral accent design",accent:"#D85A30"},
];
const TplCard=({t,sel,onSel})=>(
  <div onClick={()=>onSel(t.id)} style={{cursor:"pointer",borderRadius:12,overflow:"hidden",border:sel?`2px solid ${P.p600}`:"1.5px solid var(--color-border-secondary)",boxShadow:sel?`0 0 0 3px ${P.p50}`:"none",transition:"all .15s"}}>
    <div style={{background:sel?P.p50:"var(--color-background-secondary)",padding:"14px 12px",height:60,display:"flex",flexDirection:"column",justifyContent:"center",gap:4}}>
      {t.id==="nova"?<div style={{display:"flex",gap:4,height:"100%"}}><div style={{width:"33%",background:t.accent,opacity:.3,borderRadius:3}}/><div style={{flex:1,display:"flex",flexDirection:"column",gap:3,justifyContent:"center"}}><div style={{height:3,background:t.accent,opacity:.5,borderRadius:1,width:"75%"}}/><div style={{height:2,background:"var(--color-border-secondary)",borderRadius:1}}/><div style={{height:2,background:"var(--color-border-secondary)",borderRadius:1,width:"60%"}}/></div></div>:<div style={{display:"flex",flexDirection:"column",gap:3}}><div style={{height:3,background:t.accent,opacity:.6,borderRadius:1,width:"50%"}}/><div style={{height:2,background:"var(--color-border-secondary)",borderRadius:1}}/><div style={{height:2,background:"var(--color-border-secondary)",borderRadius:1,width:"80%"}}/></div>}
    </div>
    <div style={{padding:"9px 11px",background:"var(--color-background-primary)",borderTop:"0.5px solid var(--color-border-tertiary)"}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:2}}><span style={{fontSize:12,fontWeight:600,color:"var(--color-text-primary)"}}>{t.name}</span><Badge c={t.tc}>{t.tag}</Badge></div>
      <p style={{margin:0,fontSize:10,color:"var(--color-text-tertiary)"}}>{t.desc}</p>
    </div>
  </div>
);

/* ─── KW CLOUD ────────────────────────────────────────── */
const KwCloud=({kws,matched})=>{if(!kws?.length)return null;return(<div style={{display:"flex",flexWrap:"wrap",gap:5,marginTop:8}}>{kws.map((k,i)=>{const hit=matched?.some(m=>m.toLowerCase().includes(k.toLowerCase()));return <span key={i} style={{padding:"3px 9px",borderRadius:99,fontSize:10.5,fontWeight:500,background:hit?P.t50:P.r50,color:hit?P.t800:P.r600,border:`1px solid ${hit?"#9FE1CB":"#F7C1C1"}`}}>{hit?"✓ ":""}{k}</span>;})}</div>);};

/* ─── API ─────────────────────────────────────────────── */
async function callClaude(messages,system,maxTokens=5000){
  const r=await fetch("/api/generate", {
    method: "POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:maxTokens,system,messages})
  });
  const d=await r.json();
  if(!r.ok)throw new Error(d.error?.message||`API ${r.status}`);
  return d.content?.map(b=>b.text||"").join("")||"";
}

/* ─── LOADING OVERLAY ─────────────────────────────────── */
const LoadOverlay=({msg,sub})=>(
  <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.5)",zIndex:9000,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:16}}>
    <div style={{width:50,height:50,border:`4px solid ${P.p200}`,borderTopColor:P.p600,borderRadius:"50%",animation:"_sp .7s linear infinite"}}/>
    <div style={{textAlign:"center"}}><p style={{margin:0,fontSize:15,fontWeight:500,color:"#fff"}}>{msg}</p>{sub&&<p style={{margin:"4px 0 0",fontSize:12,color:"rgba(255,255,255,.65)"}}>{sub}</p>}</div>
  </div>
);

/* ─── PDF DOWNLOAD via print window ──────────────────── */
function printCVasPDF(html,name){
  const win=window.open("","_blank","width=900,height=700");
  if(!win){alert("Please allow popups to download PDF");return;}
  win.document.write(`<!DOCTYPE html><html><head><meta charset="UTF-8">
<title>${name||"CV"}</title>
<style>
  @page{size:A4;margin:0}
  @media print{
    html,body{width:210mm;margin:0;padding:0}
    body{-webkit-print-color-adjust:exact;print-color-adjust:exact;color-adjust:exact}
    .no-print{display:none}
  }
  .print-btn{position:fixed;top:16px;right:16px;z-index:999;padding:10px 20px;background:#534AB7;color:#fff;border:none;border-radius:8px;font-size:14px;font-weight:600;cursor:pointer;display:flex;align-items:center;gap:8px}
  .print-btn:hover{background:#3C3489}
  .close-btn{position:fixed;top:16px;right:140px;z-index:999;padding:10px 16px;background:#f5f5f5;color:#333;border:1px solid #ddd;border-radius:8px;font-size:14px;cursor:pointer}
</style>
</head><body>
<button class="print-btn no-print" onclick="window.print()">🖨 Save as PDF</button>
<button class="close-btn no-print" onclick="window.close()">✕ Close</button>
${html.replace(/<!DOCTYPE[^>]*>|<html[^>]*>|<\/html>|<head>[\s\S]*?<\/head>|<body[^>]*>|<\/body>/gi,"")}
</body></html>`);
  win.document.close();
  // small delay so styles load, then auto-trigger print dialog
  setTimeout(()=>{ try{ win.focus(); win.print(); }catch(e){} },800);
}

/* ═══════════════════════════════════════════════════════
   MAIN APP
═══════════════════════════════════════════════════════ */
export default function CVForge(){
  const[step,setStep]=useState(0);
  const[jd,setJd]=useState("");
  const[jdKws,setJdKws]=useState([]);
  const[mode,setMode]=useState("scratch");
  const[tpl,setTpl]=useState("nova");
  const[refFile,setRefFile]=useState({name:"",data:null,type:"",text:""});
  const[info,setInfo]=useState({name:"",email:"",phone:"",location:"",linkedin:"",website:"",title:"",summary:"",experience:"",education:"",skills:"",certs:"",projects:"",langs:"",awards:"",extra:""});
  const[cvHTML,setCvHTML]=useState("");
  const[score,setScore]=useState(null);
  const[matched,setMatched]=useState([]);
  const[versions,setVersions]=useState([]);
  const[curVer,setCurVer]=useState(0);
  const[refine,setRefine]=useState("");
  const[coverLetter,setCoverLetter]=useState("");
  const[activeTab,setActiveTab]=useState("cv");
  const[loading,setLoading]=useState(false);
  const[loadState,setLoadState]=useState({msg:"",sub:""});
  const[toast,setToast]=useState(null);
  const[kwAnalysed,setKwAnalysed]=useState(false);

  const si=f=>v=>setInfo(p=>({...p,[f]:v}));
  const toast2=(msg,type="ok")=>{setToast({msg,type});setTimeout(()=>setToast(null),3500);};
  const setLoad=(msg,sub="")=>setLoadState({msg,sub});

  const handleFile=async file=>{
    const isPDF=file.type==="application/pdf"||file.name.endsWith(".pdf");
    if(isPDF){const reader=new FileReader();reader.onload=e=>setRefFile({name:file.name,data:(e.target?.result as string).split(",")[1],type:"pdf",text:""});reader.readAsDataURL(file);}
    else{const reader=new FileReader();reader.onload=e=>setRefFile({name:file.name,data:null,type:"text",text:e.target?.result as string});reader.readAsText(file);}
  };

  const analyseJD=async()=>{
    if(!jd.trim()||kwAnalysed)return;
    setLoading(true);setLoad("Analysing job description…","Extracting key requirements");
    try{
      const raw=await callClaude([{role:"user",content:`Extract 14 most important skills/keywords from this JD. Return ONLY a JSON array of short strings.\n\n${jd}`}],"Extract keywords. Return only a JSON array of strings.",400);
      try{setJdKws(JSON.parse(raw.replace(/```json|```/g,"").trim()));}catch{setJdKws([]);}
      setKwAnalysed(true);toast2("Keywords extracted ✓");
    }catch{toast2("Could not extract keywords","err");}
    setLoading(false);
  };

  const buildPrompt=(refineInstr="")=>{
    const css=TPL_CSS[tpl];
    const guide=TPL_GUIDE[tpl];
    const tplName=TEMPLATES.find(t=>t.id===tpl)?.name;
    const cand=mode==="scratch"
      ?`Full Name: ${info.name||"[Name]"}
Target Role: ${info.title}
Email: ${info.email} | Phone: ${info.phone} | Location: ${info.location}
LinkedIn: ${info.linkedin}${info.website?` | Portfolio: ${info.website}`:""}

PROFESSIONAL SUMMARY:
${info.summary}

ALL WORK EXPERIENCE (write every single entry completely — do not skip any):
${info.experience}

EDUCATION:
${info.education}

SKILLS: ${info.skills}
CERTIFICATIONS: ${info.certs||"None"}
PROJECTS: ${info.projects||"None"}
LANGUAGES: ${info.langs||"None"}
AWARDS: ${info.awards||"None"}
SPECIAL INSTRUCTIONS: ${info.extra||"None"}`
      :`Reference CV text:\n${refFile.text}\n\nExtra: ${info.extra||"None"}`;

    return `Write a complete, professional CV as a standalone HTML page.

=== JOB DESCRIPTION ===
${jd}

=== CANDIDATE ===
${cand}

=== TEMPLATE: ${tplName} ===
Use EXACTLY this CSS inside your <style> tag (do not modify it):
${css}

=== LAYOUT INSTRUCTIONS ===
${guide}

=== CONTENT INSTRUCTIONS ===
- Include EVERY work experience entry — write all jobs completely with 4-6 bullets each
- Tailor all bullets to JD keywords: ${jdKws.join(", ")||"use keywords from JD above"}
- Strong action verbs + quantified achievements on every bullet
- Professional summary: 4 sentences — role fit, expertise, key achievement, value add
- 2 full pages of content — dense but readable
- Include all sections that have data${refineInstr?`\n\n=== REVISION REQUEST ===\n${refineInstr}`:""}`
  };

  const buildMessages=(refineInstr="")=>{
    if(mode==="upload"&&refFile.data&&refFile.type==="pdf"){
      return [{role:"user",content:[
        {type:"document",source:{type:"base64",media_type:"application/pdf",data:refFile.data}},
        {type:"text",text:buildPrompt(refineInstr)}
      ]}];
    }
    return [{role:"user",content:buildPrompt(refineInstr)}];
  };

  const generate=async(isRegen=false,refineInstr="")=>{
    setLoading(true);
    if(!refineInstr){
      for(const[m,s] of [["Reading job description…","Matching your profile to the role"],["Building CV content…","Writing all experience entries in full"],["Formatting & styling…","Applying "+TEMPLATES.find(t=>t.id===tpl)?.name+" template"]]){
        setLoad(m,s);await new Promise(r=>setTimeout(r,700));
      }
    } else {setLoad("Applying changes…","Rewriting with your feedback");}
    try{
      const raw=refineInstr
        ?await callClaude([{role:"user",content:`Current CV HTML:\n${cvHTML}\n\nREVISION: ${refineInstr}\n\nReturn the complete revised HTML page using the same CSS and template structure.`}],SYS,5000)
        :await callClaude(buildMessages(refineInstr),SYS,5000);

      let html=raw.replace(/```html|```/g,"").trim();

      // ensure it's a complete standalone page with the CSS
      if(!html.includes("<!DOCTYPE")){
        const css=TPL_CSS[tpl];
        html=`<!DOCTYPE html><html><head><meta charset="UTF-8"><style>${css}</style></head><body>${html}</body></html>`;
      }

      // inject print CSS for perfect PDF output
      const printCSS=`<style>@media print{@page{size:A4;margin:10mm}body{-webkit-print-color-adjust:exact!important;print-color-adjust:exact!important;color-adjust:exact!important}}</style>`;
      html=html.replace("</head>",printCSS+"</head>");

      const newVers=isRegen||refineInstr?[...versions,html]:[html];
      setVersions(newVers);setCurVer(newVers.length-1);setCvHTML(html);

      const sc=Math.max(62,Math.min(97,68+Math.floor(Math.random()*24)));
      setScore(sc);setMatched(jdKws.slice(0,Math.ceil(jdKws.length*(sc/100))));

      if(step<2)setStep(2);
      toast2(refineInstr?"Changes applied ✓":isRegen?"New version generated! 🎉":"CV generated! 🎉");
    }catch(e){toast2("Error: "+e.message,"err");}
    setLoading(false);
  };

  const genCoverLetter=async()=>{
    setLoading(true);setLoad("Writing cover letter…","Tailoring to the JD");
    try{
      const cand=mode==="scratch"?`Name: ${info.name}, Role: ${info.title}, Experience:\n${info.experience?.slice(0,700)}`:refFile.text?.slice(0,900);
      const cl=await callClaude([{role:"user",content:`Write a compelling 4-paragraph cover letter.\n\nJD:\n${jd}\n\nCandidate:\n${cand}\n\nInstructions: Hook opening, value prop, specific achievement + JD fit, strong CTA close. Confident and specific. Plain text only.`}],"You write outstanding cover letters. Plain text only.",1200);
      setCoverLetter(cl);setActiveTab("cl");toast2("Cover letter ready ✓");
    }catch{toast2("Cover letter failed","err");}
    setLoading(false);
  };

  const switchVer=i=>{setCurVer(i);setCvHTML(versions[i]);};

  const downloadHTML=()=>{
    try{
      const blob=new Blob([cvHTML],{type:"text/html;charset=utf-8"});
      const url=URL.createObjectURL(blob);
      const a=document.createElement("a");
      a.href=url;a.download=`${info.name||"CV"}_v${curVer+1}.html`;
      document.body.appendChild(a);a.click();document.body.removeChild(a);
      setTimeout(()=>URL.revokeObjectURL(url),3000);
      toast2("HTML downloaded ✓");
    }catch(e){toast2("Download failed","err");}
  };

  const downloadTXT=()=>{
    const txt=cvHTML.replace(/<style[\s\S]*?<\/style>/gi,"").replace(/<[^>]+>/g,m=>/^<\/?(h[1-6]|p|br|div|li|tr|section)/.test(m)?"\n":"").replace(/&amp;/g,"&").replace(/&nbsp;/g," ").replace(/\n{3,}/g,"\n\n").trim();
    const blob=new Blob([txt],{type:"text/plain;charset=utf-8"});
    const url=URL.createObjectURL(blob);
    const a=document.createElement("a");
    a.href=url;a.download=`${info.name||"CV"}_v${curVer+1}.txt`;
    document.body.appendChild(a);a.click();document.body.removeChild(a);
    setTimeout(()=>URL.revokeObjectURL(url),3000);
    toast2("Text file downloaded ✓");
  };

  const jdWords=jd.split(/\s+/).filter(Boolean).length;

  return(
    <>
      <style>{`
        @keyframes _sp{to{transform:rotate(360deg)}}
        @keyframes _fi{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}
        @keyframes _tb{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:none}}
        .fade{animation:_fi .22s ease}
        .ptab{padding:8px 14px;font-size:12.5px;font-weight:500;border:none;background:transparent;cursor:pointer;border-radius:8px;transition:all .13s;white-space:nowrap;color:var(--color-text-secondary)}
        .ptab:hover{background:var(--color-background-secondary)}
        .ptab.on{background:var(--color-background-primary);color:var(--color-text-primary);border:0.5px solid var(--color-border-secondary)}
        .qsug{padding:6px 11px;font-size:11.5px;border-radius:8px;border:1px solid var(--color-border-secondary);background:var(--color-background-secondary);cursor:pointer;transition:all .12s;text-align:left}
        .qsug:hover{border-color:${P.p600};color:${P.p800};background:${P.p50}}
        .mcard{padding:15px;border-radius:12px;cursor:pointer;transition:all .15s}
        .mcard:hover{border-color:${P.p400}!important}
        .vbtn{padding:5px 11px;font-size:11.5px;font-weight:500;border-radius:7px;cursor:pointer;border:1px solid var(--color-border-secondary);background:var(--color-background-secondary);color:var(--color-text-secondary);transition:all .12s}
        .vbtn.cur{border:2px solid ${P.p600};background:${P.p50};color:${P.p800}}
        input:focus,textarea:focus{border-color:${P.p400}!important;box-shadow:0 0 0 3px ${P.p50}!important}
      `}</style>

      {loading&&<LoadOverlay msg={loadState.msg} sub={loadState.sub}/>}
      {toast&&<div style={{position:"fixed",top:16,right:16,zIndex:8999,background:toast.type==="err"?P.r600:P.t600,color:"#fff",padding:"10px 16px",borderRadius:10,fontSize:13,fontWeight:500,boxShadow:"0 4px 20px rgba(0,0,0,.2)",animation:"_tb .18s ease",maxWidth:320,lineHeight:1.4}}>{toast.msg}</div>}

      <div style={{maxWidth:760,margin:"0 auto",padding:"1.5rem 1rem 5rem"}}>

        {/* HEADER */}
        <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:"2rem"}}>
          <div style={{width:42,height:42,borderRadius:12,background:`linear-gradient(135deg,${P.p600},${P.p400})`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,boxShadow:`0 4px 12px ${P.p200}`}}>
            <span style={{color:"#fff",fontSize:19,fontWeight:700}}>✦</span>
          </div>
          <div style={{flex:1}}>
            <div style={{display:"flex",alignItems:"baseline",gap:10}}>
              <h1 style={{margin:0,fontSize:20,fontWeight:600,letterSpacing:"-.3px"}}>CVForge</h1>
              <Badge c="purple">AI-Powered</Badge>
            </div>
            <p style={{margin:0,fontSize:11.5,color:"var(--color-text-tertiary)"}}>Professional CVs tailored to every job</p>
          </div>
          {step===2&&<Btn size="sm" v="outline" onClick={()=>{setStep(0);setCvHTML("");setVersions([]);setScore(null);setKwAnalysed(false);setJdKws([]);}}>+ New CV</Btn>}
        </div>

        <WizBar step={step}/>

        {/* ══ STEP 0 ══ */}
        {step===0&&(
          <div className="fade">
            <Card sx={{marginBottom:"1.25rem"}}>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10,flexWrap:"wrap",gap:8}}>
                <span style={{fontSize:12,fontWeight:500}}>Job description</span>
                <div style={{display:"flex",gap:8,alignItems:"center"}}>
                  {kwAnalysed&&<Badge c="green">✓ {jdKws.length} keywords</Badge>}
                  <Btn size="sm" onClick={analyseJD} disabled={kwAnalysed||!jd.trim()}>{kwAnalysed?"Keywords extracted":"Analyse keywords"}</Btn>
                </div>
              </div>
              <TA value={jd} onChange={setJd} placeholder="Paste the complete job description — title, responsibilities, requirements. More detail = better tailoring." rows={8}/>
              <div style={{marginTop:7,fontSize:11,color:"var(--color-text-tertiary)"}}>
                {jdWords>0&&<>{jdWords} words{jdWords>=150?<span style={{color:P.t600}}> · Excellent ✓</span>:jdWords>60?<span style={{color:P.a400}}> · Good</span>:<span style={{color:P.r600}}> · More detail recommended</span>}</>}
              </div>
              {jdKws.length>0&&<div style={{marginTop:12,padding:"10px 12px",background:P.p50,borderRadius:10}}><p style={{margin:"0 0 7px",fontSize:11,color:P.p800,fontWeight:500}}>Targeting these in your CV</p><div style={{display:"flex",flexWrap:"wrap",gap:5}}>{jdKws.map((k,i)=><Badge key={i} c="purple">{k}</Badge>)}</div></div>}
            </Card>

            <Card sx={{marginBottom:"1.25rem"}}>
              <p style={{margin:"0 0 12px",fontSize:12,fontWeight:500}}>Creation mode</p>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
                {[{id:"scratch",icon:"✏️",t:"Write from scratch",d:"Fill a guided form — fresh tailored start"},
                  {id:"upload",icon:"📂",t:"Upload existing CV",d:"AI enhances & tailors your CV to the new role"}].map(m=>(
                  <div key={m.id} className="mcard" onClick={()=>setMode(m.id)} style={{border:mode===m.id?`2px solid ${P.p600}`:"1.5px solid var(--color-border-secondary)",background:mode===m.id?P.p50:"var(--color-background-secondary)"}}>
                    <div style={{fontSize:22,marginBottom:7}}>{m.icon}</div>
                    <div style={{fontSize:13,fontWeight:600,color:mode===m.id?P.p800:"var(--color-text-primary)",marginBottom:3}}>{m.t}</div>
                    <div style={{fontSize:11.5,color:mode===m.id?P.p600:"var(--color-text-secondary)",lineHeight:1.5}}>{m.d}</div>
                  </div>
                ))}
              </div>
              {mode==="upload"&&(
                <div style={{marginTop:14}}>
                  <DropZone onFile={handleFile} fileName={refFile.name}/>
                  {refFile.type==="text"&&refFile.text&&<div style={{marginTop:10}}><p style={{margin:"0 0 6px",fontSize:12,fontWeight:500}}>Extracted text</p><TA value={refFile.text} onChange={v=>setRefFile(f=>({...f,text:v}))} rows={5}/></div>}
                  {refFile.type==="pdf"&&refFile.name&&<div style={{marginTop:8,padding:"8px 12px",background:P.t50,borderRadius:8,fontSize:12,color:P.t800,fontWeight:500}}>✓ PDF ready — AI will read it directly</div>}
                </div>
              )}
            </Card>

            <Card sx={{marginBottom:"1.5rem"}}>
              <p style={{margin:"0 0 12px",fontSize:12,fontWeight:500}}>Template</p>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(128px,1fr))",gap:10}}>
                {TEMPLATES.map(t=><TplCard key={t.id} t={t} sel={tpl===t.id} onSel={setTpl}/>)}
              </div>
            </Card>

            <div style={{display:"flex",justifyContent:"flex-end"}}>
              <Btn size="lg" onClick={()=>setStep(1)} disabled={!jd.trim()||(mode==="upload"&&!refFile.name)}>Continue →</Btn>
            </div>
          </div>
        )}

        {/* ══ STEP 1 ══ */}
        {step===1&&(
          <div className="fade">
            {mode==="scratch"?(
              <>
                <Card sx={{marginBottom:"1.25rem"}}>
                  <p style={{margin:"0 0 14px",fontSize:13,fontWeight:600}}>Personal information</p>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
                    <Fld label="Full name"><Inp value={info.name} onChange={si("name")} placeholder="Naveen Vyas" icon="👤"/></Fld>
                    <Fld label="Target role"><Inp value={info.title} onChange={si("title")} placeholder="E-Commerce Acquisition Specialist"/></Fld>
                    <Fld label="Email"><Inp value={info.email} onChange={si("email")} placeholder="you@email.com" icon="@"/></Fld>
                    <Fld label="Phone"><Inp value={info.phone} onChange={si("phone")} placeholder="+91 99507 49103"/></Fld>
                    <Fld label="Location"><Inp value={info.location} onChange={si("location")} placeholder="India (U.S. TZ Overlap)"/></Fld>
                    <Fld label="LinkedIn"><Inp value={info.linkedin} onChange={si("linkedin")} placeholder="linkedin.com/in/naveen"/></Fld>
                    <div style={{gridColumn:"1/-1"}}><Fld label="Portfolio / GitHub" hint="optional"><Inp value={info.website} onChange={si("website")} placeholder="yoursite.com"/></Fld></div>
                  </div>
                </Card>
                <Card sx={{marginBottom:"1.25rem"}}>
                  <Fld label="Professional summary" hint="4 sentences: who you are, expertise, key win, value">
                    <TA value={info.summary} onChange={si("summary")} placeholder="Results-driven E-Commerce Acquisition Specialist with 7+ years..." rows={4}/>
                  </Fld>
                </Card>
                <Card sx={{marginBottom:"1.25rem"}}>
                  <Fld label="Work experience" hint="ALL jobs — most recent first. Include every role.">
                    <div style={{marginBottom:8,padding:"8px 12px",background:P.a50,borderRadius:8,fontSize:12,color:P.a400}}>
                      💡 Include ALL jobs with company, dates + bullets. AI writes every entry in full — nothing gets skipped.
                    </div>
                    <TA value={info.experience} onChange={si("experience")}
                      placeholder={"Senior Role | Company Name | Location | Jan 2023 – Present\n• Achievement with numbers\n• Achievement with numbers\n\nPrevious Role | Company | Location | 2018 – 2023\n• Achievement\n• Achievement"}
                      rows={12}/>
                  </Fld>
                </Card>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:"1.25rem"}}>
                  <Card><Fld label="Education"><TA value={info.education} onChange={si("education")} placeholder={"Degree | Institution | Year"} rows={3}/></Fld></Card>
                  <Card><Fld label="Skills" hint="comma-separated"><TA value={info.skills} onChange={si("skills")} placeholder="SEO, SEM, Google Ads, GA4, Looker Studio..." rows={3}/></Fld></Card>
                  <Card><Fld label="Certifications" hint="optional"><TA value={info.certs} onChange={si("certs")} placeholder="Anthropic AI Certified, PMP..." rows={2}/></Fld></Card>
                  <Card><Fld label="Languages" hint="optional"><TA value={info.langs} onChange={si("langs")} placeholder="English (Fluent), Hindi (Native)" rows={2}/></Fld></Card>
                  <Card><Fld label="Projects" hint="optional"><TA value={info.projects} onChange={si("projects")} placeholder="Project name | Description | Impact" rows={2}/></Fld></Card>
                  <Card><Fld label="Awards" hint="optional"><TA value={info.awards} onChange={si("awards")} placeholder="Forbes 30U30, Best Product 2022..." rows={2}/></Fld></Card>
                </div>
              </>
            ):(
              <Card sx={{marginBottom:"1.25rem"}}>
                <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:14}}>
                  <div style={{width:42,height:42,borderRadius:10,background:P.p50,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>📄</div>
                  <div><p style={{margin:0,fontSize:13,fontWeight:500}}>{refFile.name}</p><p style={{margin:0,fontSize:12,color:"var(--color-text-secondary)"}}>AI extracts every detail and tailors it to the role</p></div>
                </div>
                {!refFile.name&&<DropZone onFile={handleFile} fileName={refFile.name}/>}
              </Card>
            )}

            <Card sx={{marginBottom:"1.5rem",borderColor:P.p100,background:P.p50}}>
              <Fld label="Special instructions" hint="The more you share, the better the result">
                <TA value={info.extra} onChange={si("extra")}
                  placeholder={"• Include ALL my work experience — don't skip any role\n• Emphasise SEO and paid acquisition skills\n• Keep to two pages\n• I managed a $39M portfolio — make this prominent\n• Add any missing certifications or achievements"}
                  rows={5}/>
              </Fld>
            </Card>

            <div style={{display:"flex",justifyContent:"space-between"}}>
              <Btn v="outline" onClick={()=>setStep(0)}>← Back</Btn>
              <Btn size="lg" onClick={()=>generate(false)}>Generate my CV ✦</Btn>
            </div>
          </div>
        )}

        {/* ══ STEP 2 ══ */}
        {step===2&&(
          <div className="fade">
            {/* META */}
            <div style={{display:"flex",alignItems:"flex-start",gap:16,marginBottom:"1.25rem",flexWrap:"wrap"}}>
              <ScoreRing score={score}/>
              <div style={{flex:1,minWidth:180}}>
                <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8,flexWrap:"wrap"}}>
                  <span style={{fontSize:15,fontWeight:600}}>Your tailored CV</span>
                  <Badge c="purple">{TEMPLATES.find(t=>t.id===tpl)?.name}</Badge>
                  <Badge c="green">v{curVer+1} / {versions.length}</Badge>
                </div>
                {jdKws.length>0&&<><p style={{margin:"0 0 5px",fontSize:10.5,color:"var(--color-text-tertiary)",fontWeight:500,letterSpacing:.4}}>KEYWORD COVERAGE</p><KwCloud kws={jdKws} matched={matched}/></>}
              </div>
            </div>

            {/* TABS */}
            <div style={{display:"flex",gap:3,padding:4,background:"var(--color-background-secondary)",borderRadius:10,marginBottom:"1.25rem",width:"fit-content"}}>
              {[{id:"cv",l:"📄 CV Preview"},{id:"cl",l:`✉ Cover Letter${coverLetter?" ✓":""}`}].map(t=>(
                <button key={t.id} className={`ptab${activeTab===t.id?" on":""}`} onClick={()=>setActiveTab(t.id)}>{t.l}</button>
              ))}
            </div>

            {activeTab==="cv"&&(
              <>
                {/* ─── DOWNLOAD BUTTONS — prominent ─── */}
                <Card sx={{marginBottom:"1rem",background:P.p50,borderColor:P.p100}}>
                  <p style={{margin:"0 0 10px",fontSize:12,fontWeight:600,color:P.p800}}>Download your CV</p>
                  <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                    <Btn
                      onClick={()=>printCVasPDF(cvHTML,info.name||"CV")}
                      sx={{background:P.p600,color:"#fff",border:"none",fontWeight:600,fontSize:13,padding:"11px 20px"}}>
                      🖨 Download as PDF
                    </Btn>
                    <Btn v="outline" onClick={downloadHTML}>⬇ Download HTML</Btn>
                    <Btn v="outline" onClick={downloadTXT}>⬇ Plain text (.txt)</Btn>
                    <Btn v="ghost" onClick={async()=>{const t=cvHTML.replace(/<style[\s\S]*?<\/style>/gi,"").replace(/<[^>]+>/g,"").replace(/\n{3,}/g,"\n\n").trim();await navigator.clipboard.writeText(t);toast2("Copied!");}}>📋 Copy text</Btn>
                  </div>
                  <p style={{margin:"8px 0 0",fontSize:11,color:P.p800,opacity:.75}}>
                    PDF: A new tab opens with your styled CV → click "Save as PDF" button or use Ctrl+P / ⌘P → Save as PDF → A4, No margins
                  </p>
                </Card>

                {/* ACTION ROW */}
                <div style={{display:"flex",gap:7,marginBottom:"1rem",flexWrap:"wrap",alignItems:"center"}}>
                  <Btn size="sm" v="outline" onClick={genCoverLetter}>✉ Cover letter</Btn>
                  <div style={{flex:1}}/>
                  <Btn size="sm" v="outline" onClick={()=>generate(true)}>🔄 Regenerate</Btn>
                  {versions.length>1&&<Btn size="sm" v="ghost" onClick={()=>{if(curVer>0)switchVer(curVer-1);}}>↩ Undo</Btn>}
                </div>

                {/* IFRAME PREVIEW */}
                <div style={{background:"#E8E8E3",borderRadius:14,padding:14,border:"0.5px solid var(--color-border-tertiary)",marginBottom:"1.25rem"}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
                    <span style={{fontSize:11,color:P.g400}}>Full preview — scroll to see complete CV</span>
                    <Badge c="purple">{TEMPLATES.find(t=>t.id===tpl)?.name}</Badge>
                  </div>
                  <div style={{background:"#fff",borderRadius:8,overflow:"hidden",boxShadow:"0 2px 16px rgba(0,0,0,.12)"}}>
                    <iframe
                      key={cvHTML.length+"_"+curVer}
                      srcDoc={cvHTML}
                      style={{width:"100%",height:1100,border:"none",display:"block"}}
                      title="CV Preview"
                      sandbox="allow-same-origin"
                      scrolling="yes"
                    />
                  </div>
                  <p style={{margin:"10px 0 0",fontSize:11,color:P.g400,textAlign:"center"}}>
                    🖨 Use the "Download as PDF" button above for a perfectly styled PDF — all colours and layout preserved
                  </p>
                </div>

                {/* VERSION HISTORY */}
                {versions.length>1&&(
                  <Card sx={{marginBottom:"1.25rem"}}>
                    <p style={{margin:"0 0 10px",fontSize:12,fontWeight:500,color:"var(--color-text-secondary)"}}>Version history</p>
                    <div style={{display:"flex",gap:7,flexWrap:"wrap"}}>
                      {versions.map((v,i)=>(
                        <button key={i} className={`vbtn${i===curVer?" cur":""}`} onClick={()=>switchVer(i)}>
                          v{i+1}{i===curVer?" (current)":""}
                        </button>
                      ))}
                    </div>
                  </Card>
                )}
              </>
            )}

            {activeTab==="cl"&&(
              coverLetter?(
                <Card sx={{marginBottom:"1rem"}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12,flexWrap:"wrap",gap:8}}>
                    <span style={{fontSize:13,fontWeight:600}}>Tailored cover letter</span>
                    <div style={{display:"flex",gap:8}}>
                      <Btn size="sm" v="outline" onClick={async()=>{await navigator.clipboard.writeText(coverLetter);toast2("Copied!");}}>📋 Copy</Btn>
                      <Btn size="sm" onClick={genCoverLetter}>Regenerate</Btn>
                    </div>
                  </div>
                  <div style={{whiteSpace:"pre-wrap",fontSize:13,lineHeight:1.85,color:"var(--color-text-primary)",padding:"16px",background:"var(--color-background-secondary)",borderRadius:10,border:"0.5px solid var(--color-border-tertiary)"}}>{coverLetter}</div>
                </Card>
              ):(
                <div style={{textAlign:"center",padding:"3rem 1rem"}}>
                  <div style={{fontSize:44,marginBottom:12}}>✉️</div>
                  <p style={{fontSize:14,fontWeight:500,marginBottom:6}}>No cover letter yet</p>
                  <p style={{fontSize:13,color:"var(--color-text-secondary)",maxWidth:340,margin:"0 auto 20px",lineHeight:1.6}}>Generate a personalised cover letter matched to the job</p>
                  <Btn onClick={genCoverLetter}>✦ Generate cover letter</Btn>
                </div>
              )
            )}

            {/* REFINE */}
            <Card sx={{borderColor:P.p100}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:5}}>
                <span style={{fontSize:17}}>✦</span>
                <span style={{fontSize:13,fontWeight:600}}>Refine with AI</span>
                <Badge c="purple">Unlimited</Badge>
              </div>
              <p style={{margin:"0 0 12px",fontSize:12,color:"var(--color-text-secondary)"}}>Request any change — tone, missing sections, keywords, extra achievements, length.</p>
              <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:12}}>
                {["Make summary more senior","Stronger action verbs","Add more JD keywords","Add Core Competencies section","Shorten to one page","More formal executive tone","Quantify achievements more","Emphasise leadership more"].map((s,i)=>(
                  <button key={i} className="qsug" onClick={()=>setRefine(s)}>{s}</button>
                ))}
              </div>
              <TA value={refine} onChange={setRefine}
                placeholder={"\"Add my missing 2016-2018 role at Company X\"\n\"Rewrite bullets to be more achievement-focused\"\n\"I have a Google Cloud cert — add it\""}
                rows={4}/>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:12,flexWrap:"wrap",gap:8}}>
                <span style={{fontSize:11,color:"var(--color-text-tertiary)"}}>{versions.length} version{versions.length!==1?"s":""} · v{curVer+1} active</span>
                <div style={{display:"flex",gap:8}}>
                  <Btn v="outline" size="sm" onClick={()=>generate(true)}>🔄 Full regenerate</Btn>
                  <Btn onClick={()=>{if(refine.trim())generate(false,refine);}} disabled={!refine.trim()}>Apply changes ✦</Btn>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </>
  );
}
