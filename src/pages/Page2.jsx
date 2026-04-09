import { motion } from "framer-motion";
import Section from "../components/Section";
import { project } from "../data/projectContent";
import Navbar from "../components/Navbar";

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
          <h1 className="text-center text-4xl sm:text-5xl font-['Times_New_Roman'] font-bold tracking-wide text-brandText">
            Các hoạt động
          </h1>
        </motion.div>

        <div className="h-12 sm:h-16 bg-brand" />

        <Section title="">
          <div className="grid gap-4 sm:grid-cols-2">
            {p.blocks.map((b, i) => (
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

        <footer className="bg-brand text-white">
          <div className="mx-auto max-w-[1100px] px-4 sm:px-6 py-8 sm:py-14">
            <div className="grid gap-6 sm:gap-10 md:grid-cols-[420px_1fr] items-stretch">
              <div className="flex justify-center md:justify-start">
                <div
                  className="
                    w-full bg-brand-soft rounded-xl
                    aspect-[4/3]
                    max-w-[360px]
                    md:max-w-none
                    md:aspect-auto
                  "
                />
              </div>

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
