TEST_FLIGHT_BOOKING_DATA = {
    "duration_label": "7 hr 11 min",
    "duration": 431,
    "airline": "JetBlue",
    "airline_logo": "https://www.gstatic.com/flights/airline_logos/70px/B6.png",
    "flight_number": "B6 1107",
    "departure_city": "John F. Kennedy International Airport",
    "departure_code": "JFK",
    "departure_time": "2025-2-1 08:34",
    "arrival_city": "Heathrow Airport",
    "arrival_code": "LHR",
    "arrival_time": "2025-2-1 20:45",
    "price": "569",
    "stops": 0,
    "passengers": 0
}

def test_create_function_for_flight_booking_returns_201(client):
    response = client.post("/api/flight-bookings", json=TEST_FLIGHT_BOOKING_DATA)

    assert response.status_code == 201

    data = response.get_json()
    assert "id" in data
    assert data["departure_city"] == "John F. Kennedy International Airport"
    assert data["arrival_city"] == "Heathrow Airport"

def test_get_flight_bookings_returns_list(client):
    client.post("/api/flight-bookings", json=TEST_FLIGHT_BOOKING_DATA)

    response = client.get("/api/flight-bookings")
    assert response.status_code == 200

    data = response.get_json()
    assert isinstance(data, list)
    assert len(data) == 1
    assert data[0]["flight_number"] == "B6 1107"