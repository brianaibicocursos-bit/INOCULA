// ============================================================
// INOCULA · APP.JS
// ============================================================


// ============================================================
// 1. NAVEGACIÓN
// ============================================================

function navigateTo(pageId) {
  document.querySelectorAll(".page-view").forEach(page => {
    page.classList.add("hidden");
  });

  document.querySelectorAll(".nav-btn").forEach(button => {
    button.classList.remove("active");
  });

  const page = document.getElementById(pageId);

  if (page) {
    page.classList.remove("hidden");
  }

  const navMap = {
    "page-home": 0,
    "page-game": 1,
    "page-lab": 2,
    "page-leaderboard": 3
  };

  if (navMap[pageId] !== undefined) {
    const buttons = document.querySelectorAll(".nav-btn");

    if (buttons[navMap[pageId]]) {
      buttons[navMap[pageId]].classList.add("active");
    }
  }
}


// ============================================================
// 2. ESTADO DEL JUEGO
// ============================================================

let viralLoad = 15;
let followers = 100;
let shields = 1;

// Posición TOTAL del jugador.
// 0 = inicio
// 5 = termina etapa 1
// 10 = termina etapa 2
// 15 = termina etapa 3
// 20 = termina etapa 4
let playerPosition = 0;

const tilesPerStage = 5;
const totalTiles = 20;

let currentNews = null;
let currentNewsIndex = 0;


// ============================================================
// 3. NOTICIAS
// ============================================================

const fakeNews = [

  {
    headline: "🚨 ¡Tomar agua con limón elimina TODAS las toxinas!",
    article: "El agua con limón puede formar parte de una alimentación saludable, pero el cuerpo ya cuenta con órganos como el hígado y los riñones para eliminar sustancias de desecho.",
    exaggerated: true
  },

  {
    headline: "🧠 Las neuronas utilizan señales eléctricas para transmitir información",
    article: "Las neuronas utilizan señales eléctricas y químicas para comunicarse y transmitir información dentro del sistema nervioso.",
    exaggerated: false
  },

  {
    headline: "🚨 ¡Instagram puede leer directamente tus pensamientos!",
    article: "Las plataformas digitales pueden recopilar información sobre actividad, intereses e interacciones, pero eso no significa que puedan leer directamente los pensamientos.",
    exaggerated: true
  },

  {
    headline: "🦠 Lavarse las manos ayuda a reducir la transmisión de microorganismos",
    article: "La higiene de manos puede ayudar a reducir la transmisión de diferentes microorganismos y prevenir enfermedades.",
    exaggerated: false
  },

  {
    headline: "🚨 ¡La inteligencia artificial NUNCA se equivoca!",
    article: "Los sistemas de inteligencia artificial pueden producir respuestas incorrectas o información inventada y necesitan verificación humana.",
    exaggerated: true
  },

  {
    headline: "🌳 Los árboles absorben dióxido de carbono durante la fotosíntesis",
    article: "Las plantas absorben dióxido de carbono durante la fotosíntesis y utilizan esa materia para producir compuestos orgánicos.",
    exaggerated: false
  },

  {
    headline: "🚨 ¡Plantar UN árbol resolverá el cambio climático!",
    article: "Los árboles pueden contribuir a la captura de carbono, pero enfrentar el cambio climático requiere múltiples acciones.",
    exaggerated: true
  },

  {
    headline: "📱 Algunas aplicaciones pueden solicitar acceso a tu ubicación",
    article: "Algunas aplicaciones solicitan permisos de ubicación para proporcionar determinadas funciones o servicios.",
    exaggerated: false
  },

  {
    headline: "🚨 ¡Si una publicación tiene millones de likes, es definitivamente verdadera!",
    article: "La cantidad de interacciones de una publicación no demuestra por sí misma que la información sea verdadera.",
    exaggerated: true
  },

  {
    headline: "🔎 Comparar varias fuentes puede ayudar a detectar información falsa",
    article: "Contrastar información con diferentes fuentes confiables puede ayudar a identificar errores, contradicciones o información falsa.",
    exaggerated: false
  },

  {
    headline: "🚨 ¡Dormir solamente 2 horas hace que tu cerebro sea más productivo!",
    article: "Dormir muy poco puede afectar la atención, la memoria y otras funciones cognitivas.",
    exaggerated: true
  },

  {
    headline: "💧 El agua es necesaria para diferentes funciones del organismo",
    article: "El agua participa en numerosos procesos fisiológicos y es necesaria para mantener una hidratación adecuada.",
    exaggerated: false
  },

  {
    headline: "🚨 ¡Los celulares causan automáticamente pérdida de memoria!",
    article: "El uso de dispositivos puede relacionarse con hábitos de atención y sueño, pero no puede afirmarse que los celulares causen automáticamente pérdida de memoria.",
    exaggerated: true
  },

  {
    headline: "🌞 La radiación ultravioleta puede afectar la piel",
    article: "La exposición excesiva a la radiación ultravioleta puede provocar daños en la piel, por lo que se recomienda protección adecuada.",
    exaggerated: false
  },

  {
    headline: "🚨 ¡Una foto puede demostrar por sí sola que una noticia es verdadera!",
    article: "Una fotografía puede estar fuera de contexto, editada o acompañar información diferente de la original.",
    exaggerated: true
  },

  {
    headline: "📰 Verificar la fecha de una noticia puede ayudar a entender su contexto",
    article: "Revisar cuándo fue publicada una información puede ayudar a determinar si continúa siendo relevante y si se está compartiendo fuera de contexto.",
    exaggerated: false
  },

  {
    headline: "🚨 ¡Todo video que parece real ocurrió exactamente como lo vemos!",
    article: "Los videos pueden editarse, recortarse, manipularse o presentarse fuera de contexto.",
    exaggerated: true
  },

  {
    headline: "🔐 Las contraseñas únicas pueden mejorar la seguridad de tus cuentas",
    article: "Utilizar contraseñas diferentes para distintas cuentas puede reducir el impacto de una filtración de credenciales.",
    exaggerated: false
  },

  {
    headline: "🚨 ¡Compartir una noticia sin leerla completa NO tiene ningún riesgo!",
    article: "Compartir información sin revisar su contenido puede contribuir a la propagación de información falsa o engañosa.",
    exaggerated: true
  },

  {
    headline: "📚 Leer más allá del titular ayuda a comprender mejor una noticia",
    article: "Leer el contenido completo permite conocer el contexto y comparar lo que afirma el titular con la información presentada.",
    exaggerated: false
  }

];


