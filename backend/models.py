from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import DeclarativeBase

class Base(DeclarativeBase):
    pass

db = SQLAlchemy(model_class=Base)

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
