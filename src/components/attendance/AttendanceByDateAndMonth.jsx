import React, { useState, useEffect } from 'react';
import { Box, List, ListItem, Input, Button } from '@chakra-ui/react';
import { getAttendanceByDate, getAttendanceByMonth } from '../../services/AttendanceService';

const AttendanceByDateAndMonth = () => {
  const [date, setDate] = useState('');
  const [yearMonth, setYearMonth] = useState({ year: '', month: '' });
  const [records, setRecords] = useState([]);

  const fetchByDate = async () => {
    const data = await getAttendanceByDate(date);
    setRecords(data);
  };

  const fetchByMonth = async () => {
    const { year, month } = yearMonth;
    const data = await getAttendanceByMonth(year, month);
    setRecords(data);
  };

  return (
    <Box>
      <Box>
        <Input type="date" onChange={(e) => setDate(e.target.value)} />
        <Button onClick={fetchByDate}>Fetch by Date</Button>
      </Box>
      <Box>
        <Input placeholder="Year" onChange={(e) => setYearMonth({ ...yearMonth, year: e.target.value })} />
        <Input placeholder="Month" onChange={(e) => setYearMonth({ ...yearMonth, month: e.target.value })} />
        <Button onClick={fetchByMonth}>Fetch by Month</Button>
      </Box>
      <List>
        {records.map((record, index) => (
          <ListItem key={index}>
            {/* Display attendance record details */}
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default AttendanceByDateAndMonth;
