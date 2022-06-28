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

// // clases

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

// //variables

let nivel1 = new Nivel(niveles[0]);
let nivel2 = new Nivel(niveles[1]);
let jones = new Personaje(personajesArray[0]);
let marion = new Personaje(personajesArray[1]);

// let verificador =  false;

// //funciones

// const comenzarJuego = () =>{ //simula un contador de puntos al esquivar los enemigos
//     let verificador2 = true;
//     let contador = 0;
//     let saltar = prompt("Para comenzar el juego escriba: si");
//         while (saltar.toLowerCase() === "si") {
//             contador++;
//             if(Number(contador) === 5 && verificador === true){
//                 alert("Felicidades has superado Sendero Aventura");
//                 verificador2 = false;
//                 break;
//             }
//             alert("Se aproxima un enemigo");
//             saltar = prompt("Desea saltarlo? Escriba: Si / No");
//         }
//         if (saltar === "no") {
//             alert("Has perdido :(");
//         }else if (verificador2 === true) {
//             alert("Respuesta inválida");
//         }   
//         return contador;
// }

// const elegirNivel = (opcion) =>{ //selector de niveles
//     if (opcion === "1") {
//         verificador = true;
//         alert("Selccionaste el modo de juego número 1");
//         nivel1.mostrarNivel();
//         comenzarJuego();
//     }else if (opcion === "2") {
//         alert("Selccionaste el modo de juego número 2");
//         nivel2.mostrarNivel();
//         let puntos = comenzarJuego();
//         let nombreUsuario = prompt("Ingrese su nombre");
//         let usuarioNuevo = new Usuario(nombreUsuario, puntos);
//         puntajes.push(usuarioNuevo);
//         puntajes.sort((a,b) => {
//             if (a.puntos < b.puntos) {
//                 return 1;
//             }
//             if ((a.puntos > b.puntos)) {
//                 return -1;
//             }
//             return 0;
//         });
//         console.log(puntajes);
//         let puestoTop = puntajes.indexOf(usuarioNuevo) + 1;
//         if (Number(puestoTop)<= 5) {
//             alert(`Felicidades entraste al top 5, tu puesto es: ${puestoTop}`);
//         }else{
//             alert(`Que lastima, no clasificaste al top 5, tu puesto es: ${puestoTop}`);
//         }
//     }
// }


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

//boton de "jugar" (permite seleccionar un personaje, y luego el modo de juego);

botonJugar.onclick  = () =>{  
    divPersonajes.style.display = "flex";
    divPersonaje1.innerHTML = `<h2>${jones.nombre}</h2>
                               <img src="../imgs/personajePrincipal.png">`;
    divPersonaje2.innerHTML = `<h2>${marion.nombre}</h2>
                               <img src="../imgs/personajePrincipal.png">`;                 
}

divPersonaje1.onclick = () =>{
    modeladoCards();
}

divPersonaje2.onclick = () =>{
    modeladoCards();
    divPersonaje2.onclick = () =>{
        contenedor.innerHTML = `
        <div class="mapaJuego" style="width: 100%; height: 70%;">
            <img src="../imgs/jungla2.png" style="width: 100%; height: 100%">
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
    background-image: linear-gradient(to top, black, rgba(0, 0, 0, 0.300)) , url(../imgs/jungla4.png); 
    justify-content: center;
    align-items: center;
    height: 60vh;
    `
    divPersonaje2.innerHTML = `<h2>${nivel2.nombre}</h2>`;
    divPersonaje2.style.cssText = `
    background-image: linear-gradient(to top, black, rgba(0, 0, 0, 0.300)) , url(../imgs/jungla2.png); 
    justify-content: center;
    align-items: center;
    height: 60vh;
    `
}

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

