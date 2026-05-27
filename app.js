const SECTIONS = [
  {
    key: "welcome",
    tag: "Welcome",
    title: "Explore Bogotá's public parks",
    body: "Point your camera at the Hiro marker. A 3D public park scene appears on top of the marker and changes according to the section.",
    bullets: ["Marker-based WebAR", "Designed for mobile devices", "No app installation required"],
    arTitle: "Bogota Verde AR",
    arSubtitle: "Explore, learn and care",
    arBody: "A WebAR experience to learn about parks, public space rules, safety and environmental care.",
    color: "#064e3b",
    pins: true
  },
  {
    key: "map",
    tag: "Map",
    title: "Representative parks in Bogotá",
    body: "The prototype presents selected public parks as educational scenarios: Simón Bolívar Park, National Park and Los Novios Park.",
    bullets: ["Location-based learning", "Public space awareness", "Interactive information points"],
    arTitle: "Map of Parks",
    arSubtitle: "Three learning scenarios",
    arBody: "Floating pins identify selected parks and introduce their educational content.",
    color: "#075985",
    pins: true
  },
  {
    key: "simon",
    tag: "Place",
    title: "Simón Bolívar Metropolitan Park",
    body: "A large urban green area for recreation, events, walking, sports and environmental awareness activities.",
    bullets: ["Respect green zones", "Use bins correctly", "Follow signs during crowded events"],
    arTitle: "Simon Bolivar Park",
    arSubtitle: "Recreation and urban nature",
    arBody: "Use this park responsibly: keep it clean, respect shared areas and protect green spaces.",
    color: "#166534",
    focus: "pinA"
  },
  {
    key: "national",
    tag: "Place",
    title: "National Park",
    body: "A traditional public space connected with urban memory, walking routes, culture and citizenship behavior.",
    bullets: ["Protect trees and gardens", "Avoid damaging urban furniture", "Respect other visitors"],
    arTitle: "National Park",
    arSubtitle: "History and citizenship culture",
    arBody: "Public parks are shared spaces: coexistence, care and respect make them useful for everyone.",
    color: "#365314",
    focus: "pinB"
  },
  {
    key: "novios",
    tag: "Place",
    title: "Los Novios Park",
    body: "A recreational park for walking, family plans and outdoor leisure activities that require responsible use.",
    bullets: ["Respect pedestrian areas", "Avoid littering near water zones", "Use designated activity spaces"],
    arTitle: "Los Novios Park",
    arSubtitle: "Family recreation and leisure",
    arBody: "Responsible use keeps recreational spaces safe, clean and enjoyable for citizens and visitors.",
    color: "#0f766e",
    focus: "pinC"
  },
  {
    key: "care",
    tag: "Environmental Care",
    title: "Care for green areas and wildlife",
    body: "The AR scene uses trees, bins and signs to explain simple environmental habits in public parks.",
    bullets: ["Separate recyclable waste", "Do not feed urban wildlife", "Leave the place cleaner than you found it"],
    arTitle: "Environmental Care",
    arSubtitle: "Small actions protect parks",
    arBody: "Sort waste, protect trees, avoid stepping on gardens and respect urban fauna.",
    color: "#15803d"
  },
  {
    key: "rules",
    tag: "Rules",
    title: "Basic rules for shared spaces",
    body: "Rules are transformed into visual and interactive learning elements instead of being only static text on a sign.",
    bullets: ["Care for benches, signs and lights", "Keep pets under control", "Use cycling and pedestrian routes correctly"],
    arTitle: "Public Space Rules",
    arSubtitle: "Use the city responsibly",
    arBody: "Respect common areas, gardens, routes, signs, benches and other visitors.",
    color: "#7c2d12"
  },
  {
    key: "safety",
    tag: "Safety",
    title: "Safe visits and orientation",
    body: "The experience gives simple safety recommendations for citizens and visitors before and during a park visit.",
    bullets: ["Identify meeting points", "Protect personal belongings", "Avoid isolated areas at night"],
    arTitle: "Safety Tips",
    arSubtitle: "Plan, observe and stay aware",
    arBody: "Follow official signs, check entry points, stay with your group and protect personal objects.",
    color: "#1d4ed8"
  },
  {
    key: "quiz",
    tag: "Mini Quiz",
    title: "Learning check",
    body: "Answer short questions to verify if the AR experience was clear and useful for learning.",
    bullets: ["Immediate feedback", "Short questions", "Useful for classroom evaluation"],
    arTitle: "Mini Quiz",
    arSubtitle: "Test what you learned",
    arBody: "Use the screen questions to review environmental care, safety and public space rules.",
    color: "#581c87",
    quiz: true
  }
];

