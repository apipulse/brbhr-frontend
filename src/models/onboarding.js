class OnboardingStage {
    /**
     * @param {string} id - Unique identifier for the onboarding stage.
     * @param {string} name - Name of the onboarding stage.
     * @param {string} description - Description of the onboarding stage.
     * @param {string} defaultManager - Default manager ID for this onboarding stage.
     * @param {Map<string, string>} candidateIdVsManager - Mapping of candidate IDs to their respective managers for this stage.
     */
    constructor(id, name, description, defaultManager, candidateIdVsManager) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.defaultManager = defaultManager;
        this.candidateIdVsManager = candidateIdVsManager; // Assuming a Map object or similar structure
    }
}

export default OnboardingStage;
