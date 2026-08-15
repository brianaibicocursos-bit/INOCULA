// ======================================================
// INOCULA · APP.JS
// Sistema completo de navegación, idiomas y minijuegos
// ======================================================


// ======================================================
// 1. NAVEGACIÓN
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

  // Activar botón correspondiente
  const buttons = document.querySelectorAll(".nav-btn");

  buttons.forEach(button => {

    const onclickText = button.getAttribute("onclick") || "";

    if (onclickText.includes(pageId)) {
      button.classList.add("active");
    }

  });
}


// ======================================================
// 2. ESTADO DEL JUEGO
// ======================================================

let viralLoad = 15;
let followers = 100;
let shields = 1;

let currentNews = null;
let currentNewsIndex = 0;


// ======================================================
// 3. IDIOMA ACTUAL
// ======================================================

let currentLanguage = "es";


// ======================================================
// 4. 50 NOTICIAS
// ======================================================

const fakeNews = [

  // --------------------------------------------------
  // 1
  // --------------------------------------------------

  {
    es: {
      headline: "🚨 ¡Tomar agua con limón elimina todas las toxinas del cuerpo!",
      article: "El agua con limón puede formar parte de una alimentación saludable, pero el cuerpo ya cuenta con órganos como el hígado y los riñones para eliminar sustancias de desecho."
    },

    en: {
      headline: "🚨 Drinking lemon water removes ALL toxins from your body!",
      article: "Lemon water can be part of a healthy diet, but organs such as the liver and kidneys already remove waste products from the body."
    },

    zh: {
      headline: "🚨 喝柠檬水可以清除体内所有毒素！",
      article: "柠檬水可以成为健康饮食的一部分，但人体已经通过肝脏和肾脏等器官清除废物。"
    },

    exaggerated: true
  },


  // --------------------------------------------------
  // 2
  // --------------------------------------------------

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
      article: "神经元利用电信号和化学信号传递信息。"
    },

    exaggerated: false
  },


  // --------------------------------------------------
  // 3
  // --------------------------------------------------

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
      article: "平台可以收集活动、兴趣和互动信息，但这并不意味着它们可以直接读取人的思想。"
    },

    exaggerated: true
  },


  // --------------------------------------------------
  // 4
  // --------------------------------------------------

  {
    es: {
      headline: "🦠 ¡Lavarse las manos ayuda a prevenir enfermedades!",
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


  // --------------------------------------------------
  // 5
  // --------------------------------------------------

  {
    es: {
      headline: "🚨 ¡La inteligencia artificial nunca se equivoca!",
      article: "Los sistemas de inteligencia artificial pueden producir respuestas incorrectas o información inventada y necesitan verificación."
    },

    en: {
      headline: "🚨 Artificial intelligence NEVER makes mistakes!",
      article: "Artificial intelligence systems can produce incorrect answers or fabricated information and should be verified."
    },

    zh: {
      headline: "🚨 人工智能永远不会犯错！",
      article: "人工智能系统可能产生错误答案或虚假信息，因此需要进行验证。"
    },

    exaggerated: true
  },


  // --------------------------------------------------
  // 6
  // --------------------------------------------------

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
      headline: "🌳 树木有助于吸收二氧化碳！",
      article: "植物在光合作用过程中会吸收二氧化碳。"
    },

    exaggerated: false
  },


  // --------------------------------------------------
  // 7
  // --------------------------------------------------

  {
    es: {
      headline: "🚨 ¡Plantar un solo árbol resolverá el cambio climático!",
      article: "Los árboles ayudan al ambiente, pero resolver el cambio climático requiere múltiples acciones."
    },

    en: {
      headline: "🚨 Planting ONE tree will solve climate change!",
      article: "Trees can benefit the environment, but addressing climate change requires many different actions."
    },

    zh: {
      headline: "🚨 种一棵树就能解决气候变化！",
      article: "树木有益于环境，但解决气候变化需要多种不同的行动。"
    },

    exaggerated: true
  },


  // --------------------------------------------------
  // 8
  // --------------------------------------------------

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
      article: "一些应用程序可能会请求位置权限，以提供某些功能。"
    },

    exaggerated: false
  },


  // --------------------------------------------------
  // 9
  // --------------------------------------------------

  {
    es: {
      headline: "🚨 ¡Una noticia con millones de likes definitivamente es verdadera!",
      article: "La popularidad de una publicación no demuestra que la información sea cierta."
    },

    en: {
      headline: "🚨 A post with millions of likes is definitely true!",
      article: "The popularity of a post does not prove that its information is true."
    },

    zh: {
      headline: "🚨 拥有数百万点赞的新闻一定是真的！",
      article: "帖子的受欢迎程度并不能证明其中的信息是真实的。"
    },

    exaggerated: true
  },


  // --------------------------------------------------
  // 10
  // --------------------------------------------------

  {
    es: {
      headline: "🔎 ¡Comparar varias fuentes ayuda a detectar información falsa!",
      article: "Contrastar diferentes fuentes confiables puede ayudar a identificar inconsistencias."
    },

    en: {
      headline: "🔎 Comparing multiple sources can help detect false information!",
      article: "Checking different reliable sources can help identify inconsistencies."
    },

    zh: {
      headline: "🔎 比较多个来源可以帮助发现虚假信息！",
      article: "对比不同的可靠来源可以帮助发现信息中的不一致。"
    },

    exaggerated: false
  },


  // --------------------------------------------------
  // 11
  // --------------------------------------------------

  {
    es: {
      headline: "🚨 ¡Dormir solo 2 horas te hace más productivo!",
      article: "Dormir muy poco puede afectar la atención, el estado de ánimo y otras funciones."
    },

    en: {
      headline: "🚨 Sleeping only 2 hours makes you more productive!",
      article: "Getting very little sleep can negatively affect attention, mood and other functions."
    },

    zh: {
      headline: "🚨 每天只睡两个小时会让你更有效率！",
      article: "睡眠不足可能影响注意力、情绪和其他身体功能。"
    },

    exaggerated: true
  },


  // --------------------------------------------------
  // 12
  // --------------------------------------------------

  {
    es: {
      headline: "☀️ ¡La luz solar es una fuente natural de energía!",
      article: "La radiación solar proporciona energía que puede aprovecharse mediante tecnologías como los paneles solares."
    },

    en: {
      headline: "☀️ Sunlight is a natural source of energy!",
      article: "Solar radiation provides energy that can be harnessed through technologies such as solar panels."
    },

    zh: {
      headline: "☀️ 阳光是一种天然能源！",
      article: "太阳辐射提供能量，可以通过太阳能电池板等技术加以利用。"
    },

    exaggerated: false
  },


  // --------------------------------------------------
  // 13
  // --------------------------------------------------

  {
    es: {
      headline: "🚨 ¡Los teléfonos explotan si los cargas durante toda la noche!",
      article: "Cargar un teléfono durante la noche no significa automáticamente que vaya a explotar, aunque usar cargadores dañados sí puede representar un riesgo."
    },

    en: {
      headline: "🚨 Phones explode if you charge them overnight!",
      article: "Charging a phone overnight does not automatically cause it to explode, although damaged chargers can present risks."
    },

    zh: {
      headline: "🚨 手机充电一整晚就会爆炸！",
      article: "手机整夜充电并不会自动导致爆炸，但损坏的充电器可能带来风险。"
    },

    exaggerated: true
  },


  // --------------------------------------------------
  // 14
  // --------------------------------------------------

  {
    es: {
      headline: "📚 ¡Leer puede ayudar a desarrollar habilidades cognitivas!",
      article: "La lectura frecuente puede contribuir al desarrollo del vocabulario y otras habilidades cognitivas."
    },

    en: {
      headline: "📚 Reading can help develop cognitive skills!",
      article: "Frequent reading can contribute to vocabulary development and other cognitive skills."
    },

    zh: {
      headline: "📚 阅读可以帮助发展认知能力！",
      article: "经常阅读有助于词汇发展和其他认知能力。"
    },

    exaggerated: false
  },


  // --------------------------------------------------
  // 15
  // --------------------------------------------------

  {
    es: {
      headline: "🚨 ¡Comer chocolate hace que nunca puedas dormir!",
      article: "El efecto del chocolate sobre el sueño depende de la cantidad y de factores individuales, como la sensibilidad a la cafeína."
    },

    en: {
      headline: "🚨 Eating chocolate means you will NEVER sleep!",
      article: "The effect of chocolate on sleep depends on the amount and individual factors such as caffeine sensitivity."
    },

    zh: {
      headline: "🚨 吃巧克力会让你永远睡不着！",
      article: "巧克力对睡眠的影响取决于摄入量以及个人对咖啡因的敏感程度。"
    },

    exaggerated: true
  },


  // --------------------------------------------------
  // 16
  // --------------------------------------------------

  {
    es: {
      headline: "💧 ¡Beber agua es importante para mantener una hidratación adecuada!",
      article: "El agua es necesaria para muchas funciones del organismo."
    },

    en: {
      headline: "💧 Drinking water is important for staying hydrated!",
      article: "Water is necessary for many functions of the body."
    },

    zh: {
      headline: "💧 喝水对于保持身体水分很重要！",
      article: "水对于人体的许多功能都是必要的。"
    },

    exaggerated: false
  },


  // --------------------------------------------------
  // 17
  // --------------------------------------------------

  {
    es: {
      headline: "🚨 ¡Las redes sociales saben exactamente lo que estás pensando!",
      article: "Los sistemas de recomendación utilizan datos sobre comportamiento e interacción, pero no pueden conocer literalmente todos tus pensamientos."
    },

    en: {
      headline: "🚨 Social media knows exactly what you're thinking!",
      article: "Recommendation systems use behavioral and interaction data, but they cannot literally know all of your thoughts."
    },

    zh: {
      headline: "🚨 社交媒体完全知道你在想什么！",
      article: "推荐系统会利用行为和互动数据，但它们并不能真正知道你的所有想法。"
    },

    exaggerated: true
  },


  // --------------------------------------------------
  // 18
  // --------------------------------------------------

  {
    es: {
      headline: "🔐 ¡Usar contraseñas diferentes puede mejorar la seguridad de tus cuentas!",
      article: "Utilizar contraseñas únicas reduce el impacto si una contraseña se filtra."
    },

    en: {
      headline: "🔐 Using different passwords can improve account security!",
      article: "Using unique passwords can reduce the impact if one password is exposed."
    },

    zh: {
      headline: "🔐 使用不同的密码可以提高账户安全性！",
      article: "使用独特的密码可以降低一个密码泄露后造成的影响。"
    },

    exaggerated: false
  },


  // --------------------------------------------------
  // 19
  // --------------------------------------------------

  {
    es: {
      headline: "🚨 ¡Las vacunas cambian permanentemente tu ADN!",
      article: "Las vacunas no modifican permanentemente el ADN humano."
    },

    en: {
      headline: "🚨 Vaccines permanently change your DNA!",
      article: "Vaccines do not permanently alter human DNA."
    },

    zh: {
      headline: "🚨 疫苗会永久改变你的 DNA！",
      article: "疫苗不会永久改变人类 DNA。"
    },

    exaggerated: true
  },


  // --------------------------------------------------
  // 20
  // --------------------------------------------------

  {
    es: {
      headline: "🧠 ¡Las neuronas pueden comunicarse mediante señales químicas!",
      article: "Las neuronas pueden comunicarse mediante neurotransmisores y otras señales químicas."
    },

    en: {
      headline: "🧠 Neurons can communicate through chemical signals!",
      article: "Neurons can communicate through neurotransmitters and other chemical signals."
    },

    zh: {
      headline: "🧠 神经元可以通过化学信号进行交流！",
      article: "神经元可以通过神经递质和其他化学信号进行交流。"
    },

    exaggerated: false
  },


  // --------------------------------------------------
  // 21
  // --------------------------------------------------

  {
    es: {
      headline: "🚨 ¡Las pantallas destruyen tus ojos inmediatamente!",
      article: "El uso prolongado de pantallas puede causar fatiga visual, pero no significa que destruya inmediatamente los ojos."
    },

    en: {
      headline: "🚨 Screens immediately destroy your eyes!",
      article: "Long periods of screen use can cause eye strain, but this does not mean screens immediately destroy your eyes."
    },

    zh: {
      headline: "🚨 屏幕会立即摧毁你的眼睛！",
      article: "长时间使用屏幕可能导致眼睛疲劳，但这并不意味着屏幕会立即损伤眼睛。"
    },

    exaggerated: true
  },


  // --------------------------------------------------
  // 22
  // --------------------------------------------------

  {
    es: {
      headline: "🌎 ¡La Tierra gira sobre su propio eje!",
      article: "La Tierra realiza una rotación alrededor de su eje."
    },

    en: {
      headline: "🌎 Earth rotates on its own axis!",
      article: "Earth rotates around its own axis."
    },

    zh: {
      headline: "🌎 地球会绕自己的轴旋转！",
      article: "地球会绕自己的轴进行自转。"
    },

    exaggerated: false
  },


  // --------------------------------------------------
  // 23
  // --------------------------------------------------

  {
    es: {
      headline: "🚨 ¡Los imanes pueden cargar cualquier teléfono sin electricidad!",
      article: "Los imanes por sí solos no pueden cargar cualquier teléfono."
    },

    en: {
      headline: "🚨 Magnets can charge any phone without electricity!",
      article: "Magnets alone cannot charge any phone."
    },

    zh: {
      headline: "🚨 磁铁可以在没有电的情况下给任何手机充电！",
      article: "磁铁本身无法给任何手机充电。"
    },

    exaggerated: true
  },


  // --------------------------------------------------
  // 24
  // --------------------------------------------------

  {
    es: {
      headline: "🌱 ¡Las plantas realizan fotosíntesis!",
      article: "Las plantas utilizan la luz para producir energía química mediante la fotosíntesis."
    },

    en: {
      headline: "🌱 Plants perform photosynthesis!",
      article: "Plants use light to produce chemical energy through photosynthesis."
    },

    zh: {
      headline: "🌱 植物会进行光合作用！",
      article: "植物利用光通过光合作用产生化学能。"
    },

    exaggerated: false
  },


  // --------------------------------------------------
  // 25
  // --------------------------------------------------

  {
    es: {
      headline: "🚨 ¡Beber café te convierte en un genio!",
      article: "La cafeína puede aumentar temporalmente el estado de alerta, pero no convierte a una persona en un genio."
    },

    en: {
      headline: "🚨 Drinking coffee turns you into a genius!",
      article: "Caffeine can temporarily increase alertness, but it does not turn someone into a genius."
    },

    zh: {
      headline: "🚨 喝咖啡会让你变成天才！",
      article: "咖啡因可以暂时提高警觉性，但不会让人成为天才。"
    },

    exaggerated: true
  },


  // --------------------------------------------------
  // 26
  // --------------------------------------------------

  {
    es: {
      headline: "📡 ¡El GPS utiliza señales de satélites!",
      article: "El sistema GPS utiliza señales de satélites para ayudar a determinar una ubicación."
    },

    en: {
      headline: "📡 GPS uses satellite signals!",
      article: "GPS uses signals from satellites to help determine a location."
    },

    zh: {
      headline: "📡 GPS 使用卫星信号！",
      article: "GPS 使用卫星发出的信号来帮助确定位置。"
    },

    exaggerated: false
  },


  // --------------------------------------------------
  // 27
  // --------------------------------------------------

  {
    es: {
      headline: "🚨 ¡Los audios de WhatsApp nunca pueden ser manipulados!",
      article: "Los archivos de audio pueden editarse y manipularse utilizando diferentes herramientas."
    },

    en: {
      headline: "🚨 WhatsApp voice messages can NEVER be manipulated!",
      article: "Audio files can be edited and manipulated using different tools."
    },

    zh: {
      headline: "🚨 WhatsApp 语音消息永远无法被篡改！",
      article: "音频文件可以使用不同的工具进行编辑和修改。"
    },

    exaggerated: true
  },


  // --------------------------------------------------
  // 28
  // --------------------------------------------------

  {
    es: {
      headline: "🔎 ¡Revisar la fecha de una publicación puede ayudar a verificarla!",
      article: "Comprobar cuándo fue publicada una información puede aportar contexto importante."
    },

    en: {
      headline: "🔎 Checking the date of a post can help verify it!",
      article: "Checking when information was published can provide important context."
    },

    zh: {
      headline: "🔎 检查帖子的日期可以帮助验证信息！",
      article: "查看信息的发布时间可以提供重要的背景。"
    },

    exaggerated: false
  },


  // --------------------------------------------------
  // 29
  // --------------------------------------------------

  {
    es: {
      headline: "🚨 ¡Una foto viral demuestra exactamente lo que ocurrió!",
      article: "Una fotografía puede estar fuera de contexto, editada o mostrar un momento diferente al que se afirma."
    },

    en: {
      headline: "🚨 A viral photo proves exactly what happened!",
      article: "A photograph can be taken out of context, edited, or show a different moment than claimed."
    },

    zh: {
      headline: "🚨 一张病毒式传播的照片可以证明事情的全部真相！",
      article: "照片可能脱离上下文、经过编辑，或者展示的是与所声称不同的时刻。"
    },

    exaggerated: true
  },


  // --------------------------------------------------
  // 30
  // --------------------------------------------------

  {
    es: {
      headline: "📰 ¡Los titulares pueden influir en cómo interpretamos una noticia!",
      article: "La forma en que se presenta una noticia puede influir en la interpretación del lector."
    },

    en: {
      headline: "📰 Headlines can influence how we interpret news!",
      article: "The way news is presented can influence how readers interpret it."
    },

    zh: {
      headline: "📰 新闻标题可能影响我们理解新闻的方式！",
      article: "新闻的呈现方式可能影响读者对信息的理解。"
    },

    exaggerated: false
  },


  // --------------------------------------------------
  // 31
  // --------------------------------------------------

  {
    es: {
      headline: "🚨 ¡Si lo dice un influencer, automáticamente es verdad!",
      article: "La popularidad o autoridad percibida de una persona no garantiza que toda la información que comparte sea correcta."
    },

    en: {
      headline: "🚨 If an influencer says it, it is automatically true!",
      article: "A person's popularity or perceived authority does not guarantee that everything they share is correct."
    },

    zh: {
      headline: "🚨 如果网红说了，那就一定是真的！",
      article: "一个人的知名度或影响力并不能保证他们分享的所有信息都是正确的。"
    },

    exaggerated: true
  },


  // --------------------------------------------------
  // 32
  // --------------------------------------------------

  {
    es: {
      headline: "🧪 ¡Los experimentos científicos necesitan métodos y evidencia!",
      article: "La investigación científica utiliza métodos y evidencia para evaluar hipótesis."
    },

    en: {
      headline: "🧪 Scientific experiments require methods and evidence!",
      article: "Scientific research uses methods and evidence to evaluate hypotheses."
    },

    zh: {
      headline: "🧪 科学实验需要方法和证据！",
      article: "科学研究利用方法和证据来评估假设。"
    },

    exaggerated: false
  },


  // --------------------------------------------------
  // 33
  // --------------------------------------------------

  {
    es: {
      headline: "🚨 ¡Una captura de pantalla nunca puede ser falsa!",
      article: "Las capturas de pantalla pueden editarse o manipularse."
    },

    en: {
      headline: "🚨 A screenshot can NEVER be fake!",
      article: "Screenshots can be edited or manipulated."
    },

    zh: {
      headline: "🚨 截图永远不可能是假的！",
      article: "截图可以被编辑或修改。"
    },

    exaggerated: true
  },


  // --------------------------------------------------
  // 34
  // --------------------------------------------------

  {
    es: {
      headline: "🔐 ¡La autenticación de dos factores añade una capa de seguridad!",
      article: "La autenticación de dos factores puede proporcionar una capa adicional de protección para una cuenta."
    },

    en: {
      headline: "🔐 Two-factor authentication adds a layer of security!",
      article: "Two-factor authentication can provide an additional layer of account protection."
    },

    zh: {
      headline: "🔐 双重身份验证可以增加一层安全保护！",
      article: "双重身份验证可以为账户提供额外的保护。"
    },

    exaggerated: false
  },


  // --------------------------------------------------
  // 35
  // --------------------------------------------------

  {
    es: {
      headline: "🚨 ¡Borrar una publicación de internet hace que desaparezca para siempre!",
      article: "Una publicación puede haber sido copiada, archivada o compartida antes de ser eliminada."
    },

    en: {
      headline: "🚨 Deleting an online post makes it disappear forever!",
      article: "A post may have been copied, archived, or shared before being deleted."
    },

    zh: {
      headline: "🚨 删除网络帖子后，它就会永远消失！",
      article: "帖子在删除之前可能已经被复制、存档或分享。"
    },

    exaggerated: true
  },


  // --------------------------------------------------
  // 36
  // --------------------------------------------------

  {
    es: {
      headline: "📖 ¡Las fuentes originales pueden ayudar a comprobar una afirmación!",
      article: "Consultar documentos o fuentes originales puede ayudar a evaluar la información."
    },

    en: {
      headline: "📖 Original sources can help verify a claim!",
      article: "Consulting original documents or sources can help evaluate information."
    },

    zh: {
      headline: "📖 原始来源可以帮助验证信息！",
      article: "查阅原始文件或来源可以帮助评估信息。"
    },

    exaggerated: false
  },


  // --------------------------------------------------
  // 37
  // --------------------------------------------------

  {
    es: {
      headline: "🚨 ¡Todo video de internet es una grabación real!",
      article: "Los videos pueden editarse, recortarse, manipularse o generarse artificialmente."
    },

    en: {
      headline: "🚨 Every video online is real footage!",
      article: "Videos can be edited, cropped, manipulated, or artificially generated."
    },

    zh: {
      headline: "🚨 互联网上的所有视频都是真实录像！",
      article: "视频可以被编辑、剪辑、修改或人工生成。"
    },

    exaggerated: true
  },


  // --------------------------------------------------
  // 38
  // --------------------------------------------------

  {
    es: {
      headline: "🤖 ¡La inteligencia artificial puede generar contenido nuevo!",
      article: "Algunos sistemas de inteligencia artificial pueden generar texto, imágenes, audio y otros contenidos."
    },

    en: {
      headline: "🤖 Artificial intelligence can generate new content!",
      article: "Some artificial intelligence systems can generate text, images, audio and other types of content."
    },

    zh: {
      headline: "🤖 人工智能可以生成新的内容！",
      article: "一些人工智能系统可以生成文本、图像、音频和其他内容。"
    },

    exaggerated: false
  },


  // --------------------------------------------------
  // 39
  // --------------------------------------------------

  {
    es: {
      headline: "🚨 ¡Un video en alta definición no puede ser un deepfake!",
      article: "La calidad de imagen por sí sola no determina si un video es auténtico."
    },

    en: {
      headline: "🚨 A high-definition video cannot be a deepfake!",
      article: "Image quality alone does not determine whether a video is authentic."
    },

    zh: {
      headline: "🚨 高清视频不可能是深度伪造！",
      article: "仅凭图像质量无法判断视频是否真实。"
    },

    exaggerated: true
  },


  // --------------------------------------------------
  // 40
  // --------------------------------------------------

  {
    es: {
      headline: "🔍 ¡Buscar información adicional puede ayudar a detectar engaños!",
      article: "Investigar una afirmación y buscar evidencia adicional puede ayudar a evaluar su credibilidad."
    },

    en: {
      headline: "🔍 Looking for additional information can help detect deception!",
      article: "Researching a claim and looking for additional evidence can help evaluate its credibility."
    },

    zh: {
      headline: "🔍 查找更多信息可以帮助发现欺骗！",
      article: "研究一个说法并寻找更多证据可以帮助评估其可信度。"
    },

    exaggerated: false
  },


  // --------------------------------------------------
  // 41
  // --------------------------------------------------

  {
    es: {
      headline: "🚨 ¡Los científicos ocultan todos sus descubrimientos!",
      article: "La investigación científica se publica y comparte a través de múltiples canales, aunque no toda la investigación es pública de inmediato."
    },

    en: {
      headline: "🚨 Scientists hide ALL their discoveries!",
      article: "Scientific research is published and shared through many channels, although not all research becomes public immediately."
    },

    zh: {
      headline: "🚨 科学家隐藏了他们所有的发现！",
      article: "科学研究会通过许多渠道发表和分享，但并非所有研究都会立即公开。"
    },

    exaggerated: true
  },


  // --------------------------------------------------
  // 42
  // --------------------------------------------------

  {
    es: {
      headline: "📊 ¡Una gráfica puede presentar información de manera visual!",
      article: "Las gráficas ayudan a representar datos visualmente y pueden facilitar su interpretación."
    },

    en: {
      headline: "📊 A chart can present information visually!",
      article: "Charts help represent data visually and can make information easier to interpret."
    },

    zh: {
      headline: "📊 图表可以用视觉方式呈现信息！",
      article: "图表可以直观地表示数据，并帮助人们理解信息。"
    },

    exaggerated: false
  },


  // --------------------------------------------------
  // 43
  // --------------------------------------------------

  {
    es: {
      headline: "🚨 ¡Si una gráfica tiene muchos colores, los datos son verdaderos!",
      article: "El diseño visual de una gráfica no demuestra que los datos sean correctos."
    },

    en: {
      headline: "🚨 If a chart has many colors, its data must be true!",
      article: "The visual design of a chart does not prove that its data is correct."
    },

    zh: {
      headline: "🚨 如果图表颜色很多，数据就一定是真的！",
      article: "图表的视觉设计并不能证明其中的数据是正确的。"
    },

    exaggerated: true
  },


  // --------------------------------------------------
  // 44
  // --------------------------------------------------

  {
    es: {
      headline: "🌡️ ¡La temperatura se puede medir con instrumentos!",
      article: "Los termómetros son instrumentos utilizados para medir la temperatura."
    },

    en: {
      headline: "🌡️ Temperature can be measured with instruments!",
      article: "Thermometers are instruments used to measure temperature."
    },

    zh: {
      headline: "🌡️ 温度可以使用仪器进行测量！",
      article: "温度计是用于测量温度的仪器。"
    },

    exaggerated: false
  },


  // --------------------------------------------------
  // 45
  // --------------------------------------------------

  {
    es: {
      headline: "🚨 ¡Un termómetro puede predecir el clima de mañana!",
      article: "Un termómetro mide la temperatura, pero no puede por sí solo predecir todo el clima."
    },

    en: {
      headline: "🚨 A thermometer can predict tomorrow's weather!",
      article: "A thermometer measures temperature, but it cannot predict the entire weather by itself."
    },

    zh: {
      headline: "🚨 温度计可以预测明天的天气！",
      article: "温度计可以测量温度，但不能单独预测完整的天气情况。"
    },

    exaggerated: true
  },


  // --------------------------------------------------
  // 46
  // --------------------------------------------------

  {
    es: {
      headline: "🌐 ¡Internet permite compartir información rápidamente!",
      article: "Internet permite transmitir y compartir información entre dispositivos y personas."
    },

    en: {
      headline: "🌐 The internet allows information to be shared quickly!",
      article: "The internet allows information to be transmitted and shared between devices and people."
    },

    zh: {
      headline: "🌐 互联网可以快速分享信息！",
      article: "互联网可以在人和设备之间传输和分享信息。"
    },

    exaggerated: false
  },


  // --------------------------------------------------
  // 47
  // --------------------------------------------------

  {
    es: {
      headline: "🚨 ¡Todo lo que aparece primero en Google es verdadero!",
      article: "La posición de un resultado de búsqueda no garantiza que la información sea correcta."
    },

    en: {
      headline: "🚨 Everything that appears first on Google is true!",
      article: "A search result's position does not guarantee that its information is correct."
    },

    zh: {
      headline: "🚨 Google 搜索结果第一位的信息一定是真的！",
      article: "搜索结果的位置并不能保证其中的信息是正确的。"
    },

    exaggerated: true
  },


  // --------------------------------------------------
  // 48
  // --------------------------------------------------

  {
    es: {
      headline: "🔎 ¡Verificar quién publicó una información puede aportar contexto!",
      article: "Conocer quién publicó una información puede ayudar a evaluar su origen y contexto."
    },

    en: {
      headline: "🔎 Checking who published information can provide context!",
      article: "Knowing who published information can help evaluate its origin and context."
    },

    zh: {
      headline: "🔎 检查信息发布者可以提供更多背景！",
      article: "了解信息的发布者可以帮助评估其来源和背景。"
    },

    exaggerated: false
  },


  // --------------------------------------------------
  // 49
  // --------------------------------------------------

  {
    es: {
      headline: "🚨 ¡Si una noticia provoca miedo, significa que es verdadera!",
      article: "Una reacción emocional intensa no demuestra que una afirmación sea verdadera."
    },

    en: {
      headline: "🚨 If a news story makes you afraid, it must be true!",
      article: "A strong emotional reaction does not prove that a claim is true."
    },

    zh: {
      headline: "🚨 如果新闻让你害怕，就一定是真的！",
      article: "强烈的情绪反应并不能证明一个说法是真的。"
    },

    exaggerated: true
  },


  // --------------------------------------------------
  // 50
  // --------------------------------------------------

  {
    es: {
      headline: "🧠 ¡Tomarse unos segundos para pensar antes de compartir puede ayudar!",
      article: "Hacer una pausa y comprobar la información antes de compartirla puede reducir la propagación de información falsa."
    },

    en: {
      headline: "🧠 Taking a few seconds to think before sharing can help!",
      article: "Pausing and checking information before sharing can reduce the spread of false information."
    },

    zh: {
      headline: "🧠 分享之前花几秒钟思考可以有所帮助！",
      article: "在分享之前暂停并检查信息，可以减少虚假信息的传播。"
    },

    exaggerated: false
  }

];


