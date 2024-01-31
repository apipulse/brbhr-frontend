import {
  Box,
  Input,
  Button,
  Table,
  Thead,
  TabList,
  Tbody,
  Tr,
  Th,
  Td,
  Select,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import {
  getAllHiredCandidates,
  triggerOnboarding,
} from "../../services/onboardingService";

const candidateView = () => {
  const [hiredCandidates, setHiredCandidates] = useState([]);

  const triggerBoarding = async () => {
    console.log(hiredCandidates, hiredCandidates[0].appliedToJobId);
    try {
      const hiredCandidats = await triggerOnboarding(
        hiredCandidates,
        hiredCandidates[0].appliedToJobId
      );
      console.log("OnBorading has been triggered", hiredCandidats);
    } catch (error) {
      console.error("Error fetching Hired candidates:", error);
    }
  };

  useEffect(() => {
    const fetchHiredCandidates = async () => {
      try {
        const hiredCandidates = await getAllHiredCandidates();
        setHiredCandidates(hiredCandidates);
        console.log(hiredCandidates);
      } catch (error) {
        console.error("Error fetching Hired candidates:", error);
      }
    };
    fetchHiredCandidates();
  }, []);
  return (
    <VStack p={4} minH={"100vh"} className="w-100vw">
      <Box
        className="changeDir gap "
        display={"flex"}
        my={4}
        w={"100%"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Text fontWeight={"600"} fontSize={"1.5rem"}>
          OnBoarding
        </Text>

        <Box
          className="changeDir"
          display={"flex"}
          gap={"2"}
          alignItems={"center"}
        >
          <Input
            type="text"
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="search"
            borderRadius={"0"}
          />
          <Box display={"flex"} gap={"2"} alignItems={"center"}>
            <Button
              // width={'100%'}
              className="btn"
              borderRadius={0}
              fontSize={"14px"}
              border={"none"}
              outline={"none"}
              colorScheme="blue"
              minWidth={"max-content"}
              onClick={() => triggerBoarding()}
            >
              + Trigger Onboarding
            </Button>

            <Button
              // width={'100%'}
              className="btn"
              borderRadius={0}
              fontSize={"14px"}
              border={"none"}
              outline={"none"}
              colorScheme="red"
              minWidth={"max-content"}
              onClick={() => handleNewApplicationClick()}
            >
              + Create
            </Button>
          </Box>
        </Box>
      </Box>

      <Box w={"100%"} overflow={"scroll"} border={"1px solid lightgray"}>
        <Table minW={"max-content"} variant="simple">
          <Thead>
            <Tr>
              <Th>Candidate</Th>
              <Th>Email</Th>
              <Th>Date of joining</Th>
              <Th>Job position</Th>
              <Th>Recruitment</Th>
            </Tr>
          </Thead>
          <Tbody>
            {hiredCandidates?.map((candidate) => (
              <Tr key={Math.random()}>
                <Td>{candidate.applicantName} </Td>
                <Td>{candidate.applicantEmail}</Td>
                <Td>{candidate.appliedToJobId}</Td>
                <Td>{candidate.mobileNumber}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </VStack>
  );
};

export default candidateView;
