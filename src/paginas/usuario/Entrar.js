import { useState, useRef, useEffect } from "react"
import axios from 'axios';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';


import Form from 'react-bootstrap/Form';
import { Button, Col, Row } from "react-bootstrap"
import clsx from "clsx";

import logoMax from "../../img/logomax.png"

function Entrar(props) {
    const form = useRef();
    const navigate = useNavigate();

    const notify = (text, type) => {
        Swal.fire({
            position: 'center',
            icon: type,
            title: text,
            showConfirmButton: false,
            toast: true,
            timer: 3500
        })
    }

    const userLogin = (e) => {
        e.preventDefault()
        let dataLogin = {nickname: "", password: "", token: ""}
        const formData = new FormData(e.target)
        const formDataObj = Object.fromEntries(formData.entries())

        // Set Data
        dataLogin.nickname = formDataObj.dato1
        dataLogin.password = formDataObj.dato2
        dataLogin.token = formDataObj.dato3

        axios.post('https://api.portafoliosupg.com/iniciarSesion.php', dataLogin, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        .then(response => {
            notify("Bienvenida/o "+ formDataObj.dato1  , "success")
            localStorage.setItem('usuario', JSON.stringify({
                user: formDataObj.dato1,
                token: formDataObj.dato3
            }));
            localStorage.setItem('sesion', JSON.stringify({
                user: formDataObj.dato1,
                status: true
            }));
            console.log('SUCCESS!', response.data);
            navigate("/")
        })
        .catch(error => {
            notify(error.response.data.type, "error")
            console.log(error.response.data); // Manejar el error de la solicitud
        });


    }
    return(
        <div>
            <Row>
                <Col xs={12} sm={12} md={12} lg={6} className=" mt-3 mb-3 centerContent">
                    <img src={logoMax} alt="Logo .P" className="logoContact" />
                </Col>
                <Col xs={12} sm={12} md={12} lg={6}>
                    <h3>Inicio de Sesion</h3>
                    <hr/>
                    <Form
                        id="register-form"
                        ref={form}
                        className="needs-validation"
                        onSubmit={(e)=>{userLogin(e)}}
                        style={{width: "100%"}}
                        autoComplete="new-password"
                    >
                        {/* Nombre */}
                        <Form.Group className="mb-3" controlId="dato1">
                            <Form.Label>Nombre de Usuario</Form.Label>
                            <Form.Control
                                // className={clsx("form-control", usedName || (name.length <= 3 || name === "") ? "is-invalid" : "")}
                                // onChange={(e)=>{setNameUser(e)}}
                                // value={name}
                                autoComplete="new-password"
                                type="text"
                                placeholder="FranchescoBergolini"
                                name="dato1"
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="dato2">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                // className={clsx("form-control", usedName || (name.length <= 3 || name === "") ? "is-invalid" : "")}
                                // onChange={(e)=>{setNameUser(e)}}
                                // value={name}
                                autoComplete="new-password"
                                type="password"
                                name="dato2"
                                required
                            />
                        </Form.Group>
                        <hr/>
                        <Form.Group className="mb-3" controlId="dato3">
                            <Form.Label>Token</Form.Label>
                            <Form.Control
                                // className={clsx("form-control", usedName || (name.length <= 3 || name === "") ? "is-invalid" : "")}
                                // onChange={(e)=>{setNameUser(e)}}
                                // value={name}
                                autoComplete="new-password"
                                type="password"
                                name="dato3"
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">Entrar</Button>
                    </Form>
                </Col>
            </Row>
        </div>
    )
}

export default Entrar