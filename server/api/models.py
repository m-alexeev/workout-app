from datetime import datetime, timedelta
from email.policy import default
import enum
from hashlib import md5
import secrets
from time import time
import uuid

from flask import current_app, url_for
import jwt
import sqlalchemy as sqla
from sqlalchemy import Enum, false
from sqlalchemy import orm as sqla_orm
from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy_utils import UUIDType


from api.app import db


class Updateable:
    def update(self, data):
        for attr, value in data.items():
            setattr(self, attr, value)


class Gender(enum.Enum):
    MALE = "Male"
    FEMALE = "Female"


class SetType(enum.Enum):
    WARM_UP = "Warm Up"
    NORMAL = "Normal"
    FAILURE = "Failure"


class Category(enum.Enum):
    BARBELL = "Barbell"
    DUMBBELL = "Dumbbell"
    MACHINE = "Machine"
    CABLE = "Cable"
    W_BODYWEIGHT = "Weighted Bodyweight"
    A_BODYWEIGHT = "Assisted Bodyweight"
    CARDIO = "Cardio"
    OTHER = "Other"


class BodyPart(enum.Enum):
    ABS = "Abs"
    ARMS = "Arms"
    CORE = "Core"
    BACK = "Back"
    CHEST = "Chest"
    LEGS = "Legs"
    SHOULDERS = "Shoulders"
    FULL_BODY = "Full Body"
    CARDIO = "Cardio"
    OTHER = "Other"


class MeasurementCategory(enum.Enum):
    CORE = "Core"
    BODY_PART = "Body Part"


class MeasurementUnit(enum.Enum):
    WEIGHT = "Weight"
    PERCENT = "Percent"
    LENGHT = "Length"


class Token(db.Model):
    __tablename__ = "tokens"

    id = sqla.Column(UUIDType(binary=False), primary_key=True, default=uuid.uuid4)
    access_token = sqla.Column(sqla.String(64), nullable=False, index=True)
    access_expiration = sqla.Column(sqla.DateTime, nullable=False)
    refresh_token = sqla.Column(sqla.String(64), nullable=False, index=True)
    refresh_expiration = sqla.Column(sqla.DateTime, nullable=False)
    user_id = sqla.Column(UUIDType(binary=False), sqla.ForeignKey("users.id"), index=True)

    user = sqla_orm.relationship("User", back_populates="tokens")

    def generate(self):
        self.access_token = secrets.token_urlsafe()
        self.access_expiration = datetime.utcnow() + timedelta(
            minutes=current_app.config["ACCESS_TOKEN_MINUTES"]
        )
        self.refresh_token = secrets.token_urlsafe()
        self.refresh_expiration = datetime.utcnow() + timedelta(
            days=current_app.config["REFRESH_TOKEN_DAYS"]
        )

    def expire(self):
        self.access_expiration = datetime.utcnow()
        self.refresh_expiration = datetime.utcnow()

    @staticmethod
    def clean():
        """Remove any tokens that have been expired for more than a day."""
        yesterday = datetime.utcnow() - timedelta(days=1)
        db.session.execute(Token.delete().where(Token.refresh_expiration < yesterday))


class User(Updateable, db.Model):
    __tablename__ = "users"

    id = sqla.Column(UUIDType(binary=False), primary_key=True, default=uuid.uuid4)
    email = sqla.Column(sqla.String(120), index=True, unique=True, nullable=False)
    password_hash = sqla.Column(sqla.String(128))
    first_name = sqla.Column(sqla.String(64), unique=False, nullable=False)
    last_name = sqla.Column(sqla.String(64), unique=False, nullable=False)

    tokens = sqla_orm.relationship("Token", back_populates="user", lazy="noload")
    profile = sqla_orm.relationship("Profile", back_populates="user", uselist=False)
    workouts = sqla_orm.relationship("Workout", back_populates="user")
    measurements = sqla_orm.relationship("Measurements", back_populates="user")
    exercises = sqla_orm.relationship("Exercise", back_populates="user", lazy="noload")


    def exercises_select(self):
        return Exercise.select().where(sqla_orm.with_parent(self, User.exercises))

    def __repr__(self):  # pragma: no cover
        return "<User {}>".format(self.email)

    @property
    def url(self):
        return url_for("users.get", id=self.id)

    @property
    def avatar_url(self):
        digest = md5(self.email.lower().encode("utf-8")).hexdigest()
        return f"https://www.gravatar.com/avatar/{digest}?d=identicon"

    @property
    def password(self):
        raise AttributeError("password is not a readable attribute")

    @password.setter
    def password(self, password):
        self.password_hash = generate_password_hash(password)

    def verify_password(self, password):
        return check_password_hash(self.password_hash, password)

    def ping(self):
        self.last_seen = datetime.utcnow()

    def generate_auth_token(self):
        token = Token(user=self)
        token.generate()
        return token

    @staticmethod
    def verify_access_token(access_token, refresh_token=None):
        token = db.session.scalar(Token.select().filter_by(access_token=access_token))
        if token:
            if token.access_expiration > datetime.utcnow():
                token.user.ping()
                db.session.commit()
                return token.user

    @staticmethod
    def verify_refresh_token(refresh_token, access_token):
        token = db.session.scalar(
            Token.select().filter_by(
                refresh_token=refresh_token, access_token=access_token
            )
        )
        if token:
            if token.refresh_expiration > datetime.utcnow():
                return token

            # someone tried to refresh with an expired token
            # revoke all tokens from this user as a precaution
            token.user.revoke_all()
            db.session.commit()

    def revoke_all(self):
        db.session.execute(Token.delete().where(Token.user == self))

    def generate_reset_token(self):
        return jwt.encode(
            {
                "exp": time() + current_app.config["RESET_TOKEN_MINUTES"] * 60,
                "reset_email": self.email,
            },
            current_app.config["SECRET_KEY"],
            algorithm="HS256",
        )

    @staticmethod
    def verify_reset_token(reset_token):
        try:
            data = jwt.decode(
                reset_token, current_app.config["SECRET_KEY"], algorithms=["HS256"]
            )
        except jwt.PyJWTError:
            return
        return db.session.scalar(User.select().filter_by(email=data["reset_email"]))


