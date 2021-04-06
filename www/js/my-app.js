  
// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

var app = new Framework7({
    // App root element
    root: '#app',
    // App Name
    name: 'Anotador Generala',
    // App id
    id: 'com.myapp.test',
    // Enable swipe panel
    panel: {
      swipe: 'left',
    },
    // Add default routes
    routes: [
      { path: '/anotador/', url: 'anotador.html', },
      { path: '/index/', url: 'index.html', }, 
      { path: '/reglas-del-juego/', url: 'reglas-del-juego.html', }
    ]
    // ... other parameters
  });

var mainView = app.views.create('.view-main');

// VARIABLES GLOBALES
var jugador1 = "";
var jugador2 = "";

var columnaJugador = "";

var puntosJugador1 = 0;
var puntosJugador2 = 0;

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    console.log("Device is ready!");    

});

// Option 1. Using one 'page:init' handler for all pages
$$(document).on('page:init', function (e) {
    // Do something here when page loaded and initialized
    console.log(e);
})



// ****************************************************************************** INICIO PÁGINA INDEX ******************************************************************************

$$(document).on('page:init', '.page[data-name="index"]', function (e) {
  
  console.log(e);
  console.log("Página de inicio cargada!");

  // BOTÓN JUGAR
  $$('#btnJugar').on('click', function(){
    console.log("Hice click en JUGAR!");
    
    // GUARDAMOS NOMBRES DE LOS JUGADORES
    jugador1 = $$('#nJugador1').val();
    jugador2 = $$('#nJugador2').val();

    // SI NO SE COMPLETAN LOS NOMBRES --> ALERTA/AVISO
    if(jugador1 != "" && jugador2 != ""){
      console.log("Cargar la siguiente página");
      console.log("Nombre del jugador 1: " + jugador1);
      console.log("Nombre del jugador 2: " + jugador2);

      if(jugador1.length <= 8){
        if(jugador2.length <= 8){

          // si los nombres respetan los 8 dígitos cargamos la página anotador
          mainView.router.navigate('/anotador/');

        } else {
          // modificamos el value para dar aviso al jugador 2
          $$('#nJugador2').val("Máximo 8 letras");
        }
      } else {
        // modificamos el value para dar aviso al jugador 1 
        $$('#nJugador1').val("Máximo 8 letras");
      }
      
      
    } else {
        
      app.dialog.alert('Completar nombres para continuar.', 'Importante');
    }

  });
  
})

// ****************************************************************************** INICIO PÁGINA ANOTADOR ******************************************************************************


$$(document).on('page:init', '.page[data-name="anotador"]', function (e) {
  
  console.log(e);
  console.log("Página anotador cargada!");

  // NOMBRES DE LOS JUGADORES
  $$('#cJugador1').text(jugador1);
  $$('#cJugador2').text(jugador2);

  // INICIAMOS LOS PUNTAJES DE LOS JUGADORES EN 0
  $$('#pJugador1').html(0);
  $$('#pJugador2').html(0);

  // CAPTURAMOS ID Y GENERAMOS EL VALOR CORRESPONDIENTE EN EL POPUP
  $$('.dados').on('click', function(){
    var id = this.id;
    columnaJugador = id;

    var dado = parseInt(id[4]); // tomamos cierto valor del ID y lo parseamos a un valor entero
    console.log(dado);

    // GENERAMOS VALORES EN EL POPUP SEGÚN EL DADO DONDE SE HIZO CLICK
    for(var i= 1; i <= 6; i++){
      $$('#valor' + i).text((i * dado));
    }    

  })

  // MODIFICAMOS COLUMNA DEL JUGADOR AGREGANDO UN VALOR AL CERRAR EL POPUP
  $$('.puntaje').on('click', function(){
    console.log('Cerraste un popup!');
    console.log(columnaJugador);
    
    $$('#'+columnaJugador).html(this.innerHTML);     

    actualizarPuntaje();

  });


  $$('#jServida').on('click', mostrarPuntajeServida);

  $$('#jnServida').on('click', mostrarPuntajeNoServida);

  $$('#tachar').on('click', tacharCelda);

  // REINICIAR PUNTOS
  $$('#reiniciarPuntos').on('click', function(){
    // reset de puntos
    for(var i = 1; i <= 10; i++){
      $$('#j1_d' + i).html("-");
      $$('#j2_d' + i).html("-");
    }
    puntosJugador1 = 0;
    puntosJugador2 = 0;
    $$('#pJugador1').html(puntosJugador1);
    $$('#pJugador2').html(puntosJugador2);
    console.log('Puntos reiniciados.');
  });
  
  // BOTÓN VOLVER
  $$('#btnVolver').on('click', function(){    
    mainView.router.navigate('/index/');    
  });

  // BOTÓN INFO
  $$('#btnInformacion').on('click', function(){
    console.log("Cargar reglas del juego.");    

    mainView.router.navigate('/reglas-del-juego/');
  });


  
  
}) // page init anotador

