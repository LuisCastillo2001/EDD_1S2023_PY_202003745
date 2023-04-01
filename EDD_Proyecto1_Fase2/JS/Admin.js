

//Funciones adicionales

function Salir(){
    let localización = window.location.href.replace("Admin.html","Login.html")
    console.log(localización)
    window.location.href = localización
}








//árbol AVL

class nodoArbol {
  constructor(nombre,carnet,contraseña,carpeta_raiz){
      this.izquierdo = null;
      this.derecho = null;
      this.carnet = carnet;
      this.nombre = nombre;
      this.carpeta_raiz = carpeta_raiz
      this.contraseña = contraseña
      this.nario = null
      this.altura = 1;
      this.factor_equilibrio = 0;
  }
}


class ArbolAVL {
  constructor(){
      this.raiz = null;
  }

  Altura(raiz){
    return raiz === null ? 0: raiz.altura
  }

  Equilibrio(raiz){
      return raiz === null ? 0: (this.Altura(raiz.derecho)-this.Altura(raiz.izquierdo))
  }


  RotacionI(raiz){ 
    let raiz_derecho = raiz.derecho 
    let hijo_izquierdo = raiz_derecho.izquierdo
    raiz_derecho.izquierdo = raiz 
    raiz.derecho = hijo_izquierdo 
    raiz.altura = 1 + Math.max(this.Altura(raiz.izquierdo),this.Altura(raiz.derecho))
    raiz_derecho.altura = 1 + Math.max(this.Altura(raiz_derecho.izquierdo),this.Altura(raiz_derecho.derecho))
    raiz.factor_equilibrio = this.Equilibrio(raiz)
    raiz_derecho.factor_equilibrio = this.Equilibrio(raiz_derecho)
    return raiz_derecho
  }


  RotacionD(raiz){
    let raiz_izquierdo = raiz.izquierdo
    let hijo_derecho = raiz_izquierdo.derecho
    raiz_izquierdo.derecho = raiz
    raiz.izquierdo = hijo_derecho
    raiz.altura = 1 + Math.max(this.Altura(raiz.izquierdo),this.Altura(raiz.derecho))
    raiz_izquierdo.altura = 1 + Math.max(this.Altura(raiz_izquierdo.izquierdo),this.Altura(raiz_izquierdo.derecho))
    raiz.factor_equilibrio =  this.Equilibrio(raiz)
    raiz_izquierdo.factor_equilibrio = this.Equilibrio(raiz_izquierdo)
    return raiz_izquierdo
  }




  insertarNodo(nodo, raiz){
    if(raiz === null){
        raiz = nodo;
    }else{
        if(raiz.carnet === nodo.carnet){
            raiz.carnet = nodo.carnet
        }else if(raiz.carnet < nodo.carnet){      
            raiz.derecho = this.insertarNodo(nodo, raiz.derecho)
        }else{
            raiz.izquierdo = this.insertarNodo(nodo, raiz.izquierdo)
        }
    }

    raiz.altura = 1 + Math.max(this.Altura(raiz.izquierdo),this.Altura(raiz.derecho))
    let balanceo = this.Equilibrio(raiz) 
    raiz.factor_equilibrio = balanceo
  
    if(balanceo > 1 && nodo.carnet > raiz.derecho.carnet){
        return this.RotacionI(raiz)
    }
    
    if(balanceo < -1 && nodo.carnet < raiz.izquierdo.carnet){
        return this.RotacionD(raiz)
    }
    
    if(balanceo > 1 && nodo.carnet < raiz.derecho.carnet){
        raiz.derecho = this.RotacionD(raiz.derecho)
        return this.RotacionI(raiz)
    }
    
    if(balanceo < -1 && nodo.carnet > raiz.izquierdo.carnet){
        raiz.izquierdo = this.RotacionI(raiz.izquierdo)
        return this.RotacionD(raiz)
    }
    
    return raiz;
}


  grafica_arbol(){
          var cadena = "";
          if(!(this.raiz === null)){
              cadena = "digraph arbol{ ";
              cadena = cadena + this.retornarValoresArbol(this.raiz, 0);
              cadena = cadena + "}";
          }else{
              cadena = "No hay valores en el arbol";
          }
          return cadena;
    }


