from dataclasses import dataclass
from itertools import combinations

from django.db.models import QuerySet
from loguru import logger

from playbot.events.models import Team, EventGame, Event, Color
from playbot.users.models import User


def create_teams(event: Event) -> None:
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
        color_id = None
        colors_id = list(Color.objects.all().values_list("id", flat=True))
        next_number = event.next_number
        name = f"Команда {next_number}"
        if next_number in colors_id:
            color = Color.objects.get(id=next_number)
            color_id = color.id
            name = color.color

        Team.objects.create(name=name, event=event, count_players=player, number=next_number, color_id=color_id)


def create_event_games(event: Event) -> None:
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
                        elif len(order_combs) > 1 and not (
                                comb[0] in order_combs[-2] and comb[0] in order_combs[-1]) and not (
                                comb[1] in order_combs[-2] and comb[1] in order_combs[-1]):
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


def auto_distribution(event: Event) -> list[dict]:
    teams_items = event.teams.all()
    players_id = [[player.player.id, player.player.rank, player.player.gender]
                  for player in event.event_player.all().order_by("player__gender")]
    players_id.sort(key=lambda x: x[1], reverse=True)
    middle_rank_player = sum([i[1] for i in players_id]) / len(players_id)
    middle_rank = sum([i[1] for i in players_id]) / teams_items.count() + middle_rank_player
    teams = [{"id": team.id, "rank": 0, "players": [], "count": team.count_players, "men": 0, "women": 0} for team in
             teams_items]
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
                    if team["rank"] + player[1] <= middle_rank and team["count"] > len(team["players"]) and \
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


@dataclass
class Proportion:
    min: int
    max: int
    win_proportion: int
    rank_proportion: int


