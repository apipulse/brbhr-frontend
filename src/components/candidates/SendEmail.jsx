import React, { useRef, useState } from "react";
import {
  Button,
  Box,
  FormControl,
  FormLabel,
  Input,
  Textarea,
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

  console.log(EMailId);
  const [data, setData] = useState({
    Name: "",
    Email: "alihusnain9@yahoo.com",
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
  //   // const { email, firstName, lastName } = candidate;
  //   const templateId = "template_t9mj75j";
  //   const serviceId = "service_efkueod";

  //   // const message = `Dear ${firstName} ${lastName},

  //   // ... Add your personalized email content ...

  //   // Best regards,

  //   // The [Your Company Name] Team`;

  //   try {
  //     await emailjs.sendForm(serviceId, templateId, {
  //       to_name: "Ali",
  //       to_email: data.Email,
  //       from_name: data.Name,
  //       message: data.Message,
  //     });
  //     console.log("Email sent successfully to", data.Email);
  //   } catch (error) {
  //     console.error("Error sending email:", error);
  //   }
  // };

  const templateId = "template_55z17rj";
  const serviceId = "service_efkueod";
  const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(serviceId, templateId, form.current, "ciWvzALRa60t_ZUL1")
      .then(
        (result) => {
          console.log(result.text);
          setData({ Name: "", Email: "", Subject: "", Message: "" });
          alert("Email has been sent successfully!");
        },
        (error) => {
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
            placeholder={Email}
            value={data.Email}
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
          colorScheme="blue"
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
