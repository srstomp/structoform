import React, { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'

const PasswordField = ({id, name, placeholder, value, type, showError, onChange, toggleLabelShow, toggleLabelHide}) => {
    const [passwordIsShown, setPasswordIsShown] = useState(false)
    const inputEl = useRef(null)
    const [currentValue, setCurrentValue] = useState(value)

    useEffect(() => {
        onChange(name, currentValue)
    }, [currentValue])

    const handleChange = e => {
        setCurrentValue(e.target.value)
    }

    const togglePassword = () => {
        inputEl.current.type = inputEl.current.type === 'password' ? 'text' : 'password'
        setPasswordIsShown(inputEl.current.type === 'text')
    }

    return (
        <div className="form-item__text-wrapper" style={{display: 'flex', alignItems: 'center'}}>
            <input
                className={`form-item__input ${showError ? 'error' : ''}`}
                placeholder={placeholder}
                type={type}
                onChange={handleChange}
                name={name}
                id={id}
                value={currentValue}
                ref={inputEl}
                onBlur={() => setCurrentValue(currentValue)}
            />
            {
                type === 'password' ?
                    <button type="button" className={`form-item__input-button ${!passwordIsShown ? 'active' : ''}`}
                            onClick={togglePassword}>
                        {
                            !passwordIsShown ? toggleLabelShow : toggleLabelHide
                        }
                    </button> : null
            }
        </div>
    )
}

export default PasswordField

PasswordField.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    type: PropTypes.string.isRequired,
    showError: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    toggleLabelShow: PropTypes.string,
    toggleLabelHide: PropTypes.string
}