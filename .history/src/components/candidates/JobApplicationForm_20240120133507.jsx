import React, { useState } from 'react';
import { Box, FormControl, FormLabel, Input, Button, Textarea } from '@chakra-ui/react';
import { applyForJob } from '../../services/CandidateService';

const JobApplicationForm = () => {
    const [application, setApplication] = useState({
        applicantName: '',
        applicantEmail: '',
        resume: '', // Assuming a URL or base64 string
        coverLetter: '',
        address: '',
        pincode: '',
        nationality: '',
        mobileNumber: '',
        countryCode: '',
        visaStatus: '',
        country: ''
        // Add other fields as necessary
    });

    const handleChange = (e) => {
        setApplication({ ...application, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await applyForJob(application);
            console.log('Application Submitted:', response);
            // Handle success (e.g., clear form, show success message)
        } catch (error) {
            console.error('Error applying for job:', error);
            // Handle error (e.g., show error message)
        }
    };

    return (
        <Box p={4}>
        <form onSubmit={handleSubmit}>
            {/* Existing Form Fields */}
            {/* New Fields: */}
            <FormControl id="applicantEmail" isRequired mt={4}>
                <FormLabel>Applicant Email</FormLabel>
                <Input name="applicantEmail" type="email" onChange={handleChange} />
            </FormControl>
            <FormControl id="resume" mt={4}>
                <FormLabel>Resume</FormLabel>
                <Input name="resume" type="text" onChange={handleChange} />
            </FormControl>
            <FormControl id="coverLetter" mt={4}>
                <FormLabel>Cover Letter</FormLabel>
                <Textarea name="coverLetter" onChange={handleChange} />
            </FormControl>
            <FormControl id="address" mt={4}>
                <FormLabel>Address</FormLabel>
                <Input name="address" type="text" onChange={handleChange} />
            </FormControl>
            {/* Continue adding FormControl components for each field */}
            <FormControl id="pincode" mt={4}>
                <FormLabel>Pincode</FormLabel>
                <Input name="pincode" type="text" onChange={handleChange} />
            </FormControl>
            <FormControl id="nationality" mt={4}>
                <FormLabel>Pincode</FormLabel>
                <Input name="pincode" type="text" onChange={handleChange} />
            </FormControl>
            <FormControl id="pincode" mt={4}>
                <FormLabel>Pincode</FormLabel>
                <Input name="pincode" type="text" onChange={handleChange} />
            </FormControl>
            <FormControl id="pincode" mt={4}>
                <FormLabel>Pincode</FormLabel>
                <Input name="pincode" type="text" onChange={handleChange} />
            </FormControl>
           
            <Button mt={4} colorScheme="blue" type="submit">Submit Application</Button>
        </form>
    </Box>
    );
};

export default JobApplicationForm;
