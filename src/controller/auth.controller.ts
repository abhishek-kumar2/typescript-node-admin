import {Request, Response} from "express";
import {RegisterValidation} from "../validation/register.validation";
import {getManager} from "typeorm";
import {User} from "../entity/user.entity";
import bcyptjs from "bcryptjs";

export const Register = async (req: Request, res: Response) => {
    const body = req.body;
    const {error} = RegisterValidation.validate(body);
    const repository = getManager().getRepository(User);
    const _user = await repository.findOne({email: body.email});

    if(_user) {
        return res.status(409).send({
            message: "User already exists."
        });
    }

    if(error) {
        return res.status(400).send(error.details);
    }

    if(body.password !== body.confirm_password) {
        return res.status(400).send({
            message: "Password's do not match."
        });
    }


    const {password, ...user} = await repository.save({
        first_name: body.first_name,
        last_name: body.last_name,
        email: body.email,
        password: await bcyptjs.hash(body.password, 10)
    });

    res.send(user);
};

export const Login = async (req: Request, res: Response) => {
    const repository = getManager().getRepository(User);
    const {password, ...user} = await repository.findOne({email: req.body.email});

    if(!user || !await bcyptjs.compare(req.body.password, password)) {
        return res.status(400).send({
            message: "Invalid credentials"
        });
    }

    res.send(user);
};