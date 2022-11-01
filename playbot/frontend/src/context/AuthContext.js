import React from "react";


const OpenSignUpContext = React.createContext({
  openSignUp: false,
  setOpenSignUp: () => {}
});
export { OpenSignUpContext };