/* ============================================================
   INOCULA · APP.JS
   Digital Life Board
   ============================================================ */


/* ============================================================
   1. GAME STATE
   ============================================================ */

let currentLanguage =
  localStorage.getItem("inoculaLanguage") || "es";

let currentCharacter =
  localStorage.getItem("inoculaCharacter") || "woman";

let viralLoad = 15;
let followers = 100;
let shields = 1;

let playerPosition = 0;

const TOTAL_TILES = 24;

let currentNews = null;

let usedNewsIndexes = [];

let isMoving = false;


/* ============================================================
   2. CHARACTER DATA
   ============================================================ */

const characters = {

  woman: "👩🏻‍💻",

  man: "👨🏻‍💻",

  neutral: "🧑🏻‍💻"

};


/* ============================================================
   3. STAGE DATA
   ============================================================ */

const stageData = {

  1: {
    icon: "🌅"
  },

  2: {
    icon: "🏫"
  },

  3: {
    icon: "📱"
  },

  4: {
    icon: "🌙"
  }

};


/* ============================================================
   4. NEWS DATABASE
   ============================================================ */

const newsDatabase = [

  /* =========================
     SPANISH
  ========================== */

  {
    lang: "es",
    headline:
      "🚨 ¡Tomar agua con limón elimina TODAS las toxinas del cuerpo!",
    article:
      "El agua con limón puede formar parte de una alimentación saludable, pero el hígado y los riñones ya realizan funciones importantes para eliminar sustancias de desecho.",
    exaggerated: true
  },

  {
    lang: "es",
    headline:
      "🧠 Las neuronas utilizan señales eléctricas y químicas.",
    article:
      "Las neuronas transmiten información mediante señales eléctricas y sustancias químicas llamadas neurotransmisores.",
    exaggerated: false
  },

  {
    lang: "es",
    headline:
      "🚨 ¡Instagram puede leer tus pensamientos!",
    article:
      "Las plataformas digitales pueden recopilar información sobre actividad, intereses e interacciones, pero esto no significa que puedan leer directamente los pensamientos.",
    exaggerated: true
  },

  {
    lang: "es",
    headline:
      "🧼 Lavarse las manos ayuda a reducir la transmisión de microorganismos.",
    article:
      "La higiene de manos puede ayudar a reducir la transmisión de diferentes microorganismos y enfermedades.",
    exaggerated: false
  },

  {
    lang: "es",
    headline:
      "🚨 ¡La inteligencia artificial NUNCA se equivoca!",
    article:
      "Los sistemas de inteligencia artificial pueden producir información incorrecta o inventada y sus resultados necesitan ser verificados.",
    exaggerated: true
  },

  {
    lang: "es",
    headline:
      "🌳 Los árboles absorben dióxido de carbono durante la fotosíntesis.",
    article:
      "Las plantas absorben dióxido de carbono durante la fotosíntesis y forman parte del ciclo natural del carbono.",
    exaggerated: false
  },

  {
    lang: "es",
    headline:
      "🚨 ¡Plantar UN SOLO árbol solucionará el cambio climático!",
    article:
      "Los árboles pueden contribuir a la captura de carbono, pero el cambio climático requiere múltiples acciones y estrategias.",
    exaggerated: true
  },

  {
    lang: "es",
    headline:
      "📍 Algunas aplicaciones pueden solicitar acceso a tu ubicación.",
    article:
      "Dependiendo de los permisos otorgados, algunas aplicaciones pueden utilizar información de ubicación para ofrecer determinadas funciones.",
    exaggerated: false
  },

  {
    lang: "es",
    headline:
      "🚨 ¡Si tiene millones de likes, definitivamente es verdad!",
    article:
      "La cantidad de interacciones de una publicación no demuestra por sí misma que la información sea verdadera.",
    exaggerated: true
  },

  {
    lang: "es",
    headline:
      "🔎 Comparar varias fuentes puede ayudar a detectar información falsa.",
    article:
      "Contrastar una afirmación con diferentes fuentes confiables puede ayudar a identificar errores o inconsistencias.",
    exaggerated: false
  },

  {
    lang: "es",
    headline:
      "🚨 ¡Una foto en internet siempre demuestra que algo ocurrió!",
    article:
      "Una fotografía puede ser antigua, estar fuera de contexto o haber sido modificada. Es importante verificar su origen.",
    exaggerated: true
  },

  {
    lang: "es",
    headline:
      "📰 Leer solamente el titular puede dar una visión incompleta.",
    article:
      "El contenido completo de una noticia puede proporcionar información adicional que cambia o matiza lo que sugiere el titular.",
    exaggerated: false
  },


  /* =========================
     ENGLISH
  ========================== */

  {
    lang: "en",
    headline:
      "🚨 Drinking lemon water removes ALL toxins from your body!",
    article:
      "Lemon water can be part of a healthy diet, but organs such as the liver and kidneys already perform important functions involved in removing waste products.",
    exaggerated: true
  },

  {
    lang: "en",
    headline:
      "🧠 Neurons communicate using electrical and chemical signals.",
    article:
      "Neurons transmit information through electrical signals and chemicals called neurotransmitters.",
    exaggerated: false
  },

  {
    lang: "en",
    headline:
      "🚨 Instagram can READ YOUR THOUGHTS!",
    article:
      "Digital platforms can collect information about activity, interests, and interactions, but this does not mean they can directly read people's thoughts.",
    exaggerated: true
  },

  {
    lang: "en",
    headline:
      "🧼 Washing your hands can help reduce the spread of microorganisms.",
    article:
      "Hand hygiene can help reduce the transmission of different microorganisms and diseases.",
    exaggerated: false
  },

  {
    lang: "en",
    headline:
      "🚨 Artificial intelligence is NEVER wrong!",
    article:
      "Artificial intelligence systems can produce incorrect or fabricated information, so their outputs should be verified.",
    exaggerated: true
  },

  {
    lang: "en",
    headline:
      "🌳 Trees absorb carbon dioxide during photosynthesis.",
    article:
      "Plants absorb carbon dioxide during photosynthesis and are part of the natural carbon cycle.",
    exaggerated: false
  },

  {
    lang: "en",
    headline:
      "🚨 Planting ONE tree will solve climate change!",
    article:
      "Trees can contribute to carbon storage, but addressing climate change requires multiple actions and strategies.",
    exaggerated: true
  },

  {
    lang: "en",
    headline:
      "📍 Some apps can request access to your location.",
    article:
      "Depending on the permissions granted, some applications can use location information to provide certain features.",
    exaggerated: false
  },

  {
    lang: "en",
    headline:
      "🚨 If a post has millions of likes, it MUST be true!",
    article:
      "The number of likes or shares on a post does not by itself prove that the information is accurate.",
    exaggerated: true
  },

  {
    lang: "en",
    headline:
      "🔎 Comparing multiple sources can help identify misinformation.",
    article:
      "Checking a claim against several reliable sources can help identify errors and inconsistencies.",
    exaggerated: false
  },

  {
    lang: "en",
    headline:
      "🚨 A photo online ALWAYS proves that something happened!",
    article:
      "A photograph can be old, taken out of context, or digitally modified. Its origin should be verified.",
    exaggerated: true
  },

  {
    lang: "en",
    headline:
      "📰 Reading only a headline can provide an incomplete picture.",
    article:
      "The full article may contain additional information that changes or adds context to what the headline suggests.",
    exaggerated: false
  },


  /* =========================
     CHINESE
  ========================== */

  {
    lang: "zh",
    headline:
      "🚨 喝柠檬水可以清除身体里的所有毒素！",
    article:
      "柠檬水可以成为健康饮食的一部分，但肝脏和肾脏本身就承担着处理和排出废物的重要功能。",
    exaggerated: true
  },

  {
    lang: "zh",
    headline:
      "🧠 神经元通过电信号和化学信号传递信息。",
    article:
      "神经元通过电信号以及被称为神经递质的化学物质传递信息。",
    exaggerated: false
  },

  {
    lang: "zh",
    headline:
      "🚨 Instagram 可以读取你的思想！",
    article:
      "数字平台可以收集用户的活动、兴趣和互动信息，但这并不意味着它们可以直接读取人的思想。",
    exaggerated: true
  },

  {
    lang: "zh",
    headline:
      "🧼 洗手可以帮助减少微生物传播。",
    article:
      "保持手部卫生可以帮助减少不同微生物和疾病的传播。",
    exaggerated: false
  },

  {
    lang: "zh",
    headline:
      "🚨 人工智能永远不会犯错！",
    article:
      "人工智能系统可能产生错误或虚构的信息，因此其结果仍然需要验证。",
    exaggerated: true
  },

  {
    lang: "zh",
    headline:
      "🌳 树木在光合作用过程中吸收二氧化碳。",
    article:
      "植物在光合作用过程中吸收二氧化碳，并参与自然界的碳循环。",
    exaggerated: false
  },

  {
    lang: "zh",
    headline:
      "🚨 只种一棵树就可以解决气候变化！",
    article:
      "树木可以帮助储存碳，但解决气候变化需要多方面的行动和策略。",
    exaggerated: true
  },

  {
    lang: "zh",
    headline:
      "📍 一些应用程序可以请求访问你的位置信息。",
    article:
      "根据用户授予的权限，一些应用程序可以使用位置信息来提供特定功能。",
    exaggerated: false
  },

  {
    lang: "zh",
    headline:
      "🚨 如果一条帖子有数百万个赞，它一定是真的！",
    article:
      "帖子获得的点赞或分享数量本身并不能证明其中的信息是真实的。",
    exaggerated: true
  },

  {
    lang: "zh",
    headline:
      "🔎 比较多个信息来源可以帮助识别虚假信息。",
    article:
      "将一个说法与多个可靠来源进行比较，可以帮助发现错误和不一致之处。",
    exaggerated: false
  },

  {
    lang: "zh",
    headline:
      "🚨 网上照片一定能证明事情真的发生过！",
    article:
      "照片可能来自很久以前，也可能脱离原本的背景，甚至经过修改。因此需要验证照片来源。",
    exaggerated: true
  },

  {
    lang: "zh",
    headline:
      "📰 只阅读新闻标题可能会得到不完整的信息。",
    article:
      "完整文章可能包含更多背景和细节，从而改变或补充标题所表达的内容。",
    exaggerated: false
  }

];


