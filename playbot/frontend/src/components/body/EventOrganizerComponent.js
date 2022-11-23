import EventMembersComponent from "./EventMembersComponent";
import EventDescriptionComponent from "./EventDescriptionComponent";

export default function EventOrganizerComponent () {


    return (
        <div className={"event-organizer-component"}>
            <div className={"elem elem-1"}>
                <EventDescriptionComponent/>

            </div>
            <div className={"elem elem-2"}>
                <EventMembersComponent/>
            </div>
        </div>
    )
}
