BOGOTÁ VERDE AR - PROTOTIPO WEB CON POSTERS Y ELEMENTOS RA

QUE HAY EN ESTA CARPETA
- index.html: experiencia RA web. Abre cámara y muestra elementos digitales sobre la imagen real.
- posters_qr.html: página para imprimir los posters con QR real.
- styles.css y app.js: diseño y lógica del prototipo.
- assets/: imágenes de los posters extraídas del PDF.

IMPORTANTE
Este prototipo ya NO depende del marcador Hiro ni de reconocimiento inestable de imagen.
Funciona con QR por poster:
1. El asistente escanea el QR del poster.
2. Se abre index.html?park=simon / national / novios.
3. El celular pide cámara.
4. Aparecen elementos RA: modelo 3D visual, puntos interactivos, misión e interacción tipo quiz.

PASOS PARA GITHUB PAGES
1. Descomprime este ZIP.
2. Sube TODO el contenido a la RAÍZ del repositorio, no dentro de una subcarpeta.
   Debe quedar así:
   index.html
   app.js
   styles.css
   posters_qr.html
   assets/
3. En GitHub, ve a Settings > Pages.
4. Source: Deploy from a branch.
5. Branch: main / root.
6. Abre tu link de GitHub Pages, por ejemplo:
   https://TU-USUARIO.github.io/
7. Prueba primero index.html desde el celular.
8. Luego abre:
   https://TU-USUARIO.github.io/posters_qr.html
9. Pulsa Print / Save PDF y guarda/imprime esos posters. Esos QR sí apuntan a tu página publicada.

COMO PRESENTARLO
- Muestra el poster impreso.
- Escanea el QR con el celular.
- Pulsa Start AR camera.
- Apunta al poster o al espacio real.
- Explica los botones: Info, Mission, Quiz.

FRASE HONESTA PARA EXPONER EN INGLES
This prototype uses a poster-based QR trigger. Each poster opens a specific AR scene in the browser. Instead of relying on unstable marker tracking, the virtual elements are displayed over the live camera and are linked to the educational content of each park.
