// ======================================================
// INOCULA · APP.JS COMPLETO
// Idiomas: Español / English / 中文
// ======================================================


// ======================================================
// ESTADO DEL JUEGO
// ======================================================

let viralLoad = 15;
let followers = 100;
let shields = 1;

let currentNews = null;
let currentNewsIndex = 0;

let currentLanguage = "es";


// ======================================================
// NOTICIAS
// ======================================================

const news = [

  {
    es: {
      headline: "🚨 ¡Tomar agua con limón elimina todas las toxinas del cuerpo!",
      article: "El agua con limón puede formar parte de una alimentación saludable, pero el cuerpo ya cuenta con órganos como el hígado y los riñones para eliminar sustancias de desecho."
    },
    en: {
      headline: "🚨 Drinking lemon water removes all toxins from your body!",
      article: "Lemon water can be part of a healthy diet, but the body already has organs such as the liver and kidneys that remove waste."
    },
    zh: {
      headline: "🚨 喝柠檬水可以清除体内所有毒素！",
      article: "柠檬水可以成为健康饮食的一部分，但人体本身已经拥有肝脏和肾脏等器官来清除废物。"
    },
    exaggerated: true
  },

  {
    es: {
      headline: "🧠 ¡El cerebro utiliza electricidad para comunicarse!",
      article: "Las neuronas utilizan señales eléctricas y químicas para transmitir información."
    },
    en: {
      headline: "🧠 The brain uses electricity to communicate!",
      article: "Neurons use electrical and chemical signals to transmit information."
    },
    zh: {
      headline: "🧠 大脑利用电信号进行交流！",
      article: "神经元利用电信号和化学信号来传递信息。"
    },
    exaggerated: false
  },

  {
    es: {
      headline: "🚨 ¡Instagram puede leer tus pensamientos!",
      article: "Las plataformas pueden recopilar información sobre actividad, intereses e interacciones, pero eso no significa que puedan leer directamente los pensamientos."
    },
    en: {
      headline: "🚨 Instagram can read your thoughts!",
      article: "Platforms can collect information about activity, interests and interactions, but this does not mean they can directly read people's thoughts."
    },
    zh: {
      headline: "🚨 Instagram 可以读取你的思想！",
      article: "平台可以收集有关活动、兴趣和互动的信息，但这并不意味着它们可以直接读取人的思想。"
    },
    exaggerated: true
  },

  {
    es: {
      headline: "🦠 ¡Lavarse las manos puede ayudar a prevenir enfermedades!",
      article: "La higiene de manos ayuda a reducir la transmisión de microorganismos."
    },
    en: {
      headline: "🦠 Washing your hands can help prevent diseases!",
      article: "Hand hygiene helps reduce the transmission of microorganisms."
    },
    zh: {
      headline: "🦠 洗手可以帮助预防疾病！",
      article: "手部卫生有助于减少微生物的传播。"
    },
    exaggerated: false
  },

  {
    es: {
      headline: "🚨 ¡La inteligencia artificial nunca se equivoca!",
      article: "Los sistemas de inteligencia artificial pueden producir respuestas incorrectas o información inventada y necesitan verificación."
    },
    en: {
      headline: "🚨 Artificial intelligence never makes mistakes!",
      article: "Artificial intelligence systems can produce incorrect answers or fabricated information and need verification."
    },
    zh: {
      headline: "🚨 人工智能从来不会犯错！",
      article: "人工智能系统可能产生错误答案或虚假信息，因此需要进行验证。"
    },
    exaggerated: true
  },

  {
    es: {
      headline: "🌳 ¡Los árboles ayudan a absorber dióxido de carbono!",
      article: "Las plantas absorben dióxido de carbono durante la fotosíntesis."
    },
    en: {
      headline: "🌳 Trees help absorb carbon dioxide!",
      article: "Plants absorb carbon dioxide during photosynthesis."
    },
    zh: {
      headline: "🌳 树木可以帮助吸收二氧化碳！",
      article: "植物在光合作用过程中会吸收二氧化碳。"
    },
    exaggerated: false
  },

  {
    es: {
      headline: "🚨 ¡Plantar un solo árbol resolverá el cambio climático!",
      article: "Los árboles ayudan al ambiente, pero resolver el cambio climático requiere múltiples acciones."
    },
    en: {
      headline: "🚨 Planting one tree will solve climate change!",
      article: "Trees help the environment, but solving climate change requires many different actions."
    },
    zh: {
      headline: "🚨 种一棵树就能解决气候变化问题！",
      article: "树木有助于保护环境，但解决气候变化需要多种不同的行动。"
    },
    exaggerated: true
  },

  {
    es: {
      headline: "📱 ¡Tu ubicación puede ser compartida por algunas aplicaciones!",
      article: "Algunas aplicaciones pueden solicitar permisos de ubicación para ofrecer determinadas funciones."
    },
    en: {
      headline: "📱 Some apps can share your location!",
      article: "Some applications can request location permissions to provide certain features."
    },
    zh: {
      headline: "📱 一些应用程序可以获取你的位置信息！",
      article: "一些应用程序可能会请求位置权限，以提供特定功能。"
    },
    exaggerated: false
  },

  {
    es: {
      headline: "🚨 ¡Si una noticia tiene millones de likes, definitivamente es verdadera!",
      article: "La popularidad de una publicación no demuestra que la información sea cierta."
    },
    en: {
      headline: "🚨 If a news story has millions of likes, it must be true!",
      article: "The popularity of a post does not prove that the information is true."
    },
    zh: {
      headline: "🚨 如果一条新闻有数百万个点赞，它一定是真的！",
      article: "一条帖子的受欢迎程度并不能证明其中的信息是真实的。"
    },
    exaggerated: true
  },

  {
    es: {
      headline: "🔎 ¡Comparar varias fuentes puede ayudar a detectar información falsa!",
      article: "Contrastar diferentes fuentes confiables puede ayudar a identificar inconsistencias."
    },
    en: {
      headline: "🔎 Comparing multiple sources can help detect false information!",
      article: "Comparing different reliable sources can help identify inconsistencies."
    },
    zh: {
      headline: "🔎 比较多个来源可以帮助发现虚假信息！",
      article: "比较不同的可靠来源可以帮助发现信息中的不一致之处。"
    },
    exaggerated: false
  },

  {
    es: {
      headline: "🚨 ¡Los celulares escuchan absolutamente todas tus conversaciones!",
      article: "Los dispositivos pueden utilizar micrófonos cuando tienen permisos, pero eso no significa que estén grabando todas las conversaciones constantemente."
    },
    en: {
      headline: "🚨 Phones listen to absolutely every conversation you have!",
      article: "Devices can use microphones when they have permission, but this does not mean they constantly record every conversation."
    },
    zh: {
      headline: "🚨 手机会监听你所有的对话！",
      article: "如果获得权限，设备可以使用麦克风，但这并不意味着它们一直在录制所有对话。"
    },
    exaggerated: true
  },

  {
    es: {
      headline: "☀️ La luz solar ayuda al cuerpo a producir vitamina D.",
      article: "La exposición al sol permite que el cuerpo produzca vitamina D, aunque demasiada exposición puede ser perjudicial."
    },
    en: {
      headline: "☀️ Sunlight helps the body produce vitamin D.",
      article: "Sun exposure allows the body to produce vitamin D, although excessive exposure can be harmful."
    },
    zh: {
      headline: "☀️ 阳光可以帮助人体产生维生素D。",
      article: "阳光照射可以帮助人体产生维生素D，但过度暴露在阳光下可能有害。"
    },
    exaggerated: false
  },

  {
    es: {
      headline: "🚨 ¡Dormir solo 2 horas al día aumenta tu inteligencia!",
      article: "Dormir muy poco puede afectar negativamente la concentración, la memoria y el bienestar."
    },
    en: {
      headline: "🚨 Sleeping only 2 hours a day makes you smarter!",
      article: "Getting too little sleep can negatively affect concentration, memory and well-being."
    },
    zh: {
      headline: "🚨 每天只睡两个小时会让你更聪明！",
      article: "睡眠不足可能会对注意力、记忆力和身心健康产生负面影响。"
    },
    exaggerated: true
  },

  {
    es: {
      headline: "💧 El agua es necesaria para muchas funciones del cuerpo.",
      article: "El agua participa en diferentes procesos importantes del organismo."
    },
    en: {
      headline: "💧 Water is necessary for many body functions.",
      article: "Water participates in many important processes in the body."
    },
    zh: {
      headline: "💧 水对于身体的许多功能都很重要。",
      article: "水参与人体许多重要的生理过程。"
    },
    exaggerated: false
  },

  {
    es: {
      headline: "🚨 ¡Una publicación viral siempre tiene información confiable!",
      article: "Una publicación puede hacerse viral aunque contenga información incorrecta o engañosa."
    },
    en: {
      headline: "🚨 A viral post always contains reliable information!",
      article: "A post can go viral even when it contains incorrect or misleading information."
    },
    zh: {
      headline: "🚨 热门帖子中的信息总是可靠的！",
      article: "即使内容错误或具有误导性，一条帖子也可能迅速走红。"
    },
    exaggerated: true
  }

];


