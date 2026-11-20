# SURCO · Tienda de vinilos (versión con Programación Orientada a Objetos)

Tienda online ficticia de discos de vinilo hecha con **HTML, CSS y JavaScript vanilla** (sin frameworks ni librerías), organizada con **clases y objetos** y dividida en **módulos ES**.

## Objetivo del proyecto

> **Este proyecto se ha hecho para practicar Programación Orientada a Objetos (POO) en JavaScript.**

Es la misma tienda que la versión basada en funciones, pero con otra **arquitectura**:

- **Versión anterior:** módulos que exportan **funciones** (programación procedimental/funcional).
- **Esta versión:** módulos que exportan **clases**. Cada clase tiene sus datos (atributos) y su comportamiento (métodos), y los objetos se comunican entre sí.

Los módulos ES (`import` / `export`) se siguen usando, pero ahora **cada archivo contiene una clase** en lugar de un conjunto de funciones.

## Qué hace la tienda

- Muestra un **catálogo de 6 discos** en tarjetas.
- **Filtra por género:** Todos, Electrónica, Rock, Jazz y Folk.
- **Añade discos a la cesta**, con el botón cambiando a "Añadido" un instante.
- **Panel lateral de la cesta** con botones **+**, **−** y **Quitar**.
- Calcula **contador** y **total** en euros (formato `24,90 €`).
- **Finalizar pedido** (demo): vacía la cesta y muestra un aviso.
- Avisos emergentes (*toast*) y botones de desplazamiento a secciones.

> La cesta vive en memoria: al recargar la página se vacía.

## Cómo ejecutarlo

Los módulos ES **no funcionan abriendo el HTML con doble clic** (`file://`). Hay que servir la carpeta con un servidor local:

```bash
# Opción 1: extensión Live Server de VS Code (botón "Go Live")

# Opción 2: Python
python -m http.server 8000

# Opción 3: PHP
php -S localhost:8000
```

Después abre `http://localhost:8000`.

El HTML carga un único script de entrada:

```html
<script type="module" src="js/main.js"></script>
```

## Estructura del proyecto

```
├── index.html
├── css/
│   └── styles.css
└── js/
    ├── main.js              # Punto de entrada: crea la App y la arranca
    ├── App.js               # Clase principal: conecta modelos y vistas
    ├── data.js              # Datos en bruto de los discos
    ├── models/              # Datos y lógica (no saben nada del DOM)
    │   ├── Product.js
    │   ├── Catalog.js
    │   └── Cart.js
    └── views/               # Pintan en la página (DOM)
        ├── CatalogView.js
        ├── CartView.js
        └── Toast.js
```

> Si en tu carpeta los archivos se llaman `main_1.js` o `data_1.js`, renómbralos a `main.js` y `data.js`.

## Las clases y su misión

| Clase | Carpeta | Misión |
|---|---|---|
| `Product` | `models/` | Representa **un disco**: título, artista, género, precio. Da el precio formateado y el nombre del género |
| `Catalog` | `models/` | **Colección de productos** y filtro de género activo. Sabe qué discos son visibles y busca por `id` |
| `Cart` | `models/` | **Lógica de la cesta**: añadir, cambiar cantidad, quitar, vaciar. Calcula contador y total |
| `CatalogView` | `views/` | **Pinta la rejilla** de discos a partir del `Catalog` |
| `CartView` | `views/` | **Pinta el panel de la cesta** a partir del `Cart` y lo abre/cierra |
| `Toast` | `views/` | Muestra **avisos temporales** |
| `App` | raíz de `js/` | **Clase principal**: crea los objetos y conecta modelos con vistas escuchando los clics |

### Quién usa a quién

```
main.js ──► App
             ├── Catalog ──► Product
             ├── Cart    ──► Product
             ├── CatalogView ──► Catalog
             ├── CartView    ──► Cart
             └── Toast
```

### Separación de responsabilidades

- **Modelos** (`Product`, `Catalog`, `Cart`): guardan datos y lógica. **No tocan el DOM**, así que podrían reutilizarse en otro proyecto.
- **Vistas** (`CatalogView`, `CartView`, `Toast`): **solo pintan** en la página lo que les dan los modelos.
- **`App`**: hace de coordinadora. Escucha los clics, modifica los modelos y le pide a las vistas que se repinten.

Es una organización muy parecida al patrón **MVC** (modelo-vista-controlador), con `App` haciendo de controlador.

## Conceptos de POO que se practican

| Concepto | Dónde se ve |
|---|---|
| **Clases y objetos** | `class Product`, `new Catalog(...)`, `new Cart()`, `new App()` |
| **Constructor** | `Product` recibe sus datos; `Catalog` convierte los datos en bruto en objetos `Product` |
| **Atributos privados (`#`)** | `#items` en `Cart`, `#products` y `#activeGenre` en `Catalog`, `#timer` en `Toast` |
| **Encapsulación** | Desde fuera no se puede tocar `#items` directamente; solo a través de `add()`, `remove()`, `changeQty()`, `clear()` |
| **Métodos privados (`#`)** | `#bindFilters()`, `#bindCart()`... en `App` |
| **Getters (`get`)** | `cart.total`, `cart.count`, `cart.isEmpty`, `product.priceLabel`, `catalog.visible` |
| **Miembros estáticos (`static`)** | `Product.GENRE_LABELS` y `Product.formatPrice()`: pertenecen a la clase, no a cada objeto |
| **Composición** | `App` *tiene* un `Catalog`, un `Cart`, vistas y un `Toast`; `Cart` guarda objetos `Product` |
| **Responsabilidad única** | Cada clase hace una sola cosa |
| **Delegación de eventos** | Un único listener en la rejilla y en la cesta, con atributos `data-action` |

> Aquí **no hay herencia** (`extends`) ni polimorfismo: el proyecto se centra en clases, encapsulación y composición.

## Comparación con la versión de funciones

| | Versión con funciones | Versión con POO |
|---|---|---|
| Unidad del módulo | Conjunto de funciones | Una clase |
| Estado de la cesta | Variable `cesta` suelta en `cart.js` | Atributo privado `#items` dentro de `Cart` |
| Acceso a los datos | Funciones exportadas (`obtenerCesta()`) | Getters y métodos del objeto |
| Producto | Objeto literal `{ id, titulo... }` | Instancia de la clase `Product` con sus métodos |
| Quién conecta todo | `main.js` | Clase `App` |
| Protección de datos | Ninguna | Atributos privados `#` |

## Cómo modificar el proyecto

**Añadir un disco nuevo:** agrega un objeto a `rawProducts` en `js/data.js`:

```js
{ id:7, title:"Nuevo disco", artist:"Grupo", genre:"rock", price:20.00, cls:"c1" }
```

**Añadir un género nuevo:** crea su botón (`data-genre`) en `index.html` y añade su nombre en `Product.GENRE_LABELS`.

**Cambiar el formato del precio:** edita `Product.formatPrice()`.

## Ideas para ampliar

- Guardar la cesta en `localStorage` (una clase `Storage` o un método en `Cart`).
- Crear una clase `CartItem` para representar cada línea de la cesta en lugar de `{ product, qty }`.
- Añadir **herencia**: por ejemplo, `Vinyl` y `CD` que extiendan de `Product`.
- Escapar el texto antes de usar `innerHTML` (con datos externos habría riesgo de XSS).
- Cargar los productos desde un JSON o una API con `fetch`.
- Pasar el proyecto a un framework (Angular, React) y comparar.

## Licencia

Proyecto educativo de práctica. Tienda ficticia, sin fines comerciales.
