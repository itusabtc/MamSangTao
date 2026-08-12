'use client'

import { Play, RotateCcw } from 'lucide-react'
import { useRef, useState } from 'react'

type Pos = { row: number; col: number }
const INITIAL = [
  ['♜','♞','♝','♛','♚','♝','♞','♜'], ['♟','♟','♟','♟','♟','♟','♟','♟'],
  ['','','','','','','',''], ['','','','','','','',''], ['','','','','','','',''], ['','','','','','','',''],
  ['♙','♙','♙','♙','♙','♙','♙','♙'], ['♖','♘','♗','♕','♔','♗','♘','♖'],
]
const WHITE = '♙♖♘♗♕♔'
const BLACK = '♟♜♞♝♛♚'

function ChessPractice({ lessonIndex }: { lessonIndex: number }) {
  const [board, setBoard] = useState(() => INITIAL.map((row) => [...row]))
  const [selected, setSelected] = useState<Pos | null>(null)
  const [message, setMessage] = useState('Bấm một quân cờ, sau đó bấm ô muốn đi tới.')

  function pathClear(from: Pos, to: Pos) { const dr=Math.sign(to.row-from.row), dc=Math.sign(to.col-from.col); let r=from.row+dr,c=from.col+dc; while(r!==to.row||c!==to.col){if(board[r][c])return false;r+=dr;c+=dc} return true }
  function valid(from: Pos, to: Pos) {
    const piece=board[from.row][from.col], target=board[to.row][to.col], dr=to.row-from.row, dc=to.col-from.col, ar=Math.abs(dr), ac=Math.abs(dc)
    const white=WHITE.includes(piece); if ((white&&WHITE.includes(target))||(!white&&BLACK.includes(target))) return 'Ô đó đang có quân cùng đội.'
    if ('♙♟'.includes(piece)) { const direction=white?-1:1, start=white?6:1; if(dc===0&&!target&&(dr===direction||(from.row===start&&dr===2*direction&&!board[from.row+direction][from.col])))return ''; if(ac===1&&dr===direction&&target)return ''; return 'Quân Tốt đi thẳng một ô, nhưng chỉ ăn chéo.' }
    if ('♖♜'.includes(piece) && (dr===0||dc===0) && pathClear(from,to)) return ''
    if ('♗♝'.includes(piece) && ar===ac && pathClear(from,to)) return ''
    if ('♕♛'.includes(piece) && (dr===0||dc===0||ar===ac) && pathClear(from,to)) return ''
    if ('♘♞'.includes(piece) && ((ar===2&&ac===1)||(ar===1&&ac===2))) return ''
    if ('♔♚'.includes(piece) && ar<=1&&ac<=1) return ''
    return 'Nước đi chưa đúng luật của quân này hoặc đang bị quân khác chắn.'
  }
  function click(row:number,col:number){ if(!selected){if(!board[row][col])return setMessage('Hãy chọn một ô có quân cờ.');setSelected({row,col});setMessage(`Đã chọn ${board[row][col]}. Bây giờ chọn ô đích.`);return} const error=valid(selected,{row,col});if(error){setMessage(`❌ ${error}`);setSelected(null);return}const next=board.map((line)=>[...line]);next[row][col]=next[selected.row][selected.col];next[selected.row][selected.col]='';setBoard(next);setSelected(null);setMessage('✅ Chính xác! Quân cờ đã di chuyển đúng luật.') }
  return <div><div className="mx-auto grid aspect-square w-full max-w-[540px] grid-cols-8 overflow-hidden rounded-2xl border-4 border-[#8b5a2b] shadow-xl">{board.map((row,r)=>row.map((piece,c)=><button key={`${r}-${c}`} type="button" onClick={()=>click(r,c)} aria-label={`Ô ${String.fromCharCode(97+c)}${8-r}${piece?`, quân ${piece}`:''}`} className={`grid aspect-square place-items-center text-[clamp(1.4rem,5vw,2.7rem)] ${(r+c)%2?'bg-[#7b9b62]':'bg-[#f2e6c9]'} ${selected?.row===r&&selected.col===c?'ring-4 ring-inset ring-yellow':''}`}>{piece}</button>))}</div><p className={`mx-auto mt-4 max-w-xl rounded-2xl px-4 py-3 text-center font-extrabold ${message.startsWith('❌')?'bg-coral/10 text-coral':message.startsWith('✅')?'bg-green-soft text-green':'bg-blue/5 text-blue'}`} role="status">{message}</p><div className="mt-3 flex justify-center"><button type="button" onClick={()=>{setBoard(INITIAL.map(row=>[...row]));setSelected(null);setMessage('Bàn cờ đã được xếp lại. Hãy chọn một quân để thử.')}} className="btn border border-hairline bg-white"><RotateCcw className="h-4 w-4"/>Xếp lại bàn cờ</button></div><p className="mt-3 text-center text-xs text-ink/55">Bài {lessonIndex+1}: bàn tập kiểm tra cách đi cơ bản và quân cản đường. Luật chiếu/nhập thành sẽ được minh họa trong phần hướng dẫn.</p></div>
}

