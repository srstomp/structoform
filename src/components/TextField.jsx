import PropTypes from "prop-types";
import { id } from '../constants/helper';

const TextField = ({label, name, value, direction, type, placeholder, onChange, errorMessage, showError = false}) => {
    const [passwordIsShown, setPasswordIsShown] = useState(false)
    const inputEl = useRef(null)

    // PASSWORD STUFF
    const togglePassword = () => {
        inputEl.current.type = inputEl.current.type === 'password' ? 'text' : 'password'
        setPasswordIsShown(inputEl.current.type === 'text')
    }

    const passwordToggleButton = () => {
        return (
            type === 'password' ?
                <button className="form-item__input-button" onClick={togglePassword}>
                    {
                        passwordIsShown ? <EyeOpen width={35} height={25}/> : <Eye width={35} height={25}/>
                    }
                </button> : null
        )
    }

    return (
        <div className={`form-item form-item${direction}`}>
            {label !== '' ? <label className={`form-item__label`} htmlFor={id}>{label}</label> : null}
            <div className="form-item__inner">
                <input className={`form-item__input ${showError ? 'error' : ''}`} placeholder={placeholder}
                       ref={inputEl} type={type} onChange={onChange} name={name} htmlFor={id} value={value}/>
                {passwordToggleButton()}
                <span className={`form-item__error-label ${showError ? '' : 'hide'}`}>{errorMessage}</span>
            </div>
        </div>
    )
}

export default TextField

TextField.direction = {
    row: '--row',
    column: '--column',
}

TextField.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    direction: PropTypes.oneOf(Object.values(TextField.direction)),
    type: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    errorMessage: PropTypes.string,
    showError: PropTypes.bool
}
