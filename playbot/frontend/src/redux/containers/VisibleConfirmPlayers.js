import {confirmPlayersWindow} from "../actions/actions";
import {connect} from "react-redux";
import ConfirmPlayersComponent from "../../components/popups/ConfirmPlayersComponent";


const mapStateToProps = (state) => {
  return {
    ...state,
    isOpen: state.windows.isOpenConfirmPlayers,
    event: state.event.event,
    players: state.event.players,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeComponent: () => {
      dispatch(confirmPlayersWindow(false));
    },
  };
};

const VisibleConfirmPlayers = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfirmPlayersComponent);

export default VisibleConfirmPlayers;