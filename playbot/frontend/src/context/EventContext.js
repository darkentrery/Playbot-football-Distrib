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
  setOpenSuccessCreateEvent: () => {},
  createEventId: false,
  setCreateEventId: () => {}
});

const OpenEditEventContext = React.createContext({
  openEditEvent: false,
  setOpenEditEvent: () => {}
});

const OpenSuccessEditEventContext = React.createContext({
  openSuccessEditEvent: false,
  setOpenSuccessEditEvent: () => {}
});

export { OpenCreateEventContext, OpenCreateEventUnAuthContext, OpenSuccessCreateEventContext, OpenEditEventContext, OpenSuccessEditEventContext };