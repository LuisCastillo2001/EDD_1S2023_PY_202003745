import {desencriptacion, encriptacion,sha256} from './Encriptacion.js'


let arbol = JSON.parse(localStorage.getItem("arbol"))

let bloque = JSON.parse(localStorage.getItem("bloque"))



let tabla1 = JSON.parse(localStorage.getItem("table"))





class nodoHash{
  constructor(carnet, usuario, password,carpetas,compartidos){
      this.carnet = carnet
      this.usuario = usuario
      this.password = password
      this.compartidos = compartidos
      this.carpetas = carpetas
  }
}

class TablaHash{
  constructor(){
      this.tabla = new Array(7)
      this.capacidad = 7
      this.utilizacion = 0
  }

  insertar(carnet, usuario, password,carpetas,compartidos){
      let indice = this.calculoIndice(carnet)
      const nuevoNodo = new nodoHash(carnet, usuario, password,carpetas,compartidos)
    
       
      if(indice < this.capacidad){
          try{
              if(this.tabla[indice] == null){
                
                  this.tabla[indice] = nuevoNodo
                  this.utilizacion++
                  this.capacidad_tabla()
              }else{
                  let contador = 1
                  indice = this.RecalculoIndice(carnet,contador)
                  while(this.tabla[indice] != null){
                      contador++
                      indice = this.RecalculoIndice(carnet, contador)
                  }
                  this.tabla[indice] = nuevoNodo
                  this.utilizacion++
                  this.capacidad_tabla()
              }
          }catch(err){
              console.log("Hubo un error en insercion")
          }
      }
  }

  calculoIndice(carnet){ 
      let carnet_cadena = carnet.toString()
      let divisor = 0
      for(let i = 0; i < carnet_cadena.length; i++){
          divisor = divisor + carnet_cadena.charCodeAt(i)
      }
      let indice_final = divisor % this.capacidad
      return indice_final
  }

  capacidad_tabla(){
      let aux_utilizacion = this.capacidad*0.75
      if(this.utilizacion > aux_utilizacion){
          this.capacidad = this.nueva_capacidad()
          this.utilizacion = 0
          this.ReInsertar()
      } 
  }

  nueva_capacidad(){ //Sustituir por un algoritmo del siguiente numero primo
      let numero = this.capacidad + 1;
      while (!this.isPrime(numero)) {
        numero++;
      }
      return numero;
  }

  ReInsertar(){
      const auxiliar_tabla = this.tabla
      this.tabla = new Array(this.capacidad)
      auxiliar_tabla.forEach((alumno) => {
          this.insertar(alumno.carnet, alumno.usuario, alumno.password,alumno.carpetas,alumno.compartidos)
      })
  }

  RecalculoIndice(carnet, intento){
      let nuevo_indice = this.calculoIndice(carnet) + intento*intento
      let nuevo = this.nuevo_Indice(nuevo_indice)
      return nuevo
  }

  nuevo_Indice(numero){
      let nueva_posicion = 0
      if(numero < this.capacidad){
          nueva_posicion = numero
      }else{
          nueva_posicion = numero - this.capacidad
          nueva_posicion = this.nuevo_Indice(nueva_posicion)
      }
      return nueva_posicion
  }

  busquedaUsuario(carnet){
      let indice = this.calculoIndice(carnet)
      if(indice < this.capacidad){
          try{
              if(this.tabla[indice] == null){
                  alert("Bienvenido " + this.tabla[indice].usuario)
              }else if(this.tabla[indice] != null && this.tabla[indice].carnet == carnet){
                  alert("Bienvenido " + this.tabla[indice].usuario)
              }else{
                  let contador = 1
                  indice = this.RecalculoIndice(carnet,contador)
                  while(this.tabla[indice] != null){
                      contador++
                      indice = this.RecalculoIndice(carnet, contador)
                      if(this.tabla[indice].carnet == carnet){
                          alert("Bienvenido " + this.tabla[indice].usuario)
                          return
                      }
                  }
              }
          }catch(err){
              console.log("Hubo un error en busqueda")
          }
      }
  }