const QUIZ = [
  {
    question: "What should you do with waste in a public park?",
    options: ["Leave it near a tree", "Use the correct bin", "Hide it under a bench"],
    correct: 1
  },
  {
    question: "Which action protects green areas?",
    options: ["Walking on permitted paths", "Damaging plants for photos", "Feeding all animals"],
    correct: 0
  },
  {
    question: "What is a safe action during a visit?",
    options: ["Ignore signs", "Identify meeting points", "Go alone to isolated areas at night"],
    correct: 1
  }
];

let started = false;
let current = 0;
let markerDetected = false;
let demoMode = false;
let quizIndex = 0;
let quizAnswered = false;
let arBound = false;

const els = {
  startScreen: document.getElementById("startScreen"),
  startBtn: document.getElementById("startBtn"),
  ui: document.getElementById("ui"),
  statusBadge: document.getElementById("statusBadge"),
  topTitle: document.getElementById("topTitle"),
  guideText: document.getElementById("guideText"),
  demoBtn: document.getElementById("demoBtn"),
  markerHelp: document.getElementById("markerHelp"),
  contentCard: document.getElementById("contentCard"),
  sectionTag: document.getElementById("sectionTag"),
  sectionTitle: document.getElementById("sectionTitle"),
  sectionBody: document.getElementById("sectionBody"),
  sectionBullets: document.getElementById("sectionBullets"),
  counter: document.getElementById("counter"),
  quizPanel: document.getElementById("quizPanel"),
  prevBtn: document.getElementById("prevBtn"),
  nextBtn: document.getElementById("nextBtn"),
  menuBtn: document.getElementById("menuBtn"),
  menuSheet: document.getElementById("menuSheet"),
  closeMenu: document.getElementById("closeMenu"),
  sectionButtons: document.getElementById("sectionButtons"),
  sceneMount: document.getElementById("sceneMount"),
  template: document.getElementById("arSceneTemplate"),
  arTitle: null,
  arSubtitle: null,
  arBody: null,
  panelBack: null,
  pins: [],
  demoWorld: null,
  demoTitle: null,
  demoSubtitle: null,
  demoBody: null,
  demoPanelBack: null
};

function init() {
  createMenu();
  updateText();
  els.startBtn.addEventListener("click", startAR);
  els.prevBtn.addEventListener("click", () => move(-1));
  els.nextBtn.addEventListener("click", () => move(1));
  els.menuBtn.addEventListener("click", () => els.menuSheet.classList.remove("hidden"));
  els.closeMenu.addEventListener("click", () => els.menuSheet.classList.add("hidden"));
  els.demoBtn.addEventListener("click", toggleDemoMode);
  els.markerHelp.addEventListener("click", () => window.open("marker.html", "_blank"));

  if (location.protocol !== "https:" && location.hostname !== "localhost" && location.hostname !== "127.0.0.1") {
    els.guideText.textContent = "Warning: mobile camera requires HTTPS. Upload the project to GitHub Pages before testing on a phone.";
  }
}

function startAR() {
  if (started) return;
  started = true;
  els.startScreen.classList.add("hidden");
  els.ui.classList.remove("is-hidden");
  setStatus("waiting", "Looking for marker");
  els.sceneMount.appendChild(els.template.content.cloneNode(true));

  setTimeout(bindAR, 1200);
}

function bindAR() {
  if (arBound) return;

  els.arTitle = document.getElementById("arTitle");
  els.arSubtitle = document.getElementById("arSubtitle");
  els.arBody = document.getElementById("arBody");
  els.panelBack = document.getElementById("panelBack");
  els.demoWorld = document.getElementById("demoWorld");
  els.demoTitle = document.getElementById("demoTitle");
  els.demoSubtitle = document.getElementById("demoSubtitle");
  els.demoBody = document.getElementById("demoBody");
  els.demoPanelBack = document.getElementById("demoPanelBack");
  els.pins = ["pinA", "pinB", "pinC"].map(id => document.getElementById(id)).filter(Boolean);

  const marker = document.getElementById("hiroMarker");
  if (marker) {
    marker.addEventListener("markerFound", () => {
      markerDetected = true;
      if (demoMode) toggleDemoMode(false);
      setStatus("detected", "Marker detected");
      els.guideText.textContent = "Good. The 3D park is anchored to the Hiro marker.";
    });
    marker.addEventListener("markerLost", () => {
      markerDetected = false;
      setStatus("waiting", "Looking for marker");
      els.guideText.textContent = "Move the phone back 30–50 cm. Keep the marker flat, complete and well lit.";
    });
  }

  arBound = true;
  updateText();

  setTimeout(() => {
    if (!markerDetected && !demoMode) {
      els.guideText.textContent = "If nothing appears, the marker is not being detected. Open marker.html on another screen or print it, then keep it flat and fully visible.";
    }
  }, 7000);
}

