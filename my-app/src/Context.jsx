import React, {createContext, useState} from "react"

export const ContactContext= createContext();

export const Contactprovider=(props)=> {

    const [contacts, setContacts] = useState([
        {
            name: 'Amena',
            number: '9573744417',
            email: 'amena.najeeb123@gmail.com'
        },
        {
            name: 'Ghazala',
            number: '8080808080',
            email: 'ghazalaanjum@gmail.com'
        },
        {
            name: 'Humair',
            number: '8081818181',
            email: 'humairahmedkhan@gmail.com'
        },
        {
            name: 'Arifa',
            number: '8282828282',
            email: 'arifasultana@gmail.com'
        },
        {
            name: 'Yousuf',
            number: '8283848586',
            email: 'yousufahmed@gmail.com'
        }
    ])
    
    
    return (
    <ContactContext.Provider value={[contacts, setContacts]}>
        {props.children}
    </ContactContext.Provider>
)
}

export default Contactprovider;