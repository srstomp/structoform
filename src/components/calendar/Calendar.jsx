import React, { useState, useEffect } from 'react'
import moment from 'moment'
//import loc from 'moment/locale/nl';

const Chevron = () =>
    <svg width="6px" height="10px" viewBox="0 0 6 10" version="1.1" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMaxYMax meet">
        <g stroke="none" strokeWidth="1" fill="#131C4E" fillRule="evenodd">
            <path d="M6.72854831,7.77276692 C7.019454,8.07574436 7.49153741,8.07574436 7.7824431,7.77276692 C8.07251897,7.46892276 8.07251897,6.9758427 7.7824431,6.67199853 L3.52694739,2.22723308 C3.23604171,1.92425564 2.76395829,1.92425564 2.47305261,2.22723308 L-1.7824431,6.67199853 C-2.07251897,6.9758427 -2.07251897,7.46892276 -1.7824431,7.77276692 C-1.49153741,8.07574436 -1.019454,8.07574436 -0.728548312,7.77276692 L3.00160645,3.87581881 L6.72854831,7.77276692 Z" transform="translate(3.000000, 5.000000) scale(-1, 1) rotate(90.000000) translate(-3.000000, -5.000000) "></path>
        </g>
    </svg>

const Calendar = () => {
    //moment.locale('nl', loc);
    const [ dateObject, setDateObject ] = useState(moment())
    const [ selectedDate, setSelectedDate ] = useState(null)
    const [ daysInMonth, setDaysInMonth ] = useState(dateObject.daysInMonth())

    useEffect(() => {
        setDaysInMonth(dateObject.daysInMonth())
    }, [dateObject])

    // Helpers
    const firstDayOfMonth = () => dateObject.startOf('month').format('d')
    const selectedMonth = (format = 'MMMM') => dateObject.format(format)
    const selectedYear = (format = 'YYYY') => dateObject.format(format)
    const isToday = (day) => {
        if (selectedMonth('MM') === moment().format('MM')) {
            return day === parseFloat(moment().format('D'))
        }
        return false
    }

    /**
     *
     * @returns A table row of weekdays
     */
    const Weekdays = () =>
        <tr>
            {
                moment.weekdaysMin().map(day => <th key={day} className='calendar__weekdays'>{day}</th>)
            }
        </tr>

    /**
     *
     * @returns An array of table rows that consist of cells representing each day of the selected month
     */
    const Days = () => {
        // Create a blank cell for each day before the first day of the month
        let blankCells = []
        for (let i = 0; i < firstDayOfMonth(); i++) {
            blankCells.push(<td className='calendar__cell calendar__cell--blank'></td>)
        }

        // Create a day cell for each day of the month
        let dayCells = []
        for (let j = 0; j < daysInMonth; j++) {
            const day = j + 1
            dayCells.push(
                <td className={`calendar__cell ${isToday(day) ? 'calendar__cell--today' : ''}`}
                    key={day}
                    onClick={e => onDateClick(e, day)}>
                    <span>{day}</span>
                </td>
            )
        }

        const totalSlots = [...blankCells, ...dayCells]
        let rows = []
        let cells = []

        totalSlots.forEach((row, i) => {
            if (i % 7 !== 0) {
                cells.push(row) // if index not equal 7 that means not go to next week
            } else {
                rows.push(cells) // when reach next week we contain all td in last week to rows
                cells = [] // empty container
                cells.push(row) // in current loop we still push current row to new container
            }
            if (i === totalSlots.length - 1) { // when end loop we add remain date
                rows.push(cells);
            }
        })

        return (
            rows.map((d, i) => <tr key={i}>{d}</tr>)
        )
    }

    // Clickhandlers
    const onPrev = (e) => {
        e.preventDefault()
        setDateObject(moment(dateObject).subtract(1, 'months'))
    }

    const onNext = (e) => {
        e.preventDefault()
        setDateObject(moment(dateObject).add(1, 'months'))
    }

    const presentMonthPicker = (e) => {
        e.preventDefault()
        // TODO -> render table and present month picker
    }

    const onDateClick = (event, day) => {
        const dateString = `${day}/${selectedMonth('MM')}/${selectedYear()}`
        console.log(dateString)
        setSelectedDate(dateString)

        // const date = moment(dateString, 'D/MM/YYYY')
        // console.log(date)
        // console.log(date.toISOString())
    }

    return (
        <div className={`calendar__wrapper`}>
            <div className='calendar__header'>
                <button className='calendar__pagination calendar__pagination--left' onClick={onPrev}><Chevron/></button>
                <button className='calendar__month-button' onClick={presentMonthPicker}>{`${selectedMonth()} ${selectedYear()}`}</button>
                <button className='calendar__pagination calendar__pagination--right' onClick={onNext}><Chevron/></button>
            </div>
            <table className='calendar__table'>
                <thead>
                    <Weekdays/>
                </thead>
                <tbody>
                    <Days/>
                </tbody>
            </table>
        </div>
    )
}

export default Calendar
