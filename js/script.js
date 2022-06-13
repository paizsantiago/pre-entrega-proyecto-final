//array con personajes / niveles / puntajes

let personajes = [
    {nombre: "personaje1" , id:1},
    {nombre: "personaje2" , id:2}
];

let niveles = [
    {nombre: "Sendero Aventura", numNivel: 1},
    {nombre: "Jungla Infinita", numNivel: 2}
];

let puntajes = [
    {nombre: "Santiago", puntos: 2500},
    {nombre: "Leonardo", puntos: 3000},
    {nombre: "Rafael", puntos: 1020},
    {nombre: "Miguelanguel", puntos: 1000},
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

class Usuario {
    constructor(nombre, puntos){
        this.nombre = nombre;
        this.puntos = puntos;
    }
}

//variables

let nivel1 = new Nivel(niveles[0]);
let nivel2 = new Nivel(niveles[1]);
let verificador =  false;

//funciones

const comenzarJuego = () =>{ //simula un contador de puntos al esquivar los enemigos
    let verificador2 = true;
    let contador = 0;
    let saltar = prompt("Para comenzar el juego escriba: si");
        while (saltar.toLowerCase() === "si") {
            contador++;
            if(Number(contador) === 5 && verificador === true){
                alert("Felicidades has superado Sendero Aventura");
                verificador2 = false;
                break;
            }
            alert("Se aproxima un enemigo");
            saltar = prompt("Desea saltarlo? Escriba: Si / No");
        }
        if (saltar === "no") {
            alert("Has perdido :(");
        }else if (verificador2 === true) {
            alert("Respuesta inválida");
        }   
        return contador;
}

const elegirNivel = (opcion) =>{ //selector de niveles
    if (opcion === "1") {
        verificador = true;
        alert("Selccionaste el modo de juego número 1");
        nivel1.mostrarNivel();
        comenzarJuego();
    }else if (opcion === "2") {
        alert("Selccionaste el modo de juego número 2");
        nivel2.mostrarNivel();
        let puntos = comenzarJuego();
        let nombreUsuario = prompt("Ingrese su nombre");
        let usuarioNuevo = new Usuario(nombreUsuario, puntos);
        puntajes.push(usuarioNuevo);
        puntajes.sort((a,b) => {
            if (a.puntos < b.puntos) {
                return 1;
            }
            if ((a.puntos > b.puntos)) {
                return -1;
            }
            return 0;
        });
        console.log(puntajes);
    }
}

const menu = () => {
    let opcion = prompt("Elija modo de juego, 1: Sendero Aventura / 2: Jungla Infinita");
    elegirNivel(opcion);
}

menu();