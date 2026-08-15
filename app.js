// ======================================================
// INOCULA - APP.JS
// ======================================================


// ===============================
// NAVEGACIÓN
// ===============================

function navigateTo(pageId) {
  document.querySelectorAll('.page-view').forEach(page => {
    page.classList.add('hidden');
  });

  document.querySelectorAll('.nav-btn').forEach(button => {
    button.classList.remove('active');
  });

  const page = document.getElementById(pageId);

  if (page) {
    page.classList.remove('hidden');
  }
}


// ===============================
// ESTADO DEL JUEGO
// ===============================

let viralLoad = 15;
let followers = 100;
let shields = 1;

let currentNews = null;
let currentNewsIndex = 0;


// ===============================
// NOTICIAS
// ===============================

const newsDatabase = [

  {
    es: {
      headline: "🚨 ¡Tomar agua con limón elimina todas las toxinas del cuerpo!",
      article: "El agua con limón puede formar parte de una alimentación saludable, pero el hígado y los riñones son los órganos encargados de eliminar sustancias de desecho."
    },
    en: {
      headline: "🚨 Drinking lemon water removes all toxins from your body!",
      article: "Lemon water can be part of a healthy diet, but the liver and kidneys are responsible for removing waste products from the body."
    },
    zh: {
      headline: "🚨 喝柠檬水可以清除体内所有毒素！",
      article: "柠檬水可以成为健康饮食的一部分，但肝脏和肾脏才是负责清除体内废物的主要器官。"
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
      headline: "🧠 大脑使用电信号进行交流！",
      article: "神经元通过电信号和化学信号传递信息。"
    },
    exaggerated: false
  },

  {
    es: {
      headline: "🚨 ¡Instagram puede leer tus pensamientos!",
      article: "Las plataformas digitales pueden recopilar información sobre actividad, intereses e interacciones, pero eso no significa que puedan leer directamente los pensamientos."
    },
    en: {
      headline: "🚨 Instagram can read your thoughts!",
      article: "Digital platforms can collect information about activity, interests and interactions, but that does not mean they can directly read people's thoughts."
    },
    zh: {
      headline: "🚨 Instagram 可以读取你的思想！",
      article: "数字平台可以收集用户的活动、兴趣和互动信息，但这并不意味着它们可以直接读取人的思想。"
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
      article: "保持手部卫生可以帮助减少微生物的传播。"
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
      article: "Artificial intelligence systems can produce incorrect answers or fabricated information and should be verified."
    },
    zh: {
      headline: "🚨 人工智能从来不会犯错！",
      article: "人工智能系统可能产生错误答案或虚构信息，因此仍然需要进行验证。"
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
      article: "Los árboles pueden ayudar al medio ambiente, pero resolver el cambio climático requiere múltiples acciones."
    },
    en: {
      headline: "🚨 Planting one tree will solve climate change!",
      article: "Trees can benefit the environment, but addressing climate change requires many different actions."
    },
    zh: {
      headline: "🚨 种一棵树就可以解决气候变化问题！",
      article: "树木可以帮助改善环境，但解决气候变化需要采取多种不同的行动。"
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
      article: "Some applications may request location permissions to provide certain features."
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
      headline: "🚨 If a post has millions of likes, it must be true!",
      article: "The popularity of a post does not prove that the information is accurate."
    },
    zh: {
      headline: "🚨 如果一条新闻有数百万个点赞，它一定是真的！",
      article: "一条信息的受欢迎程度并不能证明其内容是真实的。"
    },
    exaggerated: true
  },

  {
    es: {
      headline: "🔎 ¡Comparar varias fuentes puede ayudar a detectar información falsa!",
      article: "Contrastar diferentes fuentes confiables puede ayudar a identificar inconsistencias."
    },
    en: {
      headline: "🔎 Comparing multiple sources can help detect misinformation!",
      article: "Checking different reliable sources can help identify inconsistencies."
    },
    zh: {
      headline: "🔎 比较多个来源可以帮助发现虚假信息！",
      article: "对比不同的可靠信息来源可以帮助发现信息中的不一致之处。"
    },
    exaggerated: false
  },

  {
    es: {
      headline: "🚨 ¡Dormir solo 2 horas te hace más productivo!",
      article: "Dormir muy poco puede afectar la atención, la memoria y el rendimiento."
    },
    en: {
      headline: "🚨 Sleeping only two hours makes you more productive!",
      article: "Getting too little sleep can negatively affect attention, memory and performance."
    },
    zh: {
      headline: "🚨 每天只睡两个小时会让你更有效率！",
      article: "睡眠不足可能会影响注意力、记忆力和工作表现。"
    },
    exaggerated: true
  },

  {
    es: {
      headline: "💧 Beber agua es importante para mantener una hidratación adecuada.",
      article: "El agua es necesaria para diferentes funciones del organismo y ayuda a mantener una hidratación adecuada."
    },
    en: {
      headline: "💧 Drinking water is important for proper hydration.",
      article: "Water is necessary for many functions of the body and helps maintain proper hydration."
    },
    zh: {
      headline: "💧 喝水对于保持适当的水分非常重要。",
      article: "水对于身体的许多功能都很重要，并有助于维持适当的水分。"
    },
    exaggerated: false
  },

  {
    es: {
      headline: "🚨 ¡Los teléfonos escuchan absolutamente todas tus conversaciones!",
      article: "Los dispositivos pueden utilizar micrófonos cuando se les conceden determinados permisos, pero la afirmación de que escuchan absolutamente todas las conversaciones es una exageración."
    },
    en: {
      headline: "🚨 Phones listen to absolutely every conversation you have!",
      article: "Devices can use microphones when certain permissions are granted, but claiming that they listen to absolutely every conversation is an exaggeration."
    },
    zh: {
      headline: "🚨 手机会监听你所有的对话！",
      article: "设备在获得相关权限后可以使用麦克风，但声称手机会监听所有对话是一种夸张的说法。"
    },
    exaggerated: true
  },

  {
    es: {
      headline: "🔐 Las contraseñas largas pueden mejorar la seguridad de una cuenta.",
      article: "Las contraseñas largas y únicas pueden dificultar que otras personas las adivinen."
    },
    en: {
      headline: "🔐 Long passwords can improve account security.",
      article: "Long and unique passwords can make it harder for others to guess them."
    },
    zh: {
      headline: "🔐 较长的密码可以提高账户安全性。",
      article: "较长且独特的密码可以让其他人更难猜到你的密码。"
    },
    exaggerated: false
  },

  {
    es: {
      headline: "🚨 ¡Compartir una noticia la convierte automáticamente en verdadera!",
      article: "Compartir una publicación no cambia la veracidad de la información que contiene."
    },
    en: {
      headline: "🚨 Sharing a news story automatically makes it true!",
      article: "Sharing a post does not change whether the information it contains is accurate."
    },
    zh: {
      headline: "🚨 分享一条新闻会自动让它变成真的！",
      article: "分享一条信息并不会改变其中内容的真实性。"
    },
    exaggerated: true
  },

  {
    es: {
      headline: "🔍 Revisar quién publicó una noticia puede ayudar a evaluar su confiabilidad.",
      article: "Conocer el autor o la organización que publicó una información puede ser útil al evaluar su credibilidad."
    },
    en: {
      headline: "🔍 Checking who published a story can help evaluate its reliability.",
      article: "Knowing the author or organization behind information can help when evaluating its credibility."
    },
    zh: {
      headline: "🔍 查看新闻发布者可以帮助判断信息是否可靠。",
      article: "了解信息的作者或发布机构可以帮助我们评估其可信度。"
    },
    exaggerated: false
  },

  {
    es: {
      headline: "🚨 ¡Una imagen sin contexto demuestra exactamente lo que ocurrió!",
      article: "Una imagen puede ser real y aun así utilizarse fuera de contexto para transmitir una idea falsa."
    },
    en: {
      headline: "🚨 An image without context proves exactly what happened!",
      article: "An image can be real and still be used out of context to communicate something misleading."
    },
    zh: {
      headline: "🚨 一张没有背景信息的图片可以完全证明发生了什么！",
      article: "一张图片可能是真实的，但如果脱离背景使用，也可能传达误导性的信息。"
    },
    exaggerated: true
  },

  {
    es: {
      headline: "🌐 Una dirección web puede ayudar a identificar el sitio que publicó una información.",
      article: "Revisar el dominio y la dirección de una página puede proporcionar pistas sobre quién publica la información."
    },
    en: {
      headline: "🌐 A web address can help identify the site that published information.",
      article: "Checking a website's domain and address can provide clues about who published the information."
    },
    zh: {
      headline: "🌐 网站地址可以帮助识别信息的发布网站。",
      article: "检查网站的域名和地址可以帮助了解信息来自哪里。"
    },
    exaggerated: false
  },

  {
    es: {
      headline: "🚨 ¡Los videos virales siempre muestran acontecimientos recientes!",
      article: "Un video puede ser antiguo y volver a hacerse viral años después de haber sido grabado."
    },
    en: {
      headline: "🚨 Viral videos always show recent events!",
      article: "A video can be old and become viral again years after it was recorded."
    },
    zh: {
      headline: "🚨 热门视频总是展示最近发生的事件！",
      article: "一段视频可能很早以前就被拍摄，但多年后仍然可能再次走红。"
    },
    exaggerated: true
  },

  {
    es: {
      headline: "📰 Leer más allá del titular puede ayudar a comprender mejor una noticia.",
      article: "Los titulares pueden resumir una historia, por lo que leer el contenido completo proporciona más contexto."
    },
    en: {
      headline: "📰 Reading beyond the headline can help you understand a story better.",
      article: "Headlines summarize stories, so reading the full article can provide additional context."
    },
    zh: {
      headline: "📰 阅读标题之外的内容可以帮助你更好地理解新闻。",
      article: "标题通常只是对新闻的总结，因此阅读完整文章可以提供更多背景信息。"
    },
    exaggerated: false
  }

];


