from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import jsonschema
import signal
import datetime

app = Flask(__name__, static_url_path='')
CORS(app)

DB = None
try:
    with open("schemas/db_form.json") as fd:
        POPULATE_DB_SCHEMA = json.loads(fd.read())
except Exception as e:
    POPULATE_DB_SCHEMA = None


@app.route("/", methods=['GET'])
def main_page():
    return app.send_static_file("react-dbform.html")


@app.route("/populate-db", methods=['POST'])
def populate_db():
    try:
        data = request.get_json()
        print(data)
        try:
            jsonschema.validate(data, POPULATE_DB_SCHEMA)
        except jsonschema.ValidationError as e:
            return f"Invalid JSON: {e!s}", 400
        return '', 200
    except Exception as e:
        return str(e), 500


def shutdown (*_):
    if DB is not None:
        DB.close()


if __name__ == "__main__":
    app.run(host="127.0.0.1", debug=True)