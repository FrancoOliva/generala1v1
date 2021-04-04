  
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

var puntosJugador1 = "";
var puntosJugado2 = "";

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
      
      mainView.router.navigate('/anotador/');
    } else {
        
      app.dialog.alert('Completar nombres para continuar.', 'Importante');
    }

  });
  
})

// ****************************************************************************** FIN PÁGINA INDEX ******************************************************************************

// ****************************************************************************** INICIO PÁGINA ANOTADOR ******************************************************************************


$$(document).on('page:init', '.page[data-name="anotador"]', function (e) {
  
  console.log(e);
  console.log("Página anotador cargada!");

  // NOMBRES DE LOS JUGADORES
  $$('#cJugador1').text(jugador1);
  $$('#cJugador2').text(jugador2);

  var columnaJugador = "";

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

  // BOTÓN VOLVER
  $$('#btnVolver').on('click', function(){

    app.dialog.alert("Puntos y nombres reiniciados.", "Atención");
    mainView.router.navigate('/index/');
    
  });

  // BOTÓN INFO
  $$('#btnInformacion').on('click', function(){
    console.log("Cargar reglas del juego.");
    mainView.router.navigate('/reglas-del-juego/');
  });
  
  
}) // page init anotador

// FUNCIONES

function capturarID(id){
  var id = id;
  console.log(id);
}

// ****************************************************************************** FIN PÁGINA ANOTADOR ******************************************************************************

$$(document).on('page:init', '.page[data-name="reglas-del-juego"]', function (e) {
  
  console.log(e);
  console.log("Página Reglas del juego cargada!");

})