// NAVEGACIÓN ENTRE PÁGINAS DE LA WEB
function navigateTo(pageId) {
  document.querySelectorAll('.page-view').forEach(p => p.classList.add('hidden'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));

  document.getElementById(pageId).classList.remove('hidden');
}

// ESTADO DE JUEGO (GAME OF LIFE)
let viralLoad = 15;
let followers = 100;
let shields = 1;

function spinWheel() {
  const moves = Math.floor(Math.random() * 4) + 1;
  document.getElementById('wheel-display').innerHTML = `<strong>Avanzas ${moves} casillas</strong>`;
  
  setTimeout(() => {
    openMinigame('clickbait');
  }, 800);
}

function openMinigame(type) {
  const modal = document.getElementById('interactive-modal');
  modal.classList.remove('hidden');
  document.querySelectorAll('.minigame-view').forEach(m => m.classList.add('hidden'));

  if (type === 'clickbait') {
    document.getElementById('minigame-clickbait').classList.remove('hidden');
  }
}

function toggleArticleBody() {
  document.getElementById('article-body').classList.toggle('hidden');
}

function checkClickbait() {
  const val = document.getElementById('clickbait-slider').value;
  if (val > 50) {
    alert("¡Excelente! Detectaste que el titular exageraba la nota.");
    followers += 25;
  } else {
    alert("Cagiste en el titular engañoso. Subió la Carga Viral.");
    viralLoad += 10;
  }
  updateHUD();
  closeModal();
}

function choosePath(path) {
  if (path === 'verifier') {
    shields++;
    alert("Tomaste el Camino Verificador: Ganas +1 Escudo.");
  } else {
    followers += 30;
    viralLoad += 10;
    alert("Tomaste el Camino Rápido: Ganas +30 Seguidores pero sube la Carga Viral.");
  }
  updateHUD();
}

function runLabTool(tool) {
  const output = document.getElementById('lab-output');
  if (tool === 'ia') output.innerText = "🤖 Análisis de IA: Inconsistencias visuales detectadas (92% Probabilidad de IA).";
  if (tool === 'source') output.innerText = "🔗 Búsqueda de Fuente: No existe ningún registro oficial de esta noticia.";
  if (tool === 'meta') output.innerText = "📄 Metadatos: Archivo modificado por última vez en 2019.";
}

function updateHUD() {
  document.getElementById('followers-count').innerText = followers;
  document.getElementById('shields-count').innerText = shields;
  document.getElementById('viral-meter').style.width = `${viralLoad}%`;
  document.getElementById('viral-text').innerText = `${viralLoad}% - Carga Viral Global`;
}

function useShield() {
  if (shields > 0) {
    shields--;
    alert("Usaste un Escudo para neutralizar la amenaza.");
    updateHUD();
    closeModal();
  } else {
    alert("No tienes Escudos suficientes.");
  }
}

function closeModal() {
  document.getElementById('interactive-modal').classList.add('hidden');
}

function changeLanguage(lang) {
  const translations = {
    es: {
      inicio: "Inicio",
      tablero: "Tablero",
      laboratorio: "Laboratorio",
      ranking: "Ranking"
    },
    en: {
      inicio: "Home",
      tablero: "Game Board",
      laboratorio: "Laboratory",
      ranking: "Leaderboard"
    },
    zh: {
      inicio: "首页",
      tablero: "游戏板",
      laboratorio: "实验室",
      ranking: "排行榜"
    }
  };

  const t = translations[lang];

  const navButtons = document.querySelectorAll(".nav-links .nav-btn");

  if (navButtons.length >= 4) {
    navButtons[0].innerHTML =
      '<i class="fa-solid fa-house"></i> ' + t.inicio;

    navButtons[1].innerHTML =
      '<i class="fa-solid fa-gamepad"></i> ' + t.tablero;

    navButtons[2].innerHTML =
      '<i class="fa-solid fa-flask"></i> ' + t.laboratorio;

    navButtons[3].innerHTML =
      '<i class="fa-solid fa-trophy"></i> ' + t.ranking;
  }
}
