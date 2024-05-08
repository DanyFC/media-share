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

export const getLink = async (req, res, next) => {
  const link = await Link.findOne({ url: req.params.url })
  if (!link) {
    return res
      .status(404)
      .json({ errors: [{ msg: 'The requested link could not be found.' }] })
  }
  res
    .status(200)
    .json({ file: link.name })
  if (link.downloads === 1) {
    req.file = link.name
    await Link.findOneAndDelete(req.params.url)
    next()
  } else {
    link.downloads--
    await link.save()
  }
}
