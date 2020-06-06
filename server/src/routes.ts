import express from 'express';

import PointsController from './controllers/PointsController';
import ItemsController from './controllers/ItemsController';

const routes = express.Router();

const pointsController = new PointsController();
const itemsController = new ItemsController();

/*  Padrão das Rotas
    index: listagem
    show: mostra um item
    create: inserir dados
    update: atualizar dados
    delete: remover dados
*/
routes.post('/points', pointsController.create);
routes.get('/points/:id', pointsController.show);
routes.get('/points', pointsController.index);
routes.get('/items', itemsController.index);

export default routes;


// request body: parâmetros para criação/atualização de dados
// request param: parâmetros na própria rota que identificam um recurso
// query params: parâmetros opicionais que servem para listagem ou filtro