from flask import Flask, jsonify, request
import requests
from dotenv import load_dotenv #gotten from python-dotenv package https://pypi.org/project/python-dotenv/
import os
from flask_cors import CORS
from models import db, Flight_Bookings

load_dotenv()

def create_app(config=None):
    app = Flask(__name__)
    CORS(app, resources={r"/api/*": {"origins": ["http://localhost:5173", "https://travel-assistant-261f.onrender.com"]}})
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///project.db"
    db.init_app(app)

    with app.app_context():
        db.create_all()

    if config:
        app.config.update(config)
    
    url = "https://google-flights2.p.rapidapi.com/api/v1/searchFlights" # https://rapidapi.com/DataCrawler/api/google-flights2/playground/apiendpoint_ce4a44ea-f781-4baf-883f-ea1b7da10907

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
            
    @app.route("/api/flight-bookings", methods=["GET"])
    def get_all_flight_bookings():
        bookings = Flight_Bookings.query.all()
        return jsonify([booking.to_dict() for booking in bookings])

    @app.route("/api/flight-bookings/<int:flight_booking_id>", methods=["GET"])
    def get_flight_booking(flight_booking_id):
        booking = Flight_Bookings.query.get(flight_booking_id)
        if booking is not None:
            return jsonify(booking.to_dict())
        else:
            return jsonify({"error": "Booking not found"}), 404

    @app.route("/api/flight-bookings", methods=["POST"])
    def add_flight_booking():
        data = request.get_json()

        required_fields = ["airline", "flight_number", "departure_time", "departure_city", "departure_code", "arrival_time", "arrival_city", "arrival_code", "duration", "stops", "price", "passengers"]

        missing = []
        for field in required_fields:
            if field not in data:
                missing.append(field)

        if missing:
            return jsonify({"error": "Missing fields", "missing": missing}), 400

        new_booking = Flight_Bookings(
            airline=data["airline"],
            airline_logo=data.get("airline_logo"),
            flight_number=data["flight_number"],
            departure_time=data["departure_time"],
            departure_city=data["departure_city"],
            departure_code=data["departure_code"],
            arrival_time=data["arrival_time"],
            arrival_city=data["arrival_city"],
            arrival_code=data["arrival_code"],
            duration=data["duration"],
            stops=data["stops"],
            price=data["price"],
            passengers=data["passengers"]
        )
        db.session.add(new_booking)
        db.session.commit()
        return jsonify(new_booking.to_dict()), 201

    @app.route("/api/flight-bookings/<int:flight_booking_id>", methods=["PUT"])
    def update_flight_booking(flight_booking_id):
            data = request.get_json()
            booking = Flight_Bookings.query.get(flight_booking_id)
            if booking:
                booking.departure_time = data.get("departure_time", booking.departure_time)
                booking.departure_code = data.get("departure_code", booking.departure_code)
                booking.departure_city = data.get("departure_city", booking.departure_city)
                booking.arrival_time = data.get("arrival_time", booking.arrival_time)
                booking.arrival_code = data.get("arrival_code", booking.arrival_code)
                booking.arrival_city = data.get("arrival_city", booking.arrival_city)
                booking.passengers = data.get("passengers", booking.passengers)
                db.session.commit()
                return jsonify(booking.to_dict())
            else:
                return jsonify({"error": "Booking not found"}), 404

    @app.route("/api/flight-bookings/<int:flight_booking_id>", methods=["DELETE"])
    def delete_flight_booking(flight_booking_id):
        booking = Flight_Bookings.query.get(flight_booking_id)
        if booking:
            db.session.delete(booking)
            db.session.commit()
            return jsonify({"message": "Booking deleted successfully"})
        else:
           return jsonify({"error": "Booking not found"}), 404
    return app

app = create_app()

if __name__ == "__main__":
    app.run(debug=True)