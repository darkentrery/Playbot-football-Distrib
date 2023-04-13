import {DropdownCheckBoxComponent} from "../dropdownCheckBoxComponent/DropdownCheckBoxComponent";
import {useEffect, useState} from "react";
import {cityService} from "../../services/CityService";
import {DropdownSliderComponent} from "../dropdownSliderComponent/DropdownSliderComponent";
import {DateFilterComponent} from "../dateFilterComponent/DateFilterComponent";


export const FiltersComponent = ({
    className='',
    data,
    setData,
    close = () => {},
}) => {
    const [filterCity, setFilterCity] = useState([]);
    const [filterCanton, setFilterCanton] = useState([]);
    const [filterDistrict, setFilterDistrict] = useState([]);
    const [filterCountGames, setFilterCountGames] = useState([0, 100]);
    const [filterRank, setFilterRank] = useState([0, 10000]);
    const [filterGender, setFilterGender] = useState([]);
    const [filterDate, setFilterDate] = useState({label: "За всё время", begin: null, end: new Date(Date.now())});
    const [cities, setCities] = useState([]);
    const cantons = ["aaa", "abbb"];
    const districts = ["aaa", "abbb"];
    const genders = ["Муж.", "Жен."];
    const count = [0, 100];
    const rank = [0, 10000];

    useEffect(() => {
        cityService.getAddresses().then((response) => {
            if (response.status === 200) {
                let arr = response.data.map((address) => {
                    return address.city;
                })
                setCities(arr);
            }
        })
    }, [])

    useEffect(() => {
        let array = [];
        data.forEach((player) => {
            let flagCity = false;
            let flagCanton = true;
            let flagDistrict = true;
            let flagGender = false;
            let flagCountGames = false;
            let flagRank = false;
            let flagDate = false;
            if (!filterCity.length || (filterCity.length && player.address && filterCity.includes(player.address.city))) {
                flagCity = true;
            }
            if (!filterGender.length || (filterGender.length && filterGender.includes(player.gender))) {
                flagGender = true;
            }
            if (filterRank[0] <= player.rank && filterRank[1] >= player.rank) {
                flagRank = true;
            }
            if (filterCountGames[0] <= player.all_games && filterCountGames[1] >= player.all_games) {
                flagCountGames = true;
            }
            if (!filterDate.begin) {
                flagDate = true;
                let history = [];
                player.ranks_history.map((item) => history.push(item));
                history = history.reverse();
                history.map((rank) => {
                    let date = new Date(rank.create);
                    if (date <= filterDate.end) {
                        player.dRank = player.rank - rank.rank;
                    }
                })
            } else {
                // player.event_player.map((event_player) => {
                //     let date = new Date(event_player.event.date);
                //     if (date >= filterDate.begin && date <= filterDate.end) {
                //         flagDate = true;
                //     }
                // })
                player.ranks_history.map((rank) => {
                    let date = new Date(rank.create);
                    if (date >= filterDate.begin && date <= filterDate.end) {
                        flagDate = true;
                    }
                })
                let history = [];
                player.ranks_history.map((item) => history.push(item));
                history = history.reverse();
                history.map((rank) => {
                    let date = new Date(rank.create);
                    if (date <= filterDate.end && date >= filterDate.begin) {
                        player.dRank = player.rank - rank.rank;
                    }
                })
            }
            if (flagCity && flagCanton && flagDistrict && flagGender && flagCountGames && flagRank && flagDate && player.all_games) {
                array.push(player);
            }
        })
        setData(array);
    }, [filterCity, filterCanton, filterDistrict, filterGender, filterCountGames, filterRank, filterDate, data])

    const clearFilter = () => {
        setFilterCity([]);
        setFilterCanton([]);
        setFilterDistrict([]);
        setFilterGender([]);
        setFilterCountGames([0, 100]);
        setFilterRank([0, 100]);
        setFilterDate({label: "За всё время", begin: null, end: new Date(Date.now())});
    }

    return (
        <div className={`filters-component ${className}`}>
            <div className={"title"}>
                <span className={"black-600-16"}>Фильтры</span>
                <span className={"btn-close"} onClick={() => close(false)}></span>
            </div>
            <DropdownCheckBoxComponent className={"cities"} label={"Город"} setOutData={setFilterCity} data={cities} outputData={filterCity}/>
            <DropdownCheckBoxComponent className={"cities"} label={"Округ"} setOutData={setFilterCanton} data={cantons} outputData={filterCanton}/>
            <DropdownCheckBoxComponent className={"cities"} label={"Район"} setOutData={setFilterDistrict} data={districts} outputData={filterDistrict}/>
            <DropdownSliderComponent className={"slider"} label={"Количество игр"} setOutData={setFilterCountGames} data={count} outputData={filterCountGames}/>
            <DropdownSliderComponent className={"slider"} label={"Рейтинг"} setOutData={setFilterRank} data={rank} outputData={filterRank}/>
            <DropdownCheckBoxComponent className={"cities"} label={"Пол"} setOutData={setFilterGender} data={genders} outputData={filterGender}/>
            <DateFilterComponent className={"date-filter"} label={"Период"} setOutData={setFilterDate} outputData={filterDate}/>
            <span className={"btn-second"} onClick={clearFilter}>Сбросить фильтры</span>
        </div>
    )
}