//array con personajes / niveles / puntajes

let personajesArray = [
    {nombre: "Jones" , id:1},
];

let niveles = [
    {nombre: "Sendero Aventura", numNivel: 1},
    {nombre: "Jungla Infinita", numNivel: 2}
];


// clases

class Nivel {
    constructor(nivel){
        this.nombre = nivel.nombre;
        this.numNivel = nivel.numNivel;
    }
}

class Personaje {
    constructor (personaje) {
        this.nombre = personaje.nombre;
        this.id = personaje.id;
    }

}

//VARIABLES

let nivel1 = new Nivel(niveles[0]);
let nivel2 = new Nivel(niveles[1]);
let jones = new Personaje(personajesArray[0]);
let valorInput;
let arrayPuntajes;

//VARIABLES DOM

const contenedor = document.querySelector('.contenedor');
const botonInstrucciones = document.querySelector('.botonInstrucciones');
const instrucciones = document.querySelector('.instrucciones');
const botonJugar = document.querySelector('.botonJugar');
const puntuaciones = document.querySelector('.puntuaciones');
const divPuntuaciones = document.querySelector('.topPuntuaciones');
const listaPuntajes = document.querySelector('.listaPuntajes');
const divPersonajes = document.querySelector('.personajesModos');
const divPersonaje1 = document.querySelector('.personajeModo1');
const divPersonaje2 = document.querySelector('.personajeModo2');
const loginBoton = document.querySelector('.loginBoton');
const inputNombre = document.querySelector('.inputNombre');
const botones = document.querySelector('.botones');


//PERMITE SELECCIONAR EL PERSONE Y MODO DE JUEGO

botonJugar.onclick  = () =>{  
    divPersonajes.style.display = "flex";
    divPersonaje2.style.display = "none";
    divPersonaje1.style.cursor = "pointer";
    divPersonaje1.innerHTML = `<h2>${jones.nombre}</h2>
                               <img src="imgs/personajePrincipal.png">`;             
}

divPersonaje1.onclick = () =>{
    modeladoCards();
}

//MUESTRA LAS INSTRUCCIONES

botonInstrucciones.onfocus = () =>{
    instrucciones.style.display = "flex";
}

botonInstrucciones.onblur = () =>{
    instrucciones.style.display = 'none';
}

//TOP PUNTUACIONES

puntuaciones.onfocus = () =>{
    rellenoPuntuaciones(); 
    divPuntuaciones.style.display = "flex";   
}

puntuaciones.onblur = () =>{
    divPuntuaciones.style.display = "none"; 
    listaPuntajes.innerHTML = ''; 
}

//PROPORCIONA ESTILOS A LOS DIVS DENTRO DEL HTML

let modeladoCards = () =>{
    divPersonaje1.innerHTML = `<h2>${nivel1.nombre}</h2>
    <h3>(Proximamente)</h3>
    `;
    divPersonaje1.style.cssText = `
    background-image: linear-gradient(to top, black, rgba(0, 0, 0, 0.300)) , url(imgs/jungla4.png); 
    justify-content: center;
    align-items: center;
    height: 60vh;
    `
    divPersonaje2.innerHTML = `<a href="juego/juego.html" class="tituloJuego"><h2>${nivel2.nombre}</h2></a>`;
    divPersonaje2.style.cssText = `
    background-image: linear-gradient(to top, black, rgba(0, 0, 0, 0.300)) , url(imgs/jungla2.png); 
    justify-content: center;
    align-items: center;
    height: 60vh;
    `
}

//COMPLETA EL TOP DE PUNTUACIONES

let rellenoPuntuaciones = () =>{   
    const localNombre = localStorage.getItem('nombreUsuario');
    const localPuntuacion = localStorage.getItem('puntuacionUsuario');
    // utilizo fetch para llamar al json donde se encuentran las mejores puntuaciones
    fetch("../json/puntajes.json")
    .then((respuesta)=>{
        return respuesta.json();
    }).then((resultadoArray) => {
        let contadorTOP = 0;
        const usuarioTop = {puntos: localPuntuacion, nombre: localNombre};
        listaPuntajes.innerHTML = "";
        const top5Puntuaciones = resultadoArray;
        top5Puntuaciones.push(usuarioTop);
            top5Puntuaciones.sort((a,b) => {
                if (a.puntos < b.puntos) {
                    return 1;
                }
                if ((a.puntos > b.puntos)) {
                    return -1;
                }
                return 0;
            });
        for (const usuario of top5Puntuaciones){
            contadorTOP++;
            const li = document.createElement("li");
                li.innerHTML = `<p>Nombre: ${usuario.nombre}, Puntaje: ${usuario.puntos}</p>`
                listaPuntajes.append(li);
            if (contadorTOP === 5) {
                break;
            }
        }
        const p = document.createElement("p");
        p.className = "ultimaPuntuacion";
        p.innerHTML = `<p>${localNombre} ;) , tu ultima puntuacion fue ${localPuntuacion}</p>`;
        listaPuntajes.append(p);
    })
    .catch((error) => {
        listaPuntajes.innerHTML = "Error"; 
    });
}

//VERIFICA EL INPUT DEL LOGIN

loginBoton.addEventListener('click', (e) => {
    e.preventDefault();
    const nombreUsuario = document.querySelector('#nombre');
    valorInput = nombreUsuario.value;
    localStorage.setItem('nombreUsuario', valorInput);
    if (valorInput === "") {
        Toastify({
            text: "Error, has ingresado un dato incorrecto",
            className: "info",
            duration: 1000,
            position: "center",
            style: {
              background: "linear-gradient(to right, rgb(245, 77, 77), rgb(245, 77, 77)",
              boxShadow: "none",
            }
          }).showToast();
    }else{
        Toastify({
            text: "Te has logueado con éxito",
            className: "info",
            duration: 1000,
            position:"center",
            style: {
              background: "linear-gradient(to right, #00b09b, #96c93d)",
              boxShadow: "none",
            }
          }).showToast();
          mostrarMenu();
    }
    
})

//VERIFICA SI EL USUARIO ES EL MISMO 

const checkUsuario = () =>{
    const nombreUsuario = localStorage.getItem('nombreUsuario');
    if(nombreUsuario){
        inputNombre.style.display = 'none';
        const div = document.createElement('div');
        div.className = "loginUsuario";
        div.innerHTML = `
        <p>Hola ${nombreUsuario}</p>
        <button class="newGame" onclick="mostrarInput()">Nuevo Juego</button>
        <button onclick="mostrarMenu()">Continuar</button>
        `;
        contenedor.appendChild(div);
    }
}

//MUESTRA Y ESCONDE ELEMENTOS

const mostrarMenu = () =>{
    const loginUsuario = document.querySelector('.loginUsuario');
    botones.style.display = 'flex';
    inputNombre.style.display = 'none';
    loginUsuario.style.display = 'none';
}

const mostrarInput = () =>{
    const loginUsuario = document.querySelector('.loginUsuario');
    localStorage.removeItem('nombreUsuario');
    localStorage.setItem('puntuacionUsuario', 0);
    inputNombre.style.display = 'flex';
    botones.style.display = 'none';
    loginUsuario.style.display = 'none';
}


window.onload = checkUsuario; //LLAMA A LA FUNCION AL CARGAR LA PESTAÑA