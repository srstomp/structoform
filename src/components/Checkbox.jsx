import React from 'react';
import PropTypes from 'prop-types';
import { id } from '../constants/helper';

const Checkbox = ({label, name, value = '', onChange, errorMessage, showError = false}) => {
    return (
        <div className='form-item'>
            <div className="form-item__inner">
                <input className='form-item__input' type='checkbox' name={name} value={value}
                    onChange={onChange} htmlFor={id}/>
                <label className={`form-item__label--checkbox ${showError ? 'error' : ''}`}
                    htmlFor={id}>{label}</label>
                {/*<span className={`form-item__error-label ${showError ? '' : 'hide'}`}>{errorMessage}</span>*/}
            </div>
        </div>
    )
}

export default Checkbox

Checkbox.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    errorMessage: PropTypes.string,
    showError: PropTypes.bool
}
