const bcrypt = require('bcryptjs')
const jsonWebToken = require('jsonwebtoken')
require('dotenv').config()


const User = require('../../models/user')

module.exports = {
  createUser: async args => {
    try {
      const existingUsers = await User.findOne({ email: args.userInput.email })
      if (existingUsers) {
        throw new Error('User exists already')
      }
      const hashedPassword = await bcrypt.hash(args.userInput.password, 12)
      const user = new User({
        email: args.userInput.email,
        password: hashedPassword
      })
      const result = await user.save()
      console.log(result)
      return { ...result._doc, password: null, _id: result.id }
    } catch (error) {
      throw error
    }
  },
  login: async ({ email, password }) => {
    const user = await User.findOne({ email: email })
    if (!user) {
      throw new Error('Invalid credentials')
    }
    const isPasswordEqual = await bcrypt.compare(password, user.password)
    if (!isPasswordEqual) {
      throw new Error('Invalid credentials')
    }
    const token = jsonWebToken.sign({ userId: user.id, email: user.email }, process.env.MY_SECRET_KEY, {
      expiresIn: '1h'
    })
    return { userId: user.id, token: token, tokenExpiration: 1 }
  }
}