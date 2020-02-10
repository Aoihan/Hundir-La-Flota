var express = require('express');
var router = express.Router();
var jugadores = 0;


/* GET home page. */
router.get('/', function(req, res, next) {
  
  const session = req.session;
  
  if (!session.jugador) {
    jugadores++;
    session.jugador = jugadores;
  }
  res.render('index', { title: 'Juego de Hundir la flota',jugadores });
});

module.exports = router;

