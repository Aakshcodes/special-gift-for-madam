/**
 * =========================================================================
 * 💗 A LITTLE WORLD FOR MY MADAM - MAIN APPLICATION SCRIPT 💗
 * =========================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Initialize Ambient Particles
  if (window.initRomanticParticles) {
    window.initRomanticParticles();
  }

  // 2. Setup Intro Surprise Interaction
  setupIntroScreen();

  // 3. Render Floating Badges
  renderFloatingBadges();

  // 4. Render Scrapbook Memories & Lightbox
  renderScrapbookMemories();
  setupLightbox();

  // 5. Setup Love Letter & Care Kit
  setupLoveLetter();

  // 6. Setup Countdown Timer
  setupCountdownTimer();

  // 7. Render & Setup "Things I Owe You" Coupons
  renderCoupons();

  // 8. Setup Final Surprise & Virtual Hug
  setupVirtualHug();

  // 9. Setup Audio Controls
  setupAudioWidget();
});

/* ==========================================================================
   Surprise Opening Screen Logic
   ========================================================================== */
function setupIntroScreen() {
  const openSurpriseBtn = document.getElementById("openSurpriseBtn");
  const surpriseBox = document.getElementById("surpriseBox");
  const introScreen = document.getElementById("introScreen");
  const preparingLoader = document.getElementById("preparingLoader");
  const welcomeSection = document.getElementById("welcomeSection");

  const triggerOpen = () => {
    if (surpriseBox.classList.contains("open")) return;
    surpriseBox.classList.add("open");

    // Play sparkle sound
    if (window.romanticAudio) {
      window.romanticAudio.playSparkleSound();
      window.romanticAudio.start();
    }

    // Launch celebratory heart burst from center
    if (window.romanticParticles) {
      const rect = surpriseBox.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      window.romanticParticles.launchCelebrationExplosion(cx, cy, 90);
    }

    // Show preparing loader after 600ms
    setTimeout(() => {
      if (preparingLoader) preparingLoader.classList.add("active");
    }, 600);

    // Transition smoothly to Welcome screen after 2.2s
    setTimeout(() => {
      if (introScreen) introScreen.classList.add("hidden");
      if (preparingLoader) preparingLoader.classList.remove("active");
      
      // Gentle burst on welcome
      if (window.romanticParticles) {
        window.romanticParticles.launchCelebrationExplosion(window.innerWidth / 2, window.innerHeight * 0.35, 60);
      }

      // Scroll to welcome
      if (welcomeSection) {
        welcomeSection.scrollIntoView({ behavior: "smooth" });
      }
    }, 2200);
  };

  if (openSurpriseBtn) openSurpriseBtn.addEventListener("click", triggerOpen);
  if (surpriseBox) surpriseBox.addEventListener("click", triggerOpen);

  // "Okayyy, show me! 💗" button on welcome section
  const exploreBtn = document.getElementById("exploreMemoriesBtn");
  if (exploreBtn) {
    exploreBtn.addEventListener("click", (e) => {
      e.preventDefault();
      if (window.romanticAudio) window.romanticAudio.playPopSound();
      const target = document.getElementById("memoryLane");
      if (target) target.scrollIntoView({ behavior: "smooth" });
    });
  }
}

/* ==========================================================================
   Floating Nickname Badges
   ========================================================================== */
function renderFloatingBadges() {
  const container = document.getElementById("floatingBadgesList");
  if (!container || !window.MADAM_CONFIG) return;

  container.innerHTML = "";
  MADAM_CONFIG.floatingBadges.forEach((badge) => {
    const span = document.createElement("button");
    span.className = "floating-tag";
    span.innerHTML = `<span>${badge.emoji}</span> <span>${badge.text}</span>`;
    
    span.addEventListener("click", (e) => {
      if (window.romanticAudio) window.romanticAudio.playPopSound();
      if (window.romanticParticles) {
        const rect = span.getBoundingClientRect();
        window.romanticParticles.burstMiniHearts(rect.left + rect.width / 2, rect.top, 10);
      }
      span.style.transform = "scale(1.25) rotate(5deg)";
      setTimeout(() => {
        span.style.transform = "";
      }, 300);
    });

    container.appendChild(span);
  });
}

