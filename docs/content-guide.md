# Content Guide

How to add, edit, and manage content on this portfolio site.

---

## Quick start

1. Run the dev server: `npm run dev` (opens at `localhost:4567`)
2. Edit files in `src/content/projects/` — changes appear instantly
3. Commit and push to deploy to Vercel

---

## Project structure at a glance

```
src/
  content/
    projects/           <- Case study MDX files live here
      adobe-color.mdx
      adobe-express.mdx
      mission-lane.mdx
      thimble.mdx
  assets/
    images/
      projects/          <- Project images live here
        adobe-color/
        adobe-express/
        mission-lane/
        thimble/
  components/            <- Reusable components for MDX
  pages/                 <- Page templates (you rarely touch these)
public/
  videos/                <- Video files live here
  fonts/
```

---

## Adding a new project

### 1. Create the image folder

```
src/assets/images/projects/your-project-name/
```

Drop your hero image and any body images into this folder. Use descriptive filenames like `hero.png`, `before-after.png`, `mobile-screens.png`.

### 2. Create the MDX file

Create `src/content/projects/your-project-name.mdx` with this template:

```mdx
---
title: "Project Title"
company: "Company Name"
role: "Your Role"
years: "2024—present"
description: "One or two sentences that appear on the homepage card and project hero."
heroImage: "../../assets/images/projects/your-project-name/hero.png"
heroImageAlt: "Describe what the hero image shows"
credits:
  - "Collaborator Name"
  - "Another Collaborator"
protected: false
order: 5
slug: "your-project-name"
---

## Section Heading

Body text goes here. Just write in plain text — it automatically
picks up the site's typography and color styles.

## Another Section

More content here.
```

### 3. Frontmatter fields explained

| Field | Required | What it does |
|---|---|---|
| `title` | Yes | Project name shown on homepage card and project page |
| `company` | Yes | Shown in the company/role/years metadata bar |
| `role` | Yes | Your role at the company |
| `years` | Yes | Date range, e.g. `"2024—present"` |
| `description` | Yes | Summary shown on homepage card and project hero |
| `heroImage` | Yes | Path to the hero image (relative to the MDX file) |
| `heroImageAlt` | Yes | Alt text describing the hero image |
| `credits` | No | List of collaborator names. Omit or use `[]` for none |
| `protected` | No | Set to `true` to require a password. Defaults to `false` |
| `order` | Yes | Homepage display order (1 = first, 2 = second, etc.) |
| `slug` | Yes | URL path — the project will live at `/projects/your-slug` |

---

## Writing body content

The body of each MDX file uses Markdown with a few extras. Here's what's available:

### Headings

```mdx
## Section Heading
```

Headings use `##` (h2). They appear in bold at the same size as body text. Don't use `#` (h1) in the body — that's reserved for the project title.

### Body text

Just write paragraphs. Leave a blank line between them.

```mdx
This is a paragraph of body text.

This is another paragraph. The spacing between paragraphs
is handled automatically.
```

### Bold and italic

```mdx
This is **bold text** and this is *italic text*.
```

---

## Adding images

### Single full-width image

For images that are part of the MDX body content, place the image file in your project's image folder, then reference it:

```mdx
import { Image } from "astro:assets";
import screenshot from "../../assets/images/projects/your-project/screenshot.png";

<Image src={screenshot} alt="Description of what this shows" />
```

**Important:** All `import` statements must go at the top of the MDX file, right after the closing `---` of the frontmatter.

### Single image with caption

Wrap the image in a `Figure` component:

```mdx
import Figure from "../../components/Figure.astro";
import { Image } from "astro:assets";
import screenshot from "../../assets/images/projects/your-project/screenshot.png";

<Figure caption="Desktop and mobile of the current experience">
  <Image src={screenshot} alt="Current experience screenshots" />
</Figure>
```

The caption appears below the image in 16px on desktop, 14px on tablet/mobile, with 10px spacing on desktop and 5px on mobile.

### Two images side by side

Use the `ImageGrid` component:

```mdx
import ImageGrid from "../../components/ImageGrid.astro";
import { Image } from "astro:assets";
import img1 from "../../assets/images/projects/your-project/before.png";
import img2 from "../../assets/images/projects/your-project/after.png";

<ImageGrid>
  <Image src={img1} alt="Before redesign" />
  <Image src={img2} alt="After redesign" />
</ImageGrid>
```

This shows images side-by-side on tablet/desktop with a 10px gap (20px on desktop), and stacked on mobile.

