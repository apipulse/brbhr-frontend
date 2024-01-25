import {
  Box,
  Flex,
  Link,
  Heading,
  Spacer,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerCloseButton,
  Button,
  useDisclosure,
  useMediaQuery,
  calc,
} from "@chakra-ui/react";
import NoteContext from "../../Context/NoteContext";
import SideBar from "../layout/SideBar";
import react, { useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { IoIosNotificationsOutline } from "react-icons/io";
const NavBar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const abc = useContext(NoteContext);
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");

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
          <DrawerContent maxWidth="230px" bg={'#1c1c1b'}>
            <DrawerCloseButton color={'white'} />
            <SideBar />
          </DrawerContent>
        </Drawer>
        <FaBars className="btnDisable" cursor={"pointer"} onClick={onOpen} fontSize={"1.5rem"} />{" "}
        {abc.name}
      </Box>
      <Box>
        <IoIosNotificationsOutline fontSize={'1.5rem'} />
      </Box>
    </Box>
  );
};

export default NavBar;
