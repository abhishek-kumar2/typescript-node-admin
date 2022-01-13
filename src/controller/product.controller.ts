import {Request, Response} from "express";
import {getManager} from "typeorm";
import {Product} from "../entity/product.entity";

export const Products =  async (req: Request, res: Response) => {
    const repository = getManager().getRepository(Product);
    const take = 10;
    const page = parseInt(req.query.page as string || '1');

    const [data, total] = await repository.findAndCount({
        take,
        skip: (page - 1) * take
    });

    return res.send({
        data,
        meta: {
            total,
            page,
            last_page: Math.ceil(total / take)
        }
    });
};

export const CreateProduct = async (req: Request, res: Response) => {
    const repository = getManager().getRepository(Product);
    const product = await repository.save(req.body);

    return res.status(201).send(product);
};

export const GetProduct = async (req: Request, res: Response) => {
    const repository = getManager().getRepository(Product);
    const product = await repository.findOne(req.params.id);

    if(!product) {
        return res.status(400).send({
            message: "Product not found!"
        });
    }

    return res.send(product);
};

export const UpdateProduct = async (req: Request, res: Response) => {
    const repository = getManager().getRepository(Product);

    await repository.update(req.params.id, req.body);

    const product = await repository.findOne(req.params.id);

    return res.status(202).send(product);
};

export const DeleteProduct = async (req: Request, res: Response) => {
    const repository = getManager().getRepository(Product);

    await repository.delete(req.params.id);

    return res.status(204).send(null);
};
