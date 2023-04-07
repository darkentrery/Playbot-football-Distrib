import { LineChart, Line, Tooltip } from 'recharts';
import {useEffect, useState} from "react";


export const RankChartComponent = ({ranks, rank, dRank}) => {
    const [data, setData] = useState([]);
    const [width, setWidth] = useState(145);

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

    useEffect(() => {
        if (window.screen.width < 744) setWidth(120);
    }, [window.screen.width])

    const CustomTooltip = ({active, payload, label}) => {
        return (
            <div className={"custom-chart-tooltip"}>
                {payload && payload.length && payload[0] !== undefined && payload[0].payload && <>
                    <span className={"gray-400-13"}>{payload[0].payload.name}</span>
                    <span className={"gray-400-13"}>Рейтинг: {payload[0].payload.value.toFixed(2)}</span>
                </>}
            </div>
        )
    }

    return (
        <div className={"rank-chart-component"}>
            <LineChart width={width} height={33} data={data} syncMethod={'value'}>
                <Line type={'monotone'} dataKey="value" stroke="#D19C6C" dot={false} activeDot={{ stroke: '#D19C6C', strokeWidth: 1, r: 1 }}/>
                <Tooltip content={<CustomTooltip/>}/>
            </LineChart>
            <span className={"rank-744 black-400-13"}>
                {Math.floor(rank)}
                <span className={`black-400-13 ${dRank >= 0 ? 'green' : 'red'}`}>&nbsp;{dRank >= 0 ? '+' : ''}{dRank}</span>
            </span>
        </div>
    )
}