import {endEventWindow, event, game} from "../actions/actions";
import {connect} from "react-redux";
import {EndEventComponent} from "../../components/popups/EndEventComponent";


const mapStateToProps = (state) => {
  return {
    ...state,
    isOpen: state.windows.isOpenEndEvent,
    event: state.event.event,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeComponent: () => {
      dispatch(endEventWindow(false));
    },
    setEvent: (value) => {
      dispatch(event(value));
    },
  };
};

const VisibleEndEvent= connect(
  mapStateToProps,
  mapDispatchToProps
)(EndEventComponent);

export default VisibleEndEvent;