// ===============================
// IDIOMA ACTUAL
// ===============================

let currentLanguage = "es";


// ===============================
// MOSTRAR NOTICIA
// ===============================

function displayNews(news) {

  if (!news) return;

  const translatedNews = news[currentLanguage];

  document.querySelector(
    "#minigame-clickbait .headline"
  ).textContent = translatedNews.headline;

  document.getElementById(
    "article-body"
  ).textContent = translatedNews.article;

  document.getElementById(
    "clickbait-slider"
  ).value = 50;

  document.getElementById(
    "article-body"
  ).classList.add("hidden");
}


// ===============================
// GIRAR RUEDA
// ===============================

function spinWheel() {

  const moves = Math.floor(Math.random() * 4) + 1;

  document.getElementById("wheel-display").innerHTML =
    `<strong>Avanzas ${moves} casillas</strong>`;

  setTimeout(() => {
    openMinigame("clickbait");
  }, 800);
}


// ===============================
// ABRIR RETO
// ===============================

function openMinigame(type) {

  const modal = document.getElementById("interactive-modal");

  modal.classList.remove("hidden");

  document.querySelectorAll(".minigame-view").forEach(game => {
    game.classList.add("hidden");
  });

  if (type === "clickbait") {

    // Elegir noticia
    currentNews = newsDatabase[currentNewsIndex];

    // Avanzar al siguiente índice
    currentNewsIndex++;

    // Cuando llegue al final, volver al inicio
    if (currentNewsIndex >= newsDatabase.length) {
      currentNewsIndex = 0;
    }

    displayNews(currentNews);

    document
      .getElementById("minigame-clickbait")
      .classList.remove("hidden");
  }
}


