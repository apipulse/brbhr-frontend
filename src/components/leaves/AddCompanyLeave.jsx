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
import React, { useEffect, useState } from "react";
import {
  createHoliday,
  createCompanyLeave,
  updateCompanyLeave,
  getCompanyLeaveById,
} from "../../services/LeaveService";
const AddType = ({ id, onAdded, change, setChange }) => {
  const toast = useToast();
  const [details, setDetails] = useState({
    basedOnWeek: 0,
    basedOnWeekDay: 0,
  });

  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const addNewType = async (e) => {
    e.preventDefault();
    try {
      const res = await createCompanyLeave(details);
      console.log(res);
      setChange(!change);
      toast({
        title: "Succes",
        description: "Company Leave has been added.",
        status: "success", // Options: 'info', 'warning', 'error', 'success'
        isClosable: true,
        duration: 3000,
      });
      onAdded();
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Error adding Company Leave.",
        status: "error", // Options: 'info', 'warning', 'error', 'success'
        isClosable: true,
        duration: 3000,
      });
    }
  };
  useEffect(() => {
    if (id) {
      const getLeaveData = async () => {
        try {
          const res = await getCompanyLeaveById(id);
          console.log(res);
          setDetails({
            basedOnWeek: res.basedOnWeek,
            basedOnWeekDay: res.basedOnWeekDay,
          });
        } catch (error) {
          console.error(error);
        }
      };
      getLeaveData();
    }
  }, []);
  console.log(id);

  const updateLeave = async (e) => {
    e.preventDefault();
    try {
      const res = await updateCompanyLeave(id, details);
      console.log(res);
      setChange(!change);
      toast({
        title: "Succes",
        description: "Company Leave has been updated.",
        status: "success", // Options: 'info', 'warning', 'error', 'success'
        isClosable: true,
        duration: 3000,
      });
      onAdded();
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Error updating Holiday.",
        status: "error",
        isClosable: true,
        duration: 3000,
      });
    }
  };
  console.log(details);

  return (
    <Box p={4}>
      <form onSubmit={id ? updateLeave : addNewType}>
        <FormControl>
          <FormLabel>Based On Week</FormLabel>
          <Input
            type="number"
            borderRadius={0}
            value={details.basedOnWeek}
            name="basedOnWeek"
            onChange={handleChange}
          />
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>Based On WeekDay</FormLabel>
          <Input
            type="number"
            borderRadius={0}
            value={details.basedOnWeekDay}
            name="basedOnWeekDay"
            onChange={handleChange}
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
