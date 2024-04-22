from flask_restx import Api
from flask_cors import CORS
from flask import Flask, jsonify, make_response
from controllers.download_sound import download_sound_bp
from controllers.download_sound import api as sound

app = Flask(__name__)
app.config["DEBUG"] = True
app.config["use_reloader"] = True
api_prefix_url = "/api/core"

CORS(app)

app.register_blueprint(download_sound_bp, url_prefix=f"{api_prefix_url}/sound")

api = Api(app, title='API - Downloader Youtube Sound', version='1.0', description='API to download sound and video of youtube',prefix=api_prefix_url)
api.add_namespace(sound, path=f'/sound')

@app.errorhandler(404)
def not_found(e): 
    return make_response(jsonify({"message": e.description, "title": e.name, "status_code": 404}), 404)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)