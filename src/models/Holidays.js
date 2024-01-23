class Holidays {
    /**
     * @param {string} id - Unique identifier for the holiday
     * @param {string} holidayName - Name of the holiday
     * @param {string | Date} startDate - Start date of the holiday (ISO string or Date object)
     * @param {string | Date} endDate - End date of the holiday (ISO string or Date object)
     * @param {boolean} recurring - Whether the holiday is recurring annually
     */
    constructor(id, holidayName, startDate, endDate, recurring) {
        this.id = id;
        this.holidayName = holidayName;
        this.startDate = startDate; // JavaScript Date object or ISO date string
        this.endDate = endDate;     // JavaScript Date object or ISO date string
        this.recurring = recurring;
    }
}

export default Holidays;
