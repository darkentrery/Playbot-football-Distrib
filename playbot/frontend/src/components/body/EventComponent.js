import BoardEventOrganizerComponent from "./BoardEventOrganizerComponent";
import EventOrganizerComponent from "./EventOrganizerComponent";


export default function EventComponent ({pk}) {
    console.log(pk)

    return (
        <div className={"event-component"}>
            <BoardEventOrganizerComponent/>
            <EventOrganizerComponent/>
        </div>
    )
}