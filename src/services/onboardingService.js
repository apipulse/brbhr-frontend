import axios from './axiosInstance'; // Assuming axiosInstance is correctly set up

export const triggerOnboarding = async (jobApplications, jobId) => {
    try {
        const response = await axios.post(`onboarding/triggerOnboarding/${jobId}`, jobApplications);
        return response.data;
    } catch (error) {
        console.error('Error triggering onboarding:', error);
        throw error;
    }
};

export const getAllHiredCandidates = async () => {
    try {
        const response = await axios.get('onboarding/candidates');
        return response.data;
    } catch (error) {
        console.error('Error fetching all hired candidates:', error);
        throw error;
    }
};

export const getAllOnboardingStages = async (jobId) => {
    try {
        const response = await axios.get(`onboarding/stages/${jobId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching onboarding stages:', error);
        throw error;
    }
};

export const createOnboardingStage = async (stage, jobId, index) => {
    try {
      const response = await axios.post(`/onboarding/stage/${jobId}`, stage, {
        params: { index },
        headers: { 'Content-Type': 'application/json' }, // <-- Add content type header
      });
      return response.data;
    } catch (error) {
      console.error('Error creating onboarding stage:', error);
      throw error;
    }
  };
  

export const updateCandidateStage = async (candidateId, fromStageIndex, toStageIndex, jobId, managerId) => {
    try {
        const response = await axios.put(`/onboarding/candidate/${candidateId}/stage`, null, { params: { fromStageIndex, toStageIndex, jobId, managerId } });
        return response.data;
    } catch (error) {
        console.error('Error updating candidate stage:', error);
        throw error;
    }
};

// Add more functions as required for other endpoints
