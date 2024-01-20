import React, { useState, useEffect } from 'react';
import { Box, VStack, Text, Divider, Button, Modal, useDisclosure,ModalOverlay } from '@chakra-ui/react';
import { getAllJobPostings } from '../../services/CandidateService';
import StageForm from './StageForm'; // Ensure this import is correct

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
        console.log("Opening modal for job posting ID:", jobPostingId);
        setSelectedJobPostingId(jobPostingId);
        onOpen();
    };

    return (
        <VStack spacing={4} p={4}>
            {jobPostings.map(posting => (
                <Box key={posting.id} p={4} shadow="md" borderWidth="1px">
                    <Text fontWeight="bold">{posting.title}</Text>
                    {/* Other job posting details */}
                    <Divider my={2} />
                    {/* Displaying additional details */}
                    <Button colorScheme="blue" onClick={() => handleAddStageClick(posting.id)}>+ Add Stage</Button>
                </Box>
            ))}
            <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
        <ModalHeader>Add Stage</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
            <StageForm jobPostingId={selectedJobPostingId} onStageAdded={onClose} />
        </ModalBody>
    </ModalContent>
</Modal>

        </VStack>
    );
};

export default JobPostingsList;
