import { Input } from "antd";
import React, { memo } from "react";
import { createSearchParams, useSearchParams } from "react-router-dom";
import icons from "../ultils/icons";

const { GrLinkPrevious } = icons;

const arrPrice = [
  { label: "Dưới 1 triệu", priceMin: "", priceMax: 1 },
  { label: "Từ 1 đến 2 triệu", priceMin: 1, priceMax: 2 },
  { label: "Từ 2 đến 3 triệu", priceMin: 2, priceMax: 3 },
  { label: "Từ 3 đến 5 triệu", priceMin: 3, priceMax: 5 },
  { label: "Từ 5 đến 7 triệu", priceMin: 5, priceMax: 7 },
  { label: "Từ 7 đến 10 triệu", priceMin: 7, priceMax: 10 },
  { label: "Từ 10 đến 15 triệu", priceMin: 10, priceMax: 15 },
  { label: "Trên 15 triệu", priceMin: 15, priceMax: "" },
];

const arrArea = [
  { label: "Dưới 20m", areaMin: "", areaMax: 20 },
  { label: "Từ 20 đến 30m", areaMin: 20, areaMax: 30 },
  { label: "Từ 30 đến 50m", areaMin: 30, areaMax: 50 },
  { label: "Từ 50 đến 70m", areaMin: 50, areaMax: 70 },
  { label: "Từ 70 đến 90m", areaMin: 70, areaMax: 90 },
  { label: "Trên 90m", areaMin: 90, areaMax: "" },
];

