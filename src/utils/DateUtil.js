export const MONTHS = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
]

const kabisatMonths = [ 31, (  29  ), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];
const regularMonths = [ 31, (  28  ), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];
/**
 * 
 * @param {Number} month 
 */
export const getMonthDays = (month) => {
    if(new Date().getFullYear() % 4 == 0){
        return kabisatMonths[month];
    }
    return regularMonths[month];
}

/**
 * 
 */
export const getCurrentMMYY = () => {
    return [new Date().getMonth() + 1, new Date().getFullYear()];
}

export const dateStringDayMonthYear = (day, month, year) => {
    return day+" "+MONTHS[month-1]+" "+year;
}
/**
 * format = yyyy-mm-dd
 * @param {String} text 
 */
export const dateStringDayMonthYearFromText = (text) => {
    const raw = text.split("-");
    const day = raw[2];
    const month = raw[1];
    const year = raw[0];
    return day+" "+MONTHS[month-1]+" "+year;
}

export const getDiffDaysFromNow = (date) => {
    const diff = new Date().getTime() - date.getTime();
    const diffDays = diff / (24 * 60 * 60 * 1000);
    return diffDays;
}

export const getDiffDaysToNow = (date) => {
    const diff = date.getTime() - new Date().getTime();
    const diffDays = diff / (24 * 60 * 60 * 1000);
    return diffDays;
}

