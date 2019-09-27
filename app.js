const express = require('express');
const app = express();
var mongoose = require("mongoose");
var bcrypt = require('bcrypt');
var cookieSession = require('cookie-session');
mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/mongo-1', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.urlencoded());

app.use(cookieSession({
  secret: "Login",
  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));

var schema = mongoose.Schema({
  name: { type: String },
  email: { type: String },
  password: { type: String },
});

schema.statics.authenticate = async (email, password) => {
  // buscamos el usuario utilizando el email
  const user = await mongoose.model("Visitor").findOne({ email: email });

  if (user) {
    // si existe comparamos la contraseña
    const match = await bcrypt.compare(password, user.password);
    return match ? user : null;
  }

  return null;
};

var Visitor = mongoose.model("Visitor", schema);

app.get('/register', function(req, res){
  res.send(
    '<form action="/register" method="post">' +
    '<label for="name">Name' +
    '<input type="text" id="name" name="name"></label>' +
    '<label for="email">Email' +
    '<input type="text" id="email" name="email"></label>' +
    '<label for="password">Password' +
    '<input type="password" id="password" name="password"></label>' +
    '<button type="submit">Registrarse</button>' +
    '</form>'
  );

});

app.post('/register', (req, res) => {
  bcrypt.hash(req.body.password, 10).then(function(hash) {
    Visitor.create({ name: req.body.name, email: req.body.email, password: hash }, function(err) {
      if (err) return console.error(err);
      res.redirect("/login");
    });
  })
});

app.get("/login", function (req, res) {
  res.send(
    '<form action="/login" method="post">' +
    '<label for="email">Email' +
    '<input type="text" id="email" name="email"></label>' +
    '<label for="password">Password' +
    '<input type="password" id="password" name="password"></label>' +
    '<button type="submit">Login</button>' +
    '</form>'
  );
});

app.post('/login', async(req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    const user = await Visitor.authenticate(email, password);
    if (user) {
      req.session.userId = user._id; // acá guardamos el id en la sesión
      return res.redirect("/");
    } else {
      return res.redirect("/login");
    }
  } catch (e) {
    console.log("Error", e);
  }
});

app.get('/', function(req, res){
  if (!req.session.userId) {
    return res.redirect("/login");
  }
  Visitor.find({},function(err, docs){
    var tabla = '<a href="/logout">Logout</a><table><thead><th></th><th></th></thead><tbody>';
    docs.forEach(element =>{
      tabla+='<tr><td>'+element.name+'</td><td>'+element.email+'</td></tr>';
    })
    tabla+="</tbody></table>";
    res.send(tabla);
  })

});

app.get('/logout', function(req, res){
  req.session.userId = null
  return res.redirect("/login");
});

app.listen(3000, () => console.log('Listening on port 3000!'));


/* VISITANTES RECURRENTES
const express = require('express');
const app = express();
var mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/mongo-1', { useNewUrlParser: true, useUnifiedTopology: true });

var schema = mongoose.Schema({
name: {type: String, default: "Anónimo" },
count: {type: Number, default: 1 }
});

var Visitor = mongoose.model("Visitor", schema);

function tablaHtml(datos) {
var tabla = '<table>'+
'<thead>'+
'<tr>' +
'<th>_id</th>' +
'<th>name</th>' +
'<th>count</th>' +
'</tr>' +
'</thead>'+
'<tbody>';
for (var i = 0; i < datos.length; i++) {
tabla += '<tr>'+
'<td>'+datos[i]._id+'</td>' +
'<td>'+datos[i].name+'</td>' +
'<td>'+datos[i].count+'</td>' +
'</tr>';
}
tabla += '</tbody>' + '</table>';
return tabla;
}
app.get('/', function(req, res){

if (req.query.name) {
Visitor.findOne({ name: req.query.name }, function(err, visitante) {
if (err) return console.error(err);
if (visitante){
visitante.count += 1;

visitante.save(function(err) {
if (err) return console.error(err);
Visitor.find(function(err, visitantes) {
if (err) return console.error(err);
res.send(tablaHtml(visitantes));
});
});
}
else {
Visitor.create({ name: req.query.name }, function(err) {
if (err) return console.error(err);
Visitor.find(function(err, visitantes) {
if (err) return console.error(err);
res.send(tablaHtml(visitantes));
});
});
}

});

} else {
Visitor.create({ name: "Anónimo" }, function(err) {
if (err) return console.error(err);
Visitor.find(function(err, visitantes) {
if (err) return console.error(err);
res.send(tablaHtml(visitantes));
});
});
}

});
app.listen(3000, () => console.log('Listening on port 3000!'));


/*const express = require('express');
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
Visitor.findOne({ name: req.query.name }, function(err, visitante) {
if (err) return console.error(err);
if(visitante){
Visitor.update({ count: req.query.name }, function(err) {
if (err) return console.error(err);
});
}else{
Visitor.create({ name: "Anónimo", count: 1 }, function(err) {
if (err) return console.error(err);
});
}
});

}
res.send(
'<table style="width:100%">'+
'<thead>'+
'<tr>' +
'<th>_id</th>' +
'<th>name</th>' +
'<th>count</th>' +
'</tr>' +
'</thead>'+
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
