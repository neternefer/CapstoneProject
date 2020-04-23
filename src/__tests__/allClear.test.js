//Testing part of allClear function logic
describe('All true/false function', () => {
    test('test if all elements are true', () => {
        const values = ['Paris', '2020-04-25', '2020-04-30'];
        expect(values.every(x => x)).toBe(true);
    });
    test('test if all elements are true', () => {
        const values = ['Paris', '', '2020-04-30'];
        expect(values.every(x => x)).toBe(false);
    });
});