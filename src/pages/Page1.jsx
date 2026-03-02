import Navbar from "../components/Navbar";
import Section from "../components/Section";
import { project } from "../data/projectContent";
function HeaderBar() {
  return (
    <div className="w-full bg-[#fff7fb]">
      <img
        src={project.brand.heroImage}
        alt="Hero"
        className="w-full object-contain"
        draggable={false}
      />
    </div>
  );
}
export default function Page1() {
  const p = project.page1;

  return (
    <div className="pt-10">
      <div className="min-h-screen bg-[#fff7fb] text-slate-900">
        <Navbar />;
        <HeaderBar />
        <Section title="SiTi Group là ai?">
          <h2 className="text-center sm:text-left w-full text-[14px] sm:text-sm font-extrabold font-['Times_New_Roman']  tracking-[0.04em] text-brandText-light">
            {" "}
            SiTi Group là Cộng đồng Sinh viên Tình nguyện được thành lập ngày
            15/07/2009, mang sứ mệnh kết nối những sinh viên năng động, nhiệt
            huyết để cùng cống hiến vì cộng đồng. Đây không chỉ là môi trường để
            rèn luyện và trưởng thành, mà còn là nơi để các bạn trẻ sống trọn
            với lòng nhân ái, cùng lan tỏa tinh thần “Keep Loving By Sharing”.
          </h2>
        </Section>
        <div className="h-9 bg-brand" />
        <Section title={p.contribute.title}>
          <div className="grid gap-4 sm:grid-cols-2">
            {p.contribute.items.map((it, i) => (
              <div
                key={i}
                className="overflow-hidden rounded-2xl border border-pink-200 bg-white"
              >
                <div className="h-44 sm:h-52 bg-pink-50"></div>
                <div className="p-5">
                  <div className="text-center sm:text-left w-full text-[22px] md:text-[26px] lg:text-[30px] sm:text-sm font-extrabold font-['Times_New_Roman'] text-brandText">
                    {it.title}
                  </div>
                  <div className="text-center sm:text-left w-full text-[14px] sm:py-4 sm:text-sm font-extrabold font-['Times_New_Roman']  tracking-[0.03em] text-brandText-light">
                    {it.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Section>
        <div className="h-9 bg-brand" />
        <Section title={p.achievements.title}>
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:grid-cols- place-items-center">
            {p.achievements.cards.map((c, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                {/* Logo */}
                <div className="h-48 w-48 rounded-2xl bg-brand-soft flex items-center justify-center transition duration-300 hover:scale-105 shadow-sm">
                  <span className="text-brandText/40 text-sm tracking-widest uppercase"></span>
                </div>

                {/* Title */}
                <div className="text-center sm:text-left w-full text-1xl md:text-2xl lg:text-1 sm:text-sm font-extrabold font-['Times_New_Roman'] text-brandText">
                  {c.title}
                </div>

                {/* Subtitle */}
                <div className="text-center sm:text-left w-full text-[14px] sm:text-sm font-extrabold font-['Times_New_Roman']  tracking-[0.04em] text-brandText-light">
                  {c.desc}
                </div>
              </div>
            ))}
          </div>
        </Section>
        <div className="h-9 bg-brand" />
        <Section title={p.memories.title}>
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-6 sm:gap-3">
            {p.memories.photos.map((src, i) => (
              <div
                key={i}
                className="overflow-hidden rounded-xl border border-pink-200 bg-white"
              >
                <div className="h-44 sm:h-52 bg-pink-50"></div>
              </div>
            ))}
          </div>
        </Section>
        <footer className="bg-brand text-white">
          <div className="mx-auto max-w-[1100px] px-4 sm:px-6 py-8 sm:py-14">
            <div className="grid gap-6 sm:gap-10 md:grid-cols-[420px_1fr] items-stretch">
              {/* Left: QR */}
              <div className="flex justify-center md:justify-start">
                <div
                  className="
            w-full bg-pink-100 rounded-xl
            aspect-[4/3]          /* ✅ mobile: không quá cao */
            max-w-[360px]         /* ✅ mobile: giới hạn độ rộng */
            md:max-w-none         /* desktop: trả về full theo cột */
            md:aspect-auto        /* desktop: theo chiều cao tự nhiên */
          "
                />
              </div>

              {/* Right: Text */}
              <div className="text-center md:text-center">
                <h2
                  className="
            font-['Times_New_Roman'] tracking-[0.04em] font-extrabold text-white leading-snug
            text-[26px] sm:text-3xl md:text-4xl
          "
                >
                  SiTi Group
                </h2>

                <p
                  className="
            mt-3 sm:mt-6 font-['Times_New_Roman'] tracking-[0.04em] font-semibold text-white
            text-[14px] sm:text-[20px]
            break-words
          "
                >
                  <span className="no-underline">Gmail: </span>
                  <a
                    href="mailto:sitigroup.fptuhcm@gmail.com"
                    className="text-white underline underline-offset-4 hover:text-white"
                  >
                    sitigroup.fptuhcm@gmail.com
                  </a>
                </p>

                <div className="mt-4 sm:mt-6 space-y-3 sm:space-y-5">
                  {/* Facebook */}
                  <button
                    type="button"
                    className="
              w-full bg-white text-black
              py-2.5 sm:py-3
              rounded-lg
              font-['Times_New_Roman'] font-semibold
              text-[14px] sm:text-base
              border border-black/30
              transition-all duration-300
              hover:bg-brand hover:text-white hover:border-brand
            "
                  >
                    <a
                      href="https://www.facebook.com/sitigroupfuhcm"
                      className="block w-full h-full"
                    >
                      Facebook
                    </a>
                  </button>

                  {/* Instagram */}
                  <button
                    type="button"
                    className="
              w-full bg-white text-black
              py-2.5 sm:py-3
              rounded-lg
              font-['Times_New_Roman'] font-semibold
              text-[14px] sm:text-base
              border border-black/30
              transition-all duration-300
              hover:bg-brand hover:text-white hover:border-brand
            "
                  >
                    Instagram
                  </button>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
