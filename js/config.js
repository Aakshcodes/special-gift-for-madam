/**
 * =========================================================================
 * 💗 A LITTLE WORLD FOR MY MADAM - CONFIGURATION 💗
 * =========================================================================
 * You can customize names, countdown date, memories, coupons, and messages
 * right here! Everything is clearly organized.
 */

const MADAM_CONFIG = {
  // --- Personal Details ---
  herName: "Madam Jiii",
  herNickname: "Meri Jaan",
  senderName: "Your favourite person",
  
  // --- Countdown Target Date ---
  // Default is set to 3 days from now. 
  // Format: "YYYY-MM-DDTHH:MM:SS" (e.g., "2026-11-20T18:00:00")
  meetingDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
  meetingLocation: "In each other's arms",

  // --- Background Music Configuration ---
  music: {
    title: "A Gentle Melody For Madam 🎵",
    artist: "With Love",
    // Set customAudioUrl to an mp3 file like 'assets/music/our-song.mp3' if you have one.
    // If empty or null, the built-in romantic Web Audio piano synthesizer plays automatically!
    customAudioUrl: "",
    autoplayAfterInteraction: true
  },

  // --- Floating Bubble Nicknames (Welcome Section) ---
  floatingBadges: [
    { text: "My Madam 👑", emoji: "💖" },
    { text: "Meri Jaan 🥺", emoji: "✨" },
    { text: "Cutieee 🥰", emoji: "🌸" },
    { text: "My Favourite Human 💫", emoji: "💌" },
    { text: "My Happiness 🌷", emoji: "💕" },
    { text: "Princess 🎀", emoji: "👑" },
    { text: "Dr. Boyfriend's Patient 🩺", emoji: "🌡️" }
  ],

  // --- Memory Lane Polaroids & Videos ---
  // To replace with your own photos, place them in 'assets/images/' and update the paths!
  memories: [
    {
      id: 1,
      type: "image",
      src: "assets/images/scrapbook-collage.jpg",
      title: "Our Golden Days Together 📸",
      date: "Forever in my heart",
      location: "Everywhere with you",
      caption: "Every single laugh, every whispered secret, and every quiet moment with you is my favourite place to be.",
      rotation: "-3deg",
      tapeColor: "pink"
    },
    {
      id: 2,
      type: "image",
      src: "assets/images/ldr-couple-polaroid.jpg",
      title: "The Warmest Smile 🌸",
      date: "Our special date",
      location: "Hand in Hand",
      caption: "I still remember the feeling of holding your hand for the first time. The world faded away, and only you mattered.",
      rotation: "2.5deg",
      tapeColor: "lavender"
    },
    {
      id: 3,
      type: "image",
      src: "assets/images/cute-cat.jpg",
      title: "How You Look At Me 🥺",
      date: "A sunny afternoon",
      location: "Where we smiled the most",
      caption: "Your cute little expressions are my absolute favorite thing in the universe. Can't wait to see you giggle again once this fever is gone!",
      rotation: "-2deg",
      tapeColor: "peach"
    },
    {
      id: 4,
      type: "image",
      src: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=800&q=80",
      fallbackSrc: "assets/images/dreamy-hearts-bg.jpg",
      title: "Sunset & Us 🌅",
      date: "Dreamy evening",
      location: "Under the pastel sky",
      caption: "Even the prettiest sunset looks ordinary compared to how gorgeous you look when you smile at me.",
      rotation: "3deg",
      tapeColor: "pink"
    },
    {
      id: 5,
      type: "image",
      src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80",
      fallbackSrc: "assets/images/pink-envelope.jpg",
      title: "Quiet Stargazing ✨",
      date: "Late night talks",
      location: "Under the same moon",
      caption: "We might be miles apart under the night sky right now, but we are looking at the exact same stars.",
      rotation: "-2.5deg",
      tapeColor: "lavender"
    },
    {
      id: 6,
      type: "video",
      // You can add your own video file (e.g. assets/videos/our-video.mp4) or embed link
      src: "",
      poster: "assets/images/scrapbook-collage.jpg",
      title: "A Video Message For You 🎥",
      date: "Recorded with love",
      location: "Directly from my heart",
      caption: "Just a reminder that you are loved beyond words. Put on your headphones and smile for me!",
      rotation: "1.5deg",
      tapeColor: "peach"
    }
  ],

  // --- Things I Owe You Coupons (Section 7) ---
  coupons: [
    {
      id: "hugs",
      icon: "🫂",
      title: "1000+ Warm Hugs",
      subtitle: "Non-stop supply",
      badge: "Unlimited",
      description: "Anytime you feel cold, low, tired, or just need to disappear into my chest. Valid 24/7/365 with extra warmth!",
      sweetNote: "P.S. Interest accumulates daily. You'll get at least 1500 when I see you!",
      redeemMessage: "Coupon officially stamped! Claimable immediately upon arrival ❤️"
    },
    {
      id: "kisses",
      icon: "😘",
      title: "Forehead Kisses",
      subtitle: "Soft & gentle",
      badge: "Pure Love",
      description: "Gentle kisses on your forehead every time you worry, when you wake up, and when you fall asleep in my arms.",
      sweetNote: "Proven to instantly cure headaches, fever, and overthinking!",
      redeemMessage: "Forehead kissed 100 times in advance! Feel the love! 💋"
    },
    {
      id: "food",
      icon: "🍓",
      title: "Your Favourite Food",
      subtitle: "Delivered & fed to you",
      badge: "Treat Pass",
      description: "Whatever madam craves: chocolates, pastries, hot comfort soup, street treats, or a homemade candlelight feast.",
      sweetNote: "You don't even have to lift a finger. I will feed you every bite!",
      redeemMessage: "Order placed in my heart! Get ready for a delicious feast! 🍲"
    },
    {
      id: "cuddles",
      icon: "💗",
      title: "Endless Cuddles",
      subtitle: "Cozy blanket mode",
      badge: "Irrevocable",
      description: "Tucked inside warm blankets, listening to music or watching your favourite shows without a single worry in the world.",
      sweetNote: "No phones, no alarms, just us wrapped up like little burritos.",
      redeemMessage: "Blanket fortress prepared! Cuddles locked in forever! 🧸"
    },
    {
      id: "longhug",
      icon: "❤️",
      title: "One Very Long Hug",
      subtitle: "The second we meet",
      badge: "Priority #1",
      description: "A hug so tight and long that all the sadness of distance melts away. I am not letting you go for at least 10 minutes!",
      sweetNote: "Warning: May cause intense butterflies and tears of pure happiness.",
      redeemMessage: "Countdown activated! Holding you tight in my thoughts right now! 🫂"
    }
  ],

  // --- Dr. Boyfriend's Fever Care Kit ---
  careKit: [
    { id: "soup", icon: "🥣", label: "Hot Comfort Soup", status: "Delivering warmth", tip: "Warm fluids help soothe your throat and boost your strength!" },
    { id: "water", icon: "💧", label: "Hydration Reminder", status: "Drink a sip now", tip: "Madam, please drink a glass of lukewarm water right now for me!" },
    { id: "medicine", icon: "💊", label: "Medicines on Time", status: "As prescribed", tip: "Take your fever meds on time, no skipping allowed!" },
    { id: "blanket", icon: "🛏️", label: "Cozy Rest & Nap", status: "Zero overthinking", tip: "Close your pretty eyes and take a restful nap. I'll be in your dreams." }
  ]
};
