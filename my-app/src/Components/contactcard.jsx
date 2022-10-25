import React from "react"
import { Link } from 'react-router-dom'
//import '../Styling/contactcardstyle.css'
import {ImBin2} from 'react-icons/im'
import {BiEdit} from 'react-icons/bi'

function Contactcard(props){
    const contact={
        id: props.id,
        name: props.name,
        number: props.number,
        email:props.email,
    };

    return (
        <div className="contactcard">
            <div>
                <h1 className="name">{contact.name}</h1><br />
                <h2 className="number">{contact.number}</h2><br />
                <h2 className="emailaddress">{contact.email}</h2><br />
            </div>

            <div style={{display: 'flex', flexDirection:'column', margin:'0.5rem'}}>
                <Link
                to={'/edit-contact'}
                state={{contact: contact}}
                >
                <BiEdit color='blue' style={{margin:'0.5em'}} />
                <i className="edit outline icon" style={{color:'blue', margin:'0.5em'}}></i>
                </Link>

                <ImBin2 size='1em' color='red' style={{margin:'0.5em'}} onClick={()=>props.delete(contact.id)}/>

            </div>
        </div>
    );
}

export default Contactcard;