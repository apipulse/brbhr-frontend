import React, { useState } from 'react';
import { Button, Box, Text, useToast } from '@chakra-ui/react';
import { checkIn, checkOut } from '../../services/AttendanceService';

const CheckInCheckOut = () => {
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const toast = useToast();
  const empId = "currentEmployeeId"; // Replace with actual logic to retrieve employee ID

  const handleCheckIn = async () => {
    try {
      await checkIn(empId);
      setIsCheckedIn(true);
      toast({ title: "Checked In", status: "success", duration: 3000, isClosable: true });
    } catch (error) {
      toast({ title: "Error", description: "Failed to check in", status: "error", duration: 3000, isClosable: true });
    }
  };

  const handleCheckOut = async () => {
    try {
      await checkOut(empId);
      setIsCheckedIn(false);
      toast({ title: "Checked Out", status: "success", duration: 3000, isClosable: true });
    } catch (error) {
      toast({ title: "Error", description: "Failed to check out", status: "error", duration: 3000, isClosable: true });
    }
  };

  return (
    <Box p={4} textAlign="center">
      <Text mb={4}>{isCheckedIn ? "You are currently checked in." : "You are currently checked out."}</Text>
      <Button colorScheme="green" onClick={handleCheckIn} isDisabled={isCheckedIn}>
        Check In
      </Button>
      <Button ml={4} colorScheme="red" onClick={handleCheckOut} isDisabled={!isCheckedIn}>
        Check Out
      </Button>
    </Box>
  );
};

export default CheckInCheckOut;
