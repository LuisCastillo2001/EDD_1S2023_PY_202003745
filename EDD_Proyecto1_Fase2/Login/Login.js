function Redirected(){
    let usuario = document.getElementById("Usuario").value
    let contraseña = document.getElementById("Contraseña").value
    if (usuario == "admin"&& contraseña == "admin"){
       
       
        
        let localización = window.location.href.replace("Login/Login.html","admin/otro.html")
        console.log(localización)
        window.alert("No")
        window.location.href = localización
        

    }else{
        window.alert("no")
    }
}