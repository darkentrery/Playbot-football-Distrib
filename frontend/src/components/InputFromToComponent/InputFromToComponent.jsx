import './InputFromToComponent.scss';
import { useState, useEffect } from "react"

export const InputFromToComponent = ({
    minValue = 0,
    maxValue = 100,
    output = () => {},
    classes = ''
}) => {
    const [input1, setInput1] = useState('minValue')
    const [input2, setInput2] = useState('maxValue')

    useEffect(() => {
        const numericRegex = /^[0-9]+$/; // Регулярное выражение для проверки, содержит ли строка только цифры
    
        //Проверка и очистка input1
        if (!numericRegex.test(input1) && input1 !== '') {
            setInput1('');
        } else if (parseInt(input1) > maxValue) {
            setInput1(maxValue.toString());
        } else if (parseInt(input1) < minValue) {
            setInput1(minValue.toString());
        }
    
        //Проверка и очистка input2
        if (!numericRegex.test(input2)) {
            setInput2('');
        } else if (parseInt(input2) > maxValue) {
            setInput2(maxValue.toString());
        } else if (parseInt(input2) < minValue) {
            setInput2(minValue.toString());
        }
    
        output([input1, input2]);
    }, [input1, input2]);

    return (
        <div className={`input__from-to ${classes}`}>
            <span>от</span>
            <input type="text" value={input1} onChange={(e) => {setInput1(e.currentTarget.value)}} min={minValue} max={maxValue}/>
            <span>до</span>
            <input type="text" value={input2} onChange={(e) => {setInput2(e.currentTarget.value)}} min={minValue} max={maxValue}/>
        </div>
    )
}

export default InputFromToComponent