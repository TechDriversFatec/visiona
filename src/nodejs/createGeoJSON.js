const fs = require('fs');

try {
  fs.writeFile('../arcs/coordsCli.json', 'teste', (err) => {
    if (err) throw err;
    console.log('Arquivo salvo!');
  });
} catch (e) {
  return 'Error: ' + e;
}
