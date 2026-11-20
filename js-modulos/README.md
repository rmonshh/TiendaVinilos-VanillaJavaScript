# SURCO · Tienda de vinilos (JavaScript vanilla con módulos)

Pequeña tienda online de discos hecha **solo con HTML, CSS y JavaScript**, sin frameworks ni librerías.

## Objetivo del proyecto

> **Este proyecto se ha hecho para practicar módulos en JavaScript.**

El objetivo principal es aprender a **dividir una aplicación en varios archivos (módulos ES)** usando `import` y `export`, de forma que cada archivo tenga una única misión.

Puntos importantes:

- **Cada módulo es un conjunto de funciones.** Los archivos exportan funciones (y datos) que otros archivos importan y utilizan.
- **No es Programación Orientada a Objetos (POO).** No hay clases, ni `new`, ni `this`, ni métodos de objeto. Es programación **procedimental/funcional con módulos**.
- Los únicos "objetos" que aparecen son datos simples (por ejemplo, cada disco `{ id, titulo, artista... }`), no objetos con comportamiento.
- Es un paso intermedio: primero se aprende a **organizar el código en módulos con funciones**, y más adelante se puede dar el salto a **POO** (clases) comparando ambas versiones.

## Qué hace

- Muestra un **catálogo de discos** en tarjetas.
- **Filtra por género** (Electrónica, Rock, Jazz, Folk).
- **Añade discos a la cesta** y cambia el botón a "Añadido" un instante.
- Panel lateral de la **cesta** con botones **+**, **−** y **Quitar**.
- Calcula el **contador** y el **total** en euros (formato español: `24,90 €`).
- **Finalizar pedido** (demo): vacía la cesta y muestra un aviso.
- Avisos emergentes (*toast*) y botones de desplazamiento a secciones.

> La cesta vive en memoria: si recargas la página, se vacía.

## Cómo ejecutarlo

Los módulos ES (`type="module"`) **no funcionan abriendo el HTML con doble clic** (`file://`): el navegador bloquea los `import`. Hay que servir la carpeta desde un servidor local, por ejemplo:

```bash
# Opción 1: extensión Live Server de VS Code (botón "Go Live")

# Opción 2: Python
python -m http.server 8000

# Opción 3: PHP
php -S localhost:8000
```

Después abre `http://localhost:8000`.

El HTML debe cargar solo el archivo principal:

```html
<script type="module" src="js/main.js"></script>
```

## Estructura de los módulos

```
js/
├── main.js      # Punto de entrada: conecta los clics con las acciones
├── data.js      # Datos: lista de discos y nombres de género
├── cart.js      # Lógica de la cesta (sin tocar la página)
├── cartUI.js    # Dibuja la cesta y abre/cierra el panel
├── catalog.js   # Dibuja las tarjetas y aplica el filtro
├── toast.js     # Aviso temporal en pantalla
└── utils.js     # Funciones de ayuda (formato de precio)
```

El proyecto incluye además el `index.html` y la hoja de estilos CSS.

### Qué hace cada archivo

| Archivo | Misión | Exporta |
|---|---|---|
| `data.js` | Guardar la información de la tienda | `productos`, `nombreGenero()` |
| `utils.js` | Funciones pequeñas reutilizables | `formatearPrecio()` |
| `cart.js` | Guardar qué hay en la cesta y cuántos | `obtenerCesta()`, `contarDiscos()`, `calcularTotal()`, `agregarProducto()`, `sumarUno()`, `restarUno()`, `quitarProducto()`, `vaciarCesta()` |
| `catalog.js` | Pintar el catálogo y filtrar | `pintarCatalogo()`, `cambiarGenero()` |
| `cartUI.js` | Mostrar la cesta en la página | `pintarCesta()`, `abrirCesta()`, `cerrarCesta()` |
| `toast.js` | Mostrar avisos | `mostrarAviso()` |
| `main.js` | Decidir qué pasa en cada clic | — |

### Quién importa a quién

```
main.js ──► cart.js ──► data.js
   │
   ├──────► catalog.js ──► data.js, utils.js
   ├──────► cartUI.js ───► cart.js, utils.js
   └──────► toast.js
```

La idea principal: **`cart.js` solo maneja datos**, **`catalog.js` y `cartUI.js` solo pintan**, y **`main.js` los conecta**. Separar así las responsabilidades hace el código más fácil de leer y de modificar.

## Conceptos que se practican

- **Módulos ES con funciones**: `export`, `import`, un archivo = una responsabilidad (sin clases ni POO).
- **Arrays de objetos** y recorridos con `for`.
- **DOM**: `getElementById`, `querySelectorAll`, `classList`, `textContent`, `innerHTML`.
- **Atributos `data-*`**: `data-id`, `data-genre`, `data-scroll`, `data-toast`.
- **Delegación de eventos**: un solo listener en la rejilla o en la lista de la cesta atiende botones que se crean y se borran dinámicamente.
- **Estado y repintado**: cada cambio en la cesta termina llamando a `pintarCesta()`.
- **Temporizadores**: `setTimeout` y `clearTimeout` (avisos y botón "Añadido").
- **Formato de números**: `toFixed()` y `replace()`.

## Cómo modificar el proyecto

**Añadir un disco nuevo**: agrega un objeto a `productos` en `data.js`:

```js
{ id: 7, titulo: "Nuevo disco", artista: "Grupo", genero: "rock", precio: 20.00, color: "c1" }
```

**Añadir un género nuevo**: crea su botón de filtro en el HTML (con `data-genre`) y añade su nombre en `nombreGenero()` de `data.js`.

**Cambiar el formato del precio**: edita `formatearPrecio()` en `utils.js`.

## Ideas para ampliar

- Guardar la cesta en `localStorage` para que sobreviva a recargar la página.
- Sustituir los `for` por `map`, `filter`, `find` y `reduce`.
- Añadir un buscador por título o artista.
- Escapar el texto antes de usar `innerHTML` (los datos actuales son propios, pero con datos externos habría riesgo de XSS).
- Cargar los productos desde un archivo JSON o una API con `fetch`.
- Pasar el proyecto a **POO** (clases como `Cesta` o `Producto`) y comparar con esta versión basada en funciones.
- Pasar el proyecto a un framework (Angular, React) y comparar.

## Licencia

Proyecto educativo de práctica.