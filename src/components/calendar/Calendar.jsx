import React, {useState} from 'react'
import moment from 'moment'

const Calendar = () => {
    const [ dateObject ] = useState(moment())

    const firstDayOfMonth = () => {
        const day = moment(dateObject)
            .startOf('month')
            .format('d')

        return day
    }

    const daysInMonth = () => moment().daysInMonth()

    const Weekdays = () =>
        <tr>
            {
                moment.weekdaysShort().map(day => <th key={day} className='calendar__weekdays'>{day}</th>)
            }
        </tr>

    const Days = () => {
        let blankCells = []

        for (let i = 0; i < firstDayOfMonth(); i++) {
            blankCells.push(<td className='calendar__cell calendar__cell--blank'></td>)
        }

        let dayCells = []
        for (let j = 1; j < daysInMonth(); j++) {
            dayCells.push(<td className='calendar__cell' key={j}>{j}</td>)
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


    return (
        <table className={`calendar`}>
            <thead>
                <Weekdays/>
            </thead>
            <tbody>
                <Days/>
            </tbody>
        </table>
    )
}

export default Calendar
