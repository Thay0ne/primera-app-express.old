const express = require('express');
const app = express();

app.get('/user/:nombre', (req, res) => {
  res.send('<h1>Hola </h1>' + req.params.nombre );
});

app.listen(3000, () => console.log('Listening on port 3000!'));
