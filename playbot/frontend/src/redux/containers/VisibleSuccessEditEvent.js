import {successEditEventWindow} from "../actions/actions";
import {connect} from "react-redux";
import SuccessEditEventComponent from "../../components/success/SuccessEditEventComponent";


const mapStateToProps = (state) => {
  return {
    ...state,
    isOpen: state.windows.isOpenSuccessEditEvent,
    event: state.event.event,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeComponent: () => {
      dispatch(successEditEventWindow(false));
    },
  };
};

const VisibleSuccessEditEvent = connect(
  mapStateToProps,
  mapDispatchToProps
)(SuccessEditEventComponent);

export default VisibleSuccessEditEvent;