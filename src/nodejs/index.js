const fs = require('fs');
const express = require('express');
const VisionaDAO = require('./DAO/visionaDAO.js');
const visionaDAO = new VisionaDAO();

module.exports = {
  // Método Salvar
  savedGeoJson : async (obj) => {
    await visionaDAO.SetGeoJson({
        geojson: `${obj}`
      });
      console.log('Salvo!');
  },

  // Método Listar todas as áreas
  GetAll : async () => {
    let all_areas = await visionaDAO.GetAllAreas();
    return all_areas;
  }

};
