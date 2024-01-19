import React, { useState } from 'react';
import { Box, FormControl, FormLabel, Input, Button, Select } from '@chakra-ui/react';
import { scheduleInterview } from '../../services/CandidateService';

const InterviewScheduler = () => {
    const [interview, setInterview] = useState({
        candidateId: '',
        jobId: '',
        interviewDate: '',
        interviewTime: '',
        interviewer: ''
        // Add other fields as necessary
    });

    const handleChange = (e) => {
        setInterview({ ...interview, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await scheduleInterview(interview);
            console.log('Interview Scheduled:', response);
            // Handle success (e.g., clear form, display message)
        } catch (error) {
            console.error('Error scheduling interview:', error);
            // Handle error
        }
    };

    return (
        <Box p={4}>
            <form onSubmit={handleSubmit}>
                {/* Form fields for interview scheduling */}
                {/* Example: Candidate ID, Job ID, Date, Time, Interviewer */}
                <FormControl id="candidateId" isRequired>
                    <FormLabel>Candidate ID</FormLabel>
                    <Input name="candidateId" type="text" onChange={handleChange} />
                </FormControl>
                {/* Add other form controls */}
                <Button mt={4} colorScheme="blue" type="submit">Schedule Interview</Button>
            </form>
        </Box>
    );
};

export default InterviewScheduler;
