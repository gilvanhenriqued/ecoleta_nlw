import express from 'express';

const app = express();

app.get('/users', (req, res) => {
    res.json([
        'Diego',
        'Gilvan',
        'Arthur',
        'Daniel'
    ])
});

app.listen(3333);