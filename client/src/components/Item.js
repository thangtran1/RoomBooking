import React, { memo } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import instance from "../axiosConfig";
import { formatVietnameseToString } from "../ultils/Common/formatVietnameseToString";
import { path } from "../ultils/constant";
import icons from "../ultils/icons";

const { RiHeartFill, RiHeartLine, TfiStar, RiBookmark3Fill } = icons;

const Item = ({
  images,
  user,
  title,
  description,
  attributes,
  address,
  star,
  id,
  isLiked,
  getPostsLiked,
}) => {
  const { isLoggedIn } = useSelector((state) => state.auth);

  const handleHeartClick = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (isLiked) {
      await instance.post("/api/v1/favorite/unlikePost", {
        userId: user?.id,
        postId: id,
      });
    } else {
      await instance.post("/api/v1/favorite/likePost", {
        userId: user?.id,
        postId: id,
      });
    }
    await getPostsLiked();
  };
  const handleStar = (star) => {
    const stars = [];
    const numberOfStars = Number(star);
    for (let i = 1; i <= numberOfStars; i++) {
      stars.push(
        <TfiStar key={i} className="star-item" color="#caca00" size={"22px"} />
      );
    }
    return stars;
  };

  return (
    <div className="w-full flex border-t border-orange-600 py-4 ">
      <Link
        // to={`${path.DETAIL}${formatVietnameseToString(
        //   title?.replaceAll("/", "")
        // )}/${id}`}
        to={`/chi-tiet/${formatVietnameseToString(
          title?.replaceAll("/", "")
        )}/${id}`}
        className="w-2/5 flex flex-wrap gap-[2px] items-center relative cursor-pointer"
      >
        {images.length > 0 &&
          images
            .filter((_, index) => index < 4) // Limit to first 4 images
            .map((img, index) => (
              <img
                key={index}
                src={img}
                alt="preview"
                className="w-[47%] h-[120px] object-cover"
              />
            ))}

        <span className="text-white bg-overlay-70 px-2 rounded-md absolute left-1 bottom-1">{`${images.length} ảnh`}</span>

        <span
          onClick={handleHeartClick}
          className="text-white absolute right-7 bottom-1 cursor-pointer group size-[25px]"
        >
          {isLoggedIn && (
            <RiHeartFill
              color="red"
              size={25}
              className={`${isLiked ? "block" : "hidden"} group-hover:block`}
            />
          )}
          {isLoggedIn && (
            <RiHeartLine
              size={25}
              className={`${!isLiked ? "block" : "hidden"} group-hover:hidden`}
            />
          )}
        </span>
      </Link>

      <div className="w-4/5">
        <div className="flex justify-between gap-4 w-full">
          <Link
            to={`${path.DETAIL}${formatVietnameseToString(
              title?.replaceAll("/", "")
            )}/${id}`}
            className="text-red-600 font-medium "
          >
            {handleStar(+star).length > 0 &&
              handleStar(+star).map((star, number) => (
                <span key={number}>{star}</span>
              ))}
            {title}
          </Link>
          <div className="w-[10%] flex justify-end">
            <RiBookmark3Fill size={"25px"} color="orange" />
          </div>
        </div>
        <div className="flex my-2 items-center justify-between gap-2">
          <span className="font-bold flex-3 whitespace-nowrap overflow-hidden text-ellipsis text-green-600">
            {attributes?.price}
          </span>
          <span className="flex-1 whitespace-nowrap overflow-hidden text-ellipsis">
            {attributes?.acreage}
          </span>
          <span className="flex-3 whitespace-nowrap overflow-hidden text-ellipsis">
            {`${address.split(",")[address.split(",").length - 2]}${
              address.split(",")[address.split(",").length - 1]
            }`}
          </span>
        </div>
        <p className="text-gray-500 w-full h-[50px] text-ellipsis overflow-hidden">
          {description}
        </p>
        <div className="flex items-center my-5 justify-between">
          <div className="flex items-center">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpWyleA61aqadhutVq_kARFzefhDbxS63M-Q&s"
              alt="avatar"
              className="w-[30px] h-[30px] object-cover rounded-full"
            />
            <p>{user?.name}</p>
          </div>
          <div className="flex items-center gap-1">
            {user?.phone ? (
              <a
                rel="noreferrer"
                href={`tel:${user.phone}`}
                className="bg-blue-700 text-white p-1 rounded-md"
              >
                {`Gọi ${user.phone}`}
              </a>
            ) : (
              <span className="text-gray-500">
                Số điện thoại không khả dụng
              </span>
            )}
            {user?.zalo ? (
              <a
                rel="noreferrer"
                href={`https://zalo.me/${user.zalo}`}
                target="_blank"
                className="text-blue-700 px-1 rounded-md border border-blue-700"
              >
                Nhấn zalo
              </a>
            ) : (
              <span className="text-gray-500">Zalo không khả dụng</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Item);
