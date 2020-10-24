import React, {useState, useEffect} from 'react';
import {
    useLocation,
    useHistory
} from "react-router-dom";
import './layout.css'
import {getStorage, setStorage} from "../../Utils";


const Edit = (props) => {
    const contact = useLocation().state.contact;
    let id = contact.id
    let history = useHistory();
    let [name, setName] = useState(contact.name || '');
    let [email, setEMail] = useState(contact.email || '');
    let [phone, setPhone] = useState(contact.phone || '');


    const nameChange = (value) => {
        setName(value)
    };
    const mailChange = (value) => {
        setEMail(value)
    };
    const phoneChange = (value) => {
        setPhone(value)
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        let contacts = getStorage();
        let contactIdx = contacts.findIndex(item => item.id === id);
        contacts[contactIdx] = {...contacts[contactIdx], name, email, phone};
        setStorage(contacts)
        history.push('/')
    };

    const handleCancel = () => {
        history.push('/')
    };

    function validateEmail(elem) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!(re.test(String(elem.value).toLowerCase())) && elem.value.length !== 0) {
            elem.classList.add('error')
            mailChange(elem.value)
        } else {
            elem.classList.remove('error');
            mailChange(elem.value)
        }
    }

    return (
        <div className={'editPage'}>
            <form onSubmit={handleSubmit} className={'editPage__contactForm'}>
                <div className="form_sections">
                    <label>Name</label>
                    <input
                        type="text"
                        name={'name'}
                        value={name}
                        maxLength={50}
                        onChange={(e) => {
                            let regStr = /^[a-z\\ \\s]+$/
                            let value = e.target.value
                            if (!(regStr.test(String(value).toLowerCase()))) {
                                nameChange(value.substring(0, value.length - 1))
                            } else {
                                nameChange(value)
                            }
                        }}
                    />
                    <span>Only Latin letters , 50 symbols max</span>
                </div>
                <div className="form_sections">
                    <label>Email</label>
                    <input
                        type="mail"
                        value={email}
                        className={'default'}
                        name={'mail'}
                        onChange={(e) => {
                            validateEmail(e.target)
                        }}
                    />
                    <span>Email validation present</span>
                </div>
                <div className="form_sections">
                    <label>Phone</label>
                    <input
                        type="text"
                        name={'cardNumber'}
                        value={phone}
                        maxLength={10}
                        onChange={(e) => {
                            phoneChange(e.target.value)
                        }}
                    />
                    <span>Only numbers , 10 symbols max</span>
                </div>
                <div className="form_sections">
                    <button onClick={handleSubmit}>Save</button>
                    <div className={'cancel'} onClick={handleCancel}>Cancel</div>
                </div>

            </form>
        </div>
    );
}
export default Edit