// ============================================================
// 4. TRADUCCIONES
// ============================================================

const translations = {

  es: {
    nav: ["Inicio", "Tablero", "Laboratorio", "Ranking"],

    heroTag: "UNESCO Youth Hackathon 2026",

    heroTitle: 'Antes de creer, <span class="gradient-text">inocúlate.</span>',

    heroText:
      "El tablero de vida digital que te entrena para detectar fake news, deepfakes y manipulación en tu día a día digital.",

    enterBoard: "Entrar al Tablero",
    tools: "Probar Herramientas",

    stages: "Etapas del Día",
    languages: "Idiomas (ES, EN, ZH)",
    viralGoal: "Carga Viral Meta",

    publicViral: "Carga Viral Pública",
    lowVirus: "15% - Virus bajo control",

    digitalProfile: "Perfil Digital",
    followers: "Seguidores:",
    shields: "Escudos:",

    digitalWheel: "Rueda Digital",
    spin: "GIRAR RUEDA",
    spinText: "Gira la Rueda",

    boardTitle: "Tablero: Tu Navegación Diaria",

    stage1: "Etapa 1: Despertar & Feed Matutino",
    stage2: "Etapa 2: Trabajo / Escuela & Chats",
    stage3: "Etapa 3: Tarde, Noticias & Redes",
    stage4: "Etapa 4: Noche, Viral & Retiro Digital",

    forkTitle: "¡Punto de Bifurcación! Elige tu camino:",

    verifier: "Camino Verificador",
    verifierSmall: "Más lento, gana Escudos de protección",

    fast: "Camino Rápido",
    fastSmall: "Avanzas rápido, asumes riesgo de Fake News",

    labTitle: "Laboratorio de Verificación",

    labDescription:
      "Simulador interactivo para analizar noticias antes de compartirlas:",

    scanAI: "Escanear IA",
    source: "Buscar Fuente Original",
    metadata: "Revisar Metadatos",

    labOutput:
      "Selecciona una herramienta para inspeccionar el contenido.",

    rankingTitle: "Agentes INOCULA Destacados",

    position: "Posición",
    agent: "Agente",
    trustedFollowers: "Seguidores Confiables",
    avoidedViral: "Carga Viral Evitada",

    challenge: "Reto: Titular vs Nota",

    readArticle: "📄 Leer nota completa",

    slider: "¿El titular representa la nota o exagera?",

    confirm: "Confirmar Evaluación",

    shield: "🛡️ Usar Escudo para Saltar",

    close: "Cerrar",

    advance: "Avanzas",
    squares: "casillas",

    stageReached: "¡Llegaste a la siguiente etapa!",

    final:
      "🎉 ¡Completaste todas las etapas de INOCULA!"
  },


  en: {

    nav: ["Home", "Game Board", "Laboratory", "Leaderboard"],

    heroTag: "UNESCO Youth Hackathon 2026",

    heroTitle:
      'Before you believe, <span class="gradient-text">inoculate yourself.</span>',

    heroText:
      "The digital life board that trains you to detect fake news, deepfakes, and manipulation in your everyday digital life.",

    enterBoard: "Enter Game Board",
    tools: "Try Tools",

    stages: "Stages of the Day",
    languages: "Languages (ES, EN, ZH)",
    viralGoal: "Target Viral Load",

    publicViral: "Public Viral Load",
    lowVirus: "15% - Virus under control",

    digitalProfile: "Digital Profile",
    followers: "Followers:",
    shields: "Shields:",

    digitalWheel: "Digital Wheel",
    spin: "SPIN WHEEL",
    spinText: "Spin the Wheel",

    boardTitle: "Game Board: Your Daily Navigation",

    stage1: "Stage 1: Wake Up & Morning Feed",
    stage2: "Stage 2: Work / School & Chats",
    stage3: "Stage 3: Afternoon, News & Social Media",
    stage4: "Stage 4: Night, Viral & Digital Detox",

    forkTitle: "Fork in the Road! Choose your path:",

    verifier: "Verifier Path",
    verifierSmall: "Slower, earns protection Shields",

    fast: "Fast Path",
    fastSmall: "Move faster, take Fake News risk",

    labTitle: "Verification Laboratory",

    labDescription:
      "Interactive simulator to analyze news before sharing it:",

    scanAI: "Scan with AI",
    source: "Find Original Source",
    metadata: "Review Metadata",

    labOutput:
      "Select a tool to inspect the content.",

    rankingTitle: "Featured INOCULA Agents",

    position: "Position",
    agent: "Agent",
    trustedFollowers: "Trusted Followers",
    avoidedViral: "Viral Load Avoided",

    challenge: "Challenge: Headline vs Article",

    readArticle: "📄 Read full article",

    slider:
      "Does the headline represent the article or exaggerate?",

    confirm: "Confirm Evaluation",

    shield: "🛡️ Use Shield to Skip",

    close: "Close",

    advance: "You advance",

    squares: "squares",

    stageReached: "You reached the next stage!",

    final:
      "🎉 You completed all INOCULA stages!"
  },


  zh: {

    nav: ["首页", "游戏板", "实验室", "排行榜"],

    heroTag: "联合国教科文组织青年黑客马拉松 2026",

    heroTitle:
      '在相信之前，<span class="gradient-text">先给自己接种。</span>',

    heroText:
      "数字生活棋盘，训练你识别日常数字生活中的假新闻、深度伪造和信息操纵。",

    enterBoard: "进入游戏板",
    tools: "尝试工具",

    stages: "一天的阶段",
    languages: "语言（ES、EN、ZH）",
    viralGoal: "目标病毒负荷",

    publicViral: "公共病毒负荷",
    lowVirus: "15% - 病毒处于控制之下",

    digitalProfile: "数字档案",
    followers: "关注者：",
    shields: "护盾：",

    digitalWheel: "数字转盘",
    spin: "旋转转盘",
    spinText: "旋转转盘",

    boardTitle: "游戏板：你的日常数字生活",

    stage1: "阶段 1：起床与早晨信息流",
    stage2: "阶段 2：工作 / 学校与聊天",
    stage3: "阶段 3：下午、新闻与社交网络",
    stage4: "阶段 4：夜晚、病毒信息与数字休息",

    forkTitle: "分岔路口！选择你的道路：",

    verifier: "验证者道路",
    verifierSmall: "速度较慢，但可以获得保护护盾",

    fast: "快速道路",
    fastSmall: "前进更快，但承担假新闻风险",

    labTitle: "信息验证实验室",

    labDescription:
      "在分享新闻之前进行分析的互动模拟器：",

    scanAI: "AI 扫描",
    source: "查找原始来源",
    metadata: "检查元数据",

    labOutput:
      "选择一个工具来检查内容。",

    rankingTitle: "INOCULA 优秀特工",

    position: "排名",
    agent: "特工",
    trustedFollowers: "可信关注者",
    avoidedViral: "避免的病毒负荷",

    challenge: "挑战：标题与文章",

    readArticle: "📄 阅读完整文章",

    slider:
      "标题是否准确反映文章内容，还是夸大了？",

    confirm: "确认评估",

    shield: "🛡️ 使用护盾跳过",

    close: "关闭",

    advance: "前进",

    squares: "格",

    stageReached: "你到达了下一个阶段！",

    final:
      "🎉 你完成了 INOCULA 的所有阶段！"
  }

};


