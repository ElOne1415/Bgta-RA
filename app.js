const $ = (id) => document.getElementById(id);

const slides = [
  {
    tag: 'WELCOME',
    title: 'Explore Bogotá’s public parks',
    text: 'This prototype presents an augmented reality learning experience about the responsible use and care of Bogotá’s public parks and public spaces.',
    bullets: ['Mobile WebAR experience', 'No app installation required', 'Designed for exhibition and classroom explanation'],
    panel: ['Welcome', 'Public Park Model', 'Interactive AR scene over the camera view.']
  },
  {
    tag: 'MAP',
    title: 'Map of representative parks',
    text: 'The experience introduces selected public spaces such as Simón Bolívar Park, National Park and Los Novios Park.',
    bullets: ['Representative places', 'Basic location references', 'Educational exploration route'],
    panel: ['Map', 'Bogotá Parks', 'Representative public spaces in the city.']
  },
  {
    tag: 'PLACE INFORMATION',
    title: 'Simón Bolívar Park',
    text: 'A major urban park used for recreation, sports, cultural events and environmental activities.',
    bullets: ['Recreation and sports areas', 'Green zones and walking routes', 'Cultural and family activities'],
    panel: ['Place', 'Simón Bolívar', 'Recreation, sports and city events.']
  },
  {
    tag: 'PLACE INFORMATION',
    title: 'National Park',
    text: 'A historical and ecological public space that connects urban life, culture and environmental value.',
    bullets: ['Historical relevance', 'Pedestrian areas', 'Environmental awareness'],
    panel: ['Place', 'National Park', 'History, culture and green areas.']
  },
  {
    tag: 'PLACE INFORMATION',
    title: 'Los Novios Park',
    text: 'A recreational park that highlights the need for rules, maintenance and citizen responsibility in shared spaces.',
    bullets: ['Family recreation', 'Responsible use of facilities', 'Respect for other visitors'],
    panel: ['Place', 'Los Novios', 'Shared recreational space.']
  },
  {
    tag: 'ENVIRONMENTAL CARE',
    title: 'Take care of green areas',
    text: 'Visitors should protect trees, avoid damaging gardens and dispose of waste correctly.',
    bullets: ['Use trash bins', 'Respect urban fauna', 'Do not damage trees or grass areas'],
    panel: ['Care', 'Green Areas', 'Protect nature and use bins correctly.']
  },
  {
    tag: 'PUBLIC SPACE RULES',
    title: 'Responsible use rules',
    text: 'Public spaces require basic rules to remain safe, clean and useful for everyone.',
    bullets: ['Care for urban furniture', 'Respect pedestrian paths and bike lanes', 'Control pets and clean after them'],
    panel: ['Rules', 'Public Space', 'Shared rules improve coexistence.']
  },
  {
    tag: 'SAFETY',
    title: 'Safety recommendations',
    text: 'Visitors should identify meeting points, follow signs and avoid isolated areas at night.',
    bullets: ['Keep personal belongings safe', 'Follow public signs', 'Use visible and active areas'],
    panel: ['Safety', 'Recommendations', 'Safer visits through simple actions.']
  },
  {
    tag: 'MINI QUIZ',
    title: 'Quick learning check',
    text: 'Answer the question to test what visitors learned during the AR experience.',
    bullets: [],
    quiz: true,
    panel: ['Quiz', 'Learning Check', 'Choose the best citizen behavior.']
  }
];

let current = 0;
let cameraStarted = false;
let arLocked = false;
let fullView = false;

const video = $('cameraFeed');
const startScreen = $('startScreen');
const topBar = $('topBar');
const markerGuide = $('markerGuide');
const arWorld = $('arWorld');
const bottomPanel = $('bottomPanel');
const menuOverlay = $('menuOverlay');
const toast = $('toast');

function showToast(message, ms = 3200) {
  toast.textContent = message;
  toast.classList.remove('hidden');
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.add('hidden'), ms);
}

