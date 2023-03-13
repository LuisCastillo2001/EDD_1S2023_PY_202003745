package Estructuras

import "fmt"

type Bitacora_admin struct {
	Fecha  string
	Accion string
}

type Nodo_pila struct {
	siguiente *Nodo_pila
	bitacora  *Bitacora_admin
}

type Pila struct {
	Primero  *Nodo_pila
	Longitud int
}

func (p *Pila) EstaVacia() bool {
	if p.Longitud == 0 {
		return true
	} else {
		return false
	}
}

func (p *Pila) Apilar(fecha string, accion string) {
	nuevaAccion := &Bitacora_admin{fecha, accion}
	nuevoNodo := &Nodo_pila{nil, nuevaAccion}
	comprobacion := p.EstaVacia()
	if comprobacion {
		p.Primero = nuevoNodo
		p.Longitud++
	} else {
		nuevoNodo.siguiente = p.Primero
		p.Primero = nuevoNodo
		p.Longitud++
	}

}

func (p *Pila) MostrarPila() {
	nodoaux := p.Primero
	

	for nodoaux != nil {
		fmt.Println(nodoaux.bitacora.Accion,"   ",nodoaux.bitacora.Fecha)
		nodoaux = nodoaux.siguiente
	}

}

func (p *Pila) Graficar() {
	nombre_archivo := "./pila.dot"
	nombre_imagen := "pila.jpg"
	texto := "digraph pila{\n"
	texto += "rankdir=LR;\n"
	texto += "node[shape = record]"
	aux := p.Primero
	texto += "nodo0 [label=\""
	for aux != nil {
		texto = texto + "|" + aux.bitacora.Accion+"\\n"+aux.bitacora.Fecha
		aux = aux.siguiente
	}
	texto += "\"]; \n}"
	crearArchivo(nombre_archivo)
	escribirArchivoDot(texto, nombre_archivo)
	ejecutar(nombre_imagen, nombre_archivo)
}

func NewPila() *Pila {
	return &Pila{nil, 0}
}