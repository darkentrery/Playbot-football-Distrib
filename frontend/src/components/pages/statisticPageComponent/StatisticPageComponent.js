import VisibleMainWrapper from "../../../redux/containers/VisibleMainWrapper";
import {TopStatisticComponent} from "../../topStatisticComponent/TopStatisticComponent";
import {FiltersComponent} from "../../filtersComponent/FiltersComponent";
import {BestPlayersComponent} from "../../bestPlayersComponent/BestPlayersComponent";
import {useEffect, useState} from "react";
import {authService} from "../../../services/AuthService";


export const StatisticPageComponent = ({state, funcs}) => {
    const [players, setPlayers] = useState([]);
    const [playersView, setPlayersView] = useState([]);

    useEffect(() => {
        let isSubscribe = true;
        authService.getUsers().then((response) => {
            if (response.status === 200) {
                setPlayers(response.data);
                setPlayersView(response.data);
            }
        })
        return () => isSubscribe = false;
    }, [state.user.user])

    return (
        <VisibleMainWrapper>
            <div className={"statistic-page-component"}>
                <TopStatisticComponent/>
                <div className={"statistic-body"}>
                    <FiltersComponent className={"filter-block"} data={players} setData={setPlayersView}/>
                    <BestPlayersComponent players={playersView}/>
                </div>
            </div>
        </VisibleMainWrapper>
    )
}