import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';


import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

import Alerta from '../../componentes/alertas/Alerta';

import logoMax from "../../img/logomax.png"



function Contacto() {

    const [alertSend, setAlertSend] = useState(false);
    const [showForm, setshowForm] = useState(false)


    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();
        setshowForm(true)
        emailjs.sendForm('service_ltujdol', 'template_6xos1sd', form.current, 'u4fVWui7VVf-JwFwX')
        .then((result) => {
            setAlertSend(true)
            setTimeout(() => {
                setAlertSend(false)
            }, 4000);
            e.target.reset()
        }, (error) => {
            console.log(error.text);
        });
    }

    const [choicePeticion, setChoicePeticion] = useState("comentario")

    const handleSelectPeticion = (choice)=>{
        setChoicePeticion(choice.target.value) // eslint-disable-next-line 
    }

    return(
    <div className='minH'>

        <Alerta
            show={alertSend}
            type="success"
            title="Correo enviado!"
            textContent="Se paciente y espera una respuesta del administrador. Pronto te llegara un correo de 'hola@portafoliosupg.com'"
        ></Alerta>

        <Row className='mt-5'>
            <Col md="12" lg="6" className='centerContent'>
                <img src={logoMax} alt="Logo .P" className="logoContact" />
            </Col>
            <Col md="12" lg="6" className='centerContent'>
                <Form ref={form} onSubmit={(e)=>{sendEmail(e)}} autoComplete="new-password" style={{width: "100%"}}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control type="text" placeholder="Fulanito de Tal" name="user_name" required autoComplete="new-password"/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="name@example.com" name="user_email" required autoComplete="new-password"/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Peticion</Form.Label>
                        <Form.Select aria-label="Tetramestre" name="user_proposito" onChange={(choice) => handleSelectPeticion(choice)}>
                            <option value="comentario">Comentario</option>
                            <option value="duda">Duda o Pregunta</option>
                            <option value="denuncia">Denuncia</option>
                            {/* <option value="subdominio">Obtener un subdominio</option>
                            <option value="directorio">Registrarse solo en el directorio</option> */}
                        </Form.Select>
                    </Form.Group>
                    {choicePeticion === "subdominio" &&
                        <div>
                            <hr/>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Nombre o seudonimo en el Directorio</Form.Label>
                                <Form.Control type="text" placeholder="elPoderoso3000" name="user_nickname" required autoComplete="new-password"/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Nombre del subdominio</Form.Label>
                                <div style={{display:"flex"}}>
                                    <Form.Control type="page" placeholder="example.portafoliosupg.com" name="user_link" required autoComplete="new-password"/>
                                    <OverlayTrigger trigger={['hover', 'focus']} key={"left"} placement={"left"} 
                                        overlay={
                                            <Popover id={`popover-positioned-${"left"}`}>
                                            <Popover.Header as="h3">Aviso</Popover.Header>
                                            <Popover.Body>
                                                Al solicitar un subdomino, entraras directamente al Directorio.
                                                <br/>
                                                Eviaras los archivos por correo una vez te respondamos.
                                                <br/>
                                                Si no tienes una página, puedes pedir una plantilla.
                                            </Popover.Body>
                                            </Popover>
                                        }
                                    >
                                        <Button variant="secondary" className="ms-3">?</Button>
                                    </OverlayTrigger>
                                </div>
                            </Form.Group>
                            <hr/>
                        </div>
                    }
                    {choicePeticion === "directorio" &&
                        <div>
                            <hr/>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Nombre o seudonimo en el Directorio</Form.Label>
                                <Form.Control type="text" placeholder="elPoderoso3000" name="user_nickname" required autoComplete="new-password"/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Red Social</Form.Label>
                                <div style={{display:"flex"}}>
                                    <Form.Control type="page" placeholder="Link" name="user_link" required autoComplete="new-password"/>
                                    <OverlayTrigger trigger={['hover', 'focus']} key={"left"} placement={"left"} 
                                        overlay={
                                            <Popover id={`popover-positioned-${"left"}`}>
                                            <Popover.Header as="h3">Aviso</Popover.Header>
                                            <Popover.Body>
                                                Puedes enviarnos un PDF con tu portafolio para ponerlo en el Directorio.
                                                <br/>
                                                Eviaras los archivos por correo una vez te respondamos.
                                            </Popover.Body>
                                            </Popover>
                                        }
                                    >
                                        <Button variant="secondary" className="ms-3">?</Button>
                                    </OverlayTrigger>
                                </div>
                            </Form.Group>
                            <hr/>
                        </div>
                    }
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Tetramestre</Form.Label>
                        <Form.Select aria-label="Tetramestre" name="user_grade">
                            <option value="1">1° Primero</option>
                            <option value="2">2° Segundo</option>
                            <option value="3">3° Tersero</option>
                            <option value="4">4° Cuarto</option>
                            <option value="5">5° Quinto</option>
                            <option value="6">6° Sexto</option>
                            <option value="7">7° Septimo</option>
                            <option value="8">8° Octavo</option>
                            <option value="9">9° Noveno</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Licenciatura</Form.Label>
                        <Form.Select aria-label="Carrera" name="user_carrera">
                            <option value="DISEÑO GRÁFICO PUBLICITARIO">DISEÑO GRÁFICO PUBLICITARIO</option>
                            <option value="DISEÑO Y MERCADOTECNIA DE MODAS">DISEÑO Y MERCADOTECNIA DE MODAS</option>
                            <option value="ANIMACIÓN Y ARTE DIGITAL">ANIMACIÓN Y ARTE DIGITAL</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Comentarios:</Form.Label>
                        <Form.Control as="textarea" rows={3} name="message" required autoComplete="new-password"/>
                    </Form.Group>
                    <Button variant="primary" disabled={showForm} type="submit" value="Send">
                        Enviar
                    </Button>
                </Form>
            </Col>
        </Row>
    </div>
    );
}

export default Contacto
