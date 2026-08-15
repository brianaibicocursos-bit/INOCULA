// ======================================================
// INOCULA · APP.JS
// ======================================================


// ======================================================
// NAVEGACIÓN ENTRE PÁGINAS
// ======================================================

function navigateTo(pageId) {

  document.querySelectorAll('.page-view').forEach(page => {
    page.classList.add('hidden');
  });

  document.querySelectorAll('.nav-btn').forEach(button => {
    button.classList.remove('active');
  });

  const selectedPage = document.getElementById(pageId);

  if (selectedPage) {
    selectedPage.classList.remove('hidden');
  }
}


// ======================================================
// ESTADO DEL JUEGO
// ======================================================

let viralLoad = 15;
let followers = 100;
let shields = 1;

let currentNews = null;


// ======================================================
// 50 NOTICIAS · ESPAÑOL / INGLÉS / CHINO
// ======================================================

const fakeNews = [

  // 1
  {
    es: {
      headline: "🚨 ¡Tomar agua con limón elimina todas las toxinas del cuerpo!",
      article: "El agua con limón puede formar parte de una alimentación saludable, pero el hígado y los riñones son los principales órganos encargados de eliminar sustancias de desecho."
    },
    en: {
      headline: "🚨 Drinking lemon water removes all toxins from your body!",
      article: "Lemon water can be part of a healthy diet, but the liver and kidneys are the main organs responsible for removing waste from the body."
    },
    zh: {
      headline: "🚨 喝柠檬水可以排出体内所有毒素！",
      article: "柠檬水可以成为健康饮食的一部分，但肝脏和肾脏才是负责清除体内废物的主要器官。"
    },
    exaggerated: true
  },


  // 2
  {
    es: {
      headline: "🧠 Las neuronas utilizan señales eléctricas y químicas para comunicarse.",
      article: "Las neuronas utilizan señales eléctricas y químicas para transmitir información dentro del sistema nervioso."
    },
    en: {
      headline: "🧠 Neurons use electrical and chemical signals to communicate.",
      article: "Neurons use electrical and chemical signals to transmit information throughout the nervous system."
    },
    zh: {
      headline: "🧠 神经元利用电信号和化学信号进行交流。",
      article: "神经元利用电信号和化学信号在神经系统中传递信息。"
    },
    exaggerated: false
  },


  // 3
  {
    es: {
      headline: "🚨 ¡Instagram puede leer tus pensamientos!",
      article: "Las aplicaciones pueden recopilar información sobre actividad, intereses e interacciones, pero no pueden leer directamente los pensamientos de una persona."
    },
    en: {
      headline: "🚨 Instagram can read your thoughts!",
      article: "Apps can collect information about activity, interests and interactions, but they cannot directly read a person's thoughts."
    },
    zh: {
      headline: "🚨 Instagram 可以读取你的思想！",
      article: "应用程序可以收集用户的活动、兴趣和互动信息，但不能直接读取一个人的思想。"
    },
    exaggerated: true
  },


  // 4
  {
    es: {
      headline: "🦠 Lavarse las manos ayuda a reducir la transmisión de microorganismos.",
      article: "La higiene adecuada de manos puede ayudar a reducir la transmisión de diferentes microorganismos."
    },
    en: {
      headline: "🦠 Washing your hands helps reduce the spread of microorganisms.",
      article: "Proper hand hygiene can help reduce the transmission of different microorganisms."
    },
    zh: {
      headline: "🦠 洗手有助于减少微生物的传播。",
      article: "良好的手部卫生习惯可以帮助减少不同微生物的传播。"
    },
    exaggerated: false
  },


  // 5
  {
    es: {
      headline: "🚨 ¡La inteligencia artificial nunca se equivoca!",
      article: "Los sistemas de inteligencia artificial pueden producir información incorrecta y necesitan ser verificados."
    },
    en: {
      headline: "🚨 Artificial intelligence never makes mistakes!",
      article: "Artificial intelligence systems can produce incorrect information and need to be verified."
    },
    zh: {
      headline: "🚨 人工智能从来不会犯错！",
      article: "人工智能系统可能产生错误的信息，因此仍然需要进行验证。"
    },
    exaggerated: true
  },


  // 6
  {
    es: {
      headline: "🌳 Los árboles absorben dióxido de carbono durante la fotosíntesis.",
      article: "Las plantas utilizan dióxido de carbono durante la fotosíntesis para producir energía."
    },
    en: {
      headline: "🌳 Trees absorb carbon dioxide during photosynthesis.",
      article: "Plants use carbon dioxide during photosynthesis to produce energy."
    },
    zh: {
      headline: "🌳 树木在光合作用过程中吸收二氧化碳。",
      article: "植物在光合作用过程中利用二氧化碳来产生能量。"
    },
    exaggerated: false
  },


  // 7
  {
    es: {
      headline: "🚨 ¡Plantar un solo árbol resolverá el cambio climático!",
      article: "Los árboles pueden ayudar a capturar carbono, pero combatir el cambio climático requiere muchas acciones diferentes."
    },
    en: {
      headline: "🚨 Planting one tree will solve climate change!",
      article: "Trees can help capture carbon, but addressing climate change requires many different actions."
    },
    zh: {
      headline: "🚨 种一棵树就能解决气候变化问题！",
      article: "树木可以帮助吸收碳，但应对气候变化需要采取多种不同的措施。"
    },
    exaggerated: true
  },


  // 8
  {
    es: {
      headline: "📱 Algunas aplicaciones pueden solicitar acceso a tu ubicación.",
      article: "Algunas aplicaciones solicitan permisos de ubicación para proporcionar determinadas funciones."
    },
    en: {
      headline: "📱 Some apps can request access to your location.",
      article: "Some applications request location permissions to provide certain features."
    },
    zh: {
      headline: "📱 一些应用程序可以请求访问你的位置信息。",
      article: "一些应用程序会请求位置权限，以提供特定功能。"
    },
    exaggerated: false
  },


  // 9
  {
    es: {
      headline: "🚨 ¡Si una publicación tiene millones de likes, definitivamente es verdadera!",
      article: "La cantidad de interacciones de una publicación no demuestra que la información sea verdadera."
    },
    en: {
      headline: "🚨 If a post has millions of likes, it must be true!",
      article: "The number of interactions on a post does not prove that the information is true."
    },
    zh: {
      headline: "🚨 如果一条帖子有数百万个点赞，它一定是真的！",
      article: "帖子的互动数量并不能证明其中的信息是真实的。"
    },
    exaggerated: true
  },


  // 10
  {
    es: {
      headline: "🔎 Comparar varias fuentes puede ayudar a detectar información falsa.",
      article: "Contrastar información entre diferentes fuentes confiables puede ayudar a identificar errores e inconsistencias."
    },
    en: {
      headline: "🔎 Comparing multiple sources can help detect false information.",
      article: "Comparing information from different reliable sources can help identify errors and inconsistencies."
    },
    zh: {
      headline: "🔎 比较多个信息来源有助于发现虚假信息。",
      article: "比较不同可靠来源的信息可以帮助发现错误和不一致之处。"
    },
    exaggerated: false
  },


  // 11
  {
    es: {
      headline: "🚨 ¡Comer chocolate antes de dormir permite memorizar cualquier cosa!",
      article: "No existe evidencia de que comer chocolate permita memorizar cualquier información de manera instantánea."
    },
    en: {
      headline: "🚨 Eating chocolate before bed lets you memorize anything!",
      article: "There is no evidence that eating chocolate allows you to instantly memorize any information."
    },
    zh: {
      headline: "🚨 睡前吃巧克力可以让你记住任何东西！",
      article: "没有证据表明吃巧克力可以让人立即记住任何信息。"
    },
    exaggerated: true
  },


  // 12
  {
    es: {
      headline: "💧 El agua es necesaria para mantener diferentes funciones del organismo.",
      article: "El agua participa en múltiples procesos del cuerpo y es necesaria para mantener una hidratación adecuada."
    },
    en: {
      headline: "💧 Water is necessary for many functions of the human body.",
      article: "Water participates in many processes in the body and is necessary for proper hydration."
    },
    zh: {
      headline: "💧 水对维持人体多种功能非常重要。",
      article: "水参与人体的许多生理过程，并且对于保持适当的水分非常重要。"
    },
    exaggerated: false
  },


  // 13
  {
    es: {
      headline: "🚨 ¡Dormir solamente dos horas al día aumenta tu inteligencia!",
      article: "Dormir muy poco puede afectar la atención, la memoria y el rendimiento."
    },
    en: {
      headline: "🚨 Sleeping only two hours a day makes you smarter!",
      article: "Getting too little sleep can affect attention, memory and performance."
    },
    zh: {
      headline: "🚨 每天只睡两个小时会让你变得更聪明！",
      article: "睡眠不足可能影响注意力、记忆力和学习表现。"
    },
    exaggerated: true
  },


  // 14
  {
    es: {
      headline: "📚 Dormir adecuadamente puede favorecer la memoria y el aprendizaje.",
      article: "El sueño participa en procesos relacionados con la memoria y el aprendizaje."
    },
    en: {
      headline: "📚 Getting enough sleep can support memory and learning.",
      article: "Sleep plays an important role in processes related to memory and learning."
    },
    zh: {
      headline: "📚 充足的睡眠有助于记忆和学习。",
      article: "睡眠参与与记忆和学习有关的重要过程。"
    },
    exaggerated: false
  },


  // 15
  {
    es: {
      headline: "🚨 ¡Los celulares pueden cocinar un huevo con su radiación!",
      article: "La radiación de un teléfono celular no funciona como un horno convencional para cocinar alimentos."
    },
    en: {
      headline: "🚨 Cell phones can cook an egg with their radiation!",
      article: "Cell phone radiation does not work like a conventional oven for cooking food."
    },
    zh: {
      headline: "🚨 手机的辐射可以把鸡蛋煮熟！",
      article: "手机产生的辐射并不能像传统烤箱一样用来烹饪食物。"
    },
    exaggerated: true
  },


  // 16
  {
    es: {
      headline: "☀️ La exposición excesiva al sol puede dañar la piel.",
      article: "La radiación ultravioleta puede producir daños en la piel, especialmente con una exposición excesiva."
    },
    en: {
      headline: "☀️ Excessive exposure to sunlight can damage the skin.",
      article: "Ultraviolet radiation can damage the skin, especially with excessive exposure."
    },
    zh: {
      headline: "☀️ 过度暴露在阳光下可能损伤皮肤。",
      article: "紫外线可能对皮肤造成伤害，尤其是在过度暴露的情况下。"
    },
    exaggerated: false
  },


  // 17
  {
    es: {
      headline: "🚨 ¡Usar protector solar una vez te protege durante todo el año!",
      article: "El protector solar necesita aplicarse de acuerdo con las indicaciones del producto y las condiciones de exposición."
    },
    en: {
      headline: "🚨 Applying sunscreen once protects you for the entire year!",
      article: "Sunscreen should be applied according to product instructions and exposure conditions."
    },
    zh: {
      headline: "🚨 涂一次防晒霜就能保护你一整年！",
      article: "防晒霜需要根据产品说明和实际暴露情况正确使用。"
    },
    exaggerated: true
  },


  // 18
  {
    es: {
      headline: "🧼 El jabón ayuda a eliminar microorganismos de las manos.",
      article: "El lavado de manos con agua y jabón ayuda a eliminar suciedad y microorganismos."
    },
    en: {
      headline: "🧼 Soap helps remove microorganisms from your hands.",
      article: "Washing your hands with soap and water helps remove dirt and microorganisms."
    },
    zh: {
      headline: "🧼 肥皂有助于清除手上的微生物。",
      article: "使用肥皂和水洗手有助于清除污垢和微生物。"
    },
    exaggerated: false
  },


  // 19
  {
    es: {
      headline: "🚨 ¡Beber café hace que nunca necesites dormir!",
      article: "La cafeína puede aumentar temporalmente el estado de alerta, pero no sustituye las necesidades normales de sueño."
    },
    en: {
      headline: "🚨 Drinking coffee means you never need sleep!",
      article: "Caffeine can temporarily increase alertness, but it does not replace the body's normal need for sleep."
    },
    zh: {
      headline: "🚨 喝咖啡意味着你永远不需要睡觉！",
      article: "咖啡因可以暂时提高警觉性，但不能代替人体正常的睡眠需求。"
    },
    exaggerated: true
  },


  // 20
  {
    es: {
      headline: "☕ La cafeína puede aumentar temporalmente el estado de alerta.",
      article: "La cafeína puede producir temporalmente mayor sensación de alerta y reducir la somnolencia."
    },
    en: {
      headline: "☕ Caffeine can temporarily increase alertness.",
      article: "Caffeine can temporarily increase alertness and reduce feelings of sleepiness."
    },
    zh: {
      headline: "☕ 咖啡因可以暂时提高警觉性。",
      article: "咖啡因可以暂时提高警觉性并减少困倦感。"
    },
    exaggerated: false
  },


  // 21
  {
    es: {
      headline: "🚨 ¡Las vacunas modifican permanentemente el ADN de todas las personas!",
      article: "Las vacunas no modifican permanentemente el ADN humano de la manera descrita en esta afirmación."
    },
    en: {
      headline: "🚨 Vaccines permanently change everyone's DNA!",
      article: "Vaccines do not permanently change human DNA in the way described by this claim."
    },
    zh: {
      headline: "🚨 疫苗会永久改变所有人的DNA！",
      article: "疫苗不会以这种说法描述的方式永久改变人类DNA。"
    },
    exaggerated: true
  },


  // 22
  {
    es: {
      headline: "💉 Las vacunas ayudan al sistema inmunitario a reconocer determinados agentes.",
      article: "Las vacunas ayudan al sistema inmunitario a desarrollar una respuesta frente a determinados agentes infecciosos."
    },
    en: {
      headline: "💉 Vaccines help the immune system recognize certain agents.",
      article: "Vaccines help the immune system develop a response against certain infectious agents."
    },
    zh: {
      headline: "💉 疫苗帮助免疫系统识别某些病原体。",
      article: "疫苗可以帮助免疫系统针对某些感染性病原体产生免疫反应。"
    },
    exaggerated: false
  },


  // 23
  {
    es: {
      headline: "🚨 ¡Un imán debajo del celular mejora mágicamente la señal de internet!",
      article: "Colocar un imán debajo de un teléfono no garantiza una mejora de la señal de internet."
    },
    en: {
      headline: "🚨 Putting a magnet under your phone magically improves internet signal!",
      article: "Placing a magnet under a phone does not guarantee improved internet signal."
    },
    zh: {
      headline: "🚨 在手机下面放一块磁铁就能神奇地增强网络信号！",
      article: "在手机下面放磁铁并不能保证网络信号得到改善。"
    },
    exaggerated: true
  },


  // 24
  {
    es: {
      headline: "📡 La calidad de una conexión puede depender de diferentes factores.",
      article: "La calidad de una conexión puede verse afectada por distancia, obstáculos, infraestructura y otros factores."
    },
    en: {
      headline: "📡 Connection quality can depend on several factors.",
      article: "Connection quality can be affected by distance, obstacles, infrastructure and other factors."
    },
    zh: {
      headline: "📡 网络连接质量可能受到多种因素影响。",
      article: "网络连接质量可能受到距离、障碍物、基础设施等多种因素的影响。"
    },
    exaggerated: false
  },


  // 25
  {
    es: {
      headline: "🚨 ¡Las plantas crecen diez veces más rápido si les hablas!",
      article: "No existe evidencia sólida que demuestre que hablarle a una planta haga que crezca diez veces más rápido."
    },
    en: {
      headline: "🚨 Plants grow ten times faster if you talk to them!",
      article: "There is no strong evidence showing that talking to a plant makes it grow ten times faster."
    },
    zh: {
      headline: "🚨 对植物说话可以让它们生长快十倍！",
      article: "没有可靠证据表明对植物说话可以让它们的生长速度提高十倍。"
    },
    exaggerated: true
  },


  // 26
  {
    es: {
      headline: "🌱 Las plantas necesitan luz para realizar la fotosíntesis.",
      article: "La luz es uno de los elementos necesarios para que las plantas realicen la fotosíntesis."
    },
    en: {
      headline: "🌱 Plants need light to perform photosynthesis.",
      article: "Light is one of the elements plants need to perform photosynthesis."
    },
    zh: {
      headline: "🌱 植物需要光来进行光合作用。",
      article: "光是植物进行光合作用所需要的重要条件之一。"
    },
    exaggerated: false
  },


  // 27
  {
    es: {
      headline: "🚨 ¡Comer zanahorias permite ver perfectamente en la oscuridad!",
      article: "Las zanahorias contienen vitamina A, importante para la visión, pero comerlas no permite ver perfectamente en la oscuridad."
    },
    en: {
      headline: "🚨 Eating carrots lets you see perfectly in the dark!",
      article: "Carrots contain vitamin A, which is important for vision, but eating them does not allow perfect night vision."
    },
    zh: {
      headline: "🚨 吃胡萝卜可以让你在黑暗中看得清清楚楚！",
      article: "胡萝卜含有对视力很重要的维生素A，但吃胡萝卜并不能让人在黑暗中完美视物。"
    },
    exaggerated: true
  },


  // 28
  {
    es: {
      headline: "🥕 La vitamina A participa en funciones relacionadas con la visión.",
      article: "La vitamina A es importante para diferentes funciones del organismo, incluida la visión."
    },
    en: {
      headline: "🥕 Vitamin A plays a role in functions related to vision.",
      article: "Vitamin A is important for several body functions, including vision."
    },
    zh: {
      headline: "🥕 维生素A参与与视力有关的生理功能。",
      article: "维生素A对人体多种功能很重要，其中包括视觉功能。"
    },
    exaggerated: false
  },


  // 29
  {
    es: {
      headline: "🚨 ¡Todas las noticias que aparecen en internet son revisadas por expertos!",
      article: "En internet existen contenidos publicados sin revisión profesional o editorial."
    },
    en: {
      headline: "🚨 Every piece of news online is reviewed by experts!",
      article: "There is online content that is published without professional or editorial review."
    },
    zh: {
      headline: "🚨 互联网上的所有新闻都经过专家审核！",
      article: "互联网上存在没有经过专业或编辑审核就发布的内容。"
    },
    exaggerated: true
  },


  // 30
  {
    es: {
      headline: "🌐 No toda la información publicada en internet ha sido verificada.",
      article: "Los usuarios deben evaluar la fuente, fecha y evidencia antes de confiar en una información."
    },
    en: {
      headline: "🌐 Not all information published online has been verified.",
      article: "Users should evaluate the source, date and evidence before trusting information."
    },
    zh: {
      headline: "🌐 互联网上发布的信息并非都经过验证。",
      article: "在相信一条信息之前，用户应该检查来源、日期和相关证据。"
    },
    exaggerated: false
  },


  // 31
  {
    es: {
      headline: "🚨 ¡Una foto real nunca puede utilizarse para crear una noticia falsa!",
      article: "Una fotografía real puede utilizarse fuera de contexto o acompañarse de información falsa."
    },
    en: {
      headline: "🚨 A real photo can never be used to create fake news!",
      article: "A real photograph can be used out of context or accompanied by false information."
    },
    zh: {
      headline: "🚨 真实照片绝不可能被用于制造假新闻！",
      article: "真实照片也可能被断章取义，或者与虚假信息一起传播。"
    },
    exaggerated: true
  },


  // 32
  {
    es: {
      headline: "📸 Una imagen real puede utilizarse fuera de contexto.",
      article: "Las imágenes pueden ser reales pero estar acompañadas de una descripción falsa o relacionada con otro evento."
    },
    en: {
      headline: "📸 A real image can be used out of context.",
      article: "Images can be real but be accompanied by a false description or linked to another event."
    },
    zh: {
      headline: "📸 真实图片也可能被断章取义。",
      article: "图片本身可能是真实的，但配上的文字可能是错误的或属于另一个事件。"
    },
    exaggerated: false
  },


  // 33
  {
    es: {
      headline: "🚨 ¡Si lo dice un influencer famoso, automáticamente es información científica!",
      article: "La popularidad de una persona no convierte automáticamente sus afirmaciones en evidencia científica."
    },
    en: {
      headline: "🚨 If a famous influencer says it, it is automatically scientific information!",
      article: "A person's popularity does not automatically turn their claims into scientific evidence."
    },
    zh: {
      headline: "🚨 如果著名网红这么说，那就一定是科学信息！",
      article: "一个人的知名度并不会自动让其观点成为科学证据。"
    },
    exaggerated: true
  },


  // 34
  {
    es: {
      headline: "🔬 La evidencia científica debe evaluarse independientemente de quién la publique.",
      article: "La calidad de una afirmación científica depende de la evidencia disponible y de cómo fue obtenida."
    },
    en: {
      headline: "🔬 Scientific evidence should be evaluated independently of who publishes it.",
      article: "The quality of a scientific claim depends on the available evidence and how it was obtained."
    },
    zh: {
      headline: "🔬 科学证据应该独立于发布者的身份进行评估。",
      article: "科学观点的可靠性取决于现有证据以及证据获取的方式。"
    },
    exaggerated: false
  },


  // 35
  {
    es: {
      headline: "🚨 ¡Los deepfakes son imposibles de detectar!",
      article: "Algunos contenidos manipulados pueden ser difíciles de identificar, pero existen señales y herramientas que pueden ayudar."
    },
    en: {
      headline: "🚨 Deepfakes are impossible to detect!",
      article: "Some manipulated content can be difficult to identify, but there are signs and tools that can help."
    },
    zh: {
      headline: "🚨 深度伪造内容是不可能被检测出来的！",
      article: "一些经过操纵的内容可能很难识别，但仍然存在一些迹象和工具可以帮助检测。"
    },
    exaggerated: true
  },


  // 36
  {
    es: {
      headline: "🤖 Algunas herramientas pueden ayudar a identificar contenido generado o manipulado con IA.",
      article: "Existen herramientas y métodos que pueden ayudar a analizar contenidos potencialmente generados o manipulados."
    },
    en: {
      headline: "🤖 Some tools can help identify AI-generated or manipulated content.",
      article: "There are tools and methods that can help analyze potentially generated or manipulated content."
    },
    zh: {
      headline: "🤖 一些工具可以帮助识别人工智能生成或操纵的内容。",
      article: "一些工具和方法可以帮助分析可能由人工智能生成或修改的内容。"
    },
    exaggerated: false
  },


  // 37
  {
    es: {
      headline: "🚨 ¡Una noticia escrita con palabras complicadas siempre es más confiable!",
      article: "El uso de lenguaje complicado no demuestra que una información sea verdadera."
    },
    en: {
      headline: "🚨 News written with complicated words is always more reliable!",
      article: "Using complicated language does not prove that information is true."
    },
    zh: {
      headline: "🚨 使用复杂词汇写成的新闻一定更可靠！",
      article: "使用复杂语言并不能证明信息是真实的。"
    },
    exaggerated: true
  },


  // 38
  {
    es: {
      headline: "📰 La confiabilidad de una noticia depende de su evidencia y sus fuentes.",
      article: "Para evaluar una noticia es importante revisar sus fuentes, evidencia, fecha y contexto."
    },
    en: {
      headline: "📰 The reliability of news depends on its evidence and sources.",
      article: "To evaluate news, it is important to check its sources, evidence, date and context."
    },
    zh: {
      headline: "📰 新闻的可靠性取决于证据和信息来源。",
      article: "评估新闻时，检查来源、证据、日期和背景非常重要。"
    },
    exaggerated: false
  },


  // 39
  {
    es: {
      headline: "🚨 ¡Si una noticia aparece primero en Google, significa que es verdadera!",
      article: "La posición de una página en un buscador no garantiza que toda la información sea verdadera."
    },
    en: {
      headline: "🚨 If news appears first on Google, it must be true!",
      article: "A page's position in a search engine does not guarantee that all of its information is true."
    },
    zh: {
      headline: "🚨 如果新闻出现在Google搜索结果第一位，就一定是真的！",
      article: "网页在搜索引擎中的排名并不能保证其中的信息都是真实的。"
    },
    exaggerated: true
  },


  // 40
  {
    es: {
      headline: "🔍 Es recomendable revisar la fuente original de una información.",
      article: "Consultar la fuente original puede ayudar a comprender mejor el contexto de una afirmación."
    },
    en: {
      headline: "🔍 It is useful to check the original source of information.",
      article: "Checking the original source can help you better understand the context of a claim."
    },
    zh: {
      headline: "🔍 检查信息的原始来源是一个好方法。",
      article: "查看原始来源可以帮助我们更好地了解一条信息的背景。"
    },
    exaggerated: false
  },


  // 41
  {
    es: {
      headline: "🚨 ¡Una noticia viral no necesita fuentes!",
      article: "La viralidad de una publicación no sustituye la necesidad de contar con fuentes confiables."
    },
    en: {
      headline: "🚨 Viral news does not need sources!",
      article: "The popularity of a post does not replace the need for reliable sources."
    },
    zh: {
      headline: "🚨 病毒式传播的新闻不需要来源！",
      article: "一条信息是否热门并不能取代可靠信息来源的重要性。"
    },
    exaggerated: true
  },


  // 42
  {
    es: {
      headline: "📖 Revisar la fecha de publicación puede ayudar a entender una noticia.",
      article: "La fecha puede ser importante porque una información antigua puede compartirse como si fuera reciente."
    },
    en: {
      headline: "📖 Checking the publication date can help you understand a news story.",
      article: "The date can be important because old information can be shared as if it were recent."
    },
    zh: {
      headline: "📖 检查发布日期有助于理解新闻。",
      article: "日期很重要，因为旧信息可能会被重新传播，并被误认为是最新消息。"
    },
    exaggerated: false
  },


  // 43
  {
    es: {
      headline: "🚨 ¡Si una captura de pantalla tiene muchos detalles, entonces es auténtica!",
      article: "Una captura de pantalla puede editarse y no demuestra por sí misma que la información sea auténtica."
    },
    en: {
      headline: "🚨 If a screenshot has many details, it must be authentic!",
      article: "A screenshot can be edited and does not by itself prove that the information is authentic."
    },
    zh: {
      headline: "🚨 如果截图包含很多细节，就一定是真实的！",
      article: "截图可以被编辑，因此截图本身不能证明信息是真实的。"
    },
    exaggerated: true
  },


  // 44
  {
    es: {
      headline: "🖼️ Las imágenes y capturas de pantalla también pueden editarse.",
      article: "Una imagen digital puede modificarse, por lo que es recomendable comprobar su origen."
    },
    en: {
      headline: "🖼️ Images and screenshots can also be edited.",
      article: "Digital images can be modified, so checking their origin is recommended."
    },
    zh: {
      headline: "🖼️ 图片和截图也可以被编辑。",
      article: "数字图像可以被修改，因此建议检查图片的来源。"
    },
    exaggerated: false
  },


  // 45
  {
    es: {
      headline: "🚨 ¡Un titular impactante demuestra que la noticia es importante!",
      article: "Un titular diseñado para provocar una reacción emocional no demuestra por sí mismo la importancia o veracidad de una noticia."
    },
    en: {
      headline: "🚨 A shocking headline proves that the news is important!",
      article: "A headline designed to trigger an emotional reaction does not by itself prove the importance or truth of a news story."
    },
    zh: {
      headline: "🚨 震撼的标题证明这条新闻非常重要！",
      article: "一个旨在引发情绪反应的标题并不能证明新闻的重要性或真实性。"
    },
    exaggerated: true
  },


  // 46
  {
    es: {
      headline: "🧠 Los titulares pueden utilizar lenguaje emocional para llamar la atención.",
      article: "Algunos titulares utilizan lenguaje emocional para aumentar el interés de los lectores."
    },
    en: {
      headline: "🧠 Headlines can use emotional language to attract attention.",
      article: "Some headlines use emotional language to increase readers' interest."
    },
    zh: {
      headline: "🧠 标题可能使用情绪化语言来吸引注意力。",
      article: "一些标题会使用情绪化的语言来增加读者的兴趣。"
    },
    exaggerated: false
  },


  // 47
  {
    es: {
      headline: "🚨 ¡Si una persona comparte una noticia muchas veces, la información se vuelve verdadera!",
      article: "Compartir repetidamente una información no cambia si la afirmación es verdadera o falsa."
    },
    en: {
      headline: "🚨 If someone shares a story many times, it becomes true!",
      article: "Repeatedly sharing information does not change whether a claim is true or false."
    },
    zh: {
      headline: "🚨 如果一个人多次分享一条新闻，这条信息就会变成真的！",
      article: "反复分享一条信息并不会改变其真实性。"
    },
    exaggerated: true
  },


  // 48
  {
    es: {
      headline: "🔗 Revisar quién publicó originalmente una información puede ayudar a verificarla.",
      article: "Identificar al autor o fuente original es una estrategia útil para evaluar información digital."
    },
    en: {
      headline: "🔗 Checking who originally published information can help verify it.",
      article: "Identifying the original author or source is a useful strategy for evaluating digital information."
    },
    zh: {
      headline: "🔗 检查信息最初由谁发布可以帮助验证信息。",
      article: "确定原始作者或来源是评估数字信息的一种有效方法。"
    },
    exaggerated: false
  },


  // 49
  {
    es: {
      headline: "🚨 ¡Todas las cuentas verificadas publican información verdadera!",
      article: "Una cuenta verificada no significa que absolutamente todo lo que publique sea correcto."
    },
    en: {
      headline: "🚨 Every verified account publishes true information!",
      article: "A verified account does not mean that everything it publishes is correct."
    },
    zh: {
      headline: "🚨 所有经过认证的账号都会发布真实信息！",
      article: "经过认证的账号并不意味着它发布的所有内容都是正确的。"
    },
    exaggerated: true
  },


  // 50
  {
    es: {
      headline: "✅ Una cuenta verificada no garantiza que cada publicación sea correcta.",
      article: "Incluso cuentas verificadas pueden publicar errores, opiniones o información que necesita ser comprobada."
    },
    en: {
      headline: "✅ A verified account does not guarantee that every post is correct.",
      article: "Even verified accounts can publish mistakes, opinions or information that needs to be checked."
    },
    zh: {
      headline: "✅ 经过认证的账号并不能保证每条帖子都是正确的。",
      article: "即使是经过认证的账号，也可能发布错误、观点或需要进一步验证的信息。"
    },
    exaggerated: false
  }

];


