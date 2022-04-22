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

if __name__ == "__main__":
    app.run(host=os.environ.get("IP"), port=int(os.environ.get("PORT")), debug=os.environ.get("DEBUG", False))
