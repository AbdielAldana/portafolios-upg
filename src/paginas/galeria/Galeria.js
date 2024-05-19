import React, { useState, useEffect } from 'react';
// import Zoom from 'react-medium-image-zoom';
import ResponsiveGallery from 'react-responsive-gallery';

import Container from 'react-bootstrap/Container';
import { Row, Col } from "react-bootstrap";
// import Figure from 'react-bootstrap/Figure';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


import 'react-medium-image-zoom/dist/styles.css'

import { BsFillTrashFill } from "react-icons/bs";
import { ImSearch } from "react-icons/im";


// import ModalComponent from '../../componentes/modal/ModalComponent';

function Galeria(props) {
    const [datos, setDatos] = useState([]);
    const [datos2, setDatos2] = useState([]);

    useEffect(() => {
        async function fetchDatos() {
          const respuesta = await fetch('/data/usuarios.json');
          const datosJson = await respuesta.json();
        //   console.log(datosJson);
            let newArray = []
            let newArray2 = []
            datosJson.slice().sort(() => Math.random() - 0.5)
            datosJson.forEach((i, x) => {
                i.galeria.forEach((e, y) => {
                    newArray.push({
                        name: i.name,
                        nick: i.nick,
                        lic: i.lic,
                        img: e.imgName,
                        imgName: e.title
                    })
                    // let x = toString(ind2)
                    // console.log(i.nick+(x+y));
                    newArray2.push({
                        name: i.name,
                        nick: i.nick,
                        lic: i.lic,
                        src: e.imgName,
                        title: e.title + " - " + i.nick,
                        alt: i.nick+(x+y)
                    })
                })
            });
            // console.log(newArray);
          setDatos(newArray);
          setDatos2(newArray2)
        }

        fetchDatos();
      }, []);

      // Buscador
	const [searchVar, setSearchVar] = useState("");
	const [searchVarLic, setSearchVarLic] = useState("");

	const search = (e) => {
		setSearchVar(e.target.value);
	}

	const handleSubmit = (event) => {
        event.preventDefault();
        let tempDatos = datos
		if(event === "a@1%"){
            setDatos(tempDatos)
            setSearchVar("")
		} else {
            setDatos(tempDatos)
            setSearchVar("")
		}
	}

    const searchCarrera = (e) => {
        setSearchVarLic(e.target.value);
    }

    const filteredData = datos2.filter(item => {
        const searchTerm = (searchVar === null ? "" : searchVar).toLowerCase();
        const name = item.name.toLowerCase();
        const nick = item.nick.toLowerCase();
        const lic = item.lic;

        return (name.includes(searchTerm) || nick.includes(searchTerm)) &&
        (searchVarLic === "" || lic.includes(searchVarLic))
    });

    // const filteredUsers = datos.filter(item => {
    //     const searchTerm = (searchVar === null ? "" : searchVar).toLowerCase();
    //     const name = item.name.toLowerCase();
    //     const nick = item.nick.toLowerCase();
    //     const carr = item.lic.toLowerCase();
    //     return name.includes(searchTerm) || nick.includes(searchTerm) || carr.includes(searchTerm);
    // });

    // const filteredLic = filteredUsers.filter(item => {
    //     const searchTerm = (searchVarLic === null ? "" : searchVarLic).toLowerCase();
    //     const carr = item.lic.toLowerCase();
    //     return  carr.includes(searchTerm);
    // });

    function getRandomUniqueElements(array) {
        const shuffled = array.slice().sort(() => Math.random() - 0.5);
        return shuffled
    }

    let randomArray = getRandomUniqueElements(filteredData)

    const cleanFilters = () => {
        setSearchVar("")
        setSearchVarLic("")
    }

    // const [openModal, setOpenModal] = useState(false)

    return (
        <div className='minH gallery'>
            <Container className='mb-5'>
            <h1>Galeria</h1>
            <hr/>
            <div className='titlePostCardSecondary'>
                <div className='filtroTitle titlePostCard'>
                    <h4>Filtros: </h4> {searchVar !== "" ? <span> Titulo: <b>{searchVar}</b></span> : ""} {searchVarLic !== "" ? <span> Licenciatura: <b>{searchVarLic}</b></span> : ""} 
                </div>
                <Button variant="outline-danger" size="sm" onClick={cleanFilters}>
                    <BsFillTrashFill/>
                </Button>
            </div>
            <Form className="flex-wrap d-flex flex-column flex-xs-column flex-sm-column flex-md-row" onSubmit={(e)=>{handleSubmit(e)}}>
                <Form.Group className="mb-3 mx-2" style={{width:"300px"}} controlId="exampleForm.ControlInput1">
                    <Form.Label>Nombre:</Form.Label>
                    <Form.Control
                        type="search"
                        placeholder="Nombre o Nick"
                        autoComplete='off'
                        className="me-2"
                        aria-label="Search"
                        onChange={(e)=>{search(e)}}
                        value={searchVar}
                    />
                </Form.Group>
                <Form.Group className="mb-3 mx-2" style={{width:"300px"}} controlId="exampleForm.ControlInput1">
                    <Form.Label>Licenciatura</Form.Label>
                    <Form.Select aria-label="Carrera" name="user_carrera" onChange={(e)=>{searchCarrera(e)}}>
                        <option value="">Todas</option>
                        <option value="Lic Diseño Gráfico Publicitario">Diseño Gráfico Publicitario</option>
                            <option value="Lic Diseño y Mercadotecnia de Modas">Diseño y Mercadotenia de Modas</option>
                            <option value="Lic Animación y Arte Digital">Animación y Arte Digital</option>
                    </Form.Select>
                </Form.Group>
            </Form>
            <hr/>
            <Row>
                <Col>
                    <ResponsiveGallery useLightBox images={randomArray}/>,
                </Col>
            </Row>
            <Row className="centerContent2">
                {filteredData.length === 0 &&
                    <div className='notFound'>
                        <ImSearch className='iconNotFound'/>
                        <div className='other'></div>
                    </div>
                }
            </Row>
            </Container>
        </div>
        
    );
}

export default Galeria