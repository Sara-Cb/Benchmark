import { store } from "./../store";
import { setTotal } from "./scoreActions";

export const setTest = (test) => {
  let questions = [];
  let totalScore = 0;
  for (let i = 0; i < test.length; ) {
    const random = Math.floor(Math.random() * test.length);
    if (!questions.includes(test[random])) {
      questions.push(test[random]);
      totalScore += test[random].score;
      i++;
    }
  }
  store.dispatch(setTotal(totalScore));
  return {
    type: "SET_TEST",
    payload: questions,
  };
};

export const nextQuestion = (answer) => {
  return {
    type: "NEXT",
    payload: answer,
  };
};

export const resetTest = () => {
  return {
    type: "RESET",
  };
};
