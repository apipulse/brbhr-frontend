import React, { useState } from 'react';
import { Button, Box, Input, useToast } from '@chakra-ui/react';
import { validateAttendance, invalidateAttendance } from '../../services/AttendanceService';

const AttendanceValidation = () => {
  const [attendanceId, setAttendanceId] = useState('');
  const toast = useToast();

  const handleValidate = async () => {
    try {
      const validatorId = 'yourValidatorId'; // Replace with actual validator ID
      await validateAttendance(attendanceId, validatorId);
      toast({ title: "Attendance validated successfully", status: "success" });
    } catch (error) {
      toast({ title: "Error validating attendance", description: error.message, status: "error" });
    }
  };

  const handleInvalidate = async () => {
    try {
      const invalidatorId = 'yourInvalidatorId'; // Replace with actual invalidator ID
      await invalidateAttendance(attendanceId, invalidatorId);
      toast({ title: "Attendance invalidated successfully", status: "success" });
    } catch (error) {
      toast({ title: "Error invalidating attendance", description: error.message, status: "error" });
    }
  };

  return (
    <Box>
      <Input 
        placeholder="Attendance ID" 
        value={attendanceId} 
        onChange={(e) => setAttendanceId(e.target.value)} 
      />
      <Button onClick={handleValidate}>Validate</Button>
      <Button onClick={handleInvalidate}>Invalidate</Button>
    </Box>
  );
};

export default AttendanceValidation;
