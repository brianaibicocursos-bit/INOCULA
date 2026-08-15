<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <title>INOCULA · Digital Life Game</title>

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&family=Space+Grotesk:wght@500;700&display=swap" rel="stylesheet">

  <link rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">

  <link rel="stylesheet" href="styles.css">
</head>

<body>

<!-- ================= NAVBAR ================= -->

<nav class="navbar">

  <div class="logo" onclick="navigateTo('page-home')">
    <div class="logo-icon">
      <i class="fa-solid fa-shield-virus"></i>
    </div>

    <span>INOCULA</span>
  </div>

  <div class="nav-links">

    <button class="nav-btn active" onclick="navigateTo('page-home')">
      <i class="fa-solid fa-house"></i>
      <span data-i18n="navHome">Inicio</span>
    </button>

    <button class="nav-btn" onclick="navigateTo('page-game')">
      <i class="fa-solid fa-gamepad"></i>
      <span data-i18n="navGame">Tablero</span>
    </button>

    <button class="nav-btn" onclick="navigateTo('page-lab')">
      <i class="fa-solid fa-flask"></i>
      <span data-i18n="navLab">Laboratorio</span>
    </button>

    <button class="nav-btn" onclick="navigateTo('page-leaderboard')">
      <i class="fa-solid fa-trophy"></i>
      <span data-i18n="navRanking">Ranking</span>
    </button>

  </div>

  <div class="nav-controls">

    <div class="lang-selector">

      <i class="fa-solid fa-globe"></i>

      <select id="lang-select" onchange="changeLanguage(this.value)">
        <option value="es">🇪🇸 Español</option>
        <option value="en">🇺🇸 English</option>
        <option value="zh">🇨🇳 中文</option>
      </select>

    </div>

    <div class="hackathon-badge">
      UNESCO Youth 2026
    </div>

  </div>

</nav>


<!-- ================= HOME ================= -->

<section id="page-home" class="page-view active">

  <div class="hero">

    <div class="floating-icon icon-1">📰</div>
    <div class="floating-icon icon-2">🛡️</div>
    <div class="floating-icon icon-3">🔎</div>
    <div class="floating-icon icon-4">🤖</div>

    <span class="pill-tag">
      <i class="fa-solid fa-sparkles"></i>
      <span data-i18n="heroTag">UNESCO Youth Hackathon 2026</span>
    </span>

    <h1 data-i18n="heroTitle">
      Antes de creer,
      <span class="gradient-text">inocúlate.</span>
    </h1>

    <p class="hero-subtext" data-i18n="heroText">
      El tablero de vida digital que te entrena para detectar fake news,
      deepfakes y manipulación en tu día a día digital.
    </p>

    <div class="hero-buttons">

      <button class="btn-primary" onclick="navigateTo('page-game')">
        <i class="fa-solid fa-play"></i>
        <span data-i18n="enterBoard">Entrar al Tablero</span>
      </button>

      <button class="btn-secondary" onclick="navigateTo('page-lab')">
        <i class="fa-solid fa-microscope"></i>
        <span data-i18n="tryTools">Probar Herramientas</span>
      </button>

    </div>


    <div class="hero-stats">

      <div class="stat-card">
        <div class="stat-icon">🎮</div>
        <h2>4</h2>
        <p data-i18n="dayStages">Etapas del Día</p>
      </div>

      <div class="stat-card">
        <div class="stat-icon">🌎</div>
        <h2>3</h2>
        <p data-i18n="languages">Idiomas</p>
      </div>

      <div class="stat-card">
        <div class="stat-icon">🦠</div>
        <h2>0%</h2>
        <p data-i18n="viralGoal">Carga Viral Meta</p>
      </div>

    </div>

  </div>

</section>


<!-- ================= GAME ================= -->

