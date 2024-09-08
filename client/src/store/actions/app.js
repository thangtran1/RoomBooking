import actionTypes from './actionType'
import * as apis from '../../services';

export const getCategories = () => async (dispatch) => {
    try {
        const response = await apis.apiGetCategories()
        if (response?.data) {
            dispatch({
                type: actionTypes.GET_CATEGORIES,
                categories: response.data.response
            })
        } else {
            dispatch({
                type: actionTypes.GET_CATEGORIES,
                categories: response.data?.msg || null
            })
        }


    } catch (e) {
        dispatch({
            type: actionTypes.GET_CATEGORIES,
            categories: null
        })

    }
}


export const getPrices = () => async (dispatch) => {
    try {
        const response = await apis.apiGetPrices()
        if (response?.data) {
            dispatch({
                type: actionTypes.GET_PRICES,
                prices: response.data.response.sort((a, b) => {
                    return +a.order - +b.order
                })
            })
        } else {
            dispatch({
                type: actionTypes.GET_PRICES,
                prices: response.data?.msg || null
            })
        }


    } catch (e) {
        dispatch({
            type: actionTypes.GET_PRICES,
            prices: null
        })

    }
}

export const getAreas = () => async (dispatch) => {
    try {
        const response = await apis.apiGetAreas()
        if (response?.data) {
            dispatch({
                type: actionTypes.GET_AREAS,
                areas: response.data.response.sort((a, b) => {
                    return +a.order - +b.order
                }),
                msg: ''
            })
        } else {
            dispatch({
                type: actionTypes.GET_AREAS,
                areas: response.data?.msg || null
            })
        }


    } catch (e) {
        dispatch({
            type: actionTypes.GET_AREAS,
            areas: null,
            msg: e
        })

    }
}


export const getProvinces = () => async (dispatch) => {
    try {
        const response = await apis.apiGetProvinces()
        if (response?.data) {
            dispatch({
                type: actionTypes.GET_PROVINCES,
                provinces: response.data.response,
                msg: ''
            })
        } else {
            dispatch({
                type: actionTypes.GET_PROVINCES,
                provinces: response.data?.msg || null
            })
        }


    } catch (e) {
        dispatch({
            type: actionTypes.GET_PROVINCES,
            provinces: null,
            msg: e
        })

    }
}
