from flask import Flask, render_template, request
import re

app = Flask(__name__)

history = []

def check_strength(password):
    score = 0

    if len(password) >= 8:
        score += 1

    if re.search(r"[A-Z]", password):
        score += 1

    if re.search(r"[a-z]", password):
        score += 1

    if re.search(r"[0-9]", password):
        score += 1

    if re.search(r"[!@#$%^&*(),.?\":{}|<>]", password):
        score += 1

    percentage = score * 20

    if percentage <= 40:
        result = "🔴 Weak Password"

    elif percentage <= 80:
        result = "🟠 Medium Password"

    else:
        result = "🟢 Strong Password"

    return result, percentage


@app.route("/", methods=["GET", "POST"])
def home():

    result = ""
    percentage = 0

    if request.method == "POST":

        password = request.form["password"]

        result, percentage = check_strength(password)

        history.insert(0, password)

        if len(history) > 10:
            history.pop()

    return render_template(
        "index.html",
        result=result,
        percentage=percentage,
        history=history
    )


if __name__ == "__main__":
    app.run(debug=True)