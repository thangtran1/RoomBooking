import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { ItemSidebar, RelatedPost } from "../../components";
import { getPosts } from "../../services/post";
import { List, Pagination } from "./index";

const Rental = () => {
  const { prices, areas } = useSelector((state) => state.app);
  const [postsData, setPostsData] = useState({ count: 0, rows: [] });
  const [page, setPage] = useState(1);
  const limit = 10;
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPosts({ limit, page });
      setPostsData(data.data.response);
    };
    fetchData();
  }, [page, limit]);

  const totalPages = Math.ceil(postsData.count / limit);

  return (
    <div className="w-full flex flex-col gap-3">
      <div>
        <h1 className=" text-[28px] font-bold">
          {location.state?.titleSearch || "Kết quả tìm kiếm"}
        </h1>
        <p className="text-base text-gray-600">{`${
          location.state?.titleSearch || ""
        } phòng mới xây, chính chủ gần chợ, trường học, siêu thị, cửa hàng tiện lợi, khu an ninh.`}</p>
      </div>

      <div className="w-full flex gap-4">
        <div className="w-[70%]">
          <List />
          {totalPages > 1 && (
            <Pagination
              page={page}
              totalItems={postsData.count}
              setPage={setPage}
              limit={limit}
            />
          )}
        </div>
        <div className="flex gap-4 justify-start items-center flex-col w-[30%]">
          <ItemSidebar isDouble={true} content={prices} title="Xem theo giá" />
          <ItemSidebar
            isDouble={true}
            content={areas}
            title="Xem theo diện tích"
          />
          <RelatedPost />
        </div>
      </div>
    </div>
  );
};

export default Rental;
