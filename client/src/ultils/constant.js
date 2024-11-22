export const path = {
  HOME: "/*",
  HOME__PAGE: ":page",
  LOGIN: "login",
  CHO_THUE_CAN_HO: "cho-thue-can-ho",
  CHO_THUE_MAT_BANG: "cho-thue-mat-bang",
  NHA_TRO_THUE: "nha-cho-thue",
  CHO_THUE_PHONG_TRO: "cho-thue-phong-tro",
  DETAIL_POST__TITLE__POSTID: "chi-tiet/:title/:postId",
  SEARCH: "tim-kiem",
  SYSTEM: "/he-thong/*",
  CREATE_POST: "tao-moi-bai-dang",
  MANAGE_POST: "quan-ly-bai-dang",
  EDIT_ACCOUNT: "sua-thong-tin-ca-nhan",
  CONTACT: "lien-he",
  DETAIL: "chi-tiet/",
  DETAIL_ALL: "chi-tiet/*",
  MANAGE_ADMIN: "quan-ly-admin",
  MANAGE_USER: "quan-ly-user",
  MANAGE_CATEGORY: "quan-ly-danh-muc",
  MANAGE_POST_USER: "quan-ly-bai-dang-user",
  MANAGE_CONTACT: "quan-ly-phan-hoi",
  SAVE_NEW: "tin-da-luu",
};

export const text = {
  HOME_TITLE: "Tìm kiếm chỗ thuê ưng ý",
  HOME_DESCRIPTION:
    "Kênh thông tin Phòng trọ số 1 Việt Nam - Website đăng tin cho thuê phòng trọ, nhà nguyên căn, căn hộ, ở ghép nhanh, hiệu quả với 100.000+ tin đăng và 2.500.000 lượt xem mỗi tháng.",
  HOME_SUB_TITLE: "Khu vực nổi bật",
};

export const location = [
  {
    id: "hcm",
    name: "Phòng trọ Hồ Chí Minh",
    image: "https://phongtro123.com/images/location_hcm.jpg",
    provinceCode: "CUIC",
  },
  {
    id: "hn",
    name: "Phòng trọ Hà Nội",
    image: "https://phongtro123.com/images/location_hn.jpg",
    provinceCode: "NDOA",
  },
  {
    id: "dn",
    name: "Phòng trọ Đà Nẵng",
    image: "https://phongtro123.com/images/location_dn.jpg",
    provinceCode: "NNAA",
  },
];

export const underMap = [
  'Bạn đang xem nội dung tin đăng: "',
  '". Mọi thông tin liên quan đến tin đăng này chỉ mang tính chất tham khảo. Nếu bạn có phản hồi với tin đăng này (báo xấu, tin đã cho thuê, không liên lạc được,...), vui lòng thông báo để TroMoi có thể xử lý.',
];

export const noteCreatedPost = [
  "Lưu ý khi đăng tin Nội dung phải viết bằng tiếng Việt có dấu",
  "Tiêu đề tin không dài quá 100 kí tự",
  "Các bạn nên điền đầy đủ thông tin vào các mục để tin đăng có hiệu quả hơn.",
  "Để tăng độ tin cậy và tin rao được nhiều người quan tâm hơn, hãy sửa vị trí tin rao của bạn trên bản đồ bằng cách kéo icon tới đúng vị trí của tin rao.",
  "Tin đăng có hình ảnh rõ ràng sẽ được xem và gọi gấp nhiều lần so với tin rao không có ảnh. Hãy đăng ảnh để được giao dịch nhanh chóng!",
];

export const NUMBER_REGEX = /^[0-9]*$/;
