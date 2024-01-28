import React, { useEffect, useState } from 'react';
import { Box, List, ListItem } from '@chakra-ui/react';
import { getAttendanceByEmployeeId } from '../../services/AttendanceService';
 
const AttendanceRecords = ({ employeeId }) => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const fetchRecords = async () => {
      const data = await getAttendanceByEmployeeId(employeeId);
      setRecords(data);
    };
    fetchRecords();
  }, [employeeId]);

  return (
    <Box minH={'100vh'}>
      
      <List>
        {records.map(record => (
          <ListItem key={record.id}>
            {/* Display attendance record details */}
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default AttendanceRecords;
