// ==========================================
// INOCULA · APP.JS
// ==========================================


// ==========================================
// NAVEGACIÓN
// ==========================================

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


// ==========================================
// ESTADO DEL JUEGO
// ==========================================

let viralLoad = 15;
let followers = 100;
let shields = 1;

let currentNews = null;
let lastNewsIndex = -1;


// ==========================================
// BANCO DE NOTICIAS
// ==========================================

const fakeNews = [

  {
    headline: "🚨 ¡Tomar agua con limón elimina todas las toxinas del cuerpo!",
    article: "El agua con limón puede formar parte de una alimentación saludable, pero el cuerpo ya cuenta con órganos como el hígado y los riñones para eliminar sustancias de desecho.",
    exaggerated: true
  },

  {
    headline: "🧠 ¡El cerebro utiliza electricidad para comunicarse!",
    article: "Las neuronas utilizan señales eléctricas y químicas para transmitir información.",
    exaggerated: false
  },

  {
    headline: "🚨 ¡Instagram puede leer tus pensamientos!",
    article: "Las plataformas pueden recopilar información sobre actividad, intereses e interacciones, pero no pueden leer directamente los pensamientos.",
    exaggerated: true
  },

  {
    headline: "🦠 ¡Lavarse las manos ayuda a prevenir enfermedades!",
    article: "La higiene de manos ayuda a reducir la transmisión de microorganismos.",
    exaggerated: false
  },

  {
    headline: "🚨 ¡La inteligencia artificial nunca se equivoca!",
    article: "Los sistemas de inteligencia artificial pueden producir respuestas incorrectas y necesitan verificación.",
    exaggerated: true
  },

  {
    headline: "🌳 ¡Los árboles ayudan a absorber dióxido de carbono!",
    article: "Las plantas absorben dióxido de carbono durante la fotosíntesis.",
    exaggerated: false
  },

  {
    headline: "🚨 ¡Plantar un solo árbol resolverá el cambio climático!",
    article: "Los árboles ayudan al ambiente, pero resolver el cambio climático requiere múltiples acciones.",
    exaggerated: true
  },

  {
    headline: "📱 ¡Algunas aplicaciones pueden solicitar tu ubicación!",
    article: "Algunas aplicaciones pueden solicitar permisos de ubicación para ofrecer determinadas funciones.",
    exaggerated: false
  },

  {
    headline: "🚨 ¡Si una noticia tiene millones de likes, definitivamente es verdadera!",
    article: "La popularidad de una publicación no demuestra que la información sea cierta.",
    exaggerated: true
  },

  {
    headline: "🔎 ¡Comparar varias fuentes ayuda a detectar información falsa!",
    article: "Contrastar diferentes fuentes confiables puede ayudar a identificar inconsistencias.",
    exaggerated: false
  },

  {
    headline: "🚨 ¡Dormir solo 3 horas hace que tu cerebro sea más inteligente!",
    article: "Dormir muy poco puede afectar la atención, la memoria y otras funciones cognitivas.",
    exaggerated: true
  },

  {
    headline: "💧 Beber suficiente agua ayuda a mantener la hidratación.",
    article: "El agua es necesaria para numerosas funciones del organismo y ayuda a mantener una hidratación adecuada.",
    exaggerated: false
  },

  {
    headline: "🚨 ¡Comer chocolate antes de dormir te permite recordar absolutamente todo!",
    article: "No existe evidencia de que comer chocolate antes de dormir permita recordar absolutamente toda la información.",
    exaggerated: true
  },

  {
    headline: "☀️ La luz solar participa en la producción de vitamina D.",
    article: "La exposición a la radiación ultravioleta B permite que la piel produzca vitamina D.",
    exaggerated: false
  },

  {
    headline: "🚨 ¡Los teléfonos celulares pueden cargar su batería con solo estar cerca de una persona!",
    article: "Los teléfonos necesitan una fuente de energía compatible para cargar su batería.",
    exaggerated: true
  },

  {
    headline: "🧼 Lavarse las manos con agua y jabón ayuda a eliminar microorganismos.",
    article: "El lavado adecuado de manos con agua y jabón ayuda a eliminar suciedad y microorganismos.",
    exaggerated: false
  },

  {
    headline: "🚨 ¡Escuchar música durante 10 minutos puede curar cualquier enfermedad!",
    article: "La música puede influir en el estado de ánimo, pero no puede curar cualquier enfermedad.",
    exaggerated: true
  },

  {
    headline: "🌱 Las plantas realizan fotosíntesis para producir energía química.",
    article: "Durante la fotosíntesis, las plantas utilizan luz para transformar dióxido de carbono y agua en compuestos orgánicos.",
    exaggerated: false
  },

  {
    headline: "🚨 ¡Las redes sociales saben exactamente lo que vas a pensar mañana!",
    article: "Los sistemas pueden utilizar datos y patrones de comportamiento para personalizar contenido, pero no pueden conocer con certeza los pensamientos futuros.",
    exaggerated: true
  },

  {
    headline: "🔐 Utilizar contraseñas diferentes puede mejorar la seguridad de tus cuentas.",
    article: "Usar contraseñas diferentes reduce el impacto si una de las cuentas resulta comprometida.",
    exaggerated: false
  },

  {
    headline: "🚨 ¡Un imán pequeño puede borrar cualquier información de tu celular!",
    article: "Los teléfonos modernos utilizan almacenamiento electrónico que no funciona como las antiguas cintas magnéticas.",
    exaggerated: true
  },

  {
    headline: "📚 Revisar la fecha de publicación ayuda a evaluar una noticia.",
    article: "La fecha de publicación puede ayudar a determinar si una información continúa siendo relevante o actual.",
    exaggerated: false
  },

  {
    headline: "🚨 ¡Las noticias que usan muchas mayúsculas siempre son falsas!",
    article: "El uso de mayúsculas puede ser una señal de estilo sensacionalista, pero por sí solo no demuestra que una noticia sea falsa.",
    exaggerated: true
  },

  {
    headline: "🔎 Revisar quién publicó una información ayuda a evaluar su confiabilidad.",
    article: "Identificar al autor o institución responsable es una estrategia útil para evaluar una información.",
    exaggerated: false
  },

  {
    headline: "🚨 ¡Si una foto aparece en Internet, automáticamente es reciente!",
    article: "Una fotografía puede permanecer en Internet durante años y ser compartida nuevamente fuera de su contexto original.",
    exaggerated: true
  },

  {
    headline: "📰 Una noticia confiable debería poder contrastarse con otras fuentes.",
    article: "Comparar información con fuentes independientes puede ayudar a identificar errores o afirmaciones engañosas.",
    exaggerated: false
  },

  {
    headline: "🚨 ¡Compartir una noticia muchas veces la convierte en verdadera!",
    article: "La cantidad de veces que se comparte una publicación no determina si la información es verdadera.",
    exaggerated: true
  },

  {
    headline: "📅 Las fechas ayudan a entender el contexto de una noticia.",
    article: "Conocer cuándo ocurrió un acontecimiento y cuándo fue publicada una noticia ayuda a comprender su contexto.",
    exaggerated: false
  },

  {
    headline: "🚨 ¡Todos los videos virales muestran exactamente lo que ocurrió!",
    article: "Un video puede estar editado, recortado o fuera de contexto.",
    exaggerated: true
  },

  {
    headline: "🎥 Revisar un video completo puede ayudar a entender su contexto.",
    article: "Analizar el contenido completo de un video puede revelar información que no aparece en un fragmento.",
    exaggerated: false
  },

  {
    headline: "🚨 ¡Una inteligencia artificial puede saber si alguien está mintiendo con solo verlo!",
    article: "No existe una herramienta que pueda determinar con certeza si una persona miente simplemente observándola.",
    exaggerated: true
  },

  {
    headline: "🤖 La inteligencia artificial puede ayudar a analizar grandes cantidades de información.",
    article: "Las herramientas de inteligencia artificial pueden procesar grandes cantidades de información, aunque sus resultados deben verificarse.",
    exaggerated: false
  },

  {
    headline: "🚨 ¡Si una página tiene un logo profesional, toda su información es verdadera!",
    article: "El diseño profesional de una página no garantiza que su contenido sea correcto.",
    exaggerated: true
  },

  {
    headline: "🌐 El dominio y la identidad de un sitio pueden aportar información sobre su origen.",
    article: "Revisar el dominio, autor e institución responsable puede ayudar a evaluar un sitio web.",
    exaggerated: false
  },

  {
    headline: "🚨 ¡Los comentarios de Internet son pruebas científicas!",
    article: "Los comentarios pueden expresar experiencias u opiniones, pero no sustituyen la evidencia científica.",
    exaggerated: true
  },

  {
    headline: "🧪 Los estudios científicos deben evaluarse considerando su metodología.",
    article: "La metodología, el tamaño de la muestra y otras características ayudan a evaluar la calidad de un estudio.",
    exaggerated: false
  },

  {
    headline: "🚨 ¡Una encuesta de 10 personas representa automáticamente a todo un país!",
    article: "Una muestra muy pequeña puede no representar adecuadamente a toda una población.",
    exaggerated: true
  },

  {
    headline: "📊 El tamaño y selección de una muestra son importantes en una investigación.",
    article: "La forma en que se selecciona una muestra puede afectar qué tan representativos son sus resultados.",
    exaggerated: false
  },

  {
    headline: "🚨 ¡Una gráfica con números grandes siempre demuestra una tendencia real!",
    article: "La escala y presentación de una gráfica pueden cambiar la percepción de los datos.",
    exaggerated: true
  },

  {
    headline: "📈 Las gráficas pueden facilitar la comprensión de datos.",
    article: "Una gráfica correctamente construida puede ayudar a visualizar patrones y tendencias.",
    exaggerated: false
  },

  {
    headline: "🚨 ¡Si un famoso publica algo, automáticamente es información científica!",
    article: "La popularidad o profesión de una persona no convierte automáticamente sus afirmaciones en evidencia científica.",
    exaggerated: true
  },

  {
    headline: "👩‍🔬 La experiencia profesional puede ser relevante, pero no sustituye la evidencia.",
    article: "Las afirmaciones científicas deben evaluarse considerando las evidencias disponibles.",
    exaggerated: false
  },

  {
    headline: "🚨 ¡Una sola captura de pantalla demuestra toda la historia!",
    article: "Una captura puede mostrar solo una parte de una conversación o publicación y carecer de contexto.",
    exaggerated: true
  },

  {
    headline: "🖼️ Buscar el origen de una imagen puede ayudar a detectar contenido fuera de contexto.",
    article: "La búsqueda de imágenes y la revisión de su origen pueden ayudar a determinar cuándo y dónde fue publicada.",
    exaggerated: false
  },

  {
    headline: "🚨 ¡Si una noticia aparece primero en Google, significa que es verdadera!",
    article: "Los resultados de búsqueda no garantizan que una información sea verdadera.",
    exaggerated: true
  },

  {
    headline: "🔍 Los buscadores organizan resultados, pero no garantizan que todo el contenido sea verdadero.",
    article: "Es necesario evaluar las fuentes y el contenido de los resultados de búsqueda.",
    exaggerated: false
  },

  {
    headline: "🚨 ¡Una noticia sin autor es igual de confiable que una investigación identificada!",
    article: "La ausencia de autor o institución responsable puede dificultar la evaluación de la confiabilidad de una información.",
    exaggerated: true
  },

  {
    headline: "📝 Identificar al autor facilita investigar la procedencia de una información.",
    article: "Conocer quién produjo una información permite investigar su experiencia, fuentes y posibles intereses.",
    exaggerated: false
  },

  {
    headline: "🚨 ¡Todo lo que empieza con 'los científicos descubrieron' es verdadero!",
    article: "Una frase llamativa no demuestra que una afirmación tenga respaldo científico.",
    exaggerated: true
  },

  {
    headline: "🔬 Las afirmaciones científicas pueden verificarse consultando fuentes especializadas.",
    article: "Consultar publicaciones, instituciones y expertos puede ayudar a verificar afirmaciones científicas.",
    exaggerated: false
  },

  {
    headline: "🚨 ¡Una noticia que provoca miedo debe compartirse inmediatamente!",
    article: "El contenido diseñado para provocar miedo puede utilizar emociones para impulsar que las personas lo compartan sin verificarlo.",
    exaggerated: true
  },

  {
    headline: "🧠 Tomarse un momento para verificar antes de compartir puede reducir la difusión de información falsa.",
    article: "Revisar la fuente, fecha, contexto y evidencia antes de compartir ayuda a reducir la propagación de información engañosa.",
    exaggerated: false
  }

];


