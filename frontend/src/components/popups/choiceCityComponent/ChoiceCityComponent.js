import React, {useState, useRef, useEffect} from "react";
import Modal from "react-modal";
import {authDecoratorWithoutLogin} from "../../../services/AuthDecorator";
import {SearchComponent} from "../../searchComponent/SearchComponent";
import {cityService} from "../../../services/CityService";
import {authService} from "../../../services/AuthService";


export default function ChoiceCityComponent ({isOpen, isIPhone, closeComponent, setAuth, setCity, setCountry, showMap}) {
    const [city, setLocalCity] = useState(false);
    const [cities, setCities] = useState([]);
    const [addresses, setAddresses] = useState([]);
    const [citiesView, setCitiesView] = useState([]);
    const citiesRef = useRef();
    const windowRef = useRef();

    useEffect(() => {
        if (isOpen) {
            cityService.getAddresses().then((response) => {
                if (response.status === 200) {
                    let arr = response.data.map((address) => {
                        return address.city;
                    })
                    setCities(arr);
                    setCitiesView(arr);
                    setAddresses(response.data);
                }
            })
        }
    }, [isOpen])

    useEffect(() => {
        if (windowRef.current) {
            windowRef.current.parentNode.parentNode.style.zIndex = 1000;
        }
    }, [windowRef.current])

    const closeWindow = () => {
        closeComponent();
        showMap();
    }

    const sendForm = () => {
        if (city) {
            setCity(city);
            for (let address of addresses) {
                if (address.city === city) {
                    setCountry(address.country);
                    break;
                }
            }
            authDecoratorWithoutLogin(authService.updateAddress, {"city": city}).then((response) => {
                closeWindow();
                setAuth(true, response.data);
            })
        }
    }

    // useEffect(() => {
    //     $('.choice-city').find('.scroll-elem').each((elem) => {
    //         $('.choice-city').find('.scroll-elem')[elem].className = 'scroll-elem';
    //     })
    // }, [citiesView])

    const choiceCity = (event) => {
        let children = citiesRef.current.children;
        for (let i=0; i<children.length; i++) {
            children[i].className = 'scroll-elem';
        }
        event.target.className = 'scroll-elem checked';
        setLocalCity(event.target.innerHTML);
        for (let address of addresses) {
            if (address.city === event.target.innerHTML) {
                setCountry(address.country);
                break;
            }
        }
        authDecoratorWithoutLogin(authService.updateAddress, {"city": event.target.innerHTML})
            .then((response) => {
                closeWindow();
                setAuth(true, response.data);
        })
    }

    return(
        <Modal
            isOpen={isOpen}
            className={"popup-fon"}
            contentLabel="Example Modal"
            ariaHideApp={false}
        >
            <div className={"popup-frame choice-city-component"} ref={windowRef}>
                <div className={"elem head"}>
                    <span className={"black-600-22"}>Выберите город</span>
                    <div onClick={closeWindow} className={"btn-close choice-city-close"}></div>
                </div>
                <span className={"gray-400-14"}>Для корректного отображения событий укажите город</span>
                <SearchComponent className={"elem search"} arrayFirst={cities} setArraySecond={setCitiesView}/>
                <div className={"elem cities div-scroll scroll"} ref={citiesRef}>
                    {citiesView && citiesView.map((item, key) => (
                        <div className={"scroll-elem"} onClick={choiceCity} key={key}>{item}</div>
                    ))}
                </div>
                <div className={`elem bottom ${isIPhone ? 'safari-margin' : ''}`}>
                    <button className={"btn btn-choice-city"} onClick={sendForm}>Сохранить</button>
                </div>
            </div>
        </Modal>
    )
}
