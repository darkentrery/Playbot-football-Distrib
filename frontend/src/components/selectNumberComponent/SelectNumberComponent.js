import {useEffect, useState} from "react";
import "./select-number.scss";


export const SelectNumberComponent = ({
    numbers = [],
    setNumbers = () => {},
    id=0,
    numberList=[],
    teamId=0
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [usedNumbers, setUsedNumbers] = useState([]);

    useEffect(() => {
        console.log(numbers[teamId])
        console.log(usedNumbers)
        setUsedNumbers(numbers[teamId].map(num => {

            if (num !== null) {
                console.log(num)
                return num.id;
            } else {
                return;
            }
        }));
    }, [numbers])

    document.addEventListener('click', (e) => {
        if (!e.target.classList.contains('number-item') &&!e.target.classList.contains('number') && isOpen) {
            setIsOpen(false);
        }
    })

    const selectNumber = (number) => {
        console.log(numbers)
        let arr = [...numbers];
        arr[teamId][id] = number;
        setNumbers(arr);
        setIsOpen(false);
    }

    return (
        <div className={`select-number-component`}>
            <span className={"black-500-16 number-icon number"} onClick={() => setIsOpen(!isOpen)}>{numbers[teamId][id] ? numbers[teamId][id].number : ''}</span>
            <div className={`number-list ${isOpen ? '' : 'hidden'}`}>
                {numberList.map((num, key) => (<>
                    {!usedNumbers.includes(num.id) &&
                        <div className={"black-500-16 number-item"} onClick={() => selectNumber(num)} key={key}>{num.number}</div>}
                </>))}
            </div>
        </div>
    )
}