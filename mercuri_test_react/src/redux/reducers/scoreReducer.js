const initialState = {
  total: 0,
  scored: 0,
  result: 0,
  passed: false,
};

const minScore = 60;

const scoreReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_TOTAL":
      return {
        total: action.payload,
        scored: 0,
        result: 0,
        passed: false,
      };
    case "ADD_POINTS":
      return {
        ...state,
        scored: state.scored + action.payload,
      };
    case "GET_RESULT":
      return {
        ...state,
        result: Math.round((state.scored / state.total) * 100 * 10) / 10,
        passed: state.result >= minScore ? true : false,
      };
    case "RESET":
      return initialState;
    default:
      return state;
  }
};

export default scoreReducer;
