var express = require("express");
var router = express.Router();
var jugadores = 0;
var array_Tablero_Ships = [];
var array_Tablero_Tiradas = [];
var array_Ships = [];
var nombres = [
  "portaaviones",
  "submarino_1",
  "submarino_2",
  "submarino_3",
  "destructor_1",
  "destructor_2",
  "destructor_3",
  "fragata_1",
  "fragata_2"
];

/* GET home page. */
router.get("/", function(req, res, next) {
  const session = req.session;

  if (!session.jugador) {
    jugadores++;
    session.jugador = jugadores;
  }

  if (jugadores > 2) {
    res.status(404);
  }

  res.render("index", { title: "Juego de Hundir la flota", jugadores });
});

router.post("/cargarBarcos", function(req, res, next) {
  console.log(req.body);

  for (var i = 0; i < 10; i++) {
    array_Tablero_Ships.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    array_Tablero_Tiradas.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  }

  var pepe = Object.keys(req.body);
  var pepe2 = Object.values(req.body);

  console.log(array_Tablero_Tiradas);
  console.log(array_Tablero_Ships);
  console.log(pepe);
  console.log(pepe2);

  for (var i = 0; i < nombres.length; i++) {
    var indice = pepe.indexOf(nombres[i]);
    var temporal = pepe2[indice];
    if (!Array.isArray(temporal)) {
      temporal = [temporal];
    }
    //temporal=pepe2[indice];
    //console.log(temporal);

    temporal.unshift(nombres[i]);
    array_Ships.push(temporal);
  }

  for (var i = 0; i < array_Ships.length; i++) {
    for (var j = 1; j < array_Ships[i].length; j++) {
      var splitPosiciones = array_Ships[i][j].split("_");
      console.log("i: " + i + " j: " + j + " " + splitPosiciones);
      array_Tablero_Ships[splitPosiciones[0]][splitPosiciones[1]] = 1;
    }
  }

  console.log(array_Ships);
  console.log(array_Tablero_Ships);
  res.redirect("/pantalla_juego");
});

router.get("/pantalla_juego", function(req, res, next) {
  res.render("pantalla_juego", { title: "Juego de Hundir la flota",array_Tablero_Ships});

});

router.post("/resolverTurno", function(req, res, next) {

});

module.exports = router;
