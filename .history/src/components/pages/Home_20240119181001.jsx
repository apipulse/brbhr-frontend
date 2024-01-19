import React from 'react';
import { Box, Text, Flex, Heading } from '@chakra-ui/react';

const Home = () => {
    return (
        <Flex direction="column" minHeight="100vh" justify="center" align="center">
            <Box textAlign="center" p={4} flexGrow={1}>
                <Heading as="h1" size="xl" mb={6}>
                    Welcome to brbhr-front-end
                </Heading>
                <Text fontSize="lg">
                    Your comprehensive HR Management Solution
                </Text>
                {/* Additional content and widgets can be added here */}
            </Box>
        </Flex>
    );
};

export default Home;
