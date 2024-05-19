import {  Col, Row } from "react-bootstrap";
import { Helmet } from 'react-helmet';

function BlogPage(props) {

    const urlImageBlog = "https://portafoliosupg.com/imagenes/blog/"

    
    const url = 'https://portafoliosupg.com/'; // La URL de tu sitio web
    const image = `https://portafoliosupg.com/imagenes/blog/${props.data.imagenDestacada}`; // La URL completa de la imagen

    return (
        <div style={{textAlign:"justify"}}>
            <Helmet>
                <meta property="og:url" content={url} />
                <meta property="og:image" content={image} />
            </Helmet>

            <Row>
                <Col sm="12">
                    <div className='imagneDestacadaBlogs' style={{backgroundImage: "url("+urlImageBlog+props.data.imagenDestacada+")"}}></div>
                </Col>
                <Col sm="12">
                    <h1>{props.data.titulo}</h1>
                    <hr className="mb-3" />
                </Col>
                <Col sm="12" md="12" lg="8">
                    {props.data.contenido.map((e, i)=>(
                        <div key={i}>
                            {e.tipo === "h3" &&
                                // <p>{e.cont}</p>
                                <h3 dangerouslySetInnerHTML={{ __html: e.cont }}></h3>
                            }
                            {e.tipo === "p" &&
                                // <p>{e.cont}</p>
                                <p dangerouslySetInnerHTML={{ __html: e.cont }}></p>
                            }
                            {e.tipo === "img" &&
                                <img width={"100%"} src={e.cont} alt="img"/>
                            }
                            {e.tipo === "hr" &&
                                <hr/>
                            }
                        </div>
                    ))}
                </Col>
                <Col sm="12" md="12" lg="4">
                    <div className="seccionBlog">
                        <h3>Etiquetas</h3>
                        <hr/>
                        <div className="etiquetasBox">
                            {props.data.etiquetas && props.data.etiquetas.map((e, i)=>(
                                <div key={i} className="etiquetaNombre">{e}</div>
                            ))}
                        </div>
                    </div>
                    <div className="seccionBlog">
                        <h3>Autor</h3>
                        <hr/>
                        <h6>Nombre: <b>{props.data.autor.nombre}</b></h6>
                        <h6>Licenciatura: <b>{props.data.autor.lic}</b></h6>
                        <h6>Grado: <b>{props.data.autor.tipo}</b></h6>
                        <p style={{color: "gray"}}>Publicado el, {props.data.autor.date}</p>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default BlogPage