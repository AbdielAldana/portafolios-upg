import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';
import Routes  from './Routes';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Container from 'react-bootstrap/Container';

// Componentes Complementos
import MenuBar from './componentes/menuBar/MenuBar';

// Componentes Rutas
import Inicio from './paginas/inicio/Inicio';
import Nf404 from './paginas/nf404/Nf404';
import Acercade from './paginas/acercade/Acercade';
import Contacto from './paginas/contacto/Contacto';
import Directorio from './paginas/directorio/Directorio';
import Galeria from './paginas/galeria/Galeria';
import Unirse from './paginas/unirse/Unirse'
import AgregarBlog from './paginas/unirse/AgregarBlog'
import AgregarGaleria from './paginas/unirse/AgregarGaleria'
import Registro from './paginas/usuario/Registro';
import Entrar from './paginas/usuario/Entrar';

import Terms from './componentes/TermsAndConditions/Terms';

const router = createBrowserRouter([
  {
    path: "*",
    element:
      <div style={{minHeight:"100vh", display: "flex", flexDirection: "column"}}>
        <Terms />
        <MenuBar></MenuBar>
        <Container className='spaceNav'><Nf404/></Container>
        {/* <Footerw style={{marginTop: "auto"}} /> */}
      </div>,
  },
  {
    path: "/",
    element:
      <div style={{minHeight:"100vh", display: "flex", flexDirection: "column"}}>
        <Terms />
        <MenuBar></MenuBar>
        <Container className='spaceNav'><Inicio/></Container>
        {/* <Footerw style={{marginTop: "auto"}} /> */}
      </div>,
  },
  {
    path: "/inicio",
    element:
      <div style={{minHeight:"100vh", display: "flex", flexDirection: "column"}}>
        <Terms />
        <MenuBar></MenuBar>
        <Container className='spaceNav'><Inicio/></Container>
        {/* <Footerw style={{marginTop: "auto"}} /> */}
      </div>,
  },
  {
    path: "/registro",
    element:
      <div style={{minHeight:"100vh", display: "flex", flexDirection: "column"}}>
        <Terms />
        <MenuBar></MenuBar>
        <Container className='spaceNav'><Registro/></Container>
        {/* <Footerw style={{marginTop: "auto"}} /> */}
      </div>,
  },
  {
    path: "/inicio-sesion",
    element:
      <div style={{minHeight:"100vh", display: "flex", flexDirection: "column"}}>
        <Terms />
        <MenuBar></MenuBar>
        <Container className='spaceNav'><Entrar/></Container>
        {/* <Footerw style={{marginTop: "auto"}} /> */}
      </div>,
  },
  {
    path: "/acerca-de",
    element:
      <div style={{minHeight:"100vh", display: "flex", flexDirection: "column"}}>
        <Terms />
        <MenuBar></MenuBar>
        <Container className='spaceNav'><Acercade/></Container>
        {/* <Footerw style={{marginTop: "auto"}} /> */}
      </div>,
  },
  {
    path: "/directorio",
    element:
      <div style={{minHeight:"100vh", display: "flex", flexDirection: "column"}}>
        <Terms />
        <MenuBar></MenuBar>
        <Container className='spaceNav'><Directorio/></Container>
        {/* <Footerw style={{marginTop: "auto"}} /> */}
      </div>,
  },
  {
    path: "/galeria",
    element:
      <div style={{minHeight:"100vh", display: "flex", flexDirection: "column"}}>
        <Terms />
        <MenuBar></MenuBar>
        <Container className='spaceNav'><Galeria/></Container>
        {/* <Footerw style={{marginTop: "auto"}} /> */}
      </div>,
  },
  {
    path: "/contacto",
    element:
      <div style={{minHeight:"100vh", display: "flex", flexDirection: "column"}}>
        <Terms />
        <MenuBar></MenuBar>
        <Container className='spaceNav'><Contacto/></Container>
        {/* <Footerw style={{marginTop: "auto"}} /> */}
      </div>,
  },
  {
    path: "/unirse",
    element:
      <div style={{minHeight:"100vh", display: "flex", flexDirection: "column"}}>
        <Terms />
        <MenuBar></MenuBar>
        <Container className='spaceNav'><Unirse/></Container>
        {/* <Footerw style={{marginTop: "auto"}} /> */}
      </div>,
  },
  {
    path: "/agregar-blog",
    element:
      <div style={{minHeight:"100vh", display: "flex", flexDirection: "column"}}>
        <Terms />
        <MenuBar></MenuBar>
        <Container className='spaceNav'><AgregarBlog/></Container>
        {/* <Footerw style={{marginTop: "auto"}} /> */}
      </div>,
  },
  {
    path: "/agregar-galeria",
    element:
      <div style={{minHeight:"100vh", display: "flex", flexDirection: "column"}}>
        <Terms />
        <MenuBar></MenuBar>
        <Container className='spaceNav'><AgregarGaleria/></Container>
        {/* <Footerw style={{marginTop: "auto"}} /> */}
      </div>,
  },
])


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    {/* <Routes></Routes> */}
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
