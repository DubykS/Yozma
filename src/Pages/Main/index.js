import React, {useState, useEffect} from 'react';
import Card from "../../Components/Card";
import {setStorage, getStorage} from '../../Utils'
import './layout.css'

const Main = () => {
    let [cardsList, setCardsList] = useState(getStorage() || []);
    let [viewAll , setViewAll] = useState(true);

    const addNewContact = (data) => {
        setCardsList((prevState) => {
            let element = [{
                'id': data,
                'favourite': false,
                'name': '',
                'email': '',
                'phone': ''
            }];
            setStorage(prevState.concat(element));
            return prevState.concat(element)
        })
    };

    const deleteContact = data => {
        setCardsList(data)
    };

    const addFavourite = data => {
        setCardsList(data)
    };

    const showFavourite = data => {
        setViewAll(false)
    };
    const showAll = data => {
        setCardsList(getStorage() || []);
        setViewAll(true)
    };

    return (
        <div className={'MainPage'}>
            <div className="MainPage__container">
                <div
                    className={'AddBtn'}
                    onClick={() => {
                        addNewContact(Date.now())
                    }}>
                    Add Contact
                </div>
                <ul className={'cardContainer'}>
                    {cardsList && cardsList.map(item => {
                        if(viewAll){
                            return <Card
                                key={item.id}
                                onDelete={deleteContact}
                                onFavourite={addFavourite}
                                {...item}
                            />
                        }else if(!viewAll && item.favourite === true){
                            return <Card
                                key={item.id}
                                onDelete={deleteContact}
                                onFavourite={addFavourite}
                                {...item}
                            />
                        }

                    })}
                </ul>

                <div className="buttonsContainer">
                    {cardsList && cardsList.length>0 &&
                    <div onClick={showFavourite} className={!viewAll ? 'active' : 'default'}>
                        Show Favourite
                    </div>}
                    <div onClick={showAll} className={viewAll ? 'active' : 'default'}>
                        Show All
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Main