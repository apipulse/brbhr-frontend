import React, { useState, useEffect } from 'react';
import { Box, VStack, Text, Divider } from '@chakra-ui/react';
import { getAllCandidateApplications } from '../../services/CandidateService';

const AllApplicationsList = () => {
    const [applications, setApplications] = useState([]);

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const data = await getAllCandidateApplications();
                setApplications(data);
            } catch (error) {
                console.error('Error fetching applications:', error);
            }
        };

        fetchApplications();
    }, []);

    return (
        <VStack spacing={4} p={4}>
            {applications.map(application => (
                <Box key={application.id} p={4} shadow="md" borderWidth="1px">
                    <Text fontWeight="bold">{application.applicantName}</Text>
                    <Text>Email: {application.applicantEmail}</Text>
                    {/* Display other relevant application details */}
                    <Divider my={2} />
                    {/* You can add more details or action buttons */}
                </Box>
            ))}
        </VStack>
    );
};

export default AllApplicationsList;
