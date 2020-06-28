import path from 'path'
import crypto from 'crypto'
import multer from 'multer'

const tmp_folder = path.resolve(__dirname, '..', '..', 'tmp')

export default {
  directory: tmp_folder,
  storage: multer.diskStorage({
    destination: tmp_folder,
    filename(request, file, cb) {
      const fileHash = crypto.randomBytes(8).toString("hex")
      const fileName = `${fileHash}-${file.originalname}`

      return cb(null, fileName)
    }
  })
}
