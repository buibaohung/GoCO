import pandas as pd
from scipy import sparse
from sklearn.metrics.pairwise import cosine_similarity
import time
from config.pg import session, engine
from models.rating import Rating

def run():
    while 1:
        train()
        time.sleep(60*60*1)

def train():
    # read data from db
    dfRating = pd.read_sql("ratings", engine)
    dfInteraction = pd.read_sql("interactions", engine)
    
    # drop unsed column
    dfRating = dfRating.drop(columns=['id', 'content', 'stake', 'created_at', 'updated_at', 'deleted_at'])
    dfInteraction = dfInteraction.drop(columns=['id'])

    # use average value for duplicate row
    dfRating = dfRating.groupby(['user_id', 'product_id']).mean().reset_index()

    # merge 2 table
    dfInput = pd.merge(dfRating, dfInteraction, on=['user_id', 'product_id'], how="outer").fillna(0,axis=1)
    print(dfInput)

    # calculate average value
    def calculate_final_value(row):
        return (row['star']*2 + row['views'] + row['time_view'])/4
    dfInput['final_value'] = dfInput.apply(calculate_final_value, axis=1)
    print(dfInput)

    # create square matrix
    dfInput = dfInput.pivot_table(index=['user_id'],columns=['product_id'],values='final_value').fillna(0,axis=1)
    print(dfInput)

    # standardize input data
    def standardize(row):
        new_row = (row - row.mean())/(row.max()-row.min())
        return new_row
    userRatings = dfInput.apply(standardize).fillna(0,axis=1)
    print(userRatings)

    # calculate similarity
    userRatings = userRatings.T
    sparse_df = sparse.csr_matrix(userRatings.values)
    corrMatrix = pd.DataFrame(cosine_similarity(sparse_df),index=userRatings.index,columns=userRatings.index)
    print(corrMatrix)

    corrMatrix.to_sql("recommend", engine, if_exists='replace', method='multi')