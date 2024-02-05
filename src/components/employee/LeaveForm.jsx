import React, { useState, useEffect } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  useToast,
  Input,
  Button,
  Select,
  Flex,
  Text,
} from "@chakra-ui/react";
import { getEmployees } from "../../services/EmployeeService";
import {
  applyForLeave,
  updateLeave,
  getLeavesByEmployee,
  getLeaveTypes,
} from "../../services/LeaveService";

const LeaveForm = ({ onAdded, change, setChange, leaveId }) => {
  const [leaveData, setLeaveData] = useState({
    type: "Annual",
    startDate: "",
    endDate: "",
    reason: "",
    noOfDays: 0,
  });
  console.log(leaveData);
  const toast = useToast();
  const [employees, setEmployees] = useState();
  const [id, setId] = useState();
  const [types, setTypes] = useState();

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

    const LeaveType = async () => {
      try {
        const res = await getLeaveTypes();
        setTypes(res);
      } catch (error) {
        console.error(error);
      }
    };
    LeaveType();
  }, []);

  useEffect(() => {
    const getLeaveData = async() => {
      try {
        const res = await getLeavesByEmployee(leaveId);
        console.log(res);
      } catch (error) {
        console.error("could not fetch the leaves by employee", error);
      }
    }
    if (leaveId) {
      getLeaveData();
    };
  }, []);

  const handleChange = (e) => {
    setLeaveData({ ...leaveData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await applyForLeave(leaveId, leaveData);
      console.log("Leave request has been sent", response);
      toast({
        title: "Succes",
        description: "Leave Request submitted",
        status: "success", // Options: 'info', 'warning', 'error', 'success'
        isClosable: true,
        duration: 3000,
      });
      onAdded();
      // setChange(!change);
    } catch (error) {
      console.error("Error submitting leave:", error);
      toast({
        title: "Error",
        description: "Error Submiting Application",
        status: "error", // Options: 'info', 'warning', 'error', 'success'
        isClosable: true,
        duration: 3000,
      });
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await updateLeave(id, leaveData);
      console.log("Leave request has updated", response);
      toast({
        title: "Succes",
        description: "Request updated",
        status: "success", // Options: 'info', 'warning', 'error', 'success'
        isClosable: true,
        duration: 3000,
      });
      onAdded();
      // setChange(!change);
    } catch (error) {
      console.error("Error updating leave:", error);
      toast({
        title: "Error",
        description: "Error updating Application",
        status: "error", // Options: 'info', 'warning', 'error', 'success'
        isClosable: true,
        duration: 3000,
      });
    }
  };
  console.log(id);
  return (
    <Box
      p={4}
      minHeight={"100vh"}
      w={"100%"}
      display={"flex"}
      justifyContent={"center"}
    >
      <Box p={4} maxW={"1200px"} w={"100%"} minW={"290px"} shadow={"sm"}>
        <Text
          mb={"10px"}
          textAlign={"left"}
          pb={"10px"}
          fontSize={"1.5rem"}
          fontWeight={600}
        >
          Apply for leave
        </Text>

        <form onSubmit={id?handleUpdate:handleSubmit}>
          <FormControl id="employee" isRequired>
            <FormLabel>Employee</FormLabel>
            <Select
              placeholder="--- Select Employee ---"
              name="employee"
              borderRadius={0}
              onChange={(a) => setId(a.target.value)}
              value={id}
            >
              {/* <option value={"All"}>All</option> */}
              {employees?.map((employee, index) => {
                return (
                  <option key={employee.name} value={employee?.id}>
                    {employee?.name}
                  </option>
                );
              })}
            </Select>
          </FormControl>
          <FormControl mt={4} id="type" isRequired>
            <FormLabel>Type</FormLabel>
            <Select
              name="type"
              borderRadius={0}
              placeholder="--- Select Type ---"
              onChange={handleChange}
              value={leaveData.type}
            >
              {types?.map((type) => {
                return (
                  <option key={Math.random()} value={type.name}>
                    {type.name}
                  </option>
                );
              })}
            </Select>
          </FormControl>
          <FormControl mt={4} id="startDate" isRequired>
            <FormLabel>Number of days</FormLabel>
            <Input
              borderRadius={0}
              name="noOfDays"
              type="number"
              onChange={handleChange}
              value={leaveData.noOfDays}
            />
          </FormControl>
          <FormControl id="endDate" isRequired mt={4}>
            <FormLabel>Start Date</FormLabel>
            <Input
              borderRadius={0}
              name="startDate"
              type="date"
              onChange={handleChange}
              value={leaveData.startDate}
            />
          </FormControl>
          <FormControl id="endDate" isRequired mt={4}>
            <FormLabel>End Date</FormLabel>
            <Input
              borderRadius={0}
              name="endDate"
              type="date"
              onChange={handleChange}
              value={leaveData.endDate}
            />
          </FormControl>
          <FormControl id="reason" isRequired mt={4}>
            <FormLabel>Reason</FormLabel>
            <Input
              borderRadius={0}
              name="reason"
              type="text"
              onChange={handleChange}
              value={leaveData.reason}
            />
          </FormControl>
          <Button mt={4} borderRadius={0} colorScheme="red" type="submit">
           {id?'Update':'Apply'}
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default LeaveForm;
