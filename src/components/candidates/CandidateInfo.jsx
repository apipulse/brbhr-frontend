import React, { useEffect, useState } from "react";
import {
  getAllCandidateApplications,
  getAllJobPostings,
} from "../../services/CandidateService";
import { Box, Text, VStack } from "@chakra-ui/react";

const CandidateInfo = ({ id, onOkay }) => {
  const [candidate, setCandidate] = useState();
  const [jobPostings, setJobPostings] = useState([]);
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await getAllCandidateApplications();
        const candidate = res.find((candidate) => candidate.id === id); // Use find for first match

        if (candidate) {
          // Do something with the candidate data here
          console.log(candidate);
          setCandidate(candidate);
        } else {
          // Handle the case where no matching candidate is found
          console.log("No candidate found with ID:", id);
        }
      } catch (error) {
        console.error("Error fetching applications:", error);
      }
    };
    fetchApplications();
    const fetchJobPostings = async () => {
      try {
        const postings = await getAllJobPostings();
        setJobPostings(postings);
      } catch (error) {
        console.error("Error fetching job postings:", error);
      }
    };
    fetchJobPostings();
  }, []);
  console.log(jobPostings);
  return (
    <VStack>
      <Box w={"100%"} p={4}>
        <Box w={"100%"} display={"flex"} justifyContent={"space-between"}>
          <Box w={"100%"} gap={2} display={"flex"} justifyContent={"left"}>
            <Box
              bg={"burlywood"}
              borderRadius={"100px"}
              w={"4rem"}
              h={"4rem"}
              display={"flex"}
              alignItems={"center"}
            >
              <Text
                w={"100%"}
                color={"white"}
                fontSize={"2rem"}
                textAlign={"center"}
              >
                {candidate?.applicantName.slice(0, 2)}
              </Text>
            </Box>
            <Box display={"flex"} alignItems={"center"}>
              <Text fontWeight={"bold"}>
                {candidate?.applicantName
                  ? candidate?.applicantName
                  : "Not Entered"}
              </Text>
              {/* <Text>{candidate?.applicantEmail}</Text>
              <Text>{candidate?.position}</Text> */}
            </Box>
          </Box>
        </Box>
        <Box mt={4} display={"flex"} alignItems={"center"} gap={2}>
          <Text color={"black"} fontWeight={500} fontSize={"1rem"}>
            Email:
          </Text>
          <Text>{candidate?.applicantEmail}</Text>
        </Box>
        <Box mb={4} display={"flex"} alignItems={"center"} gap={2}>
          <Text color={"black"} fontWeight={500} fontSize={"1rem"}>
            Mobile:
          </Text>
          <Text>{candidate?.mobileNumber}</Text>
        </Box>
        <Text fontWeight={"550"} fontSize={"1.2rem"}>
          {" "}
          Personal Information
        </Text>
        <Box>
          <Box display={"flex"}>
            <Box display={"flex"} flex={1} alignItems={"center"} gap={2}>
              <Text color={"black"} fontWeight={500} fontSize={"1rem"}>
                Nationality:
              </Text>
              <Text>{candidate?.country}</Text>
            </Box>

            <Box display={"flex"} flex={1} alignItems={"center"} gap={2}>
              <Text color={"black"} fontWeight={500} fontSize={"1rem"}>
                Visa:
              </Text>
              <Text>{candidate?.visaStatus}</Text>
            </Box>
          </Box>
          <Box display={"flex"} flex={1} alignItems={"center"} gap={2}>
            <Text color={"black"} fontWeight={500} fontSize={"1rem"}>
              Gender:
            </Text>
            <Text>No Idea</Text>
          </Box>
          <Box mb={4} display={"flex"}  gap={2}>
            <Text color={"black"} fontWeight={500} fontSize={"1rem"}>
              Resume:
            </Text>
            <Text>{candidate?.resume} Lorem ipsum dolor sit amet consectetur, adipisicing elit. Qui facere quaerat, repudiandae animi rerum vitae illum asperiores quisquam a porro. </Text>
          </Box>
        </Box>
        <Text fontWeight={"550"} fontSize={"1.2rem"}>
          {" "}
          Recruitment Information
        </Text>
        <Box>
          <Box display={"flex"} flex={1} alignItems={"center"} gap={2}>
            <Text color={"black"} fontWeight={500} fontSize={"1rem"}>
              Recruitment:
            </Text>
            <Text>
              {jobPostings.find((job) => job?.id === candidate?.appliedToJobId)
                ?.title ?? "Job title not found"}{' '}
              {
               new Date(jobPostings.find((job) => job?.id === candidate?.appliedToJobId)
                  ?.closingDate)?.toLocaleDateString()
              }
            </Text>
          </Box>
        </Box>
        <Box>
          <Box display={"flex"} flex={1} alignItems={"center"} gap={2}>
            <Text color={"black"} fontWeight={500} fontSize={"1rem"}>
              Current Stage:
            </Text>
            <Text>
              {candidate?.currentRecruitmentStage?.name
                ? candidate?.currentRecruitmentStage?.name
                : "Not found"}
            </Text>
          </Box>
        </Box>
        <Box>
          <Box display={"flex"} flex={1} alignItems={"center"} gap={2}>
            <Text color={"black"} fontWeight={500} fontSize={"1rem"}>
              Job Position:
            </Text>
            <Text>
              {jobPostings.find((job) => job?.id === candidate?.appliedToJobId)
                ?.title ?? "Job title not found"}
            </Text>
          </Box>
        </Box>
      </Box>
    </VStack>
  );
};

export default CandidateInfo;
