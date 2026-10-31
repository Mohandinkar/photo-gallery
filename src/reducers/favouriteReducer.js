
const favouriteReducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_FAVOURITE":
      if (state.includes(action.payload)) {
        return state.filter((id) => id !== action.payload);
      }

      return [...state, action.payload];

    default:
      return state;
  }
};  

export default favouriteReducer;