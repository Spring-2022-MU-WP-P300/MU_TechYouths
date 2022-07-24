import { Box, Typography } from "@mui/material";

import "./Contact.css";

export default function ContactPage() {
  return (
    <>
      <Box className="contact-container">
        <Box className="content">
          <Box className="left-side">
            <Box className="address details">
              <i className="fas fa-map-marker-alt"></i>
              <Box className="topic">Address</Box>
              <Box className="text-one">Amborkhana Sylhet</Box>
              <Box className="text-two">Eletric SupplyvDigonto-35</Box>
            </Box>
            <Box className="phone details">
              <i className="fas fa-phone-alt"></i>
              <Box className="topic">Phone</Box>
              <Box className="text-one">01757-239088</Box>
              <Box className="text-two">01711-111111</Box>
            </Box>
            <Box className="email details">
              <i className="fas fa-envelope"></i>
              <Box className="topic">Email</Box>
              <Box className="text-one">tapankantibasak@gmail.com</Box>
              <Box className="text-two">basaktapankanti@gmail.com</Box>
            </Box>
          </Box>
          <Box className="right-side">
            <Box className="topic-text">Send us a message</Box>
            <Typography component="p">
              If you have choice any product Please contact us , you can send me
              message from here. It's my pleasure to help you.
            </Typography>
            <form action="#">
              <Box className="input-box">
                <input type="text" placeholder="Enter your name" />
              </Box>
              <Box className="input-box">
                <input type="text" placeholder="Enter your email" />
              </Box>
              <Box className="input-box message-box">
                <textarea placeholder="Enter your message"></textarea>
              </Box>
              <Box className="button">
                <input type="button" value="Send Now" />
              </Box>
            </form>
          </Box>
        </Box>
      </Box>
    </>
  );
}
