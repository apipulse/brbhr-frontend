// import React, { useState, useEffect } from 'react';
// import { Box, VStack, Text, Divider } from '@chakra-ui/react';
// import { getAllCandidateApplications } from '../../services/CandidateService';

// const AllApplicationsList = () => {
//     const [applications, setApplications] = useState([]);

// useEffect(() => {
//     const fetchApplications = async () => {
//         try {
//             const data = await getAllCandidateApplications();
//             setApplications(data);
//         } catch (error) {
//             console.error('Error fetching applications:', error);
//         }
//     };

//     fetchApplications();
// }, []);

//     return (
//         <VStack spacing={4} p={4}>
//             {applications.map(application => (
//                 <Box key={application.id} p={4} shadow="md" borderWidth="1px">
//                     <Text fontWeight="bold">{application.applicantName}</Text>
//                     <Text>Email: {application.applicantEmail}</Text>
//                     {/* Display other relevant application details */}
//                     <Divider my={2} />
//                     {/* You can add more details or action buttons */}
//                 </Box>
//             ))}
//         </VStack>
//     );
// };

// export default AllApplicationsList;

import React, { useState, useEffect } from "react";
import { getAllCandidateApplications } from "../../services/CandidateService";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  VStack,
  Text,
} from "@chakra-ui/react";

const AllApplicationsList = () => {
  const [allCandidates, setAllCandidates] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const data = await getAllCandidateApplications();
        setAllCandidates(data);
      } catch (error) {
        console.error("Error fetching applications:", error);
      }
    };

    fetchApplications();
  }, []);

  return (
    <VStack spacing={4}>
      <Text fontSize={"2rem"} textAlign={"left"}>
        All Applications
      </Text>
      <Table variant="striped" colorScheme="teal">
        <Thead>
          <Tr>
            <Th>candidate</Th>
            <Th>Email</Th>
            <Th>Contact</Th>
            <Th>Postion</Th>
          </Tr>
        </Thead>
        <Tbody>
          {allCandidates.map((candidate) => (
            <Tr key={candidate.id}>
              <Td>
                {candidate.applicantName
                  ? candidate.applicantName
                  : "Not Entered"}
              </Td>
              <Td>{candidate.applicantEmail}</Td>
              <Td>
                {candidate.mobileNumber
                  ? candidate.mobileNumber
                  : "Not Entered"}
              </Td>
              <Td>{candidate.country}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </VStack>
  );
};

export default AllApplicationsList;
