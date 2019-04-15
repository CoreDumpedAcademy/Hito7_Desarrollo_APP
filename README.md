# Hito7_Desarrollo_APP

//SLIDER categorías

1. Dentro de tab2.page.ts tenemos un array de categorias para crear slides 
2. En tab2.page.html creamos el slider y dentro un bucle de cat of categories con imagenes
 . Los banners están hechos en photoshop (el archivo no está en el proyecto) y las imágenes guardadas en assets.
3. Para la cofiguración del slider tenemos un array de atributos en tab2.page.ts sliderConfig.

//CONEXIÓN IONIC-API
----Parte común a toda la app-----
1. Crear news services (para conexión nuestra API)
 . Importar HttpClienModule y HttpClient
 . En news.service.ts, dentro de la clase NewsService he definido readNews(), devuelve la respuesta al get.

2. Añadir HttpClientModule a imports de app.module.ts

----Dentro de cada componente------
3. Dentro de nombre.page.ts donde queramos usar los datos, importar clase NewsService

---Tab2----
	. Variable news donde guardamos respuesta función ionViewDidLoad() que recibe info de readNews()
 	. Para lectura en tab2.page.html bucle article of news.response.articles

//FUNCIONALIDAD leer noticias por categoría
1. Nueva función en news.service.ts "readCategory(category)" recibe el nombre de la categoria y sustituye el valor en la ruta 
2. Dentro tab2.page.ts, añadimos categoría "general" a array categories y con esta se hará la primera llamada (antes de darle a una categoría)
3.  Modificada función "ionViewDidLoad(categories)" para recibir categoría necesaria en función "readCategory(category)" devuelve data.
4. Dentro de tab2.page.html llamada a la función cuando se hace click en slide con valor categories igual a categoría de la slide.

