const { User } = require("../models")
const { comparePassword } = require("../helpers/bcrypt")
const { loginToken } = require("../helpers/jsonwebtoken")

class userController {
    static async register(request, response, next) {
        try{
            const payload = {
                email: request.body.email,
                role: request.body.role,
                password: request .body.password
            }

            const data =  await User.create(payload)

            response.status(201).json({
                id: data.id,
                email: data.email,
                role: data.role
            })
        }catch(error) {
            console.log("Register Error!", + error);
        }
    }

    static async login(request, response, next) {
        try {
            const payload = {
                email: request.body.email,
                password: request .body.password
            }

            const data = await User.findOne({
                where: {
                    email: payload.email
                }
            })

            const access_token = loginToken({
                id: data.id,
                email: data.email
            })

            response.status(200).json({
                message: 'Login Success',
                access_token: access_token,
                role: data.role
            })
        }catch(error) {
            console.log("Login Error!", + error)
        }
    }
}

module.exports = userController