// ==========================================
// RULETA
// ==========================================

function spinWheel() {

  const moves = Math.floor(Math.random() * 4) + 1;

  document.getElementById('wheel-display').innerHTML =
    `<strong>Avanzas ${moves} casillas</strong>`;

  setTimeout(() => {
    openMinigame('clickbait');
  }, 800);
}


// ==========================================
// ABRIR MINIJUEGO
// ==========================================

function openMinigame(type) {

  const modal = document.getElementById('interactive-modal');

  modal.classList.remove('hidden');

  document.querySelectorAll('.minigame-view').forEach(game => {
    game.classList.add('hidden');
  });

  if (type === 'clickbait') {

    // Elegir noticia aleatoria
    let randomIndex;

    do {
      randomIndex = Math.floor(Math.random() * fakeNews.length);
    } while (
      fakeNews.length > 1 &&
      randomIndex === lastNewsIndex
    );

    lastNewsIndex = randomIndex;

    currentNews = fakeNews[randomIndex];

    // Mostrar titular
    document.querySelector(
      '#minigame-clickbait .headline'
    ).textContent = currentNews.headline;

    // Mostrar artículo
    document.getElementById('article-body').textContent =
      currentNews.article;

    // Reiniciar slider
    document.getElementById('clickbait-slider').value = 50;

    // Ocultar artículo
    document.getElementById('article-body').classList.add('hidden');

    // Mostrar minijuego
    document.getElementById(
      'minigame-clickbait'
    ).classList.remove('hidden');
  }
}


