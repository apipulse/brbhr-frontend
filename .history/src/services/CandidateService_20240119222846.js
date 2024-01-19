import axios from './axiosInstance'; // Assuming axiosInstance is set up for making API calls

export const postJob = async (jobPosting) => {
    try {
        const response = await axios.post('candidates/post-job', jobPosting);
        return response.data;
    } catch (error) {
        con
        throw error;
    }
};

export const getAllJobPostings = async () => {
    try {
        const response = await axios.get('candidates/job-postings');
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const applyForJob = async (application) => {
    try {
        const response = await axios.post('candidates/apply', application);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getCandidateApplications = async (candidateId) => {
    try {
        const response = await axios.get(`candidates/applications/${candidateId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const scheduleInterview = async (interview) => {
    try {
        const response = await axios.post('candidates/schedule-interview', interview);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const extendOffer = async (offer) => {
    try {
        const response = await axios.post('candidates/extend-offer', offer);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const acceptOffer = async (offerId) => {
    try {
        const response = await axios.post(`candidates/accept-offer/${offerId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Additional functions for updating/deleting job postings, interviews, offers, etc.
