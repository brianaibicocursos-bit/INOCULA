// CONFIGURACIÓN DEL PROYECTO INOCULA
let currentStage = 1;
let currentTileIndex = 0;
let viralLoad = 15;
let followers = 100;
let shields = 1;

// Idioma del juego y barrera del reto
let appLanguage = 'es';

// Mapeo de las 4 etapas del día
const stagesData = {
  1: { name: 'Matutino', count: 4, type: 'clickbait' },
  2: { name: 'Trabajo/Escuela', count: 5, type: 'dato' },
  3: { name: 'Tarde/Redes', count: 5, type: 'deepfake' },
  4: { name: 'Noche/Viral', count: 4, type: 'experto' }
};

// SIMULADOR DE RUEDA GIRATORIA (Life Style)
function spinWheel() {
  const spinBtn = document.getElementById('spin-btn');
  spinBtn.disabled = true;

  // Se genera un número del 1 al 8 y un ícono asociado
  const moves = Math.floor(Math.random() * 6) + 1;
  const icons = ['🤖 (Bot)', '📰 (Clickbait)', '🎭 (Deepfake)', '📊 (Dato)', '🛡️ (Herramienta)', '⚪ (Libre)'];
  const iconResult = icons[Math.floor(Math.random() * icons.length)];

  document.getElementById('wheel-display').innerHTML = `
    <strong>Avanzas: ${moves}</strong><br><small>Encuentro: ${iconResult}</small>
  `;

  setTimeout(() => {
    movePlayer(moves);
    spinBtn.disabled = false;
  }, 1000);
}

// BIFURCACIÓN DE CAMINO
function choosePath(pathType) {
  if (pathType === 'verifier') {
    shields += 2;
    alert("Tomaste el Camino Verificador. Ganas +2 Escudos, pero avanzarás con más cuidado.");
  } else {
    followers += 50;
    viralLoad += 10;
    alert("Tomaste el Camino Rápido. Ganas +50 Seguidores, pero la Carga Viral aumenta +10%.");
  }
  updateHUD();
}

// MANEJO DE MINI-JUEGOS DEL DOCUMENTO
function openMinigame(type) {
  const modal = document.getElementById('interactive-modal');
  modal.classList.remove('hidden');

  // Ocultar todos los minijuegos
  document.querySelectorAll('.minigame-view').forEach(mg => mg.classList.add('hidden'));

  if (type === 'clickbait') {
    document.getElementById('minigame-clickbait').classList.remove('hidden');
  } else if (type === 'deepfake') {
    document.getElementById('minigame-deepfake').classList.remove('hidden');
  } else if (type === 'cadena') {
    document.getElementById('minigame-cadena').classList.remove('hidden');
    startCoopTimer();
  }
}

// RETO CLICKBAIT: Comparar Titular vs Nota
function toggleArticleBody() {
  document.getElementById('article-body').classList.toggle('hidden');
}

function checkClickbait() {
  const sliderValue = document.getElementById('clickbait-slider').value;
  if (sliderValue > 60) {
    alert("¡Correcto! Identificaste que el titular exageraba la nota. Cortas la propagación.");
    followers += 20;
    updateViral(-5);
  } else {
    alert("Incorrecto. El titular era engañoso y no leíste la nota completa. Subió la carga viral.");
    updateViral(10);
  }
  closeModal();
}

// CASILLA COLABORATIVA: Cadena Rota
function startCoopTimer() {
  let time = 10;
  const timerEl = document.getElementById('coop-time');
  const interval = setInterval(() => {
    time--;
    timerEl.innerText = time;
    if (time <= 0) {
      clearInterval(interval);
      closeModal();
      alert("Se acabó el tiempo. El esfuerzo colectivo falló y la carga viral subió.");
      updateViral(15);
    }
  }, 1000);
}

function reportBuloCoop() {
  alert("¡Acción colectiva exitosa! Lograron bajar la Carga Viral para TODOS los jugadores.");
  updateViral(-15);
  closeModal();
}

// BARRERA DE IDIOMA DEL DOCUMENTO
function changeLanguage(lang) {
  appLanguage = lang;
  alert(`Idioma de interfaz cambiado a: ${lang.toUpperCase()}. Los retos pueden aparecer en otros idiomas para simular desinformación global.`);
}

function updateViral(amount) {
  viralLoad = Math.max(0, Math.min(100, viralLoad + amount));
  document.getElementById('viral-meter').style.width = `${viralLoad}%`;
  document.getElementById('viral-text').innerText = `${viralLoad}% Carga Viral Global`;
  updateHUD();
}

function updateHUD() {
  document.getElementById('followers-count').innerText = followers;
  document.getElementById('shields-count').innerText = shields;
}

function useShield() {
  if (shields > 0) {
    shields--;
    alert("Utilizaste un Escudo de Verificación para neutralizar el reto sin riesgo.");
    updateHUD();
    closeModal();
  } else {
    alert("No tienes Escudos de Verificación guardados en tu cartera.");
  }
}

function closeModal() {
  document.getElementById('interactive-modal').classList.add('hidden');
}
