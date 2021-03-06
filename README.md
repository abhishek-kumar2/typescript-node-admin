# typescript-node-admin

## --|| Auth ||--
POST   http://localhost:8001/api/register  
POST   http://localhost:8001/api/login  
GET    http://localhost:8001/api/user  
POST   http://localhost:8001/api/logout  
PUT    http://localhost:8001/api/user/info  
PUT    http://localhost:8001/api/user/password  

## --|| User ||--
GET    http://localhost:8001/api/users  
GET    http://localhost:8001/api/users?page=2  
POST   http://localhost:8001/api/users  
GET    http://localhost:8001/api/users/1  
PUT    http://localhost:8001/api/users/4  
DELETE http://localhost:8001/api/users/6  

## --|| Permission ||--
GET    http://localhost:8001/api/permissions  

## --|| Role ||--
GET    http://localhost:8001/api/roles  
POST   http://localhost:8001/api/roles  
GET    http://localhost:8001/api/roles/4  
PUT    http://localhost:8001/api/roles/4  
DELETE http://localhost:8001/api/roles/4  

## --|| Product ||--
GET    http://localhost:8001/api/products  
GET    http://localhost:8001/api/products?page=2  
POST   http://localhost:8001/api/products  
GET    http://localhost:8001/api/products/2  
PUT    http://localhost:8001/api/products/2  
DELETE http://localhost:8001/api/products/3  

## --|| Image Upload || --
POST   http://localhost:8001/api/upload  
GET    http://localhost:8001/api/uploads/<image_name> (static path)

## --|| Order ||--
GET    http://localhost:8001/api/orders  
GET    http://localhost:8001/api/orders?page=2  
POST   http://localhost:8001/api/export (export orders in csv)

##
Use NodeJS with Typescript,
Use TypeORM with MySQL,
Generate Jwt Token,
Login with HttpOnly Cookies,
Upload Images,
Export CSV files,
React with Typescript,
Use Redux  
(FF code repo is 'typescript-react-admin')