import type { Metadata } from "next";
import { Nunito, Quicksand } from "next/font/google";
import "./globals.css";

const body = Nunito({ variable:"--font-body", subsets:["latin","vietnamese"] });
const display = Quicksand({ variable:"--font-display", subsets:["latin","vietnamese"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://mamsangtao.vn"),
  title: { default:"Mầm Sáng Tạo – Vẽ, kể chuyện và học lập trình cho trẻ", template:"%s | Mầm Sáng Tạo" },
  description:"Xưởng sáng tạo an toàn cho trẻ 6–12 tuổi: vẽ tranh từ ý tưởng, tạo truyện riêng và làm quen lập trình bằng khối.",
  keywords:["vẽ tranh cho trẻ em","tạo truyện cho bé","lập trình trẻ em","hoạt động sáng tạo cho bé"],
  openGraph:{title:"Mầm Sáng Tạo",description:"Mọi ý tưởng nhỏ đều có thể nở hoa.",locale:"vi_VN",type:"website",images:[{url:"/og.png",width:1792,height:896,alt:"Mầm Sáng Tạo – Mọi ý tưởng nhỏ đều có thể nở hoa"}]},
  twitter:{card:"summary_large_image",title:"Mầm Sáng Tạo",description:"Mọi ý tưởng nhỏ đều có thể nở hoa.",images:["/og.png"]},
};

export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="vi"><body className={`${body.variable} ${display.variable}`}>{children}</body></html>}
