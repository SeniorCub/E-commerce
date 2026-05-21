import dotenv from 'dotenv';
import usermodels from "../models/usermodels.js";
import jwt from 'jsonwebtoken';

dotenv.config();

export const signinController = async (req, res, next) => {
     try {
          const authHeader = req.headers.authorization
          const token = authHeader.split(' ')[1]
          const decode = await jwt.verify(token, process.env.JWT_SECRET)
          req.user = decode
          next()
     } catch (error) {
          return res.status(401).send({
               success: false,
               msg: "Invalid or missing token"
          })
     }
}

export const isAdmin = async  (req, res, next) => {
     try {
          const user = await usermodels.findById(req.user._id)
          if (user.role !== 1) {
               return res.status(201).send({
                    success: false,
                    msg: "Unauthorized user",
                    user: {
                        name: user.name,
                        email: user.email,
                        role: user.role
                    }
                })
          } else {
               return res.status(201).send({
                    success: true,
                    msg: 'Authorized User',
                    user: user
               })
          }
     } catch (error) {
          return res.status(500).send({
               success: false,
               msg: error.message
          })
     }
}