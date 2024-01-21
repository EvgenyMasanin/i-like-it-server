import { extname, join } from 'path'
import { diskStorage } from 'multer'
import { applyDecorators, UseInterceptors } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'

export const FileSaver = (fieldName: string, folderName: string) => {
  return applyDecorators(
    UseInterceptors(
      FileInterceptor(fieldName, {
        storage: diskStorage({
          destination: './static',
          filename: (req, file, cb) => {
            const randomName = Array(32)
              .fill(null)
              .map(() => Math.round(Math.random() * 16).toString(16))
              .join('')
            const fileName = join(folderName, randomName + extname(file.originalname))
            return cb(null, fileName)
          },
        }),
      })
    )
  )
}
