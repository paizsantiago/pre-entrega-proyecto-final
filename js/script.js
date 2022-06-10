//array con personajes

let personajes = [
    {nombre: "personaje1" , id:1},
    {nombre: "personaje2" , id:2}
];

let niveles = [
    {nombre: "nivel aventura"},
    {nombre: "nivel infinito"}
];


//variables

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

const elegirNivel = (opcion) =>{ // selector de niveles
    if (opcion === "1") {
        verificador = true;
        alert("Has elegido el nivel Aventura");
        comenzarJuego();
    }else if (opcion === "2") {
        alert("Has elegido el nivel Infinito");
        alert(`Tu puntuacion final es: ${comenzarJuego()}`);
    }
}

const menu = () => {
    let opcion = prompt("Elija modo de juego, 1: nivel Aventura / 2: nivel infinito");
    elegirNivel(opcion);
}

menu();