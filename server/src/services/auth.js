import db from "../models";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { where } from "sequelize";
import { v4 } from "uuid";
require("dotenv").config();
const { Op } = require("sequelize");

const hashPassword = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(12));
export const registerService = ({
  identifier,
  password,
  name,
  zalo,
  fbUrl,
  role = "user",
}) =>
  new Promise(async (resolve, reject) => {
    try {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const isEmail = emailRegex.test(identifier);

      const existingUser = await db.User.findOne({
        where: {
          [Op.or]: [isEmail ? { email: identifier } : { phone: identifier }],
        },
      });

      if (existingUser) {
        return resolve({
          err: 1,
          msg: "Số điện thoại hoặc email đã được sử dụng!",
          token: null,
        });
      }

      const newUser = await db.User.create({
        phone: isEmail ? null : identifier,
        email: isEmail ? identifier : null,
        name,
        zalo,
        fbUrl,
        password: hashPassword(password),
        id: v4(),
      });

      const token = jwt.sign(
        {
          id: newUser.id,
          phone: newUser.phone,
          email: newUser.email,
        },
        process.env.SECRET_KEY,
        { expiresIn: "2d" }
      );

      resolve({
        err: 0,
        msg: "Đăng ký thành công!",
        token,
      });
    } catch (e) {
      reject(e);
    }
  });

export const loginService = ({ identifier, password }) =>
  new Promise(async (resolve, reject) => {
    try {
      const respone = await db.User.findOne({
        where: {
          [Op.or]: [{ phone: identifier }, { email: identifier }],
        },
        raw: true,
      });
      const isCorrectPassword =
        respone && bcrypt.compareSync(password, respone.password);

      const token =
        isCorrectPassword &&
        jwt.sign(
          {
            id: respone.id,
            phone: respone.phone,
            email: respone.email,
            role: respone.role,
          },
          process.env.SECRET_KEY,
          { expiresIn: "2d" }
        );

      resolve({
        err: token ? 0 : 2,
        msg: token
          ? "Login is successful!"
          : respone
          ? "Password is wrong ..."
          : "Phone number or email not found!",
        token: token || null,
      });
    } catch (e) {
      reject(e);
    }
  });

module.exports = {
  registerService: registerService,
  loginService: loginService,
};
