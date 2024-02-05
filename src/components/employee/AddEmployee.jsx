import React, { useState, useContext, useEffect } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  useToast,
  Button,
  Text,
  Flex,
  useMediaQuery,
} from "@chakra-ui/react";
import NoteContext from "../../Context/NoteContext";
import {
  createEmployee,
  updateEmployee,
  getEmployeeById,
} from "../../services/EmployeeService";
const AddEmployee = ({ onAdded, id, setChange, change }) => {
  const toast = useToast();
  const abc = useContext(NoteContext);
  abc.setName("EMPLOYEE");
  console.log(id ? id : "id is empty");
  const [employee, setEmployee] = useState({
    name: "",
    departmentId: "",
    emailId: "",
    position: "",
    empId: "",

    // Add other relevant fields
  });
  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newEmployee = await createEmployee(employee);
      console.log("Employee added:", newEmployee);
      onAdded();
      toast({
        title: "Employee has been added",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setChange(!change);
      // Additional logic after creation
    } catch (error) {
      console.error("Error creating employee:", error);
      toast({
        title: "Error adding new employee",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      // Error handling logic
    }
  };

  if (id) {
    useEffect(()=>{

    
    const seeEmployee = async () => {
      try {
        const res = await getEmployeeById(id);
        console.log(res);
        setEmployee({
          name: res.name,
          departmentId: res.departmentId,
          emailId: res.emailId,
          position: res.position,
          empId: res.empId,
        });
        console.log("Employee's Information has been fetchend");
      } catch (error) {
        console.log("Failed to fetch the Employee's Information", error);
      }
    };
    seeEmployee();
  },[])
  }

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = updateEmployee(id,employee);
      console.log('Employee has been updated',res)
      onAdded();
      toast({
        title: "Employee has been Updated",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setChange(!change);
      // Additional logic after creation
    } catch (error) {
      console.error("Error updating employee:", error);
      toast({
        title: "Error updating new employee",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      // Error handling logic
    }
  };

  
  

  return (
    <Box
      align="center"
      justify="center"
      minHeight={"100vh"}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      w={"100%"}
    >
      <Box w={"100%"}>
        <Text fontSize="2rem" mx={"1rem"} mb={"1rem"}>
          Add Employee
        </Text>
        <Box p={4}>
          <form onSubmit={id?handleUpdate:handleSubmit} style={{ maxWidth: "1000px" }}>
            <FormControl id="name" isRequired>
              <FormLabel>Name</FormLabel>
              <Input name="name" type="text" value={employee.name} onChange={handleChange} />
            </FormControl>
            <FormControl id="email" isRequired mt={4}>
              <FormLabel>Email</FormLabel>
              <Input name="emailId" type="email" value={employee.emailId} onChange={handleChange} />
            </FormControl>

            <FormControl id="position" mt={4}>
              <FormLabel>Position</FormLabel>
              <Input name="position" type="text" value={employee.position} onChange={handleChange} />
            </FormControl>

            <FormControl id="departmentId" mt={4}>
              <FormLabel>Department Id</FormLabel>
              <Input name="departmentId" type="text" value={employee.departmentId} onChange={handleChange} />
            </FormControl>

            <FormControl id="empId" mt={4}>
              <FormLabel>Employee Id</FormLabel>
              <Input name="empId" type="text" value={employee.empId} onChange={handleChange} />
            </FormControl>

            {/* Add other form controls as needed */}
            
           {id?<Button mt={4} borderRadius={0} colorScheme="red" type="submit">
              Update
            </Button>:<Button mt={4} borderRadius={0} colorScheme="red" type="submit">
              Add
            </Button>
            }
            
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default AddEmployee;
