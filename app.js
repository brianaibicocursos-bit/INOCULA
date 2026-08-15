// ==========================================
// INOCULA · APP.JS
// ==========================================

// NAVEGACIÓN
function navigateTo(pageId) {
  document.querySelectorAll('.page-view').forEach(p => {
    p.classList.add('hidden');
  });

  document.querySelectorAll('.nav-btn').forEach(b => {
    b.classList.remove('active');
  });

  document.getElementById(pageId).classList.remove('hidden');
}


// ==========================================
// ESTADO DEL JUEGO
// ==========================================

let viralLoad = 15;
let followers = 100;
let shields = 1;

let currentNews = null;


// ==========================================
// 50 NOTICIAS
// ==========================================

const fakeNews = [

  {
    headline: "🚨 ¡Tomar agua con limón elimina todas las toxinas del cuerpo!",
    article: "El agua con limón puede formar parte de una alimentación saludable, pero el hígado y los riñones son los principales órganos encargados de eliminar sustancias de desecho.",
    exaggerated: true
  },

  {
    headline: "🧠 Las neuronas utilizan señales eléctricas y químicas para comunicarse.",
    article: "Las neuronas utilizan señales eléctricas y químicas para transmitir información dentro del sistema nervioso.",
    exaggerated: false
  },

  {
    headline: "🚨 ¡Instagram puede leer tus pensamientos!",
    article: "Las aplicaciones pueden recopilar información sobre actividad, intereses e interacciones, pero no pueden leer directamente los pensamientos de una persona.",
    exaggerated: true
  },

  {
    headline: "🦠 Lavarse las manos ayuda a reducir la transmisión de microorganismos.",
    article: "La higiene adecuada de manos puede ayudar a reducir la transmisión de diferentes microorganismos.",
    exaggerated: false
  },

  {
    headline: "🚨 ¡La inteligencia artificial nunca se equivoca!",
    article: "Los sistemas de inteligencia artificial pueden producir información incorrecta y necesitan ser verificados.",
    exaggerated: true
  },

  {
    headline: "🌳 Los árboles absorben dióxido de carbono durante la fotosíntesis.",
    article: "Las plantas utilizan dióxido de carbono durante la fotosíntesis para producir energía.",
    exaggerated: false
  },

  {
    headline: "🚨 ¡Plantar un solo árbol resolverá el cambio climático!",
    article: "Los árboles pueden ayudar a capturar carbono, pero combatir el cambio climático requiere muchas acciones diferentes.",
    exaggerated: true
  },

  {
    headline: "📱 Algunas aplicaciones pueden solicitar acceso a tu ubicación.",
    article: "Algunas aplicaciones solicitan permisos de ubicación para proporcionar determinadas funciones.",
    exaggerated: false
  },

  {
    headline: "🚨 ¡Si una publicación tiene millones de likes, definitivamente es verdadera!",
    article: "La cantidad de interacciones de una publicación no demuestra que la información sea verdadera.",
    exaggerated: true
  },

  {
    headline: "🔎 Comparar varias fuentes puede ayudar a detectar información falsa.",
    article: "Contrastar información entre diferentes fuentes confiables puede ayudar a identificar errores e inconsistencias.",
    exaggerated: false
  },

  {
    headline: "🚨 ¡Comer chocolate antes de dormir te permite memorizar cualquier cosa!",
    article: "No existe evidencia de que comer chocolate permita memorizar cualquier información de manera instantánea.",
    exaggerated: true
  },

  {
    headline: "💧 El agua es necesaria para mantener diferentes funciones del organismo.",
    article: "El agua participa en múltiples procesos del cuerpo y es necesaria para mantener una hidratación adecuada.",
    exaggerated: false
  },

  {
    headline: "🚨 ¡Dormir solamente dos horas al día aumenta tu inteligencia!",
    article: "Dormir muy poco puede afectar la atención, la memoria y el rendimiento.",
    exaggerated: true
  },

  {
    headline: "📚 Dormir adecuadamente puede favorecer la memoria y el aprendizaje.",
    article: "El sueño participa en procesos relacionados con la memoria y el aprendizaje.",
    exaggerated: false
  },

  {
    headline: "🚨 ¡Los teléfonos celulares pueden cocinar un huevo con su radiación!",
    article: "La radiación de un teléfono celular no funciona como un horno convencional para cocinar alimentos.",
    exaggerated: true
  },

  {
    headline: "☀️ La exposición excesiva al sol puede dañar la piel.",
    article: "La radiación ultravioleta puede producir daños en la piel, especialmente con una exposición excesiva.",
    exaggerated: false
  },

  {
    headline: "🚨 ¡Usar protector solar una vez te protege durante todo el año!",
    article: "El protector solar necesita aplicarse de acuerdo con las indicaciones del producto y las condiciones de exposición.",
    exaggerated: true
  },

  {
    headline: "🧼 El jabón ayuda a eliminar microorganismos de las manos.",
    article: "El lavado de manos con agua y jabón ayuda a eliminar suciedad y microorganismos.",
    exaggerated: false
  },

  {
    headline: "🚨 ¡Beber café hace que nunca necesites dormir!",
    article: "La cafeína puede aumentar temporalmente el estado de alerta, pero no sustituye las necesidades normales de sueño.",
    exaggerated: true
  },

  {
    headline: "☕ La cafeína puede aumentar temporalmente el estado de alerta.",
    article: "La cafeína puede producir temporalmente mayor sensación de alerta y reducir la somnolencia.",
    exaggerated: false
  },

  {
    headline: "🚨 ¡Las vacunas modifican permanentemente el ADN de todas las personas!",
    article: "Las vacunas no modifican permanentemente el ADN humano de la manera descrita en esta afirmación.",
    exaggerated: true
  },

  {
    headline: "💉 Las vacunas entrenan al sistema inmunitario para reconocer determinados agentes.",
    article: "Las vacunas ayudan al sistema inmunitario a desarrollar una respuesta frente a determinados agentes infecciosos.",
    exaggerated: false
  },

  {
    headline: "🚨 ¡Un imán debajo del celular mejora mágicamente la señal de internet!",
    article: "Colocar un imán debajo de un teléfono no garantiza una mejora mágica de la señal de internet.",
    exaggerated: true
  },

  {
    headline: "📡 La calidad de una conexión puede depender de diferentes factores.",
    article: "La calidad de una conexión puede verse afectada por distancia, obstáculos, infraestructura y otros factores.",
    exaggerated: false
  },

  {
    headline: "🚨 ¡Las plantas crecen diez veces más rápido si les hablas!",
    article: "No existe evidencia sólida que demuestre que hablarle a una planta haga que crezca diez veces más rápido.",
    exaggerated: true
  },

  {
    headline: "🌱 Las plantas necesitan luz para realizar la fotosíntesis.",
    article: "La luz es uno de los elementos necesarios para que las plantas realicen la fotosíntesis.",
    exaggerated: false
  },

  {
    headline: "🚨 ¡Comer zanahorias permite ver perfectamente en la oscuridad!",
    article: "Las zanahorias contienen vitamina A, importante para la visión, pero comerlas no permite ver perfectamente en la oscuridad.",
    exaggerated: true
  },

  {
    headline: "🥕 La vitamina A participa en funciones relacionadas con la visión.",
    article: "La vitamina A es importante para diferentes funciones del organismo, incluida la visión.",
    exaggerated: false
  },

  {
    headline: "🚨 ¡Todas las noticias que aparecen en internet son revisadas por expertos!",
    article: "En internet existen contenidos publicados sin revisión profesional o editorial.",
    exaggerated: true
  },

  {
    headline: "🌐 No toda la información publicada en internet ha sido verificada.",
    article: "Los usuarios deben evaluar la fuente, fecha y evidencia antes de confiar en una información.",
    exaggerated: false
  },

  {
    headline: "🚨 ¡Una foto real nunca puede ser utilizada para crear una noticia falsa!",
    article: "Una fotografía real puede utilizarse fuera de contexto o acompañarse de información falsa.",
    exaggerated: true
  },

  {
    headline: "📸 Una imagen real puede utilizarse fuera de contexto.",
    article: "Las imágenes pueden ser reales pero estar acompañadas de una descripción falsa o relacionada con otro evento.",
    exaggerated: false
  },

  {
    headline: "🚨 ¡Si lo dice un influencer famoso, automáticamente es información científica!",
    article: "La popularidad de una persona no convierte automáticamente sus afirmaciones en evidencia científica.",
    exaggerated: true
  },

  {
    headline: "🔬 La evidencia científica debe evaluarse independientemente de quién la publique.",
    article: "La calidad de una afirmación científica depende de la evidencia disponible y de cómo fue obtenida.",
    exaggerated: false
  },

  {
    headline: "🚨 ¡Los deepfakes son imposibles de detectar!",
    article: "Algunos contenidos manipulados pueden ser difíciles de identificar, pero existen señales y herramientas que pueden ayudar.",
    exaggerated: true
  },

  {
    headline: "🤖 Algunas herramientas pueden ayudar a identificar contenido generado o manipulado con IA.",
    article: "Existen herramientas y métodos que pueden ayudar a analizar contenidos potencialmente generados o manipulados.",
    exaggerated: false
  },

  {
    headline: "🚨 ¡Una noticia escrita con palabras complicadas siempre es más confiable!",
    article: "El uso de lenguaje complicado no demuestra que una información sea verdadera.",
    exaggerated: true
  },

  {
    headline: "📰 La confiabilidad de una noticia depende de su evidencia y sus fuentes.",
    article: "Para evaluar una noticia es importante revisar sus fuentes, evidencia, fecha y contexto.",
    exaggerated: false
  },

  {
    headline: "🚨 ¡Si una noticia aparece primero en Google, significa que es verdadera!",
    article: "La posición de una página en un buscador no garantiza que toda la información sea verdadera.",
    exaggerated: true
  },

  {
    headline: "🔍 Es recomendable revisar la fuente original de una información.",
    article: "Consultar la fuente original puede ayudar a comprender mejor el contexto de una afirmación.",
    exaggerated: false
  },

  {
    headline: "🚨 ¡Una noticia viral no necesita fuentes!",
    article: "La viralidad de una publicación no sustituye la necesidad de contar con fuentes confiables.",
    exaggerated: true
  },

  {
    headline: "📖 Revisar la fecha de publicación puede ayudar a entender una noticia.",
    article: "La fecha puede ser importante porque una información antigua puede compartirse como si fuera reciente.",
    exaggerated: false
  },

  {
    headline: "🚨 ¡Si una captura de pantalla tiene muchos detalles, entonces es auténtica!",
    article: "Una captura de pantalla puede editarse y no demuestra por sí misma que la información sea auténtica.",
    exaggerated: true
  },

  {
    headline: "🖼️ Las imágenes y capturas de pantalla también pueden editarse.",
    article: "Una imagen digital puede modificarse, por lo que es recomendable comprobar su origen.",
    exaggerated: false
  },

  {
    headline: "🚨 ¡Un titular impactante demuestra que la noticia es importante!",
    article: "Un titular diseñado para provocar una reacción emocional no demuestra por sí mismo la importancia o veracidad de una noticia.",
    exaggerated: true
  },

  {
    headline: "🧠 Los titulares pueden utilizar lenguaje emocional para llamar la atención.",
    article: "Algunos titulares utilizan lenguaje emocional para aumentar el interés de los lectores.",
    exaggerated: false
  },

  {
    headline: "🚨 ¡Si una persona comparte una noticia muchas veces, la información se vuelve verdadera!",
    article: "Compartir repetidamente una información no cambia si la afirmación es verdadera o falsa.",
    exaggerated: true
  },

  {
    headline: "🔗 Revisar quién publicó originalmente una información puede ayudar a verificarla.",
    article: "Identificar al autor o fuente original es una estrategia útil para evaluar información digital.",
    exaggerated: false
  },

  {
    headline: "🚨 ¡Todas las cuentas verificadas publican información verdadera!",
    article: "Una cuenta verificada no significa que absolutamente todo lo que publique sea correcto.",
    exaggerated: true
  },

  {
    headline: "✅ Una cuenta verificada no garantiza que cada publicación sea correcta.",
    article: "Incluso cuentas verificadas pueden publicar errores, opiniones o información que necesita ser comprobada.",
    exaggerated: false
  }

];


