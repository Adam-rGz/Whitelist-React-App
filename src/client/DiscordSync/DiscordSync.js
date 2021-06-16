import React from 'react';
import HeaderForm from '../HeaderForm/HeaderForm';
import DiscordImage from '../discord-logo.svg';

const discordSync = () => {
    return (
        <div className="ui segment">
            <HeaderForm title="Logowanie poprzez discord" icon="edit outline" />
            <div className="ui two column relaxed grid">
                <section className="centered centered column ui grid">
                    <a className="ui primary button huge" href="/api/discord/login">Zaloguj <img src={DiscordImage} /></a>
                    <p className="ui ignored info message">Zaloguj się poprzez swojego Discord'a aby kontynuować</p>
                </section>
            </div>
        </div>
    );
};

export default discordSync;