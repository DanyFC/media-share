import { createLink, getLink } from '../controllers/link.js'
import { deleteFile } from '../controllers/file.js'
import { userExtractor } from './../utils/userExtractor.js'
import express from 'express'
import { body } from 'express-validator'

const router = express.Router()

router.post('/', userExtractor, [
  body('originalName')
    .exists().withMessage('Original name field is required.')
    .not().isEmpty().withMessage('Original name cant be empty.')
], createLink)

router.get('/:url', getLink, deleteFile)

export default router
