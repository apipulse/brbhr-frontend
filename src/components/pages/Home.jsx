import React, { useEffect, useState, useContext } from "react";
import { Box, Text, Flex, Heading, Grid } from "@chakra-ui/react";
import { randomColor } from "@chakra-ui/theme-tools";
import { Link } from "react-router-dom";
import { BsGridFill } from "react-icons/bs";
import {
  getAllCandidateApplications,
  getAllJobPostings,
  getStagesForJobPosting,
} from "../../services/CandidateService";
import { getEmployees } from "../../services/EmployeeService";
import NoteContext from "../../Context/NoteContext";

const Home = () => {
  const [allCandidates, setAllCandidates] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [jobPostings, setJobPostings] = useState();
  const [stages, setStages] = useState();
  const abc = useContext(NoteContext);
  const expectedEmployees = 100;
  const expectedApplications = 65;
  const employeePercentage = (employees.length / expectedEmployees) * 100;
  const applicationPercentage =
    (allCandidates.length / expectedApplications) * 100;
  const total = 10;
  console.log(allCandidates);
  console.log(stages);
  console.log(jobPostings);
  useEffect(() => {
    abc.setName("DASHBOARD");
    const fetchApplications = async () => {
      try {
        const data = await getAllCandidateApplications();
        setAllCandidates(data);
      } catch (error) {
        console.error("Error fetching applications:", error);
      }

      const fetchJobPostings = async () => {
        try {
          const postings = await getAllJobPostings();
          setJobPostings(postings);
        } catch (error) {
          console.error("Error fetching job postings:", error);
        }
      };

      const fetchJonpostingStages = async (id) => {
        const res = await getStagesForJobPosting(id);
        setStages(res);
      };
      fetchJonpostingStages();
      fetchJobPostings();
    };

    const fetchEmployees = async () => {
      try {
        const data = await getEmployees();
        setEmployees(data);
      } catch (error) {
        console.error("Failed to fetch employees:", error);
      }
    };
    fetchEmployees();
    fetchApplications();
  }, []);

  return (
    <Flex
      direction="column"
      bgColor={"rgb(250, 247, 247)"}
      minHeight="100vh"
      justify="center"
      align="center"
    >
      <Box textAlign="left" width={"100%"} p={4} flexGrow={1}>
        <Box mt={"2rem"}>
          <Box className="grid" gap={"1rem"} width={"100%"}>
            <Box
              className="box1"
              padding={"1rem"}
              borderTop={"4px solid green"}
              // width={"13rem"}
              // height={"10rem"}
              borderRadius={"md"}
              bgColor={"white"}
              display={"flex"}
              flexDir={"column"}
              justifyContent={"space-between"}
            >
              <Box>
                <Text fontWeight={600}>Total Employees</Text>
                <Text fontSize={"2.5rem"} pl={"5px"}>
                  {employees.length}
                </Text>
              </Box>
              <Box
                w={"4rem"}
                textAlign={"center"}
                color={"white"}
                h={"1.5rem"}
                borderRadius={"100px"}
                bg={"green"}
              >
                {employeePercentage.toString().slice(0, 4)}%
              </Box>
              {/* <Link to={"/employees"}>Employees list</Link> */}
            </Box>

            <Box
              className="box2"
              // width={"13rem"}
              padding={"1rem"}
              borderTop={"4px solid orange"}
              // height={"10rem"}
              borderRadius={"md"}
              bgColor={"white"}
              display={"flex"}
              flexDir={"column"}
              justifyContent={"space-between"}
            >
              <Box>
                <Text fontWeight={600}>New Application's</Text>
                <Text fontSize={"2.5rem"} pl={"5px"}>
                  {allCandidates.length}
                </Text>
              </Box>
              <Box
                w={"5rem"}
                textAlign={"center"}
                color={"white"}
                h={"1.5rem"}
                borderRadius={"100px"}
                bg={"orange"}
              >
                {applicationPercentage.toString().slice(0, 4)}%
              </Box>

              {/* <Link to={"/all-application"}>All application</Link> */}
            </Box>
            <Box
              className="box3"
              // width={"13rem"}
              padding={"1rem"}
              borderTop={"4px solid gray"}
              // height={"10rem"}
              borderRadius={"md"}
              bgColor={"white"}
              display={"flex"}
              flexDir={"column"}
              justifyContent={"space-between"}
            >
              <Box>
                <Text fontWeight={600}>Total Strength</Text>
                <Text fontSize={"2.5rem"} pl={"5px"}>
                  100
                </Text>
              </Box>
              <Box
                w={"5rem"}
                textAlign={"center"}
                color={"white"}
                h={"1.5rem"}
                borderRadius={"100px"}
                bg={"gray"}
              >
                100%
              </Box>

              {/* <Link to={"/all-application"}>All application</Link> */}
            </Box>
            
            
            <Box
              className="box2"
              // width={"13rem"}
              padding={"1rem"}
              borderTop={"4px solid red"}
              // height={"10rem"}
              borderRadius={"md"}
              bgColor={"white"}
              display={"flex"}
              flexDir={"column"}
              justifyContent={"space-between"}
            >
              <Box>
                <Text fontWeight={600}>On Leave</Text>
                <Text fontSize={"2.5rem"} pl={"5px"}>
                  0
                </Text>
              </Box>
              <Box
                w={"5rem"}
                textAlign={"center"}
                color={"white"}
                h={"1.5rem"}
                borderRadius={"100px"}
                bg={"red"}
              >
                0.00%
              </Box>

              {/* <Link to={"/all-application"}>All application</Link> */}
            </Box>
            <Box className="box5" p={4} bg={"white"}>
              <Text fontWeight={600}>Overall Leaves</Text>
              <Box>BOX5</Box>
            </Box>
            <Box className="box6"  p={4} bg={"white"}>
              <Text
                fontWeight={600}
                display={"flex"}
                justifyContent={"space-between"}
                pb={1}
                mb={4}
                borderBottom={"1px solid lightgray"}
              >
                Hired Candidates
                <Text px={4}>
                  {
                    allCandidates?.filter(
                      (candidate) =>
                        candidate.currentRecruitmentStage?.name?.toLowerCase() ==
                        "hired"
                    ).length
                  }
                </Text>
              </Text>
              <Box
                w={"100%"}
                display={"flex"}
                height={"18rem"}
                className="changeHeight"
                alignItems={"center"}
                justifyContent={"center"}
                textAlign={"center"}
              >
                <Box h={"100%"} display={"flex"} flexDir={"column-reverse"}>
                  <Text flex={1} fontSize={"12px"}>
                    0-
                  </Text>
                  <Text flex={1} fontSize={"12px"}>
                    1-
                  </Text>
                  <Text flex={1} fontSize={"12px"}>
                    2-
                  </Text>
                  <Text flex={1} fontSize={"12px"}>
                    3-
                  </Text>
                  <Text flex={1} fontSize={"12px"}>
                    4-
                  </Text>
                  <Text flex={1} fontSize={"12px"}>
                    5-
                  </Text>
                  <Text flex={1} fontSize={"12px"}>
                    6-
                  </Text>
                  <Text flex={1} fontSize={"12px"}>
                    7-
                  </Text>
                  <Text flex={1} fontSize={"12px"}>
                    8-
                  </Text>
                  <Text flex={1} fontSize={"12px"}>
                    9-
                  </Text>
                </Box>
                {jobPostings &&
                  jobPostings.map((posting) => {
                    return (
                      <Box
                        flex={1}
                        display={"flex"}
                        flexDir={"column"}
                        w={"100%"}
                        maxW={"10rem"}
                        h={"100%"}
                        borderLeft={"1px solid lightgray"}
                      >
                        <Box
                          mx={"auto"}
                          display={"flex"}
                          flexDir={"column"}
                          justifyContent={"end"}
                          minHeight={"100%"}
                          w={"80%"}

                        >
                          {allCandidates?.filter(
                            (candidate) =>
                              candidate.country === posting.title &&
                              candidate.currentRecruitmentStage?.name?.toLowerCase() ==
                                "hired"
                          ).length +
                            "/" +
                            total}
                          <Box
                            bg={randomColor()}
                            h={
                              (allCandidates?.filter(
                                (candidate) =>
                                  candidate.country === posting.title &&
                                  candidate.currentRecruitmentStage?.name?.toLowerCase() ==
                                    "hired"
                              ).length /
                                total) *
                              100
                            }
                          ></Box>
                        </Box>

                        <Text
                          borderTop={"1px solid lightgray"}
                          fontSize={"14px"}
                          className="changeFontSize"
                          flex={1}
                          textAlign={"center"}
                        >
                          {posting.title}
                        </Text>
                      </Box>
                    );
                  })}
              </Box>
            </Box>
            <Box className="box7" p={4} bg={"white"}>
              <Box>BOX7</Box>
            </Box>
            <Box className="box8" p={4} bg={"white"}>
              <Text
                fontWeight={600}
                pb={2}
                borderBottom={"1px solid lightgray"}
                mb={4}
              >
                Daily Attendance Analytics
              </Text>
            </Box>
          </Box>
        </Box>
        {/* Additional content and widgets can be added here */}
      </Box>
    </Flex>
  );
};

export default Home;
