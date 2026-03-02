import { Nav } from "react-bootstrap";
import Section from "../components/Section";
import { project } from "../data/projectContent";
import Navbar from "../components/Navbar";

export default function Page2() {
  const p = project.page2;
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
  return (
    <div className="pt-16">
      <div className="min-h-screen bg-[#fff7fb] text-slate-900">
        <Navbar />
        <HeaderBar />
        <div className="mx-auto max-w-[1100px] px-4 sm:px-6 py-10">
          <h1 className="text-center text-4xl sm:text-5xl font-['Times_New_Roman'] font-bold tracking-wide text-brandText">
            Các hoạt động
          </h1>
        </div>
        <div className="h-12 sm:h-16 bg-brand" />
        <Section title="">
          <div className="grid gap-4 sm:grid-cols-2">
            {p.blocks.map((b, i) => (
              <article
                key={i}
                className="overflow-hidden rounded-2xl border border-pink-200 bg-white"
              >
                <div className="h-44 sm:h-52 bg-pink-50">
                  <div className="h-44 sm:h-52 bg-pink-50"></div>
                </div>
                <div className="p-5">
                  <div className="whitespace-pre-line leading-snug text-center sm:text-left w-full text-1xl md:text-2xl lg:text-1 sm:text-sm font-extrabold font-['Times_New_Roman'] text-brandText">
                    {b.title}
                  </div>
                  <p className="text-center sm:text-left w-full text-[14px] sm:text-sm font-extrabold font-['Times_New_Roman']   text-brandText-light">
                    {b.desc}
                  </p>
                </div>
              </article>
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
