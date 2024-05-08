import { body } from 'express-validator'
import { createUser } from './../controllers/user.js'
import express from 'express'

const router = express.Router()

router.post('/', [
  body('userName')
    .exists().withMessage('Username is required')
    .isLength({ min: 5 }).withMessage('Username field must be at least 5 chars long.')
    .isString().withMessage('Username must be a string'),
  body('email')
    .exists().withMessage('Email is required')
    .isEmail().withMessage('Invalid email format.'),
  body('password')
    .exists().withMessage('Password is required')
    .isLength({ min: 8 }).withMessage('Password field must be at least 8 chars long.')
    .isString().withMessage('Password must be a string')
], createUser)

export default router
