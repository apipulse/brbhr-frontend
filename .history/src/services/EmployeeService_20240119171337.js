import axios from './axiosInstance';

export const getEmployees = async () => {
    try {
        const response = await axios.get('employees');
        return response.data;
    } catch (error) {
        console.error('Error fetching employees:', error);
        throw error;
    }
};

export const getEmployeeById = async (id) => {
    try {
        const response = await axios.get(`employees/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching employee:', error);
        throw error;
    }
};

