import React, { memo } from 'react'
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom'


const notActive = ' w-[46px] h-[48px] flex justify-center items-center bg-white hover:bg-gray-300 rounded-md '
const active = ' w-[46px] h-[48px] flex justify-center items-center bg-[#E13427] text-white  hover:opacity-80 rounded-md '


const PageNumber = ({ text, icon, currentPage, setCurrentPage, type }) => {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const queryParams = Object.fromEntries([...searchParams])

    // let entries = paramsSearch.entries()

    // const append = (entries) => {
    //     let params = []
    //     paramsSearch.append('page', +text)
    //     for (let entry of entries) {
    //         params.push(entry)
    //     }
    //     let searchParamsObject = {};
    //     params?.forEach(i => {
    //         if (Object.keys(searchParamsObject)?.some(item => item === i[0])) {
    //             searchParamsObject[i[0]] = [...searchParamsObject[i[0]], i[1]]
    //         } else {
    //             searchParamsObject = { ...searchParamsObject, [i[0]]: [i[1]] }
    //         }
    //     });
    //     return searchParamsObject
    // }


    // khi bấm chuyển trang sẽ sang 1 trang link 
    const handleChangePage = () => {
        if (!(text === '...')) {
            setCurrentPage(+text)
            navigate({
                pathname: "/",
                search: createSearchParams({
                    ...queryParams,
                    page: text
                }).toString()
            })
            // navigate({
            //     pathname: location.pathname,
            //     search: createSearchParams(append(entries)).toString()
            // })
        }

    }
    return (
        <div
            className={+text === +currentPage ? `${active} ${text === '...' ? 'cursor-text ' : 'cursor-pointer'}` : `${notActive} ${text === '...' ? 'cursor-text ' : 'cursor-pointer'}`}
            onClick={handleChangePage}
        >
            {icon || text}

        </div>
    )
}

export default memo(PageNumber)