// ======================================================
// TEXTOS DE LA INTERFAZ
// ======================================================

const translations = {

  es: {
    nav: ["Inicio", "Tablero", "Laboratorio", "Ranking"],

    heroTag: "UNESCO Youth Hackathon 2026",
    heroTitle: 'Antes de creer, <span class="gradient-text">inocúlate.</span>',
    heroText: "El tablero de vida digital que te entrena para detectar fake news, deepfakes y manipulación en tu día a día digital.",

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
    advance: "Avanzas",

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
    labDescription: "Simulador interactivo para analizar noticias antes de compartirlas:",

    scanAI: "Escanear IA",
    source: "Buscar Fuente Original",
    metadata: "Revisar Metadatos",

    labOutput: "Selecciona una herramienta para inspeccionar el contenido.",

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

    alertCorrect: "¡Excelente! Detectaste que el titular exageraba la nota.",
    alertWrong: "¡Cuidado! El titular exageraba la información.",
    alertCorrectTrue: "¡Excelente! Detectaste que el titular representa correctamente la nota.",
    alertWrongTrue: "¡Cuidado! El titular sí representa correctamente la información.",

    shieldUsed: "Usaste un Escudo para neutralizar la amenaza.",
    noShield: "No tienes Escudos suficientes.",

    verifierAlert: "Tomaste el Camino Verificador: Ganas +1 Escudo.",
    fastAlert: "Tomaste el Camino Rápido: Ganas +30 Seguidores pero sube la Carga Viral."
  },


  en: {
    nav: ["Home", "Game Board", "Laboratory", "Leaderboard"],

    heroTag: "UNESCO Youth Hackathon 2026",
    heroTitle: 'Before you believe, <span class="gradient-text">inoculate yourself.</span>',
    heroText: "The digital life board that trains you to detect fake news, deepfakes and manipulation in your everyday digital life.",

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
    advance: "You advance",

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
    labDescription: "Interactive simulator to analyze news before sharing it:",

    scanAI: "Scan with AI",
    source: "Find Original Source",
    metadata: "Review Metadata",

    labOutput: "Select a tool to inspect the content.",

    rankingTitle: "Featured INOCULA Agents",
    position: "Position",
    agent: "Agent",
    trustedFollowers: "Trusted Followers",
    avoidedViral: "Viral Load Avoided",

    challenge: "Challenge: Headline vs Article",
    readArticle: "📄 Read full article",
    slider: "Does the headline represent the article or exaggerate?",
    confirm: "Confirm Evaluation",
    shield: "🛡️ Use Shield to Skip",
    close: "Close",

    alertCorrect: "Excellent! You detected that the headline exaggerated the article.",
    alertWrong: "Careful! The headline exaggerated the information.",
    alertCorrectTrue: "Excellent! You detected that the headline correctly represents the article.",
    alertWrongTrue: "Careful! The headline correctly represented the information.",

    shieldUsed: "You used a Shield to neutralize the threat.",
    noShield: "You don't have enough Shields.",

    verifierAlert: "You chose the Verifier Path: +1 Shield.",
    fastAlert: "You chose the Fast Path: +30 Followers, but Viral Load increases."
  },


  zh: {
    nav: ["首页", "游戏板", "实验室", "排行榜"],

    heroTag: "联合国教科文组织青年黑客马拉松 2026",
    heroTitle: '在相信之前，<span class="gradient-text">先给自己接种。</span>',
    heroText: "数字生活棋盘训练你识别日常生活中的假新闻、深度伪造和信息操纵。",

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
    advance: "前进",

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
    labDescription: "在分享新闻之前进行分析的互动模拟器：",

    scanAI: "AI 扫描",
    source: "查找原始来源",
    metadata: "检查元数据",

    labOutput: "选择一个工具来检查内容。",

    rankingTitle: "INOCULA 优秀特工",
    position: "排名",
    agent: "特工",
    trustedFollowers: "可信关注者",
    avoidedViral: "避免的病毒负荷",

    challenge: "挑战：标题与文章",
    readArticle: "📄 阅读完整文章",
    slider: "标题是否准确反映文章内容，还是夸大了？",
    confirm: "确认评估",
    shield: "🛡️ 使用护盾跳过",
    close: "关闭",

    alertCorrect: "太棒了！你发现标题夸大了文章内容。",
    alertWrong: "注意！这个标题夸大了信息。",
    alertCorrectTrue: "太棒了！你发现标题准确地反映了文章内容。",
    alertWrongTrue: "注意！这个标题准确地反映了信息。",

    shieldUsed: "你使用了护盾来消除威胁。",
    noShield: "你没有足够的护盾。",

    verifierAlert: "你选择了验证者道路：获得 +1 护盾。",
    fastAlert: "你选择了快速道路：获得 +30 关注者，但病毒负荷增加。"
  }

};


