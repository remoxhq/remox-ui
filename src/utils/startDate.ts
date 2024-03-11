export const startDate = () => {
    const newDate = new Date();
    newDate.setDate(newDate.getDate() - 365);
    return newDate;
}

export const endDate = () => {
    const newDate = new Date();
    newDate.setDate(newDate.getDate() - 1);
    return newDate;
}