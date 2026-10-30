# SQLViz changes for submission

## What changed
- Replaced the text-based quiz content in **Competitive Exam Practice** with an image-first question-paper library.
- Added categories for GATE, JEE Main, JEE Advanced, and other competitive exams.
- Added multi-image upload, year/title metadata, search, image preview, open-image, and remove controls.
- Paper images are stored in the browser's IndexedDB, so they remain on that browser/device but are not bundled into the ZIP and are not automatically shared with teammates.
- Renamed the sidebar section **About** to **Developed By**.
- Added official paper source links for GATE and JEE Main.

## Add actual paper images
1. Open the official GATE or JEE Main site from the links in the app.
2. Download a relevant question-paper PDF (for this SQL/DBMS project, GATE Computer Science is the most relevant).
3. Convert the pages you want to display into JPG or PNG images. You can use a PDF viewer's export/screenshot feature or a PDF-to-image tool.
4. Open **Competitive Exam Practice**, choose the exam category, enter the year/title, select one or more page images, and click **Upload Images**.
5. Verify the images in the paper library. Repeat for additional exam categories.

Note: the uploaded page images are local to the browser where they were uploaded. For a presentation on another laptop or browser, upload them there too. For images that must ship with the project, place the image files in `public/question-papers/` and reference them as static files instead.

## Run the app
From the project folder:

```bash
npm install
npm run dev
```

The project ZIP intentionally excludes `.env` and `node_modules`. Keep your team's real `.env` file private and do not commit API keys or secrets.
