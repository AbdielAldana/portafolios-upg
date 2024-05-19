import { useState, useEffect } from "react";
import Alert from 'react-bootstrap/Alert';


function Alerta(props) {

    const [show, setShow] = useState(props.show);
    

    useEffect(()=>{
        setShow(props.show)
    },[props.show])

    return (
        <div className='alertStyle'>
            {show &&
                <Alert className="introAlert" variant={props.type} onClose={() => setShow(false)} dismissible>
                    <Alert.Heading>{props.title}</Alert.Heading>
                    <p>
                    {props.textContent}
                    </p>
                </Alert>
            }
        </div>
    );
}

export default Alerta