<section id="page-game" class="page-view hidden">

  <main class="game-layout">

    <!-- STATUS -->

    <aside class="status-panel">

      <!-- VIRAL -->

      <div class="status-card viral-card">

        <div class="card-title">
          <span class="big-icon">🦠</span>

          <div>
            <h3 data-i18n="publicViral">
              Carga Viral Pública
            </h3>

            <small data-i18n="viralRisk">
              Nivel de riesgo
            </small>
          </div>
        </div>

        <div class="viral-number">
          <span id="viral-number">15</span>%
        </div>

        <div class="progress-bar">
          <div id="viral-meter"
               class="progress-fill"
               style="width:15%;">
          </div>
        </div>

        <p id="viral-text">
          15% - Virus bajo control
        </p>

      </div>


      <!-- PROFILE -->

      <div class="status-card">

        <div class="card-title">
          <span class="big-icon">👤</span>

          <div>
            <h3 data-i18n="digitalProfile">
              Perfil Digital
            </h3>

            <small data-i18n="yourStats">
              Tus estadísticas
            </small>
          </div>
        </div>


        <div class="game-stat">
          <span>
            👥
            <span data-i18n="followers">
              Seguidores
            </span>
          </span>

          <strong id="followers-count">
            100
          </strong>
        </div>


        <div class="game-stat">
          <span>
            🛡️
            <span data-i18n="shields">
              Escudos
            </span>
          </span>

          <strong id="shields-count">
            1
          </strong>
        </div>

      </div>


      <!-- WHEEL -->

      <div class="status-card wheel-card">

        <div class="card-title">
          <span class="big-icon">🎡</span>

          <div>
            <h3 data-i18n="digitalWheel">
              Rueda Digital
            </h3>

            <small data-i18n="spinToPlay">
              Gira para jugar
            </small>
          </div>
        </div>


        <div id="wheel-display" class="wheel-box">
          <div class="wheel-circle">
            🎯
          </div>

          <span data-i18n="spinWheel">
            Gira la Rueda
          </span>
        </div>


        <button id="spin-btn"
                class="btn-spin"
                onclick="spinWheel()">

          🎡
          <span data-i18n="spin">
            GIRAR RUEDA
          </span>

        </button>

      </div>

    </aside>


    <!-- BOARD -->

    <section class="board-wrapper">

      <div class="board-heading">

        <div>
          <span class="section-kicker">
            🧬 INOCULA GAME
          </span>

          <h2 data-i18n="boardTitle">
            Tu Navegación Diaria
          </h2>

          <p data-i18n="boardDescription">
            Cada decisión cambia tu nivel de protección.
          </p>
        </div>

        <div class="level-badge">
          ⭐ LEVEL 01
        </div>

      </div>


      <div class="path-container">

        <!-- MORNING -->

        <div class="day-stage stage-morning">

          <span class="stage-label">
            🌅
            <span data-i18n="stage1">
              Etapa 1: Despertar & Feed Matutino
            </span>
          </span>

          <div class="stage-tiles">

            <div class="game-tile">📱</div>
            <div class="game-tile">☕</div>
            <div class="game-tile warning">⚠️</div>
            <div class="game-tile">🔎</div>

          </div>

        </div>


        <!-- FORK -->

        <div class="bifurcation-box">

          <div class="fork-icon">
            🔀
          </div>

          <h4 data-i18n="forkTitle">
            ¡Punto de Bifurcación!
          </h4>

          <p data-i18n="forkDescription">
            Elige cómo quieres continuar.
          </p>

          <div class="bifurcation-options">

            <button class="btn-path path-verifier"
                    onclick="choosePath('verifier')">

              <span class="path-emoji">🛡️</span>

              <strong data-i18n="verifier">
                Camino Verificador
              </strong>

              <small data-i18n="verifierSmall">
                Más lento, gana Escudos
              </small>

            </button>


            <button class="btn-path path-fast"
                    onclick="choosePath('fast')">

              <span class="path-emoji">⚡</span>

              <strong data-i18n="fast">
                Camino Rápido
              </strong>

              <small data-i18n="fastSmall">
                Avanzas rápido, asumes riesgo
              </small>

            </button>

          </div>

        </div>


        <!-- WORK -->

        <div class="day-stage stage-work">

          <span class="stage-label">
            💻
            <span data-i18n="stage2">
              Etapa 2: Trabajo / Escuela & Chats
            </span>
          </span>

          <div class="stage-tiles">

            <div class="game-tile">💬</div>
            <div class="game-tile">📚</div>
            <div class="game-tile warning">🚨</div>
            <div class="game-tile">🛡️</div>

          </div>

        </div>


        <!-- AFTERNOON -->

        <div class="day-stage stage-afternoon">

          <span class="stage-label">
            🌇
            <span data-i18n="stage3">
              Etapa 3: Tarde, Noticias & Redes
            </span>
          </span>

          <div class="stage-tiles">

            <div class="game-tile">📰</div>
            <div class="game-tile">📲</div>
            <div class="game-tile warning">🔥</div>
            <div class="game-tile">🔍</div>

          </div>

        </div>


        <!-- NIGHT -->

        <div class="day-stage stage-night">

          <span class="stage-label">
            🌙
            <span data-i18n="stage4">
              Etapa 4: Noche, Viral & Retiro Digital
            </span>
          </span>

          <div class="stage-tiles">

            <div class="game-tile">🌙</div>
            <div class="game-tile">📵</div>
            <div class="game-tile">🧠</div>
            <div class="game-tile">🏆</div>

          </div>

        </div>

      </div>

    </section>

  </main>

</section>


<!-- ================= LAB ================= -->

