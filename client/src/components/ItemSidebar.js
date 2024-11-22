import React, { memo } from "react";
import icons from "../ultils/icons";
import { useSearchParams } from "react-router-dom";

const { GrNext } = icons;

const ItemSidebar = ({ title, content, isDouble, searchParamKey }) => {
  console.log(
    "title, content, isDouble, searchParamKey",
    title,
    content,
    isDouble,
    searchParamKey
  );

  const [searchParams, setSearchParams] = useSearchParams();

  const formatContent = () => {
    const oddEL = content?.filter((_, index) => index % 2 !== 0);
    const evenEL = content?.filter((_, index) => index % 2 === 0);
    return oddEL?.map((item, index) => ({
      right: item,
      left: evenEL?.find((_, index2) => index2 === index),
    }));
  };

  const handleFilter = (value) => {
    const newParams = new URLSearchParams(searchParams.toString());

    if (searchParamKey === "priceCode") {
      const selectedPrice = content.find((item) => item.code === value);
      if (selectedPrice) {
        const priceRange = selectedPrice.value.replace("Từ ", "").split(" - ");
        const min = priceRange[0]?.trim();
        const max = priceRange[1]?.trim();

        if (max === "Trên") {
          newParams.set("priceMin", "");
          newParams.set("priceMax", min?.replace(" triệu", "").trim());
        } else if (min === "Dưới") {
          newParams.set("priceMin", "");
          newParams.set("priceMax", max?.replace(" triệu", "").trim());
        } else {
          newParams.set("priceMin", min?.replace("tr", ""));
          newParams.set("priceMax", max?.replace(" triệu", ""));
        }
      }
    } else if (searchParamKey === "areaCode") {
      const selectedArea = content.find((item) => item.code === value);
      if (selectedArea) {
        const areaRange = selectedArea.value.replace("Từ ", "").split(" - ");
        const min = areaRange[0]?.trim();
        const max = areaRange[1]?.trim();

        if (max === "Trên") {
          newParams.set("areaMin", min?.replace("m", "").trim());
          newParams.set("areaMax", "");
        } else if (min === "Dưới") {
          newParams.set("areaMin", "");
          newParams.set("areaMax", max?.replace("m", "").trim());
        } else {
          newParams.set("areaMin", min?.replace("m", "").trim());
          newParams.set("areaMax", max?.replace("m", "").trim());
        }
      }
    } else {
      newParams.set(searchParamKey, value);
    }

    if (!newParams.get("priceMin") && newParams.get("priceMax") !== "") {
      newParams.set("priceMin", "");
    } else if (newParams.get("priceMin") === "") {
      newParams.delete("priceMin");
    }

    if (!newParams.get("priceMax") && newParams.get("priceMin") !== "") {
      newParams.set("priceMax", "");
    } else if (newParams.get("priceMax") === "") {
      newParams.delete("priceMax");
    }

    if (!newParams.get("areaMin") && newParams.get("areaMax") !== "") {
      newParams.set("areaMin", "");
    } else if (newParams.get("areaMin") === "") {
      newParams.delete("areaMin");
    }

    if (!newParams.get("areaMax") && newParams.get("areaMin") !== "") {
      newParams.set("areaMax", "");
    } else if (newParams.get("areaMax") === "") {
      newParams.delete("areaMax");
    }
    setSearchParams(newParams);
  };
  return (
    <div className="w-full p-4 rounded-md bg-white">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      {!isDouble && (
        <div className="flex flex-col gap-2">
          {content?.length > 0 &&
            content.map((item) => (
              <div
                key={item.code}
                className="flex gap-2 items-center cursor-pointer hover:text-orange-600 border-b border-gray-200 pb-1 border-dashed"
                onClick={() => handleFilter(item.code)}
              >
                <GrNext size={10} />
                <p>{item.value}</p>
              </div>
            ))}
        </div>
      )}
      {isDouble && (
        <div className="flex flex-col gap-2">
          {content?.length > 0 &&
            formatContent().map((item, index) => (
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
            ))}
        </div>
      )}
    </div>
  );
};

export default memo(ItemSidebar);
