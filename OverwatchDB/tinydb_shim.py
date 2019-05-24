from tinydb import TinyDB, Query
from .db_shim import AbstractDBHandler
from .utils import (
    TODAY,
    OWRELEASEDATE
)
import logging
import json
import jsonschema
import datetime

logging.basicConfig(
    format="[%(asctime)s] - %(levelname)s/%(name)s: %(message)s",
    level=logging.DEBUG
)
LOG = logging.getLogger(__name__)


class TinyDBHandler(AbstractDBHandler):
    def __init__(
        self, *, db: str="video-metadata.json",
        schemafile: str="db_form.json"
    ):
        self._db_name = db
        self._db = None
        with open(schemafile) as fd:
            self._schema = json.loads(fd.read())

    def __enter__(self):
        self.open()
        return self

    def __exit__(self):
        self.close()

    def open(self):
        self._db = TinyDB(self._db_name)

    def close(self):
        self._db.close()

    def _url_check(self, url: str) -> bool:
        if self._db is not None:
            return self._db.contains(Query().video_url == url)
        else:
            raise ValueError("No database found")
    
    def _validate_date(self, date_prototype: str) -> str:
        # Expected prototype ISO 8061 (yyyy-mm-dd)
        candidate = datetime.date.fromisoformat(date_prototype)
        if candidate > TODAY:
            raise ValueError(f"{date_prototype} is after today")
        if candidate < OWRELEASEDATE:
            raise ValueError(f"{date_prototype} is before Overwatch release day")
        return candidate.isoformat()

    def _parse_tags(tags: str) -> list:
        return [tag for tag in tags.split() if tag.startswith("#")]
    
    def insert(self, data: dict) -> tuple:
        try:
            LOG.debug(data)
            jsonschema.validate(data, self._schema)
            data["video_date"] = self._validate_date(data["video_date"])
            data["tags"] = self._parse_tags(data["tags"])
            if self._url_check(data["video_url"]) is True:
                raise ValueError(f"{data['video_url']} is already tracked")
            if self._db is not None:
                self._db.insert(data)
            else:
                raise ValueError("No database found")
            return '', 200
        except ValueError as e:
            LOG.warning(str(e))
            return f"Error: {e!s}", 400
        except jsonschema.ValidationError as e:
            LOG.warning(str(e))
            return f"Invalid JSON: {e!s}", 400
        except Exception as e:
            LOG.warning(str(e))
            return str(e), 500