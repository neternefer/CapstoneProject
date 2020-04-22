const checkSemanticSupport = () => {
    const dateInput = document.createElement('input');
    dateInput.setAttribute('type', 'date');
    dateInput.setAttribute('value', 'a');
    if(dateInput.value !== 'a') {
        document.documentElement.className += ' date-supported';
    }
};

export {
    checkSemanticSupport
}