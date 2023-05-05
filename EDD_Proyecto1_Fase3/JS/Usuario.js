

let usuario = JSON.parse(localStorage.getItem('usuario_t'))




function buscar(){
    
    document.getElementById("Mostrador").innerHTML = ""
    let ruta = document.getElementById("ruta").value
    let aux = usuario.carpetas.principal
    
    while(aux){
    
    console.log(ruta)
    if(ruta == aux.valor){
        console.log("-...")
        let aux2 = aux.siguiente
        while(aux2){
            document.getElementById("Mostrador").innerHTML += '<div style=" display: inline-block; margin-left:50px">' +
            '<img src="../CSS/carpeta.jpg" style="height: 80px; width: 80px; display: inline; ">' +
            '<p style = "text-align: center width = "50px">'+aux2.valor+'</p>'
            '</div>'
            aux2 = aux2.siguiente   
        }
        return
    }
    aux = aux.abajo
    
    
    
    }

    
}

function grafica(){
        let cadena = "graph grafoDirigido{ rankdir=LR; node [shape=box]; \"/\"; node [shape = ellipse] ; layout=neato; "
        let auxPadre = usuario.carpetas.principal
        let auxHijo = usuario.carpetas.principal
        let peso = 0
        console.log("aqui?")
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
                cadena += "\"" + padre + "\"" + " -- " + "\"" + auxHijo.valor + "\"" + " [label=\"" + peso + "\" "+"len = 1.5"+"]" 
                auxHijo = auxHijo.siguiente
            }
            auxPadre = auxPadre.abajo
        }
        cadena += "}"
        return cadena
}

function reportes(){
    let url = 'https://quickchart.io/graphviz?graph=';
    let body = grafica()
    
   
    document.getElementById("grafo").src = url+body

}

function compartidos1(){
    if (usuario.compartidos == null){
        window.alert("Este usuario no tiene archivos compartidos")
    }else{
        document.getElementById("Mostrador").innerHTML = ""
        let aux = usuario.compartidos.raiz

        while (aux){
            document.getElementById("Mostrador").innerHTML += '<div style=" display: inline-block; margin-left:50px">' +
            '<img src="../CSS/archivos.jpg" style="height: 80px; width: 80px; display: inline; ">' +
            '<p style = "text-align: center width = "50px">'+aux2.valor+'</p>'
            '</div>'
            aux = aux.siguiente   
        }
        
    }
}
function salir(){
    let localización = window.location.href.replace("Usuario.html","Opciones.html")
    window.location.href = localización
}
