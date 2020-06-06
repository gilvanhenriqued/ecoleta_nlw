import knex from '../database/connection';
import { Request, Response } from 'express';

class PointsController {
    async create (req: Request, res: Response){
        // nessa rota ele está usando sintaxe simplificada, pra não precisar
        // atribuir cada parametro aos atributos da tabela
        const {
            name, email, whatsapp, latitude, longitude, city, uf, items
        } = req.body;
    
        // função que garante a execução síncrona dos dois inserts abaixo
        const trx = await knex.transaction();

        const point = {image: 'https://helioprint.com.br/wp-content/uploads/2017/07/organizar-prateleiras-supermercado.jpg?q=60&w=400', 
            name, email, whatsapp, latitude, longitude, city, uf};
    
        // inserindo dados passados no database
        const insertedIds = await trx('points').insert(point);
    
        const point_id = insertedIds[0];
    
        const pointItems = items.map((item_id: number) => {
            return {
                item_id,
                point_id
            };
        });
    
        // tabela de relacionamento   
        await trx('point_items').insert(pointItems);

        await trx.commit();
    
        return res.json({
            id: point_id, 
            ...point,
        });
    }

    async index (req: Request, res: Response){
        const { city, uf, items } = req.query;

        const parsedItems = String(items)
            .split(',')
            .map(item => Number(item.trim()));

        const points = await knex('points')
            .join('point_items', 'points.id', '=', 'point_items.point_id')
            .whereIn('point_items.item_id', parsedItems)
            .where('city', String(city))
            .where('uf', String(uf))
            .distinct()
            .select('points.*');

        return res.json(points);
    }

    async show (req: Request, res: Response){
        // posso usar o destructure já que o nome do parâmetro é o mesmo 
        // do que eu quero armazenar na constante
        const { id } = req.params;

        const point = await knex('points').where('id', id).first();

        if(!point) {
            return res.status(400).json({ message: 'Point nor found.' });
        }

        // acessando todos os items que estão no id do ponto
        const items = await knex('items')
            .join('point_items', 'items.id', '=', 'point_items.item_id')
            .where('point_items.point_id', id)
            .select('items.title');

        return res.json({ point, items });
    }
}

export default PointsController;