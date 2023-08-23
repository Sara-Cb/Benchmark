import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { resetScore } from "../redux/actions/scoreActions";
import { resetTest } from "../redux/actions/testActions";

const Result = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const scoreData = useSelector((state) => state.score);
  const testData = useSelector((state) => state.test);

  const [correctPercentage, setCorrectPercentage] = useState(0);
  const [wrongPercentage, setWrongPercentage] = useState(0);

  const handleReset = () => {
    dispatch(resetScore());
    dispatch(resetTest());
    navigate("/");
  };

  useEffect(() => {
    if (
      !testData.inProgress ||
      testData.currentQuestion < testData.lenght - 1
    ) {
      navigate("/");
    } else {
      setCorrectPercentage(scoreData.result);
      setWrongPercentage(100 - scoreData.result);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container fluid className="pageContainer" id="containerResult">
      <h2>Results</h2>
      <h4>The summary of your answers:</h4>
      <Row id="result">
        <Col className="center">
          <div id="esito">
            {scoreData.passed ? (
              <div id="congrats">
                <h3>Congratulations!</h3>
                <p>You passed the exam!</p>
                <span>We'll send you the certificate in few minutes.</span>
              </div>
            ) : (
              <div id="ohNo">
                <h3>Oh No!</h3>

                <p>You have not passed the exam.</p>
                <span>It will be better next time!</span>
              </div>
            )}
          </div>
        </Col>
        <Col xs={12}>
          <Row
            xs={1}
            sm={2}
            className="d-flex w-100 align-items-center justify-content-between"
          >
            <Col id="correct" className="fit">
              <h4>Correct</h4>
              <p className="perc">{correctPercentage}%</p>
            </Col>
            <Col id="wrong" className="fit">
              <h4>Wrong</h4>
              <p className="perc">{wrongPercentage}%</p>
            </Col>
          </Row>
        </Col>
        <Col xs={12} className="center">
          <Button onClick={handleReset}>
            {scoreData.passed ? "BACK" : "TRY AGAIN"}
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Result;