// ===============================
// LEER NOTA
// ===============================

function toggleArticleBody() {

  document
    .getElementById("article-body")
    .classList.toggle("hidden");
}


// ===============================
// COMPROBAR RESPUESTA
// ===============================

function checkClickbait() {

  if (!currentNews) return;

  const value = Number(
    document.getElementById("clickbait-slider").value
  );

  let correct = false;

  if (currentNews.exaggerated) {

    // Más de 50 = detectó exageración
    correct = value > 50;

  } else {

    // 50 o menos = dijo que representa correctamente
    correct = value <= 50;
  }

  if (correct) {

    followers += 25;

    if (currentLanguage === "en") {

      alert(
        "Excellent! You correctly evaluated the information."
      );

    } else if (currentLanguage === "zh") {

      alert(
        "太棒了！你正确判断了这条信息。"
      );

    } else {

      alert(
        "¡Excelente! Evaluaste correctamente la información."
      );
    }

  } else {

    viralLoad += 10;

    if (currentLanguage === "en") {

      alert(
        "Be careful! The information was not evaluated correctly."
      );

    } else if (currentLanguage === "zh") {

      alert(
        "小心！你没有正确判断这条信息。"
      );

    } else {

      alert(
        "¡Cuidado! No evaluaste correctamente la información."
      );
    }
  }

  updateHUD();
  closeModal();
}


