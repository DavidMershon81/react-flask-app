from flask import Flask
import time

app = Flask(__name__)


@app.route('/time')
def get_current_time():
    return { 'time': time.time() }

@app.route('/nonsense')
def get_nonsense():
    return { 
        "dog" : "mr. stupid",
        "cat" : "beep beep I'm a sheep",
        "horse" : "dootdootdoot"
        }

if __name__ == '__main__':
    app.run()