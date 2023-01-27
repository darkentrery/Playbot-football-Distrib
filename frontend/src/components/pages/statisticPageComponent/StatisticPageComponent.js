import VisibleMainWrapper from "../../../redux/containers/VisibleMainWrapper";
import {TopStatisticComponent} from "../../topStatisticComponent/TopStatisticComponent";
import {FiltersComponent} from "../../filtersComponent/FiltersComponent";
import {BestPlayersComponent} from "../../bestPlayersComponent/BestPlayersComponent";
import {useEffect, useState} from "react";
import {authService} from "../../../services/AuthService";


export const StatisticPageComponent = ({state, funcs}) => {
    const [players, setPlayers] = useState([]);

    useEffect(() => {
        let isSubscribe = true;
        authService.getUsers().then((response) => {
            if (response.status === 200) {
                setPlayers(response.data);
            }
        })
        return () => isSubscribe = false;
    }, [state.user.user])

    return (
        <VisibleMainWrapper>
            <div className={"statistic-page-component"}>
                <TopStatisticComponent/>
                <div className={"statistic-body"}>
                    <FiltersComponent className={"filter-block"}/>
                    <BestPlayersComponent players={players}/>
                </div>
            </div>
        </VisibleMainWrapper>
    )
}