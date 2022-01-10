import express from 'express';
import cors from 'cors';
import {routes} from "./routes";
import {createConnection} from "typeorm";
import cookieParser from "cookie-parser";

createConnection().then(() => {
    const app = express();
    const port = process.env.PORT || 8001;

    app.use(express.json());
    app.use(cookieParser());
    app.use(cors({
        credentials: true,
        origin: [`${process.env.HOST}:3000`]
    }));

    routes(app);

    app.listen(port, () => {
        console.log(`listening to port ${port}`)
    });
});
