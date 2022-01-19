import {Router} from "express";
import express from "express";
import {AuthenticatedUser, Login, Logout, Register, UpdateInfo, UpdatePassword} from "./controller/auth.controller";
import {AuthMiddleware} from "./middleware/auth.middleware";
import {CreateUser, DeleteUser, GetUser, UpdateUser, Users} from "./controller/user.controller";
import {Permissions} from "./controller/permission.controller";
import {CreateRole, DeleteRole, GetRole, Roles, UpdateRole} from "./controller/role.controller";
import {CreateProduct, DeleteProduct, GetProduct, Products, UpdateProduct} from "./controller/product.controller";
import {Upload} from "./controller/image.controller";
import {Chart, Export, Orders} from "./controller/order.controller";
import {PermissionMiddleware} from "./middleware/permission.middleware";

export const routes = (router: Router) => {
    //Auth Controller
    router.post('/api/register', Register);
    router.post('/api/login', Login);
    router.post('/api/logout', Logout);
    router.get('/api/user', AuthMiddleware, AuthenticatedUser);
    router.put('/api/users/info', AuthMiddleware, UpdateInfo);
    router.put('/api/users/password', AuthMiddleware, UpdatePassword);

    //User Controller
    router.get('/api/users', AuthMiddleware, PermissionMiddleware('users'), Users);
    router.post('/api/users', AuthMiddleware, PermissionMiddleware('users'), CreateUser);
    router.get('/api/users/:id', AuthMiddleware, PermissionMiddleware('users'), GetUser);
    router.put('/api/users/:id', AuthMiddleware, PermissionMiddleware('users'), UpdateUser);
    router.delete('/api/users/:id', AuthMiddleware, PermissionMiddleware('users'), DeleteUser);

    //Permission Controller
    router.get('/api/permissions', AuthMiddleware, Permissions);

    //Role Controller
    router.get('/api/roles', AuthMiddleware, PermissionMiddleware('roles'), Roles);
    router.post('/api/roles', AuthMiddleware, PermissionMiddleware('roles'), CreateRole);
    router.get('/api/roles/:id', AuthMiddleware, PermissionMiddleware('roles'), GetRole);
    router.put('/api/roles/:id', AuthMiddleware, PermissionMiddleware('roles'), UpdateRole);
    router.delete('/api/roles/:id', AuthMiddleware, PermissionMiddleware('roles'), DeleteRole);

    //Product Controller
    router.get('/api/products', AuthMiddleware, PermissionMiddleware('products'), Products);
    router.post('/api/products', AuthMiddleware, PermissionMiddleware('products'), CreateProduct);
    router.get('/api/products/:id', AuthMiddleware, PermissionMiddleware('products'), GetProduct);
    router.put('/api/products/:id', AuthMiddleware, PermissionMiddleware('products'), UpdateProduct);
    router.delete('/api/products/:id', AuthMiddleware, PermissionMiddleware('products'), DeleteProduct);

    //Order Controller
    router.get('/api/orders', AuthMiddleware, PermissionMiddleware('orders'), Orders);
    router.post('/api/export', AuthMiddleware, PermissionMiddleware('orders'), Export);
    router.get('/api/chart', AuthMiddleware, PermissionMiddleware('orders'), Chart)

    //Image Upload
    router.post('/api/upload', AuthMiddleware, Upload);

    //Static files access
    router.use('/api/uploads', express.static(process.env.UPLOAD_PATH));
};