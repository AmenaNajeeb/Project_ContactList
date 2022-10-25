import React, {useContext, useState} from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import { ContactContext } from '../Context';
import { useNavigate} from 'react-router-dom';
import { v4 as uuid} from 'uuid'
import api from '../api/contactsapi'
//import '../Styling/addcontact.css';

function AddContact() {

    const [contacts, setContacts]=useContext
    (ContactContext);

    const [name, setName]=useState('');
    const [number, setNumber]=useState('');
    const [email, setEmail]=useState('');

    const long=uuid();
    const uniqueID=long.slice(0,8);

    const navigateto = useNavigate();

    const addName=(e)=>{
        setName(e.target.value);
    };

    const addNumber=(e)=>{
        setNumber(e.target.value);
    };

    const addEmail=(e)=>{
        setEmail(e.target.value);
    };

    const addContact=(e)=>{
        if(name==="" || number==="" || email==="")
        {alert('ALL FIELDS ARE MANDATORY');
        e.preventDefault();
        return
        }
        else
        {e.preventDefault();
        
        addContactDB({id:uniqueID, name:name, number:number, email:email})
        setName('')
        setNumber('')
        setEmail('')
        }
    };
    const addContactDB = async(contact)=>{
        const request={...contact}

        const response= await api.post("contacts-list", request)
        setContacts(prevContacts=>[...prevContacts, response.data])
    }
    const opencontactlist = () => {
        navigateto('/contactlist');
    };

    return (
        <div className='container my-3 p-4'>
            <h1 className='addcontact-heading container p-2 col-5'> Add Contact</h1>
            <form className='contact-details' onSubmit={addContact}>
                
                <div className='contact-name'>
                    <h2>Name: </h2>
                    <input type="text" placeholder='Please enter a valid Name' value={name} onChange={addName}/>
                </div>

                <div className='contact-number'>
                    <h2>Contact Number: </h2>
                    <input type="text" placeholder='Enter a valid Contact Number' value={number} onChange={addNumber}/>
                </div>

                <div className='contact-email'>
                    <h2>Email: </h2>
                    <input type="email" placeholder='eg: user@gmail.com' value={email} onChange={addEmail}/>
                <br/>
                </div>
                <br />
                <button type='submit' className='btn btn-success btn-lg'>Add New Contact</button>
            </form>
            <br />
            <button className='btn btn-primary btn-lg' onClick={opencontactlist}>View your Contacts</button>
        </div>
    )

}

export default AddContact;