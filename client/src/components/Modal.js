import React, { useState, useEffect, memo } from "react";
import icons from "../ultils/icons";
import { getCodes, getCodesAreas } from "../ultils/Common/getCodes";
import { getNumbersArea, getNumbersPrice } from "../ultils/Common/getNumbers";
const { GrLinkPrevious } = icons;
const Modal = ({
  setIsShowModal,
  content,
  name,
  handleSubmit,
  queries,
  arrMinMax,
  defaultText,
}) => {
  const [persent1, setPersent1] = useState(
    name === "prices" && arrMinMax?.pricesArr
      ? arrMinMax?.pricesArr[0]
      : name === "areas" && arrMinMax?.areasArr
      ? arrMinMax?.areasArr[0]
      : 0
  );
  const [persent2, setPersent2] = useState(
    name === "prices" && arrMinMax?.pricesArr
      ? arrMinMax?.pricesArr[1]
      : name === "areas" && arrMinMax?.areasArr
      ? arrMinMax?.areasArr[1]
      : 100
  );
  // const [persent1, setPersent1] = useState(() => {
  //     if (name === 'prices') {
  //         return arrMinMax?.pricesArr?.[0] ?? 0;
  //     } else if (name === 'areas') {
  //         return arrMinMax?.areasArr?.[0] ?? 0;
  //     }
  //     return 0;
  // });

  // const [persent2, setPersent2] = useState(() => {
  //     if (name === 'prices') {
  //         return arrMinMax?.pricesArr?.[1] ?? 100;
  //     } else if (name === 'areas') {
  //         return arrMinMax?.areasArr?.[1] ?? 100;
  //     }
  //     return 100;
  // });
  const [activedEL, setActivedEL] = useState("");
  useEffect(() => {
    const activedTrackEL = document.getElementById("track:active");
    if (activedTrackEL) {
      if (persent2 <= persent1) {
        activedTrackEL.style.left = `${persent2}%`;
        activedTrackEL.style.right = `${100 - persent1}%`;
      } else {
        activedTrackEL.style.left = `${persent1}%`;
        activedTrackEL.style.right = `${100 - persent2}%`;
      }
    }
  }, [persent1, persent2]);

  const handleClickTrack = (e, value) => {
    const stack = document.getElementById("track");
    const stackRect = stack.getBoundingClientRect();

    let percent =
      value !== undefined
        ? value
        : Math.round(((e.clientX - stackRect.left) * 100) / stackRect.width, 0);
    if (percent < 0) percent = 0;
    if (Math.abs(percent - persent1) <= Math.abs(percent - persent2)) {
      setPersent1(percent);
    } else {
      setPersent2(percent);
    }
  };

  const convert100toTarget = (percent) => {
    return name === "prices"
      ? (Math.ceil(Math.round(percent * 1.5) / 5) * 5) / 10
      : name === "areas"
      ? Math.ceil(Math.round(percent * 0.9) / 5) * 5
      : 0;
  };
  //9% => 1.35 * 10 = 14 / 5 = 2 dư 4 => 3*5 = 15 / 10 = 1.5 => 1.5 triệu

  const convertTo100 = (percent) => {
    let target = name === "prices" ? 15 : name === "areas" ? 90 : 1;
    return Math.floor((percent / target) * 100);
  };

  const handleActive = (code, value) => {
    setActivedEL(code);
    let arrMaxMin =
      name === "prices" ? getNumbersPrice(value) : getNumbersArea(value);
    if (arrMaxMin.length === 1) {
      if (arrMaxMin[0] === 1) {
        setPersent1(0);
        setPersent2(convertTo100(1));
      }
      if (arrMaxMin[0] === 20) {
        setPersent1(0);
        setPersent2(convertTo100(20));
      }
      if (arrMaxMin[0] === 15 || arrMaxMin[0] === 90) {
        setPersent1(100);
        setPersent2(100);
      }
    }

    if (arrMaxMin.length === 2) {
      setPersent1(convertTo100(arrMaxMin[0]));
      setPersent2(convertTo100(arrMaxMin[1]));
    }
  };

  const handleBeforeSubmit = (e) => {
    let min = persent1 <= persent2 ? persent1 : persent2;
    let max = persent1 <= persent2 ? persent2 : persent1;
    let arrMinMax = [convert100toTarget(min), convert100toTarget(max)];
    // const gaps = name === 'prices' ?
    //     getCodes(arrMinMax, content)
    //     : name === 'areas' ? getCodesAreas(arrMinMax, content) : []

    handleSubmit(
      e,
      {
        [`${name}Number`]: arrMinMax,
        [name]: `Từ ${convert100toTarget(min)} - ${convert100toTarget(max)} ${
          name === "prices" ? "triệu" : "m2"
        }`
          .replace(/\s+/g, " ")
          .trim(),
      },
      {
        [`${name}Arr`]: [min, max],
      }
    );
  };
  return (
    <div
      onClick={(e) => {
        setIsShowModal(false);
      }}
      className="fixed top-0 left-0 right-0 bottom-0 bg-overlay-70 z-20 flex justify-center items-center"
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
          setIsShowModal(true);
        }}
        className="w-2/5 h-[500px] bg-white rounded-md relative"
      >
        <div className="h-[45px] px-4 border-b border-gray-200 flex items-center">
          <span
            className=" cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              setIsShowModal(false);
            }}
          >
            <GrLinkPrevious size={24} />
          </span>
        </div>
        {(name === "categories" || name === "provinces") && (
          <div className="p-4 flex flex-col">
            <span className="py-2 flex gap-2 items-center border-b border-gray-200">
              <input
                type="radio"
                id="default"
                name={name}
                value={defaultText || ""}
                checked={!queries[`${name}Code`] ? true : false}
                onChange={(e) =>
                  handleSubmit(e, {
                    [name]: defaultText,
                    [`${name}Code`]: null,
                  })
                }
              />
              <label htmlFor="default">{defaultText}</label>
            </span>
            {content?.map((item) => {
              return (
                <span
                  key={item.code}
                  className="py-2 flex gap-2 items-center border-b border-gray-200"
                >
                  <input
                    type="radio"
                    name={name}
                    id={item.code}
                    value={item.code}
                    checked={
                      item.code === queries[`${name}Code`] ? true : false
                    }
                    onChange={(e) =>
                      handleSubmit(e, {
                        [name]: item.value,
                        [`${name}Code`]: item.code,
                      })
                    }
                  />
                  <label htmlFor={item.code}>{item.value}</label>
                </span>
              );
            })}
          </div>
        )}
        {(name === "prices" || name === "areas") && (
          <div className="p-12 py-20 ">
            <div className="flex flex-col items-center justify-center relative">
              <div className="z-30 absolute top-[-48px] font-bold text-xl text-orange-600">
                {(persent1 === 100 && persent2 === 100
                  ? `Trên ${convert100toTarget(persent1)} ${
                      name === "prices" ? "triệu" : "m2"
                    } + `
                  : `Từ ${
                      persent1 <= persent2
                        ? convert100toTarget(persent1)
                        : convert100toTarget(persent2)
                    } - ${
                      persent2 >= persent1
                        ? convert100toTarget(persent2)
                        : convert100toTarget(persent1)
                    } ${name === "prices" ? "triệu" : "m2"}`
                )
                  .replace(/\s+/g, " ")
                  .trim()}
              </div>
              <div
                onClick={handleClickTrack}
                id="track"
                className="slider-track h-[5px] bg-gray-300 rounded-full absolute top-0 bottom-0 w-full"
              >
                {" "}
              </div>
              <div
                onClick={handleClickTrack}
                id="track:active"
                className="slider-track-active h-[5px] bg-orange-600 rounded-full absolute top-0 bottom-0 "
              >
                {" "}
              </div>
              <input
                value={persent1}
                max="100"
                min="0"
                step="1"
                type="range"
                className="w-full appearance-none pointer-events-none absolute top-0 bottom-0 "
                onChange={(e) => {
                  setPersent1(+e.target.value);
                  activedEL && setActivedEL("");
                }}
              />

              <input
                value={persent2}
                max="100"
                min="0"
                step="1"
                type="range"
                className="w-full appearance-none pointer-events-none absolute top-0 bottom-0 "
                onChange={(e) => {
                  setPersent2(+e.target.value);
                  activedEL && setActivedEL("");
                }}
              />
              <div className="absolute z-30 top-6 left-0 right-0 flex justify-between items-center ">
                <span
                  className="cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClickTrack(e, 0);
                  }}
                >
                  0
                </span>
                <span
                  className="mr-[-12px] cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClickTrack(e, 100);
                  }}
                >
                  {name === "prices"
                    ? "15 triệu +"
                    : name === "areas"
                    ? "Trên 90m2"
                    : ""}
                </span>
              </div>
            </div>

            <div className="mt-24">
              <h4 className="font-bold   mb-6">Chọn nhanh: </h4>
              <div className="flex gap-2 items-center flex-wrap w-full ">
                {content?.map((item) => {
                  return (
                    <button
                      onClick={() => handleActive(item.code, item.value)}
                      key={item.code}
                      className={`px-4 py-2 rounded-md cursor-pointer ${
                        item.code === activedEL
                          ? "bg-blue-600 text-white"
                          : "bg-gray-200"
                      }`}
                    >
                      {item.value}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {(name === "prices" || name === "areas") && (
          <button
            type="button"
            className="w-full absolute bottom-0 bg-[#FFA500] uppercase  py-2 font-medium rounded-bl-md rounded-br-md"
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
