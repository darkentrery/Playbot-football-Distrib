import {createEventUnAuthWindow, createEventWindow} from "../actions/actions";
import {connect} from "react-redux";
import BoardCreateEventComponent from "../../components/body/BoardCreateEventComponent";


const mapStateToProps = (state) => {
  return {
    ...state,
    isAuth: state.user.isAuth,
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
  };
};

const VisibleBoardCreateEvent = connect(
  mapStateToProps,
  mapDispatchToProps
)(BoardCreateEventComponent);


export default VisibleBoardCreateEvent;