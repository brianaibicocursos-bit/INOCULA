// ======================================================
// INOCULA - APP.JS COMPLETO
// ======================================================


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

  const buttons = document.querySelectorAll(".nav-btn");

  const pageMap = {
    "page-home": 0,
    "page-game": 1,
    "page-lab": 2,
    "page-leaderboard": 3
  };

  if (pageMap[pageId] !== undefined && buttons[pageMap[pageId]]) {
    buttons[pageMap[pageId]].classList.add("active");
  }
}


// ======================================================
// ESTADO DEL JUEGO
// ======================================================

let viralLoad = 15;
let followers = 100;
let shields = 1;

let currentNews = null;
let currentNewsIndex = 0;


// ======================================================
// NOTICIAS
// ======================================================

const news = [

  {
    es: {
      headline: "🚨 ¡Tomar agua con limón elimina todas las toxinas del cuerpo!",
      article:
        "El agua con limón puede formar parte de una alimentación saludable, pero el cuerpo ya cuenta con órganos como el hígado y los riñones para eliminar sustancias de desecho."
    },

    en: {
      headline: "🚨 Drinking lemon water removes all toxins from your body!",
      article:
        "Lemon water can be part of a healthy diet, but the body already has organs such as the liver and kidneys that remove waste."
    },

    zh: {
      headline: "🚨 喝柠檬水可以清除体内所有毒素！",
      article:
        "柠檬水可以成为健康饮食的一部分，但人体已经有肝脏和肾脏等器官来清除废物。"
    },

    exaggerated: true
  },

  {
    es: {
      headline: "🧠 ¡El cerebro utiliza electricidad para comunicarse!",
      article:
        "Las neuronas utilizan señales eléctricas y químicas para transmitir información."
    },

    en: {
      headline: "🧠 The brain uses electricity to communicate!",
      article:
        "Neurons use electrical and chemical signals to transmit information."
    },

    zh: {
      headline: "🧠 大脑使用电信号进行交流！",
      article:
        "神经元通过电信号和化学信号来传递信息。"
    },

    exaggerated: false
  },

  {
    es: {
      headline: "🚨 ¡Instagram puede leer tus pensamientos!",
      article:
        "Las plataformas pueden recopilar información sobre actividad, intereses e interacciones, pero eso no significa que puedan leer directamente los pensamientos."
    },

    en: {
      headline: "🚨 Instagram can read your thoughts!",
      article:
        "Platforms can collect information about activity, interests and interactions, but this does not mean they can directly read your thoughts."
    },

    zh: {
      headline: "🚨 Instagram 可以读取你的思想！",
      article:
        "平台可以收集用户的活动、兴趣和互动信息，但这并不意味着它们能够直接读取你的思想。"
    },

    exaggerated: true
  },

  {
    es: {
      headline: "🦠 ¡Lavarse las manos ayuda a prevenir enfermedades!",
      article:
        "La higiene de manos ayuda a reducir la transmisión de microorganismos."
    },

    en: {
      headline: "🦠 Washing your hands can help prevent diseases!",
      article:
        "Hand hygiene helps reduce the transmission of microorganisms."
    },

    zh: {
      headline: "🦠 洗手有助于预防疾病！",
      article:
        "保持手部卫生有助于减少微生物的传播。"
    },

    exaggerated: false
  },

  {
    es: {
      headline: "🚨 ¡La inteligencia artificial nunca se equivoca!",
      article:
        "Los sistemas de inteligencia artificial pueden producir respuestas incorrectas o información inventada y necesitan verificación."
    },

    en: {
      headline: "🚨 Artificial intelligence never makes mistakes!",
      article:
        "Artificial intelligence systems can produce incorrect answers or fabricated information and need verification."
    },

    zh: {
      headline: "🚨 人工智能从来不会犯错！",
      article:
        "人工智能系统可能产生错误答案或虚构的信息，因此需要进行验证。"
    },

    exaggerated: true
  },

  {
    es: {
      headline: "🌳 ¡Los árboles ayudan a absorber dióxido de carbono!",
      article:
        "Las plantas absorben dióxido de carbono durante la fotosíntesis."
    },

    en: {
      headline: "🌳 Trees help absorb carbon dioxide!",
      article:
        "Plants absorb carbon dioxide during photosynthesis."
    },

    zh: {
      headline: "🌳 树木有助于吸收二氧化碳！",
      article:
        "植物在光合作用过程中会吸收二氧化碳。"
    },

    exaggerated: false
  },

  {
    es: {
      headline: "🚨 ¡Plantar un solo árbol resolverá el cambio climático!",
      article:
        "Los árboles ayudan al medio ambiente, pero resolver el cambio climático requiere múltiples acciones."
    },

    en: {
      headline: "🚨 Planting one tree will solve climate change!",
      article:
        "Trees help the environment, but solving climate change requires many different actions."
    },

    zh: {
      headline: "🚨 种一棵树就能解决气候变化问题！",
      article:
        "树木有助于保护环境，但解决气候变化需要多方面的行动。"
    },

    exaggerated: true
  },

  {
    es: {
      headline: "📱 ¡Tu ubicación puede ser compartida por algunas aplicaciones!",
      article:
        "Algunas aplicaciones pueden solicitar permisos de ubicación para ofrecer determinadas funciones."
    },

    en: {
      headline: "📱 Some apps can share your location!",
      article:
        "Some applications may request location permissions to provide certain features."
    },

    zh: {
      headline: "📱 一些应用程序可以共享你的位置信息！",
      article:
        "一些应用程序可能会请求位置权限，以提供特定功能。"
    },

    exaggerated: false
  },

  {
    es: {
      headline: "🚨 ¡Si una noticia tiene millones de likes, definitivamente es verdadera!",
      article:
        "La popularidad de una publicación no demuestra que la información sea cierta."
    },

    en: {
      headline: "🚨 If a post has millions of likes, it must be true!",
      article:
        "The popularity of a post does not prove that the information is true."
    },

    zh: {
      headline: "🚨 如果一条新闻有数百万个赞，它一定是真的！",
      article:
        "一条帖子的受欢迎程度并不能证明其中的信息是真实的。"
    },

    exaggerated: true
  },

  {
    es: {
      headline: "🔎 ¡Comparar varias fuentes puede ayudar a detectar información falsa!",
      article:
        "Contrastar diferentes fuentes confiables puede ayudar a identificar inconsistencias."
    },

    en: {
      headline: "🔎 Comparing several sources can help detect false information!",
      article:
        "Comparing different reliable sources can help identify inconsistencies."
    },

    zh: {
      headline: "🔎 比较多个来源可以帮助发现虚假信息！",
      article:
        "比较不同的可靠来源可以帮助发现信息中的不一致之处。"
    },

    exaggerated: false
  },

  {
    es: {
      headline: "🚨 ¡Los teléfonos escuchan absolutamente todo lo que dices!",
      article:
        "Los dispositivos pueden utilizar micrófonos cuando tienen permisos y determinadas funciones activas, pero eso no significa que estén grabando absolutamente todo constantemente."
    },

    en: {
      headline: "🚨 Phones listen to absolutely everything you say!",
      article:
        "Devices can use microphones when permissions and certain features are enabled, but that does not mean they are constantly recording everything."
    },

    zh: {
      headline: "🚨 手机会听到你说的所有话！",
      article:
        "当设备获得麦克风权限并启用某些功能时，可以使用麦克风，但这并不意味着它们一直在记录所有内容。"
    },

    exaggerated: true
  },

  {
    es: {
      headline: "💧 ¡El agua es necesaria para que el cuerpo funcione correctamente!",
      article:
        "El agua cumple funciones importantes en el organismo, como ayudar a regular la temperatura y transportar sustancias."
    },

    en: {
      headline: "💧 Water is necessary for the body to function properly!",
      article:
        "Water performs important functions in the body, including helping regulate temperature and transport substances."
    },

    zh: {
      headline: "💧 水是人体正常运作所必需的！",
      article:
        "水在人体中发挥重要作用，例如帮助调节体温和运输物质。"
    },

    exaggerated: false
  },

  {
    es: {
      headline: "🚨 ¡Dormir solo 2 horas te hace más productivo!",
      article:
        "Dormir muy poco puede afectar la atención, la memoria y el rendimiento."
    },

    en: {
      headline: "🚨 Sleeping only two hours makes you more productive!",
      article:
        "Getting too little sleep can negatively affect attention, memory and performance."
    },

    zh: {
      headline: "🚨 每天只睡两个小时会让你更有效率！",
      article:
        "睡眠不足可能会影响注意力、记忆力和工作表现。"
    },

    exaggerated: true
  },

  {
    es: {
      headline: "☀️ ¡La luz solar es una fuente natural de energía!",
      article:
        "La energía solar puede aprovecharse mediante tecnologías como los paneles solares."
    },

    en: {
      headline: "☀️ Sunlight is a natural source of energy!",
      article:
        "Solar energy can be harnessed using technologies such as solar panels."
    },

    zh: {
      headline: "☀️ 阳光是一种天然能源！",
      article:
        "太阳能可以通过太阳能电池板等技术加以利用。"
    },

    exaggerated: false
  },

  {
    es: {
      headline: "🚨 ¡Beber café hace que nunca necesites dormir!",
      article:
        "La cafeína puede aumentar temporalmente el estado de alerta, pero no reemplaza los beneficios del sueño."
    },

    en: {
      headline: "🚨 Drinking coffee means you never need sleep!",
      article:
        "Caffeine can temporarily increase alertness, but it does not replace the benefits of sleep."
    },

    zh: {
      headline: "🚨 喝咖啡意味着你永远不需要睡觉！",
      article:
        "咖啡因可以暂时提高警觉性，但不能代替睡眠带来的好处。"
    },

    exaggerated: true
  },

  {
    es: {
      headline: "📚 ¡Leer puede ayudar a desarrollar habilidades de comprensión!",
      article:
        "La lectura frecuente puede contribuir al desarrollo de la comprensión y del vocabulario."
    },

    en: {
      headline: "📚 Reading can help develop comprehension skills!",
      article:
        "Frequent reading can contribute to the development of comprehension and vocabulary."
    },

    zh: {
      headline: "📚 阅读有助于提高理解能力！",
      article:
        "经常阅读可以帮助提高理解能力和词汇量。"
    },

    exaggerated: false
  },

  {
    es: {
      headline: "🚨 ¡Una foto puede demostrar exactamente lo que ocurrió!",
      article:
        "Una imagen puede proporcionar información, pero el contexto, la fecha y la fuente también son importantes para verificar lo ocurrido."
    },

    en: {
      headline: "🚨 A photo can prove exactly what happened!",
      article:
        "An image can provide information, but context, date and source are also important when verifying what happened."
    },

    zh: {
      headline: "🚨 一张照片可以完全证明发生了什么！",
      article:
        "图片可以提供信息，但在验证事件时，背景、日期和来源同样非常重要。"
    },

    exaggerated: true
  },

  {
    es: {
      headline: "🔐 ¡Usar contraseñas diferentes puede mejorar la seguridad de tus cuentas!",
      article:
        "Utilizar contraseñas diferentes reduce el riesgo de que una contraseña comprometida permita acceder a varias cuentas."
    },

    en: {
      headline: "🔐 Using different passwords can improve account security!",
      article:
        "Using different passwords reduces the risk of one compromised password giving access to multiple accounts."
    },

    zh: {
      headline: "🔐 使用不同的密码可以提高账户安全性！",
      article:
        "使用不同的密码可以降低一个密码泄露后导致多个账户被访问的风险。"
    },

    exaggerated: false
  },

  {
    es: {
      headline: "🚨 ¡Compartir una noticia rápidamente evita que sea falsa!",
      article:
        "Compartir información rápidamente no garantiza que sea verdadera. Verificar antes de compartir ayuda a evitar la desinformación."
    },

    en: {
      headline: "🚨 Sharing a news story quickly prevents it from being false!",
      article:
        "Sharing information quickly does not guarantee that it is true. Checking information before sharing helps prevent misinformation."
    },

    zh: {
      headline: "🚨 快速分享新闻可以防止它变成假新闻！",
      article:
        "快速分享信息并不能保证其真实性。在分享之前进行验证有助于减少错误信息的传播。"
    },

    exaggerated: true
  }

];


