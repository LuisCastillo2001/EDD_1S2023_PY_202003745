
import {desencriptacion, encriptacion,sha256} from './Encriptacion.js'


let bloque_obtenido = JSON.parse(localStorage.getItem("bloque"))


class nodoBloque {
    constructor(valor) {
      this.valor = valor;
      this.siguiente = null;
      this.anterior = null;
    }
  }
  
  class Bloque {
    constructor() {
      this.inicio = null;
      this.bloques = 0;
    }
  
    insertarAlFinal(valor) {
      const nuevoNodo = new nodoBloque(valor);
  
      if (!this.inicio) {
        this.inicio = nuevoNodo;
      } else {
        let nodoActual = this.inicio;
        while (nodoActual.siguiente) {
          nodoActual = nodoActual.siguiente;
        }
        nodoActual.siguiente = nuevoNodo;
        nuevoNodo.anterior = nodoActual;
      }
  
      this.bloques++;
    }
  }


const bloque = new Bloque()
let bloque_actual





/** REPORTES */

const btnReporte = document.getElementById("reporte")
btnReporte.addEventListener("click", reporte)

function reporte(){
    bloque_actual = bloque.inicio
    if(bloque_actual != null){
        let cadena = "Index: " + bloque_actual.valor['index']
        cadena += "\nTimeStamp: " + bloque_actual.valor['timestamp']
        cadena += "\nEmisor: " + bloque_actual.valor['transmitter']
        cadena += "\nReceptor: " + bloque_actual.valor['receiver']
        cadena += "\nMensaje: " + bloque_actual.valor['message']
        cadena += "\nPreviousHash: " + bloque_actual.valor['previoushash']
        cadena += "\nHash: " + bloque_actual.valor['hash']
        document.getElementById("reporte-bloques").value = cadena
        mostrar_Mensaje_descriptado()
    }
}

const btnReporte1 = document.getElementById("siguiente-bloque")
btnReporte1.addEventListener("click", reporte_siguente)

function reporte_siguente(){
    if(bloque_actual.siguiente != null){
        bloque_actual = bloque_actual.siguiente
        let cadena = "Index: " + bloque_actual.valor['index']
        cadena += "\nTimeStamp: " + bloque_actual.valor['timestamp']
        cadena += "\nEmisor: " + bloque_actual.valor['transmitter']
        cadena += "\nReceptor: " + bloque_actual.valor['receiver']
        cadena += "\nMensaje: " + bloque_actual.valor['message']
        cadena += "\nPreviousHash: " + bloque_actual.valor['previoushash']
        cadena += "\nHash: " + bloque_actual.valor['hash']
        document.getElementById("reporte-bloques").value = cadena
        mostrar_Mensaje_descriptado()
    }
}

const btnReporte2 = document.getElementById("anterior-bloque")
btnReporte2.addEventListener("click", reporte_anterior)

function reporte_anterior(){
    if(bloque_actual.anterior != null){
        bloque_actual = bloque_actual.anterior
        let cadena = "Index: " + bloque_actual.valor['index']
        cadena += "\nTimeStamp: " + bloque_actual.valor['timestamp']
        cadena += "\nEmisor: " + bloque_actual.valor['transmitter']
        cadena += "\nReceptor: " + bloque_actual.valor['receiver']
        cadena += "\nMensaje: " + bloque_actual.valor['message']
        cadena += "\nPreviousHash: " + bloque_actual.valor['previoushash']
        cadena += "\nHash: " + bloque_actual.valor['hash']
        document.getElementById("reporte-bloques").value = cadena
        mostrar_Mensaje_descriptado()
    }
}

async function mostrar_Mensaje_descriptado(){ 
    /** if carnet ==  bloque_actual.valor['receiver'] y  bloque_actual.valor['trasmitter'] == emisor
     * mostrar mensaje
     * bloque_actual = abloque_actual.siguiente
     */
    let cadena =  await desencriptacion(bloque_actual.valor['message'])
    document.getElementById("reporte-mensajes").value = cadena
}


if (bloque_obtenido !== null){
    
    let aux = bloque_obtenido.inicio

    while (aux){
        console.log("ds")
        console.log(aux.valor)
        bloque.insertarAlFinal(aux.valor)
        aux = aux.siguiente
    }
    console.log(bloque)
}


const btnReporters = document.getElementById("reportes")
btnReporters.onclick = function reportes(){
    let url = 'https://quickchart.io/graphviz?graph=';
    let body = cadena_reportes()
    
   
    document.getElementById("bloque").src = url+body

}


function cadena_reportes(){
    let bloque_actual = bloque.inicio
    let cadena = "digraph ListaEnlazad"+" {"+
        "node [shape=rectangle, style=filled, fontsize=12];"
        +"edge [ fontsize=10];\n"

    let contador = 1
    while (bloque_actual){
        console.log(bloque_actual)
        cadena += "nodo"+contador+"["+`label ="`+"TimeStamp: " + bloque_actual.valor['timestamp']
     
        cadena += "\\nEmisor: " + bloque_actual.valor['transmitter']
        cadena += "\\nReceptor: " + bloque_actual.valor['receiver']
        cadena += "\\nMensaje: " + bloque_actual.valor['message']
        cadena += "\\nPreviousHash: " + bloque_actual.valor['previoushash']
        cadena += "\\nHash: " + bloque_actual.valor['hash']
        cadena += `"`+"];\n"
        contador+= 1
        bloque_actual = bloque_actual.siguiente
    } 

    console.log(contador)
    let j = 1
    for (var i=1; i < contador; i++){
        j = i + 1
        cadena += "nodo" +i+"->" +"nodo"+j +"\n"+";"
    }

    cadena += "}"
    
    
    return cadena
        

}