#Manual de Usuario
Bienvenido usuario, este es un pequeño recorrido de la funcionalidad del programa.
##Administrador:
Al entrar a la página se mostrará la ventana de login
<image src="./Images/Login.JPG" alt="Descripción de la imagen" width ="400px">
En está ventana podrá realizar su respectivo login ("Ojo, sino ha cargado ningún alumno no podrá entrar a la ventana de usuario").
<image src="./Images/Admin.JPG" alt="Descripción de la imagen" width = "400px">
Al logearse como administrador se verá de la siguiente forma la ventana del administrador, en ella podrá realizar la carga masiva de alumnos, con un respectivo archivo json.

<image src="./Images/Cargado.JPG" alt="Descripción de la imagen" width = "400px">

Una vez cargado el archivo, se cargará un reporte con un árbol AVL, y así mismo el administrador será libre de elegir en que orden será mostrado.

##Usuario

Al logearse el usuario se abrirá una ventana de la siguiente forma:

<image src="./Images/Usuario.JPG" alt="Descripción de la imagen" width = "420px">

En esta ventana se podrán realizar diferentes acciones, se explicarán algunas de ellas:
####Crear Carpeta

<image src="./Images/Crear.JPG" alt="Descripción de la imagen" width = "420px">

En la parte de crear carpeta podrá realizar múltiples creaciones de carpetas, para saber donde se creará la carpeta, el programa toma la ruta actual que se mira a la par del botón buscar, por defecto la ruta actual será "/", siempre y cuando la ruta sea válida podrá crear múltiples carpetas, como por ejemplo si se crea la carpeta documentos en la raíz, podrá acceder a esta de la siguiente forma: "/Documentos", y así con las otras carpetas.

El botón de buscar le mostrará los arcchivos y carpetas creadas del directorio actual.

####Eliminar Carpeta

Al igual que la función buscar, si se quiere eliminar una carpeta, la carpeta será buscada en el directorio que se encuentra actualmente, siempre y cuando la carpeta exista.

####Subir archivos y otorgar permisos
Para la parte de subir archivos, serán validos los archivos con extensión "jpg,png,jpeg,pdf,txt".
Se podrán otorgar permisos a diferentes usuario que esten registrados en la plataforma, los permisos válidos serán r, w , r-w.

####Reportes
Para la parte de reportes se generarán imágenes realizadas en graphviz, esta información será ampliada en el manual técnico.

<image src="./Images/Reporte.JPG" alt="Descripción de la imagen" width = "420px" height = "400px">


Muchas gracias por usar la aplicación usuario :).