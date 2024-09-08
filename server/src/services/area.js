import db from '../models'


// get all getAreasService

export const getAreasService = () => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Area.findAll({
            raw: true,
            attributes: ['code', 'value', 'order']
        })
        resolve({
            err: response ? 0 : 1,
            msg: response ? 'OK' : 'Failed to get areas.',
            response
        })

    } catch (e) {
        reject(e)
    }
})