  retornarValoresArbol(raiz, id){
    var cadena = "";
    var numero = id + 1;
    if(!(raiz === null)){
        cadena += "\"";
        cadena += raiz.carnet;
        cadena+= "\\n"+raiz.nombre;
        cadena += "\" ;";
        if(!(raiz.izquierdo === null) && !(raiz.derecho === null)){
            cadena += " x" + numero + " [label=\"\",width=.1,style=invis];"
            cadena += "\"";
            cadena += raiz.carnet;
            cadena+= "\\n"+raiz.nombre;
            cadena += "\" -> ";
            cadena += this.retornarValoresArbol(raiz.izquierdo, numero)
            cadena += "\"";
            cadena += raiz.carnet;
            cadena+= "\\n"+raiz.nombre;
            cadena += "\" -> ";
            cadena += this.retornarValoresArbol(raiz.derecho, numero)
            cadena += "{rank=same" + "\"" + raiz.izquierdo.carnet +"\\n"+raiz.izquierdo.nombre+"\"" + " -> " + "\"" + raiz.derecho.carnet +"\\n"+raiz.derecho.nombre+ "\""  + " [style=invis]}; "
        }else if(!(raiz.izquierdo === null) && (raiz.derecho === null)){
            cadena += " x" + numero + " [label=\"\",width=.1,style=invis];"
            cadena += "\"";
            cadena += raiz.carnet;
            cadena+= "\\n"+raiz.nombre;
            cadena += "\" -> ";
            cadena += this.retornarValoresArbol(raiz.izquierdo, numero)
            cadena += "\"";
            cadena += raiz.carnet;
            cadena+= "\\n"+raiz.nombre;
            cadena += "\" -> ";
            cadena += "x" + numero + "[style=invis]";
            cadena += "{rank=same" + "\"" + raiz.izquierdo.carnet +"\\n"+raiz.izquierdo.nombre +"\"" + " -> " + "x" + numero + " [style=invis]}; "
        }else if((raiz.izquierdo === null) && !(raiz.derecho === null)){
            cadena += " x" + numero + " [label=\"\",width=.1,style=invis];"
            cadena += "\"";
            cadena += raiz.carnet;
            cadena+= "\\n"+raiz.nombre;
            cadena += "\" -> ";
            cadena += "x" + numero + "[style=invis]";
            cadena += "; \"";
            cadena += raiz.carnet;
            cadena+= "\\n"+raiz.nombre;
            cadena += "\" -> ";
            cadena += this.retornarValoresArbol(raiz.derecho, numero)
            cadena += "{rank=same" + " x" + numero + " -> \"" + raiz.derecho.carnet + "\\n"+raiz.derecho.nombre+"\"" +  " [style=invis]}; "
        }
    }
    return cadena;
  }


  insertarAlumno(nombre,carnet,contraseña,carpeta_raiz){
    const nuevoNodo = new nodoArbol(nombre,carnet,contraseña,carpeta_raiz);
    this.raiz = this.insertarNodo(nuevoNodo,this.raiz);
  }


  recorridoInorden(raiz){
    var cadena = ""
    if(raiz !== null){
        if(raiz.izquierdo !== null){
            cadena += this.recorridoInorden(raiz.izquierdo)
            cadena += " -> "
        }
        cadena += "\""
        cadena += raiz.carnet
        cadena += raiz.nombre
        cadena += "\""
        if(raiz.derecho !== null){
            cadena += " -> "
            cadena += this.recorridoInorden(raiz.derecho)
        }
    }
    return cadena
  }

  Eliminar(){
    this.raiz = null
  }

  Regraficar(raiz){
    this.raiz = raiz
  }


  

  

}



//Funciones fuera del AVL

const arbolBinarioAVL = new ArbolAVL();


function recorridoPreorden(raiz){
  var cadena = ""
  var contador = 0
  var tabla = document.getElementById("tabla-alumnos");
  var tbody = tabla.getElementsByTagName("tbody")[0];
  if(raiz !== null){
      cadena = cadena + "\""
      cadena = cadena + raiz.carnet
      cadena = cadena + raiz.nombre
      let row_2 = document.createElement('tr');
      let row_2_data_1 = document.createElement('td');
      row_2_data_1.innerHTML = raiz.carnet;
      let row_2_data_2 = document.createElement('td');
      row_2_data_2.innerHTML = raiz.nombre;
      row_2.appendChild(row_2_data_1);
      row_2.appendChild(row_2_data_2);
      tbody.appendChild(row_2);
      cadena = cadena + "\""
      if(raiz.izquierdo !== null){
          cadena = cadena + " -> "
          cadena = cadena + recorridoPreorden(raiz.izquierdo)
      }
      if(raiz.derecho !== null){
          cadena = cadena + " -> "
          cadena = cadena + recorridoPreorden(raiz.derecho)
      }
  }
  return cadena
}


