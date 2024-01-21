import React, { useState, useEffect } from "react";
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
} from "@chakra-ui/react";
import {
  getAllJobPostings,
  getAllCandidateApplications,
  getStagesForJobPosting,
} from "../../services/CandidateService";
import StageForm from "./StageForm"

// const JobPostingsList = () => {
  // const [jobPostings, setJobPostings] = useState([]);
  // const [allCandidates, setAllCandidates] = useState();
  // const { isOpen, onOpen, onClose } = useDisclosure();
  // const [selectedJobPostingId, setSelectedJobPostingId] = useState(null);
  // const [stages, setStages] = useState();
  // const [id, setId] = useState();
  // console.log(allCandidates);
  // useEffect(() => {
  //   const fetchJobPostings = async () => {
  //     try {
  //       const postings = await getAllJobPostings();

  //       setJobPostings(postings);
  //     } catch (error) {
  //       console.error("Error fetching job postings:", error);
  //     }
  //   };

  //   const fetchCandidates = async () => {
  //     try {
  //       const Allcandidates = await getAllCandidateApplications();
  //       setAllCandidates(Allcandidates);
  //     } catch (error) {
  //       console.error("Error fetching job postings:", error);
  //     }
  //   };
  //   fetchJobPostings();
  //   fetchCandidates();
  // }, []);
  // console.log(jobPostings);

  // useEffect(() => {
  //   const fetchStages = async () => {
  //     try {
  //       // Fetch stages for each job posting individually
  //       const jobPostingsWithStages = await Promise.all(
  //         jobPostings.map(async (posting) => {
  //           const stages = await getStagesForJobPosting(posting.id);
  //           return { ...posting, stages };
  //         })
  //       );
  //       setStages(jobPostingsWithStages);
  //     } catch (error) {
  //       console.error("Error fetching stages:", error);
  //     }
  //   };
  //   fetchStages();
  // }, []);

  // console.log(stages);

  // const handleAddStageClick = (jobPostingId) => {
  //   console.log("Opening modal for job posting ID:", jobPostingId);
  //   setSelectedJobPostingId(jobPostingId);
  //   onOpen();
  // };

//   return (
//     <VStack spacing={4} p={4}>
//       <Box width={"100%"} gap={"10px"}>
        // <Text
        //   fontSize={"2rem"}
        //   pb={".5rem"}
        //   mb={"1rem"}
        //   borderBottom={"1px solid gray"}
        // >
        //   Job-Posting List
        // </Text>
//         {jobPostings.map((posting) => (
//           <Box key={posting.id} p={4} border={"md"} borderWidth="1px">
            // <Box display={"flex"} gap={"10px"}>
            //   <Text fontWeight="bold">{posting.title}</Text>
            //   <Text fontWeight="">
            //     {new Date(posting?.postingDate).toLocaleDateString()}
            //   </Text>
            // </Box>
            // {/* Other job posting details */}
            // <Divider my={2} />
            // {/* Displaying additional details */}
            // <Button
            //   marginBottom={"1rem"}
            //   colorScheme="blue"
            //   onClick={() => handleAddStageClick(posting.id)}
            // >
            //   + Add Stage
            // </Button>

//             {posting.stages && (
//               <Box>
//                 <Text fontSize={"1.3rem"}>Stages:</Text>
//                 <Box>
//                   {posting.stages.map((stage) => (
//                     <Box key={Math.random()} border={"1px solid gray"}>
//                       <Text>{stage.name}</Text>
//                       {allCandidates?.map((candidate) =>
//                         candidate.currentStage == stage ? (
//                           <Box>
//                             <Text>Candidates who have applied to this job</Text>

//                             <Box width={"100%"} display={"flex"}>
//                               <Table variant="striped" colorScheme="teal">
//                                 <Thead>
//                                   <Tr>
//                                     <Th>candidate</Th>
//                                     <Th>Email</Th>
//                                     <Th>Contact</Th>
//                                   </Tr>
//                                 </Thead>
//                                 <Tbody>
//                                   {allCandidates.map((candidate) =>
//                                     candidate.country == posting.title ? (
//                                       <Tr key={candidate.id}>
//                                         <Td>{candidate.applicantName}</Td>
//                                         <Td>{candidate.applicantEmail}</Td>
//                                         <Td>{candidate.mobileNumber}</Td>
//                                       </Tr>
//                                     ) : (
//                                       ""
//                                     )
//                                   )}
//                                 </Tbody>
//                               </Table>
//                             </Box>
//                           </Box>
//                         ) : (
//                           ""
//                         )
//                       )}
//                     </Box>
//                   ))}
//                 </Box>
//               </Box>
//             )}
//           </Box>
//         ))}
//       </Box>
//       <Modal isOpen={isOpen} onClose={onClose}>
//         <ModalOverlay />
//         <ModalContent>
//           <ModalHeader>Add Stage</ModalHeader>
//           <ModalCloseButton />
//           <ModalBody>
//             <StageForm
//               jobPostingId={selectedJobPostingId}
//               onStageAdded={onClose}
//             />
//           </ModalBody>
//         </ModalContent>
//       </Modal>
//     </VStack>
//   );
// };
// export default JobPostingsList;






