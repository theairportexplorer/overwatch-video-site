from flask import Flask

app = Flask(__name__)

@app.route("/")
def main_page():
    return app.send_static_file("index.html")

# @app.route("/favicon.ico")
# def favicon():
#     pass

if __name__ == "__main__":
    app.run(host="127.0.0.1", debug=True)