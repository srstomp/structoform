import React, { useState } from 'react'
import PropTypes from "prop-types"
import { uniqueId, direction } from '../constants/helper'
import FormItem from './FormItem'
import _ from 'lodash'

const TextField = ({label, value, wrapper, direction }) => {
    const [ id ] = useState(() => uniqueId(`${_.camelCase(label)}-`))

    return (
        <FormItem label={label} id={id} direction={direction}>
            {React.createElement(wrapper, {}, value)}
        </FormItem>
    )
}

export default TextField

TextField.wrapperTypes = {
    DIV: 'div',
    P: 'p',
    H1: 'h1',
    H2: 'h2',
    H3: 'h3',
    H4: 'h4',
}

TextField.defaultProps = {
    wrapper: TextField.wrapperTypes.P
}

TextField.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    wrapper: PropTypes.oneOf(Object.values(TextField.wrapperTypes)),
    direction: PropTypes.oneOf(Object.values(direction)),
}
