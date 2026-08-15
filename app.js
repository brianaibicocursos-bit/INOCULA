// ======================================================
// INOCULA 2.0
// GAME LOGIC
// ======================================================


// ======================================================
// ESTADO DEL JUEGO
// ======================================================

let viralLoad = 15;
let followers = 100;
let shields = 1;

let currentNews = null;
let currentLanguage = "es";


// ======================================================
// NOTICIAS
// ======================================================

const newsDatabase = [

  {
    es: {
      headline: "🚨 ¡Tomar agua con limón elimina todas las toxinas del cuerpo!",
      article: "El agua con limón puede formar parte de una alimentación saludable, pero el cuerpo ya cuenta con órganos como el hígado y los riñones para eliminar sustancias de desecho."
    },

    en: {
      headline: "🚨 Drinking lemon water removes ALL toxins from your body!",
      article: "Lemon water can be part of a healthy diet, but the body already has organs such as the liver and kidneys that remove waste products."
    },

    zh: {
      headline: "🚨 喝柠檬水可以清除体内所有毒素！",
      article: "柠檬水可以成为健康饮食的一部分，但人体已经拥有肝脏和肾脏等器官来清除废物。"
    },

    exaggerated: true
  },


  {
    es: {
      headline: "🧠 ¡Las neuronas utilizan señales eléctricas para comunicarse!",
      article: "Las neuronas utilizan señales eléctricas y químicas para transmitir información."
    },

    en: {
      headline: "🧠 Neurons use electrical signals to communicate!",
      article: "Neurons use electrical and chemical signals to transmit information."
    },

    zh: {
      headline: "🧠 神经元使用电信号进行交流！",
      article: "神经元通过电信号和化学信号传递信息。"
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
      article: "Platforms can collect information about activity, interests and interactions, but that does not mean they can directly read people's thoughts."
    },

    zh: {
      headline: "🚨 Instagram 可以读取你的思想！",
      article: "社交平台可以收集活动、兴趣和互动等信息，但这并不意味着它们可以直接读取人的思想。"
    },

    exaggerated: true
  },


  {
    es: {
      headline: "🦠 ¡Lavarse las manos ayuda a prevenir enfermedades!",
      article: "La higiene de manos ayuda a reducir la transmisión de microorganismos."
    },

    en: {
      headline: "🦠 Washing your hands can help prevent diseases!",
      article: "Hand hygiene can help reduce the transmission of microorganisms."
    },

    zh: {
      headline: "🦠 洗手可以帮助预防疾病！",
      article: "保持手部卫生可以帮助减少微生物的传播。"
    },

    exaggerated: false
  },


  {
    es: {
      headline: "🤖 ¡La inteligencia artificial nunca se equivoca!",
      article: "Los sistemas de inteligencia artificial pueden producir respuestas incorrectas o información inventada y necesitan verificación."
    },

    en: {
      headline: "🤖 Artificial intelligence NEVER makes mistakes!",
      article: "Artificial intelligence systems can produce incorrect answers or fabricated information and need to be verified."
    },

    zh: {
      headline: "🤖 人工智能永远不会犯错！",
      article: "人工智能系统可能产生错误答案或虚构信息，因此需要进行验证。"
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
      headline: "🚨 Planting ONE tree will solve climate change!",
      article: "Trees can help the environment, but addressing climate change requires many different actions."
    },

    zh: {
      headline: "🚨 种一棵树就能解决气候变化问题！",
      article: "树木可以帮助环境，但应对气候变化需要多种不同的行动。"
    },

    exaggerated: true
  },


  {
    es: {
      headline: "📱 ¡Algunas aplicaciones pueden solicitar tu ubicación!",
      article: "Algunas aplicaciones pueden solicitar permisos de ubicación para ofrecer determinadas funciones."
    },

    en: {
      headline: "📱 Some apps can request your location!",
      article: "Some applications can request location permissions to provide certain features."
    },

    zh: {
      headline: "📱 一些应用程序可以请求你的位置信息！",
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
      headline: "🚨 If a post has millions of likes, it MUST be true!",
      article: "The popularity of a post does not prove that the information is accurate."
    },

    zh: {
      headline: "🚨 如果一条新闻有数百万个赞，它一定是真的！",
      article: "一条信息的受欢迎程度并不能证明其内容是真实的。"
    },

    exaggerated: true
  },


  {
    es: {
      headline: "🔎 ¡Comparar varias fuentes ayuda a detectar información falsa!",
      article: "Contrastar diferentes fuentes confiables puede ayudar a identificar inconsistencias."
    },

    en: {
      headline: "🔎 Comparing multiple sources can help detect misinformation!",
      article: "Comparing different reliable sources can help identify inconsistencies."
    },

    zh: {
      headline: "🔎 比较多个来源可以帮助发现虚假信息！",
      article: "对比不同的可靠来源可以帮助发现信息中的不一致之处。"
    },

    exaggerated: false
  },


  {
    es: {
      headline: "🚨 ¡Los teléfonos escuchan absolutamente todo lo que dices!",
      article: "Los dispositivos pueden utilizar micrófonos cuando tienen permisos y determinadas funciones activadas, pero eso no significa que graben absolutamente todo de manera constante."
    },

    en: {
      headline: "🚨 Phones record EVERYTHING you say!",
      article: "Devices can use microphones when permissions and certain features are enabled, but that does not mean they constantly record everything."
    },

    zh: {
      headline: "🚨 手机会记录你说的所有话！",
      article: "当权限和某些功能开启时，设备可以使用麦克风，但这并不意味着它们会持续记录所有内容。"
    },

    exaggerated: true
  },


  {
    es: {
      headline: "🌙 Dormir bien es importante para el funcionamiento del cerebro.",
      article: "El sueño adecuado está relacionado con procesos importantes como la memoria, el aprendizaje y la regulación de la atención."
    },

    en: {
      headline: "🌙 Good sleep is important for brain function.",
      article: "Adequate sleep is associated with important processes such as memory, learning and attention regulation."
    },

    zh: {
      headline: "🌙 良好的睡眠对大脑功能很重要。",
      article: "充足的睡眠与记忆、学习和注意力调节等重要过程有关。"
    },

    exaggerated: false
  }

];


