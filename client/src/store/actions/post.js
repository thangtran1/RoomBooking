import actionTypes from './actionType'
import { apiGetPosts, apiGetPostsLimit, apiGetNewPosts } from '../../services/post';

export const getPosts = () => async (dispatch) => {
    try {
        const respone = await apiGetPosts()
        if (respone?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_POSTS,
                posts: respone.data.response
            })
        } else {
            dispatch({
                type: actionTypes.GET_POSTS,
                data: respone.data.msg
            })
        }


    } catch (e) {
        dispatch({
            type: actionTypes.GET_POSTS,
            post: null
        })

    }
}

// export const getPostsLimit = (page, ...query) => async (dispatch) => {
//     try {
//         const response = await apiGetPostsLimit(page, ...query);
//         if (response?.data.err === 0) {
//             dispatch({
//                 type: actionTypes.GET_POSTS_LIMIT,
//                 posts: response.data.response?.rows,
//                 count: response.data.response?.count
//             })
//         } else {
//             dispatch({
//                 type: actionTypes.GET_POSTS_LIMIT,
//                 posts: response.data.msg
//             })
//         }


//     } catch (e) {
//         dispatch({
//             type: actionTypes.GET_POSTS_LIMIT,
//             posts: null
//         })

//     }
// }


export const getPostsLimit = (query) => async (dispatch) => {
    try {
        const response = await apiGetPostsLimit(query);
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_POSTS_LIMIT,
                posts: response.data.response?.rows,
                count: response.data.response?.count
            })
        } else {
            dispatch({
                type: actionTypes.GET_POSTS_LIMIT,
                posts: response.data.msg
            })
        }


    } catch (e) {
        dispatch({
            type: actionTypes.GET_POSTS_LIMIT,
            posts: null
        })

    }
}

export const getNewPosts = () => async (dispatch) => {
    try {
        const response = await apiGetNewPosts();
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_NEW_POST,
                newPost: response.data.response,
            })
        } else {
            dispatch({
                type: actionTypes.GET_NEW_POST,
                data: response.data.msg,
                newPost: null
            })
        }


    } catch (e) {
        dispatch({
            type: actionTypes.GET_NEW_POST,
            post: null
        })

    }
}