// ======================================================
// 5. TEXTOS GENERALES
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
      "Cerrar",

    move:
      "Avanzas",

    spaces:
      "casillas"
  },


  // ==================================================
  // ENGLISH
  // ==================================================

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
      "Close",

    move:
      "You move forward",

    spaces:
      "spaces"
  },


  // ==================================================
  // CHINESE
  // ==================================================

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
      "关闭",

    move:
      "你前进",

    spaces:
      "格"
  }

};


// ======================================================
// 6. GIRAR LA RUEDA
// ======================================================

function spinWheel() {

  const moves =
    Math.floor(Math.random() * 4) + 1;

  const t =
    translations[currentLanguage];

  document.getElementById("wheel-display").innerHTML =
    `<strong>${t.move} ${moves} ${t.spaces}</strong>`;

  setTimeout(() => {

    openMinigame("clickbait");

  }, 800);
}


// ======================================================
// 7. ABRIR MINIJUEGO
// ======================================================

function openMinigame(type) {

  const modal =
    document.getElementById("interactive-modal");

  modal.classList.remove("hidden");

  document
    .querySelectorAll(".minigame-view")
    .forEach(minigame => {

      minigame.classList.add("hidden");

    });


  if (type === "clickbait") {

    // Obtener noticia actual
    currentNews =
      fakeNews[currentNewsIndex];


    // Avanzar al siguiente índice
    currentNewsIndex++;

    if (
      currentNewsIndex >=
      fakeNews.length
    ) {

      currentNewsIndex = 0;

    }


    // Obtener traducción
    const news =
      currentNews[currentLanguage];


    // Mostrar titular
    document
      .querySelector(
        "#minigame-clickbait .headline"
      )
      .textContent =
      news.headline;


    // Mostrar artículo
    document
      .getElementById("article-body")
      .textContent =
      news.article;


    // Reiniciar slider
    document
      .getElementById("clickbait-slider")
      .value = 50;


    // Ocultar artículo
    document
      .getElementById("article-body")
      .classList
      .add("hidden");


    // Mostrar juego
    document
      .getElementById("minigame-clickbait")
      .classList
      .remove("hidden");
  }

}


