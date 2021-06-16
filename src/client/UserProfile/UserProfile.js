import React from 'react';
import HeaderForm from '../HeaderForm/HeaderForm';
import { Link, Route, Switch } from 'react-router-dom';

const userProfile = (props) => {
    const name = props.name;
    let readonly = false;
    if (name == 'discord') {
        readonly = true;
    }

    return (

        <div className="ui segment left aligned ">
            <HeaderForm title="Twoje konto" icon="user circle" />
            <div className="ui four cards">
                <div className="ui card">
                    <div className="image">
                        <img src={`https://cdn.discordapp.com/avatars/${props.id}/${props.avatar}.png`} />
                    </div>
                    <div className="content">
                        <a className="header">{props.name}</a>
                        <div className="meta">
                            <span className="date">Dołączono 2013</span>
                        </div>
                        {/* <div className="description">        Test     </div> */}
                    </div>
                    <div className="extra content">
                        <a><i className="yellow address card icon"></i> Whitelist podanie - rozpatrywane</a><br />
                        <a><i className="comment alternate outline icon"></i> Whitelist rozmowa - brak</a>
                    </div>
                </div>
                <div className="ui card">
                    <div className="content">
                        <div className="header">
                            <i className="address card green icon"></i>
                            Whitelist
                        </div>
                        <div className="description">
                            Zapisz się na Whitelist wypełniając formularz zgłoszeniowy. Twoje zgłoszenie będzie rozpatrywane około 48h. W każdej chwili status zgłoszenia możesz sprawdzić tutaj. Po pozytywnym rozpatrzeniu zostaniesz poinformowany na odpowiednim kanale discord. Drugim etapem jest rozmowa kwalifikacyjna udowadniajaca Twoje umiejętności gry RP i znajomości podstaw czy regulaminu.
                            </div>
                    </div>
                    <div className="ui two bottom attached buttons">
                        <div className="ui button">
                            <Link to="/whitelist">Przejdź do formularza</Link>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default userProfile;