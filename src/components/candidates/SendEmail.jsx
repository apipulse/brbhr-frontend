import React, { useRef, useState } from "react";
import {
  Button,
  Box,
  FormControl,
  FormLabel,
  Input,
  Textarea,useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import emailjs from "emailjs-com";

const ContactForm = ({ EMailId }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });
  const toast = useToast();
  console.log(EMailId);
  const [data, setData] = useState({
    Name: "",
    Email: EMailId,
    Message: "",
    Subject: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [Email, setEmail] = useState("alihusnain9@yahoo.com");
  const [successMessage, setSuccessMessage] = useState("");
  const [name, setName] = useState("Ali Husnain");
  console.log(data);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  // WRITE YOUR COMPANY SERVICE ID AND TEMPLATE ID TO SEND EMAILS TO CANDIDATES
  const templateId = "";
  const serviceId = "";
  const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(serviceId, templateId, form.current, "ciWvzALRa60t_ZUL1")
      .then(
        (result) => {
          console.log(result.text);
          setData({ Name: "", Email: "", Subject: "", Message: "" });
          // alert("Email has been sent successfully!");
          toast({ title: "Email has been sent successfully!", status: "success" });
        },
        (error) => {
          toast({ title: "Error Sending Email", description: error.message, status: "error" });
          console.log(error.text, "There is an error in the program ");
        }
      );
  };
  return (
    <Box p={4}>
      <form ref={form} onSubmit={sendEmail}>
        <FormControl mb={4} isRequired>
          <FormLabel htmlFor="name">Your Name</FormLabel>
          <Input
            type="text"
            value={data.Name}
            id="name"
            onChange={(e) => handleChange(e)}
            name="Name"
          />
        </FormControl>
        <FormControl mb={4} isRequired>
          <FormLabel htmlFor="email">To Email</FormLabel>
          <Input
            type="email"
            id="email"
            placeholder={EMailId}
            value={EMailId}
            onChange={(e) => setData(e.target.value)}
            name="Email"
          />
        </FormControl>
        <FormControl mb={4} isRequired>
          <FormLabel htmlFor="subject">Subject</FormLabel>
          <Input
            type="text"
            id="subject"
            value={data.Subject}
            name="Subject"
            onChange={(e) => handleChange(e)}
          />
        </FormControl>
        <FormControl mb={4} isRequired>
          <FormLabel htmlFor="message">Your Message</FormLabel>
          <Textarea
            id="message"
            value={data.Message}
            name="Message"
            onChange={(e) => handleChange(e)}
          />
        </FormControl>
        <Button
          isLoading={isLoading}
          borderRadius={0}
          colorScheme="red"
          type="submit"
          disabled={isLoading}
        >
          Send Email
        </Button>
        {/* {successMessage && <Text color="green">{successMessage}</Text>} */}
      </form>
    </Box>
  );
};

export default ContactForm;
