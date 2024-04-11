export const startDate = (days: number) => {
    const newDate = new Date();
    newDate.setDate(newDate.getDate() - days);
    return newDate;
}

export const endDate = () => {
    const newDate = new Date();
    newDate.setDate(newDate.getDate() - 1);
    return newDate;
}