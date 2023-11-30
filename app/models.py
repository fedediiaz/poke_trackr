from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin
from app import db

class User(db.Model, UserMixin):
    user_id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20))
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(255))
    avatar_url = db.Column(db.String(255))
    cards = db.relationship('UserCard', backref='user', lazy=True)

    def get_id(self):
        return str(self.user_id)

# class Card(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     card_id = db.Column(db.String(45))  # coming from external API
#     series_id = db.Column(db.String(45))  # coming from external API
#     set_id = db.Column(db.String(45))  # coming from external API
    
# class Variant(db.Model):
#     variant_id = db.Column(db.Integer, primary_key=True)
#     name = db.Column(db.String(45))  # coming from external API

# class Condition(db.Model):
#     condition_id = db.Column(db.Integer, primary_key=True)
#     name = db.Column(db.String(45))  # provided by the frontend

class UserCard(db.Model):
    # card_id = db.Column(db.Integer, db.ForeignKey('card.id'), primary_key=True)
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.user_id'), nullable=False)
    card_id = db.Column(db.String(45))  # coming from external API
    # series_id = db.Column(db.String(45))  # coming from external API
    set_id = db.Column(db.String(45))  # coming from external API
    quantity = db.Column(db.Integer, default=0)
    variant = db.Column(db.String(50))
    condition = db.Column(db.String(50))
    # condition_id = db.Column(db.Integer, db.ForeignKey('condition.condition_id'), nullable=False)
    # variant_id = db.Column(db.Integer, db.ForeignKey('variant.variant_id'), nullable=False)

    def serialize(self):
        return {
            'card_id': self.card_id,
            'set_id': self.set_id,
            'quantity': self.quantity,
            'variant': self.variant,
            'condition': self.condition,
            # Add other fields as needed
        }

