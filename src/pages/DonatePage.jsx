import { Nav } from "react-bootstrap";
import { project } from "../data/projectContent";
import Navbar from "../components/Navbar";
export default function DonatePage() {
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
      <div className="min-h-screen bg-white text-slate-900">
        <Navbar />
        <HeaderBar />

        {/* Title */}
        <div className="mx-auto max-w-[1100px] px-4 sm:px-6 py-10">
          <h1 className="text-center text-4xl sm:text-5xl font-['Times_New_Roman'] font-bold tracking-wide text-brandText">
            Donate
          </h1>
        </div>

        {/* Pink bar */}
        <div className="h-12 sm:h-16 bg-brand" />

        {/* Content */}
        <section className="bg-white">
          <div className="mx-auto max-w-[1100px] px-4 sm:px-6 py-10 sm:py-14">
            <div className="grid gap-10 md:grid-cols-[420px_1fr] items-stretch">
              {/* Left: QR */}
              <div className="flex">
                <div className="w-full bg-pink-100 rounded-xl"></div>
              </div>

              {/* Right: Text */}
              <div className="text-center md:text-center">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-['Times_New_Roman'] font-bold text-brandText leading-snug">
                  Gửi tài trợ đến với tài khoản gây quỹ của SiTi
                </h2>

                <p className="mt-6 text-[15px] sm:text-base leading-relaxed text-brandText-light font-['Times_New_Roman'] tracking-[0.04em]  font-semibold">
                  Tài trợ là một trong những cách đóng góp thiết thực cho SiTi
                  Group trong hành trình triển khai dự án Hành Trình Hy Vọng
                  2026. Toàn bộ nguồn kinh phí quyên góp sẽ được sử dụng minh
                  bạch và đúng mục đích nhằm chuẩn bị nhu yếu phẩm, quà tặng và
                  tổ chức các hoạt động hỗ trợ trẻ em khuyết tật tại các cơ sở
                  bảo trợ ở TP. Hồ Chí Minh.
                </p>

                <p className="mt-6 text-[15px] sm:text-base leading-relaxed text-brandText-light font-['Times_New_Roman'] tracking-[0.04em]  font-semibold">
                  Bên cạnh đó, sự đồng hành và ủng hộ từ cộng đồng chính là
                  nguồn động lực để SiTi Group tiếp tục lan tỏa tinh thần sẻ
                  chia, phát huy sức trẻ và trách nhiệm xã hội, góp phần mang
                  đến những giá trị tích cực và bền vững cho cộng đồng.
                </p>

                {/* Fund info */}
                <div className="mt-10 text-brandText font-['Times_New_Roman']">
                  <div className="text-lg sm:text-xl font-bold">
                    📌 THÔNG TIN GÂY QUỸ
                  </div>

                  <div className="mt-4 space-y-2 text-[15px] sm:text-base font-semibold">
                    <div>Ngân hàng: Ngân hàng Quân Đội (MB Bank)</div>
                    <div>Số tài khoản: 0825549830</div>
                    <div>Tên tài khoản: PHAN THIEN TINH</div>
                    <div>
                      Nội dung chuyển khoản: [HỌ TÊN + ỦNG HỘ SITI GROUP]{" "}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom pink bar */}
        <footer className="bg-brand text-white">
          <div className="mx-auto max-w-[980px] px-4 sm:px-6 py-10">
            <div className="mx-auto max-w-[1100px] px-4 sm:px-6 py-10 sm:py-14">
              <div className="grid gap-10 md:grid-cols-[420px_1fr] items-stretch">
                {/* Left: QR */}
                <div className="flex">
                  <div className="w-full bg-pink-100 rounded-xl"></div>
                </div>

                {/* Right: Text */}
                <div className="text-center md:text-center">
                  <h2 className="text-3xl sm:text-3xl md:text-4xl font-['Times_New_Roman'] tracking-[0.04em] font-extrabold text-white leading-snug">
                    SiTi Group
                  </h2>
                  <p className="mt-6 text-[20px] leading-relaxed text-white font-['Times_New_Roman'] tracking-[0.04em] font-semibold">
                    <span className="no-underline">Gmail: </span>
                    <span className="underline">
                      sitigroup.fptuhcm@gmail.com
                    </span>
                  </p>
                  <div className="mt-6 space-y-5">
                    {/* Facebook */}
                    <button
                      type="button"
                      className="w-full bg-white text-black 
               py-3 rounded-lg 
               font-['Times_New_Roman'] font-semibold text-base
               border border-black/30
               transition-all duration-300
               hover:bg-brand hover:text-white hover:border-brand"
                    >
                      Facebook
                    </button>

                    {/* Instagram */}
                    <button
                      type="button"
                      className="w-full bg-white text-black 
               py-3 rounded-lg 
               font-['Times_New_Roman'] font-semibold text-base
               border border-black/30
               transition-all duration-300
               hover:bg-brand hover:text-white hover:border-brand"
                    >
                      Instagram
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
