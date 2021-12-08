export const dateToUTC = (dateObj) => {
    return `${dateObj.getUTCFullYear()}-${(dateObj.getUTCMonth() + 1)}-${dateObj.getUTCDate()} ${dateObj.getUTCHours()}:${dateObj.getUTCMinutes()}:${dateObj.getUTCSeconds()}`;
}