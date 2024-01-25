// import React, { useState } from 'react';
// import { Button, Box, Input, useToast } from '@chakra-ui/react';
// import { addAttendance } from '../../services/AttendanceService';
// import { formatDateForInput } from '../../utils/DateUtils'; // Assuming you have a utility function for date formatting

// const AddUpdateAttendance = () => {
//   const initialAttendanceState = {
//     employeeId: '',
//     checkInTime: '',
//     checkInDate: '',
//     checkOutTime: '',
//     checkOutDate: '',
//     date: '',
//     shift: '',
//     workType: '',
//     overTime: '',
//     minimumHour: '',
//     isValidated: false,
//     validatedBy: '',
//     validatorId: ''
//   };

//   const [attendance, setAttendance] = useState(initialAttendanceState);
//   const toast = useToast();

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     const fieldValue = type === 'checkbox' ? checked : value;
//     setAttendance({ ...attendance, [name]: fieldValue });
//   };

//   const handleSubmit = async () => {
//     try {
//       const formattedAttendance = {
//         ...attendance,
//         checkInDate: formatDateForInput(attendance.checkInDate),
//         checkOutDate: formatDateForInput(attendance.checkOutDate),
//         date: formatDateForInput(attendance.date)
//       };

//       await addAttendance(formattedAttendance);
//       toast({ title: "Attendance record added/updated successfully", status: "success" });
//     } catch (error) {
//       console.error("Error adding/updating attendance", error);
//       toast({ title: "Error adding/updating attendance", description: error.message, status: "error" });
//     }
//   };

//   return (
//     <Box>
//       <Input placeholder="Employee ID" name="employeeId" value={attendance.employeeId} onChange={handleChange} />
//       <Input type="time" placeholder="Check-In Time" name="checkInTime" value={attendance.checkInTime} onChange={handleChange} />
//       <Input type="date" placeholder="Check-In Date" name="checkInDate" value={attendance.checkInDate} onChange={handleChange} />
//       <Input type="time" placeholder="Check-Out Time" name="checkOutTime" value={attendance.checkOutTime} onChange={handleChange} />
//       <Input type="date" placeholder="Check-Out Date" name="checkOutDate" value={attendance.checkOutDate} onChange={handleChange} />
//       <Input type="date" placeholder="Date" name="date" value={attendance.date} onChange={handleChange} />
//       <Input placeholder="Shift" name="shift" value={attendance.shift} onChange={handleChange} />
//       <Input placeholder="Work Type" name="workType" value={attendance.workType} onChange={handleChange} />
//       <Input placeholder="Over Time" name="overTime" value={attendance.overTime} onChange={handleChange} />
//       <Input placeholder="Minimum Hour" name="minimumHour" value={attendance.minimumHour} onChange={handleChange} />
//       <Input type="checkbox" name="isValidated" checked={attendance.isValidated} onChange={handleChange} />
//       <Input placeholder="Validated By" name="validatedBy" value={attendance.validatedBy} onChange={handleChange} />
//       <Input placeholder="Validator ID" name="validatorId" value={attendance.validatorId} onChange={handleChange} />
//       <Button onClick={handleSubmit}>Submit</Button>
//     </Box>
//   );
// };

// export default AddUpdateAttendance;











import React, { useState } from "react";
import {
  Button,
  Box,
  Input,
  useToast,
  FormControl,
  Text,
  FormLabel,
} from "@chakra-ui/react";
import { addAttendance } from "../../services/AttendanceService";
import { formatDateForInput } from "../../utils/DateUtils"; // Assuming you have a utility function for date formatting

const AddUpdateAttendance = () => {
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

  const [attendance, setAttendance] = useState(initialAttendanceState);
  const toast = useToast();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === "checkbox" ? checked : value;
    setAttendance({ ...attendance, [name]: fieldValue });
  };

  const handleSubmit = async () => {
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
    <Box p={4}>
      <Text fontWeight={"bold"} fontSize={"1.3rem"}>
        Add Attendance
      </Text>
      <Box>
        <FormControl mt={4}>
          <FormLabel>Employee Id</FormLabel>

          <Input
            placeholder="Employee ID"
            name="employeeId"
            value={attendance.employeeId}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>Check-In Time</FormLabel>
          <Input
            type="time"
            placeholder="Check-In Time"
            name="checkInTime"
            value={attendance.checkInTime}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>Check-In Date</FormLabel>

          <Input
            type="date"
            placeholder="Check-In Date"
            name="checkInDate"
            value={attendance.checkInDate}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>Check-Out Time</FormLabel>

          <Input
            type="time"
            placeholder="Check-Out Time"
            name="checkOutTime"
            value={attendance.checkOutTime}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>Check-Out Date</FormLabel>
          <Input
            type="date"
            placeholder="Check-Out Date"
            name="checkOutDate"
            value={attendance.checkOutDate}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>Date</FormLabel>
          <Input
            type="date"
            placeholder="Date"
            name="date"
            value={attendance.date}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>Shift</FormLabel>
          <Input
            placeholder="Shift"
            name="shift"
            value={attendance.shift}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>Work Type</FormLabel>

          <Input
            placeholder="Work Type"
            name="workType"
            value={attendance.workType}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>Over Time</FormLabel>
          <Input
            placeholder="Over Time"
            name="overTime"
            value={attendance.overTime}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>Minimum Hour</FormLabel>
          <Input
            placeholder="Minimum Hour"
            name="minimumHour"
            value={attendance.minimumHour}
            onChange={handleChange}
          />
        </FormControl>

        {/* <FormControl mt={4}>
          <FormLabel>Is Validated</FormLabel>
          <Input
            type="checkbox"
            name="isValidated"
            checked={attendance.isValidated}
            onChange={handleChange}
          />
        </FormControl> */}
        <FormControl mt={4}>
          <FormLabel>Validated By</FormLabel>
          <Input
            placeholder="Validated By"
            name="validatedBy"
            value={attendance.validatedBy}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>Validator Id</FormLabel>
          <Input
            placeholder="Validator ID"
            name="validatorId"
            value={attendance.validatorId}
            onChange={handleChange}
          />
        </FormControl>
        <Button
          mt={4}
          colorScheme="red"
          borderRadius={0}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default AddUpdateAttendance;
