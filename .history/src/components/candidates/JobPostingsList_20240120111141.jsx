import React, { useState, useEffect } from 'react';
import { Box, VStack, Text, Divider } from '@chakra-ui/react';
import { getAllJobPostings } from '../../services/CandidateService';

const JobPostingsList = () => {
    const [jobPostings, setJobPostings] = useState([]);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectedJobPostingId, setSelectedJobPostingId] = useState(null);


    useEffect(() => {
        const fetchJobPostings = async () => {
            try {
                const postings = await getAllJobPostings();
                setJobPostings(postings);
            } catch (error) {
                console.error('Error fetching job postings:', error);
            }
        };

        fetchJobPostings();
    }, []);

    const handleAddStageClick = (jobPostingId) => {
        setSelectedJobPostingId(jobPostingId);
        onOpen();
    };
    

    return (
        <VStack spacing={4} p={4}>
            {jobPostings.map(posting => (
                <Box key={posting.id} p={4} shadow="md" borderWidth="1px">
                    <Text fontWeight="bold">{posting.title}</Text>
                    <Text mt={2}>{posting.description}</Text>
                    {/* Display other job posting details */}
                    <Divider my={2} />
                    <Text>Position: {posting.jobPosition}</Text>
                    <Text>Manager: {posting.recruitingManager}</Text>
                    <Text>Vacancies: {posting.vacancy}</Text>
                    <Button colorScheme="blue" onClick={() => handleAddStageClick(posting.id)}>+ Add Stage</Button>
                    <Modal isOpen={isOpen} onClose={onClose}>
                <StageForm jobPostingId={selectedJobPostingId} onStageAdded={onClose} />
            </Modal>
                </Box>
            ))}
        </VStack>
    );
};

export default JobPostingsList;
