import Carousel from 'react-bootstrap/Carousel';
// import Foto1 from "../../img/ca1.jpg"
// import Foto2 from "../../img/ca2.jpg"
// import Foto3 from "../../img/ca3.jpg"

import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';

function Carrusel () {

    const [datos, setDatos] = useState([]);

    function getRandomUniqueElements(array, count) {
        let filtered = array.filter(x => x.carrusel === "si")
        const shuffled = filtered.slice().sort(() => Math.random() - 0.5);
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


    return(
        <div className='carrusel'>
            <Carousel variant="dark" slide={true} className="mb-5">
                {datathree.map((e, i)=>(
                    <Carousel.Item key={i}>
                        <div style={{backgroundImage: `url(${e.img})`}} className="fotoCarrusel"></div>
                        {/* <Carousel.Caption>
                            <div className='autor'>
                                <h5>{e.genero === "h" ? "Autor: " : "Autora: "} {e.nick} </h5>
                            </div>
                        </Carousel.Caption> */}
                        <div className='contentCarrusel'>
                            <Container>
                                <div className='autor'>
                                    <h2>{e.nick} </h2>
                                </div>
                            </Container>
                        </div>
                    </Carousel.Item>
                ))}
                {/* <Carousel.Item>
                    <div style={{backgroundImage: `url(${Foto1})`}} className="fotoCarrusel"></div>
                    <Carousel.Caption>
                    <h3>First slide label</h3>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <div style={{backgroundImage: `url(${Foto2})`}} className="fotoCarrusel"></div>

                    <Carousel.Caption>
                    <h3>Second slide label</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <div style={{backgroundImage: `url(${Foto3})`}} className="fotoCarrusel"></div>

                    <Carousel.Caption>
                    <h3>Third slide label</h3>
                    <p>
                        Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                    </p>
                    </Carousel.Caption>
                </Carousel.Item> */}
            </Carousel>
        </div>
    );
}

export default Carrusel