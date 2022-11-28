import LocationComponent from "./LocationComponent";
import EventsComponent from "./EventsComponent";


export default function EventsPageComponent () {

    return (
        <div className={"events-page-component"}>
            <div className={"board-events-1280 board-events-icon"}></div>
            <LocationComponent/>
            <EventsComponent/>
        </div>
    )
}