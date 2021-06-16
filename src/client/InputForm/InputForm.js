import React from 'react';


const inputForm = React.forwardRef((props, ref) => {
    const name = props.name;
    let readonly = false;
    if( name == 'discord'){
        readonly = true;
    } 

    return (
    <div className="ui field">
    <label>{props.label}: </label>
        <input ref={ref} name={props.name} type={props.type} placeholder={props.comment} value={props.value}  readOnly={readonly}></input>
    </div>
    );
});

export default inputForm;