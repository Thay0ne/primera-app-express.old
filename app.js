const express = require('express');
const app = express();

app.get('/', (req, res) => {
  var nombre = req.query.nombre;
  if (!nombre) {
    nombre = "desconocido";
  }
  res.send('<h1>Hola ' + nombre + '!</h1>');
});

app.listen(3000, () => console.log('Listening on port 3000!'));
