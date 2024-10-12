"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/login', methods=['POST'])
def login():

    email=request.json.get("email",None)
    password=request.json.get("password",None)

    user=User.query.filter_by(email=email).first()

    if user== None:
        return jsonify({"msg": "could not find the email"}), 401
    if email!= user.email or password != user.password:
        return jsonify({"msg": "bad email or password"}), 401
    
    access_token =create_access_token(identity=email)
    return jsonify(access_token=access_token)

@api.route('/signup', methods=['POST'])
def signup():
    body = request.get_json()
    
    user = User.query.filter_by(email=body["email"]).first()
   
    if user is None:
        user = User(email=body["email"], password=body["password"], is_active=True)
        db.session.add(user)
        db.session.commit()
        return jsonify({"msg": "Usuario creado exitosamente"}), 200
    else:
        return jsonify({"msg": "Ya existe ese usuario"}), 401

    


