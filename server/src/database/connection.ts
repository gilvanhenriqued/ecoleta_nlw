import knex from 'knex';
import path from 'path';

const connection = knex({
    client: 'sqlite3',
    connection: {
        filename: path.resolve(__dirname, 'database.sqlite')
    },
    useNullAsDefault: true,
});

export default connection;

/* 
    Entidades: 
    - Pontos (nome e imagem) 
    - Itens (imagem, nome, email, whats, lat, long, cidade, uf)
    Relacionamento: N-N 
    (1 ponto pode ter vários itens)
    (1 item pode ser armazenado por vários pontos)
    N-N gera uma tabela pivot de relacionamento
*/

/*
    Migrations (knex): ajuda no desenvolvimento em equipe
*/