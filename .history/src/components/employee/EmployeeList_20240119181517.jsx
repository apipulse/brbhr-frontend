import React, { useState, useEffect } from 'react';
import { getEmployees } from '../../services/EmployeeService';
import { Box, Flex, Text, useMediaQuery } from '@chakra-ui/react';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [isLargerThan768] = useMediaQuery('(min-width: 768px)');

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
        <Flex direction="column" align="center" minHeight={isLargerThan768 ? "100vh" : "auto"}>
            <Box width={isLargerThan768 ? "80%" : "90%"} p={4}>
                {employees.map(employee => (
                    <Box key={employee.id} shadow="md" borderWidth="1px" p={4} mb={4}>
                        <Text fontSize="lg">{employee.name}</Text>
                        {/* Display other employee details */}
                    </Box>
                ))}
            </Box>
        </Flex>
    );
};

export default EmployeeList;
