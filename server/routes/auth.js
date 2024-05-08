import { authenticateUser, userAuthenticated } from '../controllers/auth.js'
import { body } from 'express-validator'
import { userExtractor } from '../utils/userExtractor.js'
import express from 'express'

const router = express.Router()

router.post('/', [
  body('account')
    .exists().withMessage('Username or email is required.')
    .isString().withMessage('Username or email is invalid.')
    .not().isEmpty().withMessage('Account field cant be empty.'),
  body('password')
    .exists().withMessage('Password is required')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 chars long.')
    .isString().withMessage('Password wrong format. It should be a string.')
], authenticateUser)

router.get('/', userExtractor, userAuthenticated)

export default router