const Modal = ({
  setIsShowModal,
  content,
  name,
  defaultText,
  price,
  setPrice,
  area,
  setArea,
  category,
  setCategory,
  province,
  setProvince,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParams = Object.fromEntries([...searchParams]);

  const handleChangePrice = (e) => {
    if (/^[0-9]*$/.test(e.target.value)) {
      setPrice({ ...price, [e.target.name]: e.target.value });
    }
  };

  const handleChangeArea = (e) => {
    if (/^[0-9]*$/.test(e.target.value)) {
      setArea({ ...area, [e.target.name]: e.target.value });
    }
  };

  const handleBeforeSubmit = () => {
    if (name === "prices") {
      setSearchParams(
        createSearchParams({
          ...queryParams,
          priceMin: price.priceMin,
          priceMax: price.priceMax,
        })
      );
    } else if (name === "areas") {
      setSearchParams(
        createSearchParams({
          ...queryParams,
          areaMin: area.areaMin,
          areaMax: area.areaMax,
        })
      );
    } else if (name === "categories") {
      setSearchParams(
        createSearchParams({
          ...queryParams,
          categoryCode: category.code,
        })
      );
    } else if (name === "provinces") {
      setSearchParams(
        createSearchParams({
          ...queryParams,
          provinceCode: province.code,
        })
      );
    }

    setIsShowModal(false);
  };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-overlay-70 z-20 flex justify-center items-center">
      <div className="w-2/5 h-[500px] bg-white rounded-md relative">
        <div className="h-[45px] px-4 border-b border-gray-200 flex items-center">
          <span
            className="cursor-pointer"
            onClick={() => setIsShowModal(false)}
          >
            <GrLinkPrevious size={24} />
          </span>
        </div>

        {/* Hiển thị categories hoặc provinces */}
        {name === "categories" && (
          <div className="p-4 flex flex-col">
            <span className="py-2 flex gap-2 items-center border-b border-gray-200">
              <input
                type="radio"
                id="default"
                name={name}
                value={defaultText || ""}
                checked={category.code === ""}
                onChange={(e) => setCategory({ code: "", label: "" })}
              />
              <label htmlFor="default">{defaultText}</label>
            </span>
            {content?.map((item) => (
              <span
                key={item.code}
                className="py-2 flex gap-2 items-center border-b border-gray-200"
              >
                <input
                  type="radio"
                  name={name}
                  id={item.code}
                  value={item.code}
                  checked={category.code === item.code}
                  onChange={(e) =>
                    setCategory({ code: e.target.value, label: item.value })
                  }
                />
                <label htmlFor={item.code}>{item.value}</label>
              </span>
            ))}
          </div>
        )}

        {name === "provinces" && (
          <div className="p-4 flex flex-col">
            <span className="py-2 flex gap-2 items-center border-b border-gray-200">
              <input
                type="radio"
                id="default"
                name={name}
                value={defaultText || ""}
                checked={province.code === ""}
                onChange={(e) => setProvince({ code: "", label: "" })}
              />
              <label htmlFor="default">{defaultText}</label>
            </span>
            {content?.map((item) => (
              <span
                key={item.code}
                className="py-2 flex gap-2 items-center border-b border-gray-200"
              >
                <input
                  type="radio"
                  name={name}
                  id={item.code}
                  value={item.code}
                  checked={province.code === item.code}
                  onChange={(e) =>
                    setProvince({ code: e.target.value, label: item.value })
                  }
                />
                <label htmlFor={item.code}>{item.value}</label>
              </span>
            ))}
          </div>
        )}

        {/* Hiển thị prices hoặc areas */}
        {(name === "prices" || name === "areas") && (
          <div className="p-12 py-20">
            <div className="flex gap-2">
              {name === "prices" && (
                <>
                  <Input
                    name="priceMin"
                    placeholder="Min"
                    value={price.priceMin === 0 ? "" : price.priceMin}
                    onChange={handleChangePrice}
                  />
                  <Input
                    name="priceMax"
                    placeholder="Max"
                    value={price.priceMax === 0 ? "" : price.priceMax}
                    onChange={handleChangePrice}
                  />
                </>
              )}
              {name === "areas" && (
                <>
                  <Input
                    name="areaMin"
                    placeholder="Min"
                    value={area.areaMin === 0 ? "" : area.areaMin}
                    onChange={handleChangeArea}
                  />
                  <Input
                    name="areaMax"
                    placeholder="Max"
                    value={area.areaMax === 0 ? "" : area.areaMax}
                    onChange={handleChangeArea}
                  />
                </>
              )}
            </div>
            <div className="mt-2">
              <h4 className="font-bold mb-6">Chọn nhanh:</h4>
              <div className="flex gap-2 items-center flex-wrap w-full">
                {name === "prices" &&
                  arrPrice.map((item) => (
                    <button
                      className={`px-4 py-2 rounded-md cursor-pointer ${
                        item.priceMin === price.priceMin &&
                        item.priceMax === price.priceMax
                          ? "bg-blue-600 text-white"
                          : "bg-gray-200"
                      }`}
                      key={item.label}
                      onClick={() => {
                        setPrice({
                          priceMin: item.priceMin,
                          priceMax: item.priceMax,
                        });
                      }}
                    >
                      {item.label}
                    </button>
                  ))}

                {name === "areas" &&
                  arrArea.map((item) => (
                    <button
                      className={`px-4 py-2 rounded-md cursor-pointer ${
                        item.areaMin === area.areaMin &&
                        item.areaMax === area.areaMax
                          ? "bg-blue-600 text-white"
                          : "bg-gray-200"
                      }`}
                      key={item.label}
                      onClick={() => {
                        setArea({
                          areaMin: item.areaMin,
                          areaMax: item.areaMax,
                        });
                      }}
                    >
                      {item.label}
                    </button>
                  ))}
              </div>
            </div>
          </div>
        )}

        {(name === "prices" ||
          name === "areas" ||
          name === "categories" ||
          name === "provinces") && (
          <button
            type="button"
            className="w-full absolute bottom-0 bg-[#FFA500] uppercase py-2 font-medium rounded-bl-md rounded-br-md"
            onClick={handleBeforeSubmit}
          >
            Áp dụng
          </button>
        )}
      </div>
    </div>
  );
};

export default memo(Modal);
