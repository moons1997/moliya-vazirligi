const ContractReducer = (state, action) => {
  switch (action.type) {
    case 'HANDEL_INPUT_TEXT':
      return {
        ...state,
        [action.field]: action.payload,
      };
    case 'ADD_ACCOUNTS_TEXT':
      return {
        ...state,
        accounts: [...state.accounts, action.payload],
      };
    case 'EDIT_ACCOUNTS_TEXT':
      // const idx = state.todos.findIndex(t => t.id === action.id);
      // const todo = Object.assign({}, state.todos[idx]);
      // todo.text = action.text;
      // const todos = Object.assign([], state.todos);
      // todos.splice(idx, 1, todo);
      // return {
      //   counter: state.counter,
      //   todos: todos,
      // };

      const idx = state.Accounts.findIndex((t) => t.id === action.id);
      const current = action.payload;
      current.Status = action.status;
      const allAccounts = state.Accounts;
      allAccounts.splice(idx, 1, current);

      return {
        ...state,
        Accounts: allAccounts,
      };

    case 'UPDATA_INPUT_TEXT':
      state = action.payload;
      return action.payload;
    default:
      return state;
  }
};

export default ContractReducer;