// ... (other imports and code)

const JobPostingsList = () => {
  const [stages, setStages] = useState(["Initial", "Interview", "Hired"]);
  const [jobPostings, setJobPostings] = useState([]);
  const [allCandidates, setAllCandidates] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedJobPostingId, setSelectedJobPostingId] = useState(null);
  const [id, setId] = useState();
  console.log(allCandidates);
  useEffect(() => {
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
    fetchJobPostings();
    fetchCandidates();
  }, []);
  console.log(jobPostings);

  useEffect(() => {
    const fetchStages = async () => {
      try {
        // Fetch stages for each job posting individually
        const jobPostingsWithStages = await Promise.all(
          jobPostings.map(async (posting) => {
            const stages = await getStagesForJobPosting(posting.id);
            return { ...posting, stages };
          })
        );
        setStages(jobPostingsWithStages);
      } catch (error) {
        console.error("Error fetching stages:", error);
      }
    };
    fetchStages();
  }, []);

  console.log(stages);

  const handleAddStageClick = (jobPostingId) => {
    console.log("Opening modal for job posting ID:", jobPostingId);
    setSelectedJobPostingId(jobPostingId);
    onOpen();
  };
  
  
  
  

  // ... (useEffect and other code)

  const handleMoveToNextStage = (applicationId, currentStage) => {
    const currentStageIndex = stages.indexOf(currentStage);
    if (currentStageIndex < stages.length - 1) {
      const nextStage = stages[currentStageIndex + 1];
      // Update the stage of the application in the database or application state
      // For example, call a function to update the stage for the application
      // updateApplicationStage(applicationId, nextStage);
    }
  };

  return (
    <VStack spacing={4} p={4}>
      {/* BOX */}
      <Text
          fontSize={"2rem"}
          pb={".5rem"}
          mb={"1rem"}
          borderBottom={"1px solid gray"}
        >
          Job-Posting List
        </Text>
      {/* ... (other JSX code) */}
      {jobPostings?.map((posting) => (
        <Box key={posting.id} p={4} border={"md"} borderWidth="1px">
          {/* ... (other job posting details) */}


          <Box display={"flex"} gap={"10px"}>
              <Text fontWeight="bold">{posting.title}</Text>
              <Text fontWeight="">
                {new Date(posting?.postingDate).toLocaleDateString()}
              </Text>
            </Box>
            {/* Other job posting details */}
            <Divider my={2} />
            {/* Displaying additional details */}
            <Button
              marginBottom={"1rem"}
              colorScheme="blue"
              onClick={() => handleAddStageClick(posting.id)}
            >
              + Add Stage
            </Button>

          
          {allCandidates?.map((candidate) =>
            candidate.jobPostingId === posting.id ? (
              <Box key={candidate.id}>
                <Text>Candidates who have applied to this job</Text>
                <Table variant="striped" colorScheme="teal">
                  {/* ... (Table headers) */}
                  <Tbody>
                    <Tr key={candidate.id}>
                      <Td>{candidate.applicantName}</Td>
                      <Td>{candidate.applicantEmail}</Td>
                      <Td>{candidate.mobileNumber}</Td>
                      <Td>
                        {stages?.map((stage) => (
                          <Button
                            key={stage}
                            onClick={() =>
                              handleMoveToNextStage(candidate.id, stage)
                            }
                          >
                            {stage}
                          </Button>
                        ))}
                      </Td>
                    </Tr>
                  </Tbody>
                </Table>
              </Box>
            ) : null
          )}
        </Box>
      ))}
      <Modal isOpen={isOpen} onClose={onClose}>
       <ModalOverlay />
       <ModalContent>
         <ModalHeader>Add Stage</ModalHeader>
         <ModalCloseButton />
         <ModalBody>
           <StageForm
             jobPostingId={selectedJobPostingId}
             onStageAdded={onClose}
           />
         </ModalBody>
       </ModalContent>
     </Modal>
    </VStack>
  );
};
export default JobPostingsList;














// import React, { useState, useEffect } from "react";
// // ... other imports

// const JobPostingsList = () => {
//   // ... other state variables
//   const [stages, setStages] = useState({}); // Store stages for each posting

//   useEffect(() => {
//     // ... other fetch calls

//     const fetchStagesForAllPostings = async () => {
//       try {
//         const allPostings = await getAllJobPostings();
//         const allStages = await Promise.all(
//           allPostings.map((posting) => getStagesForJobPosting(posting.id))
//         );
//         setStages(allStages.reduce((acc, stages, index) => {
//           acc[allPostings[index].id] = stages;
//           return acc;
//         }, {}));
//       } catch (error) {
//         console.error("Error fetching stages:", error);
//       }
//     };
//     fetchStagesForAllPostings();
//   }, []);

//   // ... other functions

//   return (
//     // ... other JSX

//     {jobPostings.map((posting) => (
//       // ... other JSX

//       {stages[posting.id] && (
//         <Box>
//           {stages[posting.id].map((stage) => (
//             // ... JSX to render each stage
//             <Text/>
//             ))}
//             </Box>
//       )}

//       // ... other JSX
//     ))}

//   );
// };

// export default JobPostingsList;
