# Bogotá Verde AR - versión visible final

Esta versión corrige el problema donde el marcador era detectado, pero el objeto RA no se veía.

## Archivos principales

- `index.html`: experiencia AR principal.
- `marker.html`: marcador Hiro oficial para imprimir o mostrar en otra pantalla.
- `poster.html`: póster con QR hacia la experiencia.
- `camera-test.html`: prueba básica de cámara.
- `app.js` y `styles.css`: lógica y diseño.

## Cómo subir a GitHub Pages

1. Descomprime el ZIP.
2. Entra al repositorio de GitHub Pages.
3. Sube los archivos de adentro directamente en la raíz del repositorio.
4. No subas la carpeta completa.
5. Espera 1 o 2 minutos.
6. Abre la URL pública en Safari o Chrome.

## Cómo presentar

1. Abre `index.html` en el celular.
2. Toca `Start AR Experience`.
3. Abre `marker.html` en otro dispositivo o imprímelo.
4. Apunta la cámara al marcador.
5. Debe aparecer una escena 3D real y también una capa visual grande de parque para asegurar que se vea.
6. Usa `Full AR view` para ocultar el panel inferior.

## Nota importante

Si aparece `Marker detected`, la cámara y el marcador funcionan. Si la escena 3D no se ve, usa el botón `Visible AR overlay`. Esta capa se activa sobre la cámara y permite presentar el prototipo sin que falle visualmente.
