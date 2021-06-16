import React from 'react';
import InputForm from '../InputForm/InputForm';
import TextAreaForm from '../TextAreaForm/TextAreaForm';
import HeaderForm from '../HeaderForm/HeaderForm';
import http from '../../api/http';
import { useForm } from 'react-hook-form';


const whitelistForm = (props) => {

    const { register, handleSubmit, errors } = useForm(); // initialise the hook
    const onSubmit = data => {
        console.log(data);              
        http.post('/api/sendApplication', data)
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    };
    const ref = React.createRef();
    return (
        <div className="ui segment left aligned ">

            <HeaderForm title="Formularz zgłoszeniowy" icon="edit outline" />
            <form className="whitelistForm form ui" action="/api/sendApplication" method="POST" onSubmit={handleSubmit(onSubmit)}>
                <div className="ui two column relaxed grid">
                    <section className="column ui grid">
                        <h3>Informacje o Tobie</h3>
                        <input label="avatar" name="avatar" type="hidden" value={`https://cdn.discordapp.com/avatars/${props.id}/${props.avatar}.png`} ref={register} />
                        <input label="uid" name="uid" type="hidden" value={props.id} ref={register} />
                        <InputForm label="Imię" name="name" type="text" comment="" ref={register({ required: true })} />                     
                        {errors.name && <span className="form-error">{'Uzupełnij imię'}</span>}
                        <InputForm label="Wiek" name="age" type="number" comment="" ref={register({ required: true })} />                        
                        {errors.age &&  <span className="form-error">{'Uzupełnij wiek'}</span>}
                        <InputForm label="Steam HEX ID" name="steamid" type="text" comment="Sprawdź swój HEX na vacbanned.com" ref={register({ validate: value => value.length > 10, })}/>
                        {errors.steamid &&  <span className="form-error">{'Minimalna długość steamid to 10 znaków'}</span>}
                        <InputForm label="Discord" name="discord" type="text" value={props.discord} comment="Dołącz do naszego discorda przed wysłaniem podania!"  ref={register} />
                    </section>
                    <section className="column ui grid">
                        <h3>Informacje o postaci</h3>
                        <InputForm label="Imię i nazwisko" name="charName" type="text" comment=""  ref={register({ required: true })} />                
                        {errors.charName &&  <span className="form-error">{'Uzupełnij imię i nazwisko'}</span>}
                        <InputForm label="Data urodzenia" name="charBirthday" type="date" comment=""  ref={register({ required: true })} />                
                        {errors.charBirthday &&  <span className="form-error">{'Uzupełnij datę urodzenia'}</span>}
                        <TextAreaForm label="Historia postaci" name="history"   ref={register({ validate: value => value.length > 255, })}/>                
                        {errors.history &&  <span className="form-error">{'Minimalna długość steamid to 255 znaków'}</span>}
                    </section>
                </div>
                <div className="ui two column relaxed grid">
                    <section className="centered centered column ui grid">
                        <input className="ui primary button huge" type="submit" value="Wyślij zgłoszenie" />
                        <p className="ui ignored info message">Przed wysłaniem podania zapoznaj się z regulaminem na forum!</p>
                    </section>
                </div>
            </form>
        </div>
    );
};

export default whitelistForm;