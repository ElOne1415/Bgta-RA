const sections = {
  welcome: {
    icon: "🌿",
    tag: "Welcome",
    title: "Explore Bogotá's public parks",
    arTitle: "Bogota Verde AR",
    arSubtitle: "Marker-based Web Augmented Reality",
    arBody: "Move through the menu to explore parks, environmental care, public space rules, safety tips and a mini quiz.",
    text: "Point your camera at the Hiro marker to display the AR park model. Use the menu to change the content shown in the augmented scene.",
    bullets: ["Web-based experience", "No app installation required", "Designed for mobile devices and classroom presentation"],
    color: "#0f5132",
    pins: true
  },
  map: {
    icon: "🗺️",
    tag: "Map",
    title: "Representative public spaces",
    arTitle: "Map of Public Spaces",
    arSubtitle: "Bogota parks and urban meeting points",
    arBody: "The AR scene highlights representative green spaces: Simon Bolivar Park, National Park and Los Novios Park.",
    text: "This section presents a simplified map of public spaces in Bogotá. The floating markers indicate places that citizens can visit, care for and use responsibly.",
    bullets: ["Parks as learning scenarios", "Public space as a shared resource", "AR markers support visual exploration"],
    color: "#155e75",
    pins: true
  },
  simon: {
    icon: "🌳",
    tag: "Place information",
    title: "Simón Bolívar Metropolitan Park",
    arTitle: "Simon Bolivar Park",
    arSubtitle: "Recreation, events and urban nature",
    arBody: "A large green area for walking, resting, sports, cultural events and environmental awareness activities.",
    text: "The user can access a short information card with the place name, location reference, main activities, services and visit recommendations.",
    bullets: ["Use trash bins correctly", "Respect green zones and shared spaces", "Follow signs during crowded events"],
    color: "#166534",
    focus: "pinA"
  },
  national: {
    icon: "🏞️",
    tag: "Place information",
    title: "National Park",
    arTitle: "National Park",
    arSubtitle: "History, culture and citizenship",
    arBody: "A traditional public space connected with urban memory, walking routes, social meeting points and responsible coexistence.",
    text: "This card connects the park with citizenship culture: respect, peaceful coexistence, care of furniture and responsible behavior in shared spaces.",
    bullets: ["Protect trees and gardens", "Avoid damaging urban furniture", "Keep pets under control"],
    color: "#365314",
    focus: "pinB"
  },
  novios: {
    icon: "🚣",
    tag: "Place information",
    title: "Los Novios Park",
    arTitle: "Los Novios Park",
    arSubtitle: "Family recreation and leisure",
    arBody: "A public space for leisure, walking, family plans and outdoor activities that require responsible use.",
    text: "This section reinforces the idea that recreational spaces need rules, maintenance and citizen responsibility to remain safe and useful.",
    bullets: ["Respect pedestrian areas", "Avoid littering near water zones", "Use designated activity spaces"],
    color: "#0f766e",
    focus: "pinC"
  },
  care: {
    icon: "♻️",
    tag: "Environmental care",
    title: "Care for green areas and wildlife",
    arTitle: "Environmental Care",
    arSubtitle: "Small actions protect public parks",
    arBody: "Sort waste, protect trees, avoid stepping on gardens, do not feed wildlife and leave the place cleaner than you found it.",
    text: "The AR content teaches responsible habits through visual elements: trees, bins, green zones and floating reminders.",
    bullets: ["Separate recyclable and non-recyclable waste", "Use bins instead of leaving trash on the grass", "Respect urban fauna and vegetation"],
    color: "#15803d",
    pins: false
  },
  rules: {
    icon: "📌",
    tag: "Public space rules",
    title: "Basic rules for shared spaces",
    arTitle: "Public Space Rules",
    arSubtitle: "Use the city responsibly",
    arBody: "Respect pedestrian zones, cycling paths, gardens, signs, benches, playgrounds and common areas.",
    text: "The purpose is not only to show information, but to transform rules into a visual and interactive learning object.",
    bullets: ["Do not damage benches, signs or lights", "Keep pets controlled", "Use cycling paths and pedestrian routes correctly"],
    color: "#7c2d12",
    pins: false
  },
  safety: {
    icon: "🛡️",
    tag: "Safety",
    title: "Safe visits and orientation",
    arTitle: "Safety Tips",
    arSubtitle: "Plan, observe and stay aware",
    arBody: "Identify meeting points, follow signs, protect personal objects and avoid isolated areas at night.",
    text: "This section gives simple recommendations that make the experience useful for citizens and visitors before and during a park visit.",
    bullets: ["Share your location with companions", "Check entry and exit points", "Follow official signs and staff instructions"],
    color: "#1d4ed8",
    pins: false
  },
  quiz: {
    icon: "✅",
    tag: "Mini quiz",
    title: "Learning check",
    arTitle: "Mini Quiz",
    arSubtitle: "Test what you learned",
    arBody: "Answer the questions on the screen. The quiz checks environmental care, public space rules and safe behavior.",
    text: "The mini quiz helps evaluate if the AR experience was clear and useful for learning.",
    bullets: ["Immediate feedback", "Short questions", "Designed for classroom evaluation"],
    color: "#581c87",
    pins: false,
    quiz: true
  }
};