// ===============================
// CAMINO
// ===============================

function choosePath(path) {

  if (path === "verifier") {

    shields++;

    if (currentLanguage === "en") {

      alert(
        "You chose the Verifier Path: +1 Shield."
      );

    } else if (currentLanguage === "zh") {

      alert(
        "你选择了验证者道路：获得 +1 护盾。"
      );

    } else {

      alert(
        "Tomaste el Camino Verificador: Ganas +1 Escudo."
      );
    }

  } else {

    followers += 30;
    viralLoad += 10;

    if (currentLanguage === "en") {

      alert(
        "You chose the Fast Path: +30 Followers, but Viral Load increased."
      );

    } else if (currentLanguage === "zh") {

      alert(
        "你选择了快速道路：获得 +30 关注者，但病毒负荷增加。"
      );

    } else {

      alert(
        "Tomaste el Camino Rápido: Ganas +30 Seguidores pero sube la Carga Viral."
      );
    }
  }

  updateHUD();
}


// ===============================
// LABORATORIO
// ===============================

function runLabTool(tool) {

  const output = document.getElementById("lab-output");

  if (currentLanguage === "en") {

    if (tool === "ia") {
      output.innerText =
        "🤖 AI Analysis: Visual inconsistencies detected (92% probability of AI generation).";
    }

    if (tool === "source") {
      output.innerText =
        "🔗 Source Search: No official record of this story was found.";
    }

    if (tool === "meta") {
      output.innerText =
        "📄 Metadata: File was last modified in 2019.";
    }

  } else if (currentLanguage === "zh") {

    if (tool === "ia") {
      output.innerText =
        "🤖 人工智能分析：发现视觉不一致（92% 的可能性由人工智能生成）。";
    }

    if (tool === "source") {
      output.innerText =
        "🔗 来源搜索：没有找到这条新闻的官方记录。";
    }

    if (tool === "meta") {
      output.innerText =
        "📄 元数据：该文件最后一次修改于2019年。";
    }

  } else {

    if (tool === "ia") {
      output.innerText =
        "🤖 Análisis de IA: Inconsistencias visuales detectadas (92% Probabilidad de IA).";
    }

    if (tool === "source") {
      output.innerText =
        "🔗 Búsqueda de Fuente: No existe ningún registro oficial de esta noticia.";
    }

    if (tool === "meta") {
      output.innerText =
        "📄 Metadatos: Archivo modificado por última vez en 2019.";
    }
  }
}


// ===============================
// ACTUALIZAR HUD
// ===============================

function updateHUD() {

  document.getElementById(
    "followers-count"
  ).innerText = followers;

  document.getElementById(
    "shields-count"
  ).innerText = shields;

  document.getElementById(
    "viral-meter"
  ).style.width = `${viralLoad}%`;

  document.getElementById(
    "viral-text"
  ).innerText = `${viralLoad}% - Carga Viral Global`;
}


// ===============================
// USAR ESCUDO
// ===============================

