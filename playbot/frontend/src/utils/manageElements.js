
export const popupCloseDate = (e, isOpenCalendar, setIsOpenCalendar) => {
    if (isOpenCalendar) {
        if (!e.target.className.includes("rdt") && !e.target.className.includes("calendar-icon")
            && !e.target.localName.includes("span")) {
            setIsOpenCalendar(false);
        }
    }
}

export const popupCloseTime = (e, isOpenTime, setIsOpenTime) => {
    if (isOpenTime) {
        if (!e.target.className.includes("rdt") && !e.target.className.includes("clock-icon")
            && !e.target.localName.includes("span")) {
            setIsOpenTime(false);
        }
    }
}

export const popupCloseDropdown = (e, setCloseDropDown, closeDropDown) => {
    if (!e.target.className.includes("dropdown-elem") && !e.target.className.includes("dropdown-label")) {
        setCloseDropDown(!closeDropDown);
    } else if (e.target.className.includes("dropdown-label")) {
        setCloseDropDown(e.target.id);
    }
}