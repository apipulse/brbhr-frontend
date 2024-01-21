import React, { useState } from 'react';
import { Box, FormControl, FormLabel, Input, Button } from '@chakra-ui/react';
import { addStageToJobPosting } from '../../services/CandidateService'; // Import the service function

const StageForm = ({ jobPostingId, onStageAdded }) => {
    const [stage, setStage] = useState({
        name: '',
        description: '',
        roundNumber: 1
    })

    const handleChange = (e) => {
        setStage({ ...stage, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addStageToJobPosting(jobPostingId, stage);
            console.log("Stage added to job posting.");
            onStageAdded(); // Callback to refresh the list or update UI
        } catch (error) {
            console.error('Error adding stage:', error);
        }
    };

    return (
        <Box p={4}>
            <form onSubmit={handleSubmit}>
                {/* Form fields for stage details */}
                <FormControl id="name" isRequired>
                    <FormLabel>Stage</FormLabel>
                    <Input name="name" type="text" onChange={handleChange} />
                </FormControl>
                <FormControl id="description" mt={4}>
                    <FormLabel>Description</FormLabel>
                    <Input name="description" type="text" onChange={handleChange} />
                </FormControl>
                <FormControl id="roundNumber" mt={4}>
                    <FormLabel>Round Number</FormLabel>
                    <Input name="roundNumber" type="number" min={1} onChange={handleChange} />
                </FormControl>
                <Button mt={4} colorScheme="blue" type="submit">Add Stage</Button>
            </form>
        </Box>
    );
};

export default StageForm;
