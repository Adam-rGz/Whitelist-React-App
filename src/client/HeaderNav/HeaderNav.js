import React from 'react';
import { Link } from 'react-router-dom';

const headerNav = (props) =>{
    return (
        <div className="ui menu">
            <div className="header item">WhitelistApp</div>
            
            <Link to={`/`} className="active item">Home</Link>   
            <div className="right menu">                
                <Link to={`/adminpanel`} className="item">Panel Moderacyjny</Link>
                </div>
        </div>
    );
};

export default headerNav;