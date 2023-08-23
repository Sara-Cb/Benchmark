const initialState = {
  questions: [],
  answers: [],
  lenght: 0,
  currentQuestion: 0,
  inProgress: false,
};

const testReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_TEST":
      return {
        ...state,
        questions: action.payload,
        lenght: action.payload.length,
        currentQuestion: 0,
        inProgress: true,
      };
    case "NEXT":
      return {
        ...state,
        answers: [...state.answers, action.payload],
        currentQuestion: state.currentQuestion + 1,
      };
    case "RESET":
      return initialState;

    default:
      return state;
  }
};

export default testReducer;
