import {connect} from "react-redux";
import {
  choiceCityWindow,
  auth, city,
} from "../actions/actions";
import MainPageComponent from "../../components/pages/MainPageComponent";


const mapStateToProps = (state) => {
  return {
    ...state,
    state: state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    funcs: {
      openChoiceCity: () => {
        dispatch(choiceCityWindow(true));
      },
      setAuth: (value, user) => {
        dispatch(auth(value, user));
      },
      setCity: (value) => {
        dispatch(city(value));
      },
    }
  };
};


const VisibleMainPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(MainPageComponent);

export default VisibleMainPage;