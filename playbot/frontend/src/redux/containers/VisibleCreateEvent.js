import {
  createEventWindow,
  successCreateEventWindow, event
} from "../actions/actions";
import {connect} from "react-redux";
import CreateEventComponent from "../../components/CreateEventComponent";



const mapStateToProps = (state) => {
  return {
    ...state,
    isOpen: state.windows.isOpenCreateEvent,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeComponent: () => {
      dispatch(createEventWindow(false));
    },
    openSuccessCreateEvent: () => {
      dispatch(successCreateEventWindow(true));
    },
    setEvent: (value) => {
      dispatch(event(value));
    },
  };
};


const VisibleCreateEvent = connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateEventComponent);



export default VisibleCreateEvent;