function MusicPractice() { const [active,setActive]=useState([true,false,true,false,true,false,true,false]); const audio=useRef<AudioContext|null>(null); function play(){if(!audio.current)audio.current=new AudioContext();active.forEach((on,i)=>{if(!on)return;const o=audio.current!.createOscillator(),g=audio.current!.createGain();o.frequency.value=[262,294,330,349,392,440,494,523][i];g.gain.setValueAtTime(.1,audio.current!.currentTime+i*.22);g.gain.exponentialRampToValueAtTime(.001,audio.current!.currentTime+i*.22+.18);o.connect(g);g.connect(audio.current!.destination);o.start(audio.current!.currentTime+i*.22);o.stop(audio.current!.currentTime+i*.22+.2)})} return <div className="rounded-3xl bg-violet/10 p-5"><div className="grid grid-cols-4 gap-2 sm:grid-cols-8">{active.map((on,i)=><button key={i} type="button" onClick={()=>setActive(v=>v.map((x,j)=>i===j?!x:x))} className={`aspect-square rounded-2xl text-xl font-black ${on?'bg-violet text-white':'bg-white'}`}>{on?'♪':i+1}</button>)}</div><button type="button" onClick={play} className="btn btn-primary mt-4"><Play className="h-4 w-4"/>Nghe giai điệu</button></div> }

function VisualPractice({ courseSlug, lessonIndex }: { courseSlug:string; lessonIndex:number }) { const data=courseSlug.includes('ve-')?{icon:'🎨',items:['⚪','🟦','🔺','😊'],title:'Ghép hình thành nhân vật'}:courseSlug.includes('ke-')?{icon:'📖',items:['🧒','🏰','🌪️','🌈'],title:'Nhân vật → Bối cảnh → Thử thách → Kết thúc'}:{icon:'🧩',items:['▶️','➡️','⭐','🔊'],title:'Bắt đầu → Di chuyển → Ghi điểm → Âm thanh'}; const [order,setOrder]=useState(data.items); return <div className="rounded-3xl bg-green-soft p-5 text-center"><div className="text-5xl">{data.icon}</div><h4 className="mt-3 text-xl">{data.title}</h4><div className="mt-5 flex flex-wrap justify-center gap-3">{order.map((item,i)=><button key={`${item}-${i}`} type="button" onClick={()=>setOrder(v=>[...v.slice(1),v[0]])} className="grid h-20 w-20 place-items-center rounded-2xl bg-white text-4xl shadow-sm">{item}</button>)}</div><p className="mt-4 text-sm text-ink/65">Bấm các thẻ để thay đổi thứ tự và quan sát cách ý tưởng thay đổi. Minh họa đang áp dụng cho bài {lessonIndex+1}.</p></div> }

export function LessonActivity({ courseSlug, lessonIndex }: { courseSlug:string; lessonIndex:number }) { if(courseSlug==='co-vua-cho-be')return <ChessPractice lessonIndex={lessonIndex}/>;if(courseSlug==='am-nhac-vui-nhon')return <MusicPractice/>;return <VisualPractice courseSlug={courseSlug} lessonIndex={lessonIndex}/> }
