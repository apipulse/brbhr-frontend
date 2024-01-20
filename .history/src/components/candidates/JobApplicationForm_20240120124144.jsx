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
                {/* Form fields for application details */}
                {/* Example: Name, Email, Resume Link, Cover Letter, etc. */}
                <FormControl id="applicantName" isRequired mt={4}>
                    <FormLabel>Applicant Name</FormLabel>
                    <Input name="applicantName" type="text" onChange={handleChange} />
                </FormControl>
                {/* Repeat this pattern for each field */}
                <Button mt={4} colorScheme="blue" type="submit">Submit Application</Button>
            </form>
        </Box>
    );
};

export default JobApplicationForm;
