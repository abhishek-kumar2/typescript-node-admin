import {Request, Response} from "express";
import Multer from "multer";
import {storage} from "../middleware/multer.middleware";

export const Upload = async  (req: Request, res: Response) => {
    const upload = Multer({storage}).single('image')

    upload(req, res, (err) => {
        if(err){
            return res.send(400).send(err);
        }

        res.send({
            url: `http://localhost:${process.env.PORT}/api/uploads/${req.file.filename}`
        });
    });
}