import React, { useState } from 'react';
import { Box, FormControl, FormLabel, Input, Button } from '@chakra-ui/react';

const StageForm = ({ jobPostingId, onStageAdded }) => {
    const [stage, setStage] = useState({
        name: '',
        description: '',
        roundNumber: 1
    });

    const handleChange = (e) => {
        setStage({ ...stage, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Logic to submit stage to the backend
        console.log("Submitting Stage:", stage);
        onStageAdded(); // Callback to refresh the job postings list or update UI
    };

    return (
        <Box p={4}>
            <form onSubmit={handleSubmit}>
                <FormControl id="name" isRequired>
                    <FormLabel>Name</FormLabel>
                    <Input name="name" type="text" onChange={handleChange} />
                </FormControl>
                <FormControl id="description" mt={4}>
                    <FormLabel>Description</FormLabel>
                    <Input name="description" type="text" onChange={handleChange} />
                </FormControl>
                <FormControl id="roundNumber" mt={4}>
                    <FormLabel>Round Number</FormLabel>
                    <Input name="roundNumber" type="number" onChange={handleChange} />
                </FormControl>
                <Button mt={4} colorScheme="blue" type="submit">Add Stage</Button>
            </form>
        </Box>
    );
};

export default StageForm;
