import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import {
  getMyLeaveRequests,
  getMyLeaves,
  deleteLeave,
} from "../../services/LeaveService";
import LeaveForm from "../employee/LeaveForm";
import {
  Box,
  Input,
  Text,
  Table,
  Thead,
  TabList,
  Tbody,
  Tr,
  Button,
  Th,
  Td,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from "@chakra-ui/react";
import { format } from "date-fns";
function MyLeaveRequests() {
  const [searchQuery, setSearchQuery] = useState("");
  const [leaves, setLeaves] = useState([]);
  const [change, setChange] = useState(false);
  const [id, setId] = useState(false);

  useEffect(() => {}, []);
  const {
    isOpen: isOpen2,
    onOpen: onOpen2,
    onClose: onClose2,
  } = useDisclosure();

  const MyLeves = async (e) => {
    e.preventDefault();
    try {
      const res = await getMyLeaveRequests(searchQuery);
      console.log(res);
      setLeaves(res);
    } catch (error) {
      console.error(error);
    }
  };

  const leaveDelete = async (leaveId) => {
    try {
      const res = await deleteLeave(id);
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box minH={"100vh"} mt={4} className="w-100vw" p={4}>
      <Box
        className="changeDir"
        display={"flex"}
        w={"100%"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Text fontWeight={"600"} fontSize={"1.4rem"}>
          My Leave Requests
        </Text>
        <form
          onSubmit={MyLeves}
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: ".75rem",
            justifyContent: "space-between",
            gap: "1rem",
          }}
        >
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Name"
            type="text"
            borderRadius={0}
          />
          <Button colorScheme="red" borderRadius={0} type="submit">
            Submit
          </Button>
        </form>
      </Box>
      <Box
        mt={4}
        shadow={"sm"}
        overflow={"scroll"}
        border={"1px solid lightgray"}
      >
        <Table minW={"max-content"} variant="simple">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Start Date</Th>
              <Th>End Date</Th>
              <Th>Type</Th>
              <Th>Status</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {leaves?.map((leave) => (
              <Tr key={Math.random()}>
                <Td>{leave.employeeId} </Td>
                <Td>
                  {format(
                    new Date(leave.startDate).toLocaleDateString(),
                    "MMMM dd, yyyy"
                  )}
                </Td>
                <Td>
                  {format(
                    new Date(leave.endDate).toLocaleDateString(),
                    "MMMM dd, yyyy"
                  )}
                </Td>
                <Td>{leave.type}</Td>
                <Td>{leave.status ? leave.status : "Pending"}</Td>
                <Td display={"flex"} p={1} gap={3}>
                  <Button
                    isDisabled={!leave.status ? false : true}
                    my={"auto"}
                    borderRadius={0}
                    onClick={() => leaveDelete(leave.id)}
                  >
                    <MdDelete style={{ flex: 1, fontSize: "1.5rem" }} />{" "}
                  </Button>
                  <Button
                    borderRadius={0}
                    isDisabled={!leave.status ? false : true}
                  >
                    <FaEdit
                      onClick={() => {
                        onOpen2();
                        setId(leave.id);
                      }}
                      style={{ flex: 1, fontSize: "1.5rem" }}
                    />
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
            <LeaveForm
              leaveId={id}
              onAdded={onClose2}
              change={change}
              setchange={setChange}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default MyLeaveRequests;
