
// ==========================================
// GARDENIA WRAPPED — 2026
// ==========================================

// Date she must enter: YYYY-MM-DD
const ACCESS_DATE = "2007-11-19";

const contentScreens = [
  "welcome",
  "wish",
  "gallery",
  "hope",
  "dua",
  "last",
  "thankyou"
];

const allScreens = ["gate", "song", ...contentScreens];

const screenElements = Object.fromEntries(
  allScreens.map((name) => [
    name,
    document.querySelector(`[data-screen="${name}"]`)
  ])
);

// ==========================================
// ELEMENTS
// ==========================================

const controls = document.getElementById("page-controls");
const backButton = document.getElementById("back-button");
const nextButton = document.getElementById("next-button");
const progressFill = document.getElementById("progress-fill");
const progressLabel = document.getElementById("progress-label");

const dateForm = document.getElementById("date-form");
const dateInput = document.getElementById("birthday-date");
const dateMessage = document.getElementById("date-message");

const lightbox = document.getElementById("lightbox");
const lightboxClose = document.getElementById("lightbox-close");
const lightboxCaption = document.getElementById("lightbox-caption");
const lightboxImage = document.getElementById("lightbox-image");

const celebrationBurst = document.getElementById("celebration-burst");

let currentScreen = "gate";
let contentIndex = 0;
let celebrationTimeout;


// ==========================================
// SHOW A SCREEN
// ==========================================

function showScreen(name) {

  const previousScreen = currentScreen;
  const target = screenElements[name];

  if (!target) {
    console.error("Screen not found:", name);
    return;
  }

  // Hide all other screens
  Object.entries(screenElements).forEach(([screenName, element]) => {
    const isCurrent = screenName === name;

    element.hidden = !isCurrent;
    element.classList.toggle("is-active", isCurrent);
  });

  currentScreen = name;

  // Navigation controls
  const isContent = contentScreens.includes(name);
  controls.hidden = !isContent;

  if (isContent) {
    contentIndex = contentScreens.indexOf(name);

    const progress =
      ((contentIndex + 1) / contentScreens.length) * 100;

    progressFill.style.width = `${progress}%`;

    progressLabel.textContent =
      `${String(contentIndex + 1).padStart(2, "0")} / ${String(contentScreens.length).padStart(2, "0")}`;

    backButton.disabled = false;

    nextButton.textContent =
      contentIndex === contentScreens.length - 1
        ? "Finish ♡"
        : "Next →";
  }

  // THE BIG SURPRISE
  // Only launches when moving from song to welcome.
  if (previousScreen === "song" && name === "welcome") {
    launchGardeniaSurprise();
  }

  window.scrollTo({
    top: 0,
    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "auto"
      : "smooth"
  });
}


// ==========================================
// DATE ENTRY
// ==========================================

dateForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const enteredDate = dateInput.value;

  if (!enteredDate) {
    dateMessage.textContent = "Choose your special date first ♡";
    return;
  }

  if (ACCESS_DATE === "YYYY-MM-DD") {
    dateMessage.textContent =
      "Setup needed: add the correct date in script.js first.";
    return;
  }

  if (enteredDate !== ACCESS_DATE) {
    dateMessage.textContent =
      "Not quite, try that special date again ♡";

    dateInput.value = "";
    dateInput.focus();
    return;
  }

  dateMessage.textContent = "";
  showScreen("song");
});


// ==========================================
// SONG PAGE → WELCOME PAGE
// ==========================================

document.querySelectorAll("[data-next]").forEach((button) => {
  button.addEventListener("click", () => {
    showScreen("welcome");
  });
});


// ==========================================
// NEXT BUTTON
// ==========================================

nextButton.addEventListener("click", () => {

  if (contentIndex === contentScreens.length - 1) {
    showScreen("gate");

    dateInput.value = "";
    dateMessage.textContent = "";

    return;
  }

  showScreen(contentScreens[contentIndex + 1]);
});


// ==========================================
// BACK BUTTON
// ==========================================

backButton.addEventListener("click", () => {

  if (contentIndex === 0) {
    showScreen("song");
    return;
  }

  showScreen(contentScreens[contentIndex - 1]);
});


// ==========================================
// RESTART BUTTON
// ==========================================

document.getElementById("restart-button").addEventListener("click", () => {
  showScreen("welcome");
});


// ==========================================
// GARDENIA SURPRISE — EMOJI BURST
// ==========================================

function launchGardeniaSurprise() {

  if (!celebrationBurst) {
    console.error("Celebration container not found!");
    return;
  }

  // Respect reduced-motion settings
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  // Clear previous animation
  clearTimeout(celebrationTimeout);
  celebrationBurst.innerHTML = "";

  const emojis = [
    "💗", "💕", "🌷", "🌸",
    "💐", "♡", "🌼", "💖",
    "🌺", "✨", "🩷", "🌹"
  ];

  // Create 45 flying emojis
  for (let i = 0; i < 45; i++) {

    const particle = document.createElement("span");

    particle.className = "flying-emoji";

    particle.textContent =
      emojis[Math.floor(Math.random() * emojis.length)];

    // Random starting position
    particle.style.setProperty(
      "--start-x",
      `${Math.random() * 100}%`
    );

    // Random size
    particle.style.setProperty(
      "--emoji-size",
      `${18 + Math.random() * 25}px`
    );

    // Random animation duration
    particle.style.setProperty(
      "--fly-duration",
      `${2.5 + Math.random() * 2}s`
    );

    // Staggered launch
    particle.style.setProperty(
      "--fly-delay",
      `${Math.random() * 0.8}s`
    );

    // Random sideways movement
    particle.style.setProperty(
      "--drift",
      `${-120 + Math.random() * 240}px`
    );

    // Random rotation
    particle.style.setProperty(
      "--rotation",
      `${-360 + Math.random() * 720}deg`
    );

    celebrationBurst.appendChild(particle);
  }

  // Remove emojis after animation
  celebrationTimeout = setTimeout(() => {
    celebrationBurst.innerHTML = "";
  }, 6500);
}