function useShield() {

  if (shields > 0) {

    shields--;

    if (currentLanguage === "en") {

      alert(
        "You used a Shield to neutralize the threat."
      );

    } else if (currentLanguage === "zh") {

      alert(
        "你使用了护盾来抵消威胁。"
      );

    } else {

      alert(
        "Usaste un Escudo para neutralizar la amenaza."
      );
    }

    updateHUD();
    closeModal();

  } else {

    if (currentLanguage === "en") {

      alert("You don't have enough Shields.");

    } else if (currentLanguage === "zh") {

      alert("你没有足够的护盾。");

    } else {

      alert("No tienes Escudos suficientes.");
    }
  }
}


// ===============================
// CERRAR MODAL
// ===============================

function closeModal() {

  document
    .getElementById("interactive-modal")
    .classList.add("hidden");
}


// ======================================================
// TRADUCCIONES DE INTERFAZ
// ======================================================

const translations = {

  es: {

    nav: [
      "Inicio",
      "Tablero",
      "Laboratorio",
      "Ranking"
    ],

    heroTag:
      "UNESCO Youth Hackathon 2026",

    heroTitle:
      'Antes de creer, <span class="gradient-text">inocúlate.</span>',

    heroText:
      "El tablero de vida digital que te entrena para detectar fake news, deepfakes y manipulación en tu día a día digital.",

    enterBoard:
      "Entrar al Tablero",

    tools:
      "Probar Herramientas",

    stages:
      "Etapas del Día",

    languages:
      "Idiomas (ES, EN, ZH)",

    viralGoal:
      "Carga Viral Meta",

    publicViral:
      "Carga Viral Pública",

    lowVirus:
      "15% - Virus bajo control",

    digitalProfile:
      "Perfil Digital",

    followers:
      "Seguidores:",

    shields:
      "Escudos:",

    digitalWheel:
      "Rueda Digital",

    spin:
      "GIRAR RUEDA",

    spinText:
      "Gira la Rueda",

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

    confirm:
      "Confirmar Evaluación",

    shield:
      "🛡️ Usar Escudo para Saltar",

    close:
      "Cerrar"
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


// ======================================================
// CAMBIO DE IDIOMA
// ======================================================

function changeLanguage(lang) {

  currentLanguage = lang;

  const t =
    translations[lang] || translations.es;


  // Navbar

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


  // HOME

  document.querySelector(".pill-tag").innerHTML =
    `<i class="fa-solid fa-sparkles"></i> ${t.heroTag}`;

  document.querySelector(".hero h1").innerHTML =
    t.heroTitle;

  document.querySelector(".hero-subtext").textContent =
    t.heroText;


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


  // TABLERO

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


  document.getElementById(
    "viral-text"
  ).textContent = t.lowVirus;


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
    document.querySelectorAll(
      ".stage-label"
    );

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
    document.querySelectorAll(
      ".btn-path"
    );

  if (pathButtons.length >= 2) {

    pathButtons[0].innerHTML =
      `<strong>${t.verifier}</strong><br><small>${t.verifierSmall}</small>`;

    pathButtons[1].innerHTML =
      `<strong>${t.fast}</strong><br><small>${t.fastSmall}</small>`;
  }


  // LABORATORIO

  document.querySelector(
    "#page-lab h2"
  ).innerHTML =
    `<i class="fa-solid fa-flask"></i> ${t.labTitle}`;


  document.querySelector(
    "#page-lab > .lab-container > p"
  ).textContent =
    t.labDescription;


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


  document.getElementById(
    "lab-output"
  ).textContent =
    t.labOutput;


  // RANKING

  document.querySelector(
    "#page-leaderboard h2"
  ).innerHTML =
    `<i class="fa-solid fa-trophy"></i> ${t.rankingTitle}`;


  const headers =
    document.querySelectorAll(
      "#page-leaderboard th"
    );

  if (headers.length >= 4) {

    headers[0].textContent = t.position;
    headers[1].textContent = t.agent;
    headers[2].textContent = t.trustedFollowers;
    headers[3].textContent = t.avoidedViral;
  }


  // MODAL

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


  // ==========================================
  // SI HAY UNA NOTICIA ABIERTA, TRADUCIRLA
  // ==========================================

  if (currentNews) {
    displayNews(currentNews);
  }


  // Cambiar idioma HTML

  document.documentElement.lang =
    lang;
}
