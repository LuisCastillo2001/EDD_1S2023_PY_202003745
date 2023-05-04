let usuario = JSON.parse(localStorage.getItem('usuario'))
let arbol = JSON.parse(localStorage.getItem("arbol"))




document.getElementById("Bienvenido").innerHTML = "Bienvenido"+"<br>"+usuario.carnet

const cart = usuario.carnet

//bitacora


class Nodocompartidos{
    constructor(propietario,destino,archivo,permiso,ubicacion){
        this.propietario = propietario
        this.destino = destino
        this.archivo = archivo
        this.permiso = permiso
        this.ubicacion = ubicacion
        this.siguiente = null
    }

}

class compartidos {
    constructor(){
        this.raiz = null
    }

    insercion(propietario,destino,archivo,permiso){
        if (this.raiz == null){
            let ubicacion = document.getElementById("ruta").value
            this.raiz = new Nodocompartidos(propietario,destino,archivo,permiso,ubicacion)
        }
       
    }
}



function insertarCompartidos(compartidos,propietario,destino,archivo,permiso,ubicacion){
    let aux = compartidos.raiz
    while (aux.siguiente !== null){
        aux = aux.siguiente
    }

    aux.siguiente = new Nodocompartidos(propietario,destino,archivo,permiso,ubicacion)
}

class Nodobitacora{
    constructor(accion,archivo,hora,fecha){
        this.accion = accion
        this.archivo = archivo
        this.hora = hora
        this.fecha = fecha
        this.siguiente = null
    }
    
}






class Bitacora{
    constructor (){
        this.raiz = null
    }


    Insercion(accion,archivo,hora,fecha){
        if (this.raiz === null){
            this.raiz = new Nodobitacora(accion,archivo,hora,fecha)
        }
        else{
            let aux = this.raiz
            while (aux.siguiente !== null){
                aux = aux.siguiente
            }

            aux.siguiente = new Nodobitacora(accion,archivo,hora,fecha)
        }
    }

    Graficar(){
        let aux = this.raiz
        let cadena = "digraph ListaCircular{ \n node[shape = square]; \n rankdir = LR \n"
        let contador = 1
        if (this.raiz === null){
            return null
        }
        while (aux){
            cadena += "nodo" + contador 
            cadena += '[label ="Accion:'+aux.accion+"\\n"
            cadena+= aux.archivo + "\\n"
            cadena += "Fecha:"+aux.fecha+"\\n"
            cadena += "Hora:"+aux.hora+'"'+"]"+"\n"
            contador++
            aux = aux.siguiente
        }
        aux = this.raiz
        contador = 1
        while (aux){
            if (aux.siguiente === null){
                cadena+= "nodo"+contador
                break
            }
            cadena+= "nodo"+contador+"->"
            aux = aux.siguiente
            contador++
        }
        
        cadena+= "->nodo1"
        cadena+= "\n}"
        return cadena
    }

    Revaluar(bitacora){
        this.raiz = bitacora
    }
}


//Matriz



class nodoMatriz{
    constructor(posX, posY, nombre_archivo){
        this.siguiente = null;
        this.anterior = null;
        this.abajo = null;
        this.arriba = null;
        this.posX = posX;
        this.posY = posY;
        this.posicion = nombre_archivo;
    }
}

class Matriz{
    constructor(nombre){
        this.principal = new nodoMatriz(-1,-1,nombre)
        this.coordenadaY = 0;
        this.coordenadaX = 0;
    }

    buscarF(nombre_archivo){
        let aux = this.principal
        while(aux){
            /**if(aux.posY === y) */
            if(aux.posicion === nombre_archivo){
                return aux;
            }else{
                aux = aux.abajo;
            }
        }
        return null;
    }

    buscarC(carnet){
        let aux = this.principal;
        while(aux){
            /**if(aux.posX === x) */
            if(aux.posicion === carnet){
                return aux;
            }else{
                aux = aux.siguiente
            }
        }
        return null;
    }

    insertarColumna(posicion,texto){
        const nuevoNodo = new nodoMatriz(posicion,-1,texto);
        let piv = this.principal;
        let pivA = this.principal;
        while(piv.siguiente){
            if(nuevoNodo.posX > piv.posX){
                pivA = piv;
                piv = piv.siguiente
            }else{
                nuevoNodo.siguiente = piv;
                nuevoNodo.anterior = pivA;
                pivA.siguiente = nuevoNodo;
                piv.anterior = nuevoNodo;
                return;
            }
        }
        nuevoNodo.anterior = piv;
        piv.siguiente = nuevoNodo;
    }

