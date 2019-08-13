import PropTypes from 'prop-types';
import { id } from '../constants/helper';

const SelectInput = ({label, name, values, direction, onChange, errorMessage, showError = false}) => {

    return (
        <div className={`form-item form-item${direction}`}>
            <label className={`form-item__label`} htmlFor={id}>{label}</label>
            <div className="form-item__inner">
                <select className={`form-item__select ${showError ? 'error' : ''}`} htmlFor={id} name={name}
                        onChange={onChange}>
                    <option></option>
                    {
                        values.map((item, i) => <option key={i}>{item}</option>)
                    }
                </select>
                <span className={`form-item__error-label ${showError ? '' : 'hide'}`}>{errorMessage}</span>
            </div>
        </div>
    )
}

export default SelectInput

SelectInput.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    values: PropTypes.arrayOf(PropTypes.string).isRequired,
    direction: PropTypes.oneOf(Object.values(InputField.direction)),
    onChange: PropTypes.func,
    errorMessage: PropTypes.string,
    showError: PropTypes.bool
}
