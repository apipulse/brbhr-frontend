import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  VStack,
  Text,
  Table,
  Thead,
  Tbody,
  Flex,
  Tr,
  Th,
  Td,
  Button,
  Modal,
  useDisclosure,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Input,
  Select,
} from "@chakra-ui/react";
import {
  getAttendanceByDate,
  getAttendanceByMonth,
  getAttendanceByEmployeeId,
  validateAttendance,
  invalidateAttendance,
} from "../../services/AttendanceService";
import AddAttendanceForm from "./AttendanceForm";
import NoteContext from "../../Context/NoteContext";
import { CiEdit } from "react-icons/ci";
import { FaChevronRight } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa6";

const AttendanceDetails = () => {
  const [month, setmonth] = useState(0);
  const [editEmployeeId, setEditEmployeeId] = useState(null);
  const [searchQuery, setSearchQuery] = useState();
  const [monthlyAttendance, setMonthlyAttendance] = useState();
  const [active, setActive] = useState("Validate");
  const abc = useContext(NoteContext);

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

  const {
    isOpen: isOpen3,
    onOpen: onOpen3,
    onClose: onClose3,
  } = useDisclosure();

  const handleAddAttendance = () => {
    console.log("Opening modal for adding attendance:");
    onOpen1();
  };

  const filteredAttedances = monthlyAttendance?.filter((att) => {
    return att?.employeeId?.toLowerCase()?.includes(searchQuery?.toLowerCase());
  });
  const year = new Date().getFullYear();
  console.log(month);
  useEffect(() => {
    abc.setName("ATTENDANCE");

    const currentMonth = new Date().getMonth() + 1 + month;

    const employeeAttendance = async () => {
      const res = await getAttendanceByEmployeeId("123456");
      console.log(res);
    };

    const fetchByMonth = async () => {
      console.log(year, currentMonth)
      const data = await getAttendanceByMonth(year, currentMonth);
      setMonthlyAttendance(data);
      console.log(data);
    };
    fetchByMonth();
    employeeAttendance();
  }, [month]);

  const handleValidate = async (employeeId, ValidatorId) => {
    console.log(employeeId);
    console.log(ValidatorId);
    try {
      const res = await validateAttendance(employeeId, ValidatorId);
      console.log(res);
    } catch (error) {
      console.log("Could not validate the attendance of Employer", error);
    }
  };

  const handleInValidate = async (employeeId, ValidatorId) => {
    console.log(employeeId);
    console.log(ValidatorId);
    try {
      const res = await invalidateAttendance(employeeId, ValidatorId);
      console.log(res);
    } catch (error) {
      console.log("Could not Invalidate the attendance of Employer", error);
    }
  };

  console.log(editEmployeeId);

  return (
    <Box className="w-100vw" minH={"100vh"} p={4}>
      <Flex
        className="changeDir gap"
        w={"100%"}
        justifyContent={"space-between"}
        mb={"1rem"}
        p={2}
        my={4}
        alignItems={"center"}
      >
        <Text fontWeight={600} fontSize="1.5rem">
          Attendance
        </Text>
        <Box display={"flex"} gap={3}>
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            borderRadius={0}
            placeholder="Search"
          />

          <Button
            colorScheme="red"
            borderRadius={0}
            onClick={() => handleAddAttendance()}
          >
            + Create
          </Button>
        </Box>
      </Flex>
      {!searchQuery ? (
        <Box shadow={"md"} maxW={"100%"} border={"1px solid lightgray"}>
          <Box display={"flex"} textAlign={"center"}>
            <Box
              flex={1}
              onClick={() => setActive("Validate")}
              bg={active == "Validate" ? "white" : "rgb(250, 247, 247)"}
              shadow={active == "Validate" ? "" : "sm"}
              cursor={"pointer"}
              py={1}
              _hover={{ bg: "rgb(250, 247, 707)" }}
            >
              Validate Attendances
            </Box>
            <Box
              flex={1}
              onClick={() => setActive("InValidate")}
              bg={active == "InValidate" ? "white" : "rgb(250, 247, 247)"}
              shadow={active == "InValidate" ? "" : "sm"}
              cursor={"pointer"}
              py={1}
              _hover={{ bg: "rgb(250, 247, 247" }}
            >
              Validated Attendances
            </Box>
          </Box>

          {active == "Validate" ? (
            <Box overflow={"scroll"} pt={4} shadow={"sm"}>
              <Table variant="simple" minW={"max-content"}>
                <Thead>
                  <Tr shadow={"sm"} p={0}>
                    <Th py={1}>Employee Name</Th>
                    <Th py={1}>Date</Th>
                    <Th py={1}>Day</Th>
                    <Th py={1}>Clock in</Th>
                    <Th py={1}>In Date</Th>
                    <Th py={1}>Clock out</Th>
                    <Th py={1}>Out Date</Th>
                    <Th py={1}>Shift</Th>
                    <Th py={1}>Work Type</Th>
                    <Th py={1}>Min Hour</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {monthlyAttendance?.map((data) =>
                    !data.isValidated ? (
                      <Tr key={data.id}>
                        <Td py={1}>{data.employeeId}</Td>
                        <Td py={1}>
                          {new Date(data.date).toLocaleDateString()}
                        </Td>
                        <Td py={1}>
                          {new Date(data.date).toLocaleDateString("en-US", {
                            weekday: "long",
                          })}
                        </Td>
                        <Td py={1}>{data.checkInTime}</Td>
                        <Td py={1}>{data.checkInDate}</Td>
                        <Td py={1}>{data.checkOutTime}</Td>
                        <Td py={1}>{data.checkOutDate}</Td>
                        <Td py={1}>{data.shift}</Td>
                        <Td py={1}>{data.overTime}</Td>
                        <Td py={1}>{data.minimumHour}</Td>
                        <Td display={"flex"} gap={3}>
                          {/* <Button
                            borderRadius={0}
                            onClick={() => {
                              setEditEmployeeId(data.employeeId);
                              handleUpdateAttendance();
                            }}
                          >
                            <CiEdit />
                          </Button> */}
                          <Button
                            borderRadius={0}
                            colorScheme="blue"
                            onClick={() => {
                              handleValidate(data.id, data.validatorId);
                            }}
                          >
                            Validate
                          </Button>
                        </Td>
                      </Tr>
                    ) : (
                      ""
                    )
                  )}
                </Tbody>
              </Table>
            </Box>
          ) : (
            ""
          )}
          {active == "InValidate" ? (
            <Box overflow={"scroll"} pt={4} shadow={"sm"}>
              <Table variant="simple" minW={"max-content"}>
                <Thead>
                  <Tr shadow={"sm"} p={0}>
                    <Th py={1}>Employee Name</Th>
                    <Th py={1}>Date</Th>
                    <Th py={1}>Day</Th>
                    <Th py={1}>Clock in</Th>
                    <Th py={1}>In Date</Th>
                    <Th py={1}>Clock out</Th>
                    <Th py={1}>Out Date</Th>
                    <Th py={1}>Shift</Th>
                    <Th py={1}>Work Type</Th>
                    <Th py={1}>Min Hour</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {monthlyAttendance?.map((data) =>
                    data.isValidated ? (
                      <Tr key={data.id}>
                        <Td py={1}>{data.employeeId}</Td>
                        <Td py={1}>
                          {new Date(data.date).toLocaleDateString()}
                        </Td>
                        <Td py={1}>
                          {new Date(data.date).toLocaleDateString("en-US", {
                            weekday: "long",
                          })}
                        </Td>
                        <Td py={1}>{data.checkInTime}</Td>
                        <Td py={1}>{data.checkInDate}</Td>
                        <Td py={1}>{data.checkOutTime}</Td>
                        <Td py={1}>{data.checkOutDate}</Td>
                        <Td py={1}>{data.shift}</Td>
                        <Td py={1}>{data.overTime}</Td>
                        <Td py={1}>{data.minimumHour}</Td>
                        <Td>
                          <Button
                            borderRadius={0}
                            colorScheme="blue"
                            onClick={() =>
                              handleInValidate(data.id, data.validatorId)
                            }
                          >
                            InValidate
                          </Button>
                        </Td>
                      </Tr>
                    ) : (
                      ""
                    )
                  )}
                </Tbody>
              </Table>
            </Box>
          ) : (
            ""
          )}
        </Box>
      ) : (
        <Box overflow={"scroll"} pt={4} shadow={"sm"}>
          <Table variant="simple" minW={"max-content"}>
            <Thead>
              <Tr shadow={"sm"} p={0}>
                <Th py={1}>Employee Name</Th>
                <Th py={1}>Date</Th>
                <Th py={1}>Day</Th>
                <Th py={1}>Clock in</Th>
                <Th py={1}>In Date</Th>
                <Th py={1}>Clock out</Th>
                <Th py={1}>Out Date</Th>
                <Th py={1}>Shift</Th>
                <Th py={1}>Work Type</Th>
                <Th py={1}>Min Hour</Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredAttedances?.map((data) =>
                !data.isValidated ? (
                  <Tr key={data.id}>
                    <Td py={1}>{data.employeeId}</Td>
                    <Td py={1}>{new Date(data.date).toLocaleDateString()}</Td>
                    <Td py={1}>
                      {new Date(data.date).toLocaleDateString("en-US", {
                        weekday: "long",
                      })}
                    </Td>
                    <Td py={1}>{data.checkInTime}</Td>
                    <Td py={1}>{data.checkInDate}</Td>
                    <Td py={1}>{data.checkOutTime}</Td>
                    <Td py={1}>{data.checkOutDate}</Td>
                    <Td py={1}>{data.shift}</Td>
                    <Td py={1}>{data.overTime}</Td>
                    <Td py={1}>{data.minimumHour}</Td>
                    <Td>
                      <Button
                        borderRadius={0}
                        colorScheme="blue"
                        onClick={() => {
                          handleInValidate(data.id, data.validatorId);
                        }}
                      >
                        InValidate
                      </Button>
                    </Td>
                  </Tr>
                ) : (
                  ""
                )
              )}
            </Tbody>
          </Table>
        </Box>
      )}

      {/* <Box display={"flex"} gap={4} mt={4} w={"100%"}>
        <Button
          colorScheme="blue"
          borderRadius={0}
          onClick={() => {
            setmonth(month-1)
            setMonthlyAttendance([])

          }}
        >
          <FaChevronLeft />
        </Button>
        <Text></Text>
        <Button
          colorScheme="red"
          borderRadius={0}
          onClick={() => {

            setmonth(month+1)


          }}
        >
          <FaChevronRight />
        </Button>
      </Box> */}

      <Modal isOpen={isOpen1} onClose={onClose1}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Attendance</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <AddAttendanceForm />
          </ModalBody>
        </ModalContent>
      </Modal>
      <Modal isOpen={isOpen3} onClose={onClose3}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Attendance</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <AddAttendanceForm EmployeeId={editEmployeeId} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default AttendanceDetails;
