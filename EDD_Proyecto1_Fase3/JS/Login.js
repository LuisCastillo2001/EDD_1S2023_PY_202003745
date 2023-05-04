
import {desencriptacion, encriptacion,sha256} from './Encriptacion.js'
let boton = document.getElementById("subir")

boton.onclick = function Redirected(){
    let usuario = document.getElementById("Usuario").value
    let contraseña = document.getElementById("Contraseña").value
    if (usuario == "admin"&& contraseña == "admin"){
       
        
        let localización = window.location.href.replace("Login.html","Admin.html")
        window.location.href = localización
    }else{
        let carnet = parseInt(usuario)
        buscarHash(carnet,contraseña)
        
        
    }
}



async function buscarHash(carnet,contraseña){
    
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
                let contrasena = await sha256(contraseña)
                if (contrasena == tabla[i].password){
                    let localización = window.location.href.replace("Login.html","Opciones.html")
                    window.location.href = localización
                    localStorage.setItem("usuario_t",JSON.stringify(tabla[i]))
                    return;
                }else{
                    window.alert("Contraseña incorrecta")
                }
            }
        }
    }

    
    
}







