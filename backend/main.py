from flask import Flask, jsonify, request
import requests
from dotenv import load_dotenv #gotten from python-dotenv package https://pypi.org/project/python-dotenv/
import os
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import DeclarativeBase

load_dotenv()

class Base(DeclarativeBase):
  pass

db = SQLAlchemy(model_class=Base)

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:5173"}})
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///project.db"
db.init_app(app)

url = "https://google-flights2.p.rapidapi.com/api/v1/searchFlights" # https://rapidapi.com/DataCrawler/api/google-flights2/playground/apiendpoint_ce4a44ea-f781-4baf-883f-ea1b7da10907

class Flight_Bookings(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    airline = db.Column(db.String(), nullable=False)
    airline_logo = db.Column(db.String(), nullable=True)
    flight_number = db.Column(db.String(), nullable=False)
    departure_time = db.Column(db.String(), nullable=False)
    departure_city = db.Column(db.String(), nullable=False)
    departure_code = db.Column(db.String(), nullable=False)
    arrival_time = db.Column(db.String(), nullable=False)
    arrival_city = db.Column(db.String(), nullable=False)
    arrival_code = db.Column(db.String(), nullable=False)
    duration = db.Column(db.Integer(), nullable=False)
    stops = db.Column(db.Integer(), nullable=False, default=0)
    price = db.Column(db.String(), nullable=False)
    passengers = db.Column(db.Integer, nullable=False, default=1)

    def to_dict(self):
        return {
            "id": self.id,
            "airline": self.airline,
            "airline_logo": self.airline_logo,
            "flight_number": self.flight_number,
            "departure_time": self.departure_time,
            "departure_city": self.departure_city,
            "departure_code": self.departure_code,
            "arrival_time": self.arrival_time,
            "arrival_city": self.arrival_city,
            "arrival_code": self.arrival_code,
            "duration": self.duration,
            "stops": self.stops,
            "price": self.price,
            "passengers": self.passengers
        }

with app.app_context():
    db.create_all()

@app.route("/api/flights")
def get_flights():
    headers = {
        "x-rapidapi-key": os.getenv("RAPID_API_KEY"),
        "x-rapidapi-host": os.getenv("RAPID_API_HOST")
    }

    departure_id = request.args.get("departure_id")
    arrival_id = request.args.get("arrival_id")
    outbound_date = request.args.get("outbound_date")
    inbound_date = request.args.get("inbound_date")
    adults = request.args.get("adults")

    querystring = {
        "departure_id": departure_id,
        "arrival_id": arrival_id,
        "outbound_date": outbound_date,
        "inbound_date": inbound_date,
        "travel_class": "ECONOMY",
        "adults": adults,
        "search_type": "best",
    }

    try:
        response = requests.get(
            url,
            headers=headers,
            params=querystring
        )

        if response.status_code == 200:
            flights = response.json()
            return jsonify(flights)
        else:
            print('Error:', response.status_code, response.text)
            return jsonify({"error": "Failed to contact flight API", "details": response.text}), response.status_code
    except requests.exceptions.RequestException as e:
        print('Error:', e)
        return jsonify({"error": "Failed to contact API"})
    

if __name__ == "__main__":
    app.run(debug=True)