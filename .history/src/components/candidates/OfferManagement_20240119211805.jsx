import React, { useState } from 'react';
import { Box, FormControl, FormLabel, Input, Button } from '@chakra-ui/react';
import { extendOffer } from '../../services/CandidateService';

const OfferManagement = () => {
    const [offer, setOffer] = useState({
        candidateId: '',
        jobId: '',
        offerDetails: ''
        // Add other fields as necessary
    });

    const handleChange = (e) => {
        setOffer({ ...offer, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await extendOffer(offer);
            console.log('Offer Extended:', response);
            // Handle success (e.g., clear form, display message)
        } catch (error) {
            console.error('Error extending offer:', error);
            // Handle error
        }
    };

    return (
        <Box p={4}>
            <form onSubmit={handleSubmit}>
                {/* Form fields for extending an offer */}
                {/* Example: Candidate ID, Job ID, Offer Details */}
                <FormControl id="candidateId" isRequired>
                    <FormLabel>Candidate ID</FormLabel>
                    <Input name="candidateId" type="text" onChange={handleChange} />
                </FormControl>
                {/* Add other form controls */}
                <Button mt={4} colorScheme="blue" type="submit">Extend Offer</Button>
            </form>
        </Box>
    );
};

export default OfferManagement;
