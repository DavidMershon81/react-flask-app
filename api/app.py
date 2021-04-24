import pymysql
pymysql.install_as_MySQLdb()
from flask import Flask, jsonify
import time
from flask_sqlalchemy import SQLAlchemy

#init flask app
app = Flask(__name__, static_folder='../build', static_url_path='/')

#import and configure database
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = 'false'

#this connects to the test database I built in a standalone docker container called "mysql_test"
#app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:password@localhost:3306/testdb'

#this connect the db to the db I'm building with docker compose
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:password@db:3306/testdb'

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
    print(f"adding {city_name}")

db.create_all()

#routes
@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.route('/api/time')
def get_current_time():
    return { 'time': time.time() }

@app.route('/api/nonsense')
def get_nonsense():
    return { 
        "dog" : "mr. stupid",
        "cat" : "beep beep I'm a sheep",
        "horse" : "dootdootdoot"
        }

@app.route('/api/test_db', methods=["GET"])
def test_db():
    return jsonify([ { 'id' : city.id, 'name' : city.name } for city in db_get_all_cities()])

@app.route('/api/add_city/<city_name>', methods=["GET"])
def add_city(city_name):
    db_add_city(city_name)
    return f"adding {city_name}"