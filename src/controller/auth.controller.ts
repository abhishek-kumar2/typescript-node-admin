import {Request, Response} from "express";
import {RegisterValidation} from "../validation/register.validation";
import {getManager} from "typeorm";
import {User} from "../entity/user.entity";
import bcyptjs from "bcryptjs";
import {sign, verify} from "jsonwebtoken";

export const Register = async (req: Request, res: Response) => {
    const body = req.body;
    const {error} = RegisterValidation.validate(body);

    if(error) {
        return res.status(400).send(error.details);
    }

    const repository = getManager().getRepository(User);
    const checkUser = await repository.findOne({email: body.email});

    if(checkUser) {
        return res.status(409).send({
            message: "User already exists."
        });
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

    return res.send(user);
};

export const Login = async (req: Request, res: Response) => {
    const repository = getManager().getRepository(User);
    const {password, ...user} = await repository.findOne({email: req.body.email});

    if(!user || !await bcyptjs.compare(req.body.password, password)) {
        return res.status(400).send({
            message: "Invalid credentials"
        });
    }

    const token = sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN});

    res.cookie('jwt', token, {
        httpOnly: true,
        maxAge: Number(process.env.COOKIE_MAX_AGE)
    });

    return res.send({
        message: "Login Success..."
    });
};

export const AuthenticatedUser = async (req: Request, res: Response) => {
    const {password, ...user} = req["user"];

    return res.send(user);
};

export const Logout = (req: Request, res: Response) => {
    res.cookie('jwt', '', {httpOnly: true, maxAge: Number(process.env.COOKIE_MIN_AGE)});
    res.send({
        message: "Logout Success..."
    });
};

export const UpdateInfo = async (req: Request, res: Response) => {
    const user = req["user"];
    const repository = getManager().getRepository(User);
    const body = req.body;
    //const {error} = RegisterValidation.validate(body);

    //console.log(error);

    await repository.update(user.id, body);

    const {password, ...data} = await repository.findOne(user.id);

    res.send(data);
};

export const UpdatePassword = async (req: Request, res: Response) => {
    const user = req["user"];

    if(req.body.password !== req.body.confirm_password) {
        return res.status(400).send({
            message: "Password's do not match."
        });
    }

    const repository = getManager().getRepository(User);
    await repository.update(user.id, {
        password: await bcyptjs.hash(req.body.password, 10)
    });

    const {password, ...data} = await repository.findOne(user.id);

    res.send(data);
};
