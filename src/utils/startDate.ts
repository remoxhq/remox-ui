export const startDate = () => {
    const newDate = new Date();
    newDate.setDate(newDate.getDay() - 361);
    return newDate;
}

export const endDate = () => {
    const newDate = new Date();
    newDate.setDate(newDate.getDay() - -2);
    return newDate;
}