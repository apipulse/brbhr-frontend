// utils/dateUtils.js

/**
 * Formats a JavaScript Date object to a YYYY-MM-DD string.
 * @param {Date} date - The date to format.
 * @returns {string} - The formatted date string.
 */
export const formatDateForInput = (date) => {
    if (!date) return '';
  
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
  
    if (month.length < 2) {
      month = '0' + month;
    }
  
    if (day.length < 2) {
      day = '0' + day;
    }
  
    return [year, month, day].join('-');
  };
  