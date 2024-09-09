import React, { useCallback, useEffect, useState } from "react";
import { SearchItem, Modal } from "../../components";
import icons from "../../ultils/icons";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../store/actions";
import {
  useNavigate,
  createSearchParams,
  useLocation,
  useSearchParams,
} from "react-router-dom";
import { path } from "../../ultils/constant";
const {
  BsChevronRight,
  SlLocationPin,
  TbReportMoney,
  RiCrop2Line,
  MdOutlineHouse,
  FiSearch,
} = icons;
const Search = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [isShowModal, setIsShowModal] = useState(false);

  const [searchParams] = useSearchParams();

  const queryParams = Object.fromEntries([...searchParams]);

  const [content, setContent] = useState([]);
  const [name, setName] = useState("");
  const { categories, provinces, prices, areas } = useSelector(
    (state) => state.app
  );

  const [queries, setQueries] = useState({});
  const [arrMinMax, setArrMinMax] = useState({});

  const [defaultText, setDefautlText] = useState("");

  useEffect(() => {
    if (!location.pathname.includes(path.SEARCH)) {
      setArrMinMax({});
      setQueries({});
    }
  }, [location]);

  const handleShowModal = (content, name, defaultText) => {
    setContent(content);
    setName(name);
    setDefautlText(defaultText);
    setIsShowModal(true);
  };

  const handleSubmit = useCallback(
    (e, query, arrMaxMin) => {
      e.stopPropagation();
      setQueries((prev) => ({ ...prev, ...query }));
      setIsShowModal(false);
      arrMaxMin && setArrMinMax((prev) => ({ ...prev, ...arrMaxMin }));
    },
    [isShowModal, queries]
  );

  const handleSearch = () => {
    const queryCodes = Object.entries(queries)
      .filter((item) => item[0].includes("Number") || item[0].includes("Code"))
      .filter((item) => item[1]);
    let queryCodesObj = {};
    queryCodes.forEach((item) => {
      queryCodesObj[item[0]] = item[1];
    });

    const queryText = Object.entries(queries).filter(
      (item) => !item[0].includes("Code") || !item[0].includes("Number")
    );
    let queryTextObj = {};
    queryText.forEach((item) => {
      queryTextObj[item[0]] = item[1];
    });

    let titleSearch =
      `${queryTextObj.categories || "Cho thuê tất cả"}` +
      `${queryTextObj.provinces ? ` tỉnh ${queryTextObj.provinces}` : ""}` +
      `${queryTextObj.prices ? `, giá ${queryTextObj.prices}` : ""}` +
      `${queryTextObj.areas ? `, diện tích ${queryTextObj.areas}` : ""}`;

    dispatch(actions.getPostsLimit(queryCodesObj));
    navigate(
      {
        pathname: path.SEARCH,
        search: createSearchParams(queryCodesObj).toString(),
      },
      { state: { titleSearch } }
    );
  };
  return (
    <>
      <div className=" w-3/5 my-3 p-[10px] bg-[#febb02] rounded-lg  flex-col lg:flex-row flex  items-center justify-around gap-2 ">
        <span
          onClick={() =>
            handleShowModal(categories, "categories", "Tìm tất cả")
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
          onClick={() => handleShowModal(provinces, "provinces", "Toàn quốc")}
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
          onClick={() => handleShowModal(prices, "prices", "Chọn giá")}
          className="cursor-pointer flex-1"
        >
          <SearchItem
            IconBefore={<TbReportMoney />}
            IconAfter={<BsChevronRight color="rgb(156, 163 175" />}
            text={queries.prices}
            defaultText={"Chọn giá"}
          />
        </span>
        <span
          onClick={() => handleShowModal(areas, "areas", "Chọn diện tích")}
          className="cursor-pointer flex-1"
        >
          <SearchItem
            IconBefore={<RiCrop2Line />}
            IconAfter={<BsChevronRight color="rgb(156, 163 175" />}
            text={queries.areas}
            defaultText={"Chọn diện tích"}
          />
        </span>
        <button
          onClick={handleSearch}
          type="button"
          className="outline-none py-2 px-4 flex-1 bg-secondary1 text-white rounded-lg text-[13px] flex items-center justify-center gap-2 font-medium"
        >
          <FiSearch />
          Tìm kiếm
        </button>
      </div>
      {isShowModal && (
        <Modal
          arrMinMax={arrMinMax}
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