// ==========================================
// GIRAR RUEDA
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
// ABRIR NOTICIA ALEATORIA
// ==========================================

function openMinigame(type) {

  const modal = document.getElementById('interactive-modal');

  modal.classList.remove('hidden');

  document.querySelectorAll('.minigame-view').forEach(m => {
    m.classList.add('hidden');
  });

  if (type === 'clickbait') {

    // ELEGIR UNA NOTICIA ALEATORIA
    const randomIndex = Math.floor(Math.random() * fakeNews.length);

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

    // Ocultar artículo hasta que pulsen "Leer nota"
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

  if (!currentNews) return;

  const val = Number(
    document.getElementById('clickbait-slider').value
  );

  if (currentNews.exaggerated) {

    if (val > 50) {

      alert(
        "¡Excelente! Detectaste que el titular exageraba la nota."
      );

      followers += 25;

    } else {

      alert(
        "¡Cuidado! El titular exageraba la información."
      );

      viralLoad += 10;
    }

  } else {

    if (val <= 50) {

      alert(
        "¡Excelente! Detectaste que el titular representa correctamente la nota."
      );

      followers += 25;

    } else {

      alert(
        "¡Cuidado! El titular sí representaba correctamente la información."
      );

      viralLoad += 10;
    }
  }

  updateHUD();
  closeModal();
}


// ==========================================
// CAMINO DEL TABLERO
// ==========================================

function choosePath(path) {

  if (path === 'verifier') {

    shields++;

    alert(
      "Tomaste el Camino Verificador: Ganas +1 Escudo."
    );

  } else {

    followers += 30;
    viralLoad += 10;

    alert(
      "Tomaste el Camino Rápido: Ganas +30 Seguidores pero sube la Carga Viral."
    );
  }

  updateHUD();
}


// ==========================================
// LABORATORIO
// ==========================================

function runLabTool(tool) {

  const output = document.getElementById('lab-output');

  if (tool === 'ia') {

    output.innerText =
      "🤖 Análisis de IA: Inconsistencias visuales detectadas (92% Probabilidad de IA).";

  }

  if (tool === 'source') {

    output.innerText =
      "🔗 Búsqueda de Fuente: No existe ningún registro oficial de esta noticia.";

  }

  if (tool === 'meta') {

    output.innerText =
      "📄 Metadatos: Archivo modificado por última vez en 2019.";

  }
}


// ==========================================
// ACTUALIZAR HUD
// ==========================================

function updateHUD() {

  document.getElementById('followers-count').innerText =
    followers;

  document.getElementById('shields-count').innerText =
    shields;

  document.getElementById('viral-meter').style.width =
    `${viralLoad}%`;

  document.getElementById('viral-text').innerText =
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

  // IMPORTANTE:
  // Aquí dejamos tu sistema de idiomas actual.
  // Si ya funciona, NO necesitas modificarlo.

  document.documentElement.lang = lang;

}
