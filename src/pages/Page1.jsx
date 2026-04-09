import Navbar from "../components/Navbar";
import CardCarousel from "../components/CardCarousel";
import Section from "../components/Section";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import HMND from "../assets/HMND.png";
import LHTT from "../assets/LHTT.png";
import XYT from "../assets/XYT.png";
import TTYT from "../assets/TTYT.png";
import { project } from "../data/projectContent";
import { a, i } from "framer-motion/client";

const cardVariants = {
  hidden: (i) => ({
    opacity: 0,
    x: i % 2 === 0 ? -100 : 100,
    scale: 0.95,
  }),
  show: (i) => ({
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      delay: i * 0.12,
      ease: [0.25, 0.8, 0.25, 1],
    },
  }),
};
const sectionTextVariants = {
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
function HeaderBar() {
  const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    show: (delay = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.9,
        delay,
        ease: "easeOut",
      },
    }),
  };

  const slideInRight = {
    hidden: { opacity: 0, x: 80 },
    show: (delay = 0) => ({
      opacity: 1,
      x: 0,
      transition: {
        duration: 1,
        delay,
        ease: "easeOut",
      },
    }),
  };

  return (
    <section
      className="relative w-full h-screen flex items-center"
      style={{
        backgroundImage: `url(${project.brand.heroImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/20" />

      <div className="relative z-10 max-w-[1500px] mx-auto px-6">
        <div className="max-w-[2000px] text-white">
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.1}
            className="font-beaufort font-normal text-[48px] sm:text-[100px] leading-[0.95] text-brandtexting"
          >
            HÀNH TRÌNH HY VỌNG 2026
          </motion.h1>

          <motion.h2
            variants={slideInRight}
            initial="hidden"
            animate="show"
            custom={0.35}
            className="font-beaufort italic text-[34px] sm:text-[50px] text-brandtexting/90 text-center sm:text-left"
          >
            Thấu Sao Dệt Sáng
          </motion.h2>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.55}
            className="mt-4 text-sm sm:text-base text-white/80 text-center sm:text-left  whitespace-pre-line"
          >
            Thấu hiểu những vì sao, cùng dệt lên bầu trời hy vọng.
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.75}
            className="mt-6  justify-center text-center sm:justify-start"
          >
            <Link
              to="/Activities"
              className="
                inline-flex items-center gap-2
                rounded-xl border border-white/30
                bg-white/10 px-6 py-3 text-center
                text-sm sm:text-base font-bold text-white
                backdrop-blur-md transition-all duration-300
                hover:bg-white hover:text-brandText hover:border-white
                active:scale-[0.98]
              "
            >
              Tìm hiểu thêm
              <span aria-hidden="true">→</span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
export default function Page1() {
  const p = project.page1;
  const campaignCards = [
    {
      id: 1,
      title: "Hiến Máu Nhân Đạo 2026 - Tiếp Nguồn Sinh Khí",
      desc: "Hoạt động thường niên nhằm góp phần khắc phục tình trạng thiếu máu tại kho máu TP.HCM và nâng cao nhận thức về ý nghĩa của hiến máu. Dự án phối hợp cùng Bệnh viện Huyết học Truyền máu tổ chức nhằm kêu gọi cán bộ,giảng viên, sinh viên FPT và cộng đồng tham gia, qua đó lan tỏa tinh thần nhân ái và trách nhiệm xã hội.",
      image: HMND,
      special: "SỐ LƯỢNG THAM GIA: 205 NGƯỜI",
    },
    {
      id: 2,
      title: "Xuân Yêu Thương 2026 - Xuân Ấm Trao Em",
      desc: "Dự án mang đến một mùa Tết ấm áp cho các em nhỏ tại Mái ấm Kim Chi, với các hoạt động giao lưu và tặng quà Tết, nhu yếu phẩm. SiTiGroup hy vọng lan tỏa tinh thần sẻ chia và tình yêu thương đến những hoàn cảnh khó khăn.",
      image: XYT,
      special:
        "QUY MÔ GIÚP ĐỠ: 184 TRẺ EM \n TỔNG SỐ TIỀN GÂY QUỸ: 4.956.000 VND",
    },
    {
      id: 3,
      title: "Lớp Học Tình Thương 2026-Nắng Mai Ươm Mầm",
      desc: "Dự án được tổ chức với mong muốn mang đến cho các em nhỏ tại Trung tâm Phát huy Bình Thọ một không gian học tập thân thiện, gần gũi và đầy cảm hứng. Các em sẽ được hỗ trợ hoàn thành bài tập, tham gia những trò chơi vui nhộn và trải nghiệm những hoạt động ý nghĩa như làm đồ thủ công, biểu diễn văn nghệ.",
      image: LHTT,
      special: "QUY MÔ GIÚP ĐỠ: 100 TRẺ EM",
    },
    {
      id: 4,
      title: "Trung Thu Yêu Thương 2025 - Trăng Trên Đại Ngàn",
      desc: "Chuỗi hoạt động đưa chúng ta trở về miền ký ức tuổi thơ, sống lại niềm vui từ những trò chơi dân gian quen thuộc, đồng thời gửi trao đến các em nhỏ tại mái ấm Vinh Sơn IV một mùa trăng tròn trọn vẹn, ấm áp và tràn đầy yêu thương.",
      image: TTYT,
      special:
        "QUY MÔ GIÚP ĐỠ: 107 TRẺ EM \n TỔNG SỐ TIỀN GÂY QUỸ: 19.859.000 VND",
    },
  ];
  return (
    <div className="pt-10">
      <div className="min-h-screen bg-bgMain text-slate-900">
        <Navbar />
        <HeaderBar />
        {/* Marquee */}
        <section className="bg-brand text-white border-y border-brand/20">
          <div className="marquee-wrap py-4 sm:py-5">
            <div className="marquee-track text-[28px] sm:text-[46px] lg:text-[70px] font-black uppercase tracking-[0.08em]">
              <span className="marquee-text">
                HÀNH TRÌNH HY VỌNG 2026 - THẤU SAO DỆT SÁNG
              </span>
              <span className="marquee-text">
                HÀNH TRÌNH HY VỌNG 2026 - THẤU SAO DỆT SÁNG
              </span>
              <span className="marquee-text">
                HÀNH TRÌNH HY VỌNG 2026 - THẤU SAO DỆT SÁNG
              </span>
              <span className="marquee-text">
                HÀNH TRÌNH HY VỌNG 2026 - THẤU SAO DỆT SÁNG
              </span>
            </div>
          </div>
        </section>
        <Section title="DỰ ÁN HÀNH TRÌNH HY VỌNG">
          <motion.h2
            variants={sectionTextVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="text-center sm:text-left w-full text-[14px] sm:text-[20px] font-extrabold font-['Times_New_Roman'] tracking-[0.04em] text-brandText-light"
          >
            {" "}
            Hành Trình Hy Vọng là chuỗi dự án thường niên được tổ chức với mục
            tiêu nâng cao nhận thức cộng đồng, nuôi dưỡng sự thấu hiểu và lan
            tỏa tinh thần yêu thương đến những hoàn cảnh cần được sẻ chia. Thông
            qua các hoạt động ý nghĩa và thiết thực, dự án mong muốn tiếp thêm
            động lực, niềm tin và hy vọng để các em vững bước hướng tới tương
            lai.
          </motion.h2>
          <motion.div
            key={i}
            variants={cardVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            custom={i}
            className="overflow-hidden rounded-2xl border border-pink-200 bg-white"
          >
            <div className="overflow-hidden bg-brand-soft rounded-t-2xl">
              <img
                src="/HTHV.png"
                className="w-full h-full object-cover object-center"
              />
            </div>
          </motion.div>
        </Section>
        <div className="h-9 bg-brand" />
        <Section title="CÁC DỰ ÁN NỔI BẬT">
          <CardCarousel
            items={campaignCards}
            renderCard={(it) => (
              <article className="overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-sm">
                <div className="aspect-[16/9] overflow-hidden bg-brand-soft rounded-t-2xl">
                  <img
                    src={it.image}
                    alt={it.title}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-[22px] md:text-[26px] font-extrabold font-['Times_New_Roman'] text-brandText whitespace-pre-line">
                    {it.title}
                  </h3>

                  <p className="mt-3 text-[14px] sm:text-sm font-extrabold font-['Times_New_Roman'] tracking-[0.03em] text-brandText-light">
                    {it.desc}
                  </p>
                  {it.special && (
                    <p className="mt-2 text-[12px] sm:text-[16px] font-bold text-brandbrown whitespace-pre-line">
                      {it.special}
                    </p>
                  )}
                </div>
              </article>
            )}
          />
        </Section>
        <div className="h-9 bg-brand" />
        <Section title={p.previous.title}>
          <div className="grid gap-4 sm:grid-cols-2">
            {p.previous.items.map((it, i) => (
              <motion.div
                key={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                custom={i}
                className="overflow-hidden rounded-2xl border border-pink-200 bg-white"
              >
                <div className="p-6 sm:p-7">
                  <div className="aspect-[16/9] overflow-hidden bg-brand-soft rounded-t-2xl">
                    <img
                      src={it.image}
                      alt={it.title}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                  <div className="w-full text-center sm:text-left text-[20px] md:text-[24px] lg:text-[28px] leading-tight font-extrabold font-['Times_New_Roman'] text-brandText whitespace-pre-line break-words">
                    {it.title}
                  </div>
                  <div className="text-center sm:text-left w-full text-[14px] sm:py-4 sm:text-[15px] font-extrabold font-['Times_New_Roman']  tracking-[0.03em] text-brandText-light whitespace-pre-line">
                    {it.desc}
                  </div>

                  {it.special && (
                    <p className="mt-2 text-[12px] sm:text-[16px] font-bold text-brandbrown whitespace-pre-line">
                      {it.special}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </Section>
        <div className="h-9 bg-brand" />
        <Section title={p.contribute.title}>
          <div className="grid gap-4 sm:grid-cols-2">
            {p.contribute.items.map((it, i) => (
              <motion.div
                key={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                custom={i}
                className="overflow-hidden rounded-2xl border border-pink-200 bg-white"
              >
                <div className="h-44 sm:h-52 bg-pink-50"></div>
                <div className="p-5">
                  <div className="text-center sm:text-left w-full text-[22px] md:text-[26px] lg:text-[30px] sm:text-sm font-extrabold font-['Times_New_Roman'] text-brandText">
                    {it.title}
                  </div>
                  <div className="text-center sm:text-left w-full text-[15px] sm:py-4 sm:text-[15px] font-extrabold font-['Times_New_Roman']  tracking-[0.03em] text-brandText-light whitespace-pre-line">
                    {it.desc}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Section>
        <div className="h-9 bg-brand" />
        <Section title={p.achievements.title}>
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:grid-cols- place-items-center">
            {p.achievements.cards.map((c, i) => (
              <motion.div
                key={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                custom={i}
                className="flex flex-col items-center text-center"
              >
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
              </motion.div>
            ))}
          </div>
        </Section>
        <div className="h-9 bg-brand" />
        <Section title={p.memories.title}>
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-6 sm:gap-3">
            {p.memories.photos.map((src, i) => (
              <motion.div
                key={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                custom={i}
                className="overflow-hidden rounded-xl border border-pink-200 bg-white"
              >
                <div className="h-44 sm:h-52 bg-pink-50"></div>
              </motion.div>
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
                  SiTiGroup
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
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