/* ============================================================
   5. TRANSLATIONS
   ============================================================ */

const translations = {

  es: {

    navHome: "Inicio",
    navBoard: "Tablero",
    navLab: "Laboratorio",
    navRanking: "Ranking",

    heroTag:
      "UNESCO Youth Hackathon 2026",

    heroTitleOne:
      "Antes de creer,",

    heroTitleTwo:
      "inocúlate.",

    heroText:
      "El tablero de vida digital que te entrena para detectar fake news, deepfakes y manipulación en tu día a día digital.",

    enterBoard:
      "Entrar al Tablero",

    tryTools:
      "Probar Herramientas",

    dayStages:
      "Etapas del Día",

    languages:
      "Idiomas (ES, EN, ZH)",

    viralTarget:
      "Carga Viral Meta",

    viralLoad:
      "Carga Viral Pública",

    digitalProfile:
      "Perfil Digital",

    followers:
      "Seguidores:",

    shields:
      "Escudos:",

    chooseCharacter:
      "Elige tu personaje",

    woman:
      "Mujer",

    man:
      "Hombre",

    neutral:
      "Neutral",

    digitalWheel:
      "Rueda Digital",

    spin:
      "GIRAR RUEDA",

    spinText:
      "Gira la Rueda",

    digitalJourney:
      "TU VIAJE DIGITAL",

    boardTitle:
      "Tablero: Tu Navegación Diaria",

    currentStage:
      "ETAPA ACTUAL",

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

    forkDescription:
      "Cada decisión cambia tu viaje digital.",

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
      "Simulador interactivo para analizar noticias antes de compartirlas.",

    trending:
      "🔥 EN TENDENCIA",

    postedBy:
      "Publicado hace 5 minutos",

    scanAI:
      "Escanear IA",

    findSource:
      "Buscar Fuente Original",

    metadata:
      "Revisar Metadatos",

    labOutput:
      "Selecciona una herramienta para inspeccionar el contenido.",

    rankingTitle:
      "Agentes INOCULA Destacados",

    position:
      "Posición",

    agent:
      "Agente",

    trustedFollowers:
      "Seguidores Confiables",

    avoidedViral:
      "Carga Viral Evitada",

    challenge:
      "Reto: Titular vs Nota",

    readArticle:
      "📄 Leer nota completa",

    slider:
      "¿El titular representa la nota o exagera?",

    notExaggerated:
      "Representa",

    exaggerated:
      "Exagera",

    confirm:
      "Confirmar Evaluación",

    shield:
      "🛡️ Usar Escudo para Saltar",

    close:
      "Cerrar",

    newStage:
      "NUEVA ETAPA",

    continue:
      "Continuar",

    advance:
      "Avanzas",

    spaces:
      "casillas",

    positionText:
      "Posición",

    stageText:
      "Etapa",

    start:
      "¡Comienza tu navegación digital!",

    challengeAlert:
      "¡Nuevo reto digital!",

    finish:
      "🏆 ¡Llegaste al final del día digital!",

    finishText:
      "Has completado tu recorrido por INOCULA.",

    verifierAlert:
      "Tomaste el Camino Verificador: ganas +1 Escudo.",

    fastAlert:
      "Tomaste el Camino Rápido: ganas +30 Seguidores pero aumenta la Carga Viral.",

    goodFake:
      "¡Excelente! Detectaste que el titular exageraba la información.",

    badFake:
      "¡Cuidado! El titular exageraba la información.",

    goodTrue:
      "¡Excelente! Detectaste que el titular representa correctamente la información.",

    badTrue:
      "¡Cuidado! El titular sí representaba correctamente la información.",

    shieldUsed:
      "Usaste un Escudo para neutralizar la amenaza.",

    noShield:
      "No tienes Escudos suficientes."

  },


  en: {

    navHome:
      "Home",

    navBoard:
      "Game Board",

    navLab:
      "Laboratory",

    navRanking:
      "Leaderboard",

    heroTag:
      "UNESCO Youth Hackathon 2026",

    heroTitleOne:
      "Before you believe,",

    heroTitleTwo:
      "inoculate yourself.",

    heroText:
      "The digital life board that trains you to detect fake news, deepfakes, and manipulation in your everyday digital life.",

    enterBoard:
      "Enter Game Board",

    tryTools:
      "Try Tools",

    dayStages:
      "Stages of the Day",

    languages:
      "Languages (ES, EN, ZH)",

    viralTarget:
      "Target Viral Load",

    viralLoad:
      "Public Viral Load",

    digitalProfile:
      "Digital Profile",

    followers:
      "Followers:",

    shields:
      "Shields:",

    chooseCharacter:
      "Choose your character",

    woman:
      "Woman",

    man:
      "Man",

    neutral:
      "Neutral",

    digitalWheel:
      "Digital Wheel",

    spin:
      "SPIN WHEEL",

    spinText:
      "Spin the Wheel",

    digitalJourney:
      "YOUR DIGITAL JOURNEY",

    boardTitle:
      "Game Board: Your Daily Navigation",

    currentStage:
      "CURRENT STAGE",

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

    forkDescription:
      "Every decision changes your digital journey.",

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
      "Interactive simulator to analyze news before sharing it.",

    trending:
      "🔥 TRENDING",

    postedBy:
      "Posted 5 minutes ago",

    scanAI:
      "Scan with AI",

    findSource:
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

    notExaggerated:
      "Represents",

    exaggerated:
      "Exaggerates",

    confirm:
      "Confirm Evaluation",

    shield:
      "🛡️ Use Shield to Skip",

    close:
      "Close",

    newStage:
      "NEW STAGE",

    continue:
      "Continue",

    advance:
      "You advanced",

    spaces:
      "spaces",

    positionText:
      "Position",

    stageText:
      "Stage",

    start:
      "Start your digital journey!",

    challengeAlert:
      "New digital challenge!",

    finish:
      "🏆 You reached the end of your digital day!",

    finishText:
      "You completed your INOCULA journey.",

    verifierAlert:
      "You chose the Verifier Path: +1 Shield.",

    fastAlert:
      "You chose the Fast Path: +30 Followers, but Viral Load increased.",

    goodFake:
      "Excellent! You detected that the headline exaggerated the information.",

    badFake:
      "Careful! The headline exaggerated the information.",

    goodTrue:
      "Excellent! You detected that the headline accurately represented the information.",

    badTrue:
      "Careful! The headline accurately represented the information.",

    shieldUsed:
      "You used a Shield to neutralize the threat.",

    noShield:
      "You do not have enough Shields."

  },


  zh: {

    navHome:
      "首页",

    navBoard:
      "游戏板",

    navLab:
      "实验室",

    navRanking:
      "排行榜",

    heroTag:
      "联合国教科文组织青年黑客马拉松 2026",

    heroTitleOne:
      "在相信之前，",

    heroTitleTwo:
      "先给自己接种。",

    heroText:
      "数字生活棋盘，训练你识别日常数字生活中的假新闻、深度伪造和信息操纵。",

    enterBoard:
      "进入游戏板",

    tryTools:
      "尝试工具",

    dayStages:
      "一天的阶段",

    languages:
      "语言（ES、EN、ZH）",

    viralTarget:
      "目标病毒负荷",

    viralLoad:
      "公共病毒负荷",

    digitalProfile:
      "数字档案",

    followers:
      "关注者：",

    shields:
      "护盾：",

    chooseCharacter:
      "选择你的角色",

    woman:
      "女性",

    man:
      "男性",

    neutral:
      "中性",

    digitalWheel:
      "数字转盘",

    spin:
      "旋转转盘",

    spinText:
      "旋转转盘",

    digitalJourney:
      "你的数字旅程",

    boardTitle:
      "游戏板：你的日常数字生活",

    currentStage:
      "当前阶段",

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

    forkDescription:
      "每一个决定都会改变你的数字旅程。",

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
      "在分享新闻之前进行分析的互动模拟器。",

    trending:
      "🔥 热门内容",

    postedBy:
      "发布于 5 分钟前",

    scanAI:
      "AI 扫描",

    findSource:
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

    notExaggerated:
      "准确",

    exaggerated:
      "夸大",

    confirm:
      "确认评估",

    shield:
      "🛡️ 使用护盾跳过",

    close:
      "关闭",

    newStage:
      "新阶段",

    continue:
      "继续",

    advance:
      "你前进了",

    spaces:
      "格",

    positionText:
      "位置",

    stageText:
      "阶段",

    start:
      "开始你的数字生活之旅！",

    challengeAlert:
      "新的数字挑战！",

    finish:
      "🏆 你到达了数字生活的一天终点！",

    finishText:
      "你完成了 INOCULA 的游戏旅程。",

    verifierAlert:
      "你选择了验证者道路：获得 +1 护盾。",

    fastAlert:
      "你选择了快速道路：获得 +30 关注者，但病毒负荷增加。",

    goodFake:
      "太棒了！你发现标题夸大了信息。",

    badFake:
      "注意！这个标题夸大了信息。",

    goodTrue:
      "太棒了！你发现标题准确地反映了信息。",

    badTrue:
      "注意！这个标题准确地反映了信息。",

    shieldUsed:
      "你使用了护盾来抵御威胁。",

    noShield:
      "你没有足够的护盾。"

  }

};


