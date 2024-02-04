import React, { useEffect, useState } from "react";
import { deleteCompanyLeave, getCompanyLeaves } from "../../services/LeaveService";
import {
  Box,
  List,
  Text,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Input,Thead,
  Table,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";
import AddCompanyLeave from "./AddCompanyLeave";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
function LeaveTypes() {
  const [leaves, setTypes] = useState();
  const [change, setChange] = useState();
  const [id, setId] = useState();
  const {
    isOpen: isOpen2,
    onOpen: onOpen2,
    onClose: onClose2,
  } = useDisclosure();

  useEffect(() => {
    const LeaveType = async () => {
      try {
        const res = await getCompanyLeaves();
        console.log(res)
        setTypes(res);
      } catch (error) {
        console.error(error);
      }
    };
    LeaveType();
  }, [change]);

  const deleteLeave =async(id)=>{
    try{
      const res = await deleteCompanyLeave(id)
      console.log(res)
      setChange(!change)
    }catch(err){
      console.error(err)
    }
  }
  
  return (
    <Box minH={"100vh"} className="w-100vw" mt={4} p={4}>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Text fontSize={"1.5rem"} fontWeight={"600"}>
         Company Leaves
        </Text>
        <Box display={"flex"} gap={2} className="changeDir">
          <Input type="text" borderRadius={0} placeholder="Search..." />
          <Button onClick={() => onOpen2()} borderRadius={0} colorScheme="red">
            + Create
          </Button>
        </Box>
      </Box>
      <Box
        mb={4}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        flexWrap={"wrap"}
        gap={4}
        mt={10}
      >
        <Box
        mt={8}
        shadow={"sm"}
        overflow={"scroll"}
        border={"1px solid lightgray"} w={'100%'}
      >
        <Table minW={"max-content"} variant="simple">
          <Thead>
            <Tr>
              <Th>Based On Week</Th>
              <Th>Based On Week Day</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {leaves?.map((leave) => {
              return (
                <Tr key={leave.id}>
                  <Td>{leave.basedOnWeek} </Td>
                  <Td>{leave.basedOnWeekDay}</Td>
                  <Td display={"flex"} gap={3} >
                    <MdDelete fontSize={"1.3rem"} cursor={"pointer"} onClick={()=>deleteLeave(leave.id)}/>
                    <FaEdit onClick={() =>{ onOpen2()
                    setId(leave.id)}}  cursor={"pointer"} fontSize={"1.3rem"} />
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </Box>
      </Box>
      <Modal isOpen={isOpen2} onClose={onClose2}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Company Leave</ModalHeader>
          <ModalCloseButton />
          <AddCompanyLeave id={id} change={change} setChange={setChange} onAdded={onClose2} />
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default LeaveTypes;