    insertarFila(posicion,texto){
        const nuevoNodo = new nodoMatriz(-1,posicion,texto);
        let piv = this.principal;
        let pivA = this.principal;
        while(piv.abajo){
            if(nuevoNodo.posY > piv.posY){
                pivA = piv;
                piv = piv.abajo;
            }else{
                nuevoNodo.abajo = piv;
                nuevoNodo.arriba = pivA;
                pivA.abajo = nuevoNodo;
                piv.arriba = nuevoNodo;
                return;
            }
        }
        nuevoNodo.arriba = piv;
        piv.abajo = nuevoNodo;
    }
    
    insertarNodo(x,y,texto){
        const nuevoNodo = new nodoMatriz(x,y,texto);
        let tempX = this.principal;
        let tempY = this.principal;
        //Agregar en Columna
        while(tempX.siguiente){
            if(tempX.posX === nuevoNodo.posX){
                break;
            }
            tempX = tempX.siguiente;
        }
        while(true){
            if(tempX.posY === nuevoNodo.posY){
                break;
            }else if(tempX.abajo !== null && tempX.abajo.posY > nuevoNodo.posY){
                nuevoNodo.abajo = tempX.abajo;
                nuevoNodo.arriba = tempX;
                tempX.abajo = nuevoNodo;
                break;
            }else if(tempX.abajo === null){
                nuevoNodo.arriba = tempX
                nuevoNodo.abajo = tempX.abajo
                tempX.abajo = nuevoNodo;
                break;
            }else{
                tempX = tempX.abajo;
            }
        }
        //Agregar en Fila
        while(tempY.abajo){
            if(tempY.posY === nuevoNodo.posY){
                break;
            }
            tempY = tempY.abajo;
        }
        while(true){
            if(tempY.posX === nuevoNodo.posX){
                break;
            }else if(tempY.siguiente !== null && tempY.siguiente.posX > nuevoNodo.posX){
                nuevoNodo.siguiente = tempY.siguiente;
                nuevoNodo.anterior = tempY;
                tempY.siguiente = nuevoNodo;
            }else if(tempY.siguiente === null){
                nuevoNodo.anterior = tempY;
                nuevoNodo.siguiente = tempY.siguiente;
                tempY.siguiente = nuevoNodo;
            }else{
                tempY = tempY.siguiente;
            }
        }
    }

    insertarElemento(x,y){
        let texto = x + "," + y;
        let nuevaFila = this.buscarF(y);
        let nuevaColumna = this.buscarC(x);
        /** Fila y Columna no existen */
        if(nuevaFila === null && nuevaColumna === null){
            this.insertarColumna(x, "C"+x);
            this.insertarFila(y, "F"+y);
            this.insertarNodo(x,y,texto);
        }else if(nuevaFila === null && nuevaColumna !== null){ /* Fila no existe, Columna si existe */
            this.insertarFila(y,"F"+y);
            this.insertarNodo(x,y,texto);
        }else if(nuevaFila !== null && nuevaColumna === null){/* Fila si existe, Columna no existe */
            this.insertarColumna(x, "C"+x);
            this.insertarNodo(x,y,texto);
        }else if(nuevaFila !== null && nuevaColumna !== null){/* Fila si existe, Columna si existe */
            this.insertarNodo(x,y,texto);
        }else{
            console.log("Me dio Ansiedad :(");
        }
    }

    insertarArchivo(texto, numero){
        let nuevaFila = this.buscarF(texto)
        if(nuevaFila === null){
            this.insertarFila(this.coordenadaY,texto)
            this.coordenadaY++
        }else{
            let copia_archivo = "(" + (numero++) + ")" + nombreArchivo
            this.insertarArchivo(copia_archivo, numero)
        }
    }

