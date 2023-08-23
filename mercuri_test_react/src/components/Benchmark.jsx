import { Button, Col, Container, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { nextQuestion, resetTest } from "../redux/actions/testActions";
import { useEffect, useState } from "react";
import {
  addPoints,
  getResult,
  resetScore,
} from "../redux/actions/scoreActions";

const Benchmark = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const questions = useSelector((state) => state.test.questions);
  const current = useSelector((state) => state.test.currentQuestion);
  const total = useSelector((state) => state.test.lenght);
  const inProgress = useSelector((state) => state.test.inProgress);
  const [answer, setAnswer] = useState([]);
  let [currentQuestion, setCurrentQuestion] = useState({});

  const checkAnswer = () => {
    if (
      currentQuestion.type === "single_choice" ||
      currentQuestion.type === "multiple_choice"
    ) {
      const sortedGiven = answer.slice().sort();
      const sortedCorrect = currentQuestion.correctAnswers.slice().sort();

      if (arraysEqual(sortedGiven, sortedCorrect)) {
        dispatch(addPoints(currentQuestion.score));
      }
    } else if (currentQuestion.type === "order") {
      if (arraysEqual(answer, currentQuestion.correctAnswers)) {
        dispatch(addPoints(currentQuestion.score));
      }
    }
    setAnswer([]);
  };

  const arraysEqual = (a, b) => {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  };

  const handleAnswerChange = (option) => {
    if (currentQuestion.type === "single_choice") {
      setAnswer([option]);
    } else if (currentQuestion.type === "multiple_choice") {
      if (answer.includes(option)) {
        setAnswer(answer.filter((ans) => ans !== option));
      } else {
        setAnswer([...answer, option]);
      }
    } else if (currentQuestion.type === "order") {
    }
  };

  const handleNext = (e) => {
    e.preventDefault();
    checkAnswer();
    dispatch(nextQuestion(answer));
    if (current === total - 1) {
      dispatch(getResult());
      navigate("/result");
    }
  };

  const handleReset = () => {
    dispatch(resetScore());
    dispatch(resetTest());
    navigate("/");
  };

  useEffect(() => {
    setCurrentQuestion(questions[current]);
    if (!inProgress || current >= total - 1) {
      navigate("/result");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questions, current]);

  return (
    <Container fluid className="pageContainer" id="containerBenchmark">
      {!currentQuestion ? (
        <Spinner variant="light" />
      ) : (
        <div>
          <Row>
            <h2 id="question">{currentQuestion.question}</h2>
          </Row>

          {currentQuestion.type === "single_choice" ||
          currentQuestion.type === "multiple_choice" ? (
            <Row xs={1} sm={2} id="answersDiv">
              {currentQuestion.options.map((option, index) => (
                <Col key={index}>
                  <input
                    type={
                      currentQuestion.type === "single_choice"
                        ? "radio"
                        : "checkbox"
                    }
                    name="answers"
                    id={option}
                    value={option}
                    onChange={() => handleAnswerChange(option)}
                    checked={answer.includes(option)}
                  />
                  <label className="answer" htmlFor={option}>
                    {option}
                  </label>
                </Col>
              ))}
            </Row>
          ) : (
            <Row xs={1} sm={2} id="answersDiv"></Row>
          )}
        </div>
      )}
      <Row id="bottom">
        <Button
          disabled={answer === [] ? true : false}
          onClick={handleNext}
          id="nxtBtn"
        >
          {current === total - 1 ? "SHOW RESULTS" : "NEXT QUESTION"}
        </Button>
        <p id="numberQ">
          QUESTION {current + 1} / {total}
        </p>
      </Row>
      <Row>
        <p className="reset">
          Any problems?{" "}
          <span onClick={handleReset} className="link">
            Reset
          </span>
        </p>
      </Row>
    </Container>
  );
};

export default Benchmark;