/* ============================================================
   6. NAVIGATION
   ============================================================ */

function navigateTo(pageId) {

  document
    .querySelectorAll(".page-view")
    .forEach(page => {

      page.classList.add("hidden");
      page.classList.remove("active");

    });


  const target =
    document.getElementById(pageId);

  if (!target) return;


  target.classList.remove("hidden");
  target.classList.add("active");


  document
    .querySelectorAll(".nav-btn")
    .forEach(button => {

      button.classList.remove("active");

    });


  const activeButton =
    document.querySelector(
      `.nav-btn[data-page="${pageId}"]`
    );

  if (activeButton) {
    activeButton.classList.add("active");
  }

}


/* ============================================================
   7. TRANSLATE ALL PAGE
   ============================================================ */

function changeLanguage(lang) {

  if (!translations[lang]) {
    lang = "es";
  }

  currentLanguage = lang;

  localStorage.setItem(
    "inoculaLanguage",
    lang
  );

  document.documentElement.lang = lang;

  const dictionary =
    translations[lang];


  /*
   * Every element with data-i18n
   */

  document
    .querySelectorAll("[data-i18n]")
    .forEach(element => {

      const key =
        element.dataset.i18n;

      if (
        dictionary[key] !== undefined
      ) {

        element.textContent =
          dictionary[key];

      }

    });


  /*
   * Language selector
   */

  const selector =
    document.getElementById("lang-select");

  if (selector) {
    selector.value = lang;
  }


  /*
   * Update dynamic game elements
   */

  updateHUD();

  updatePositionIndicator();

  updateCurrentStage();

  updateLabNews();

  updateWheelLanguage();


  /*
   * If a challenge is open,
   * refresh its content.
   */

  if (currentNews) {

    const translatedNews =
      getEquivalentNews(currentNews);

    if (translatedNews) {

      currentNews =
        translatedNews;

      renderCurrentNews();

    }

  }

}


