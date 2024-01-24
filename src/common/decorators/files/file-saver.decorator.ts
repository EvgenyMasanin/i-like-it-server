import { extname, join } from 'path'
import { diskStorage } from 'multer'
import { applyDecorators, UseInterceptors } from '@nestjs/common'
import { AnyFilesInterceptor, FileInterceptor } from '@nestjs/platform-express'

type FileSaverResult = ReturnType<typeof applyDecorators>

export function FileSaver(folderName: string): FileSaverResult
export function FileSaver(folderName: string, fieldName: string): FileSaverResult

export function FileSaver(folderName: string, fieldName?: string): FileSaverResult {
  const Interceptor = fieldName ? FileInterceptor.bind(null, fieldName) : AnyFilesInterceptor

  return applyDecorators(
    UseInterceptors(
      Interceptor({
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
