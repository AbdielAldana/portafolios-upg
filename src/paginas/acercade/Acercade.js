// import { useLocation } from "react-router-dom";

import Container from 'react-bootstrap/Container';

function Acercade() {
    // let { state } = useLocation();

    return(
        <Container className='mb-5' style={{minHeight:"50vh", textAlign: "justify"}}>
            <h1>Acerca de</h1>
            <hr/>
            <p>Portafolios UPG es una plataforma de alojamiento de portafolios en línea creada por el profesor Adolfo Abdiel Ramírez Aldana para la comunidad de la Universidad Pedro de Gante. En ella, estudiantes y profesores pueden mostrar su trabajo a través de subdominios personalizados que pueden ser utilizados como una página web o un archivo PDF.</p>
            <p>Además de los portafolios, la plataforma también cuenta con un blog donde los usuarios pueden publicar artículos sobre temas relacionados con el arte y el diseño. La plataforma también incluye un Directorio de los registrados, donde se muestran los datos de contacto de los usuarios que han autorizado su publicación en la plataforma. Este Directorio es accesible a través de la plataforma, y el registro se realiza mediante solicitud de correo electrónico o WhatsApp directamente con el profesor Adolfo Abdiel.</p>
            <p>Adicionalmente, se encuentra disponible una galería de arte digital, donde los usuarios pueden subir sus fotografías y archivos multimedia para compartir con la comunidad universitaria. De esta forma, Portafolios UPG se convierte en un espacio en línea que fomenta la creatividad y la colaboración entre los miembros de la comunidad universitaria.</p>
            <p>El registro en la plataforma se realiza mediante solicitud de correo electrónico o WhatsApp directamente con el profesor Adolfo Abdiel. La plataforma no cuenta con un sistema de cuenta formal, y todas las solicitudes son manejadas personalmente por el profesor. Esto garantiza la privacidad y seguridad de los datos de los usuarios, y permite una atención personalizada y rápida para cualquier duda o consulta.</p>
            <p>En Portafolios UPG, creemos que la creatividad y la colaboración son fundamentales en la comunidad universitaria. Por eso, nuestra plataforma es una herramienta útil para que estudiantes y profesores puedan mostrar su trabajo y conectar con otros miembros de la comunidad con intereses similares.</p>

            <h3>El Directorio</h3>
            <hr/>
            <p>El Directorio es una sección de la plataforma Portafolios UPG donde se muestran los datos básicos de contacto de los usuarios que han decidido participar en la misma. Para poder pertenecer a la plataforma, es necesario que el usuario brinde, al menos, su nombre completo, carrera y semestre en el que se encuentra actualmente.</p>
            <p>El objetivo principal del Directorio es facilitar el contacto entre los usuarios que forman parte de la plataforma. Por ejemplo, si un alumno quiere contactar a un profesor para solicitar un asesoramiento, puede buscar su nombre en el Directorio y encontrar rápidamente su correo electrónico o número de teléfono.</p>
            <p>El Directorio no sólo permite a los miembros de la comunidad universitaria conocer a sus compañeros y colegas, sino que también puede servir como un catálogo para empresas externas que buscan talentos en la Universidad Pedro de Gante. Al proporcionar esta información en el Directorio, los estudiantes y profesores pueden aumentar su visibilidad y posibilidades de ser contactados para futuras oportunidades laborales o proyectos.</p>
            <p>Es importante destacar que el Directorio es una sección obligatoria para los usuarios que deseen participar en la plataforma Portafolios UPG. Sin embargo, los usuarios pueden decidir si desean compartir más información en el Directorio, como su especialidad, proyectos destacados, entre otros. Cabe mencionar que la información del Directorio no será compartida con terceros ajenos a la plataforma sin el previo consentimiento del usuario.</p>
            <p>En resumen, el Directorio es una sección de la plataforma que tiene como objetivo facilitar el contacto entre los usuarios. Para pertenecer a la plataforma, es necesario que el usuario brinde su nombre, carrera y semestre. Sin embargo, los usuarios pueden decidir si desean compartir más información en el Directorio.</p>
            <h3>La Galeria</h3>
            <hr/>
            <p>La sección de Galería en Portafolios UPG es un espacio diseñado para que los usuarios de la plataforma puedan mostrar sus creaciones artísticas y diseños. En esta sección, los usuarios pueden compartir sus fotografías, dibujos, ilustraciones, videos y cualquier otro tipo de archivo multimedia que quieran exhibir.</p>
            <p>La galería tiene como objetivo principal brindar una plataforma para que los estudiantes y profesores puedan mostrar sus habilidades creativas y artísticas a una audiencia más amplia. Además, puede ser una herramienta útil para que las empresas y otros empleadores encuentren talentos dentro de la universidad.</p>
            <p>La galería también cuenta con herramientas de organización y clasificación para que los visitantes puedan navegar fácilmente por las diferentes secciones y categorías. Los usuarios pueden agregar descripciones detalladas a sus obras, así como incluir información adicional como el nombre del autor, el año de creación, la técnica utilizada y cualquier otro dato relevante.</p>
            <p>Es importante destacar que la galería está abierta a todos los usuarios de la plataforma, siempre y cuando se respeten las normas de uso y contenido. En ella se busca fomentar la creatividad, la innovación y el talento artístico, y se espera que los usuarios se inspiren y se conecten a través de ella.</p>
            <h3>El Blog</h3>
            <hr/>
            <p>La sección de blog es un espacio en el que todos los usuarios de la plataforma, ya sean alumnos o profesores, pueden publicar artículos relacionados con Diseño de Modas, Diseño Gráfico o Animación Digital. Si tienes algo interesante que compartir, ¡no dudes en hacerlo! El crédito siempre será otorgado al autor del artículo, y para publicar un artículo en la plataforma, debes enviar una solicitud al correo hola@portafoliosupg.com. Anímate a ser parte de esta comunidad creativa y compartir tu conocimiento con otros usuarios.</p>
            <p>Los artículos publicados en nuestro Blog pueden cubrir una amplia gama de temas, desde tendencias en diseño y consejos para estudiantes hasta noticias y reseñas de eventos y exposiciones. Nos esforzamos por mantener nuestro Blog actualizado y relevante, y esperamos que los usuarios aprovechen este espacio para inspirarse y conectarse con otros miembros de la comunidad creativa.</p>
            <p>También aceptamos historias. ¡Nos encantaría escuchar de ti!</p>
        </Container>
    );
}

export default Acercade