/* ============================================================
   8. FIND EQUIVALENT NEWS
   ============================================================ */

function getEquivalentNews(news) {

  const sameLanguage =
    newsDatabase.filter(
      item =>
        item.lang === currentLanguage
    );

  const allSpanish =
    newsDatabase.filter(
      item =>
        item.lang === "es"
    );

  const topicIndex =
    allSpanish.findIndex(
      item =>
        item.headline ===
        getSpanishHeadline(news)
    );


  if (
    topicIndex >= 0 &&
    sameLanguage[topicIndex]
  ) {

    return sameLanguage[topicIndex];

  }


  return sameLanguage[0] || null;

}


/*
 * Find the Spanish version of a topic.
 */

function getSpanishHeadline(news) {

  const currentLanguageNews =
    newsDatabase.filter(
      item =>
        item.lang === news.lang
    );

  const index =
    currentLanguageNews.findIndex(
      item =>
        item.headline === news.headline
    );

  const spanishNews =
    newsDatabase.filter(
      item =>
        item.lang === "es"
    );

  return spanishNews[index]
    ? spanishNews[index].headline
    : news.headline;

}


/* ============================================================
   9. CREATE BOARD
   ============================================================ */

function createBoard() {

  const stages = [

    document.getElementById("stage-1"),
    document.getElementById("stage-2"),
    document.getElementById("stage-3"),
    document.getElementById("stage-4")

  ];


  let tileNumber = 0;


  stages.forEach(stage => {

    if (!stage) return;

    stage.innerHTML = "";


    for (let i = 0; i < 6; i++) {

      const tile =
        document.createElement("div");

      tile.className =
        "game-tile";

      tile.dataset.position =
        tileNumber;


      tile.textContent =
        tileNumber + 1;


      stage.appendChild(tile);


      tileNumber++;

    }

  });


  updatePlayerPosition();

}


