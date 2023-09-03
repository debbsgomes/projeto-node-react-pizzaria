import express, { Request, Response, NextFunction} from 'express'
import 'express-async-errors';
import cors from 'cors'; 
import path from 'path';

import { router } from './routes'

const app = express(); //biblioteca para trabalhar com APIs
app.use(express.json()); //falar para o projeto que estamos utilizando JSON
app.use(cors()); // para que qualquer IP possa fazer requisições na API

app.use(router); //informar qual rota estamos utilizando

app.use(
    '/files',
    express.static(path.resolve(__dirname, '..', 'tmp'))
)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if(err instanceof Error) {
        //Se for uma instância do tipo error
        return res.status(400).json({
            error: err.message
        })
    }
    return res.status(500).json({
        status: 'error',
        message: 'Internal server error.'
    })
}) //Para tratar erros nas requisições



app.listen(3333, () => console.log('Servidor online!!')); //configurando a porta que o programa será chamado



