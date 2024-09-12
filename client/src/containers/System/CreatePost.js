import React, { useState } from "react";
import uploadimage from "../../assets/upload-image.png";
import { Overview, Address, Loading, Button } from "../../components";
import icons from "../../ultils/icons";
import { apiUploadImages } from "../../services";
import { getCodes, getCodesAreas } from "../../ultils/Common/getCodes";
import { useSelector } from "react-redux";
const { ImBin, AiOutlineCloudUpload } = icons;
const CreatePost = () => {
  const [payload, setPayload] = useState({
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
  const [imagesPreview, setImagesPreview] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { prices, areas } = useSelector((state) => state.app);

  // console.log("🚀 ~ CreatePost ~ payload:", payload);
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
  const handleSubmit = () => {
    let priceCodeArr = getCodes(
      [+payload.priceNumber, payload.priceNumber],
      prices
    );
    let priceCode = priceCodeArr[priceCodeArr.length - 1]?.code;
    console.log("🚀 ~ handleSubmit ~ priceCode:", priceCode);
  };
  return (
    <div className="px-6 ">
      <h1 className="text-3xl font-medium py-4 border-b border-gray-200">
        Đăng tin mới
      </h1>
      <div className="flex gap-4 ">
        <div className="py-4 flex flex-col gap-8 flex-auto">
          <Address payload={payload} setPayload={setPayload} />
          <Overview payload={payload} setPayload={setPayload} />
          <div className="w-full mb-6">
            <h2 className="font-semibold text-xl py-4">Hình ảnh</h2>
            <small>Cập nhất hình ảnh rõ ràng sẽ cho thuê nhanh hơn</small>
            <div className="w-full">
              <label
                className="w-full border-2 justify-center items-center border-gray-400 flex flex-col gap-4 border-dashed rounded-md h-[200px] my-4 "
                htmlFor="file"
              >
                {/* <img
                  src={uploadimage}
                  width="90px"
                  height="90px"
                  color="blue"
                /> */}
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
            text="Tạo mới"
            bgColor="bg-green-600"
            textColor="text-white"
          />
          <div className="h-[500px]"></div>
        </div>

        <div className="w-[30%] flex-none">
          {" "}
          <Loading /> Maps
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
