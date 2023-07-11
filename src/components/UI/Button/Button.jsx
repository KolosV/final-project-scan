import React from 'react';
import innerStyles from './Button.module.scss';

function Button({ children, styles, ...props }) {
    return (
        <button {...props} className={`${styles} ${innerStyles.button}`}>
            {children}
        </button>
    );
}

export default Button;