    colocarPermiso(archivo, carnet, permisos,nodo){
        /** NOTA: Paso Previo Buscar en AVL si existe el carnet*/
        let nuevaColumna = this.buscarC(carnet)
        let nuevaFila = this.buscarF(archivo)
        if (nuevaFila === null){
            window.alert("El permiso no pudo ser otorgado")
            return
        }
        if(nuevaColumna === null){
            this.insertarColumna(this.coordenadaX, carnet)
            this.coordenadaX++
            nuevaColumna = this.buscarC(carnet)
        }
        if(nuevaColumna !== null && nuevaFila !== null){
            this.insertarNodo(nuevaColumna.posX, nuevaFila.posY, permisos)
        }

        if (nodo.compartidos == null){
            nodo.compartidos = new compartidos()
            let ubicacion = document.getElementById("ruta").value
            nodo.compartidos.insercion(usuario.carnet,carnet,archivo,permisos,ubicacion)
        }
        else{
            let ubicacion = document.getElementById("ruta").value
            insertarCompartidos(nodo.compartidos,usuario.carnet,carnet,archivo,permisos,ubicacion)
        }

        
    }

    reporte(){
        let cadena = "";
        let aux1 = this.principal;
        let aux2 = this.principal;
        let aux3 = this.principal;
        if(aux1 !== null){
            cadena = "digraph MatrizCapa{ node[shape=box]  rankdir=UD;  {rank=min; ";
            /** Creacion de los nodos actuales */
            while(aux1){
                cadena += "nodo" + (aux1.posX+1) + (aux1.posY+1) + "[label=\"" + aux1.posicion + "\" ,rankdir=LR,group=" + (aux1.posX+1) + "]; ";
                aux1 = aux1.siguiente;
            }
            cadena += "}"
            while(aux2){
                aux1 = aux2;
                cadena += "{rank=same; ";
                while(aux1){
                    cadena += "nodo" + (aux1.posX+1) + (aux1.posY+1) + "[label=\"" + aux1.posicion + "\" ,group=" + (aux1.posX+1) + "]; ";
                    aux1 = aux1.siguiente;
                }
                cadena += "}";
                aux2 = aux2.abajo;
            }
            /** Conexiones entre los nodos de la matriz */
            aux2 = aux3;
            while(aux2){
                aux1 = aux2;
                while(aux1.siguiente){
                    cadena += "nodo" + (aux1.posX+1) + (aux1.posY+1) + " -> " + "nodo" + (aux1.siguiente.posX+1) + (aux1.siguiente.posY+1) + " [dir=both];"
                    aux1 = aux1.siguiente
                }
                aux2 = aux2.abajo;
            }
            aux2 = aux3;
            while(aux2){
                aux1 = aux2;
                while(aux1.abajo){
                    cadena += "nodo" + (aux1.posX+1) + (aux1.posY+1) + " -> " + "nodo" + (aux1.abajo.posX+1) + (aux1.abajo.posY+1) + " [dir=both];"
                    aux1 = aux1.abajo
                }
                aux2 = aux2.siguiente;
            }
            cadena +=  "}";
        }else{
            cadena = "No hay elementos en la matriz"
        }
        return cadena;
    }


    recorrerArchivos(){
        let aux = this.principal.abajo;

        while (aux){
            document.getElementById("Mostrador").innerHTML += '<div style=" display: inline-block; margin-left:50px">' +
                    '<img src="../CSS/archivos.jpg" style="height: 80px; width: 80px; display: inline; ">' +
                    '<p style = "text-align: center width = "50px">'+aux.posicion+'</p>'
                    '</div>'
            aux = aux.abajo
                    
        }
        

    }


    recorrer(nodo){
        let aux = nodo.principal.abajo

        while (aux){
            this.insertarArchivo(aux.posicion,1)
            aux = aux.abajo
        }

        
    }
}













//árbol n-ario


class nodoArbol{
    constructor(valor, id){
        this.siguiente = null;
        this.valor = valor;
        this.primero = null;
        this.id = id;
        this.matriz = null
        
    }
}



class ArbolNArio{
    constructor(){
        this.raiz = new nodoArbol("/", 0)
        this.nodo_creados = 1;
    }

