const express = require('express');
const app = express();
var mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/mongo-1', { useNewUrlParser: true, useUnifiedTopology: true });

var schema = mongoose.Schema({
  name: {type: String, default: "Anónimo" },
  count: {type: Number, default: 1 }
});

var Visitor = mongoose.model("Visitor", schema);

app.get('/', function(req, res){
  if (req.query.name) {
    Visitor.find({ name: req.query.name }, function(err, visitante) {
  if (err) return console.error(err);
  if(visitante){
    Visitor.update({ name: req.query.name }, function(err) {
  if (err) return console.error(err);
});
  }else{
    Visitor.create({ name: req.query.name }, function(err) {
      if (err) return console.error(err);
    });
  }
});

  }

res.send(
    '<table>'+
    '<tr>' +
    '<td>_id</td>' +
    '<td>name</td>' +
    '<td>count</td>' +
    '<tr>' +
    '</table>' + req.query.name
   );
});

app.listen(3000, () => console.log('Listening on port 3000!'));

/* Visitantes
const express = require('express');
const app = express();
var mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/mongo-1', { useNewUrlParser: true, useUnifiedTopology: true });

var schema = mongoose.Schema({
  date: {type: Date, default: Date.now()},
  name: {type: String, default: "Anónimo" }

});

var Visitor = mongoose.model("Visitor", schema);

app.get('/', function(req, res){
  Visitor.create({ name: req.query.name }, function(err) {
    if (err) return console.error(err);
  });
  res.send('<h1>"El visitante fue almacenado con éxito"</h1>' + req.query.name);
});

app.listen(3000, () => console.log('Listening on port 3000!'));

/*PRACTICANDO MONGODB
const express = require('express');
const app = express();

var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true, useUnifiedTopology: true});

mongoose.connection.on("error", function(e) { console.error(e); });

// definimos el schema
var schema = mongoose.Schema({
  title: String,
  body: String,
  published: { type: Boolean, default: false }
});

// definimos el modelo
var Article = mongoose.model("Article", schema);

Article.create({ title: "Artículo 2", body: "Cuerpo del artículo" }, function(err) {
  if (err) return console.error(err);
});

Article.insertMany([
  { title: "Artículo 3", body: "Cuerpo del artículo" },
  { title: "Artículo 4", body: "Cuerpo del artículo" }
], function(err) {
  if (err) return console.error(err);
});

Article.find(function(err, articles) {
  if (err) return console.error(err);
  console.log(articles);
});

Article.find({ article: "El título" }, function(err, articles) {
  if (err) return console.error(err);
  console.log(articles);
});

app.listen(3000, () => console.log('Listening on port 3000!'));

/*ENCABEZADOS
const express = require('express');
const app = express();

app.get('/', function(req, res){
    res.send(req.get('User-Agent'));
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
