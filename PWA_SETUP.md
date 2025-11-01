# PWA Icons Setup Guide

## Missing Icons ko Generate Karne Ke Liye:

### Option 1: Online Tool Use Karein (Recommended)
1. Website open karein: https://www.pwabuilder.com/imageGenerator
2. Koi bhi logo/image upload karein (512x512 ya zyada recommended)
3. "Generate" button click karein
4. Download ki hui files ko `/public` folder mein copy karein

### Option 2: Manual Creation
Agar aapke paas logo hai toh:
1. 192x192 size ka icon banao → Save as `icon-192.png`
2. 512x512 size ka icon banao → Save as `icon-512.png`
3. Dono ko `/public` folder mein rakho

### Temporary Solution (For Testing):
Abhi ke liye simple colored squares use kar sakte hain:
- Blue square for app icon
- Screenshots optional hain (PWA chalega bina screenshots ke)

## Required Files in /public:
- ✅ manifest.json (Already created)
- ✅ sw.js (Already created)
- ✅ offline.html (Already created)
- ⏳ icon-192.png (Need to add)
- ⏳ icon-512.png (Need to add)

## Mobile Mein Install Kaise Karein:

### Android (Chrome/Edge):
1. Browser mein app open karein
2. Menu (3 dots) → "Add to Home screen" ya "Install app"
3. Icon automatically home screen pe aa jayega

### iOS (Safari):
1. Safari mein app open karein
2. Share button → "Add to Home Screen"
3. Name confirm karein aur "Add" click karein

### Desktop (Chrome/Edge):
1. Address bar mein install icon (⊕) dikhega
2. Click karke install karein

## PWA Features:
✅ Offline support
✅ Home screen installation
✅ Full-screen mode
✅ Fast loading
✅ App-like experience
✅ Push notifications ready (future)

## Testing:
```bash
npm run dev
```

Then visit: http://localhost:3000
(Mobile mein test karne ke liye same network pe device connect karein aur http://192.168.x.x:3000 use karein)
