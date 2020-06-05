import express from 'express';
import knex from './database/connection';

const routes = express.Router();

// request body: parâmetros para criação/atualização de dados
// request param: parâmetros na própria rota que identificam um recurso
// query params: parâmetros opicionais que servem para listagem ou filtro

routes.get('/items', async (req, res) => {
    const items = await knex('items').select('*');
 
    // serialização - transformar os dados para ser mais acessíveis
    const serializedItems = items.map(item => {
        return {
            title: item.title,
            image_url: `http://localhost:3333/uploads/${item.image}`
        };
    });

    return res.json(serializedItems);
});

export default routes;