// ==========================================
// LEER ARTÍCULO
// ==========================================

function toggleArticleBody() {

  document
    .getElementById('article-body')
    .classList.toggle('hidden');
}


// ==========================================
// EVALUAR NOTICIA
// ==========================================

function checkClickbait() {

  const val = Number(
    document.getElementById('clickbait-slider').value
  );

  if (!currentNews) {
    return;
  }

  // NOTICIA EXAGERADA / FALSA
  if (currentNews.exaggerated) {

    if (val > 50) {

      alert(
        "¡Excelente! Detectaste que el titular exageraba la información."
      );

      followers += 25;

    } else {

      alert(
        "¡Cuidado! El titular exageraba la información."
      );

      viralLoad += 10;
    }

  }

  // NOTICIA VERDADERA
  else {

    if (val <= 50) {

      alert(
        "¡Excelente! Detectaste que el titular representa correctamente la información."
      );

      followers += 25;

    } else {

      alert(
        "¡Cuidado! La noticia sí representaba correctamente la información."
      );

      viralLoad += 10;
    }
  }

  updateHUD();
  closeModal();
}


// ==========================================
// CAMINOS
// ==========================================

function choosePath(path) {

  if (path === 'verifier') {

    shields++;

    alert(
      "Tomaste el Camino Verificador: ganas +1 Escudo."
    );

  } else {

    followers += 30;
    viralLoad += 10;

    alert(
      "Tomaste el Camino Rápido: ganas +30 Seguidores pero aumenta la Carga Viral."
    );
  }

  updateHUD();
}


