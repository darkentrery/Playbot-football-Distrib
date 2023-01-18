import HeadComponent from "../../HeadComponent";
import {ProfileAsideComponent} from "../../profileAsideComponent/ProfileAsideComponent";
import {Link, useParams} from "react-router-dom";
import ProfileRoutes from "../../../routes/ProfileRoutes";
import BottomComponent from "../../BottomComponent";
import React, {useEffect} from "react";
import {authService} from "../../../services/AuthService";


export const PreviewPlayerComponent = ({
    state,
    funcs,
}) => {
    const params = useParams();
    const pk = params.pk;

    useEffect(() => {
        authService.getUser(pk.toString()).then((response) => {
            if (response.status === 200) {
                console.log(response)
                funcs.setPlayer(response.data);
            }
        })
    }, [pk])

    return (
        <main className={"main-wrapper-component"}>
            <HeadComponent user={state.user} funcs={funcs}/>
            <div className={"profile-wrapper-component scroll"}>
                <ProfileAsideComponent player={state.event.player}/>
                <div className={"preview-player-component"}>

                </div>
            </div>
            <BottomComponent/>
        </main>
    )
}