import {Request, Response} from "express";

export const Upload = async  (req: Request, res: Response) => {
    res.send({
        url: `http://localhost:${process.env.PORT}/api/uploads/${req.file.filename}`
    });
}