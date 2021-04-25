from dotenv import dotenv_values
import pymysql
pymysql.install_as_MySQLdb()
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy

#init flask app
app = Flask(__name__, static_folder='../build', static_url_path='/')

#import and configure database
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = 'false'

#choose the appropriate database URL depending on if we're running in docker compose in production 
# or with a standalone test db in development
config = dotenv_values("app_env")
db_url_key = 'PRODUCTION_DATABASE_URL' if config['FLASK_ENV'] == 'production' else 'DEVELOPMENT_DATABASE_URL'
db_url = config[db_url_key]
app.config['SQLALCHEMY_DATABASE_URI'] = db_url

db = SQLAlchemy(app)

class City(db.Model):
    __tablename__ = 'cities'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(256))

def db_get_all_cities():
    return City.query.all()

def db_add_city(city_name):
    new_city = City(name=city_name)
    db.session.add(new_city)
    db.session.commit()
    print(f"adding city to DB... id:{new_city.id} name: {new_city.name}")
    return new_city

db.create_all()

#routes
@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.route('/api/get_cities', methods=["GET"])
def get_cities():
    return jsonify([ { 'id' : city.id, 'name' : city.name } for city in db_get_all_cities()])

@app.route('/api/add_city', methods=["POST"])
def add_city():
    city_name = request.json['newCityName']
    print(f"city_name: {city_name}")
    new_city = db_add_city(city_name)
    return jsonify({ 'id' : new_city.id, 'name' : new_city.name })
    