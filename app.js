const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('<h1>Hola </h1>' + req.query.nombre );
});

app.listen(3000, () => console.log('Listening on port 3000!'));
