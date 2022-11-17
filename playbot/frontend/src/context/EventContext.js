import React from "react";


const OpenCreateEventContext = React.createContext({
  openCreateEvent: false,
  setOpenCreateEvent: () => {}
});

const OpenCreateEventUnAuthContext = React.createContext({
  openCreateEventUnAuth: false,
  setOpenCreateEventUnAuth: () => {}
});

const OpenSuccessCreateEventContext = React.createContext({
  openSuccessCreateEvent: false,
  setOpenSuccessCreateEvent: () => {}
});

export { OpenCreateEventContext, OpenCreateEventUnAuthContext, OpenSuccessCreateEventContext };