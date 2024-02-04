import React, { useEffect, useState } from "react";
import {
  Button,
  Box,
  Input, 
  useToast,
  FormControl,
  Checkbox,
  Text,
  Alert,
  AlertIcon,
  AlertTitle,
  FormLabel,
} from "@chakra-ui/react";
import {
  addAttendance,
  getAttendanceByEmployeeId,
} from "../../services/AttendanceService";
import { formatDateForInput } from "../../utils/DateUtils"; // Assuming you have a utility function for date formatting

const AttendanceForm = (EmployeeId) => {
  const initialAttendanceState = {
    employeeId: "",
    checkInTime: "",
    checkInDate: "",
    checkOutTime: "",
    checkOutDate: "",
    date: "",
    shift: "",
    workType: "",
    overTime: "",
    minimumHour: "",
    isValidated: false,
    validatedBy: "",
    validatorId: "",
  };
  const [employeeInfo, setEmployeeInfo] = useState();
  const [attendance, setAttendance] = useState({
    employeeId: "",
    checkInTime: "",
    checkInDate: "",
    checkOutTime: "",
    checkOutDate: "",
    date: "",
    shift: "",
    workType: "",
    overTime: "",
    minimumHour: "",
    isValidated: false,
    validatedBy: "",
    validatorId: "",
  });
  const toast = useToast();

  const [abc, setAbc] = useState(EmployeeId);
  console.log(abc.EmployeeId);
  useEffect(() => {
    const employeeAttendance = async () => {
      try {
        const res = await getAttendanceByEmployeeId("123456");
        console.log(res);
        setEmployeeInfo(res[0]);
      } catch (err) {
        console.log(err);
      }
    };
    employeeAttendance();
  },[]);
  useEffect(() => {
    if (employeeInfo) {
      setAttendance({
        employeeId: employeeInfo?.employeeId,
        checkInTime: employeeInfo?.checkInTime,
        checkInDate: employeeInfo?.checkInDate,
        checkOutTime: employeeInfo?.checkOutTime,
        checkOutDate: employeeInfo?.checkOutDate,
        date: employeeInfo?.date,
        shift: employeeInfo?.shift,
        workType: employeeInfo?.workType,
        overTime: employeeInfo?.overTime,
        minimumHour: employeeInfo?.minimumHour,
        isValidated: false,
        validatedBy: employeeInfo?.validatedBy,
        validatorId: employeeInfo?.validatorId,
        // ... other properties
      });
    }

  }, [employeeInfo]);

  console.log(attendance);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === "checkbox" ? checked : value;
    setAttendance({ ...attendance, [name]: fieldValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formattedAttendance = {
        ...attendance,
        checkInDate: formatDateForInput(attendance.checkInDate),
        checkOutDate: formatDateForInput(attendance.checkOutDate),
        date: formatDateForInput(attendance.date),
      };

      await addAttendance(formattedAttendance);
      toast({
        title: "Attendance record added/updated successfully",
        status: "success",
      });
    } catch (error) {
      console.error("Error adding/updating attendance", error);
      toast({
        title: "Error adding/updating attendance",
        description: error.message,
        status: "error",
      });
    }
  };
  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <FormControl mt={4} isRequired>
          <FormLabel>Employee Id</FormLabel>
          <Input
            borderRadius={0}
            //  placeholder="Employee ID"
            name="employeeId"
            value={attendance.employeeId}
            onChange={handleChange}
          />
        </FormControl>
        <Box display={"flex"} gap={3}>
          <FormControl mt={4} isRequired>
            <FormLabel>Check-In Time</FormLabel>
            <Input
              borderRadius={0}
              type="time"
              //  placeholder="Check-In Time"
              name="checkInTime"
              value={attendance.checkInTime}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl mt={4} isRequired>
            <FormLabel>Check-In Date</FormLabel>

            <Input
              borderRadius={0}
              type="date"
              //  placeholder="Check-In Date"
              name="checkInDate"
              value={attendance.checkInDate}
              onChange={handleChange}
            />
          </FormControl>
        </Box>

        <Box display={"flex"} gap={3}>
          <FormControl mt={4} isRequired>
            <FormLabel>Check-Out Time</FormLabel>

            <Input
              borderRadius={0}
              type="time"
              //  placeholder="Check-Out Time"
              name="checkOutTime"
              value={attendance.checkOutTime}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl mt={4} isRequired>
            <FormLabel>Check-Out Date</FormLabel>
            <Input
              borderRadius={0}
              type="date"
              //  placeholder="Check-Out Date"
              name="checkOutDate"
              value={attendance.checkOutDate}
              onChange={handleChange}
            />
          </FormControl>
        </Box>

        <Box display={"flex"} gap={3}>
          <FormControl mt={4} isRequired>
            <FormLabel>Date</FormLabel>
            <Input
              borderRadius={0}
              type="date"
              //  placeholder="Date"
              name="date"
              value={attendance.date}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl mt={4} isRequired>
            <FormLabel>Shift</FormLabel>
            <Input
              borderRadius={0}
              //  placeholder="Shift"
              name="shift"
              value={attendance.shift}
              onChange={handleChange}
            />
          </FormControl>
        </Box>

        <Box display={"flex"} gap={3}>
          <FormControl mt={4} isRequired>
            <FormLabel>Work Type</FormLabel>

            <Input
              borderRadius={0}
              //  placeholder="Work Type"
              name="workType"
              value={attendance.workType}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl mt={4} isRequired>
            <FormLabel>Over Time</FormLabel>
            <Input
              borderRadius={0}
              //  placeholder="Over Time"
              name="overTime"
              value={attendance.overTime}
              onChange={handleChange}
            />
          </FormControl>
        </Box>
        <Box display={"flex"} gap={3}>
          <FormControl mt={4} isRequired>
            <FormLabel>Minimum Hour</FormLabel>
            <Input
              borderRadius={0}
              //  placeholder="Minimum Hour"
              name="minimumHour"
              value={attendance.minimumHour}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl mt={4} isRequired>
            <FormLabel>Validated By</FormLabel>
            <Input
              borderRadius={0}
              //  placeholder="Validated By"
              name="validatedBy"
              value={attendance.validatedBy}
              onChange={handleChange}
            />
          </FormControl>
        </Box>
        <Box display={"flex"} gap={3}>
          <FormControl mt={4} isRequired>
            <FormLabel>Validator Id</FormLabel>
            <Input
              borderRadius={0}
              //  placeholder="Validator ID"
              name="validatorId"
              value={attendance.validatorId}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Is Validated</FormLabel>

            <Checkbox
              isChecked={attendance.isValidated}
              name="isValidated"
              onChange={handleChange}
            />
          </FormControl>
        </Box>

        <Button my={4} colorScheme="red" borderRadius={0} type="submit">
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default AttendanceForm;
