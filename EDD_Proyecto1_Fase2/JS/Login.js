function Redirected(){
    let usuario = document.getElementById("Usuario").value
    let contraseña = document.getElementById("Contraseña").value
    if (usuario == "admin"&& contraseña == "admin"){
       
        
        let localización = window.location.href.replace("Login.html","Admin.html")


        
        window.location.href = localización
    }else{
        carnet = parseInt(usuario)
        usuario_log = verificar(carnet,contraseña)
        if (usuario_log === 1){
            window.alert("Usuario encontrado con éxito")
        }else{
            window.alert("El usuario no existe")
        }
    }
}


function verificar(carnet,contraseña){
    arbol = JSON.parse(localStorage.getItem('arbol'))
    carnet = carnet
    contraseña = contraseña
    usuario = recorridoInorden(arbol.raiz,carnet,contraseña)
    if (usuario === 1){
        return 1
    }else{
        return 0
    }
    
}


function recorridoInorden(raiz,carnet,contraseña){
    var cadena = ""
    if(raiz !== null){
        if(raiz.izquierdo !== null){
            cadena += this.recorridoInorden(raiz.izquierdo)
            cadena += " -> "
        }
        cadena += "\""
        cadena += raiz.carnet
        if (raiz.carnet == carnet && raiz.contraseña == contraseña){
            return 1
        }
        if(raiz.derecho !== null){
            cadena += " -> "
            cadena += this.recorridoInorden(raiz.derecho)
        }
    }
    return 0
}