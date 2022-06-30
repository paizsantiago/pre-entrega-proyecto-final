//array con personajes / niveles / puntajes

let personajesArray = [
    {nombre: "Jones" , id:1},
    {nombre: "Marion" , id:2}
];

let niveles = [
    {nombre: "Sendero Aventura", numNivel: 1},
    {nombre: "Jungla Infinita", numNivel: 2}
];

let puntajes = [
    {nombre: "Santiago", puntos: 2500},
    {nombre: "Leonardo", puntos: 3000},
    {nombre: "Rafael", puntos: 1020},
    {nombre: "Miguelangel", puntos: 1000},
    {nombre: "Donatello", puntos: 4000}
];

// clases

class Nivel {
    constructor(nivel){
        this.nombre = nivel.nombre;
        this.numNivel = nivel.numNivel;
    }

    mostrarNivel(){
        alert(`${this.nombre}, Episodio: ${this.numNivel}`);
    }
}

class Personaje {
    constructor (personaje) {
        this.nombre = personaje.nombre;
        this.id = personaje.id;
    }

}

// class Usuario {
//     constructor(nombre, puntos){
//         this.nombre = nombre;
//         this.puntos = puntos;
//     }
// }

//variables

let nivel1 = new Nivel(niveles[0]);
let nivel2 = new Nivel(niveles[1]);
let jones = new Personaje(personajesArray[0]);
let marion = new Personaje(personajesArray[1]);
let valorInput;

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


//boton de "jugar" (permite seleccionar un personaje, y luego el modo de juego);

botonJugar.onclick  = () =>{  
    divPersonajes.style.display = "flex";
    divPersonaje1.innerHTML = `<h2>${jones.nombre}</h2>
                               <img src="imgs/personajePrincipal.png">`;
    divPersonaje2.innerHTML = `<h2>${marion.nombre}</h2>
                               <img src="imgs/personajePrincipal.png">`;                 
}

divPersonaje1.onclick = () =>{
    modeladoCards();
}

divPersonaje2.onclick = () =>{
    modeladoCards();
    divPersonaje2.onclick = () =>{
        contenedor.innerHTML = `
        <div class="mapaJuego" style="width: 100%; height: 70%;">
            <img src="imgs/jungla2.png" style="width: 100%; height: 100%">
        </div>
        <div class="panel" style="width: 100%; height: 30%; background-color: whitesmoke">
        </div>
        `;
        contenedor.style.height = "100vh";
    }
}

//boton de instrucciones (muestra las mismas)

botonInstrucciones.onfocus = () =>{
    instrucciones.style.display = "flex";
}

botonInstrucciones.onblur = () =>{
    instrucciones.style.display = 'none';
}

// puntuaciones

puntuaciones.onfocus = () =>{
    rellenoPuntuaciones(); 
    divPuntuaciones.style.display = "flex";   
}

puntuaciones.onblur = () =>{
    divPuntuaciones.style.display = "none"; 
    listaPuntajes.innerHTML = ''; 
}

//funcion que le da los estilos a los divs dentro del html

let modeladoCards = () =>{
    divPersonaje1.innerHTML = `<h2>${nivel1.nombre}</h2>`;
    divPersonaje1.style.cssText = `
    background-image: linear-gradient(to top, black, rgba(0, 0, 0, 0.300)) , url(imgs/jungla4.png); 
    justify-content: center;
    align-items: center;
    height: 60vh;
    `
    divPersonaje2.innerHTML = `<h2>${nivel2.nombre}</h2>`;
    divPersonaje2.style.cssText = `
    background-image: linear-gradient(to top, black, rgba(0, 0, 0, 0.300)) , url(imgs/jungla2.png); 
    justify-content: center;
    align-items: center;
    height: 60vh;
    `
}

// completa la tabla de puntuaciones

let rellenoPuntuaciones = () =>{
    puntajes.sort((a,b) => {
        if (a.puntos < b.puntos) {
            return 1;
        }
        if ((a.puntos > b.puntos)) {
            return -1;
        }
        return 0;
    });
    for (const puntaje of puntajes){
        const li = document.createElement("li");
        li.innerHTML = `<p>Nombre: ${puntaje.nombre}, Puntaje: ${puntaje.puntos}</p>`
        listaPuntajes.append(li);
    }
}

// muestra el menu luego de ingresar el nombre del usuario

loginBoton.addEventListener('click', (e) => {
    e.preventDefault();
    const nombreUsuario = document.querySelector('#nombre');
    valorInput = nombreUsuario.value;
    localStorage.setItem('nombreUsuario', valorInput);
    alert("Has logueado con éxito");
    mostrarMenu();
})

// verifica si es el mismo usuario o uno distinto

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

// funciones para esconder y mostrar los elementos

const mostrarMenu = () =>{
    const loginUsuario = document.querySelector('.loginUsuario');
    botones.style.display = 'flex';
    inputNombre.style.display = 'none';
    loginUsuario.style.display = 'none';
}

const mostrarInput = () =>{
    const loginUsuario = document.querySelector('.loginUsuario');
    localStorage.removeItem('nombreUsuario');
    inputNombre.style.display = 'flex';
    botones.style.display = 'none';
    loginUsuario.style.display = 'none';
}

//cuando carga llama a la funcion checkUsuario

window.onload = checkUsuario;