from abc import ABC


class AbstractDBHandler(ABC):
    @abstractmethod
    def __init__(self, filename: str):
        pass

    @abstractmethod
    def __enter__(self):
        self.start()
        return self

    @abstractmethod
    def __exit__(self, *_):
        self.stop()

    @abstractmethod
    def start(self):
        pass

    @abstractmethod
    def stop(self):
        pass

    