import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

const CustomField = (props) => {
    const { component, id, name, value, showError, onChange } = props
    // const [currentValue, setCurrentValue] = useState(value)

    // useEffect(() => {
    //     onChange(name, currentValue)
    // }, [currentValue])

    const handleChange = e => setCurrentValue(e.target.value)

    return React.createElement(component, {
        className: `form-item__input ${showError ? 'error' : ''}`,
        htmlFor: id,
        ...props,
        // onChange: handleChange,
        // value: currentValue
    })
}

export default CustomField

CustomField.defaultProps = {
    value: '',
}

CustomField.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    type: PropTypes.string.isRequired,
    showError: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
}
