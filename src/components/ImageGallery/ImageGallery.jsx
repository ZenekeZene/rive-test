import { useState, useRef, useEffect, useCallback } from "react";
import { createPortal, flushSync } from "react-dom";
import styles from "./ImageGallery.module.css";
import { useIsMobile } from "../../hooks/useIsMobile";
import LazyVideo from "./LazyVideo";
import LazyImage from "./LazyImage";

const VIDEO_EXTENSIONS = [".mp4", ".webm", ".mov", ".ogg"];
const isVideo = (url) => VIDEO_EXTENSIONS.some((ext) => url.toLowerCase().endsWith(ext));

const PLACEHOLDER_IMAGES = [
  { id: 1, url: "/artworks/portrait/C40sZ2cNDaB_2.jpg", title: "Portrait", description: "Digital portrait illustration", size: "tall", details: [
    "/artworks/portrait/C40sZ2cNDaB_9.jpg",
    "/artworks/portrait/C40sZ2cNDaB_10.jpg",
    "/artworks/portrait/C40sZ2cNDaB_1.mp4",
  ], about: "Tengo que confesar algo.\n\nMe cuesta cumplir años. Yo, que no sabía lo que era no dejar de ser insultantemente joven todo el rato. Sé que significa que sigo vivo, lo cual es todo un acontecimiento único y milagroso, igual de único y milagroso que para el resto del mundo, supongo.\n\nHe caído de culo varias veces con el amor, y aunque sigo intentándolo, se hace cada vez más difícil treparlo con las manos cuarteadas. Fácil ofrecerlas. Complicado usarlas para despedirse.\n\nHe fantaseado con mil vidas diferentes, tras disfrutar con la urgencia de retornarme obligado a la rutina, en lugares del mundo que no podía ni imaginar siendo un niño. Pero nunca facturando maleta, solo mochila y compañía.\n\nMe he lamido las heridas hasta dejar mi lengua como un desierto, sin voz o sin nada que decir, lo que llegara antes. Y aunque muy pocas veces fueron heridas ajenas, las sentí como propias.\n\nAún con todo, sigo dando vueltas al sol como un mosquito lo hace alrededor de una bombilla. Y estoy agradecido, porque todavía tengo la oportunidad de morder esa luz con toda mi energía y mi mala hostia.\n\nPor los que están y por los que se fueron, ¡la de hoy va por vosotros! 🍸☀️" },
  { id: 2, url: "/artworks/gorila/C4_fevFtWmV_1.jpg", title: "Gorila", description: "Album cover illustration for Lindano", size: "wide", details: [
    "/artworks/gorila/C4_fevFtWmV_2.jpg",
    "/artworks/gorila/C4_fevFtWmV_3.jpg",
    "/artworks/gorila/C4_fevFtWmV_4.jpg",
    "/artworks/gorila/C4_fevFtWmV_5.jpg",
    "/artworks/gorila/C4_fevFtWmV_8.jpg",
    "/artworks/gorila/C4_fevFtWmV_6.jpg",
    "/artworks/gorila/C4_fevFtWmV_7.jpg",
    "/artworks/gorila/C4_fevFtWmV_10.jpg",
    "/artworks/gorila/C4_fevFtWmV_9.mp4",
  ], about: "Hace dos años que unos pocos colegas convencimos a @lindano_gorila para que sacara su disco. Ese que tenía en la cabeza y que tanto necesitábamos escuchar el resto. Y lo hicimos.\n\nAl final, nos quedaba por hacer el artwork, ya sabes, la portada, la contraportada y un poco todo ese trabajo visual que apoya el sonido y la idea del disco.\n\nHabía mucho trabajo detrás de un montón de gente y la portada tenía que estar a la altura. Así que me propuse hacer la cosa que mejor se me da, tras esta reflexión: \"no soy demasiado bueno técnicamente, pero si que puedo llenar los ojos del que mira con muchos detalles\".\n\nCon referentes de portadas como la de @kaikoostudio en El factor humano de @elssorodriguez y @vicvegalc o trabajos de @stoopidmonkey y un montón de referencias que plasmar, le enchufé alrededor de 60 horas (hubo \"momento crisis\" con el color) al Ipad+Procreate y así quedó la cosa.\n\nOpio de Chinatown, Leyendas Legales de Hermanos Herméticos, Vintage de Chirie Vegas (@gamberrospro), Streetz Tragicomedia, Barakaldo, el Serantes, la fuente de Juan de Garay, El flan, Oteiza, Poti en el half y un montón de referencias impecablemente rapeadas por Lindano con el puto coco que solo él tiene para escribirlas.\n\nEn esta portada podrás ver referenciados a los productores del disco, como @dj_uve, @mpadrums, Vic Vega y @hawaiian_old_kid. Te invito a que las descubras, y como no, a que escuches el disco si aún no lo has hecho.\n\nPorque menudo viaje, amigo." },
  { id: 3, url: "/artworks/space/DJPT45bKBvb_1.jpg", title: "Space", description: "Sci-fi comic illustration", size: "square", details: [
    "/artworks/space/DJPT45bKBvb_2.jpg",
    "/artworks/space/DJPT45bKBvb_3.jpg",
    "/artworks/space/DJPT45bKBvb_4.jpg",
    "/artworks/space/DJPT45bKBvb_6.jpg",
    "/artworks/space/DJPT45bKBvb_7.jpg",
    "/artworks/space/DJMCDr7qeBN_1.mp4",
  ], about: "Era 1999, un Pentium II acababa de entrar por la puerta de mi casa como si fuera el monolito de 2001: Odisea en el espacio. Mi familia y yo nos convertimos en ese momento en homínidos primigenios orbitando la punta de lanza de la tecnología doméstica, lanzando alaridos y golpeándonos el pecho llenos de incertidumbre como si el universo nos gritara a la cara lo insignificantes que éramos.\n\nEstoy exagerando. En realidad, el acceso a los ordenadores personales se había democratizado hacía tiempo, yo estaba a las puertas de una revolución hormonal y mi imaginación cayó prendida de toda esa amalgama de transistores, puertas lógicas y celdas de memoria.\n\nHabía descubierto las aventuras gráficas de LucasArts: Maniac Mansion, Monkey Island, Sam y Max. Dibujos a todo color que escondían una historia con la que podía interactuar, era un niño de diez años que por fin tenía el control de algo, aunque fueran píxeles en movimiento. Desde entonces sueño con crear mi propio videojuego.\n\nY esto me acerca a ello. La escena de un crimen, una araña galáctica asesinada y un montón de sospechosos.\n\nPD: necesito un corte de pelo pero se murió mi peluquero de toda la vida. Descansa en paz, Jose, te echo de menos, y poco tiene que ver eso con tu habilidad con la tijera o la maquinilla." },
  { id: 4, url: "/artworks/Antifascist Originals/DDnHl8CNAPR_1.mp4", title: "Antifascist Originals", description: "Antifascist clothing brand design", size: "tall", details: [], about: "Se está poniendo cruda la cosa con las cámaras de eco de la red social esa fascista que emponzoñó el tránsfobo de Elon Musk para aupar a la presidencia al dorito con peluquín.\n\nLa IA, las fake news y las pocas ganas que tenemos de contrastar las cosas, gentuza como Ángel Gaitan, Vito Quiles, la rata de Pablo Motos.\n\nVox subiendo votos en Valencia después de votar en contra de las ayudas por la DANA.\n\nRaperos mononeuronales como el Jintxo fascisteando desde el pedestal de las visitas después de haber matado a su novia (menor de edad) de sobredosis.\n\nGemelos granadinos haciendo adalid de su feminismo mientras llevan una década abusando de menores. Estos también han llegado al límite de de la contradicción entre el personaje y la persona, como el Milhouse.\n\nUn genocidio a manos de un \"Estado\" esquizofrénico cercionándo la vida de más de 200.000 palestinos, de los cuáles más de 20.000 son niños.\n\nFíjate en este patrón: los fascistas siempre vuelven en el nombre de la libertad.\n\nHoy más que nunca hay que echarle energía y acción para combatirlos, que se nos comen." },
  { id: 5, url: "/artworks/Ciclos/Cs9UAdSN2sn_1.mp4", title: "Ciclos", description: "Surreal urban illustration", size: "wide", details: [
    "/artworks/Ciclos/Cs9UAdSN2sn_2.jpg",
    "/artworks/Ciclos/Cs9UAdSN2sn_3.jpg",
    "/artworks/Ciclos/Cs9UAdSN2sn_4.jpg",
    "/artworks/Ciclos/Cs9UAdSN2sn_5.jpg",
    "/artworks/Ciclos/Cs9UAdSN2sn_6.jpg",
    "/artworks/Ciclos/Cs9UAdSN2sn_7.jpg",
    "/artworks/Ciclos/Cs9UAdSN2sn_8.jpg",
    "/artworks/Ciclos/Cs9UAdSN2sn_9.jpg",
    "/artworks/Ciclos/Cs9T_FZtD8-_1.mp4",
  ], about: "He estado durante casi medio año sin dibujar en el Ipad y sin apenas coger un lápiz.\n\nCreo que uno de los factores que me hizo bloquearme fue todo el ruido alrededor de la inteligencia artificial generativa. Modelos pre-entrenados por el trabajo de millones de artistas, que sin dar su consentimiento de sus obras para tal fin, han servido de alimento para entrenar una batidora que excreta \"nuevas\" imágenes e ilustraciones en cuestión de segundos.\n\nToda una oda al turbocapitalismo que fagocita algo que creíamos genuinamente humano, el arte. Un sujeto nuevo en el tablero que no descansa, no se alimenta, no sufre de bloqueos y que \"dibuja\" en segundos lo que algunos tardaríamos una vida.\n\nDe alguna manera todo eso atentaba contra parte de mi identidad, un castillo de naipes que ahora veía peligrar por una máquina estadística. Me informé, lo probé, me auto-convencí, lo abracé, luego lo negué, lo combatí y finalmente, me aburrí (*).\n\nLlegué a una conclusión que ahora siento como sanadora, que vendría a decir algo como esto: \"que les jodan, sigue dibujando. Si estuviéramos a bordo del Titanic, me pido tocar el violín hasta el último minuto, no se hacer otra cosa\".\n\nPor suerte, como todo en la vida, nada es para siempre. Son ciclos. Como el título de esta ilustración.\n\n\"Ciclo\", arte digital, 2023.\n\nPD: * espero se legisle todo este tema y se proteja a los autores y sus obras. Parte de mi energía debe estar dedicada a defender esto." },
  { id: 6, url: "/artworks/Deus/CZfXegqgSEM_1.jpg", title: "Deus", description: "Limited palette illustration for @exquisiteworkers", size: "square", details: [
    "/artworks/Deus/CZfXegqgSEM_3.jpg",
    "/artworks/Deus/CZfXegqgSEM_4.jpg",
    "/artworks/Deus/CZfXegqgSEM_2.mp4",
  ], about: "Ilustración para colaborar en el proyecto @exquisiteworkers.\n\nSe llama \"Deus\", y solo se podía usar una paleta concreta de seis colores." },
  { id: 7, url: "/artworks/Demonios/CY6Xno4tOtH_1.jpg", title: "Demonios", description: "Color study in Procreate", size: "tall", details: [
    "/artworks/Demonios/CY6Xno4tOtH_2.jpg",
    "/artworks/Demonios/CY6Xno4tOtH_3.jpg",
    "/artworks/Demonios/CY6Xno4tOtH_4.jpg",
    "/artworks/Demonios/CY6Xno4tOtH_5.jpg",
  ], about: "¿Y si hubiera algo terapéutico en dibujar demonios?\n\nEl último el peor de todos.\n\nPequeño estudio de color en Procreate." },
  { id: 8, url: "/artworks/Chelines/CYd7sDEgEpp_1.jpg", title: "Chelines", description: "Van Gogh reimagined", size: "wide", details: [
    "/artworks/Chelines/CYd7sDEgEpp_2.jpg",
    "/artworks/Chelines/CYd7sDEgEpp_3.jpg",
  ], about: "Llevo un día de perros y no me quedan casi florines. Pues no voy y le pido al barbero un fade guapo y va y me la lía. ¿Cómo voy a presentarme así, delante de mi crisis existencial, con media oreja rebanada? Esto no va a quedar así. Sujétame la absenta." },
  { id: 9, url: "/artworks/Mucho/CZxJ_xiAk0b_1.jpg", title: "Mucho", description: "Fanzine secreto #2", size: "square", details: [
    "/artworks/Mucho/CZxJ_xiAk0b_2.jpg",
    "/artworks/Mucho/CZxJ_xiAk0b_3.jpg",
    "/artworks/Mucho/CZxJ_xiAk0b_4.jpg",
    "/artworks/Mucho/CZxJ_xiAk0b_5.jpg",
  ], about: "La espera ha sido larga, pero creemos que ha valido la pena. Mucho #2 ya a la venta. Más páginas, más color, más de todo.\n\nEntrevistamos al único e inimitable @elsicariohps, visitamos Atlanta con @basquehiphop, creamos ritmos con un Ipad con @vicvegalc, indagamos en el street art de kerograff, viajamos con drogas sintéticas con @te_apago_la_tele, revisamos cómics de lujo con @endikalahaine y @zenekezene, asistimos a clases de historia con @cutfastab, sacamos fotos analógicas con @anderprms y muchas más vainas locas te esperan en este segundo número.\n\nEs una tirada muy corta y no se va a reeditar. Pedidos por mensaje privado, envíos a toda España.\n\nEL FANZINE SECRETO." },
  { id: 10, url: "/artworks/Encuentra en el bloque/CAtApYFCVIB_1.jpg", title: "Encuentra en el bloque", description: "Hidden details illustration", size: "tall", details: [
    "/artworks/Encuentra en el bloque/CAtApYFCVIB_2.jpg",
    "/artworks/Encuentra en el bloque/CAtApYFCVIB_3.jpg",
    "/artworks/Encuentra en el bloque/CAtApYFCVIB_4.jpg",
  ], about: "Encuentra en este dibujo:\n\n- Un corazón euskaldun.\n- Una nave espacial \"de la vida\".\n- Un eslogan futurista que dice...\n- Un artista llamado Otto, de apellido..." },
  { id: 11, url: "/artworks/Klimt/B7DwGBPi-_4_1.jpg", title: "Klimt", description: "Tribute to Las tres edades de la mujer", size: "tall", details: [
    "/artworks/Klimt/B7DwGBPi-_4_2.jpg",
    "/artworks/Klimt/B7DwGBPi-_4_3.jpg",
  ], about: "Infinitas. Vueltas. Ya llevaba más tiempo viendo girar aquel tambor de lo que un programa de lavadora creía que podía durar jamás. Mi cuerpo estaba aquella mañana en esa lavandería. Mis ojos, se encontraban siguiendo incesantemente aquellas sábanas en las que acababa de fallecer mi madre esa misma madrugada. Y mi mente, estaba en otro sitio, ordenando lo sucedido en esos últimos tres meses. Intentando recordar hasta el más mínimo detalle, atesorando cualquier recuerdo que me acercara más a ella en ese momento, por duro o cruel que ese recuerdo hubiera sido. En otras palabras, me encontraba amueblando un lugar en mi cabeza al que sabía que iba a visitar el resto de mis días.\n\nLos hijos solemos creer que nuestros padres son infinitos. Como entidades divinas que estarán ahí siempre, como salvoconducto de una vida incierta a la que no estamos preparados para enfrentar, y que, con un poquito de suerte, sabremos lidiar con el tiempo. Como una red de seguridad en el mejor de los casos, como una fuente de verdad, de lucidez y de faro ante la incertidumbre. Como un tótem que firma tu existencia. O de todo lo contrario en la peor de las suertes. Pero aún con esas, nuestros padres parecen infinitos.\n\nY un día te viene la hostia. Da igual que te creas lo suficientemente fuerte, duro, resiliente. Como si hubieras estado jugando a una timba toda tu vida, tú, jugador listo y suertudo, bravo e imperturbable, como si pudieras ver a través de las cartas de tus oponentes, creedor de que, el hecho de que tu fortuna llegue sólo es una cuestión de tiempo y no de suerte o habilidad. Y en tu abundancia y soberbia, en la mejor de tus manos, te quitan tus cartas, tus fichas y ponen a bailar tu cerebro con un patadón en la boca. Te acabas de comer el sapo y lo único que tienes ahora en posesión es esa cara de gilipollas que se te ha quedado delante del espejo.\n\nLa cabeza tiene un mecanismo de supervivencia que nos impide estar constantemente recordando que un día vamos a morir. Que existirá un momento en nuestra historia que abandonaremos el cuerpo y la mente, y que todo lo que te importaba hasta el momento ya no tendrá sentido. Gracias a este truco del cerebro conseguimos llevar una vida funcional en la que no gastamos tiempo obsesionados con ese momento de no existir, de dejar de pensar y ser conscientes de nuestra propia existencia. Una transición que sucederá tarde o temprano, un salto, con tirabuzón incluido, a una piscina de la que nadie ha vuelto para dar testimonio y que la sola idea nos inspira fugacidad, y con ella, urgencia de vivir. Pero, ¿dónde está ahora la persona que me regaló la vida, ahora que no está, ahora que no es?\n\nEstá en lo que hago y lo que digo, en lo que pienso y sueño. Esas noches filmadas en blanco y negro, donde mi mente empieza su viaje en la inmensidad del blanco del techo, viaja por la negritud perturbadora que trae la idea de la muerte, y acaba en un amasijo difuminado de fotos analógicas a grano gordo en las que salimos sonriendo. Está en mis ojos, aquellos con los que creía que su hijo miraba diferente las cosas, y que son los mismos ojos curiosos con los que miraba ella un mundo que a veces no le devolvía la mirada, pero de la que se sentía partícipe e inquieta. Está en mis manos. Esas manos que pintarán, días después de que se fuera, \"Las tres edades de la mujer\", pero que de la última solo dejarán ver su cabello. Esas manos que fabricaron un homenaje de color para pelear tanto último día gris. Las mismas manos con las que ella pintaba. Está en mi cabeza, esa bóveda en la que rebota con sonoridad letras de Khrae o Pablo Ibañez, ecos de una juventud de otro tiempo.\n\nLa lavadora me devuelve a la realidad con un pitido. Meto las sábanas en el carrito y me largo. \"Todas las cosas tratamos, cada uno según es nuestro talante, yo lo que tiene importancia, ella todo lo importante...\", me veo tarareando en silencio una canción que una vez también sonó en la mente de mi madre a mi edad. A esta le acompaña el inagotable ritmo de las ruedas del carrito, que golpean en el suelo torpemente, pero que avanzan sin descanso, girando rápido, como mi cabeza, como la vida, en...\n\nInfinitas.\n\nVueltas." },
  { id: 12, url: "/artworks/Moebius/BtjkMAtgwfu_1.jpg", title: "Moebius", description: "Space and imagination tribute", size: "square", details: [
    "/artworks/Moebius/BtjkMAtgwfu_2.jpg",
    "/artworks/Moebius/BtjkMAtgwfu_3.jpg",
    "/artworks/Moebius/BtjkMAtgwfu_4.jpg",
    "/artworks/Moebius/BtjkMAtgwfu_5.jpg",
    "/artworks/Moebius/BtjkMAtgwfu_6.jpg",
  ], about: "No tengo ni idea si seré padre algún día. Si tengo esa suerte, le daré a mi hijo las herramientas necesarias para imaginar. Así, el día que la realidad se le haga bola, se acordará de su aita, que le ayudó a soñar y a respirar fuera, ahí arriba, en el espacio, y ahí adentro, en su cabeza, en su imaginario." },
  { id: 13, url: "/artworks/Noche/B2MRbo4Ctqq_2.mp4", title: "Noche", description: "The darkest hour", size: "wide", details: [
    "/artworks/Noche/B2MRbo4Ctqq_1.jpg",
    "/artworks/Noche/B2MRbo4Ctqq_3.jpg",
    "/artworks/Noche/B2MRbo4Ctqq_4.jpg",
    "/artworks/Noche/B2MRbo4Ctqq_5.jpg",
    "/artworks/Noche/B2MRbo4Ctqq_6.jpg",
    "/artworks/Noche/B2MRbo4Ctqq_7.jpg",
  ], about: "Hay un punto muerto en la noche, la hora más negra y fría, cuando el mundo se ha olvidado del atardecer y el alba no es todavía ninguna promesa. Un momento en que es demasiado pronto para levantarse pero tan tarde que irse a la cama no tiene sentido." },
  { id: 14, url: "/artworks/Miedo y asco en el Guggen/CRjNyLUAbHI_1.jpg", title: "Miedo y asco en las Vegas", description: "Fear and loathing inspired illustration", size: "tall", details: [
    "/artworks/Miedo y asco en el Guggen/CRjNyLUAbHI_2.jpg",
    "/artworks/Miedo y asco en el Guggen/CRjNyLUAbHI_3.jpg",
    "/artworks/Miedo y asco en el Guggen/CRjNyLUAbHI_4.jpg",
    "/artworks/Miedo y asco en el Guggen/CRjNyLUAbHI_5.jpg",
    "/artworks/Miedo y asco en el Guggen/CRjNyLUAbHI_6.jpg",
  ], about: "Es de todos/as sabido que ciertas sustancias abren zonas del cerebro que hasta entonces pueden estar cautivas. Y puede ser peligroso. Pero también raro. O inspirador. O todo a la vez." },
  { id: 15, url: "/artworks/Smoke/CQWhtLfg-mI_1.jpg", title: "Smoke", description: "Beat tape cover for @hawaiiano_kid", size: "square", details: [
    "/artworks/Smoke/CQWhtLfg-mI_2.jpg",
    "/artworks/Smoke/CQWhtLfg-mI_3.jpg",
    "/artworks/Smoke/CQWhtLfg-mI_4.jpg",
    "/artworks/Smoke/CQWhtLfg-mI_5.jpg",
  ], about: "Parece que ha pasado un siglo desde la última vez que subí algo. Le he pedido permiso a @hawaiiano_kid para subir esta portada que le hice para su próximo trabajo musical, una beat tape con sonidos jazzeros y oscuros. Las colaboraciones entre amigos siempre son menos trabajo y más disfrute.\n\nLos demonios internos, Ray Heredia, un suicida, Cruces y una ciudad tan llena de humo y egoísmo miope que apenas se deja ver la verdadera cara del acto criminal." },
  { id: 16, url: "/artworks/covid19/CX35eTEt0qt_1.jpg", title: "Covid 19", description: "Pandemic character illustration", size: "wide", details: [
    "/artworks/covid19/CX35eTEt0qt_3.jpg",
    "/artworks/covid19/CX35eTEt0qt_4.jpg",
    "/artworks/covid19/CX35eTEt0qt_2.mp4",
  ], about: "Esta sería la pinta del Covid-19 si me preguntaras. Con piquete y la tralla por fuera, mirándonos incrédulo cómo hemos fumigado aceras y playas, paseándose por la calle como si fuera suya. Pero espero que al cabrón le quede un telediario para picar el ticket e irse al otro barrio, que ya va siendo hora." },
  { id: 17, url: "/artworks/Gernika/CcsT0T5taBo_1.jpg", title: "Gernika", description: "Colección \"Sorry not sorry, Picasso\"", size: "tall", details: [
    "/artworks/Gernika/CROu-s9AbKD_1.jpg",
    "/artworks/Gernika/CRR65CGgpO8_1.jpg",
  ], about: "Colección \"Sorry not sorry, Picasso\"." },
  { id: 18, url: "/artworks/homenaje a bones/CQ6wNzJA_9Z_1.jpg", title: "Homenaje a Bones", description: "Clay sculpture tribute", size: "square", details: [
    "/artworks/homenaje a bones/CQ6wNzJA_9Z_2.jpg",
    "/artworks/homenaje a bones/CQ6wNzJA_9Z_3.jpg",
    "/artworks/homenaje a bones/CQ6wNzJA_9Z_4.jpg",
    "/artworks/homenaje a bones/CQ6wNzJA_9Z_5.jpg",
    "/artworks/homenaje a bones/CQ6wNzJA_9Z_6.jpg",
    "/artworks/homenaje a bones/CQ6wNzJA_9Z_7.jpg",
  ], about: "En mi pretensión de demostrar polivalencia en disciplinas que no son la mía (para justificar que aún no he encontrado un estilo de ilustración en el que me sienta cómodo, ejem), llega la segunda cosa que hice en mi vida en arcilla y que me supuso dolor de espalda, lloros, pataletas, síndrome del impostor y alcoholismo.\n\nLa empecé y la abandoné durante meses.\n\nTras mucho tiempo en el ostracismo, en un arrebato de orgullo, retomé esa amalgama de barro que no dejaba de mirarme con aires de suficiencia cada vez que pasaba por esa habitación y la terminé.\n\nNo sin antes preguntarme qué necesidad tengo yo de meterme en estos fregaos, con lo breve que es la vida y lo torpe que son mis dedos." },
];

