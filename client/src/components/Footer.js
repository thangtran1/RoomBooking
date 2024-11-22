import React from "react";
import logos from "../assets";
import icons from "../ultils/icons";

const { FaTiktok, ImFacebook, FaInstagram, MdEmail } = icons;

const Footer = () => {
  return (
    <>
      <footer className=" border-dashed border-blue-200  w-full flex flex-col mt-6 justify-between items-center  bg-white rounded-md shadow-md p-4">
        <div className=" mx-auto py-8 px-4 w-4/5 flex gap-3">
          <div className="col-span-1 w-4/5">
            <img
              src={logos.logoFooter5}
              alt="logo"
              className="mb-4 w-52 h-20"
            />
            <p className="text-gray-600 ">
              Phongtro123.com tự hào có lượng dữ liệu bài đăng lớn nhất trong
              lĩnh vực cho thuê phòng trọ.
            </p>
            <div className="flex justify-start gap-2">
              <img
                src={logos.logoFooter2}
                alt="logo 2"
                className="h-16 w-28 object-contain"
              />
              <img
                src={logos.logoFooter3}
                alt="logo 3"
                className="h-16 w-28 object-contain"
              />
              <img
                src={logos.logoFooter4}
                alt="logo 4"
                className="h-16 w-28 object-contain"
              />
            </div>
          </div>

          <div className="flex col-span-1 w-4/5">
            <div className="flex gap-20">
              <div className="flex gap-4 mb-2 flex-col">
                <h3 className="text-lg font-semibold mb-5 ">
                  Liên hệ với chúng tôi
                </h3>
                <p className="flex gap-2 items-center">
                  <ImFacebook className="text-2xl text-blue-400 p-2 border border-gray-400 rounded-full w-10 h-10 flex justify-center items-center" />
                  <a
                    href="https://www.facebook.com/profile.php?id=100040684543718&locale=vi_VN"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Facebook.com.vn
                  </a>
                </p>
                <p className="flex gap-2 items-center">
                  <MdEmail className="text-2xl text-blue-400 p-2 border border-gray-400 rounded-full w-10 h-10 flex justify-center items-center" />
                  <a
                    href="https://www.facebook.com/profile.php?id=100040684543718&locale=vi_VN"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Email@gmail.com
                  </a>
                </p>

                <p className="flex gap-2 items-center">
                  <FaInstagram className="text-2xl text-blue-400 p-2 border border-gray-400 rounded-full w-10 h-10 flex justify-center items-center" />
                  <a href=" " target="_blank">
                    Instagram
                  </a>
                </p>
                <p className="flex gap-2 items-center">
                  <FaTiktok className="text-2xl text-blue-400 p-2 border border-gray-400 rounded-full w-10 h-10 flex justify-center items-center" />
                  <button>TikTok</button>
                </p>
              </div>
              <div className="flex gap-4 mb-2 flex-col">
                <h3 className="text-lg font-semibold mb-5 ">
                  Phương thức thanh toán
                </h3>
                <div className="flex flex-wrap gap-1">
                  <img
                    src="https://static-00.iconduck.com/assets.00/visa-icon-2048x628-6yzgq2vq.png"
                    alt="visa"
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
          </div>
        </div>

        <div className="w-4/5 px-4 flex  items-center justify-start p-2 gap-4  mx-auto py-4 border-t border-b border-gray-200">
          <h4 className=" text-center font-semibold">
            Đồng hành cùng chúng tôi:
          </h4>
          <div className="flex justify-center gap-8">
            <img
              src={logos.logo1}
              alt="logo 1"
              className="h-10 w-28 object-contain"
            />
            <img
              src={logos.logo2}
              alt="logo 2"
              className="h-10 w-28 object-contain"
            />
            <img
              src={logos.logo3}
              alt="logo 3"
              className="h-10 w-28 object-contain"
            />
            <img
              src={logos.logo4}
              alt="logo 4"
              className="h-10 w-28 object-contain"
            />
          </div>
        </div>

        <div className="w-4/5 container mx-auto py-6 text-center">
          <h4 className="font-bold text-lg uppercase">
            Công ty tnhh 1 thành viên
          </h4>
          <p className="text-gray-600">
            <span className="font-semibold">Tổng đài CSKH</span>: 0389215396
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Email</span>:
            thangtrandz04@gmail.com
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Địa chỉ</span>: 32 Phan Đăng Lưu,
            Hoà Cường Bắc, Hải Châu, Đà Nẵng, Việt Nam
          </p>
          <p className="text-gray-600">
            "Hãy cùng chúng tôi xây dựng một cộng đồng vững mạnh hơn bằng cách
            đóng góp ý kiến của bạn. Chúng tôi luôn lắng nghe!"
          </p>
        </div>
      </footer>
      <div className=" p-4 font-semibold flex items-center justify-center bg-[#0045a8] w-full text-white">
        Copyright © 2023 - 2024 TroMoi.com
      </div>
    </>
  );
};

export default Footer;
