
let usuario = JSON.parse(localStorage.getItem('usuario'))
let arbol = JSON.parse(localStorage.getItem("arbol"))
document.getElementById("Bienvenido").innerHTML = "Bienvenido"+"<br>"+usuario.carnet

const cart = usuario.carnet



class nodoArbol{
    constructor(valor, id){
        this.siguiente = null;
        this.valor = valor;
        this.primero = null;
        this.id = id;
    }
}



class ArbolNArio{
    constructor(){
        this.raiz = new nodoArbol("/", 0)
        this.nodo_creados = 1;
    }

    BuscarCarpeta(carpeta_nueva,lista_carpeta){
        if (lista_carpeta[1] === "" && this.raiz.primero !== null){
            let aux = this.raiz.primero
            while (aux){
                if (aux.valor === carpeta_nueva){
                    return 1
                }

                aux = aux.siguiente
            }

            return 2
        }

        else if(lista_carpeta[1] === "" && this.raiz.primero === null){
            return 5
        }
        
        else if (lista_carpeta[1]!== "" && this.raiz.primero === null){
            return 3
        }

        else if (lista_carpeta[1] !== ""  && this.raiz.primero !== null){
            let aux = this.raiz
            let nivel = lista_carpeta.length

            for (var i = 1; i<nivel ; i++){
                if (aux !== null){
                    aux = aux.primero
                }else{
                    break
                }
            }

            if (aux !== null){
                aux = aux.primero
                while (aux){
                    if (aux.valor === carpeta_nueva){
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
       
        if (lista_carpeta[1] === "" && this.raiz.primero !== null){
            
            return this.raiz
        }
        else if(lista_carpeta[1] === "" && this.raiz.primero === null){
            return null
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
                    console.log(aux.valor)
                    aux = aux.siguiente
                }
                
            }else{
                window.alert("La carpeta no existe")
            }
            
        } catch(error){
            window.alert("La carpeta no existe")
            
        }
    }

   


    insertarValor(ruta, carpeta_nueva){
        let lista_carpeta = ruta.split("/")
        let existe_carpeta = this.BuscarCarpeta(carpeta_nueva, lista_carpeta)


    

        switch(existe_carpeta){
            case 1:
                window.alert("La carpeta ya existe");
                break;
            case 2:
                this.insertarHijos(carpeta_nueva, lista_carpeta)
                break
            case 3:
                window.alert("La ruta actual no existe")
                break;
            case 4:
                window.alert("La ruta actual no es válida")

            case 5:
                this.insertarHijos(carpeta_nueva,lista_carpeta)
                break
        }

    }


    Eliminar_carpeta(ruta_esp, carpeta_eliminar){
        let lista_carpeta = ruta_esp.split("/")
        
        if (carpeta_eliminar === "/"){
            this.raiz = null
            console.log(this.raiz)
            return
        }

        if(lista_carpeta[1] === "" && this.raiz.primero !== null){
            console.log(this.raiz.primero.valor)
            if (this.raiz.primero.valor === carpeta_eliminar){
                this.raiz.primero = this.raiz.primero.siguiente
                console.log(this.raiz)
            }else{
                let aux = this.raiz.primero
                let anterior = null
                while (aux !== null && aux.valor!== carpeta_eliminar) {
                    anterior = aux;
                    aux = aux.siguiente;
                }
                if (aux == null)  {
                    return null;
                }
            
                anterior.siguiente = aux.siguiente;
                console.log(this.raiz)
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
               
                console.log(".......")
                console.log(aux.primero.valor)
                if (aux.primero.valor === carpeta_eliminar){
                    aux.primero = aux.primero.siguiente
                    console.log(this.raiz)
                //Seguir aquí y no cambiar nada :3

                }else{
                    let aux2 = aux.primero
                    let anterior = null
                    
                    while (aux2 !== null && aux2.valor!== carpeta_eliminar) {
                        anterior = aux2;
                        aux2 = aux2.siguiente;
                    }
                    if (aux2 == null)  {
                        return null;
                    }
                
                    anterior.siguiente = aux2.siguiente;
                    console.log(this.raiz)
                }

                
            }
        }

        
    
    
    }
    valuar(raiz){
        this.raiz = raiz
    }

}


const arbolnario = new ArbolNArio()

if (usuario.nario !== null){
    arbolnario.valuar(usuario.nario.raiz)
    console.log(arbolnario)
    
}


function agregarVarios(){
    let ruta = document.getElementById("ruta").value
    let carpeta = document.getElementById("carpeta").value
    try{
        arbolnario.insertarValor(ruta,carpeta)
        window.alert("Carpeta creada con éxito")
    }catch(error){
        alert("Hubo un error al insertar el nodo")
    }
    document.getElementById("carpeta").value = "";
    usuario.nario = arbolnario
   
    localStorage.setItem("usuario",JSON.stringify(usuario))
    cambio = buscar(arbol.raiz,cart)
    cambio.nario = arbolnario
    localStorage.setItem("arbol",JSON.stringify(arbol))
    console.log(arbolnario)
    

}


if (usuario.nario !== null){
    arbolnario.valuar(usuario.nario.raiz)
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
    console.log(ruta)
    console.log(arbolnario)
    document.getElementById("Mostrador").innerHTML = ""
    arbolnario.mostrarCarpetasActuales(ruta)
}


function eliminar(){
    let ruta = document.getElementById("ruta").value
    let carpeta_eliminar = document.getElementById("eliminacion").value
    
    arbolnario.Eliminar_carpeta(ruta,carpeta_eliminar)
    
}
