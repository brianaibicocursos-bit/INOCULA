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
      close: "Cerrar"
    },

    en: {
      nav: ["Home", "Game Board", "Laboratory", "Leaderboard"],
      heroTag: "UNESCO Youth Hackathon 2026",
      heroTitle: 'Before you believe, <span class="gradient-text">inoculate yourself.</span>',
      heroText: "The digital life board that trains you to detect fake news, deepfakes, and manipulation in your everyday digital life.",
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
      close: "Close"
    },

    zh: {
      nav: ["首页", "游戏板", "实验室", "排行榜"],
      heroTag: "联合国教科文组织青年黑客马拉松 2026",
      heroTitle: '在相信之前，<span class="gradient-text">先给自己接种。</span>',
      heroText: "数字生活棋盘，训练你识别日常数字生活中的假新闻、深度伪造和信息操纵。",
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
      close: "关闭"
    }
  };

  const t = translations[lang] || translations.es;

  // Navbar
  const navButtons = document.querySelectorAll(".nav-links .nav-btn");
  if (navButtons.length >= 4) {
    navButtons[0].innerHTML = `<i class="fa-solid fa-house"></i> ${t.nav[0]}`;
    navButtons[1].innerHTML = `<i class="fa-solid fa-gamepad"></i> ${t.nav[1]}`;
    navButtons[2].innerHTML = `<i class="fa-solid fa-flask"></i> ${t.nav[2]}`;
    navButtons[3].innerHTML = `<i class="fa-solid fa-trophy"></i> ${t.nav[3]}`;
  }

  // Home
  document.querySelector(".pill-tag").innerHTML =
    `<i class="fa-solid fa-sparkles"></i> ${t.heroTag}`;

  document.querySelector(".hero h1").innerHTML = t.heroTitle;
  document.querySelector(".hero-subtext").textContent = t.heroText;

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

  // Game board
  const statusTitles = document.querySelectorAll(".status-card h3");

  if (statusTitles.length >= 3) {
    statusTitles[0].innerHTML =
      `<i class="fa-solid fa-biohazard"></i> ${t.publicViral}`;

    statusTitles[1].innerHTML =
      `<i class="fa-solid fa-user-check"></i> ${t.digitalProfile}`;

    statusTitles[2].innerHTML =
      `<i class="fa-solid fa-dharmachakra"></i> ${t.digitalWheel}`;
  }

  document.getElementById("viral-text").textContent = t.lowVirus;

  const statRows = document.querySelectorAll(".stat-row span");
  if (statRows.length >= 2) {
    statRows[0].innerHTML =
      `<i class="fa-solid fa-users" style="color: #3b82f6;"></i> ${t.followers}`;

    statRows[1].innerHTML =
      `<i class="fa-solid fa-shield-halved" style="color: #10b981;"></i> ${t.shields}`;
  }

  document.getElementById("wheel-display").innerHTML =
    `<span>${t.spinText}</span>`;

  document.getElementById("spin-btn").textContent = t.spin;

  document.querySelector(".board-wrapper h2").textContent = t.boardTitle;

  const stages = document.querySelectorAll(".stage-label");
  if (stages.length >= 4) {
    stages[0].textContent = t.stage1;
    stages[1].textContent = t.stage2;
    stages[2].textContent = t.stage3;
    stages[3].textContent = t.stage4;
  }

  document.querySelector(".bifurcation-box h4").innerHTML =
    `<i class="fa-solid fa-code-fork"></i> ${t.forkTitle}`;

  const pathButtons = document.querySelectorAll(".btn-path");

  if (pathButtons.length >= 2) {
    pathButtons[0].innerHTML =
      `<strong>${t.verifier}</strong><br><small>${t.verifierSmall}</small>`;

    pathButtons[1].innerHTML =
      `<strong>${t.fast}</strong><br><small>${t.fastSmall}</small>`;
  }

  // Laboratory
  document.querySelector("#page-lab h2").innerHTML =
    `<i class="fa-solid fa-flask"></i> ${t.labTitle}`;

  document.querySelector("#page-lab > .lab-container > p").textContent =
    t.labDescription;

  const labButtons = document.querySelectorAll(".lab-buttons button");

  if (labButtons.length >= 3) {
    labButtons[0].innerHTML =
      `<i class="fa-solid fa-robot"></i> ${t.scanAI}`;

    labButtons[1].innerHTML =
      `<i class="fa-solid fa-link"></i> ${t.source}`;

    labButtons[2].innerHTML =
      `<i class="fa-solid fa-file-code"></i> ${t.metadata}`;
  }

  document.getElementById("lab-output").textContent = t.labOutput;

  // Leaderboard
  document.querySelector("#page-leaderboard h2").innerHTML =
    `<i class="fa-solid fa-trophy"></i> ${t.rankingTitle}`;

  const headers = document.querySelectorAll("#page-leaderboard th");

  if (headers.length >= 4) {
    headers[0].textContent = t.position;
    headers[1].textContent = t.agent;
    headers[2].textContent = t.trustedFollowers;
    headers[3].textContent = t.avoidedViral;
  }

  // Modal
  document.querySelector("#minigame-clickbait h3").innerHTML =
    `<i class="fa-solid fa-newspaper"></i> ${t.challenge}`;

  document.querySelector("#minigame-clickbait .slider-box label").textContent =
    t.slider;

  const modalButtons = document.querySelectorAll("#interactive-modal .modal-footer button");

  if (modalButtons.length >= 2) {
    modalButtons[0].textContent = t.shield;
    modalButtons[1].textContent = t.close;
  }

  document.querySelector("#minigame-clickbait .btn-secondary").textContent =
    t.readArticle;

  document.querySelector("#minigame-clickbait .btn-primary").textContent =
    t.confirm;

  // Cambia también el idioma del documento
  document.documentElement.lang = lang;
}
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
