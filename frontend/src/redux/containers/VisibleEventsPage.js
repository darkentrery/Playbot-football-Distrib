import {connect} from "react-redux";
import {
  choiceCityWindow,
  auth, city, country,
} from "../actions/actions";
import EventsPageComponent from "../../components/pages/eventsPageComponent/EventsPageComponent";


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
      setCountry: (value) => {
        dispatch(country(value));
      },
    }
  };
};


const VisibleEventsPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(EventsPageComponent);

export default VisibleEventsPage;