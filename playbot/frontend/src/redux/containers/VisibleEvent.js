import {
  event,
  editEventWindow,
  cancelEventWindow,
  confirmPlayersWindow, players, steps
} from "../actions/actions";
import {connect} from "react-redux";
import EventComponent from "../../components/body/EventComponent";


const mapStateToProps = (state) => {
  return {
    ...state,
    // event: state.event.event,
    steps: state.event.steps,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    openEditEvent: () => {
      dispatch(editEventWindow(true));
    },
    setEvent: (value) => {
      dispatch(event(value));
    },
    setPlayers: (value) => {
      dispatch(players(value));
    },
    setSteps: (value) => {
      dispatch(steps(value));
    },
    openCancelEvent: () => {
      dispatch(cancelEventWindow(true));
    },
    openConfirmPlayers: () => {
      dispatch(confirmPlayersWindow(true));
    }
  };
};

const VisibleEditEvent = connect(
  mapStateToProps,
  mapDispatchToProps
)(EventComponent);

export default VisibleEditEvent;