// ============================================================
// 5. IDIOMA ACTUAL
// ============================================================

let currentLanguage = "es";


// ============================================================
// 6. RUEDA
// ============================================================

function spinWheel() {

  const spinButton = document.getElementById("spin-btn");

  // Evita hacer varios giros simultáneamente
  if (spinButton) {
    spinButton.disabled = true;
  }

  // Número aleatorio de casillas
  const moves = Math.floor(Math.random() * 4) + 1;

  const t = translations[currentLanguage];

  const wheelDisplay = document.getElementById("wheel-display");

  if (wheelDisplay) {

    wheelDisplay.innerHTML =
      `<strong>${t.advance} ${moves} ${t.squares}</strong>`;
  }

  // Esperar un poquito para que se sienta como juego
  setTimeout(() => {

    movePlayer(moves);

    openMinigame("clickbait");

    if (spinButton) {
      spinButton.disabled = false;
    }

  }, 700);
}


// ============================================================
// 7. MOVER AL JUGADOR
// ============================================================

function movePlayer(moves) {

  const oldPosition = playerPosition;

  playerPosition += moves;

  // No puede superar las 20 casillas
  if (playerPosition > totalTiles) {
    playerPosition = totalTiles;
  }

  // Actualizar tablero
  renderBoard();

  // Detectar si cruzó a otra etapa
  const oldStage = Math.floor(oldPosition / tilesPerStage);
  const newStage = Math.floor(playerPosition / tilesPerStage);

  if (newStage > oldStage && playerPosition < totalTiles) {

    const t = translations[currentLanguage];

    setTimeout(() => {
      alert(`🎉 ${t.stageReached}`);
    }, 300);
  }

  // Llegó al final
  if (playerPosition >= totalTiles) {

    const t = translations[currentLanguage];

    setTimeout(() => {
      alert(t.final);
    }, 300);
  }
}


