import React, { useEffect, useState } from "react";
import { getLeaveTypes } from "../../services/LeaveService";
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
import AddType from "./AddType";
import { BsThreeDotsVertical } from "react-icons/bs";
function LeaveTypes() {
  const [types, setTypes] = useState();

  const {
    isOpen: isOpen2,
    onOpen: onOpen2,
    onClose: onClose2,
  } = useDisclosure();

  const handleClick = () => {
    console.log("Opening modal to add leave type");
    onOpen2();
  };

  useEffect(() => {
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

  const assignLeave = () => {
    try {
    } catch (err) {
      console.error(err);
    }
  };

  console.log(types);
  return (
    <Box minH={"100vh"} className="w-100vw" mt={4} p={4}>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Text fontSize={"1.5rem"} fontWeight={"600"}>
          Leave Types
        </Text>
        <Box display={"flex"} gap={2} className="changeDir">
          <Input type="text" borderRadius={0} placeholder="Search..." />

          <Button onClick={handleClick} borderRadius={0} colorScheme="red">
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
        {types?.map((type) => {
          return (
            <Box
              key={Math.random()}
              gap={3}
              border={"1px solid lightgray"}
              borderRadius={0}
              p={2}
              h={"100%"}
              w={"20rem"}
              minW={"max-content"}
              display={"flex"}
              justifyContent={"space-between"}
            >
              <Box
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
                borderRadius={"100px"}
                bg={"burlywood"}
                w={"4rem"}
                h={"4rem"}
              >
                <Text
                  textColor={"black"}
                  fontSize={"1.7rem"}
                  fontWeight={"600"}
                >
                  {type?.name.slice(0, 2)}
                </Text>
              </Box>
              <Box
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <Text fontSize={"1.4rem"} fontWeight={600}>
                  {type?.name}
                </Text>
              </Box>
              <BsThreeDotsVertical onClick={() => alignLeave()} />
            </Box>
          );
        })}
      </Box>

      {/* Implement the logic and UI for Leave Types */}

      <Modal isOpen={isOpen2} onClose={onClose2}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Type</ModalHeader>
          <ModalCloseButton />
          <AddType onAdded={onClose2} />
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default LeaveTypes;
