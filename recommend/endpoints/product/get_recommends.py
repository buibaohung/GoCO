import numpy
import pandas as pd
from config.pg import session, engine

def GetRecommendProducts(product_id):
    df = pd.read_sql("recommend", engine, index_col='product_id')
    if numpy.int64(product_id) not in df.index:
        return []

    similar_score = df[product_id].sort_values(ascending=False)
    return similar_score.index.tolist()