// ======================================================
// MEZCLAR NOTICIAS
// ======================================================

function shuffleNews() {
  for (let i = news.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [news[i], news[j]] = [news[j], news[i]];
  }

  currentNewsIndex = 0;
}


// Mezclar al iniciar
shuffleNews();


// ======================================================
// OBTENER IDIOMA ACTUAL
// ======================================================

function getCurrentLanguage() {
  const selector = document.getElementById("lang-select");

  if (!selector) {
    return "es";
  }

  return selector.value || "es";
}


// ======================================================
// GIRAR RUEDA
// ======================================================

function spinWheel() {

  const moves = Math.floor(Math.random() * 4) + 1;

  const lang = getCurrentLanguage();

  const messages = {

    es: `Avanzas ${moves} casillas`,

    en: `You advance ${moves} spaces`,

    zh: `你前进 ${moves} 格`

  };

  document.getElementById("wheel-display").innerHTML =
    `<strong>${messages[lang]}</strong>`;

  setTimeout(() => {

    openMinigame("clickbait");

  }, 800);
}


// ======================================================
// ABRIR MINIJUEGO
// ======================================================

function openMinigame(type) {

  const modal = document.getElementById("interactive-modal");

  modal.classList.remove("hidden");

  document.querySelectorAll(".minigame-view").forEach(game => {
    game.classList.add("hidden");
  });


  if (type === "clickbait") {

    // Si ya llegamos al final,
    // mezclamos nuevamente todas las noticias.
    if (currentNewsIndex >= news.length) {
      shuffleNews();
    }


    // Elegir siguiente noticia
    currentNews = news[currentNewsIndex];

    currentNewsIndex++;


    // Obtener idioma actual
    const lang = getCurrentLanguage();

    const localizedNews =
      currentNews[lang] || currentNews.es;


    // Mostrar titular
    document.querySelector(
      "#minigame-clickbait .headline"
    ).textContent = localizedNews.headline;


    // Mostrar artículo
    document.getElementById(
      "article-body"
    ).textContent = localizedNews.article;


    // Reiniciar slider
    document.getElementById(
      "clickbait-slider"
    ).value = 50;


    // Ocultar artículo hasta pulsar "leer"
    document.getElementById(
      "article-body"
    ).classList.add("hidden");


    // Mostrar minijuego
    document.getElementById(
      "minigame-clickbait"
    ).classList.remove("hidden");

  }
}


