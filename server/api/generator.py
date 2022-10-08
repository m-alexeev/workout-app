import random
from typing import List
import click
from flask import Blueprint
from faker import Faker
from api import email
from api.app import db
from api.models import Exercise, User, Workout, Category, BodyPart

fake = Blueprint("fake", __name__)
faker = Faker()


@fake.cli.command()
@click.argument("num", type=int)
def users(num):  # pragma: no cover
    """Create the given number of fake users."""
    users = []
    for i in range(num):
        f, l,  *_ = faker.name().split(" ")
        user = User(email=faker.email(), first_name=f, last_name=l, password=l)
        db.session.add(user)
        users.append(user)
    db.session.commit()
    print(num, "users added.")


@fake.cli.command()
def exercises():
    """Create the exercises table in the database"""
    db.session.add(
        Exercise(
            name="Ab Wheel",
            category=Category.W_BODYWEIGHT.value,
            body_part=BodyPart.CORE.value,
        )
    )
    db.session.add(
        Exercise(
            name="Arnold Press",
            category=Category.DUMBBELL.value,
            body_part=BodyPart.SHOULDERS.value,
        )
    )
    db.session.commit()


@fake.cli.command()
@click.argument("num", type=int)
def workouts(num):  # pragma: no cover
    """Create the given number of fake posts, assigned to random users."""
    users = db.session.scalars(User.select()).all()
    for i in range(num):
        user = random.choice(users)
        # TODO: Create Workouts

    db.session.commit()
