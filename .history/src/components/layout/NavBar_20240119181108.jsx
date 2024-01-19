import { Box, Flex, Link, Heading, Spacer, useMediaQuery } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const NavBar = () => {
  const [isLargerThan768] = useMediaQuery('(min-width: 768px)');

  return (
    <Flex
      bg="blue.500"
      p="4"
      color="white"
      direction={isLargerThan768 ? 'row' : 'column'}
      align="center"
    >
      <Box>
        <Heading size="md">brbhr-front-end</Heading>
      </Box>
      <Spacer />
      <Box mt={!isLargerThan768 ? 4 : 0}>
        <Link as={RouterLink} to="/employees" mx="4">View Employees</Link>
        <Link as={RouterLink} to="/add-employee">Add Employee</Link>
        {/* Add more links as needed */}
      </Box>
    </Flex>
  );
};

export default NavBar;