// ======================================================
// LEER ARTÍCULO
// ======================================================

function toggleArticleBody() {

  document.getElementById(
    "article-body"
  ).classList.toggle("hidden");

}


// ======================================================
// EVALUAR NOTICIA
// ======================================================

function checkClickbait() {

  if (!currentNews) {
    return;
  }

  const value = Number(
    document.getElementById("clickbait-slider").value
  );

  const lang = getCurrentLanguage();


  // NOTICIA EXAGERADA
  if (currentNews.exaggerated) {

    if (value > 50) {

      const messages = {

        es: "¡Excelente! Detectaste que el titular exageraba la información.",

        en: "Excellent! You detected that the headline exaggerated the information.",

        zh: "太棒了！你发现了标题夸大了信息。"

      };

      alert(messages[lang]);

      followers += 25;

    } else {

      const messages = {

        es: "¡Cuidado! El titular exageraba la información.",

        en: "Careful! The headline exaggerated the information.",

        zh: "小心！这个标题夸大了信息。"

      };

      alert(messages[lang]);

      viralLoad += 10;

    }

  }


  // NOTICIA VERDADERA
  else {

    if (value <= 50) {

      const messages = {

        es: "¡Excelente! Detectaste que el titular representa correctamente la información.",

        en: "Excellent! You detected that the headline correctly represents the information.",

        zh: "太棒了！你发现标题正确地反映了信息。"

      };

      alert(messages[lang]);

      followers += 25;

    } else {

      const messages = {

        es: "¡Cuidado! El titular sí representaba correctamente la información.",

        en: "Careful! The headline actually represented the information correctly.",

        zh: "小心！这个标题实际上正确地反映了信息。"

      };

      alert(messages[lang]);

      viralLoad += 10;

    }

  }


  updateHUD();

  closeModal();

}


