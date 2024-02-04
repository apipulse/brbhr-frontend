import React, { useEffect } from 'react';
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
    Input,
  } from "@chakra-ui/react";
function AssignedLeaves() {
    const {
        isOpen: isOpen2,
        onOpen: onOpen2,
        onClose: onClose2,
      } = useDisclosure();

      useEffect(()=>{

        const getAssignedLeaves = async()=>{

          try{
            // const res = await getAssignedLeaves(id)
            
          }catch(err){
            console.error(err)
          }
          
        }
        getAssignedLeaves()
      },[])
      
    return (
        <Box minH={"100vh"} className="w-100vw" p={4}>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Text fontSize={"1.5rem"} fontWeight={"600"}>
           Assigned Leaves
          </Text>
          <Box display={"flex"} gap={2} className="changeDir">
            <Input type="text" borderRadius={0} placeholder="Search..." />
  
            <Button borderRadius={0} colorScheme="red">
              + Create
            </Button>
          </Box>
        </Box>
        <Box mb={4}>
          
        </Box>
  
        {/* Implement the logic and UI for Leave Types */}
  
        <Modal isOpen={isOpen2} onClose={onClose2}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add Type</ModalHeader>
            <ModalCloseButton />
            <ModalBody></ModalBody>
          </ModalContent>
        </Modal>
      </Box>
    );
}

export default AssignedLeaves;
