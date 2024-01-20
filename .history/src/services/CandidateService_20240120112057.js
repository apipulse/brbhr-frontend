import axios from './axiosInstance'; // Assuming axiosInstance is set up for making API calls

export const postJob = async (jobPosting) => {
    try {
        const response = await axios.post('candidates/post-job', jobPosting);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const getAllJobPostings = async () => {
    try {
        const response = await axios.get('candidates/job-postings');
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const applyForJob = async (application) => {
    try {
        const response = await axios.post('candidates/apply', application);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const getCandidateApplications = async (candidateId) => {
    try {
        const response = await axios.get(`candidates/applications/${candidateId}`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const scheduleInterview = async (interview) => {
    try {
        const response = await axios.post('candidates/schedule-interview', interview);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const extendOffer = async (offer) => {
    try {
        const response = await axios.post('candidates/extend-offer', offer);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const acceptOffer = async (offerId) => {
    try {
        const response = await axios.post(`candidates/accept-offer/${offerId}`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const addStageToJobPosting = async (jobPostingId, stage) => {
    try {
        const response = await axios.post(`candidates/job-postings/${jobPostingId}/add-stage`, stage);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getStagesForJobPosting = async (jobPostingId) => {
    try {
        const response = await axios.get(`candidates/job-postings/${jobPostingId}/stages`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const deleteStageFromJobPosting = async (jobPostingId, stageId) => {
    try {
        await axios.delete(`candidates/job-postings/${jobPostingId}/stages/${stageId}`);
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getCurrentStageOfApplication = async (applicationId) => {
    try {
        const response = await axios.get(`candidates/applications/${applicationId}/current-stage`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const updateCandidateStage = async (applicationId, newStage) => {
    try {
        const response = await axios.put(`candidates/applications/${applicationId}/update-stage`, newStage);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

// Additional functions for updating/deleting job postings, interviews, offers, etc.
