import LocationComponent from "../../locationComponent/LocationComponent";
import EventsComponent from "../../eventsComponent/EventsComponent";
import VisibleMainWrapper from "../../../redux/containers/VisibleMainWrapper";


export default function EventsPageComponent ({state, funcs}) {

    return (
        <VisibleMainWrapper>
            <div className={"events-page-component"}>
                <LocationComponent state={state} funcs={funcs}/>
                <EventsComponent city={state.location.city} user={state.user.user} isAuth={state.user.isAuth}/>
            </div>
        </VisibleMainWrapper>
    )
}