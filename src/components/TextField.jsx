import React, {useState} from 'react'
import PropTypes from "prop-types"
import { uniqueId, direction } from '../constants/helper'
import FormItem from "./FormItem";

const TextField = ({label, name, placeholder, value = '', direction, type, onChange, errorMessage, showError}) => {
    const [ id ] = useState(() => uniqueId(`${_.camelCase(label)}-`))

    return (
        <FormItem label={label} id={id} direction={direction}>
            <div className="form-item__inner">
                <input className={`form-item__input ${showError ? 'error' : ''}`} placeholder={placeholder}
                       type={type} onChange={onChange} name={name} htmlFor={id} value={value}/>
                <span className={`error-label ${showError ? '' : 'hide'}`}>{errorMessage}</span>
            </div>
        </FormItem>
    )
}



export default TextField

TextField.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    direction: PropTypes.oneOf(Object.values(direction)),
    type: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    errorMessage: PropTypes.string,
    showError: PropTypes.bool.isRequired,
}