class RankCalculation:
    proportions = [
        Proportion(0, 10, 10, 90),
        Proportion(11, 20, 15, 85),
        Proportion(21, 30, 20, 80),
        Proportion(31, 40, 25, 75),
        Proportion(41, 50, 30, 70),
        Proportion(51, 60, 35, 65),
        Proportion(61, 70, 40, 60),
        Proportion(71, 80, 45, 55),
        Proportion(81, 90, 50, 50),
        Proportion(91, 100, 55, 45),
        Proportion(101, 200, 60, 40),
        Proportion(201, 1000, 70, 30),
        # {"min": 0, "max": 10, "win_proportion": 10, "rank_proportion": 90},
        # {"min": 11, "max": 20, "win_proportion": 15, "rank_proportion": 85},
        # {"min": 21, "max": 30, "win_proportion": 20, "rank_proportion": 80},
        # {"min": 31, "max": 40, "win_proportion": 25, "rank_proportion": 75},
        # {"min": 41, "max": 50, "win_proportion": 30, "rank_proportion": 70},
        # {"min": 51, "max": 60, "win_proportion": 35, "rank_proportion": 65},
        # {"min": 61, "max": 70, "win_proportion": 40, "rank_proportion": 60},
        # {"min": 71, "max": 80, "win_proportion": 45, "rank_proportion": 55},
        # {"min": 81, "max": 90, "win_proportion": 50, "rank_proportion": 50},
        # {"min": 91, "max": 100, "win_proportion": 55, "rank_proportion": 45},
        # {"min": 101, "max": 200, "win_proportion": 60, "rank_proportion": 40},
        # {"min": 201, "max": 1000, "win_proportion": 70, "rank_proportion": 30},
    ]

    def __init__(self, user: User, event: Event, game: EventGame = None) -> None:
        self.user = user
        self.event = event
        self.game = game

    def get_proportion(self) -> tuple[float, float]:
        for proportion in self.proportions:
            if proportion.min <= self.user.all_games <= proportion.max:
                return proportion.win_proportion, proportion.rank_proportion
        return 0, 100

    @staticmethod
    def get_k_goal(win_goals: int, loss_goals: int) -> float:
        k_goal = win_goals + 0.5
        if loss_goals:
            k_goal = win_goals / loss_goals
        if not loss_goals and not win_goals:
            k_goal = 1
        return k_goal

    @staticmethod
    def get_wins_loss_goals(self_score: int, opponent_score: int, self_result: float) -> tuple[int, int]:
        win_goals = self_score
        loss_goals = opponent_score
        if self_result < 0:
            win_goals = opponent_score
            loss_goals = self_score
        return win_goals, loss_goals

    @staticmethod
    def get_time_sum(user_team: Team) -> int:
        time_sum = 0
        for event_game in user_team.event_games_teams_1.all():
            time_sum += event_game.current_duration
        for event_game in user_team.event_games_teams_2.all():
            time_sum += event_game.current_duration
        return time_sum

    def get_average_opponents_rank_and_rivals(self, opponent_teams: QuerySet) -> tuple[float, int]:
        avr_opponents = 0
        rivals = 0
        unique_rivals = self.user.rivals.filter(user_rivals_to_user__event=self.event).count()
        for opponent_team in opponent_teams:
            for opponent in opponent_team.team_players.all():
                avr_opponents += opponent.player.rank_fact
                if opponent.player not in self.user.rivals.all():
                    unique_rivals += 1
                    self.user.rivals.add(opponent.player, through_defaults={"event": self.event})
            rivals += opponent_team.team_players.all().count()
        avr_opponents /= rivals
        return avr_opponents, unique_rivals

    def get_average_opponents_rank_and_rivals_in_game(self, opponent_team: Team) -> tuple[float, int]:
        avr_opponents = 0
        rivals = 0
        unique_rivals = self.user.rivals.filter(user_rivals_to_user__event=self.event).count()
        for opponent in opponent_team.team_players.all():
            avr_opponents += opponent.player.rank_fact
            if opponent.player not in self.user.rivals.all():
                unique_rivals += 1
                self.user.rivals.add(opponent.player, through_defaults={"event": self.event})
        rivals += opponent_team.team_players.all().count()
        avr_opponents /= rivals
        return avr_opponents, unique_rivals

    def get_teams(self) -> tuple[Team, QuerySet]:
        user_team = self.event.teams.all().first()
        opponents_id = []
        for team in self.event.teams.all():
            if team.team_players.filter(player__id=self.user.id).exists():
                user_team = team
            else:
                opponents_id.append(team.id)

        opponent_teams = self.event.teams.filter(id__in=opponents_id)
        return user_team, opponent_teams

    def get_teams_for_game(self) -> tuple[Team, Team]:
        user_team = self.game.team_1
        opponent_team = self.game.team_2
        if not user_team.team_players.filter(player__id=self.user.id).exists():
            user_team = self.game.team_2
            opponent_team = self.game.team_1
        return user_team, opponent_team

    @staticmethod
    def get_rate(rank_fact: float, avr_opponents: float) -> float:
        if rank_fact:
            rate = avr_opponents / rank_fact
        else:
            rate = 1 if avr_opponents else 0
        return rate

    def get_result_sum(self, user_team: Team, time_sum: int, event_duration: int) -> float:
        result_sum = 0
        for event_game in user_team.event_games_teams_1.all():
            win_goals, loss_goals = self.get_wins_loss_goals(event_game.score_1, event_game.score_2, event_game.result_1)
            k_goal = self.get_k_goal(win_goals, loss_goals)
            result = self.event.format.rate * event_game.result_1 * k_goal * time_sum / event_duration
            result_sum += result
            # logger.info(f"result_sum += event.format.rate * event_game.result_1 * k_goal * time_sum / event_duration")
            # logger.info(f"{result_sum=}, {self.event.format.rate=}, {event_game.result_1=}, {k_goal=}, {time_sum=}, {event_duration=}")
        for event_game in user_team.event_games_teams_2.all():
            win_goals, loss_goals = self.get_wins_loss_goals(event_game.score_2, event_game.score_1, event_game.result_2)
            k_goal = self.get_k_goal(win_goals, loss_goals)
            result = self.event.format.rate * event_game.result_2 * k_goal * time_sum / event_duration
            result_sum += result
            # logger.info(f"result_sum += event.format.rate * event_game.result_2 * k_goal * time_sum / event_duration")
            # logger.info(f"{result_sum=}, {self.event.format.rate=}, {event_game.result_2=}, {k_goal=}, {time_sum=}, {event_duration=}")
        return result_sum

    def get_game_result(self, user_team: Team) -> float:
        win_goals = self.game.score_1 if user_team.id == self.game.team_1.id else self.game.score_2
        loss_goals = self.game.score_2 if user_team.id == self.game.team_1.id else self.game.score_1
        k_goal = self.get_k_goal(win_goals, loss_goals)
        team_result = self.game.result_1 if user_team.id == self.game.team_1.id else self.game.result_2
        result = self.event.format.rate * team_result * k_goal * 0.01
        return result

    def get_next_rank(self, recalculate: bool = False) -> float:
        rank_fact = self.user.rank_before_event(self.event) if recalculate else self.user.rank_fact
        # logger.info(f"username= {self.user.email}, {rank_fact=}")
        event_duration = sum([game.current_duration for game in self.event.event_games.all()])
        if not event_duration:
            return rank_fact

        user_team, opponent_teams = self.get_teams()
        avr_opponents, unique_rivals = self.get_average_opponents_rank_and_rivals(opponent_teams)
        rate = self.get_rate(rank_fact, avr_opponents)
        time_sum = self.get_time_sum(user_team)
        result_sum = self.get_result_sum(user_team, time_sum, event_duration)

        # logger.info(f"{result_sum=}")

        rank = (rank_fact + result_sum * 0.5 + unique_rivals * 0.01 + rate * 0.001) * self.user.involvement * (100 - self.user.penalty) * 0.01
        # logger.info(f"{rank_fact=}, {result_sum=}, {unique_rivals=}, {avr_opponents=}, {rate=}, {self.user.involvement=}, {self.user.penalty=}")
        # logger.info(f"username= {self.user.email}, {rank=}")
        win_proportion, rank_proportion = self.get_proportion()
        total_rank = (win_proportion * self.user.wins_percent + rank_proportion * rank) / 100
        logger.info(f"{win_proportion=}, {rank_proportion=}, {self.user.wins_percent=}, {total_rank=}\n")

        return round(total_rank, 2)

    @logger.catch
    def get_next_rank_after_game(self, recalculate: bool = False) -> float:
        rank_fact = self.user.rank_before_game(self.game) if recalculate else self.user.rank_fact
        event_duration = sum([game.current_duration for game in self.event.event_games.all()])
        if not event_duration:
            return rank_fact

        user_team, opponent_team = self.get_teams_for_game()
        avr_opponents, unique_rivals = self.get_average_opponents_rank_and_rivals_in_game(opponent_team)
        rate = self.get_rate(rank_fact, avr_opponents)
        result = self.get_game_result(user_team)
        rank = (rank_fact + result + unique_rivals * 0.01 + rate * 0.001) * self.user.involvement * (100 - self.user.penalty) * 0.01
        self.log_game_print(rank_fact, result, unique_rivals, avr_opponents, rate, rank)

        return rank

    def log_game_print(self, rank_fact: float, result: float, unique_rivals: int, avr_opponents: float, rate: float, rank: float):
        logger.info(f"username= {self.user.email}, {rank_fact=}")
        logger.info(f"{rank_fact=}, {result=}, {unique_rivals=}, {avr_opponents=}, {rate=}, {self.user.involvement=}, {self.user.penalty=}")
        logger.info(f"username= {self.user.email}, {rank=}")

