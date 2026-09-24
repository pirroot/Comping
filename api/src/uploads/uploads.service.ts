import { Injectable } from '@nestjs/common';
import { existsSync, unlinkSync } from 'fs';
import { join } from 'path';

@Injectable()
export class UploadsService {
  async upload(file: Express.Multer.File, folder: string) {
    return {
      filename: file.filename,
      path: file.path,
      url: `/uploads/${folder}/${file.filename}`,
    };
  }

  delete(filePath: string) {
    const fullPath = join(process.cwd(), filePath);

    if (existsSync(fullPath)) {
      unlinkSync(fullPath);
    }
  }
}
