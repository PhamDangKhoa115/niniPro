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

        <Section title="CÁC HOẠT ĐỘNG">
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

        <footer className="bg-pink-600 text-white">
          <div className="mx-auto max-w-[980px] px-4 sm:px-6 py-10">
            <div className="text-sm font-extrabold tracking-[0.22em]">
              {project.brand.name}
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
