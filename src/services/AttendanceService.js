import axios from './axiosInstance'; // Ensure axiosInstance is configured correctly

const baseUrl = '/attendance';

export const checkIn = async (empId) => {
    try {
        const response = await axios.post(`${baseUrl}/checkin/${empId}`);
        return response.data;
    } catch (error) {
        console.error('Error clocking in:', error);
        throw error;
    }
};

export const addAttendance = async (attendance) => {
    try {
        const response = await axios.post(`${baseUrl}/addOrUpdate`, attendance);
        return response.data;
    } catch (error) {
        console.error('Error adding/updating attendance:', error);
        throw error;
    }
};

export const checkOut = async (attendanceId) => {
    try {
        const response = await axios.put(`${baseUrl}/checkout/${attendanceId}`);
        return response.data;
    } catch (error) {
        console.error('Error clocking out:', error);
        throw error;
    }
};

export const getAttendanceByEmployeeId = async (employeeId) => {
    try {
        const response = await axios.get(`${baseUrl}/employee/${employeeId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching attendance by employee ID:', error);
        throw error;
    }
};

export const validateAttendance = async (attendanceId, validatorId) => {
    try {
        const response = await axios.put(`${baseUrl}/validate/${attendanceId}`, { validatorId });
        return response.data;
    } catch (error) {
        console.error('Error validating attendance:', error);
        throw error;
    }
};

export const invalidateAttendance = async (attendanceId, invalidatorId) => {
    try {
        const response = await axios.put(`${baseUrl}/invalidate/${attendanceId}`, { invalidatorId });
        return response.data;
    } catch (error) {
        console.error('Error invalidating attendance:', error);
        throw error;
    }
};

export const getAttendanceByDate = async (specificDate) => {
    try {
        const response = await axios.get(`${baseUrl}/date/${specificDate}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching attendance by date:', error);
        throw error;
    }
};

export const getAttendanceByMonth = async (year, month) => {
    try {
        const response = await axios.get(`${baseUrl}/month/${year}/${month}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching attendance by month:', error);
        throw error;
    }
};
