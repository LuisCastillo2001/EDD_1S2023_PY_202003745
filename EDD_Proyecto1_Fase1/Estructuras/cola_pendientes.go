package Estructuras

import (
	"fmt"
	"strconv"
)

type Alumno struct{
	Nombre string
	Carne int
	Contraseña string
}

type Nodo struct{
	alumno *Alumno
	siguiente *Nodo
}

type Lista_pendientes struct{
	inicio *Nodo
	Longitud int
}


func (l *Lista_pendientes) EstaVacia() bool {
	if l.Longitud == 0 {
		return true
	} else {
		return false
	}
}

func NewNodo (alumno *Alumno) *Nodo{
	return &Nodo{alumno, nil}
}

func (l *Lista_pendientes) Agregar_pendiente(nombre string, carne int,contraseña string){
	comprobacion := l.EstaVacia()
	if comprobacion{
		nuevoAlumno := &Alumno{nombre, carne,contraseña}
		l.inicio = NewNodo(nuevoAlumno)
	
		l.Longitud++
	} else{
		aux := l.inicio

		for aux.siguiente != nil{
			aux = aux.siguiente
		}
		nuevoAlumno := &Alumno{nombre,carne,contraseña}
		aux.siguiente = NewNodo(nuevoAlumno)
		aux.siguiente.siguiente = nil
		l.Longitud++

	}
}

func (lista *Lista_pendientes)Borrarpend()*Alumno{
	aux := lista.inicio
	fmt.Println("+++++Estudiantes Pendientes: ",lista.Longitud,"+++++++")
	
	var opc int	

	if lista.Longitud == 0{
		return &Alumno{"no",0,""}
	}
		for aux != nil{ 

			
			fmt.Println("Nombre: ",aux.alumno.Nombre,",","Carné: ",aux.alumno.Carne,",","Contraseña: ",aux.alumno.Contraseña,"\n")
			fmt.Println("Seleccione la acción a realizar: ")
			fmt.Println("1. Aceptar Estudiante")
			fmt.Println("2. Rechazar Estudiante")
			fmt.Println("3. Volver al menú")
			fmt.Scanln(&opc)

			if opc == 1 && lista.Longitud > 1{
				nodoaux := lista.inicio
				lista.inicio = lista.inicio.siguiente
				fmt.Println("Estudiante agregado con éxito\n")
				lista.Longitud--
				return nodoaux.alumno
			}

			if opc == 1 && lista.Longitud == 1{
				nodoaux := lista.inicio
				lista.inicio = nil
				fmt.Println("Estudiante agregado con éxito")
				fmt.Println("Ya no quedan más estudiantes pendientes\n")
				lista.Longitud--
				return nodoaux.alumno
			}

			if opc == 2 && lista.Longitud > 1{
				lista.inicio = lista.inicio.siguiente
				fmt.Println("Estudiante Rechazado con éxito\n")
				lista.Longitud--
				return &Alumno{"xd",0,""}
			}

			if opc == 2 && lista.Longitud == 1{
				lista.inicio = nil
				fmt.Println("Estudiante Rechazado con éxito")
				fmt.Println("Ya no quedan más estudiantes pendientes \n")
				lista.Longitud--
				return &Alumno{"terminar",0,""}
			}

			

			if opc == 3{
				break
			}
			aux = aux.siguiente
			
		}

			
			
		return &Alumno{"salida",0,""}
		}



func New_Lista() *Lista_pendientes {
	return &Lista_pendientes{nil, 0}
}

func (l*Lista_pendientes) Buscar_repetido(carne int) bool{
	aux := l.inicio

	for aux != nil{
		if carne == aux.alumno.Carne{
			return false
		}
		aux = aux.siguiente
		
	}
	return true
}

func MostrarLista(lista *Lista_pendientes) {
	auxiliar := lista.inicio
	for auxiliar != nil {
		fmt.Println(auxiliar.alumno.Nombre)
		fmt.Println(auxiliar.alumno.Carne)
		fmt.Println("------------------------")
		auxiliar = auxiliar.siguiente
	}
}

func (c *Lista_pendientes) Graficar() {
	nombre_archivo := "./cola.dot"
	nombre_imagen := "cola.jpg"
	texto := "digraph cola{\n"
	texto += "rankdir=LR;\n"
	texto += "node[shape = record];\n"
	texto += "nodonull2[label=\"null\"];\n"
	aux := c.inicio
	contador := 0
	if c.Longitud == 1{
		return
	}
	for aux != nil {
		texto = texto + "nodo" + strconv.Itoa(contador) + "[label=\"{" + aux.alumno.Nombre + "|"+strconv.Itoa(aux.alumno.Carne)+" }\"];\n"
		aux = aux.siguiente
		contador+=1
	}
	
	contador = 0
	aux = c.inicio
	
	for aux != nil{
		texto = texto+"nodo" + strconv.Itoa(contador) + "->nodo" + strconv.Itoa(contador+1) + ";\n"
		aux = aux.siguiente
		contador += 1
		if aux.siguiente == nil{
			break
			}
		}
	texto += "nodo" + strconv.Itoa(contador) + "->nodonull2;\n"
	texto += "}"
	crearArchivo(nombre_archivo)
	escribirArchivoDot(texto, nombre_archivo)
	ejecutar(nombre_imagen, nombre_archivo)
}

func (lista*Lista_pendientes) Retornar()string{
	str := "Hola mundo"
	return str
}