function createMenu() {
  SECTIONS.forEach((s, i) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = `${i + 1}. ${s.tag}`;
    btn.addEventListener("click", () => {
      current = i;
      quizIndex = 0;
      quizAnswered = false;
      updateText();
      els.menuSheet.classList.add("hidden");
    });
    els.sectionButtons.appendChild(btn);
  });
}

function move(direction) {
  current = (current + direction + SECTIONS.length) % SECTIONS.length;
  quizIndex = 0;
  quizAnswered = false;
  updateText();
}

function updateText() {
  const s = SECTIONS[current];
  els.topTitle.textContent = s.title;
  els.sectionTag.textContent = s.tag;
  els.sectionTitle.textContent = s.title;
  els.sectionBody.textContent = s.body;
  els.counter.textContent = `${current + 1} / ${SECTIONS.length}`;
  els.sectionBullets.innerHTML = s.bullets.map(item => `<li>${item}</li>`).join("");

  if (s.quiz) {
    els.quizPanel.classList.remove("hidden");
    renderQuiz();
  } else {
    els.quizPanel.classList.add("hidden");
    els.quizPanel.innerHTML = "";
  }

  if (els.arTitle) {
    els.arTitle.setAttribute("value", s.arTitle);
    els.arSubtitle.setAttribute("value", s.arSubtitle);
    els.arBody.setAttribute("value", s.arBody);
    els.panelBack.setAttribute("material", `color:${s.color}; opacity:0.95; transparent:true`);
    updatePins(s);
  }

  if (els.demoTitle) {
    els.demoTitle.setAttribute("value", s.arTitle);
    els.demoSubtitle.setAttribute("value", s.arSubtitle);
    els.demoBody.setAttribute("value", s.arBody);
    els.demoPanelBack.setAttribute("material", `color:${s.color}; opacity:0.95; transparent:true`);
  }
}

function updatePins(section) {
  els.pins.forEach(pin => {
    pin.setAttribute("visible", section.pins || section.focus ? "true" : "false");
    pin.setAttribute("scale", "1 1 1");
  });
  if (section.focus) {
    els.pins.forEach(pin => {
      if (pin.id !== section.focus) pin.setAttribute("visible", "false");
    });
    const focused = document.getElementById(section.focus);
    if (focused) focused.setAttribute("scale", "1.35 1.35 1.35");
  }
}

function renderQuiz() {
  const q = QUIZ[quizIndex];
  els.quizPanel.innerHTML = `
    <p class="quiz-count">Question ${quizIndex + 1} of ${QUIZ.length}</p>
    <p class="quiz-question">${q.question}</p>
    <div class="quiz-options">
      ${q.options.map((opt, i) => `<button type="button" data-answer="${i}">${opt}</button>`).join("")}
    </div>
    <p id="quizFeedback" class="quiz-feedback"></p>
  `;
  els.quizPanel.querySelectorAll("button[data-answer]").forEach(btn => {
    btn.addEventListener("click", () => answerQuiz(Number(btn.dataset.answer)));
  });
}

function answerQuiz(answer) {
  if (quizAnswered) return;
  quizAnswered = true;
  const q = QUIZ[quizIndex];
  const feedback = document.getElementById("quizFeedback");
  const buttons = els.quizPanel.querySelectorAll("button[data-answer]");
  buttons.forEach((btn, i) => {
    btn.disabled = true;
    if (i === q.correct) btn.classList.add("correct");
    if (i === answer && i !== q.correct) btn.classList.add("wrong");
  });

  feedback.textContent = answer === q.correct ? "Correct. Good public space behavior protects everyone." : "Not quite. Review the information and try the next one.";

  setTimeout(() => {
    quizIndex = (quizIndex + 1) % QUIZ.length;
    quizAnswered = false;
    renderQuiz();
  }, 1800);
}

function toggleDemoMode(force) {
  demoMode = typeof force === "boolean" ? force : !demoMode;
  if (els.demoWorld) els.demoWorld.setAttribute("visible", demoMode ? "true" : "false");
  els.demoBtn.textContent = demoMode ? "Hide demo mode" : "Show demo without marker";
  if (demoMode) {
    setStatus("demo", "Demo mode");
    els.guideText.textContent = "Demo mode shows the 3D content without marker. Use it only if the marker is not detected during presentation.";
  } else if (markerDetected) {
    setStatus("detected", "Marker detected");
  } else {
    setStatus("waiting", "Looking for marker");
  }
}

function setStatus(type, text) {
  els.statusBadge.className = `status ${type}`;
  els.statusBadge.textContent = text;
}

init();
