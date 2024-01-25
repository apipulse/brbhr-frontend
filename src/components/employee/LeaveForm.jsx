import React, { useState, useEffect } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Select,
  Flex,
  Text,
} from "@chakra-ui/react";
import { getEmployees } from "../../services/EmployeeService";
import { applyForLeave, updateLeave } from "../../services/LeaveService";

const LeaveForm = () => {
  const [leaveData, setLeaveData] = useState({
    employee: "",
    type: "",
    startDate: "",
    endDate: "",
    reason: "",
    status: "pending",
    // ...other relevant fields
  });
  const [employees, setEmployees] = useState();
  const [id, setId] = useState(null);

  console.log(leaveData);
  console.log(id);

  console.log(employees);

  //   const getId = () => {
  //     const employeeId = employees.find(
  //       (employee) => employee.name === leaveData.employee
  //     ).id;
  //     setId(employeeId);
  //     console.log(employeeId);
  //   };

  useEffect(() => {
    // if (isEditing && leave) {
    //   setLeaveData({ ...leave });
    // }

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

  useEffect(() => {}, []);

  const handleChange = (e) => {
    setLeaveData({ ...leaveData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await applyForLeave(leaveData);
      console.log("Leave Response:", response);
      console.log(id);
      // Handle success (e.g., display success message, redirect)
    } catch (error) {
      console.error("Error submitting leave:", error);
      // Handle error (e.g., display error message)
    }
  };
  return (
    <Box p={4}>
      <Text
        mb={"10px"}
        textAlign={"left"}
        pb={"10px"}
        fontSize={"1.5rem"}
        fontWeight={600}
      >
        Apply for leave
      </Text>

      <form onSubmit={handleSubmit}>
        <FormControl id="employee" isRequired>
          <FormLabel>Employee</FormLabel>
          <Select
            name="employee"
            onChange={handleChange}
            value={leaveData.employee}
          >
            {/* <option value={"All"}>All</option> */}
            {employees?.map((employee) => {
              return (
                <option key={employee.name} value={employee?.name}>
                  {employee?.name}
                </option>
              );
            })}
          </Select>
        </FormControl>
        <FormControl mt={4} id="type" isRequired>
          <FormLabel>Type</FormLabel>
          <Select name="type" onChange={handleChange} value={leaveData.type}>
            <option value="annual">Annual</option>
            <option value="sick">Sick</option>
            <option value="other">Other</option>
            {/* Add other leave types */}
          </Select>
        </FormControl>
        <FormControl mt={4} id="startDate" isRequired>
          <FormLabel>Start Date</FormLabel>
          <Input
            name="startDate"
            type="date"
            onChange={handleChange}
            value={leaveData.startDate}
          />
        </FormControl>
        <FormControl id="endDate" isRequired mt={4}>
          <FormLabel>End Date</FormLabel>
          <Input
            name="endDate"
            type="date"
            onChange={handleChange}
            value={leaveData.endDate}
          />
        </FormControl>
        <FormControl id="reason" isRequired mt={4}>
          <FormLabel>Reason</FormLabel>
          <Input
            name="reason"
            type="text"
            onChange={handleChange}
            value={leaveData.reason}
          />
        </FormControl>
        {/* Add other form controls as needed */}
        <Button mt={4} borderRadius={0} colorScheme="red" type="submit">
          Apply for Leave
        </Button>
      </form>
    </Box>
  );
};

export default LeaveForm;
