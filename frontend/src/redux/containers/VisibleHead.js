import {connect} from "react-redux";
import HeadComponent from "../../components/headComponent/HeadComponent";
import {hiddenMap} from "../actions/actions";


const mapStateToProps = (state) => {
  return {
    ...state,
    user: state.user,
    city: state.city
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    funcs: {
      showMap: () => {
        dispatch(hiddenMap(false));
      },
      removeMap: () => {
        dispatch(hiddenMap(true));
      },
    },
  };
};


const VisibleHead = connect(
  mapStateToProps,
  mapDispatchToProps
)(HeadComponent);

export default VisibleHead;