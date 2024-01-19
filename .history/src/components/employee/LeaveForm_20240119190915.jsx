import React, { useState, useEffect } from 'react';
import { Box, FormControl, FormLabel, Input, Button, Select } from '@chakra-ui/react';
import { applyForLeave, updateLeave } from '../../services/LeaveService';

const LeaveForm = ({ employeeId, leave, isEditing }) => {
    const [leaveData, setLeaveData] = useState({
        type: '',
        startDate: '',
        endDate: '',
        reason: ''
        // ...other relevant fields
    });

    useEffect(() => {
        if (isEditing && leave) {
            setLeaveData({ ...leave });
        }
    }, [leave, isEditing]);

    const handleChange = (e) => {
        setLeaveData({ ...leaveData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = isEditing
                ? await updateLeave(leave.id, leaveData)
                : await applyForLeave({ ...leaveData, employeeId });
            console.log('Leave Response:', response);
            // Handle success (e.g., display success message, redirect)
        } catch (error) {
            console.error('Error submitting leave:', error);
            // Handle error (e.g., display error message)
        }
    };

    return (
        <Box p={4}>
            <form onSubmit={handleSubmit}>
                <FormControl id="type" isRequired>
                    <FormLabel>Type</FormLabel>
                    <Select name="type" onChange={handleChange} value={leaveData.type}>
                        <option value="annual">Annual</option>
                        <option value="sick">Sick</option>
                        {/* Add other leave types */}
                    </Select>
                </FormControl>
                <FormControl id="startDate" isRequired mt={4}>
                    <FormLabel>Start Date</FormLabel>
                    <Input name="startDate" type="date" onChange={handleChange} value={leaveData.startDate} />
                </FormControl>
                <FormControl id="endDate" mt={4}>
                    <FormLabel>End Date</FormLabel>
                    <Input name="endDate" type="date" onChange={handleChange} value={leaveData.endDate} />
                </FormControl>
                <FormControl id="reason" mt={4}>
                    <FormLabel>Reason</FormLabel>
                    <Input name="reason" type="text" onChange={handleChange} value={leaveData.reason} />
                </FormControl>
                {/* Add other form controls as needed */}
                <Button mt={4} colorScheme="blue" type="submit">
                    {isEditing ? 'Update Leave' : 'Apply for Leave'}
                </Button>
            </form>
        </Box>
    );
};

export default LeaveForm;
