import { useState, useRef } from "react"
import Swal from 'sweetalert2'
import emailjs from '@emailjs/browser';
import { useNavigate } from 'react-router-dom';



import Form from 'react-bootstrap/Form';
import { Button, Col, Row } from "react-bootstrap"
import Alert from 'react-bootstrap/Alert';

import { BsFillTrashFill } from "react-icons/bs";

import logoMax from "../../img/logomax.png"


function Unirse(props) {

    const navigate = useNavigate();

    const notify = (text, type) => {
        Swal.fire({
            position: 'top-end',
            icon: type,
            title: text,
            showConfirmButton: false,
            toast: true,
            timer: 3500
        })
    }

    const form = useRef();
    const formRefs = {
        redsocial: useRef(null),
    };

    const dataToSend =
    {
        "name": "Nombre",
        "nick": "Nickname",
        "genero": "h",
        "perfil": "...",
        "img": "...",
        "lic": "Lic Diseño Gráfico Publicitario",
        "tetra": "1to Tetramestre",
        "pro": "...",
        "linkText": "...",
        "link": "...",
        "status": "No Buscando",
        "contacto": {
            "tel": "No Encontrado",
            "mail": "No Encontrado"
        },
        "galeria": []
    }

    const linkDefault = "https://portafoliosupg.com/imagenes/perfil/"

    const sendEmail = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target)

        const formDataObj = Object.fromEntries(formData.entries())
        dataToSend.name = formDataObj.name
        dataToSend.nick = formDataObj.nick
        dataToSend.genero = formDataObj.genero
        dataToSend.perfil = linkDefault+formDataObj.nick.replace(/\s+/g, '').toLowerCase()+"/"+formDataObj.perfil
        dataToSend.img = linkDefault+formDataObj.nick.replace(/\s+/g, '').toLowerCase()+"/"+formDataObj.img
        dataToSend.lic = formDataObj.lic
        dataToSend.tetra = formDataObj.tetra
        dataToSend.pro = formDataObj.pro
        dataToSend.linkText = formDataObj.linkText
        dataToSend.link = checkRadio === "redsocial" ? formDataObj.link : checkRadio === "pdf" ? linkDefault+formDataObj.nick.replace(/\s+/g, '').toLowerCase()+"/"+formDataObj.link : "https://"+ formDataObj.nick +".portafoliosupg.com"
        dataToSend.status = formDataObj.status ? "Buscando" : "No Buscando"
        dataToSend.contacto.tel = formDataObj.telOn === "true" ? formDataObj.tel : "No Encontrado"
        dataToSend.contacto.mail = formDataObj.mailOn === "true" ? formDataObj.mail : "No Encontrado"

        let tempGaleria = []
        let docValid = /^[A-Za-z0-9]+\.[A-Za-z]+$/;
        let linkValid = /^https:\/\/.*\..*/;


        if(checkRadio === "redsocial"){
            if (!linkValid.test(formDataObj.link)) {
                formRefs.redsocial.current.focus();
                setTimeout(()=>{
                    notify("Formato mal escrito. Tu Link de Red Social No es valido", "error")
                },[1000])
                return false;
            }
        };

        let continuar = true

        galeria.forEach((e, i)=>{
            if (!docValid.test(formDataObj[e])) {
                document.getElementById(inputRefs.current[i]).focus()
                setTimeout(()=>{
                    notify("El formato de la imagen es invalido", "error")
                },[1000])
                continuar = false
            }
            tempGaleria.push({
                "imgName": linkDefault+formDataObj.nick.replace(/\s+/g, '').toLowerCase()+"/"+formDataObj[e],
                "title": formDataObj["galeriaNombre"+i]
            })
        })

        if (!continuar) return false

        dataToSend.galeria = tempGaleria

        if (!nickValid) {
            return false
        }

        if (!docValid.test(formDataObj.perfil) || !docValid.test(formDataObj.img)) {
            notify("Formato mal escrito.", "error");
            return false;
        }

        let todo = {
            todo: JSON.stringify(dataToSend),
            name: formDataObj.name,
            correo: formDataObj.mail,
            telefono: formDataObj.tel
        }

        // console.log(dataToSend);
        // notify("Solicitud Enviada", "success")
        emailjs.send('service_ltujdol', 'template_ehn900m', todo, 'u4fVWui7VVf-JwFwX')
        .then((result) => {
            notify("Solicitud Enviada", "success")
            console.log('SUCCESS!', result.status, result.text);
            setTimeout(() => {
                navigate('/inicio');
            }, 2000);
        }, (error) => {
            notify("Algo salio mal", "error")
            console.log(error.text);
        });
    }

    const [checkRadio, setCheckRadio] = useState("")

    const viewCheckRadio = (e) => {
        setCheckRadio(e.target.value)
    }

    const inputRefs = useRef([]);

    

    const [galeria, setGaleria] = useState([])

    const addGaleria = ()=> {
        let tempGaleria = galeria
        tempGaleria.push("galeria"+tempGaleria.length)
        // const index = inputRefs.current.indexOf(tempGaleria.length);
        // console.log("input index:", inputRefs);
        setGaleria([...tempGaleria])
    }

    const deleteGaleria = (i) => {
        let tempGaleria = galeria
        tempGaleria.splice(i, 1)
        setGaleria([...tempGaleria])
    }

    const [nickName, setNickName] = useState("")
    const [nickValid, setNickValid] = useState(true)

    const changeNickName = (e) => {
        setNickName(e.target.value)
        var regex = /^[A-Za-z]+$/;
        if(!regex.test(e.target.value)){
            setNickValid(false)
            notify("Nick Invalido, prueba otro", "error")
            return
        }
        if(!filtro(e.target.value).length >= 1){
            // notify("Nick valido", "success")
        } else {
            notify("Nick Invalido, prueba otro", "error")
        }
        setNickValid(filtro(e.target.value).length >= 1 ? false : true)
    }

    const filtro = (e) => {
        return props.usuarios.filter((i) => {
           return i.nick.toLowerCase() === e.toLowerCase() ? true : false
        } )
    }

    return(
        <div>
            <Row>
                <Col md="12" lg="6" >
                    <img src={logoMax} alt="Logo .P" className="logoContact" />
                </Col>
                <Col xs="12" sm="12" md="12" lg="6">
                    <Form ref={form} className="needs-validation" onSubmit={(e)=>{sendEmail(e)}} autoComplete="new-password" style={{width: "100%"}}>
                        <h5 className="mb-4"><b>Datos sobre ti</b></h5>
                        {/* Nombre */}
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control className="form-control"  type="text" placeholder="Abdiel Ramirez Aldana" name="name" required />
                            <Form.Text className="text-muted">
                                Nombre completo.
                            </Form.Text>
                        </Form.Group>
                        {/* Nickname */}
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Nickname</Form.Label>
                            <Form.Control pattern="^[A-Za-z]+$" className={nickValid ? "" : "is-invalid"} value={nickName} onChange={(e)=>{changeNickName(e)}} type="text" placeholder="AbdyAldana" name="nick" required />
                            {!nickValid &&
                                <h6 style={{color: "red"}}>
                                    Evita campos vacíos, números o espacios, y usuarios existentes.
                                    <br/>
                                </h6>
                            }
                            <Form.Text className="text-muted">
                                Nickname / Seudonimo / Nombre corto.
                            </Form.Text>
                        </Form.Group>
                        {/* Genero */}
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Genero</Form.Label>
                            <Form.Select aria-label="Genero" name="genero" required>
                                <option value="h">Hombre</option>
                                <option value="m">Mujer</option>
                            </Form.Select>
                        </Form.Group>
                        {/* Carrera */}
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Licenciatura</Form.Label>
                            <Form.Select aria-label="Licenciatura" name="lic" required>
                                <option value="Lic Diseño Gráfico Publicitario">Diseño Gráfico Publicitario</option>
                                <option value="Lic Diseño y Mercadotecnia de Modas">Diseño y Mercadotenia de Modas</option>
                                <option value="Lic Animación y Arte Digital">Animación y Arte Digital</option>
                            </Form.Select>
                        </Form.Group>
                        {/* Tetramestre */}
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Tetramestre</Form.Label>
                            <Form.Select aria-label="Tetramestre" name="tetra" required>
                                <option value="1er Tetramestre">1° Tetramestre</option>
                                <option value="2do Tetramestre">2° Tetramestre</option>
                                <option value="3er Tetramestre">3° Tetramestre</option>
                                <option value="4to Tetramestre">4° Tetramestre</option>
                                <option value="5to Tetramestre">5° Tetramestre</option>
                                <option value="6to Tetramestre">6° Tetramestre</option>
                                <option value="7mo Tetramestre">7° Tetramestre</option>
                                <option value="8vo Tetramestre">8° Tetramestre</option>
                                <option value="9no Tetramestre">9° Tetramestre</option>
                            </Form.Select>
                        </Form.Group>
                        {/* Descripcion */}
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Describete</Form.Label>
                            <Form.Control as="textarea" placeholder="Soy alguien dispuesto a trabajar en equipo, ...." name="pro" required />
                            <Form.Text className="text-muted">
                                Una breve descripcion de tu persona, como individuo en lo laboral o en la vida cotidiana.
                            </Form.Text>
                        </Form.Group>
                        <Form.Label>¿Estas disponible para ofertas laborales?</Form.Label>
                        <Form.Group className="mb-3" controlId="trabajo">
                            <Form.Check type="checkbox" label="Si estoy disponible" name="status" value={true} />
                        </Form.Group>
                        <hr/>

                        <h5 className="mb-4"><b>Opciones del Boton de Portafolio</b></h5>
                        {/* Opciones del Boton */}
                        <Form.Label>Link del Boton</Form.Label>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3" controlId="redsocial">
                                    <Form.Check onChange={(e)=>{viewCheckRadio(e)}} type="radio" label="Red Social" name="link" value="redsocial" required />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3" controlId="subdominio">
                                    <Form.Check onChange={(e)=>{viewCheckRadio(e)}} type="radio" label="Subdominio" name="link" value="subdominio" required />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3" controlId="pdf">
                                    <Form.Check onChange={(e)=>{viewCheckRadio(e)}} type="radio" label="Archivo PDF" name="link" value="pdf" required />
                                </Form.Group>
                            </Col>
                        </Row>
                        {/* Nombre del Subdomino */}
                        {checkRadio === "subdominio" &&
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Nombre del Subdomino</Form.Label>
                            <Form.Control type="text" readOnly disabled value={nickName.toLowerCase()} placeholder="abdielin" name="link" required />
                            <Form.Text className="text-muted">
                                Este será igual a tu Nickname --• <b>{nickName.toLowerCase()}</b>.portafoliosupg.com
                            </Form.Text>
                        </Form.Group>
                        }
                        {checkRadio === "redsocial" &&
                        <Form.Group className="mb-3" controlId="redsicuak">
                            <Form.Label>Link del Perfil</Form.Label>
                            <Form.Control ref={formRefs.redsocial} type="text" placeholder="https://www.instagram.com/abdielaldana/" name="link" required />
                            <Form.Text className="text-muted">
                                Copia y pega el Link de tu perfil --• https://www.instagram.com/abdielaldana/
                            </Form.Text>
                        </Form.Group>
                        }
                        {checkRadio === "pdf" &&
                        <Form.Group className="mb-3" controlId="redsicuak">
                            <Form.Label>Nombre del Archivo</Form.Label>
                            <Form.Control type="text" placeholder="archivo.pdf" name="link" required />
                            <Form.Text className="text-muted">
                                Escribe tal cual el nombre del archivo (.pdf / .doc)
                            </Form.Text>
                        </Form.Group>
                        }
                        {/* Texto en el Boton */}
                        <Form.Group className="mb-3" controlId="nameArchivo">
                            <Form.Label>Texto en el Boton</Form.Label>
                            <Form.Control type="text" placeholder="Portafolio Web" name="linkText" required />
                            <Form.Text className="text-muted">
                                Portafolio Web / Instagram / CV PDF
                            </Form.Text>
                        </Form.Group>
                        <hr/>

                        <h5><b>Datos de Contacto</b></h5>
                        {/* Correo */}
                        <Form.Group className="mb-3" controlId="correo">
                            <Form.Label>Correo</Form.Label>
                            <Form.Control type="email" placeholder="nombre@correo.com" name="mail" required />
                            <Form.Check type="checkbox" label="Hacer visible mi correo en la plataforma" name="mailOn" value={true} />
                        </Form.Group>
                        {/* Telefono */}
                        <Form.Group className="mb-3" controlId="telefono">
                            <Form.Label>Numero de Télefono</Form.Label>
                            <Form.Control type="number" placeholder="8124663146" name="tel" required />
                            <Form.Check type="checkbox" label="Hacer visible mi telefono en la plataforma" name="telOn" value={true} />
                        </Form.Group>
                        <hr/>
                        <h5 className="mb-4"><b>Imagen de Perfil y Portada</b></h5>
                        <p>Las imagenes se enviaran al correo <b>hola@portafoliosupg.com</b>. El nombre que pongas aqui, debe coincidir con el nombre de tu archivo enviado.</p>
                        <p>La imagen de perfil debe ser cuadrada. <br/> La imagen de portada debe estar vertical.</p>
                        <p>Solo se aceptaran imagenes de 2MB como maximo.</p>
                        {/* Imagen Perfil */}
                        <Form.Group className="mb-3" controlId="Perfil">
                            <Form.Label>Nombre de la Imagen de Perfil</Form.Label>
                            <Form.Control type="text" placeholder="yo.jpg" name="perfil" required />
                            <Form.Text className="text-muted">
                                Nombre del archivo. (Verifica bien el tipo de imagen .jpg, JPG, jpeg, png, etc.)
                            </Form.Text>
                        </Form.Group>
                        {/* Imagen Portada */}
                        <Form.Group className="mb-3" controlId="Portada">
                            <Form.Label>Nombre de la Imagen de Portada</Form.Label>
                            <Form.Control type="text" placeholder="yo.jpg" name="img" required />
                            <Form.Text className="text-muted">
                                Nombre del archivo. (Verifica bien el tipo de imagen .jpg, JPG, jpeg, png, etc.)
                            </Form.Text>
                        </Form.Group>

                        <hr/>

                        <div className="d-flex align-items-center mb-4">
                            <h5 className="me-3"><b>Galeria</b> ({galeria.length})</h5>
                            {/* Agregar Imagen Galeria */}
                            <Button size="sm" variant="outline-secondary"  onClick={()=>{addGaleria()}}>
                                + Agregar Imagen
                            </Button>
                            {/* Borrar Imagen Galeria */}
                            <Button className="ms-3" size="sm" variant="outline-danger"  onClick={()=>{deleteGaleria(galeria.length-1)}}>
                                <BsFillTrashFill/> Eliminar Imagen
                            </Button>
                        </div>
                        {galeria.length === 0 &&
                            <h6>No tienes agregada ni una imagen en la galeria.</h6>
                        }
                        {/* Galeria */}
                        {galeria.length !== 0 && galeria.map((e, i)=>(
                            <Alert key={i} variant="light">
                                <h6>Imagen {i+1}</h6>
                                {/* Titulo Imagen */}
                                <Form.Group className="mb-3" controlId={"galeriaNombre"+i}>
                                    <Form.Label>Titulo de la Imagen</Form.Label>
                                    <Form.Control type="text" placeholder={"Titulo"+(i+1)} name={"galeriaNombre"+i} required />
                                </Form.Group>
                                {/* Imagen Nombre Archivo */}
                                <Form.Group className="mb-3" controlId={"galeria"+i}>
                                    <Form.Label>Nombre del Archivo</Form.Label>
                                    <Form.Control ref={el => (inputRefs.current[i] = "galeria"+i)} type="text" placeholder={"foto"+(i+1)+".jpg"} name={"galeria"+i} required />
                                    <Form.Text className="text-muted">
                                        Nombre del archivo. (Verifica bien el tipo de imagen .jpg, JPG, jpeg, png, etc.)
                                    </Form.Text>
                                </Form.Group>
                            </Alert>
                        ))}

                        <hr/>
                        {/* Boton Enviar */}
                        <Button variant="primary" type="submit">
                            Enviar
                        </Button>
                    </Form>
                </Col>
            </Row>
        </div>
    )
}

export default Unirse