import React, { memo, useState } from 'react'
import icons from '../ultils/icons'
import { useNavigate, Link } from 'react-router-dom'
import { formatVietnameseToString } from '../ultils/Common/formatVietnameseToString'
const indexs = [0, 1, 2, 3]

const { RiStarSLine, RiHeartFill, RiHeartLine, TfiStar, RiBookmark3Fill } = icons



const Item = ({ images, user, title, description, attributes, address, star, id }) => {
    const [isHoverHeart, setIsHoverHeart] = useState(false)

    const navigate = useNavigate()
    const handleStar = (star) => {
        const stars = [];
        const numberOfStars = Number(star);
        for (let i = 1; i <= numberOfStars; i++) {
            stars.push(<TfiStar key={i} className='star-item' color='#caca00' size={'22px'} />);
        }
        return stars;
    }

    return (
        <div className='w-full flex border-t border-orange-600 py-4 '>
            <Link to={`chi-tiet/${formatVietnameseToString(title)}/${id}`}
                className='w-2/5 flex flex-wrap  gap-[2px] items-center relative cursor-pointer'
            >
                {images.length > 0 && images.filter((i, index) => indexs.some(i => i === index))?.map((i, index) => {
                    return (
                        <img key={index} src={i} alt='preview' className='w-[120px] h-[120px] object-cover' />
                    )
                })}


                <span className=' text-white bg-overlay-70 px-2 rounded-md absolute left-1 bottom-1'>{`${images.length} ảnh`}</span>
                <span
                    onMouseEnter={() => setIsHoverHeart(true)}
                    onMouseLeave={() => setIsHoverHeart(false)}
                    className=' text-white  absolute right-7 bottom-1'>
                    {isHoverHeart ? <RiHeartFill color='red' size={25} /> : <RiHeartLine size={25} />}

                </span>
            </Link>
            <div className='w-3/5'>
                <div className='flex justify-between gap-4 w-full'>
                    <div className='text-red-600 font-medium '>
                        {handleStar(+star).length > 0 && handleStar(+star).map((star, number) => {
                            return (
                                <span key={number}>{star}</span>
                            )
                        })}
                        {title}
                    </div>
                    <div className='w-[10%] flex justify-end'>
                        <RiBookmark3Fill size={'25px'} color='orange' />
                    </div>
                </div>
                <div className='flex my-2 items-center justify-between gap-2'>
                    <span className='font-bold flex-3 whitespace-nowrap overflow-hidden text-ellipsis text-green-600'>{attributes?.price}</span>
                    <span className='flex-1 whitespace-nowrap overflow-hidden text-ellipsis'>{attributes?.acreage}</span>
                    <span className='flex-3 whitespace-nowrap overflow-hidden text-ellipsis'>
                        {`${address.split(',')[address.split(',').length - 2]}${address.split(',')[address.split(',').length - 1]}`}
                    </span>
                    {/* chuyển chuỗi thành mảng log address.split(',')  (-2,-1 length tính từ 1 đi index tính từ 0 vị trí cuối cùng trừ 1 gần cuối -2)*/}
                </div>
                <p className='text-gray-500 w-full h-[50px]  text-ellipsis overflow-hidden'>
                    {description}
                </p>
                <div className='flex items-center my-5 justify-between'>
                    <div className='flex items-center'>
                        <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpWyleA61aqadhutVq_kARFzefhDbxS63M-Q&s' alt='avatar' className='w-[30px] h-[30px] object-cover rounded-full' />
                        <p>{user?.name}</p>
                    </div>
                    <div className='flex items-center gap-1'>
                        <button
                            type='button'
                            className='bg-blue-700 text-white  p-1 rounded-md'
                        >
                            {`Gọi ${user?.phone}`}
                        </button>
                        <button
                            type='button'
                            className='text-blue-700 px-1 rounded-md border border-blue-700'
                        >
                            Nhấn zalo
                        </button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default memo(Item)