class JobApplication {
    /**
     * @param {string} id - Unique identifier for the job application
     * @param {string} applicantName - Name of the applicant
     * @param {string} applicantEmail - Email address of the applicant
     * @param {string} resume - Resume of the applicant (URL or base64 encoded string)
     * @param {string} coverLetter - Cover letter from the applicant
     * @param {Stage} currentStage - Current stage of the job application
     * @param {string} address - Address of the applicant
     * @param {string} pincode - Pincode of the applicant's address
     * @param {string} nationality - Nationality of the applicant
     * @param {string} mobileNumber - Mobile number of the applicant
     * @param {string} countryCode - Country code for the mobile number
     * @param {string} visaStatus - Visa status of the applicant
     * @param {string} country - Country of residence of the applicant
     */
    constructor(id, applicantName, applicantEmail, resume, coverLetter, currentStage, address, pincode, nationality, mobileNumber, countryCode, visaStatus, country) {
        this.id = id;
        this.applicantName = applicantName;
        this.applicantEmail = applicantEmail;
        this.resume = resume;
        this.coverLetter = coverLetter;
        this.currentStage = currentStage; // Assuming Stage is another model or enum
        this.address = address;
        this.pincode = pincode;
        this.nationality = nationality;
        this.mobileNumber = mobileNumber;
        this.countryCode = countryCode;
        this.visaStatus = visaStatus;
        this.country = country;
    }
}

export default JobApplication;
