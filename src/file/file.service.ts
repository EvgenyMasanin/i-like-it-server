import { join } from 'path'
import { existsSync } from 'fs'
import { unlink } from 'fs/promises'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class FileService {
  constructor(private readonly configService: ConfigService) {}

  isFileExist(path: string) {
    return existsSync(path)
  }

  async deleteFile(filename: string) {
    const avatarPath = join(__dirname, '..', '..', 'static', filename)

    if (this.isFileExist(avatarPath)) await unlink(avatarPath)
  }
}