// ======================================================
// NAVEGACIÓN
// ======================================================

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

}


// ======================================================
// CAMBIO DE IDIOMA
// ======================================================

function changeLanguage(lang) {

  currentLanguage = lang;

  const t = translations[lang];

  if (!t) return;


  // HTML
  document.documentElement.lang = lang;


  // NAVBAR
  const navButtons = document.querySelectorAll(".nav-links .nav-btn");

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


  // HOME
  const pill = document.querySelector(".pill-tag");

  if (pill) {
    pill.innerHTML =
      `<i class="fa-solid fa-sparkles"></i> ${t.heroTag}`;
  }


  const heroTitle = document.querySelector(".hero h1");

  if (heroTitle) {
    heroTitle.innerHTML = t.heroTitle;
  }


  const heroText = document.querySelector(".hero-subtext");

  if (heroText) {
    heroText.textContent = t.heroText;
  }


  const heroButtons = document.querySelectorAll(".hero-buttons button");

  if (heroButtons.length >= 2) {

    heroButtons[0].innerHTML =
      `<i class="fa-solid fa-play"></i> ${t.enterBoard}`;

    heroButtons[1].innerHTML =
      `<i class="fa-solid fa-microscope"></i> ${t.tools}`;
  }


  const statCards = document.querySelectorAll(".stat-card p");

  if (statCards.length >= 3) {

    statCards[0].textContent = t.stages;
    statCards[1].textContent = t.languages;
    statCards[2].textContent = t.viralGoal;
  }


  // GAME BOARD
  const statusTitles = document.querySelectorAll(".status-card h3");

  if (statusTitles.length >= 3) {

    statusTitles[0].innerHTML =
      `<i class="fa-solid fa-biohazard"></i> ${t.publicViral}`;

    statusTitles[1].innerHTML =
      `<i class="fa-solid fa-user-check"></i> ${t.digitalProfile}`;

    statusTitles[2].innerHTML =
      `<i class="fa-solid fa-dharmachakra"></i> ${t.digitalWheel}`;
  }


  const statRows = document.querySelectorAll(".stat-row span");

  if (statRows.length >= 2) {

    statRows[0].innerHTML =
      `<i class="fa-solid fa-users"></i> ${t.followers}`;

    statRows[1].innerHTML =
      `<i class="fa-solid fa-shield-halved"></i> ${t.shields}`;
  }


  const wheelDisplay = document.getElementById("wheel-display");

  if (wheelDisplay) {
    wheelDisplay.innerHTML =
      `<span>${t.spinText}</span>`;
  }


  const spinButton = document.getElementById("spin-btn");

  if (spinButton) {
    spinButton.textContent = t.spin;
  }


  const boardTitle = document.querySelector(".board-wrapper h2");

  if (boardTitle) {
    boardTitle.textContent = t.boardTitle;
  }


  const stagesElements = document.querySelectorAll(".stage-label");

  if (stagesElements.length >= 4) {

    stagesElements[0].textContent = t.stage1;
    stagesElements[1].textContent = t.stage2;
    stagesElements[2].textContent = t.stage3;
    stagesElements[3].textContent = t.stage4;
  }


  const forkTitle = document.querySelector(".bifurcation-box h4");

  if (forkTitle) {

    forkTitle.innerHTML =
      `<i class="fa-solid fa-code-fork"></i> ${t.forkTitle}`;
  }


  const pathButtons = document.querySelectorAll(".btn-path");

  if (pathButtons.length >= 2) {

    pathButtons[0].innerHTML =
      `<strong>${t.verifier}</strong><br><small>${t.verifierSmall}</small>`;

    pathButtons[1].innerHTML =
      `<strong>${t.fast}</strong><br><small>${t.fastSmall}</small>`;
  }


  // LABORATORIO
  const labTitle = document.querySelector("#page-lab h2");

  if (labTitle) {

    labTitle.innerHTML =
      `<i class="fa-solid fa-flask"></i> ${t.labTitle}`;
  }


  const labDescription =
    document.querySelector("#page-lab .lab-container > p");

  if (labDescription) {
    labDescription.textContent = t.labDescription;
  }


  const labButtons =
    document.querySelectorAll(".lab-buttons button");

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
    labOutput.textContent = t.labOutput;
  }


  // RANKING
  const rankingTitle =
    document.querySelector("#page-leaderboard h2");

  if (rankingTitle) {

    rankingTitle.innerHTML =
      `<i class="fa-solid fa-trophy"></i> ${t.rankingTitle}`;
  }


  const headers =
    document.querySelectorAll("#page-leaderboard th");

  if (headers.length >= 4) {

    headers[0].textContent = t.position;
    headers[1].textContent = t.agent;
    headers[2].textContent = t.trustedFollowers;
    headers[3].textContent = t.avoidedViral;
  }


  // MODAL
  const challenge =
    document.querySelector("#minigame-clickbait h3");

  if (challenge) {

    challenge.innerHTML =
      `<i class="fa-solid fa-newspaper"></i> ${t.challenge}`;
  }


  const articleButton =
    document.querySelector("#minigame-clickbait .btn-secondary");

  if (articleButton) {
    articleButton.textContent = t.readArticle;
  }


  const sliderLabel =
    document.querySelector("#minigame-clickbait .slider-box label");

  if (sliderLabel) {
    sliderLabel.textContent = t.slider;
  }


  const confirmButton =
    document.querySelector("#minigame-clickbait .btn-primary");

  if (confirmButton) {
    confirmButton.textContent = t.confirm;
  }


  const modalButtons =
    document.querySelectorAll("#interactive-modal .modal-footer button");

  if (modalButtons.length >= 2) {

    modalButtons[0].textContent = t.shield;
    modalButtons[1].textContent = t.close;
  }


  // ACTUALIZAR NOTICIA SI HAY UNA ABIERTA
  if (currentNews) {
    showCurrentNews();
  }

}


