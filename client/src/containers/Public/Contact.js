import axios from "axios";
import React, { useState } from "react";
import Swal from "sweetalert2";
import { Button, InputForm } from "../../components";

const Contact = () => {
  const [payload, setPayload] = useState({
    name: "",
    phone: "",
    content: "",
  });

  const regexPhone = /^(0[1-9]{1}[0-9]{8}|84[1-9]{1}[0-9]{8})$/;

  const handleSubmit = async () => {
    // Kiểm tra số điện thoại
    if (!payload.phone.trim()) {
      Swal.fire("Lỗi", "Số điện thoại không được để trống!", "error");
      return;
    }

    if (!regexPhone.test(payload.phone.trim())) {
      Swal.fire("Lỗi", "Số điện thoại không hợp lệ!", "error");
      return;
    }

    // Kiểm tra nội dung mô tả
    if (!payload.content.trim()) {
      Swal.fire("Lỗi", "Nội dung mô tả không được để trống!", "error");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/api/v1/contact/create-contact",
        payload
      );
      Swal.fire(
        `Cảm ơn ${payload.name ? payload.name : ""}`,
        "Phản hồi của bạn đã được chúng tôi ghi nhận",
        "success"
      ).then(() => {
        // Reset form sau khi gửi thành công
        setPayload({
          name: "",
          phone: "",
          content: "",
        });
      });
    } catch (error) {
      console.error("There was an error!", error);
      Swal.fire("Có lỗi xảy ra!", "Xin vui lòng thử lại sau.", "error");
    }
  };

  return (
    <div className="w-full">
      <h1 className="text-3xl font-semibold mb-6">Liên hệ với chúng tôi</h1>
      <div className="flex gap-4">
        <div className="flex-1 h-fit flex flex-col gap-4 bg-red-400 rounded-3xl p-4 text-white bg-gradient-to-br from-blue-700 to-cyan-400 ">
          <h4 className="font-medium text-2xl">Thông tin liên hệ</h4>
          <span>
            Chúng tôi biết bạn có rất nhiều sự lựa chọn. Nhưng cảm ơn vì đã lựa
            chọn PhongTroLaLaHome.Com
          </span>
          <span>
            <span className="font-bold">Điện thoại</span>: 0389 215 396
          </span>
          <span>
            <span className="font-bold">Email</span>: phongtrolalahome@gmail.com
          </span>
          <span>
            <span className="font-bold">Zalo</span>: 0389 215 396
          </span>
          <span>
            <span className="font-bold">Viber</span>: 0389 215 396
          </span>
          <span>
            <span className="font-bold">Địa chỉ</span>: 32 Phan Đăng Lưu, Hoà
            Cường Bắc, Hải Châu, Đà Nẵng, Việt Nam.
          </span>
        </div>
        <div className="flex-1 bg-white shadow-md rounded-md p-4 mb-6">
          <h4 className="font-medium text-2xl mb-4">Liên hệ trực tuyến</h4>
          <div className="flex flex-col gap-6">
            <InputForm
              label="HỌ VÀ TÊN CỦA BẠN"
              value={payload.name}
              setValue={setPayload}
              keyPayload="name"
            />
            <InputForm
              label="SỐ ĐIỆN THOẠI"
              value={payload.phone}
              setValue={setPayload}
              keyPayload="phone"
            />
            <div>
              <label htmlFor="desc">NỘI DUNG MÔ TẢ</label>
              <textarea
                className="outline-none bg-[#e8f0f2] p-2 rounded-md w-full"
                id="desc"
                cols="30"
                rows="3"
                value={payload.content}
                onChange={(e) =>
                  setPayload((prev) => ({
                    ...prev,
                    content: e.target.value,
                  }))
                }
                name="content"
              ></textarea>
            </div>
            <Button
              text="Gửi liên hệ"
              bgColor="bg-blue-500"
              textColor="text-white"
              fullWidth
              onClick={handleSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
