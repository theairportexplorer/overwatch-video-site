from flask import Flask, request
from flask_cors import CORS
from tinydb import TinyDB
import signal

app = Flask(__name__)
CORS(app)

DB = None


@app.route("/", methods=['GET'])
def main_page():
    return app.send_static_file("react-db_form.html")


@app.route("/", methods=['POST'])
def populate_db():
    try:
        data = request.get_json()
        return ''
    except Exception as e:
        return str(e), 500


def shutdown (*_):
    if DB is not None:
        DB.close()


if __name__ == "__main__":
    DB = TinyDB("video-metadata.json")
    app.run(host=127.0.0.1, debug=True)