async function startCamera() {
  try {
    $('startBtn').disabled = true;
    $('startBtn').textContent = 'Opening camera...';

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      throw new Error('Camera API is not available in this browser.');
    }

    const constraints = {
      audio: false,
      video: {
        facingMode: { ideal: 'environment' },
        width: { ideal: 1280 },
        height: { ideal: 720 }
      }
    };

    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    video.srcObject = stream;
    video.setAttribute('playsinline', 'true');
    video.setAttribute('webkit-playsinline', 'true');
    video.muted = true;
    await video.play();

    cameraStarted = true;
    startScreen.classList.add('hidden');
    topBar.classList.remove('hidden');
    markerGuide.classList.remove('hidden');
    bottomPanel.classList.remove('hidden');
    $('statusPill').textContent = 'Camera active';
    showToast('Camera is active. Put the Hiro marker inside the frame and press “Marker centered · Show AR”.');
    updateSlide();
  } catch (error) {
    console.error(error);
    $('startBtn').disabled = false;
    $('startBtn').textContent = 'Start camera';
    showToast('Camera error: open this page directly in Safari/Chrome, not inside WhatsApp.');
    alert('Camera error: ' + error.message + '\n\nOpen the link directly in Safari/Chrome and check camera permissions.');
  }
}

function lockAR() {
  if (!cameraStarted) return;
  arLocked = true;
  markerGuide.classList.add('compact');
  arWorld.classList.remove('hidden');
  $('statusPill').textContent = 'AR visible';
  showToast('AR scene visible. Use Next/Previous to change content.');
}

function updateSlide() {
  const slide = slides[current];
  $('sectionTag').textContent = slide.tag;
  $('sectionTitle').textContent = slide.title;
  $('sectionText').textContent = slide.text;
  $('counter').textContent = `${current + 1}/${slides.length}`;

  const ul = $('sectionList');
  ul.innerHTML = '';
  for (const item of slide.bullets) {
    const li = document.createElement('li');
    li.textContent = item;
    ul.appendChild(li);
  }

  const [tag, title, text] = slide.panel;
  $('panelTag').textContent = tag;
  $('panelTitle').textContent = title;
  $('panelText').textContent = text;

  if (slide.quiz) renderQuiz();
  else $('quizBox').classList.add('hidden');

  document.body.dataset.section = slide.tag.toLowerCase().replaceAll(' ', '-');
}

function renderQuiz() {
  $('quizBox').classList.remove('hidden');
  $('quizQuestion').textContent = 'What is the best action when visiting a public park?';
  const options = [
    { text: 'Leave waste on the grass if bins are far away.', ok: false },
    { text: 'Use trash bins and respect green areas.', ok: true },
    { text: 'Damage signs or benches during events.', ok: false }
  ];
  $('quizOptions').innerHTML = '';
  $('quizFeedback').textContent = '';
  options.forEach((opt) => {
    const btn = document.createElement('button');
    btn.textContent = opt.text;
    btn.onclick = () => {
      $('quizFeedback').textContent = opt.ok
        ? 'Correct. Responsible behavior helps preserve public spaces.'
        : 'Try again. Public parks require care and citizen responsibility.';
      $('quizFeedback').className = opt.ok ? 'quiz-feedback ok' : 'quiz-feedback bad';
    };
    $('quizOptions').appendChild(btn);
  });
}

function buildMenu() {
  const menu = $('menuItems');
  menu.innerHTML = '';
  slides.forEach((slide, index) => {
    const btn = document.createElement('button');
    btn.innerHTML = `<span>${index + 1}</span>${slide.title}`;
    btn.onclick = () => {
      current = index;
      updateSlide();
      menuOverlay.classList.add('hidden');
      if (!arLocked && cameraStarted) lockAR();
    };
    menu.appendChild(btn);
  });
}

function next() {
  current = (current + 1) % slides.length;
  updateSlide();
}

function prev() {
  current = (current - 1 + slides.length) % slides.length;
  updateSlide();
}

function toggleFullView() {
  fullView = !fullView;
  document.body.classList.toggle('full-view', fullView);
  $('fullViewBtn').textContent = fullView ? 'Show panel' : 'Full AR view';
  menuOverlay.classList.add('hidden');
}

function resetView() {
  arLocked = false;
  fullView = false;
  document.body.classList.remove('full-view');
  arWorld.classList.add('hidden');
  markerGuide.classList.remove('compact');
  markerGuide.classList.remove('hidden');
  $('statusPill').textContent = cameraStarted ? 'Camera active' : 'Camera ready';
  menuOverlay.classList.add('hidden');
}

$('startBtn').addEventListener('click', startCamera);
$('lockBtn').addEventListener('click', lockAR);
$('nextBtn').addEventListener('click', next);
$('prevBtn').addEventListener('click', prev);
$('menuBtn').addEventListener('click', () => menuOverlay.classList.remove('hidden'));
$('closeMenu').addEventListener('click', () => menuOverlay.classList.add('hidden'));
$('fullViewBtn').addEventListener('click', toggleFullView);
$('resetBtn').addEventListener('click', resetView);

buildMenu();
updateSlide();
