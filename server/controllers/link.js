import { expressValidator } from './../utils/expressValidator.js'
import bcrypt from 'bcrypt'
import Link from '../models/link.js'
import shortid from 'shortid'

export const createLink = async (req, res) => {
  const errors = expressValidator(req, res)
  if (!errors) {
    const { originalName, userId, downloads, password } = req.body
    const id = shortid.generate()
    const link = new Link({ name: `${id}.${originalName.split('.')[1]}`, originalName, url: id })
    if (userId) {
      link.author = userId
      if (downloads) { link.downloads = downloads }
      if (password) { link.password = await bcrypt.hash(password, 10) }
    }
    try {
      const savedLink = await link.save()
      console.log('🚀 ~ createLink ~ savedLink:', savedLink)
      return res
        .status(201)
        .json(savedLink)
    } catch (err) {
      return res
        .status(409)
        .json({ errors: [{ msg: 'Cant create a new link.' }] })
    }
  }
}
