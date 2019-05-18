from abc import ABC
from datetime import date
from types import Optional
from .utils import OverwatchHeroes

TODAY = date.today()


class AbstractDBHandler(ABC):
    @abstractmethod
    def __init__(self, *, db: str=None):
        pass

    @abstractmethod
    def __enter__(self):
        self.open()
        return self

    @abstractmethod
    def __exit__(self, *_):
        self.close()

    @abstractmethod
    def open(self):
        pass

    @abstractmethod
    def close(self):
        pass

    @abstractmethod
    def insert(self) -> bool:
        return False

    @abstractmethod
    def fetch_by_dates(
        self, start_date: date, *, end_date: Optional[date]=TODAY
    ) -> list:
        return []

    @abstractmethod
    def fetch_by_hero_name(self, name: OverwatchHeroes) -> list:
        return []

    @abstractmethod
    def fetch_by_tag(self, tag: str) -> list:
        return []

    @abstractmethod
    def fetch_by_multipe(
        self, *,
        start_date: Optional[date]=None,
        end_date: Optional[date]=None,
        hero_name: Optional[OverwatchHeroes]=None,
        tag: Optional[str]=None
    ) -> list:
        return []