// ======================================================
// GIRAR RUEDA
// ======================================================

function spinWheel() {

  const moves = Math.floor(Math.random() * 4) + 1;

  document.getElementById('wheel-display').innerHTML =
    `<strong>Avanzas ${moves} casillas</strong>`;

  setTimeout(() => {
    openMinigame('clickbait');
  }, 800);
}


// ======================================================
// ABRIR MINIJUEGO / NOTICIA
// ======================================================

function openMinigame(type) {

  const modal = document.getElementById('interactive-modal');

  modal.classList.remove('hidden');

  document.querySelectorAll('.minigame-view').forEach(game => {
    game.classList.add('hidden');
  });

  if (type === 'clickbait') {

    // Elegir noticia aleatoria
    const randomIndex =
      Math.floor(Math.random() * fakeNews.length);

    currentNews = fakeNews[randomIndex];

    // Detectar idioma seleccionado
    const selectedLanguage =
      document.getElementById('lang-select').value;

    // Obtener traducción
    const translatedNews =
      currentNews[selectedLanguage] || currentNews.es;

    // Mostrar titular
    document.querySelector(
      '#minigame-clickbait .headline'
    ).textContent = translatedNews.headline;

    // Mostrar artículo
    document.getElementById(
      'article-body'
    ).textContent = translatedNews.article;

    // Reiniciar slider
    document.getElementById(
      'clickbait-slider'
    ).value = 50;

    // Ocultar artículo
    document.getElementById(
      'article-body'
    ).classList.add('hidden');

    // Mostrar minijuego
    document.getElementById(
      'minigame-clickbait'
    ).classList.remove('hidden');
  }
}


