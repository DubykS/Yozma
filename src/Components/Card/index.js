import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import './layout.css'
import {setStorage, getStorage} from "../../Utils";

const Card = (props) => {

    const deleteCardHandler = (id) => {
        let contacts = getStorage();
        if(contacts === null){
            props.onDelete([]);
            return
        }
        let newContacts = contacts.filter(item => item.id !== id);
        setStorage(newContacts);
        return props.onDelete(newContacts)
    }

    const addFavouriteHandler = (id) => {
        let contacts = getStorage();
        if(contacts === null){
            props.onFavourite([]);
            return
        }
        let currentContact = contacts.find(item => item.id === id);
        currentContact.favourite = !currentContact.favourite;
        setStorage(contacts);
        return props.onFavourite(contacts)
    }
    return (
        <li className={'cardComponent'}>
            <div>Name: <span>{props.name}</span></div>
            <div>Phone: <span>{props.phone}</span></div>
            <div>Email: <span>{props.email}</span></div>
            <div className={'cardComponent__controlPanel'}>
                <Link
                    to={{
                        pathname: "/edit",
                        search: `?id=${props.id}`,
                        state: {
                            contact: getStorage() && getStorage().find(item => item.id === props.id)
                        }
                    }}
                    title={'Edit'}
                >
                    <i className="fas fa-pen"/>
                </Link>
                <div
                    title={'Add to Favourite'}
                    className={!props.favourite ? 'simple' : 'favourite'}
                    onClick={(e) => {
                        addFavouriteHandler(props.id)
                    }}
                >
                    <i className="fas fa-heart"/></div>
                <div
                    title={'Delete'}
                    onClick={() => deleteCardHandler(props.id)}
                >
                    <i className="fas fa-trash"/>
                </div>
            </div>
        </li>
    );
};
export default Card