import BoardEventOrganizerComponent from "./BoardEventOrganizerComponent";
import EventOrganizerComponent from "./EventOrganizerComponent";


export default function EventComponent () {

    return (
        <div className={"event-component"}>
            <BoardEventOrganizerComponent/>
            <EventOrganizerComponent/>
        </div>
    )
}