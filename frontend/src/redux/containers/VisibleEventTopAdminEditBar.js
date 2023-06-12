import {
    editEventWindow, hiddenMap, loginWindow,
  } from "../actions/actions";
  import {connect} from "react-redux";
  import EventTopAdminEditBar from "../../components/EventTopAdminEditBar/EventTopAdminEditBar";
  
  
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
  
  const VisibleEventTopAdminEditBar = connect(
    mapStateToProps,
    mapDispatchToProps
  )(EventTopAdminEditBar);
  
  export default VisibleEventTopAdminEditBar;