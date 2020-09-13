from flask_restful import Resource, Api
from endpoints.product.get_recommends import GetRecommendProducts

class RecommendProduct(Resource):
    def get(self, product_id):
        products = GetRecommendProducts(product_id)
        return products