/* ==========================================================================
   Memory Lane Scrapbook
   ========================================================================== */
let activeMemoryIndex = 0;

function renderScrapbookMemories() {
  const board = document.getElementById("scrapbookBoard");
  if (!board || !window.MADAM_CONFIG) return;

  board.innerHTML = "";
  MADAM_CONFIG.memories.forEach((mem, index) => {
    const card = document.createElement("div");
    card.className = "polaroid-card";
    card.style.transform = `rotate(${mem.rotation || '0deg'})`;

    const washiClass = mem.tapeColor === "lavender" ? "washi-lavender" : (mem.tapeColor === "peach" ? "washi-peach" : "washi-pink");

    const mediaHtml = mem.type === "video" 
      ? `<div class="polaroid-media-wrapper">
           <img src="${mem.poster || 'assets/images/dreamy-hearts-bg.jpg'}" alt="${mem.title}" class="polaroid-img" onerror="this.src='assets/images/dreamy-hearts-bg.jpg'" />
           <div class="polaroid-video-badge">▶ Video Memory</div>
           <div class="polaroid-heart-stamp">🎥</div>
         </div>`
      : `<div class="polaroid-media-wrapper">
           <img src="${mem.src}" alt="${mem.title}" class="polaroid-img" loading="lazy" onerror="this.src='${mem.fallbackSrc || 'assets/images/dreamy-hearts-bg.jpg'}'" />
           <div class="polaroid-heart-stamp">❤️</div>
         </div>`;

    card.innerHTML = `
      <div class="washi-tape ${washiClass}"></div>
      ${mediaHtml}
      <div class="polaroid-caption-area">
        <h3 class="polaroid-title">${mem.title}</h3>
        <p class="polaroid-caption">${mem.caption}</p>
        <div class="polaroid-meta">
          <span>📅 ${mem.date}</span>
          <span>📍 ${mem.location}</span>
        </div>
      </div>
    `;

    card.addEventListener("click", () => {
      openLightbox(index);
    });

    board.appendChild(card);
  });
}

/* ==========================================================================
   Lightbox Modal
   ========================================================================== */
function setupLightbox() {
  const modal = document.getElementById("lightboxModal");
  const closeBtn = document.getElementById("lightboxCloseBtn");
  const sendHeartBtn = document.getElementById("lightboxSendHeartBtn");

  if (closeBtn && modal) {
    closeBtn.addEventListener("click", () => {
      modal.classList.remove("active");
    });

    modal.addEventListener("click", (e) => {
      if (e.target === modal) modal.classList.remove("active");
    });
  }

  if (sendHeartBtn) {
    let heartCount = 0;
    sendHeartBtn.addEventListener("click", () => {
      heartCount++;
      if (window.romanticAudio) window.romanticAudio.playPopSound();
      if (window.romanticParticles) {
        const rect = sendHeartBtn.getBoundingClientRect();
        window.romanticParticles.launchCelebrationExplosion(rect.left + rect.width / 2, rect.top, 25);
      }
      sendHeartBtn.innerHTML = `<span>Sent with Love! ❤️ (${heartCount})</span>`;
    });
  }

  // Keyboard navigation
  window.addEventListener("keydown", (e) => {
    if (!modal || !modal.classList.contains("active")) return;
    if (e.key === "Escape") modal.classList.remove("active");
  });
}

function openLightbox(index) {
  const modal = document.getElementById("lightboxModal");
  const mediaContainer = document.getElementById("lightboxMedia");
  const titleEl = document.getElementById("lightboxTitle");
  const captionEl = document.getElementById("lightboxCaption");
  const metaEl = document.getElementById("lightboxMeta");
  const mem = MADAM_CONFIG.memories[index];
  if (!modal || !mem) return;

  activeMemoryIndex = index;

  if (mem.type === "video" && mem.src) {
    mediaContainer.innerHTML = `<video controls autoplay loop style="width:100%; max-height:480px;"><source src="${mem.src}" type="video/mp4"></video>`;
  } else {
    mediaContainer.innerHTML = `<img src="${mem.src || mem.poster}" alt="${mem.title}" style="max-width:100%; max-height:480px; object-fit:contain;" />`;
  }

  titleEl.textContent = mem.title;
  captionEl.textContent = mem.caption;
  metaEl.textContent = `📅 ${mem.date} • 📍 ${mem.location}`;

  modal.classList.add("active");
  if (window.romanticAudio) window.romanticAudio.playPopSound();
}

