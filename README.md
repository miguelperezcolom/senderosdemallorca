# Senderos de Mallorca

El objeto de este proyecto es migrar la web www.senderosdemallorca.com a Netlify.

Netlify es un CDN que podemos utilizar de manera gratuita, pero para ello necesitamos convertir www.senderosdemallorca.com en un sitio estático. 
Esto es, un conjunto de ficheros estáticos (html, css, js) organizados en carpetas. 

Aunque el destino vaya a ser un conjunto estático de ficheros el sitio debe ser mínimamente mantenible. El administrador debe poder añadir rutas, modificarlas, añadir nuevas secciones, etc. También debe poder cambiar la imágen de la web de manera centralizada, sin tener que ir página por página modificando el html.

Básicamente, estamos hablando de utilizar un generador de sitios estáticos (SSG). En concreto, utilizaremos Hugo (https://gohugo.io/) que es un SSG que está perfectamente soportado por Netlify y que nos permite utilizar netlify como servidor de integración continua (CI) y despliegue contínuo (CD). 

El flujo de trabajo para el administrador de la web será muy sencillo:

- edita los ficheros que desee: añadiendo una nueva ruta, modificando un artículo, añadiendo una sección, ...
- cuando el editor está satisfecho sube el cambio a GitHub
- Netlify detecta el cambio y lanza la generación del sitio web y lo publica

Naturamente hay varias variantes en este flujo de trabajo (se pueden editar los ficheros directamente en Github, se pueden utilizar ramas y pull requests, ...), dependiendo del grado de conocimiento del administrador del sitio web.

## Criterios de aceptación
Los criterios de aceptación del proyecto son:

- La web resultante no pierde ninguna funcionalidad respecto a la actual
- El SEO no resulta perjudicado. Si lo podemos mejorar mejor
- Se elimina el coste de mantenimiento de la web

## Problemas
Si bien bajarse el sitio web actual y publicarlo en Netlify ha sido una labor relativamente sencilla (ver https://elastic-bartik-b0f89c.netlify.app/), he detectado algunos puntos que necesitan resolverse antes de poder dar el trabajo por terminado:

### Cambio en las urls de las rutas
Las urls de las rutas son del tipo http://www.senderosdemallorca.com/rutas/ficha.es.html?tIte=ruta-patrimonial-urbana-por-esporles&cr=45. Netlify no permite utilizar `?` en las urls, por lo que hay que cambiar a otro esquema para las urls de las rutas.
No debería ser un problema, ya que de hecho es mejor no utilizar parámetros en las urls, pero hay que tener en cuenta el impacto que esto pueda a tener en el SEO.

### Buscador de rutas
En la web hay un buscador de rutas (http://www.senderosdemallorca.com/rutas/buscador.es.html) que, naturalmente, habrá que implementar en el lado cliente ya que con Netlify no podemos meter lógica en el servidor.

### Formulario de contacto
En la web existe una página con un formulario para contactar (http://www.senderosdemallorca.com/contacto/index.es.html). Como no tenemos lado servidor no podemos recibir y procesar esos datos. En este caso la solución seguramente pasará por crear un formulario de Google y añadir el link a dicho formulario en la página de contacto.

## Posibles mejoras
Al revisar la web hay algunos aspectos que podrían mejorarse aprovechando el esfuerzo que realizamos:

- hacer la web responsive, para mejorar su desempeño en el móvil
- parece haber algún problema con google maps, así que habrá que mirarlo y, si es necesario, cambiar a otro proveedor de mapas gratuito

## Plan de trabajo

Para el control del proyecto utilizaremos https://github.com/miguelperezcolom/senderosdemallorca/projects/1

La estimación inicial es de resolver una incidencia por fin de semana.
