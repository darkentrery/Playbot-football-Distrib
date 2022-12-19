from playbot.users.models import User


def auto_distribution(event):
    teams_items = event.teams.all()
    players_id = list(event.event_player.all().order_by("player__gender", "-player__rank")
                      .values_list("player__id", "player__rank", "player__gender"))
    middle_rank_player = sum([i[1] for i in players_id]) / len(players_id)
    middle_rank = sum([i[1] for i in players_id]) / teams_items.count() + middle_rank_player
    teams = [{"id": team.id, "rank": 0, "players": [], "count": team.count_players, "men": 0, "women": 0} for team in teams_items]
    for player in players_id:
        decide = False
        if player[2] == User.Gender.MALE:
            for team in teams:
                if team["rank"] == min([i["rank"] for i in teams]) and team["rank"] + player[1] <= middle_rank \
                        and team["count"] > len(team["players"]):
                    team["players"].append(player)
                    team["rank"] += player[1]
                    team["men"] += 1
                    decide = True
                    break

            if not decide:
                for team in teams:
                    if team["rank"] == min([i["rank"] for i in teams]) and team["count"] > len(team["players"]):
                        team["players"].append(player)
                        team["rank"] += player[1]
                        team["men"] += 1
                        decide = True
                        break

            if not decide:
                for team in teams:
                    if team["rank"] + player[1] <= middle_rank and team["count"] > len(team["players"]):
                        team["players"].append(player)
                        team["rank"] += player[1]
                        team["men"] += 1
                        decide = True
                        break

            if not decide:
                for team in teams:
                    if team["count"] > len(team["players"]):
                        team["players"].append(player)
                        team["rank"] += player[1]
                        team["men"] += 1
                        decide = True
                        break

        else:
            for team in teams:
                if team["rank"] == min([i["rank"] for i in teams]) and team["rank"] + player[1] <= middle_rank \
                        and team["count"] > len(team["players"]) and team["women"] == min([i["women"] for i in teams]):
                    team["players"].append(player)
                    team["rank"] += player[1]
                    team["women"] += 1
                    decide = True
                    break

            if not decide:
                for team in teams:
                    if team["rank"] == min([i["rank"] for i in teams]) and team["count"] > len(team["players"]) \
                            and team["women"] == min([i["women"] for i in teams]):
                        team["players"].append(player)
                        team["rank"] += player[1]
                        team["women"] += 1
                        decide = True
                        break

            if not decide:
                for team in teams:
                    if team["rank"] + player[1] <= middle_rank and team["count"] > len(team["players"]) and\
                            team["women"] == min([i["women"] for i in teams]):
                        team["players"].append(player)
                        team["rank"] += player[1]
                        team["women"] += 1
                        decide = True
                        break

            if not decide:
                for team in teams:
                    if team["count"] > len(team["players"]):
                        team["players"].append(player)
                        team["rank"] += player[1]
                        team["women"] += 1
                        decide = True
                        break

    return teams