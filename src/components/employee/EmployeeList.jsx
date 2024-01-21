import React, { useState, useEffect } from "react";
import { getEmployees } from "../../services/EmployeeService";
import {
  Box,
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
import StageForm from "./AddEmployeeForm";
const EmployeeList = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [employees, setEmployees] = useState([]);
//   const [isLargerThan768] = useMediaQuery("(min-width: 768px)");
  const [selectedJobPostingId, setSelectedJobPostingId] = useState(null);
  useEffect(() => {
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

  const handleAddStageClick = (jobPostingId) => {
    console.log("Opening modal for job posting ID:", jobPostingId);
    setSelectedJobPostingId(jobPostingId);
    onOpen();
  };

  console.log(employees);
  return (
    <VStack spacing={4}>
      <Flex p={2} width={"100%"} justifyContent={"space-between"}>
        <Text fontWeight={"bold"} fontSize={"1.5rem"} textAlign={"left"}>
          All Employees
        </Text>
        <Button
          marginBottom={"1rem"}
          colorScheme="blue"
          onClick={() => handleAddStageClick()}
        >
          + Add Employee
        </Button>
      </Flex>
      <Table variant="striped" colorScheme="teal">
        <Thead>
          <Tr>
            <Th>Employe Name</Th>
            <Th>Email</Th>
            <Th>Postion</Th>
          </Tr>
        </Thead>
        <Tbody>
          {employees.map((employee) => (
            <Tr key={employee.id}>
              <Td>{employee.name ? employee.name : "Not Entered"}</Td>
              <Td>{employee.emailId}</Td>
              <Td>{employee.position}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Employee</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <StageForm onStageAdded={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </VStack>
  );
};

export default EmployeeList;
