function Redirected(){
    let usuario = document.getElementById("Usuario").value
    let contraseña = document.getElementById("Contraseña").value
    if (usuario == "admin"&& contraseña == "admin"){
       
        
        let localización = window.location.href.replace("Login.html","Admin.html")


        console.log(localización)
        window.alert("x")
        window.location.href = localización
    }else{
        window.alert("no")
    }
}