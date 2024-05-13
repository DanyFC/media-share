import { fileURLToPath } from 'url'
import fs from 'fs'
import multer from 'multer'
import path from 'path'
import shortid from 'shortid'

export const uploadFile = async (req, res) => {
  const multerConfiguration = {
    limits: { fileSize: req.body.userId ? 1000000000 : 1000000 },
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, path.join(path.dirname(fileURLToPath(import.meta.url)), '/../uploads'))
      },
      filename: (req, file, cb) => {
        const extension = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length)
        cb(null, `${shortid.generate()}${extension}`)
      }
    })
  }

  const upload = multer(multerConfiguration)

  upload.single('file')(req, res, async (err) => {
    if (!err) {
      return res
        .status(200)
        .json({ file: req.file })
    } else {
      return res
        .status(422)
        .json({ errors: [{ msg: `${err.message}.` }] })
    }
  })
}

export const downloadFile = (req, res) => {
  const file = path.join(path.dirname(fileURLToPath(import.meta.url)), '/../uploads', req.params.file)
  res.download(file)
  setTimeout(() => {
    if (req.delete) {
      try {
        fs.unlinkSync(path.join(path.dirname(fileURLToPath(import.meta.url)), '/../uploads', req.params.file))
      } catch (error) {
        console.log(`Server error trying to delete the file ${req.file}: ${error}`)
      }
    }
  }, 3000)
}
