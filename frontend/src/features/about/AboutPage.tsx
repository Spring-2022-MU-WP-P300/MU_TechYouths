import { Box, Button, Typography } from "@mui/material";
import { useHistory } from "react-router-dom";

import "./About.css";

export default function AboutPage() {
  const history = useHistory();

  return (
    <Box className="about">
      <Box className="inner-section">
        <Typography gutterBottom variant="h1">
          About Us
        </Typography>
        <Typography component="p" className="text">
          We are E-Furniture, A small but motivated company specializing in
          online furniture. We believe passionately in great bargains and
          excellent service, which is why we commit ourselves to giving you the
          best of both. If you’re looking for something new, you’re in the right
          place. We strive to be industrious and innovative, offering our
          customers something they want, putting their desires at the top of our
          priority list. Thank You for us!!
        </Typography>
        <Box className="skills">
          <Button onClick={() => history.push("/contact")}>Contact Us</Button>
        </Box>
      </Box>
    </Box>
  );
}
