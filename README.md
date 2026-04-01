# fuminoritanizawa.com — Personal Website

Personal academic website for **Fuminori Tanizawa**, built with [Hugo](https://gohugo.io/) and the [Academic theme](https://github.com/gcushen/hugo-academic). Deployed via [Netlify](https://netlify.com) at [fuminoritanizawa.com](https://fuminoritanizawa.com).

---

## Directory Structure

```
webpage/
├── config/
│   └── _default/           # All site configuration (edit here, not config.toml)
│       ├── config.toml     # Core Hugo settings: baseurl, title, theme
│       ├── params.toml     # Theme/feature toggles: colors, widgets, integrations
│       ├── menus.toml      # Top navigation bar links
│       └── languages.toml  # Language config (English only; multi-lang pre-stubbed)
├── content/
│   ├── home/               # Homepage widget files (one .md per section)
│   ├── project/            # Research project pages (one folder per project)
│   ├── publication/        # Publication entries (one folder per paper)
│   ├── authors/admin/      # Profile: bio, avatar, social links
│   └── cv/                 # CV page content
├── assets/
│   ├── images/             # Site icon and logo (icon.png = site favicon)
│   └── scss/custom.scss    # All custom CSS overrides (safe to edit)
├── static/
│   ├── files/cv.pdf        # CV download (linked from social icon in profile)
│   ├── fuminoritanizawa_cv.pdf  # CV download (linked from navbar + about section)
│   ├── img/                # Project images, photos, figures
│   └── admin/              # Netlify CMS configuration
├── data/
│   └── page_sharer.toml    # Social sharing button configuration
├── themes/academic/        # Hugo Academic theme (git submodule — do not edit)
├── netlify.toml            # Netlify build settings
└── .gitignore
```

---

## Running Locally

**Prerequisites:** Hugo extended v0.72.0 (see `netlify.toml` for the pinned version).

```bash
# 1. Initialize the theme submodule (required on first clone)
git submodule update --init --recursive

# 2. Start the local dev server
hugo server
# or use the provided script:
./view.sh
```

The site will be available at `http://localhost:1313`.

---

## Where to Safely Make Edits

| What you want to change | Where to edit |
|---|---|
| Bio, profile photo, social links | `content/authors/admin/_index.md` |
| Homepage sections (show/hide/reorder) | `content/home/<widget>.md` — set `active = false` to hide |
| Research experience entries | `content/home/experience.md` |
| Awards / accomplishments | `content/home/talks.md` |
| Projects | `content/project/<name>/index.md` |
| Publications | `content/publication/<name>/index.md` |
| CV page | `content/cv/index.md` |
| Navigation bar links | `config/_default/menus.toml` |
| Site colors / font size | `config/_default/params.toml` (theme, font_size) |
| Custom CSS | `assets/scss/custom.scss` |
| CV file | Replace `static/fuminoritanizawa_cv.pdf` AND `static/files/cv.pdf` |

---

## Common Workflows

### Add a new project
```
content/project/<project-name>/
    index.md        # Project metadata and description
    featured.jpg    # Thumbnail image
```
Copy an existing project folder as a starting point.

### Add a new publication
```
content/publication/<paper-name>/
    index.md        # Publication metadata
    cite.bib        # BibTeX citation
```

### Hide a homepage section
In `content/home/<widget>.md`, set:
```yaml
active: false
```

### Update the CV
Replace both files (they are served at different URLs):
- `static/fuminoritanizawa_cv.pdf` — linked from navbar and About section
- `static/files/cv.pdf` — linked from the CV social icon

### Deploy
Push to `master`. Netlify auto-deploys from the `master` branch.

---

## Theme

The site uses the [Hugo Academic](https://github.com/gcushen/hugo-academic) theme, pinned at a specific commit via git submodule.

**Do not edit files inside `themes/academic/`** — changes there will be lost when the submodule is updated. All customizations belong in:
- `assets/scss/custom.scss` for styles
- `layouts/` for template overrides (currently none)
- `config/_default/params.toml` for feature toggles

To update the theme, run `./update_academic.sh` (read it first; test locally before deploying).

---

## Fragile Areas

| Area | Why it's fragile |
|---|---|
| `netlify.toml` HUGO_VERSION | Pinned to 0.72.0. Bumping it may break the theme. Test locally first. |
| `themes/academic/` submodule | Empty on fresh clone until `git submodule update --init --recursive` is run. |
| `static/fuminoritanizawa_cv.pdf` | Referenced by both navbar (`menus.toml`) and inline HTML in `_index.md`. |
| Widget `weight` values | Controls order of homepage sections. Gaps are fine; duplicate weights cause non-deterministic ordering. |
