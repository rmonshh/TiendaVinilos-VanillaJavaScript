# SURCO · Tienda de vinilos (versión one-page, todo en un solo fichero)

Tienda online ficticia de discos de vinilo, hecha con **HTML, CSS y JavaScript vanilla** (sin frameworks ni librerías), donde **todo el código está dentro de un único archivo**: `surco-tienda-vinilos_vanilla.html`.

## Objetivo: un ejemplo ilustrativo

Este proyecto es **solo un ejemplo ilustrativo**. Sirve para mostrar que:

- **Se puede escribir HTML, CSS y JavaScript de una web en un mismo fichero.**
- El navegador no necesita más: basta con abrir el `.html` y la web funciona.

> ⚠️ **Esto NO es una buena práctica.** En un proyecto real se separa el código en archivos distintos (`index.html`, `estilos.css`, `app.js`, o mejor aún, módulos). Aquí se junta todo únicamente para fines didácticos.

### Cómo está organizado el archivo

| Parte | Etiqueta | Contenido |
|---|---|---|
| **HTML** | `<body>` | Estructura: cabecera, portada, catálogo, "nosotros", pie de página, panel de la cesta y aviso (toast) |
| **CSS** | `<style>` dentro de `<head>` | Todo el aspecto visual: variables en `:root`, rejilla, tarjetas, panel lateral, animaciones |
| **JavaScript** | `<script>` al final del `<body>` | Datos de los discos, catálogo, filtros, cesta, panel lateral y avisos |

Además, el HTML usa atributos `onclick="..."` para enlazar botones con funciones y algún `style="..."` en línea: otra forma de mezclar capas que tampoco se recomienda en proyectos reales.

## Qué hace la tienda

- **Es una sola página (one-page):** no hay otras páginas ni recargas. El menú (Catálogo, Nosotros, Contacto) lleva por anclas (`#catalogo`, `#nosotros`, `#contacto`) a secciones de la misma página.
- Muestra un **catálogo de 6 discos** en tarjetas.
- **Filtra por género:** Todos, Electrónica, Rock, Jazz y Folk.
- **Añade discos a la cesta**, con el botón cambiando a "Añadido" un instante.
- **Panel lateral de la cesta** con botones **+**, **−** y **Quitar**.
- Calcula **contador** y **total** en euros (formato `24,90 €`).
- **Finalizar pedido** (demo): vacía la cesta y muestra un aviso.
- Avisos emergentes (*toast*) y botón de novedades de la newsletter.

> La cesta vive en memoria: al recargar la página se vacía. Los datos de los discos están escritos directamente en el JavaScript.

## Cómo ejecutarlo

No necesita instalación ni servidor. Basta con **abrir el archivo en el navegador** (doble clic) o usar Live Server en VS Code.

Para ver las tipografías (Space Grotesk y Lora) hace falta conexión a internet, porque se cargan desde Google Fonts. Sin conexión, la web funciona igual con tipografías del sistema.

## Funciones de JavaScript

| Función | Qué hace |
|---|---|
| `renderGrid()` | Dibuja las tarjetas del catálogo según el género activo |
| `addToCart(id, btn)` | Mete un disco en la cesta o suma 1 si ya estaba |
| `changeQty(id, delta)` | Sube o baja la cantidad; si llega a 0, lo quita |
| `removeItem(id)` | Quita un disco de la cesta, sea cual sea su cantidad |
| `updateCartUI()` | Redibuja la lista de la cesta, el total y el contador |
| `checkout()` | Simula la finalización del pedido |
| `openDrawer()` / `closeDrawer()` | Abre y cierra el panel de la cesta |
| `showToast(msg)` | Muestra un aviso temporal |

## Qué se practica

- Estructura de una página **HTML** semántica (`header`, `section`, `footer`, `aside`).
- **CSS** con variables (`:root`), rejilla (grid), flexbox y panel lateral desplegable.
- **JavaScript**: arrays de objetos, `map`, `filter`, `find`, `reduce`, plantillas de texto (`` ` ` ``) y manipulación del DOM.
- **Eventos**: `addEventListener`, delegación de eventos en los filtros y `onclick` en línea.
- Navegación **one-page** con anclas y `scrollIntoView()`.

## Cómo mejorarlo (lo que se haría en un proyecto real)

1. Separar el CSS en `estilos.css` y enlazarlo con `<link rel="stylesheet">`.
2. Separar el JavaScript en `app.js` y cargarlo con `<script src="...">`.
3. Dividir el JavaScript en **módulos** (`import` / `export`), como en la versión modular de este mismo proyecto.
4. Sustituir los `onclick` en línea por `addEventListener`.
5. Guardar la cesta en `localStorage`.

## Licencia

Proyecto educativo de práctica. Tienda ficticia, sin fines comerciales.