// ======================================================
// ELEGIR CAMINO
// ======================================================

function choosePath(path) {

  const lang = getCurrentLanguage();


  if (path === "verifier") {

    shields++;


    const messages = {

      es: "Tomaste el Camino Verificador: Ganas +1 Escudo.",

      en: "You chose the Verifier Path: You gain +1 Shield.",

      zh: "你选择了验证者道路：获得 +1 护盾。"

    };

    alert(messages[lang]);

  }


  else {

    followers += 30;

    viralLoad += 10;


    const messages = {

      es: "Tomaste el Camino Rápido: Ganas +30 Seguidores pero sube la Carga Viral.",

      en: "You chose the Fast Path: Gain +30 Followers, but Viral Load increases.",

      zh: "你选择了快速道路：获得 +30 名关注者，但病毒负荷会上升。"

    };

    alert(messages[lang]);

  }


  updateHUD();

}


// ======================================================
// LABORATORIO
// ======================================================

function runLabTool(tool) {

  const output = document.getElementById("lab-output");

  const lang = getCurrentLanguage();


  const results = {

    ia: {

      es: "🤖 Análisis de IA: Inconsistencias visuales detectadas. 92% de probabilidad de contenido generado por IA.",

      en: "🤖 AI Analysis: Visual inconsistencies detected. 92% probability of AI-generated content.",

      zh: "🤖 AI 分析：检测到视觉不一致。该内容有 92% 的概率由人工智能生成。"

    },

    source: {

      es: "🔗 Búsqueda de Fuente: No existe ningún registro oficial de esta noticia.",

      en: "🔗 Source Search: No official record of this news story was found.",

      zh: "🔗 来源搜索：没有找到这条新闻的官方记录。"

    },

    meta: {

      es: "📄 Metadatos: El archivo fue modificado por última vez en 2019.",

      en: "📄 Metadata: The file was last modified in 2019.",

      zh: "📄 元数据：该文件最后一次修改是在 2019 年。"

    }

  };


  output.innerText = results[tool][lang];

}


