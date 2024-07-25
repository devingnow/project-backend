import { HttpException, HttpStatus } from '@nestjs/common';
import { Request } from 'express';
import { diskStorage, FileFilterCallback } from 'multer';
import {extname, basename} from 'path';

export const multerOptions = {
    stroage: diskStorage({
        destination: "../static",
        filename: (req, file, cb) => {
            const fileExtName = extname(file.originalname);
            const newFileName = basename(file.originalname, fileExtName) + '_' + Date.now() + fileExtName;
            cb(null, newFileName);
        },
    }),
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
    fileFileter: (req: Request, file: Express.Multer.File, cb:FileFilterCallback) => {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new HttpException ({message: '허용되지 않은 파일 타입입니다.'}, HttpStatus.BAD_REQUEST));
        }
    }
};