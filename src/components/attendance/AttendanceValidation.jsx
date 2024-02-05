import React, { useEffect, useState } from "react";
import {
  Button,
  Box,
  Input, 
  useToast,
  Table,
  Thead,
  Tbody,
  Text,
  Flex,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";
import {
  validateAttendance,
  invalidateAttendance,
  getAttendanceByEmployeeId,
} from "../../services/AttendanceService";

const AttendanceValidation = () => {
  const [attendanceId, setAttendanceId] = useState("");
  const [attDetails, setAttDetails] = useState("");

  const toast = useToast();

  const handleValidate = async (id,ValidatorId) => {
    try {
      const res = await validateAttendance(id,ValidatorId);
      console.log(res);
    } catch (error) {
      console.log("Could not validate the attendance of Employer", error);
    }
  };

  const handleInValidate = async (id,ValidatorId) => {
    try {
      const res = await invalidateAttendance(id, ValidatorId);
      console.log(res);
    } catch (error) {
      console.log("Could not Invalidate the attendance of Employer", error);
    }
  };
  const employeeAttendance = async () => {
    const res = await getAttendanceByEmployeeId(attendanceId);
    console.log(res);
    setAttDetails(res[0]);
  }
  return (
    <Box className="changeDir w-100vw" mt={5}  minH={"100vh"} p={4}>
      <Box
        gap={4}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
        className="changeDir"
      >
        <Text fontSize={"1.5rem"} fontWeight={"600"}>
          Attendance By Name
        </Text>
        <Box display={"flex"} alignItems={"end"} gap={4} className="changeDir">
          <Input
            borderRadius={0}
            placeholder="Attendance ID"
            value={attendanceId}
            onChange={(e) => setAttendanceId(e.target.value)}
          />
          <Button
            borderRadius={0}
            colorScheme="red"
            maxW={"max-content"}
            onClick={() => employeeAttendance()}
          >
            get
          </Button>
        </Box>
      </Box>
      {/* <Box display={"flex"} gap={4} mt={4}>
        
      </Box> */}

      <Box overflow={"scroll"} mt={8} px={1} shadow={"md"}>
        <Table variant="simple" minW={"max-content"}>
          <Thead>
            <Tr shadow={"sm"} p={0}>
              <Th py={1}>Employee Name</Th>
              <Th py={1}>Date</Th>
              <Th py={1}>Day</Th>
              <Th py={1}>Clock in</Th>
              <Th py={1}>In Date</Th>
              <Th py={1}>Clock out</Th>
              <Th py={1}>Out Date</Th>
              <Th py={1}>Shift</Th>
              <Th py={1}>Work Type</Th>
              <Th py={1}>Min Hour</Th>
            </Tr>
          </Thead>
          <Tbody>
            {attDetails && attDetails?.map((data) =>{
            <Tr>
              <Td py={1}>{attDetails?.employeeId}</Td>
              <Td py={1}>{new Date(attDetails?.date).toLocaleDateString()}</Td>
              <Td py={1}>
                {new Date(attDetails?.date).toLocaleDateString("en-US", {
                  weekday: "long",
                })}
              </Td>
              <Td py={1}>{attDetails?.checkInTime}</Td>
              <Td py={1}>{attDetails?.checkInDate}</Td>
              <Td py={1}>{attDetails?.checkOutTime}</Td>
              <Td py={1}>{attDetails?.checkOutDate}</Td>
              <Td py={1}>{attDetails?.shift}</Td>
              <Td py={1}>{attDetails?.overTime}</Td>
              <Td py={1}>{attDetails?.minimumHour}</Td>
              <Td display={"flex"} gap={3}>
                {
                  attDetails?.isValidated ?<Button
                  borderRadius={0}
                  colorScheme="red"
                  onClick={()=>handleInValidate(attDetails.id,attDetails.InValidatorId)}
                >
                  Invalidate
                </Button>:<Button
                      borderRadius={0}
                      colorScheme="red"
                      onClick={()=>handleValidate(attDetails.id,attDetails.InValidatorId)}
                    >
                      Validate
                    </Button>
                }
              </Td>
            </Tr>
            })}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default AttendanceValidation;
