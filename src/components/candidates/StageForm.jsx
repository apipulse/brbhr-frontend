import React, { useState } from "react";
import { Box, FormControl, FormLabel, Input, Button, Select } from "@chakra-ui/react";
import { addStageToJobPosting } from "../../services/CandidateService"; // Import the service function

const StageForm = ({ jobPostingId, onStageAdded }) => {
  const [stage, setStage] = useState({
    id:Math.random(),
    name: "",
    description: "",
    roundNumber: 1,
    recruitmentStageType:'',
    Manager:''
  });
  console.log(jobPostingId);
  const handleChange = (e) => {
    setStage({ ...stage, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addStageToJobPosting(jobPostingId, stage);
      console.log("Stage added to job posting.", jobPostingId, stage);
      onStageAdded(); // Callback to refresh the list or update UI
    } catch (error) {
      console.error("Error adding stage:", error);
    }
  };

  console.log(stage)

  return (
    <Box p={4}>
      <form onSubmit={handleSubmit}>
        {/* Form fields for stage details */}
        <FormControl id="name" isRequired>
          <FormLabel>Stage</FormLabel>
          {/* <Input name="name" type="text" onChange={handleChange} /> */}
          <Input type="text" name="name" borderRadius={0} onChange={handleChange}/>
        </FormControl>
        <FormControl mt={4} id="recruitmentStageType" isRequired>
          <FormLabel>Stage Type</FormLabel>
          {/* <Input name="name" type="text" onChange={handleChange} /> */}
          <Select name="recruitmentStageType" borderRadius={0} onChange={handleChange}>
            {/* <Input name="stageType" type="text" borderRadius={0}/> */}
            <option value={'INITIAL'} >INITIAL</option>
            <option value={'TEST'} >TEST</option>
            <option value={'INTERVIEW'} >INTERVIEW</option>
            <option value={'HIRED'} >HIRED</option>
          </Select>
        </FormControl>
        <FormControl id="description" mt={4}>
          <FormLabel>Description</FormLabel>
          <Input name="description" type="text" borderRadius={0} onChange={handleChange} />
        </FormControl>
        <FormControl id="roundNumber" mt={4}>
          <FormLabel>Round Number</FormLabel>
          <Input
            name="roundNumber"
            type="number"
            min={1}
           borderRadius={0}  onChange={handleChange}
          />
        </FormControl>

        <FormControl id="roundNumber" mt={4}>
          <FormLabel>Manager</FormLabel>
          <Input borderRadius={0}
            name="Manager"
            type="text"
            min={1}
            onChange={handleChange}
          />
        </FormControl>
        <Button mt={4} colorScheme="red" borderRadius={0} type="submit">
          Add Stage
        </Button>
      </form>
    </Box>
  );
};

export default StageForm;
