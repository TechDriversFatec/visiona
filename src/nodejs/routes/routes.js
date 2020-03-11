const path = require('path');
const conn = require('../connect.js');
const indexMtds = require('../index.js');
const query = require('../queries/queries.js');

module.exports = {
    getHomePage : async(req, res) => {
        let con = await conn();
        let script = query.get_areas;

        // execute query
        con.query(script, (err, result) => {
            if (err) {
                res.redirect('/');
            }
            res.render('../public/views/index.ejs', {
                title: 'Visiona Painel de Controle | View Areas',
                areas: result
            });
        });
    },

    addAreaRed : (req, res) => {
      res.render('../public/views/addArea.ejs', {
          title: 'Adicionar Areas',
          message: ''
      });
    },

    addArea : async(req, res) => {
      let con = await conn();
      let geojson = req.params.map;
      let scriptAdd = query.insert_geojson.replace('?', geojson);

      // execute query
      con.query(scriptAdd, (err, result) => {
          if (err) return res.status(500).send(err);

          res.render('../public/views/addArea.ejs', {
              title: 'Adicionar Areas',
              message: ''
          });
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
              return res.status(200).send({
                mensagem : 'Deletado com Sucesso!'
              });
              res.redirect('/');
            }
        });
    }
};
