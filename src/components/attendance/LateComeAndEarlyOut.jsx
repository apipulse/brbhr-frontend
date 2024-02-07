// import React, { useState, useEffect } from "react";
// import {
//   Table,
//   Thead,
//   Tbody,
//   Tr,
//   Th,
//   Td,
//   TableCaption,
//   Box,
//   Text,
//   useColorModeValue,
// } from "@chakra-ui/react";
// import {
//   getAttendanceByMonth,
//   getAttendanceByEmployeeId,
// } from "../../services/AttendanceService";

// function AttendanceTable(gracePeriod = 15) {
//   const [attendanceData, setAttendanceData] = useState([]);
//   const [monthlyAttendance, setMonthlyAttendance] = useState();
//   const [employeAttendance, setEmployeAttendance] = useState();

//   const employees = [
//     {
//       id: 1,
//       name: "John Doe",
//       arrival:`${employeAttendance?.checkInDate} ${employeAttendance?.checkInTime}:00`,
//       departure:`${employeAttendance?.checkOutDate} ${employeAttendance?.checkOutTime}:00`,
//     },
//     {
//       id: 2,
//       name: "Jane Smith",
//       arrival: "2024-01-28 08:50:00",
//       departure: "2024-01-28 17:20:00",
//     },
//   ];
//   const schedule = {
//     start: `${employeAttendance?.checkInDate} ${employeAttendance?.checkInTime}:00`,
//     end: `${employeAttendance?.checkOutDate} ${employeAttendance?.checkOutTime}:00`,
//   };
//   console.log(
//     `${employeAttendance?.checkInDate} ${employeAttendance?.checkInTime}:00`
//   );
//   useEffect(() => {
//     const employeeAttendance = async () => {
//       const res = await getAttendanceByEmployeeId("Hamza");
//       setEmployeAttendance(res[0]);
//     };
//     employeeAttendance();

//     const year = new Date().getFullYear();
//     const currentMonth = new Date().getMonth() + 1;
//     const fetchByMonth = async () => {
//       const data = await getAttendanceByMonth(year, currentMonth);
//       setMonthlyAttendance(data);
//       console.log(data);
//     };
//     fetchByMonth();
//   }, []);

//   useEffect(() => {
//     const calculateAttendance = () => {
//       const data = employees.map((employee) => {
//         const { arrival, departure } = employee;
//         const late = Math.max(0, arrival - (schedule.start + gracePeriod));
//         const early = Math.max(0, schedule.end - (departure + gracePeriod));
//         return { ...employee, late, early };
//       });
//       setAttendanceData(data);
//       console.log(data);
//     };

//     calculateAttendance();
//   }, []);

//   const bg = useColorModeValue("gray.50", "gray.800");

//   return (
//     <Box p={4} minH={"100vh"} bg={bg}>
//       <Box>
//         <Text fontWeight={600} m fontSize={"1.5rem"}>
//           Late Come Early Out
//         </Text>
//       </Box>
//       <Box rounded="lg" shadow="md">
//         {/* <Table variant="simple">
//       <TableCaption>Attendance Report</TableCaption>
//         <Thead>
//           <Tr>
//             <Th>Name</Th>
//             <Th>Arrival</Th>
//             <Th>Departure</Th>
//             <Th>Lateness (min)</Th>
//             <Th>Early Departure (min)</Th>
//           </Tr>
//         </Thead>
//         <Tbody>
//           {attendanceData?.map((employee) => (
//             <Tr key={employee.id}>
//               <Td>{employee.name}</Td>
//               <Td>{employee.arrival}</Td>
//               <Td>{employee.departure}</Td>
//               <Td>
//                 {employee.late > 0 ? (
//                   <Text color="red">{employee.late}</Text>
//                 ) : (
//                   employee.late
//                 )}
//               </Td>
//               <Td>
//                 {employee.early > 0 ? (
//                   <Text color="blue">{employee.early}</Text>
//                 ) : (
//                   employee.early
//                 )}
//               </Td>
//             </Tr>
//           ))}
//         </Tbody>
//       </Table> */}
//       </Box>
//     </Box>
//   );
// }

// export default AttendanceTable;

// import { useState, useEffect } from "react";
import {
  Table,
  Td,
  Th,
  Tr,
  Box,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  getAttendanceByMonth,
} from "../../services/AttendanceService";
import { useState, useEffect } from 'react';

const LateComeAndEarlyOut = () => {
  const [attendances, setAttendances] = useState([]);

  const calculateLateness = (clockIn, scheduleStart) => {
    console.log(clockIn, scheduleStart)
    if (!clockIn || !scheduleStart) {
      return null; // Handle missing or invalid inputs
    }

    // Convert clockIn and scheduleStart to Date objects with time zone awareness
    const clockInDate = new Date(clockIn).toLocaleTimeString;
    const scheduleStartDate = new Date(scheduleStart).toLocaleTimeString;

    // Ensure UTC conversion if time zones differ
    if (clockInDate.getTimezoneOffset() !== scheduleStartDate.getTimezoneOffset()) {
      console.log(clockInDate,scheduleStartDate)
      clockInDate.setUTCMinutes(clockInDate.getMinutes() + clockInDate.getTimezoneOffset());
      scheduleStartDate.setUTCMinutes(scheduleStartDate.getMinutes() + scheduleStartDate.getTimezoneOffset());
    }

    if (clockInDate > scheduleStartDate) {
      console.log(clockInDaten)
      const minutesLate = Math.floor((clockInDate - scheduleStartDate) / (1000 * 60));
      console.log(`Late by ${minutesLate} minutes`)
      return `Late by ${minutesLate} minutes`;
    }
    return null;
  };

  useEffect(() => {
    const fetchByMonth = async () => {
      const year = new Date().getFullYear();
      const currentMonth = new Date().getMonth();
      const data = await getAttendanceByMonth(year, currentMonth); // Replace with your API call
      setAttendances(data);
      console.log(data)
    };

    fetchByMonth();
  }, []);

  return (
    <Box minH={"100vh"}>
      {attendances.map((attendance) => (
        <div key={attendance.id}>
          {/* {calculateLateness(attendance.checkInTime, '07:15')} */}
        </div>
      ))}
    </Box>
  );
};

export default LateComeAndEarlyOut;
