import icons from "./icons";

const { ImPencil2, MdOutlineLibraryBooks, BiUserPin, FaHeart } = icons;
const menuManage = [
  {
    id: 1,
    text: "Đăng tin cho thuê",
    path: "/he-thong/tao-moi-bai-dang",
    icon: <ImPencil2 />,
  },
  {
    id: 2,
    text: "Quản lý tin đăng",
    path: "/he-thong/quan-ly-bai-dang",
    icon: <MdOutlineLibraryBooks />,
  },
  {
    id: 3,
    text: "Thông tin tài khoản",
    path: "/he-thong/sua-thong-tin-ca-nhan",
    icon: <BiUserPin />,
  },
  {
    id: 4,
    text: "Tin đã lưu",
    path: "/tin-da-luu",
    icon: <FaHeart />,
  },
];

export default menuManage;
