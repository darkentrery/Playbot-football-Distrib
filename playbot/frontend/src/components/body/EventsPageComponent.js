import LocationComponent from "./LocationComponent";
import EventsComponent from "./EventsComponent";


export default function EventsPageComponent ({state, funcs}) {
    console.log(state)

    return (
        <div className={"events-page-component"}>
            <div className={"board-events-1280 board-events-icon"}></div>
            <LocationComponent state={state} funcs={funcs}/>
            <EventsComponent/>
        </div>
    )
}