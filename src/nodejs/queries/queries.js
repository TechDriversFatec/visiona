module.exports = {
    insert_data: 'INSERT INTO `areas`(`geojson`, `nome_area`, `payload_imgs`, `agro_monitoring_key`, `hash_agro_monitoring`, `fk_id_usuario`) VALUES (\'p1\', \'p2\', \'p3\', \'p4\', \'p5\', 0);',
    get_areas: 'SELECT * FROM areas',
    get_specific_area: 'SELECT * FROM areas WHERE id_area = ?',
    update_geojson: 'UPDATE areas SET geojson = ? WHERE id_area = ?;',
    delete_geojson: 'DELETE FROM areas WHERE id_area = ?;'
};
