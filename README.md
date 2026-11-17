# 💗 A Little World For My Madam 💗

A romantic, emotionally heartwarming, highly interactive personal website built with love for your girlfriend. Designed to comfort her while she recovers from her fever, bridge the distance between you two, and count down the days until you can hold her tight.

---

## 🌸 Key Features

1. **Dreamy Aesthetic & Ambient Particle System**:
   - Soft pastel pinks, lavenders, peaches, and warm whites.
   - Interactive Canvas: floating 3D glossy hearts, gentle cherry blossom petals, twinkling stars, and touch/tap sparklers.
   - Soft drifting clouds in the background.

2. **Opening Surprise (Intro Screen)**:
   - 3D Pink Envelope with a heart seal.
   - Animated unsealing and opening sequence.
   - Confetti heart burst with "Preparing a little happiness for my favourite person... ✨" transition.

3. **Welcome Page (Madam, Come In!)**:
   - Handwritten welcome greeting: *"Welcome, Madam Jiii! 🥺❤️"*
   - Interactive floating nickname tags (*"My Madam"*, *"Meri Jaan"*, *"Cutieee"*, *"My Favourite Human"*, *"My Happiness"*).
   - Dr. Boyfriend's sick-day fever care banner.

4. **Our Little Memory Lane (Scrapbook & Polaroids)**:
   - Authentic Polaroid photo frames with realistic drop-shadows, washi tape strips, stamps, and gentle rotation angles.
   - Supports personal photos and video memories.
   - Interactive Fullscreen Lightbox with caption details, date, and a *"Send Love ❤️"* counter.

5. **A Little Message From Your Favourite Person (Love Letter)**:
   - Soft pink letter on textured parchment paper with lined stationery aesthetic.
   - Interactive wax seal button to fold/open the letter.
   - Your complete heartfelt message and handwritten signature.
   - **Dr. Boyfriend's Sick-Day Care Prescription (Rx)**: interactive checklist (Hot Comfort Soup, Water Hydration, Medicines, Cozy Blanket Nap) with celebratory sparkles when tapped.

6. **Countdown to Our Hug (Live Timer & Distance Meter)**:
   - Animated live countdown cards (Days, Hours, Minutes, Seconds).
   - "Distance vs Love" interactive meter with a *"Send A Virtual Hug Across The Miles 🚀❤️"* button.
   - Meeting date easily configurable in `js/config.js`.

7. **Things I Owe You (Redeemable Love Coupons)**:
   - 5 interactive coupon cards:
     - 1000+ hugs 🫂
     - Unlimited forehead kisses 😘
     - Your favourite food 🍓
     - Endless cuddles 💗
     - One very long hug when we meet ❤️
   - Clicking reveals romantic details and stamps them *"Claimed with Love! ✓"*.

8. **Final Surprise – Teddy Bear & Virtual Hug**:
   - Illustrated animated cute teddy bear holding a beating glowing heart.
   - Heartwarming closing words reminding her to rest.
   - *"Sending You a Virtual Hug 🫂"* button triggers a massive 150+ heart explosion, haptic device vibration, and a full-screen warm hug modal.

9. **Romantic Music Engine**:
   - Zero external dependency: Web Audio API generates a relaxing, tender music-box piano melody.
   - Supports playing custom MP3 audio by dropping a file in `assets/music/` and pointing `MADAM_CONFIG.music.customAudioUrl` to it.
   - Floating music pill widget with mute/unmute and animated soundwaves.

---

## 🚀 How to Run & View

1. **Simple Double Click**:
   - Just double-click `index.html` in file explorer to open it directly in Chrome, Edge, Safari, or any browser!
2. **On Mobile**:
   - You can upload this folder to GitHub Pages, Netlify Drop, or Vercel for free with zero setup, and send her the link to open right on her phone in bed!

---

## 🎨 How to Personalize

Open `js/config.js` in any text editor:
- **Change Nicknames/Names**: edit `herName`, `herNickname`, or `senderName`.
- **Set Meeting Date**: edit `meetingDate` (e.g. `"2026-11-20T18:00:00"`).
- **Add Your Own Photos**:
  1. Copy your photos into the `assets/images/` folder.
  2. In `js/config.js`, update the `src` attribute for each memory item (e.g. `src: "assets/images/my-photo.jpg"`).
- **Add a Video Memory**:
  1. Put your video file (MP4) in `assets/videos/`.
  2. Set `src: "assets/videos/our-video.mp4"` for the video memory in `js/config.js`.
- **Add Your Favourite Song**:
  1. Put your MP3 file in `assets/music/` (e.g. `assets/music/our-song.mp3`).
  2. Set `MADAM_CONFIG.music.customAudioUrl = "assets/music/our-song.mp3"`.

Made with love to make Madam smile and feel better! 💖
