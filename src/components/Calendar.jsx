import React, { useState, useEffect } from 'react'
import moment from 'moment'
//import loc from 'moment/locale/nl';

const Chevron = () =>
    <svg width="6px" height="10px" viewBox="0 0 6 10" version="1.1" xmlns="http://www.w3.org/2000/svg"
         preserveAspectRatio="xMaxYMax meet">
        <g stroke="none" strokeWidth="1" fill="#131C4E" fillRule="evenodd">
            <path d="M6.72854831,7.77276692 C7.019454,8.07574436 7.49153741,8.07574436 7.7824431,7.77276692 C8.07251897,7.46892276 8.07251897,6.9758427 7.7824431,6.67199853 L3.52694739,2.22723308 C3.23604171,1.92425564 2.76395829,1.92425564 2.47305261,2.22723308 L-1.7824431,6.67199853 C-2.07251897,6.9758427 -2.07251897,7.46892276 -1.7824431,7.77276692 C-1.49153741,8.07574436 -1.019454,8.07574436 -0.728548312,7.77276692 L3.00160645,3.87581881 L6.72854831,7.77276692 Z" transform="translate(3.000000, 5.000000) scale(-1, 1) rotate(90.000000) translate(-3.000000, -5.000000) "></path>
        </g>
    </svg>

const Close = () =>
    <svg width="8px" height="8px" viewBox="0 0 8 8" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <g transform="translate(-3.000000, -3.000000)" fill="#131C4E" fillRule="nonzero">
                <path d="M11.3557051,6.35570514 L7.78427657,6.35570514 L7.78427657,2.78427657 C7.78427657,2.38919085 7.46507657,2.06999085 7.06999085,2.06999085 C6.67490514,2.06999085 6.35570514,2.38919085 6.35570514,2.78427657 L6.35570514,6.35570514 L2.78427657,6.35570514 C2.38919085,6.35570514 2.06999085,6.67490514 2.06999085,7.06999085 C2.06999085,7.46507657 2.38919085,7.78427657 2.78427657,7.78427657 L6.35570514,7.78427657 L6.35570514,11.3557051 C6.35570514,11.7507909 6.67490514,12.0699909 7.06999085,12.0699909 C7.46507657,12.0699909 7.78427657,11.7507909 7.78427657,11.3557051 L7.78427657,7.78427657 L11.3557051,7.78427657 C11.7507909,7.78427657 12.0699909,7.46507657 12.0699909,7.06999085 C12.0699909,6.67490514 11.7507909,6.35570514 11.3557051,6.35570514 Z" id="Fill-2" transform="translate(7.069991, 7.069991) rotate(134.000000) translate(-7.069991, -7.069991) "></path>
            </g>
        </g>
    </svg>

