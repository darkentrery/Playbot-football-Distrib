import {
  editEventWindow, loginWindow,
} from "../actions/actions";
import {connect} from "react-redux";
import EventOrganizerComponent from "../../components/body/EventOrganizerComponent";


const mapStateToProps = (state) => {
  return {
    ...state,
    event: state.event.event,
    players: state.event.players,
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    funcs: {
      openEditEvent: () => {
        dispatch(editEventWindow(true));
      },
      openLogin: () => {
        dispatch(loginWindow(true));
      }
    }
  };
};

const VisibleEventOrganizer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EventOrganizerComponent);

export default VisibleEventOrganizer;