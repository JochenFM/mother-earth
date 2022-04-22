from flask import Flask, render_template
import os

if os.path.exists("env.py"):
    import env


app = Flask(__name__)
app.secret_key = os.environ.get("SECRET_KEY")

@app.route("/")
def home_page():
    """
    This route displays the home webpage.
    """
    return render_template("home_page.html")

if __name__ == "__main__":
    app.run(host=os.environ.get("IP"), port=int(os.environ.get("PORT")), debug=os.environ.get("DEBUG", False))
