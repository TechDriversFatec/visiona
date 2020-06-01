const fs = require('fs');
const path = require('path');
const conn = require('../connect.js');
const query = require('../queries/queries.js');
const VisionaDAO = require('../DAO/visionaDAO.js');
const visionaDAO = new VisionaDAO();

module.exports = {
    getAllAreas : async(req, res) => {
        try {
          let get_areas = await visionaDAO.GetAllAreas();
          res.status(200).json({
            status: 1,
            mensagem : "Sucesso!",
            areas : get_areas
          })
        } catch (e) {
          res.status(500);
          res.render('../public/views/errors.ejs', {
              title: 'Erro!',
              message_error: 'Erro ao buscas áreas'
          });
        }
    },

    addArea : async(req, res) => {
      let con = await conn();
      let {
        geojson,
        name,
        payload,
        key,
        hash
      } = req.body;
      geojson = JSON.stringify(geojson);
      payload = JSON.stringify(payload);
      let scriptAdd = query.insert_data
                                      .replace('p1', geojson)
                                      .replace('p2', name)
                                      .replace('p3', payload)
                                      .replace('p4', key)
                                      .replace('p5', hash);
      // execute query
      con.query(scriptAdd, (err, result) => {
          if (err) return res.status(500).send(err);

          res.status(200).json({
            status: 1,
            mensagem : "Inserido com Sucesso!",
            payload : payload
          })
      });
    },

    editArea: async(req, res) => {
      let con = await conn();
      let areaID = req.params.id;
      let scriptEdit = query.get_specific_area.replace('?', areaID);

      con.query(scriptEdit, (err, result) => {
        if(err) return res.status(500).send(err);

        res.status(200).json({
          status : 1,
          mensagem : "Sucesso!",
          result : result[0]
        })
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
          res.status(200).json({
            status: 1,
            mensagem : "Excluído com Sucesso!"
          })
        }
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
