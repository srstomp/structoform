import _ from 'lodash'
import PropTypes from 'prop-types';
import { TextField, SelectInput, Checkbox, useForm } from "../index"

const Form = ({description, direction, layout, submitLabel, initValues = []}) => {

    const validationRules = {...layout}
    Object.keys(validationRules).map((item, i) =>
        validationRules[item] = {type: validationRules[item].type, rules: validationRules[item].validators}
    )

    const {values, errors, handleSubmit, handleChange, isSubmitting} = useForm(() => submit(), validationRules)
    const dir = direction === 'row' ? TextField.direction.row : TextField.direction.column

    const getValue = (key) => {
        // If no inputes are given, then return default valutes or empty string
        if (!values[key]) {
            return initValues[key] || ''
        }
        return values[key]
    }

    const submit = () => {
        console.log('errors:', errors)
        console.log('values:', values)
    }

    const getItem = (key, value, index) => {
        switch(value.type) {
            case 'text':
            case 'password':
            case 'email':
            case 'phone':
            case 'number':
                return <InputField key={index} type={value.type} name={key} label={value.label} direction={dir}
                                   onChange={handleChange} showError={isSubmitting}
                                   placeholder={value.placeholder || ''} errorMessage={_.head(errors[key]) || ''}
                                   value={values[key]}/>
            case 'select':
                return <SelectInput key={key} label={value.label} values={value.values || []} onChange={handleChange}
                                    direction={dir} name={key} showError={isSubmitting}
                                    errorMessage={_.head(errors[key]) || ''}/>
            case 'checkbox':
                return <Checkbox key={key} label={value.label} name={key} value={getValue(key)}
                                 showError={isSubmitting} onChange={handleChange}
                                 errorMessage={_.head(errors[key]) || ''}/>
            default:
                throw new Error(`Unhandled form type: ${value.type}`)
        }
    }

    return (
        <form className='form' onSubmit={handleSubmit} noValidate>
            <span>{description}</span>
            {
                Object.keys(layout).map((key, i) => {
                    return getItem(key, layout[key], i)
                })
            }
            <Button label={submitLabel} style={Button.styles.TEAL} type='submit' customClass='form-item__btn--submit'/>
        </form>
    )
}

export default Form

Form.propTypes = {
    description: PropTypes.string,
    layout: PropTypes.object.isRequired,
    direction: PropTypes.string,
    submitLabel: PropTypes.string.isRequired,
    initValues: PropTypes.array,
}