  /**
   * Este codigo es un extra para generar una tabla 
   */

  genera_tabla() {
      // Obtener la referencia del elemento body
      var body = document.getElementsByTagName("body")[0];
    
    
      var divtable = document.createElement("div");
      var tabla   = document.createElement("table");
      var tblBody = document.createElement("tbody");
      var salto_html = document.createElement("br")
      divtable.className = "container contenedor"
      tabla.className = "table contenedor-tabla"
      divtable.innerHTML += "<h3>Listado de alumnos</h3>"
      divtable.innerHTML += "<h4>Capacidad: "+this.capacidad+"</h4>"
      let porcentaje = this.utilizacion/this.capacidad
      porcentaje = porcentaje.toFixed(2)
      divtable.innerHTML += "<h4>Porcentaje: "+porcentaje+"</h4>"
      //carnet
      var encabezado = document.createElement("tr")
      var celda_encabezado = document.createElement("td");
      var encabezado_contenido = document.createTextNode("Carnet")
      celda_encabezado.appendChild(encabezado_contenido);
      encabezado.appendChild(celda_encabezado)
      tblBody.appendChild(encabezado)
      //Nombre
      celda_encabezado = document.createElement("td");
      encabezado_contenido = document.createTextNode("Nombre")
      celda_encabezado.appendChild(encabezado_contenido);
      encabezado.appendChild(celda_encabezado)
      tblBody.appendChild(encabezado)
      //Password
      celda_encabezado = document.createElement("td");
      encabezado_contenido = document.createTextNode("Password")
      celda_encabezado.appendChild(encabezado_contenido);
      encabezado.appendChild(celda_encabezado)
      tblBody.appendChild(encabezado)

      for(var i = 0; i < this.capacidad; i++){
          if(this.tabla[i] != null){
              var hilera = document.createElement("tr");
              var arreglo = new Array(3)
              arreglo[0] = this.tabla[i].carnet
              arreglo[1] = this.tabla[i].usuario
              arreglo[2] = this.tabla[i].password
              for(var j = 0; j < 3; j++){
                  var celda = document.createElement("td");
                  var textoCelda = document.createTextNode(arreglo[j]);
                  celda.appendChild(textoCelda);
                  hilera.appendChild(celda);
              }
              tblBody.appendChild(hilera);
          }
      }


      divtable.appendChild(tabla)
      // posiciona el <tbody> debajo del elemento <table>
      tabla.appendChild(tblBody);
      // appends <table> into <body>
      body.appendChild(salto_html);
      body.appendChild(divtable);
      // modifica el atributo "border" de la tabla y lo fija a "2";
      tabla.setAttribute("border", "2");
  }



