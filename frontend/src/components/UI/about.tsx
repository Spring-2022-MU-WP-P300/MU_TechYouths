import { useNavigate } from "react-router-dom";
import "./about.css";

const About = () => {
  const history = useNavigate();

  return (
    <div className="about">
      <div className="inner-section">
        <h1>About Us</h1>
        <p className="text">
          We are E-Furniture, A small but motivated company specializing in
          online furniture. We believe passionately in great bargains and
          excellent service, which is why we commit ourselves to giving you the
          best of both. If you’re looking for something new, you’re in the right
          place. We strive to be industrious and innovative, offering our
          customers something they want, putting their desires at the top of our
          priority list. Thank You for us!!
        </p>
        <div className="skills">
          <button onClick={() => history("/contact")}>Contact Us</button>
        </div>
      </div>
    </div>
  );
};

export default About;
