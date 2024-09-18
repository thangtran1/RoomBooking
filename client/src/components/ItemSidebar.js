import React, { memo } from "react";
import icons from "../ultils/icons";
import { useSearchParams } from "react-router-dom";
import { formatVietnameseToString } from "../ultils/Common/formatVietnameseToString";

const { GrNext } = icons;

const ItemSidebar = ({ title, content, isDouble }) => {
  const [searchParams, setSearchParams] = useSearchParams();

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
    // Tạo đối tượng tham số tìm kiếm
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("categoryCode", value);

    // Cập nhật URL với tham số tìm kiếm mới
    setSearchParams(newParams);
  };

  return (
    <div className="w-full p-4 rounded-md bg-white">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      {!isDouble && (
        <div className="flex flex-col gap-2">
          {content?.length > 0 &&
            content.map((item) => {
              return (
                <div
                  key={item.code}
                  className="flex gap-2 items-center cursor-pointer hover:text-orange-600 border-b border-gray-200 pb-1 border-dashed"
                  onClick={() => handleFilter(item.code)}
                >
                  <GrNext size={10} />
                  <p>{item.value}</p>
                </div>
              );
            })}
        </div>
      )}
      {isDouble && (
        <div className="flex flex-col gap-2">
          {content?.length > 0 &&
            formatContent(content).map((item, index) => {
              return (
                <div key={index}>
                  <div className="flex gap-2 items-center justify-around">
                    <div
                      className="flex flex-1 gap-2 items-center cursor-pointer hover:text-orange-600 border-b border-gray-200 pb-1 border-dashed"
                      onClick={() => handleFilter(item.left.code)}
                    >
                      <GrNext size={10} />
                      <p>{item.left.value}</p>
                    </div>
                    <div
                      className="flex flex-1 gap-2 items-center cursor-pointer hover:text-orange-600 border-b border-gray-200 pb-1 border-dashed"
                      onClick={() => handleFilter(item.right.code)}
                    >
                      <GrNext size={10} />
                      <p>{item.right.value}</p>
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