/* ============================================================
   10. PLAYER POSITION
   ============================================================ */

function updatePlayerPosition() {

  document
    .querySelectorAll(".game-tile")
    .forEach(tile => {

      tile.classList.remove(
        "player-position"
      );

      tile.classList.remove(
        "visited"
      );

      const oldPlayer =
        tile.querySelector(
          ".player-token"
        );

      if (oldPlayer) {
        oldPlayer.remove();
      }

    });


  /*
   * Mark previous spaces
   */

  document
    .querySelectorAll(".game-tile")
    .forEach(tile => {

      const position =
        Number(tile.dataset.position);

      if (
        position <
        playerPosition
      ) {

        tile.classList.add(
          "visited"
        );

      }

    });


  /*
   * Find current tile
   */

  const currentTile =
    document.querySelector(
      `.game-tile[data-position="${playerPosition}"]`
    );


  if (!currentTile) return;


  currentTile.classList.add(
    "player-position"
  );


  const player =
    document.createElement("div");

  player.className =
    "player-token";

  player.textContent =
    characters[currentCharacter];


  currentTile.appendChild(player);


  updatePositionIndicator();

  updateCurrentStage();

}


/* ============================================================
   11. CHARACTER
   ============================================================ */

function chooseCharacter(character) {

  if (!characters[character]) {
    return;
  }

  currentCharacter =
    character;

  localStorage.setItem(
    "inoculaCharacter",
    character
  );


  document
    .querySelectorAll(".character-option")
    .forEach(button => {

      button.classList.remove(
        "active"
      );

    });


  const selected =
    document.querySelector(
      `.character-option[data-character="${character}"]`
    );


  if (selected) {
    selected.classList.add("active");
  }


  updatePlayerPosition();

}


