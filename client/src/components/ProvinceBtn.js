import React, { memo } from 'react'

const ProvinceBtn = ({ name, image }) => {
    return (
        <div className=' shadow-md rounded-bl-md rounded-br-md cursor-pointer'>
            <img
                src={image}
                alt='phong tro hcm'
                className='w-[190px] h-[110px] object-cover rounded-tr-md rounded-tl-md'
            />
            <div className='font-medium text-blue-700 p-2 text-center  hover:text-orange-600'>{name}</div>
        </div>
    )
}

export default memo(ProvinceBtn)