// ======================================================
// NAVEGACIÓN
// ======================================================

function navigateTo(pageId) {

  document.querySelectorAll(".page-view")
    .forEach(page => page.classList.add("hidden"));

  document.querySelectorAll(".nav-btn")
    .forEach(button => button.classList.remove("active"));

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

  if (pageMap[pageId] !== undefined) {
    buttons[pageMap[pageId]].classList.add("active");
  }
}


// ======================================================
// GIRAR RUEDA
// ======================================================

function spinWheel() {

  const moves = Math.floor(Math.random() * 4) + 1;

  const wheel = document.querySelector(".wheel-circle");

  wheel.classList.remove("spin-animation");

  void wheel.offsetWidth;

  wheel.classList.add("spin-animation");


  setTimeout(() => {

    const translations = {

      es: `🚀 Avanzas ${moves} casillas`,

      en: `🚀 You advance ${moves} spaces`,

      zh: `🚀 你前进 ${moves} 格`
    };

    document.getElementById("wheel-display").innerHTML = `
      <div class="wheel-circle">
        🎯
      </div>

      <strong>
        ${translations[currentLanguage]}
      </strong>
    `;

  }, 1000);


  setTimeout(() => {

    openMinigame();

  }, 1600);

}


// ======================================================
// ABRIR NOTICIA
// ======================================================

function openMinigame() {

  const modal =
    document.getElementById("interactive-modal");

  modal.classList.remove("hidden");


  document.querySelectorAll(".minigame-view")
    .forEach(m => m.classList.add("hidden"));


  // Elegir noticia aleatoria

  const randomIndex =
    Math.floor(Math.random() * newsDatabase.length);


  currentNews =
    newsDatabase[randomIndex];


  showCurrentNews();


  document
    .getElementById("minigame-clickbait")
    .classList.remove("hidden");
}


// ======================================================
// MOSTRAR NOTICIA
// ======================================================

function showCurrentNews() {

  if (!currentNews) return;


  const translatedNews =
    currentNews[currentLanguage];


  document.querySelector(
    "#minigame-clickbait .headline"
  ).textContent =
    translatedNews.headline;


  document.getElementById(
    "article-body"
  ).textContent =
    translatedNews.article;


  document.getElementById(
    "clickbait-slider"
  ).value = 50;


  document.getElementById(
    "article-body"
  ).classList.add("hidden");
}


// ======================================================
// CAMBIAR IDIOMA
// ======================================================

