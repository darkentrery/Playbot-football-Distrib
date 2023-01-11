
export const popupCloseDropdownWithDate = (e, isOpenCalendar, setIsOpenCalendar) => {
    if (isOpenCalendar) {
        if (!e.target.className.includes("rdt") && !e.target.className.includes("calendar-icon")
            && !e.target.localName.includes("span")) {
            setIsOpenCalendar(false);
        }
    }
}

export const popupCloseDropdownWithTime = (e, isOpenTime, setIsOpenTime) => {
    if (isOpenTime) {
        if (!e.target.className.includes("rdt") && !e.target.className.includes("clock-icon")
            && !e.target.localName.includes("span")) {
            setIsOpenTime(false);
        }
    }
}

export const popupCloseDropdown = (e, setCloseDropDown, closeDropDown) => {
    if (!e.target.className.includes("dropdown-elem") && !e.target.className.includes("dropdown-label") && !e.target.className.includes("right-icon")) {
        setCloseDropDown(!closeDropDown);
    } else if (e.target.className.includes("dropdown-label") || e.target.className.includes("right-icon")) {
        setCloseDropDown(e.target.id);
    }
}

export const popupCloseSuggestMap = (e, setAddressFocus, addressFocus) => {
    if (!e.target.className.includes("suggest-map") && !e.target.className.includes("map-point-icon")) {
        setAddressFocus(false);
    }
}