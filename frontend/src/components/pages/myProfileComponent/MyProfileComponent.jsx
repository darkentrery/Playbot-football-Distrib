import VisibleProfileWrapper from "../../../redux/containers/VisibleProfileWrapper";
import React, { useEffect } from "react";
import { useState } from "react";

import { UserProfileHeader } from "../../UserProfileHeader/UserProfileHeader";
import { UserProfilePins } from "../../UserProfilePins/UserProfilePins";
import { UserProfileStats } from "../../UserProfileStats/UserProfileStats";
import { UserProfileAchievements } from "../../UserProfileAchievements/UserProfileAchievements";
import { UserProfileNavMobile } from "../../UserProfileNavMobile/UserProfileNavMobile";
import { UserProfileGameHistory } from "../../UserProfileGameHistory/UserProfileGameHistory";
import { UserProfileSamePlayers } from "../../UserProfileSamePlayers/UserProfileSamePlayers";
import { useSelector } from "react-redux";
import { UserProfileFutureGames } from "../../UserProfileFutureGames/UserProfileFutureGames";
import { MyProfileSkeletons376 } from "../../MyProfileSkeletons/MyProfileSkeletons376";

export const MyProfileComponent = ({
    player,
    user,
    funcs,
}) => {
    const [isLoading, setIsLoading] = useState(true)

    const showMenu = () => {
        funcs.openShowMenu();
    }

    const { event } = useSelector(state => state)

    let isProfileOwner = false;
    if (event.player.id === user.id) {
        isProfileOwner = true;
    }

    // useEffect(() => {
    //     if (player) {
    //         setIsLoading(false)
    //     }
    // }, [player])
    return (
        <>
            {isLoading ?
                <VisibleProfileWrapper>
                    <MyProfileSkeletons376/>
                </VisibleProfileWrapper>
                :
                <VisibleProfileWrapper>
                    {isProfileOwner
                        ? <UserProfileNavMobile type="myProfile" />
                        : <UserProfileNavMobile type="onlyArrow" />
                    }

                    <UserProfileHeader
                        username={event.player.username}
                        photo={event.player.small_card_photo} rating={event.player.rank}
                        ratingPlace={event.player.ranking_place}
                        age={event.player.birthday}
                        isProfileOwner={isProfileOwner}
                    />

                    {!isProfileOwner && (
                        <UserProfilePins
                            dateJoined={event.player.date_joined}
                            playedTogether={"need backend"}
                            totalGames={event.player.all_games}
                        />
                    )}

                    <UserProfileStats
                        wins={event.player.wins}
                        draw={"need backend"}
                        lose={event.player.loss}
                        winRate={event.player.wins_percent}
                        goals={event.player.count_goals}
                        assists={event.player.count_assist}
                        totalGames={event.player.all_games}
                    />

                    {isProfileOwner && (
                        <UserProfileFutureGames events={event.player.event_player} />
                    )}

                    <UserProfileAchievements />

                    <UserProfileGameHistory
                        events={event.player.event_player}
                    />

                    <UserProfileSamePlayers
                        users={event.player.same_players}
                    />
                </VisibleProfileWrapper>
            }
        </>
    )
}