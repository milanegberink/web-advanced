const prettifyDate = (date) => {
    return Intl.DateTimeFormat('nl-NL', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
    }).format(new Date(date));
}

export default prettifyDate;