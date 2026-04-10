import { motion } from "framer-motion";
import Section from "../components/Section";
import { project } from "../data/projectContent";
import Navbar from "../components/Navbar";
import Logo from "../assets/ELEMENT 7.png";

const pageTitleVariants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const cardVariants = {
  hidden: (i) => ({
    opacity: 0,
    x: i % 2 === 0 ? -100 : 100,
    scale: 0.96,
  }),
  show: (i) => ({
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.75,
      delay: i * 0.1,
      ease: [0.25, 0.8, 0.25, 1],
    },
  }),
};

export default function Page2() {
  const p = project.page2;

  return (
    <div className="pt-16">
      <div className="min-h-screen bg-bgMain text-slate-900">
        <Navbar />

        <motion.div
          variants={pageTitleVariants}
          initial="hidden"
          animate="show"
          className="mx-auto max-w-[1100px] px-4 sm:px-6 py-10"
        >
          <h1 className="text-center text-4xl sm:text-5xl font-['Times_New_Roman'] font-bold tracking-wide text-brandText whitespace-pre-line">
            DỰ ÁN ĐƯỢC TRIỂN KHAI THÔNG QUA {"\n"} 3 GIAI ĐOẠN
          </h1>
        </motion.div>

        <section className="bg-brand text-white border-y border-brand/20">
          <div className="marquee-wrap py-4 sm:py-5">
            <div className="marquee-track text-[28px] sm:text-[46px] lg:text-[60px] font-black uppercase tracking-[0.08em]">
              <span className="marquee-text">GIAI ĐOẠN 1 - ĐỊNH VỊ VÌ SAO</span>
              <span className="marquee-text">GIAI ĐOẠN 1 - ĐỊNH VỊ VÌ SAO</span>
              <span className="marquee-text">GIAI ĐOẠN 1 - ĐỊNH VỊ VÌ SAO</span>
              <span className="marquee-text">GIAI ĐOẠN 1 - ĐỊNH VỊ VÌ SAO</span>
            </div>
          </div>
        </section>
        <Section title="">
          <div className="grid gap-4 sm:grid-cols-2">
            {p.event1.blocks.map((b, i) => (
              <motion.article
                key={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                custom={i}
                className="overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-sm"
              >
                <div className="h-44 sm:h-52 bg-brand-soft overflow-hidden">
                  <div className="h-full w-full bg-brand-soft" />
                </div>

                <div className="p-5">
                  <div className="whitespace-pre-line leading-snug text-center sm:text-left w-full text-xl md:text-2xl font-extrabold font-['Times_New_Roman'] text-brandText whitespace-pre-line">
                    {b.title}
                  </div>

                  <p className="mt-2 text-center sm:text-left w-full text-[14px] sm:text-sm font-extrabold font-['Times_New_Roman'] text-brandText-light whitespace-pre-line">
                    {b.desc}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </Section>
        <section className="bg-brand text-white border-y border-brand/20">
          <div className="marquee-wrap py-4 sm:py-5">
            <div className="marquee-track text-[28px] sm:text-[46px] lg:text-[60px] font-black uppercase tracking-[0.08em]">
              <span className="marquee-text">
                {" "}
                GIAI ĐOẠN 02 - KẾT QUANG DỆT SÁNG
              </span>
              <span className="marquee-text">
                {" "}
                GIAI ĐOẠN 02 - KẾT QUANG DỆT SÁNG
              </span>
              <span className="marquee-text">
                {" "}
                GIAI ĐOẠN 02 - KẾT QUANG DỆT SÁNG
              </span>
              <span className="marquee-text">
                {" "}
                GIAI ĐOẠN 02 - KẾT QUANG DỆT SÁNG
              </span>
            </div>
          </div>
        </section>
        <Section title="">
          <div className="grid gap-4 sm:grid-cols-2">
            {p.event2.blocks.map((b, i) => (
              <motion.article
                key={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                custom={i}
                className="overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-sm"
              >
                <div className="h-44 sm:h-52 bg-brand-soft overflow-hidden">
                  <div className="h-full w-full bg-brand-soft" />
                </div>

                <div className="p-5">
                  <div className="whitespace-pre-line leading-snug text-center sm:text-left w-full text-xl md:text-2xl font-extrabold font-['Times_New_Roman'] text-brandText">
                    {b.title}
                  </div>

                  <p className="mt-2 text-center sm:text-left w-full text-[14px] sm:text-sm font-extrabold font-['Times_New_Roman'] text-brandText-light">
                    {b.desc}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </Section>
        <section className="bg-brand text-white border-y border-brand/20">
          <div className="marquee-wrap py-4 sm:py-5">
            <div className="marquee-track text-[28px] sm:text-[46px] lg:text-[60px] font-black uppercase tracking-[0.08em]">
              <span className="marquee-text">
                {" "}
                GIAI ĐOẠN 3 - THẮP SÁNG NGÂN HÀ
              </span>
              <span className="marquee-text">
                {" "}
                GIAI ĐOẠN 3 - THẮP SÁNG NGÂN HÀ
              </span>
              <span className="marquee-text">
                {" "}
                GIAI ĐOẠN 3 - THẮP SÁNG NGÂN HÀ
              </span>
              <span className="marquee-text">
                {" "}
                GIAI ĐOẠN 3 - THẮP SÁNG NGÂN HÀ
              </span>
            </div>
          </div>
        </section>
        <Section title="">
          <div className="grid gap-4 sm:grid-cols-2">
            {p.event3.blocks.map((b, i) => (
              <motion.article
                key={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                custom={i}
                className="overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-sm"
              >
                <div className="h-44 sm:h-52 bg-brand-soft overflow-hidden">
                  <div className="h-full w-full bg-brand-soft" />
                </div>

                <div className="p-5">
                  <div className="whitespace-pre-line leading-snug text-center sm:text-left w-full text-xl md:text-2xl font-extrabold font-['Times_New_Roman'] text-brandText">
                    {b.title}
                  </div>

                  <p className="mt-2 text-center sm:text-left w-full text-[14px] sm:text-sm font-extrabold font-['Times_New_Roman'] text-brandText-light">
                    {b.desc}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </Section>
        <footer className="bg-brand border-t border-black/10">
          <div className="mx-auto max-w-[1400px] px-6 sm:px-10 lg:px-16 py-10 sm:py-6">
            <div className="grid grid-cols-1 gap-10 md:grid-cols-[260px_1fr_1.1fr_260px] items-start">
              {/* Logo */}
              <div className="flex justify-center md:justify-start self-start">
                <img
                  src={Logo}
                  alt="SiTiGroup Logo"
                  className="w-[170px] sm:w-[190px] object-contain mt-1 sm:py-8"
                />
              </div>

              {/* Contact */}
              <div className="text-center md:text-left">
                <h3 className="text-[14px] sm:text-[17px] font-extrabold tracking-[0.08em] uppercase text-white underline underline-offset-4 font-['Times_New_Roman']">
                  Thông tin liên hệ
                </h3>
                <div className="mt-4 space-y-2 text-[10px] sm:text-[15px] font-semibold text-brand-soft/90 leading-relaxed">
                  <p>
                    <a
                      href="mailto:sitigroup.fptuhcm@gmail.com"
                      className="text-white no-underline font-['Times_New_Roman'] hover:opacity-80 transition"
                    >
                      sitigroup.fptuhcm@gmail.com
                    </a>
                  </p>
                  <p>
                    <a
                      href="tel:+84915883688"
                      className="text-white no-underline font-['Times_New_Roman'] hover:opacity-80 transition"
                    >
                      (+84) 91 588 36 88
                    </a>
                  </p>
                </div>
              </div>

              {/* Address */}
              <div className="text-center md:text-left">
                <h3 className="text-[14px] sm:text-[17px] font-extrabold tracking-[0.08em] uppercase text-white underline underline-offset-4 font-['Times_New_Roman']">
                  Địa chỉ
                </h3>
                <p className="mt-4 text-[12px] sm:text-[15px] font-semibold font-['Times_New_Roman'] text-brand-soft/90 leading-relaxed">
                  Lô E2a-7, Đường D1, Khu Công nghệ cao, Phường Tăng Nhơn Phú,
                  TP. Hồ Chí Minh
                </p>
              </div>

              {/* Social + copyright */}
              <div className="flex flex-col items-center md:items-start text-center md:text-left self-start">
                <h3 className="text-[14px] sm:text-[17px] font-extrabold tracking-[0.08em] uppercase text-white underline underline-offset-4 font-['Times_New_Roman']">
                  Theo dõi chúng tôi tại
                </h3>

                <div className="mt-6 ml-12 sm:px-12 ">
                  <a
                    href="https://www.facebook.com/sitigroupfuhcm"
                    target="_blank"
                    rel="noreferrer"
                    className="
        h-12 w-12 rounded-full
        border border-black/15
        bg-white
        flex items-center justify-center
        text-[#1877f2] text-[20px]
        hover:bg-[#1877f2] hover:text-white
        hover:-translate-y-1 hover:shadow-md
        transition-all duration-300 
      "
                    aria-label="Facebook"
                  >
                    <i className="bi bi-facebook"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
