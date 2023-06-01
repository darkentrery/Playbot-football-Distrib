import "./select-color.scss";
import {useEffect, useState} from "react";


export const SelectColorComponent = ({
    color={color_hex: "#FEFFFF"},
    setColor = () => {},
    colorList=[],
    setTeamColors = () => {},
    teamColors=[],
    id=null,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [usedColors, setUsedColors] = useState([]);

    useEffect(() => {
        setUsedColors(teamColors.map(col => { return col.id; }));
    }, [teamColors])

    const selectColor = (color) => {
        if (id === null) {
            setColor(color);
        } else {
            let arr = [...teamColors];
            arr[id] = color;
            setTeamColors(arr);
        }
        setIsOpen(false);
    }

    document.addEventListener('click', (e) => {
        if (e.target.className !== 'color-item' && e.target.className !== 'color' && isOpen) {
            setIsOpen(false);
        }
    })

    return (
        <div className={`select-color-component`}>
            <div className={"color"} style={{
                backgroundColor: id !== null ? teamColors[id].color_hex : color.color_hex,
                border: color.color_hex === "#FEFFFF" || (id !== null && teamColors[id].color_hex === "#FEFFFF") ? "1px solid #E4E4E4" : "none"
            }} onClick={() => setIsOpen(!isOpen)}></div>
            <div className={`color-list ${isOpen ? '' : 'hidden'}`}>
                {colorList.map((col, key) => (
                    !usedColors.includes(col.id) && <div className={"color-item"} style={{
                        backgroundColor: col.color_hex,
                        border: col.color_hex === "#FEFFFF" ? "1px solid #E4E4E4" : "none"
                    }} key={key} onClick={() => selectColor(col)}></div>
                ))}
            </div>
        </div>
    )
}