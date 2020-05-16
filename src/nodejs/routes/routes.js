const fs = require('fs');
const path = require('path');
const multer = require("multer");
const conn = require('../connect.js');
const indexMtds = require('../index.js');
const query = require('../queries/queries.js');
const VisionaDAO = require('../DAO/visionaDAO.js');
const multerConfs = require('../multer/multer');
const visionaDAO = new VisionaDAO();

module.exports = {
    getHomePage : async(req, res) => {
        try {
          let get_areas = await visionaDAO.GetAllAreas();
          res.render('../public/views/index.ejs', {
              title: 'Visiona Painel de Controle | View Areas',
              areas: get_areas
          });
        } catch (e) {
          res.status(500);
          res.render('../public/views/errors.ejs', {
              title: 'Erro!',
              message_error: 'Erro ao buscas áreas'
          });
        }
    },

    addAreaRed : (req, res) => {
      res.render('../public/views/addArea.ejs', {
          title: 'Adicionar Areas',
          message: ''
      });
    },

    addArea : async(req, res) => {
      let con = await conn();
      const { geojson } = req.body;
      let scriptAdd = query.insert_geojson.replace('?', geojson);

      // execute query
      con.query(scriptAdd, (err, result) => {
          if (err) return res.status(500).send(err);

          res.status(200);
          res.redirect('/');
      });
    },

    editArea: async(req, res) => {
      let con = await conn();
      let areaID = req.params.id;
      let scriptEdit = query.get_specific_area.replace('?', areaID);

      con.query(scriptEdit, (err, result) => {
        if(err) return res.status(500).send(err);

        res.render('../public/views/editArea.ejs', {
          title: 'Editar Areas',
          area : result[0]
        });
      });
    },

    deleteArea : async(req, res) => {
      let areaID = req.params.id;
      let con = await conn();
      let scriptDel = query.delete_geojson.replace('?', areaID);

      con.query(scriptDel, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }else{
          res.status(200);
          res.redirect('/');
        }
      });
    },

    redirectIMG : (req, res) => {
      res.render('../public/views/files.ejs', {
        title: 'Upload de Imagens'
      });
    },

    redirectGallery : (req, res) => {
      var images = []
      var folder = path.resolve(__dirname, '..', 'public', 'assets', 'imgs')
      // Função que lerá a pasta com todas as imagens armazenadas
      fs.readdirSync(folder).forEach(file => {
        images.push({
          img : file
        })
      });

      var msg = (images.length != 0) ? 'Aqui estão todas as imagens armazenadas!' : 'Nenhuma Imagem ainda!';

      res.render('../public/views/gallery.ejs', {
        title: 'Upload de Imagens',
        success : `${msg}`,
        files : images
      });
    },

    uploadIMG : (req, res) => {
      if(req.file){
        var images = []
        var folder = path.resolve(__dirname, '..', 'public', 'assets', 'imgs')
        // Função que lerá a pasta com todas as imagens armazenadas
        fs.readdirSync(folder).forEach(file => {
          images.push({
            img : file
          })
        });
        res.render('../public/views/gallery.ejs', {
          title: 'Galeria de Imagens',
          success : `A imagem ${req.file.filename} foi enviada!`,
          files : images
        });
      }else{
        res.json({
          status: 0,
          mensagem: 'Erro ao processar'
        })
      }
    },
};
