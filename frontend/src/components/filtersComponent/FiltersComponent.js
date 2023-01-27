import {DropdownCheckBoxComponent} from "../dropdownCheckBoxComponent/DropdownCheckBoxComponent";
import {useEffect, useState} from "react";
import {cityService} from "../../services/CityService";
import {DropdownSliderComponent} from "../dropdownSliderComponent/DropdownSliderComponent";


export const FiltersComponent = ({className=''}) => {
    const [filterCity, setFilterCity] = useState([]);
    const [filterCanton, setFilterCanton] = useState([]);
    const [filterDistrict, setFilterDistrict] = useState([]);
    const [filterCountGames, setFilterCountGames] = useState([10, 50]);
    const [filterRank, setFilterRank] = useState([10, 50]);
    const [filterGender, setFilterGender] = useState([10, 50]);
    const [cities, setCities] = useState([]);
    const cantons = ["aaa", "abbb"];
    const districts = ["aaa", "abbb"];
    const genders = ["Муж.", "Жен."];
    const count = [0, 90];
    const rank = [0, 90];

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

    return (
        <div className={`filters-component ${className}`}>
            <span className={"title black-600-16"}>Фильтры</span>
            <DropdownCheckBoxComponent className={"cities"} label={"Город"} setOutData={setFilterCity} data={cities} outputData={filterCity}/>
            <DropdownCheckBoxComponent className={"cities"} label={"Округ"} setOutData={setFilterCanton} data={cantons} outputData={filterCanton}/>
            <DropdownCheckBoxComponent className={"cities"} label={"Район"} setOutData={setFilterDistrict} data={districts} outputData={filterDistrict}/>
            <DropdownSliderComponent className={"slider"} label={"Количество игр"} setOutData={setFilterCountGames} data={count} outputData={filterCountGames}/>
            <DropdownSliderComponent className={"slider"} label={"Рейтинг"} setOutData={setFilterRank} data={rank} outputData={filterRank}/>
            <DropdownCheckBoxComponent className={"cities"} label={"Пол"} setOutData={setFilterGender} data={genders} outputData={filterGender}/>

            <span className={"btn-second"}>Сбросить фильтры</span>
        </div>
    )
}