    BuscarCarpeta(carpeta_nueva, lista_carpeta){
        //Si la nueva carpeta se creara en la raiz, se buscara si existe o no
        if(lista_carpeta[1] === "" && this.raiz.primero !== null){
            let aux = this.raiz.primero
            while(aux){
                if(aux.valor === carpeta_nueva){
                    return 1
                }
                aux = aux.siguiente
            }
            return 2
        }
        //Si la nueva carpeta se creara en la raiz pero no existe ninguna carpeta
        else if (lista_carpeta[1] === "" && this.raiz.primero === null){
            return 5
        }
        //Si la nueva carpeta se creara en algun directorio pero la raiz no posee ninguna carpeta
        else if(lista_carpeta[1] !== "" && this.raiz.primero === null){
            return 3
        }
        //Buscamos el directorio padre y revisar si en sus hijos existe la carpeta
        else if(lista_carpeta[1] !== "" && this.raiz.primero !== null){
            let aux = this.raiz.primero
            let nivel = lista_carpeta.length
            let posicion = 1; 
            for(var i = 1; i < nivel; i++){
                if(aux !== null){
                    while(aux){
                        if(posicion < lista_carpeta.length && lista_carpeta[posicion] === aux.valor){
                            posicion++
                            if(aux.primero !== null && posicion < lista_carpeta.length){
                                aux = aux.primero
                            }
                            break;
                        }else{
                            aux = aux.siguiente
                        }
                    }
                }else{
                    break;
                }
            }
            if(aux !== null){
                aux = aux.primero
                while(aux){
                    if(aux.valor === carpeta_nueva){
                        return 1
                    }
                    aux = aux.siguiente
                }
                return 2
            }else{
                return 4
            }

        }
    }

    BuscarCarpeta2(lista_carpeta){

        if (this.raiz === null){
            return null
        }
        
        if (lista_carpeta[1] === "" && this.raiz.primero !== null){
            
            return this.raiz
        }
        else if(lista_carpeta[1] === "" && this.raiz.primero === null){
            return this.raiz
        }
        
        else if (lista_carpeta[1]!== "" && this.raiz.primero === null){
            return null
        }

        else if(lista_carpeta[1] !== "" && this.raiz.primero !== null){
            let aux = this.raiz.primero
            let nivel = lista_carpeta.length
            let posicion = 1; 
            for(var i = 1; i < nivel; i++){
                if(aux !== null){
                    while(aux){
                        if(posicion < lista_carpeta.length && lista_carpeta[posicion] === aux.valor){
                            posicion++
                            if(aux.primero !== null && posicion < lista_carpeta.length){
                                aux = aux.primero
                            }
                            break;
                        }else{
                            aux = aux.siguiente
                        }
                    }
                }else{
                    break;
                }
            }
            if(aux !== null){
                return aux
            }else{
                return null
            }

        }
    }


    


    



    insertarHijos(carpeta_nueva, lista_carpeta){
       
        const nuevoNodo = new nodoArbol(carpeta_nueva, this.nodo_creados)
        this.nodo_creados++
      
        if(lista_carpeta[1] === "" && this.raiz.primero === null){
            this.raiz.primero = nuevoNodo
        }
    
        else if(lista_carpeta[1] === "" && this.raiz.primero !== null){
            this.raiz = this.insertarOrdenado(this.raiz, nuevoNodo)
        }
      
        else if(lista_carpeta[1] !== "" && this.raiz.primero !== null){
            let aux = this.raiz.primero
            let nivel = lista_carpeta.length
            let posicion = 1; 
  
            for(var i = 1; i < nivel; i++){
                if(aux !== null){
                    while(aux){
                        
                        if(posicion < lista_carpeta.length && lista_carpeta[posicion] === aux.valor){ 
                            posicion++
                          
                            if(aux.primero !== null && posicion < lista_carpeta.length){
                                aux = aux.primero
                            }
                            break;
                        }else{
                            aux = aux.siguiente
                        }
                    }
                }else{
                    break;
                }
            }
            
            if(aux.primero === null){
                aux.primero = nuevoNodo
            }else{
                aux = this.insertarOrdenado(aux, nuevoNodo)
            }
        }
    }



    insertarOrdenado(raiz, nuevoNodo){
        let piv = raiz.primero
        if(nuevoNodo.valor < raiz.primero.valor){
            nuevoNodo.siguiente = raiz.primero
            raiz.primero = nuevoNodo
            return raiz
        }else{
            while(piv.siguiente){
                if( nuevoNodo.valor > piv.valor && nuevoNodo.valor < piv.siguiente.valor){
                    nuevoNodo.siguiente = piv.siguiente
                    piv.siguiente = nuevoNodo
                    return raiz
                }else if(nuevoNodo.valor < piv.valor){
                    nuevoNodo.siguiente = piv
                    piv =  nuevoNodo
                    return raiz
                }else{
                    piv = piv.siguiente
                }
            }
            piv.siguiente = nuevoNodo
            return raiz
        }
    }




