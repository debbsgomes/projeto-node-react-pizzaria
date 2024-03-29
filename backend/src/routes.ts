import { Router } from 'express';   //dentro de scripts no package.json => "dev": "ts-node-dev src/server.ts"
import multer from 'multer'

import { CreateUserController } from './controllers/user/CreateUserController'
import { AuthUserController } from './controllers/user/AuthUserController'
import { DetailUserController } from './controllers/user/DetailUserController'

import { isAuthenticated} from './middlewares/isAuthenticated'
import { CreateCategoryController } from './controllers/category/CreateCategoryController';
import { ListCategoryController} from './controllers/category/ListCategoryController'
import { CreateProductController } from './controllers/product/CreateProductController'
import { ListByCategoryController } from './controllers/product/ListByCategoryController';

import uploadConfig from './config/multer'

const router = Router(); //inicializando a rota

const upload = multer(uploadConfig.upload("./tmp"));


// ROTAS USER
router.post('/users', new CreateUserController().handle)

router.post('/session', new AuthUserController().handle)

router.get('/me', isAuthenticated, new DetailUserController().handle)

// ROTAS CATEGORY

router.post('/category', isAuthenticated, new CreateCategoryController().handle)

router.get('/category', isAuthenticated, new ListCategoryController().handle)

// ROTAS PRODUCT

router.post('/product', isAuthenticated, upload.single('file'), new CreateProductController().handle)

router.get('/category/product', isAuthenticated, new ListByCategoryController().handle)



export { router }; //exportando a rota