function changeLanguage(lang) {

  currentLanguage = lang;

  document.documentElement.lang = lang;


  const translations = {

    es: {

      navHome: "Inicio",
      navGame: "Tablero",
      navLab: "Laboratorio",
      navRanking: "Ranking",

      heroTag: "UNESCO Youth Hackathon 2026",

      heroTitle: `Antes de creer, <span class="gradient-text">inocúlate.</span>`,

      heroText:
        "El tablero de vida digital que te entrena para detectar fake news, deepfakes y manipulación en tu día a día digital.",

      enterBoard: "Entrar al Tablero",

      tryTools: "Probar Herramientas",

      dayStages: "Etapas del Día",

      languages: "Idiomas",

      viralGoal: "Carga Viral Meta",

      publicViral: "Carga Viral Pública",

      viralRisk: "Nivel de riesgo",

      digitalProfile: "Perfil Digital",

      yourStats: "Tus estadísticas",

      followers: "Seguidores",

      shields: "Escudos",

      digitalWheel: "Rueda Digital",

      spinToPlay: "Gira para jugar",

      spinWheel: "Gira la Rueda",

      spin: "GIRAR RUEDA",

      boardTitle: "Tu Navegación Diaria",

      boardDescription:
        "Cada decisión cambia tu nivel de protección.",

      stage1:
        "Etapa 1: Despertar & Feed Matutino",

      stage2:
        "Etapa 2: Trabajo / Escuela & Chats",

      stage3:
        "Etapa 3: Tarde, Noticias & Redes",

      stage4:
        "Etapa 4: Noche, Viral & Retiro Digital",

      forkTitle:
        "¡Punto de Bifurcación!",

      forkDescription:
        "Elige cómo quieres continuar.",

      verifier:
        "Camino Verificador",

      verifierSmall:
        "Más lento, gana Escudos",

      fast:
        "Camino Rápido",

      fastSmall:
        "Avanzas rápido, asumes riesgo",

      labTitle:
        "Laboratorio de Verificación",

      labDescription:
        "Analiza una noticia antes de compartirla.",

      minutesAgo:
        "hace 5 minutos",

      labFakeHeadline:
        `🚨 NOTICIA TENDENCIA: "Descubren que las imágenes satelitales son falsas"`,

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

      newsSource:
        "Publicación viral",

      readArticle:
        "Leer nota completa",

      slider:
        "¿El titular representa la nota o exagera?",

      confirm:
        "Confirmar Evaluación",

      shield:
        "Usar Escudo para Saltar",

      close:
        "Cerrar"
    },


    en: {

      navHome: "Home",
      navGame: "Game Board",
      navLab: "Laboratory",
      navRanking: "Leaderboard",

      heroTag:
        "UNESCO Youth Hackathon 2026",

      heroTitle:
        `Before you believe, <span class="gradient-text">inoculate yourself.</span>`,

      heroText:
        "The digital life board that trains you to detect fake news, deepfakes and manipulation in your everyday digital life.",

      enterBoard:
        "Enter Game Board",

      tryTools:
        "Try Tools",

      dayStages:
        "Stages of the Day",

      languages:
        "Languages",

      viralGoal:
        "Target Viral Load",

      publicViral:
        "Public Viral Load",

      viralRisk:
        "Risk level",

      digitalProfile:
        "Digital Profile",

      yourStats:
        "Your statistics",

      followers:
        "Followers",

      shields:
        "Shields",

      digitalWheel:
        "Digital Wheel",

      spinToPlay:
        "Spin to play",

      spinWheel:
        "Spin the Wheel",

      spin:
        "SPIN WHEEL",

      boardTitle:
        "Your Daily Navigation",

      boardDescription:
        "Every decision changes your protection level.",

      stage1:
        "Stage 1: Wake Up & Morning Feed",

      stage2:
        "Stage 2: Work / School & Chats",

      stage3:
        "Stage 3: Afternoon, News & Social Media",

      stage4:
        "Stage 4: Night, Viral & Digital Detox",

      forkTitle:
        "Fork in the Road!",

      forkDescription:
        "Choose how you want to continue.",

      verifier:
        "Verifier Path",

      verifierSmall:
        "Slower, earns Shields",

      fast:
        "Fast Path",

      fastSmall:
        "Move faster, take the risk",

      labTitle:
        "Verification Laboratory",

      labDescription:
        "Analyze a news story before sharing it.",

      minutesAgo:
        "5 minutes ago",

      labFakeHeadline:
        `🚨 TRENDING NEWS: "Satellite images discovered to be fake"`,

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

      newsSource:
        "Viral post",

      readArticle:
        "Read full article",

      slider:
        "Does the headline represent the article or exaggerate?",

      confirm:
        "Confirm Evaluation",

      shield:
        "Use Shield to Skip",

      close:
        "Close"
    },


    zh: {

      navHome:
        "首页",

      navGame:
        "游戏板",

      navLab:
        "实验室",

      navRanking:
        "排行榜",

      heroTag:
        "联合国教科文组织青年黑客马拉松 2026",

      heroTitle:
        `在相信之前，<span class="gradient-text">先给自己接种。</span>`,

      heroText:
        "数字生活棋盘，训练你识别日常数字生活中的假新闻、深度伪造和信息操纵。",

      enterBoard:
        "进入游戏板",

      tryTools:
        "尝试工具",

      dayStages:
        "一天的阶段",

      languages:
        "语言",

      viralGoal:
        "目标病毒负荷",

      publicViral:
        "公共病毒负荷",

      viralRisk:
        "风险等级",

      digitalProfile:
        "数字档案",

      yourStats:
        "你的统计数据",

      followers:
        "关注者",

      shields:
        "护盾",

      digitalWheel:
        "数字转盘",

      spinToPlay:
        "旋转开始游戏",

      spinWheel:
        "旋转转盘",

      spin:
        "旋转转盘",

      boardTitle:
        "你的日常数字生活",

      boardDescription:
        "每个决定都会改变你的保护等级。",

      stage1:
        "阶段 1：起床与早晨信息流",

      stage2:
        "阶段 2：工作 / 学校与聊天",

      stage3:
        "阶段 3：下午、新闻与社交网络",

      stage4:
        "阶段 4：夜晚、病毒信息与数字休息",

      forkTitle:
        "分岔路口！",

      forkDescription:
        "选择你想要的道路。",

      verifier:
        "验证者道路",

      verifierSmall:
        "速度较慢，但可以获得护盾",

      fast:
        "快速道路",

      fastSmall:
        "前进更快，但承担风险",

      labTitle:
        "信息验证实验室",

      labDescription:
        "在分享新闻之前进行分析。",

      minutesAgo:
        "5分钟前",

      labFakeHeadline:
        `🚨 热门新闻：“发现卫星图像都是假的”`,

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

      newsSource:
        "热门帖子",

      readArticle:
        "阅读完整文章",

      slider:
        "标题是否准确反映文章内容，还是夸大了？",

      confirm:
        "确认评估",

      shield:
        "使用护盾跳过",

      close:
        "关闭"
    }

  };


  const t = translations[lang];


  // Todos los elementos con data-i18n

  document.querySelectorAll("[data-i18n]")
    .forEach(element => {

      const key =
        element.getAttribute("data-i18n");

      if (t[key]) {

        if (element.tagName === "H1") {
          element.innerHTML = t[key];
        }

        else {
          element.textContent = t[key];
        }

      }

    });


  // Títulos con HTML

  const heroTitle =
    document.querySelector(".hero h1");

  if (heroTitle) {
    heroTitle.innerHTML = t.heroTitle;
  }


  // Noticia actual

  if (currentNews) {
    showCurrentNews();
  }


  // Guardar idioma

  localStorage.setItem(
    "inoculaLanguage",
    lang
  );

}


