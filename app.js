const sections = [
  {
    tag: "WELCOME",
    title: "Explore Bogotá’s public parks",
    text: "A 3D public park scene appears on top of the Hiro marker. Use the navigation buttons to change the educational content.",
    bullets: ["Marker-based WebAR", "No app installation required", "Designed for mobile devices"],
    arText: "Bogota Verde AR\nPublic parks and citizen care",
    overlay: "Bogotá Verde AR"
  },
  {
    tag: "MAP",
    title: "Representative public spaces",
    text: "The prototype presents selected public spaces in Bogotá and explains why they matter for recreation, culture and environmental awareness.",
    bullets: ["Simón Bolívar Park", "National Park", "Los Novios Park"],
    arText: "Map of parks\nBogota public spaces",
    overlay: "Park map"
  },
  {
    tag: "PLACE",
    title: "Simón Bolívar Park",
    text: "A metropolitan park used for recreation, sports, cultural events and citizen meetings.",
    bullets: ["Large green areas", "Walking and cycling routes", "Environmental responsibility"],
    arText: "Simon Bolivar Park\nRecreation + culture",
    overlay: "Simón Bolívar"
  },
  {
    tag: "PLACE",
    title: "National Park",
    text: "An important historical and urban park that connects citizens with green areas, heritage and pedestrian routes.",
    bullets: ["Historical value", "Urban biodiversity", "Respect for common areas"],
    arText: "National Park\nHistory + public space",
    overlay: "National Park"
  },
  {
    tag: "CARE",
    title: "Environmental care",
    text: "Visitors should protect trees, use trash bins correctly, avoid damaging grass and respect urban wildlife.",
    bullets: ["Do not litter", "Protect plants and trees", "Use recycling points"],
    arText: "Environmental care\nUse bins + protect trees",
    overlay: "Environmental care"
  },
  {
    tag: "RULES",
    title: "Public space rules",
    text: "The experience reinforces responsible behavior: respecting pedestrian areas, furniture, bike lanes, pets and other visitors.",
    bullets: ["Take care of urban furniture", "Control pets", "Respect signs and shared routes"],
    arText: "Rules\nRespect shared spaces",
    overlay: "Public rules"
  },
  {
    tag: "QUIZ",
    title: "Mini quiz",
    text: "Answer a quick question to verify if the main environmental care message was understood.",
    bullets: ["Interactive evaluation", "Immediate feedback", "Learning by doing"],
    arText: "Mini quiz\nChoose the best action",
    overlay: "Mini quiz",
    quiz: true
  }
];

let index = 0;
let markerSeen = false;
let overlayForced = true; // ON by default, because the user needs a visible presentation.

const $ = (id) => document.getElementById(id);
const startScreen = $("startScreen");
const markerBadge = $("markerBadge");
const statusBox = $("statusBox");
const htmlPark = $("htmlPark");
const parkOverlayTitle = $("parkOverlayTitle");
const sectionTag = $("sectionTag");
const sectionTitle = $("sectionTitle");
const sectionText = $("sectionText");
const sectionList = $("sectionList");
const counter = $("counter");
const quizBox = $("quizBox");
const quizFeedback = $("quizFeedback");
const arText = $("arText");
const arPanel = $("arPanel");
const menuDrawer = $("menuDrawer");
const sectionButtons = $("sectionButtons");

function updateSection() {
  const s = sections[index];
  sectionTag.textContent = s.tag;
  sectionTitle.textContent = s.title;
  sectionText.textContent = s.text;
  counter.textContent = `${index + 1} / ${sections.length}`;
  sectionList.innerHTML = s.bullets.map(item => `<li>${item}</li>`).join("");
  quizBox.classList.toggle("hidden", !s.quiz);
  quizFeedback.textContent = "";
  parkOverlayTitle.textContent = s.overlay;
  if (arText) arText.setAttribute("value", s.arText);
  if (arPanel) {
    const colors = ["#063d26", "#1f5f99", "#145a32", "#5b3a1a", "#0b6b3a", "#7a4f12", "#6d2d86"];
    arPanel.setAttribute("material", `color: ${colors[index]}; opacity: 0.96; side: double`);
  }
  renderMenuButtons();
}

function renderMenuButtons() {
  sectionButtons.innerHTML = sections.map((s, i) => `
    <button class="${i === index ? "active" : ""}" data-go="${i}">${i + 1}. ${s.title}</button>
  `).join("");
  sectionButtons.querySelectorAll("button").forEach(btn => {
    btn.addEventListener("click", () => {
      index = Number(btn.dataset.go);
      menuDrawer.classList.add("hidden");
      updateSection();
    });
  });
}

function showOverlayIfNeeded() {
  if (overlayForced || markerSeen) htmlPark.classList.remove("hidden");
}
function hideOverlayIfNeeded() {
  if (!overlayForced && !markerSeen) htmlPark.classList.add("hidden");
}

function setMarkerDetected(detected) {
  markerSeen = detected;
  markerBadge.textContent = detected ? "Marker detected" : "Searching marker";
  markerBadge.classList.toggle("detected", detected);
  markerBadge.classList.toggle("waiting", !detected);
  statusBox.textContent = detected
    ? "Marker detected. The 3D model is active. The visible overlay is also enabled for presentation clarity."
    : "Searching for the Hiro marker. Keep it complete, flat and well lit.";
  if (detected) showOverlayIfNeeded(); else hideOverlayIfNeeded();
}

window.addEventListener("DOMContentLoaded", () => {
  updateSection();
  showOverlayIfNeeded();

  $("startBtn").addEventListener("click", () => {
    startScreen.classList.add("hidden");
    statusBox.textContent = "Camera started. Point the phone at the Hiro marker.";
    // Force a resize after the in-app browser UI changes.
    setTimeout(() => window.dispatchEvent(new Event("resize")), 500);
  });

  $("prevBtn").addEventListener("click", () => { index = (index - 1 + sections.length) % sections.length; updateSection(); });
  $("nextBtn").addEventListener("click", () => { index = (index + 1) % sections.length; updateSection(); });
  $("menuBtn").addEventListener("click", () => menuDrawer.classList.remove("hidden"));
  $("closeMenuBtn").addEventListener("click", () => menuDrawer.classList.add("hidden"));

  $("fullViewBtn").addEventListener("click", () => document.body.classList.toggle("full"));
  $("fallbackBtn").addEventListener("click", () => {
    overlayForced = !overlayForced;
    $("fallbackBtn").textContent = overlayForced ? "Hide visible overlay" : "Visible AR overlay";
    if (overlayForced) showOverlayIfNeeded(); else hideOverlayIfNeeded();
  });

  document.querySelectorAll("[data-answer]").forEach(btn => {
    btn.addEventListener("click", () => {
      quizFeedback.textContent = btn.dataset.answer === "right"
        ? "Correct. Waste must be placed in the correct bin."
        : "Try again. The responsible action is to use the correct trash bin.";
    });
  });

  const marker = $("hiroMarker");
  if (marker) {
    marker.addEventListener("markerFound", () => setMarkerDetected(true));
    marker.addEventListener("markerLost", () => setMarkerDetected(false));
  }

  // If the scene/video resizes badly in mobile in-app browsers, this helps.
  window.addEventListener("orientationchange", () => setTimeout(() => window.dispatchEvent(new Event("resize")), 600));
});
