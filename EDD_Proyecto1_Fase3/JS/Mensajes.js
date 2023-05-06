
import {desencriptacion, encriptacion,sha256} from './Encriptacion.js'
let bloque_obtenido = JSON.parse(localStorage.getItem("bloque"))

let emisor = JSON.parse(localStorage.getItem('usuario_t'))
class nodoBloque{
    constructor(index, fecha, emisor, receptor, mensaje, previousHash, hash){
        this.valor = {
            'index' : index,
            'timestamp': fecha,
            'transmitter': emisor,
            'receiver': receptor,
            'message': mensaje,
            'previoushash': previousHash,
            'hash': hash
        }
        this.siguiente = null
        this.anterior = null
    }
}

class Bloque{
    constructor(){
        this.inicio = null
        this.bloques_creados = 0
    }
    
    async insertarBloque(fecha, emisor, receptor, mensaje){
        
        if(this.inicio === null){
            let cadena = this.bloques_creados + fecha + emisor + receptor + mensaje
            let hash = await this.sha256(cadena)
            let mensajeEncriptado = await encriptacion(mensaje)
            const nuevoBloque = new nodoBloque(this.bloques_creados, fecha,emisor, receptor, mensajeEncriptado, '0000', hash)
            this.inicio = nuevoBloque
            this.bloques_creados++
        }else{
            let cadena = this.bloques_creados + fecha + emisor + receptor + mensaje
            let hash = await this.sha256(cadena)
            let mensajeEncriptado = await encriptacion(mensaje)
            let aux = this.inicio
            while(aux.siguiente){
                aux = aux.siguiente
            }
            const nuevoBloque = new nodoBloque(this.bloques_creados, fecha,emisor, receptor, mensajeEncriptado, aux.valor['hash'], hash)
            
            aux.siguiente = nuevoBloque
            this.bloques_creados++
        }

        mostrar_bloque()

        
    }

    

    async sha256(mensaje){
        let cadenaFinal
        const enconder =  new TextEncoder();
        const mensajeCodificado = enconder.encode(mensaje)
        await crypto.subtle.digest("SHA-256", mensajeCodificado)
        .then(result => { // 100 -> 6a 
            const hashArray =  Array.from(new Uint8Array(result))
            const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
            cadenaFinal = hashHex
        })
        .catch(error => console.log(error))
        return cadenaFinal
    }

    rehacer(inicio, valor){
        this.inicio = inicio
        this.bloques_creados = valor
    }

    async  mostrar_mensajes(numero){
        
        let emisor_mensaje = emisor.carnet
        let receptor_mensaje = document.getElementById("receptor").value
        
        let aux = this.inicio
        let contador = 0
        
        
       
        while(aux){
            
            
            if (emisor_mensaje == aux.valor["transmitter"] && receptor_mensaje == aux.valor["receiver"]){
                let mensaje = await desencriptacion(aux.valor["message"])
                document.getElementById("chat-container").innerHTML+= '<div class="message sent">'+mensaje+"</div>"
                contador+=1
            }
            
            if (emisor_mensaje == aux.valor["receiver"] && receptor_mensaje == aux.valor["transmitter"]){
                let mensaje = await desencriptacion(aux.valor["message"])
                document.getElementById("chat-container").innerHTML+= '<div class="message received">'+mensaje+"</div>"
                contador+=1
            }
            
            aux = aux.siguiente

        }
        
    
        if (contador == 0){
            window.alert("No hay mensajes con este usuario, inicie una conversación nueva")

            document.getElementById("chat-container").innerHTML ='<div class="mensaje">' +
            '<p>Este chat está cifrado de extremo a extremo.</p>' +
            '</div>';
        }
    }


}

const bloque = new Bloque()
let bloque_actual

function fechaActual(){
    let cadena = ''
    const fechaActual = new Date();
    cadena += fechaActual.getDate() < 10 ? ("0"+fechaActual.getDate()+"-") : (fechaActual.getDate()+"-")
    cadena += fechaActual.getMonth() < 10 ? ("0"+(fechaActual.getMonth()+1)+"-") : (fechaActual.getMonth()+"-")
    cadena += fechaActual.getFullYear() + "::"
    cadena += fechaActual.getHours() < 10 ? ("0"+fechaActual.getHours()+":") : (fechaActual.getHours()+":")
    cadena += fechaActual.getMinutes() < 10 ? ("0"+fechaActual.getMinutes()+":") : (fechaActual.getMinutes()+":")
    cadena += fechaActual.getSeconds() < 10 ? ("0"+fechaActual.getSeconds()) : (fechaActual.getSeconds())
    return cadena

}

const btnEnviar = document.getElementById("enviar")
btnEnviar.addEventListener("click", enviarMensaje)

function enviarMensaje(){
    let emisor_mensaje = emisor.carnet
    
    let receptor_mensaje = parseInt(document.getElementById("receptor").value)
    let x = buscarHash(receptor_mensaje)

    if (x == 2){
        window.alert("El mensaje no puede ser enviado debido a que el usuario no existe en el sistema")
        return
    }
    
    let mensaje_final = document.getElementById("mensaje").value
    bloque.insertarBloque(fechaActual(),emisor_mensaje,receptor_mensaje,mensaje_final)
    document.getElementById("chat-container").innerHTML=""
    
    window.alert("Mensaje enviado con éxito\nPara ver el nuevo chat haga click en el boton seleccionar y ver")
    
    
    

  
}


const btnbuscar = document.getElementById("buscar")
btnbuscar.addEventListener("click", mostrarmsj)

function mostrarmsj(){
    let receptor_mensaje = parseInt(document.getElementById("receptor").value)
    let x = buscarHash(receptor_mensaje)
    if (x == 2){
        window.alert("Este usuario no esta registrado en el sistema")
        return
    }
    document.getElementById("chat-container").innerHTML=""
    bloque.mostrar_mensajes(2)
}

function mostrar_bloque(){
    
    localStorage.setItem("bloque",JSON.stringify(bloque))
}




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



async function mostrar_Mensaje_descriptado(){ 
    
    
        console.log(bloque.inicio.valor["message"])
        
        let cadena = await desencriptacion(bloque.inicio.valor["message"]);
        
        console.log("Mensaje desencriptado: ")
        console.log(cadena)
        return cadena
   
}

if (localStorage.getItem("bloque")== null){

    window.alert("No se ha enviado ningún mensaje")
}else{
    bloque.rehacer(bloque_obtenido.inicio,bloque_obtenido.bloques_creados)
        
    
}

const btnsalir = document.getElementById("salir")
btnsalir.addEventListener("click", probando)

function probando(){
    let x =mostrar_Mensaje_descriptado()
    console.log(x)
  
}

function buscarHash(carnet){
    
    let tabla = JSON.parse(localStorage.getItem("table"))
    console.log(tabla)
    let capacidad = tabla.capacidad
    tabla = tabla.tabla
    console.log(tabla)
    

    for (var i = 0; i < capacidad; i++){
        
        
        if (tabla[i] == null){
            continue
        }else{
            if (tabla[i].carnet == carnet){
                console.log(tabla[i].password)
                return 1
            }
        }
    } 
    return 2
    
}




