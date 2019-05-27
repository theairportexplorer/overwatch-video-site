from flask import (
    Flask,
    request
)
from OverwatchDB import TinyDBHandler as DBHandler
import signal
import logging

logging.basicConfig(
    format="[%(asctime)s] - %(levelname)s/%(name)s: %(message)s",
    level=logging.DEBUG
)
LOG = logging.getLogger(__name__)

app = Flask(__name__, static_url_path='')
DB = None


@app.route("/angular-page")
def angular_page():
    return app.send_static_file("index.html")


@app.route("/")
def react_page():
    return app.send_static_file("react-index.html")


@app.route("/retrieve")
def retrieve_records():
    """
    """
    args = request.args
    LOG.debug(args)
    start_date = args["start_date"]
    return '', 200
    

@app.route("/db-form")
def db_form_page():
    return app.send_static_file("react-dbform.html")


def shutdown(*_):
    if DB is not None:
        DB.close()


if __name__ == "__main__":
    signal.signal(signal.SIGINT, shutdown)

    DB = DBHandler(db="video-metadata.json", schemafile="schemas/db_form.json")
    DB.open()
    app.run(host="127.0.0.1", debug=True)