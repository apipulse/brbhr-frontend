import React, { useEffect, useState } from "react";

import { getMyLeaveRequests, getMyLeaves } from "../../services/LeaveService";
import { Box, Input, Text,Table,
  Thead,
  TabList,
  Tbody,
  Tr,Button,
  Th,
  Td, } from "@chakra-ui/react";
import { format } from "date-fns";
function MyLeaveRequests() {
  const [id, setId] = useState('');
  const [leaves, setLeaves] = useState([]);
useEffect(()=>{
},[])

  const MyLeves = async (e) => {
    e.preventDefault()
    try {
      const res = await getMyLeaveRequests(id);
      console.log(res);
      setLeaves(res)
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box minH={"100vh"} mt={4} className="w-100vw" p={4}>
      <Box
        className="changeDir"
        display={"flex"}
        w={"100%"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Text fontWeight={"600"} fontSize={"1.4rem"}>
          My Leave Requests
        </Text>
        <form
          onSubmit={MyLeves}
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: ".75rem",
            justifyContent: "space-between",
            gap: "1rem",
          }}
        >
          <Input
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder="Name"
            type="text"
            borderRadius={0}
          />
          <Button colorScheme="red" borderRadius={0} type="submit">
            Submit
          </Button>
        </form>
      </Box>
      <Box mt={4} shadow={"sm"} overflow={'scroll'} border={'1px solid lightgray'}>
        <Table minW={'max-content'} variant="simple" >
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Start Date</Th>
              <Th>End Date</Th>
              <Th>Type</Th>
              <Th>Status</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {leaves?.map((leave) =>
            (
                <Tr key={Math.random()}>
                  <Td>{leave.employeeId} </Td>
                  <Td>{format(new Date(leave.startDate).toLocaleDateString(),"MMMM dd, yyyy")}</Td>
                  <Td>{format(new Date(leave.endDate).toLocaleDateString(),"MMMM dd, yyyy")}</Td>
                  <Td>{leave.type}</Td>
                  <Td>{leave.status?leave.status:'Pending'}</Td>
                  <Td></Td>
                </Tr>
              )
            )}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
}

export default MyLeaveRequests;
