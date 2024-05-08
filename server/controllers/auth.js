import { expressValidator } from '../utils/expressValidator.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/user.js'

export const authenticateUser = async (req, res) => {
  const errors = expressValidator(req, res)
  if (!errors) {
    try {
      const { account, password } = req.body
      const user = await User.findOne({
        $or: [
          { email: account },
          { userName: account }
        ]
      })

      if (!user) {
        return res
          .status(404)
          .json({ errors: [{ msg: 'This user does not exist' }] })
      }

      const passwordCorrect = user === null
        ? false
        : await bcrypt.compare(password, user.password)

      if (!(user && passwordCorrect)) {
        return res
          .status(401)
          .json({ errors: [{ msg: '¨Invalid username or password.' }] })
      }

      const userForToken = {
        userId: user.id,
        userName: user.userName
      }

      const token = jwt.sign(userForToken, process.env.SECRET, {
        expiresIn: '1d'
      })

      return res
        .status(200)
        .json({ token, userName: user.userName })
    } catch (err) {
      return res
        .status(500)
        .json({ errors: [{ msg: err._message }] })
    }
  }
}

export const userAuthenticated = async (req, res) => {
  const errors = expressValidator(req, res)
  if (!errors) {
    try {
      if (req.body.errors) {
        return res
          .status(401)
          .json({ errors: req.body.errors })
      }
      const { userId } = req.body
      const user = await User.findById(userId)
      if (!user) {
        return res
          .status(404)
          .json({ errors: [{ msg: 'This user does not exist' }] })
      }
      const { userName, email, date, id } = user
      return res
        .status(200)
        .json({
          userName,
          email,
          date,
          id
        })
    } catch (err) {
      return res
        .status(500)
        .json({ errors: [{ msg: err._message }] })
    }
  }
}
