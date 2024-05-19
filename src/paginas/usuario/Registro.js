import { useState, useRef, useEffect } from "react"
import axios from 'axios';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';

import Form from 'react-bootstrap/Form';
import { Button, Col, Row } from "react-bootstrap"
import { Link } from "react-router-dom";
import clsx from "clsx";

import logoMax from "../../img/logomax.png"



// import Alert from 'react-bootstrap/Alert';

function Registro(props) {
    const form = useRef();
    const navigate = useNavigate();

    const [usersActives, setUserActives] = useState([])

    useEffect(()=>{
        axios.get('https://api.portafoliosupg.com/users.php', {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        .then(response => {
            console.log('SUCCESS! Get User Actives');
            setUserActives(response.data)
        })
        .catch(error => {
            notify("Algo salio mal", "error")
            console.log(error); // Manejar el error de la solicitud
        });
    },[])

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

    const initialDataToSend = {nickname: "", email: "", password: ""}

    const [name, setName] = useState("");
    const [usedName, setUsedName] = useState(false)
    const [mail, setMail] = useState("");
    const [usedMail, setUsedMail] = useState(false)
    const [mailValid, setMailValid] = useState("");
    const [pass, setPass] = useState("");
    const [cpass, setCpass] = useState("");
    const [term, setTermn] = useState(false);

    const [blockButton, setBlockButton] = useState(false)

    const setNameUser   =  (e) => {
        const tempUsersActives = usersActives;
        const val = e.target.value
        if(tempUsersActives.find(e => e.nick === val)){
            setUsedName(true)
        } else {
            setUsedName(false)
        }
        setName(val);
    }
    const setMailUser   =  (e) => {
        const tempUsersActives = usersActives;
        const val = e.target.value
        if(tempUsersActives.find(e => e.email === val)){
            setUsedMail(true)
        } else {
            setUsedMail(false)
        }
        setMail(val);
    }
    const setPassword   =  (e) => setPass(e.target.value);
    const setCPassword  =  (e) => setCpass(e.target.value);
    const setTermUser   =  (e) => setTermn(!term);

    useEffect(()=>{
        // eslint-disable-next-line no-useless-escape
        const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        let tempMail = mail
        if (regex.test(tempMail)) {
            setMailValid(true)
        } else {
            setMailValid(false)
        }
    },[mail, setMail])

    const userRegister = (e)=>{
        e.preventDefault()
        const formData = new FormData(e.target)
        const formDataObj = Object.fromEntries(formData.entries())

        initialDataToSend.nickname = formDataObj.dato1
        initialDataToSend.email = formDataObj.dato2
        initialDataToSend.password = formDataObj.cdato3

        axios.post('https://api.portafoliosupg.com/registro.php', initialDataToSend, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        .then(response => {
            setBlockButton(true)
            notify("Solicitud Enviada", "success")
            console.log('SUCCESS!', response.data);
            setTimeout(() => {
                navigate('/inicio-sesion');
        }, 2000);
        })
        .catch(error => {
            notify("Algo salio mal", "error")
            console.log(error); // Manejar el error de la solicitud
        });
    }


    const Terms = <p>Aceptas los <Link onClick={()=>{props.term()}}>Terminos y Condiciones</Link></p>

    return(
        <div>
            <Row>
                <Col xs={12} sm={12} md={12} lg={6} className=" mt-3 mb-3 centerContent">
                    <img src={logoMax} alt="Logo .P" className="logoContact" />
                </Col>
                <Col xs={12} sm={12} md={12} lg={6}>
                    <h3>Resgistro de Usuario</h3>
                    <hr/>
                    <Form
                        id="register-form"
                        ref={form}
                        className="needs-validation"
                        onSubmit={(e)=>{userRegister(e)}}
                        style={{width: "100%"}}
                        autoComplete="new-password"
                    >
                        {/* Nombre */}
                        <Form.Group className="mb-3" controlId="dato1">
                            <Form.Label>Nombre de Usuario</Form.Label>
                            <Form.Control
                                className={clsx("form-control", usedName || (name.length <= 3 || name === "") ? "is-invalid" : "")}
                                onChange={(e)=>{setNameUser(e)}}
                                value={name}
                                autoComplete="new-password"
                                type="text"
                                placeholder="FranchescoBergolini"
                                name="dato1"
                                required
                            />
                            {usedName &&
                                <Form.Text style={{color: "red"}}>
                                    El nombre de Usuario no esta disponible. <br/>
                                </Form.Text>
                            }
                            {(name.length <= 3 || name === "") &&
                                <Form.Text>
                                    El nombre de Usuario debe tener minimo 4 caracteres. <br/>
                                </Form.Text>
                            }
                            <Form.Text className="text-muted">
                                Este solo será visible para ti y te servira para el inicio de sesion.
                            </Form.Text>
                        </Form.Group>
                        {/* Email */}
                        <Form.Group className="mb-3" controlId="dato2">
                            <Form.Label>Correo</Form.Label>
                            <Form.Control
                                className={clsx("form-control", usedMail || !mailValid ? "is-invalid" : "")}
                                onChange={(e)=>{setMailUser(e)}}
                                value={mail}
                                autoComplete="new-password"
                                type="email"
                                placeholder="nombre@correo.com"
                                name="dato2"
                                required
                            />
                            {!mailValid &&
                                <Form.Text>
                                    El correo de Usuario debe de ser correcto <b>usuario@correo.com</b>. <br/>
                                </Form.Text>
                            }
                            {usedMail &&
                                <Form.Text style={{color: "red"}}>
                                    Este correo ya esta en uno, prueba otro direferente. <br/>
                                </Form.Text>
                            }
                        </Form.Group>
                        <hr/>
                        {/* Password */}
                        <Form.Group className="mb-3" controlId="dato3">
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control value={pass} onChange={(e)=>{setPassword(e)}} autoComplete="new-passwordd" className="form-control"  type="password" name="dato3" required />
                        </Form.Group>
                        {/* Confirm Password */}
                        <Form.Group className="mb-3" controlId="cdato3">
                            <Form.Label>Confirmar Contraseña</Form.Label>
                            <Form.Control className={clsx("form-control", pass === cpass ? "" : "is-invalid")} value={cpass} onChange={(e)=>{setCPassword(e)}}  autoComplete="new-password2" type="password" name="cdato3" required />
                        </Form.Group>

                        <hr/>
                        {/* Terminos y Condiciones */}
                        <Form.Group className="mb-3" controlId="Term">
                            <Form.Label>Terminos y Condiciones</Form.Label>
                            <Form.Check type="checkbox" label={Terms} name="acceptTerm" value={term} onChange={(e)=>{setTermUser(e)}} />
                        </Form.Group>
                        {/* Boton Enviar */}
                        {!blockButton &&
                            <Button variant="primary" type="submit" disabled={
                                name.length <= 3 || name === "" ? true :
                                usedName ? true :
                                mailValid !== true ? true :
                                usedMail ? true :
                                pass !== cpass || cpass.length === 0 ? true :
                                term !== true ? true :
                                false
                            }>
                                Registrarse
                            </Button>
                        }
                    </Form>
                </Col>
            </Row>
        </div>
    )
}

export default Registro