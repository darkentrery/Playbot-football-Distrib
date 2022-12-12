import {event, hiddenMap, leaveEventWindow} from "../actions/actions";
import {connect} from "react-redux";
import {LeaveEventComponent} from "../../components/popups/LeaveEventComponent";


const mapStateToProps = (state) => {
  return {
    ...state,
    isOpen: state.windows.isOpenLeaveEvent,
    event: state.event.event,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    funcs: {
      closeComponent: () => {
        dispatch(leaveEventWindow(false));
      },
      setEvent: (value) => {
        dispatch(event(value));
      },
      showMap: () => {
        dispatch(hiddenMap(false));
      },
      removeMap: () => {
        dispatch(hiddenMap(true));
      },
    }
  };
};

const VisibleLeaveEvent = connect(
  mapStateToProps,
  mapDispatchToProps
)(LeaveEventComponent);

export default VisibleLeaveEvent;