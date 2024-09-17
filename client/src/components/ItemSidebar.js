import React, { memo } from "react";
import icons from "../ultils/icons";
import { connect } from "react-redux";
import { useRef, useEffect } from "react";
import { formatVietnameseToString } from "../ultils/Common/formatVietnameseToString";
import { createSearchParams, Link, useSearchParams } from "react-router-dom";

const filterPrice = [
  { title: "Duoi 1 tr", min: "", max: "1000000" },
  { title: "Tu 1 - 2 ", min: "1000000", max: "2000000" },
  { title: "Tren 15 tr", min: "15000000", max: "" },
];

const { GrNext } = icons;
const ItemSidebar = ({ title, content, isDouble, searchParamKey }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  // if double laf 1 hangf conf ko phair thif 2 hangf (xem theo gia)

  const formatContent = () => {
    const oddEL = content?.filter((item, index) => index % 2 !== 0);
    const eventEL = content?.filter((item, index) => index % 2 === 0);
    const formatContent = oddEL?.map((item, index) => {
      return {
        right: item,
        left: eventEL?.find((item2, index2) => index2 === index),
      };
    });
    return formatContent;
  };

  const handleFilter = (value) => {
    const queryParams = Object.fromEntries([...searchParams]);
    setSearchParams(
      createSearchParams({ ...queryParams, [searchParamKey]: value })
    );
  };

  return (
    <div className="w-full p-4 rounded-md bg-white">
      <h3 className="text-lg font-semibold mb-4"> {title}</h3>
      {!isDouble && (
        <div className="flex flex-col gap-2">
          {content?.length > 0 &&
            content.map((item) => {
              return (
                <Link
                  to={`${formatVietnameseToString(item.value)}`}
                  key={item.code}
                  className="flex gap-2 items-center cursor-pointer hover:text-orange-600 border-b border-gray-200 pb-1 border-dashed"
                >
                  <GrNext size={10} />
                  <p className="">{item.value}</p>
                </Link>
              );
            })}
        </div>
      )}
      {isDouble && (
        <div className="flex flex-col gap-2">
          {content?.length > 0 &&
            formatContent(content).map((item, index) => {
              return (
                <div key={index} className="">
                  <div className="flex gap-2 items-center justify-around">
                    <div
                      className="flex flex-1 gap-2 items-center cursor-pointer hover:text-orange-600 border-b border-gray-200 pb-1 border-dashed"
                      onClick={() => handleFilter(item.left.code)}
                    >
                      <GrNext size={10} />
                      <p className="">{item.left.value}</p>
                    </div>
                    <div
                      className="flex flex-1 gap-2 items-center cursor-pointer hover:text-orange-600 border-b border-gray-200 pb-1 border-dashed"
                      onClick={() => handleFilter(item.right.code)}
                    >
                      <GrNext size={10} />
                      <p className="">{item.right.value}</p>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default memo(ItemSidebar);
