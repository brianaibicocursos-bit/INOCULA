// Configuración del tablero
const TOTAL_TILES = 20;
let playerPosition = 0;
let viralLoad = 0;
let timerInterval = null;

// Tipos de casillas según propuesta INOCULA
const tileTypes = ["inicio", "reto", "virus", "herramienta", "cadena_rota"];

// Banco de Retos y Pistas Falsas
const challenges = [
  {
    titulo: "🔍 Pista Falsa / Reto: Noticia Viral",
    desc: "Un titular afirma: 'Descubren que las imágenes de satélite muestran una estructura alienígena en el Polo Sur'. ¿Qué haces?",
    opciones: [
      { texto: "Verificar fuente y hacer búsqueda inversa", correcta: true },
      { texto: "Compartir inmediatamente en WhatsApp", correcta: false }
    ],
    explicacion: "¡Bien hecho! Aplicaste criterio antes de compartir."
  },
  {
    titulo: "🤖 Pista Falsa / Reto: Imagen IA",
    desc: "Ves una foto de una personalidad pública arrestada. La mano tiene 6 dedos y el fondo se ve distorsionado. ¿Es real?",
    opciones: [
      { texto: "Es una imagen generada por IA (Falsa)", correcta: true },
      { texto: "Es real y reciente", correcta: false }
    ],
    explicacion: "¡Exacto! Las deformaciones en manos son señales comunes de IA."
  }
];

// Asignación de mapa de casillas
const boardData = [];
for (let i = 0; i < TOTAL_TILES; i++) {
  if (i === 0) boardData.push({ id: i, type: "inicio", label: "Inicio" });
  else {
    const types = ["reto", "virus", "herramienta", "cadena_rota"];
    const randomType = types[Math.floor(Math.random() * types.length)];
    boardData.push({ id: i, type: randomType, label: getLabel(randomType) });
  }
}

function getLabel(type) {
  switch (type) {
    case "reto": return "🎯 Reto / Pista Falsa";
    case "virus": return "🦠 Virus / Fake News";
    case "herramienta": return "🛠️ Herramienta";
    case "cadena_rota": return "🔗 Cadena Rota";
    default: return "Inicio";
  }
}

// Inicializar el tablero en la interfaz
function renderBoard() {
  const boardEl = document.getElementById("board");
  boardEl.innerHTML = "";
  boardData.forEach((tile, index) => {
    const tileEl = document.createElement("div");
    tileEl.className = `tile tile-${tile.type} ${index === playerPosition ? 'active' : ''}`;
    tileEl.innerHTML = `
      <span class="tile-number">#${tile.id}</span>
      <span class="tile-type">${tile.label}</span>
      ${index === playerPosition ? '📌' : ''}
    `;
    boardEl.appendChild(tileEl);
  });
}

// Tirar dado
function rollDice() {
  const roll = Math.floor(Math.random() * 6) + 1;
  document.getElementById("dice-result").innerText = `Sacaste un: ${roll}`;
  
  playerPosition += roll;
  if (playerPosition >= TOTAL_TILES) {
    playerPosition = TOTAL_TILES - 1;
    alert("¡Has llegado al final del recorrido digital!");
  }
  
  document.getElementById("player-pos").innerText = playerPosition;
  renderBoard();
  handleTileEvent(boardData[playerPosition]);
}

// Manejar eventos según el tipo de casilla
function handleTileEvent(tile) {
  const modal = document.getElementById("modal");
  const modalTitle = document.getElementById("modal-title");
  const modalDesc = document.getElementById("modal-desc");
  const modalActions = document.getElementById("modal-actions");
  const timerBox = document.getElementById("timer-box");

  modalActions.innerHTML = "";
  timerBox.classList.add("hidden");
  clearInterval(timerInterval);

  if (tile.type === "reto") {
    const challenge = challenges[Math.floor(Math.random() * challenges.length)];
    modalTitle.innerText = challenge.titulo;
    modalDesc.innerText = challenge.desc;
    
    // Temporizador
    timerBox.classList.remove("hidden");
    let timeLeft = 12;
    document.getElementById("timer-count").innerText = timeLeft;
    
    timerInterval = setInterval(() => {
      timeLeft--;
      document.getElementById("timer-count").innerText = timeLeft;
      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        updateViralLoad(20);
        closeModal();
        alert("⏰ ¡Se acabó el tiempo! El bulo se propagó +20% Carga Viral.");
      }
    }, 1000);

    challenge.opciones.forEach(opt => {
      const btn = document.createElement("button");
      btn.innerText = opt.texto;
      btn.onclick = () => {
        clearInterval(timerInterval);
        if (opt.correcta) {
          alert("¡Correcto! " + challenge.explicacion);
        } else {
          updateViralLoad(15);
          alert("Incorrecto. No verificaste y el virus de la desinformación creció +15%.");
        }
        closeModal();
      };
      modalActions.appendChild(btn);
    });

  } else if (tile.type === "virus") {
    modalTitle.innerText = "🦠 Casilla Virus / Fake News";
    modalDesc.innerText = "Caíste en una zona con alta difusión de desinformación sin filtro. La carga viral sube un 15%.";
    updateViralLoad(15);
    addCloseBtn(modalActions);

  } else if (tile.type === "herramienta") {
    modalTitle.innerText = "🛠️ Casilla de Herramienta";
    modalDesc.innerText = "¡Ganaste una técnica de verificación! Practicas 'Rastrear fuente original' y 'Revisar metadatos'.";
    addCloseBtn(modalActions);

  } else if (tile.type === "cadena_rota") {
    modalTitle.innerText = "🔗 Casilla Cadena Rota";
    modalDesc.innerText = "¡Excelente! Has desmentido un bulo antes de que se propague. Se reduce la carga viral en 15%.";
    updateViralLoad(-15);
    addCloseBtn(modalActions);
  }

  if (tile.type !== "inicio") {
    modal.classList.remove("hidden");
  }
}

function updateViralLoad(amount) {
  viralLoad = Math.max(0, Math.min(100, viralLoad + amount));
  document.getElementById("virus-bar").style.width = `${viralLoad}%`;
  document.getElementById("virus-status").innerText = `${viralLoad}% - Carga Viral`;
}

function addCloseBtn(container) {
  const btn = document.createElement("button");
  btn.innerText = "Continuar";
  btn.onclick = closeModal;
  container.appendChild(btn);
}

function closeModal() {
  document.getElementById("modal").classList.add("hidden");
  clearInterval(timerInterval);
}

// Iniciar app
renderBoard();
