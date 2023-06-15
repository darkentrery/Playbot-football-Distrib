import React from 'react-dom';
import { authDecoratorWithoutLogin } from '../../services/AuthDecorator';
import BaseRoutes from '../../routes/BaseRoutes';
import { Link } from 'react-router-dom';
import { eventService } from '../../services/EventService';
import { parseISO, format } from 'date-fns';
import { getLocalTime } from '../../utils/dates';

export const ButtonsBoardOrganizerComponent = ({ event, funcs }) => {
    let date = parseISO(`${event.date}T${getLocalTime(event.time_begin)}`);
    date.setHours(date.getHours() - 1)

    const toConfirmPlayers = (e) => {
        if (new Date() >= date) {
            funcs.openConfirmPlayers();
            e.target.blur();
            authDecoratorWithoutLogin(
                eventService.toConfirmPlayers,
                event
            ).then((response) => {
                funcs.setEvent(response.data);
            });
            funcs.removeMap();
        }
    };
    const toFillRegulation = (e) => {
        funcs.openFillRegulation();
        e.target.blur();
        funcs.removeMap();
    };
    const toConfirmTeams = (e) => {
        if (event.distribution_method === 'Автоматический') {
            funcs.openConfirmTeams();
        } else {
            funcs.openConfirmTeamPlayers();
        }
        e.target.blur();
        funcs.removeMap();
    };

    const toCancelEvent = () => {
        funcs.openCancelEvent();
        funcs.removeMap();
    };

    const repeatEvent = () => {
        funcs.openRepeatEvent();
        funcs.removeMap();
    };
    return (
        <div className={'elem elem-4'}>
            {event.is_end && (
                <>
                    {
                        <button className={`el el-3 btn`} onClick={repeatEvent}>
                            Повторить событие
                        </button>
                    }
                    {event.event_step.length === 3 &&
                        event.event_step[2]['complete'] && (
                            <Link
                                className={`el el-2 btn-second organizer-watch-results-btn`}
                                to={BaseRoutes.eventInfoLink(event.id)}
                            >
                                Итоги события
                            </Link>
                        )}
                </>
            )}
            {!event.is_end && (
                <>
                    {!event.cancel && (
                        <>
                            {event.event_step.length === 0 && (
                                <button
                                    className={`el el-${
                                        !event.is_begin ? '1' : '3'
                                    } btn ${
                                        new Date() < date ? 'disabled' : ''
                                    }`}
                                    onClick={toConfirmPlayers}
                                >
                                    Начать игру
                                </button>
                            )}
                            {event.event_step.length === 1 &&
                                !event.event_step[0]['complete'] && (
                                    <button
                                        className={`el el-${
                                            !event.is_begin ? '1' : '3'
                                        } btn-second`}
                                        onClick={toConfirmPlayers}
                                    >
                                        Подтверждение игроков
                                    </button>
                                )}
                            {event.event_step.length === 2 &&
                                !event.event_step[1]['complete'] && (
                                    <button
                                        className={`el el-${
                                            !event.is_begin ? '1' : '3'
                                        } btn-second`}
                                        onClick={toFillRegulation}
                                    >
                                        Регламент
                                    </button>
                                )}
                            {event.event_step.length === 3 &&
                                !event.event_step[2]['complete'] && (
                                    <button
                                        className={`el el-${
                                            !event.is_begin ? '1' : '3'
                                        } btn-second`}
                                        onClick={toConfirmTeams}
                                    >
                                        Подтверждение команд
                                    </button>
                                )}
                            {event.event_step.length === 3 &&
                                event.event_step[2]['complete'] && (
                                    <Link
                                        className={`el el-${
                                            !event.is_begin ? '1' : '3'
                                        } btn`}
                                        to={BaseRoutes.eventInfoLink(event.id)}
                                    >
                                        Перейти в меню игры
                                    </Link>
                                )}
                            {/* {!event.is_begin &&
                        <button className={"el el-2 btn-second"} onClick={toCancelEvent}>Отменить игру</button>} */}
                        </>
                    )}
                    {event.cancel && <span>Событие отменено</span>}
                </>
            )}
        </div>
    );
};
