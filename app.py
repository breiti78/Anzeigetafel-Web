import json

import eventlet
from flask import (Flask, json, jsonify, redirect, render_template, request,
                   url_for)
from flask_bootstrap import Bootstrap
from flask_mqtt import Mqtt
from flask_socketio import SocketIO

eventlet.monkey_patch()

app = Flask(__name__)
app.config['SECRET'] = 'my secret key'
app.config['TEMPLATES_AUTO_RELOAD'] = True
app.config['MQTT_BROKER_URL'] = '192.168.1.85'
app.config['MQTT_BROKER_PORT'] = 1883
app.config['MQTT_USERNAME'] = 'mqtt'
app.config['MQTT_PASSWORD'] = 'mqtt'
app.config['MQTT_KEEPALIVE'] = 5
app.config['MQTT_TLS_ENABLED'] = False
app.config['MQTT_CLEAN_SESSION'] = True

app.config['BOOTSTRAP_SERVE_LOCAL'] = False


mqtt = Mqtt(app)
socketio = SocketIO(app)
bootstrap = Bootstrap(app)


@app.route('/')
def index():
    return render_template('index.html')

@app.route('/tool')
def tool():
    return render_template('tool.html')

@app.route('/mode')
def mode():
    return render_template('mode.html')

@app.route('/base')
def mode():
    return render_template('base.html')

@socketio.on('publish')
def handle_publish(json_str):
    data = json.loads(json_str)
    mqtt.publish(data['topic'], data['message'])


@socketio.on('subscribe')
def handle_subscribe(json_str):
    data = json.loads(json_str)
    mqtt.subscribe(data['topic'])


@socketio.on('unsubscribe_all')
def handle_unsubscribe_all():
    mqtt.unsubscribe_all()


@mqtt.on_message()
def handle_mqtt_message(client, userdata, message):
    data = dict(
        topic=message.topic,
        payload=message.payload.decode()
    )
    socketio.emit('mqtt_message', data=data)


@mqtt.on_log()
def handle_logging(client, userdata, level, buf):
    print(level, buf)


if __name__ == '__main__':
    # important: Do not use reloader because this will create two Flask instances.
    # Flask-MQTT only supports running with one instance
    socketio.run(app, host='0.0.0.0', port=5000, use_reloader=False, debug=True)