function recorridoInorden(raiz){
  var cadena = ""
  var tabla = document.getElementById("tabla-alumnos");
  var tbody = tabla.getElementsByTagName("tbody")[0];
  if(raiz !== null){
      if(raiz.izquierdo !== null){
          cadena += this.recorridoInorden(raiz.izquierdo)
          cadena += " -> "
      }
      cadena += "\""
      cadena += raiz.carnet
      cadena += raiz.nombre
      let row_2 = document.createElement('tr');
      let row_2_data_1 = document.createElement('td');
      row_2_data_1.innerHTML = raiz.carnet;
      let row_2_data_2 = document.createElement('td');
      row_2_data_2.innerHTML = raiz.nombre;
      row_2.appendChild(row_2_data_1);
      row_2.appendChild(row_2_data_2);
      tbody.appendChild(row_2);
      cadena += "\""
      if(raiz.derecho !== null){
          cadena += " -> "
          cadena += this.recorridoInorden(raiz.derecho)
      }
  }
  return cadena
}


function recorridoPostOrden(raiz){
  var cadena = ""
  var tabla = document.getElementById("tabla-alumnos");
  var tbody = tabla.getElementsByTagName("tbody")[0];
  if(raiz !== null){
      if(raiz.izquierdo !== null){
          cadena += this.recorridoPostOrden(raiz.izquierdo)
          cadena += " -> "
      }
      if(raiz.derecho !== null){
          cadena += this.recorridoPostOrden(raiz.derecho)
          cadena += " -> "
      }
      cadena += "\""
      let row_2 = document.createElement('tr');
      let row_2_data_1 = document.createElement('td');
      row_2_data_1.innerHTML = raiz.carnet;
      let row_2_data_2 = document.createElement('td');
      row_2_data_2.innerHTML = raiz.nombre;
      row_2.appendChild(row_2_data_1);
      row_2.appendChild(row_2_data_2);
      tbody.appendChild(row_2);
      cadena += "\""
  }
  return cadena
}




function refrescarArbol(){
  let url = 'https://quickchart.io/graphviz?graph=';
  let body = arbolBinarioAVL.grafica_arbol();
  console.log(url+body)
  document.getElementById("arbol").src = url+body
  
}


const inputElement = document.getElementById("archivo");
inputElement.addEventListener("change", onChange, false);
function onChange(event) {
    var reader = new FileReader();
    reader.onload = onReaderLoad;
    reader.readAsText(event.target.files[0]);
}

function onReaderLoad(event){
    var obj = JSON.parse(event.target.result);
    for(var i = 0; i < obj.alumnos.length; i++){
        arbolBinarioAVL.insertarAlumno(obj.alumnos[i].nombre,parseInt(obj.alumnos[i].carnet),obj.alumnos[i].password,obj.alumnos[i].Carpeta_Raiz)
        
        
    }
    console.log(recorridoInorden(arbolBinarioAVL.raiz))
    localStorage.setItem("arbol",JSON.stringify(arbolBinarioAVL))
    refrescarArbol();
    

}


var dropdown = document.getElementById("my-dropdown");
var selectedOption = dropdown.options[dropdown.selectedIndex].value;
  console.log("La opción seleccionada es: " + selectedOption);
  if (localStorage.getItem("arbol")!== null){
    arbol = JSON.parse(localStorage.getItem('arbol'))
    arbolBinarioAVL.Eliminar()
    arbolBinarioAVL.Regraficar(arbol.raiz)
    refrescarArbol()
    console.log(recorridoInorden(arbolBinarioAVL.raiz))
    
  }

  

  function mostrar(){
    var dropdown = document.getElementById("my-dropdown");
    var selectedOption = dropdown.options[dropdown.selectedIndex].value;
    var miTabla = document.getElementById("tabla-alumnos");


  miTabla.getElementsByTagName("tbody")[0].innerHTML = "";
    if (selectedOption === "In-orden"){
      recorridoInorden(arbolBinarioAVL.raiz)
    }
    if (selectedOption === "Post-orden"){
      recorridoPostOrden(arbolBinarioAVL.raiz)
    }
    if (selectedOption === "Pre-orden"){
      recorridoPreorden(arbolBinarioAVL.raiz)
    }
  }
  









