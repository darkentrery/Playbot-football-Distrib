import {DropdownCheckBoxComponent} from "../dropdownCheckBoxComponent/DropdownCheckBoxComponent";
import {useEffect, useState} from "react";
import {cityService} from "../../services/CityService";


export const FiltersComponent = ({className=''}) => {
    const [filterCity, setFilterCity] = useState([]);
    const [filterCanton, setFilterCanton] = useState([]);
    const [filterDistrict, setFilterDistrict] = useState([]);
    const [cities, setCities] = useState([]);
    const cantons = ["aaa", "abbb"];
    const districts = ["aaa", "abbb"];

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

        </div>
    )
}