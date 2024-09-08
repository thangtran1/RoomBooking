import db from '../models'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { where } from 'sequelize';
import { v4 } from 'uuid';
require('dotenv').config()

const hashPassword = password => bcrypt.hashSync(password, bcrypt.genSaltSync(12))
export const registerService = ({ phone, password, name }) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Users.findOrCreate({
            where: {
                phone
            },
            defaults: {
                phone, name, password: hashPassword(password),
                id: v4()
            }
        })
        const token = response[1] && jwt.sign({ id: response[0].id, phone: response[0].phone }, process.env.SECRET_KEY, { expiresIn: '2d' })

        resolve({
            err: token ? 0 : 2,
            msg: token ? 'Register is successFully ! ' : 'Phone number has been aldready used!',
            token: token || null
        })

    } catch (e) {
        reject(e)
    }
})


export const loginService = ({ phone, password }) => new Promise(async (resolve, reject) => {
    try {
        const respone = await db.Users.findOne({
            where: { phone },
            raw: true
        });
        const isCorrectPassword = respone && bcrypt.compareSync(password, respone.password)


        const token = isCorrectPassword && jwt.sign({ id: respone, phone: respone.phone }, process.env.SECRET_KEY, { expiresIn: '2d' });

        resolve({
            err: token ? 0 : 2,
            msg: token ? 'Login is successful!' : respone ? 'Password is wrong ...' : 'Phone number not found!',
            token: token || null
        });

    } catch (e) {
        reject(e);
    }
});


module.exports = {
    registerService: registerService,
    loginService: loginService
}