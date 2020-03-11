const path = require('path');
const express = require('express');
const conn = require('./connect.js');
const bodyParser = require('body-parser');
const { getHomePage, addAreaRed, addArea, editArea, deleteArea } = require('./routes/routes.js');
const { check, validationResult } = require('express-validator');
const VisionaDAO = require('./DAO/visionaDAO.js');
const visionaDAO = new VisionaDAO();
const app = express();

// Definindo variáveis globais
const port = 5500;
global.conn = conn;

// configure middleware
app.set('port', process.env.port || port); // set express to use this port
app.set('views', __dirname + '/views'); // set express to look in this folder to render our view
app.set('view engine', 'ejs'); // configure template engine
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse form data client
app.use(express.static(path.join(__dirname, 'public'))); // configure express to use public folder

app.get('/', getHomePage);
app.post('/add', addArea, [
  check('geojson', 'geojson is required').not().isEmpty()
]);
app.get('/addRed', addAreaRed);
app.get('/edit/:id', editArea);
app.get('/delete/:id', deleteArea);

app.listen(port, () => {
  console.log(`Servidor rodando na porta: ${port}`);
});
