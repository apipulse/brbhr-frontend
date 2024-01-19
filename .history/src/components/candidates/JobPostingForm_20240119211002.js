import React, { useState } from 'react';
import { Box, FormControl, FormLabel, Input, Button, Textarea } from '@chakra-ui/react';
import { postJob } from '../../services/CandidateService';

const JobPostingForm = () => {
    const [jobPosting, setJobPosting] = useState({
        title: '',
        description: '',
        // Add other fields as necessary
    });

    const handleChange = (e) => {
        setJobPosting({ ...jobPosting, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await postJob(jobPosting);
            console.log('Job Posted:', response);
            // Handle success (e.g., clear form, display message)
        } catch (error) {
            console.error('Error posting job:', error);
            // Handle error
        }
    };

    return (
        <Box p={4}>
            <form onSubmit={handleSubmit}>
                <FormControl id="title" isRequired>
                    <FormLabel>Title</FormLabel>
                    <Input name="title" type="text" onChange={handleChange} />
                </FormControl>
                <FormControl id="description" isRequired mt={4}>
                    <FormLabel>Description</FormLabel>
                    <Textarea name="description" onChange={handleChange} />
                </FormControl>
                {/* Add other form controls */}
                <Button mt={4} colorScheme="blue" type="submit">Post Job</Button>
            </form>
        </Box>
    );
};

export default JobPostingForm;
