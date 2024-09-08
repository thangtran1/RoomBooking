import * as insertService from '../services/insert'
export const insert = async (req, res) => {

    try {

        const response = await insertService.createPricesAndAreas() // createPricesAndAreas
        return res.status(200).json(response)
    } catch (e) {
        return res.status(500).json({
            err: -1,
            msg: 'Fail at auth controller: ' + e.message
        })

    }
}