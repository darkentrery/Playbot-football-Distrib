
import EventInfoSlider from "../EventInfoSlider/EventInfoSlider"
import Image from "../../assets/icon/temp-event-image.png"
import MapIcon from "../../assets/icon/map-icon.svg"
import CopyIcon from "../../assets/icon/copy-bold-white.svg"

const EventAboutPlace376 = ({ event }) => {
    const fieldAddress = `${event.field.address.city}, ${event.field.address.street}, ${event.field.address.house_number}`
    const handleCopyAddressClick = () => {
        window.navigator.clipboard.writeText(fieldAddress);
    }
    const slots = event.count_players - event.count_current_players
    return (
        <div className="event-about-place">
            <div className="event-about-place__top">
                <div className="event-about-place__top-address">
                    {fieldAddress}
                </div>
                <div className="event-about-place__top-icons">
                    <img src={MapIcon} alt="map icon" width={16} height={16} />
                    <img src={CopyIcon} alt="Copy icon" onClick={handleCopyAddressClick} width={16} height={16} />
                </div>
            </div>
            <div className="event-about-place__top-mask">

            </div>
            {slots === 0 ?
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
            {slots < 4 && slots !== 0 ?
                <div className="event-about-place__no-slots" style={{paddingBlock: "4px"}}>
                    <div className="event-about-place__no-slots-text">
                        {slots} {slots == 1 ? "слот" : "слота"}
                    </div>
                </div>
                : null
            }
            <EventInfoSlider images={[Image, Image, Image, Image]} />
        </div>
    )
}

export default EventAboutPlace376