// ==========================================
// LABORATORIO
// ==========================================

function runLabTool(tool) {

  const output =
    document.getElementById('lab-output');

  if (tool === 'ia') {

    output.innerText =
      "🤖 Análisis de IA: Inconsistencias visuales detectadas (92% probabilidad de contenido generado o manipulado).";

  }

  if (tool === 'source') {

    output.innerText =
      "🔗 Búsqueda de Fuente: No existe ningún registro oficial que confirme esta noticia.";

  }

  if (tool === 'meta') {

    output.innerText =
      "📄 Metadatos: El archivo presenta información que debe revisarse antes de considerarlo confiable.";
  }
}


// ==========================================
// ACTUALIZAR HUD
// ==========================================

function updateHUD() {

  document.getElementById(
    'followers-count'
  ).innerText = followers;

  document.getElementById(
    'shields-count'
  ).innerText = shields;

  document.getElementById(
    'viral-meter'
  ).style.width = `${Math.min(viralLoad, 100)}%`;

  document.getElementById(
    'viral-text'
  ).innerText =
    `${viralLoad}% - Carga Viral Global`;
}


// ==========================================
// USAR ESCUDO
// ==========================================

function useShield() {

  if (shields > 0) {

    shields--;

    alert(
      "Usaste un Escudo para neutralizar la amenaza."
    );

    updateHUD();
    closeModal();

  } else {

    alert(
      "No tienes Escudos suficientes."
    );
  }
}


// ==========================================
// CERRAR MODAL
// ==========================================

function closeModal() {

  document
    .getElementById('interactive-modal')
    .classList.add('hidden');
}


// ==========================================
// IDIOMAS
// ==========================================

function changeLanguage(lang) {

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

      lowVirus: "15% - Virus bajo control",

      digitalProfile: "Perfil Digital",

      followers: "Seguidores:",

      shields: "Escudos:",

      digitalWheel: "Rueda Digital",

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


  const t =
    translations[lang] || translations.es;


  // NAVBAR

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


  // GAME BOARD

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

    headers[0].textContent =
      t.position;

    headers[1].textContent =
      t.agent;

    headers[2].textContent =
      t.trustedFollowers;

    headers[3].textContent =
      t.avoidedViral;
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


  document.documentElement.lang =
    lang;
}
