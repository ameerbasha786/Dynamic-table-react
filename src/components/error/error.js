import React from 'react';
import './error.css'

const Error = (props) => {
    return (
        <div id="errdiv">
            <span id='errspan'>{props.errormessage}</span>
            <i id='i' onClick={props.cancelerr} className="fa fa-times" aria-hidden="true"></i>
        </div>
    )
}

export default Error