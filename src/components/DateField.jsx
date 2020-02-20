import React, { useEffect, useState, useRef } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { uniqueId, direction } from '../constants/helper'
import FormItem from './FormItem'
import Calendar from './Calendar'

const CalendarIcon = () =>
    <svg width="25px" height="24px" viewBox="0 0 25 24" version="1.1" xmlns="http://www.w3.org/2000/svg" className='form-item__input-icon'>
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <g fill="#131C4E" stroke="#131C4E" strokeWidth="0.4">
                <path d="M21.293992,1.56340849 L18.3608768,1.56340849 L18.3608768,0.554627684 C18.3608768,0.2521952 18.1079785,0 17.8047028,0 C17.501427,0 17.2485287,0.2521952 17.2485287,0.554627684 L17.2485287,1.56340849 L6.77803068,1.56340849 L6.77803068,0.554627684 C6.77803068,0.2521952 6.52513231,0 6.2218566,0 C5.91858088,0 5.66568252,0.2521952 5.66568252,0.554627684 L5.66568252,1.56340849 L2.73155572,1.56340849 C1.21416504,1.56340849 0,2.7741472 0,4.28736884 L0,20.2760401 C0,21.7892111 1.21411446,23 2.73155572,23 L15.7300257,23 C16.6655474,23 17.5260088,22.6473302 18.1829375,21.9912192 L22.9880064,17.1995109 C23.6459468,16.5433999 23.9995999,15.6863397 23.9995999,14.7534192 L23.9995999,4.31304231 C24.0252842,2.77326452 22.8111799,1.56361024 21.2938403,1.56361024 L21.293992,1.56340849 Z M2.73175551,2.64706604 L5.66588484,2.64706604 L5.66588484,3.65584684 C5.66588484,3.95827933 5.9187832,4.21047453 6.22205892,4.21047453 C6.52533463,4.21047453 6.77823047,3.95827933 6.77823047,3.65584684 L6.77823047,2.64706604 L17.2735125,2.64706604 L17.2735125,3.65584684 C17.2735125,3.95827933 17.5264109,4.21047453 17.8296866,4.21047453 C18.1329623,4.21047453 18.3858607,3.95827933 18.3858607,3.65584684 L18.3858607,2.64706604 L21.31999,2.64706604 C22.2308262,2.64706604 22.9638293,3.37802861 22.9638293,4.28633484 L22.9638293,7.1363928 L1.08811974,7.1363928 L1.08811974,4.28633484 C1.08811974,3.37901217 1.82112035,2.64706604 2.73196036,2.64706604 L2.73175551,2.64706604 Z M2.73175551,21.8898128 C1.82091803,21.8898128 1.08791742,21.1588494 1.08791742,20.2505432 L1.08791742,8.22108436 L22.9378314,8.22108436 L22.9378314,14.7279727 C22.9378314,14.8284574 22.912147,14.9043126 22.912147,15.005791 L17.6270771,15.0048074 C16.7419328,15.0048074 16.0089322,15.73577 16.0089322,16.6184532 L16.0089322,21.8888274 C15.9081674,21.8888274 15.8321006,21.9144404 15.7303393,21.9144404 L2.73175551,21.8898128 Z M17.4246446,21.2090867 C17.3238797,21.3095714 17.2221286,21.3854267 17.0956744,21.486905 L17.0966632,16.6192854 C17.0966632,16.3168529 17.3238772,16.089272 17.6281544,16.089272 L22.5093457,16.089272 C22.4332789,16.2153696 22.3325141,16.3158542 22.2307529,16.4173275 L17.4246446,21.2090867 Z" id="Fill-1"></path>
            </g>
        </g>
    </svg>

const DateField = ({label, name, placeholder, value, direction, errorMessage, showError, onChange, isVisible}) => {
    const [ id ] = useState(() => uniqueId(`${_.camelCase(label)}-`))
    const [ currentValue, setCurrentValue ] = useState(value)

    const node = useRef();
    const refValue = useRef();
    const [ isCalendarPresent, setIsCalendarPresent ] = useState(false)

    useEffect(() => {
        if (refValue.current !== currentValue) {
            refValue.current = currentValue

            onChange(name, currentValue, { isVisible })

            setIsCalendarPresent(false)
        }

        if (isCalendarPresent) {
            document.addEventListener('mousedown', handleClickOutside)
        } else {
            document.removeEventListener('mousedown', handleClickOutside)
        }

        return () => document.removeEventListener('mousedown', handleClickOutside)

    }, [isCalendarPresent, currentValue, isVisible])

    const handleClickOutside = e => {
        if (node.current.contains(e.target)) {
            // inside click
            return
        }
        // outside click
        setIsCalendarPresent(false);
    }

    const handleInputClick = () => setIsCalendarPresent(true)

    const handleDateSelection = dateString => setCurrentValue(dateString)

    const handleChange = e => setCurrentValue(e.target.value)

    return isVisible && (
        <FormItem label={label} id={id} direction={direction}>
            <div className="form-item__input-wrapper">
                <input className={`form-item__input ${showError && 'error'}`} placeholder={placeholder}
                       onClick={handleInputClick} name={name} htmlFor={id} onChange={handleChange}
                       value={currentValue}/>
                <CalendarIcon/>
            </div>
            <span className={`error-label ${showError ? '' : 'hide'}`}>{errorMessage}</span>
            <div ref={node}>
                {
                    isCalendarPresent && <Calendar onSelect={handleDateSelection} date={currentValue}/>
                }
            </div>
        </FormItem>
    )
}

export default DateField

DateField.defaultProps = {
    value: '',
    isVisible: true,
}

DateField.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    direction: PropTypes.oneOf(Object.values(direction)),
    errorMessage: PropTypes.string,
    showError: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    isVisible: PropTypes.bool.isRequired
}
