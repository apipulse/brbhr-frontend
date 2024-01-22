class LeaveTypeDetail {
    /**
     * @param {string} name - Name of the leave type
     * @param {string} icon - Icon associated with the leave type
     * @param {string} color - Color identifier for the leave type
     * @param {string} paymentMethod - Payment method for the leave
     * @param {number} leaveCount - Count of leaves
     * @param {string} periodIn - Period in which the leave is applicable
     * @param {number} totalDays - Total number of days of leave
     * @param {boolean} isResetAble - Indicates if the leave count resets
     * @param {string} reSetBased - Basis for resetting the leave count
     * @param {string} carryForwardType - Type of carry forward for the leave
     * @param {boolean} isRequireApproval - Indicates if the leave requires approval
     * @param {boolean} isExcludeCompanyLeaves - Indicates if company leaves are excluded
     * @param {boolean} isExcludeHolidays - Indicates if holidays are excluded
     * @param {string} leaveType - Type of leave
     */
    constructor(name, icon, color, paymentMethod, leaveCount, periodIn, totalDays, isResetAble, reSetBased, carryForwardType, isRequireApproval, isExcludeCompanyLeaves, isExcludeHolidays, leaveType) {
        this.name = name;
        this.icon = icon;
        this.color = color;
        this.paymentMethod = paymentMethod;
        this.leaveCount = leaveCount;
        this.periodIn = periodIn;
        this.totalDays = totalDays;
        this.isResetAble = isResetAble;
        this.reSetBased = reSetBased;
        this.carryForwardType = carryForwardType;
        this.isRequireApproval = isRequireApproval;
        this.isExcludeCompanyLeaves = isExcludeCompanyLeaves;
        this.isExcludeHolidays = isExcludeHolidays;
        this.leaveType = leaveType;
    }
}

export default LeaveTypeDetail;
