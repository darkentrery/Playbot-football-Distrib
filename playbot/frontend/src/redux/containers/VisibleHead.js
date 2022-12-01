import {connect} from "react-redux";
import HeadComponent from "../../components/HeadComponent";


const mapStateToProps = (state) => {
  return {
    ...state,
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {

  };
};


const VisibleHead = connect(
  mapStateToProps,
  mapDispatchToProps
)(HeadComponent);

export default VisibleHead;