import React, { useState, useEffect, useContext } from "react";
import { getAllCandidateApplications } from "../../services/CandidateService";
import {
  Box,
  Table,
  Modal,
  useDisclosure,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  VStack,
  Text,
  Input,
} from "@chakra-ui/react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { randomColor } from "@chakra-ui/theme-tools";
import NoteContext from "../../Context/NoteContext";
import SendEmail from "./SendEmail";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { FaList } from "react-icons/fa6";
import { MdOutlineMailOutline } from "react-icons/md";
import CandidateInfo from "./CandidateInfo";
const AllApplicationsList = () => {
  const [allCandidates, setAllCandidates] = useState([]);
  const [selectedEMail, setSelectedEMail] = useState(null);
  const [searchQuery, setSearchQuery] = useState(null);
  const [listview, setListView] = useState(true);
  const [candidateId, setCandidateId] = useState('');

  const abc = useContext(NoteContext);
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

  const filteredCandidates = allCandidates?.filter((employee) => {
    return employee?.applicantName
      ?.toLowerCase()
      ?.includes(searchQuery?.toLowerCase());
  });
  const handleSendMailClick = (email) => {
    console.log("Opening modal for Sending Email");
    setSelectedEMail(email);
    onOpen2();
  };

  useEffect(() => {
    abc.setName("RECRUITMENT");

    const fetchApplications = async () => {
      try {
        const data = await getAllCandidateApplications();
        setAllCandidates(data);
      } catch (error) {
        console.error("Error fetching applications:", error);
      }
    };

    fetchApplications();
  }, []);

  return (
    <VStack spacing={4} p={4} minH={"100vh"} className="w-100vw">
      <Box
      className="changeDir gap"
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
        w={"100%"}
      >
        <Text className="center" fontSize={"2rem"} w={"100%"} textAlign="left" fontWeight={"600"}>
          Candidates
        </Text>
        <Box display={"flex"} gap={4} alignItems={"center"}>
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
          <Input
            type="text"
            borderRadius={0}
            placeholder="Search"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Box>
      </Box>

      {!searchQuery ? (
        <Box w={"100%"}>
          {!listview ? (
            <Box
              shadow={"sm"}
              border={"1px solid lightgray"}
              width={"100%"}
              overflowX={"scroll"}
            >
              <Table minW={"max-content"} variant="simple">
                <Thead>
                  <Tr>
                    <Th>candidate</Th>
                    <Th>Email</Th>
                    <Th>Contact</Th>
                    <Th>Postion</Th>
                    <Th>Actions</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {allCandidates.map((candidate) => (
                    <Tr onClick={()=>onOpen3()} key={candidate.id}>
                      <Td>
                        {candidate.applicantName
                          ? candidate.applicantName
                          : "Not Entered"}
                      </Td>
                      <Td>{candidate.applicantEmail}</Td>
                      <Td>
                        {candidate.mobileNumber
                          ? candidate.mobileNumber
                          : "Not Entered"}
                      </Td>
                      <Td>{candidate.country}</Td>
                      <Td>
                        <MdOutlineMailOutline
                          onClick={() =>
                            handleSendMailClick(candidate.applicantEmail)
                          }
                          cursor={"pointer"}
                        />
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>
          ) : (
            ""
          )}
          {listview ? (
            <Box
              display={"flex"}
              gap={4}
              flexWrap={"wrap"}
              alignItems={"center"}
              justifyContent={"center"}
              w={"100%"}
            >
              {allCandidates.map((candidate) => {
                return (
                  <Box onClick={()=>{onOpen3()
                  setCandidateId(candidate?.id)}}
                    key={candidate.id}
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
                            {candidate.applicantName.slice(0, 2)}
                          </Text>
                        </Box>
                        <Box>
                          <Text fontWeight={"bold"}>
                            {candidate.applicantName
                              ? candidate.applicantName
                              : "Not Entered"}
                          </Text>
                          <Text>{candidate.applicantEmail}</Text>
                          <Text>{candidate.position}</Text>
                        </Box>
                      </Box>
                    </Box>
                    {/* // onClick={() => deleteEmployee(employee.id)} */}
                    <Box position={"relative"}>
                      <Box
                        w={"20px"}
                        h={"20px"}
                        display={"flex"}
                        alignItems={"center"}
                        justifyContent={"center"}
                        borderRadius={"100px"}
                        _hover={{ bgColor: "lightgray" }}
                        onClick={() =>
                          setEmployeeIds({
                            ...employeeIds,
                            [employee.id]: !employeeIds?.[employee?.id],
                          })
                        }
                      >
                        <BsThreeDotsVertical color="black" />
                      </Box>
                    </Box>
                  </Box>
                );
              })}
            </Box>
          ) : (
            ""
          )}
        </Box>
      ) : (
        <Box w={"100%"}>
          {!listview ? (
            <Box shadow={"md"} width={"100%"} overflowX={"scroll"}>
              <Table minW={"max-content"} variant="simple" colorScheme="red">
                <Thead>
                  <Tr>
                    <Th>candidate</Th>
                    <Th>Email</Th>
                    <Th>Contact</Th>
                    <Th>Postion</Th>
                    <Th>Actions</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {filteredCandidates.map((candidate) => (
                    <Tr key={candidate.id}>
                      <Td>
                        {candidate.applicantName
                          ? candidate.applicantName
                          : "Not Entered"}
                      </Td>
                      <Td>{candidate.applicantEmail}</Td>
                      <Td>
                        {candidate.mobileNumber
                          ? candidate.mobileNumber
                          : "Not Entered"}
                      </Td>
                      <Td>{candidate.country}</Td>
                      <Td>
                        <MdOutlineMailOutline
                          onClick={() =>
                            handleSendMailClick(candidate.applicantEmail)
                          }
                          cursor={"pointer"}
                        />
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>
          ) : (
            ""
          )}
          {listview ? (
            <Box
              display={"flex"}
              gap={4}
              flexWrap={"wrap"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              {filteredCandidates.map((candidate) => {
                return (
                  <Box
                    key={candidate.id}
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
                            {candidate.applicantName.slice(0, 2)}
                          </Text>
                        </Box>
                        <Box>
                          <Text fontWeight={"bold"}>
                            {candidate.applicantName
                              ? candidate.applicantName
                              : "Not Entered"}
                          </Text>
                          <Text>{candidate.applicantEmail}</Text>
                          <Text>{candidate.position}</Text>
                        </Box>
                      </Box>
                    </Box>
                    {/* // onClick={() => deleteEmployee(employee.id)} */}
                    <Box position={"relative"}>
                      <Box
                        w={"20px"}
                        h={"20px"}
                        display={"flex"}
                        alignItems={"center"}
                        justifyContent={"center"}
                        borderRadius={"100px"}
                        _hover={{ bgColor: "lightgray" }}
                        onClick={() =>
                          setEmployeeIds({
                            ...employeeIds,
                            [employee.id]: !employeeIds?.[employee?.id],
                          })
                        }
                      >
                        <BsThreeDotsVertical color="black" />
                      </Box>
                    </Box>
                  </Box>
                );
              })}
            </Box>
          ) : (
            ""
          )}
        </Box>
      )}

      <Modal isOpen={isOpen2} onClose={onClose2}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Send Message</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <SendEmail EMailId={selectedEMail} onStageAdded={onClose2} />
          </ModalBody>
        </ModalContent>
      </Modal>

      <Modal isOpen={isOpen3} onClose={onClose3}>
        <ModalOverlay />
        <ModalContent>
          {/* <ModalHeader>Send Message</ModalHeader> */}
          <ModalCloseButton />
          <ModalBody>
            <CandidateInfo id={candidateId} onOkay={onClose3} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </VStack>
  );
};

export default AllApplicationsList;
