import Navbar from "../components/Navbar";
import Logo from "../assets/ELEMENT 7.png";
import { motion } from "framer-motion";
import usoImage from "../assets/uso.jpg"; // đổi đúng tên file ảnh của bạn

export default function AboutUSOPage() {
  return (
    <div className="pt-16">
      <div className="min-h-screen bg-bgMain text-slate-900">
        <Navbar />

        <motion.section
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-10 py-10 sm:py-14"
        >
          <h1 className="text-center text-4xl sm:text-5xl font-['Times_New_Roman'] font-bold tracking-wide text-brandText">
            VỀ USO ORGANIZATION
          </h1>

          <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1.1fr] items-center">
            <div className="overflow-hidden rounded-3xl border border-blue-100 bg-white shadow-sm">
              <img
                src={usoImage}
                alt="Câu lạc bộ Thiện nguyện US Organization"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="rounded-3xl bg-white p-6 sm:p-8 shadow-sm border border-blue-100">
              <a
                href="https://www.facebook.com/usorganization?comment_id=Y29tbWVudDoxMjQ5ODI2NTMzOTkxMTI2XzIwMDEwNjg3MDQxNTMzNjA%3D"
                target="_blank"
                rel="noreferrer"
                className="no-underline"
              >
                <h2 className="text-[24px] sm:text-[30px] leading-tight font-extrabold uppercase font-['Times_New_Roman'] text-brandText hover:text-brand transition">
                  CÂU LẠC BỘ THIỆN NGUYỆN US ORGANIZATION
                </h2>
              </a>

              <p className="mt-6 text-[15px] sm:text-[17px] leading-8 font-semibold font-['Times_New_Roman'] tracking-[0.02em] text-brandText-light text-justify">
                Câu lạc bộ Thiện nguyện US Organization (USO) – Đại học FPT Quy
                Nhơn là nơi hội tụ những sinh viên giàu nhiệt huyết, cùng chung
                sứ mệnh “Gieo mầm tử tế - Gặt hái yêu thương”. Với mong muốn lan
                tỏa yêu thương, CLB không ngừng mang đến niềm vui và hy vọng cho
                những hoàn cảnh khó khăn trên địa bàn tỉnh Bình Định.
              </p>

              <p className="mt-5 text-[15px] sm:text-[17px] leading-8 font-semibold font-['Times_New_Roman'] tracking-[0.02em] text-brandText-light text-justify">
                Chính thức thành lập vào ngày 20/11/2022, USO được xây dựng từ
                tinh thần tương thân tương ái của những trái tim trẻ. Bằng sự
                chân thành và trách nhiệm, các thành viên luôn đồng hành cùng
                nhau phát triển một cộng đồng tình nguyện vững mạnh, triển khai
                những hoạt động thiết thực, giàu giá trị nhân văn.
              </p>
            </div>
          </div>
        </motion.section>

        <footer className="bg-brand border-t border-black/10">
          <div className="mx-auto max-w-[1500px] px-6 sm:px-10 lg:px-16 py-10 sm:py-6">
            <div className="grid grid-cols-1 gap-10 md:grid-cols-[260px_1fr_1.1fr_260px] items-start">
              <div className="flex justify-center md:justify-start self-start">
                <img
                  src={Logo}
                  alt="SiTiGroup Logo"
                  className="w-[170px] sm:w-[190px] object-contain mt-1 sm:py-8"
                />
              </div>

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

              <div className="text-center md:text-left">
                <h3 className="text-[14px] sm:text-[17px] font-extrabold tracking-[0.08em] uppercase text-white underline underline-offset-4 font-['Times_New_Roman']">
                  Địa chỉ
                </h3>
                <p className="mt-4 text-[12px] sm:text-[15px] font-semibold font-['Times_New_Roman'] text-brand-soft/90 leading-relaxed">
                  Lô E2a-7, Đường D1, Khu Công nghệ cao, Phường Tăng Nhơn Phú,
                  TP. Hồ Chí Minh
                </p>
              </div>

              <div className="flex flex-col items-center md:items-start text-center md:text-left self-start">
                <h3 className="text-[14px] sm:text-[17px] font-extrabold tracking-[0.08em] uppercase text-white underline underline-offset-4 font-['Times_New_Roman']">
                  Theo dõi chúng tôi tại
                </h3>

                <div className="mt-6 ml-12 sm:px-12">
                  <a
                    href="https://www.facebook.com/sitigroupfuhcm"
                    target="_blank"
                    rel="noreferrer"
                    className="h-12 w-12 rounded-full border border-black/15 bg-white flex items-center justify-center text-[#1877f2] text-[20px] hover:bg-[#1877f2] hover:text-white hover:-translate-y-1 hover:shadow-md transition-all duration-300"
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
