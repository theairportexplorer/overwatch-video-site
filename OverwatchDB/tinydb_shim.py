from tinydb import TinyDB
from .db_shim import AbstractDBHandler


class TinyDBHandler(AbstractDBHandler):
    def __init__(self, *, db: str="video-metadata.json"):
        self._db_name = db
        self._db = None

    def __enter__(self):
        self.open()
        return self

    def __exit__(self):
        self.close()

    def open(self):
        self._db = TinyDB(self._db_name)

    def close(self):
        self._db.close()
    
    