/* ==========================================================================
   Love Letter & Dr. Boyfriend Care Prescription
   ========================================================================== */
function setupLoveLetter() {
  const sealBtn = document.getElementById("waxSealBtn");
  const parchment = document.getElementById("letterParchment");

  if (sealBtn && parchment) {
    let isOpen = true;
    sealBtn.addEventListener("click", () => {
      isOpen = !isOpen;
      if (window.romanticAudio) window.romanticAudio.playSparkleSound();
      
      if (isOpen) {
        parchment.style.display = "block";
        parchment.style.opacity = "0";
        setTimeout(() => { parchment.style.opacity = "1"; }, 20);
        sealBtn.innerHTML = "💌 Fold Letter ♡";
        if (window.romanticParticles) {
          const rect = sealBtn.getBoundingClientRect();
          window.romanticParticles.launchCelebrationExplosion(rect.left + rect.width / 2, rect.top, 30);
        }
      } else {
        parchment.style.display = "none";
        sealBtn.innerHTML = "💌 Open Madam's Love Letter ♡";
      }
    });
  }

  // Prescription Checklist Interactivity
  const rxItems = document.querySelectorAll(".rx-item");
  rxItems.forEach((item) => {
    item.addEventListener("click", () => {
      if (window.romanticAudio) window.romanticAudio.playPopSound();
      item.classList.toggle("completed");
      if (item.classList.contains("completed")) {
        item.style.borderColor = "#10b981";
        item.style.background = "#f0fdf4";
        if (window.romanticParticles) {
          const rect = item.getBoundingClientRect();
          window.romanticParticles.burstMiniHearts(rect.left + rect.width / 2, rect.top, 8);
        }
      } else {
        item.style.borderColor = "";
        item.style.background = "";
      }
    });
  });
}

/* ==========================================================================
   Countdown Timer Logic
   ========================================================================== */
function setupCountdownTimer() {
  const daysEl = document.getElementById("countDays");
  const hoursEl = document.getElementById("countHours");
  const minutesEl = document.getElementById("countMinutes");
  const secondsEl = document.getElementById("countSeconds");
  const distanceSendHeart = document.getElementById("distanceSendHeart");

  const targetDate = new Date(MADAM_CONFIG.meetingDate).getTime();

  function update() {
    const now = new Date().getTime();
    const diff = targetDate - now;

    if (diff <= 0) {
      if (daysEl) daysEl.textContent = "00";
      if (hoursEl) hoursEl.textContent = "00";
      if (minutesEl) minutesEl.textContent = "00";
      if (secondsEl) secondsEl.textContent = "00";
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    if (daysEl) daysEl.textContent = String(days).padStart(2, "0");
    if (hoursEl) hoursEl.textContent = String(hours).padStart(2, "0");
    if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, "0");
    if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, "0");
  }

  update();
  setInterval(update, 1000);

  // Send virtual heart across distance
  if (distanceSendHeart) {
    distanceSendHeart.addEventListener("click", () => {
      if (window.romanticAudio) window.romanticAudio.playHeartbeatSound();
      if (window.romanticParticles) {
        const rect = distanceSendHeart.getBoundingClientRect();
        window.romanticParticles.launchCelebrationExplosion(rect.left + rect.width / 2, rect.top, 40);
      }
      distanceSendHeart.textContent = "Hug Sent to Madam! ✈️💖";
      setTimeout(() => {
        distanceSendHeart.textContent = "Send Another Hug Across The Miles 🚀❤️";
      }, 2500);
    });
  }
}

/* ==========================================================================
   Things I Owe You (Coupons)
   ========================================================================== */
