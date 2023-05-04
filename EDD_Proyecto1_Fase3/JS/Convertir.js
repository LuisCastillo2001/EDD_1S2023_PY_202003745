let usuario = JSON.parse(localStorage.getItem('usuario_t'))

let tabla = JSON.parse(localStorage.getItem("table"))

class nodoMatrizAdyacencia{
    constructor(valor){
        this.siguiente = null
        this.abajo = null
        this.valor = valor
    }
}

class grafoDirigido{
    constructor(){
        this.principal = null
    }

    insertarF(texto){
        const nuevoNodo = new nodoMatrizAdyacencia(texto)
        if(this.principal === null){
            this.principal = nuevoNodo
        }else{
            let aux = this.principal
            while(aux.abajo){
                if(aux.valor === nuevoNodo.valor){
                    return
                }
                aux = aux.abajo
            }
            aux.abajo = nuevoNodo
        }
    }

    insertarC(padre, hijo){
        const nuevoNodo = new nodoMatrizAdyacencia(hijo)
        if(this.principal !== null && this.principal.valor === padre){
            let aux = this.principal
            while(aux.siguiente){
                aux = aux.siguiente
            }
            aux.siguiente = nuevoNodo
        }else{
            this.insertarF(padre)
            let aux = this.principal
            while(aux){
                if(aux.valor === padre){
                    break;
                }
                aux = aux.abajo
            }
            if(aux !== null){
                while(aux.siguiente){
                    aux = aux.siguiente
                }
                aux.siguiente = nuevoNodo
            }
        }
    }

    insertarValores(padre, hijos){
        let cadena = hijos.split(',')
        for(let i = 0; i < cadena.length; i++){
            this.insertarC(padre,cadena[i])
        }
    }

    //Reporte modificado para trabajar con carpetas
    grafica(){
        let cadena = "graph grafoDirigido{ rankdir=LR; node [shape=box]; \"/\"; node [shape = ellipse] ; layout=neato; "
        let auxPadre = this.principal
        let auxHijo = this.principal
        let peso = 0
        while(auxPadre){
            auxHijo = auxPadre.siguiente
            let profundidad = auxPadre.valor.split('/')
            let padre = ""
            if(profundidad.length == 2 && profundidad[1] == ""){ peso = 1}
            else if(profundidad.length == 2 && profundidad[1] != ""){ peso = 2 }
            else { peso = profundidad.length }
            if(auxPadre.valor != "/"){ padre = profundidad[profundidad.length-1] }
            else { padre = "/" }
            while(auxHijo){
                cadena += "\"" + padre + "\"" + " -- " + "\"" + auxHijo.valor + "\"" + " [label=\"" + peso + "\"] "
                auxHijo = auxHijo.siguiente
            }
            auxPadre = auxPadre.abajo
        }
        cadena += "}"
        return cadena
    }
}

const grafo =  new grafoDirigido()






 function Cambiar(){

    if (usuario.carpeta !== null){
        console.log(usuario.carpetas.raiz)
        recorrerArbol(usuario.carpetas.raiz)
        usuario.carpetas = grafo
        console.log(grafo)
        cambiarhash()
    }
}

function cambiarhash(){
    console.log(tabla.capacidad)
    for (var i = 0; i < tabla.capacidad; i++){
        if(usuario.carnet == tabla.tabla[i].carnet){
            
            tabla.tabla[i]= usuario
            
            break
        }

    

    }
    console.log(tabla)
    localStorage.setItem("table",JSON.stringify(tabla))
    localStorage.setItem("usuario_t",JSON.stringify(usuario))
}

function recorrerArbol(nodo) {
    console.log(nodo); // imprimimos el nodo actual
  
    // Si el nodo tiene hijos, los recorremos y los marcamos como hijos del nodo actual
    if (nodo.primero) {
      let hijoActual = nodo.primero;
      while (hijoActual) {
        console.log(`- ${hijoActual.valor} es hijo de ${nodo.valor}`);
        grafo.insertarValores(nodo.valor,hijoActual.valor)
        recorrerArbol(hijoActual);
        hijoActual = hijoActual.siguiente;
        
      }
    }
  }