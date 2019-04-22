# Hito7_Desarrollo_APP

## Installation

### Instalar app ionic 

- ```git clone https://github.com/HackatonTeam-CoreDumped/Hito7_Desarrollo_APP```
- ```cd Hito7_Desarrollo_APP/newsapp```
- ```npm install```

### Instalar API

- ```git clone https://github.com/HackatonTeam-CoreDumped/Hito7_Desarrollo_API```
- ```cd Hito7_Desarrollo_API```
- ```npm install```

## Iniciar servidores

#### APP
 En la carpeta ```newsapp/``` haz uso del comando ```ionic serve```
 
### API
 
 En la carpeta ```Hito7_Desarrollo_API/``` haz uso del comando ```npm run dev```

## FEATURES

- Guardar noticias a favoritos
- Mostrar noticias de diferentes paises y lenguas
- Filtrar noticias por diferentes parametros
- Login and Register *required
- Editar usuario
- Settings para guardar idioma y pais de preferencia
- Recopilación de algunos datos
- Ir a la pagina web del articulo para leerle completamente

## TAB 1

La tab 1 contiene el endpoint everything de la api NewsApi, muestra las noticias mas relevantes en el lenguaje indicado, por defecto inglés, en ajustes se puede guardar en tu modelo de usuario otro idioma o puedes utilizar los filtros para cambiar el idioma sin guardarlo en la base de datos

Puedes hacer uso de los siguientes filtros: Idioma, Ordenar por, From date, until date

## TAB 2

En la tab 2 nos encontramos las categorias, para ellos hemos hecho uso del endpoint topheadlines de la api mencionada anteriormente, nos encontramos un slider con distintas categorias y un buscador que busca mediante el endpoint everything

## TAB 3

La tab 3 está orientada al usuario, en ella aparece la imagen de perfil del usuario y los post que ha marcado como favoritos, tambien esta el boton de ajustes, editar usuario y logout

## Info


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

// HOME
1. Ciclo de articulos de api iniciadas con la función "ngOnInit()"
2. 150px antes de llegar al final se carga función "loadMoreArticles()"
3. Al hacer click en una noticia se abre una nueva tab con contenido articulo "goToArticle()"
* Las noticias están limitadas a 5 por página, por cada función se carga la siguiente página 

//CATEGORÍAS actualización
1. ngOnInit() para no tener que darle a "CATEGORIES" para cargar la página
2. En loadArticles por categoria guardamos la categoria en "savecategory"
 para que el infinite scroll cargue noticias de la misma categoría en la que estas.
