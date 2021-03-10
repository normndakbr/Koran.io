const { User } = require("../models")
const { comparePassword } = require("../helpers/bcrypt")
const { loginToken } = require("../helpers/jsonwebtoken")

class userController {
    static async register(request, response, next) {
        try {
            if (!request.body.email) {
                throw ({ name: 'EmptyEmail' })
            } else if (!request.body.password) {
                throw ({ name: 'EmptyPassword' })
            } else if (!request.body.role) {
                throw ({ name: 'EmptyRole' })
            }

            const payload = {
                email: request.body.email,
                role: request.body.role,
                password: request.body.password
            }

            const data = await User.create(payload)

            response.status(201).json({
                id: data.id,
                email: data.email,
                role: data.role
            })
        } catch (error) {
            console.log("Register Error!", + error)
            next(error)
        }
    }

    static async login(request, response, next) {
        try {
            if (!request.body.email) {
                throw ({ name: 'EmptyEmail' })
            } else if (!request.body.password) {
                throw ({ name: 'EmptyPassword' })
            }

            const payload = {
                email: request.body.email,
                password: request.body.password
            }

            const data = await User.findOne({
                where: {
                    email: payload.email
                }
            })

            if (!data) {
                throw ({ name: 'UserNotFound' })
            } else if (!comparePassword(payload.password, data.password)) {
                throw ({ name: 'InvalidEmailPassword' })
            } else {
                const access_token = loginToken({
                    id: data.id,
                    email: data.email
                })
                response.status(200).json({
                    message: 'Login Success',
                    access_token: access_token,
                    role: data.role
                })
            }
        } catch (error) {
            console.log("Login Error!", + error)
        }
    }
}

module.exports = userController