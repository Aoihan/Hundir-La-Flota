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

function cargarArrayShips (request,arr){
    var pepe = Object.keys(request);
    var pepe2 = Object.values(request);

    //console.log(array_Tablero_Tiradas);
    //console.log(arr);
    //console.log(pepe);
    //console.log(pepe2);

    for (var i = 0; i < nombres.length; i++) {
        var indice = pepe.indexOf(nombres[i]);
        var temporal = pepe2[indice];
        if (!Array.isArray(temporal)) {
          temporal = [temporal];
        }
        temporal.unshift(nombres[i]);
        arr.push(temporal);
      }
    
        //console.log('arr');
        //console.log(arr);

      return arr;
}

function cargarArrayTableroShips( arrayShips ){
    var arrships=[];

    for( var i=0; i<10; i++){
        arrships.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    }

    for (var i = 0; i < arrayShips.length; i++) {
        for (var j = 1; j < arrayShips[i].length; j++) {
          var splitPosiciones = arrayShips[i][j].split("_");
          //console.log("i: " + i + " j: " + j + " - " + splitPosiciones);
          arrships[splitPosiciones[0]][splitPosiciones[1]] = 1;
        }
      }

      //console.log('arrships');
      //console.log(arrships);

    return arrships;
}

module.exports = {
    cargarArrayShips,
    cargarArrayTableroShips
}