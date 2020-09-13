from flask import Flask, Blueprint
from flask_restful import Resource, Api
from delivery.http.product import RecommendProduct

api_bp = Blueprint('api', __name__)
api = Api(api_bp)

api.add_resource(RecommendProduct, '/products/<product_id>/recommend')

def init():
    app = Flask(__name__)
    app.register_blueprint(api_bp, url_prefix='/api')
    app.run(host='0.0.0.0', port=8000)