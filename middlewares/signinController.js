import dotenv, { configDotenv } from 'dotenv';
import usermodels from "../models/usermodels.js";
import jwt from 'jsonwebtoken';

dotenv.config();

export const signinController = async (req, res, next) => {
     try {
          const authHeader = req.headers.authorization
          const token = authHeader.split(' ')[1];
          const decode = await jwt.verify(token, process.env.JWT_SECRET)
          req.user = decode
          next()
     } catch (error) {
          console.log(error);
     }
}

export const isAdmin = async  (req, res, next) => {
     try {
          const user = await usermodels.findById(req.user._id)
          if (user.role !== 1) {
               return res.status(201).send({
                    success: false,
                    msg: 'Unauthorized User'
               })
          } else {
               // When Using Postman
               return res.status(201).send({
                    success: true,
                    msg: 'Authorized User'
               })
               // When using  HTML
               // next()
          }
     } catch (error) {
          console.log(error);
     }
}