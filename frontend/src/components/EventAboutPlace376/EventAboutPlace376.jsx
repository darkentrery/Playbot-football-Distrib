
import EventInfoSlider from "../EventInfoSlider/EventInfoSlider"
import MapIcon from "../../assets/icon/map-icon.svg"
import CopyIcon from "../../assets/icon/copy-bold-white.svg"
import { useState } from "react"

const EventAboutPlace376 = ({ event }) => {
    const [isTooltipActive, setIsTooltipActive] = useState(false)
    const fieldAddress = `${event.field.address.city}, ${event.field.address.street}, ${event.field.address.house_number}`
    const fieldGoogleLink = event.field.address.google_link;
    const handleCopyAddressClick = () => {
        if (isTooltipActive) return
        window.navigator.clipboard.writeText(fieldGoogleLink);
        setIsTooltipActive(true)
        setTimeout(() => {
            setIsTooltipActive(false)
        }, 3000)
    }
    const slots = event.count_players - event.count_current_players
    return (
        <div className="event-about-place">
            <div className="event-about-place__top">
                <div className="event-about-place__top-address">
                    {isTooltipActive ? <div className="event-about-place__top-address-copy">Скопировано !</div> : null}
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
            <EventInfoSlider images={event.field.field_photos} />
        </div>
    )
}

export default EventAboutPlace376