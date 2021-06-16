import React from 'react';

const headerForm = (props) =>{
    return (
    <h2 className="ui header dividing">
        <i className={`icon ${ props.icon }`}></i>
        <div className="content">
            {props.title}
        </div>
    </h2>
    );
};

export default headerForm;