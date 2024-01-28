class Attendance {
    /** 
     * @param {string} id - Unique identifier for the attendance record
     * @param {string} employeeId - Employee ID associated with the attendance
     * @param {string} checkInTime - Time of check-in (expected format: HH:mm:ss)
     * @param {string | Date} checkInDate - Date of check-in (ISO string or Date object)
     * @param {string} checkOutTime - Time of check-out (expected format: HH:mm:ss)
     * @param {string | Date} checkOutDate - Date of check-out (ISO string or Date object)
     * @param {string | Date} date - Date of the attendance record (ISO string or Date object)
     * @param {string} shift - Shift identifier
     * @param {string} workType - Type of work (e.g., WFH, Office)
     * @param {string} overTime - Overtime hours
     * @param {string} minimumHour - Minimum required hours
     * @param {boolean} isValidated - Indicates if the attendance is validated
     * @param {string} validatedBy - Name of the validator
     * @param {string} validatorId - Validator's ID
     */
    constructor(id, employeeId, checkInTime, checkInDate, checkOutTime, checkOutDate, date, shift, workType, overTime, minimumHour, isValidated, validatedBy, validatorId) {
        this.id = id;
        this.employeeId = employeeId;
        this.checkInTime = checkInTime;
        this.checkInDate = checkInDate; // JavaScript Date object or ISO date string
        this.checkOutTime = checkOutTime;
        this.checkOutDate = checkOutDate; // JavaScript Date object or ISO date string
        this.date = date; // JavaScript Date object or ISO date string
        this.shift = shift;
        this.workType = workType;
        this.overTime = overTime;
        this.minimumHour = minimumHour;
        this.isValidated = isValidated;
        this.validatedBy = validatedBy;
        this.validatorId = validatorId;
    }
}

export default Attendance;
