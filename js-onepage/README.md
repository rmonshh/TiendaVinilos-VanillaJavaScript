Cómo se escribe algo así desde cero;

Nadie parte de las funciones, se parte de la pantalla. Un método que funciona:

1. Lista lo que puede hacer el usuario. Aquí: ver discos, filtrar por género, añadir a la cesta, cambiar cantidad, quitar, finalizar.

2. Pregúntate qué datos hay que recordar. Solo dos cosas cambian con el tiempo: la cesta (cart) y el filtro (activeGenre). Los productos son fijos. Todo lo demás se deriva de eso (el total, el contador).

3. Escribe primero lo estático. El HTML y el CSS con datos falsos, sin JS.

4. Añade una acción cada vez. Empieza por la más simple: dibujar los discos. Comprueba que funciona. Luego el filtro. Luego añadir a la cesta. Nunca escribas las 7 funciones de golpe.

5. Cada función hace una cosa. Si al nombrarla necesitas una "y" ("añade Y repinta Y avisa"), probablemente son dos.

La regla de fondo es dato → función que lo cambia → función que lo dibuja. Todo este código sigue ese patrón, y en cuanto lo ves, se ordena.