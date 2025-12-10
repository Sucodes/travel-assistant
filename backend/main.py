from flask import Flask, jsonify
import requests
from dotenv import load_dotenv #gotten from python-dotenv package https://pypi.org/project/python-dotenv/
import os

load_dotenv()

app = Flask(__name__)

url = "https://google-flights2.p.rapidapi.com/api/v1/searchFlights" # https://rapidapi.com/DataCrawler/api/google-flights2/playground/apiendpoint_ce4a44ea-f781-4baf-883f-ea1b7da10907

querystring = {"departure_id":"LAX","arrival_id":"JFK", "outbound_date": "2025-12-21","travel_class":"ECONOMY","adults":"1","show_hidden":"1","currency":"USD","language_code":"en-US","country_code":"US","search_type":"best"}

headers = {
	"x-rapidapi-key": os.getenv("RAPID_API_KEY"),
	"x-rapidapi-host": os.getenv("RAPID_API_HOST")
}

response = requests.get(url, headers=headers, params=querystring)

@app.route("/")
def hello_world():
    return jsonify(response.json())

if __name__ == "__main__":
    app.run(debug=True)