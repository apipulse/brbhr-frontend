import React from 'react';
import { Box, Text, Center, Heading } from '@chakra-ui/react';

const Home = () => {
    return (
        <Center py={10}>
            <Box textAlign="center">
                <Heading as="h1" size="xl" mb={6}>
                    Welcome to brbhr-front-end
                </Heading>
                <Text fontSize="lg">
                    Your comprehensive HR Management Solution
                </Text>
                {/* Additional content and widgets can be added here */}
            </Box>
        </Center>
    );
};

export default Home;
