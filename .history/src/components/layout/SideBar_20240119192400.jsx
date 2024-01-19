import React from 'react';
import { Box, Link, VStack } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <Box
      bg="blue.500"
      h="100vh" // Set the height to 100% of the viewport height
      w="250px" // Set the width of the sidebar
      color="white"
      p="4"
    >
      <VStack spacing={4} align="stretch">
        <Link as={RouterLink} to="/dashboard">
          Dashboard
        </Link>
        <Link as={RouterLink} to="/employees">
          View Employees
        </Link>
        <Link as={RouterLink} to="/add-employee">
          Add Employee
        </Link>
        {/* Add more links as needed */}
      </VStack>
    </Box>
  );
};

export default Sidebar;
