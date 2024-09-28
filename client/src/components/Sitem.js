import React from "react";
import moment from "moment";
import "moment/locale/vi";
import { TfiStar } from "react-icons/tfi";
const Sitem = ({
  title,
  price,
  image,
  createdAt,
  star,
  likeCount,
  isCountLikePost,
}) => {
  const formatTime = (createdAt) => {
    moment.locale("vn");
    return moment(createdAt).fromNow();
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
    <div className="w-full flex items-center gap-2  border-b border-gray-400 py-2">
      <img
        className="w-[65px] h-[65px] object-cover rounded-md flex-none "
        src={image[0]}
        alt="ảnh sitem"
      />
      <div className=" w-full flex-auto flex flex-col justify-between gap-1 ">
        {isCountLikePost && (
          <span className="text-sm font-medium text-green-500">{`Lượt Like: ${likeCount} `}</span>
        )}
        <h4 className="text-blue-600 text-[14px]">
          {handleStar(+star).length > 0 &&
            handleStar(+star).map((star, number) => {
              return <span key={number}>{star}</span>;
            })}

          {`${title?.slice(0, 30)}...`}
        </h4>
        <div className="flex items-center justify-between w-full">
          <span className="text-sm font-medium text-green-500">{price}</span>
          <span className="text-sm text-gray-400">{formatTime(createdAt)}</span>
        </div>
      </div>
    </div>
  );
};

export default Sitem;
