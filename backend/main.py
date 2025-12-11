from flask import Flask, jsonify, request
import requests
from dotenv import load_dotenv #gotten from python-dotenv package https://pypi.org/project/python-dotenv/
import os
from flask_cors import CORS
load_dotenv()

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:5173"}})

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
    

if __name__ == "__main__":
    app.run(debug=True)