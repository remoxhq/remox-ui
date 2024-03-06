export const startDate = () => {
    const newDate = new Date();
    newDate.setDate(newDate.getDay() - 361);
    return newDate;
}