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
          image: "/Vision.png",
        },
        {
          title: "Tình nguyện viên",
          desc: "Tham gia với vai trò tình nguyện viên SiTiGroup, bạn sẽ trực tiếp đồng hành cùng Hành Trình Hy Vọng 2026 trong các hoạt động chuẩn bị, tổ chức gian hàng gây quỹ và những chuyến đi trao quà tại các cơ sở hỗ trợ trẻ em khuyết tật. Mỗi đóng góp về thời gian, công sức và sự sẻ chia đều góp phần lan tỏa yêu thương,mang đến những giá trị tích cực và bền vững cho cộng đồng.    ",
          image: "/Vision.png",
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
          title: "Dự án Hành trình hy vọng 2025 \n Vươn Mầm Ước Mơ ",
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
    title: "CÁC HOẠT ĐỘNG",
    blocks: [
      {
        title: "Hoạt động triễn lãm \n  ''Thấu Ánh Sao''",
        image: "/Vision.png",
        desc: "Mô tả hoạt động.",
      },
      {
        title: "Chuỗi hoạt động trải nghiệm  ''Chạm Ánh Sao''",
        image: "/Vision.png",
        desc: "Mô tả hoạt động...",
      },
      {
        title: "Hoạt động nhắn gửi \n''Tỏa Ánh Sáng''",
        image: "/Vision.png",
        desc: "Mô tả hoạt động...",
      },
      {
        title: "Gian hàng bán Merchandise",
        image: "/Vision.png",
        desc: "Mô tả hoạt động...",
      },
      {
        title: "Chuyến đi thắp sáng",
        image: "/Vision.png",
        desc: "Mô tả hoạt động...",
      },
      {
        title: "Gala Hành Trình Hy Vọng",
        image: "/Vision.png",
        desc: "Mô tả hoạt động...",
      },
    ],
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
