import {
  player, showEmblemWindow,
} from "../actions/actions";
import {connect} from "react-redux";
import {ShowEmblemComponent} from "../../components/popups/showEmblemComponent/ShowEmblemComponent";



const mapStateToProps = (state) => {
  return {
    isOpen: state.windows.isOpenShowEmblem,
    user: state.user.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    funcs: {
      closeComponent: () => {
        dispatch(showEmblemWindow(false));
      },
      setPlayer: (value) => {
        dispatch(player(value));
      },
    }
  };
};

const VisibleShowEmblem = connect(
  mapStateToProps,
  mapDispatchToProps
)(ShowEmblemComponent);


export default VisibleShowEmblem;