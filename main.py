from flask import Flask

app = Flask(__name__, static_url_path='')


@app.route("/angular-page")
def angular_page():
    return app.send_static_file("index.html")


@app.route("/")
def react_page():
    return app.send_static_file("react-index.html")


@app.route("/db-form")
def db_form_page():
    return app.send_static_file("react-dbform.html")


if __name__ == "__main__":
    app.run(host="127.0.0.1", debug=True)