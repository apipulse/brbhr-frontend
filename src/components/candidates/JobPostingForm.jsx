import React, { useState, useContext } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Textarea,
  NumberInput,
  Text,
  NumberInputField,
} from "@chakra-ui/react";
import { postJob } from "../../services/CandidateService";
import NoteContext from "../../Context/NoteContext";

const JobPostingForm = () => {
  const abc = useContext(NoteContext);
  abc.setName("RECRUITMENT");

  const [jobPosting, setJobPosting] = useState({
    title: "",
    description: "",
    postingDate: "",
    closingDate: "",
    jobPosition: "",
    recruitingManager: "",
    vacancy: 1,
    requiredSkills: "",
    experienceRequired: 1,
    stages: [],
  });

  const handleChange = (e) => {
    if (e.target.name === "requiredSkills") {
      setJobPosting({
        ...jobPosting,
        requiredSkills: e.target.value.split(",").map((skill) => skill.trim()),
      });
    } else {
      setJobPosting({ ...jobPosting, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Job Posting Data:", jobPosting);
      const response = await postJob(jobPosting);
      console.log("Job Posted:", response);
      setJobPosting({
        title: "",
        description: "",
        postingDate: "",
        closingDate: "",
        jobPosition: "",
        recruitingManager: "",
        vacancy: 1,
        requiredSkills: "",
        experienceRequired: 1,
      });
      alert("Job Has Been Posted.");
    } catch (error) {
      console.error("Error posting job:", error);
      // Handle error
    }
  };

  return (
    <Box p={4}>
      <Text fontSize={"1.7rem"} textAlign={"left"} fontWeight={"bold"} mb={2}>
        Post A New Job
      </Text>
      <form onSubmit={handleSubmit}>
        <FormControl id="title" isRequired mt={4}>
          <FormLabel>Title</FormLabel>
          <Input name="title" type="text" onChange={handleChange} />
        </FormControl>
        <FormControl id="postingDate" isRequired mt={4}>
          <FormLabel>Posting Date</FormLabel>
          <Input name="postingDate" type="date" onChange={handleChange} />
        </FormControl>
        <FormControl id="closingDate" isRequired mt={4}>
          <FormLabel>Closing Date</FormLabel>
          <Input name="closingDate" type="date" onChange={handleChange} />
        </FormControl>
        <FormControl id="description" isRequired mt={4}>
          <FormLabel>Description</FormLabel>
          <Input name="description" type="text" onChange={handleChange} />
        </FormControl>
        <FormControl id="jobPosition" isRequired mt={4}>
          <FormLabel>Job Position</FormLabel>
          <Input name="jobPosition" type="text" onChange={handleChange} />
        </FormControl>
        <FormControl id="recruitingManager" mt={4}>
          <FormLabel>Recruiting Manager</FormLabel>
          <Input name="recruitingManager" type="text" onChange={handleChange} />
        </FormControl>
        <FormControl id="vacancy" mt={4}>
          <FormLabel>Vacancy</FormLabel>
          <NumberInput min={1}>
            <NumberInputField name="vacancy" onChange={handleChange} />
          </NumberInput>
        </FormControl>
        <FormControl id="requiredSkills" mt={4}>
          <FormLabel>Required Skills</FormLabel>
          <Textarea name="requiredSkills" onChange={handleChange} />
        </FormControl>
        <FormControl id="experienceRequired" mt={4}>
          <FormLabel>Experience Required (years)</FormLabel>
          <NumberInput min={0}>
            <NumberInputField
              name="experienceRequired"
              onChange={handleChange}
            />
          </NumberInput>
        </FormControl>
        <Button mt={4} colorScheme="blue" type="submit">
          Post Job
        </Button>
      </form>
    </Box>
  );
};

export default JobPostingForm;
