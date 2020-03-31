import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

const TextField = ({ content, wrapper }) => React.createElement(wrapper, {}, content)

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
    content: PropTypes.string,
    wrapper: PropTypes.oneOf(Object.values(TextField.wrapperTypes)),
}
