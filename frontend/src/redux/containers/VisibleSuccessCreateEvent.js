import {successCreateEventWindow} from "../actions/actions";
import {connect} from "react-redux";
import SuccessCreateEventComponent from "../../components/success/SuccessCreateEventComponent";



const mapStateToProps = (state) => {
  return {
    ...state,
    isOpen: state.windows.isOpenSuccessCreateEvent,
    event: state.event.event,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeComponent: () => {
      dispatch(successCreateEventWindow(false));
    },
  };
};


const VisibleSuccessCreateEvent = connect(
  mapStateToProps,
  mapDispatchToProps
)(SuccessCreateEventComponent);



export default VisibleSuccessCreateEvent;