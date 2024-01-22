class LeaveDetails {
    /**
     * @param {string} empId - Employee ID
     * @param {string} type - Type of leave
     * @param {number} availableLeaves - Number of available leaves
     * @param {number} carryForwardLeaves - Number of carry-forward leaves
     * @param {number} totalLeaves - Total number of leaves
     */
    constructor(empId, type, availableLeaves, carryForwardLeaves, totalLeaves) {
        this.empId = empId;
        this.type = type;
        this.availableLeaves = availableLeaves;
        this.carryForwardLeaves = carryForwardLeaves;
        this.totalLeaves = totalLeaves;
    }
}

export default LeaveDetails;
    