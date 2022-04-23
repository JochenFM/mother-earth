from logging import raiseExceptions
from signal import raise_signal
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

@app.route("/about")
def about():
    """
    This route displays the about webpage.
    """
    return render_template("about.html")

@app.route("/quiz_splash")
def quiz_splash():
    """
    This route displays the quiz splash webpage.
    """
    return render_template("quiz_splash.html")    

@app.route("/quiz")
def quiz():
    """
    This route displays the quiz webpage.
    """
    return render_template("quiz.html")

@app.route("/resources")
def resources():
    """
    This route displays the resources webpage.
    """
    return render_template("resources.html")

@app.route("/contact")
def contact():
    """
    This route displays the contact webpage.
    """
    return render_template("contact.html")

@app.route("/highscores")
def highscores():
    """
    This route displays the highscores webpage.
    """
    return render_template("highscores.html")
  
@app.route("/score")
def score():
    """
    This route displays the score webpage.
    """
    return render_template("score.html")    

@app.errorhandler(404)
def page_not_found(e):
    """
    This route renders a custom error message.
    """
    # note that we set the 404 status explicitly
    return render_template("404.html"), 404


@app.errorhandler(500)
def internal_error(e):
    """
    This route renders a custom internal error message.
    """
    # note that we set the 500 status explicitly
    return render_template("500.html"), 500

if __name__ == "__main__":
    app.run(host=os.environ.get("IP"), port=int(os.environ.get("PORT")), debug=os.environ.get("DEBUG", False))
