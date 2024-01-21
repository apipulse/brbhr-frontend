import React, { useState, useEffect } from 'react';
import {
  Box,
  VStack,
  Text,
  Table,
  Thead,
  Tbody,Flex,
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
} from '@chakra-ui/react';
// Import necessary services for fetching and updating attendance data

const AttendanceDetails = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editEmployeeId, setEditEmployeeId] = useState(null);

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const data = await fetchAttendanceData(); // Call your data fetching service
        setAttendanceData(data);
      } catch (error) {
        console.error('Error fetching attendance data:', error);
      }
    };
    fetchAttendance();
  }, []);

  const handleEditAttendance = (employeeId) => {
    setEditEmployeeId(employeeId);
    onOpen();
  };

  const handleUpdateAttendance = async (values) => {
    try {
      await updateAttendanceData(values); // Call your data update service
      setEditEmployeeId(null);
      onClose();
      fetchAttendance(); // Refresh data after update
    } catch (error) {
      console.error('Error updating attendance:', error);
    }
  };

  return (
    <Box>
        <Flex w={'100%'} justifyContent={'space-between'}  mb={'1rem'} p={2} borderBottom={'1px solid gray'} alignItems={'center'}>
      <Text fontSize="2rem" fontWeight="bold">Attendance List</Text>
      <Button
              marginBottom={"1rem"}
              colorScheme="blue"
              onClick={() => handleAddStageClick(posting.id)}
            >
              + Add Attendance
            </Button>
        </Flex>
      <Table variant="striped">
        <Thead>
          <Tr>
            <Th>Employee Name</Th>
            <Th>Date</Th>
            <Th>Check-In Time</Th>
            <Th>Check-Out Time</Th>
            <Th>Status</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {attendanceData.map((data) => (
            <Tr key={data.id}>
              <Td>{data.employeeName}</Td>
              <Td>{data.date}</Td>
              <Td>{data.checkInTime}</Td>
              <Td>{data.checkOutTime}</Td>
              <Td>{data.status}</Td>
              <Td>
                <Button onClick={() => handleEditAttendance(data.id)}>
                  Edit
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Attendance</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* Form to edit attendance details */}
            <form onSubmit={(e) => e.preventDefault()}>
              {/* Input fields for employee ID (if needed), date, check-in/out times, status, etc. */}
              <Button type="submit" onClick={handleUpdateAttendance}>
                Update
              </Button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default AttendanceDetails;