const quizQuestions = [
  {
    q: "What should you do with waste in a public park?",
    options: ["Leave it near a tree", "Use the correct bin", "Hide it under a bench"],
    correct: 1,
    feedback: "Correct. Responsible waste management protects the park and other visitors."
  },
  {
    q: "Which behavior helps protect green areas?",
    options: ["Walking only on permitted paths", "Damaging plants for photos", "Feeding all animals"],
    correct: 0,
    feedback: "Correct. Using permitted paths reduces damage to gardens and vegetation."
  },
  {
    q: "What is a safe action during a visit?",
    options: ["Ignore signage", "Identify meeting points", "Go alone to isolated zones at night"],
    correct: 1,
    feedback: "Correct. Meeting points and signs improve orientation and safety."
  },
  {
    q: "Why is AR useful in this project?",
    options: ["It only decorates the page", "It turns information into interactive visual learning", "It replaces all park rules"],
    correct: 1,
    feedback: "Correct. AR supports visual, interactive and contextual learning."
  }
];

let currentSection = "welcome";
let quizIndex = 0;
let quizAnswered = false;

const startPanel = document.getElementById("startPanel");
const startBtn = document.getElementById("startBtn");
const resetBtn = document.getElementById("resetBtn");
const menuButtons = document.getElementById("menuButtons");
const trackingBadge = document.getElementById("trackingBadge");
const quizPanel = document.getElementById("quizPanel");

const ui = {
  tag: document.getElementById("sectionTag"),
  title: document.getElementById("sectionTitle"),
  text: document.getElementById("sectionText"),
  bullets: document.getElementById("sectionBullets"),
  arTitle: document.getElementById("arTitle"),
  arSubtitle: document.getElementById("arSubtitle"),
  arBody: document.getElementById("arBody"),
  cardBack: document.getElementById("cardBack"),
  grassBase: document.getElementById("grassBase"),
  pins: [document.getElementById("pinA"), document.getElementById("pinB"), document.getElementById("pinC")],
  pinA: document.getElementById("pinA"),
  pinB: document.getElementById("pinB"),
  pinC: document.getElementById("pinC"),
  arRoot: document.getElementById("arRoot")
};

function init() {
  createMenu();
  setSection("welcome");
  bindMarkerEvents();

  startBtn.addEventListener("click", () => {
    startPanel.classList.add("hidden");
    document.body.classList.add("is-started");
    setTimeout(() => setTracking("waiting"), 300);
  });

  resetBtn.addEventListener("click", () => setSection("welcome"));

  if (location.protocol !== "https:" && !location.hostname.includes("localhost")) {
    startPanel.querySelector(".start-note").textContent = "Warning: camera access on mobile requires HTTPS. Upload this project to GitHub Pages before testing on a phone.";
  }
}

function createMenu() {
  Object.entries(sections).forEach(([key, section]) => {
    const button = document.createElement("button");
    button.type = "button";
    button.dataset.section = key;
    button.innerHTML = `<span aria-hidden="true">${section.icon}</span><span>${section.tag}</span>`;
    button.addEventListener("click", () => setSection(key));
    menuButtons.appendChild(button);
  });
}

