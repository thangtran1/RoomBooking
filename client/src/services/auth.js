import axiosConfig from '../axiosConfig';

export const apiRegister = (payload) => new Promise(async (resolve, reject) => {
    try {
        const respone = await axiosConfig({
            method: 'post',
            url: '/api/v1/auth/register',
            data: payload
        })
        resolve(respone)
    } catch (e) {
        reject(e)
    }
})

export const apiLogin = (payload) => new Promise(async (resolve, reject) => {
    try {
        const respone = await axiosConfig({
            method: 'post',
            url: '/api/v1/auth/login',
            data: payload
        })
        resolve(respone)
    } catch (e) {
        reject(e)
    }
})