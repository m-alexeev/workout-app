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
    Gender,
    User,
    Profile,
    Workout,
    Exercise,
    ExerciseEntry,
    ExerciseSet,
    Measurements,
)

paginated_schema_cache = {}


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


class UserSchema(ma.SQLAlchemySchema):
    class Meta:
        model = User
        ordered = True

    id = ma.auto_field(dump_only=True)
    email = ma.auto_field(
        required=True, validate=[validate.Length(max=120), validate.Email()]
    )
    password = ma.String(required=True, load_only=True, validate=validate.Length(min=3))
    first_name = ma.String(dump_only=True)
    last_name = ma.String(dump_only=True)

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
        required=False, validate=validate.ContainsOnly(choices=Gender)
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
    duration = ma.auto_field(dump_only=True)
    date = ma.auto_field(dump_only=True)
    user = ma.Nested(UserSchema)


class ExerciseSchema(ma.SQLAlchemySchema):
    

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
