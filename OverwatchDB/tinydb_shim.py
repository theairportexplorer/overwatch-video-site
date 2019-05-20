from tinydb import TinyDB
from .db_shim import AbstractDBHandler
import logging

logging.basicConfig(
    format="[%(asctime)s] - %(levelname)s/%(name)s: %(message)s",
    level=logging.DEBUG
)
LOG = logging.getLogger(__name__)


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
    
    def insert(self, entry: dict) -> bool:
        try:
            self._db.insert(entry)
        except Exception as e:
            LOG.warning(str(e))
        return True