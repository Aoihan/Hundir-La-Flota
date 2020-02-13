
var express = require("express");
var router = express.Router();
var contador=0;
var contador2=0;
var jugadores = 0;
var turno = 1;
var array_Tablero_Ships = [];
var array_Tablero_Ships_Player2 = [];
var array_Tablero_Tiradas = [];
var array_Tablero_Tiradas_Player2 = [];
var array_Ships = [];
var array_Ships_Player2 = [];
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
const { cargarArrayShips } = require('../funciones/funciones');
const { cargarArrayTableroShips } = require('../funciones/funciones');

/* GET home page. */
router.get("/", function(req, res, next) {
  const session = req.session;

  if (!session.jugador) {
    jugadores++;
    if (jugadores > 2) {
      res.status(404);
    }
    
    session.jugador = jugadores;

  }

  

  res.render("index", { title: "Juego de Hundir la flota", jugadores });
});

router.post("/cargarBarcos", function(req, res, next) {
  
  const session = req.session;
  for (var i = 0; i < 10; i++) {
   // if(session.jugador==1){
      array_Tablero_Ships.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
      array_Tablero_Tiradas.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
   // }else{
      array_Tablero_Ships_Player2.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
      array_Tablero_Tiradas_Player2.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
   // }
  }

  console.log('session.jugador: '+session.jugador);
  if(session.jugador == 1){
    array_Ships = cargarArrayShips(req.body,array_Ships);
    array_Tablero_Ships = cargarArrayTableroShips( array_Ships );
  }else{
    array_Ships_Player2 = cargarArrayShips(req.body,array_Ships_Player2);
    array_Tablero_Ships_Player2 = cargarArrayTableroShips( array_Ships_Player2 );
    //cargarShips(req.body,array_Ships_Player2,array_Tablero_Ships_Player2);
  }


  res.redirect("/pantalla_juego");
});

router.get("/pantalla_juego", function(req, res, next) {

  //console.log('ArrayTableroShips en el ROUTER');
  //console.log(array_Tablero_Ships);
  const session = req.session;
  var player= session.jugador;
  if(player == 1){
    res.render("pantalla_juego", { title: "Juego de Hundir la flota",array_Tablero_Ships, array_Tablero_Ships_Player2,player, turno, contador, contador2, meToca:(turno==1)});
  }else{
    res.render("pantalla_juego", { title: "Juego de Hundir la flota",array_Tablero_Ships, array_Tablero_Ships_Player2,player, turno, contador, contador2, meToca:(turno==2)});
  }

  

});

router.get("/resolverTurno", function(req, res, next) {
  const meToca = (turno == req.session.jugador);
  if (meToca) {
    res.status(200).json(true); //ok
  } else {
    res.status(400).json(false); //fallo (si no me toca)
  }
})

router.post("/resolverTurno", function(req, res, next) {
   const { fila, columna } = req.body;
   const session = req.session;
  var player= session.jugador;
  if(player == 1){
      var disparo = array_Tablero_Ships_Player2[fila][columna];
      
      if(disparo == 0){
        array_Tablero_Ships_Player2[fila][columna]=2
      }else if (disparo==1){
        array_Tablero_Ships_Player2[fila][columna]=3
        contador ++;
      }
   }else{
    var disparo = array_Tablero_Ships[fila][columna];
    
    if(disparo == 0){
      array_Tablero_Ships[fila][columna]=2
    }else if (disparo==1){
      array_Tablero_Ships[fila][columna]=3
      contador2 ++;
    }
   }

   if (turno == 1){
      turno=2;
   }else{
     turno =1;
   }
   function comprobarGanador(){
     return 0;
   }
   const ganador = comprobarGanador();
  
   if (ganador != 0) {
     res.render('winner', {ganador});
   } else {
     const meToca = (turno == session.jugador);
     console.log('metoca: ' + meToca + ' ganador: '+ganador+' turno: '+turno+' player: '+player);
     res.redirect('pantalla_juego');
   }

   
 


});

module.exports = router;
