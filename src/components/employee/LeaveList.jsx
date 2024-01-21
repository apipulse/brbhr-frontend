import React, { useState, useEffect } from 'react';
import { getLeavesByEmployee } from '../../services/LeaveService';
import { Box, VStack, Text } from '@chakra-ui/react';

const LeaveList = ({ employeeId }) => {
    const [leaves, setLeaves] = useState([]);

    useEffect(() => { 
        const fetchLeaves = async () => {
            try {
                const data = await getLeavesByEmployee(employeeId);
                setLeaves(data);
            } catch (error) {
                console.error('Error fetching leaves:', error);
            }
        };

        fetchLeaves();
    }, [employeeId]);

    return (
        <VStack spacing={4}>
            {leaves.map(leave => (
                <Box key={leave.id} p={4} shadow="md" borderWidth="1px">
                    <Text>{`Type: ${leave.type}, Status: ${leave.status}`}</Text>
                    {/* Display other leave details */}
                </Box>
            ))}
        </VStack>
    );
};

export default LeaveList;
