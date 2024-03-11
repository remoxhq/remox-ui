export const startDate = () => {
    const newDate = new Date();
    newDate.setDate(newDate.getDate() - 366);
    return newDate;
}

export const endDate = () => {
    const newDate = new Date();
    newDate.setDate(newDate.getDate() - 1);
    return newDate;
}