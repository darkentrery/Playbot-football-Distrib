import {
  event,
  editEventWindow,
  successEditEventWindow,
  hiddenMap,
  repeatEventWindow,
  successCreateEventWindow
} from "../actions/actions";
import {connect} from "react-redux";
import {RepeatEventComponent} from "../../components/popups/RepeatEventComponent";


const mapStateToProps = (state) => {
  return {
    ...state,
    isOpen: state.windows.isOpenRepeatEvent,
    event: state.event.event,
    isIPhone: state.app.isIPhone,
    user: state.user.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeComponent: () => {
      dispatch(repeatEventWindow(false));
    },
    openSuccessCreateEvent: () => {
      dispatch(successCreateEventWindow(true));
    },
    setEvent: (value) => {
      dispatch(event(value));
    },
    showMap: () => {
      dispatch(hiddenMap(false));
    },
  };
};

const VisibleRepeatEvent = connect(
  mapStateToProps,
  mapDispatchToProps
)(RepeatEventComponent);

export default VisibleRepeatEvent;