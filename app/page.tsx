import Link from "next/link";
import StudioDemo from "./studio-demo";

const tools = [
  { icon: "✦", title: "Vẽ tranh từ ý tưởng", text: "Biến một câu mô tả thành tranh minh hoạ đầy màu sắc.", href: "/cong-cu/ve-tranh-tu-y-tuong", color: "coral" },
  { icon: "☾", title: "Tạo truyện cho bé", text: "Cùng bé chọn nhân vật, bối cảnh và một kết thúc thật riêng.", href: "/cong-cu/tao-truyen-cho-be", color: "violet" },
  { icon: "▦", title: "Lập trình bằng khối", text: "Xếp các khối lệnh để nhân vật chuyển động và kể chuyện.", href: "/cong-cu/lap-trinh-cho-tre-em", color: "green" },
];

const ideas = ["Vẽ chú mèo phi hành gia", "Kể chuyện về lòng dũng cảm", "Làm thiệp tặng ông bà", "Tạo trò chơi mê cung"];

export default function Home() {
  return (
    <main>
      <header className="topbar wrap">
        <Link href="/" className="logo"><span>✺</span> Mầm Sáng Tạo</Link>
        <nav aria-label="Điều hướng chính">
          <a href="#cong-cu">Công cụ</a><a href="#cach-hoat-dong">Cách hoạt động</a><a href="#phu-huynh">Cho phụ huynh</a>
        </nav>
        <a className="header-cta" href="#thu-ngay">Bắt đầu sáng tạo <span>→</span></a>
      </header>

      <section className="hero wrap">
        <div className="hero-copy">
          <div className="eyebrow"><span>●</span> XƯỞNG SÁNG TẠO AN TOÀN CHO TRẺ</div>
          <h1>Mọi ý tưởng nhỏ<br/>đều có thể <em>nở hoa.</em></h1>
          <p>Nơi trẻ vẽ tranh, kể chuyện và làm quen với lập trình — bằng trí tưởng tượng của chính mình.</p>
          <div className="hero-actions"><a className="primary" href="#thu-ngay">Khám phá ngay <span>→</span></a><a className="secondary" href="#cach-hoat-dong"><i>▶</i> Xem cách hoạt động</a></div>
          <div className="trust"><span className="faces">👧🏻👦🏽👧🏼</span><span><b>Được tạo cho trẻ 6–12 tuổi</b><br/>Không quảng cáo · Không mạng xã hội</span></div>
        </div>
        <div className="hero-art" aria-label="Minh hoạ xưởng sáng tạo">
          <div className="spark s1">✦</div><div className="spark s2">✦</div><div className="spark s3">●</div>
          <div className="paper back"></div>
          <div className="paper main-paper"><div className="sun"></div><div className="cloud c1"></div><div className="cloud c2"></div><div className="hill h1"></div><div className="hill h2"></div><div className="rocket">🚀</div><div className="paper-label">Ý tưởng của tớ!</div></div>
          <div className="pencil">✎</div><div className="star-card">★</div>
        </div>
      </section>

      <section className="ideas"><div className="wrap idea-row"><span>BÉ CÓ THỂ BẮT ĐẦU VỚI</span>{ideas.map((idea)=><a key={idea} href="#thu-ngay">{idea} <b>↗</b></a>)}</div></section>

      <section id="cong-cu" className="tools wrap">
        <div className="section-heading"><div><span className="kicker">BA GÓC SÁNG TẠO</span><h2>Học bằng cách tự tay làm</h2></div><p>Không có đáp án đúng duy nhất. Mỗi hoạt động là một cơ hội để bé thử, sửa và tự hào về tác phẩm của mình.</p></div>
        <div className="tool-grid">{tools.map((tool, i)=><Link key={tool.title} href={tool.href} className={`tool-card ${tool.color}`}><div className="tool-top"><span className="tool-icon">{tool.icon}</span><span className="number">0{i+1}</span></div><h3>{tool.title}</h3><p>{tool.text}</p><span className="learn">Khám phá công cụ <b>→</b></span></Link>)}</div>
      </section>

      <section id="thu-ngay" className="demo-section"><div className="wrap"><div className="demo-heading"><span className="kicker">THỬ NGAY MỘT Ý TƯỞNG</span><h2>Bé đang tưởng tượng điều gì?</h2><p>Viết một câu đơn giản. Xưởng sẽ giúp bé biến nó thành một dự án sáng tạo.</p></div><StudioDemo/></div></section>

      <section id="cach-hoat-dong" className="steps wrap"><span className="kicker">NHỎ MÀ CÓ VÕ</span><h2>Ba bước để một ý tưởng thành hình</h2><div className="step-grid"><article><b>1</b><h3>Nói ra ý tưởng</h3><p>Bé viết hoặc chọn một gợi ý có sẵn.</p></article><article><b>2</b><h3>Tự do sáng tạo</h3><p>Vẽ, thêm chi tiết, sắp xếp khối lệnh.</p></article><article><b>3</b><h3>Khoe tác phẩm</h3><p>Lưu về máy hoặc in ra cho cả nhà xem.</p></article></div></section>

      <section id="phu-huynh" className="parent-band"><div className="wrap parent-inner"><div><span className="kicker light">YÊN TÂM ĐỂ CON KHÁM PHÁ</span><h2>Một không gian số lành mạnh,<br/>được thiết kế cùng phụ huynh.</h2></div><ul><li><b>✓</b> Không quảng cáo và liên kết gây xao nhãng</li><li><b>✓</b> Nội dung phù hợp với độ tuổi</li><li><b>✓</b> Không trò chuyện với người lạ</li></ul></div></section>

      <footer className="wrap"><Link href="/" className="logo"><span>✺</span> Mầm Sáng Tạo</Link><p>Nuôi dưỡng trí tưởng tượng, từng ý tưởng một.</p><div><a href="#cong-cu">Công cụ</a><a href="#phu-huynh">An toàn</a><a href="mailto:hello@mamsangtao.vn">Liên hệ</a></div><small>© 2026 Mầm Sáng Tạo</small></footer>
    </main>
  );
}
