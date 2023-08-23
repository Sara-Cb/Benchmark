export const setTotal = (total) => {
  return {
    type: "SET_TOTAL",
    payload: total,
  };
};

export const addPoints = (points) => {
  return {
    type: "ADD_POINTS",
    payload: points,
  };
};

export const getResult = () => {
  return {
    type: "GET_RESULT",
  };
};

export const resetScore = () => {
  return {
    type: "RESET",
  };
};
