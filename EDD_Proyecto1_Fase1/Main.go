package main

import (
	"fmt"
	"EDD_Proyecto1_Fase1/Estructuras"
	"bufio"
	"os"
	"encoding/csv"
	"strconv"
	"time"
	
)

var listaNueva = Estructuras.New_Lista()

var listaDoble = Estructuras.NewDoble()

var nuevaPila = Estructuras.NewPila()

func menu_Principal() {
	var opc int = 0
	for opc != 3 {
		fmt.Println("++++++++++++++++++EDD GoDrive+++++++++++++++++++++++")
		fmt.Println("+         1.Iniciar Sesión                         +")
		
		fmt.Println("+         2.Generar Json                           +")
		fmt.Println("+         3.Salir                                  +")
		fmt.Println("++++++++++++++++++++++++++++++++++++++++++++++++++++")
		fmt.Scanln(&opc)

		if opc == 1 {
			inicio_sesion()
		}

		if opc == 2{
			listaDoble.Json_alumnos()
		}
		
	}
}

func inicio_sesion() {
	fmt.Print("Ingresa tu usuario: ")
	scanner := bufio.NewScanner(os.Stdin)
	scanner.Scan()
	nombre := scanner.Text()
	fmt.Print("Ingresa tu contraseña: ")
	scanner.Scan()
	password := scanner.Text()

	if nombre == "admin" && password == "admin" {
		fmt.Println("\nEl admin fue logeado con éxito\n")
		menu_admin()
	} else{
		fmt.Println(nombre)
		comprobacion := listaDoble.Retornar_nodo(nombre,password)
	
		if comprobacion == nil{
			fmt.Println("No se encontró al usuario, por lo tanto no se inicio sesión")
		} else{
			comprobacion.Bitacora.Apilar("Se inicio sesión",fecha())
			comprobacion.Bitacora.Mostrar_Bitacora()
			listaDoble.Graficar()
		}
	}



}

func menu_admin() {
	var opc int = 0

	for opc != 5 {
		fmt.Println("++++++++++Dashboard del administrador -EDD GoDrive++++++++++")
		fmt.Println("+1.       Ver estudiantes pendientes                       +")
		fmt.Println("+2.       Ver estudiantes registrados del sistema          +")
		fmt.Println("+3.       Agregar nuevo estudiante                         +")
		fmt.Println("+4.       Carga masiva de Estudiantes                      +")
		fmt.Println("+5.       Cerrar Sesión                                    +")
		fmt.Println("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++")
		fmt.Scanln(&opc)

		switch opc{
		case 1:
			verPendientes()

		case 2:
			listaDoble.MostrarListadoble()
			
		case 3:
			agregar_alumno()

		case 4:
			cargaMasiva()

		case 6:
			nuevaPila.MostrarPila()
		}

		
	


	}
}


func agregar_alumno(){
		x := listaNueva.Retornar()
		fmt.Println(x)
		fmt.Println("+++Menú de creación de Usuario+++")
		var carne int
		var contrasena string
		scanner := bufio.NewScanner(os.Stdin)
		fmt.Print("Introduzca su nombre completo: ")
		scanner.Scan()
		nombre := scanner.Text()
		fmt.Print("Introduzca su número de carnet: ")
		fmt.Scanln(&carne)
		fmt.Print("Introduzca su contraseña: ")
		fmt.Scanln(&contrasena)
		var comprobacion = listaNueva.Buscar_repetido(carne)

		if comprobacion{
			listaNueva.Agregar_pendiente(nombre,carne,contrasena)
			fmt.Println("Estudiante agregado con éxito, se mostrará en la lista de pendientes\n")
			listaNueva.Graficar()
		}else{
			fmt.Println("El estudiante esta repetido, por favor corrobore que los datos sean correctos \n")
		}

}


func verPendientes(){

	nuevo := listaNueva.Borrarpend()

	if nuevo.Nombre == "no"{

		fmt.Println("Ya no hay más estudiantes en la lista de pendientes")
		return

	}else{

		if nuevo.Nombre != "terminar" && nuevo.Nombre != "no" && nuevo.Nombre !="xd" && nuevo.Nombre != "salida"{
			listaDoble.Agregar_doble(nuevo.Nombre,nuevo.Carne,nuevo.Contraseña, Estructuras.IniciarBitacora())
			nuevaPila.Apilar(fecha(),"Se acepto a Estudiante")
			nuevaPila.Graficar()
			listaNueva.Graficar()
		}

		if nuevo.Nombre == "xd" || nuevo.Nombre == "terminar"{
			nuevaPila.Apilar(fecha(),"Se rechazó a Estudiante")
			nuevaPila.Graficar()
			listaNueva.Graficar()
		}
		
		for nuevo.Nombre != "salida"{
			nuevo = listaNueva.Borrarpend()

			if nuevo.Nombre == "xd" || nuevo.Nombre == "terminar"{
				nuevaPila.Apilar(fecha(),"Se rechazó a Estudiante")
				nuevaPila.Graficar()
				listaNueva.Graficar()

			if nuevo.Nombre == "terminar" || nuevo.Nombre == "no" || nuevo.Nombre == "salida"{
				return
			}

			}
			if nuevo.Nombre != "terminar" && nuevo.Nombre != "no" && nuevo.Nombre !="xd" && nuevo.Nombre != "salida"{
				nuevaPila.Apilar(fecha(),"Se acepto a Estudiante")
				listaDoble.Agregar_doble(nuevo.Nombre,nuevo.Carne,nuevo.Contraseña,Estructuras.IniciarBitacora())
				nuevaPila.Graficar()
				listaNueva.Graficar()		
			}

			if listaNueva.Longitud == 0{
				fmt.Println("Ya no hay más estudiantes")
				return
			}
		}
	}
}





func cargaMasiva(){
	fmt.Println("++++Carga masiva de estudiantes++++")
	fmt.Println("Introduzca la ruta del archivo:")
	scanner := bufio.NewScanner(os.Stdin)
	scanner.Scan()
	nombre := scanner.Text()
    file, err := os.Open(nombre)
    if err != nil {
        fmt.Println(err)
    }
   
    records, err := csv.NewReader(file).ReadAll()
 
    for _, record := range records {
		
		if record[0] == "carnet"{
			continue
		}
		sv, _ :=  strconv.Atoi(record[0])
		var comprobacion = listaNueva.Buscar_repetido(sv)
		if comprobacion{
			listaNueva.Agregar_pendiente(record[1],sv,record[2])
			
		}else{
			fmt.Println("El estudiante esta repetido, por favor corrobore que los datos sean correctos \n")
		}
		
 	}
	listaNueva.Graficar()
	fmt.Println("Archivo cargado con éxito")
}



func fecha()string{
	var ahora time.Time
    ahora = time.Now()
   
    
    cadena := strconv.Itoa(ahora.Day())+"/"+strconv.Itoa(int(ahora.Month()))+"/"+strconv.Itoa(ahora.Year())+"  "+strconv.Itoa(ahora.Hour())+":"+strconv.Itoa(ahora.Minute()) 
	return cadena
}



func main() {
	menu_Principal()
}
