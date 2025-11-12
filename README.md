# Pag.LJ

## 1. Planificación

El objetivo principal fue crear una aplicación web simple que sirviera como recurso informativo en un tema de interés común.

**Temática Elegida:**  
Universo Marvel. Elegimos esta temática por la riqueza de su contenido (personajes, historias, multiversos) y porque para nosotros es un tema de interés.

**Usuarios Definidos:**
- **Lector Ocasional:** Un usuario que accede a la página buscando información rápida sobre un personaje específico o una sinopsis de un cómic.
- **Fanático Consumidor:** Un usuario que explora activamente las secciones de "Multiversos" y "Equipos", buscando información detallada y las conexiones entre personajes y líneas temporales.

**Requisitos de la Aplicación (Mínimo Viable):**
- **Navegación Intuitiva:** La página principal (index.html) debe permitir acceder a las tres secciones principales (Personajes, Multiversos y Cómics) de forma clara mediante la barra de navegación (navbar).
- **Identidad Visual:** La aplicación debe cargar un icono personalizado (favicon.ico) en la pestaña del navegador para reforzar la marca.
- **Información específica:** Todas las secciones de personajes y multiversos deben tener su propia subpágina donde se amplíe información sobre estos.

---

## 2. Diseño

En este modelo, existen dos partes principales: el cliente y el servidor.


- **Cliente:**  
Es el navegador del usuario que solicita las páginas web. En este caso, cuando el usuario abre la página, el navegador solicita los archivos HTML, CSS, JavaScript e imágenes para mostrar el contenido de los distintos personajes de cómics. El cliente interpreta estos archivos y los muestra de manera interactiva.

- **Servidor:**  
Es la computadora o servicio que aloja los archivos del sitio web. El servidor se encarga de enviar los archivos solicitados por el cliente cada vez que este navega por la página. No ejecuta lógicas complejas en este caso, ya que la página de GitHub es principalmente un sitio estático.

En resumen, el cliente pide la información y el servidor la entrega. Esta separación permite que el navegador del usuario pueda mostrar la página correctamente y que el servidor pueda centralizar los archivos del sitio.

---

## 3. Despliegue

**Uso de GitHub Pages:**  

Al inicio, encontramos dificultades para comprender el funcionamiento de GitHub, como la creación de ramas, los pull requests, los merges y la incorporación del archivo index.html, ya que no sabíamos que debía seguir una estructura específica.

Con el tiempo, nos fuimos familiarizando con su estructura y su modo de funcionamiento, lo que facilitó la publicación y el mantenimiento de la página.

Al completar la estructura de las páginas de índice, Cómics y Multiversos, identificamos varios errores relacionados con rutas relativas e imágenes. Una vez corregidos estos problemas, la página quedó completamente funcional.

---

## 4. Mantenimiento

El mantenimiento incluye la gestión de errores y la planificación de futuras mejoras.

**Errores Encontrados:**
- **Rutas Relativas Incorrectas:** Inicialmente, tuvimos problemas con las rutas de las imágenes y enlaces (ej. Personajes/ironman.html) al pasar de la prueba local a GitHub Pages, ya que las rutas eran sensibles a mayúsculas y minúsculas en el servidor o algunas que eran externas luego no se podían visualizar en la página y había que pasarlas a local (descargarlas).  
- **Desfase de Estilos (CSS):** Algunos estilos tardaban en actualizarse tras un *push*.  
- **APIs:** Intentamos en dos ocasiones aplicar APIs, una de marvel y otra de GeminiAI, sin embargo era un trabajo largo y tedioso teniendo en cuenta que aún no sabemos el funcionamiento de las APIs (el instalarlas y que funcionen), llegando en un momento a tener muchos errores al momento de guardar los cambios y ni siquiera saber por qué (perdimos el control del código)

**Mejoras Futuras:**
- **Filtro de Contenido:** Implementar una barra de búsqueda funcional que permita filtrar dinámicamente los personajes en la página de índice sin necesidad de recargar, ya que el diseño de la barra existe pero no logramos que funcione.
 
- **APIs:** Lograr implementar una API funcional cuando tengamos más conocimiento al respecto.  
- **Más Contenido:**  Añadir fichas sobre más personajes, equipos y villanos, y expandir la sección de Multiversos con detalles de las Tierras alternativas (Tierra-616, Tierra-1610, etc.).
- **Accesibilidad:** Implementar la página en más de un idioma.  
- **Más Opciones de Acceso:** implementar un acceso de fandom; si eres usuario regular podrás tener una cuenta propia dentro de la página en la que puedas subir tu propia información y hacer comentarios.

---

