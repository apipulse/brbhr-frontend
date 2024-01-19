import React, { useState } from 'react';
import { Box, FormControl, FormLabel, Input, Button } from '@chakra-ui/react';

const AddEmployee = () => {
    const [employee, setEmployee] = useState({
        name: '',
        email: '',
        position: '',
        // Add other relevant fields
    });

    const handleChange = (e) => {
        setEmployee({ ...employee, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Logic to send data to the backend
        console.log(employee);
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
                    <Input name="email" type="email" onChange={handleChange} />
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
