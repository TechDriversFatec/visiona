const path = require('path');
const multer = require("multer");
const express = require('express');
const conn = require('./connect.js');
const bodyParser = require('body-parser');
const multerConfig = require('./multer/multer');
const { check, validationResult } = require('express-validator');
const app = express();

const {
  getHomePage,
  addAreaRed,
  addArea,
  editArea,
  deleteArea,
  redirectIMG,
  uploadIMG,
  redirectGallery
} = require('./routes/routes.js');

// Definindo variáveis globais
global.conn = conn;

// configure middleware
app.set('views', __dirname + '/views'); // set express to look in this folder to render our view
app.set('view engine', 'ejs'); // configure template engine
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse form data client
app.use(express.static(path.join(__dirname, 'public'))); // configure express to use public folder

app.get('/', getHomePage);
app.post('/add', addArea);
app.get('/addRed', addAreaRed);
app.get('/edit/:id', editArea);
app.get('/files', redirectIMG);
app.get('/gallery', redirectGallery);
app.post("/upload", multer(multerConfig).single("file"), uploadIMG);
app.get('/delete/:id', deleteArea);

app.listen(port = 5500, () => {
  console.log(`Servidor rodando na porta: ${port}`);
});
