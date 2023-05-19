import {Spinner} from 'react-bootstrap';

const Loader = ({size= 80}) => {
    return (
        <div 
        style={{display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "60%",
        height: "20%",
        background: "white"
        } }>
            <Spinner animation="grow" style={{
                width: size,
                height: size,
                color: 'black',
                background: "white"
            }}/>
        </div>
    )
}

export default Loader;