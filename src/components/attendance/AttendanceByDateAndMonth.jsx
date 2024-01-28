import React, { useState, useEffect } from "react";
import {
  Box,
  List,
  ListItem,
  Input,
  Button,
  Table,
  Thead,
  Tbody,
  Flex,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";
import {
  getAttendanceByDate,
  getAttendanceByMonth,
} from "../../services/AttendanceService";

const AttendanceByDateAndMonth = () => {
  const [date, setDate] = useState("");
  const [yearMonth, setYearMonth] = useState({ year: "", month: "" });
  const [records, setRecords] = useState([]);
console.log(records)
  const fetchByDate = async () => {
    const data = await getAttendanceByDate(date);
    setRecords(data);
  };

  const fetchByMonth = async () => {
    const { year, month } = yearMonth;
    const data = await getAttendanceByMonth(year, month);
    setRecords(data);
  };

  return (
    <Box className="w-100vw" minH={"100vh"} p={4}>
      <Box>
        <Input
          borderRadius={0}
          type="date"
          onChange={(e) => setDate(e.target.value)}
        />
        <Button mt={2} colorScheme="red" borderRadius={0} onClick={fetchByDate}>
          Fetch by Date
        </Button>
      </Box>
      <Box mt={5}>
        <Box display={"flex"} gap={2}>
          <Input
            borderRadius={0}
            placeholder="Year"
            onChange={(e) =>
              setYearMonth({ ...yearMonth, year: e.target.value })
            }
          />
          <Input
            borderRadius={0}
            placeholder="Month"
            onChange={(e) =>
              setYearMonth({ ...yearMonth, month: e.target.value })
            }
          />
        </Box>
        <Button
          mt={2}
          borderRadius={0}
          colorScheme="red"
          onClick={fetchByMonth}
        >
          Fetch by Month
        </Button>
      </Box>

     <Box mt={6} w={'100%'} overflowX={'scroll'} border={'1px solid lightgray'}>
      <Table variant="simple" minW={"max-content"}>
        <Thead>
          <Tr shadow={"sm"}>
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
          {records?.map((data) =>{
              return<Tr key={data.id}>
                <Td py={1}>{data.employeeId}</Td>
                <Td py={1}>{data.date}</Td>
                <Td py={1}>{data.date}</Td>
                <Td py={1}>{data.checkInTime}</Td>
                <Td py={1}>{data.checkInDate}</Td>
                <Td py={1}>{data.checkOutTime}</Td>
                <Td py={1}>{data.checkOutDate}</Td>
                <Td py={1}>{data.shift}</Td>
                <Td py={1}>{data.overTime}</Td>
                <Td py={1}>{data.minimumHour}</Td>
                <Td display={"flex"} gap={3}>
                  <Button
                    borderRadius={0}
                    colorScheme="blue"
                    onClick={() => {
                      handleValidate(data.id, data.validatorId);
                    }}
                  >
                    Validate
                  </Button>
                </Td>
              </Tr>
           }
          )}
        </Tbody>
      </Table>
      </Box>
    </Box>
  );
};

export default AttendanceByDateAndMonth;
