class CompanyLeave {
    /**
     * @param {string} id - Unique identifier for the company leave
     * @param {number} basedOnWeek - Number representing the week-based policy
     * @param {number} basedOnWeekDay - Number representing the weekday-based policy
     */
    constructor(id, basedOnWeek, basedOnWeekDay) {
        this.id = id;
        this.basedOnWeek = basedOnWeek;
        this.basedOnWeekDay = basedOnWeekDay;
    }
}

export default CompanyLeave;
