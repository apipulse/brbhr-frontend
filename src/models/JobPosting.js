class JobPosting {
    /**
     * @param {string} id - Unique identifier for the job posting
     * @param {string} title - Title of the job posting
     * @param {string} description - Description of the job posting
     * @param {string | Date} postingDate - Date when the job posting was created (ISO string or Date object)
     * @param {string | Date} closingDate - Closing date for the job posting (ISO string or Date object)
     * @param {string} jobPosition - Position for the job posting
     * @param {string} recruitingManager - Name of the recruiting manager
     * @param {number} vacancy - Number of vacancies
     * @param {string[]} requiredSkills - List of required skills for the job
     * @param {Stage[]} stages - List of stages in the job application process
     * @param {number} experienceRequired - Required years of experience
     */
    constructor(id, title, description, postingDate, closingDate, jobPosition, recruitingManager, vacancy, requiredSkills, stages, experienceRequired) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.postingDate = postingDate; // JavaScript Date object or ISO date string
        this.closingDate = closingDate; // JavaScript Date object or ISO date string
        this.jobPosition = jobPosition;
        this.recruitingManager = recruitingManager;
        this.vacancy = vacancy;
        this.requiredSkills = requiredSkills;
        this.stages = stages; // Assuming 'Stage' is another model or enum
        this.experienceRequired = experienceRequired;
    }
}

export default JobPosting;
