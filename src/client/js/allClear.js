const allClear = () => {
    const inputs = document.querySelectorAll('input');
    const values = [];
    inputs.forEach((i) => {
        values.push(i.value)
    });
    return values.every(x => x);
};

export {
    allClear
}