// ============================================================
// 8. DIBUJAR LAS CASILLAS Y EL JUGADOR
// ============================================================

function renderBoard() {

  // Limpiar las cuatro etapas
  for (let i = 1; i <= 4; i++) {

    const container = document.getElementById(`stage-${i}`);

    if (container) {
      container.innerHTML = "";
    }
  }

  // Crear 5 casillas por etapa
  for (let stage = 1; stage <= 4; stage++) {

    const container = document.getElementById(`stage-${stage}`);

    if (!container) continue;

    for (let tile = 1; tile <= 5; tile++) {

      const tileNumber =
        ((stage - 1) * tilesPerStage) + tile;

      const tileElement = document.createElement("div");

      tileElement.className = "game-tile";

      tileElement.dataset.position = tileNumber;

      tileElement.innerHTML =
        `<span>${tileNumber}</span>`;

      // Casilla actual
      if (playerPosition === tileNumber) {

        tileElement.classList.add("player-tile");

        tileElement.innerHTML =
          `<span>🧑‍💻</span>`;
      }

      // Casillas ya recorridas
      if (tileNumber < playerPosition) {
        tileElement.classList.add("visited-tile");
      }

      container.appendChild(tileElement);
    }
  }
}


// ============================================================
// 9. MINIJUEGO DE NOTICIAS
// ============================================================

