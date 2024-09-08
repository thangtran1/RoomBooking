import axiosConfig from '../axiosConfig';

export const apiGetCategories = () => new Promise(async (resolve, reject) => {
    try {
        const respone = await axiosConfig({
            method: 'get',
            url: '/api/v1/category/all',
        })
        resolve(respone)
    } catch (e) {
        reject(e)
    }
})