import React from "react";


const OpenSignUpContext = React.createContext({
  openSignUp: false,
  setOpenSignUp: () => {}
});

const OpenLoginContext = React.createContext({
  openLogin: false,
  setOpenLogin: () => {}
});

const OpenRefreshPasswordContext = React.createContext({
  openRefreshPassword: false,
  setOpenRefreshPassword: () => {}
});

export { OpenSignUpContext };
export { OpenLoginContext };
export { OpenRefreshPasswordContext };