import React, {useContext, useState} from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import { ContactContext } from '../Context';
import { useNavigate, useLocation} from 'react-router-dom';
import api from '../api/contactsapi'
//import '../Styling/addcontact.css';


function Editcontact() {

    const [contacts, setContacts]=useContext(ContactContext);


    const location=useLocation();
    const {id, name, number, email}=location.state.contact;


    const [updatedname, setUpdatedname]=useState(name);
    const [updatednumber, setUpdatedNumber]=useState(number);
    const [updatedemail, setUpdatedemail]=useState(email);


    const navigateto=useNavigate();

    const nameUpdate=(e)=>{
        setUpdatedname(e.target.value);
    };

    const numberUpdate=(e)=>{
        setUpdatedNumber(e.target.value);
    };

    const emailUpdate=(e)=>{
        setUpdatedemail(e.target.value);
    };

    const updateContact=(e)=>{
        if(updatedname===""|| updatednumber===''|| updatedemail==="")
        {
            e.preventDefault()
            alert("ALL FIELDS ARE MANDATORY!")
            return
        }
        else
        {
            e.prevent.preventDefault()

            updateContactDB({id:id, name:updatedname, number:updatednumber, email: updatedemail})

            setUpdatedname('')
            setUpdatedNumber('')
            setUpdatedemail('')
        }
    }

    const updateContactDB= async (details)=>{
        const response= await api.put('/contacts-list/${details.id}',details)
        const {id, name, number, email}=response.data;

        setContacts(contacts.map((contact)=>{
            return contact.id===id ?
            {...response.data}
            :contact
        }))
    }

    const opencontactlist =() => {
        navigateto('/contactlist');
    };

    return (
        <div className='container my-3 p-4'>
            <h1 className='addcontact-heading container p-2 col-5'> Edit Contact</h1>
            
            <form className='contact-details'
            onSubmit={updateContact}
            >
                <div className='contact-name'>
                    <h2> New Name: </h2>
                    <input type="text" placeholder='Please Enter a Valid Name' value={updatedname} onChange={nameUpdate} />
                </div>

                <div className='contact-number'>
                    <h2>New Contact Number: </h2>
                    <input type="text" placeholder="Enter a Valid Contact Number" value={updatednumber} onChange={numberUpdate} />
                </div>

                <div className='contact-email'>
                    <h2>New Email Address: </h2>
                    <input type="email" placeholder="eg: user123@gmail.com" value={updatedemail} onChange={emailUpdate} />
                </div>
                <br />

            </form>



        </div>
    )
}

export default Editcontact;