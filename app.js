const sections = {
  intro: {
    title: "Explore Bogotá's public parks",
    body: "Point your camera at the printed marker. A simple 3D park scene will appear with trees, benches, signs, and floating information.",
    arTitle: "Bogotá Verde AR",
    arBody: "Explore, learn, and take care of Bogotá's public parks.",
    sign: "PUBLIC PARK"
  },
  map: {
    title: "Map of parks and public spaces",
    body: "This prototype presents three representative places: Simón Bolívar Park, National Park, and Parque de los Novios.",
    arTitle: "Park Map",
    arBody: "Simón Bolívar • National Park • Parque de los Novios",
    sign: "PARK MAP"
  },
  simon: {
    title: "Simón Bolívar Park",
    body: "A large urban park used for sports, cultural events, recreation, walking routes, and family activities.",
    arTitle: "Simón Bolívar Park",
    arBody: "Recreation, events, sports, green areas and family activities.",
    sign: "SIMÓN BOLÍVAR"
  },
  national: {
    title: "National Park",
    body: "A traditional public space with cultural value, green areas, pedestrian paths, and urban meeting points.",
    arTitle: "National Park",
    arBody: "History, culture, green areas and citizen coexistence.",
    sign: "NATIONAL PARK"
  },
  novios: {
    title: "Parque de los Novios",
    body: "A recreational space known for its lake, walking areas, outdoor activities, and social gathering zones.",
    arTitle: "Parque de los Novios",
    arBody: "Lake, walking paths, recreation and public enjoyment.",
    sign: "LOS NOVIOS"
  },
  care: {
    title: "Environmental care",
    body: "Use trash bins, protect trees and gardens, avoid feeding wildlife, and keep the park clean for other visitors.",
    arTitle: "Environmental Care",
    arBody: "Use bins • Protect green areas • Respect urban wildlife",
    sign: "CARE AREA"
  },
  rules: {
    title: "Public space rules",
    body: "Respect pedestrian areas, take care of benches and signs, control pets, avoid damaging common areas, and follow park instructions.",
    arTitle: "Public Space Rules",
    arBody: "Respect paths • Care for furniture • Control pets",
    sign: "RULES"
  },
  safety: {
    title: "Safety recommendations",
    body: "Keep personal belongings safe, follow signs, avoid isolated areas at night, and identify meeting points before starting your visit.",
    arTitle: "Safety Tips",
    arBody: "Protect belongings • Follow signs • Use meeting points",
    sign: "SAFETY"
  },
  quiz: {
    title: "Mini quiz",
    body: "Answer a short question about responsible behavior in public parks. The purpose is to reinforce environmental care and civic culture.",
    arTitle: "Mini Quiz",
    arBody: "Question: Which action helps protect public parks?",
    sign: "QUIZ"
  }
};

const uiTitle = document.getElementById("uiTitle");
const uiBody = document.getElementById("uiBody");
const arTitle = document.getElementById("arTitle");
const arBody = document.getElementById("arBody");
const signText = document.getElementById("signText");
const quizBox = document.getElementById("quizBox");
const feedback = document.getElementById("quizFeedback");
const markerStatus = document.getElementById("markerStatus");
const hiroMarker = document.getElementById("hiroMarker");

function updateSection(sectionKey) {
  const section = sections[sectionKey];
  uiTitle.textContent = section.title;
  uiBody.textContent = section.body;
  arTitle.setAttribute("value", section.arTitle);
  arBody.setAttribute("value", section.arBody);
  signText.setAttribute("value", section.sign);
  quizBox.classList.toggle("hidden", sectionKey !== "quiz");
  feedback.textContent = "";

  document.querySelectorAll(".menu-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.section === sectionKey);
  });
}

document.querySelectorAll(".menu-btn").forEach((btn) => {
  btn.addEventListener("click", () => updateSection(btn.dataset.section));
});

document.querySelectorAll(".answer").forEach((answer) => {
  answer.addEventListener("click", () => {
    const isCorrect = answer.dataset.correct === "true";
    feedback.textContent = isCorrect
      ? "Correct. Responsible use helps preserve public parks."
      : "Try again. Think about actions that protect green areas and common spaces.";
    feedback.style.color = isCorrect ? "#1b5e20" : "#b91c1c";
  });
});

if (hiroMarker) {
  hiroMarker.addEventListener("markerFound", () => {
    markerStatus.textContent = "Marker detected";
  });

  hiroMarker.addEventListener("markerLost", () => {
    markerStatus.textContent = "Looking for marker...";
  });
}

updateSection("intro");
