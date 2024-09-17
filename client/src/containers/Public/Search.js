import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useSearchParams } from "react-router-dom";
import { Modal, SearchItem } from "../../components";
import { path } from "../../ultils/constant";
import icons from "../../ultils/icons";

const {
  BsChevronRight,
  SlLocationPin,
  TbReportMoney,
  RiCrop2Line,
  MdOutlineHouse,
} = icons;

const Search = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const priceMin = searchParams.get("priceMin");
  const priceMax = searchParams.get("priceMax");

  const areaMin = searchParams.get("areaMin");
  const areaMax = searchParams.get("areaMax");

  const [name, setName] = useState("");
  const [content, setContent] = useState([]);
  const [queries, setQueries] = useState({});
  const [defaultText, setDefaultText] = useState("");
  const [isShowModal, setIsShowModal] = useState(false);
  const [modalType, setModalType] = useState(null); // Thêm để quản lý loại modal (price hoặc area)
  const [price, setPrice] = useState({
    priceMin: Number(priceMin) ?? "",
    priceMax: Number(priceMax) ?? "",
  });
  const [area, setArea] = useState({
    areaMin: Number(areaMin) ?? "",
    areaMax: Number(areaMax) ?? "",
  });

  const { categories, provinces, prices, areas } = useSelector(
    (state) => state.app
  );

  useEffect(() => {
    if (!location.pathname.includes(path.SEARCH)) {
      setQueries({});
    }
  }, [location]);

  const renderPriceLabel = () => {
    if (price.priceMin && price.priceMax) {
      return `${price.priceMin} - ${price.priceMax} triệu`;
    }
    if (price.priceMin && !price.priceMax) {
      return `Trên ${price.priceMin} triệu`;
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

  const handleSubmit = useCallback(
    (e, query, arrMaxMin) => {
      e.stopPropagation();
      setQueries((prev) => ({ ...prev, ...query }));
      setIsShowModal(false);
    },
    [queries]
  );

  return (
    <>
      <div className=" w-3/5 my-3 p-[10px] bg-[#febb02] rounded-lg  flex-col lg:flex-row flex  items-center justify-around gap-2 ">
        <span
          onClick={() =>
            handleShowModal(
              categories,
              "categories",
              "Tìm tất cả",
              "categories"
            )
          }
          className="cursor-pointer flex-1"
        >
          <SearchItem
            IconBefore={<MdOutlineHouse />}
            fontWieght
            IconAfter={<BsChevronRight color="rgb(156, 163 175" />}
            text={queries.categories}
            defaultText={"Tìm tất cả"}
          />
        </span>
        <span
          onClick={() =>
            handleShowModal(provinces, "provinces", "Toàn quốc", "provinces")
          }
          className="cursor-pointer flex-1"
        >
          <SearchItem
            IconBefore={<SlLocationPin />}
            IconAfter={<BsChevronRight color="rgb(156, 163 175" />}
            text={queries.provinces}
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
        {/* <button
          onClick={handleSearch}
          type="button"
          className="outline-none py-2 px-4 flex-1 bg-secondary1 text-white rounded-lg text-[13px] flex items-center justify-center gap-2 font-medium"
        >
          <FiSearch />
          Tìm kiếm
        </button> */}
      </div>
      {isShowModal && (
        <Modal
          {...(modalType === "price" ? { price, setPrice } : { area, setArea })}
          handleSubmit={handleSubmit}
          queries={queries}
          content={content}
          name={name}
          setIsShowModal={setIsShowModal}
          defaultText={defaultText}
        />
      )}
    </>
  );
};

export default Search;
