# Deploying to GitHub Pages (Vite + React)

1. **Install gh-pages**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Update `package.json`**
   - Add a `homepage` field:
     ```json
     "homepage": "https://YOUR_USERNAME.github.io/practice-timer-code/"
     ```
     (Replace `YOUR_USERNAME` with your GitHub username.)
   - Add these scripts:
     ```json
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
     ```

3. **Commit and push your changes**
   ```bash
   git add .
   git commit -m "Prepare for GitHub Pages deployment"
   git push
   ```

4. **Deploy**
   ```bash
   npm run deploy
   ```

5. **Embed in an iframe**
   Use this URL:
   ```html
   <iframe src="https://YOUR_USERNAME.github.io/practice-timer-code/" width="400" height="300" style="border:none;"></iframe>
   ```
