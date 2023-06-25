
import EventInfoSlider from "../EventInfoSlider/EventInfoSlider"
import Image from "../../assets/icon/temp-event-image.png"
import MapIcon from "../../assets/icon/map-icon.svg"
import CopyIcon from "../../assets/icon/copy-bold-white.svg"

const EventAboutPlace376 = ({ event }) => {
    return (
        <div className="event-about-place">
            <div className="event-about-place__top">
                <div className="event-about-place__top-address">
                    {event.field.address.c_s_h_string}
                </div>
                <div className="event-about-place__top-icons">
                    <img src={MapIcon} alt="map icon" width={16} height={16} />
                    <img src={CopyIcon} alt="Copy icon" width={16} height={16} />
                </div>
            </div>
            <div className="event-about-place__top-mask">

            </div>
            {event.count_current_players == event.count_players ?
                <div className="event-about-place__no-slots">
                    <div className="event-about-place__no-slots-icon-text">
                        !
                    </div>
                    <div className="event-about-place__no-slots-text">
                        Нет слотов
                    </div>
                </div>
                : null
            }
            <EventInfoSlider images={[Image, Image, Image, Image]} />
        </div>
    )
}

export default EventAboutPlace376