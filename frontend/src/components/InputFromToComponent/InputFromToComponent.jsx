import './InputFromToComponent.scss';
import { useState, useEffect } from "react"

export const InputFromToComponent = ({
    minValue = 0,
    maxValue = 100,
    setValue = () => {},
    classes = '',
    isError = false,
    value1 = false,
    value2 = false
}) => {
    const [input1, setInput1] = useState(value1);
    const [input2, setInput2] = useState(value2);

    useEffect(() => {
        const numericRegex = /^[0-9]+$/; // Регулярное выражение для проверки, содержит ли строка только цифры
    
        //Проверка и очистка input1
        if (!numericRegex.test(input1)) {
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
    
        setValue([input1 !== '' && input1, input2 !== '' && input2]);
    }, [input1, input2]);

    useEffect(() => {
        setInput1(value1 == 0 ? false : value1);
        setInput2(value2 == 0 ? false : value2);
    }, [value1, value2])

    return (
        <div className={`input__from-to ${classes} ${isError ? 'input__from-to--is-error' : ''}`}>
            <div className='input__form-to-inner'>
                <span>от</span>
                <input type="text" value={input1} onChange={(e) => {setInput1(e.currentTarget.value)}} min={minValue} max={maxValue}/>
                <span>до</span>
                <input type="text" value={input2} onChange={(e) => {setInput2(e.currentTarget.value)}} min={minValue} max={maxValue}/>
                <div className={'input__form-to-inner-error' }>
                    {isError ? "Укажите корректные значения" : ''}
                </div>
            </div>
        </div>
    )
}

export default InputFromToComponent;