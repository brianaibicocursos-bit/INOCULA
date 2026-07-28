// CONTROLADOR DE NAVEGACIÓN MULTI-PÁGINA
function navigateTo(pageId) {
  // Ocultar todas las páginas
  document.querySelectorAll('.page-view').forEach(page => {
    page.classList.add('hidden');
    page.classList.remove('active');
  });

  // Mostrar página seleccionada
  const targetPage = document.getElementById(pageId);
  targetPage.classList.remove('hidden');
  targetPage.classList.add('active');

  // Actualizar estados de botones nav
  document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
}

// LÓGICA DE JUEGO & TABLERO
const BOARD_SIZE = 15;
let currentPosition = 0;
let viralLoad = 25;
let playerProfile = "Ciber-Detective";

const tileTypes = [
  { type: 'reto', label: 'Pista Falsa', icon: 'fa-triangle-exclamation', color: '#f59e0b' },
  { type: 'virus', label: 'Viralización', icon: 'fa-virus', color: '#f43f5e' },
  { type: 'herramienta', label: 'Fact-Check', icon: 'fa-screwdriver-wrench', color: '#6366f1' },
  { type: 'cadena', label: 'Cadena Rota', icon: 'fa-link-slash', color: '#10b981' }
];

let boardTiles = [];

function initBoard() {
  const container = document.getElementById('interactive-board');
  container.innerHTML = '';
  boardTiles = [];

  for (let i = 0; i < BOARD_SIZE; i++) {
    const randomType = tileTypes[Math.floor(Math.random() * tileTypes.length)];
    boardTiles.push(randomType);

    const tile = document.createElement('div');
    tile.className = `game-tile ${i === 0 ? 'active' : ''}`;
    tile.id = `tile-${i}`;
    tile.innerHTML = `
      <span style="font-size:0.75rem; color: #64748b;">#${i + 1}</span>
      <i class="fa-solid ${randomType.icon} tile-icon" style="color: ${randomType.color}"></i>
      <span style="font-size:0.8rem; font-weight:600;">${randomType.label}</span>
      ${i === currentPosition ? '<i class="fa-solid fa-location-dot" style="color:#facc15;"></i>' : ''}
    `;
    container.appendChild(tile);
  }
}

function roll3DDice() {
  const roll = Math.floor(Math.random() * 6) + 1;
  document.getElementById('dice-display').innerText = `🎲 ${roll}`;

  // Actualizar posición
  currentPosition += roll;
  if (currentPosition >= BOARD_SIZE) {
    currentPosition = BOARD_SIZE - 1;
    alert("¡Felicidades! Completaste la simulación con éxito.");
  }

  initBoard(); // Re-renderizar fichas
  triggerModal(boardTiles[currentPosition]);
}

function triggerModal(tileInfo) {
  const modal = document.getElementById('game-modal');
  const title = document.getElementById('modal-title');
  const desc = document.getElementById('modal-desc');
  const actions = document.getElementById('modal-actions');

  modal.classList.remove('hidden');
  actions.innerHTML = '';

  if (tileInfo.type === 'reto') {
    title.innerText = "🔍 Reto: Detección de Deepfake";
    desc.innerText = "Se publica un audio atribuyendo declaraciones falsas a una autoridad local. ¿Cómo reaccionas?";
    
    actions.innerHTML = `
      <button class="btn-primary" onclick="resolveChallenge(true)">Usar espectrograma e inspeccionar canal oficial</button>
      <button class="btn-secondary" onclick="resolveChallenge(false)">Compartir en redes inmediatamente</button>
    `;
  } else {
    title.innerText = `Casilla: ${tileInfo.label}`;
    desc.innerText = `Has caído en una casilla de evento (${tileInfo.label}).`;
    actions.innerHTML = `<button class="btn-primary" onclick="closeModal()">Continuar</button>`;
  }
}

function resolveChallenge(isCorrect) {
  if (isCorrect) {
    alert("¡Excelente decisión! Disminuyes la desinformación.");
    updateViral(-10);
  } else {
    alert("Error de verificación. La carga viral aumentó.");
    updateViral(15);
  }
  closeModal();
}

function updateViral(amount) {
  viralLoad = Math.max(0, Math.min(100, viralLoad + amount));
  document.getElementById('viral-fill').style.width = `${viralLoad}%`;
  document.getElementById('viral-percentage').innerText = `${viralLoad}% Riesgo de Infodemia`;
}

function closeModal() {
  document.getElementById('game-modal').classList.add('hidden');
}

function selectAvatar(element, profileName) {
  document.querySelectorAll('.avatar-card').forEach(c => c.classList.remove('selected'));
  element.classList.add('selected');
  playerProfile = profileName;
  document.getElementById('hud-user').innerText = profileName;
}

function applyLabTool(toolType) {
  const resultBox = document.getElementById('lab-result');
  if (toolType === 'ia') {
    resultBox.innerText = "🤖 Análisis de IA: Se detectó patrón difuso en bordes y firmas sintéticas de modelo generativo (98% probabilidad de IA).";
  } else if (toolType === 'meta') {
    resultBox.innerText = "📅 Metadatos: Imagen tomada originalmente en 2018 (Fuera de contexto).";
  } else {
    resultBox.innerText = "🔗 Rastreo: La imagen no aparece en ninguna agencia de noticias oficial.";
  }
}

// Inicializar al cargar
initBoard();
