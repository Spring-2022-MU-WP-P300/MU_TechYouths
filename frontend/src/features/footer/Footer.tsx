import "./footer.css";

const Footer = () => {
  return (
    <footer>
      <div className="content">
        <div className="left box">
          <div className="upper">
            <div className="topic">About us</div>
            <p>
              We are selling brand new furniture to our E_Furniture online shop
              for a reasonable price.
            </p>
          </div>
          <div className="lower">
            <div className="topic">Contact us</div>
            <div className="phone">
              <a href="#">
                <i className="fas fa-phone-volume"></i>++8801757-239088
              </a>
            </div>
            <div className="email">
              <a href="#">
                <i className="fas fa-envelope"></i>tapankantibasak@gmail.com
              </a>
            </div>
          </div>
        </div>
        <div className="middle box">
          <div className="topic">Our Services</div>
          <div>
            <a href="#">Bookcases Lighting Office suites Tables</a>
          </div>
          <div>
            <a href="#">Boards Computer furniture</a>
          </div>
          <div>
            <a href="#">Conference room tables</a>
          </div>
          <div>
            <a href="#">Filing cabinets, Lighting</a>
          </div>
          <div>
            <a href="#">Office chairs, Office desks</a>
          </div>
          <div>
            <a href="#"> Partition and panel systems Reception furniture</a>
          </div>
        </div>
        <div className="right box">
          <div className="topic">Please Subscribe us</div>
          <form action="#">
            <input type="text" placeholder="Enter email address" />
            <input type="submit" name="" value="Send" />
            <div className="media-icons">
              <a href="#">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#">
                <i className="fab fa-youtube"></i>
              </a>
              <a href="#">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </form>
        </div>
      </div>
      <div className="bottom"></div>
    </footer>
  );
};

export default Footer;
