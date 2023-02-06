import {
  createEventWindow,
  successCreateEventWindow, event
} from "../actions/actions";
import {connect} from "react-redux";
import CreateEventComponent from "../../components/popups/createEventComponent/CreateEventComponent";



const mapStateToProps = (state) => {
  return {
    ...state,
    isOpen: state.windows.isOpenCreateEvent,
    isIPhone: state.app.isIPhone,
    user: state.user.user,
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