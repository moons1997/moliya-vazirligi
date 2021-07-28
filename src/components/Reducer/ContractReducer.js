const ContractReducer = (state, action) => {
  switch (action.type) {
    case "HANDEL_INPUT_TEXT":
      return {
        ...state,
        [action.field]: action.payload,
      };

    default:
      return state;
  }
};

export default ContractReducer;
