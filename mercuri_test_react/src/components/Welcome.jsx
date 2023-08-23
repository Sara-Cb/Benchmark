import { Button, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setTest } from "../redux/actions/testActions";
import questionsData from "./../test.json";

const Welcome = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inProgress = useSelector((state) => state.test.inProgress);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inProgress) {
      dispatch(setTest(questionsData));
    }
    navigate("/test");
  };

  return (
    <Container fluid className="pageContainer" id="containerWelcome">
      <Row id="start">
        <Col>
          <h1>
            Welcome {inProgress ? "back" : ""} to <b>your exam</b>
          </h1>
          <h3>Instructions</h3>
          <p className="pe-sm-5 me-sm-5">
            We don't expect most people to know the answers to all of these
            questions, so don't worry if you're unsure of a few of them.
          </p>
        </Col>
      </Row>

      <ul>
        <li>
          Each question can only be <b>answered once</b>.
        </li>
        <li>
          Changing browser tab or opening other windows will{" "}
          <b>invalidate the question</b>.
        </li>
        <li>
          This exam will take approx. <b>0-5 minutes</b>.
        </li>
      </ul>

      <Row id="proceed">
        <Button onClick={handleSubmit} className="but">
          {inProgress ? "RESUME" : "START NOW"}
        </Button>
      </Row>
    </Container>
  );
};

export default Welcome;
