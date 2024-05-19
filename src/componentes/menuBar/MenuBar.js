import React, {useEffect} from 'react';
import {Link, useNavigate } from 'react-router-dom';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

import Swal from 'sweetalert2';

import iconWhite from '../../img/iconWhite.png';

import { FaRegUserCircle } from "react-icons/fa";

function MenuBar(params) {
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

    const sesion = JSON.parse(localStorage.getItem('sesion'));
    const usuario = JSON.parse(localStorage.getItem('usuario'));

	useEffect(()=>{
		if(usuario){
			console.log("User Ok");
		} else {
			localStorage.setItem('usuario', JSON.stringify({
				user: false,
				token: false
			}));
		}
		if(sesion){
			console.log("Sesion Ok");
		}else {
			localStorage.setItem('sesion', JSON.stringify({
				user: false,
				status: false
			}));
		}
	},[])

    const closeSesion = () => {
		const user = JSON.parse(localStorage.getItem('sesion'));
		localStorage.removeItem('usuario');
		localStorage.setItem('sesion', JSON.stringify({
			user: user.user,
			status: false
		}));
		navigate("/")
		notify("Adios "+sesion.user, "success")
	}

    return(
        <div>
            <Navbar className='navbarOptions' collapseOnSelect bg="dark" variant="dark" expand="lg" fixed="top"  >
                <Container>
                    <Navbar.Brand href="#" className='barNavIdentidad' as={Link} to="/" >
                        <img src={iconWhite} alt="Logo UPG" />
                        <h5>Portafolios UPG</h5>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" >
                        <Nav className=' f_end'>
                            <Nav.Link href="/inicio" as={Link} to="/inicio" >Inicio</Nav.Link>
                            <NavDropdown title="Acerca de" id="basic-nav-dropdown">
                                <NavDropdown.Item href="/acerca-de" as={Link} to="acerca-de">
                                    Acerca del proyecto
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="/acerca-de" as={Link} to="acerca-de" disabled>
                                    Preguntas
                                </NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link href="/directorio" as={Link} to="/directorio" >Directorio</Nav.Link >
                            <Nav.Link className='me-4' href="/galeria" as={Link} to="/galeria" >Galeria</Nav.Link >
                            {/* <Nav.Link href="/blog" as={Link} to="/blog" >Blog</Nav.Link > */}
                            <NavDropdown title={sesion.status ? sesion.user : <FaRegUserCircle /> } id="basic-nav-dropdown" as={Button} className="buttonUser">
                                {/* <NavDropdown.Item href="/unirse" as={Link} to="/unirse">
                                    Unirse al Directorio
                                </NavDropdown.Item> */}
                                {!sesion.status &&
                                    <NavDropdown.Item href="/registro" as={Link} to="/registro">
                                        Registrarse
                                    </NavDropdown.Item>
                                }
                                {!sesion.status &&
                                    <NavDropdown.Item href="/inicio-sesion" as={Link} to="/inicio-sesion">
                                        Iniciar Sesion
                                    </NavDropdown.Item>
                                }
                                {sesion.status &&
                                    <NavDropdown.Item onClick={closeSesion}>
                                        Cerrar Sesion
                                    </NavDropdown.Item>
                                }
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="/contacto" as={Link} to="/contacto">
                                    Soporte
                                </NavDropdown.Item>
                                {/* <NavDropdown.Item disabled href="/agregar-galeria" as={Link} to="/agregar-galeria">
                                    Agregar a la Galeria
                                </NavDropdown.Item>
                                <NavDropdown.Item disabled href="/agregar-blog" as={Link} to="/agregar-blog">
                                    Agregar al Blog
                                </NavDropdown.Item> */}
                            </NavDropdown>
                            {/* <Nav.Link href="/user" as={Link} to="/user" disabled>User</Nav.Link> */}
                        </Nav>
                        {/* <Form className="d-flex" onSubmit={(e)=>{handleSubmit(e)}}>
                            <Form.Control
                                type="search"
                                placeholder="Buscar en Directorio"
                                className="me-2"
                                aria-label="Search"
                                onChange={(e)=>{search(e)}}
                                value={searchVar}
                            />
                            <Button variant="primary" onClick={()=>{handleSubmit("a@1%")}} >Buscar</Button>
                        </Form> */}
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default MenuBar