const Calendar = ({onSelect, date}) => {
    //moment.locale('nl', loc);te
    const [ dateObject, setDateObject ] = useState(moment())
    const [ selectedDate ] = useState(date)
    const [ newDate, setNewDate ] = useState('')
    const [ daysInMonth, setDaysInMonth ] = useState(dateObject.daysInMonth())
    const [ monthSelectorActive, setMonthSelectorActive] = useState(false)
    const [ yearSelectorActive, setYearSelectorActive] = useState(false)

    useEffect(() => {
        setDaysInMonth(dateObject.daysInMonth())
    }, [dateObject])

    useEffect(() => {
        // TODO -> refactor this piece of code
        if (newDate === '' && selectedDate !== '') {
            let d = moment(selectedDate, 'D/MM/YYYY')
            let month = parseInt(d.format('MM'))
            let year = parseInt(d.format('YYYY'))
            const currentMonth = new Date().getMonth()
            const currentYear = new Date().getFullYear()

            setDateObject(moment(dateObject).add((month - 1) - currentMonth,'months').add(year - currentYear, 'years'))
        } else {
            onSelect(newDate)
        }
    }, [newDate, date])

    // Helpers
    const selectedMonth = (format = 'MMMM') => dateObject.format(format)
    const selectedYear = (format = 'YYYY') => dateObject.format(format)

    const isToday = (day) => {
        if (selectedMonth('MM') === moment().format('MM') &&
            selectedYear('YYYY') === moment().format('YYYY')) {
            return day === parseFloat(moment().format('D'))
        }
        return false
    }

    const isSelectedDate = (day) => {
        let d = moment(selectedDate, 'D/MM/YYYY')
        if (selectedMonth('MM') === d.format('MM') &&
            selectedYear('YYYY') === d.format('YYYY')) {
            return day === parseFloat(d.format('D'))
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

    // TODO => cleanup
    const generateCells = (totalSlots, modulo) => {
        let rows = []
        let cells = []

        totalSlots.forEach((row, i) => {
            if (i % modulo !== 0) {
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

    /**
     *
     * @returns An array of table rows that consist of cells representing each day of the selected month
     */
    const DayCells = () => {
        const firstDayOfMonth = dateObject.startOf('month').format('d')

        // Create a blank cell for each day before the first day of the month
        let blankCells = []
        for (let i = 0; i < firstDayOfMonth; i++) {
            blankCells.push(<td className='calendar__cell calendar__cell--blank' key={`blank-${i}`}></td>)
        }

        // Create a day cell for each day of the month
        let dayCells = []
        for (let j = 0; j < daysInMonth; j++) {
            const day = j + 1
            dayCells.push(
                <td className={`calendar__cell ${isToday(day) ? 'calendar__cell--today' : ''} ${isSelectedDate(day) ? 'calendar__cell--selected' : ''}`}
                    key={`day-${day}`}
                    onClick={e => onDateClick(e, day)}>
                    <span>{day}</span>
                </td>
            )
        }

        return generateCells([...blankCells, ...dayCells], 7)
    }

    const MonthCells = () => {
        const months = moment.monthsShort()

        // Create a day cell for each day of the month
        const monthCells = months.map((month, index) =>
            <td className={`calendar__cell calendar__cell--month`} key={`month-${month}`} onClick={e => onMonthClick(e, index)}>
                <span>{month}</span>
            </td>
        )

        return generateCells(monthCells, 3)
    }

    const YearCells = () => {
        const currentYear = new Date().getFullYear()
        const years = [...Array(100).keys()].map(i =>
            <td className={`calendar__cell calendar__cell--month`} key={`year-${i}`} onClick={e => onYearClick(e, (currentYear + 30) - i)}>
                <span>{currentYear - i}</span>
            </td>
        )
        return generateCells(years, 4)
    }

    // Clickhandlers
    const onPaginationClick = (event, val) => {
        event.preventDefault()
        setDateObject(moment(dateObject).add(val, 'months'))
    }

    const presentPicker = (event, type) => {
        event.preventDefault()
        setMonthSelectorActive(type === 'month')
        setYearSelectorActive(type === 'year')
    }

    const onDateClick = (event, day) => {
        const dateString = `${day}/${selectedMonth('MM')}/${selectedYear()}`
        setNewDate(dateString)
    }

    const onMonthClick = (event, month) => {
        let current = parseInt(selectedMonth('M'))
        setDateObject(moment(dateObject).add((month + 1) - current, 'months'))
        onClose()
    }

    const onYearClick = (event, year) => {
        let current = parseInt(selectedMonth('YYYY'))
        setDateObject(moment(dateObject).add(year - current, 'years'))
        onClose()
    }

    const onClose = () => {
        monthSelectorActive && setMonthSelectorActive(false)
        yearSelectorActive && setYearSelectorActive(false)
    }

    const DaysTable = () =>
        <table className='calendar__table'>
            <thead>
                <Weekdays/>
            </thead>
            <tbody>
                <DayCells/>
            </tbody>
        </table>

    const MonthsTable = () =>
        <table className='calendar__table'>
            <tbody>
                <MonthCells/>
            </tbody>
        </table>

    const YearsTable = () =>
        <table className='calendar__table'>
            <tbody className='calendar__tbody-year'>
                <YearCells/>
            </tbody>
        </table>

    const Table = () => {
        switch (true) {
            case monthSelectorActive:
                return <MonthsTable/>
            case yearSelectorActive:
                return <YearsTable/>
            default:
                return <DaysTable/>
        }
    }

    return (
        <div className={`calendar__wrapper`}>
            <div className='calendar__header'>
                { (!monthSelectorActive && !yearSelectorActive) && <button className='calendar__pagination calendar__pagination--left'
                                                  onClick={e => onPaginationClick(e, -1)}><Chevron/></button> }
                <div className='calendar__toggle-container'>
                    <button className='calendar__toggle calendar__toggle--month'
                            onClick={event => presentPicker(event, 'month')}>{`${selectedMonth()}`}</button>
                    <button className='calendar__toggle calendar__toggle--year'
                            onClick={event => presentPicker(event, 'year')}>{`${selectedYear()}`}</button>
                </div>
                { (!monthSelectorActive || !yearSelectorActive) && <button className='calendar__pagination calendar__pagination--right'
                                                  onClick={e => onPaginationClick(e, 1)}><Chevron/></button> }
                { (monthSelectorActive || yearSelectorActive) && <button className='calendar__pagination calendar__pagination--right'
                                                 onClick={onClose}><Close/></button> }
            </div>
            <Table/>
        </div>
    )
}

export default Calendar
