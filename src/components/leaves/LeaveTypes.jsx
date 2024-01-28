import React, { useEffect, useState } from "react";
import { getLeaveTypes } from "../../services/LeaveService";
import { Box, List, Text,Button } from "@chakra-ui/react";
function LeaveTypes() {
    const [types,setTypes]=useState()
  useEffect(() => {
    const LeaveType = async () => {
      try {
        const res = await getLeaveTypes();
        console.log(res);
        setTypes(res)
      } catch (error) {
        console.error(error);
      }
    };
    LeaveType();
  },[]);
  return (
    <Box minH={'100vh'} className="w-100vw" p={4}>
        <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
      <Text fontSize={'1.5rem'} fontWeight={'600'}>Leave Types</Text>

      <Button borderRadius={0} colorScheme="red">
       + Create
      </Button>
        </Box>
      <Box mb={4} >
        {types?.map(type=>{
            <List>{type}</List>
        })}
      </Box>

      {/* Implement the logic and UI for Leave Types */}
    </Box>
  );
}

export default LeaveTypes;
