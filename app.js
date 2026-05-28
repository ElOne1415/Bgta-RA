const PARKS = {
  simon: {
    title: "Simón Bolívar Metropolitan Park",
    tag: "AR 01 · GREEN LUNG",
    className: "model-simon",
    info: "One of Bogotá's most representative public parks, located in Teusaquillo. Its large green areas, sports spaces, events and lake make it a central urban recreation area.",
    bullets: ["Locality: Teusaquillo", "Large green areas: approx. 910,000 m²", "Main attraction: 10-hectare lake with boats and oars"],
    mission: "Citizen mission: keep shared green areas clean, respect the lake area and use public facilities responsibly during events and recreation.",
    quiz: { q: "Which feature belongs to Simón Bolívar Park?", options: ["A 10-hectare lake", "A salt cathedral", "A desert ecosystem"], answer: 0 }
  },
  national: {
    title: "National Park Enrique Olaya Herrera",
    tag: "AR 02 · HERITAGE",
    className: "model-national",
    info: "A historic and emblematic public park in Bogotá. It was inaugurated in 1934 and connects recreation, monuments, pedestrian paths and environmental value near the eastern hills.",
    bullets: ["Locality: Santa Fe", "Official inauguration: 1934", "Declared a National Monument in 1996"],
    mission: "Citizen mission: protect historical spaces, respect signage, avoid fires and take care of trees, paths and public bathrooms.",
    quiz: { q: "In which year was the National Park inaugurated?", options: ["1934", "1975", "2018"], answer: 0 }
  },
  novios: {
    title: "Parque de los Novios / El Lago",
    tag: "AR 03 · WATER LIFE",
    className: "model-novios",
    info: "A 23-hectare recreational park in Barrios Unidos, known for its lake, picnic areas, green zones and water activities such as rowing boats, pedal boats and kayak.",
    bullets: ["Locality: Barrios Unidos", "Area: 23 hectares", "Main attraction: lake with birds, fish and boating activities"],
    mission: "Citizen mission: use bins, do not waste water, leave picnic areas clean and never approach the lake shore without permission.",
    quiz: { q: "What is the main attraction of Parque de los Novios?", options: ["A lake", "A stadium roof", "A cable car"], answer: 0 }
  }
};

const $ = (id) => document.getElementById(id);
const camera = $("camera");
const startScreen = $("startScreen");
const arModel = $("arModel");
const posterGuide = $("posterGuide");
const panel = $("infoPanel");
const panelTag = $("panelTag");
const panelTitle = $("panelTitle");
const panelText = $("panelText");
const panelBullets = $("panelBullets");
const parkTitle = $("parkTitle");
const posterReady = $("posterReady");
const drawer = $("parkDrawer");

let currentPark = "simon";
let cameraRunning = false;

function getParkFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const p = (params.get("park") || params.get("poster") || "").toLowerCase();
  return PARKS[p] ? p : "simon";
}

function updateUrlPark(park) {
  const url = new URL(window.location.href);
  url.searchParams.set("park", park);
  window.history.replaceState({}, "", url.toString());
}

function setPark(park, updateUrl = true) {
  currentPark = PARKS[park] ? park : "simon";
  const data = PARKS[currentPark];
  parkTitle.textContent = data.title;
  posterReady.textContent = "QR poster loaded";
  arModel.className = `ar-model ${data.className}`;
  showPanel("WELCOME", data.title, data.info, data.bullets);
  if (updateUrl) updateUrlPark(currentPark);
}

function showPanel(tag, title, text, bullets = []) {
  panelTag.textContent = tag;
  panelTitle.textContent = title;
  panelText.textContent = text;
  panelBullets.innerHTML = "";
  bullets.forEach((b) => {
    const li = document.createElement("li");
    li.textContent = b;
    panelBullets.appendChild(li);
  });
  panel.classList.remove("is-hidden");
}

