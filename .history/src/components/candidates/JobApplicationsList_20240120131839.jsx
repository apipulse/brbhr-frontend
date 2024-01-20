import React, { useState, useEffect } from 'react';
import { getCandidateApplications } from '../../services/CandidateService';
import { Box, VStack, Text } from '@chakra-ui/react';

const JobApplicationsList = ({ applicantEmail }) => {
    const [applications, setApplications] = useState([]);

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const data = await getCandidateApplications(applicantEmail);
                setApplications(data);
            } catch (error) {
                console.error('Error fetching applications:', error);
            }
        };

        fetchApplications();
    }, [candidateId]);

    return (
        <VStack spacing={4}>
            {applications.map(application => (
                <Box key={application.id} p={4} shadow="md" borderWidth="1px">
                    <Text>{`Position: ${application.position}`}</Text>
                    {/* Display other application details */}
                </Box>
            ))}
        </VStack>
    );
};

export default JobApplicationsList;
