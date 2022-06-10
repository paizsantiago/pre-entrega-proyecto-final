//array con personajes

let personajes = [
    {nombre: "personaje1" , id:1},
    {nombre: "personaje2" , id:2}
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

    mostrarNivel(){
        alert(`${this.nombre}, Episodio: ${this.numNivel}`);
    }
}

//variables

let nivel1 = new Nivel(niveles[0]);
let nivel2 = new Nivel(niveles[1]);
let contador = 0;
let verificador =  false;

//funciones

const comenzarJuego = () =>{ //simula un contador de puntos al esquivar los enemigos
    let verificador2 = true;
    let saltar = prompt("Para comenzar el juego escriba: si");
        while (saltar.toLowerCase() === "si") {
            contador++;
            if(Number(contador) === 5 && verificador === true){
                alert("Felicidades has superado el nivel Aventura");
                verificador2 = false;
                break;
            }
            alert("Se aproxima un enemigo");
            saltar = prompt("Desea saltarlo? Escriba: Si / No");
        }
        if (saltar === "no") {
            alert("Has perdido :(");
        }else if (verificador2 === true) {
            alert("Respuesta inválida")
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
        alert(`Tu puntuacion final es: ${comenzarJuego()}`);
    }
}

const menu = () => {
    let opcion = prompt("Elija modo de juego, 1: Sendero Aventura / 2: Jungla Infinita");
    elegirNivel(opcion);
}

menu();