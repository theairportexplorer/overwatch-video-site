from enum import Enum, auto
import datetime

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

    def __str__(self):
        return f"{self.name.lower()}"

OWHeroesList = [name.lower for name, _ in OverwatchHeroes.__members__.items()]

TODAY = datetime.date.today()
OWRELEASEDATE = datetime.date.fromisoformat("2016-05-24")