import { expressValidator } from './../utils/expressValidator.js'
import bcrypt from 'bcrypt'
import Link from '../models/link.js'
import shortid from 'shortid'

export const createLink = async (req, res) => {
  const errors = expressValidator(req, res)
  if (!errors) {
    const { downloads, name, originalName, password, userId } = req.body
    const id = shortid.generate()
    const link = new Link({ name, originalName, url: id })
    if (userId) {
      link.author = userId
      if (downloads) { link.downloads = downloads }
      if (password) { link.password = await bcrypt.hash(password, 10) }
    }
    try {
      const savedLink = await link.save()
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

export const getFileInfo = async (req, res) => {
  const link = await Link.findOne({ url: req.params.url })
  if (!link) {
    return res
      .status(404)
      .json({ errors: [{ msg: 'The requested link could not be found.' }] })
  }
  const password = !!link.password
  return res
    .status(200)
    .json({ name: link.name, password })
}

export const decrementLink = async (req, res, next) => {
  try {
    const link = await Link.findOne({ name: req.params.file })
    if (link.downloads === 1) {
      await Link.findOneAndDelete(req.params.url)
      req.delete = true
    } else {
      req.delete = false
      link.downloads--
      await link.save()
    }
    next()
  } catch (error) {
    return res
      .redirect(process.env.FRONT_URL)
  }
}

export const validatePassword = async (req, res) => {
  const link = await Link.findOne({ url: req.params.url })
  if (!link) {
    return res
      .status(404)
      .json({ errors: [{ msg: 'Error to validate or invalid password.' }] })
  }
  const valid = await bcrypt.compare(req.body.password, link.password)
  return res
    .status(200)
    .json(valid)
}
