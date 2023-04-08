import VisibleMainWrapper from "../../../redux/containers/VisibleMainWrapper";
import {TopStatisticComponent} from "../../topStatisticComponent/TopStatisticComponent";
import {FiltersComponent} from "../../filtersComponent/FiltersComponent";
import {BestPlayersComponent} from "../../bestPlayersComponent/BestPlayersComponent";
import {useEffect, useState} from "react";
import {authService} from "../../../services/AuthService";


export const StatisticPageComponent = ({state, funcs}) => {
    const [players, setPlayers] = useState([]);
    const [playersView, setPlayersView] = useState([]);
    const [loader, setLoader] = useState(true);

    useEffect(() => {
        authService.getUsers().then((response) => {
            if (response.status === 200) {
                console.log(response.data)
                setPlayers(response.data);
                setPlayersView(response.data);
                setLoader(false);
            }
        })
    }, [state.user.user])

    return (
        <VisibleMainWrapper>
            <div className={"statistic-page-component"}>
                <TopStatisticComponent players={players} setPlayersView={setPlayersView}/>
                <div className={"statistic-body"}>
                    <FiltersComponent className={"filter-block"} data={players} setData={setPlayersView}/>
                    <BestPlayersComponent players={playersView} loader={loader}/>
                </div>
            </div>
        </VisibleMainWrapper>
    )
}