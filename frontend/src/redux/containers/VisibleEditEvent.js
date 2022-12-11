import {event, editEventWindow, successEditEventWindow, players, hiddenMap} from "../actions/actions";
import {connect} from "react-redux";
import EditEventComponent from "../../components/EditEventComponent";


const mapStateToProps = (state) => {
  return {
    ...state,
    isOpen: state.windows.isOpenEditEvent,
    event: state.event.event,
    isIPhone: state.app.isIPhone,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeComponent: () => {
      dispatch(editEventWindow(false));
    },
    openSuccessEditEvent: () => {
      dispatch(successEditEventWindow(true));
    },
    setEvent: (value) => {
      dispatch(event(value));
    },
    showMap: () => {
      dispatch(hiddenMap(false));
    },
  };
};

const VisibleEditEvent = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditEventComponent);

export default VisibleEditEvent;