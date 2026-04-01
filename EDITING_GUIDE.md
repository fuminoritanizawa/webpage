# Site Editing Guide — fuminoritanizawa.com

This file is for Fumi. It lives at the repo root and is not processed by Hugo, so it never appears on the live site. Edit it freely.

> **Quick rule:** `content/` is where almost everything lives. `config/_default/` controls site-wide settings. `assets/scss/custom.scss` controls all visual customization. Never edit inside `themes/academic/`.

---

## Table of Contents

1. [Update the bio / profile section](#1-update-the-bio--profile-section)
2. [Add a research experience entry](#2-add-a-research-experience-entry)
3. [Add a project page](#3-add-a-project-page)
4. [Add a publication](#4-add-a-publication)
5. [Add a fellowship or award](#5-add-a-fellowship-or-award)
6. [Add a conference presentation](#6-add-a-conference-presentation)
7. [Update the CV](#7-update-the-cv)
8. [Add a photo to the lab photo slider](#8-add-a-photo-to-the-lab-photo-slider)
9. [Add a photo to the personal photo slider](#9-add-a-photo-to-the-personal-photo-slider)
10. [Show or hide a homepage section](#10-show-or-hide-a-homepage-section)
11. [Reorder homepage sections](#11-reorder-homepage-sections)
12. [Add or remove a navbar link](#12-add-or-remove-a-navbar-link)
13. [Change site colors or font](#13-change-site-colors-or-font)
14. [Add custom CSS styling](#14-add-custom-css-styling)
15. [Deploy the site](#15-deploy-the-site)
16. [Run the site locally](#16-run-the-site-locally)
17. [Homepage section map](#17-homepage-section-map)

---

## 1. Update the bio / profile section

**File:** `content/authors/admin/_index.md`

This one file controls everything in the About/Biography section:
- Your name, role, and organization
- Social links (email, Google Scholar, LinkedIn, GitHub, etc.)
- The bio text (the HTML below the `---` line)
- Fellowships list in the bio
- Your education (the `education:` block)

**To update your role** (e.g. "PhD Student" → "Postdoc"):
```yaml
role: PhD Student  # ← change this
```

**To add a social link**, copy an existing block and change `icon`, `icon_pack`, and `link`:
```yaml
- icon: twitter
  icon_pack: fab
  link: https://twitter.com/yourhandle
  label: Twitter
```
Available icon packs: `fas` (Font Awesome solid), `fab` (Font Awesome brands), `ai` (Academicons).
Browse icons at https://fontawesome.com/icons and https://jpswalsh.github.io/academicons/

**To update the bio text**, edit the HTML content below the `---` at the bottom of the file.

**Note:** The avatar photo is `content/authors/admin/avatar.png`. Replace that file to change your profile photo. Keep the filename exactly `avatar.png`.

---

## 2. Add a research experience entry

**File:** `content/home/experience.md`

Add a new `[[experience]]` block. Copy this template:

```toml
[[experience]]
  title = "Your Role Title"
  company = "Institution Name"
  company_url = "https://institution.edu"
  location = "City, State/Country"
  date_start = "2025-09-01"         # YYYY-MM-DD
  date_end = ""                     # Leave empty if current position
  description = """
  One-line description of what you worked on at [Lab Name](https://laburl.com).
  """
```

**Tips:**
- Entries automatically sort newest-first by `date_start`
- `date_end = ""` = "Present"
- Use `*italic*` for species names, e.g. `*Drosophila melanogaster*`
- The subtitle says "For more details, refer to my CV" — update this if needed

---

## 3. Add a project page

Each project is a folder under `content/project/`. Use kebab-case folder names.

**Step 1 — Create the folder and files:**
```
content/project/my-new-project/
    index.md       ← required: metadata + description
    featured.jpg   ← required: thumbnail shown on the Projects section
    <optional>.pdf ← posters, slides, etc. (link to them from index.md)
```

**Step 2 — Write `index.md`.** Copy from an existing project (e.g. `content/project/hlh-11/index.md`) and edit:

```yaml
---
date: "2025-06-01"
title: "Your Project Title"
summary: "One-sentence description shown in the project card."
tags:
- Immunology    # used by the filter buttons in the Projects section
image:
  caption: 'Optional caption'
  focal_point: Smart
links:
- name: Poster
  url: my-new-project-poster.pdf
---

Full description of the project in Markdown here.
```

**Step 3 — Add filter button** (optional): If you're using a new tag, add it to `content/home/projects.md`:
```toml
[[content.filter_button]]
  name = "Your Tag"
  tag = "YourTag"
```

---

## 4. Add a publication

Each publication is a folder under `content/publication/`. Use kebab-case.

```
content/publication/my-paper-2025/
    index.md     ← metadata
    cite.bib     ← BibTeX for citation export
```

**`index.md` template:**
```yaml
---
title: "Full Paper Title"
authors:
- admin             # matches content/authors/admin/
- "Co-author Name"
date: "2025-06-01"
publication: "*Journal Name*, vol. X, pp. Y–Z"
publication_types:
- "2"               # 2 = journal article; see codes below
abstract: "Abstract text here."
featured: false
url_pdf: "https://doi.org/..."
url_code: ""
url_dataset: ""
---
```

**`publication_types` codes:**
- `"0"` = Uncategorized
- `"1"` = Conference paper
- `"2"` = Journal article
- `"3"` = Preprint
- `"6"` = Book chapter

**After adding**, regenerate `all.bib` if needed: `./scripts/compile_bibs.sh`

---

## 5. Add a fellowship or award

**File:** `content/home/awards.md`

Find the `[[item]]` block with `title = "Fellowships"` or `title = "Awards"` and add a bullet:

```toml
# Inside the description = """...""" block, add a line like:
* **2025-Present. &nbsp;<a href="https://foundation.org">Foundation Name</a>**<br>
  One sentence describing what the fellowship is.
```

**To add a new category** (e.g. "Teaching Awards"), create a new `[[item]]` block:

```toml
[[item]]
  organization = "As of"
  organization_url = ""
  title = "Teaching Awards"
  url = ""
  date_start = "2025-01-01"
  date_end = ""
  description = """
  * **2025** &nbsp; Award Name, Institution
  """
```

---

## 6. Add a conference presentation

**File:** `content/home/awards.md`

Find the `[[item]]` block with `title = "Conference Presentations"` and add a bullet:

```toml
* **YYYY-MM-DD** &nbsp; Conference Name (Location, <a href="url">Poster/Oral</a>)
```

---

## 7. Update the CV

The CV is served at **two different URLs** — you must replace **both files**:

| File | URL | Where it's linked |
|---|---|---|
| `static/fuminoritanizawa_cv.pdf` | `/fuminoritanizawa_cv.pdf` | Navbar "CV" link + About section HTML |
| `static/files/cv.pdf` | `/files/cv.pdf` | CV icon in social links |

**To update:** Simply overwrite both files with your new PDF. The filenames must stay the same.

---

## 8. Add a photo to the lab photo slider

**File:** `content/home/lab-photos.md`  
**Image folder:** `static/img/`

**Step 1 — Name the image** following the convention: `<labname>_NN.png` (zero-padded number)
- Examples: `stanford_01.png`, `mugnier_07.png`

**Step 2 — Copy the image** to `static/img/`

**Step 3 — Add a slide block** in `content/home/lab-photos.md`:
```toml
[[item]]
  title = "Lab Name"
  content = "Institution (City, State / Month Year – Month Year)"
  align = "left"

  overlay_color = "#666"
  overlay_img = "stanford_01.png"   # filename only, relative to static/img/
  overlay_filter = 0                # 0 = no darkening, 1 = fully dark
```

> **Unused images already in static/img/:** `shizuoka_01.png`, `shizuoka_02.png` — add `[[item]]` blocks to include them.

---

## 9. Add a photo to the personal photo slider

**File:** `content/home/personal-photos.md`  
**Image folder:** `static/img/`

**Step 1 — Name the image:** `picNN.jpg` (e.g. `pic16.jpg`, next after `pic15.jpg`)

**Step 2 — Copy the image** to `static/img/`

**Step 3 — Add a slide block:**
```toml
[[item]]
  title = "Title of Slide"
  content = "Short caption"
  align = "left"

  overlay_color = "#555"
  overlay_img = "pic16.jpg"
  overlay_filter = 0

  cta_label = "View My Gallery"
  cta_url = "https://vsco.co/fuminori-tanizawa/gallery"
  cta_icon_pack = "fas"
  cta_icon = "camera"
```

---

## 10. Show or hide a homepage section

Each section in `content/home/` has an `active` parameter:

```toml
active = true    # ← shown on site
active = false   # ← hidden (but preserved for future use)
```

| Section file | What it shows |
|---|---|
| `about.md` | Biography / profile |
| `publications.md` | Publications list |
| `experience.md` | Research experience timeline |
| `projects.md` | Project cards |
| `awards.md` | Fellowships, awards, presentations |
| `lab-photos.md` | Lab research photo slideshow |
| `personal-photos.md` | Personal/hobby photo slideshow |
| `contact.md` | Contact form |
| `education.md` | Education (currently off) |
| `posts.md` | Blog posts (currently off) |

---

## 11. Reorder homepage sections

Each `content/home/*.md` has a `weight` parameter. **Lower weight = higher on page.**

Current order:
```
about         weight = 5
publications  weight = 19
experience    weight = 20
projects      weight = 45
awards        weight = 50
lab-photos    weight = 190
personal-photos weight = 200
contact       weight = 500
```

To move a section, change its `weight`. Gaps between numbers are fine and make reordering easier.

**Example** — put Publications after Experience instead of before:
```toml
# in publications.md: change weight = 19 → weight = 22
# in experience.md: leave weight = 20
```

---

## 12. Add or remove a navbar link

**File:** `config/_default/menus.toml`

**Add a link to a homepage section:**
```toml
[[main]]
  name = "Label in navbar"
  url = "#section-filename"   # matches content/home/<section-filename>.md
  weight = 30                 # lower = further left in nav
```

**Add a link to an external URL or file:**
```toml
[[main]]
  name = "Google Scholar"
  url = "https://scholar.google.com/..."
  weight = 600
```

**Remove a link:** Delete or comment out (`#`) the `[[main]]` block.

---

## 13. Change site colors or font

**File:** `config/_default/params.toml`

```toml
# Color theme — options: ocean, forest, 1950s, apogee, coffee, dark, earth,
#               minimal, mr_robot, nord, rose, sky, strawberry, sunset, tokyonight
theme = "ocean"

# Enable light/dark toggle button
day_night = true

# Font size: XS, S, M, L, XL
font_size = "L"
```

Try `theme = "minimal"` for a very clean look, or `theme = "nord"` for a cool blue palette.

---

## 14. Add custom CSS styling

**File:** `assets/scss/custom.scss`

This is the **only** file you should edit for visual customization. It is loaded after the theme's own CSS, so anything you write here takes precedence.

**Examples:**
```scss
// Change font of section headings
.section-heading h1 {
  font-family: "Georgia", serif;
}

// Make project card images taller
.card-img-top {
  height: 220px;
  object-fit: cover;
}

// Add a colored left border to the bio
.article-style {
  border-left: 3px solid #2962ff;
  padding-left: 1.5rem;
}
```

The theme's SCSS uses CSS variables like `var(--color-primary)` for the accent color — you can use these too.

---

## 15. Deploy the site

```bash
git add -A
git commit -m "describe your changes"
git push origin master
```

Netlify automatically detects the push and rebuilds the site. Check build status at your Netlify dashboard. A successful build usually takes 1–2 minutes.

**If the build fails:** Check the Netlify build log. Common causes:
- TOML syntax error in a `+++` frontmatter block (missing quotes, unclosed `"""`)
- Missing `featured.jpg` in a project folder
- Invalid date format (must be `"YYYY-MM-DD"`)

---

## 16. Run the site locally

```bash
# First time only — initialize the theme
git submodule update --init --recursive

# Start the local server
./scripts/view.sh
# or just:
hugo server
```

Visit `http://localhost:1313` in your browser. The site auto-refreshes when you save a file.

> **Note:** Hugo v0.72.0 is required (pinned in `netlify.toml`). Install it from https://github.com/gohugoio/hugo/releases/tag/v0.72.0

---

## 17. Homepage section map

```
Page loads from top to bottom:

┌─────────────────────────────────────┐  weight 5
│  ABOUT — biography, avatar, links   │  → edit: content/authors/admin/_index.md
├─────────────────────────────────────┤  weight 19
│  PUBLICATIONS                       │  → edit: content/home/publications.md
│  (cards from content/publication/)  │         content/publication/*/index.md
├─────────────────────────────────────┤  weight 20
│  RESEARCH EXPERIENCE                │  → edit: content/home/experience.md
├─────────────────────────────────────┤  weight 45
│  PROJECTS                           │  → edit: content/home/projects.md
│  (cards from content/project/)      │         content/project/*/index.md
├─────────────────────────────────────┤  weight 50
│  ACCOMPLISHMENTS                    │  → edit: content/home/awards.md
│  (fellowships, awards, talks)       │
├─────────────────────────────────────┤  weight 190
│  LAB PHOTOS (slider)                │  → edit: content/home/lab-photos.md
│                                     │    images: static/img/<labname>_NN.png
├─────────────────────────────────────┤  weight 200
│  PERSONAL PHOTOS (slider)           │  → edit: content/home/personal-photos.md
│                                     │    images: static/img/picN.jpg
├─────────────────────────────────────┤  weight 500
│  CONTACT                            │  → edit: content/home/contact.md
└─────────────────────────────────────┘
```

---

*This guide was last updated: 2026-03-31*
