import {connect} from "react-redux";
import {
  choiceCityWindow,
  auth, city,
} from "../actions/actions";
import {StatisticPageComponent} from "../../components/pages/statisticPageComponent/StatisticPageComponent";


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


const VisibleStatisticPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(StatisticPageComponent);

export default VisibleStatisticPage;