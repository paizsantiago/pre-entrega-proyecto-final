
//EVENTO PARA SALTAR (CON ESPACIO)

document.addEventListener('keydown', function(e){
  if (e.keyCode === 32) { 
      if (personaje.y === 415 && !nivel.muerto){
        saltar();
        contadorSaltos++;
      }
  }
});

//VARIABLES

let contadorSaltos = 0;
let ancho = 1920;
let alto = 600;
let imgPersonaje, imgFondo, imgEnemigo;
let personaje = {y: 415, vy:0, gravedad:2, salto:28, vymax:9, jumping: false};
let nivel  = {velocidad:9, puntuacion:0, muerto:false};
let enemigo = {x:ancho + 100, y:400};
let fondo = {x:0, y:0};
let variable = 6;
let tiempo = 0;
let indiceX = 0;
let indiceY = 0; 
let contador = 0;
const botonReiniciar = document.querySelector('.reiniciar');
const info = document.querySelector('.info');
const canvas = document.querySelector('#canvas');
const contexto = canvas.getContext('2d');
const divPersonaje2 = document.querySelector('.personajeModo2');
const contenedorJuego = document.querySelector('.contenedorGeneral');
const tituloJunglaInfinita = document.querySelector('.junglaInfinita');

//FUNCIONES PARA DIBUJAR LOS ELEMENTOS SOBRE EL CANVAS

function dibujarEnemigo(){
  contexto.drawImage(imgEnemigo,0,0,2048,2048,enemigo.x, enemigo.y,250,250);
}

function dibujarPersonaje(){       
      if (!nivel.muerto) {
          if (indiceX === 0 && indiceY === 0 && contador === 8) {
            indiceX = 1;
        }else if(indiceX === 0 && indiceY === 1 && contador === 24){
            indiceX = 0;
            indiceY = 1;
        }else if(indiceX === 1 && indiceY === 0 && contador === 32){
          indiceX = 1;
          indiceY = 1;
        }else if(contador === 48){
          indiceX = 0;
          indiceY = 0;
          contador = 0;
        }
        contador++;     
      }
      contexto.drawImage(imgPersonaje,indiceX*2048,indiceY*2048,2048,2048,50,  personaje.y,250,250);
}

function dibujarFondo(){
  contexto.clearRect(0,0,canvas.width,canvas.height);
  contexto.drawImage(imgFondo,tiempo,0);
  contexto.drawImage(imgFondo,tiempo-3840,0);
  if (!nivel.muerto) tiempo -= variable; 
  if (tiempo<0) tiempo = tiempo + 3840;	
}

// MOVIMIENTO TANTO DEL ENEMIGO COMO EL JUGADOR

function movimientoEnemigo (){
  if (enemigo.x < -100) {
      enemigo.x = ancho + 100;
      nivel.puntuacion++;
  }else{
      enemigo.x -= nivel.velocidad;
  }
}

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
  if(enemigo.x >= 50 && enemigo.x < 95){
    if (personaje.y === 415) {
      nivel.muerto = true;
      nivel.velocidad = 0;
    }
  }
  
}

function score(){
  dificultadNivel(nivel.puntuacion);
  contexto.font = "45px 'Press Start 2P', cursive";
  contexto.fillStyle = "#4e0a0a";
  if(nivel.muerto){
    contexto.fillText('GAME OVER', 750, 325);
    localStorage.setItem('puntuacionUsuario', nivel.puntuacion);
  }
}

function dificultadNivel(nivelpuntuacion) {
  switch (nivel.puntuacion) {
    case 5:
      variable = 8;
      nivel.velocidad = 11;
      break;
    case 10:
      variable = 10;
      nivel.velocidad = 14;
      break;
    case 15:
      variable = 11;
      nivel.velocidad = 18;
      break;
    case 20:
      variable = 13;
      nivel.velocidad = 20;
      break;
    case 30:
      variable = 15;
      nivel.velocidad = 25;
      break;  
    case 50:
      variable = 20;
      nivel.velocidad = 40;
      break;
    case 75:
      variable = 23;
      nivel.velocidad = 50;
      break;  
    default:
      break;
  }
}

//ACTUALIZA EL CANVAS EN CADA FRAME

const borrarCanvas = () =>{
  canvas.width = ancho;
  canvas.height = alto;
}

botonReiniciar.onclick = () =>{
  tiempo = 0;
  nivel.puntuacion = 0;
  nivel.velocidad = 9;
  nivel.muerto = false;
  enemigo.x = ancho + 100;
  contadorSaltos = 0;
}

function actualizarEstadisticas (){
  info.innerHTML = `<h1>PUNTUACION: ${nivel.puntuacion}</h1>
  <h2>VELOCIDAD DEL NIVEL: ${nivel.velocidad}</h2>
  <h3>SALTOS: ${contadorSaltos}</h3>
  `;
}  

//ANIMACION AL INICIAR EL JUEGO

const e = document.getElementById("junglaInfinita"); 
e.addEventListener("animationend", (ev) => {
  if (ev.type === "animationend") {
    e.style.display = "none";
  }
}, false);

// INICIALIZA CANVAS Y GUARDA LAS IMAGENES

const inicializar = () =>{
  canvas.width = ancho;
  canvas.height = alto;
  imgPersonaje = new Image();
  imgEnemigo = new Image();
  imgFondo = new Image();

  imgPersonaje.src = '../imgs/personajePrincipalCanvas.png';
  imgEnemigo.src = '../imgs/enemigo.png';
  imgFondo.src = '../imgs/fondo.png';
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
  actualizarEstadisticas();
}