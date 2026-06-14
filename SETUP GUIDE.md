# RoundNotes — Setup Guide

**How to install this PWA on your iPad Air M3**

-----

## What you need (all FREE)

|Account   |Purpose                                                  |Free? |
|----------|---------------------------------------------------------|------|
|**GitHub**|Store your app files                                     |✅ Free|
|**Vercel**|Host the app online                                      |✅ Free|
|That’s it!|No Supabase needed — app stores data locally on your iPad|✅     |

-----

## Step 1 — Create a GitHub account

1. Go to **github.com** → Sign Up
1. Choose a username (e.g. `drjohnson-notes`)
1. Verify your email

-----

## Step 2 — Upload the app to GitHub

1. On GitHub, click **“New repository”** (green button)
1. Name it: `roundnotes`
1. Set it to **Public**
1. Click **Create repository**
1. Click **“uploading an existing file”** link
1. Upload all 4 files:
- `index.html`
- `manifest.json`
- `sw.js`
- `icon-192.png` *(optional — app works without it)*
1. Click **Commit changes**

-----

## Step 3 — Deploy on Vercel

1. Go to **vercel.com** → Sign Up with your GitHub account
1. Click **“Add New Project”**
1. Select your `roundnotes` repository
1. Click **Deploy** — done in ~30 seconds!
1. Vercel gives you a URL like: `https://roundnotes-xyz.vercel.app`

-----

## Step 4 — Install on iPad as a PWA

1. Open **Safari** on your iPad
1. Go to your Vercel URL
1. Tap the **Share button** (box with arrow, bottom of screen)
1. Tap **“Add to Home Screen”**
1. Name it `RoundNotes` → Tap **Add**

The app icon now appears on your iPad home screen. Tap it — it opens full screen like a native app, **works offline**, and your data is saved on your iPad.

-----

## How data is stored

- All patient data is saved in your iPad’s **browser storage (localStorage)**
- It stays on your device — no internet needed after install
- Photos/documents you attach are also stored locally
- **Important:** Clearing Safari data will erase records — export PDFs regularly as backup

-----

## Sharing patient reports

1. Open a patient record
1. Tap **“Export PDF”** button
1. A PDF downloads with:
- Your name, department, hospital
- Patient details + vitals
- Clinical notes and plan
- Attached X-ray / document thumbnails
1. Open the PDF → tap Share → send via **WhatsApp, Email, AirDrop** to senior doctors

-----

## Future upgrades (optional)

If you later want **cloud sync** across multiple devices:

- Add **Supabase** (free tier) for database
- Add **Supabase Storage** for photo uploads
- This requires a developer to add ~50 lines of JavaScript

-----

*Built with RoundNotes PWA — a doctor-first tool for efficient hospital rounds.*