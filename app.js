const express = require('express');
const app = express();

app.get('/makers/:name', (req, res) => {
  res.send('<h1>Hola ' + req.params.name + '!</h1>');
});

app.listen(3000, () => console.log('Listening on port 3000!'));

/*SALUDAME1
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
*/
