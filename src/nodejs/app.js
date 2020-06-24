const path = require('path');
const cors = require('cors');
const multer = require("multer");
const express = require('express');
const conn = require('./connect.js');
const bodyParser = require('body-parser');
const multerConfig = require('./multer/multer');
const { check, validationResult } = require('express-validator');
const app = express();

const {
  getAllAreas,
  addArea,
  editArea,
  deleteArea,
  uploadIMG,
  redirectGallery
} = require('./routes/routes.js');

const {
  createUser,
  getUsers,
  deleteUser,
  updateUser,
  getUserByEmail
} = require('./routes/users')

// Definindo variáveis globais
global.conn = conn;

// configure middleware
app.use(cors({
  origin : '*'
}))
app.set('views', __dirname + '/views'); // set express to look in this folder to render our view
app.set('view engine', 'ejs'); // configure template engine
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse form data client
app.use(express.static(path.join(__dirname, 'public'))); // configure express to use public folder

// Áreas
app.get('/getAreas', getAllAreas);
app.post('/add', addArea);
app.get('/edit/:id', editArea);
app.get('/gallery', redirectGallery);
app.post("/upload", multer(multerConfig).single("file"), uploadIMG);
app.get('/delUser', deleteArea);

// Usuários
app.post('/createUser', createUser);
app.get('/getUsers', getUsers);
app.post('/getUsersByEmail', getUserByEmail);
app.delete('/delUser', deleteUser);
app.patch('/upUser', updateUser);

app.listen(port = 5500, () => {
  console.log(`Servidor rodando na porta: ${port}`);
});
