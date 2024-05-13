import { body } from 'express-validator'
import { createLink, getFileInfo } from '../controllers/link.js'
import { userExtractor } from './../utils/userExtractor.js'
import express from 'express'

const router = express.Router()

router.post('/', userExtractor, [
  body('originalName')
    .exists().withMessage('Original name field is required.')
    .not().isEmpty().withMessage('Original name cant be empty.'),
  body('name')
    .exists().withMessage('Name field is required.')
    .not().isEmpty().withMessage('Name cant be empty.')
], createLink)

router.get('/:url', getFileInfo)

export default router