// ======================================================
// ACTUALIZAR HUD
// ======================================================

function updateHUD() {

  document.getElementById(
    "followers-count"
  ).innerText = followers;


  document.getElementById(
    "shields-count"
  ).innerText = shields;


  document.getElementById(
    "viral-meter"
  ).style.width = `${Math.min(viralLoad, 100)}%`;


  const lang = getCurrentLanguage();


  const viralText = {

    es: `${viralLoad}% - Carga Viral Global`,

    en: `${viralLoad}% - Global Viral Load`,

    zh: `${viralLoad}% - 全球病毒负荷`

  };


  document.getElementById(
    "viral-text"
  ).innerText = viralText[lang];

}


// ======================================================
// USAR ESCUDO
// ======================================================

function useShield() {

  const lang = getCurrentLanguage();


  if (shields > 0) {

    shields--;


    const messages = {

      es: "Usaste un Escudo para neutralizar la amenaza.",

      en: "You used a Shield to neutralize the threat.",

      zh: "你使用了护盾来抵消这次威胁。"

    };


    alert(messages[lang]);

    updateHUD();

    closeModal();

  }


  else {

    const messages = {

      es: "No tienes Escudos suficientes.",

      en: "You don't have enough Shields.",

      zh: "你的护盾不足。"

    };


    alert(messages[lang]);

  }

}


// ======================================================
// CERRAR MODAL
// ======================================================

function closeModal() {

  document.getElementById(
    "interactive-modal"
  ).classList.add("hidden");

}


// ======================================================
// TRADUCCIONES DE LA INTERFAZ
// ======================================================