function showMission() {
  const data = PARKS[currentPark];
  showPanel("AR MISSION", "What should visitors do?", data.mission, ["Observe the AR model", "Read the public-space rule", "Answer the quick quiz"]);
}

function showInfo() {
  const data = PARKS[currentPark];
  showPanel(data.tag, data.title, data.info, data.bullets);
}

function showQuiz() {
  const data = PARKS[currentPark];
  const q = data.quiz;
  panelTag.textContent = "INTERACTIVE QUIZ";
  panelTitle.textContent = q.q;
  panelText.textContent = "Choose the correct answer:";
  panelBullets.innerHTML = "";
  q.options.forEach((option, index) => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.className = "quiz-answer";
    btn.style.cssText = "width:100%;margin:4px 0;padding:10px 12px;border-radius:12px;background:rgba(255,255,255,.1);color:#fff;border:1px solid rgba(255,255,255,.18);font-weight:850;text-align:left";
    btn.onclick = () => {
      if (index === q.answer) {
        showPanel("CORRECT", "Good answer", "This confirms that the poster information was understood and connects the physical poster with the AR activity.", ["The AR experience reinforces learning through visual interaction."]);
      } else {
        showPanel("TRY AGAIN", "Not this one", "Look again at the poster and the AR model, then answer once more.", ["The correct answer is directly related to the selected park."]);
      }
    };
    li.style.listStyle = "none";
    li.appendChild(btn);
    panelBullets.appendChild(li);
  });
  panel.classList.remove("is-hidden");
}

async function startCamera() {
  if (cameraRunning) return;
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: { ideal: "environment" },
        width: { ideal: 1280 },
        height: { ideal: 720 }
      },
      audio: false
    });
    camera.srcObject = stream;
    await camera.play();
    camera.classList.add("is-visible");
    startScreen.classList.add("is-hidden");
    cameraRunning = true;
    setTimeout(() => posterGuide.classList.add("is-hidden"), 5000);
  } catch (error) {
    console.error(error);
    showPanel("CAMERA ERROR", "Camera could not start", "Use HTTPS/GitHub Pages, allow camera permission, and avoid opening the file directly from WhatsApp preview if the browser blocks the camera.", ["Try Safari/Chrome", "Refresh the page", "Use the yellow demo mode if needed"]);
    startScreen.classList.add("is-hidden");
  }
}

function openDemo() {
  startScreen.classList.add("is-hidden");
  showPanel("DEMO MODE", PARKS[currentPark].title, "Camera was skipped. The AR elements are still visible so you can present the prototype even if the browser blocks camera access.", ["Use this only as backup", "For the real presentation, open through GitHub Pages"]);
}

$("startCameraBtn").addEventListener("click", startCamera);
$("demoBtn").addEventListener("click", openDemo);
$("infoBtn").addEventListener("click", showInfo);
$("missionBtn").addEventListener("click", showMission);
$("quizBtn").addEventListener("click", showQuiz);
$("factHotspot").addEventListener("click", showInfo);
$("missionHotspot").addEventListener("click", showMission);
$("quizHotspot").addEventListener("click", showQuiz);
$("closePanel").addEventListener("click", () => panel.classList.add("is-hidden"));
$("parkBtn").addEventListener("click", () => drawer.classList.add("is-open"));
$("closeDrawer").addEventListener("click", () => drawer.classList.remove("is-open"));
drawer.addEventListener("click", (event) => {
  if (event.target === drawer) drawer.classList.remove("is-open");
});

document.querySelectorAll(".park-option").forEach((btn) => {
  btn.addEventListener("click", () => {
    setPark(btn.dataset.park);
    drawer.classList.remove("is-open");
  });
});

document.addEventListener("visibilitychange", () => {
  if (!document.hidden && cameraRunning) camera.play().catch(() => {});
});

setPark(getParkFromUrl(), false);

// Keep the AR layer visible over the poster, but avoid false claims of image tracking.
// The QR printed on each poster decides which content is loaded.