// ======================================================
// MOSTRAR NOTICIA
// ======================================================

function showCurrentNews() {

  if (!currentNews) return;

  const translatedNews =
    currentNews[currentLanguage];

  if (!translatedNews) return;


  const headline =
    document.querySelector("#minigame-clickbait .headline");

  if (headline) {
    headline.textContent = translatedNews.headline;
  }


  const article =
    document.getElementById("article-body");

  if (article) {
    article.textContent = translatedNews.article;
  }

}


// ======================================================
// GIRAR RUEDA
// ======================================================

function spinWheel() {

  const moves =
    Math.floor(Math.random() * 4) + 1;

  const t = translations[currentLanguage];


  document.getElementById("wheel-display").innerHTML =
    `<strong>${t.advance} ${moves} ${currentLanguage === "zh" ? "格" : "casillas"}</strong>`;


  setTimeout(() => {

    openMinigame("clickbait");

  }, 800);

}


// ======================================================
// ABRIR NOTICIA
// ======================================================

function openMinigame(type) {

  const modal =
    document.getElementById("interactive-modal");

  modal.classList.remove("hidden");


  document.querySelectorAll(".minigame-view").forEach(m => {
    m.classList.add("hidden");
  });


  if (type === "clickbait") {

    currentNews =
      news[currentNewsIndex];

    currentNewsIndex++;

    if (currentNewsIndex >= news.length) {
      currentNewsIndex = 0;
    }


    showCurrentNews();


    document.getElementById("clickbait-slider").value = 50;

    document.getElementById("article-body")
      .classList.add("hidden");


    document.getElementById("minigame-clickbait")
      .classList.remove("hidden");
  }

}


