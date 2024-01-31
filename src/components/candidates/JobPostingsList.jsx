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
import {
  getAllJobPostings,
  getAllCandidateApplications,
  getStagesForJobPosting,
  getCurrentStageOfApplication,
  updateCandidateStage,
  deleteStageFromJobPosting,
} from "../../services/CandidateService";
import NoteContext from "../../Context/NoteContext";

import { MdOutlineMailOutline } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import StageForm from "./StageForm";
import UpdateStageForm from "./UpdateStageForm";
import SendEmail from "./SendEmail";
import JobPostingForm from "./JobPostingForm";
import JobAplicationForm from "./JobApplicationForm";
const JobPostingsList = () => {
  const [stages, setStages] = useState();
  const [jobPostings, setJobPostings] = useState([]);
  const [allCandidates, setAllCandidates] = useState();
  const [searchQuery, setSearchQuery] = useState();
  const [selectedEMail, setSelectedEMail] = useState(null);
  const [jobid, setJobId] = useState();
  const [active, setactive] = useState();
  const [jobName, setjobName] = useState();
  const [selectedJobPostingId, setSelectedJobPostingId] = useState(null);
  const [manager, setmanager] = useState();

  const [stg, setstg] = useState(true);
  const [updateCandidate, setUpdateCandidate] = useState(true);
  const [candidateStage, setCandidateStage] = useState();
  const [currentValue, setCurrentValue] = useState();
  const [stageInfo, setStageInfo] = useState({
    id: "",
    name: "",
  });
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
  const handleNewApplicationClick = () => {
    console.log("Opening modal for New job posting");
    onOpen3();
  };
  const handleNewJobApplicationClick = () => {
    console.log("Opening modal for New Job Application");
    onOpen5();
  };

  const filteredApplications = allCandidates?.filter((candidate) => {
    return candidate?.applicantName
      ?.toLowerCase()
      ?.includes(searchQuery?.toLowerCase());
  });
  console.log(filteredApplications);
  console.log(stageInfo);
  const updateApplicationStage = (id, stage) => {
    console.log("Opening modal for changing stage of application");
    setStageInfo({ id: id, name: stage });
    onOpen4();
    setCurrentValue(stage);
    fetchJonpostingStages(jobid);
    // try {
    //   const res = updateCandidateStage(id, {
    //     id: "",
    //     name: stage,
    //     description: "Empty",
    //     roundNumber: 2,
    //     manager: "",
    //     recruitmentStageType: "",

    //   });

    //   console.log("ApplicationStage has been updated", res);
    //   console.log(id);
    //   console.log(stage);
    //   setstg(!stg);
    // } catch (error) {
    //   "Failed to update stage of application", error;
    // }
  };

  useEffect(() => {
    abc.setName("RECRUITMENT");
    candidatesWithStages();
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
    };
    fetchJonpostingStages(jobid);
    fetchJobPostings();
    fetchCandidates();
  }, [stg]);

  const fetchJonpostingStages = async (id) => {
    const res = await getStagesForJobPosting(id);
    setStages(res);
  };

  const candidatesWithStages = async () => {
    try {
      const updatedCandidates =
        allCandidates &&
        (await Promise.all(
          allCandidates?.map(async (candidate) => {
            const stage = await getCurrentStageOfApplication(candidate.id);
            setCandidateStage({
              ...candidateStage,
              [candidate.id]: stage.currentRecruitmentStage,
            });
            candidate.currentStage = stage;
            return candidate;
            // console.log(object)
          })
        ));
      setUpdateCandidate(updatedCandidates);
      console.log(updatedCandidates);
      return updatedCandidates;
    } catch (error) {
      // Handle errors gracefully, e.g., display user-friendly error messages
      console.error("Error fetching stages:", error);
      return []; // Return an empty array or handle the error differently
    }
  };
  console.log(searchQuery);
  console.log(allCandidates);
  console.log(candidateStage);
  console.log(manager);
  console.log(updateCandidate);
  console.log(jobPostings);

  const handleDeleteStage = (stageId) => {
    console.log(stageId);
    console.log(jobid);
    try {
      const res = deleteStageFromJobPosting(jobid, stageId);
      console.log("Stage has beeen deleted", res);
    } catch (err) {
      console.log("Could not delete the stage from job posting", err);
    }
  };

  return (
    <VStack
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
        <Text fontWeight={"bold"} fontSize={"1.2rem"}>
          Recruitment
        </Text>

        <Box display={"flex"} gap={"2"} alignItems={"center"}>
          <Input
            type="text"
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="search"
            borderRadius={"0"}
          />

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
      {!searchQuery ? (
        <Box w={"100%"}>
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
                  jobPostings?.map((job) => {
                    return (
                      <Box key={job.id} minWidth={"max-content"} width={"100%"}>
                        <Box
                          onClick={() => {
                            setJobId(job.id);
                            setjobName(job?.title);
                            setactive(job.title);
                            // setstg(!stg)
                            fetchJonpostingStages(job.id);
                          }}
                          cursor={"pointer"}
                          display={"flex"}
                          width={"100%"}
                          minWidth={"max-content"}
                          flex={1}
                          px={"5%"}
                          py={1}
                          _hover={{ bg: "white" }}
                          bg={
                            active == job.title ? "white" : "rgb(239, 239, 239)"
                          }
                          borderRight={"1px solid lightgray"}
                          justifyContent={"space-between"}
                          alignItems={"center"}
                        >
                          <Text fontWeight={"600"}>{job?.title}</Text>
                          <Text fontSize={'12px'}>
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
                            {
                              allCandidates?.filter(
                                (candidate) =>
                                  candidate.appliedToJobId === job.id
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

                {allCandidates?.some(
                  (candidate) =>
                    !candidate.currentRecruitmentStage?.name && candidate.appliedToJobId === jobid
                ) && (
                  <Box shadow={"sm"} mb={4} border={"1px solid lightgray"}>
                    <Table variant="simple">
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
                        {allCandidates?.map((candidate) =>
                          candidate.appliedToJobId === jobid &&
                            candidate.currentRecruitmentStage == null? (
                            <Tr key={Math.random()}>
                              <Td>{candidate.applicantName} </Td>
                              <Td>{candidate.applicantEmail}</Td>
                              <Td>{jobName}</Td>
                              <Td>{candidate.mobileNumber}</Td>
                              <Td>
                                <Select
                                  placeholder="Select"
                                  onChange={(e) => {
                                    updateApplicationStage(
                                      candidate.id,
                                      e.target.value
                                    );
                                  }}
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
                )}

                {stages &&
                  stages?.map((stage) => {
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
                                  (candidate) =>
                                    (candidate.appliedToJobId === jobid &&
                                      candidate.currentRecruitmentStage?.name ==
                                        stage.name)
                                ).length
                              }
                            </Text>{" "}
                            <Text fontSize={"1rem"} fontWeight={"bold"}>
                              {stage.name}
                            </Text>
                          </Box>
                          <Box display={"flex"} gap={2} alignItems={"center"}>
                            {/* ********************************************\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\lljnnkeeeeeed*********** */}

                            <Button
                              bg={"transparent"}
                              color={"red"}
                              fontSize={"22px"}
                              outline={"none"}
                              border={"1px solid red"}
                              onClick={() => handleNewJobApplicationClick()}
                            >
                              +
                            </Button>
                            <BsThreeDotsVertical
                              onClick={() => {
                                handleDeleteStage(stage.id);
                              }}
                              cursor={"pointer"}
                              bg="blue"
                              width={"10px"}
                              height={"10px"}
                            />
                          </Box>
                        </Box>
                        <Box>
                          <Table variant="simple">
                            <Thead>
                              <Tr>
                                <Th>candidate</Th>
                                <Th>Email</Th>
                                <Th>Job position</Th>
                                <Th>Contact</Th>
                                <Th>stage</Th>
                                <Th>Actions</Th>
                              </Tr>
                            </Thead>
                            <Tbody>
                              {allCandidates?.map((candidate) =>
                                (candidate.appliedToJobId === jobid &&
                                  candidate.currentRecruitmentStage?.name ==
                                    stage.name) ? (
                                  <Tr key={candidate.id}>
                                    <Td>{candidate.applicantName}</Td>
                                    <Td>{candidate.applicantEmail}</Td>
                                    <Td>{jobName}</Td>
                                    <Td>{candidate.mobileNumber}</Td>
                                    <Td>
                                      <Select
                                        onChange={(e) => {
                                          updateApplicationStage(
                                            candidate.id,
                                            e.target.value
                                          );
                                          console.log(e.target.value);
                                        }}
                                        value={
                                          candidate.currentRecruitmentStage
                                            ?.name
                                        }
                                        // value={' h'}
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
                  })}
              </Box>
            </Box>
          </Box>
        </Box>
      ) : (
        <Table variant="simple" colorScheme="red">
          <Thead border={"1px solid lightgray"}>
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
            {filteredApplications &&
              filteredApplications?.map((candidate) => (
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
              ))}
          </Tbody>
        </Table>
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
      <Modal isOpen={isOpen3} onClose={onClose3}>
        <ModalOverlay />
        <ModalContent>
          {/* <ModalHeader>New-Job Post</ModalHeader> */}
          <ModalCloseButton />
          <ModalBody>
            <JobPostingForm onStageAdded={onClose3} />
          </ModalBody>
        </ModalContent>
      </Modal>
      <Modal isOpen={isOpen4} onClose={onClose4}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Manager Name</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <UpdateStageForm
              id={stageInfo.id}
              onStageAdded={onClose4}
              stageName={stageInfo.name}
            />
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
export default JobPostingsList;

{
  // import React, { useState, useEffect, useContext } from "react";
  // import {
  //   Box,
  //   VStack,
  //   Text,
  //   Divider,
  //   Button,
  //   Modal,
  //   useDisclosure,
  //   ModalOverlay,
  //   ModalContent,
  //   ModalHeader,
  //   ModalCloseButton,
  //   ModalBody,
  //   flexbox,
  //   Table,
  //   Thead,
  //   TabList,
  //   Tbody,
  //   Tr,
  //   Th,
  //   Td,
  //   Select,
  //   Input,
  //   FormControl,
  //   FormLabel,
  // } from "@chakra-ui/react";
  // import {
  //   getAllJobPostings,
  //   getAllCandidateApplications,
  //   getStagesForJobPosting,
  //   getCurrentStageOfApplication,
  //   updateCandidateStage,
  //   deleteStageFromJobPosting,
  // } from "../../services/CandidateService";
  // import NoteContext from "../../Context/NoteContext";
  // import { MdOutlineMailOutline } from "react-icons/md";
  // import { BsThreeDotsVertical } from "react-icons/bs";
  // import StageForm from "./StageForm";
  // import SendEmail from "./SendEmail";
  // import JobPostingForm from "./JobPostingForm";
  // import JobAplicationForm from "./JobApplicationForm";
  // const JobPostingsList = () => {
  //   const [stages, setStages] = useState();
  //   const [jobPostings, setJobPostings] = useState([]);
  //   const [allCandidates, setAllCandidates] = useState();
  //   const [selectedJobPostingId, setSelectedJobPostingId] = useState(null);
  //   const [selectedEMail, setSelectedEMail] = useState(null);
  //   const [jobid, setJobId] = useState();
  //   const [active, setactive] = useState();
  //   const [jobName, setjobName] = useState();
  //   const [manager, setmanager] = useState();
  //   const [stg, setstg] = useState(true);
  //   const [updateCandidate, setUpdateCandidate] = useState(true);
  //   const [candidateStage, setCandidateStage] = useState();
  //   const [currentValue, setCurrentValue] = useState();
  //   const [searchQuery, setSearchQuery] = useState();
  //   const abc = useContext(NoteContext);
  //   console.log(stages);
  //   const {
  //     isOpen: isOpen1,
  //     onOpen: onOpen1,
  //     onClose: onClose1,
  //   } = useDisclosure();
  //   const {
  //     isOpen: isOpen2,
  //     onOpen: onOpen2,
  //     onClose: onClose2,
  //   } = useDisclosure();
  //   const {
  //     isOpen: isOpen3,
  //     onOpen: onOpen3,
  //     onClose: onClose3,
  //   } = useDisclosure();
  //   const {
  //     isOpen: isOpen4,
  //     onOpen: onOpen4,
  //     onClose: onClose4,
  //   } = useDisclosure();
  //   const {
  //     isOpen: isOpen5,
  //     onOpen: onOpen5,
  //     onClose: onClose5,
  //   } = useDisclosure();
  //   const handleAddStageClick = (jobPostingId) => {
  //     console.log("Opening modal for job posting ID:", jobPostingId);
  //     setSelectedJobPostingId(jobPostingId);
  //     onOpen1();
  //   };
  //   const handleSendMailClick = (email) => {
  //     console.log("Opening modal for Sending Email");
  //     setSelectedEMail(email);
  //     onOpen2();
  //   };
  //   const handleNewApplicationClick = () => {
  //     console.log("Opening modal for New job posting");
  //     onOpen3();
  //   };
  //   const handleNewJobApplicationClick = () => {
  //     console.log("Opening modal for New Job Application");
  //     onOpen5();
  //   };
  //   const filteredApplications = allCandidates?.filter((candidate) => {
  //     return candidate?.applicantName
  //       ?.toLowerCase()
  //       ?.includes(searchQuery?.toLowerCase());
  //   });
  //   console.log(filteredApplications);
  //   const updateApplicationStage = (id, stage) => {
  //     console.log("Opening modal for changing stage of application");
  //     setCurrentValue(stage);
  //     // onOpen4();
  //     // if(manager){
  //     fetchJonpostingStages(jobid);
  // try {
  //   const res = updateCandidateStage(id, {
  //     id:'',
  //     name: stage,
  //     description: "Empty",
  //     roundNumber: 2,
  //     manager: "",
  //     recruitmentStageType:'',
  //   });
  //   console.log("ApplicationStage has been updated", res);
  //   console.log(id);
  //   console.log(stage);
  //   setstg(!stg);
  // } catch (error) {
  //   "Failed to update stage of application", error;
  // }
  //     // }
  //   };
  //   useEffect(() => {
  //     abc.setName("RECRUITMENT");
  //     candidatesWithStages();
  //     const fetchJobPostings = async () => {
  //       try {
  //         const postings = await getAllJobPostings();
  //         setJobPostings(postings);
  //       } catch (error) {
  //         console.error("Error fetching job postings:", error);
  //       }
  //     };
  //     const fetchCandidates = async () => {
  //       try {
  //         const Allcandidates = await getAllCandidateApplications();
  //         setAllCandidates(Allcandidates);
  //       } catch (error) {
  //         console.error("Error fetching job postings:", error);
  //       }
  //     };
  //     fetchJonpostingStages(jobid);
  //     fetchJobPostings();
  //     fetchCandidates();
  //   }, [stg]);
  //   const fetchJonpostingStages = async (id) => {
  //     const res = await getStagesForJobPosting(id);
  //     setStages(res);
  //   };
  //   const candidatesWithStages = async () => {
  //     try {
  //       const updatedCandidates =
  //         allCandidates &&
  //         (await Promise.all(
  //           allCandidates?.map(async (candidate) => {
  //             const stage = await getCurrentStageOfApplication(candidate.id);
  //             setCandidateStage({
  //               ...candidateStage,
  //               [candidate.id]: stage.currentRecruitmentStage,
  //             });
  //             candidate.currentStage = stage;
  //             return candidate;
  //             // console.log(object)
  //           })
  //         ));
  //       setUpdateCandidate(updatedCandidates);
  //       console.log(updatedCandidates);
  //       return updatedCandidates;
  //     } catch (error) {
  //       // Handle errors gracefully, e.g., display user-friendly error messages
  //       console.error("Error fetching stages:", error);
  //       return []; // Return an empty array or handle the error differently
  //     }
  //   };
  //   console.log(searchQuery);
  //   // console.log(allCandidates);
  //   console.log(candidateStage);
  //   console.log(manager);
  //   console.log(updateCandidate);
  //   console.log(jobPostings)
  //   const handleDeleteStage = (stageId) => {
  //     console.log(stageId)
  //     console.log(jobid)
  //     try {
  //       const res = deleteStageFromJobPosting(jobid, stageId);
  //       console.log('Stage has beeen deleted',res);
  //     } catch (err) {
  //       console.log("Could not delete the stage from job posting", err);
  //     }
  //   };
  //   return (
  //     <VStack
  //       minH={"100vh"}
  //       textAlign={"left"}
  //       spacing={4}
  //       py={4}
  //       className="setPX w-100vw"
  //       px={6}
  //     >
  //       <Box
  //         className="changeDir gap "
  //         mb={"1rem"}
  //         display={"flex"}
  //         w={"100%"}
  //         justifyContent={"space-between"}
  //         alignItems={"center"}
  //       >
  //         <Text fontWeight={"bold"} fontSize={"1.2rem"}>
  //           Recruitment
  //         </Text>
  //         <Box display={"flex"} gap={"2"} alignItems={"center"}>
  //           <Input
  //             type="text"
  //             onChange={(e) => setSearchQuery(e.target.value)}
  //             placeholder="search"
  //             borderRadius={"0"}
  //           />
  //           <Button
  //             // width={'100%'}
  //             className="btn"
  //             borderRadius={0}
  //             fontSize={"14px"}
  //             border={"none"}
  //             outline={"none"}
  //             colorScheme="red"
  //             minWidth={"max-content"}
  //             onClick={() => handleNewApplicationClick()}
  //           >
  //             + Recriutment
  //           </Button>
  //         </Box>
  //       </Box>
  //       {/* ... (other JSX code) */}
  //       {!searchQuery ? (
  //         <Box w={"100%"}>
  //           <Box
  //             // className="overflow w-100vw"
  //             overflow={"scroll"}
  //             w={"100%"}
  //             maxWidth={"100%"}
  //             border={".2px solid lightgray"}
  //           >
  //             <Box
  //               overflow={"hidden"}
  //               minW={"max-content"}
  //               className="w-50"
  //               spacing={4}
  //             >
  //               <Box
  //                 overflowX={"scroll"}
  //                 display={"flex"}
  //                 minWidth={"max-content"}
  //                 width={"100%"}
  //                 mb={3}
  //               >
  //                 {/* ********************************************************************* */}
  //                 {jobPostings &&
  //                   jobPostings?.map((job) => {
  //                     return (
  //                       <Box key={job.id} minWidth={"max-content"} width={"100%"}>
  //                         <Box
  //                           onClick={() => {
  //                             setJobId(job.id);
  //                             setjobName(job?.title);
  //                             setactive(job.title);
  //                             // setstg(!stg)
  //                             fetchJonpostingStages(job.id);
  //                           }}
  //                           cursor={"pointer"}
  //                           display={"flex"}
  //                           width={"100%"}
  //                           minWidth={"max-content"}
  //                           flex={1}
  //                           px={"5%"}
  //                           py={1}
  //                           _hover={{ bg: "white" }}
  //                           bg={
  //                             active == job.title ? "white" : "rgb(239, 239, 239)"
  //                           }
  //                           borderRight={"1px solid lightgray"}
  //                           justifyContent={"space-between"}
  //                           alignItems={"center"}
  //                         >
  //                           <Text fontWeight={"600"}>{job?.title}</Text>
  //                           {new Date(job?.postingDate).toLocaleDateString()}
  //                           <Text
  //                             fontSize={"10px"}
  //                             borderRadius={"100px"}
  //                             width={"17px"}
  //                             height={"17px"}
  //                             display={"flex"}
  //                             justifyContent={"center"}
  //                             alignItems={"center"}
  //                             textAlign="center"
  //                             color={"white"}
  //                             bg={"red"}
  //                           >
  //                             {
  //                               allCandidates?.filter(
  //                                 (candidate) => candidate.country === job.title
  //                               ).length
  //                             }
  //                           </Text>
  //                         </Box>
  //                       </Box>
  //                     );
  //                   })}
  //               </Box>
  //               <Box width={"100%"} px={4}>
  //                 <Button
  //                   marginBottom={"1rem"}
  //                   colorScheme="red"
  //                   borderRadius={"0"}
  //                   onClick={() => handleAddStageClick(jobid)}
  //                 >
  //                   + Add Stage
  //                 </Button>
  //                 {allCandidates?.some(
  //                   (candidate) =>
  //                     !candidate.currentRecruitmentStage?.name &&
  //                     candidate.country === jobName
  //                 ) && (
  //                   <Box shadow={"sm"} mb={4} border={'1px solid lightgray'}>
  //                     <Table variant="simple">
  //                       <Thead>
  //                         <Tr>
  //                           <Th>Candidate</Th>
  //                           <Th>Email</Th>
  //                           <Th>Job position</Th>
  //                           <Th>Contact</Th>
  //                           <Th>Stage</Th>
  //                           <Th>Actions</Th>
  //                         </Tr>
  //                       </Thead>
  //                       <Tbody>
  //                         {allCandidates?.map((candidate) =>
  //                           (candidate.country === jobName &&
  //                             // candidate.appliedToJobId === jobid
  //                             candidate.currentRecruitmentStage == null) ||
  //                           candidate.currentRecruitmentStage == "" ? (
  //                             <Tr key={Math.random()}>
  //                               <Td>{candidate.applicantName} </Td>
  //                               <Td>{candidate.applicantEmail}</Td>
  //                               <Td>{candidate.country}</Td>
  //                               <Td>{candidate.mobileNumber}</Td>
  //                               <Td>
  //                                 <Select placeholder="Select"
  //                                   onChange={(e) => {
  //                                     updateApplicationStage(
  //                                       candidate.id,
  //                                       e.target.value
  //                                     );
  //                                   }}
  //                                 >
  //                                   {stages &&
  //                                     stages?.map((stage) => {
  //                                       return (
  //                                         <option
  //                                           key={Math.random()}
  //                                           value={stage.name}
  //                                         >
  //                                           {stage.name}
  //                                         </option>
  //                                       );
  //                                     })}
  //                                 </Select>
  //                               </Td>
  //                               <Td>
  //                                 <MdOutlineMailOutline
  //                                   onClick={() =>
  //                                     handleSendMailClick(
  //                                       candidate.applicantEmail
  //                                     )
  //                                   }
  //                                   cursor={"pointer"}
  //                                 />
  //                               </Td>
  //                             </Tr>
  //                           ) : (
  //                             ""
  //                           )
  //                         )}
  //                       </Tbody>
  //                     </Table>
  //                   </Box>
  //                 )}
  //                 {stages &&
  //                   stages?.map((stage) => {
  //                     return (
  //                       <Box
  //                         key={Math.random()}
  //                         width={"100%"}
  //                         // overflow={'hidden'}
  //                         mb={3}
  //                         border={"1px solid lightgray"}
  //                         justifyContent={"space-between"}
  //                       >
  //                         <Box
  //                           display={"flex"}
  //                           borderBottom={"1px solid lightgray"}
  //                           py={1}
  //                           justifyContent={"space-between"}
  //                           px={4}
  //                           w={"100%"}
  //                         >
  //                           <Box display={"flex"} alignItems={"center"} gap={2}>
  //                             <Text
  //                               fontSize={"10px"}
  //                               borderRadius={"100px"}
  //                               width={"17px"}
  //                               height={"17px"}
  //                               display={"flex"}
  //                               justifyContent={"center"}
  //                               alignItems={"center"}
  //                               textAlign="center"
  //                               color={"white"}
  //                               bg={"red"}
  //                             >
  //                               {
  //                                 allCandidates?.filter(
  //                                   (candidate) =>
  //                                     candidate.country === jobName &&
  //                                     candidate.currentRecruitmentStage?.name ==
  //                                       stage.name
  //                                 ).length
  //                               }
  //                             </Text>{" "}
  //                             <Text fontSize={"1rem"} fontWeight={"bold"}>
  //                               {stage.name}
  //                             </Text>
  //                           </Box>
  //                           <Box display={"flex"} gap={2} alignItems={"center"}>
  //                             {/* ********************************************\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\lljnnkeeeeeed*********** */}
  //                             <Button
  //                               bg={"transparent"}
  //                               color={"red"}
  //                               fontSize={"22px"}
  //                               outline={"none"}
  //                               border={"1px solid red"}
  //                               onClick={() => handleNewJobApplicationClick()}
  //                             >
  //                               +
  //                             </Button>
  //                             <BsThreeDotsVertical
  //                               onClick={() => {handleDeleteStage(stage.id)}}
  //                               cursor={"pointer"}
  //                               bg="blue"
  //                               width={"10px"}
  //                               height={"10px"}
  //                             />
  //                           </Box>
  //                         </Box>
  //                         <Box>
  //                           <Table variant="simple" colorScheme="red">
  //                             <Thead>
  //                               <Tr>
  //                                 <Th>candidate</Th>
  //                                 <Th>Email</Th>
  //                                 <Th>Job position</Th>
  //                                 <Th>Contact</Th>
  //                                 <Th>stage</Th>
  //                                 <Th>Actions</Th>
  //                               </Tr>
  //                             </Thead>
  //                             <Tbody>
  //                               {allCandidates?.map((candidate) =>
  //                                 candidate.country === jobName &&
  //                                 // candidate.appliedToJobId === jobid
  //                                 candidate.currentRecruitmentStage?.name ==
  //                                   stage.name ? (
  //                                   <Tr key={candidate.id}>
  //                                     <Td>{candidate.applicantName}</Td>
  //                                     <Td>{candidate.applicantEmail}</Td>
  //                                     <Td>{candidate.country}</Td>
  //                                     <Td>{candidate.mobileNumber}</Td>
  //                                     <Td>
  //                                       <Select
  //                                         onChange={(e) => {
  //                                           updateApplicationStage(
  //                                             candidate.id,
  //                                             e.target.value
  //                                           );
  //                                           console.log(e.target.value);
  //                                         }}
  //                                         value={
  //                                           candidate.currentRecruitmentStage
  //                                             ?.name
  //                                         }
  //                                         // value={' h'}
  //                                       >
  //                                         {stages?.map((stage) => {
  //                                           return (
  //                                             <option
  //                                               key={Math.random()}
  //                                               value={stage.name}
  //                                             >
  //                                               {stage.name}
  //                                             </option>
  //                                           );
  //                                         })}
  //                                       </Select>
  //                                     </Td>
  //                                     <Td>
  //                                       <MdOutlineMailOutline
  //                                         onClick={() =>
  //                                           handleSendMailClick(
  //                                             candidate.applicantEmail
  //                                           )
  //                                         }
  //                                         cursor={"pointer"}
  //                                       />
  //                                     </Td>
  //                                   </Tr>
  //                                 ) : (
  //                                   ""
  //                                 )
  //                               )}
  //                             </Tbody>
  //                           </Table>
  //                         </Box>
  //                       </Box>
  //                     );
  //                   })}
  //               </Box>
  //             </Box>
  //           </Box>
  //         </Box>
  //       ) : (
  //         <Table variant="simple" colorScheme="red">
  //           <Thead border={"1px solid lightgray"}>
  //             <Tr>
  //               <Th>Candidate</Th>
  //               <Th>Email</Th>
  //               <Th>Job position</Th>
  //               <Th>Contact</Th>
  //               <Th>Stage</Th>
  //               <Th>Actions</Th>
  //             </Tr>
  //           </Thead>
  //           <Tbody>
  //             {filteredApplications &&
  //               filteredApplications?.map((candidate) => (
  //                 <Tr key={Math.random()}>
  //                   <Td>{candidate.applicantName} </Td>
  //                   <Td>{candidate.applicantEmail}</Td>
  //                   <Td>{candidate.country}</Td>
  //                   <Td>{candidate.mobileNumber}</Td>
  //                   <Td>
  //                     <Select
  //                       onChange={(e) => {
  //                         updateApplicationStage(candidate.id, e.target.value);
  //                       }}
  //                     >
  //                       {stages &&
  //                         stages?.map((stage) => {
  //                           return (
  //                             <option key={Math.random()} value={stage.name}>
  //                               {stage.name}
  //                             </option>
  //                           );
  //                         })}
  //                     </Select>
  //                   </Td>
  //                   <Td>
  //                     <MdOutlineMailOutline
  //                       onClick={() =>
  //                         handleSendMailClick(candidate.applicantEmail)
  //                       }
  //                       cursor={"pointer"}
  //                     />
  //                   </Td>
  //                 </Tr>
  //               ))}
  //           </Tbody>
  //         </Table>
  //       )}
  //       <Modal isOpen={isOpen1} onClose={onClose1}>
  //         <ModalOverlay />
  //         <ModalContent>
  //           <ModalHeader>Add Stage</ModalHeader>
  //           <ModalCloseButton />
  //           <ModalBody>
  //             <StageForm
  //               jobPostingId={selectedJobPostingId}
  //               onStageAdded={onClose1}
  //             />
  //           </ModalBody>
  //         </ModalContent>
  //       </Modal>
  //       <Modal isOpen={isOpen2} onClose={onClose2}>
  //         <ModalOverlay />
  //         <ModalContent>
  //           <ModalHeader>Send Message</ModalHeader>
  //           <ModalCloseButton />
  //           <ModalBody>
  //             <SendEmail EMailId={selectedEMail} onStageAdded={onClose2} />
  //           </ModalBody>
  //         </ModalContent>
  //       </Modal>
  //       <Modal isOpen={isOpen3} onClose={onClose3}>
  //         <ModalOverlay />
  //         <ModalContent>
  //           {/* <ModalHeader>New-Job Post</ModalHeader> */}
  //           <ModalCloseButton />
  //           <ModalBody>
  //             <JobPostingForm onStageAdded={onClose3} />
  //           </ModalBody>
  //         </ModalContent>
  //       </Modal>
  //       <Modal isOpen={isOpen4} onClose={onClose4}>
  //         <ModalOverlay />
  //         <ModalContent>
  //           <ModalHeader>Manager Name</ModalHeader>
  //           <ModalCloseButton />
  //           <ModalBody>
  //             <FormControl>
  //               <FormLabel>Manager Name</FormLabel>
  //               <Input
  //                 type="text"
  //                 onChange={(e) => setmanager(e.target.value)}
  //                 onStageAdded={onClose3}
  //               />
  //             </FormControl>
  //             <Button
  //               onClick={() => onClose4()}
  //               my={4}
  //               borderRadius={0}
  //               colorScheme="red"
  //             >
  //               Submit
  //             </Button>
  //           </ModalBody>
  //         </ModalContent>
  //       </Modal>
  //       <Modal isOpen={isOpen5} onClose={onClose5}>
  //         <ModalOverlay />
  //         <ModalContent>
  //           <ModalHeader>Add Candidate</ModalHeader>
  //           <ModalCloseButton />
  //           <ModalBody>
  //             <FormControl>
  //               <JobAplicationForm jobid={jobid} />
  //             </FormControl>
  //           </ModalBody>
  //         </ModalContent>
  //       </Modal>
  //     </VStack>
  //   );
  // };
  // export default JobPostingsList;
}
