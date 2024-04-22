import os
from flask_restx import Namespace, Resource, fields
from flask import jsonify, Blueprint, request, send_file, Response
from services.download_sound_service import DownloadSoundService

download_sound_bp:Blueprint = Blueprint('download', __name__)
api = Namespace("Sound", description="Download Sound")

@api.route('/download')
class DownloadSoundController(Resource):
    @api.response(201, "Download success!")
    @api.response(404, "URI not found")
    @api.response(408, "Time exceeded when download the audio")
    @api.response(400, "Some unhandled error occurred")
    @download_sound_bp.route('/download/', methods=['POST', 'OPTIONS'])
    def post(self):
        content = request.json

        sound = DownloadSoundService().downloadMusic(content["url"], content["type"])

        if content["type"] == "music":
            mimetype = 'audio/wav'
        elif content["type"] == "video":
            mimetype = 'video/mp4'
        else:
            return jsonify({"message": "Invalid type provided"}), 400

        try:
            with open(sound, 'rb') as f:
                file_data = f.read()
            response = Response(file_data, mimetype=mimetype, headers={
                'Content-Disposition': f'attachment; filename={os.path.basename(sound)}'
            })

            response.headers["Content-Disposition"] = f"attachment; filename={os.path.basename(sound)}"
            response.headers["Access-Control-Expose-Headers"] = "Content-Disposition"

            return response
        except Exception as e:
            return jsonify({"message": str(e)}), 500
        finally:
            try:
                os.remove(sound)
            except Exception as e:
                print(f"Erro ao remover o arquivo: {str(e)}")

