// import { useState } from 'react';
import Zoom from 'react-medium-image-zoom'

import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Figure from 'react-bootstrap/Figure';
import Alert from 'react-bootstrap/Alert';

function ModalComponent(props) {
	const data = props.underProps.data

	// const [galeria] = useState(data.galeria)

	// console.log(galeria ? "" : "xd");
    return(
        <Modal show={props.openModal}
			onHide={()=>{props.setOpenModal(false)}}
			// backdrop="static"
			scrollable={true}
			style={{zIndex: "9999 !important"}}
			size="lg"
			centered
		>
			<Modal.Header closeButton>
				<h5 className='mb-0'>{data.name}</h5>
			</Modal.Header>
			<Modal.Body style={{textAlign: "justify", height: "auto", padding: "0px"}}>
				<div style={{width:"100%", display: "flex", justifyContent:"center", flexDirection:"column"}}>
					<img src={data.img} alt="ImagePortada" style={{width: "100%", height: "auto"}}/>
					{data.perfil &&
						<img src={data.perfil} alt="ImagePerfil" className="fotoPerfilModal"/>
					}
					{!data.perfil &&
						<div className="fotoPerfilModal"></div>
					}
				</div>
				<div style={{padding: "20px"}}>
					<Row>
						<Col sm="12">
							<Alert variant='light'>
								<h5 className='text_ellipsis'>{data.name}</h5>
								<h6>{data.lic}</h6>
								<h6>{data.tetra}</h6>
							</Alert>
						</Col>

					</Row>

					<Row>
						<Col sm="12">
							<Alert variant='secondary'>
								<h5>Información</h5>
								<hr/>
								<h6>Estatus: <strong style={data.status === "Buscando" ? {color:"green"} : {}}>{data.status + " Trabajo"}</strong></h6>
								<h6>Portafolio: <a href={data.link} target="_blank" rel="noreferrer"><strong>{data.linkText}</strong></a></h6>
								<hr/>
								<h6>Sobre mi: </h6>
								<p dangerouslySetInnerHTML={{ __html: data.pro }}></p>
								{/* <h6><strong>{data.pro}</strong></h6> */}
							</Alert>
						</Col>
						{data.habilidades &&
							<Col sm="12">
								<Alert variant='secondary'>
									<h5>Habilidades</h5>
									<hr/>
									<div className='habilidadesShow'>
										{data.habilidades.map((e, i)=>{
											return (
												<div key={i}>
													<h6>{e}</h6>
												</div>
											)
										})}
									</div>
								</Alert>
							</Col>
						}
						<Col sm="12">
							<Alert variant='secondary'>
								<h5>Contacto</h5>
								<hr/>
								<h6>Teléfono: <strong>{data.contacto ? data.contacto.tel : "No encontrado" }</strong></h6>
								<h6>Correo: <strong>{data.contacto ? data.contacto.mail : "No encontrado" }</strong></h6>
							</Alert>
						</Col>

						<Col sm="12">
							<br/>
							<h3>Galeria</h3>
							<hr/>
						</Col>
					</Row>

					<Row>
						{data.galeria.map((e, i) => (
							<Col sm="12" md="6" lg="4" key={i}>
								<Figure>
									<Zoom>
									<Figure.Image
										width={"auto"}
										height={180}
										alt="171x180"
										src={e.imgName}
									/>
									</Zoom>
									<Figure.Caption>
										{e.title}
									</Figure.Caption>
								</Figure>
							</Col>
						))}
					</Row>
						
					
				</div>
            </Modal.Body>
    </Modal>
    )
}

export default ModalComponent