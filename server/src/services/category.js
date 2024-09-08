import db from '../models'


// get all category

export const getCategoriesService = () => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Category.findAll({
            raw: true,
        });
        resolve({
            err: 0,
            msg: response ? 'OK' : 'Failed to get Category.',
            response
        });
    } catch (e) {
        reject({
            err: -1,
            msg: `Failed at category service: ${e.message}`
        });
    }
});