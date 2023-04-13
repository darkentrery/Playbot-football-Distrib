import {FiltersComponent} from "../filtersComponent/FiltersComponent";
import {useEffect, useState} from "react";
import $ from "jquery";


export const TopStatisticComponent = ({
    players,
    setPlayersView,
}) => {
    const [isFilter, setIsFilter] = useState(false);

    useEffect(() => {
        if (isFilter) {
            $('body').css('overflow', 'hidden');
        } else {
            $('body').css('overflow', '');
        }
    }, [isFilter])

    return (
        <div className={`top-statistic-component`}>
            <div className={"fon allow-policy-fon"}>
                <span className={"white-700-40"}>Статистика</span>
            </div>
            <div className={`button-filters ${isFilter ? 'orange' : ''}`} onClick={() => setIsFilter(!isFilter)}>
                <div className={isFilter ? 'orange-filter-icon' : 'filter-icon'}></div>
            </div>
            <FiltersComponent className={`top-filter-block ${isFilter ? '' : 'hidden'}`} data={players} setData={setPlayersView} close={setIsFilter}/>
        </div>
    )
}