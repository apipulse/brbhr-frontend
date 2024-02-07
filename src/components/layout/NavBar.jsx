import {
  Box,
  Flex,
  Link,
  Heading,
  Spacer,
  Drawer,
  useToast,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Text,
  DrawerBody,
  DrawerCloseButton,
  Button,
  useDisclosure,
  useMediaQuery,
  calc,
  Input,
} from "@chakra-ui/react";
import NoteContext from "../../Context/NoteContext";
import SideBar from "../layout/SideBar";
import react, { useContext, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { IoIosNotificationsOutline } from "react-icons/io";
import { checkIn, checkOut } from "../../services/AttendanceService";
const NavBar = () => {
  const { isOpen: isOpen1, onOpen: onOpen1, onClose: onClose1 } = useDisclosure();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [employeeId, setEmployeeId] = useState();
  const toast = useToast();

  const abc = useContext(NoteContext);
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");

  const handleCheckIn = async () => {
    console.log('check In button has been clicked',employeeId)

    try {
      await checkIn(employeeId);
      setIsCheckedIn(true);
      toast({
        title: "Checked In",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to check in",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleCheckOut = async () => {
    console.log('check Out button has been clicked',employeeId)
    try {
      await checkOut(employeeId);
      setIsCheckedIn(false);
      toast({
        title: "Checked Out",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to check out",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      bg="white"
      p="2"
      shadow={"md"}
      display={"flex"}
      color="black"
      minWidth="100%"
      direction={isLargerThan768 ? "row" : "column"}
      alignItems="center"
      justifyContent={"space-between"}
    >
      <Box
        display={"flex"}
        gap={3}
        alignItems={"center"}
        justifyContent={"center"}
        px={3}
      >
        {" "}
        <Drawer
          isOpen={isOpen}
          onClose={onClose}
          placement="left"
          width="200px"
        >
          <DrawerOverlay />
          <DrawerContent maxWidth="230px" bg={"#1c1c1b"}>
            <DrawerCloseButton color={"white"} />
            <SideBar />
          </DrawerContent>
        </Drawer>
        <FaBars
          className="btnDisable"
          cursor={"pointer"}
          onClick={onOpen}
          fontSize={"1.5rem"}
        />{" "}
        {abc.name}
      </Box>
      <Box alignItems={"center"} display={"flex"} gap={4}>
        <Box textAlign="center" display={"flex"}>
          {!isCheckedIn ? (
            <Button
              className="btn"
              color={"green"}
              title="You are currently checked out."
              borderRadius={0}
              bg={"transparent"}
              border={"1px solid green"}
              // onClick={handleCheckIn}
              onClick={()=>onOpen1()}
            >
              Check In
            </Button>
          ) : (
            <Button
              ml={4}
              // colorScheme="red"
              color={"red"}
              title="You are currently checked in."
              border={"1px solid red"}
              borderRadius={0}
              // onClick={handleCheckOut}
              onClick={()=>onOpen1()}
              bg={"transparent"}
              // isDisabled={!isCheckedIn}
            >
              Check Out
            </Button>
          )}
        </Box>
        <IoIosNotificationsOutline cursor={"pointer"} fontSize={"2rem"} />
      </Box>

      <Modal isOpen={isOpen1} onClose={onClose1}>
        <ModalOverlay />
        <ModalContent p={4}>
          <ModalHeader >Employee Id</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              type="text"
              onChange={(e) => setEmployeeId(e.target.value)}
              borderRadius={0} mb={4}
            />
            {!isCheckedIn ? (
              <Button
                color={"green"}
                title="You are currently checked out."
                borderRadius={0}
                bg={"transparent"}
                border={"1px solid green"}
                onClick={handleCheckIn}
              >
                Check In
              </Button>
            ) : (
              <Button
                color={"red"}
                title="You are currently checked in."
                border={"1px solid red"}
                borderRadius={0}
                onClick={handleCheckOut}
                bg={"transparent"}
              >
                Check Out
              </Button>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default NavBar;
