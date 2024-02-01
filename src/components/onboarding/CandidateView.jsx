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

import { getAllJobPostings } from "../../services/CandidateService";

const candidateView = () => {
  const [hiredCandidates, setHiredCandidates] = useState([]);
  const [selectedCandidates, setSelectedCandidates] = useState([]);
  const [allCandidatesSelected, setAllCandidatesSelected] = useState(false);
  const [searchQuery, setSearchQuery] = useState();
  const [jobPostings, setJobPostings] = useState([]);

  const filteredApplications = hiredCandidates?.filter((candidate) => {
    return candidate?.applicantName
      ?.toLowerCase()
      ?.includes(searchQuery?.toLowerCase());
  });

  const triggerBoarding = async () => {
    try {
      const hiredCandidats = await triggerOnboarding(
        getSelectedCandidateObjects(),
        getSelectedCandidateObjects()[0]?.appliedToJobId
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
    const fetchJobPostings = async () => {
      try {
        const postings = await getAllJobPostings();
        setJobPostings(postings);
      } catch (error) {
        console.error("Error fetching job postings:", error);
      }
    };
    fetchJobPostings();
    fetchHiredCandidates();
  }, []);
  const handleCandidateSelection = (candidateId) => {
    if (selectedCandidates.includes(candidateId)) {
      // Deselect
      setSelectedCandidates(
        selectedCandidates.filter((id) => id !== candidateId)
      );
    } else {
      // Select
      setSelectedCandidates([...selectedCandidates, candidateId]);
    }
  };
  const getSelectedCandidateObjects = () => {
    return selectedCandidates.map((id) =>
      hiredCandidates.find((candidate) => candidate.id === id)
    );
  };
  console.log(
    getSelectedCandidateObjects(),
    getSelectedCandidateObjects()[0]?.appliedToJobId
  );

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
          </Box>
        </Box>
      </Box>
      <Box w={"100%"} overflow={"scroll"} border={"1px solid lightgray"}>
        {!searchQuery ? (
          <Table minW={"max-content"} variant="simple">
            <Thead>
              <Tr>
                <Th>
                  <input
                    type="checkbox"
                    checked={allCandidatesSelected}
                    onChange={() =>
                      setAllCandidatesSelected(!allCandidatesSelected)
                    }
                  />
                </Th>
                <Th>candidate</Th>
                <Th>Email</Th>
                <Th>Date of joining</Th>
                <Th>Job position</Th>
                <Th>Recruitment</Th>
                <Th>Contact</Th>
              </Tr>
            </Thead>
            <Tbody>
              {hiredCandidates?.map((candidate) => (
                <Tr key={Math.random()}>
                  <Td>
                    <input
                      type="checkbox"
                      checked={
                        allCandidatesSelected ||
                        selectedCandidates.includes(candidate.id)
                      }
                      onChange={() => {
                        if (allCandidatesSelected) {
                          setSelectedCandidates(
                            selectedCandidates.filter(
                              (id) => id !== candidate.id
                            )
                          );
                        } else {
                          handleCandidateSelection(candidate.id);
                        }
                      }}
                    />
                  </Td>
                  <Td>{candidate.applicantName} </Td>
                  <Td>{candidate.applicantEmail}</Td>
                  <Td>None</Td>
                  <Td>
                    {
                      jobPostings.find(
                        (job) => job.id === candidate.appliedToJobId
                      )?.title
                    }
                  </Td>
                  <Td>
                    {
                      jobPostings.find(
                        (job) => job.id === candidate.appliedToJobId
                      )?.title
                    }{" "}
                    {new Date(
                      jobPostings?.find(
                        (job) => job?.id === candidate?.appliedToJobId
                      )?.postingDate
                    ).toLocaleDateString()}
                  </Td>
                  <Td>{candidate.mobileNumber}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        ) : (
          <Table minW={"max-content"} variant="simple">
            <Thead>
              <Tr>
                <Th>
                  <input
                    type="checkbox"
                    checked={allCandidatesSelected}
                    onChange={() =>
                      setAllCandidatesSelected(!allCandidatesSelected)
                    }
                  />
                </Th>
                <Th>candidate</Th>
                <Th>Email</Th>
                <Th>Date of joining</Th>
                <Th>Job position</Th>
                <Th>Recruitment</Th>
                <Th>Contact</Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredApplications?.map((candidate) => (
                <Tr key={Math.random()}>
                  <Td>
                    <input
                      type="checkbox"
                      checked={
                        allCandidatesSelected ||
                        selectedCandidates.includes(candidate.id)
                      }
                      onChange={() => {
                        if (allCandidatesSelected) {
                          setSelectedCandidates(
                            selectedCandidates.filter(
                              (id) => id !== candidate.id
                            )
                          );
                        } else {
                          handleCandidateSelection(candidate.id);
                        }
                      }}
                    />
                  </Td>
                  <Td>{candidate.applicantName} </Td>
                  <Td>{candidate.applicantEmail}</Td>
                  <Td>None</Td>
                  <Td>
                    {
                      jobPostings.find(
                        (job) => job.id === candidate.appliedToJobId
                      )?.title
                    }
                  </Td>
                  <Td>
                    {
                      jobPostings.find(
                        (job) => job.id === candidate.appliedToJobId
                      )?.title
                    }{" "}
                    {new Date(
                      jobPostings?.find(
                        (job) => job?.id === candidate?.appliedToJobId
                      )?.postingDate
                    ).toLocaleDateString()}
                  </Td>
                  <Td>{candidate.mobileNumber}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        )}
      </Box>
    </VStack>
  );
};

export default candidateView;
