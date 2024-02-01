export const AddressReducer = ({address}:{address:string}):string => {
    return address.split('').reduce((a, c, i, arr) => {
        return i < 5 || arr.length - i < 5 ? a + c : a.split('.').length - 1 < 5 ? a + '.' : a;
    }, '');
};