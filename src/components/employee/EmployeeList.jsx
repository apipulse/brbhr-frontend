import React, { useState, useEffect, useContext } from "react";
import {
  getEmployees,
  updateEmployee,
  deleteEmployee,
  getEmployeeById,
} from "../../services/EmployeeService";
import {
  Box,
  Input,
  Flex,
  Text,
  useMediaQuery,
  Table,
  Thead,
  Modal,
  Tbody,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
  ModalContent,
  ModalOverlay,
  Tr,
  Th,
  useDisclosure,
  Td,
  VStack,
  Button,
  useToast,
} from "@chakra-ui/react";
import { randomColor } from "@chakra-ui/theme-tools";
import { BsThreeDotsVertical } from "react-icons/bs";
import NoteContext from "../../Context/NoteContext";

import { MdOutlineDashboardCustomize } from "react-icons/md";
import { FaList } from "react-icons/fa6";
import StageForm from "./AddEmployee";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
const EmployeeList = () => {
  const abc = useContext(NoteContext);
  const toast = useToast();
  const {
    isOpen: isOpen1,
    onOpen: onOpen1,
    onClose: onClose1,
  } = useDisclosure();
  const {
    isOpen: isOpen2,
    onOpen: onOpen2,
    onClose: onClose2,
  } = useDisclosure();
  const [employees, setEmployees] = useState([]);
  const [employeeInfo, setEmployeeInfo] = useState();
  const [listview, setListView] = useState(true);
  const [searchQuery, SetSearchQuery] = useState();
  const [id, setId] = useState(null);
  const [change, setChange] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedJobPostingId, setSelectedJobPostingId] = useState(null);
  useEffect(() => {
    abc.setName("EMPLOYEE");

    const fetchEmployees = async () => {
      try {
        const data = await getEmployees();
        setEmployees(data);
      } catch (error) {
        console.error("Failed to fetch employees:", error);
      }
    };
    fetchEmployees();
  }, [change]);

  const filteredEmployees = employees?.filter((employee) => {
    return employee?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase());
  });

  const seeEmployee = async (id) => {
    onOpen2();
    console.log(id);
    try {
      const res = await getEmployeeById(id);
      console.log(res);
      setEmployeeInfo(res);
      console.log("Employee's Information has been fetchend");
    } catch (error) {
      console.log("Failed to fetch the Employee's Information", error);
    }
  };

  console.log(searchQuery);
  const deleteAnEmployee = async (id) => {
    try {
      const response = await deleteEmployee(id);
      console.log("Employee has been deleted", response);
      toast({
        title: "Employee has been deleted",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setChange(!change);
    } catch (error) {
      console.log("Can't delete the Employee: Error", error);
      toast({
        title: "Error deleting employee",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  const handleAddStageClick = (jobPostingId) => {
    console.log("Opening modal for job posting ID:", jobPostingId);
    setSelectedJobPostingId(jobPostingId);
    onOpen1();
  };
  console.log(filteredEmployees);
  console.log(employees);
  console.log(id);
  return (
    <VStack spacing={4} minH={"100vh"}>
      <Box
        className="changeDir gap"
        p={2}
        display={"flex"}
        width={"100%"}
        marginStart={"1rem"}
        marginEnd={"1rem"}
        justifyContent={"space-between"}
        alignItems={"center"}
        py={"1rem"}
      >
        <Text fontSize={"1.5rem"} fontWeight={"600"} textAlign={"left"}>
          People
        </Text>
        <Box
          className="changeDir"
          display={"flex"}
          gap={3}
          alignItems={"center"}
        >
          <Input
            value={searchQuery}
            onChange={(e) => SetSearchQuery(e.target.value)}
            type="text"
            borderRadius="0"
            placeholder="Search"
          />
          <Box display={"flex"} gap={2}>
            <Box display={"flex"} gap={2} p={1} border={"1px solid lightgray"}>
              <FaList
                fontSize={"1.5rem"}
                onClick={() => setListView(false)}
                cursor={"pointer"}
                color={listview ? "gray" : "black"}
              />
              <MdOutlineDashboardCustomize
                onClick={() => setListView(true)}
                cursor={"pointer"}
                fontSize={"1.5rem"}
                color={!listview ? "gray" : "black"}
              />
            </Box>

            <Button
              colorScheme="red"
              borderRadius={0}
              className="`btn"
              onClick={() => handleAddStageClick()}
              minWidth={"max-content"}
            >
              + Create
            </Button>
          </Box>
        </Box>
      </Box>
      <Box
        px={"1rem"}
        width={"100%"}
        display={"flex"}
        flexWrap={"wrap"}
        alignItems={"center"}
        justifyContent={"center"}
        gap={"1rem"}
      >
        {listview ? (
          searchQuery ? (
            filteredEmployees?.map((employee) => {
              return (
                <Box
                  key={employee.emailId}
                  w={"17rem"}
                  minW={"max-content"}
                  display={"flex"}
                  p={2}
                  gap={2}
                  border={"1px solid lightgray"}
                  cursor={"pointer"}
                  onClick={() => {
                    seeEmployee(employee.id);
                  }}
                >
                  <Box
                    w={"100%"}
                    display={"flex"}
                    justifyContent={"space-between"}
                  >
                    <Box gap={2} display={"flex"} alignItems={"center"}>
                      <Box
                        bgColor={randomColor()}
                        borderRadius={"100px"}
                        w={"4rem"}
                        h={"4rem"}
                        display={"flex"}
                        alignItems={"center"}
                      >
                        <Text
                          w={"100%"}
                          color={"white"}
                          fontSize={"2rem"}
                          textAlign={"center"}
                        >
                          {employee.name.slice(0, 2)}
                        </Text>
                      </Box>
                      <Box>
                        <Text fontWeight={"bold"}>
                          {employee.name ? employee.name : "Not Entered"}
                        </Text>
                        <Text>{employee.emailId}</Text>
                        <Text>{employee.position}</Text>
                      </Box>
                    </Box>
                  </Box>
                  <BsThreeDotsVertical />
                </Box>
              );
            })
          ) : (
            employees.map((employee) => (
              <Box
                key={employee.emailId}
                w={"17rem"}
                minW={"max-content"}
                display={"flex"}
                p={2}
                gap={2}
                border={"1px solid lightgray"}
                cursor={"pointer"}
              >
                <Box
                  w={"100%"}
                  display={"flex"}
                  justifyContent={"space-between"}
                  onClick={() => {
                    seeEmployee(employee.id);
                  }}
                >
                  <Box gap={2} display={"flex"} alignItems={"center"}>
                    <Box
                      bg={randomColor()}
                      borderRadius={"100px"}
                      w={"4rem"}
                      h={"4rem"}
                      display={"flex"}
                      alignItems={"center"}
                    >
                      <Text
                        w={"100%"}
                        color={"white"}
                        fontSize={"2rem"}
                        textAlign={"center"}
                      >
                        {employee.name.slice(0, 2)}
                      </Text>
                    </Box>
                    <Box>
                      <Text fontWeight={"bold"}>
                        {employee.name ? employee.name : "Not Entered"}
                      </Text>
                      <Text>{employee.emailId}</Text>
                      <Text>{employee.position}</Text>
                    </Box>
                  </Box>
                </Box>
                {/* // onClick={() => deleteEmployee(employee.id)} */}
                <Box position={"relative"}>
                  <Box w={'20px'} h={'20px'} display={'flex'} alignItems={'center'} justifyContent={'center'} borderRadius={'100px'} _hover={{bgColor:'lightgray'}} onClick={()=>setOpen({...open,[employee.id]:!open})}>
                  <BsThreeDotsVertical color="black"/>
                  </Box>
                 {open[employee.id]?<Box
                    position={"absolute"}
                    top={2}
                    right={3}
                    border={"1px solid lightgray"}
                    p={1} 
                     bgColor={'Highlight'} textColor={'white'}
                  >
                  <Text cursor={'pointer'} borderBottom={'1px solid lightgray'} _hover={{textColor:'lightgray'}}>Delete</Text>
                  <Text cursor={'pointer'} _hover={{textColor:'lightgray'}}>Edit</Text>
                  </Box>:''}
                </Box>
              </Box>
            ))
          )
        ) : (
          <Box border={"1px solid lightgray"} width={"100%"}>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Employe Name</Th>
                  <Th>Email</Th>
                  <Th>Postion</Th>
                  <Th>ACtions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {!searchQuery
                  ? employees.map((employee) => (
                      <Tr key={employee.id}>
                        <Td>{employee.name ? employee.name : "Not Entered"}</Td>
                        <Td>{employee.emailId}</Td>
                        <Td>{employee.position}</Td>
                        <Td display={"flex"} minHeight={"100%"} gap={"10px"}>
                          <MdDelete
                            onClick={() => deleteAnEmployee(employee.id)}
                            cursor={"pointer"}
                            fontSize={"1.4rem"}
                          />
                          <FaEdit
                            cursor={"pointer"}
                            onClick={() => {
                              handleAddStageClick();
                              setId(employee.id);
                              console.log("Edit button has been clicked");
                            }}
                            fontSize={"1.3rem"}
                          />{" "}
                        </Td>
                      </Tr>
                    ))
                  : filteredEmployees?.map((employee) => {
                      return (
                        <Tr key={employee.id}>
                          <Td>
                            {employee.name ? employee.name : "Not Entered"}
                          </Td>
                          <Td>{employee.emailId}</Td>
                          <Td>{employee.position}</Td>
                          <Td display={"flex"} minHeight={"100%"} gap={"10px"}>
                            <MdDelete
                              onClick={() => deleteAnEmployee(employee.id)}
                              cursor={"pointer"}
                              fontSize={"1.4rem"}
                            />
                            <FaEdit
                              onClick={() => {
                                handleAddStageClick();
                                setId(employee.id);
                                console.log("Edit button has been clicked");
                              }}
                              cursor={"pointer"}
                              fontSize={"1.3rem"}
                            />{" "}
                          </Td>
                        </Tr>
                      );
                    })}
              </Tbody>
            </Table>
          </Box>
        )}
      </Box>



      
      <Modal isOpen={isOpen1} onClose={onClose1}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <StageForm
              id={id}
              setChange={setChange}
              change={change}
              onAdded={onClose1}
            />
          </ModalBody>
        </ModalContent>
      </Modal>

      <Modal isOpen={isOpen2} onClose={onClose2}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Employee</ModalHeader>
          <ModalCloseButton />
          <ModalBody></ModalBody>
        </ModalContent>
      </Modal>
    </VStack>
  );
};

export default EmployeeList;
