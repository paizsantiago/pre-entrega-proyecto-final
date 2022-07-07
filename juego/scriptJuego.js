
//EVENTO PARA SALTAR (CON ESPACIO)

document.addEventListener('keydown', function(e){
  if (e.keyCode === 32) { 
      if (personaje.y === 415 && !nivel.muerto) saltar();
  }
});

//VARIABLES

let ancho = 1920;
let alto = 600;
let imgPersonaje, imgFondo, imgEnemigo;
let personaje = {y: 415, vy:0, gravedad:2, salto:28, vymax:9, jumping: false};
let nivel  = {velocidad:9, puntuacion:0, muerto:false};
let enemigo = {x:ancho + 100, y:400};
let fondo = {x:0, y:0};
let variable = 6;
let tiempo = 0;
const canvas = document.querySelector('#canvas');
const contexto = canvas.getContext('2d');

//FUNCIONES PARA DIBUJAR LOS ELEMENTOS SOBRE EL CANVAS

function dibujarEnemigo(){
  contexto.drawImage(imgEnemigo,0,0,2048,2048,enemigo.x, enemigo.y,250,250);
}

function dibujarPersonaje(){ 
  contexto.drawImage(imgPersonaje,0,0,2048,2048,50,personaje.y,250,250);
}

function dibujarFondo(){
  contexto.clearRect(0,0,canvas.width,canvas.height);
  contexto.drawImage(imgFondo,tiempo,0);
  contexto.drawImage(imgFondo,tiempo-3840,0);
  if (!nivel.muerto) tiempo -= variable; 
  if (tiempo<0) tiempo = tiempo + 3840;	
}

// MOVIMIENTO TANTO DEL ENEMIGO

function movimientoEnemigo (){
  if (enemigo.x < -100) {
      enemigo.x = ancho + 100;
      nivel.puntuacion++;
  }else{
      enemigo.x -= nivel.velocidad;
  }
}

// FUNCIONES RELACIONAS AL MOVIMIENTO DEL JUGADOR

function saltar(){
  personaje.jumping = true;
  personaje.vy = personaje.salto;
}

function gravedad(){
  if (personaje.jumping) {
      if (personaje.y - personaje.vy - personaje.gravedad > 400) {
          personaje.jumping = false;
          personaje.vy = 0;
          personaje.y = 415;
      }else{
          personaje.vy -= personaje.gravedad;
          personaje.y-= personaje.vy;
      }
  }
}

//FUNCIONES DE COLISION, Y PUNTAJE DEL USUARIO

function colision(){
  if(enemigo.x >= 50 && enemigo.x <=90){
    if (personaje.y >= enemigo.y) {
      nivel.muerto = true;
      nivel.velocidad = 0;
    }
  }
}

function score(){
  dificultadNivel(nivel.puntuacion);
  contexto.font = "50px impact";
  contexto.fillStyle = "#ffff";
  contexto.fillText(`${nivel.puntuacion}`,1700,100);
  if(nivel.muerto){
    contexto.fillText('GAME OVER', 800, 300);
  }
}

function dificultadNivel(nivelpuntuacion) {
  if (nivel.puntuacion >= 5) {
    variable = 8;
    nivel.velocidad = 11;
  } if (nivel.puntuacion >= 10) {
    variable = 10;
    nivel.velocidad = 14;
  } if (nivel.puntuacion >= 15) {
    variable = 11;
    nivel.velocidad = 18;
  } if (nivel.puntuacion >= 20) {
    variable = 13;
    nivel.velocidad = 20;
  } if (nivel.puntuacion >= 30) {
    variable = 15;
    nivel.velocidad = 25;
  } if (nivel.puntuacion >= 50) {
    variable = 20;
    nivel.velocidad = 40;
  } if (nivel.puntuacion >= 70) {
    variable = 25;
    nivel.velocidad = 60;
  }if (nivel.puntuacion >= 100) {
    variable = 30;
    nivel.velocidad = 75;
  }
  
}

//ACTUALIZA EL CANVAS EN CADA FRAME

const borrarCanvas = () =>{
  canvas.width = ancho;
  canvas.height = alto;
}

// INICIALIZA CANVAS Y GUARDA LAS IMAGENES

const inicializar = () =>{
  canvas.width = ancho;
  canvas.height = alto;
  imgPersonaje = new Image();
  imgEnemigo = new Image();
  imgFondo = new Image();

  imgPersonaje.src = '../imgs/personajePrincipal.png';
  imgEnemigo.src = '../imgs/enemigo.png';
  imgFondo.src = '../imgs/prueba.png';
}

//BUCLE PRINCIPAL

const fps = 50;

setInterval(function(){
  principal();
}, 1000/fps);

const principal = () =>{
  borrarCanvas();
  gravedad();
  colision();
  dibujarFondo();
  movimientoEnemigo();
  dibujarEnemigo();
  dibujarPersonaje();
  score();
}