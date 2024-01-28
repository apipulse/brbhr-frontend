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
import { getAllHiredCandidates } from "../../services/onboardingService";
const candidateView = () => {
  const [hiredCandidates, setHiredCandidates] = useState([]);

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
  console.log(hiredCandidates);
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

        <Box className="changeDir" display={"flex"} gap={"2"} alignItems={"center"}>
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
            // onClick={() => handleNewApplicationClick()}
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
              <Th>Job position</Th>
              <Th>Contact</Th>
              <Th>Stage</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {hiredCandidates?.map((candidate) =>
              (candidate.country === jobName &&
                // candidate.appliedToJobId === jobid
                candidate.currentRecruitmentStage == null) ||
              candidate.currentRecruitmentStage == "" ? (
                <Tr key={Math.random()}>
                  <Td>{candidate.applicantName} </Td>
                  <Td>{candidate.applicantEmail}</Td>
                  <Td>{candidate.country}</Td>
                  <Td>{candidate.mobileNumber}</Td>
                  <Td>
                    <Select
                      onChange={(e) => {
                        updateApplicationStage(candidate.id, e.target.value);
                      }}
                    >
                      {stages &&
                        stages?.map((stage) => {
                          return (
                            <option key={Math.random()} value={stage.name}>
                              {stage.name}
                            </option>
                          );
                        })}
                    </Select>
                  </Td>
                  <Td>
                    <MdOutlineMailOutline
                      onClick={() =>
                        handleSendMailClick(candidate.applicantEmail)
                      }
                      cursor={"pointer"}
                    />
                  </Td>
                </Tr>
              ) : (
                ""
              )
            )}
          </Tbody>
        </Table>
      </Box>
    </VStack>
  );
};

export default candidateView;
