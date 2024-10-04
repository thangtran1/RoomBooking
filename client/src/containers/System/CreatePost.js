import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { Address, Button, Loading, Overview } from "../../components";
import { apiCreatePost, apiUpdatePost, apiUploadImages } from "../../services";
import { resetDataEdit } from "../../store/actions";
import { getCodes, getCodesAreas } from "../../ultils/Common/getCodes";
import { validate } from "../../ultils/Common/validateField";
import { noteCreatedPost } from "../../ultils/constant";
import icons from "../../ultils/icons";
const { ImBin, AiOutlineCloudUpload } = icons;

const CreatePost = ({ isEdit }) => {
  const dispatch = useDispatch();
  const { dataEdit } = useSelector((state) => state.post);
  const [payload, setPayload] = useState(() => {
    const initData = {
      categoryCode: dataEdit?.categoryCode || "",
      title: dataEdit?.title || "",
      priceNumber: dataEdit?.priceNumber || 0,
      areaNumber: dataEdit?.areaNumber || 0,
      images: dataEdit?.images?.image
        ? JSON.parse(dataEdit?.images?.image)
        : "",
      address: dataEdit?.address || "",
      priceCode: dataEdit?.priceCode || "",
      areaCode: dataEdit?.areaCode || "",
      description: dataEdit?.description
        ? Array.isArray(JSON.parse(dataEdit.description))
          ? JSON.parse(dataEdit.description)
          : [dataEdit.description]
        : "",
      target: dataEdit?.overview?.target || "",
      province: dataEdit?.province || "",
    };

    return initData;
  });

  const [imagesPreview, setImagesPreview] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { prices, areas, categories } = useSelector((state) => state.app);
  const { currentData } = useSelector((state) => state.user);
  const [invalidFields, setInvalidFields] = useState([]);

  useEffect(() => {
    if (dataEdit) {
      let images = JSON.parse(dataEdit?.images?.image);
      images && setImagesPreview(images);
    }
  }, [dataEdit]);

  const handleFiles = async (e) => {
    e.stopPropagation();
    setIsLoading(true);
    let images = [];
    let files = e.target.files;
    let formData = new FormData();
    for (let i of files) {
      formData.append("file", i);
      formData.append(
        "upload_preset",
        process.env.REACT_APP_UPLOAD_ASSETS_NAME
      );

      let response = await apiUploadImages(formData);
      if (response.status === 200)
        images = [...images, response.data?.secure_url];
    }
    setIsLoading(false);
    setImagesPreview((prev) => [...prev, ...images]);
    setPayload((prev) => ({
      ...prev,
      images: [...prev.images, ...images],
    }));
  };
  const handleDeleteImage = (image) => {
    setImagesPreview((prev) => prev?.filter((item) => item !== image));
    setPayload((prev) => ({
      ...prev,
      ...prev,
      images: prev.images?.filter((item) => item !== image),
    }));
  };
  const handleSubmit = async () => {
    const formattedTitle = payload.title.trim().replace(/\s+/g, " ");
    if (!payload.title || payload.title.trim() === "") {
      Swal.fire("Thông báo", "Tiêu đề không được để trống!", "error");
      return;
    }

    if (
      !payload?.description ||
      (Array.isArray(payload.description) &&
        payload.description.every((desc) => desc.trim() === ""))
    ) {
      Swal.fire("Thông báo", "Nội dung mô tả không được để trống!", "error");
      return;
    }
    if (payload.priceNumber < 0) {
      Swal.fire("Thông báo", "Giá không được là số âm!", "error");
      return;
    }

    if (payload.areaNumber < 0) {
      Swal.fire("Thông báo", "Diện tích không được là số âm!", "error");
      return;
    }
    if (!payload.target || payload.target.trim() === "") {
      Swal.fire(
        "Thông báo",
        "Đối tượng cho thuê không được để trống!",
        "error"
      );
      return;
    }

    let priceCodeArr = getCodes(+payload.priceNumber, prices, 1, 15);
    let priceCode = priceCodeArr[priceCodeArr.length - 1]?.code;

    let areaCodeArr = getCodesAreas(+payload.areaNumber, areas, 0, 90);
    let areaCode = areaCodeArr[0]?.code;

    let finalPayload = {
      ...payload,
      title: formattedTitle,
      priceCode,
      areaCode,
      userId: currentData.id,
      priceNumber: +payload.priceNumber / Math.pow(10, 6),
      target: payload.target || "Tất cả",
      label: `${
        categories?.find((item) => item.code === payload?.categoryCode)?.value
      } ${payload?.address?.split(",")[0]} `,
    };
    console.log("🚀 ~ handleSubmit ~ finalPayload:", finalPayload);

    const result = validate(finalPayload, setInvalidFields);

    if (result === 0) {
      if (dataEdit) {
        finalPayload.postId = dataEdit?.id;
        finalPayload.attributesId = dataEdit?.attributesId;
        finalPayload.imagesId = dataEdit?.imagesId;
        finalPayload.overviewId = dataEdit?.overviewId;

        const response = await apiUpdatePost(finalPayload);
        if (response?.data.err === 0) {
          Swal.fire(
            "Thành công",
            "Đã chỉnh sửa bài đăng thành công",
            "success"
          ).then(() => {
            resetPayload();
            dispatch(resetDataEdit());
          });
        } else {
          Swal.fire("Oops!", "Có lỗi gì đó", "error");
        }
      } else {
        const response = await apiCreatePost(finalPayload);
        if (response?.data.err === 0) {
          Swal.fire("Thành công", "Đã thêm bài đăng mới", "success").then(
            () => {
              resetPayload();
            }
          );
        } else {
          Swal.fire("Oops!", "Có lỗi gì đó", "error");
        }
      }
    }
  };

  const resetPayload = () => {
    setPayload({
      categoryCode: "",
      title: "",
      priceNumber: 0,
      areaNumber: 0,
      images: "",
      address: "",
      priceCode: "",
      areaCode: "",
      description: "",
      target: "",
      province: "",
    });
  };
  return (
    <div className="px-6 ">
      <h1 className="text-3xl font-medium py-4 border-b border-gray-200">
        {isEdit ? "Chỉnh sửa tin đăng" : "Đăng tin mới"}
      </h1>
      <div className="flex gap-4 ">
        <div className="py-4 flex flex-col gap-8 flex-auto">
          <Address
            setInvalidFields={setInvalidFields}
            invalidFields={invalidFields}
            payload={payload}
            setPayload={setPayload}
          />
          <Overview
            setInvalidFields={setInvalidFields}
            invalidFields={invalidFields}
            payload={payload}
            setPayload={setPayload}
          />
          <div className="w-full mb-6">
            <h2 className="font-semibold text-xl py-4">Hình ảnh</h2>
            <small>Cập nhất hình ảnh rõ ràng sẽ cho thuê nhanh hơn</small>
            <div className="w-full">
              <label
                className="w-2/5 border-2 justify-center items-center border-gray-400 flex flex-col gap-4 border-dashed rounded-md h-[100px] my-2 "
                htmlFor="file"
              >
                {isLoading ? (
                  <Loading />
                ) : (
                  <div className="flex flex-col items-center justify-center">
                    <AiOutlineCloudUpload size={50} color="blue" />
                    Thêm Ảnh
                  </div>
                )}
              </label>
              <input
                onChange={handleFiles}
                hidden
                type="file"
                id="file"
                multiple
              />
              <small className="text-red-500 block w-full">
                {invalidFields?.some((item) => item.name === "images") &&
                  invalidFields?.find((item) => item.name === "images")
                    ?.message}
              </small>
              <div className="w-full">
                <h3 className="font-medium py-4 ">Ảnh đã chọn</h3>
                <div className="flex gap-4 items-center">
                  {imagesPreview?.map((item) => {
                    return (
                      <div key={item} className="relative w-1/3 h-1/3 ">
                        <img
                          src={item}
                          alt="preview"
                          className="w-full h-full object-cover rounded-md"
                        />
                        <span
                          onClick={() => handleDeleteImage(item)}
                          title="Xóa"
                          className="absolute top-0 right-0 p-2 cursor-pointer bg-gray-300 hover:bg-gray-400 rounded-full"
                        >
                          <ImBin />
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <Button
            onClick={handleSubmit}
            text={isEdit ? "Cập nhật" : "Tạo mới"}
            bgColor="bg-green-600"
            textColor="text-white"
          />
          <div className="h-[500px]"></div>
        </div>

        <div className="w-[30%] flex-none pt-12">
          {/* <Map address={payload.address} /> */}
          <div className="mt-8 bg-orange-100 text-orange-900 rounded-md p-4">
            <h4 className="text-xl font-medium mb-4">Lưu ý tin đăng</h4>
            <div>
              <ul className="text-sm list-disc pl-6 text-justify">
                {noteCreatedPost.map((item, index) => {
                  return <li key={index}>{item}</li>;
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