    mostrarCarpetasActuales(ruta){
        let lista_carpeta = ruta.split("/")
        let carpeta = this.BuscarCarpeta2(lista_carpeta)
        try{
            let aux = carpeta.primero



            if (carpeta !== null){
                
                while (aux){
                    document.getElementById("Mostrador").innerHTML += '<div style=" display: inline-block; margin-left:50px">' +
                    '<img src="../CSS/carpeta.jpg" style="height: 80px; width: 80px; display: inline; ">' +
                    '<p style = "text-align: center">'+aux.valor+'</p>'
                    '</div>'
                    
                    aux = aux.siguiente
                }
                }else{
                window.alert("La carpeta no existe")
                }

            if (carpeta.matriz !== null){
                carpeta.matriz.recorrerArchivos()
            }
                
            
            
        } catch(error){
            window.alert("La carpeta no existe")
            
        }
    }

   


    insertarValor(ruta, carpeta_nueva){
        let lista_carpeta = ruta.split("/")
        console.log(lista_carpeta)
        let existe_carpeta = this.BuscarCarpeta(carpeta_nueva, lista_carpeta)
        let fecha = obtenerFecha()
        let hora = obtenerHora()
        let accion = "Se creo carpeta"
        let archivo = carpeta_nueva


    

        switch(existe_carpeta){
            case 1:
                window.alert("La carpeta ya existe");
                let nombre = "Copia "+carpeta_nueva
                this.insertarHijos(nombre, lista_carpeta)
                InsertarBitacora(accion,archivo,hora,fecha)
                window.alert("Carpeta creada con éxito")
                break;
            case 2:
                this.insertarHijos(carpeta_nueva, lista_carpeta)
                InsertarBitacora(accion,archivo,hora,fecha)
                window.alert("Carpeta creada con éxito")
                break
            case 3:
                window.alert("La ruta actual no existe")
                break;
            case 4:
                window.alert("La ruta actual no es válida")
                break

            case 5:
                this.insertarHijos(carpeta_nueva,lista_carpeta)
                InsertarBitacora(accion,archivo,hora,fecha)
                window.alert("Carpeta creada con éxito")
                break
        }

    }


