class Leave {
    /**
     * @param {string} id - Unique identifier for the leave
     * @param {string} employeeId - Employee ID associated with the leave
     * @param {string | Date} startDate - Start date of the leave (ISO string or Date object)
     * @param {string | Date} endDate - End date of the leave (ISO string or Date object)
     * @param {string} type - Type of leave
     * @param {string} status - Status of the leave
     * @param {string} reason - Reason for the leave
     * @param {number} requestedDays - Number of days requested for the leave
     * @param {string} approverEmpId - Employee ID of the approver
     * @param {string} assignedToEmpId - Employee ID to whom the leave is assigned
     */
    constructor(id, employeeId, startDate, endDate, type, status, reason, requestedDays, approverEmpId, assignedToEmpId) {
        this.id = id;
        this.employeeId = employeeId;
        this.startDate = startDate; // JavaScript Date object or ISO date string
        this.endDate = endDate;     // JavaScript Date object or ISO date string
        this.type = type;
        this.status = status;
        this.reason = reason;
        this.requestedDays = requestedDays;
        this.approverEmpId = approverEmpId;
        this.assignedToEmpId = assignedToEmpId;
    }
}

export default Leave;
