function Redirected(){
    let usuario = document.getElementById("Usuario").value
    let contraseña = document.getElementById("Contraseña").value
    if (usuario == "admin"&& contraseña == "admin"){
       
        
      let localización = window.location.href.replace("Admin.html","Login.html")
      window.location.href = localización
    }else{
        carnet = parseInt(usuario)
        usuario_log = verificar(carnet,contraseña)
        if (usuario_log !==null){
            localStorage.setItem("usuario",JSON.stringify(usuario_log))
            window.alert("Usuario encontrado con éxito")
            
            
            let localización = window.location.href.replace("Login.html","Usuario.html")
            window.location.href = localización
        }else{
            window.alert("El usuario no exsiste")
        }
    }
}


function verificar(carnet,contraseña){
    arbol = JSON.parse(localStorage.getItem('arbol'))
    carnet = carnet
    contraseña = contraseña
    usuario = buscar(arbol.raiz,carnet,contraseña)
    if (usuario !== null){
        return usuario
    }else{
        return null
    }
    
}


function buscar(nodo, carnet, contrasena) {
    if (nodo === null) {
      return null; 
    } else if (carnet < nodo.carnet) {
      return buscar(nodo.izquierdo, carnet, contrasena); 
    } else if (carnet > nodo.carnet) {
      return buscar(nodo.derecho, carnet, contrasena); 
    } else if (contrasena === nodo.contraseña) {
      return nodo; 
    } else {
      return null;
    }
  }