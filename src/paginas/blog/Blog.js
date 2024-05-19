import React, { useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
// import $ from 'jquery'


import Container from 'react-bootstrap/Container';
import {  Col, Row } from "react-bootstrap";
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Select from 'react-select';
import Button from 'react-bootstrap/Button';

import { BsFillTrashFill } from "react-icons/bs";
import { ImSearch } from "react-icons/im";




function Blog(props) {
    const navigate = useNavigate();

    const [datos, setDatos] = useState([]);
    const [searchVar, setSearchVar] = useState("");
    const [searchTags, setSearchTags] = useState("");
    const [searchAutor, setSearchAutor] = useState("");

    useEffect(()=>{
        if(props.posts.length !== 0) {
            setDatos(props.posts)
        } else {
            async function fetchDatos() {
                const respuesta = await fetch('/data/post.json');
                const datosJson = await respuesta.json();
                setDatos(datosJson);
            }
            fetchDatos();
        }
    },[props.posts, setDatos])


    const ir = (url) => {
        navigate("/blog"+url);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    }
    const search = (e) => {
        setSearchVar(e.target.value)
    }

    const searchEtiquetas = (e) => {
        if(e === null) {setSearchTags("")}
        else {setSearchTags(e.value)}
    }

    const searchFAutor = (e) => {
        if(e === null) {setSearchAutor("")}
        else {setSearchAutor(e.value)}
    }


    const filteredData = datos.filter(item => {
        const searchTerm = (searchVar === null ? "" : searchVar).toLowerCase();
        const titulo = item.titulo.toLowerCase();
        const tags = item.etiquetas;
        const autor = item.autor.nombre;

        return titulo.includes(searchTerm) &&
        (searchTags === "" || tags.includes(searchTags)) &&
        (searchAutor === "" || autor === searchAutor);
    });


    const tagsNoRepite = datos.reduce((acc, obj) => {
        obj.etiquetas.forEach(value => {
          if (!acc.some(tag => tag.value === value)) {
            acc.push({ value: value, label: value });
          }
        });
        return acc;
    }, []);

    const uniqueAuthors = datos.reduce((acc, curr) => {
        if (!acc.some(item => item.label === curr.autor.nombre)) {
          acc.push({ value: curr.autor.nombre, label: curr.autor.nombre });
        }
        return acc;
    }, []);

    const cleanFilters = () => {
        setSearchVar("")
        setSearchTags("")
        setSearchAutor("")
    }


    const colourStyles: StylesConfig<ColourOption> = {
        control: (styles) => ({ ...styles, backgroundColor: 'white', width: "300px", borderRadius: "20px" }),
    }


    const urlImageBlog = "https://portafoliosupg.com/imagenes/blog/"



    return (
        <Container className='mb-5' style={{minHeight:"50vh"}}>
            <h1>Blog</h1>
            <hr/>
            <div className='titlePostCardSecondary'>
                <div className='filtroTitle titlePostCard'>
                    <h4>Filtros: </h4> {searchVar !== "" ? <span> Titulo: <b>{searchVar}</b></span> : ""} {searchAutor !== "" ? <span> Autor: <b>{searchAutor}</b></span> : ""} {searchTags !== "" ? <span> Etiqueta: <b>{searchTags}</b></span> : ""}
                </div>
                <Button variant="outline-danger" size="sm" onClick={cleanFilters}>
                    <BsFillTrashFill/>
                </Button>
            </div>
            <Form className="flex-wrap d-flex flex-column flex-xs-column flex-sm-column flex-md-row" onSubmit={(e)=>{handleSubmit(e)}}>
                <Form.Group className="mb-3 mx-2" style={{width:"300px"}} controlId="exampleForm.ControlInput1">
                    <Form.Label>Titulo:</Form.Label>
                    <Form.Control
                        type="search"
                        placeholder="Titulo"
                        autoComplete='off'
                        className="me-2"
                        aria-label="Search"
                        onChange={(e)=>{search(e)}}
                        value={searchVar}
                    />
                </Form.Group>
                <Form.Group className="mx-2 mb-3">
                    <Form.Label>Autor</Form.Label>
                    <Select
                        styles={colourStyles}
                        options={uniqueAuthors}
                        isClearable={true}
                        onChange={(e)=>{searchFAutor(e)}}
                    />
                </Form.Group>
                <Form.Group className="mx-2 mb-3">
                    <Form.Label>Etiquetas</Form.Label>
                    <Select
                        styles={colourStyles}
                        options={tagsNoRepite}
                        isClearable={true}
                        onChange={(e)=>{searchEtiquetas(e)}}
                    />
                </Form.Group>
            </Form>
            <hr/>
            <Row>
                {filteredData.map((e, i)=>(
                    <Col key={i} xs="12" sm="12" md="6" lg="4" className='mb-4'>
                        <Card >
                            <Card.Body>
                                <div className='imagneDestacadaBlog' style={{backgroundImage:"url("+urlImageBlog+e.imagenDestacada+")"}}></div>
                                <hr/>
                                <Card.Title className='text_ellipsis'>{e.titulo}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">Por: {e.autor.nombre}</Card.Subtitle>
                                <Card.Text>
                                    <p className='parrafoInicialBlog' dangerouslySetInnerHTML={{ __html: e.contenido.filter(x => x.tipo === "p")[0].cont.substr(0, 150)+"..." }}></p>
                                    
                                </Card.Text>
                                <Button onClick={()=>{ir(e.url)}} variant="primary">Ver más</Button>
                                {/* <Card.Link href="#" onClick={()=>{ir(e.url)}}>Ver más.</Card.Link> */}
                                <hr/>
                                <div className='etiquetasBox'>
                                    {e.etiquetas.map((f, i)=>(
                                        <div className='etiquetaNombre fs-12' onClick={()=>{setSearchTags(f)}} key={i}> {f} </div>
                                    ))}
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
                {filteredData.length === 0 &&
                    <div className='notFound'>
                        <ImSearch className='iconNotFound'/>
                        <div className='other'></div>
                    </div>
                }
            </Row>
        </Container>
    )
}

export default Blog
