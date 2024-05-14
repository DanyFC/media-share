import { downloadFile, uploadFile } from '../controllers/file.js'
import { decrementLink } from '../controllers/link.js'
import { userExtractor } from './../utils/userExtractor.js'
import express from 'express'

const router = express.Router()

router.post('/', userExtractor, uploadFile)

router.get('/:file', decrementLink, downloadFile)

export default router
