module.exports = {
    insert_geojson: 'INSERT INTO areas(`geojson`) VALUES(?);',
    get_areas: 'SELECT * FROM areas',
    get_specific_area: 'SELECT * FROM areas WHERE id_area = ?',
    update_geojson: 'UPDATE areas SET geojson = ? WHERE id_area = ?;',
    delete_geojson: 'DELETE FROM areas WHERE id_area = ?;'
};
