import HeadComponent from "../../headComponent/HeadComponent";
import {ProfileAsideComponent} from "../../profileAsideComponent/ProfileAsideComponent";
import {Link, useParams} from "react-router-dom";
import BottomComponent from "../../bottomComponent/BottomComponent";
import React, {useEffect, useState} from "react";
import {authService} from "../../../services/AuthService";
import {EventItem376Component} from "../../eventItem376Component/EventItem376Component";
import {Top376Component} from "../../top376Component/Top376Component";
import BaseRoutes from "../../../routes/BaseRoutes";
import ProfileRoutes from "../../../routes/ProfileRoutes";
import {eventService} from "../../../services/EventService";
import {LoaderComponent} from "../../loaderComponent/LoaderComponent";
import {ProfileTableBarComponent} from "../../profileTableBarComponent/ProfileTableBarComponent";


export const PreviewPlayerComponent = ({
    state,
    app,
    player,
    funcs,
}) => {
    const { pk } = useParams();
    const [about, setAbout] = useState(true);
    const [profileLink, setSetProfileLink] = useState(true);
    const [eventsLink, setEventsLink] = useState(false);
    const [sameLink, setSameLink] = useState(false);
    const types = ["Все события", "Предстоящие", "Прошедшие"];
    const [type, setType] = useState(types[0]);
    const [events, setEvents] = useState([]);

    useEffect(() => {
        funcs.setPlayer(false);
        authService.getUser(pk.toString()).then((response) => {
            if (response.status === 200) {
                console.log(response.data)
                funcs.setPlayer(response.data);
            }
        })
    }, [pk])

    useEffect(() => {
        if (player) {
            let array = [];
            let array2 = player.event;
            if (type === types[0]) {
                array = [...array2];
            } else if (type === types[1]) {
                array2.forEach(event => {
                    if (!event.is_end) array.push(event);
                })
            } else if (type === types[2]) {
                array2.forEach(event => {
                    if (event.is_end) array.push(event);
                })
            }
            setEvents(array);
        }
    }, [type, player]) // eslint-disable-line react-hooks/exhaustive-deps

    const EventRow1280 = ({event}) => {
        let address = '';
        if (event.address) {
            address = {
                street: event.address.street ? event.address.street : '',
                house: event.address.house_number ? event.address.house_number : '',
            }
            address = `${address.street} ${address.house}`
        }
        let date = new Date(event.date);

        return (
            <div className={"event-row-1280"}>
                <span className={"elem elem-1 black-400-13"}>{event.name}</span>
                <div className={"elem elem-2"}>
                    <span className={"black-400-13"}>{address}</span>
                    <div className={"row-2"}>
                        <span className={"gray-400-13"}>{date.getDate()}.{date.getMonth()}.{date.getFullYear().toString().slice(2,4)} в {event.time_begin.slice(0, 5)}</span>
                        {event.is_paid && <span className={"black-400-13"}>{event.price} р.</span>}
                        {!event.is_paid && <span className={"gray-400-13"}>Бесплатно</span>}
                    </div>
                </div>
            </div>
        )
    }

    const EventRow = ({event}) => {
        return (<>
            <EventRow1280 event={event}/>
            <EventItem376Component event={event}/>
        </>)
    }

    const About = ({player}) => {
        return (
            <div className={"about"}>
                <div className={"elem elem-1"}>
                    <span className={"black-400-13 icon calendar3-icon"}>Дата рождения:</span>
                    <span className={"black-600-13"}>{player.birthday}</span>
                </div>
                <div className={"elem elem-2"}>
                    <span className={"black-400-13 icon map-point-icon"}>Город:</span>
                    <span className={"black-600-13"}>{player.city}</span>
                </div>
                <div className={"elem elem-3"}>
                    <span className={"black-400-13 icon gender-man-icon"}>Пол:</span>
                    <span
                        className={"black-600-13"}>{player.gender === 'Парень' ? 'Мужской' : 'Женский'}</span>
                </div>
                <div className={"elem elem-4"}>
                    <span className={"black-400-13 icon file-icon"}>О себе:</span>
                    <span className={"black-400-13"}>{player.about_self}</span>
                </div>
            </div>
        )
    }

    const EventsTable = ({player}) => {
        return (
            <div className={"events-table"}>
                <ProfileTableBarComponent value={type} setValue={setType} values={types}/>
                {events.map((event, key) => (<EventRow event={event} key={key}/>))}
            </div>
        )
    }

    const SamePlayers = ({player, hidden=false}) => {
        return (
            <div className={`same-players ${hidden ? 'hidden' : ''}`}>
                <div className={"same-players-head"}>
                    <span className={"el-1 black-700-20"}>Игроки</span>
                    <span className={"gray-600-12"}>Похожие игроки</span>
                </div>
                {player.same_players.map((user, key) => (
                    <Link className={"same-player"} key={key} to={ProfileRoutes.previewPlayerLink(user.id)}>
                        <div className={"elem-1"}>
                            <span className={"black-700-13"}>{eventService.getCutUsername(user.username)}</span>
                            <span className={"black-400-13"}>{user.position_1 ? user.position_1.name : ''}</span>
                        </div>
                        <span className={"elem-2 black-400-13"}>{user.rank}</span>
                    </Link>
                ))}
            </div>
        )
    }

    const toProfile = () => {
        setSetProfileLink(true);
        setEventsLink(false);
        setSameLink(false);
    }

    const toEvents = () => {
        setSetProfileLink(false);
        setEventsLink(true);
        setSameLink(false);
    }

    const toSame = () => {
        setSetProfileLink(false);
        setEventsLink(false);
        setSameLink(true);
    }


    return (
        <main className={"main-wrapper-component"}>
            <HeadComponent user={state.user} funcs={funcs}/>
            <div className={"profile-wrapper-component"}>
                <ProfileAsideComponent player={player} funcs={funcs}/>
                <div className={"preview-player-component"}>
                    {!!player && <>
                        <div className={"top-menu"}>
                            <span className={about ? 'black-700-20' : 'gray-700-20 link'} onClick={() => setAbout(true)}>Об игроке</span>
                            <span className={!about ? 'black-700-20' : 'gray-700-20 link'} onClick={() => setAbout(false)}>Похожие игроки</span>
                        </div>
                        <div className={`about-player ${about ? '' : 'hidden'}`}>
                            <span className={"black-700-20 label-1280"}>Об игроке</span>
                            <About player={player}/>
                            <span className={"black-700-20"}>События</span>
                            <EventsTable player={player}/>
                        </div>
                        <SamePlayers player={player} hidden={about}/>
                    </>}
                    {!player && <LoaderComponent/>}
                </div>
            </div>

            <div className={`preview-player-component-376 ${app.isIPhone ? 'safari-margin' : ''}`}>
                {player && <>
                    <Top376Component className={"top-bar"} label={player.username} to={BaseRoutes.main}/>
                    <div className={"profile-376-menu-component"}>
                        <span className={`nav-link ${profileLink ? 'white-600-12 active' : 'middle-gray-400-12'}`} onClick={toProfile}>Профиль</span>
                        <span className={`nav-link ${eventsLink ? 'white-600-12 active' : 'middle-gray-400-12'}`} onClick={toEvents}>События</span>
                        <span className={`nav-link ${sameLink ? 'white-600-12 active' : 'middle-gray-400-12'}`} onClick={toSame}>Похожие игроки</span>
                    </div>
                    {profileLink && <ProfileAsideComponent player={player} funcs={funcs}>
                        <About player={player}/>
                    </ProfileAsideComponent>}
                    {eventsLink && <EventsTable player={player}/>}
                    {sameLink && <SamePlayers player={player}/>}
                </>}
                {!player && <LoaderComponent/>}
            </div>
            <BottomComponent user={state.user.user} isIPhone={app.isIPhone}/>
        </main>
    )
}