/* ============================================================
   12. CURRENT STAGE
   ============================================================ */

function getCurrentStageNumber() {

  if (playerPosition < 6) {
    return 1;
  }

  if (playerPosition < 12) {
    return 2;
  }

  if (playerPosition < 18) {
    return 3;
  }

  return 4;

}


function getStageName(number) {

  const names = {

    1: "morning",
    2: "work",
    3: "afternoon",
    4: "night"

  };

  return names[number];

}


/* ============================================================
   13. UPDATE CURRENT STAGE
   ============================================================ */

function updateCurrentStage() {

  const stageNumber =
    getCurrentStageNumber();


  document
    .querySelectorAll(".day-stage")
    .forEach(stage => {

      stage.classList.remove(
        "current-stage"
      );

    });


  const currentStage =
    document.querySelector(
      `.day-stage[data-stage="${stageNumber}"]`
    );


  if (currentStage) {

    currentStage.classList.add(
      "current-stage"
    );

  }


  const dictionary =
    translations[currentLanguage];


  const stageKey =
    `stage${stageNumber}`;


  const currentStageName =
    document.getElementById(
      "current-stage-name"
    );


  if (currentStageName) {

    currentStageName.textContent =
      dictionary[stageKey];

  }


  const icon =
    document.getElementById(
      "stage-banner-icon"
    );


  if (icon) {

    icon.textContent =
      stageData[stageNumber].icon;

  }


  /*
   * Progress
   */

  const progressText =
    document.getElementById(
      "stage-progress-text"
    );

  const progressFill =
    document.getElementById(
      "stage-progress-fill"
    );


  if (progressText) {

    progressText.textContent =
      `${stageNumber} / 4`;

  }


  if (progressFill) {

    progressFill.style.width =
      `${stageNumber * 25}%`;

  }

}


/* ============================================================
   14. POSITION INDICATOR
   ============================================================ */

function updatePositionIndicator() {

  const dictionary =
    translations[currentLanguage];

  const wheel =
    document.getElementById(
      "wheel-display"
    );


  if (!wheel) return;


  wheel.textContent =
    `${dictionary.positionText}: ${playerPosition + 1}/${TOTAL_TILES}\n` +
    `${dictionary.stageText}: ${getCurrentStageNumber()}`;

}


/* ============================================================
   15. WHEEL LANGUAGE
   ============================================================ */

function updateWheelLanguage() {

  if (isMoving) return;

  const wheel =
    document.getElementById(
      "wheel-display"
    );

  if (!wheel) return;


  /*
   * Keep current position visible
   */

  updatePositionIndicator();

}


/* ============================================================
   16. SPIN WHEEL
   ============================================================ */

function spinWheel() {

  if (isMoving) {
    return;
  }


  /*
   * If already finished
   */

  if (
    playerPosition >=
    TOTAL_TILES - 1
  ) {

    return;

  }


  isMoving = true;


  const button =
    document.getElementById(
      "spin-btn"
    );


  if (button) {
    button.disabled = true;
  }


  const moves =
    Math.floor(
      Math.random() * 4
    ) + 1;


  const dictionary =
    translations[currentLanguage];


  const wheel =
    document.getElementById(
      "wheel-display"
    );


  if (wheel) {

    wheel.textContent =
      `${dictionary.advance} ${moves} ${dictionary.spaces}`;

  }


  /*
   * Move visually one tile at a time.
   */

  movePlayerStepByStep(
    moves
  );

}


/* ============================================================
   17. MOVE STEP BY STEP
   ============================================================ */

function movePlayerStepByStep(
  remainingMoves
) {

  if (
    remainingMoves <= 0 ||
    playerPosition >= TOTAL_TILES - 1
  ) {

    finishMovement();

    return;

  }


  setTimeout(() => {

    const previousStage =
      getCurrentStageNumber();


    playerPosition++;


    updatePlayerPosition();


    const newStage =
      getCurrentStageNumber();


    /*
     * Stage changed.
     */

    if (
      newStage !==
      previousStage
    ) {

      showStageTransition(
        newStage
      );

      /*
       * Stop movement until user
       * presses Continue.
       */

      window.pendingMoves =
        remainingMoves - 1;

      window.pendingMovement =
        true;

      return;

    }


    movePlayerStepByStep(
      remainingMoves - 1
    );

  }, 450);

}


/* ============================================================
   18. CONTINUE AFTER STAGE
   ============================================================ */