    Eliminar_carpeta(ruta_esp, carpeta_eliminar){
        let lista_carpeta = ruta_esp.split("/")
        

        try{

        if (carpeta_eliminar === "/"){
            this.raiz.primero = null
            this.raiz.matriz = null
            
            window.alert("La carpeta ha sido eliminada con éxito")
            let fecha = obtenerFecha()
            let hora = obtenerHora()
            let accion = "Se elimino carpeta"
            let archivo = carpeta_eliminar
            InsertarBitacora(accion,archivo,hora,fecha)
            console.log("eliminando")
            return
        }

        if(lista_carpeta[1] === "" && this.raiz.primero !== null){
           
            if (this.raiz.primero.valor === carpeta_eliminar){
                this.raiz.primero = this.raiz.primero.siguiente
                window.alert("Carpeta Eliminada con éxito")
                
            }else{
                let aux = this.raiz.primero
                let anterior = null
                while (aux !== null && aux.valor!== carpeta_eliminar) {
                    anterior = aux;
                    aux = aux.siguiente;
                }
                if (aux == null)  {
                    window.alert("La carpeta no existe")
                    return null;
                }
            
                anterior.siguiente = aux.siguiente;
                let fecha = obtenerFecha()
                let hora = obtenerHora()
                let accion = "Se elimino carpeta"
                let archivo = carpeta_eliminar
                InsertarBitacora(accion,archivo,hora,fecha)
                console.log("eliminar")
                window.alert("Carpeta Eliminada con éxito")
            }
               
        }


        else if(lista_carpeta[1] !== "" && this.raiz.primero !== null){
            let aux = this.raiz.primero
            let nivel = lista_carpeta.length
            let posicion = 1; 
            for(var i = 1; i < nivel; i++){
                if(aux !== null){
                    while(aux){
                        if(posicion < lista_carpeta.length && lista_carpeta[posicion] === aux.valor){
                            posicion++
                            if(aux.primero !== null && posicion < lista_carpeta.length){
                                aux = aux.primero
                            }
                            break;
                        }else{
                            aux = aux.siguiente
                        }
                    }
                }else{
                    break;
                }
            }
            //Cambiar aquí
            if(aux !== null){
               
                
                if (aux.primero.valor === carpeta_eliminar){
                    aux.primero = aux.primero.siguiente
                    let fecha = obtenerFecha()
                    let hora = obtenerHora()
                    let accion = "Se elimino carpeta"
                    let archivo = carpeta_eliminar
                    InsertarBitacora(accion,archivo,hora,fecha)
                    window.alert("Carpeta eliminada con éxito")
                   
                //Seguir aquí y no cambiar nada :3

                }else{
                    let aux2 = aux.primero
                    let anterior = null
                    
                    while (aux2 !== null && aux2.valor!== carpeta_eliminar) {
                        anterior = aux2;
                        aux2 = aux2.siguiente;
                    }
                    if (aux2 == null)  {
                        window.alert("La carpeta no existe")
                        return null;
                    }
                
                    anterior.siguiente = aux2.siguiente;
                    let fecha = obtenerFecha()
                    let hora = obtenerHora()
                    let accion = "Se elimino carpeta"
                    let archivo = carpeta_eliminar
                    InsertarBitacora(accion,archivo,hora,fecha)
                    window.alert("Carpeta eliminada con éxito")
                    
                }

                
            }
        }

    } catch(error){
        window.alert("Hubo un error al eliminar la carpeta, verifique que la ruta sea válida")
    }
    
    }
    valuar(raiz){
        
        this.raiz = raiz
        this.recorrido2(this.raiz)
        console.log(this.raiz)
        
        
    }


    recorrido2(nodo) {
      
      
    
        if (nodo.matriz !== null) {
            const matriz = new Matriz(nodo.matriz.principal.posicion)
            matriz.recorrer(nodo.matriz)  
            nodo.matriz = matriz  
            console.log(".....")
            console.log(matriz) 

        }
        if (nodo.siguiente !== null) {
          this.recorrido2(nodo.siguiente);
        }
      
        if (nodo.primero !== null) {
          this.recorrido2(nodo.primero); 
        }
      }
    


    grafica_arbol(){
        var cadena = "";
        if(!(this.raiz === null)){
            cadena = "digraph arbol{ ";
            cadena = cadena + this.retornarValoresArbol(this.raiz);
            cadena = cadena + "}";
        }else{
            cadena = "digraph G { arbol }";
        }
        return cadena;
    }

    colocar(archivo,carnet,permiso,nodo){
        let ruta = document.getElementById("ruta").value
        let lista_carpeta = ruta.split("/")
        let carpeta = this.BuscarCarpeta2(lista_carpeta)

        if (carpeta !== null){
            
           
            if (carpeta.matriz !== null){
                carpeta.matriz.colocarPermiso(archivo,carnet,permiso,nodo)
                
                let url = 'https://quickchart.io/graphviz?graph=';
                let body = carpeta.matriz.reporte();
                document.getElementById("matriz").src = url+body
            }
            else{
                window.alert("Esta carpeta no tiene ningún documento")
            }
         
            
            
        } 
    }

    retornarValoresArbol(raiz){
        var cadena = "node[shape=record] ";
        let nodo = 1;
        let nodo_padre = 0;
        cadena += "nodo" + nodo_padre + "[label=\"" + this.raiz.valor  + "\"] "
        cadena += this.valoresSiguietes(this.raiz.primero, nodo, nodo_padre)
        cadena += this.conexionRamas(this.raiz.primero, 0)
        return cadena;
    }


    valoresSiguietes(raiz, nodo, nodo_padre){
        let cadena = ""
        let aux = raiz
        let nodo_padre_aumento = nodo_padre
        if(aux !== null){
            while(aux){
                cadena += "nodo" + aux.id + "[label=\"" + aux.valor  + "\"] "
                aux = aux.siguiente
            }
            aux = raiz
            while(aux){
                nodo_padre_aumento++
                cadena += this.valoresSiguietes(aux.primero, this.nodo_creados, nodo_padre_aumento)
                aux = aux.siguiente
            }
        }
        return cadena
    }

