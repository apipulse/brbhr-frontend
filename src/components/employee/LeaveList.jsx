import React, { useState, useEffect,useContext } from "react";
import { getLeavesByEmployee } from "../../services/LeaveService";
import {
  Box,
  VStack,
  Text,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Table,
  Thead,
  TabList,
  Input,
  Button,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";
import { getEmployees } from "../../services/EmployeeService";
import LeaveForm from "./LeaveForm";
import NoteContext from "../../Context/NoteContext";

const LeaveList = ({ employeeId }) => {
  const {
    isOpen: isOpen2,
    onOpen: onOpen2,
    onClose: onClose2,
  } = useDisclosure();

  const [leaves, setLeaves] = useState([]);
  const [employees, setEmployees] = useState([]);
  const abc = useContext(NoteContext);
  console.log(employees);
  useEffect(() => {
    abc.setName('LEAVE')

    const fetchLeaves = async () => {
      try {
        const data = await getLeavesByEmployee("ali");
        setLeaves(data);
      } catch (error) {
        console.error("Error fetching leaves:", error);
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
    fetchLeaves();
  }, [employeeId]);

  const handleSendMailClick = () => {
    console.log("Opening modal for Leave Request");
    onOpen2();
  };
  console.log(leaves);
  return (
    <VStack minH={'100vh'} className="w-100vw" spacing={4} bg={"rgb(250, 247, 247)"} p={"1rem"}>
      <Box className="changeDir" pt={"2rem"} w={"100%"} display={"flex"} gap={4}>
        <Box bg={"white"} borderTop={"3px solid green"} p={"1rem"} flex={1}>
          <Text fontWeight={"500"}>New Requests</Text>
          <Text fontSize={"2.5rem"}>1</Text>
        </Box>
        <Box bg={"white"} borderTop={"3px solid gray"} p={"1rem"} flex={1}>
          <Text>Approved Requests</Text>
          <Text fontSize={"2.5rem"}>1</Text>
        </Box>
        <Box bg={"white"} borderTop={"3px solid red"} p={"1rem"} flex={1}>
          <Text>Rejected Requests</Text>
          <Text fontSize={"2.5rem"}>1</Text>
        </Box>
      </Box>
      <Box
      className="changeDir gap"
        pt={"1rem"}
        w={"100%"}
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Text
          fontWeight={"bold"}
          fontSize={"1.5rem"}
        >
          Leaves Requests
        </Text>
        <Box display={"flex"} gap={2}>
          <Input placeholder={"Search"} borderRadius={0} type="text" />
          <Button
            colorScheme={"red"}
            borderRadius={0}
            onClick={() => handleSendMailClick()} minWidth={'max-content'}
          >
            + Create
          </Button>
        </Box>
      </Box>
      <Box
        width={"100%"}
        overflowX={"scroll"}
        py={4}
        shadow="md"
        borderWidth="1px"
      >
        {/* <Text>{`Type: ${leave.type}, Status: ${leave.status}`}</Text> */}

        <Table variant="striped" colorScheme="teal">
          <Thead>
            <Tr>
              <Th>Employee</Th> 
              <Th>Leave Type</Th>
              <Th>From</Th>
              <Th>To</Th>
              <Th>Requested Days</Th>
              <Th>Status</Th>
              <Th>Options</Th>
            </Tr>
          </Thead>
          <Tbody>
            {leaves.map((leave) => (
              <Tr key={Math.random()}>
                <Td>{leave.employeeId}w</Td>
                <Td>{leave.type}s</Td>
                <Td>s{new Date(leave.startDate).toLocaleDateString()}</Td>
                <Td>s{new Date(leave.endDate).toLocaleDateString()}</Td>
                <Td>s{leave.reason}</Td>
                <Td display={"flex"} >
                  <Button p={1} borderRadius={0} flex={1}>
                    Accept
                  </Button>
                  <Button p={1} borderRadius={0} flex={1}>
                    Reject
                  </Button>
                </Td>
              </Tr>
            ))} 
          </Tbody>
        </Table>
      </Box>

      <Modal isOpen={isOpen2} onClose={onClose2}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Leave Request</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <LeaveForm onStageAdded={onClose2} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </VStack>
  );
};

export default LeaveList;
// ////////////////////////////////////
// /////////////////////////////////
// ///////////////////////////////
// ////////////////////////////
// ////////////////////////
///////////////////////
///////////////////
////////////////
///
//

// import React, { useState, useEffect } from "react";
// import { getLeavesByEmployee } from "../../services/LeaveService";
// import { Box, VStack, Text } from "@chakra-ui/react";
// import { getEmployees } from "../../services/EmployeeService";
// const LeaveList = ({ employeeId }) => {
//   const [leaves, setLeaves] = useState([]);
//   const [employees, setEmployees] = useState([]);

//   useEffect(() => {
//     const fetchLeaves = async () => {
//       try {
//         const data = await getLeavesByEmployee(employeeId);
//         setLeaves(data);
//       } catch (error) {
//         console.error("Error fetching leaves:", error);
//       }
//     };

//     const fetchEmployees = async () => {
//       try {
//         const data = await getEmployees();
//         setEmployees(data);
//       } catch (error) {
//         console.error("Failed to fetch employees:", error);
//       }
//     };
//     fetchEmployees();
//     fetchLeaves();
//   }, [employeeId]);
// console.log(leaves)
//   return (
//     <VStack spacing={4}>
//       {leaves.map((leave) => (
//         <Box key={leave.id} p={4} shadow="md" borderWidth="1px">
//           <Text>{`Type: ${leave.type}, Status: ${leave.status}`}</Text>

//         </Box>
//       ))}
//     </VStack>
//   );
// };

// export default LeaveList;
