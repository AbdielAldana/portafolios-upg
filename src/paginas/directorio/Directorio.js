import React, { useState, useEffect } from 'react';
import clsx from "clsx"
// import { useLocation } from "react-router-dom";

import Container from 'react-bootstrap/Container';
import {  Col, Row } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import CardPerfil from "../../componentes/cardPerfil/CardPerfil";
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import Select from 'react-select';

import { BsFillTrashFill } from "react-icons/bs";
import { ImSearch } from "react-icons/im";


function Directorio(props) {

    const [datos, setDatos] = useState([]);


    useEffect(() => {
        async function fetchDatos() {
          const respuesta = await fetch('/data/usuarios.json');
          const datosJson = await respuesta.json();
          setDatos(datosJson);
        }

        fetchDatos();
    }, []);

    const [searchVar, setSearchVar] = useState("");
	const [searchVarLic, setSearchVarLic] = useState("");
    const [searchGrade, setSearchGrade] = useState("")


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

    const filteredData = datos.filter(item => {
        const searchTerm = (searchVar === null ? "" : searchVar).toLowerCase();
        const name = item.name.toLowerCase();
        const nick = item.nick.toLowerCase();
        const lic = item.lic;
        const tetra = item.tetra;

        return (name.includes(searchTerm) || nick.includes(searchTerm)) &&
        (searchVarLic === "" || lic.includes(searchVarLic)) &&
        (searchGrade === "" || tetra.includes(searchGrade))
    });


    // console.log(datos);

    const gradeNoRepite = datos.reduce((acc, obj) => {

        if(!acc.some(grade => grade.value === obj.tetra)){
            acc.push({ value: obj.tetra, label: obj.tetra })
        }
        // obj.forEach(value => {
        //   if (!acc.some(tag => tag.value === value)) {
        //     acc.push({ value: value, label: value });
        //   }
        // });
        return acc;
    }, []);

    const searchGrado = (e) => {
        if(e === null) {setSearchGrade("")}
        else {setSearchGrade(e.value)}
    }


    function getRandomUniqueElements(array, count) {
        const shuffled = array.slice().sort(() => Math.random() - 0.5);
        return shuffled
    }

    let randomArray = getRandomUniqueElements(filteredData)

    const cleanFilters = () => {
        setSearchVar("")
        setSearchVarLic("")
        setSearchGrade("")
    }

    // ==== PAGINACION ====
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(3);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
    const currentItems2 = randomArray.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    function handlePageClick(page) {
        setCurrentPage(page);
    }

    const colourStyles: StylesConfig<ColourOption> = {
        control: (styles) => ({ ...styles, backgroundColor: 'white', width: "300px", borderRadius: "20px" }),
    }

    

    return(
        <div className='minH' style={{minHeight: "60vh"}}>
            <Container className='mb-5' style={{height:"100%", position:"relative"}}>
                <h1>Directorio</h1>
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
                            className="me-2"
                            autoComplete='off'
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
                    <Form.Group className="mx-2 mb-3">
                    <Form.Label>Etiquetas</Form.Label>
                    <Select
                        styles={colourStyles}
                        options={gradeNoRepite}
                        isClearable={true}
                        onChange={(e)=>{searchGrado(e)}}
                    />
                </Form.Group>
                </Form>
                <hr/>
                <Row>
                    {currentItems.map((element, i)=>(
                        <Col key={i} sm={11} md={8} lg={4} className="centerContent mt-3">
                            <CardPerfil
                                data={element}
                            />
                        </Col>
                    ))}
                </Row>
                {filteredData.length === 0 &&
                    <div className='notFound'>
                        <ImSearch className='iconNotFound'/>
                        <div className='other'></div>
                    </div>
                }

                <hr/>
                {filteredData.length !== 0 &&
                    <Row >
                        <Col id="paginacion" style={{display: "flex", justifyContent: "center"}}>
                            <ButtonGroup className="me-2" aria-label="Second group">
                                <Button variant="outline-dark" disabled={totalPages > 2 && currentPage > 1 ? false : true} onClick={() => handlePageClick(1)}>&laquo;</Button>
                                <Button variant="outline-dark" disabled={totalPages > 1 && currentPage > 1 ? false : true} onClick={() => handlePageClick(currentPage - 1)}>{"<"}</Button>
                                {Array.from({ length: totalPages }).map((_, index) => {
                                    if (totalPages > 5 && (index < currentPage - 2 || index > currentPage + 2)) {
                                        return null;
                                    }
                                    return(
                                        <Button key={index}
                                            variant="outline-dark"
                                            className={clsx(index + 1 === currentPage ? 'active' : '')}
                                            onClick={() => handlePageClick(index + 1)}
                                        >
                                            {index + 1}
                                        </Button>
                                    )
                                })}
                                <Button disabled={totalPages > 1 && currentPage < totalPages ? false : true} variant="outline-dark" onClick={() => handlePageClick(currentPage + 1)}>{">"}</Button>
                                <Button disabled={totalPages > 2 && currentPage < totalPages ? false : true} variant="outline-dark" onClick={() => handlePageClick(totalPages)}>&raquo;</Button>
                            </ButtonGroup>
                        </Col>
                    </Row>
                }
            </Container>
            
        </div>
    );
}

export default Directorio