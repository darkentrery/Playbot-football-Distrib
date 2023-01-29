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
    const [filterRank, setFilterRank] = useState([0, 100]);
    const [filterGender, setFilterGender] = useState([]);
    const [filterDate, setFilterDate] = useState([null, null]);
    const [cities, setCities] = useState([]);
    const cantons = ["aaa", "abbb"];
    const districts = ["aaa", "abbb"];
    const genders = ["Муж.", "Жен."];
    const count = [0, 100];
    const rank = [0, 100];

    useEffect(() => {
        let isSubscribe = true;
        cityService.getCities().then((response) => {
            if (response.status == 200) {
                console.log(response.data.cities)
                setCities(response.data.cities);
            }
        })
        return () => isSubscribe = false;
    }, [])

    useEffect(() => {
        let array = [];
        data.map((player) => {
            let flagCity = false;
            let flagCanton = true;
            let flagDistrict = true;
            let flagGender = false;
            let flagCountGames = false;
            let flagRank = false;
            let flagDate = true;
            if (!filterCity.length || filterCity.length && filterCity.includes(player.city)) {
                flagCity = true;
            }
            if (!filterGender.length || filterGender.length && filterGender.includes(player.gender)) {
                flagGender = true;
            }
            if (filterRank[0] <= player.rank && filterRank[1] >= player.rank) {
                flagRank = true;
            }
            if (filterCountGames[0] <= player.all_games && filterCountGames[1] >= player.all_games) {
                flagCountGames = true;
            }
            console.log(flagCity, flagCanton, flagDistrict, flagGender, flagCountGames, flagRank, flagDate)
            if (flagCity && flagCanton && flagDistrict && flagGender && flagCountGames && flagRank && flagDate) array.push(player);
        })
        setData(array);
        console.log(filterCity, filterCanton, filterDistrict, filterGender, filterCountGames, filterRank, filterDate)
    }, [filterCity, filterCanton, filterDistrict, filterGender, filterCountGames, filterRank, filterDate])

    const clearFilter = () => {
        setFilterCity([]);
        setFilterCanton([]);
        setFilterDistrict([]);
        setFilterGender([]);
        setFilterCountGames([0, 100]);
        setFilterRank([0, 100]);
        setFilterDate([null, null]);
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