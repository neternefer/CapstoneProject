//Testing date type support function
describe('Semantic types support', () => {
    test('test if date type is supported on Chrome 81', () => {
        const dateInput = document.createElement('input');
        dateInput.setAttribute('type', 'date');
        dateInput.setAttribute('value', 'a');
        expect(dateInput.value !== 'a').toBe(true);
    });
});