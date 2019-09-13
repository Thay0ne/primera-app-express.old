const express = require('express');
const app = express();
const useragent = require('express-useragent');

app.use(useragent.express());
app.get('/', function(req, res){
  res.send(req.useragent);
});

app.listen(3000, () => console.log('Listening on port 3000!'));

/* SALUDAME3
const express = require('express');
const app = express();

app.use(express.urlencoded());

app.get('/', (req, res) => {
  res.send(
  '<form action="/myapp" method="post">' +
  '<label for="name">'+
  '<input type="text" id="name" name="name">' +
  '<button type="submit">Enviar</button>' +
  '</form>'
  );
});

app.post('/myapp', (req, res) => {
  res.send('<h1>Hola ' + req.body.name + '!</h1>');
});

app.listen(3000, () => console.log('Listening on port 3000!'));

/*SALUDAME2
const express = require('express');
const app = express();

app.get('/makers/:name', (req, res) => {

  function capitalizeFirstLetter(name) {
  return name.charAt(0).toUpperCase() + name.slice(1);
}
  res.send('<h1>Hola ' + capitalizeFirstLetter(req.params.name) + '!</h1>');
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
