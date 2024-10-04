import { Modal } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import anonAvatar from "../../assets/anon.avatar.png";
import { Button, InputFormV2, InputReadOnly } from "../../components";
import {
  apiUpdatePassword,
  apiUpdatePhone,
  apiUpdateUser,
  apiUpdateEmail,
} from "../../services";
import { FaTrash } from "react-icons/fa";
import { getCurrent } from "../../store/actions";
import { fileToBase64 } from "../../ultils/Common/toBase64";

const EditAccount = () => {
  const { currentData } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState({
    name: "",
    avatar: "",
    fbUrl: "",
    zalo: "",
  });
  const [newPhone, setNewPhone] = useState("");
  const [oldPhone, setOldPhone] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [oldEmail, setOldEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [isPhoneModalVisible, setIsPhoneModalVisible] = useState(false);
  const [isEmailModalVisible, setIsEmailModalVisible] = useState(false);
  const [isPasswordModalVisible, setIsPasswordModalVisible] = useState(false);
  const [isAvatarSelected, setIsAvatarSelected] = useState(false);
  useEffect(() => {
    if (currentData) {
      setUserInfo({
        name: currentData.name || "",
        avatar: currentData?.avatar ?? "",
        fbUrl: currentData.fbUrl || "",
        zalo: currentData.zalo || "",
      });
      setNewPhone(currentData.phone || "");
      setOldPhone(currentData.phone || "");
      setNewEmail(currentData.email || "");
      setOldEmail(currentData.email || "");
      setIsAvatarSelected(!!currentData.avatar);
    }
  }, [currentData]);

  const handleChangeUserInfo = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await apiUpdateUser(currentData?.id, {
        ...userInfo,
        avatar: userInfo.avatar || "",
      });

      if (response?.data.msg === "User updated successfully!") {
        Swal.fire(
          "Done",
          "Chỉnh sửa thông tin cá nhân thành công",
          "success"
        ).then(() => {
          dispatch(getCurrent());
        });
      } else {
        Swal.fire(
          "Oops!",
          "Chỉnh sửa thông tin cá nhân không thành công",
          "error"
        );
      }
    } catch (error) {
      console.error("Error during API call:", error);
      Swal.fire("Error", "Có lỗi xảy ra trong quá trình cập nhật!", "error");
    }
  };

  const handleUpdatePhone = async () => {
    try {
      const response = await apiUpdatePhone({ phone: newPhone });

      if (response?.data.msg === "User updated successfully!") {
        Swal.fire("Done", "Cập nhật số điện thoại thành công", "success").then(
          () => {
            dispatch(getCurrent());
          }
        );
        setIsPhoneModalVisible(false);
      } else {
        Swal.fire(
          "Oops!",
          response?.data?.msg || "Cập nhật số điện thoại không thành công",
          "error"
        );
      }
    } catch (error) {
      console.error("Error updating phone:", error);
      Swal.fire(
        "Error",
        "Số điện thoại đã tồn tại hoặc định dạng không đúng!",
        "error"
      );
    }
  };

  const handleUpdatePassword = async () => {
    if (!oldPassword || !newPassword) {
      Swal.fire("Oops!", "Vui lòng nhập đầy đủ mật khẩu cũ và mới", "error");
      return;
    }

    try {
      const response = await apiUpdatePassword({
        oldPassword,
        newPassword,
      });

      if (
        response?.data.err === 1 &&
        response.data.msg === "Old password is incorrect"
      ) {
        Swal.fire("Oops!", "Mật khẩu cũ không chính xác", "error");
      } else if (
        response?.data.err === 0 &&
        response.data.msg === "User updated successfully!"
      ) {
        Swal.fire("Done", "Cập nhật mật khẩu thành công", "success");
        setOldPassword("");
        setNewPassword("");
        setIsPasswordModalVisible(false);
      } else {
        Swal.fire(
          "Oops!",
          response?.data?.msg ||
            "Đã xảy ra lỗi khi cập nhật mật khẩu. Vui lòng thử lại sau.",
          "error"
        );
      }
    } catch (error) {
      console.error("Error updating password:", error);
      Swal.fire(
        "Error",
        "Có lỗi xảy ra trong quá trình cập nhật mật khẩu!",
        "error"
      );
    }
  };

  const handleUpdateEmail = async () => {
    try {
      const response = await apiUpdateEmail({ email: newEmail });

      if (response?.data.msg === "User updated successfully!") {
        Swal.fire("Done", "Cập nhật Email thành công", "success").then(() => {
          dispatch(getCurrent());
        });
        setIsEmailModalVisible(false);
      } else {
        Swal.fire(
          "Oops!",
          response?.data?.msg || "Cập nhật Email không thành công",
          "error"
        );
      }
    } catch (error) {
      console.error("Error updating Email:", error);
      Swal.fire(
        "Error",
        "Có lỗi xảy ra trong quá trình cập nhật Email!",
        "error"
      );
    }
  };
  const handleUploadFile = async (e) => {
    const imageBase64 = await fileToBase64(e.target.files[0]);
    setUserInfo((prev) => ({
      ...prev,
      avatar: imageBase64,
    }));
    setIsAvatarSelected(true);
  };

  const handleRemoveAvatar = () => {
    setUserInfo((prev) => ({
      ...prev,
      avatar: "",
    }));
    setIsAvatarSelected(false);
  };

  return (
    <div className="flex flex-col h-full items-center">
      <h1 className="text-3xl w-full text-start font-medium py-4 border-b border-gray-200">
        Chỉnh sửa thông tin cá nhân
      </h1>
      <div className="w-4/5 flex items-center justify-center flex-auto">
        <div className="py-6 flex flex-col gap-4 w-full">
          <InputReadOnly
            direction="flex-row"
            label="Mã thành viên"
            value={
              `#${currentData?.id?.match(/\d/g).join("").slice(0, 6)}` || ""
            }
          />
          <div>
            <InputReadOnly
              direction="flex-row"
              label="Số điện thoại"
              value={currentData?.phone || ""}
            />
            <small
              className="text-blue-600 cursor-pointer hover:underline ml-48"
              onClick={() => {
                setNewPhone("");
                setIsPhoneModalVisible(true);
              }}
            >
              Đổi số điện thoại
            </small>
          </div>

          <div>
            <InputReadOnly
              direction="flex-row"
              label="Email"
              value={currentData?.email || ""}
            />
            <small
              className="text-blue-600 cursor-pointer hover:underline ml-48"
              onClick={() => {
                setNewEmail("");
                setIsEmailModalVisible(true);
              }}
            >
              Đổi Email
            </small>
          </div>

          <InputFormV2
            onChange={handleChangeUserInfo}
            name="name"
            label="Tên hiển thị"
            direction="flex-row"
            value={userInfo.name}
          />
          <InputFormV2
            onChange={handleChangeUserInfo}
            name="zalo"
            direction="flex-row"
            label="Zalo"
            value={userInfo.zalo}
          />
          <InputFormV2
            onChange={handleChangeUserInfo}
            name="fbUrl"
            direction="flex-row"
            label="Facebook"
            value={userInfo.fbUrl}
          />

          <div className=" flex gap-32 mb-5">
            <p className="cursor-default">Mật khẩu</p>
            <p
              className="text-blue-600 cursor-pointer hover:underline"
              onClick={() => setIsPasswordModalVisible(true)}
            >
              Đổi mật khẩu
            </p>
          </div>
          <div className="flex mb-10">
            <label className="w-48 flex-none" htmlFor="avatar">
              Ảnh đại diện
            </label>
            <div className="flex flex-col items-start">
              <img
                src={userInfo.avatar || anonAvatar}
                alt="avatar"
                className="w-28 h-28 rounded-full object-cover mb-2"
              />
              <input
                onChange={handleUploadFile}
                type="file"
                id="avatar"
                className="hidden"
                accept="image/*"
              />
              <label
                htmlFor="avatar"
                className=" flex items-center justify-center w-24 cursor-pointer hover:underline p-2 bg-gray-200 text-black rounded mb-2"
              >
                Chọn ảnh
              </label>
              <div className="flex items-center">
                {isAvatarSelected && (
                  <button
                    onClick={handleRemoveAvatar}
                    className="flex items-center justify-center w-24 text-red-600 cursor-pointer hover:underline p-2 bg-gray-200 rounded"
                  >
                    <FaTrash className="mr-1" />
                    Xóa
                  </button>
                )}
              </div>
            </div>
          </div>
          <Button
            text="Cập nhật thông tin"
            bgColor="bg-blue-600"
            textColor="text-white"
            onClick={handleSubmit}
          />
          <div className="mb-20"></div>
        </div>
      </div>

      <Modal
        title="Cập nhật số điện thoại"
        open={isPhoneModalVisible}
        onCancel={() => setIsPhoneModalVisible(false)}
        onOk={handleUpdatePhone}
      >
        <div className="flex flex-col gap-2 mt-5">
          <InputReadOnly
            direction="flex-row"
            label="Số điện thoại cũ"
            value={oldPhone}
          />
          <InputFormV2
            onChange={(e) => setNewPhone(e.target.value)}
            name="newPhone"
            label="Số điện thoại mới"
            type="number"
            direction="flex-row"
            value={newPhone}
          />
        </div>
      </Modal>

      <Modal
        title="Cập nhật Email"
        open={isEmailModalVisible}
        onCancel={() => setIsEmailModalVisible(false)}
        onOk={handleUpdateEmail}
      >
        <div className="flex flex-col gap-2 mt-5">
          <InputReadOnly
            direction="flex-row"
            label="Email cũ"
            value={oldEmail}
          />
          <InputFormV2
            onChange={(e) => setNewEmail(e.target.value)}
            name="newEmail"
            label="Email mới"
            type="email"
            direction="flex-row"
            value={newEmail}
          />
        </div>
      </Modal>

      <Modal
        title="Cập nhật mật khẩu"
        open={isPasswordModalVisible}
        onCancel={() => setIsPasswordModalVisible(false)}
        onOk={handleUpdatePassword}
      >
        <div className="flex flex-col gap-2 mt-5">
          <InputFormV2
            onChange={(e) => setOldPassword(e.target.value)}
            name="oldPassword"
            label="Mật khẩu cũ"
            direction="flex-row"
            type="password"
            value={oldPassword}
          />
          <InputFormV2
            onChange={(e) => setNewPassword(e.target.value)}
            name="newPassword"
            label="Mật khẩu mới"
            direction="flex-row"
            type="password"
            value={newPassword}
          />
        </div>
      </Modal>
    </div>
  );
};

export default EditAccount;
