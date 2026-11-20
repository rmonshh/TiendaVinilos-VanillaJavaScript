# SURCO · Una tienda, tres arquitecturas

La misma tienda de vinilos ficticia, escrita **tres veces** con HTML, CSS y JavaScript vanilla (sin frameworks) para comparar cómo influye la organización del código.

| Versión | Qué muestra |
|---|---|
| **One-page** | Todo en un solo fichero (ejemplo ilustrativo, no es buena práctica) |
| **Módulos con funciones** | Módulos ES (`import` / `export`) donde cada archivo exporta funciones, sin POO |
| **Módulos con POO** | Módulos ES donde cada archivo contiene una clase |

Orden recomendado: **one-page → módulos con funciones → módulos con POO**.

Las tres versiones tienen la misma funcionalidad: catálogo, filtro por género, cesta con cantidades y total, y aviso emergente. Así se puede comparar el código sin que cambie lo que hace la web.

---

## ¿Funciones o POO? No hay una "buena práctica" única

> **POO no es "más buenas prácticas" que las funciones.** En JavaScript las dos son válidas y se mezclan. Lo que cuenta es el **tamaño del problema** y **qué estás modelando**.

De hecho, la tendencia actual en JavaScript va más hacia **módulos y funciones** que hacia clases. Es una herramienta distinta para cada problema, no una mejor que la otra.

---

## Qué se usa en la práctica

| Contexto | Estilo predominante |
|---|---|
| **React** | Funciones (componentes y *hooks*). Las clases están casi abandonadas |
| **Vue 3** | Funciones (Composition API) |
| **Angular** | Clases (componentes, servicios, decoradores) |
| **Node/Express, utilidades y scripts** | Funciones y módulos |
| **Librerías** (lodash, date-fns...) | Funciones |
| **Java, C#, PHP con framework** | Clases (es su forma natural) |

Esto tiene una consecuencia práctica para este proyecto:

- La versión **con clases** es una buena preparación para **Angular**.
- La versión **con funciones** es una buena preparación para **React**.

---

## Cuándo usar funciones

- Proyectos **pequeños o medianos**.
- Cuando solo **transformas datos**: formatear un precio, filtrar, calcular un total.
- Cuando el **estado es simple** y no hay muchas "cosas" con comportamiento propio.
- Cuando quieres **menos código y menos ceremonia**: sin `class`, `new`, `this` ni `#`.

## Cuándo compensa usar POO

- Hay **entidades claras** con datos y comportamiento juntos (`Cart`, `Product`, `Usuario`, `Pedido`).
- Necesitas **proteger el estado** (atributos privados) para que solo se modifique mediante métodos.
- Vas a tener **muchas instancias** del mismo tipo.
- Hay **herencia o polimorfismo** real (por ejemplo, `Vinyl` y `CD` extendiendo `Product`).
- El proyecto es **grande**, lo mantienen varias personas y quieres que cada clase tenga una responsabilidad clara.

---

## Resumen comparativo

| | Funciones | POO |
|---|---|---|
| Unidad del módulo | Conjunto de funciones | Una clase |
| Estado | Variables del módulo | Atributos de la clase (pueden ser privados con `#`) |
| Protección de datos | Ninguna | Encapsulación con `#` |
| Cantidad de código | Menos | Más (constructor, getters, `new`...) |
| Mejor para | Transformar datos, proyectos pequeños | Entidades con comportamiento, proyectos grandes |
| Relacionado con | React, Vue 3, Node | Angular, Java, C# |

---

## Aplicado a SURCO

**Para una tienda así de pequeña, la versión con funciones es suficiente** y es más sencilla. La versión con POO está algo "sobredimensionada" para lo que hace, y es normal: su valor es **didáctico**. Permite ver cómo se separan modelos y vistas y cómo se encapsula el estado.

Hay una limitación en el ejemplo: la clase `Product` casi solo guarda datos y formatea el precio, así que podría ser un objeto simple. En cambio, `Cart` sí justifica una clase, porque protege `#items` y ofrece métodos claros (`add`, `remove`, `changeQty`, `clear`).

---

## Mensaje para el alumnado

> **No es "funciones o POO": es una herramienta distinta para cada problema.**
> Primero aprendes a organizar con módulos y funciones. Después, POO te da encapsulación y estructura cuando el proyecto crece. Y los frameworks (React, Angular) te imponen su propia forma de organizar el código.

### Actividad propuesta

Pide al alumnado que decida, usando los criterios de este documento, **qué enfoque usaría para un proyecto nuevo** (por ejemplo, una agenda de contactos o una lista de tareas) y que **justifique su elección** por escrito:

1. ¿Qué entidades tiene el proyecto? ¿Tienen datos y comportamiento juntos?
2. ¿Hace falta proteger algún estado?
3. ¿Habrá muchas instancias del mismo tipo? ¿Hay herencia?
4. ¿Qué tamaño tendrá el proyecto?

---

## Licencia

Proyecto educativo de práctica. Tienda ficticia, sin fines comerciales.
