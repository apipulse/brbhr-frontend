import axios from './axiosInstance'; // Assuming you have an axios instance set up

export const getLeavesByEmployee = async (employeeId) => {
    try {
        const response = await axios.get(`/leave/${employeeId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const applyForLeave = async (leaveData) => {
    try {
        const response = await axios.post('/leave', leaveData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateLeave = async (id, leaveData) => {
    try {
        const response = await axios.put(`/leave/${id}`, leaveData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteLeave = async (id) => {
    try {
        await axios.delete(`/leave/${id}`);
    } catch (error) {
        throw error;
    }
};
