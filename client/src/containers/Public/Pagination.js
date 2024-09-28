import React, { useEffect, useState } from "react";
import { PageNumber } from "../../components";
import icons from "../../ultils/icons";

const { GrLinkNext } = icons;

const Pagination = ({ page, totalItems, setPage, limit }) => {
  const totalPages = Math.ceil(totalItems / limit);
  const [arrPage, setArrPage] = useState([]);
  const [isHideStart, setIsHideStart] = useState(false);
  const [isHideEnd, setIsHideEnd] = useState(false);
  const currentPage = +page;

  useEffect(() => {
    const validCurrentPage = Math.max(1, Math.min(currentPage, totalPages));

    let start = validCurrentPage - 1;
    let end = validCurrentPage + 1;

    if (totalPages <= 4) {
      start = 1;
      end = totalPages;
    } else {
      if (validCurrentPage === 1) {
        start = 1;
        end = Math.min(2, totalPages);
      } else if (validCurrentPage === 2) {
        start = 1;
        end = 3;
      } else if (validCurrentPage >= totalPages - 1) {
        start = totalPages - 2;
        end = totalPages;
      } else {
        start = validCurrentPage - 1;
        end = validCurrentPage + 1;
      }
    }

    let temp = [];
    for (let i = start; i <= end; i++) temp.push(i);
    setArrPage(temp);

    setIsHideStart(validCurrentPage <= 2);
    setIsHideEnd(validCurrentPage >= totalPages - 1);
  }, [totalItems, limit, currentPage, totalPages]);

  const handleChangePage = (page) => {
    if (page > 0 && page <= totalPages) {
      setPage(page);
    }
  };

  return (
    <div className="flex items-center justify-center gap-2 py-5">
      {!isHideStart && (
        <>
          <PageNumber setCurrentPage={handleChangePage} text={1} />
          {arrPage[0] > 2 && <PageNumber text={"..."} />}
        </>
      )}

      {arrPage.map((item) => (
        <PageNumber
          key={item}
          text={item}
          setCurrentPage={handleChangePage}
          currentPage={currentPage}
        />
      ))}

      {!isHideEnd && (
        <>
          {arrPage[arrPage.length - 1] < totalPages - 1 && (
            <PageNumber text={"..."} />
          )}
          <PageNumber
            icon={<GrLinkNext />}
            setCurrentPage={handleChangePage}
            text={totalPages}
          />
        </>
      )}
    </div>
  );
};

export default Pagination;
