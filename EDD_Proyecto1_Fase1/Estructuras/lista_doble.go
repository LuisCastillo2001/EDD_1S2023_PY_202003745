package Estructuras

import(
	"fmt"
	"strconv"
)

type Alumno_agregado struct{
	Nombre string
	Carne int
	Contraseña string
	Bitacora *Bitacora
}

type Nodo_doble struct{
	Alumno *Alumno_agregado
	siguiente *Nodo_doble
	anterior *Nodo_doble
}

type ListaDoble struct {
	Inicio   *Nodo_doble
	Final    *Nodo_doble
	Longitud int
}

type Accion struct{
	descripcion string
	fecha string
}

type NodoBitacora struct {
	
	actividad *Accion
	siguiente *NodoBitacora
}

type Bitacora struct {
	Primero  *NodoBitacora
}




func Nuevo(alumno *Alumno_agregado) *Nodo_doble {
	return &Nodo_doble{
		alumno,
		nil,
		nil,
	}
}



func (l *ListaDoble) Agregar_doble(nombre string, carne int,contraseña string,bitacora *Bitacora){
	
	nuevoAlumno := &Alumno_agregado{nombre, carne,contraseña,bitacora}
	nuevo_nodo := Nuevo(nuevoAlumno)
	if l.Inicio == nil || nuevo_nodo.Alumno.Carne > l.Inicio.Alumno.Carne {
        nuevo_nodo.siguiente = l.Inicio
        if l.Inicio != nil {
			l.Inicio.anterior = nuevo_nodo
		}
		l.Inicio = nuevo_nodo
		if l.Final == nil{
			l.Final = nuevo_nodo
		}
		return
    }

    aux := l.Inicio
    for aux.siguiente != nil && aux.siguiente.Alumno.Carne > nuevo_nodo.Alumno.Carne {
        aux = aux.siguiente
    }

	nuevo_nodo.anterior = aux
	nuevo_nodo.siguiente = aux.siguiente

	if aux.siguiente != nil{
		aux.siguiente.anterior = nuevo_nodo
	}
	aux.siguiente = nuevo_nodo
	if nuevo_nodo.siguiente == nil{
		l.Final = nuevo_nodo
	}
}

func (l *ListaDoble) MostrarListadoble() {
    nodoaux := l.Inicio
	fmt.Println("++++Listado de estudiantes+++++")
    for nodoaux != nil {
		fmt.Println("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++")
        fmt.Println("Nombre: ",nodoaux.Alumno.Nombre,",","Carnet: ",nodoaux.Alumno.Carne,",","Contraseña: ",nodoaux.Alumno.Contraseña)
		fmt.Println("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++")
        nodoaux = nodoaux.siguiente
    }
    fmt.Println()
}

func (l *ListaDoble) Retornar_nodo(nombre string, contraseña string) *Alumno_agregado{
	aux := l.Inicio

	for aux.Alumno.Nombre != nombre || aux.Alumno.Contraseña != contraseña{
		if aux.siguiente == nil{
			return nil
		}
		aux = aux.siguiente	
	} 
	return aux.Alumno
	
}

func (b *Bitacora) Apilar(descripcion string, fecha string){
	nuevaActividad := &Accion{descripcion,fecha}
	nuevoNodo := &NodoBitacora{nuevaActividad,nil}

	if b.Primero == nil{
		b.Primero = nuevoNodo
	}else{
		nuevoNodo.siguiente = b.Primero
		b.Primero = nuevoNodo
	}
}



func (b *Bitacora) Mostrar_Bitacora(){
	aux := b.Primero

	for aux != nil{
		fmt.Println("Descripción: ",aux.actividad.descripcion,"Fecha",aux.actividad.fecha)
		aux = aux.siguiente
	}
}

func IniciarBitacora() *Bitacora{
	return &Bitacora{nil}
}


