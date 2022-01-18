import Multer from "multer";
import {Request} from "express";
import {extname} from "path";

export const storage = Multer.diskStorage({
    destination: './uploads',
    /*filename(req: e.Request, file: Express.Multer.File, callback: (error: (Error | null), filename: string) => void) {
    }*/

    filename(_: Request, file: Express.Multer.File, callback) {
        const randomName = Math.random().toString(20).substr(2, 12);
        return callback(null, `${randomName}${extname(file.originalname)}`);
    }
});