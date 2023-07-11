import React from 'react';
import innerStyles from './Input.module.scss';

function Input({ styles, id, type, label, required, placeholder, value}) {

    return (
        <div className={`${styles} ${innerStyles.input} `}>
            <label htmlFor={id}>{label}{required ? <span>*</span> : ''}</label>
            <input value={value} placeholder={placeholder} id={id} type={type} />
        </div>
    );
}

export default Input;