// ======================================================
// ARTÍCULO
// ======================================================

function toggleArticleBody() {

  document
    .getElementById("article-body")
    .classList.toggle("hidden");

}


// ======================================================
// RESPUESTA DE NOTICIA
// ======================================================

function checkClickbait() {

  if (!currentNews) return;


  const value =
    Number(
      document.getElementById("clickbait-slider").value
    );


  let correct = false;


  if (currentNews.exaggerated) {

    correct = value > 50;

  } else {

    correct = value <= 50;

  }


  if (correct) {

    followers += 25;

    showResult(true);

  } else {

    viralLoad += 10;

    if (viralLoad > 100) {
      viralLoad = 100;
    }

    showResult(false);

  }


  updateHUD();

}


// ======================================================
// RESULTADO
// ======================================================

function showResult(success) {

  const messages = {

    es: success
      ? "🎉 ¡Excelente! Detectaste correctamente la información."
      : "⚠️ ¡Cuidado! La noticia te engañó.",

    en: success
      ? "🎉 Excellent! You correctly detected the manipulation."
      : "⚠️ Careful! The news story fooled you.",

    zh: success
      ? "🎉 太棒了！你正确识别了信息。"
      : "⚠️ 小心！这条新闻误导了你。"
  };


  alert(messages[currentLanguage]);


  closeModal();

}