function openMinigame(type) {

  const modal =
    document.getElementById("interactive-modal");

  if (!modal) return;

  modal.classList.remove("hidden");

  document.querySelectorAll(".minigame-view").forEach(game => {
    game.classList.add("hidden");
  });

  if (type === "clickbait") {

    // Elegir la siguiente noticia
    currentNews =
      fakeNews[currentNewsIndex];

    // Avanzar índice
    currentNewsIndex++;

    // Volver al inicio cuando se terminan
    if (currentNewsIndex >= fakeNews.length) {
      currentNewsIndex = 0;
    }

    // Mostrar titular
    const headline =
      document.querySelector(
        "#minigame-clickbait .headline"
      );

    if (headline) {
      headline.textContent =
        currentNews.headline;
    }

    // Mostrar artículo
    const article =
      document.getElementById("article-body");

    if (article) {

      article.textContent =
        currentNews.article;

      article.classList.add("hidden");
    }

    // Reiniciar slider
    const slider =
      document.getElementById("clickbait-slider");

    if (slider) {
      slider.value = 50;
    }

    // Mostrar minijuego
    const game =
      document.getElementById("minigame-clickbait");

    if (game) {
      game.classList.remove("hidden");
    }
  }
}


// ============================================================
// 10. MOSTRAR / OCULTAR NOTA
// ============================================================

function toggleArticleBody() {

  const article =
    document.getElementById("article-body");

  if (article) {
    article.classList.toggle("hidden");
  }
}


// ============================================================
// 11. COMPROBAR NOTICIA
// ============================================================

function checkClickbait() {

  if (!currentNews) return;

  const slider =
    document.getElementById("clickbait-slider");

  if (!slider) return;

  const value =
    Number(slider.value);

  // NOTICIA EXAGERADA
  if (currentNews.exaggerated) {

    if (value > 50) {

      alert(
        "✅ ¡Excelente! Detectaste que el titular exageraba la información."
      );

      followers += 25;

    } else {

      alert(
        "⚠️ ¡Cuidado! El titular exageraba la información."
      );

      viralLoad += 10;
    }

  }

  // NOTICIA VERDADERA
  else {

    if (value <= 50) {

      alert(
        "✅ ¡Excelente! Detectaste que el titular representa correctamente la información."
      );

      followers += 25;

    } else {

      alert(
        "⚠️ ¡Cuidado! El titular sí representaba correctamente la información."
      );

      viralLoad += 10;
    }
  }

  // Evitar que viralLoad supere 100
  viralLoad = Math.min(viralLoad, 100);

  updateHUD();

  closeModal();
}


// ============================================================
// 12. CAMINOS
// ============================================================

function choosePath(path) {

  if (path === "verifier") {

    shields++;

    alert(
      "🛡️ Tomaste el Camino Verificador: ganas +1 Escudo."
    );

  } else {

    followers += 30;

    viralLoad += 10;

    viralLoad = Math.min(viralLoad, 100);

    alert(
      "⚡ Tomaste el Camino Rápido: ganas +30 Seguidores, pero sube la Carga Viral."
    );
  }

  updateHUD();
}


// ============================================================
// 13. LABORATORIO
// ============================================================

function runLabTool(tool) {

  const output =
    document.getElementById("lab-output");

  if (!output) return;

  if (tool === "ia") {

    output.innerText =
      "🤖 Análisis de IA: Se detectaron inconsistencias visuales. Probabilidad estimada de contenido generado o manipulado: 92%.";

  }

  if (tool === "source") {

    output.innerText =
      "🔗 Búsqueda de fuente: No se encontró un registro oficial que confirme esta publicación.";

  }

  if (tool === "meta") {

    output.innerText =
      "📄 Metadatos: El archivo presenta información que requiere una revisión adicional antes de considerarlo confiable.";
  }
}


// ============================================================
// 14. HUD
// ============================================================

function updateHUD() {

  const followersElement =
    document.getElementById("followers-count");

  const shieldsElement =
    document.getElementById("shields-count");

  const viralMeter =
    document.getElementById("viral-meter");

  const viralText =
    document.getElementById("viral-text");

  if (followersElement) {
    followersElement.innerText =
      followers;
  }

  if (shieldsElement) {
    shieldsElement.innerText =
      shields;
  }

  if (viralMeter) {
    viralMeter.style.width =
      `${viralLoad}%`;
  }

  if (viralText) {

    const t =
      translations[currentLanguage];

    viralText.innerText =
      `${viralLoad}% - ${t.publicViral}`;
  }
}


