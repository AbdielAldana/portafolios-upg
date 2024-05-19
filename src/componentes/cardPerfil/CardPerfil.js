import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip'
import { useCookies } from "react-cookie";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { BsFillEyeFill } from "react-icons/bs";
import { BiWorld } from "react-icons/bi";


import ModalComponent from '../modal/ModalComponent';

function CardPerfil(props) {
    const [cookies] = useCookies(["cookiesAccept"]);
    const [openModal, setOpenModal] = useState(false)

    const handleOpenModal = () => {
        setOpenModal(true)
    }
    const data = props.data
    console.log(data);
    return (
        <div style={{width: "100%"}}  >
            {/* <Row className='userBar p-0' onClick={()=>{ handleOpenModal() }}>
                <Col xs={2} sm={2} md={1} lg={1} className='letter'>
                    {data.perfil &&
                        <img height={50} src={data.perfil} alt='perfil' style={{borderRadius:"50%"}}/>
                    }
                    {!data.perfil &&
                        <h1>.{data.name[0]}</h1>
                    }
                </Col>
                <Col xs={8} sm={8} md={10} lg={10} className='contentCard'>
                    <h4 className='text_ellipsis'>{data.name}</h4>
                    <h6 className='text_ellipsis'>{data.lic}</h6>
                    <h6 className='text_ellipsis'>{data.tetra}</h6>
                </Col>
                <Col xs={2} sm={2} md={1} lg={1} className='letter'>
                    {cookies.cookiesAccept &&
                        <div style={{display: "flex", justifyContent: "flex-end", alignItems: "center", height: "100%"}}>
                            <div>
                                <OverlayTrigger
                                    placement="left"
                                    overlay={
                                        <Tooltip id={`tooltip-web`}>
                                            Portafolio web
                                        </Tooltip>
                                    }
                                >
                                    <a href={data.link} target="_blank" rel="noreferrer" className='me-3 iconLink buttonIcon first' >
                                        <BiWorld >{data.linkText}</BiWorld>
                                    </a>
                                </OverlayTrigger>
                                <OverlayTrigger
                                    placement="left"
                                    overlay={
                                        <Tooltip id={`tooltip-mas`}>
                                            Ver más
                                        </Tooltip>
                                    }
                                >
                                <p href={""} rel="noreferrer" className='buttonIcon iconLink' onClick={()=>{ handleOpenModal() }}>
                                    <BsFillEyeFill>Ver más</BsFillEyeFill>
                                </p>
                                </OverlayTrigger>
                            </div>

                            
                        </div>
                    }
                </Col>
            </Row>
            <ModalComponent
                openModal={openModal}
                setOpenModal={setOpenModal}
                underProps={props}
            />
            <hr/> */}
            <Card style={{ width: '100%' }}>
                <div style={{width:"100%", height: "200px", backgroundImage: "url("+data.img+")", backgroundSize: "cover", backgroundPosition: "center" }}></div>
                <div style={
                    {
                        width:"150px",
                        height: "150px",
                        backgroundImage: "url("+data.perfil+")",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        borderRadius: "100%",
                        margin: "-75px auto 0 auto",
                        border: "solid 5px white",
                        backgroundColor: "#ffc9e0"
                    }
                }></div>
                {/* <Card.Img variant="top" src={data.img} /> */}
                <Card.Body style={{paddingTop: "0px"}}>
                    {data.nick}
                    <Card.Title className='text_ellipsis'>{data.name}</Card.Title>

                    <hr/>
                    <p className='text_ellipsis' style={{margin: "0px"}}>{data.lic}</p>
                    <p className='text_ellipsis' style={{margin: "0px"}}>{data.tetra}</p>
                    <p className='text_ellipsis' style={{margin: "0px"}}>{data.pro}</p>
                    {/* {cookies.cookiesAccept &&
                        <p className='text_ellipsis' style={{margin: "0px"}}>{props.mail}</p>
                    } */}
                    <hr/>
                    {cookies.cookiesAccept &&
                        <div style={{display: "flex", justifyContent: "space-between"}}>
                            <a href={data.link} target="_blank" rel="noreferrer" >
                                <Button variant="primary">{data.linkText}</Button>
                            </a>
                            <Button variant="secondary" onClick={()=>{ handleOpenModal() }}>Ver Perfil</Button>

                            <ModalComponent
                                openModal={openModal}
                                setOpenModal={setOpenModal}
                                underProps={props}
                            />
                        </div>
                    }
                    <OverlayTrigger
                        placement={"left"}
                        overlay={
                            <Tooltip id={`tooltip-${data.nick}`}>
                                {data.status + " Trabajo"}
                            </Tooltip>
                        }
                    >
                        <div className={data.status === "Buscando" ? "Buscando" : "No_Buscando"}></div>
                    </OverlayTrigger>
                    
                </Card.Body>
            </Card>
        </div>
    );
}

export default CardPerfil