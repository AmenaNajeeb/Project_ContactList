import React, {useContext, useEffect} from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import Contactcard from './contactcard';
import {ContactContext} from '../Context';
import api from '../api/contactsapi';
import {useNavigate, useLocation} from 'react-router-dom';


function Contactlist(){
    const [contacts, setContacts]=useContext(ContactContext);
    const navigate=useNavigate();
    const locate=useLocation();

    const fetchContacts=async()=>{
        const fetchedContacts=await api.get('/contacts-list')
        return fetchedContacts.data;
    }
    console.log(fetchContacts)

    useEffect(()=>{
        const fetchallContacts=async () =>{
            const allContacts = await fetchContacts();

            if(allContacts){
                setContacts(allContacts)
            }
        }
            fetchallContacts()

    },[])

const deletecontactHandler = async(id)=>{
    await api.delete(`/contacts-list/${id}`)

    const newContacts= contacts.filter((contact)=>{
        return contact.id !== id
    })
    setContacts(newContacts)
}
const addnewcontact=()=>{
    navigate('/addcontact')
};
return (
    <div style={{display:'flex', flexDirection:'column',
    justifyContent:'center', alignItems:'center'}}>
        {contacts.length === 0 ? 
        <div>
            <h1>Woah, this place is Empty! </h1>
            <button className='btn btn-success btn-lg m-2'
            onClick={addnewcontact}>Add New Contact</button>
        </div>
        :
        <div className='continer contact-list' style=
        {{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
        <button className="btn btn-success btn-lg m-2" onClick={addnewcontact}>Add New Contact</button>
        {
        contacts.map((contact)=>(
            <Contactcard name={contact.name} number={contact.number}
            email={contact.email} key={contact.id} id={contact.id}
            delete={deletecontactHandler}
            />
        ))
        }
        </div>
    }
    </div>
    
)

}

export default Contactlist;