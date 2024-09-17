import React from "react";
import logoFooter1 from "../assets/logo_footer1.png";
import logoFooter2 from "../assets/logo_footer2.png";
import logoFooter3 from "../assets/logo_footer3.png";
import logoFooter4 from "../assets/logo_footer4.png";
import logoFooter5 from "../assets/logo.png";
import icons from "../ultils/icons";

const { FaTiktok, ImFacebook, FaInstagram, MdEmail } = icons;

const Footer = () => {
  return (
    <footer className=" border-4 border-dashed border-blue-200  w-3/5 flex flex-col justify-center gap-6 items-center  bg-white rounded-md shadow-md p-4">
      {/* Phần trên cùng */}
      <div className="container mx-auto py-8 px-4  grid grid-cols-2 gap-3">
        {/* Logo và giới thiệu */}
        <div className="col-span-1">
          <img src={logoFooter5} alt="logo" className="mb-4 w-80 h-20" />
          <p className="text-gray-600">
            Phongtro123.com tự hào có lượng dữ liệu bài đăng lớn nhất trong lĩnh
            vực cho thuê phòng trọ.
          </p>
        </div>

        {/* Về PHONGTRO123.COM */}
        {/* <div className="col-span-1">
          <h3 className="text-lg font-bold mb-4">Về Phongtrolalahome.COM</h3>
          <ul className="space-y-2 text-gray-600">
            <li>Trang chủ</li>
            <li>Giới thiệu</li>
            <li>Blog</li>
            <li>Quy chế hoạt động</li>
            <li>Quy định sử dụng</li>
            <li>Chính sách bảo mật</li>
            <li>Liên hệ</li>
          </ul>
        </div> */}

        {/* Hỗ trợ khách hàng */}
        {/* <div className="col-span-1">
          <h3 className="text-lg font-bold mb-4">Hỗ trợ khách hàng</h3>
          <ul className="space-y-2 text-gray-600">
            <li>Câu hỏi thường gặp</li>
            <li>Hướng dẫn đăng tin</li>
            <li>Bảng giá dịch vụ</li>
            <li>Quy định đăng tin</li>
            <li>Giải quyết khiếu nại</li>
          </ul>
        </div> */}

        {/* Liên hệ và phương thức thanh toán */}
        <div className="col-span-1">
          <h3 className="text-lg font-bold mb-4">Liên hệ với chúng tôi</h3>
          <div className="flex gap-4 mb-4">
            <a href="https://www.facebook.com/profile.php?id=100040684543718&locale=vi_VN">
              <ImFacebook className="text-2xl text-blue-400 p-2 border border-gray-400 rounded-full w-10 h-10 flex justify-center items-center" />
            </a>
            <MdEmail className="text-2xl text-blue-400 p-2 border border-gray-400 rounded-full w-10 h-10 flex justify-center items-center" />

            <a href=" ">
              <FaInstagram className="text-2xl text-blue-400 p-2 border border-gray-400 rounded-full w-10 h-10 flex justify-center items-center" />
            </a>
            <a href="">
              <FaTiktok className="text-2xl text-blue-400 p-2 border border-gray-400 rounded-full w-10 h-10 flex justify-center items-center" />
            </a>
          </div>
          <h3 className="text-lg font-bold mb-4">Phương thức thanh toán</h3>
          <div className="flex flex-wrap gap-1 ">
            <img
              src="https://static-00.iconduck.com/assets.00/visa-icon-2048x628-6yzgq2vq.png"
              alt="visa"
              className=" bg-gray-200 h-10 border border-gray-400 w-20 object-scale-down"
            />
            <img
              src="https://athgroup.vn/upload/blocks/thumb_1920x0/ATH-kh%C3%A1m-ph%C3%A1-b%E1%BB%99-nh%E1%BA%ADn-di%E1%BB%87n-mastercard-4.png"
              alt="mastercard"
              className="bg-gray-200 h-10 border border-gray-400 w-20 object-scale-down"
            />
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYmCogD-ZWpxmfaycZFmCJmcw5zCxgwFVXKQ&s"
              alt="jcb"
              className="h-10 bg-gray-200 border border-gray-400 w-20"
            />
            <img
              src="https://img.freepik.com/premium-vector/banking-logo-blue-color_448156-390.jpg"
              alt="internet banking"
              className="h-10 bg-gray-200 border border-gray-400 w-20"
            />
            <img
              src="https://developers.momo.vn/v3/vi/assets/images/icon-52bd5808cecdb1970e1aeec3c31a3ee1.png"
              alt="momo"
              className="h-10 bg-gray-200 border border-gray-400 w-20"
            />
          </div>
        </div>
      </div>

      {/* Cùng hệ thống LBKCorp */}
      <div className="flex flex-col items-center justify-start p-2 gap-4 container mx-auto py-4 border-t border-b border-gray-200">
        <h4 className="text-center text-lg font-bold mb-4">
          Cùng hệ thống LBKCorp:
        </h4>
        <div className="flex justify-center gap-8">
          <img
            src={logoFooter1}
            alt="logo 1"
            className="h-12 w-24 object-contain"
          />
          <img
            src={logoFooter2}
            alt="logo 2"
            className="h-12 w-24 object-contain"
          />
          <img
            src={logoFooter3}
            alt="logo 3"
            className="h-12 w-24 object-contain"
          />
          <img
            src={logoFooter4}
            alt="logo 4"
            className="h-12 w-24 object-contain"
          />
        </div>
      </div>

      {/* Thông tin công ty */}
      <div className="container mx-auto py-6 text-center">
        <h4 className="font-bold text-lg uppercase">
          Công ty tnhh 1 thành viên
        </h4>
        <p className="text-gray-600">
          <span className="font-semibold">Tổng đài CSKH</span>: 0389215396
        </p>
        <p className="text-gray-600">
          Copyright © 2023 - 2024 PhongTroLaLaHome.com
        </p>
        <p className="text-gray-600">
          <span className="font-semibold">Email</span>: thangtrandz04@gmail.com
        </p>
        <p className="text-gray-600">
          <span className="font-semibold">Địa chỉ</span>: 32 Phan Đăng Lưu, Hoà
          Cường Bắc, Hải Châu, Đà Nẵng, Việt Nam
        </p>
        <p className="text-gray-600">
          "Hãy cùng chúng tôi xây dựng một cộng đồng vững mạnh hơn bằng cách
          đóng góp ý kiến của bạn. Chúng tôi luôn lắng nghe!"
        </p>
      </div>
    </footer>
  );
};

export default Footer;
