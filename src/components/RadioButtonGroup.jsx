import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { uniqueId } from '../constants/helper'
import RadioButton from './RadioButton'
import _ from "lodash";

const RadioButtonGroup = ({items, group}) => {
    const [ selectedValue, setSelectedValue] = useState(null)

    const handleChange = (e) => {
        setSelectedValue(e.target.value)
        console.log(e.target.value)
    }

    return (
        <>
            {

                items.map(item => <RadioButton key={uniqueId(`${_.camelCase(item.label)}-`)} label={item.label}
                                               value={item.value} group={group} onChange={handleChange}/>)
            }
        </>
    )
}

export default RadioButtonGroup

RadioButtonGroup.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape).isRequired,
    group: PropTypes.string.isRequired
}
