import {createEventUnAuthWindow, createEventWindow, event} from "../actions/actions";
import {connect} from "react-redux";
import NoEventsComponent from "../../components/noEventsComponent/NoEventsComponent";


const mapStateToProps = (state) => {
  return {
    ...state,
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    openCreateEvent: () => {
      dispatch(createEventWindow(true));
    },
    openCreateEventUnAuth: () => {
      dispatch(createEventUnAuthWindow(true));
    },
    setEvent: (value) => {
      dispatch(event(value));
    },
  };
};

const VisibleNoEvents = connect(
  mapStateToProps,
  mapDispatchToProps
)(NoEventsComponent);


export default VisibleNoEvents;