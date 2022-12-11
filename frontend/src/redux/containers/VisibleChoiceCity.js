import {auth, choiceCityWindow, city, hiddenMap} from "../actions/actions";
import {connect} from "react-redux";
import ChoiceCityComponent from "../../components/ChoiceCityComponent";



const mapStateToProps = (state) => {
  return {
    ...state,
    isOpen: state.windows.isOpenChoiceCity,
    isIPhone: state.app.isIPhone,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeComponent: () => {
      dispatch(choiceCityWindow(false));
    },
    setAuth: (value, user) => {
      dispatch(auth(value, user));
    },
    setCity: (value) => {
      dispatch(city(value));
    },
    showMap: () => {
      dispatch(hiddenMap(false));
    },
  };
};


const VisibleChoiceCity = connect(
  mapStateToProps,
  mapDispatchToProps
)(ChoiceCityComponent);



export default VisibleChoiceCity;