// ======================================================
// MOSTRAR / OCULTAR ARTÍCULO
// ======================================================

function toggleArticleBody() {

  document
    .getElementById("article-body")
    .classList
    .toggle("hidden");

}


// ======================================================
// EVALUAR NOTICIA
// ======================================================

function checkClickbait() {

  if (!currentNews) return;


  const val =
    Number(document.getElementById("clickbait-slider").value);

  const t =
    translations[currentLanguage];


  if (currentNews.exaggerated) {

    if (val > 50) {

      alert(t.alertCorrect);

      followers += 25;

    } else {

      alert(t.alertWrong);

      viralLoad += 10;
    }

  } else {

    if (val <= 50) {

      alert(t.alertCorrectTrue);

      followers += 25;

    } else {

      alert(t.alertWrongTrue);

      viralLoad += 10;
    }

  }


  updateHUD();
  closeModal();

}


// ======================================================
// CAMINOS
// ======================================================

function choosePath(path) {

  const t =
    translations[currentLanguage];


  if (path === "verifier") {

    shields++;

    alert(t.verifierAlert);

  } else {

    followers += 30;

    viralLoad += 10;

    alert(t.fastAlert);
  }


  updateHUD();

}


// ======================================================
// LABORATORIO
// ======================================================

function runLabTool(tool) {

  const output =
    document.getElementById("lab-output");


  if (currentLanguage === "es") {

    if (tool === "ia")
      output.innerText =
        "🤖 Análisis de IA: Inconsistencias visuales detectadas (92% Probabilidad de IA).";

    if (tool === "source")
      output.innerText =
        "🔗 Búsqueda de Fuente: No existe ningún registro oficial de esta noticia.";

    if (tool === "meta")
      output.innerText =
        "📄 Metadatos: Archivo modificado por última vez en 2019.";

  }


  if (currentLanguage === "en") {

    if (tool === "ia")
      output.innerText =
        "🤖 AI Analysis: Visual inconsistencies detected (92% probability of AI generation).";

    if (tool === "source")
      output.innerText =
        "🔗 Source Search: No official record of this story was found.";

    if (tool === "meta")
      output.innerText =
        "📄 Metadata: File was last modified in 2019.";

  }


  if (currentLanguage === "zh") {

    if (tool === "ia")
      output.innerText =
        "🤖 AI 分析：检测到视觉不一致（92%的概率由人工智能生成）。";

    if (tool === "source")
      output.innerText =
        "🔗 来源搜索：没有找到这条新闻的官方记录。";

    if (tool === "meta")
      output.innerText =
        "📄 元数据：该文件最后一次修改是在2019年。";

  }

}


