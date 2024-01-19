import { Box, Flex, Link, Heading, Spacer } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const NavBar = () => {
  return (
    <Flex bg="blue.500" p="4" color="white">
      <Box>
        <Heading size="md">brbhr-front-end</Heading>
      </Box>
      <Spacer />
      <Box>
        <Link as={RouterLink} to="/employees" mx="4">View Employees</Link>
        <Link as={RouterLink} to="/add-employee">Add Employee</Link>
        {/* Add more links as needed */}
      </Box>
    </Flex>
  );
};

export default NavBar;
