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
} from "@chakra-ui/react";
import {
  getAllJobPostings,
  getAllCandidateApplications,
  getStagesForJobPosting,
  getCurrentStageOfApplication,
  updateCandidateStage,
} from "../../services/CandidateService";
import NoteContext from "../../Context/NoteContext";

import { MdOutlineMailOutline } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import StageForm from "./StageForm";
import SendEmail from "./SendEmail";
import ApplicationForm from "./JobPostingForm";
const JobPostingsList = () => {
  const [stages, setStages] = useState();
  const [jobPostings, setJobPostings] = useState([]);
  const [allCandidates, setAllCandidates] = useState();
  const [selectedJobPostingId, setSelectedJobPostingId] = useState(null);
  const [selectedEMail, setSelectedEMail] = useState(null);
  const [jobid, setJobId] = useState();
  const [jobName, setjobName] = useState();
  const [active, setActive] = useState();
  const [stg, setstg] = useState();
  const [candidateId, setcandidateId] = useState();

  const [currentStage, setCurrentStage] = useState();
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
    isOpen: isOpen3,
    onOpen: onOpen3,
    onClose: onClose3,
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
  const handleNewApplicationClick = () => {
    console.log("Opening modal for New job posting");
    onOpen3();
  };

  const fetchJonpostingStages = async (id) => {
    const res = await getStagesForJobPosting(id);
    setStages(res);
  };

  const fetchCurrentStage = async (id) => {
    try {
      const res = await getCurrentStageOfApplication(id);
      setCurrentStage(res);
      console.log(id);
      console.log(res);
    } catch (error) {
      console.log("failed to fetch current stage of", id, "due to", error);
    }
  };

  const updateApplicationStage = (id, stage) => {
    try {
      const res = updateCandidateStage(id, stage);
      console.log("ApplicationStage has been updated", res);
    } catch (error) {
      "Failed to update stage of application", error;
    }
  };

  console.log(allCandidates);

  useEffect(() => {
    abc.setName("RECRUITMENT");

    // setJobId(job.id);
    // setjobName(job?.title);
    fetchCurrentStage(jobid);

    const fetchJobPostings = async () => {
      try {
        const postings = await getAllJobPostings();
        setJobPostings(postings);
      } catch (error) {
        console.error("Error fetching job postings:", error);
      }
    };

    const fetchCandidates = async () => {
      try {
        const Allcandidates = await getAllCandidateApplications();
        setAllCandidates(Allcandidates);
      } catch (error) {
        console.error("Error fetching job postings:", error);
      }
      ``;
    };
    // console.log(allCandidates)

    fetchJonpostingStages(jobid);
    fetchJobPostings();
    fetchCandidates();
  }, []);
  console.log(jobPostings);

  console.log(stages);

  return (
    <VStack textAlign={"left"} spacing={4} py={4} className="setPX" px={6}>
      {/* BOX */}
      <Box
        className="changeDir gap "
        mb={"1rem"}
        display={"flex"}
        w={"100%"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Text fontWeight={"bold"} fontSize={"1.2rem"}>
          Recruitment
        </Text>

        <Box display={"flex"} gap={"2"} alignItems={"center"}>
          <Input type="text" placeholder="search" borderRadius={"0"} />

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
            + Recriutment
          </Button>
        </Box>
      </Box>
      {/* ... (other JSX code) */}
      <Box
        className="overflow w-100vw"
        w={"100%"}
        maxWidth={"100%"}
        border={".2px solid lightgray"}
      >
        <Box className="w-50" spacing={4}>
          <Box display={"flex"} shadow={"sm"} minWidth={"100%"} mb={3}>
            {/* ********************************************************************* */}
            {/* ********************************************************************* */}
            {/* ********************************************************************* */}
            {jobPostings?.map((job) => {
              return (
                <Box key={job.id} width={"100%"}>
                  <Box
                    onClick={() => {
                      setJobId(job.id);
                      setjobName(job?.title);
                      fetchJonpostingStages(job.id);
                    }}
                    cursor={"pointer"}
                    display={"flex"}
                    width={"100%"}
                    flex={1}
                    px={"5%"}
                    boxShadow={"sm"}
                    py={1}
                    _hover={{ bg: "rgb(250, 247, 247)" }}
                    bg={"white"}
                    borderRight={"1px solid lightgray"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                  >
                    <Text fontWeight={"600"}>{job?.title}</Text>
                    {new Date(job?.postingDate).toLocaleDateString()}
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
                        allCandidates?.filter(
                          (candidate) => candidate.country === job.title
                        ).length
                      }
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
              + Add Stage
            </Button>
            {/* STAGE //****************************************/}

            {stages ? (
              stages?.map((stage) => {
                return (
                  <Box
                    key={Math.random()}
                    width={"100%"}
                    mb={3}
                    border={"1px solid lightgray"}
                    justifyContent={"space-between"}
                  >
                    {/* ****    STAGE HEADING    */}
                    <Box
                      display={"flex"}
                      borderBottom={"1px solid lightgray"}
                      py={1}
                      justifyContent={"space-between"}
                      px={4}
                      w={"100%"}
                    >
                      <Box display={"flex"} alignItems={"center"} gap={2}>
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
                          3
                        </Text>{" "}
                        <Text fontSize={"1rem"} fontWeight={"bold"}>
                          {stage.name}
                        </Text>
                      </Box>
                      <Box display={"flex"} gap={2} alignItems={"center"}>
                        <Button
                          bg={"transparent"}
                          color={"red"}
                          fontSize={"22px"}
                          outline={"none"}
                          border={"1px solid red"}
                        >
                          +
                        </Button>
                        <BsThreeDotsVertical
                          cursor={"pointer"}
                          bg="blue"
                          width={"10px"}
                          height={"10px"}
                        />
                      </Box>
                    </Box>
                    {/* ****    STAGE BODY    */}
                    <Box>
                      <Table variant="striped" colorScheme="teal">
                        <Thead>
                          <Tr>
                            <Th>candidate</Th>
                            <Th>Email</Th>
                            <Th>Job position</Th>
                            <Th>Contact</Th>
                            <Th>stage</Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          {allCandidates?.map((candidate) =>
                            candidate.country === jobName ? (
                              <Tr key={candidate.id}>
                                <Td>{candidate.applicantName}</Td>
                                <Td>{candidate.applicantEmail}</Td>
                                <Td>{candidate.country}</Td>
                                <Td>{candidate.mobileNumber}</Td>
                                <Td>
                                  <Select
                                    onChange={(e) => { updateApplicationStage(candidate.id,e.target.value)
                                      console.log(e.target.value)}}
                                  >
                                    {stages?.map((stage) => {
                                      return (
                                        <option
                                          key={Math.random()}
                                          value={stage.name}
                                        >
                                          {stage.name}
                                        </option>
                                      );
                                    })}
                                  </Select>
                                </Td>
                                <Td>
                                  <MdOutlineMailOutline
                                    onClick={() =>
                                      handleSendMailClick(
                                        candidate.applicantEmail
                                      )
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
                  </Box>
                );
              })
            ) : (
              <Box>
                <Table variant="striped" colorScheme="teal">
                  <Thead>
                    <Tr>
                      <Th>candidate</Th>
                      <Th>Email</Th>
                      <Th>Job position</Th>
                      <Th>Contact</Th>
                      <Th>stage</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {allCandidates?.map((candidate) =>
                      candidate.country === jobName ? (
                        <Tr key={Math.random()}>
                          <Td>{candidate.applicantName} </Td>
                          <Td>{candidate.applicantEmail}</Td>
                          <Td>{candidate.country}</Td>
                          <Td>{candidate.mobileNumber}</Td>
                          <Td>
                            <Select
                            // onChange={ChangeStage()}
                            >
                              {stages &&
                                stages?.map((stage) => {
                                  return (
                                    <option
                                      key={Math.random()}
                                      value={stage.name}
                                    >
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
            )}
          </Box>
        </Box>
      </Box>
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
      <Modal isOpen={isOpen3} onClose={onClose3}>
        <ModalOverlay />
        <ModalContent>
          {/* <ModalHeader>New-Job Post</ModalHeader> */}
          <ModalCloseButton />
          <ModalBody>
            <ApplicationForm onStageAdded={onClose3} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </VStack>
  );
};
export default JobPostingsList;
