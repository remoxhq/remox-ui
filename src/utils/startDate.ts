export const startDate = () => {
    const newDate = new Date();
    newDate.setDate(newDate.getDate() - 365);
    return newDate;
}