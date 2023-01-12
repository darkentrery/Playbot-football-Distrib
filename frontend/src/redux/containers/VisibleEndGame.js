import {endGameWindow, event, game} from "../actions/actions";
import {connect} from "react-redux";
import {EndGameComponent} from "../../components/popups/EndGameComponent";


const mapStateToProps = (state) => {
  return {
    ...state,
    isOpen: state.windows.isOpenEndGame,
    event: state.event.event,
    game: state.event.game,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeComponent: () => {
      dispatch(endGameWindow(false));
    },
    setGame: (value) => {
      dispatch(game(value));
    },
    setEvent: (value) => {
      dispatch(event(value));
    },
  };
};

const VisibleEndGame= connect(
  mapStateToProps,
  mapDispatchToProps
)(EndGameComponent);

export default VisibleEndGame;