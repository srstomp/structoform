import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { direction as directions, uniqueId } from '../constants/helper'
import RadioButton from './RadioButton'
import _ from 'lodash';

const RadioButtonGroup = ({ values, name, value, inline, renderTabs, onChange, isVisible }) => {
    const [currentValue, setCurrentValue] = useState(value)

    useEffect(() => {
        onChange(name, currentValue, { isVisible })
    }, [currentValue, isVisible])

    const handleChange = (e) => {
        e.preventDefault()
        setCurrentValue(e.target.value)
    }

    return (
        <div className={`form-item__radiogroup${inline ? directions.row : directions.column} ${showError && 'error'}`}>
            {values.map(item => <RadioButton
                key={uniqueId(`${_.camelCase(item.label)}-`)}
                label={item.label}
                value={item.value}
                group={name}
                onChange={handleChange}
                isChecked={item.value === currentValue}
                renderTabs={renderTabs}
            />)}
        </div>
    )
}

export default RadioButtonGroup

RadioButtonGroup.defaultProps = {
    value: '',
    isVisible: true,
}

RadioButtonGroup.propTypes = {
    values: PropTypes.arrayOf(PropTypes.shape).isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string,
    direction: PropTypes.oneOf(Object.values(directions)),
    inline: PropTypes.bool,
    renderTabs: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    isVisible: PropTypes.bool
}
