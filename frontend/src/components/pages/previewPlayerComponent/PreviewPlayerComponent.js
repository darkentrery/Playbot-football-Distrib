import HeadComponent from "../../HeadComponent";
import {ProfileAsideComponent} from "../../profileAsideComponent/ProfileAsideComponent";
import {Link, useParams} from "react-router-dom";
import ProfileRoutes from "../../../routes/ProfileRoutes";
import BottomComponent from "../../BottomComponent";
import React, {useEffect, useState} from "react";
import {authService} from "../../../services/AuthService";
import {EventItem376Component} from "../../eventItem376Component/EventItem376Component";


export const PreviewPlayerComponent = ({
    state,
    player,
    funcs,
}) => {
    const params = useParams();
    const pk = params.pk;
    const [about, setAbout] = useState(true);

    useEffect(() => {
        authService.getUser(pk.toString()).then((response) => {
            if (response.status === 200) {
                console.log(response.data)
                funcs.setPlayer(response.data);
            }
        })
    }, [pk])

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

    return (
        <main className={"main-wrapper-component"}>
            <HeadComponent user={state.user} funcs={funcs}/>
            <div className={"profile-wrapper-component scroll"}>
                <ProfileAsideComponent player={player}/>
                {player && <div className={"preview-player-component"}>
                    <div className={"top-menu"}>
                        <span className={about ? 'black-700-20' : 'gray-700-20 link'} onClick={() => setAbout(true)}>Об игроке</span>
                        <span className={!about ? 'black-700-20' : 'gray-700-20 link'} onClick={() => setAbout(false)}>Похожие игроки</span>
                    </div>
                    <div className={`about-player ${about ? '' : 'hidden'}`}>
                        <span className={"black-700-20 label-1280"}>Об игроке</span>
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
                                <span className={"black-600-13"}>{player.gender === 'Муж.' ? 'Мужской' : 'Женский'}</span>
                            </div>
                            <div className={"elem elem-4"}>
                                <span className={"black-400-13 icon file-icon"}>О себе:</span>
                                <span className={"black-400-13"}>{player.about_self}</span>
                            </div>
                        </div>
                        <span className={"black-700-20"}>События</span>
                        <div className={"events-table"}>
                            <div className={"table-head"}>
                                <span className={"black-600-14"}>Ближайшие</span>
                                <div className={"gray-down-arrow-icon"}></div>
                            </div>
                            {player.event_player.map((event, key) => (<EventRow event={event.event} key={key}/>))}
                        </div>

                    </div>
                    <div className={`same-players ${about ? 'hidden' : ''}`}>
                        <div className={"same-players-head"}>
                            <span className={"el-1 black-700-20"}>Игроки</span>
                            <span className={"gray-600-12"}>Похожие игроки</span>
                            <div className={"gray-down-arrow-icon"}></div>
                        </div>
                        <div className={"same-player"}>
                            <div className={"elem-1"}>
                                <span className={"black-700-13"}>Наталья Разломова</span>
                                <span className={"black-400-13"}>Наталья Разломова</span>
                            </div>
                            <span className={"elem-2 black-400-13"}>88,9</span>
                        </div>
                    </div>
                </div>}
            </div>
            <BottomComponent user={state.user.user}/>
        </main>
    )
}