```javascript
// ============================================================
// INOCULA · APP.JS
// Tablero de Vida Digital
// ============================================================


// ============================================================
// 1. NAVEGACIÓN
// ============================================================

function navigateTo(pageId) {
  document.querySelectorAll(".page-view").forEach(page => {
    page.classList.add("hidden");
    page.classList.remove("active");
  });

  document.querySelectorAll(".nav-btn").forEach(button => {
    button.classList.remove("active");
  });

  const page = document.getElementById(pageId);

  if (page) {
    page.classList.remove("hidden");
    page.classList.add("active");
  }

  // Activar botón correspondiente
  const buttons = document.querySelectorAll(".nav-btn");

  buttons.forEach(button => {
    const onclick = button.getAttribute("onclick");

    if (onclick && onclick.includes(pageId)) {
      button.classList.add("active");
    }
  });
}


// ============================================================
// 2. ESTADO DEL JUEGO
// ============================================================

let viralLoad = 15;
let followers = 100;
let shields = 1;

// Posición actual del jugador
let playerPosition = 0;

// Número máximo de casillas
const TOTAL_TILES = 20;

// Noticia actual
let currentNews = null;

// Idioma actual
let currentLanguage = "es";


// ============================================================
// 3. TRADUCCIONES
// ============================================================

const translations = {

  es: {

    nav: [
      "Inicio",
      "Tablero",
      "Laboratorio",
      "Ranking"
    ],

    heroTag: "UNESCO Youth Hackathon 2026",

    heroTitle:
      'Antes de creer, <span class="gradient-text">inocúlate.</span>',

    heroText:
      "El tablero de vida digital que te entrena para detectar fake news, deepfakes y manipulación en tu día a día digital.",

    enterBoard: "Entrar al Tablero",
    tools: "Probar Herramientas",

    stages: "Etapas del Día",
    languages: "Idiomas (ES, EN, ZH)",
    viralGoal: "Carga Viral Meta",

    publicViral: "Carga Viral Pública",
    digitalProfile: "Perfil Digital",
    digitalWheel: "Rueda Digital",

    followers: "Seguidores:",
    shields: "Escudos:",

    spin: "GIRAR RUEDA",
    spinText: "Gira la Rueda",

    boardTitle:
      "Tablero: Tu Navegación Diaria",

    stage1:
      "Etapa 1: Despertar & Feed Matutino",

    stage2:
      "Etapa 2: Trabajo / Escuela & Chats",

    stage3:
      "Etapa 3: Tarde, Noticias & Redes",

    stage4:
      "Etapa 4: Noche, Viral & Retiro Digital",

    forkTitle:
      "¡Punto de Bifurcación! Elige tu camino:",

    verifier:
      "Camino Verificador",

    verifierSmall:
      "Más lento, gana Escudos de protección",

    fast:
      "Camino Rápido",

    fastSmall:
      "Avanzas rápido, asumes riesgo de Fake News",

    labTitle:
      "Laboratorio de Verificación",

    labDescription:
      "Simulador interactivo para analizar noticias antes de compartirlas:",

    scanAI:
      "Escanear IA",

    source:
      "Buscar Fuente Original",

    metadata:
      "Revisar Metadatos",

    labOutput:
      "Selecciona una herramienta para inspeccionar el contenido.",

    rankingTitle:
      "Agentes INOCULA Destacados",

    position: "Posición",
    agent: "Agente",
    trustedFollowers: "Seguidores Confiables",
    avoidedViral: "Carga Viral Evitada",

    challenge:
      "Reto: Titular vs Nota",

    readArticle:
      "📄 Leer nota completa",

    slider:
      "¿El titular representa la nota o exagera?",

    confirm:
      "Confirmar Evaluación",

    shield:
      "🛡️ Usar Escudo para Saltar",

    close:
      "Cerrar",

    advance:
      "Avanzas",

    spaces:
      "casillas",

    positionText:
      "Casilla",

    victory:
      "🏆 ¡Felicidades! Completaste el recorrido de INOCULA.",

    stageReached:
      "¡Llegaste a una nueva etapa!"
  },


  en: {

    nav: [
      "Home",
      "Game Board",
      "Laboratory",
      "Leaderboard"
    ],

    heroTag:
      "UNESCO Youth Hackathon 2026",

    heroTitle:
      'Before you believe, <span class="gradient-text">inoculate yourself.</span>',

    heroText:
      "The digital life board that trains you to detect fake news, deepfakes, and manipulation in your everyday digital life.",

    enterBoard:
      "Enter Game Board",

    tools:
      "Try Tools",

    stages:
      "Stages of the Day",

    languages:
      "Languages (ES, EN, ZH)",

    viralGoal:
      "Target Viral Load",

    publicViral:
      "Public Viral Load",

    digitalProfile:
      "Digital Profile",

    digitalWheel:
      "Digital Wheel",

    followers:
      "Followers:",

    shields:
      "Shields:",

    spin:
      "SPIN WHEEL",

    spinText:
      "Spin the Wheel",

    boardTitle:
      "Game Board: Your Daily Navigation",

    stage1:
      "Stage 1: Wake Up & Morning Feed",

    stage2:
      "Stage 2: Work / School & Chats",

    stage3:
      "Stage 3: Afternoon, News & Social Media",

    stage4:
      "Stage 4: Night, Viral & Digital Detox",

    forkTitle:
      "Fork in the Road! Choose your path:",

    verifier:
      "Verifier Path",

    verifierSmall:
      "Slower, earns protection Shields",

    fast:
      "Fast Path",

    fastSmall:
      "Move faster, take Fake News risk",

    labTitle:
      "Verification Laboratory",

    labDescription:
      "Interactive simulator to analyze news before sharing them:",

    scanAI:
      "Scan with AI",

    source:
      "Find Original Source",

    metadata:
      "Review Metadata",

    labOutput:
      "Select a tool to inspect the content.",

    rankingTitle:
      "Featured INOCULA Agents",

    position:
      "Position",

    agent:
      "Agent",

    trustedFollowers:
      "Trusted Followers",

    avoidedViral:
      "Viral Load Avoided",

    challenge:
      "Challenge: Headline vs Article",

    readArticle:
      "📄 Read full article",

    slider:
      "Does the headline represent the article or exaggerate?",

    confirm:
      "Confirm Evaluation",

    shield:
      "🛡️ Use Shield to Skip",

    close:
      "Close",

    advance:
      "You advance",

    spaces:
      "spaces",

    positionText:
      "Space",

    victory:
      "🏆 Congratulations! You completed the INOCULA journey.",

    stageReached:
      "You reached a new stage!"
  },


  zh: {

    nav: [
      "首页",
      "游戏板",
      "实验室",
      "排行榜"
    ],

    heroTag:
      "联合国教科文组织青年黑客马拉松 2026",

    heroTitle:
      '在相信之前，<span class="gradient-text">先给自己接种。</span>',

    heroText:
      "数字生活棋盘，训练你识别日常数字生活中的假新闻、深度伪造和信息操纵。",

    enterBoard:
      "进入游戏板",

    tools:
      "尝试工具",

    stages:
      "一天的阶段",

    languages:
      "语言（ES、EN、ZH）",

    viralGoal:
      "目标病毒负荷",

    publicViral:
      "公共病毒负荷",

    digitalProfile:
      "数字档案",

    digitalWheel:
      "数字转盘",

    followers:
      "关注者：",

    shields:
      "护盾：",

    spin:
      "旋转转盘",

    spinText:
      "旋转转盘",

    boardTitle:
      "游戏板：你的日常数字生活",

    stage1:
      "阶段 1：起床与早晨信息流",

    stage2:
      "阶段 2：工作 / 学校与聊天",

    stage3:
      "阶段 3：下午、新闻与社交网络",

    stage4:
      "阶段 4：夜晚、病毒信息与数字休息",

    forkTitle:
      "分岔路口！选择你的道路：",

    verifier:
      "验证者道路",

    verifierSmall:
      "速度较慢，但可以获得保护护盾",

    fast:
      "快速道路",

    fastSmall:
      "前进更快，但承担假新闻风险",

    labTitle:
      "信息验证实验室",

    labDescription:
      "在分享新闻之前进行分析的互动模拟器：",

    scanAI:
      "AI 扫描",

    source:
      "查找原始来源",

    metadata:
      "检查元数据",

    labOutput:
      "选择一个工具来检查内容。",

    rankingTitle:
      "INOCULA 优秀特工",

    position:
      "排名",

    agent:
      "特工",

    trustedFollowers:
      "可信关注者",

    avoidedViral:
      "避免的病毒负荷",

    challenge:
      "挑战：标题与文章",

    readArticle:
      "📄 阅读完整文章",

    slider:
      "标题是否准确反映文章内容，还是夸大了？",

    confirm:
      "确认评估",

    shield:
      "🛡️ 使用护盾跳过",

    close:
      "关闭",

    advance:
      "前进",

    spaces:
      "格",

    positionText:
      "位置",

    victory:
      "🏆 恭喜！你完成了 INOCULA 的全部旅程。",

    stageReached:
      "你到达了新的阶段！"
  }

};


// ============================================================
// 4. NOTICIAS
// ============================================================

const newsDatabase = [

  // ESPAÑOL
  {
    lang: "es",
    headline: "🚨 ¡Tomar agua con limón elimina todas las toxinas del cuerpo!",
    article:
      "El agua con limón puede formar parte de una alimentación saludable, pero el cuerpo ya cuenta con órganos como el hígado y los riñones para eliminar sustancias de desecho.",
    exaggerated: true
  },

  {
    lang: "es",
    headline: "🧠 ¡El cerebro utiliza electricidad para comunicarse!",
    article:
      "Las neuronas utilizan señales eléctricas y químicas para transmitir información.",
    exaggerated: false
  },

  {
    lang: "es",
    headline: "🚨 ¡Instagram puede leer tus pensamientos!",
    article:
      "Las plataformas pueden recopilar información sobre actividad, intereses e interacciones, pero eso no significa que puedan leer directamente los pensamientos.",
    exaggerated: true
  },

  {
    lang: "es",
    headline: "🦠 ¡Lavarse las manos puede ayudar a prevenir enfermedades!",
    article:
      "La higiene de manos ayuda a reducir la transmisión de microorganismos.",
    exaggerated: false
  },

  {
    lang: "es",
    headline: "🚨 ¡La inteligencia artificial nunca se equivoca!",
    article:
      "Los sistemas de inteligencia artificial pueden producir respuestas incorrectas o información inventada y necesitan verificación.",
    exaggerated: true
  },

  {
    lang: "es",
    headline: "🌳 ¡Los árboles ayudan a absorber dióxido de carbono!",
    article:
      "Las plantas absorben dióxido de carbono durante la fotosíntesis.",
    exaggerated: false
  },


  // ENGLISH
  {
    lang: "en",
    headline: "🚨 Drinking lemon water removes ALL toxins from your body!",
    article:
      "Lemon water can be part of a healthy diet, but organs such as the liver and kidneys already remove waste products from the body.",
    exaggerated: true
  },

  {
    lang: "en",
    headline: "🧠 The brain uses electrical signals to communicate!",
    article:
      "Neurons use electrical and chemical signals to communicate information throughout the nervous system.",
    exaggerated: false
  },

  {
    lang: "en",
    headline: "🚨 Instagram can read your thoughts!",
    article:
      "Social media platforms can collect information about activity, interests and interactions, but this does not mean they can directly read people's thoughts.",
    exaggerated: true
  },

  {
    lang: "en",
    headline: "🦠 Washing your hands can help prevent infections!",
    article:
      "Hand hygiene can reduce the spread of microorganisms and help prevent infections.",
    exaggerated: false
  },

  {
    lang: "en",
    headline: "🚨 Artificial intelligence is NEVER wrong!",
    article:
      "AI systems can generate incorrect information and should be checked against reliable sources.",
    exaggerated: true
  },

  {
    lang: "en",
    headline: "🌳 Trees absorb carbon dioxide during photosynthesis!",
    article:
      "Plants absorb carbon dioxide as part of the photosynthesis process.",
    exaggerated: false
  },


  // CHINESE
  {
    lang: "zh",
    headline: "🚨 喝柠檬水可以清除体内所有毒素！",
    article:
      "柠檬水可以成为健康饮食的一部分，但人体的肝脏和肾脏本身就负责处理和排出许多废物。",
    exaggerated: true
  },

  {
    lang: "zh",
    headline: "🧠 大脑使用电信号进行交流！",
    article:
      "神经元通过电信号和化学信号传递信息。",
    exaggerated: false
  },

  {
    lang: "zh",
    headline: "🚨 Instagram 可以读取你的思想！",
    article:
      "社交平台可以收集用户的活动、兴趣和互动信息，但这并不意味着它们可以直接读取人的思想。",
    exaggerated: true
  },

  {
    lang: "zh",
    headline: "🦠 洗手可以帮助预防疾病！",
    article:
      "保持手部卫生可以减少微生物的传播，并帮助预防感染。",
    exaggerated: false
  },

  {
    lang: "zh",
    headline: "🚨 人工智能永远不会犯错！",
    article:
      "人工智能系统可能产生错误信息，因此需要通过可靠来源进行验证。",
    exaggerated: true
  },

  {
    lang: "zh",
    headline: "🌳 树木可以在光合作用中吸收二氧化碳！",
    article:
      "植物在进行光合作用时会吸收二氧化碳。",
    exaggerated: false
  }

];


// ============================================================
// 5. CREAR LAS 20 CASILLAS
// ============================================================

function createBoardTiles() {

  const stages = [
    document.getElementById("stage-1"),
    document.getElementById("stage-2"),
    document.getElementById("stage-3"),
    document.getElementById("stage-4")
  ];

  stages.forEach(stage => {
    if (stage) {
      stage.innerHTML = "";
    }
  });

  for (let i = 1; i <= TOTAL_TILES; i++) {

    const stageNumber = Math.ceil(i / 5);

    const tile = document.createElement("div");

    tile.className = "game-tile";

    tile.id = `tile-${i}`;

    tile.innerHTML = `
      <span class="tile-number">${i}</span>
      <span class="tile-icon">✦</span>
    `;

    const stage = stages[stageNumber - 1];

    if (stage) {
      stage.appendChild(tile);
    }
  }

  updatePlayerPosition();
}


// ============================================================
// 6. MOSTRAR JUGADOR
// ============================================================

function updatePlayerPosition() {

  // Quitar jugador de todas las casillas
  document.querySelectorAll(".game-tile").forEach(tile => {
    tile.classList.remove("player-here");

    const oldPlayer = tile.querySelector(".player-token");

    if (oldPlayer) {
      oldPlayer.remove();
    }
  });

  // Si estamos en la casilla 0, todavía no aparece
  if (playerPosition <= 0) {
    return;
  }

  const currentTile =
    document.getElementById(`tile-${playerPosition}`);

  if (!currentTile) {
    return;
  }

  currentTile.classList.add("player-here");

  const player = document.createElement("span");

  player.className = "player-token";

  player.textContent = "🧑‍💻";

  currentTile.appendChild(player);

  currentTile.scrollIntoView({
    behavior: "smooth",
    block: "nearest",
    inline: "center"
  });
}


// ============================================================
// 7. GIRAR RUEDA
// ============================================================

function spinWheel() {

  const button =
    document.getElementById("spin-btn");

  // Evitar doble clic
  if (button) {
    button.disabled = true;
  }

  const moves =
    Math.floor(Math.random() * 4) + 1;

  const t =
    translations[currentLanguage];

  const wheelDisplay =
    document.getElementById("wheel-display");

  if (wheelDisplay) {

    wheelDisplay.innerHTML =
      `<strong>${t.advance} ${moves} ${t.spaces}</strong>`;
  }

  // Mover jugador
  movePlayer(moves);

  setTimeout(() => {

    if (button) {
      button.disabled = false;
    }

    // Si terminó
    if (playerPosition >= TOTAL_TILES) {

      showVictory();

      return;
    }

    // Abrir reto
    openMinigame("clickbait");

  }, 900);
}


// ============================================================
// 8. MOVER JUGADOR
// ============================================================

function movePlayer(moves) {

  const oldPosition =
    playerPosition;

  playerPosition =
    Math.min(
      playerPosition + moves,
      TOTAL_TILES
    );

  updatePlayerPosition();

  // Detectar cambio de etapa
  const oldStage =
    getStageFromPosition(oldPosition);

  const newStage =
    getStageFromPosition(playerPosition);

  if (
    newStage !== oldStage &&
    playerPosition > 0 &&
    playerPosition < TOTAL_TILES
  ) {

    setTimeout(() => {

      alert(
        translations[currentLanguage].stageReached +
        "\n\n" +
        getStageName(newStage)
      );

    }, 300);
  }
}


// ============================================================
// 9. DETERMINAR ETAPA
// ============================================================

function getStageFromPosition(position) {

  if (position <= 5) {
    return 1;
  }

  if (position <= 10) {
    return 2;
  }

  if (position <= 15) {
    return 3;
  }

  return 4;
}


function getStageName(stage) {

  const t =
    translations[currentLanguage];

  return t[`stage${stage}`];
}


// ============================================================
// 10. RETO DE NOTICIAS
// ============================================================

function openMinigame(type) {

  const modal =
    document.getElementById("interactive-modal");

  if (!modal) {
    return;
  }

  modal.classList.remove("hidden");

  document
    .querySelectorAll(".minigame-view")
    .forEach(view => {
      view.classList.add("hidden");
    });


  if (type === "clickbait") {

    // Filtrar noticias según idioma
    const availableNews =
      newsDatabase.filter(
        news => news.lang === currentLanguage
      );

    // Elegir noticia aleatoria
    const randomIndex =
      Math.floor(
        Math.random() * availableNews.length
      );

    currentNews =
      availableNews[randomIndex];


    const headline =
      document.querySelector(
        "#minigame-clickbait .headline"
      );

    if (headline) {
      headline.textContent =
        currentNews.headline;
    }


    const article =
      document.getElementById("article-body");

    if (article) {

      article.textContent =
        currentNews.article;

      article.classList.add("hidden");
    }


    const slider =
      document.getElementById(
        "clickbait-slider"
      );

    if (slider) {
      slider.value = 50;
    }


    document
      .getElementById("minigame-clickbait")
      .classList.remove("hidden");
  }
}


// ============================================================
// 11. MOSTRAR ARTÍCULO
// ============================================================

function toggleArticleBody() {

  const article =
    document.getElementById("article-body");

  if (article) {
    article.classList.toggle("hidden");
  }
}


// ============================================================
// 12. COMPROBAR RESPUESTA
// ============================================================

function checkClickbait() {

  if (!currentNews) {
    return;
  }

  const slider =
    document.getElementById(
      "clickbait-slider"
    );

  const value =
    Number(slider.value);

  const t =
    translations[currentLanguage];


  if (currentNews.exaggerated) {

    if (value > 50) {

      if (currentLanguage === "es") {
        alert(
          "¡Excelente! Detectaste que el titular exageraba la nota."
        );
      }

      if (currentLanguage === "en") {
        alert(
          "Excellent! You detected that the headline exaggerated the article."
        );
      }

      if (currentLanguage === "zh") {
        alert(
          "太棒了！你发现标题夸大了文章内容。"
        );
      }

      followers += 25;

    } else {

      if (currentLanguage === "es") {
        alert(
          "¡Cuidado! El titular exageraba la información."
        );
      }

      if (currentLanguage === "en") {
        alert(
          "Careful! The headline exaggerated the information."
        );
      }

      if (currentLanguage === "zh") {
        alert(
          "注意！这个标题夸大了信息。"
        );
      }

      viralLoad += 10;
    }

  } else {

    if (value <= 50) {

      if (currentLanguage === "es") {
        alert(
          "¡Excelente! Detectaste que el titular representa correctamente la nota."
        );
      }

      if (currentLanguage === "en") {
        alert(
          "Excellent! You recognized that the headline accurately represents the article."
        );
      }

      if (currentLanguage === "zh") {
        alert(
          "太棒了！你发现标题准确地反映了文章内容。"
        );
      }

      followers += 25;

    } else {

      if (currentLanguage === "es") {
        alert(
          "¡Cuidado! El titular sí representaba correctamente la información."
        );
      }

      if (currentLanguage === "en") {
        alert(
          "Careful! The headline accurately represented the information."
        );
      }

      if (currentLanguage === "zh") {
        alert(
          "注意！这个标题准确地反映了信息。"
        );
      }

      viralLoad += 10;
    }
  }

  // Evitar que la carga viral pase de 100
  viralLoad =
    Math.min(viralLoad, 100);

  updateHUD();

  closeModal();
}


// ============================================================
// 13. CAMINOS
// ============================================================

function choosePath(path) {

  if (path === "verifier") {

    shields++;

    if (currentLanguage === "es") {
      alert(
        "Tomaste el Camino Verificador: ganas +1 Escudo."
      );
    }

    if (currentLanguage === "en") {
      alert(
        "You chose the Verifier Path: +1 Shield."
      );
    }

    if (currentLanguage === "zh") {
      alert(
        "你选择了验证者道路：获得 +1 护盾。"
      );
    }

  } else {

    followers += 30;

    viralLoad += 10;

    if (currentLanguage === "es") {
      alert(
        "Tomaste el Camino Rápido: +30 Seguidores, pero aumenta la Carga Viral."
      );
    }

    if (currentLanguage === "en") {
      alert(
        "You chose the Fast Path: +30 Followers, but Viral Load increases."
      );
    }

    if (currentLanguage === "zh") {
      alert(
        "你选择了快速道路：获得 +30 关注者，但病毒负荷增加。"
      );
    }
  }

  viralLoad =
    Math.min(viralLoad, 100);

  updateHUD();
}


// ============================================================
// 14. LABORATORIO
// ============================================================

function runLabTool(tool) {

  const output =
    document.getElementById("lab-output");

  if (!output) {
    return;
  }


  if (currentLanguage === "es") {

    if (tool === "ia") {
      output.innerText =
        "🤖 Análisis de IA: Inconsistencias visuales detectadas. 92% de probabilidad de contenido generado o manipulado.";
    }

    if (tool === "source") {
      output.innerText =
        "🔗 Búsqueda de Fuente: No existe ningún registro oficial que confirme esta noticia.";
    }

    if (tool === "meta") {
      output.innerText =
        "📄 Metadatos: El archivo presenta información que requiere una revisión adicional.";
    }
  }


  if (currentLanguage === "en") {

    if (tool === "ia") {
      output.innerText =
        "🤖 AI Analysis: Visual inconsistencies detected. 92% probability of generated or manipulated content.";
    }

    if (tool === "source") {
      output.innerText =
        "🔗 Source Search: No reliable official record was found confirming this story.";
    }

    if (tool === "meta") {
      output.innerText =
        "📄 Metadata: The file contains information that requires additional verification.";
    }
  }


  if (currentLanguage === "zh") {

    if (tool === "ia") {
      output.innerText =
        "🤖 AI 分析：检测到视觉不一致。该内容可能由人工智能生成或经过修改，概率为 92%。";
    }

    if (tool === "source") {
      output.innerText =
        "🔗 来源搜索：没有找到可靠的官方记录来证实这条新闻。";
    }

    if (tool === "meta") {
      output.innerText =
        "📄 元数据：该文件包含需要进一步验证的信息。";
    }
  }
}


// ============================================================
// 15. HUD
// ============================================================

function updateHUD() {

  const followersElement =
    document.getElementById(
      "followers-count"
    );

  const shieldsElement =
    document.getElementById(
      "shields-count"
    );

  const viralMeter =
    document.getElementById(
      "viral-meter"
    );

  const viralText =
    document.getElementById(
      "viral-text"
    );


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

    if (currentLanguage === "es") {
      viralText.innerText =
        `${viralLoad}% - Carga Viral Global`;
    }

    if (currentLanguage === "en") {
      viralText.innerText =
        `${viralLoad}% - Global Viral Load`;
    }

    if (currentLanguage === "zh") {
      viralText.innerText =
        `${viralLoad}% - 全球病毒负荷`;
    }
  }
}


// ============================================================
// 16. ESCUDO
// ============================================================

function useShield() {

  if (shields > 0) {

    shields--;

    if (currentLanguage === "es") {
      alert(
        "Usaste un Escudo para neutralizar la amenaza."
      );
    }

    if (currentLanguage === "en") {
      alert(
        "You used a Shield to neutralize the threat."
      );
    }

    if (currentLanguage === "zh") {
      alert(
        "你使用了护盾来中和威胁。"
      );
    }

    updateHUD();

    closeModal();

  } else {

    if (currentLanguage === "es") {
      alert("No tienes Escudos suficientes.");
    }

    if (currentLanguage === "en") {
      alert("You don't have enough Shields.");
    }

    if (currentLanguage === "zh") {
      alert("你没有足够的护盾。");
    }
  }
}


// ============================================================
// 17. CERRAR MODAL
// ============================================================

function closeModal() {

  const modal =
    document.getElementById(
      "interactive-modal"
    );

  if (modal) {
    modal.classList.add("hidden");
  }
}


// ============================================================
// 18. VICTORIA
// ============================================================

function showVictory() {

  const t =
    translations[currentLanguage];

  alert(t.victory);

  // Reiniciar tablero después de terminar
  setTimeout(() => {

    playerPosition = 0;

    updatePlayerPosition();

    const wheelDisplay =
      document.getElementById(
        "wheel-display"
      );

    if (wheelDisplay) {
      wheelDisplay.innerHTML =
        `<span>${t.spinText}</span>`;
    }

  }, 500);
}


// ============================================================
// 19. CAMBIO DE IDIOMA
// ============================================================

function changeLanguage(lang) {

  if (!translations[lang]) {
    lang = "es";
  }

  currentLanguage = lang;

  const t =
    translations[lang];


  // -------------------------
  // HTML
  // -------------------------

  document.documentElement.lang =
    lang;


  // -------------------------
  // NAVBAR
  // -------------------------

  const navButtons =
    document.querySelectorAll(
      ".nav-links .nav-btn"
    );

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


  // -------------------------
  // HOME
  // -------------------------

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
    document.querySelectorAll(
      ".stat-card p"
    );

  if (statCards.length >= 3) {

    statCards[0].textContent =
      t.stages;

    statCards[1].textContent =
      t.languages;

    statCards[2].textContent =
      t.viralGoal;
  }


  // -------------------------
  // TABLERO
  // -------------------------

  const statusTitles =
    document.querySelectorAll(
      ".status-card h3"
    );

  if (statusTitles.length >= 3) {

    statusTitles[0].innerHTML =
      `<i class="fa-solid fa-biohazard"></i> ${t.publicViral}`;

    statusTitles[1].innerHTML =
      `<i class="fa-solid fa-user-check"></i> ${t.digitalProfile}`;

    statusTitles[2].innerHTML =
      `<i class="fa-solid fa-dharmachakra"></i> ${t.digitalWheel}`;
  }


  const statRows =
    document.querySelectorAll(
      ".stat-row span"
    );

  if (statRows.length >= 2) {

    statRows[0].innerHTML =
      `<i class="fa-solid fa-users" style="color:#3b82f6;"></i> ${t.followers}`;

    statRows[1].innerHTML =
      `<i class="fa-solid fa-shield-halved" style="color:#10b981;"></i> ${t.shields}`;
  }


  const wheelDisplay =
    document.getElementById(
      "wheel-display"
    );

  if (wheelDisplay) {

    wheelDisplay.innerHTML =
      `<span>${t.spinText}</span>`;
  }


  const spinButton =
    document.getElementById(
      "spin-btn"
    );

  if (spinButton) {
    spinButton.textContent =
      t.spin;
  }


  const boardTitle =
    document.querySelector(
      ".board-wrapper h2"
    );

  if (boardTitle) {
    boardTitle.textContent =
      t.boardTitle;
  }


  const stages =
    document.querySelectorAll(
      ".stage-label"
    );

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


  const bifurcationTitle =
    document.querySelector(
      ".bifurcation-box h4"
    );

  if (bifurcationTitle) {

    bifurcationTitle.innerHTML =
      `<i class="fa-solid fa-code-fork"></i> ${t.forkTitle}`;
  }


  const pathButtons =
    document.querySelectorAll(
      ".btn-path"
    );

  if (pathButtons.length >= 2) {

    pathButtons[0].innerHTML =
      `<strong>${t.verifier}</strong><br><small>${t.verifierSmall}</small>`;

    pathButtons[1].innerHTML =
      `<strong>${t.fast}</strong><br><small>${t.fastSmall}</small>`;
  }


  // -------------------------
  // LABORATORIO
  // -------------------------

  const labTitle =
    document.querySelector(
      "#page-lab h2"
    );

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
    document.getElementById(
      "lab-output"
    );

  if (labOutput) {
    labOutput.textContent =
      t.labOutput;
  }


  // -------------------------
  // RANKING
  // -------------------------

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


  // -------------------------
  // MODAL
  // -------------------------

  const modalTitle =
    document.querySelector(
      "#minigame-clickbait h3"
    );

  if (modalTitle) {

    modalTitle.innerHTML =
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


  const articleButton =
    document.querySelector(
      "#minigame-clickbait .btn-secondary"
    );

  if (articleButton) {
    articleButton.textContent =
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


  // Actualizar HUD
  updateHUD();
}


// ============================================================
// 20. INICIAR JUEGO
// ============================================================

document.addEventListener(
  "DOMContentLoaded",
  () => {

    createBoardTiles();

    updateHUD();

    changeLanguage("es");

  }
);
```