class Profile(Updateable, db.Model):
    __tablename__ = "profile"
    id = sqla.Column(UUIDType(binary=False), primary_key=True, default=uuid.uuid4)

    gender = sqla.Column(sqla.String(9), nullable=True)
    height = sqla.Column(sqla.DECIMAL(5, 2), unique=False, nullable=True)
    weight = sqla.Column(sqla.DECIMAL(5, 2), unique=False, nullable=True)
    user_id = sqla.Column(UUIDType(binary=False), sqla.ForeignKey("users.id"))

    # Relationships
    user = sqla_orm.relationship("User", back_populates="profile")


class Workout(Updateable, db.Model):
    __tablename__ = "workout"
    id = sqla.Column(UUIDType(binary=False), primary_key=True, default=uuid.uuid4)

    name = sqla.Column(sqla.String(128), nullable=False)
    duration = sqla.Column(sqla.TIME(timezone=False), nullable=False)
    date = sqla.Column(
        sqla.DATETIME(timezone=False), nullable=False, default=datetime.now()
    )
    user_id = sqla.Column(UUIDType(binary=False), sqla.ForeignKey("users.id"))

    # Relationships
    exercise_entries = sqla_orm.relationship("ExerciseEntry", back_populates="workout")
    user = sqla_orm.relationship("User", back_populates="workouts")


class Exercise(Updateable, db.Model):
    __tablename__ = "exercise"
    id = sqla.Column(UUIDType(binary=False), primary_key=True, default=uuid.uuid4)

    name = sqla.Column(sqla.String(64), nullable=False, unique=False)
    category = sqla.Column(sqla.String(64), nullable=False, unique=False)
    body_part = sqla.Column(sqla.String(64), nullable=False, unique=False)
    user_id = sqla.Column(UUIDType(binary=False), sqla.ForeignKey('users.id'), nullable=True)

    # Relationships
    exercise_entries = sqla_orm.relationship("ExerciseEntry", back_populates='exercise' )
    user = sqla_orm.relationship("User", back_populates="exercises")

    def __repr__(self) -> str:
        return f"<{self.name}, {self.body_part}, {self.category}"

class ExerciseEntry(Updateable, db.Model):
    __tablename__ = "exercise_entry"
    id = sqla.Column(UUIDType(binary=False), primary_key=True, default=uuid.uuid4)

    workout_id = sqla.Column(UUIDType(binary=False), sqla.ForeignKey("workout.id"))
    exercise_id = sqla.Column(UUIDType(binary=False), sqla.ForeignKey("exercise.id"))

    # Relationships
    workout = sqla_orm.relationship("Workout", back_populates="exercise_entries")
    exercise = sqla_orm.relationship("Exercise", back_populates="exercise_entries")
    exercise_sets = sqla_orm.relationship(
        "ExerciseSet", back_populates="exercise_entry"
    )


class ExerciseSet(Updateable, db.Model):
    __tablename__ = "exercise_set"
    id = sqla.Column(UUIDType(binary=False), primary_key=True, default=uuid.uuid4)

    weight = sqla.Column(sqla.DECIMAL(5, 2), nullable=True)
    set_type = sqla.Column(sqla.String(64), nullable=False, default=SetType.NORMAL)
    reps = sqla.Column(sqla.Integer, nullable=False, default=0)
    rpe = sqla.Column(sqla.DECIMAL(5, 2), nullable=True)
    completed = sqla.Column(sqla.Boolean(), nullable=False, default=False)

    exercise_entry_id = sqla.Column(
        UUIDType(binary=False), sqla.ForeignKey("exercise_entry.id")
    )

    # Relationships
    exercise_entry = sqla_orm.relationship(
        "ExerciseEntry", back_populates="exercise_sets"
    )


class Measurements(Updateable, db.Model):
    __tablename__ = "measurements"
    id = sqla.Column(UUIDType(binary=False), primary_key = True, default=uuid.uuid4)

    category = sqla.Column(sqla.String(64), nullable=False)
    reading = sqla.Column(sqla.DECIMAL(5,2), nullable = False)
    unit = sqla.Column(sqla.String(64), nullable=False)
    date = sqla.Column(sqla.DATETIME(timezone=False), nullable=False, default = datetime.now())
    user_id = sqla.Column(UUIDType(binary=False), sqla.ForeignKey('users.id'))

    # Relationships
    user = sqla_orm.relationship("User", back_populates='measurements')
