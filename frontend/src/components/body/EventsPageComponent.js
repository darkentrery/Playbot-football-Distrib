import LocationComponent from "./LocationComponent";
import EventsComponent from "./EventsComponent";
import VisibleMainWrapper from "../../redux/containers/VisibleMainWrapper";


export default function EventsPageComponent ({state, funcs}) {

    return (
        <VisibleMainWrapper>
            <div className={"events-page-component"}>
                <div className={"board-events-1280 board-events-icon"}></div>
                <LocationComponent state={state} funcs={funcs}/>
                <EventsComponent city={state.location.city} user={state.user.user}/>
            </div>
        </VisibleMainWrapper>
    )
}