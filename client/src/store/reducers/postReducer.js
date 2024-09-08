import actionTypes from "../actions/actionType"
const initState = {
    posts: [],
    msg: '',
    count: 0,
    newPost: [],
}

const postReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.GET_POSTS_LIMIT:
        case actionTypes.GET_POSTS:
            return {
                ...state,
                posts: action.posts || [],
                msg: action.msg || '',
                count: action.count || 0
            }

        case actionTypes.GET_NEW_POST:
            return {
                ...state,

                msg: action.msg || '',
                newPost: action.newPost || [],
                // count: action.count || 0
            }




        default:
            return state
    }
}

export default postReducer