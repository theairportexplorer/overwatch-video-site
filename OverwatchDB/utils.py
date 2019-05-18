from enum import Enum, auto


class OverwatchHeroes(Enum):
    Ana = auto()
    Ashe = auto()
    Baptise = auto()
    Bastion = auto()
    Brigitte = auto()
    DVa = auto()
    Doomfist = auto()
    Genji = auto()
    Hanzo = auto()
    Junkrat = auto()
    Lucio = auto()
    McCree = auto()
    Mei = auto()
    Mercy = auto()
    Moira = auto()
    Orisa = auto()
    Pharah = auto()
    Reaper = auto()
    Reinhardt = auto()
    Roadhog = auto()
    Soldier76 = auto()
    Sombra = auto()
    Symmetra = auto()
    Torbjorn = auto()
    Widowmaker = auto()
    Winston = auto()
    WreckingBall = auto()
    Zarya = auto()
    Zenyatta = auto()


OWHeroesList = [name.lower for name, _ in OverwatchHeroes.__members__.items()]