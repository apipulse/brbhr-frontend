import React, { useState, useEffect } from 'react';
import { getEmployees } from '.../EmployeeService';
import { Box, VStack, Text } from '@chakra-ui/react';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const data = await getEmployees();
                setEmployees(data);
            } catch (error) {
                console.error('Failed to fetch employees:', error);
            }
        };

        fetchEmployees();
    }, []);

    return (
        <VStack spacing={4}>
            {employees.map(employee => (
                <Box key={employee.id} p={4} shadow="md" borderWidth="1px">
                    <Text>{employee.name}</Text>
                    {/* Display other employee details */}
                </Box>
            ))}
        </VStack>
    );
};

export default EmployeeList;
