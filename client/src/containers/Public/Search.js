import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { Modal, SearchItem } from "../../components";
import icons from "../../ultils/icons";

const {
  BsChevronRight,
  SlLocationPin,
  TbReportMoney,
  RiCrop2Line,
  MdOutlineHouse,
} = icons;

const Search = () => {
  const { categories, provinces, prices, areas } = useSelector(
    (state) => state.app
  );
  const [searchParams] = useSearchParams();
  const priceMin = searchParams.get("priceMin");
  const priceMax = searchParams.get("priceMax");
  const areaMin = searchParams.get("areaMin");
  const areaMax = searchParams.get("areaMax");
  const categoryCode = searchParams.get("categoryCode");
  const provinceCode = searchParams.get("provinceCode");

  const [category, setCategory] = useState({
    code: "",
    label: "",
  });
  const [province, setProvince] = useState({
    code: "",
    label: "",
  });

  const [name, setName] = useState("");
  const [content, setContent] = useState([]);

  const [defaultText, setDefaultText] = useState("");
  const [isShowModal, setIsShowModal] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [price, setPrice] = useState({
    priceMin: Number(priceMin) ?? "",
    priceMax: Number(priceMax) ?? "",
  });
  const [area, setArea] = useState({
    areaMin: Number(areaMin) ?? "",
    areaMax: Number(areaMax) ?? "",
  });

  useEffect(() => {
    if (categoryCode) {
      const category = categories.find((item) => item.code === categoryCode);
      category && setCategory({ code: category.code, label: category.value });
    }
  }, [categoryCode, categories]);

  useEffect(() => {
    if (provinceCode) {
      const province = provinces.find((item) => item.code === provinceCode);
      province && setProvince({ code: province.code, label: province.value });
    }
  }, [provinceCode, provinces]);

  const renderPriceLabel = () => {
    if (price.priceMin && price.priceMax) {
      return ` ${price.priceMin} - ${price.priceMax} triệu`;
    }
    if (price.priceMin && !price.priceMax) {
      return ` Trên ${price.priceMin} triệu`;
    }
    if (!price.priceMin && price.priceMax) {
      return `Dưới ${price.priceMax} triệu`;
    }
    return "Chọn giá";
  };

  const renderAreaLabel = () => {
    if (area.areaMin && area.areaMax) {
      return `${area.areaMin} - ${area.areaMax} m2`;
    }
    if (area.areaMin && !area.areaMax) {
      return `Trên ${area.areaMin} m2`;
    }
    if (!area.areaMin && area.areaMax) {
      return `Dưới ${area.areaMax} m2`;
    }
    return "Chọn diện tích";
  };

  const handleShowModal = (content, name, defaultText, type) => {
    setContent(content);
    setName(name);
    setDefaultText(defaultText);
    setModalType(type);
    setIsShowModal(true);
  };

  return (
    <>
      <div className=" w-4/5 my-3 p-[10px] bg-[#febb02] rounded-lg  flex-col lg:flex-row flex  items-center justify-around gap-2 ">
        <span
          onClick={() =>
            handleShowModal(categories, "categories", "Tìm tất cả", "category")
          }
          className="cursor-pointer flex-1"
        >
          <SearchItem
            IconBefore={<MdOutlineHouse />}
            fontWieght
            IconAfter={<BsChevronRight color="rgb(156, 163 175" />}
            text={category.label}
            defaultText={"Tìm tất cả"}
          />
        </span>
        <span
          onClick={() =>
            handleShowModal(provinces, "provinces", "Toàn quốc", "province")
          }
          className="cursor-pointer flex-1"
        >
          <SearchItem
            IconBefore={<SlLocationPin />}
            fontWieght
            IconAfter={<BsChevronRight color="rgb(156, 163 175" />}
            text={province.label}
            defaultText={"Toàn quốc"}
          />
        </span>
        <span
          onClick={() => handleShowModal(prices, "prices", "Chọn giá", "price")}
          className="cursor-pointer flex-1"
        >
          <SearchItem
            IconBefore={<TbReportMoney />}
            IconAfter={<BsChevronRight color="rgb(156, 163 175" />}
            text={renderPriceLabel()}
            defaultText={"Chọn giá"}
          />
        </span>
        <span
          onClick={() =>
            handleShowModal(areas, "areas", "Chọn diện tích", "area")
          }
          className="cursor-pointer flex-1"
        >
          <SearchItem
            IconBefore={<RiCrop2Line />}
            IconAfter={<BsChevronRight color="rgb(156, 163 175" />}
            text={renderAreaLabel()}
            defaultText={"Chọn diện tích"}
          />
        </span>
      </div>
      {isShowModal && (
        <Modal
          {...(modalType === "price" ? { price, setPrice } : { area, setArea })}
          content={content}
          name={name}
          setIsShowModal={setIsShowModal}
          defaultText={defaultText}
          category={category}
          setCategory={setCategory}
          province={province}
          setProvince={setProvince}
        />
      )}
    </>
  );
};

export default Search;
