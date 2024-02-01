import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  VStack,
  Text,
  Divider,
  Button,
  Modal,
  useDisclosure,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  flexbox,
  Table,
  Thead,
  TabList,
  Tbody,
  Tr,
  Th,
  Td,
  Select,
  Input,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { getAllJobPostings } from "../../services/CandidateService";
import {
  getAllOnboardingStages,
  updateCandidateStage,
  getHiredCandidates,
} from "../../services/onboardingService";
import NoteContext from "../../Context/NoteContext";

import { GoDash } from "react-icons/go";
import { BsThreeDotsVertical } from "react-icons/bs";
import StageForm from "./StageForm";
import SendEmail from "../candidates/SendEmail";
import JobPostingForm from "../candidates/JobPostingForm";
import JobAplicationForm from "../candidates/JobApplicationForm";
const onBoarding = () => {
  const [stages, setStages] = useState();
  const [jobPostings, setJobPostings] = useState([]);
  const [hiredCandidates, setHiredCandidates] = useState();
  const [selectedJobPostingId, setSelectedJobPostingId] = useState(null);
  const [selectedEMail, setSelectedEMail] = useState(null);
  const [allStages, setAllStages] = useState();
  const [jobid, setJobId] = useState();
  const [active, setactive] = useState();
  const [jobName, setjobName] = useState();
  const [manager, setmanager] = useState();
  const [stg, setstg] = useState(true);
  const [updateCandidate, setUpdateCandidate] = useState(true);
  const [candidateStage, setCandidateStage] = useState();
  const [currentValue, setCurrentValue] = useState();
  const [searchQuery, setSearchQuery] = useState();
  const abc = useContext(NoteContext);
  console.log(stages);

  const {
    isOpen: isOpen1,
    onOpen: onOpen1,
    onClose: onClose1,
  } = useDisclosure();
  const {
    isOpen: isOpen2,
    onOpen: onOpen2,
    onClose: onClose2,
  } = useDisclosure();
  const {
    isOpen: isOpen4,
    onOpen: onOpen4,
    onClose: onClose4,
  } = useDisclosure();
  const {
    isOpen: isOpen5,
    onOpen: onOpen5,
    onClose: onClose5,
  } = useDisclosure();

  const handleAddStageClick = (jobPostingId) => {
    console.log("Opening modal for job posting ID:", jobPostingId);
    setSelectedJobPostingId(jobPostingId);
    onOpen1();
  };
  const handleSendMailClick = (email) => {
    console.log("Opening modal for Sending Email");
    setSelectedEMail(email);
    onOpen2();
  };
  const handleNewJobApplicationClick = () => {
    console.log("Opening modal for New Job Application");
    onOpen5();
  };

  const filteredApplications = hiredCandidates?.filter((candidate) => {
    return candidate?.jobApplication.applicantName
      ?.toLowerCase()
      ?.includes(searchQuery?.toLowerCase());
  });
  console.log(searchQuery);
  console.log(filteredApplications);

  const fetchOnboardingStages = async (id) => {
    try {
      const res = await getAllOnboardingStages(id);
      setStages(res);
      console.log("ONBOARDING STAGES ARE:", res);
    } catch (error) {
      console.error("Error fetching job posting stages for", jobid, error);
    }
  };

  useEffect(() => {
    abc.setName("ONBOARDING");

    const fetchJobPostings = async () => {
      try {
        const postings = await getAllJobPostings();
        setJobPostings(postings);
      } catch (error) {
        console.error("Error fetching job postings:", error);
      }
    };

    fetchJobPostings();
    // fetchJobStages();
  }, [stg]);

  useEffect(() => {
    // Ensure jobid is defined here if needed for fetchOnboardingStages
    const fetchJobStages = async () => {
      try {
        const jobIds = jobPostings.map((job) => job.id);
        const stagesPromises = jobIds.map((id) => getAllOnboardingStages(id));
        const allStages = await Promise.all(stagesPromises);
        setAllStages(
          allStages.reduce(
            (acc, stages, index) => ({
              ...acc,
              [jobPostings[index].title]: stages,
            }),
            {}
          )
        );
      } catch (error) {
        console.error("Error fetching job posting stages:", error);
      }
    };

    fetchJobStages();
  }, [jobPostings]);

  console.log(allStages);

  const updateStage = (candidateId, fromIndex, toIndex) => {
    try {
      const res = updateCandidateStage(
        candidateId,
        fromIndex,
        toIndex,
        jobid,
        ""
      );
      console.log(res);
      setstg(!stg);
    } catch (error) {
      console.error("Failed to update the stage of candidate", error);
    }
  };

  const hiredCandidate = async (Id) => {
    try {
      const res = await getHiredCandidates(Id);
      console.log(res);
      setHiredCandidates(res);
    } catch (error) {
      console.error("Could Not get the hired candidate", error);
    }
  };

  console.log(allStages?.jobName);
  return (
    <VStack
      bgColor={"rgb(250, 247, 247)"}
      minH={"100vh"}
      textAlign={"left"}
      spacing={4}
      py={4}
      className="setPX w-100vw"
      px={6}
    >
      <Box
        className="changeDir gap "
        mb={"1rem"}
        display={"flex"}
        w={"100%"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Text fontWeight={"600"} fontSize={"1.5rem"}>
          OnBoarding
        </Text>

        <Box display={"flex"} gap={"2"} alignItems={"center"}>
          <Input
            bg={"white"}
            type="text"
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="search"
            borderRadius={"0"}
          />
        </Box>
      </Box>
      {/* ... (other JSX code) */}
      {!searchQuery ? (
        <Box bg={"white"} w={"100%"}>
          <Box
            // className="overflow w-100vw"
            overflow={"scroll"}
            w={"100%"}
            maxWidth={"100%"}
            border={".2px solid lightgray"}
          >
            <Box
              overflow={"hidden"}
              minW={"max-content"}
              className="w-50"
              spacing={4}
            >
              <Box
                overflowX={"scroll"}
                display={"flex"}
                minWidth={"max-content"}
                width={"100%"}
                mb={3}
              >
                {/* ********************************************************************* */}
                {jobPostings &&
                  jobPostings?.map((job, index) => {
                    return (
                      <Box key={job.id}  minWidth={"max-content"} width={"100%"}>
                        <Box 
                          onClick={() => {
                            setJobId(job.id);
                            setjobName(job?.title);
                            setactive(job.title);
                            fetchOnboardingStages(job.id);
                            hiredCandidate(job.id);
                          }}
                          cursor={"pointer"}
                          display={"flex"}
                          width={"100%"}
                          minWidth={"max-content"}
                          flex={1}
                          // px={"5%"}
                          py={1}
                          _hover={{ bg: "white" }}
                          bg={
                            active == job.title ? "white" : "rgb(239, 239, 239)"
                          }
                          justifyContent={"space-between"}
                          alignItems={"center"}
                          minH={'100%'}
                          px={1}
                        >
                          <Text fontWeight={"600"}>{job?.title}</Text>
                          <Text fontSize={"12px"}>
                            {new Date(job?.postingDate).toLocaleDateString()}
                          </Text>
                          <Text
                            fontSize={"10px"}
                            borderRadius={"100px"}
                            width={"17px"}
                            height={"17px"}
                            display={"flex"}
                            justifyContent={"center"}
                            alignItems={"center"}
                            textAlign="center"
                            color={"white"}
                            bg={"red"}
                          >
                            {0}
                          </Text>
                        </Box>
                      </Box>
                    );
                  })}
              </Box>
              <Box width={"100%"} px={4}>
                <Button
                  marginBottom={"1rem"}
                  colorScheme="red"
                  borderRadius={"0"}
                  onClick={() => handleAddStageClick(jobid)}
                >
                  + stage
                </Button>
                <Box>
                  {stages &&
                    stages?.map((stage, index) => {
                      return (
                        <Box
                          key={Math.random()}
                          width={"100%"}
                          // overflow={'hidden'}
                          mb={3}
                          border={"1px solid lightgray"}
                          justifyContent={"space-between"}
                        >
                          <Box
                            display={"flex"}
                            borderBottom={"1px solid lightgray"}
                            py={1}
                            justifyContent={"space-between"}
                            px={4}
                            w={"100%"}
                          >
                            <Box display={"flex"} alignItems={"center"} gap={2}>
                              <GoDash fontSize={"1.2rem"} fontWeight={"bold"} />
                              <Text
                                fontSize={"10px"}
                                borderRadius={"100px"}
                                width={"17px"}
                                height={"17px"}
                                display={"flex"}
                                justifyContent={"center"}
                                alignItems={"center"}
                                textAlign="center"
                                color={"white"}
                                bg={"red"}
                              >
                                {
                                  hiredCandidates?.filter(
                                    (candidate) =>
                                      candidate.jobApplication
                                        .appliedToJobId === jobid &&
                                      stage.candidateIdVsManager.hasOwnProperty(
                                        candidate.id
                                      )
                                  ).length
                                }
                              </Text>{" "}
                              <Text fontSize={"1rem"} fontWeight={"bold"}>
                                {stage.name}
                              </Text>
                            </Box>
                            <Box display={"flex"} gap={2} alignItems={"center"}>
                              {/* ********************************************\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\lljnnkeeeeeed*********** */}
                              <BsThreeDotsVertical
                                onClick={() => handleDeleteStage(stage.name)}
                                cursor={"pointer"}
                                bg="blue"
                                width={"10px"}
                                height={"10px"}
                              />
                            </Box>
                          </Box>
                          <Box>
                            <Table variant="simple" colorScheme="red">
                              <Thead>
                                <Tr>
                                  <Th>candidate</Th>
                                  <Th>Email</Th>
                                  <Th>Mobile</Th>
                                  <Th>Joining Date</Th>
                                  <Th>stage</Th>
                                </Tr>
                              </Thead>
                              <Tbody>
                                {hiredCandidates?.map((candidate) =>
                                  candidate.jobApplication.appliedToJobId ===
                                    jobid &&
                                  stage.candidateIdVsManager.hasOwnProperty(
                                    candidate.id
                                  ) ? (
                                    <Tr key={candidate.id}>
                                      <Td>
                                        {candidate.jobApplication.applicantName}
                                      </Td>
                                      <Td>
                                        {
                                          candidate.jobApplication
                                            .applicantEmail
                                        }
                                      </Td>
                                      <Td>
                                        {candidate.jobApplication.mobileNumber}
                                      </Td>
                                      <Td>None</Td>
                                      <Td>
                                        <Select
                                          onChange={(e) => {
                                            updateStage(
                                              candidate.id,
                                              index,
                                              e.target.value
                                            );
                                            console.log(
                                              candidate.id,
                                              index,
                                              e.target.value
                                            );
                                          }}
                                          value={index}
                                        >
                                          {stages?.map((stage, index) => {
                                            return (
                                              <option
                                                key={Math.random()}
                                                value={index}
                                              >
                                                {stage.name}
                                              </option>
                                            );
                                          })}
                                        </Select>
                                      </Td>
                                    </Tr>
                                  ) : (
                                    ""
                                  )
                                )}
                              </Tbody>
                            </Table>
                          </Box>
                        </Box>
                      );
                    })}
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      ) : (
        <Box border={"1px solid lightgray"} w={"100%"} overflowX={"scroll"}>
          <Table bg={"white"} variant="simple">
            <Thead>
              <Tr>
                <Th>Candidate</Th>
                <Th>Email</Th>
                <Th>Contact</Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredApplications &&
                filteredApplications?.map((candidate) => (
                  <Tr key={candidate.id}>
                    <Td>{candidate.jobApplication.applicantName} </Td>
                    <Td>{candidate.jobApplication.applicantEmail}</Td>
                    <Td>{candidate.jobApplication.mobileNumber}</Td>
                  </Tr>
                ))}
            </Tbody>
          </Table>
        </Box>
      )}

      <Modal isOpen={isOpen1} onClose={onClose1}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Stage</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <StageForm
              jobPostingId={selectedJobPostingId}
              onStageAdded={onClose1}
            />
          </ModalBody>
        </ModalContent>
      </Modal>

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
      <Modal isOpen={isOpen4} onClose={onClose4}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Manager Name</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Manager Name</FormLabel>
              <Input
                type="text"
                onChange={(e) => setmanager(e.target.value)}
                onStageAdded={onClose4}
              />
            </FormControl>
            <Button
              onClick={() => onClose4()}
              my={4}
              borderRadius={0}
              colorScheme="red"
            >
              Submit
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Modal isOpen={isOpen5} onClose={onClose5}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Candidate</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <JobAplicationForm jobid={jobid} />
            </FormControl>
          </ModalBody>
        </ModalContent>
      </Modal>
    </VStack>
  );
};
export default onBoarding;
