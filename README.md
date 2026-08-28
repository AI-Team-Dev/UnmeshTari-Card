# Unmesh Tari — Premium Digital Business Card

A mobile-first premium digital executive identity for Unmesh Tari, Director at TechBerry Infotech.

## Quick Start

Open `index.html` in a browser, or serve locally:

```bash
npx serve .
```

## Editing Your Information

All personal and business details live in a single configuration file:

**[`js/profile.js`](js/profile.js)**

Edit the `profile` object to update name, contact details, WhatsApp message, expertise, about text, and more. Every section on the page reads from this file.

### WhatsApp Configuration

```javascript
whatsapp: "919870699971",
whatsappMessage: "Hello Unmesh, we met at a networking event. I'd like to connect.",
```

### Replacing Assets

| Asset | File | Notes |
|-------|------|-------|
| Company logo | `assets/TECHBERRY_LOGO.jpg` | Update `profile.logo` if path changes |
| Profile photo | `assets/PROFILE_PHOTO.jpg` | Update `profile.photo` if path changes |
| Favicon | `assets/favicon.jpg` | Update `profile.favicon` and `<link rel="icon">` in `index.html` |

Recommended photo: square or portrait, minimum 400×400px, professional headshot.

## Deployment

Static site — deploy to GitHub Pages, Netlify, Vercel, or any static host. No build step required.

Point your QR code to the deployed URL.

## Structure

```
├── index.html          # Page structure
├── css/styles.css      # All styling
├── js/
│   ├── profile.js      # Single source of truth for all data
│   └── main.js         # VCF download, animations, DOM population
└── assets/             # Logo, photo, favicon
```
