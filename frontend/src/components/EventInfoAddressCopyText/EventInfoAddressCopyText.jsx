import { useState } from 'react';
import './EventInfoAddressCopyText.scss';
import CopyIcon from '../../assets/icon/copy-squares.svg';

export const EventInfoAddressCopyText = ({
    copyText = '',
    className = ''
}) => {
    const [isTooltip, setIsTooltip] = useState(false);

    const handleCopyAddressClick = () => {
        if (isTooltip) {
            return
        }
        window.navigator.clipboard.writeText(copyText);
        setIsTooltip(true)
        setTimeout(() => {
            setIsTooltip(false)
        }, 2000)
    }

    return (
        <div className="event-info-map-address-wrapper">
            <div className="event-info-map-address">
                {copyText}
                <img src={CopyIcon} width={16} height={16} onClick={handleCopyAddressClick} alt="" />
            </div>
            {isTooltip &&
            <div className={className}>
                Скопировано !
            </div>
            }
        </div>
    )
}

export default EventInfoAddressCopyText;