// ============================================================
// 15. USAR ESCUDO
// ============================================================

function useShield() {

  if (shields > 0) {

    shields--;

    alert(
      "🛡️ Usaste un Escudo para neutralizar la amenaza."
    );

    updateHUD();

    closeModal();

  } else {

    alert(
      "❌ No tienes Escudos suficientes."
    );
  }
}


// ============================================================
// 16. CERRAR MODAL
// ============================================================

function closeModal() {

  const modal =
    document.getElementById("interactive-modal");

  if (modal) {
    modal.classList.add("hidden");
  }
}


// ============================================================
// 17. CAMBIAR IDIOMA
// ============================================================

function changeLanguage(lang) {

  currentLanguage =
    translations[lang]
      ? lang
      : "es";

  const t =
    translations[currentLanguage];

  // ----------------------------------------------------------
  // NAVBAR
  // ----------------------------------------------------------

  const navButtons =
    document.querySelectorAll(".nav-links .nav-btn");

  if (navButtons.length >= 4) {

    navButtons[0].innerHTML =
      `<i class="fa-solid fa-house"></i> ${t.nav[0]}`;

    navButtons[1].innerHTML =
      `<i class="fa-solid fa-gamepad"></i> ${t.nav[1]}`;

    navButtons[2].innerHTML =
      `<i class="fa-solid fa-flask"></i> ${t.nav[2]}`;

    navButtons[3].innerHTML =
      `<i class="fa-solid fa-trophy"></i> ${t.nav[3]}`;
  }


  // ----------------------------------------------------------
  // HOME
  // ----------------------------------------------------------

  const pill =
    document.querySelector(".pill-tag");

  if (pill) {

    pill.innerHTML =
      `<i class="fa-solid fa-sparkles"></i> ${t.heroTag}`;
  }

  const heroTitle =
    document.querySelector(".hero h1");

  if (heroTitle) {
    heroTitle.innerHTML =
      t.heroTitle;
  }

  const heroText =
    document.querySelector(".hero-subtext");

  if (heroText) {
    heroText.textContent =
      t.heroText;
  }


  const heroButtons =
    document.querySelectorAll(
      ".hero-buttons button"
    );

  if (heroButtons.length >= 2) {

    heroButtons[0].innerHTML =
      `<i class="fa-solid fa-play"></i> ${t.enterBoard}`;

    heroButtons[1].innerHTML =
      `<i class="fa-solid fa-microscope"></i> ${t.tools}`;
  }


  const statCards =
    document.querySelectorAll(".stat-card p");

  if (statCards.length >= 3) {

    statCards[0].textContent =
      t.stages;

    statCards[1].textContent =
      t.languages;

    statCards[2].textContent =
      t.viralGoal;
  }


  // ----------------------------------------------------------
  // TABLERO
  // ----------------------------------------------------------

  const statusTitles =
    document.querySelectorAll(".status-card h3");

  if (statusTitles.length >= 3) {

    statusTitles[0].innerHTML =
      `<i class="fa-solid fa-biohazard"></i> ${t.publicViral}`;

    statusTitles[1].innerHTML =
      `<i class="fa-solid fa-user-check"></i> ${t.digitalProfile}`;

    statusTitles[2].innerHTML =
      `<i class="fa-solid fa-dharmachakra"></i> ${t.digitalWheel}`;
  }


  const statRows =
    document.querySelectorAll(".stat-row span");

  if (statRows.length >= 2) {

    statRows[0].innerHTML =
      `<i class="fa-solid fa-users"></i> ${t.followers}`;

    statRows[1].innerHTML =
      `<i class="fa-solid fa-shield-halved"></i> ${t.shields}`;
  }


  const wheelDisplay =
    document.getElementById("wheel-display");

  if (wheelDisplay) {

    wheelDisplay.innerHTML =
      `<span>${t.spinText}</span>`;
  }


  const spinButton =
    document.getElementById("spin-btn");

  if (spinButton) {
    spinButton.textContent =
      t.spin;
  }


  const boardTitle =
    document.querySelector(".board-wrapper h2");

  if (boardTitle) {
    boardTitle.textContent =
      t.boardTitle;
  }


  const stages =
    document.querySelectorAll(".stage-label");

  if (stages.length >= 4) {

    stages[0].textContent =
      t.stage1;

    stages[1].textContent =
      t.stage2;

    stages[2].textContent =
      t.stage3;

    stages[3].textContent =
      t.stage4;
  }


  const forkTitle =
    document.querySelector(
      ".bifurcation-box h4"
    );

  if (forkTitle) {

    forkTitle.innerHTML =
      `<i class="fa-solid fa-code-fork"></i> ${t.forkTitle}`;
  }


  const pathButtons =
    document.querySelectorAll(".btn-path");

  if (pathButtons.length >= 2) {

    pathButtons[0].innerHTML =
      `<strong>${t.verifier}</strong><br><small>${t.verifierSmall}</small>`;

    pathButtons[1].innerHTML =
      `<strong>${t.fast}</strong><br><small>${t.fastSmall}</small>`;
  }


  // ----------------------------------------------------------
  // LABORATORIO
  // ----------------------------------------------------------

  const labTitle =
    document.querySelector("#page-lab h2");

  if (labTitle) {

    labTitle.innerHTML =
      `<i class="fa-solid fa-flask"></i> ${t.labTitle}`;
  }


  const labDescription =
    document.querySelector(
      "#page-lab > .lab-container > p"
    );

  if (labDescription) {

    labDescription.textContent =
      t.labDescription;
  }


  const labButtons =
    document.querySelectorAll(
      ".lab-buttons button"
    );

  if (labButtons.length >= 3) {

    labButtons[0].innerHTML =
      `<i class="fa-solid fa-robot"></i> ${t.scanAI}`;

    labButtons[1].innerHTML =
      `<i class="fa-solid fa-link"></i> ${t.source}`;

    labButtons[2].innerHTML =
      `<i class="fa-solid fa-file-code"></i> ${t.metadata}`;
  }


  const labOutput =
    document.getElementById("lab-output");

  if (labOutput) {

    labOutput.textContent =
      t.labOutput;
  }


  // ----------------------------------------------------------
  // RANKING
  // ----------------------------------------------------------

  const rankingTitle =
    document.querySelector(
      "#page-leaderboard h2"
    );

  if (rankingTitle) {

    rankingTitle.innerHTML =
      `<i class="fa-solid fa-trophy"></i> ${t.rankingTitle}`;
  }


  const headers =
    document.querySelectorAll(
      "#page-leaderboard th"
    );

  if (headers.length >= 4) {

    headers[0].textContent =
      t.position;

    headers[1].textContent =
      t.agent;

    headers[2].textContent =
      t.trustedFollowers;

    headers[3].textContent =
      t.avoidedViral;
  }


  // ----------------------------------------------------------
  // MODAL
  // ----------------------------------------------------------

  const challenge =
    document.querySelector(
      "#minigame-clickbait h3"
    );

  if (challenge) {

    challenge.innerHTML =
      `<i class="fa-solid fa-newspaper"></i> ${t.challenge}`;
  }


  const sliderLabel =
    document.querySelector(
      "#minigame-clickbait .slider-box label"
    );

  if (sliderLabel) {

    sliderLabel.textContent =
      t.slider;
  }


  const modalButtons =
    document.querySelectorAll(
      "#interactive-modal .modal-footer button"
    );

  if (modalButtons.length >= 2) {

    modalButtons[0].textContent =
      t.shield;

    modalButtons[1].textContent =
      t.close;
  }


  const readArticleButton =
    document.querySelector(
      "#minigame-clickbait .btn-secondary"
    );

  if (readArticleButton) {

    readArticleButton.textContent =
      t.readArticle;
  }


  const confirmButton =
    document.querySelector(
      "#minigame-clickbait .btn-primary"
    );

  if (confirmButton) {

    confirmButton.textContent =
      t.confirm;
  }


  // Cambiar idioma real del documento
  document.documentElement.lang =
    currentLanguage;


  // Actualizar HUD
  updateHUD();


  // Redibujar tablero
  renderBoard();
}


// ============================================================
// 18. INICIAR EL JUEGO
// ============================================================

document.addEventListener("DOMContentLoaded", () => {

  // Dibujar tablero inmediatamente
  renderBoard();

  // Actualizar estadísticas
  updateHUD();

  // Asegurar idioma inicial
  changeLanguage("es");

});
