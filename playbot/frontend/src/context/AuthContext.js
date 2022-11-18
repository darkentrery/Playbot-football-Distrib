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

const OpenMobileFirstPageContext = React.createContext({
  openMobileFirstPage: true,
  setOpenMobileFirstPage: () => {}
});

const OpenChoiceCityContext = React.createContext({
  openChoiceCity: false,
  setOpenChoiceCity: () => {}
});

const OpenSuccessRefreshPasswordContext = React.createContext({
  openSuccessRefreshPassword: false,
  setOpenSuccessRefreshPassword: () => {}
});

const OpenSuccessSignUpContext = React.createContext({
  openSuccessSignUp: false,
  setOpenSuccessSignUp: () => {}
});

const OpenSuccessSignUp2Context = React.createContext({
  openSuccessSignUp2: false,
  setOpenSuccessSignUp2: () => {}
});

export { OpenSignUpContext };
export { OpenLoginContext };
export { OpenRefreshPasswordContext };
export { OpenMobileFirstPageContext };
export { OpenChoiceCityContext };
export { OpenSuccessRefreshPasswordContext };
export { OpenSuccessSignUpContext };
export { OpenSuccessSignUp2Context };