import { Nav } from "react-bootstrap";
import { project } from "../data/projectContent";
import Navbar from "../components/Navbar";
import Logo from "../assets/ELEMENT 7.png";
import qrImg from "../assets/qrImg.jpg";
import qrImgQN from "../assets/qrImgQN.jpg";
export default function DonatePage() {
  function HeaderBar() {
    return (
      <div className="w-full bg-[#f6fbff]">
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
      <div className="min-h-screen bg-[#f6fbff] text-slate-900">
        <Navbar />

        {/* Title */}
        <div className="mx-auto max-w-[1100px] px-4 sm:px-6 py-10">
          <h1 className="text-center text-4xl sm:text-5xl font-['Times_New_Roman'] font-bold tracking-wide text-brandText">
            ỦNG HỘ
          </h1>
        </div>

        <div className="h-12 sm:h-16 bg-brand" />

        {/* Content */}
        {/* Content */}
        <section className="bg-bgMain">
          <div className="mx-auto max-w-[1200px] px-4 sm:px-6 py-10 sm:py-14">
            {/* Description */}
            <div className="max-w-[900px] mx-auto text-center">
              <p className="mt-6 text-[15px] sm:text-base leading-relaxed text-brandText-light font-['Times_New_Roman'] tracking-[0.04em] font-semibold">
                Quyên góp là một trong những cách đóng góp thiết thực trong hành
                trình triển khai dự án Hành Trình Hy Vọng 2026. Toàn bộ nguồn
                kinh phí quyên góp sẽ được sử dụng minh bạch và đúng mục đích
                nhằm chuẩn bị nhu yếu phẩm, quà tặng và tổ chức các hoạt động hỗ
                trợ trẻ em khuyết tật tại các cơ sở bảo trợ ở TP. Hồ Chí Minh và
                Quy Nhơn.
              </p>

              <p className="mt-6 text-[15px] sm:text-base leading-relaxed text-brandText-light font-['Times_New_Roman'] tracking-[0.04em] font-semibold">
                Bên cạnh đó, sự đồng hành và ủng hộ từ cộng đồng chính là nguồn
                động lực để tiếp tục lan tỏa tinh thần sẻ chia, phát huy sức trẻ
                và trách nhiệm xã hội, góp phần mang đến những giá trị tích cực
                và bền vững cho cộng đồng.
              </p>
            </div>

            {/* QR Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-14">
              {/* MB BANK */}
              <div className="flex flex-col items-center">
                <div className="w-full max-w-[420px] rounded-xl overflow-hidden group shadow-lg">
                  <img
                    src={qrImg}
                    alt="QR Donate MB Bank"
                    className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <h2 className="mt-5 text-2xl sm:text-3xl font-['Times_New_Roman'] font-bold text-brandText text-center">
                  Quỹ quyên góp của Hành Trình Hy Vọng 2026 tại Thành Phố Hồ Chí
                  Minh
                </h2>
                {/* Fund Info */}
                <div className="mt-8 text-center text-brandText font-['Times_New_Roman']">
                  <div className="text-lg sm:text-xl font-bold">
                    📌 THÔNG TIN GÂY QUỸ
                  </div>

                  <div className="mt-4 space-y-2 text-[15px] sm:text-base font-semibold">
                    <div>Ngân hàng: Ngân hàng Quân Đội (MB Bank)</div>
                    <div>Số tài khoản: 0852866667</div>
                    <div>Tên tài khoản: HUYNH NHA UYEN</div>
                    <div>
                      Nội dung chuyển khoản: [HỌ TÊN + ỦNG HỘ HÀNH TRÌNH HY
                      VỌNG]
                    </div>
                  </div>
                </div>
              </div>

              {/* VIB BANK */}
              <div className="flex flex-col items-center">
                <div className="w-full max-w-[420px] rounded-xl overflow-hidden group shadow-lg">
                  <img
                    src={qrImgQN}
                    alt="QR Donate VIB Bank"
                    className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <h2 className="mt-5 text-2xl sm:text-3xl font-['Times_New_Roman'] font-bold text-brandText text-center">
                  Quỹ quyên góp của Hành Trình Hy Vọng 2026 tại Quy Nhơn
                </h2>
                {/* Fund Info */}
                <div className="mt-8 text-center text-brandText font-['Times_New_Roman']">
                  <div className="text-lg sm:text-xl font-bold">
                    📌 THÔNG TIN GÂY QUỸ
                  </div>

                  <div className="mt-4 space-y-2 text-[15px] sm:text-base font-semibold">
                    <div>Ngân hàng: Ngân hàng Quốc Tế (VIB Bank)</div>
                    <div>Số tài khoản: 777552379</div>
                    <div>Tên tài khoản: PHAM DOAN TRANG</div>
                    <div>
                      Nội dung chuyển khoản: [HỌ TÊN + ỦNG HỘ HÀNH TRÌNH HY
                      VỌNG]
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom pink bar */}
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