    conexionRamas(raiz, padre){
        let cadena = ""
        let aux = raiz
        if(aux !== null){
            while(aux){
                cadena += "nodo" + padre + " -> nodo" + aux.id + " "
                aux = aux.siguiente
            }
            aux = raiz
            while(aux){
                cadena += this.conexionRamas(aux.primero, aux.id)
                aux = aux.siguiente
            }
        }
        return cadena
    }


    insertarArch(nombre){
        
        let ruta = document.getElementById("ruta").value
        let lista_carpeta = ruta.split("/")
        let carpeta = this.BuscarCarpeta2(lista_carpeta)

        if (carpeta !== null){
            
           
            if (carpeta.matriz === null){
                carpeta.matriz = new Matriz(carpeta.valor)
                carpeta.matriz.insertarArchivo(nombre,1)
                window.alert("Archivo "+nombre+" subido con éxito")
                let fecha = obtenerFecha()
                let hora = obtenerHora()
                let accion = "Se subió el archivo"
                let archivo = nombre
                InsertarBitacora(accion,archivo,hora,fecha)
                
                
                
                
            }
            else{
                carpeta.matriz.insertarArchivo(nombre,1) 
                window.alert("Archivo "+nombre+" subido con éxito")
                let fecha = obtenerFecha()
                let hora = obtenerHora()
                let accion = "Se subió el archivo"
                let archivo = nombre
                InsertarBitacora(accion,archivo,hora,fecha)
                let url = 'https://quickchart.io/graphviz?graph=';
                let body = carpeta.matriz.reporte();
                document.getElementById("matriz").src = url+body
                
                
            }
            let url = 'https://quickchart.io/graphviz?graph=';
            let body = carpeta.matriz.reporte();
            console.log(body)
            document.getElementById("matriz").src = url+body
                
         
            
            
        } 
    }


    refrescarMatriz(){
        let ruta = document.getElementById("ruta").value
        let lista_carpeta = ruta.split("/")
        let carpeta = this.BuscarCarpeta2(lista_carpeta)
        if (carpeta === null){
            window.alert ("La carpeta no existe")
            return
        }
        if (carpeta.matriz === null){
            window.alert("Esta carpeta, no tiene suficientes archivos, por lo tanto no puede generar este reporte")
            document.getElementById("matriz").src = "../CSS/archivos.jpg"
            
            return
        }else{
            let url = 'https://quickchart.io/graphviz?graph=';
            let body = carpeta.matriz.reporte();
            document.getElementById("matriz").src = url+body
            console.log(carpeta.matriz)
        }
    }
    

    

    

}


const arbolnario = new ArbolNArio()

const bitacora = new Bitacora()  

function InsertarBitacora(accion,archivo,hora,fecha){
    
        bitacora.Insercion(accion,archivo,hora,fecha)

}

function agregarVarios(){
    let ruta = document.getElementById("ruta").value
    let carpeta = document.getElementById("carpeta").value
    
        if (carpeta === ""){
            window.alert("No se puede insertar carpetas sin nombre")
            return
        }
        arbolnario.insertarValor(ruta,carpeta)
        
        
    
    
        document.getElementById("carpeta").value = "";
        refrescarArbol()
    
    

}





if (usuario.nario !== null){
    
    arbolnario.valuar(usuario.nario.raiz)
    
    console.log(arbolnario)
    refrescarArbol()
    recorridoEnProfundidad(arbolnario.raiz)
    recorrerArbol(arbolnario.raiz)
}

if (usuario.bitacora !== null){
    bitacora.Revaluar(usuario.bitacora.raiz)
}





function buscar(nodo, carnet) {
    if (nodo === null) {
      return null; 
    } else if (carnet < nodo.carnet) {
      return buscar(nodo.izquierdo, carnet); 
    } else if (carnet > nodo.carnet) {
      return buscar(nodo.derecho, carnet); 
    } else if (carnet === nodo.carnet) {
      return nodo; 
    } else {
      return null;
    }
  }



function mostrarCarpetas(){
    let ruta = document.getElementById("ruta").value
    
    document.getElementById("Mostrador").innerHTML = ""
    arbolnario.mostrarCarpetasActuales(ruta)
    
}


