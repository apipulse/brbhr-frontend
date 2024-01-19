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
        <Link as={RouterLink} to="/leaves">
          View Leaves
        </Link>
        <Link as={RouterLink} to="/add-leave">
          Add Leaves
        </Link>
        {/* Add more links as needed */}
      </VStack>
    </Box>
  );
};

export default Sidebar;
