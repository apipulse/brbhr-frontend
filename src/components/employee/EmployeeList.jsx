import React, { useState, useEffect, useContext } from "react";
import {
  getEmployees,
  updateEmployee,
  deleteEmployee,
  getEmployeeById,
} from "../../services/EmployeeService";
import {
  Box,
  Input,
  Flex,
  Text,
  useMediaQuery,
  Table,
  Thead,
  Modal,
  Tbody,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
  ModalContent,
  ModalOverlay,
  Tr,
  Th,
  useDisclosure,
  Td,
  VStack,
  Button,
} from "@chakra-ui/react";
import { BsThreeDotsVertical } from "react-icons/bs";
import NoteContext from "../../Context/NoteContext";

import { MdOutlineDashboardCustomize } from "react-icons/md";
import { FaList } from "react-icons/fa6";
import StageForm from "./AddEmployeeForm";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
const EmployeeList = () => {
  const abc = useContext(NoteContext);

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
  const [employees, setEmployees] = useState([]);
  const [employeeid, setEmployeeId] = useState(null);
  const [listview, setListView] = useState(true);
  const [searchQuery, SetSearchQuery] = useState();
  //   const [isLargerThan768] = useMediaQuery("(min-width: 768px)");
  const [selectedJobPostingId, setSelectedJobPostingId] = useState(null);
  useEffect(() => {
    abc.setName("EMPLOYEE");

    const fetchEmployees = async () => {
      try {
        const data = await getEmployees();
        setEmployees(data);
      } catch (error) {
        console.error("Failed to fetch employees:", error);
      }
    };
    fetchEmployees();
  }, []);

  const filteredEmployees = employees?.filter((employee) => {
    return employee?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase());
  });

  console.log(employeeid);
  const seeEmployee = (id) => {
    try {
      const res = getEmployeeById(id);
      console.log(res);
      console.log("Employee's Information has been fetchend");
    } catch (error) {
      console.log("Failed to fetch the Employee's Information", error);
    }
  };

  console.log(searchQuery);
  const deleteAnEmployee = async (id) => {
    console.log(id);
    try {
      const response = await deleteEmployee(1);
      console.log(response);
    } catch (error) {
      console.log("Can't delete the Employee: Error", error);
    }
  };
  const handleAddStageClick = (jobPostingId) => {
    console.log("Opening modal for job posting ID:", jobPostingId);
    setSelectedJobPostingId(jobPostingId);
    onOpen1();
  };

  const seeEmployeeInfo = (id) => {
    console.log("Opening modal to see employee information", id);
    setEmployeeId(id);

    onOpen2();
  };
