import React, { useState, useEffect } from 'react';

import { Row, Col } from "react-bootstrap";
import CardPerfil from "../../componentes/cardPerfil/CardPerfil";
import Alert from 'react-bootstrap/Alert';

import logoMax from "../../img/logomax.png"

function Inicio(props) {
    const [datos, setDatos] = useState([]);

    function getRandomUniqueElements(array, count) {
        const shuffled = array.slice().sort(() => Math.random() - 0.5);
        return shuffled.slice(0, count);
    }

    let datathree = getRandomUniqueElements(datos, 3);

    useEffect(() => {
        async function fetchDatos() {
          const respuesta = await fetch('/data/usuarios.json');
          const datosJson = await respuesta.json();
          setDatos(datosJson);
        }

        fetchDatos();
    }, []);

    // Alertas

    const [alertVersion, setAlertVersion] = useState(true)
    const [alertBuscar, setAlertBuscar] = useState(true)
    const [alertMsg1, setAlertMsg1] = useState(true)

    return(
        <div className='minH'>
            <div className="encabezado">
                <Row className="centerContent">
                    <Col sm={12} md={11} lg={4} className=" mt-3 mb-3 centerContent">
                        <img src={logoMax} alt="Logo .P" className="logoContact" />
                    </Col>
                    <Col sm={10} md={11} lg={8} className=" mt-3 mb-3">
                        <div className='textStrike'>
                            <h1><span className='textStrikeView' data-text="Bienvenido a Portafolios UPG.">Bienvenido</span> </h1>
                        </div>
                        <h4>Universidad Pedro de Gante</h4>
                        <br/>
                        <p> Aquí encontrarás un directorio de los talentosos alumnos de la Universidad Pedro de Gante, donde podrás ver sus impresionantes trabajos y proyectos.</p>
                        <p>Además, como estudiante de la universidad, tienes la oportunidad de solicitar un subdominio personalizado para tener un sitio web como portafolio y usarlo como una herramienta valiosa en tus futuras entrevistas de trabajo. </p>
                        <p> <strong>¡Aprovecha esta oportunidad para mostrar tus habilidades y destacarte en el mundo laboral!</strong></p>
                    </Col>
                </Row>
            </div>
            <hr/>
            <Row  className="justify-content-xs-center justify-content-sm-center justify-content-md-center justify-content-lg-center">
                <Col sm={12} md={12} lg={12} className="centerContent mt-3 mb-3">
                    <h1 >Directorio</h1>
                    {/* <button onClick={()=>{props.goto("/contacto")}}>XD</button> */}
                </Col>
                {datathree.map((element, i) => (
                    <Col key={i} sm={11} md={8} lg={4} className="centerContent mt-3 mb-3">
                        <CardPerfil
                            data={element}
                        />
                    </Col>
                ))}
                <Col sm={12} md={12} lg={12} className="mt-3 mb-3">
                    <h1 className='text-center'>Avisos</h1>
                    {/* <button onClick={()=>{props.goto("/contacto")}}>XD</button> */}
                    {alertBuscar &&
                        <Alert variant='success' dismissible onClose={() => setAlertBuscar(false)}>
                            <Alert.Heading>¡Queremos conocer tus ideas! Ayúdanos a mejorar Portafolios UPG</Alert.Heading>
                            <p>¡Queremos escucharte! Estamos trabajando constantemente en mejorar nuestra plataforma para ofrecerte la mejor experiencia posible. <b>Si tienes ideas o sugerencias de funcionalidades que te gustaría ver en nuestro sitio, por favor envíanoslas al correo electrónico hola@portafoliosupg.com.</b> Nos encantaría saber de ti y trabajar juntos para hacer que nuestra plataforma sea aún mejor.</p>
                        </Alert>
                    }
                    {alertMsg1 &&
                            <Alert dismissible onClose={() => setAlertMsg1(false)}>
                                <Alert.Heading>Mensaje General</Alert.Heading>
                                <hr/>
                                <p>Queremos informar a nuestros usuarios que estamos trabajando arduamente en el desarrollo de nuestra plataforma tanto en la parte visual como en la de programación. Estamos comprometidos en ofrecerles la mejor experiencia posible y esperamos tener todo listo muy pronto.</p>
                                <p>Mientras tanto puedes solicitar un subdominio y asi pertenecer al Directorio de la Palataforma, al igual que solicitar publicar alguna imagen de tu creación en la parte de Galeria</p>
                                <p>Gracias por su paciencia y por formar parte de nuestra comunidad. Si tienen alguna duda o sugerencia, no duden en contactarnos.</p>
                            </Alert>
                    }
                    {alertVersion &&
                        <Alert dismissible variant='info' onClose={() => setAlertVersion(false)}>
                            <Alert.Heading>Aviso de Versión</Alert.Heading>
                            <hr/>
                            <h5>Versión 1.3 - Actualizado el</h5>
                            <p>Se agrego la seccion <b>Habilidades</b> a tu perfil en el directorio.</p>
                            <p>En el formulario de Unirse, se agrrego la opcion de agregar Habilidades</p>
                            <hr/>
                            <h5>Versión 1.2 - Actualizado el 27 de Febrero del 2023</h5>
                            <p>Se agrego la págian <b>Unirse</b>, aqui encontraras el formulario para poder mandar tu solicitud y poder unirte al Directorio de la plataforma.</p>
                            <p>Se agrego la paginacion en la parte de Directorio</p>
                            <p>Se agrego una opcion oculta para los usuarios, esta permite a tu imagen de portada que aparezca en el Carrusel</p>
                            <hr/>
                            <p className='mb-2'>Versión Actual 1.3</p>
                        </Alert>
                    }
                </Col>
            </Row>
        </div>
    );
}

export default Inicio