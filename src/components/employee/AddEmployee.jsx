import React, { useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Flex,
  useMediaQuery,
} from "@chakra-ui/react";
import { createEmployee } from "../../services/EmployeeService";

const AddEmployee = () => {
  const [employee, setEmployee] = useState({
    name: "",
    emailId: "",
    position: "",
    // Add other relevant fields
  });

  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newEmployee = await createEmployee(employee);
      console.log("Employee added:", newEmployee);
      // Additional logic after creation
    } catch (error) {
      console.error("Error creating employee:", error);
      // Error handling logic
    }
  };

  return (
    <Box
      align="center"
      justify="center"
      minHeight={isLargerThan768 ? "100vh" : "auto"}
    >
      <Text
        fontSize="2rem"
        mx={"1rem"}
        mb={"1rem"}
        borderBottom={"1px solid gray"}
        fontWeight="bold"
      >
        Add Employee
      </Text>
      <Box p={4} width={isLargerThan768 ? "50%" : "90%"}>
        <form onSubmit={handleSubmit} style={{ maxWidth: "1000px" }}>
          <FormControl id="name" isRequired>
            <FormLabel>Name</FormLabel>
            <Input name="name" type="text" onChange={handleChange} />
          </FormControl>
          <FormControl id="email" isRequired mt={4}>
            <FormLabel>Email</FormLabel>
            <Input name="emailId" type="email" onChange={handleChange} />
          </FormControl>
          <FormControl id="position" mt={4}>
            <FormLabel>Position</FormLabel>
            <Input name="position" type="text" onChange={handleChange} />
          </FormControl>
          {/* Add other form controls as needed */}
          <Button mt={4} colorScheme="blue" type="submit">
            Add Employee
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default AddEmployee;
