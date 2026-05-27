# Deploy Bogotá Verde AR on GitHub Pages

## Option A — Upload files directly from the browser

1. Create a new repository on GitHub.
2. Suggested repository name: `bogota-verde-ar`.
3. Upload all files from this folder to the repository root.
4. Go to **Settings**.
5. Go to **Pages**.
6. In **Build and deployment**, select:
   - Source: **Deploy from a branch**
   - Branch: **main**
   - Folder: **/root**
7. Save.
8. Wait 1–3 minutes.
9. Open the GitHub Pages URL.
10. Open `poster.html` to show the QR code.

Your final URLs will look similar to:

- Main AR: `https://YOUR-USER.github.io/bogota-verde-ar/`
- Poster + QR: `https://YOUR-USER.github.io/bogota-verde-ar/poster.html`
- Marker: `https://YOUR-USER.github.io/bogota-verde-ar/marker.html`

## Option B — Deploy using Git

```bash
git init
git add .
git commit -m "Final AR prototype"
git branch -M main
git remote add origin https://github.com/YOUR-USER/bogota-verde-ar.git
git push -u origin main
```

Then activate GitHub Pages in **Settings > Pages**.

## Phone testing checklist

- Use the GitHub Pages HTTPS URL.
- Open it on the phone.
- Allow camera access.
- Display `marker.html` on another screen or print it.
- Keep the marker well lit and flat.