<section id="page-lab" class="page-view hidden">

  <div class="lab-container">

    <span class="section-kicker">
      🧪 INOCULA LAB
    </span>

    <h2>
      <i class="fa-solid fa-flask"></i>
      <span data-i18n="labTitle">
        Laboratorio de Verificación
      </span>
    </h2>

    <p data-i18n="labDescription">
      Analiza una noticia antes de compartirla.
    </p>


    <div class="lab-card">

      <div class="fake-post">

        <div class="post-header">

          <div class="avatar">
            📰
          </div>

          <div>
            <strong>ViralNews_99</strong>
            <small data-i18n="minutesAgo">
              hace 5 minutos
            </small>
          </div>

        </div>

        <h4 data-i18n="labFakeHeadline">
          🚨 NOTICIA TENDENCIA:
          "Descubren que las imágenes satelitales son falsas"
        </h4>

        <div class="post-stats">
          ❤️ 4.2K &nbsp; 🔁 1.8K &nbsp; 💬 392
        </div>

      </div>


      <div class="lab-buttons">

        <button class="btn-secondary"
                onclick="runLabTool('ia')">

          🤖
          <span data-i18n="scanAI">
            Escanear IA
          </span>

        </button>

        <button class="btn-secondary"
                onclick="runLabTool('source')">

          🔎
          <span data-i18n="source">
            Buscar Fuente Original
          </span>

        </button>

        <button class="btn-secondary"
                onclick="runLabTool('meta')">

          📄
          <span data-i18n="metadata">
            Revisar Metadatos
          </span>

        </button>

      </div>


      <div id="lab-output"
           class="lab-output-box"
           data-i18n="labOutput">

        Selecciona una herramienta para inspeccionar el contenido.

      </div>

    </div>

  </div>

</section>


<!-- ================= RANKING ================= -->

<section id="page-leaderboard" class="page-view hidden">

  <div class="leaderboard-container">

    <span class="section-kicker">
      🏆 INOCULA CHAMPIONS
    </span>

    <h2>
      <i class="fa-solid fa-trophy"></i>
      <span data-i18n="rankingTitle">
        Agentes INOCULA Destacados
      </span>
    </h2>


    <div class="podium">

      <div class="podium-card second">
        🥈
        <strong>FactChecker_Kendra</strong>
        <span>820 👥</span>
      </div>

      <div class="podium-card first">
        🥇
        <strong>Agente_Bree</strong>
        <span>950 👥</span>
      </div>

      <div class="podium-card third">
        🥉
        <strong>Cyber_Carolina</strong>
        <span>740 👥</span>
      </div>

    </div>


    <div class="table-card">

      <table>

        <thead>

          <tr>

            <th data-i18n="position">
              Posición
            </th>

            <th data-i18n="agent">
              Agente
            </th>

            <th data-i18n="trustedFollowers">
              Seguidores Confiables
            </th>

            <th data-i18n="avoidedViral">
              Carga Viral Evitada
            </th>

          </tr>

        </thead>

        <tbody>

          <tr>
            <td>🥇 #1</td>
            <td>Agente_Bree</td>
            <td>950</td>
            <td>-80%</td>
          </tr>

          <tr>
            <td>🥈 #2</td>
            <td>FactChecker_Kendra</td>
            <td>820</td>
            <td>-65%</td>
          </tr>

          <tr>
            <td>🥉 #3</td>
            <td>Cyber_Carolina</td>
            <td>740</td>
            <td>-50%</td>
          </tr>

        </tbody>

      </table>

    </div>

  </div>

</section>


<!-- ================= MODAL ================= -->

<div id="interactive-modal"
     class="modal-overlay hidden">

  <div class="modal-card">

    <div id="minigame-clickbait"
         class="minigame-view hidden">

      <div class="news-badge">
        🚨 BREAKING NEWS
      </div>

      <div class="news-card">

        <div class="news-source">
          <div class="avatar">📰</div>

          <div>
            <strong>ViralNews</strong>
            <small data-i18n="newsSource">
              Publicación viral
            </small>
          </div>
        </div>


        <h3>
          <i class="fa-solid fa-newspaper"></i>
          <span data-i18n="challenge">
            Reto: Titular vs Nota
          </span>
        </h3>


        <p class="headline">
          🚨 ¡Esta noticia es increíble!
        </p>


        <button class="btn-secondary article-button"
                onclick="toggleArticleBody()">

          📄
          <span data-i18n="readArticle">
            Leer nota completa
          </span>

        </button>


        <div id="article-body"
             class="article-text hidden">
        </div>


        <div class="slider-box">

          <label data-i18n="slider">
            ¿El titular representa la nota o exagera?
          </label>

          <div class="slider-labels">
            <span>🤔</span>
            <span>🎯</span>
          </div>

          <input type="range"
                 id="clickbait-slider"
                 min="0"
                 max="100"
                 value="50">

        </div>


        <button class="btn-primary"
                onclick="checkClickbait()">

          <i class="fa-solid fa-check"></i>

          <span data-i18n="confirm">
            Confirmar Evaluación
          </span>

        </button>

      </div>

    </div>


    <div class="modal-footer">

      <button class="btn-secondary"
              onclick="useShield()">

        🛡️
        <span data-i18n="shield">
          Usar Escudo para Saltar
        </span>

      </button>

      <button class="btn-danger"
              onclick="closeModal()">

        ✕
        <span data-i18n="close">
          Cerrar
        </span>

      </button>

    </div>

  </div>

</div>


<script src="app.js"></script>

</body>
</html>
