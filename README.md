# README

This is a simple blog template built with [11ty](https://www.11ty.dev). It includes a basic layout, a blog index, and a blog post template. The blog index is paginated and sorted by date. The blog post template includes a title, date, and content. The template also includes a basic 404 page.

- [Features](#features)
- [Development](#development)

---

### Features

- Metadata managed in `src/data/meta.js`.
- Config managed in `src/data/config.js`.
- Navigation managed in `src/data/navigation.js`.
- Blog posts managed in `src/posts` and authored in markdown.
  - Posts are sorted by date.
  - Markdown is supported using `markdownIt` and code highlighting is supported using `prism`.
- XML sitemap
- RSS feed
- HTML/CSS/JavaScript minification and optimization

---

### Development

1. Clone the repository.
2. Install dependencies with `npm install`.
3. Run the development server with `npm start`.

**Available commands:**

```
"start": "eleventy --serve",
"start:quick": "eleventy --serve --incremental --ignore-initial",
"build": "eleventy",
"debug": "DEBUG=Eleventy* npx @11ty/eleventy --serve",
"clean": "rimraf dist .cache"
```

`start`: launches the local development server.    
`start:quick`: launches the local development server with incremental builds (provided an initial build has been created).    
`build`: builds the site.    
`debug`: launches the local development server with debug output.    
`clean`: deletes the build output (`dist`) and `.cache` directory.

*Note*: there is a `publish` command available in the `package.json` file that can be used to publish the site to GitHub Pages. This command is not included in the list above as it is targeted at deploying the template to the internal repository for the project.
