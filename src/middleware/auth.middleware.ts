import {Request, Response} from "express";
import {verify} from "jsonwebtoken";
import {getManager} from "typeorm";
import {User} from "../entity/user.entity";

export const AuthMiddleware = async (req: Request, res: Response, next: Function) => {
    const jwt = req.cookies['jwt'];
    let payload: any;

    try {
        payload = jwt ? verify(jwt, process.env.JWT_SECRET) : undefined;
    } catch(e) {
        return res.status(401).send({
            message: "Unauthenticated..."
        });
    }


    if(!payload) {
        return res.status(401).send({
            message: "Unauthenticated..."
        });
    }

    const repository = getManager().getRepository(User);
    const user = await repository.findOne(payload.id, {relations: ['role', 'role.permissions']});

    req["user"] = user;

    next()
};