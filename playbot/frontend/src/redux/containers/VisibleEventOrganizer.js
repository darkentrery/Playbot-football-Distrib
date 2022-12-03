import {
  editEventWindow,
} from "../actions/actions";
import {connect} from "react-redux";
import EventOrganizerComponent from "../../components/body/EventOrganizerComponent";


const mapStateToProps = (state) => {
  return {
    ...state,
    event: state.event.event,
    players: state.event.players,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    funcs: {
      openEditEvent: () => {
        dispatch(editEventWindow(true));
      }
    }
  };
};

const VisibleEventOrganizer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EventOrganizerComponent);

export default VisibleEventOrganizer;