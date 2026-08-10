"use client";
import { useState } from "react";

export default function StudioDemo(){
  const [idea,setIdea]=useState(""); const [mode,setMode]=useState("Tranh"); const [result,setResult]=useState("");
  const create=()=>{if(!idea.trim()) return; setResult(mode==="Tranh"?`Một bức tranh rực rỡ về “${idea}” đang chờ bé tô điểm.`:mode==="Truyện"?`Ngày xửa ngày xưa, ${idea.toLowerCase()} — và một cuộc phiêu lưu bất ngờ bắt đầu…`:`Dự án “${idea}” đã sẵn sàng với 3 khối lệnh đầu tiên.`)};
  return <div className="demo-box"><div className="mode-tabs">{["Tranh","Truyện","Lập trình"].map(x=><button onClick={()=>setMode(x)} className={mode===x?"active":""} key={x}>{x==="Tranh"?"🎨 ":x==="Truyện"?"📖 ":"🧩 "}{x}</button>)}</div><div className="prompt-row"><input aria-label="Ý tưởng của bé" value={idea} onChange={e=>setIdea(e.target.value)} onKeyDown={e=>e.key==="Enter"&&create()} placeholder="Ví dụ: một chú cá voi bay giữa những vì sao..."/><button onClick={create}>Tạo dự án <span>✦</span></button></div>{result&&<div className="demo-result"><span>{mode==="Tranh"?"🖼️":mode==="Truyện"?"📚":"🎮"}</span><p>{result}</p><button onClick={()=>setResult("")}>Làm lại</button></div>}<small>Gợi ý: hãy mô tả nhân vật, màu sắc hoặc nơi câu chuyện diễn ra.</small></div>
}
