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
import React, { useState } from "react";
import { addLeaveType } from "../../services/LeaveService";
const AddType = (onAdded) => {
  const toast = useToast();
  const [details, setDetails] = useState({
    name: "",
    icon: "",
    color: "",
    paymentMethod: "",
    leaveCount: 0,
    periodIn: "",
    totalDays: 0,

    isResetAble: false,

    reSetBased: "",

    carryForwardType: "",

    isRequireApproval: false,

    isExcludeCompanyLeaves: false,

    isExcludeHolidays: false,

    leaveType: "",
  });

  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const addNewType = async (e) => {
    e.preventDefault();
    try {
      const res = await addLeaveType(details);
      console.log(res);
      toast({
        title: "Succes",
        description: "Leave type has been added.",
        status: "success", // Options: 'info', 'warning', 'error', 'success'
        isClosable: true,
        duration: 3000,
      });
      onAdded()
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Error adding New Type.",
        status: "error", // Options: 'info', 'warning', 'error', 'success'
        isClosable: true,
        duration: 3000,
      });
    }
  };
  console.log(details);

  return (
    <Box p={4}>
      <form onSubmit={addNewType}>
        <FormControl>
          <FormLabel>Name</FormLabel>
          <Input
            type="text"
            borderRadius={0}
            name="name"
            onChange={handleChange}
          />
        </FormControl>
        <FormControl mt={3}>
          <FormLabel>icon</FormLabel>
          <Input
            type="text"
            borderRadius={0}
            border={"none"}
            name="icon"
            onChange={handleChange}
          />
        </FormControl>
        <FormControl mt={3}>
          <FormLabel>color</FormLabel>
          <Input
            type="text"
            borderRadius={0}
            name="color"
            onChange={handleChange}
          />
        </FormControl>

        <FormControl mt={3}>
          <FormLabel>payment Method</FormLabel>
          {/* <Input type="text"  /> */}
          <Select
            placeholder="---Select---"
            borderRadius={0}
            name="paymentMethod"
            onChange={handleChange}
          >
            <option value="paid">paid</option>
            <option value="unpaid">unpaid</option>
          </Select>
        </FormControl>
        <FormControl mt={3}>
          <FormLabel>leave Count</FormLabel>
          <Input
            type="number"
            borderRadius={0}
            name="leaveCount"
            onChange={handleChange}
          />
        </FormControl>
        <FormControl mt={3}>
          <FormLabel>period In</FormLabel>
          <Select
            placeholder="---Select---"
            borderRadius={0}
            name="periodIn"
            onChange={handleChange}
          >
            <option value="day">Day</option>
            <option value="month">Month</option>
            <option value="year">Year</option>
          </Select>
        </FormControl>
        <FormControl mt={3}>
          <FormLabel>total Days</FormLabel>
          <Input
            type="number"
            borderRadius={0}
            name="totalDays"
            onChange={handleChange}
          />
        </FormControl>
        <FormControl mt={3} display={"flex"} alignItems={"center"}>
          <FormLabel>Reset</FormLabel>
          <Checkbox
            type="boolian"
            borderRadius={0}
            name="isResetAble"
            onChange={(e)=>setDetails({
              ...details,
              [e.target.name]:e.target.checked
            })}
          />
        </FormControl>
        {details.isResetAble && (
          <FormControl mt={3}>
            <FormLabel>ReSet Based</FormLabel>
            <Input
              type="boolian"
              borderRadius={0}
              name="reSetBased"
              onChange={handleChange}
            />
          </FormControl>
        )}
        <FormControl mt={3}>
          <FormLabel>carry Forward Type</FormLabel>
          <Select
            placeholder="---Select---"
            borderRadius={0}
            name="carryForwardType"
            onChange={handleChange}
          >
            <option value="NoCarryForward">No Carry Forward</option>
            <option value="CarryForward">Carry Forward</option>
            <option value="CarryForwardWithExpire">
              Carry Forward With Expire
            </option>
          </Select>
        </FormControl>
        <FormControl mt={3} display={"flex"}>
          <FormLabel>Require Approval</FormLabel>
          <Checkbox
            type="boolian"
            borderRadius={0}
            name="isRequireApproval"
            onChange={(e)=>setDetails({
              ...details,
              [e.target.name]:e.target.checked
            })}
          />
        </FormControl>
        <FormControl mt={3} display={"flex"}>
          <FormLabel>Exclude Company Leaves</FormLabel>
          <Checkbox
            type="boolian"
            borderRadius={0}
            name="isExcludeCompanyLeaves"
            onChange={(e)=>setDetails({
              ...details,
              [e.target.name]:e.target.checked
            })}
          />
        </FormControl>
        <FormControl mt={3} display={"flex"}>
          <FormLabel>Is ExcludeHolidays</FormLabel>
          <Checkbox
            type="boolian"
            borderRadius={0}
            name="isExcludeHolidays"
            onChange={(e)=>setDetails({
              ...details,
              [e.target.name]:e.target.checked
            })}
          />
        </FormControl>

        {/* <RadioGroup
          onChange={(e) =>{
            console.log(e.target.value)
            setDetails({
              ...details,
              isExcludeHolidays: e.target.value === "yes" ? true : false,
            })}
          }
        >
          <FormControl isRequired>
            <FormLabel>Exclude Holidays</FormLabel>
            <Radio colorScheme="green" value="yes">
              Yes
            </Radio>
            <Radio colorScheme="red" value="no">
              No
            </Radio>
          </FormControl>
        </RadioGroup> */}

        <FormControl mt={3}>
          <FormLabel>leaveType</FormLabel>
          <Input
            type="text"
            borderRadius={0}
            name="leaveType"
            onChange={handleChange}
          />
        </FormControl>
        <Button type="submit" mt={4} borderRadius={0} colorScheme="red">
          Add
        </Button>
      </form>
    </Box>
  );
};

export default AddType;
