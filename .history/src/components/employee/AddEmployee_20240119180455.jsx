import React, { useState } from 'react';
import { Box, FormControl, FormLabel, Input, Button } from '@chakra-ui/react';
import { createEmployee } from '../../services/EmployeeService';

const AddEmployee = () => {
    const [employee, setEmployee] = useState({
        name: '',
        emailId: '',
        position: '',
        // Add other relevant fields
    });

    const handleChange = (e) => {
        setEmployee({ ...employee, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Call the service function to create a new employee
            const newEmployee = await createEmployee(employee);
            console.log('Employee added:', newEmployee);
            // Handle post-creation logic (e.g., clear form, display success message)
        } catch (error) {
            console.error('Error creating employee:', error);
            // Handle error (e.g., display error message)
        }
    };

    return (
        <Box p={4}>
            <form onSubmit={handleSubmit}>
                <FormControl id="name" isRequired>
                    <FormLabel>Name</FormLabel>
                    <Input name="name" type="text" onChange={handleChange} />
                </FormControl>
                <FormControl id="email" isRequired mt={4}>
                    <FormLabel>Email</FormLabel>
                    <Input name="emailId" type="email" onChange={handleChange} />
                </FormControl>
                <FormControl id="position" mt={4}>
                    <FormLabel>Position</FormLabel>
                    <Input name="position" type="text" onChange={handleChange} />
                </FormControl>
                {/* Add other form controls as needed */}
                <Button mt={4} colorScheme="blue" type="submit">Add Employee</Button>
            </form>
        </Box>
    );
};

export default AddEmployee;