### Two images with a shared caption

```mdx
<ImageGrid caption="Before and after the homepage redesign">
  <Image src={img1} alt="Before redesign" />
  <Image src={img2} alt="After redesign" />
</ImageGrid>
```

### Three images in a row

```mdx
<ImageGrid columns={3}>
  <Image src={img1} alt="Screen 1" />
  <Image src={img2} alt="Screen 2" />
  <Image src={img3} alt="Screen 3" />
</ImageGrid>
```

### Three images with caption

```mdx
<ImageGrid columns={3} caption="Mobile flows for palette creation, extraction, and accessibility">
  <Image src={img1} alt="Screen 1" />
  <Image src={img2} alt="Screen 2" />
  <Image src={img3} alt="Screen 3" />
</ImageGrid>
```

### Image file tips

- Use `.png` or `.jpg` — Astro automatically converts them to optimized `.webp`
- No need to resize beforehand — Astro generates responsive sizes at build time
- Always include descriptive `alt` text for accessibility

---

## Adding video

Use the `VideoSection` component for a full-width video on a black background:

```mdx
import VideoSection from "../../components/VideoSection.astro";

<VideoSection
  src="/videos/your-video.mp4"
  alt="Description of what the video shows"
/>
```

### Video setup

1. Place `.mp4` files in the `public/videos/` folder
2. Reference them with a `/videos/` path (no `../../` — public files use absolute paths)
3. Videos autoplay muted and loop
4. A play/pause button appears in the bottom-right corner
5. If the user has "reduce motion" enabled in their OS, the video starts paused

### Optional: poster image

Show a static image while the video loads:

```mdx
<VideoSection
  src="/videos/your-video.mp4"
  poster="/videos/your-video-poster.jpg"
  alt="Description"
/>
```

---

## Adding vertical spacing

Use the `Spacer` component to add breathing room between sections:

```mdx
import Spacer from "../../components/Spacer.astro";

Content above.

<Spacer size="sm" />

Content below.
```

| Size | Mobile | Desktop |
|---|---|---|
| `sm` | 5px | 10px |
| `md` (default) | 10px | 20px |
| `lg` | 20px | 30px |

---

## Full example

Here's a complete MDX file using all the components:

```mdx
---
title: "Project Name"
company: "Company"
role: "Design Lead"
years: "2023—2024"
description: "Brief summary of the project."
heroImage: "../../assets/images/projects/project-name/hero.png"
heroImageAlt: "Hero image description"
credits:
  - "Collaborator One"
  - "Collaborator Two"
protected: false
order: 3
slug: "project-name"
---

import ImageGrid from "../../components/ImageGrid.astro";
import VideoSection from "../../components/VideoSection.astro";
import Spacer from "../../components/Spacer.astro";
import Figure from "../../components/Figure.astro";
import { Image } from "astro:assets";
import before from "../../assets/images/projects/project-name/before.png";
import after from "../../assets/images/projects/project-name/after.png";
import mobileScreens from "../../assets/images/projects/project-name/mobile.png";

## Challenge

Describe the problem you were solving.

## Approach

Describe what you did and why.

<ImageGrid caption="Before and after the redesign">
  <Image src={before} alt="Before the redesign" />
  <Image src={after} alt="After the redesign" />
</ImageGrid>

<Spacer size="sm" />

## Results

Describe the outcomes and metrics.

<VideoSection src="/videos/project-walkthrough.mp4" alt="Walkthrough of the final design" />

<Spacer size="md" />

<Figure caption="Mobile experience across key flows">
  <Image src={mobileScreens} alt="Mobile experience" />
</Figure>

<Image src={mobileScreens} alt="Mobile experience" />
```

---

## Password protecting a project

Set `protected: true` in the frontmatter:

```mdx
---
protected: true
---
```

The project page will redirect to a password form. The password is set via the `SITE_PASSWORD` environment variable in Vercel. One password unlocks all protected projects for 7 days.

---

## Editing the homepage and about page

These pages are not MDX — they're Astro components:

- **Homepage:** `src/pages/index.astro`
- **About page:** `src/pages/about.astro`

Edit the text directly in the HTML. The structure uses `SectionRow` components for the two-column label/content layout.

---

## Deploying changes

1. Save your files
2. Commit: `git add -A && git commit -m "your message"`
3. Push: `git push`
4. Vercel auto-deploys from the `main` branch (takes ~1 minute)
