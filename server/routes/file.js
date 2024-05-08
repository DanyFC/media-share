import { uploadFile } from '../controllers/file.js'
import { userExtractor } from './../utils/userExtractor.js'
import express from 'express'

const router = express.Router()

router.post('/', userExtractor, uploadFile)

export default router
