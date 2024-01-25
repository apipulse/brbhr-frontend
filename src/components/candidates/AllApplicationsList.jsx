import React, { useState, useEffect, useContext } from "react";
import { getAllCandidateApplications } from "../../services/CandidateService";
import {
  Box,
  Table, Modal,
  useDisclosure,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  VStack,
  Text,
} from "@chakra-ui/react";

import NoteContext from "../../Context/NoteContext";
import SendEmail from "./SendEmail";

import { MdOutlineMailOutline } from "react-icons/md";
const AllApplicationsList = () => {
  const [allCandidates, setAllCandidates] = useState([]);
  const [selectedEMail, setSelectedEMail] = useState(null);

  const abc = useContext(NoteContext);
  const {
    isOpen: isOpen2,
    onOpen: onOpen2,
    onClose: onClose2,
  } = useDisclosure();

  const handleSendMailClick = (email) => {
    console.log("Opening modal for Sending Email");
    setSelectedEMail(email);
    onOpen2();
  };
  
  
  useEffect(() => {
    abc.setName("RECRUITMENT");

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
      <Text
        fontSize={"2rem"}
        w={"100%"}
        mx={"10px"}
        textAlign="left" fontWeight={'600'} px={4}
      >
        All Applications
      </Text>
      <Box width={"100%"} overflowX={"scroll"}>
        <Table variant="simple" colorScheme="red">
          <Thead>
            <Tr>
              <Th>candidate</Th>
              <Th>Email</Th>
              <Th>Contact</Th>
              <Th>Postion</Th>
              <Th>Actions</Th>
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
                  <MdOutlineMailOutline
                    onClick={() =>
                      handleSendMailClick(candidate.applicantEmail)
                    }
                    cursor={"pointer"}
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
      <Modal isOpen={isOpen2} onClose={onClose2}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Send Message</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <SendEmail EMailId={selectedEMail} onStageAdded={onClose2} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </VStack>
  );
};

export default AllApplicationsList;
