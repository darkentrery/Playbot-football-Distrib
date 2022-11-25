import LocationComponent from "./LocationComponent";
import EventsComponent from "./EventsComponent";


export default function EventsPageComponent () {

    return (
        <div className={"events-page-component"}>
            <LocationComponent/>
            <EventsComponent/>
        </div>
    )
}