// ======================================================
// 8. MOSTRAR ARTÍCULO
// ======================================================

function toggleArticleBody() {

  document
    .getElementById("article-body")
    .classList
    .toggle("hidden");

}


// ======================================================
// 9. COMPROBAR RESPUESTA
// ======================================================

function checkClickbait() {

  if (!currentNews) {
    return;
  }

  const value =
    Number(
      document
        .getElementById("clickbait-slider")
        .value
    );


  const isExaggerated =
    currentNews.exaggerated;


  const t =
    translations[currentLanguage];


  if (isExaggerated) {

    if (value > 50) {

      if (currentLanguage === "es") {

        alert(
          "¡Excelente! Detectaste que el titular exageraba la nota."
        );

      } else if (currentLanguage === "en") {

        alert(
          "Excellent! You detected that the headline exaggerated the article."
        );

      } else {

        alert(
          "太棒了！你发现了标题夸大了文章内容。"
        );

      }

      followers += 25;

    } else {

      if (currentLanguage === "es") {

        alert(
          "¡Cuidado! El titular exageraba la información."
        );

      } else if (currentLanguage === "en") {

        alert(
          "Be careful! The headline exaggerated the information."
        );

      } else {

        alert(
          "小心！这个标题夸大了信息。"
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

      } else if (currentLanguage === "en") {

        alert(
          "Excellent! You detected that the headline accurately represents the article."
        );

      } else {

        alert(
          "太棒了！你发现标题准确反映了文章内容。"
        );

      }

      followers += 25;

    } else {

      if (currentLanguage === "es") {

        alert(
          "¡Cuidado! El titular sí representaba correctamente la información."
        );

      } else if (currentLanguage === "en") {

        alert(
          "Be careful! The headline accurately represented the information."
        );

      } else {

        alert(
          "小心！这个标题准确地反映了信息。"
        );

      }

      viralLoad += 10;

    }

  }


  updateHUD();

  closeModal();

}


// ======================================================
// 10. ELEGIR CAMINO
// ======================================================

function choosePath(path) {

  if (path === "verifier") {

    shields++;

    if (currentLanguage === "es") {

      alert(
        "Tomaste el Camino Verificador: Ganas +1 Escudo."
      );

    } else if (currentLanguage === "en") {

      alert(
        "You chose the Verifier Path: You gain +1 Shield."
      );

    } else {

      alert(
        "你选择了验证者道路：获得 +1 护盾。"
      );

    }

  } else {

    followers += 30;
    viralLoad += 10;

    if (currentLanguage === "es") {

      alert(
        "Tomaste el Camino Rápido: Ganas +30 Seguidores pero sube la Carga Viral."
      );

    } else if (currentLanguage === "en") {

      alert(
        "You chose the Fast Path: Gain +30 Followers, but Viral Load increases."
      );

    } else {

      alert(
        "你选择了快速道路：获得 +30 关注者，但病毒负荷增加。"
      );

    }

  }

  updateHUD();

}


// ======================================================
// 11. LABORATORIO
// ======================================================

function runLabTool(tool) {

  const output =
    document.getElementById("lab-output");


  if (currentLanguage === "es") {

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


  else if (currentLanguage === "en") {

    if (tool === "ia") {

      output.innerText =
        "🤖 AI Analysis: Visual inconsistencies detected (92% probability of AI generation).";

    }

    if (tool === "source") {

      output.innerText =
        "🔗 Source Search: No official record of this news story was found.";

    }

    if (tool === "meta") {

      output.innerText =
        "📄 Metadata: File last modified in 2019.";

    }

  }


  else {

    if (tool === "ia") {

      output.innerText =
        "🤖 AI 分析：检测到视觉不一致（92% 的可能性由 AI 生成）。";

    }

    if (tool === "source") {

      output.innerText =
        "🔗 来源搜索：没有找到这条新闻的官方记录。";

    }

    if (tool === "meta") {

      output.innerText =
        "📄 元数据：文件最后一次修改时间为 2019 年。";

    }

  }

}


// ======================================================
// 12. ACTUALIZAR HUD
// ======================================================

function updateHUD() {

  document
    .getElementById("followers-count")
    .innerText =
    followers;


  document
    .getElementById("shields-count")
    .innerText =
    shields;


  document
    .getElementById("viral-meter")
    .style.width =
    `${Math.min(viralLoad, 100)}%`;


  const t =
    translations[currentLanguage];


  document
    .getElementById("viral-text")
    .innerText =
    `${viralLoad}% - ${t.publicViral}`;

}


// ======================================================
// 13. USAR ESCUDO
// ======================================================

function useShield() {

  if (shields > 0) {

    shields--;

    if (currentLanguage === "es") {

      alert(
        "Usaste un Escudo para neutralizar la amenaza."
      );

    } else if (currentLanguage === "en") {

      alert(
        "You used a Shield to neutralize the threat."
      );

    } else {

      alert(
        "你使用了护盾来消除威胁。"
      );

    }

    updateHUD();

    closeModal();

  } else {

    if (currentLanguage === "es") {

      alert(
        "No tienes Escudos suficientes."
      );

    } else if (currentLanguage === "en") {

      alert(
        "You do not have enough Shields."
      );

    } else {

      alert(
        "你的护盾不足。"
      );

    }

  }

}


// ======================================================
// 14. CERRAR MODAL
// ======================================================

function closeModal() {

  document
    .getElementById("interactive-modal")
    .classList
    .add("hidden");

}


// ======================================================
// 15. CAMBIAR IDIOMA
// ======================================================

function changeLanguage(lang) {

  if (!translations[lang]) {

    lang = "es";

  }


  currentLanguage = lang;


  const t =
    translations[lang];


  // -----------------------------------------------
  // HTML
  // -----------------------------------------------

  document.documentElement.lang =
    lang;


  // -----------------------------------------------
  // NAVBAR
  // -----------------------------------------------

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


  // -----------------------------------------------
  // HOME
  // -----------------------------------------------

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


  // -----------------------------------------------
  // STATS
  // -----------------------------------------------

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


  // -----------------------------------------------
  // GAME BOARD
  // -----------------------------------------------

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
      `<i class="fa-solid fa-users"></i> ${t.followers}`;

    statRows[1].innerHTML =
      `<i class="fa-solid fa-shield-halved"></i> ${t.shields}`;

  }


  document
    .getElementById("spin-btn")
    .textContent =
    t.spin;


  document
    .getElementById("wheel-display")
    .innerHTML =
    `<span>${t.spinText}</span>`;


  document
    .querySelector(".board-wrapper h2")
    .textContent =
    t.boardTitle;


  // -----------------------------------------------
  // STAGES
  // -----------------------------------------------

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


  // -----------------------------------------------
  // BIFURCACIÓN
  // -----------------------------------------------

  const fork =
    document.querySelector(
      ".bifurcation-box h4"
    );


  if (fork) {

    fork.innerHTML =
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


  // -----------------------------------------------
  // LABORATORIO
  // -----------------------------------------------

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


  document
    .getElementById("lab-output")
    .textContent =
    t.labOutput;


  // -----------------------------------------------
  // RANKING
  // -----------------------------------------------

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


  // -----------------------------------------------
  // MODAL
  // -----------------------------------------------

  const challenge =
    document.querySelector(
      "#minigame-clickbait h3"
    );


  if (challenge) {

    challenge.innerHTML =
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


  const readButton =
    document.querySelector(
      "#minigame-clickbait .btn-secondary"
    );


  if (readButton) {

    readButton.textContent =
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


  // -----------------------------------------------
  // ACTUALIZAR HUD
  // -----------------------------------------------

  updateHUD();


  // -----------------------------------------------
  // SI HAY UNA NOTICIA ABIERTA,
  // CAMBIARLA AL IDIOMA NUEVO
  // -----------------------------------------------

  if (
    currentNews &&
    !document
      .getElementById("interactive-modal")
      .classList
      .contains("hidden")
  ) {

    const news =
      currentNews[currentLanguage];


    document
      .querySelector(
        "#minigame-clickbait .headline"
      )
      .textContent =
      news.headline;


    document
      .getElementById("article-body")
      .textContent =
      news.article;

  }

}


// ======================================================
// 16. INICIALIZAR
// ======================================================

document.addEventListener(
  "DOMContentLoaded",
  () => {

    currentLanguage = "es";

    changeLanguage("es");

    updateHUD();

  }
);
