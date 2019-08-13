import {useState, useEffect} from 'react'
import { copy } from '../constants/copy';

const useForm = (callback, validators) => {
    const [values, setValues] = useState({})
    const [errors, setErrors] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false)

    useEffect(() => {
        if (Object.keys(errors).length === 0 && isSubmitting) {
            callback()
        }
        //console.log(errors)
        // eslint-disable-next-line
    }, [errors])

    const handleSubmit = (event) => {
        // Access the event properties. https://reactjs.org/docs/events.html
        event.persist()

        if (event) {
            event.preventDefault()
        }

        // Validate & store error message for each input element
        Object.keys(validators).forEach(item =>
            Object.values(event.target.elements).forEach((obj) => {
                if (obj.name === item) {
                    setErrors(errors => ({ ...errors, [obj.name]: validate(obj.value, validators[item])} ))
                }
            })
        )
        setIsSubmitting(true)
    }

    const handleChange = (event) => {
        // Access the event properties. https://reactjs.org/docs/events.html
        event.persist()

        // Remove current error on typing
        setErrors(errors => ({ ...errors, [event.target.name]: ''} ))

        // Store values of input elements
        setValues(values => ({ ...values, [event.target.name]: event.target.type !== 'checkbox' ? event.target.value : event.target.checked}))
    }

    return {
        values,
        errors,
        handleSubmit,
        handleChange,
        isSubmitting
    }
}

export default useForm

const validate = (value, validators) => {
    let errors = validators.rules.map(rule => {
        switch (Object.keys(rule)[0]) {
            case validate.types.REQUIRED:
                return value ? '' : copy.nl.error_is_required
            case validate.types.EMAIL:
                return /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value) ? '' : copy.nl.error_invalid_email
            case validate.types.IS_SELECTED:
                return value ? '' : copy.nl.error_is_selected
            case validate.types.IS_CHECKED:
                return value ? '' : copy.nl.error_is_checked
            case validate.types.IS_NUMBER:
                return /^(?=.*[0-9])/.test(value) ? '' : copy.nl.error_not_numeric
            case validate.types.IS_PASSWORD:
                return value ? '' : copy.nl.error_is_password
            default:
                return ''
        }
    })
    return errors
}

validate.types = {
    REQUIRED: 'isRequired',
    EMAIL: 'isEmail',
    IS_LENGTH: 'isLength',
    IS_SELECTED: 'isSelected',
    IS_CHECKED: 'isChecked',
    IS_NUMBER: 'isNumber',
    IS_PASSWORD: 'isPassword',
}