// Create duplicated images for infinite scroll effect (mobile only)
const createInfiniteImages = () => {
  const repetitions = 5;
  const images = [];
  for (let i = 0; i < repetitions; i++) {
    PLACEHOLDER_IMAGES.forEach((img) => {
      images.push({
        ...img,
        uniqueId: `${img.id}-${i}`,
      });
    });
  }
  return images;
};

const INFINITE_IMAGES = createInfiniteImages();

function ImageGallery() {
  const isMobile = useIsMobile();
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeDetailIndex, setActiveDetailIndex] = useState(0);
  const [closingImage, setClosingImage] = useState(null);
  const [galleryHeight, setGalleryHeight] = useState(0);
  const [activeUniqueId, setActiveUniqueId] = useState(null);
  const [zoomEnabled, setZoomEnabled] = useState(false);
  const [zoomPos, setZoomPos] = useState(null);
  const zoomImageRef = useRef(null);
  const galleryRef = useRef(null);
  const containerRef = useRef(null);
  const desktopGalleryRef = useRef(null);
  const isResettingScroll = useRef(false);

  useEffect(() => {
    if (!isMobile) return;

    const calculateHeight = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const bottomMargin = 32;
        const maxHeight = 400;
        const availableHeight = window.innerHeight - rect.top - bottomMargin;
        setGalleryHeight(Math.min(maxHeight, Math.max(availableHeight, 200)));
      }
    };

    calculateHeight();
    window.addEventListener("resize", calculateHeight);
    return () => window.removeEventListener("resize", calculateHeight);
  }, [isMobile]);

  const handleInfiniteScroll = useCallback(() => {
    const gallery = galleryRef.current;
    if (!gallery || isResettingScroll.current) return;

    const scrollWidth = gallery.scrollWidth;
    const scrollLeft = gallery.scrollLeft;
    const sectionWidth = scrollWidth / 5;

    if (scrollLeft > sectionWidth * 3) {
      isResettingScroll.current = true;
      gallery.scrollLeft = sectionWidth;
      requestAnimationFrame(() => {
        isResettingScroll.current = false;
      });
    } else if (scrollLeft < sectionWidth * 0.5) {
      isResettingScroll.current = true;
      gallery.scrollLeft = sectionWidth * 2.5;
      requestAnimationFrame(() => {
        isResettingScroll.current = false;
      });
    }
  }, []);

  const handleWheel = (e) => {
    if (galleryRef.current) {
      e.preventDefault();
      galleryRef.current.scrollLeft += e.deltaY;
      handleInfiniteScroll();
    }
  };

  useEffect(() => {
    if (!isMobile) return;

    const gallery = galleryRef.current;
    if (!gallery) return;

    const sectionWidth = gallery.scrollWidth / 5;
    gallery.scrollLeft = sectionWidth * 2;

    gallery.addEventListener("scroll", handleInfiniteScroll, { passive: true });
    return () => gallery.removeEventListener("scroll", handleInfiniteScroll);
  }, [isMobile, handleInfiniteScroll, galleryHeight]);

  // Close expanded image when leaving Art section or hovering a Code project
  useEffect(() => {
    const handleClose = () => {
      if (selectedImage) closeModal();
    };
    window.addEventListener("leave-art-section", handleClose);
    window.addEventListener("code-project-hover", handleClose);
    return () => {
      window.removeEventListener("leave-art-section", handleClose);
      window.removeEventListener("code-project-hover", handleClose);
    };
  }); // runs every render to capture latest selectedImage/closeModal

  const openModal = (image) => {
    // Preload first 3 non-video detail images
    if (image.details?.length) {
      let preloaded = 0;
      for (const url of image.details) {
        if (preloaded >= 3) break;
        if (!isVideo(url)) {
          const img = new Image();
          img.src = url;
          preloaded++;
        }
      }
    }

    if (document.startViewTransition) {
      flushSync(() => {
        setActiveUniqueId(image.uniqueId || image.id);
      });
      document.startViewTransition(() => {
        flushSync(() => {
          setSelectedImage(image);
          setActiveDetailIndex(0);
        });
      });
    } else {
      setActiveUniqueId(image.uniqueId || image.id);
      setSelectedImage(image);
      setActiveDetailIndex(0);
    }
  };

  const closeModal = () => {
    setZoomEnabled(false);
    setZoomPos(null);
    if (!isMobile && selectedImage) {
      const img = selectedImage;
      if (document.startViewTransition) {
        setClosingImage(img);
        const transition = document.startViewTransition(() => {
          flushSync(() => {
            setSelectedImage(null);
            setActiveUniqueId(img.uniqueId || img.id);
          });
        });
        transition.finished.then(() => {
          setActiveUniqueId(null);
          setClosingImage(null);
        });
      } else {
        setClosingImage(img);
        setSelectedImage(null);
        setActiveUniqueId(null);
      }
      return;
    }
    if (document.startViewTransition) {
      const transition = document.startViewTransition(() => {
        flushSync(() => {
          setSelectedImage(null);
        });
      });
      transition.finished.then(() => {
        setActiveUniqueId(null);
      });
    } else {
      setSelectedImage(null);
      setActiveUniqueId(null);
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  // Keyboard navigation for project slides
  useEffect(() => {
    if (!selectedImage) return;
    const slideCount = getSlideCount(selectedImage);
    if (slideCount <= 1) return;

    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight" && activeDetailIndex < slideCount - 1) {
        switchDetailImage(activeDetailIndex + 1);
      } else if (e.key === "ArrowLeft" && activeDetailIndex > 0) {
        switchDetailImage(activeDetailIndex - 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }); // runs every render to capture latest activeDetailIndex

  // Desktop: close left panel image when clicking outside the gallery
  useEffect(() => {
    if (isMobile || !selectedImage) return;

    const handleClickOutside = (e) => {
      if (desktopGalleryRef.current?.contains(e.target)) return;
      // Don't double-fire if clicking the close button or the overlay itself
      if (leftPanel?.contains(e.target)) return;
      closeModal();
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isMobile, selectedImage]); // eslint-disable-line react-hooks/exhaustive-deps

  const renderModal = () => {
    if (!selectedImage) return null;
    const modalUrl = isVideo(selectedImage.url)
      ? selectedImage.url
      : selectedImage.url.replace(/\/\d+\/\d+$/, "/800/1000");
    return (
      <div className={styles.modal} onClick={handleBackdropClick}>
        <div className={styles.modalContent}>
          <button className={styles.closeButton} onClick={closeModal}>
            ✕
          </button>
          {isVideo(modalUrl) ? (
            <video
              src={modalUrl}
              className={styles.modalImage}
              style={{ viewTransitionName: "gallery-image" }}
              autoPlay
              loop
              muted
              playsInline
            />
          ) : (
            <img
              src={modalUrl}
              alt={selectedImage.title}
              className={styles.modalImage}
              style={{ viewTransitionName: "gallery-image" }}
            />
          )}
          <div className={styles.imageInfo}>
            <h3 className={styles.imageTitle}>{selectedImage.title}</h3>
            {selectedImage.description && (
              <p className={styles.imageDescription}>{selectedImage.description}</p>
            )}
          </div>
        </div>
      </div>
    );
  };

  const leftPanel = document.getElementById("leftPanel");

  // Total number of slides for a project: main + details + about
  const getSlideCount = (image) => {
    if (!image) return 0;
    return 1 + (image.details || []).length + (image.about ? 1 : 0);
  };

  const isAboutSlide = (image, index) => {
    return image?.about && index === getSlideCount(image) - 1;
  };

  // Get the media URL for a given slide index (not applicable for about slide)
  const getSlideUrl = (image, index) => {
    const raw = index === 0 ? image.url : (image.details || [])[index - 1];
    if (!raw) return null;
    return isVideo(raw) ? raw : raw.replace(/\/\d+\/\d+$/, "/800/1000");
  };

  const switchDetailImage = (index) => {
    if (index === activeDetailIndex) return;
    setZoomPos(null);
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        flushSync(() => {
          setActiveDetailIndex(index);
        });
      });
    } else {
      setActiveDetailIndex(index);
    }
  };

  const ZOOM_FACTOR = 3;

  const handleZoomMove = (e) => {
    if (!zoomEnabled || !zoomImageRef.current) return;
    const rect = zoomImageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({ x, y });
  };

  const handleZoomLeave = () => {
    setZoomPos(null);
  };

  const carouselRef = useRef(null);

  // Scroll active thumbnail into view in the carousel
  useEffect(() => {
    if (!selectedImage || !carouselRef.current || isMobile) return;
    const active = carouselRef.current.querySelector(`[data-carousel-active="true"]`);
    if (active) {
      active.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }
  }, [selectedImage, activeDetailIndex, isMobile]);

  const renderLeftPanelImage = () => {
    const image = selectedImage || closingImage;
    if (!image || !leftPanel) return null;
    const isClosing = !selectedImage && closingImage;
    const slideCount = getSlideCount(image);
    const showAbout = !isClosing && isAboutSlide(image, activeDetailIndex);
    const closingUrl = isVideo(image.url) ? image.url : image.url.replace(/\/\d+\/\d+$/, "/800/1000");
    const currentUrl = isClosing
      ? closingUrl
      : !showAbout ? getSlideUrl(image, activeDetailIndex) : null;

    // Thumbnails: main + details (as images) + about (as text indicator)
    const thumbImages = [image.url, ...(image.details || [])];

    return createPortal(
      <div
        className={`${styles.leftPanelOverlay} ${isClosing ? styles.leftPanelClosing : ""}`}
        data-video-overlay
        onAnimationEnd={() => { if (isClosing) setClosingImage(null); }}
      >
        {!isClosing && <button className={styles.leftPanelClose} onClick={closeModal}>✕</button>}
        {!isClosing && !showAbout && currentUrl && !isVideo(currentUrl) && (
          <button
            className={`${styles.zoomToggle} ${zoomEnabled ? styles.zoomToggleActive : ""}`}
            onClick={() => { setZoomEnabled((v) => !v); setZoomPos(null); }}
            title={zoomEnabled ? "Desactivar zoom" : "Activar zoom"}
          >⌕</button>
        )}
        {!isClosing && slideCount > 1 && activeDetailIndex > 0 && (
          <button className={`${styles.navArrow} ${styles.navArrowLeft}`} onClick={() => switchDetailImage(activeDetailIndex - 1)}>‹</button>
        )}
        {!isClosing && slideCount > 1 && activeDetailIndex < slideCount - 1 && (
          <button className={`${styles.navArrow} ${styles.navArrowRight}`} onClick={() => switchDetailImage(activeDetailIndex + 1)}>›</button>
        )}
        <div className={styles.leftPanelContent}>
          {showAbout ? (
            <div
              className={styles.aboutSlide}
              style={{ viewTransitionName: "gallery-image" }}
            >
              <h3 className={styles.aboutTitle}>{image.title}</h3>
              <div className={styles.aboutText}>
                {image.about.split("\n\n").map((paragraph, i) => (
                  <p key={i}>
                    {paragraph.split("\n").map((line, j, arr) => (
                      <span key={j}>{line}{j < arr.length - 1 && <br />}</span>
                    ))}
                  </p>
                ))}
              </div>
            </div>
          ) : currentUrl && isVideo(currentUrl) ? (
            <video
              key={currentUrl}
              src={currentUrl}
              className={styles.leftPanelImage}
              style={!isClosing ? { viewTransitionName: "gallery-image" } : undefined}
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
            />
          ) : (
            <div
              className={`${styles.zoomContainer} ${zoomEnabled ? styles.zoomActive : ""}`}
              onMouseMove={zoomEnabled ? handleZoomMove : undefined}
              onMouseLeave={zoomEnabled ? handleZoomLeave : undefined}
            >
              <img
                ref={zoomImageRef}
                src={currentUrl}
                alt={image.title}
                className={styles.leftPanelImage}
                style={{
                  ...((!isClosing) ? { viewTransitionName: "gallery-image" } : undefined),
                  ...(zoomEnabled && zoomPos ? {
                    transform: `scale(${ZOOM_FACTOR})`,
                    transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                    cursor: "zoom-in",
                  } : undefined),
                }}
              />
            </div>
          )}
          {!isClosing && slideCount > 1 && (
            <div className={styles.carousel} ref={carouselRef}>
              {Array.from({ length: slideCount }, (_, i) => {
                const isAbout = isAboutSlide(image, i);
                return (
                  <button
                    key={i}
                    data-carousel-active={i === activeDetailIndex ? "true" : undefined}
                    className={`${styles.carouselItem} ${i === activeDetailIndex ? styles.carouselItemActive : ""} ${isAbout ? styles.carouselItemAbout : ""}`}
                    onClick={() => switchDetailImage(i)}
                  >
                    {isAbout ? (
                      <span className={styles.carouselAboutLabel}>i</span>
                    ) : isVideo(thumbImages[i]) ? (
                      <span className={styles.carouselVideoPlaceholder}>&#9654;</span>
                    ) : (
                      <img
                        src={thumbImages[i]}
                        alt={`${image.title} - ${i === 0 ? "main" : `detail ${i}`}`}
                        className={styles.carouselThumb}
                        loading="lazy"
                        decoding="async"
                      />
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>,
      leftPanel
    );
  };

  // Desktop: vertical masonry grid — click shows image in left panel
  if (!isMobile) {
    return (
      <>
        <div className={styles.galleryContainer} ref={desktopGalleryRef}>
          <div className={styles.masonryGrid}>
            {PLACEHOLDER_IMAGES.map((image) => (
              <button
                key={image.id}
                className={`${styles.masonryItem} ${selectedImage?.id === image.id ? styles.masonryItemActive : ""}`}
                onClick={() => selectedImage?.id === image.id ? closeModal() : openModal(image)}
              >
                {isVideo(image.url) ? (
                  <LazyVideo
                    src={image.url}
                    className={styles.thumbnail}
                    style={
                      activeUniqueId === image.id && !selectedImage
                        ? { viewTransitionName: "gallery-image" }
                        : undefined
                    }
                  />
                ) : (
                  <img
                    src={image.url}
                    alt={image.title}
                    className={styles.thumbnail}
                    loading="lazy"
                    decoding="async"
                    style={
                      activeUniqueId === image.id && !selectedImage
                        ? { viewTransitionName: "gallery-image" }
                        : undefined
                    }
                  />
                )}
              </button>
            ))}
          </div>
        </div>
        {renderLeftPanelImage()}
      </>
    );
  }

  // Mobile: horizontal infinite scroll
  return (
    <>
      <div className={styles.galleryContainer} ref={containerRef}>
        <div
          className={styles.gallery}
          ref={galleryRef}
          onWheel={handleWheel}
          style={{ height: galleryHeight > 0 ? `${galleryHeight}px` : undefined }}
        >
          {INFINITE_IMAGES.map((image) => (
            <button
              key={image.uniqueId}
              className={`${styles.imageButton} ${styles[image.size]}`}
              onClick={() => openModal(image)}
            >
              {isVideo(image.url) ? (
                <LazyVideo
                  src={image.url}
                  className={styles.thumbnail}
                  style={
                    activeUniqueId === image.uniqueId && !selectedImage
                      ? { viewTransitionName: "gallery-image" }
                      : undefined
                  }
                />
              ) : (
                <LazyImage
                  src={image.url}
                  alt={image.title}
                  className={styles.thumbnail}
                  style={
                    activeUniqueId === image.uniqueId && !selectedImage
                      ? { viewTransitionName: "gallery-image" }
                      : undefined
                  }
                />
              )}
            </button>
          ))}
        </div>
      </div>
      {renderModal()}
    </>
  );
}

export default ImageGallery;
