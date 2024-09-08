import React, { useEffect } from 'react'
import { Sitem } from './index'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../store/actions'
const RelatedPost = () => {
    const { newPost } = useSelector(state => state.post)


    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(actions.getNewPosts())
    }, [])

    return (
        <div className='w-full bg-white rounded-md p-4'>
            <h3 className='font-semibold text-lg'>Tin mới đăng</h3>
            <div className='w-full'>
                {newPost?.map(item => {
                    return (
                        <Sitem
                            key={item.id}

                            title={item.title}
                            price={item?.attributes?.price}
                            createdAt={item.createdAt}
                            image={JSON.parse(item.images.image)}
                        />

                    )
                })}
            </div>
        </div>
    )
}

export default RelatedPost