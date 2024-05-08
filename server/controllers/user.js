import { expressValidator } from '../utils/expressValidator.js'
import bcrypt from 'bcrypt'
import User from '../models/user.js'

export const createUser = async (req, res) => {
  const errors = expressValidator(req, res)
  if (!errors) {
    try {
      const user = await User.findOne({
        $or: [
          { email: req.body.email },
          { userName: req.body.userName }
        ]
      })
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists.' }] })
      }

      const newUser = new User(req.body)
      newUser.password = await bcrypt.hash(req.body.password, 10)

      const savedUser = await newUser.save()
      return res
        .status(201)
        .json(savedUser)
    } catch (err) {
      return res
        .status(500)
        .json({ error: [{ msg: err._message }] })
    }
  }
}
