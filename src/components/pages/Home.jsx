import React, { useEffect, useState, useContext } from "react";
import { Box, Text, Flex, Heading, Grid } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { BsGridFill } from "react-icons/bs";
import { getAllCandidateApplications } from "../../services/CandidateService";
import { getEmployees } from "../../services/EmployeeService";
import NoteContext from "../../Context/NoteContext";
const Home = () => {
  const [allCandidates, setAllCandidates] = useState([]);
  const [employees, setEmployees] = useState([]);
  const abc = useContext(NoteContext);

  console.log(allCandidates);
  useEffect(() => {
    abc.setName("DASHBOARD");
    const fetchApplications = async () => {
      try {
        const data = await getAllCandidateApplications();
        setAllCandidates(data);
      } catch (error) {
        console.error("Error fetching applications:", error);
      }
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
      <Box textAlign="center" width={"100%"} p={4} flexGrow={1}>
        {/* <Heading
          as="h1"
          pb={"10px"}
          display={"flex"}
          alignItems={"center"}
          textAlign={"left"}
          gap={"3px"}
          size="lg"
          mb={6}
        >
          <BsGridFill fontSize={"1.5rem"} />
          Dashboard
        </Heading> */}
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
            >
              <Text>Total Employees</Text>

              <Text fontSize={"2.5rem"}>{employees.length}</Text>
              <Link to={"/employees"}>Employees list</Link>
            </Box>
            <Box
              className="box2"
              // width={"13rem"}
              padding={"1rem"}
              borderTop={"4px solid orange"}
              // height={"10rem"}
              borderRadius={"md"}
              bgColor={"white"}
            >
              <Text>New Application's</Text>

              <Text fontSize={"2.5rem"}>{allCandidates.length}</Text>
              <Link to={"/all-application"}>All application</Link>
            </Box>
            <Box
              className="box3"
              // width={"13rem"}
              // height={"10rem"}
              padding={"1rem"}
              borderTop={"4px solid black"}
              borderRadius={"md"}
              bgColor={"white"}
            >
              <Text>Total strength</Text>
              <Text fontSize={"2.5rem"}>0</Text>
              <Link>Newly hired list</Link>
            </Box>

            <Box
              className="box4"
              width={"100%"}
              height={"100%"}
              padding={"1rem"}
              borderTop={"4px solid red"}
              borderRadius={"md"}
              bgColor={"white"}
            >
              <Text>On Leave</Text>

              <Text fontSize={"2.5rem"}>0</Text>
              <Link></Link>
            </Box>
            <Box className="box5" bg={'white'}>
              <Text>Overall Leaves</Text>
              <Box>BOX5</Box>
            </Box>
            <Box className="box6" bg={'white'}>
              <Box>Hired Candidates</Box>
            </Box>
            <Box className="box7" bg={'white'}>
              <Box>BOX7</Box>
            </Box>
            <Box className="box8" bg={'white'}>
              <Box>BOX8</Box>
            </Box>
          </Box>
        </Box>
        {/* Additional content and widgets can be added here */}
      </Box>
    </Flex>
  );
};

export default Home;
