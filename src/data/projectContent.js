import { i, image } from "framer-motion/client";

export const project = {
  brand: {
    name: "SiTiGroup",
    slogan: "slogan",
    year: "2026",
    themeTitle: "Thấu Sao Dệt Sáng",
    heroImage: "Hero.png",
  },

  page1: {
    achievements: {
      title: "ĐỐI TÁC",
      cards: [
        {
          title: "ĐƠN VỊ PHỐI HỢP THỰC HIỆN ",
          desc: "US Organization ",
          image: "/attribute/USO.jpg",
        },
        {
          title: "NHÀ TÀI TRỢ",
          desc: "Nhà sách Văn Minh ",
          image: "/attribute/nhasach.jpg",
        },
        {
          title: "NHÀ TÀI TRỢ",
          desc: "Umi Flowers ",
          image: "/attribute/flower.png",
        },
        {
          title: "NHÀ TÀI TRỢ",
          desc: "T-Bingsu ",
          image: "/attribute/bingsu.png",
        },
        {
          title: "ĐƠN VỊ BẢO TRỢ TRUYỀN THÔNG",
          desc: "YBOX.VN ",
          image: "/attribute/ybox.jpg",
        },
        {
          title: "ĐƠN VỊ BẢO TRỢ TRUYỀN THÔNG",
          desc: "Edu2Review ",
          image: "/attribute/edu2review.jpg",
        },
        {
          title: "ĐƠN VỊ BẢO TRỢ TRUYỀN THÔNG",
          desc: "Eduwing Global ",
          image: "/attribute/eduwing.jpg",
        },
        {
          title: "ĐƠN VỊ BẢO TRỢ TRUYỀN THÔNG",
          desc: "THỂ THAO KHOA VĂN ",
          image: "/attribute/TTKV.jpg",
        },
        {
          title: "ĐƠN VỊ BẢO TRỢ TRUYỀN THÔNG",
          desc: "VNV - Cộng Đồng Tình Nguyện Việt Nam ",
          image: "/attribute/VNV.jpg",
        },
      ],
    },

    contribute: {
      title: "LÀM SAO ĐỂ ĐÓNG GÓP?",
      items: [
        {
          title: "Tài trợ",
          desc: "Tài trợ là một trong những cách đóng góp thiết thực cho SiTiGroup. Toàn bộ nguồn kinh phí quyên góp sẽ được sử dụng minh bạch và đúng mục đích nhằm chuẩn bị nhu yếu phẩm, quà tặng và tổ chức các hoạt động hỗ trợ trẻ em khuyết tật tại các cơ sở bảo trợ ở TP. Hồ Chí Minh.",
          image: "/attribute/taitro.jpg",
        },
        {
          title: "Tình nguyện viên",
          desc: "Tham gia với vai trò tình nguyện viên SiTiGroup, bạn sẽ trực tiếp đồng hành cùng Hành Trình Hy Vọng 2026 trong các hoạt động chuẩn bị, tổ chức gian hàng gây quỹ và những chuyến đi trao quà tại các cơ sở hỗ trợ trẻ em khuyết tật. Mỗi đóng góp về thời gian, công sức và sự sẻ chia đều góp phần lan tỏa yêu thương,mang đến những giá trị tích cực và bền vững cho cộng đồng.    ",
          image: "/attribute/donggop.jpg",
        },
      ],
    },
    previous: {
      title: "NHỮNG THÀNH CÔNG ĐÃ ĐẠT ĐƯỢC TRONG CÁC DỰ ÁN TRƯỚC",
      items: [
        {
          title: "HÀNH TRÌNH HY VỌNG 2024 \n NỐI KẾT ÁNH MẶT TRỜI",
          desc: "Hành Trình Hy Vọng 2024 – Nối Kết Ánh Mặt Trời là dự án thiện nguyện hướng đến trẻ em mồ côi và các cụ bà neo đơn tại Bến Tre và Tiền Giang. Dự án được tổ chức với gian hàng gây quỹ Summer Camp tại Trường Đại học FPT HCM với sự đồng hành cùng hơn 20 CLB nhằm huy động nguồn lực cho chuyến đi trao tặng vật phẩm hỗ trợ và tổ chức các hoạt động giao lưu ý nghĩa, góp phần lan tỏa tinh thần sẻ chia và kết nối cộng đồng.",
          image: "/NKAMT.png",
          special:
            "TỔNG SỐ TIỀN GÂY QUỸ: 20.322.000 VND\nQUY MÔ GIÚP ĐỠ: 140 TRẺ EM-12 CỤ BÀ NEO ĐƠN",
        },
        {
          title: "DỰ ÁN HÀNH TRÌNH HY VỌNG 2025 \n VƯƠN MẦM ƯỚC MƠ",
          desc: "Dự án Hành trình hy vọng 2025 - Vươn Mầm Ước Mơ là chuyến hành trình ghé thăm Trường Nuôi Dạy Trẻ Em Khuyết Tật Huyện Củ Chi, nơi SiTiGroup đồng hành cùng các em trong hành trình ươm mầm và nuôi dưỡng ước mơ, đồng thời lan tỏa thông điệp tích cực đến cộng đồng về khát vọng theo đuổi giấc mơ và đam mê của mỗi người.   ",
          image: "/VMUU.png",
          special:
            "TỔNG SỐ TIỀN GÂY QUỸ: 29.895.000 VND \n QUY MÔ GIÚP ĐỠ: 122 TRẺ EM ",
        },
      ],
    },
    partners: {
      title: "ĐỐI TÁC",
      logos: ["/Vision.png", "/Vision.png", "/Vision.png", "/Vision.png"],
    },
    memories: {
      title: "GÓC KỶ NIỆM",
      photos: Array.from({ length: 18 }).map(() => "/Vision.png"),
    },
  },

  page2: {
    event1: {
      title: "CÁC HOẠT ĐỘNG",
      blocks: [
        {
          title: "CHƯƠNG TRÌNH “NGƯỜI DỆT SÁNG” ",
          image: "/Vision.png",
          desc: " Chuyến đi thực tế đến các địa điểm hỗ trợ trẻ em khuyết tật cùng “Người Dệt Sáng”..",
        },
        {
          title: "BOOTH TRẢI NGHIỆM ",
          image: "/Vision.png",
          desc: " Hoạt động tương tác & trò chơ",
        },
      ],
    },
    event2: {
      title: "CÁC HOẠT ĐỘNG",
      blocks: [
        {
          title: "TRẠM TRIỂN LÃM THẤU ÁNH SAO",
          image: "/Vision.png",
          desc: "Người tham gia sẽ khám phá và thấu hiểu câu chuyện của các em thông qua triển lãm kết hợp hoạt động tương tác tìm kiếm thông tin.",
        },
        {
          title: "TRẠM TRẢI NGHIỆM CHẠM ÁNH SAO",
          image: "/Vision.png",
          desc: "Các trạm trải nghiệm mang đến hoạt động mô phỏng sinh hoạt của người khuyết tật, qua đó giúp người tham gia thấu hiểu sâu sắc và nuôi dưỡng sự đồng cảm",
        },
        {
          title: "TRẠM NHẮN GỬI TỎA ÁNH SÁNG",
          image: "/Vision.png",
          desc: "Không gian gửi gắm lời chúc và thông điệp yêu thương đến các em, được tổng hợp và trao lại như món quà tinh thần ý nghĩa.",
        },
        {
          title: "HOẠT ĐỘNG GÂY QUỸ",
          image: "/Vision.png",
          desc: "Gian hàng gây quỹ” bán các sản phẩm được thiết kế riêng theo chủ đề của dự án. Toàn bộ lợi nhuận thu được từ hoạt động sẽ được đóng góp vào các hoạt động thiện nguyện, các nhu yếu phẩm và hiện kim trao tặng cho các địa điểm trong khuôn khổ dự án.",
        },
      ],
    },
    event3: {
      title: "CÁC HOẠT ĐỘNG",
      blocks: [
        {
          title: "CHUYẾN ĐI TRAO QUÀ",
          image: "/Vision.png",
          desc: "Mô tả hoạt động.",
        },
        {
          title: "GALA TỔNG KẾT",
          image: "/Vision.png",
          desc: "Mô tả hoạt động...",
        },
      ],
    },
  },
  page3: {
    intro: {
      title: "STAR IS ART",
      description:
        "Đây là đoạn giới thiệu dự án. Sau này bạn thay bằng nội dung thật (mục tiêu, thông điệp, đối tượng hướng tới...).",
      highlights: [
        { title: "Hoạt động 1", note: "Mô tả ngắn" },
        { title: "Hoạt động 2", note: "Mô tả ngắn" },
        { title: "Hoạt động 3", note: "Mô tả ngắn" },
      ],
    },
  },
};
