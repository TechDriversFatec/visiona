const conn = require('../connect.js');
const query = require('../queries/queries.js');

module.exports = class VisionaDAO {
  // Cria GeoJson
  async SetGeoJson(obj) {
    let con = await conn();
    try {
      await con.query('START TRANSACTION');
      let savedGeoJson = await con.query(
        query.insert_geojson,
        [obj]
      );
      await con.query('COMMIT');
      obj.id = savedGeoJson.insertId;
      return obj;
    } catch (e) {
      await con.query('ROLLBACK');
      throw e;
    } finally {
      await con.release();
      await con.destroy();
    }
  };

  // Atualiza GeoJson
  async UpGeoJson(obj){
    let con = await conn();
    try {
      await con.query('START TRANSACTION');
      await con.query(query.update_geojson, [
        obj.geojson,
        obj.id
      ]);
      await con.query('COMMIT');
      return true;
    } catch (e) {
      await con.query('ROLLBACK');
      throw e;
    } finally {
      await con.release();
      await con.destroy();
    }
  };

  // Deleta Area
  async DelGeoJson(id){
    let con = await conn();
    try {
      await con.query("START TRANSACTION");
      await con.query(query.delet_geojson, [id]);
      await con.query("COMMIT");
      return true;
    } catch (e) {
      await con.query('ROLLBACK');
      throw e;
    } finally {
      await con.release();
      await con.destroy();
    }
  };

  // Busca por todas as Áreas
  async GetAllAreas(){
    let con = await conn();
    try {
      await con.query('START TRANSACTION');
      let areas = await con.query(query.get_areas);
      await con.query('COMMIT');
      areas = JSON.parse(JSON.stringify(areas));
      return areas;
    } catch (e) {
      throw e;
    } finally {
      await con.release();
      await con.destroy();
    }
  }
}
