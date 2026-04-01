# fuminoritanizawa.com — Personal Website

> **Editing the site?** See [EDITING_GUIDE.md](EDITING_GUIDE.md) for step-by-step instructions on every common task (adding papers, projects, experience, CV, photos, etc.).

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
│   ├── project/            # Research project pages; one folder per project (kebab-case names)
│   │   ├── antigenic-variation/
│   │   ├── hlh-11/
│   │   ├── schulz-lab/
│   │   ├── senior-thesis/
│   │   ├── singapore/
│   │   └── sleep-deprivation/
│   ├── publication/        # Publication entries (one folder per paper)
│   ├── authors/admin/      # Profile: bio, avatar, social links
│   └── cv/                 # CV page content
├── assets/
│   ├── images/             # Site icon and logo (icon.png = site favicon)
│   └── scss/custom.scss    # All custom CSS overrides (safe to edit)
├── static/
│   ├── files/cv.pdf             # CV download (linked from social icon in profile)
│   ├── fuminoritanizawa_cv.pdf  # CV download (linked from navbar + about section)
│   ├── img/                     # Slider images; served at /img/<filename>
│   │   ├── <lab>_NN.png         # Lab research photos (naming: labname_01.png, _02.png …)
│   │   ├── pic1.jpg … pic15.jpg # Personal/hobby photos (scuba diving)
│   │   └── Photos/              # Miscellaneous personal photos
│   └── admin/                   # Netlify CMS configuration
├── data/
│   └── page_sharer.toml    # Social sharing button configuration
├── scripts/                # Utility scripts (run from repo root, not from inside scripts/)
│   ├── view.sh             # Start local dev server (hugo server)
│   ├── compile_bibs.sh     # Generate all.bib from publication cite.bib files
│   ├── update_academic.sh  # Update the Academic theme submodule
│   └── init_kickstart.sh   # !! DESTRUCTIVE: resets site to template defaults — do not run
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
# or use the provided script (run from repo root):
./scripts/view.sh
```

The site will be available at `http://localhost:1313`.

---

## Where to Safely Make Edits

| What you want to change | Where to edit |
|---|---|
| Bio, profile photo, social links | `content/authors/admin/_index.md` |
| Homepage sections (show/hide/reorder) | `content/home/<widget>.md` — set `active = false` to hide |
| Research experience entries | `content/home/experience.md` |
| Awards / accomplishments | `content/home/awards.md` |
| Projects | `content/project/<name>/index.md` |
| Publications | `content/publication/<name>/index.md` |
| CV page | `content/cv/index.md` |
| Navigation bar links | `config/_default/menus.toml` |
| Site colors / font size | `config/_default/params.toml` (theme, font_size) |
| Custom CSS | `assets/scss/custom.scss` |
| CV file | Replace `static/fuminoritanizawa_cv.pdf` AND `static/files/cv.pdf` |

---

## Homepage Widget Map

The homepage is composed of widget sections defined in `content/home/`. Each file maps to one section. Active sections render in ascending `weight` order.

| File | Status | Navbar label | What it renders |
|---|---|---|---|
| `about.md` | active (5) | — | Biography / profile |
| `publications.md` | active (19) | Publications | List from `content/publication/` |
| `experience.md` | active (20) | Experience | Research positions |
| `projects.md` | active (45) | Projects | Cards from `content/project/` |
| `awards.md` | active (50) | Awards | Accomplishments / fellowships |
| `lab-photos.md` | active (190) | — | Lab research photo slideshow |
| `personal-photos.md` | active (200) | — | Personal/hobby photo slideshow |
| `contact.md` | active (500) | Contact | Contact form |
| `accomplishments.md` | **inactive** | — | Spare draft (honors/awards) |
| `education.md` | **inactive** | — | Education timeline |
| `featured.md` | **inactive** | — | Featured publications |
| `posts.md` | **inactive** | — | Blog posts |
| `tags.md` | **inactive** | — | Tag cloud |

---

## Common Workflows

### Add a slide to a photo slider

1. Place the image in `static/img/` following the naming convention:
   - Lab photos: `<labname>_NN.png` (e.g., `mugnier_07.png`) — zero-padded numbers
   - Personal photos: `picNN.jpg` (e.g., `pic16.jpg`)
2. Add an `[[item]]` block in `content/home/slider2.md` (lab photos) or `content/home/slider.md` (personal photos)
3. Set `overlay_img = "your-filename.png"` — path is relative to `static/img/`

> **Unused images:** `shizuoka_01.png` and `shizuoka_02.png` are in `static/img/` but not yet referenced by any slider. Add `[[item]]` blocks to include them.

### Add a new project
```
content/project/<kebab-case-name>/
    index.md        # Project metadata and description
    featured.jpg    # Thumbnail image (required for portfolio card thumbnail)
```
Use kebab-case for the folder name (e.g., `new-project-name`). Copy an existing project folder as a starting point.

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

To update the theme, run `./scripts/update_academic.sh` from the repo root (read it first; test locally before deploying).

---

## Fragile Areas

| Area | Why it's fragile |
|---|---|
| `netlify.toml` HUGO_VERSION | Pinned to 0.72.0. Bumping it may break the theme. Test locally first. |
| `themes/academic/` submodule | Empty on fresh clone until `git submodule update --init --recursive` is run. |
| `static/fuminoritanizawa_cv.pdf` | Referenced by both navbar (`menus.toml`) and inline HTML in `_index.md`. |
| Widget `weight` values | Controls order of homepage sections. Gaps are fine; duplicate weights cause non-deterministic ordering. |
