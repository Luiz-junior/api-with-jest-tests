const express = require('express');
const consign = require('consign');
const app = express();

const knex = require('knex');
const knexfile = require('../knexfile');

// TODO criar chaveamento dinâmico
app.db = knex(knexfile.test);

app.use(express.json());

consign({ cwd: 'src', verbose: false })
    .include('./config/middlewares.js')
    .then('./services')
    .then('./routes')
    .then('./config/routes.js')
    .into(app);

app.get('/', (req, res) => res.status(200).send());

module.exports = app;