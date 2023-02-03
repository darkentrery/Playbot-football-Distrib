from itertools import combinations
from playbot.events.models import Team, EventGame
from playbot.notices.models import Notice, UserNotice
from playbot.users.models import User


def create_teams(event):
    count_players = event.event_player.all().count()
    base_count = event.format.count
    count_teams = count_players // base_count
    above_count = count_players - count_teams * base_count
    players_in_team = []
    for i in range(count_teams):
        if above_count:
            players_in_team.append(base_count + 1)
            above_count -= 1
        else:
            players_in_team.append(base_count)
    for team in event.teams.all():
        team.delete()
    for player in players_in_team:
        Team.objects.create(name=f"Команда {event.next_number}", event=event, count_players=player, number=event.next_number)


def create_event_games(event):
    teams_id = list(event.teams.all().values_list("id", flat=True))
    combs = [i for i in combinations(teams_id, 2)]
    order_combs = []
    if len(teams_id) > 3:
        while len(order_combs) < len(combs):
            for comb in combs:
                if not order_combs:
                    order_combs.append(comb)
                    continue
                elif not (comb in order_combs):
                    if len(teams_id) == 4:
                        if len(order_combs) == 1 and len(set(comb + order_combs[-1])) == 4:
                            order_combs.append(comb)
                            continue
                        elif len(order_combs) > 1 and not (comb[0] in order_combs[-2] and comb[0] in order_combs[-1]) and not (comb[1] in order_combs[-2] and comb[1] in order_combs[-1]):
                            order_combs.append(comb)
                            continue
                    else:
                        if len(set(comb + order_combs[-1])) == 4:
                            order_combs.append(comb)
                            continue
    else:
        order_combs = combs

    for game in event.event_games.all():
        game.delete()
    for j in range(event.count_circles.count):
        for i, comb in enumerate(order_combs):
            number = j * len(order_combs) + i + 1
            EventGame.objects.create(number=number, team_1_id=comb[0], team_2_id=comb[1], event=event)


def auto_distribution(event):
    teams_items = event.teams.all()
    players_id = [[player.player.id, player.player.rank, player.player.gender]
                  for player in event.event_player.all().order_by("player__gender")]
    players_id.sort(key=lambda x: x[1], reverse=True)
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


def get_next_rank(user, event):
    user_team = event.teams.all().first()
    opponents_id = []
    for team in event.teams.all():
        if team.team_players.filter(player__id=user.id).exists():
            user_team = team
        else:
            opponents_id.append(team.id)

    opponent_teams = event.teams.filter(id__in=opponents_id)

    # opponent_team = game.team_1
    # user_team = game.team_2
    # if game.team_1.team_players.filter(player__id=user.id).exists():
    #     opponent_team = game.team_2
    #     user_team = game.team_1

    time_sum = 0
    for team_player in user.team_players.all():
        for event_game in team_player.team.event_games_teams_1.all():
            time_sum += event_game.current_duration
        for event_game in team_player.team.event_games_teams_2.all():
            time_sum += event_game.current_duration

    result_sum = 0
    event_duration = sum([game.current_duration for game in event.event_games.all()])
    for team_player in user.team_players.all():
        for event_game in team_player.team.event_games_teams_1.all():
            win_goals = event_game.score_1
            loss_goals = event_game.score_2
            if event_game.result_1 < 0:
                win_goals = event_game.score_2
                loss_goals = event_game.score_1
            k_goal = win_goals + 0.5
            if loss_goals:
                k_goal  = win_goals / loss_goals
            result = event.format.rate * event_game.result_1 * k_goal * time_sum / event_duration
            result_sum += result
            # time_sum += event_game.current_duration * event_game.event.format.rate
        for event_game in team_player.team.event_games_teams_2.all():
            win_goals = event_game.score_2
            loss_goals = event_game.score_1
            if event_game.result_2 < 0:
                win_goals = event_game.score_1
                loss_goals = event_game.score_2
            k_goal = win_goals + 0.5
            if loss_goals:
                k_goal = win_goals / loss_goals
            result = event.format.rate * event_game.result_2 * k_goal * time_sum / event_duration
            result_sum += result
            # time_sum += event_game.current_duration * event_game.event.format.rate
    time_sum *= 0.001
    result_sum *= 0.001
    avr_opponents = 0
    rivals = 0
    for opponent_team in opponent_teams:
        for opponent in opponent_team.team_players.all():
            avr_opponents += opponent.player.rank
        rivals += opponent_team.team_players.all().count()
    avr_opponents /= rivals

    # delta_team_rank = user_team.rank + event.format.rate * 0.01 + user_team.all_rivals * 0.01

    # delta_rank = user.rank + event.format.rate * delta_team_rank + Goal.objects.filter(team=user_team, player=user).count()
    rank = (user.rank + result_sum + user.all_rivals * 0.01 + avr_opponents / user.rank) * user.involvement * (100 - user.penalty) * 0.01
    return rank