function closeStageTransition() {

  const modal =
    document.getElementById(
      "stage-transition"
    );


  if (modal) {
    modal.classList.add("hidden");
  }


  if (
    window.pendingMovement
  ) {

    window.pendingMovement =
      false;


    const remaining =
      window.pendingMoves || 0;


    window.pendingMoves =
      0;


    if (remaining > 0) {

      movePlayerStepByStep(
        remaining
      );

    } else {

      finishMovement();

    }

  }

}


/* ============================================================
   19. SHOW STAGE TRANSITION
   ============================================================ */

function showStageTransition(
  stageNumber
) {

  const dictionary =
    translations[currentLanguage];


  const modal =
    document.getElementById(
      "stage-transition"
    );


  const icon =
    document.getElementById(
      "transition-icon"
    );


  const title =
    document.getElementById(
      "transition-title"
    );


  const description =
    document.getElementById(
      "transition-description"
    );


  if (!modal) return;


  icon.textContent =
    stageData[stageNumber].icon;


  title.textContent =
    dictionary[
      `stage${stageNumber}`
    ];


  const descriptions = {

    es: {
      1: "Comienza tu día digital.",
      2: "Ahora entras en tu etapa de trabajo, escuela y conversaciones.",
      3: "Las noticias y redes comienzan a influir en tu recorrido.",
      4: "Llegaste a la noche. Es momento de cerrar tu día digital."
    },

    en: {
      1: "Start your digital day.",
      2: "Now you enter your work, school and conversation stage.",
      3: "News and social media begin to shape your journey.",
      4: "You reached the night. It is time to close your digital day."
    },

    zh: {
      1: "开始你的数字生活。",
      2: "现在进入工作、学校和聊天阶段。",
      3: "新闻和社交媒体开始影响你的数字旅程。",
      4: "你已经到达夜晚，是时候结束今天的数字生活了。"
    }

  };


  description.textContent =
    descriptions[
      currentLanguage
    ][stageNumber];


  modal.classList.remove(
    "hidden"
  );

}


/* ============================================================
   20. FINISH MOVEMENT
   ============================================================ */

function finishMovement() {

  isMoving = false;


  const button =
    document.getElementById(
      "spin-btn"
    );


  if (button) {
    button.disabled = false;
  }


  const dictionary =
    translations[currentLanguage];


  /*
   * Final tile
   */

  if (
    playerPosition >=
    TOTAL_TILES - 1
  ) {

    setTimeout(() => {

      alert(
        `${dictionary.finish}\n\n${dictionary.finishText}`
      );

    }, 300);

    return;

  }


  /*
   * Open challenge
   */

  setTimeout(() => {

    openMinigame(
      "clickbait"
    );

  }, 350);

}


/* ============================================================
   21. NEWS
   ============================================================ */

function getNewsForCurrentLanguage() {

  return newsDatabase.filter(
    news =>
      news.lang ===
      currentLanguage
  );

}


function getRandomNews() {

  const available =
    getNewsForCurrentLanguage();


  if (
    available.length === 0
  ) {

    return null;

  }


  if (
    usedNewsIndexes.length >=
    available.length
  ) {

    usedNewsIndexes = [];

  }


  let randomIndex;


  do {

    randomIndex =
      Math.floor(
        Math.random() *
        available.length
      );

  } while (
    usedNewsIndexes.includes(
      randomIndex
    ) &&
    available.length > 1
  );


  usedNewsIndexes.push(
    randomIndex
  );


  return available[
    randomIndex
  ];

}


/* ============================================================
   22. OPEN MINIGAME
   ============================================================ */

function openMinigame(type) {

  const modal =
    document.getElementById(
      "interactive-modal"
    );


  if (!modal) return;


  if (
    type === "clickbait"
  ) {

    currentNews =
      getRandomNews();


    renderCurrentNews();

  }


  modal.classList.remove(
    "hidden"
  );

}


/* ============================================================
   23. RENDER NEWS
   ============================================================ */

function renderCurrentNews() {

  if (!currentNews) {
    return;
  }


  const headline =
    document.getElementById(
      "challenge-headline"
    );


  const article =
    document.getElementById(
      "article-body"
    );


  if (headline) {

    headline.textContent =
      currentNews.headline;

  }


  if (article) {

    article.textContent =
      currentNews.article;

    article.classList.add(
      "hidden"
    );

  }


  const slider =
    document.getElementById(
      "clickbait-slider"
    );


  if (slider) {

    slider.value = 50;

  }

}


/* ============================================================
   24. TOGGLE ARTICLE
   ============================================================ */

function toggleArticleBody() {

  const article =
    document.getElementById(
      "article-body"
    );


  if (!article) return;


  article.classList.toggle(
    "hidden"
  );

}


/* ============================================================
   25. CHECK NEWS
   ============================================================ */

