import {auth, choiceCityWindow, city, country, hiddenMap} from "../actions/actions";
import {connect} from "react-redux";
import ChoiceCityComponent from "../../components/popups/choiceCityComponent/ChoiceCityComponent";



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
    setCountry: (value) => {
      dispatch(country(value));
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