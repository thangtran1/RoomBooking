import * as service from '../services/province'

export const getProvinces = async (req, res) => {
    try {
        const response = await service.getProvincesService()
        return res.status(200).json(response)

    } catch (e) {
        return res.status(500).json({
            err: -1,
            msg: 'Failed at category controller: ', e
        })
    }
}