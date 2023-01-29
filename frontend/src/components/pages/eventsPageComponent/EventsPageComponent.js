import LocationComponent from "../../body/LocationComponent";
import EventsComponent from "../../body/EventsComponent";
import VisibleMainWrapper from "../../../redux/containers/VisibleMainWrapper";


export default function EventsPageComponent ({state, funcs}) {

    return (
        <VisibleMainWrapper>
            <div className={"events-page-component"}>
                <div className={"board-events-1280 allow-policy-fon"}>
                    <span className={"white-700-40"}>События</span>
                </div>
                <LocationComponent state={state} funcs={funcs}/>
                <EventsComponent city={state.location.city} user={state.user.user}/>
            </div>
        </VisibleMainWrapper>
    )
}