function setSection(key) {
  currentSection = key;
  const section = sections[key];

  ui.tag.textContent = section.tag;
  ui.title.textContent = section.title;
  ui.text.textContent = section.text;
  ui.bullets.innerHTML = section.bullets.map(item => `<li>${item}</li>`).join("");

  ui.arTitle.setAttribute("value", section.arTitle);
  ui.arSubtitle.setAttribute("value", section.arSubtitle);
  ui.arBody.setAttribute("value", section.arBody);
  ui.cardBack.setAttribute("material", `color: ${section.color}; opacity: 0.94; transparent: true`);

  setPins(section);
  animateRoot();
  updateMenuState(key);

  if (section.quiz) {
    quizPanel.classList.remove("hidden");
    quizIndex = 0;
    quizAnswered = false;
    renderQuiz();
  } else {
    quizPanel.classList.add("hidden");
    quizPanel.innerHTML = "";
  }
}

function setPins(section) {
  ui.pins.forEach(pin => {
    pin.setAttribute("visible", section.pins || section.focus ? "true" : "false");
    pin.setAttribute("scale", "0.85 0.85 0.85");
  });

  if (section.focus) {
    ui.pins.forEach(pin => {
      if (pin.id !== section.focus) pin.setAttribute("visible", "false");
    });
    const focused = document.getElementById(section.focus);
    focused.setAttribute("visible", "true");
    focused.setAttribute("scale", "1.35 1.35 1.35");
  }
}

function updateMenuState(key) {
  document.querySelectorAll(".menu-buttons button").forEach(button => {
    button.classList.toggle("is-active", button.dataset.section === key);
  });
}

function animateRoot() {
  ui.arRoot.removeAttribute("animation__pulse");
  ui.arRoot.setAttribute("animation__pulse", {
    property: "scale",
    from: "0.96 0.96 0.96",
    to: "1 1 1",
    dur: 280,
    easing: "easeOutQuad"
  });
}

function renderQuiz() {
  const item = quizQuestions[quizIndex];
  quizPanel.innerHTML = `
    <p class="quiz-question">${quizIndex + 1}. ${item.q}</p>
    <div class="quiz-options">
      ${item.options.map((option, index) => `<button type="button" data-option="${index}">${option}</button>`).join("")}
    </div>
    <p class="quiz-feedback hidden"></p>
  `;

  quizPanel.querySelectorAll("[data-option]").forEach(button => {
    button.addEventListener("click", () => answerQuiz(Number(button.dataset.option)));
  });
}

function answerQuiz(answerIndex) {
  if (quizAnswered) return;
  quizAnswered = true;

  const item = quizQuestions[quizIndex];
  const buttons = quizPanel.querySelectorAll("[data-option]");
  const feedback = quizPanel.querySelector(".quiz-feedback");

  buttons.forEach((button, index) => {
    button.disabled = true;
    if (index === item.correct) button.classList.add("correct");
    if (index === answerIndex && answerIndex !== item.correct) button.classList.add("wrong");
  });

  feedback.classList.remove("hidden");
  feedback.textContent = answerIndex === item.correct ? item.feedback : `Review: ${item.feedback}`;

  const next = document.createElement("button");
  next.type = "button";
  next.className = "quiz-next";
  next.textContent = quizIndex < quizQuestions.length - 1 ? "Next question" : "Restart quiz";
  next.addEventListener("click", () => {
    quizIndex = quizIndex < quizQuestions.length - 1 ? quizIndex + 1 : 0;
    quizAnswered = false;
    renderQuiz();
  });
  quizPanel.appendChild(next);
}

function bindMarkerEvents() {
  const marker = document.getElementById("hiroMarker");
  marker.addEventListener("markerFound", () => setTracking("visible"));
  marker.addEventListener("markerLost", () => setTracking("lost"));
}

function setTracking(state) {
  trackingBadge.className = "tracking-badge";
  if (state === "visible") {
    trackingBadge.textContent = "Marker detected";
    trackingBadge.classList.add("is-visible");
  } else if (state === "lost") {
    trackingBadge.textContent = "Marker lost";
    trackingBadge.classList.add("is-lost");
  } else {
    trackingBadge.textContent = "Searching marker";
    trackingBadge.classList.add("is-waiting");
  }
}

document.addEventListener("DOMContentLoaded", init);