// ****************************************************************************** FUNCIONES ******************************************************************************

function actualizarPuntaje(){
  console.log("Actualizando puntaje");
  var total1 = 0;
  var total2 = 0;
  
  
  // PARSEAMOS LOS VALORES DE CADA CELDA Y SUMAMOS SUS VALORES
  for(var i = 1; i <= 10; i++){
    
    // columna j1
    if($$('#j1_d' + i).html() == "-"){
      total1 += 0;

    } else if($$('#j1_d' + i).html() == "X"){
      total1 += 0;
    } else {
      total1 += parseInt($$('#j1_d' + i).html()); 
    }

    // columna j2
    if($$('#j2_d' + i).html() == "-"){
      total2 += 0;

    } else if($$('#j2_d' + i).html() == "X"){
      total2 += 0;
    } else {
      total2 += parseInt($$('#j2_d' + i).html()); 
    }

  }

  puntosJugador1 = total1;
  puntosJugador2 = total2;
  console.log("Puntos jugador 1: " + puntosJugador1);
  console.log("Puntos jugador 2: " + puntosJugador2);

  //MODIFICAMOS PUNTAJE DE LOS JUGADORES
  $$('#pJugador1').html(puntosJugador1);
  $$('#pJugador2').html(puntosJugador2);


}

function mostrarPuntajeNoServida(){
  switch(columnaJugador){
  case "j1_d7" :
  case "j2_d7" :{
    
    $$('#' + columnaJugador).html("20"); // escalera
    break;
  }
  case "j1_d8" :
  case "j2_d8" : {
    $$('#' + columnaJugador).html("30"); // full
    break;
  }

  case "j1_d9" : 
  case "j2_d9" : {
    $$('#' + columnaJugador).html("40"); // póker
    break;
  }

  case "j1_d10" :
  case "j2_d10" : {
    $$('#' + columnaJugador).html("50"); // generala 
    break;
  }


  }

  actualizarPuntaje();
}

function tacharCelda(){
  console.log("tachar celda");
  $$('#'+columnaJugador).text("X");

  actualizarPuntaje();
}

function mostrarPuntajeServida(){
   
  switch(columnaJugador){
    case "j1_d7" :
    case "j2_d7" :{
      $$('#' + columnaJugador).html("25"); // escalera
      break;
    }
    case "j1_d8" :
    case "j2_d8" :{
      $$('#' + columnaJugador).html("35"); // full
      break;
    }
    case "j1_d9" :
    case "j2_d9" :{
      $$('#' + columnaJugador).html("45"); // póker
      break;
    }
    case "j1_d10" :
    case "j2_d10" : {
      $$('#' + columnaJugador).html("Ganaste"); // póker
      break;
    }

  }
   

}

// ****************************************************************************** PÁGINA REGLAS DE JUEGO ******************************************************************************

$$(document).on('page:init', '.page[data-name="reglas-del-juego"]', function (e) {
  
  console.log(e);
  console.log("Página Reglas del juego cargada!");

})