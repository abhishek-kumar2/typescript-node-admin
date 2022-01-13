import {Request, Response} from "express";
import {getManager} from "typeorm";
import {User} from "../entity/user.entity";
import bcyptjs from "bcryptjs";

export const Users =  async (req: Request, res: Response) => {
    const repository = getManager().getRepository(User);
    const users = await repository.find({relations: ['role']});

    return res.send(users.map(u => {
        const {password, ...data} = u;
        return data;
    }));
};

export const CreateUser = async (req: Request, res: Response) => {
    const {role_id, ...body} = req.body;
    const hashedPassword = await bcyptjs.hash(process.env.COMMON_PASSWORD, 10);
    const repository = getManager().getRepository(User);
    const {password, ...user} = await repository.save({
        ...body,
        password: hashedPassword,
        role: { id: role_id }
    });

    return res.send(user);
};

export const GetUser = async (req: Request, res: Response) => {
    const repository = getManager().getRepository(User);
    const data = await repository.findOne(req.params.id, {relations: ['role']});

    if(!data) {
        return res.status(400).send({
            message: "User not found!"
        });
    }

    const {password, ...user} = data;

    return res.send(user);
};

export const UpdateUser = async (req: Request, res: Response) => {
    const repository = getManager().getRepository(User);
    const {role_id, ...body} = req.body;

    await repository.update(req.params.id, {
        ...body,
        role: {
            id: role_id
        }
    });

    const {password, ...user} = await repository.findOne(req.params.id, {relations: ['role']});

    return res.status(202).send(user);
};

export const DeleteUser = async (req: Request, res: Response) => {
    const repository = getManager().getRepository(User);

    await repository.delete(req.params.id);

    return res.status(204).send(null);
};
