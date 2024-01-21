import React,{useEffect,useState} from "react";
import { Box, Text, Flex, Heading } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { BsGridFill } from "react-icons/bs";
import { getAllCandidateApplications } from "../../services/CandidateService";

const Home = () => {
    const [allCandidates, setAllCandidates] = useState([]);

console.log(allCandidates)
    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const data = await getAllCandidateApplications();
                setAllCandidates(data);
            } catch (error) {
                console.error('Error fetching applications:', error);
            }
        };
    
        fetchApplications();
    }, []);
    
    
    
  return (
    <Flex
      direction="column"
      bgColor={"lightgray"}
      minHeight="100vh"
      justify="center"
      align="center"
    >
      <Box textAlign="center" width={"100%"} p={4} flexGrow={1}>
        <Heading
          as="h1"
          pb={"10px"}
          display={"flex"}
          alignItems={"center"}
          textAlign={"left"}
          gap={"3px"}
          borderBottom="1px solid gray"
          size="lg"
          mb={6}
        >
          <BsGridFill fontSize={"1.5rem"} />
          Dashboard
        </Heading>
        <Box>
          <Flex gap={"1rem"} width={"100%"}>
            <Box
              width={"13rem"}
              height={"10rem"}
              borderRadius={"md"}
              bgColor={"white"}
            >
              <Text>Total Employees</Text>

              <Text fontSize={"2.5rem"}>0</Text>
              <Link>Employees list</Link>
            </Box>
            <Box
              width={"13rem"}
              height={"10rem"}
              borderRadius={"md"}
              bgColor={"white"}
            >
              <Text>Application</Text>

              <Text fontSize={"2.5rem"}>{allCandidates.length}</Text>
              <Link to={'/all-application'}>All application</Link>
            </Box>
            <Box
              width={"13rem"}
              height={"10rem"}
              borderRadius={"md"}
              bgColor={"white"}
            >
                <Text>Newly Hired</Text>

<Text fontSize={"2.5rem"}>0</Text>
<Link>Newly hired list</Link>
            </Box>
          </Flex>
        </Box>
        {/* Additional content and widgets can be added here */}
      </Box>
    </Flex>
  );
};

export default Home;
