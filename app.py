from crypt import methods
from logging import raiseExceptions
from signal import raise_signal
from flask import Flask, render_template, jsonify, request
import os
from flask_pymongo import PyMongo

if os.path.exists("env.py"):
    import env


app = Flask(__name__)
app.secret_key = os.environ.get("SECRET_KEY")
app.config["MONGO_DBNAME"] = os.environ.get("MONGO_DBNAME")
app.config["MONGO_URI"] = os.environ.get("MONGO_URI")
mongo = PyMongo(app)


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

@app.route("/plant_tree")
def plant_tree():
    """
    This route displays the plant_tree webpage.
    """
    return render_template("plant_tree.html")
  
@app.route("/score")
def score():
    """
    This route displays the score webpage.
    """
    return render_template("score.html")    

@app.route("/places", methods=["GET", "POST"])
def places():
    """
    This route gives all the places from the database.
    This route behaves like an API endpoint.
    """
    if request.method == "POST":
        score_data = request.get_json()
        result = mongo.db.quiz_rewards.insert_one(score_data)
        return jsonify(score_data)

    quiz_rewards_mongo = list(mongo.db.quiz_rewards.find())
    quiz_rewards = []
    for item in quiz_rewards_mongo:
        item.pop("_id")
        quiz_rewards.append(item)
    return jsonify(quiz_rewards)

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