// ======================================================
// CAMINO
// ======================================================

function choosePath(path) {

  const messages = {

    es: {
      verifier:
        "🛡️ Tomaste el Camino Verificador: ganas +1 Escudo.",

      fast:
        "⚡ Tomaste el Camino Rápido: ganas +30 Seguidores pero aumenta la Carga Viral."
    },

    en: {
      verifier:
        "🛡️ You chose the Verifier Path: +1 Shield.",

      fast:
        "⚡ You chose the Fast Path: +30 Followers but Viral Load increases."
    },

    zh: {
      verifier:
        "🛡️ 你选择了验证道路：获得 +1 护盾。",

      fast:
        "⚡ 你选择了快速道路：获得 +30 关注者，但病毒负荷增加。"
    }

  };


  if (path === "verifier") {

    shields++;

    alert(messages[currentLanguage].verifier);

  } else {

    followers += 30;

    viralLoad += 10;

    if (viralLoad > 100) {
      viralLoad = 100;
    }

    alert(messages[currentLanguage].fast);

  }


  updateHUD();

}


// ======================================================
// LABORATORIO
// ======================================================

function runLabTool(tool) {

  const output =
    document.getElementById("lab-output");


  const results = {

    es: {

      ia:
        "🤖 Análisis de IA: se detectaron inconsistencias visuales. Probabilidad estimada de contenido generado por IA: 92%.",

      source:
        "🔎 Búsqueda de fuente: no se encontró ningún registro oficial que confirme esta noticia.",

      meta:
        "📄 Metadatos: el archivo presenta información que requiere una revisión adicional."
    },


    en: {

      ia:
        "🤖 AI Analysis: visual inconsistencies detected. Estimated probability of AI-generated content: 92%.",

      source:
        "🔎 Source Search: no official record confirming this story was found.",

      meta:
        "📄 Metadata: the file contains information that requires further review."
    },


    zh: {

      ia:
        "🤖 AI 分析：检测到视觉不一致。AI 生成内容的估计概率为 92%。",

      source:
        "🔎 来源搜索：没有找到可以确认该新闻的官方记录。",

      meta:
        "📄 元数据：该文件包含需要进一步检查的信息。"
    }

  };


  output.textContent =
    results[currentLanguage][tool];

}


// ======================================================
// HUD
// ======================================================

function updateHUD() {

  document.getElementById(
    "followers-count"
  ).textContent = followers;


  document.getElementById(
    "shields-count"
  ).textContent = shields;


  document.getElementById(
    "viral-meter"
  ).style.width =
    viralLoad + "%";


  document.getElementById(
    "viral-number"
  ).textContent =
    viralLoad;


  const viralMessages = {

    es:
      viralLoad < 30
        ? "Virus bajo control"
        : "Carga viral elevada",

    en:
      viralLoad < 30
        ? "Virus under control"
        : "High viral load",

    zh:
      viralLoad < 30
        ? "病毒处于控制之下"
        : "病毒负荷较高"
  };


  document.getElementById(
    "viral-text"
  ).textContent =
    viralLoad +
    "% - " +
    viralMessages[currentLanguage];

}


// ======================================================
// USAR ESCUDO
// ======================================================

function useShield() {

  const messages = {

    es: {
      used:
        "🛡️ Usaste un Escudo para neutralizar la amenaza.",

      empty:
        "❌ No tienes Escudos suficientes."
    },

    en: {
      used:
        "🛡️ You used a Shield to neutralize the threat.",

      empty:
        "❌ You don't have enough Shields."
    },

    zh: {
      used:
        "🛡️ 你使用护盾来抵御威胁。",

      empty:
        "❌ 你没有足够的护盾。"
    }

  };


  if (shields > 0) {

    shields--;

    alert(messages[currentLanguage].used);

    updateHUD();

    closeModal();

  } else {

    alert(messages[currentLanguage].empty);

  }

}


// ======================================================
// CERRAR MODAL
// ======================================================

function closeModal() {

  document
    .getElementById("interactive-modal")
    .classList.add("hidden");

}


// ======================================================
// INICIAR
// ======================================================

document.addEventListener(
  "DOMContentLoaded",
  () => {

    const savedLanguage =
      localStorage.getItem("inoculaLanguage") || "es";


    const selector =
      document.getElementById("lang-select");


    if (selector) {
      selector.value = savedLanguage;
    }


    changeLanguage(savedLanguage);

    updateHUD();

  }
);
