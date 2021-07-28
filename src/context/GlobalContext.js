import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

// my comonent
// import Toast from "components/Toast";

export const contextApi = createContext();
contextApi.displayName = "GlobalContext";

// btoa() -> codlaydi
// atob() -> decodlaydi

const initialSate = {
  token: "",
  userinfo: {},
};

const defaultBankList = {
  rows: [
    {
      bankname: "Чиланзарский филиал Халк банк",
      code: "00825",
      id: 3,
      name: "00825 - Чиланзарский филиал Халк банк",
      status: "Актив",
    },
  ],
  total: 1,
};
const defaultContractList = {
  rows: [
    {
      adress: "АРАЛ МПЖ АЖЕНИЯЗ КОШЕСИ",
      contactinfo: "Moliya",
      fullname: "ХАЛЫК ДЕПУТАТЛАРЫ МОЙНАК РАЙОНЛЫК КЕНЕСИ СЕКРЕТАРИАТЫ",
      id: 56,
      inn: "207332898",
      mobilenumber: "1234567",
      shortname: "ХДМРКС",
      vatcode: "777",
    },
  ],
  total: 1,
};

const GlobalContext = ({ children }) => {
  const [authDetails, setAuthDetails] = useState(initialSate);
  const [banklist, setBanklist] = useState(defaultBankList);
  const [contractlist, setContractlist] = useState(defaultContractList);
  // console.log("auth details", authDetails.token);
  /* ------ axios config ------ */
  axios.defaults.baseURL = "http://templ-api.webase.uz/";
  axios.defaults.headers.common["Authorization"] =
    "Bearer " + authDetails.token;

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    
    if (token) {
      setAuthDetails((state) => ({
        ...state,
        token,
        userinfo: user,
      }));
    }
  }, []);

  useEffect(() => {}, [authDetails]);

  // console.log(banklist);
  // console.log(!isEmpty(banklist));
  // console.log(typeof banklist.rows);

  const LoginF = ({ username, password }) => {
    return axios.post("Account/GenerateToken", {
      username,
      password,
    });
  };

  const LoginOut = () => {
    localStorage.clear();
    setAuthDetails(initialSate);
  };
  // console.log(window.location);
  // window.onbeforeunload = function () {
  //   console.log("loading berfoere++++++++++++++++++++");
  // };

  return (
    <contextApi.Provider
      value={{
        LoginF,
        LoginOut,
        setAuthDetails,
        authDetails,
        banklist,
        setBanklist,
        contractlist,
        setContractlist,
      }}
    >
      {children}
    </contextApi.Provider>
  );
};

export default GlobalContext;