function renderCoupons() {
  const grid = document.getElementById("couponsGrid");
  if (!grid || !window.MADAM_CONFIG) return;

  grid.innerHTML = "";
  MADAM_CONFIG.coupons.forEach((coupon) => {
    const card = document.createElement("div");
    card.className = "coupon-card";
    card.setAttribute("id", `coupon-${coupon.id}`);

    card.innerHTML = `
      <div class="coupon-badge">${coupon.badge}</div>
      <div class="coupon-header">
        <div class="coupon-icon">${coupon.icon}</div>
        <div>
          <h3 class="coupon-title">${coupon.title}</h3>
          <p class="coupon-subtitle">${coupon.subtitle}</p>
        </div>
      </div>
      <p class="coupon-desc">${coupon.description}</p>
      <div class="coupon-note">${coupon.sweetNote}</div>
      <div class="coupon-footer">
        <span class="claim-tag">Official Madam Voucher</span>
        <button class="claim-btn">Redeem Now ♡</button>
      </div>
    `;

    const btn = card.querySelector(".claim-btn");
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      redeemCoupon(card, coupon);
    });

    card.addEventListener("click", () => {
      redeemCoupon(card, coupon);
    });

    grid.appendChild(card);
  });
}

function redeemCoupon(card, coupon) {
  if (card.classList.contains("redeemed")) {
    showToast(`Already redeemed! Madam has ${coupon.title} waiting for her! 🥰`);
    return;
  }

  card.classList.add("redeemed");
  const btn = card.querySelector(".claim-btn");
  if (btn) btn.textContent = "Claimed with Love! ✓";

  if (window.romanticAudio) {
    window.romanticAudio.playSparkleSound();
  }

  if (window.romanticParticles) {
    const rect = card.getBoundingClientRect();
    window.romanticParticles.launchCelebrationExplosion(rect.left + rect.width / 2, rect.top + rect.height / 2, 50);
  }

  showToast(coupon.redeemMessage);
}

/* ==========================================================================
   Final Surprise & Huge Virtual Hug
   ========================================================================== */
function setupVirtualHug() {
  const hugBtn = document.getElementById("sendVirtualHugBtn");
  const hugModal = document.getElementById("hugModal");
  const closeHugBtn = document.getElementById("closeHugBtn");

  if (hugBtn) {
    hugBtn.addEventListener("click", () => {
      // Vibrate mobile phone if supported
      if (navigator.vibrate) {
        try {
          navigator.vibrate([150, 80, 150, 80, 300]);
        } catch (e) {
          // ignore
        }
      }

      // Audio Virtual Hug
      if (window.romanticAudio) {
        window.romanticAudio.playVirtualHugSound();
      }

      // Huge celebratory explosion of 150+ glowing hearts & petals!
      if (window.romanticParticles) {
        const cx = window.innerWidth / 2;
        const cy = window.innerHeight / 2;
        window.romanticParticles.launchCelebrationExplosion(cx, cy, 160);
      }

      // Open Hug Modal
      if (hugModal) {
        hugModal.classList.add("active");
      }
    });
  }

  if (closeHugBtn && hugModal) {
    closeHugBtn.addEventListener("click", () => {
      hugModal.classList.remove("active");
    });
    hugModal.addEventListener("click", (e) => {
      if (e.target === hugModal) hugModal.classList.remove("active");
    });
  }
}

/* ==========================================================================
   Audio Floating Widget Control
   ========================================================================== */
function setupAudioWidget() {
  const toggleBtn = document.getElementById("musicToggleBtn");
  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      if (window.romanticAudio) {
        window.romanticAudio.toggle();
      }
    });
  }
}

/* ==========================================================================
   Sweet Toast Notification Helper
   ========================================================================== */
function showToast(message) {
  let toast = document.getElementById("madamToast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "madamToast";
    toast.style.cssText = `
      position: fixed;
      bottom: 85px;
      left: 50%;
      transform: translateX(-50%) translateY(20px);
      background: rgba(30, 15, 25, 0.9);
      color: #fff;
      padding: 12px 24px;
      border-radius: 9999px;
      font-size: 0.95rem;
      font-weight: 600;
      box-shadow: 0 10px 25px rgba(0,0,0,0.25);
      z-index: 9999;
      opacity: 0;
      transition: all 0.3s ease;
      pointer-events: none;
      text-align: center;
      max-width: 90vw;
    `;
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.style.opacity = "1";
  toast.style.transform = "translateX(-50%) translateY(0)";

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(-50%) translateY(20px)";
  }, 3200);
}
