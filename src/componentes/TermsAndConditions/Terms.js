// Componentes Utiles
import React, {Fragment,  useState, useEffect} from 'react';
import {Route, Routes, Link, useNavigate, useLocation  } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import $ from 'jquery'
// import Usuarios from "./usuarios.json"

// Componentes Visuales
import Swal from 'sweetalert2'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
// import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function Terms () {
    const { pathname } = useLocation();
	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);

    // Cookies
	const [show, setShow] = useState(false);
	const [cookies, setCookie] = useCookies(["cookiesAccept"]);

	// Aparecen las cookies al principio
	useEffect(()=>{
        const validarCoockies = () => {
            if(cookies.cookiesAccept){
                // Ocultar Modal
            } else{
				handleShow()
            }
        }

        validarCoockies(); // eslint-disable-next-line
    }, [pathname])

    const [cookiesModal, setCookieModal] = useState(false)
	const handleCloseCookieModal = () => setCookieModal(false);
	const handleShowCookieModal = () => setCookieModal(true);

    const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const handleAccept = () => {
		handleClose();
		setCookie("cookiesAccept", true, {
			path: "/",
			maxAge: 99000000
		})
		$.getJSON("https://api.ipify.org?format=json", function(data) {
			console.log(data.ip);
		})
	}


    return (
        <div>
            <Modal show={cookiesModal}
                onHide={handleCloseCookieModal}
                backdrop="static"
                scrollable={true}
                // keyboard={false}
                size="lg"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Política de Cookies de Portafolios Upg</Modal.Title>
                </Modal.Header>
                <Modal.Body className='modalBody'>
                    <h5>1. ¿Qué son las cookies?</h5>
                    <p>Las cookies son pequeños archivos de texto que se descargan y almacenan en su dispositivo (ordenador, tablet o teléfono móvil) cuando usted visita un sitio web. Las cookies son ampliamente utilizadas para hacer que los sitios web funcionen, o para que funcionen de manera más eficiente, así como para proporcionar información a los propietarios del sitio web.</p>
                    <h5>2. ¿Qué tipos de cookies utiliza este sitio web?</h5>
                    <p>Este sitio web utiliza los siguientes tipos de cookies:</p>
                    <ul>
                        <li>Cookies técnicas: son aquellas que permiten al usuario navegar por el sitio web y utilizar las diferentes opciones o servicios que ofrece. Por ejemplo, identificar la sesión, acceder a partes de acceso restringido, recordar los elementos que integran un pedido, realizar el proceso de compra de un pedido, etc.</li>
                        <li>Cookies de análisis: son aquellas que nos permiten medir y analizar estadísticamente la utilización que hacen los usuarios de nuestro sitio web. Estas cookies nos permiten mejorar continuamente nuestros servicios y ofrecer una mejor experiencia de usuario. Utilizamos Google Analytics para este propósito.</li>
                    </ul>
                    <h5>3. ¿Cómo desactivar las cookies?</h5>
                    <p>El usuario puede permitir, bloquear o eliminar las cookies instaladas en su dispositivo mediante la configuración de las opciones del navegador instalado en su dispositivo. Si bloquea el uso de cookies en su navegador, es posible que algunos servicios o funcionalidades del sitio web no estén disponibles.</p>
                    <p>A continuación, se proporcionan enlaces a los principales navegadores y dispositivos para que pueda configurar sus opciones de cookies:</p>
                    <ul className='textLeft'>
                        <li>Chrome: <a target="_blank" href='https://support.google.com/chrome/answer/95647?hl=es' rel="noreferrer">https://support.google.com/chrome/answer/95647?hl=es</a></li>
                        <li>Safari: <a target="_blank" href='https://support.apple.com/en-us/HT201265' rel="noreferrer">https://support.apple.com/en-us/HT201265</a></li>
                        <li>Firefox: <a target="_blank" href='https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias' rel="noreferrer">https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias</a></li>
                        <li>Microsoft Edge: <a target="_blank" href='https://support.microsoft.com/es-es/topic/eliminar-y-administrar-cookies-168dab11-0753-043d-7c16-ede5947fc64d' rel="noreferrer"> https://support.microsoft.com/es-es/topic/eliminar-y-administrar-cookies-168dab11-0753-043d-7c16-ede5947fc64d</a></li>
                    </ul>
                    <h5>4. ¿Cómo utilizamos las cookies en nuestro sitio web?</h5>
                    <p>En Portafolios Upg utilizamos cookies para mejorar la experiencia del usuario y para obtener información estadística sobre el uso de nuestro sitio web. Las cookies nos permiten personalizar la navegación del usuario, ofrecer contenido personalizado, medir la eficacia de nuestra publicidad, identificar problemas y errores técnicos, y mejorar continuamente nuestros servicios.</p>
                    <h5>5. ¿Cómo puedo obtener más información?</h5>
                    <p>Si tiene alguna pregunta sobre nuestra Política de Cookies, no dude en ponerse en contacto con nosotros a través de los canales de comunicación establecidos en el sitio web.</p>
                </Modal.Body>

            </Modal>
            <Modal show={show}
                onHide={handleClose}
                backdrop="static"
                scrollable={true}
                keyboard={false}
                size="lg"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Terminos y Condiciones para el sitio web Portafolios Upg</Modal.Title>
                </Modal.Header>
                <Modal.Body className='modalBody'>
                    <p>Bienvenido a Portafolios Upg, un sitio web donde los alumnos y profesores de la Universidad Pedro de Gante pueden compartir sus portafolios e imágenes. Por favor, lea atentamente este aviso legal antes de utilizar el sitio web, ya que el acceso y uso del mismo implica la aceptación de sus términos y condiciones.</p>
                    <h5>Propiedad intelectual</h5>
                    <p>El contenido de este sitio web, incluyendo pero no limitado a textos, imágenes, videos, logos y diseño gráfico, está protegido por las leyes de propiedad intelectual y es propiedad exclusiva de Portafolios Upg y sus colaboradores. Queda prohibida cualquier reproducción, distribución, modificación o uso comercial de los contenidos sin autorización previa por escrito de Portafolios Upg y su autor original.</p>
                    <h5>Copyright</h5>
                    <p>Todo el contenido publicado por los usuarios en Portafolios Upg es propiedad exclusiva de dichos usuarios. No obstante, al publicar contenido en el sitio web, el usuario concede a Portafolios Upg una licencia no exclusiva, gratuita, transferible y sublicenciable para utilizar, reproducir, modificar, adaptar, publicar, traducir y distribuir dicho contenido en el sitio web. El usuario es responsable de obtener todas las autorizaciones necesarias de terceros para publicar cualquier contenido en el sitio web.</p>
                    <h5>Responsabilidad del usuario</h5>
                    <p>El usuario es responsable del uso que haga del sitio web y de su contenido. El usuario se compromete a utilizar este sitio web de forma adecuada, respetando la legalidad vigente, la moral y las buenas costumbres. Portafolios Upg no será responsable del uso indebido del sitio web por parte del usuario.</p>
                    <h5>Contenido subido de tono</h5>
                    <p>Portafolios Upg se reserva el derecho a eliminar cualquier contenido que se considere inapropiado o subido de tono. El usuario es el único responsable del contenido que publique en el sitio web, y debe asegurarse de que dicho contenido no infrinja los derechos de terceros ni viole las leyes aplicables. En caso de que el usuario publique contenido subido de tono, se reserva el derecho de tomar medidas legales contra dicho usuario.</p>
                    <h5>Privacidad y uso de cookies</h5>
                    {/* <p>Portafolios Upg cumple con las normas de protección de datos personales y privacidad. Para obtener más información sobre nuestra política de privacidad, consulte nuestra Política de privacidad.</p> */}
                    <p>En este sitio web se utilizan cookies propias y de terceros para mejorar la experiencia del usuario. Al aceptar los Terminos y Condiciones, usted acepta el uso de cookies. Para obtener más información sobre el uso de cookies en este sitio web, consulte nuestra <Link onClick={()=>{handleShowCookieModal()}}>Política de cookies.</Link></p>
                    <h5>Confidencialidad y privacidad de los datos</h5>
                    <p>En Portafolios Upg, los usuarios pueden compartir sus datos de contacto, como su correo electrónico o número de teléfono, para que terceros puedan contactarlos. Portafolios Upg no se hace responsable del mal uso que terceros puedan hacer de los datos de contacto compartidos por los usuarios. Los usuarios son los únicos responsables de la precisión y legalidad de los datos de contacto que proporcionen y deben tener en cuenta los posibles riesgos asociados a compartir sus datos de contacto en el sitio web. Se recomienda a los usuarios que consideren cuidadosamente los riesgos antes de compartir sus datos de contacto con terceros.</p>
                    <h5>El Directorio</h5>
                    <p>En Portafolios Upg, los usuarios pueden optar por aparecer en "El Directorio", una sección del sitio web que muestra los datos de contacto de los usuarios que han decidido participar. Al hacerlo, los usuarios aceptan que sus datos de contacto, como su correo electrónico y número de teléfono, se muestren públicamente en el sitio web.</p>
                    <p>Los usuarios deben tener en cuenta que sus datos permanecerán en el directorio incluso después de que ya no tengan una relación activa con la Universidad Pedro de Gante, a menos que soliciten explícitamente la eliminación de su información del directorio. Sin embargo, Portafolios Upg se reserva el derecho de eliminar cualquier información del directorio si así lo considera necesario.</p>
                    <p>En caso de que un usuario desee eliminar su información del directorio en cualquier momento, puede hacerlo a través de una peticion al correo hola@portafoliosupg.com. Portafolios Upg no se hace responsable por ninguna pérdida o daño que pueda resultar de la eliminación de la información del directorio.</p>
                    <h5>La Galeria</h5>
                    <p>En Portafolios Upg, los usuarios pueden optar por compartir su trabajo en la sección "La Galería", una sección del sitio web que muestra fotografías o archivos multimedia proporcionados por el usuario. Al hacerlo, los usuarios aceptan que sus obras se muestren públicamente en el sitio web.</p>
                    <p>Los usuarios deben tener en cuenta que sus obras permanecerán en la galería incluso después de que ya no tengan una relación activa con la Universidad Pedro de Gante, a menos que soliciten explícitamente la eliminación de su contenido de la galería. Sin embargo, Portafolios Upg se reserva el derecho de eliminar cualquier contenido de la galería si así lo considera necesario.</p>
                    <p>En caso de que un usuario desee eliminar su contenido de la galería en cualquier momento, puede hacerlo a través de una peticion al correo hola@portafoliosupg.com. Portafolios Upg no se hace responsable por ninguna pérdida o daño que pueda resultar de la eliminación del contenido de la galería.</p>
                    <h5>Adquisición de subdominio</h5>
                    <p>Los subdominios en Portafolios Upg son propiedad exclusiva de la plataforma y están sujetos a disponibilidad. Los usuarios pueden adquirir un subdominio para alojar su portafolio personal, pero el subdominio será eliminado si el usuario ya no tiene una relación activa con la Universidad Pedro de Gante, ya sea porque ha concluido sus estudios como alumno o ha concluido su trabajo como profesor.</p>
                    <p>En caso de que un usuario desee mantener su subdominio en Portafolios Upg después de concluir su tiempo en la Universidad Pedro de Gante, puede hacerlo a cambio de una tarifa, que será determinada por Portafolios Upg. Los usuarios serán notificados con anticipación en caso de que se vaya a implementar una tarifa por el alojamiento de su subdominio. Portafolios Upg no se hace responsable por ninguna pérdida o daño que pueda resultar de la eliminación del subdominio.</p>
                    <h5>Modificaciones</h5>
                    <p>Portafolios Upg se reserva el derecho de modificar en cualquier momento y sin previo aviso los contenidos y la estructura del sitio web. Asimismo, se reserva el derecho de suspender temporalmente el acceso al sitio web por motivos de mantenimiento, actualización o mejora.</p>
                    <h5>Legislación aplicable y jurisdicción</h5>
                    <p>Este aviso legal se regirá e interpretará de acuerdo con las leyes de México. Cualquier disputa que surja en relación con este aviso legal será sometida a la jurisdicción de los tribunales competentes de México.</p>
                    <p>Si tienes alguna duda o consulta sobre este aviso legal, por favor contáctanos a través de los canales de comunicación establecidos en el sitio web.</p>
                    {!cookies.cookiesAccept &&
                    <div>
                        <hr/>
                        Para aceptar estos términos y condiciones, utilice el botón "Aceptar". Si desea continuar sin aceptar, utilice el botón "Denegar".
                    </div>
                    }
                </Modal.Body>
                {!cookies.cookiesAccept &&
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Denegar
                        </Button>
                        <Button variant="primary" onClick={handleAccept}>
                            Aceptar
                        </Button>
                    </Modal.Footer>
                }
            </Modal>
        </div>
    )
}

export default Terms