// ======================================================
// MOSTRAR / OCULTAR ARTÍCULO
// ======================================================

function toggleArticleBody() {

  document
    .getElementById('article-body')
    .classList.toggle('hidden');
}


// ======================================================
// EVALUAR NOTICIA
// ======================================================

function checkClickbait() {

  if (!currentNews) return;

  const value = Number(
    document.getElementById('clickbait-slider').value
  );

  if (currentNews.exaggerated) {

    // La noticia exagera
    if (value > 50) {

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

    // La noticia es correcta
    if (value <= 50) {

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


// ======================================================
// ELEGIR CAMINO
// ======================================================

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


// ======================================================
// LABORATORIO
// ======================================================

function runLabTool(tool) {

  const output =
    document.getElementById('lab-output');

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


// ======================================================
// ACTUALIZAR HUD
// ======================================================

function updateHUD() {

  document.getElementById(
    'followers-count'
  ).innerText = followers;

  document.getElementById(
    'shields-count'
  ).innerText = shields;

  document.getElementById(
    'viral-meter'
  ).style.width = `${viralLoad}%`;

  document.getElementById(
    'viral-text'
  ).innerText =
    `${viralLoad}% - Carga Viral Global`;
}


// ======================================================
// USAR ESCUDO
// ======================================================

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


// ======================================================
// CERRAR MODAL
// ======================================================

function closeModal() {

  document
    .getElementById('interactive-modal')
    .classList.add('hidden');
}


// ======================================================
// SISTEMA DE IDIOMAS
// ======================================================

function changeLanguage(lang) {

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


  const t =
    translations[lang] || translations.es;


  // ==================================================
  // NAVBAR
  // ==================================================

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


  // ==================================================
  // HOME
  // ==================================================

  const pillTag =
    document.querySelector(".pill-tag");

  if (pillTag) {

    pillTag.innerHTML =
      `<i class="fa-solid fa-sparkles"></i> ${t.heroTag}`;
  }


  const heroTitle =
    document.querySelector(".hero h1");

  if (heroTitle) {
    heroTitle.innerHTML = t.heroTitle;
  }


  const heroText =
    document.querySelector(".hero-subtext");

  if (heroText) {
    heroText.textContent = t.heroText;
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


  // ==================================================
  // GAME BOARD
  // ==================================================

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


  const viralText =
    document.getElementById(
      "viral-text"
    );

  if (viralText) {
    viralText.textContent =
      t.lowVirus;
  }


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


  const wheelDisplay =
    document.getElementById(
      "wheel-display"
    );

  if (wheelDisplay) {

    wheelDisplay.innerHTML =
      `<span>${t.spinText}</span>`;
  }


  const spinButton =
    document.getElementById(
      "spin-btn"
    );

  if (spinButton) {
    spinButton.textContent =
      t.spin;
  }


  const boardTitle =
    document.querySelector(
      ".board-wrapper h2"
    );

  if (boardTitle) {
    boardTitle.textContent =
      t.boardTitle;
  }


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


  const forkTitle =
    document.querySelector(
      ".bifurcation-box h4"
    );

  if (forkTitle) {

    forkTitle.innerHTML =
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


  // ==================================================
  // LABORATORIO
  // ==================================================

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


  const labOutput =
    document.getElementById(
      "lab-output"
    );

  if (labOutput) {
    labOutput.textContent =
      t.labOutput;
  }


  // ==================================================
  // RANKING
  // ==================================================

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


  // ==================================================
  // MODAL
  // ==================================================

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


  const readArticleButton =
    document.querySelector(
      "#minigame-clickbait .btn-secondary"
    );

  if (readArticleButton) {

    readArticleButton.textContent =
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


  // Cambiar idioma del documento
  document.documentElement.lang =
    lang;
}


// ======================================================
// INICIALIZACIÓN
// ======================================================

// Mantener español como idioma inicial
document.documentElement.lang = "es";