// ======================================================
// ACTUALIZAR HUD
// ======================================================

function updateHUD() {

  document.getElementById("followers-count")
    .innerText = followers;

  document.getElementById("shields-count")
    .innerText = shields;

  document.getElementById("viral-meter")
    .style.width = `${viralLoad}%`;


  let viralText = "";

  if (currentLanguage === "es") {

    viralText =
      `${viralLoad}% - Carga Viral Global`;

  }

  if (currentLanguage === "en") {

    viralText =
      `${viralLoad}% - Global Viral Load`;

  }

  if (currentLanguage === "zh") {

    viralText =
      `${viralLoad}% - 全球病毒负荷`;

  }


  document.getElementById("viral-text")
    .innerText = viralText;

}


// ======================================================
// USAR ESCUDO
// ======================================================

function useShield() {

  const t =
    translations[currentLanguage];


  if (shields > 0) {

    shields--;

    alert(t.shieldUsed);

    updateHUD();

    closeModal();

  } else {

    alert(t.noShield);

  }

}


// ======================================================
// CERRAR MODAL
// ======================================================

function closeModal() {

  document
    .getElementById("interactive-modal")
    .classList
    .add("hidden");

}


// ======================================================
// INICIALIZACIÓN
// ======================================================

document.addEventListener("DOMContentLoaded", () => {

  updateHUD();

});
