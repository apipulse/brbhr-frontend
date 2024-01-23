import {
  Box,
  Flex,
  Link,
  Heading,
  Spacer,
  useMediaQuery,
} from "@chakra-ui/react";
import NoteContext from "../../Context/NoteContext";
import react, { useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { IoIosNotificationsOutline } from "react-icons/io";
const NavBar = () => {
  const abc = useContext(NoteContext);
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");

  
  return (
    <Box
      bg="white"
      p="2"
      shadow={"md"}
      display={"flex"}
      color="black"
      width="full" // Adjust to take full width of the parent container
      direction={isLargerThan768 ? "row" : "column"}
      alignItems="center"
      justifyContent={"space-between"}
    >
      <Box
        display={"flex"}
        gap={1}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <FaBars /> {abc.name}
      </Box>
      <Box>
        <IoIosNotificationsOutline />
      </Box>
    </Box>
  );
};

export default NavBar;
