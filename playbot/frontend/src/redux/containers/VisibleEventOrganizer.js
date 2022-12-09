import {
  editEventWindow, hiddenMap, loginWindow,
} from "../actions/actions";
import {connect} from "react-redux";
import EventOrganizerComponent from "../../components/body/EventOrganizerComponent";


const mapStateToProps = (state) => {
  return {
    ...state,
    event: state.event.event,
    user: state.user,
    hiddenMap: state.event.hiddenMap,
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

const VisibleEventOrganizer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EventOrganizerComponent);

export default VisibleEventOrganizer;