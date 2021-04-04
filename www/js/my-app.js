  
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


  // COLUMNA JUGADOR 1 o JUGADOR 2 - DADOS DEL 1 AL 6
  // CAPTURAMOS ID Y GENERAMOS EL VALOR CORRESPONDIENTE EN EL POPUP
  $$('.dados').on('click', function(){
    var id = this.id;
    columnaJugador = id;

    var dado = parseInt(id.replace('j1_d','')); // tomamos cierto valor del ID y lo parseamos a un valor entero
    console.log(dado);

    // GENERAMOS VALORES EN EL POPUP SEGÚN EL DADO DONDE SE HIZO CLICK
    for(var i= 1; i <= 6; i++){
      $$('#valor' + i).text((i * dado));
    }    

  })

  // MODIFICAMOS COLUMNA DEL JUGADOR AGREGANDO UN VALOR AL CERRAR EL POPUP
  $$('.popup-close').on('click', function(){
    console.log('Cerraste un popup!');
    console.log(columnaJugador);

    $$('#'+columnaJugador).html(this.innerHTML);
    
    actualizarPuntaje();

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
  
  
  // PARSEAMOS LOS VALORES DE CADA CELDA Y SUMAMOS SUS VALORES
  for(var i = 1; i <= 6; i++){
    
    if($$('#j1_d' + i).html() != "-"){
      total1 += parseInt($$('#j1_d' + i).html());
    }

  }

  puntosJugador1 = total1;
  console.log("Puntos jugador 1: " + puntosJugador1);

  //MODIFICAMOS PUNTAJE DE LOS JUGADORES
  $$('#pJugador1').html(puntosJugador1);


}

// ****************************************************************************** PÁGINA REGLAS DE JUEGO ******************************************************************************

$$(document).on('page:init', '.page[data-name="reglas-del-juego"]', function (e) {
  
  console.log(e);
  console.log("Página Reglas del juego cargada!");

})