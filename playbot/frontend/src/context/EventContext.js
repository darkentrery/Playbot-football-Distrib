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

const OpenEditEventContext = React.createContext({
  openEditEvent: false,
  setOpenEditEvent: () => {}
});

export { OpenCreateEventContext, OpenCreateEventUnAuthContext, OpenSuccessCreateEventContext, OpenEditEventContext };