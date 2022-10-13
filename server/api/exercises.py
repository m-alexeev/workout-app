from flask import Blueprint, abort
from apifairy import authenticate, body, response, other_responses

from api.app import db
from api.auth import token_auth
from api.models import Exercise, User, Updateable
from api.schemas import ExerciseSchema
from api.decorators import list_response, paginated_response
from uuid import uuid4

exercises = Blueprint('exercises', __name__)
exercise_schema = ExerciseSchema()
exercises_schema = ExerciseSchema(many=True)

@exercises.route('/exercises', methods=["GET"])
@list_response(exercises_schema)
def all():
    """Retrieve all exercises (user-independent)"""
    return Exercise.select()

@exercises.route('/exercises', methods=["POST"])
@body(exercise_schema)
@authenticate(token_auth)
@response(exercise_schema, 201)
def new(args):
    """Create new exercise for user"""
    user = token_auth.current_user()
    exercise = Exercise(user=user, **args)
    db.session.add(exercise)
    db.session.commit()
    return exercise


@exercises.route('/exercises/', methods=["GET"])
@authenticate(token_auth)
@list_response(exercises_schema)
def user_exercises():
    """Retrieve all user exercises"""
    user = token_auth.current_user()
    return user.exercises_select()


@exercises.route('/exercises/<uuid:id>', methods=["DELETE"])
@authenticate(token_auth)
@other_responses({403: "Cannot access this resource"})
def delete(id):
    """Delete an exercise""" 
    user = token_auth.current_user()
    exercise = db.session.get(Exercise, id) or abort(404)
    if exercise.user != user:
        abort(403)
    db.session.delete(exercise)
    db.session.commit()
    return '', 204
