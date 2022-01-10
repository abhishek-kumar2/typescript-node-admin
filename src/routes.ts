import {Router} from "express";
import {AuthenticatedUser, Login, Logout, Register} from "./controller/auth.controller";
import {AuthMiddleware} from "./middleware/auth.middleware";

export const routes = (router: Router) => {
    router.post('/api/register', Register);
    router.post('/api/login', Login);
    router.post('/api/logout', Logout);
    router.get('/api/user', AuthMiddleware, AuthenticatedUser);
};