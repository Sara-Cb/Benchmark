import { useEffect, useState } from "react";
import { Button, Nav, Navbar, Row } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

const MyNavbar = () => {
  const location = useLocation();
  const [testing, setTesting] = useState(false);
  useEffect(() => {
    if (location.pathname === "/test") {
      setTesting(true);
    } else {
      setTesting(false);
    }
  }, [location]);
  return (
    <Navbar>
      <Row
        className={
          testing ? "justify-content-between" : "justify-content-start"
        }
      >
        <Navbar.Brand as={Link} to={"/"}>
          <img
            className="logo"
            src={process.env.PUBLIC_URL + "/logo.png"}
            alt="logo"
          />
        </Navbar.Brand>
        {testing && (
          <Nav.Link as={Link} to={"/"}>
            <Button className="pause">PAUSE</Button>
          </Nav.Link>
        )}
      </Row>
    </Navbar>
  );
};
export default MyNavbar;
