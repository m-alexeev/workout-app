from dbm import dumb
from xml.etree.ElementInclude import include
from marshmallow import (
    validate,
    validates,
    validates_schema,
    ValidationError,
    post_dump,
)
from api import ma, db
from api.auth import token_auth
from api.models import (
    BodyPart,
    Category,
    Gender,
    MeasurementCategory,
    MeasurementUnit,
    SetType,
    User,
    Profile,
    Workout,
    Exercise,
    ExerciseEntry,
    ExerciseSet,
    Measurements,
)

paginated_schema_cache = {}
list_schema_cache = {}

class EmptySchema(ma.Schema):
    pass


class DateTimePaginationSchema(ma.Schema):
    class Meta:
        ordered = True

    limit = ma.Integer()
    offset = ma.Integer()
    after = ma.DateTime(load_only=True)
    count = ma.Integer(dump_only=True)
    total = ma.Integer(dump_only=True)

    @validates_schema
    def validate_schema(self, data, **kwargs):
        if data.get("offset") is not None and data.get("after") is not None:
            raise ValidationError("Cannot specify both offset and after")


class StringPaginationSchema(ma.Schema):
    class Meta:
        ordered = True

    limit = ma.Integer()
    offset = ma.Integer()
    after = ma.String(load_only=True)
    count = ma.Integer(dump_only=True)
    total = ma.Integer(dump_only=True)

    @validates_schema
    def validate_schema(self, data, **kwargs):
        if data.get("offset") is not None and data.get("after") is not None:
            raise ValidationError("Cannot specify both offset and after")



def PaginatedCollection(schema, pagination_schema=StringPaginationSchema):
    if schema in paginated_schema_cache:
        return paginated_schema_cache[schema]

    class PaginatedSchema(ma.Schema):
        class Meta:
            ordered = True

        pagination = ma.Nested(pagination_schema)
        data = ma.Nested(schema, many=True)

    PaginatedSchema.__name__ = "Paginated{}".format(schema.__class__.__name__)
    paginated_schema_cache[schema] = PaginatedSchema
    return PaginatedSchema


def ListCollection(schema): 
    if schema in list_schema_cache: 
        return list_schema_cache[schema]

    class ListSchema(ma.Schema):
        class Meta:
            ordered = True
        
        data = ma.Nested(schema, many=True)
    ListSchema.__name__ = f"List {schema.__class__.__name__}"
    list_schema_cache[schema] = ListSchema
    return ListSchema


class UserSchema(ma.SQLAlchemySchema):
    class Meta:
        model = User
        ordered = True

    id = ma.auto_field(dump_only=True)
    email = ma.auto_field(
        required=True, validate=[validate.Length(max=120), validate.Email()]
    )
    password = ma.String(required=True, load_only=True, validate=validate.Length(min=3))
    first_name = ma.String(required=True)
    last_name = ma.String(required=True)

    @validates("email")
    def validate_email(self, value):
        user = token_auth.current_user()
        old_email = user.email if user else None
        if value != old_email and db.session.scalar(
            User.select().filter_by(email=value)
        ):
            raise ValidationError("Use a different email.")


class UpdateUserSchema(UserSchema):
    old_password = ma.String(load_only=True, validate=validate.Length(min=3))

    @validates("old_password")
    def validate_old_password(self, value):
        if not token_auth.current_user().verify_password(value):
            raise ValidationError("Password is incorrect")


class ProfileSchema(ma.SQLAlchemySchema):
    class Meta:
        model = Profile
        include_fk = True

    id = ma.auto_field(dump_only=True)
    gender = ma.auto_field(
        required=False, validate=validate.OneOf(choices=[g.value for g in Gender])
    )
    height = ma.auto_field(required=False, validate=validate.Range(min=1, max=500))
    weight = ma.auto_field(required=False, validate=validate.Range(min=1, max=500))

    user = ma.Nested(UserSchema, dump_only=True)


class WorkoutSchema(ma.SQLAlchemySchema):
    class Meta:
        model = Workout
        ordered = True

    id = ma.auto_field(dump_only=True)
    name = ma.String(required=True, validate=validate.Length(min=1, max=128))
    duration = ma.auto_field(required=True)
    date = ma.auto_field(dump_only=True)
    user = ma.Nested(UserSchema)


class ExerciseSchema(ma.SQLAlchemySchema):
    class Meta:
        model = Exercise
        ordered = True

    id = ma.auto_field(dump_only=True)
    name = ma.String(required=True, validate=validate.Length(min=2, max=64))
    category = ma.auto_field(
        required=True, validate=validate.OneOf(choices=[c.value for c in Category])
    )
    body_part = ma.auto_field(
        required=True, validate=validate.OneOf(choices=[b_p.value for b_p in BodyPart])
    )


class ExerciseEntrySchema(ma.SQLAlchemySchema):
    class Meta:
        model = ExerciseEntry
        ordered = True

    workouts = ma.Nested(WorkoutSchema)
    exercise = ma.Nested(ExerciseSchema)


class ExerciseSetSchema(ma.SQLAlchemySchema):
    class Meta:
        model = ExerciseSet
        ordered = False

    id = ma.auto_field(dump_only=True)
    weight = ma.auto_field(required=True, validate=validate.Range(min=0))
    set_type = ma.auto_field(
        required=True, validate=validate.OneOf(choices=[s_t.value for s_t in SetType])
    )
    reps = ma.auto_field(required=True, validate=validate.Range(min=0))
    rpe = ma.auto_field(required=False, validate=validate.Range(min=0, max=10))
    completed = ma.auto_field(required=False)

    exercise_entry = ma.Nested(ExerciseEntrySchema)


class Measuremnts(ma.SQLAlchemySchema):
    class Meta:
        model = Measurements
        ordered = True

    id = ma.auto_field(dump_only=True)
    category = ma.auto_field(
        required=True,
        validate=validate.OneOf(choices=[m_c.value for m_c in MeasurementCategory]),
    )
    reading = ma.auto_field(required=True, validate=validate.Range(min=0))
    unit = ma.auto_field(
        required=True,
        validate=validate.OneOf(choices=[m_u.value for m_u in MeasurementUnit]),
    )
    date = ma.auto_field(dump_only=True)

    user = ma.Nested(UserSchema)


class TokenSchema(ma.Schema):
    class Meta:
        ordered = True

    access_token = ma.String(required=True)
    refresh_token = ma.String()


class PasswordResetRequestSchema(ma.Schema):
    class Meta:
        ordered = True

    email = ma.String(
        required=True, validate=[validate.Length(max=120), validate.Email()]
    )


class PasswordResetSchema(ma.Schema):
    class Meta:
        ordered = True

    token = ma.String(required=True)
    new_password = ma.String(required=True, validate=validate.Length(min=3))
