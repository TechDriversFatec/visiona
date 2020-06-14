const conn = require('../connect.js');
const bcrypt = require('bcrypt-nodejs');
const query = require('../queries/queries.js');

const getHash = (password, callback) => {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, null, (err, hash) => callback(hash));
  });
}

module.exports = {
  createUser: async (req, res) => {
    let con = await conn();

    const { nome, email, password } = req.body;

    let scriptAdd = query.insert_user
        .replace('p1', nome)
        .replace('p2', email)
        .replace('p3', password);
      // execute query
      con.query(scriptAdd, (err, result) => {
        if (err) return res.status(500).send(err);

        res.status(200).json({
          status: 1,
          mensagem: "Usuário criado com Sucesso!"
        })
      });
  },

  getUsers: async (req, res) => {
    let con = await conn();
    con.query(query.get_users, (err, result) => {
      if (err) return res.status(500).send(err);

      res.status(200).json({
        status: 1,
        mensagem: "Sucesso!",
        users: result
      })
    });
  },

  getUserByEmail: async (req, res) => {
    let con = await conn();
    const { email } = req.body;
    con.query(query.get_usersByEmail.replace('p1', email), (err, result) => {
      if (err) return res.status(500).send(err);

      res.status(200).json({
        status: 1,
        mensagem: "Sucesso!",
        users: result
      })
    });
  },

  deleteUser: async(req, res) => {
    let con = await conn();
  
    const { userID } = req.query;

    let del_query = query.delete_user.replace('?', userID)

    con.query(del_query, (err, result) => {
      if (err) return res.status(500).send(err);

      res.status(200).json({
        status: 1,
        mensagem: "Deletado com Sucesso!"
      })
    })
  },

  updateUser: async(req, res) => {
    let con = await conn();

    const { userID } = req.query;
    const { nome, email, password } = req.body;

    let query_update;

    if(password){
      query_update = query.update_userWP.replace('p1', nome)
                                            .replace('p2', email)
                                            .replace('p3', password)
                                            .replace('?', userID)
    }else{
      query_update = query.update_userWNP.replace('p1', nome)
                                         .replace('p2', email)
                                         .replace('?', userID)
    }

    con.query(query_update, (err, result) => {
      if (err) return res.status(500).send(err);

      res.status(200).json({
        status: 1,
        mensagem: "Atualizado com Sucesso!",
        resp : result
      })
    })    
  }
}