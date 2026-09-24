import { diskStorage } from 'multer';
import { extname } from 'path';
import { existsSync, mkdirSync } from 'fs';

export const multerOptions = (folder: string) => {
  const uploadPath = `./uploads/${folder}`;

  if (!existsSync(uploadPath)) {
    mkdirSync(uploadPath, { recursive: true });
  }

  return {
    storage: diskStorage({
      destination: uploadPath,

      filename: (
        req: Express.Request,
        file: Express.Multer.File,
        callback: (error: Error | null, filename: string) => void,
      ) => {
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${extname(file.originalname)}`;

        callback(null, uniqueName);
      },
    }),
  };
};
