import React from 'react';

const textAreaForm = React.forwardRef((props, ref) => {
    const name = props.name;
    let readonly = false;
    if( name == 'discord'){
        readonly = true;
    } 

    return (
    <div className="ui field">
    <label>{props.label}: </label>
        <textarea  ref={ref} name={props.name}  placeholder={props.comment} value={props.value}  readOnly={readonly}></textarea>
    </div>
    );
});

export default textAreaForm;