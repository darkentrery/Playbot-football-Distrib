import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import {useEffect, useState} from "react";


export const RankChartComponent = ({ranks}) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        let newData = [];
        ranks.map((rank) => {
            let date = new Date(rank.create);
            let month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1 < 10;
            date = `${date.getDate()}.${month}.${date.getFullYear()}`
            newData.push({name: date, value: rank.rank})
        })
        if (newData.length === 1) {
            newData.push(newData[0])
        }
        setData(newData);
    }, [ranks])

    const CustomTooltip = ({active, payload, label}) => {
        console.log(payload[0])
        return (
            <div className={"custom-chart-tooltip"}>
                {payload[0] !== undefined && payload[0].payload && <>
                    <span className={"gray-400-13"}>{payload[0].payload.name}</span>
                    <span className={"gray-400-13"}>Рейтинг: {payload[0].payload.value.toFixed(2)}</span>
                </>}
            </div>
        )
    }

    return (
        <LineChart width={145} height={33} data={data} syncMethod={'value'}>
            <Line type={'monotone'} dataKey="value" stroke="#D19C6C" dot={false} activeDot={{ stroke: '#D19C6C', strokeWidth: 1, r: 1 }}/>
            <Tooltip content={<CustomTooltip/>}/>
        </LineChart>
    )
}