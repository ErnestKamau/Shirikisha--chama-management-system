import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_restful import Api, Resource
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from flask_bcrypt import Bcrypt
from dotenv import load_dotenv


app = Flask(
    __name__,
    static_url_path='',
    static_folder='../client/dist',
    template_folder='../client/dist'
    )

load_dotenv()

app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URI')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', 'super-secret')
# app.config['MPESA_CONSUMER_KEY'] = os.environ.get('MPESA_CONSUMER_KEY')
# app.config['MPESA_CONSUMER_SECRET'] = os.environ.get('MPESA_CONSUMER_SECRET')
# app.config['MPESA_SHORTCODE'] = os.environ.get('MPESA_SHORTCODE')
# app.config['MPESA_PASSKEY'] = os.environ.get('MPESA_PASSKEY')
# app.config['MPESA_CALLBACK_URL'] = os.environ.get('MPESA_CALLBACK_URL')



app.json.compact = False

CORS(app)

db = SQLAlchemy()
migrate = Migrate(app, db)
db.init_app(app)

jwt = JWTManager(app)
bcrypt = Bcrypt(app)

api = Api(app)