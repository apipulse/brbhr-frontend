import React, { useState, useEffect,useContext } from "react";
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
import NoteContext from "../../Context/NoteContext";

import { MdOutlineMailOutline } from "react-icons/md";
const AllApplicationsList = () => {
  const [allCandidates, setAllCandidates] = useState([]);
  const abc = useContext(NoteContext);

  useEffect(() => {
    abc.setName('RECRUITMENT')

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
    <VStack spacing={4} >
      <Text fontSize={"2rem"} w={'100%'} mx={'10px'} textAlign='center' borderBottom={'1px solid gray'}>
        All Applications
      </Text>
      <Box width={'100%'} overflowX={'scroll'}>

     
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
              <Td>
              <MdOutlineMailOutline />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      </Box>
    </VStack>
  );
};

export default AllApplicationsList;
