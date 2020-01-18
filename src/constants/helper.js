const id =  Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 16)

const gen4 = () => Math.random().toString(16).slice(-4)

const uniqueId = (prefix) => {
    return (prefix || '').concat([
        gen4(),
        gen4(),
        gen4(),
        gen4(),
        gen4(),
        gen4(),
        gen4(),
        gen4()
    ].join(''))
}

const direction = {
    row: '--row',
    column: '--column',
}

const copy = {
    nl: {
        // errors
        'error_is_required': 'Het invoerveld is niet ingevuld',
        'error_min_length': 'De invoer minimaal van lengte X zijn',
        'error_invalid_email': 'Er is geen geldig e-mailadres ingevuld',
        'error_is_selected': 'Er is geen geldige waarde geselecteerd',
        'error_is_password': 'Er is geen wachtwoord ingevuld',
        'error_not_numeric': 'Er is geen numerieke waarde ingevuld',
        'error_is_checked': 'Dit veld is niet geaccepteerd',
    }
}

export {
    id,
    uniqueId,
    copy,
    direction
}
