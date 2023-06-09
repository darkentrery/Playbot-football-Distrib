import {
  player, auth, showMenuWindow, event, createEventWindow, choiceCityWindow,
} from "../actions/actions";
import {connect} from "react-redux";
import {ShowMenuComponent} from "../../components/popups/showMenuComponent/ShowMenuComponent";



const mapStateToProps = (state) => {
  return {
    isOpen: state.windows.isOpenShowMenu,
    user: state.user,
    city: state.city,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    funcs: {
      closeComponent: () => {
        dispatch(showMenuWindow(false));
      },
      setPlayer: (value) => {
        dispatch(player(value));
      },
      setAuth: (value, user) => {
        dispatch(auth(value, user));
      },
      setEvent: (value) => {
        dispatch(event(value));
      },
      openCreateEvent: () => {
        dispatch(createEventWindow(true));
      },
      openChoiceCity: () => {
        dispatch(choiceCityWindow(true));
      },
    }
  };
};

const VisibleShowMenu = connect(
  mapStateToProps,
  mapDispatchToProps
)(ShowMenuComponent);


export default VisibleShowMenu;