function changeLanguage(lang) {

  const translations = {

    es: {

      nav: ["Inicio", "Tablero", "Laboratorio", "Ranking"],

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

      forkTitle:
        "¡Punto de Bifurcación! Elige tu camino:",

      verifier: "Camino Verificador",

      verifierSmall:
        "Más lento, gana Escudos de protección",

      fast: "Camino Rápido",

      fastSmall:
        "Avanzas rápido, asumes riesgo de Fake News",

      labTitle: "Laboratorio de Verificación",

      labDescription:
        "Simulador interactivo para analizar noticias antes de compartirlas:",

      scanAI: "Escanear IA",

      source: "Buscar Fuente Original",

      metadata: "Revisar Metadatos",

      labOutput:
        "Selecciona una herramienta para inspeccionar el contenido.",

      rankingTitle:
        "Agentes INOCULA Destacados",

      position: "Posición",

      agent: "Agente",

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

      confirm:
        "Confirmar Evaluación",

      shield:
        "🛡️ Usar Escudo para Saltar",

      close:
        "Cerrar"

    },


    en: {

      nav:
        ["Home", "Game Board", "Laboratory", "Leaderboard"],

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

      lowVirus:
        "15% - Virus under control",

      digitalProfile:
        "Digital Profile",

      followers:
        "Followers:",

      shields:
        "Shields:",

      digitalWheel:
        "Digital Wheel",

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
        "Interactive simulator to analyze news before sharing it:",

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
        "Close"

    },


    zh: {

      nav:
        ["首页", "游戏板", "实验室", "排行榜"],

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

      lowVirus:
        "15% - 病毒处于控制之下",

      digitalProfile:
        "数字档案",

      followers:
        "关注者：",

      shields:
        "护盾：",

      digitalWheel:
        "数字转盘",

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
        "关闭"

    }

  };


  const t = translations[lang] || translations.es;


  // ==================================================
  // NAVBAR
  // ==================================================

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


  // ==================================================
  // HOME
  // ==================================================

  document.querySelector(".pill-tag").innerHTML =
    `<i class="fa-solid fa-sparkles"></i> ${t.heroTag}`;

  document.querySelector(".hero h1").innerHTML =
    t.heroTitle;

  document.querySelector(".hero-subtext").textContent =
    t.heroText;


  const heroButtons =
    document.querySelectorAll(".hero-buttons button");

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


  // ==================================================
  // GAME BOARD
  // ==================================================

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


  document.getElementById(
    "viral-text"
  ).textContent = t.lowVirus;


  const statRows =
    document.querySelectorAll(".stat-row span");

  if (statRows.length >= 2) {

    statRows[0].innerHTML =
      `<i class="fa-solid fa-users" style="color: #3b82f6;"></i> ${t.followers}`;

    statRows[1].innerHTML =
      `<i class="fa-solid fa-shield-halved" style="color: #10b981;"></i> ${t.shields}`;

  }


  document.getElementById(
    "wheel-display"
  ).innerHTML =
    `<span>${t.spinText}</span>`;


  document.getElementById(
    "spin-btn"
  ).textContent = t.spin;


  document.querySelector(
    ".board-wrapper h2"
  ).textContent = t.boardTitle;


  const stages =
    document.querySelectorAll(".stage-label");

  if (stages.length >= 4) {

    stages[0].textContent = t.stage1;

    stages[1].textContent = t.stage2;

    stages[2].textContent = t.stage3;

    stages[3].textContent = t.stage4;

  }


  document.querySelector(
    ".bifurcation-box h4"
  ).innerHTML =
    `<i class="fa-solid fa-code-fork"></i> ${t.forkTitle}`;


  const pathButtons =
    document.querySelectorAll(".btn-path");

  if (pathButtons.length >= 2) {

    pathButtons[0].innerHTML =
      `<strong>${t.verifier}</strong><br><small>${t.verifierSmall}</small>`;

    pathButtons[1].innerHTML =
      `<strong>${t.fast}</strong><br><small>${t.fastSmall}</small>`;

  }


  // ==================================================
  // LABORATORIO
  // ==================================================

  document.querySelector(
    "#page-lab h2"
  ).innerHTML =
    `<i class="fa-solid fa-flask"></i> ${t.labTitle}`;


  document.querySelector(
    "#page-lab > .lab-container > p"
  ).textContent =
    t.labDescription;


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


  document.getElementById(
    "lab-output"
  ).textContent = t.labOutput;


  // ==================================================
  // RANKING
  // ==================================================

  document.querySelector(
    "#page-leaderboard h2"
  ).innerHTML =
    `<i class="fa-solid fa-trophy"></i> ${t.rankingTitle}`;


  const headers =
    document.querySelectorAll("#page-leaderboard th");

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


  // ==================================================
  // MODAL
  // ==================================================

  document.querySelector(
    "#minigame-clickbait h3"
  ).innerHTML =
    `<i class="fa-solid fa-newspaper"></i> ${t.challenge}`;


  document.querySelector(
    "#minigame-clickbait .slider-box label"
  ).textContent =
    t.slider;


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


  document.querySelector(
    "#minigame-clickbait .btn-secondary"
  ).textContent =
    t.readArticle;


  document.querySelector(
    "#minigame-clickbait .btn-primary"
  ).textContent =
    t.confirm;


  // ==================================================
  // CAMBIAR IDIOMA DEL DOCUMENTO
  // ==================================================

  document.documentElement.lang = lang;


  // ==================================================
  // ACTUALIZAR HUD
  // ==================================================

  updateHUD();

}