function eliminar(){
    let ruta = document.getElementById("ruta").value
    let carpeta_eliminar = document.getElementById("eliminacion").value
    
    arbolnario.Eliminar_carpeta(ruta,carpeta_eliminar)
    refrescarArbol()
    
}


function refrescarArbol(){
    let url = 'https://quickchart.io/graphviz?graph=';
    let body = arbolnario.grafica_arbol();
    
   
    document.getElementById("n-ario").src = url+body
    
  }





  const inputElement = document.getElementById("archivo");
  inputElement.addEventListener("change", onChange, false);
  let nombreArchivo = ""
  let base64String = ""
  function onChange(event) {
    var reader = new FileReader();
    reader.onload = onReaderLoad;
    nombreArchivo = event.target.files[0].name
    reader.readAsDataURL(event.target.files[0]);
    
    arbolnario.insertarArch(nombreArchivo)
    console.log(arbolnario)
    inputElement.value = ""
    
     

      
  }
  
function Matriz1(){
    arbolnario.refrescarMatriz()
}


function recorridoEnProfundidad(nodo) {
    if (nodo.matriz !== null) {
        nodo.matriz = eliminarReferenciasCirculares(nodo.matriz)

    }
    if (nodo.siguiente !== null) {
      recorridoEnProfundidad(nodo.siguiente);
    }
  
    if (nodo.primero !== null) {
      recorridoEnProfundidad(nodo.primero); 
    }
  }


  function recorrerArbol(nodo) {
   
  
    // Si el nodo tiene hijos, los recorremos y los marcamos como hijos del nodo actual
    if (nodo.primero) {
      let hijoActual = nodo.primero;
      while (hijoActual) {
        console.log(`- ${hijoActual.valor} es hijo de ${nodo.valor}`);
        recorrerArbol(hijoActual);
        hijoActual = hijoActual.siguiente;
      }
    }
  }

function actualizar (){
    
    recorridoEnProfundidad(arbolnario.raiz)
    console.log(arbolnario)
    usuario.nario = arbolnario
    usuario.bitacora = bitacora
    localStorage.setItem("usuario",JSON.stringify(usuario))
    cambio = buscar(arbol.raiz,cart)
    cambio.nario = arbolnario
    cambio.bitacora = usuario.bitacora
    localStorage.setItem("arbol",JSON.stringify(arbol))
    console.log(usuario)
    let localización = window.location.href.replace("Usuario.html","Login.html")
    window.location.href = localización
    
}

function asignarPermisos(){
    let carnet = document.getElementById("carne_user").value
    let archivo = document.getElementById("arch").value
    let permisos = document.getElementById("permiso").value
    console.log(carnet)
    console.log(archivo)
    console.log(permisos)
    let existe = buscar(arbol.raiz,parseInt(carnet))
    if (existe === null){
        window.alert("El alumno no existe, por lo tanto no se puede otorgar el permiso")
        return
    }
    arbolnario.colocar(archivo,parseInt(carnet),permisos,existe)
    window.alert("Permiso colocado con éxito")
    
}

function obtenerFecha(){
    const tiempoTranscurrido = Date.now();
    const hoy = new Date(tiempoTranscurrido)
    let fecha = hoy.toLocaleDateString();
    return fecha
}

function obtenerHora(){
    let today = new Date();
    let now = today.toLocaleTimeString();
    return now
}


function Grafbita(){
    let url = 'https://quickchart.io/graphviz?graph=';
    let body = bitacora.Graficar()
    if (body === null){
        window.alert("No se puede realizar el reporte de la bitácora")
    }else{
        console.log(body)
        document.getElementById("Bitacora").src = url+body
    }
   
    
   
   
    
}

  function onReaderLoad(event){
      base64String = event.target.result
  }


function eliminarReferenciasCirculares(objeto, ancestros = []) {

  if (ancestros.includes(objeto)) {
    return null;
  }


  ancestros.push(objeto);

  
  for (let propiedad in objeto) {
    let valor = objeto[propiedad];

 
    if (typeof valor === "object" && valor !== null) {
     
      objeto[propiedad] = eliminarReferenciasCirculares(valor, [...ancestros]);
    }
  }

  return objeto;
}



