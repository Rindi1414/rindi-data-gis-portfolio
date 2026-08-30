# Rindi Data Analyst × GIS Portfolio

Static portfolio website + Decap CMS admin.

## Stack
- HTML
- CSS
- Vanilla JavaScript
- JSON content file
- Decap CMS
- GitHub backend
- Netlify hosting

## Folder structure

```text
rindi-data-gis-portfolio/
├── index.html
├── assets/
│   ├── app.js
│   ├── style.css
│   └── uploads/
├── data/
│   └── content.json
└── admin/
    ├── index.html
    └── config.yml
```

## Important: CMS authentication

This starter uses Decap CMS with the GitHub backend. The CMS writes changes to the GitHub repository, and Netlify redeploys the site when the repository changes.

Before deploying:
1. Create a GitHub repository.
2. Upload this folder to the repository.
3. Open `admin/config.yml`.
4. Replace:
   `YOUR_GITHUB_USERNAME/rindi-data-gis-portfolio`
   with your actual GitHub repository, for example:
   `rinditri/rindi-data-gis-portfolio`
5. Connect the GitHub repository to Netlify.
6. Configure GitHub as an authentication provider in Netlify using a GitHub OAuth App.
7. Open `https://YOUR-SITE.netlify.app/admin/`.

### GitHub OAuth App
Use:
- Homepage URL: your Netlify site URL
- Authorization callback URL: `https://api.netlify.com/auth/done`

In Netlify, install the GitHub authentication provider using the Client ID and Client Secret from the OAuth App.

Decap's current documentation says the GitHub backend requires CMS users to have push access to the repository. For a personal portfolio, this is fine because you are the only admin.

## Editing content

Go to `/admin/`, log in with your GitHub account, then open **Portfolio Content → Main Content**.

You can edit:
- Profile
- About
- Skills
- Projects
- Experience
- Education
- Certificates
- Contact links

For project images, use the **Project Image** upload field. Images are saved into `assets/uploads/`.

After clicking Publish, Decap commits the JSON/media changes to GitHub. Netlify then rebuilds/deploys the site.

## Netlify

Recommended workflow:
GitHub → Netlify → automatic deploys.

The pure Netlify Drag & Drop method is fine for a static site, but for this CMS version you should connect the site to GitHub so CMS changes can trigger automatic deployments.

## Local preview

If you only want to preview the static website, you can open `index.html` with a local server. Because the site fetches `data/content.json`, use a local server instead of double-clicking the HTML file.

Example with Python:

```bash
python -m http.server 8000
```

Then open:

http://localhost:8000

## Notes

This package is intentionally simple so it can be deployed quickly. The admin is a real CMS, not a fake localStorage admin panel.
