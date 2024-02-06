import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Input,
  Select,
  useToast,
  Radio,
  RadioGroup,
  FormHelperText,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import {
  createHoliday,
  getHolidayById,
  updateHoliday,
} from "../../services/LeaveService";
const AddType = ({ id, onAdded, setChange }) => {
  const toast = useToast();
  const [details, setDetails] = useState({
    holidayName: "",
    startDate: "",
    endDate: "",
    recurring: false,
  });
  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };
  const addNewType = async (e) => {
    e.preventDefault();
    try {
      const res = await createHoliday(details);
      console.log(res);
      toast({
        title: "Succes",
        description: "Holiday has been added.",
        status: "success", // Options: 'info', 'warning', 'error', 'success'
        isClosable: true,
        duration: 3000,
      });
      onAdded();
      setChange(12);
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Error adding Holiday.",
        status: "error", // Options: 'info', 'warning', 'error', 'success'
        isClosable: true,
        duration: 3000,
      });
    }
  };

  useEffect(() => {
    const getholiday = async () => {
      if (id) {
        try {
          const res = await getHolidayById(id);
          console.log(res);
          setDetails({
            holidayName: res.holidayName,
            startDate: res.startDate,
            endDate: res.endDate,
            recurring: res.recurring,
          });
        } catch (err) {
          console.error(err);
        }
      }
    };

    getholiday();
  }, [id]);

  const updatHoliday = async (e) => {
    e.preventDefault();
    try {
      const res = await updateHoliday(id, details);
      console.log(res);
      toast({
        title: "Succes",
        description: "Holiday has been updated.",
        status: "success", // Options: 'info', 'warning', 'error', 'success'
        isClosable: true,
        duration: 3000,
      });
      onAdded();
      setChange(87);
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Error updating Holiday.",
        status: "error", // Options: 'info', 'warning', 'error', 'success'
        isClosable: true,
        duration: 3000,
      });
    }
  };

  console.log(details);
  return (
    <Box p={4}>
      <form onSubmit={id ? updatHoliday : addNewType}>
        <FormControl>
          <FormLabel>Name</FormLabel>
          <Input
            type="text"
            borderRadius={0}
            value={details.holidayName}
            name="holidayName"
            onChange={handleChange}
          />
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>Start Date</FormLabel>
          <Input
            type="date"
            borderRadius={0}
            value={details.startDate}
            name="startDate"
            onChange={handleChange}
          />
        </FormControl>

        <FormControl mt={4}>
          <FormLabel>End Date</FormLabel>
          <Input
            type="date"
            borderRadius={0}
            value={details.endDate}
            name="endDate"
            onChange={handleChange}
          />
        </FormControl>

        <FormControl mt={4} display={"flex"}>
          <FormLabel>Reccurring</FormLabel>
          <Checkbox
            type="boolian"
            borderRadius={0}
            name="recurring"
            isChecked={details.recurring}
            onChange={(e) =>
              setDetails({
                ...details,
                [e.target.name]: e.target.checked,
              })
            }
          />
        </FormControl>
        <Button type="submit" mt={4} borderRadius={0} colorScheme="red">
          {id ? "Update" : "Add"}
        </Button>
      </form>
    </Box>
  );
};

export default AddType;
