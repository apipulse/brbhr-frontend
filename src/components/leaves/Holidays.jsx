import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { deleteHoliday, getMyLeaves } from "../../services/LeaveService";
import {
  Box,
  Input,
  Button,
  Text,
  useToast,
  TabList,
  Thead,
  Table,
  Tbody,
  Tr,
  Th,
  Td,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
} from "@chakra-ui/react";
import { format } from "date-fns";
import AddHoliday from "./AddHoliday";
import { getHolidays } from "../../services/LeaveService";
function MyLeaves() {
  const toast = useToast();
  const [search, setSearch] = useState();
  const [leaves, setLeaves] = useState();
  const [change, setChange] = useState(false);
  const [id, setId] = useState(null);

  const {
    isOpen: isOpen2,
    onOpen: onOpen2,
    onClose: onClose2,
  } = useDisclosure();
  const deletHoliday = async (id) => {
    try {
      const res = await deleteHoliday(id);
      console.log(res);
      toast({
        title: "Succes",
        description: "Holiday has been deleted.",
        status: "success", // Options: 'info', 'warning', 'error', 'success'
        isClosable: true,
        duration: 3000,
      });
      setChange(84);
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Error deleteing Holiday.",
        status: "error", // Options: 'info', 'warning', 'error', 'success'
        isClosable: true,
        duration: 3000,
      });
    }
  };
  useEffect(() => {
    const holidays = async () => {
      try {
        const res = await getHolidays();
        console.log(res);
        setLeaves(res);
      } catch (error) {
        console.error(error);
      }
    };
    holidays();
  }, [change]);

  return (
    <Box minH={"100vh"} mt={4} className="w-100vw" p={4}>
      <Box display={"flex"} my={4} justifyContent={"space-between"}>
        <Text fontWeight={"600"} fontSize={"1.4rem"}>
          Holidays
        </Text>
        <Box display={"flex"} gap={2}>
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Empoyee Id"
            type="text"
            borderRadius={0}
          />
          <Button colorScheme="red" onClick={() => onOpen2()} borderRadius={0}>
            + Create
          </Button>
        </Box>
      </Box>
      <Box
        onClick={() => MyLeaves()}
        mt={8}
        shadow={"sm"}
        overflow={"scroll"}
        border={"1px solid lightgray"}
      >
        <Table minW={"max-content"} variant="simple">
          <Thead>
            <Tr>
              <Th>Holiday</Th>
              <Th>Start Date</Th>
              <Th>End Date</Th>
              <Th>Recurring</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {leaves?.map((leave) => {
              return (
                <Tr key={leave.id}>
                  <Td>{leave.holidayName} </Td>
                  <Td>{leave.startDate}</Td>
                  <Td>{leave.endDate}</Td>
                  <Td>{leave.recurring.toString()}</Td>
                  <Td display={"flex"} gap={3}>
                    <MdDelete
                      fontSize={"1.3rem"}
                      cursor={"pointer"}
                      onClick={() => deletHoliday(leave.id)}
                    />
                    <FaEdit
                      onClick={() => {
                        onOpen2();
                        setId(leave.id);
                      }}
                      cursor={"pointer"}
                      fontSize={"1.3rem"}
                    />
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </Box>

      <Modal isOpen={isOpen2} onClose={onClose2}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Holiday</ModalHeader>
          <ModalCloseButton />
          <AddHoliday id={id} setChange={setChange} onAdded={onClose2} />
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default MyLeaves;