function checkClickbait() {

  if (!currentNews) {
    return;
  }


  const slider =
    document.getElementById(
      "clickbait-slider"
    );


  if (!slider) {
    return;
  }


  const value =
    Number(slider.value);


  const dictionary =
    translations[currentLanguage];


  if (
    currentNews.exaggerated
  ) {

    if (
      value > 50
    ) {

      alert(
        dictionary.goodFake
      );

      followers += 25;

    } else {

      alert(
        dictionary.badFake
      );

      viralLoad += 10;

    }

  } else {

    if (
      value <= 50
    ) {

      alert(
        dictionary.goodTrue
      );

      followers += 25;

    } else {

      alert(
        dictionary.badTrue
      );

      viralLoad += 10;

    }

  }


  viralLoad =
    Math.min(
      viralLoad,
      100
    );


  updateHUD();

  closeModal();

}


/* ============================================================
   26. CHOOSE PATH
   ============================================================ */

function choosePath(path) {

  const dictionary =
    translations[currentLanguage];


  if (
    path === "verifier"
  ) {

    shields++;

    alert(
      dictionary.verifierAlert
    );

  } else {

    followers += 30;

    viralLoad += 10;

    viralLoad =
      Math.min(
        viralLoad,
        100
      );


    alert(
      dictionary.fastAlert
    );

  }


  updateHUD();

}


/* ============================================================
   27. SHIELD
   ============================================================ */

function useShield() {

  const dictionary =
    translations[currentLanguage];


  if (
    shields > 0
  ) {

    shields--;

    alert(
      dictionary.shieldUsed
    );

    updateHUD();

    closeModal();

  } else {

    alert(
      dictionary.noShield
    );

  }

}


/* ============================================================
   28. CLOSE MODAL
   ============================================================ */

function closeModal() {

  const modal =
    document.getElementById(
      "interactive-modal"
    );


  if (modal) {

    modal.classList.add(
      "hidden"
    );

  }

  currentNews = null;

}


/* ============================================================
   29. UPDATE HUD
   ============================================================ */

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


  if (
    followersElement
  ) {

    followersElement.textContent =
      followers;

  }


  if (
    shieldsElement
  ) {

    shieldsElement.textContent =
      shields;

  }


  if (
    viralMeter
  ) {

    viralMeter.style.width =
      `${viralLoad}%`;

  }


  if (
    viralText
  ) {

    const viralTranslations = {

      es:
        `${viralLoad}% - Virus bajo control`,

      en:
        `${viralLoad}% - Virus under control`,

      zh:
        `${viralLoad}% - 病毒处于控制之下`

    };


    viralText.textContent =
      viralTranslations[
        currentLanguage
      ];

  }

}


/* ============================================================
   30. LABORATORY
   ============================================================ */

function runLabTool(tool) {

  const output =
    document.getElementById(
      "lab-output"
    );


  if (!output) {
    return;
  }


  const responses = {

    es: {

      ia:
        "🤖 Análisis de IA:\n\nSe detectaron inconsistencias visuales. Probabilidad simulada de contenido generado por IA: 92%.\n\nRecuerda: una herramienta de IA no debe considerarse una prueba definitiva.",

      source:
        "🔗 Fuente original:\n\nNo se encontró un registro oficial de esta afirmación. Busca quién publicó originalmente la información y compárala con otras fuentes.",

      meta:
        "📄 Metadatos:\n\nEl contenido presenta información que requiere investigación adicional. Revisa fecha, origen, autor y contexto."

    },


    en: {

      ia:
        "🤖 AI Analysis:\n\nVisual inconsistencies were detected. Simulated probability of AI-generated content: 92%.\n\nRemember: an AI detector should not be treated as definitive proof.",

      source:
        "🔗 Original Source:\n\nNo official record of this claim was found. Check who originally published the information and compare it with other sources.",

      meta:
        "📄 Metadata:\n\nThe content contains information that requires further investigation. Check the date, origin, author, and context."

    },


    zh: {

      ia:
        "🤖 AI 分析：\n\n检测到视觉不一致。模拟的 AI 生成内容概率为 92%。\n\n请记住：AI 检测工具不应该被视为最终证据。",

      source:
        "🔗 原始来源：\n\n没有找到该说法的官方记录。请查找最初发布信息的人，并与其他可靠来源进行比较。",

      meta:
        "📄 元数据：\n\n该内容包含需要进一步调查的信息。请检查日期、来源、作者和背景。"

    }

  };


  output.textContent =
    responses[
      currentLanguage
    ][tool];

}


/* ============================================================
   31. LAB NEWS
   ============================================================ */

function updateLabNews() {

  const headline =
    document.getElementById(
      "lab-news-headline"
    );


  if (!headline) {
    return;
  }


  const news =
    newsDatabase.find(
      item =>
        item.lang ===
        currentLanguage
    );


  if (news) {

    headline.textContent =
      news.headline;

  }

}


/* ============================================================
   32. INITIALIZE
   ============================================================ */

function initializeGame() {

  createBoard();

  chooseCharacter(
    currentCharacter
  );

  updateHUD();

  updateCurrentStage();

  changeLanguage(
    currentLanguage
  );

}


/* ============================================================
   33. DOM READY
   ============================================================ */

document.addEventListener(
  "DOMContentLoaded",
  () => {

    initializeGame();

  }
);