func (l *ListaDoble)Graficar(){
	nombre_archivo := "./doble.dot"
	nombre_imagen := "doble.jpg"
	texto := `digraph listaAlumnos{
    fontname="Arial,sans-serif" 
    node [fontname="Helvetica,Arial,sans-serif" shape=box style=filled fillcolor="red"] 
    layout=dot 
    label="Lista de estudiantes" 
    labelloc = t 
    edge [weight=1000 style="filled" color="blue"] 
    splines=ortho; 
    nodesep=0.6; `
	aux := l.Inicio

	for aux != nil{
		texto = texto+"\""+strconv.Itoa(aux.Alumno.Carne)+"\""+`[ 
    fillcolor="#DEDE16" 
    fontsize="13" 
    shape=plain 
    label=<<table border="0" cellborder="1" cellspacing="0" cellpadding="5">`

		alternativo := aux.Alumno.Bitacora.Graficar_Pila()

		texto = texto+alternativo

		texto = texto +`</table>> 
		]`
		aux = aux.siguiente
	}

	aux = l.Inicio
	texto = texto + "\nrank = same {"
	for aux != nil{
		
		if aux.siguiente == nil{
			texto = texto +"\""+strconv.Itoa(aux.Alumno.Carne)+"\\n"+aux.Alumno.Nombre+"\""
			break
		}else{
			texto = texto +"\""+strconv.Itoa(aux.Alumno.Carne)+"\\n"+aux.Alumno.Nombre+"\""
			texto = texto + "->"
		}
		aux = aux.siguiente
	}
	texto = texto+"}\n"

	for aux != nil{
		if aux.anterior == nil{
			texto = texto +"\""+strconv.Itoa(aux.Alumno.Carne)+"\\n"+aux.Alumno.Nombre+"\""
			break
		}else{
			texto = texto +"\""+strconv.Itoa(aux.Alumno.Carne)+"\\n"+aux.Alumno.Nombre+"\""
			texto = texto + "->"
		}
		aux = aux.anterior

	}

	aux = l.Inicio

	for aux != nil{
		texto = texto +"\n"+"\""+strconv.Itoa(aux.Alumno.Carne)+"\\n"+aux.Alumno.Nombre+"\""+"->"+"\""+strconv.Itoa(aux.Alumno.Carne)+"\""
		aux = aux.siguiente
	}
	
	texto =texto+ "}"
	crearArchivo(nombre_archivo)
	escribirArchivoDot(texto, nombre_archivo)
	ejecutar(nombre_imagen, nombre_archivo)
}



func(l *ListaDoble) Json_alumnos(){
	nombre_archivo := "./estudiantes.json"
	aux := l.Inicio
	texto := "{ \n"

	texto = texto +"       "+ "\"" + "alumnos"+"\""+":"+"["+"\n"

	for aux != nil{
		texto = texto + "            {\n"
		texto = texto + "                "+"\""+"nombre"+"\""+":"+"\""+aux.Alumno.Nombre+"\""+",\n"
		texto = texto + "                "+"\""+"carnet"+"\""+":"+strconv.Itoa(aux.Alumno.Carne)+",\n"
		texto = texto + "                "+"\""+"contraseña"+"\""+":"+"\""+aux.Alumno.Contraseña+"\""+",\n"
		texto = texto + "                "+"\""+"Carpeta raíz"+"\""+":"+"\""+"/"+"\""+"\n"
		if aux.siguiente == nil{
			texto = texto + "            }\n"
		}else{
			texto = texto + "            },\n"
		}
		aux = aux.siguiente
	}

	texto = texto + "]\n"
	texto = texto + "}\n"

	crearArchivo(nombre_archivo)
	escribirArchivoDot(texto, nombre_archivo)
	
}


func (p *Bitacora)Graficar_Pila()string{
	aux := p.Primero
	texto := ""

	if aux == nil{
		texto = texto+`<tr> <td align="center">`
		texto = texto+""+"<br/>"
		texto = texto + "\\n"
	}

	for aux != nil{
		texto = texto+`<tr> <td align="center">`
		texto = texto+ aux.actividad.descripcion+"<br/>"
		texto = texto + aux.actividad.fecha+"</td>"+"</tr>"
		texto = texto + "\\n"
		aux = aux.siguiente
	}
	
	return texto

}






func NewDoble() *ListaDoble {
	return &ListaDoble{nil,nil, 0}
}