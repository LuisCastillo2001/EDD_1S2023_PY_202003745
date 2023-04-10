# Manual de Usuario
Bienvenido usuario, este es un pequeño recorrido de la funcionalidad del programa.
## Administrador:
Al entrar a la página se mostrará la ventana de login
<image src="./Images/Login.JPG" alt="Descripción de la imagen" width ="400px">

En está ventana podrá realizar su respectivo login ("Ojo, sino ha cargado ningún alumno no podrá entrar a la ventana de usuario").
<image src="./Images/Admin.JPG" alt="Descripción de la imagen" width = "400px">

Al logearse como administrador se verá de la siguiente forma la ventana del administrador, en ella podrá realizar la carga masiva de alumnos, con un respectivo archivo json.

<image src="./Images/Cargado.JPG" alt="Descripción de la imagen" width = "400px">

Una vez cargado el archivo, se cargará un reporte con un árbol AVL, y así mismo el administrador será libre de elegir en que orden será mostrado.

## Usuario

Al logearse el usuario se abrirá una ventana de la siguiente forma:

<image src="./Images/Usuario.JPG" alt="Descripción de la imagen" width = "420px">

En esta ventana se podrán realizar diferentes acciones, se explicarán algunas de ellas:
#### Crear Carpeta

<image src="./Images/Crear.JPG" alt="Descripción de la imagen" width = "420px">

En la parte de crear carpeta podrá realizar múltiples creaciones de carpetas, para saber donde se creará la carpeta, el programa toma la ruta actual que se mira a la par del botón buscar, por defecto la ruta actual será "/", siempre y cuando la ruta sea válida podrá crear múltiples carpetas, como por ejemplo si se crea la carpeta documentos en la raíz, podrá acceder a esta de la siguiente forma: "/Documentos", y así con las otras carpetas.

El botón de buscar le mostrará los arcchivos y carpetas creadas del directorio actual.

#### Eliminar Carpeta

Al igual que la función buscar, si se quiere eliminar una carpeta, la carpeta será buscada en el directorio que se encuentra actualmente, siempre y cuando la carpeta exista.

#### Subir archivos y otorgar permisos
Para la parte de subir archivos, serán validos los archivos con extensión "jpg,png,jpeg,pdf,txt".
Se podrán otorgar permisos a diferentes usuario que esten registrados en la plataforma, los permisos válidos serán r, w , r-w.

#### Reportes
Para la parte de reportes se generarán imágenes realizadas en graphviz, esta información será ampliada en el manual técnico.

<image src="./Images/Reporte.JPG" alt="Descripción de la imagen" width = "420px" height = "400px">


Muchas gracias por usar la aplicación usuario :).

#  Manual técnico:
En esta parte se explicará la funcionalidad interna del programa.

## Arbol AVL:

Un árbol AVL es una estructura de datos en forma de árbol binario de búsqueda equilibrado, es decir, la altura de cada subárbol en el árbol está balanceada. Fue desarrollado por los matemáticos soviéticos Adelson-Velsky y Landis en 1962 y su nombre es un acrónimo de sus apellidos.

En un árbol AVL, la diferencia entre la altura de los subárboles izquierdo y derecho de cada nodo (conocida como factor de equilibrio) no puede ser mayor a 1. Si el factor de equilibrio de un nodo es mayor a 1 o menor a -1, se debe realizar una rotación para mantener el balance del árbol.

Los árboles AVL se utilizan comúnmente en aplicaciones donde se necesitan tiempos de acceso rápidos y se espera que la estructura de datos crezca con el tiempo. Debido a que están equilibrados, la búsqueda, inserción y eliminación en un árbol AVL tienen una complejidad de tiempo garantizada de O(log n), lo que los hace muy eficientes en comparación con otras estructuras de datos que no están equilibradas.

En este proyecto para realizar el almacenamiento de los estudiantes se utilizó un árbol AVL, el cuál tiene la siguiente estructura:

<image src="./Images/AVL.JPG" alt="Descripción de la imagen" width = "200px" height = "200px">

## Matriz dispersa:
Las matrices dispersas son comunes en problemas de ingeniería, ciencias y tecnología donde las matrices son grandes y contienen una gran cantidad de valores cero. Almacenar una matriz completa en memoria puede ser ineficiente y consumir demasiados recursos. Por lo tanto, para ahorrar memoria y mejorar la eficiencia del procesamiento de datos, se utiliza una matriz dispersa.

En este proyecto se hizo uso de matrices dispersas, para el almacenamiento de archivos.

## Árbol n-ario
Un árbol n-ario es una estructura de datos jerárquica en la que cada nodo puede tener hasta n hijos. Cada nodo en el árbol puede tener cero, uno o varios hijos, y estos hijos están ordenados de izquierda a derecha.

Los árboles n-arios se utilizan para representar una gran variedad de datos y estructuras en informática, como la jerarquía de archivos y directorios en un sistema de archivos, la estructura de un árbol genealógico, la representación de datos en una base de datos, entre otros.

En este proyecto se hizo uso de la estructura del árbol n-ario para el almacenamiento de carpetas.

## Diagramas de clase:
Se mostrará un pequeño ejemplo del diagrama de clase del programa:

<image src="./Images/Diagramas.JPG" alt="Descripción de la imagen" width = "500px" height = "500px">

Gracias por leer el manual técnico usuario :).