// ==========================================
// INTERACTIVE GIFT BOX (TIME MACHINE)
// ==========================================

const giftStage = document.getElementById("gift-stage");
const giftBox = document.getElementById("gift-box");
const giftPrompt = document.getElementById("gift-prompt");
const memoryGrid = document.getElementById("memory-grid");
const galleryHint = document.getElementById("gallery-hint");

let giftTaps = 0;

function launchBoxBurst() {
  if (!celebrationBurst || !giftBox) return;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  // Get exact center coordinates of the gift box on screen
  const rect = giftBox.getBoundingClientRect();
  const originX = rect.left + rect.width / 2;
  const originY = rect.top + rect.height / 2;

  clearTimeout(celebrationTimeout);
  celebrationBurst.innerHTML = "";

  const emojis = [
    "💗", "💕", "🌷", "🌸",
    "💐", "♡", "🌼", "💖",
    "🌺", "✨", "🩷", "🌹"
  ];

  // Create 45 emojis erupting out of the box
  for (let i = 0; i < 45; i++) {
    const particle = document.createElement("span");
    particle.className = "box-emoji";
    particle.textContent = emojis[Math.floor(Math.random() * emojis.length)];

    // Start right inside the box
    particle.style.setProperty("--origin-x", `${originX}px`);
    particle.style.setProperty("--origin-y", `${originY}px`);

    // Fan upward and outward in a wide fountain arc
    const angle = (-155 + Math.random() * 130) * (Math.PI / 180);
    const distance = 160 + Math.random() * 340;
    const endX = Math.cos(angle) * distance;
    const endY = Math.sin(angle) * distance;

    particle.style.setProperty("--end-x", `${endX}px`);
    particle.style.setProperty("--end-y", `${endY}px`);
    particle.style.setProperty("--emoji-size", `${18 + Math.random() * 22}px`);
    particle.style.setProperty("--fly-duration", `${1.4 + Math.random() * 1.1}s`);
    particle.style.setProperty("--fly-delay", `${Math.random() * 0.18}s`);
    particle.style.setProperty("--rotation", `${-360 + Math.random() * 720}deg`);

    celebrationBurst.appendChild(particle);
  }

  celebrationTimeout = setTimeout(() => {
    celebrationBurst.innerHTML = "";
  }, 3000);
}

if (giftBox && memoryGrid) {
  giftBox.addEventListener("click", () => {
    if (giftTaps >= 3) return;

    giftTaps += 1;

    giftBox.classList.remove("shake-slow", "shake-hard");
    void giftBox.offsetWidth;

    if (giftTaps === 1) {
      giftBox.classList.add("shake-slow");
      giftPrompt.textContent = "Hmm, something's inside... tap again! (1 / 3)";
    } else if (giftTaps === 2) {
      giftBox.classList.add("shake-hard");
      giftPrompt.textContent = "Almost open! One more tap! (2 / 3)";
    } else if (giftTaps === 3) {
      giftBox.classList.add("is-opened");
      giftPrompt.textContent = "Surprise! ♡";

      // Shoot emojis out of the box right as the lid pops off!
      launchBoxBurst();

      setTimeout(() => {
        giftStage.classList.add("is-gone");
        memoryGrid.classList.remove("is-locked");
        memoryGrid.classList.add("is-revealed");
        if (galleryHint) galleryHint.hidden = false;
      }, 480);
    }
  });
}

// ==========================================
// GALLERY LIGHTBOX
// ==========================================

document.querySelectorAll("[data-memory]").forEach((card) => {

  card.addEventListener("click", () => {

    const image = card.querySelector("img");

    if (!image || !lightboxImage) return;

    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;

    lightboxCaption.textContent = card.dataset.memory;

    lightbox.hidden = false;
    lightboxClose.focus();
  });

});

function closeLightbox() {

  lightbox.hidden = true;

  if (lightboxImage) {
    lightboxImage.src = "";
  }
}

lightboxClose.addEventListener("click", closeLightbox);

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

document.addEventListener("keydown", (event) => {

  if (event.key === "Escape" && !lightbox.hidden) {
    closeLightbox();
  }

});


// ==========================================
// BRAND LOGO → HOME
// ==========================================

document.getElementById("brand-home").addEventListener("click", (event) => {

  event.preventDefault();

  showScreen("gate");

  dateInput.value = "";
  dateMessage.textContent = "";

});


// ==========================================
// AUDIO DEBUGGER
// ==========================================

const gardeniaAudio = document.getElementById("gardenia-audio");
const audioStatus = document.getElementById("audio-status");

if (gardeniaAudio && audioStatus) {

  gardeniaAudio.addEventListener("loadstart", () => {
    audioStatus.textContent = "Loading your song...";
  });

  gardeniaAudio.addEventListener("canplay", () => {
    audioStatus.textContent = "Ready to play ♡";
  });

  gardeniaAudio.addEventListener("playing", () => {
    audioStatus.textContent = "Now playing ♡";
  });

  gardeniaAudio.addEventListener("error", () => {

    const error = gardeniaAudio.error;

    audioStatus.textContent = error
      ? `Audio error code: ${error.code}`
      : "Something went wrong loading the song.";

    console.error("Gardenia audio error:", error);
  });

  gardeniaAudio.addEventListener("ended", () => {
    audioStatus.textContent = "Thank you for listening ♡";
  });

}


// ==========================================
// INITIALIZE
// ==========================================

showScreen("gate");
