import React, { useState, useEffect, useContext } from "react";
import {
  getLeavesByEmployee,
  getAllLeaveRequests,
  deleteLeave,
  updateLeaveStatus,
} from "../../services/LeaveService";
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
  useToast,
} from "@chakra-ui/react";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { getEmployees } from "../../services/EmployeeService";
import LeaveForm from "./LeaveForm";
import NoteContext from "../../Context/NoteContext";

const LeaveList = () => {
  const toast = useToast();
  const {
    isOpen: isOpen2,
    onOpen: onOpen2,
    onClose: onClose2,
  } = useDisclosure();

  const [leaves, setLeaves] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [change, setchange] = useState(false);
  const [id, setId] = useState();
  const abc = useContext(NoteContext);
  useEffect(() => {
    abc.setName("LEAVE");

    const fetchLeaves = async () => {
      try {
        const data = await getAllLeaveRequests();
        console.log("All leaves has been fetched");
        setLeaves(data);
      } catch (error) {
        console.error("Error fetching leaves:", error);
      }
    };

    const fetchLeave = async () => {
      const id = "65be5c823ad88f331ba9ad97";
      try {
        const data = await getLeavesByEmployee(parseInt(id));
        console.log("Leave Info has been fetched", data);
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
    // fetchLeave();
  }, [change]);

  const handleClick = () => {
    console.log("Opening modal for Leave Request");
    onOpen2();
  };

  const updateStatus = async (id, status, reason) => {
    try {
      const res = await updateLeaveStatus(id, status, reason);
      console.log(res);
      setchange(!change)
    } catch (err) {
      console.error(err);
    }
  };

  console.log(leaves);
  return (
    <VStack
      minH={"100vh"}
      className="w-100vw"
      spacing={4}
      bg={"rgb(250, 247, 247)"}
      p={"1rem"}
    >
      <Box
        className="changeDir"
        pt={"2rem"}
        w={"100%"}
        display={"flex"}
        gap={4}
      >
        <Box bg={"white"} borderTop={"3px solid green"} p={"1rem"} flex={1}>
          <Text fontWeight={"500"}>New Requests</Text>
          <Text fontSize={"2.5rem"}>
            {
              leaves.filter(
                (leave) => leave.status === null || leave.status === undefined
              ).length
            }
          </Text>
        </Box>
        <Box bg={"white"} borderTop={"3px solid gray"} p={"1rem"} flex={1}>
          <Text>Approved Requests</Text>
          <Text fontSize={"2.5rem"}>
            {leaves.filter((leave) => leave.status === "Accepted").length}
          </Text>
        </Box>
        <Box bg={"white"} borderTop={"3px solid red"} p={"1rem"} flex={1}>
          <Text>Rejected Requests</Text>
          <Text fontSize={"2.5rem"}>
            {leaves.filter((leave) => leave.status === "Rejected").length}
          </Text>
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
        <Text fontWeight={"bold"} fontSize={"1.5rem"}>
          Leaves Requests
        </Text>
        <Box display={"flex"} gap={2}>
          <Input placeholder={"Search"} borderRadius={0} type="text" />
          <Button
            colorScheme={"red"}
            borderRadius={0}
            onClick={() => handleClick()}
            minWidth={"max-content"}
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

        <Table variant="simple" minW={"max-content"}>
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
                <Td>{leave.employeeId}</Td>
                <Td>{leave.type}</Td>
                <Td>{new Date(leave.startDate).toLocaleDateString()}</Td>
                <Td>{new Date(leave.endDate).toLocaleDateString()}</Td>
                <Td>{leave.reason}</Td>

                <Td display={"flex"} gap={2}>
                  <Button
                    onClick={() => updateStatus(leave.id, "Accepted", "Reason")}
                    colorScheme="blue"
                    borderRadius={0}
                    flex={1} isDisabled={leave.status=='Accepted'?true:''}
                  >
                    Accept
                  </Button>
                  <Button
                    onClick={() => updateStatus(leave.id, "Rejected", "reason")}
                    colorScheme="red"
                    borderRadius={0}
                    flex={1} isDisabled={leave.status=='Rejected'?true:''}
                  >
                    Reject
                  </Button>
                </Td>

                <Td>
                  <FaEdit
                    fontSize={"1.5rem"}
                    onClick={() => {
                      onOpen2();
                      setId(leave.id);
                    }}
                    fontWeight={600}
                    cursor={"pointer"}
                  />
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
            <LeaveForm
              leaveId={id}
              onAdded={onClose2}
              change={change}
              setchange={setchange}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </VStack>
  );
};

export default LeaveList;