  genera_permisos() {
   
    var body = document.getElementsByTagName("body")[0];
  
  
    var divtable = document.createElement("div");
    var tabla   = document.createElement("table");
    var tblBody = document.createElement("tbody");
    var salto_html = document.createElement("br")
    divtable.className = "container contenedor"
    tabla.className = "table contenedor-tabla"
    divtable.innerHTML += "<h3>Listado de alumnos</h3>"
    //Propietario
    var encabezado = document.createElement("tr")
    var celda_encabezado = document.createElement("td");
    var encabezado_contenido = document.createTextNode("Propietario")
    celda_encabezado.appendChild(encabezado_contenido);
    encabezado.appendChild(celda_encabezado)
    tblBody.appendChild(encabezado)
    //Destino
    celda_encabezado = document.createElement("td");
    encabezado_contenido = document.createTextNode("Destino")
    celda_encabezado.appendChild(encabezado_contenido);
    encabezado.appendChild(celda_encabezado)
    tblBody.appendChild(encabezado)
    //Archivo
    celda_encabezado = document.createElement("td");
    encabezado_contenido = document.createTextNode("Archivo")
    celda_encabezado.appendChild(encabezado_contenido);
    encabezado.appendChild(celda_encabezado)
    tblBody.appendChild(encabezado)

    //Permisos
    celda_encabezado = document.createElement("td");
    encabezado_contenido = document.createTextNode("Permiso")
    celda_encabezado.appendChild(encabezado_contenido);
    encabezado.appendChild(celda_encabezado)
    tblBody.appendChild(encabezado)

    //Ubicacion

    celda_encabezado = document.createElement("td");
    encabezado_contenido = document.createTextNode("Ubicacion")
    celda_encabezado.appendChild(encabezado_contenido);
    encabezado.appendChild(celda_encabezado)
    tblBody.appendChild(encabezado)

    for(var i = 0; i < this.capacidad; i++){
        if(this.tabla[i] != null){
            if (this.tabla[i].compartidos != null){
                let aux = this.tabla[i].compartidos.raiz

                while (aux){

                    var hilera = document.createElement("tr");
                    var arreglo = new Array(4)
                    arreglo[0] = aux.propietario
                    arreglo[1] = aux.destino
                    arreglo[2] = aux.archivo

                    arreglo[3] = aux.permiso

                    arreglo[4] = aux.ubicacion
                    console.log(aux.ubicacion)
                   
                    

                    for(var j = 0; j < 5; j++){
                        var celda = document.createElement("td");
                        var textoCelda = document.createTextNode(arreglo[j]);
                        celda.appendChild(textoCelda);
                        hilera.appendChild(celda);
                    }

                    aux = aux.siguiente
                    tblBody.appendChild(hilera);

                }
                
                
                
            }
        }
    }


    divtable.appendChild(tabla)
    // posiciona el <tbody> debajo del elemento <table>
    tabla.appendChild(tblBody);
    // appends <table> into <body>
    body.appendChild(salto_html);
    body.appendChild(divtable);
    // modifica el atributo "border" de la tabla y lo fija a "2";
    tabla.setAttribute("border", "2");
}

  isPrime(numero) {
      if (numero <= 1) {return false}
      if (numero === 2) {return true}
      if (numero % 2 === 0) {return false}
      for (let i = 3; i <= Math.sqrt(numero); i += 2) {
        if (numero % i === 0) {return false};
      }
      return true;
  }

  regenerar(tabla,capacidad,utilizacion){
    this.tabla = tabla
    this.capacidad = capacidad
    this.utilizacion = utilizacion
  }

  

}

const tablaHash = new TablaHash()





function busqueda(){
  let carnet = document.getElementById("valor").value;
  tablaHash.busquedaUsuario(carnet)
}


function recorridoInorden(raiz){
    let cadena = ""
    if(raiz !== null){
      
        
        console.log(raiz.compartidos)
        insertarHash(raiz.carnet,raiz.nombre,raiz.contraseña,raiz.nario,raiz.compartidos)
        
       
        if(raiz.izquierdo !== null){
            cadena += recorridoInorden(raiz.izquierdo)
            
        
        }
        if(raiz.derecho !== null){
            cadena += recorridoInorden(raiz.derecho)
        }
  }
     
  }

if (arbol != null && tabla1 == null){
    recorridoInorden(arbol.raiz)
    
      
}

async function insertarHash(carnet,nombre,contraseña,carpetas,compartidos){
    let contrasena = await sha256(contraseña)
  
    tablaHash.insertar(carnet,nombre,contrasena,carpetas,compartidos)
    
    
    localStorage.setItem("table",JSON.stringify(tablaHash))
    
}

if (tabla1 !== null){
    tablaHash.regenerar(tabla1.tabla,tabla1.capacidad,tabla1.utilizacion)
    
    
    tablaHash.genera_tabla()
    tablaHash.genera_permisos()
     
}



const btnReporters = document.getElementById("reportes")
btnReporters.onclick = function reportes(){
    if (localStorage.getItem("bloque") == null){
        window.alert ("No hay ningún mensaje para realizar el reporte")
        return
    }
    let localización = window.location.href.replace("Admin.html","Reportes.html")
    window.location.href = localización

}

/*
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

*/

