console.log(filteredEmployees)
  console.log(employees);
  return (
    <VStack spacing={4} minH={'100vh'}>
      <Box
        className="changeDir gap"
        p={2}
        display={"flex"}
        width={"100%"}
        marginStart={"1rem"}
        marginEnd={"1rem"}
        justifyContent={"space-between"}
        alignItems={"center"}
        py={"1rem"}
      >
        <Text fontSize={"1.5rem"} fontWeight={"600"} textAlign={"left"}>
          People
        </Text>
        <Box
          className="changeDir"
          display={"flex"}
          gap={3}
          alignItems={"center"}
        >
          <Input
            value={searchQuery}
            onChange={(e) => SetSearchQuery(e.target.value)}
            type="text"
            borderRadius="0"
            placeholder="Search"
          />
          <Box display={"flex"} gap={2}>
            <Box display={"flex"} gap={2} p={1} border={"1px solid lightgray"}>
              <FaList
                fontSize={"1.5rem"}
                onClick={() => setListView(!listview)}
                cursor={"pointer"}
                color={listview ? "gray" : "black"}
              />
              <MdOutlineDashboardCustomize
                onClick={() => setListView(!listview)}
                cursor={"pointer"}
                fontSize={"1.5rem"}
                color={!listview ? "gray" : "black"}
              />
            </Box>

            <Button
              colorScheme="red"
              borderRadius={0}
              className="`btn"
              onClick={() => handleAddStageClick()}
              minWidth={"max-content"}
            >
              + Create
            </Button>
          </Box>
        </Box>
      </Box>
      <Box
        px={"1rem"}
        width={"100%"}
        display={"flex"}
        flexWrap={"wrap"}
        alignItems={"center"}
        justifyContent={"center"}
        gap={"1rem"}
      >
        {listview ? (
          searchQuery ? (
            filteredEmployees?.map((employee) => {
              return (
                <Box
                  key={employee.emailId}
                  w={"17rem"}
                  display={"flex"}
                  p={2}
                  gap={2}
                  border={"1px solid lightgray"}
                  cursor={"pointer"}
                  onClick={() => {
                    seeEmployeeInfo(employee.id);
                    seeEmployee(employee.id);
                  }}
                >
                  <Box
                    w={"100%"}
                    display={"flex"}
                    justifyContent={"space-between"}
                  >
                    <Box gap={2} display={"flex"} alignItems={"center"}>
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
                          {employee.name.slice(0, 2)}
                        </Text>
                      </Box>
                      <Box>
                        <Text fontWeight={"bold"}>
                          {employee.name ? employee.name : "Not Entered"}
                        </Text>
                        <Text>{employee.emailId}</Text>
                        <Text>{employee.position}</Text>
                      </Box>
                    </Box>
                  </Box>
                  <BsThreeDotsVertical />
                </Box>
              );
            })
          ) : (
            employees.map((employee) => (
              <Box
                key={employee.emailId}
                w={"17rem"}
                display={"flex"}
                p={2}
                gap={2}
                border={"1px solid lightgray"}
                cursor={"pointer"}
                onClick={() => {
                  seeEmployeeInfo(employee.id);
                  seeEmployee(employee.id);
                }}
              >
                <Box
                  w={"100%"}
                  display={"flex"}
                  justifyContent={"space-between"}
                >
                  <Box gap={2} display={"flex"} alignItems={"center"}>
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
                        {employee.name.slice(0, 2)}
                      </Text>
                    </Box>
                    <Box>
                      <Text fontWeight={"bold"}>
                        {employee.name ? employee.name : "Not Entered"}
                      </Text>
                      <Text>{employee.emailId}</Text>
                      <Text>{employee.position}</Text>
                    </Box>
                  </Box>
                </Box>
                <BsThreeDotsVertical />
              </Box>
            ))
          )
        ) : (
          <Table variant="simple" colorScheme="red">
            <Thead>
              <Tr>
                <Th>Employe Name</Th>
                <Th>Email</Th>
                <Th>Postion</Th>
                <Th>ACtions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {!searchQuery
                ? employees.map((employee) => (
                    <Tr key={employee.id}>
                      <Td>{employee.name ? employee.name : "Not Entered"}</Td>
                      <Td>{employee.emailId}</Td>
                      <Td>{employee.position}</Td>
                      <Td display={"flex"} minHeight={"100%"} gap={"10px"}>
                        <MdDelete
                          onClick={() => deleteAnEmployee(employee.id)}
                          cursor={"pointer"}
                          fontSize={"1.4rem"}
                        />
                        <FaEdit cursor={"pointer"} fontSize={"1.3rem"} />{" "}
                      </Td>
                    </Tr>
                  ))
                  
                : filteredEmployees?.map((employee) => {
                   return <Tr key={employee.id}>
                      <Td>{employee.name ? employee.name : "Not Entered"}</Td>
                      <Td>{employee.emailId}</Td>
                      <Td>{employee.position}</Td>
                      <Td display={"flex"} minHeight={"100%"} gap={"10px"}>
                        <MdDelete
                          onClick={() => deleteAnEmployee(employee.id)}
                          cursor={"pointer"}
                          fontSize={"1.4rem"}
                        />
                        <FaEdit cursor={"pointer"} fontSize={"1.3rem"} />{" "}
                      </Td>
                    </Tr>;
                  })}
            </Tbody>
          </Table>
        )}
      </Box>
      <Modal isOpen={isOpen1} onClose={onClose1}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Employee</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <StageForm onStageAdded={onClose1} />
          </ModalBody>
        </ModalContent>
      </Modal>

      <Modal isOpen={isOpen2} onClose={onClose2}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Employee</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{/* <StageForm onStageAdded={onClose2} /> */}</ModalBody>
        </ModalContent>
      </Modal>
    </VStack>
  );
};

export default EmployeeList;
