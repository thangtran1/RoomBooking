import React, { useEffect, useState } from 'react'
import { PageNumber } from '../../components'
import { useSelector } from 'react-redux'
import icons from '../../ultils/icons'

const { GrLinkNext, GrLinkPrevious } = icons

const Pagination = ({ page, totalItems, setPage, limit }) => {
    // Tính tổng số trang dựa trên tổng số item và limit
    const totalPages = Math.ceil(totalItems / limit)

    const [arrPage, setArrPage] = useState([])
    const [isHideStart, setIsHideStart] = useState(false)
    const [isHideEnd, setIsHideEnd] = useState(false)
    const currentPage = +page

    useEffect(() => {
        // Kiểm tra trang hiện tại không vượt quá tổng số trang
        const validCurrentPage = currentPage > totalPages ? totalPages : currentPage

        let end = validCurrentPage + 1 > totalPages ? totalPages : validCurrentPage + 1
        let start = validCurrentPage - 1 <= 0 ? 1 : validCurrentPage - 1
        let temp = []

        for (let i = start; i <= end; i++) temp.push(i)
        setArrPage(temp)

        setIsHideEnd(validCurrentPage >= totalPages - 1)
        setIsHideStart(validCurrentPage <= 2)
    }, [totalItems, limit, currentPage, totalPages])

    const handleChangePage = (page) => {
        setPage(page)
    }

    return (
        <div className='flex items-center justify-center gap-2 py-5'>
            {!isHideStart && (
                <PageNumber icon={<GrLinkPrevious />} setCurrentPage={handleChangePage} text={1} />
            )}
            {!isHideStart && <PageNumber text={'...'} />}

            {arrPage.length > 0 && arrPage.map(item => (
                <PageNumber
                    key={item}
                    text={item}
                    setCurrentPage={handleChangePage}
                    currentPage={currentPage}
                />
            ))}
            {!isHideEnd && <PageNumber text={'...'} />}
            {!isHideEnd && (
                <PageNumber icon={<GrLinkNext />} setCurrentPage={handleChangePage} text={totalPages} />
            )}
        </div>
    )
}

export default Pagination