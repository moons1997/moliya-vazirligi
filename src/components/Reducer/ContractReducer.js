const ContractReducer = (state, action) => {
  switch (action.type) {
    case "HANDEL_INPUT_TEXT":
      return {
        ...state,
        [action.field]: action.payload,
      };
    case "ADD_ACCOUNTS_TEXT":
      return {
        ...state,
        accounts: [...state.accounts, action.payload],
      };
    case "EDIT_ACCOUNTS_TEXT":
      const idx = state.accounts.findIndex((t) => t.id === action.id);
      const current = action.payload;
      current.status = action.status;
      const allAccounts = state.accounts;
      allAccounts.splice(idx, 1, current);

      return {
        ...state,
        accounts: allAccounts,
      };

    case "DEL_ACCOUNTS_TEXT":
      // const delId = state.accounts.findIndex((t) => t.id === action.id);
      // const delObject = action.payload;
      // const AllAccounts = state.accounts;
      // AllAccounts.splice(delId, 1, delObject);
      // const newAccounts = AllAccounts.filter((item) => item.id != action.id);

      const delId = state.accounts.findIndex((item) => item.id === action.id);
      const delObject = state.accounts[delId];
      delObject.status = action.status;
      const AllAccounts = state.accounts;
      AllAccounts.splice(delId, 1, delObject);
      return {
        ...state,
        accounts: AllAccounts,
      };

    case "UPDATA_INPUT_TEXT":
      const {
        Accounts,
        Branches,
        accounter,
        adress,
        contactinfo,
        director,
        fullname,
        id,
        inn,
        isbudget,
        mobilenumber,
        oblastid,
        oked,
        regionid,
        vatcode,
        shortname,
      } = action.payload;
      return {
        accounter,
        adress,
        contactinfo,
        director,
        fullname,
        id,
        inn,
        isbudget,
        mobilenumber,
        oblastid,
        oked,
        regionid,
        vatcode,
        shortname,
        accounts: Accounts,
        branches: Branches,
      };
    default:
      return state;
  }
};

export default ContractReducer;
